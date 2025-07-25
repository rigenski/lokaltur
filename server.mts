import { createServer } from "http";
import next from "next";
import { Server } from "socket.io";
import dnd from "./src/data/drag-n-drop.json";
import drawing from "./src/data/drawing.json";
import quiz from "./src/data/quiz.json";

const dev = process.env.NODE_ENV !== "production";
const hostname = process.env.HOSTNAME || "localhost";
const port = parseInt(process.env.PORT || "4000");

const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

const GAME_TYPES = ["dnd", "quiz", "drawing"] as const;
const LIMIT_QUESTIONS_EACH_TYPE = 2;
const TOTAL_QUESTIONS = GAME_TYPES.length * LIMIT_QUESTIONS_EACH_TYPE;

interface RoomData {
  roomId: string;
  owner: string;
  roomStatus: "waiting" | "playing" | "finished";
  participants: string[];
  currentGame?: {
    status: "waiting" | "playing" | "finished";
    type: "dnd" | "quiz" | "drawing";
    question: any;
    answered: string[];
    drawer?: string;
    timeout?: NodeJS.Timeout;
  };
  _pastGames: Array<{
    type: "dnd" | "quiz" | "drawing";
    question: any;
    index: number;
    drawer?: string;
  }>;
}

const rooms = new Map<string, RoomData>();
const nicknames = new Map<string, string>();

function randomGameType(
  used: Record<string, number>,
): "dnd" | "quiz" | "drawing" | null {
  const available = GAME_TYPES.filter(
    (t) => used[t] < LIMIT_QUESTIONS_EACH_TYPE,
  );
  if (available.length === 0) return null;
  return available[Math.floor(Math.random() * available.length)] as
    | "dnd"
    | "quiz"
    | "drawing";
}

function randomQuestion(
  type: string,
  usedIndexes: number[],
): { question: any; index: number } | null {
  const source = type === "dnd" ? dnd : type === "quiz" ? quiz : drawing;
  const candidates = source
    .map((_, i) => i)
    .filter((i) => !usedIndexes.includes(i));
  if (candidates.length === 0) return null;
  const index = candidates[Math.floor(Math.random() * candidates.length)];
  return { question: source[index], index };
}

function startRound(io: Server, roomId: string) {
  const room = rooms.get(roomId);
  if (!room) return;

  const usedCount = { dnd: 0, quiz: 0, drawing: 0 };
  const usedIndexes: Record<string, number[]> = {
    dnd: [],
    quiz: [],
    drawing: [],
  };

  room._pastGames.forEach((g) => {
    usedCount[g.type]++;
    usedIndexes[g.type].push(g.index);
  });

  const type = randomGameType(usedCount);
  if (!type) {
    io.to(roomId).emit("game-finished", {
      message: "Game over!",
      pastGames: room._pastGames,
    });
    room.roomStatus = "finished";
    rooms.set(roomId, room);
    return;
  }

  const questionObj = randomQuestion(type, usedIndexes[type]);
  if (!questionObj) return;

  const drawer =
    type === "drawing"
      ? room.participants[Math.floor(Math.random() * room.participants.length)]
      : undefined;

  room.currentGame = {
    status: "playing",
    type,
    question: questionObj.question,
    answered: [],
    drawer,
  };

  room._pastGames.push({
    type,
    question: questionObj.question,
    index: questionObj.index,
    drawer,
  });
  room.roomStatus = "playing";
  rooms.set(roomId, room);

  io.to(roomId).emit("round-started", {
    type,
    question: questionObj.question,
    drawer,
  });

  const roundTimeout = setTimeout(() => finishRound(io, roomId), 60000);
  room.currentGame.timeout = roundTimeout;
  rooms.set(roomId, room);
}

function finishRound(io: Server, roomId: string) {
  const room = rooms.get(roomId);
  if (!room || !room.currentGame) return;

  room.currentGame.status = "finished";
  clearTimeout(room.currentGame.timeout);

  io.to(roomId).emit("round-ended", {
    message: "Round ended",
    type: room.currentGame.type,
  });

  rooms.set(roomId, room);
  setTimeout(() => startRound(io, roomId), 5000);
}

app.prepare().then(() => {
  const httpServer = createServer(handle);
  const io = new Server(httpServer);

  io.on("connection", (socket) => {
    console.log("Connected:", socket.id);

    socket.on("create-room", ({ roomId, nickname }) => {
      if (rooms.has(roomId))
        return socket.emit("error", { message: "Room exists" });
      const room: RoomData = {
        roomId,
        owner: nickname,
        roomStatus: "waiting",
        participants: [nickname],
        _pastGames: [],
      };
      rooms.set(roomId, room);
      nicknames.set(socket.id, nickname);
      socket.join(roomId);
      socket.emit("room-created", room);
    });

    socket.on("join-room", ({ roomId, nickname }) => {
      const room = rooms.get(roomId);
      if (!room) return socket.emit("error", { message: "Room not found" });
      if (!room.participants.includes(nickname))
        room.participants.push(nickname);
      nicknames.set(socket.id, nickname);
      socket.join(roomId);
      io.to(roomId).emit("user-join", { nickname });
    });

    socket.on("start-game", ({ roomId }) => {
      const room = rooms.get(roomId);
      if (!room || room.roomStatus !== "waiting") return;
      startRound(io, roomId);
    });

    socket.on("answer", ({ roomId }) => {
      const room = rooms.get(roomId);
      const nickname = nicknames.get(socket.id);
      if (!room || !room.currentGame || !nickname) return;

      const { answered, drawer, type } = room.currentGame;
      if (answered.includes(nickname)) return;
      if (type === "drawing" && nickname === drawer) return;

      answered.push(nickname);
      io.to(roomId).emit("user-answered", { nickname });

      const requiredPlayers =
        type === "drawing"
          ? room.participants.filter((p) => p !== drawer)
          : room.participants;

      if (answered.length >= requiredPlayers.length) finishRound(io, roomId);
    });

    socket.on("disconnect", () => {
      const nickname = nicknames.get(socket.id);
      if (!nickname) return;
      nicknames.delete(socket.id);
      console.log(`Disconnected: ${nickname}`);
    });
  });

  httpServer.listen(port, () => {
    console.log(`Server running at http://${hostname}:${port}`);
  });
});
