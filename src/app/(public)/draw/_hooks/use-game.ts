import { useEffect, useRef, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import { type RealtimeChannel } from "@supabase/supabase-js";
import { createClient } from "@/utils/supabase";
import { useGameStore, type Question, type Player } from "@/stores/game";

const supabase = createClient();

const mockQuestions: Question[] = [
  {
    type: "quiz",
    q: "Siapakah Rafki?",
    a: "Anomali",
    choices: ["Anomali", "Crocodilo Bombardion", "Kodomo", "Baratayudha"],
  },
  {
    type: "drawing",
    q: "K_N__L",
    a: "KENTAL",
    isDrawer: false,
  },
];

export function useGame() {
  //   const [players, setPlayers] = useState<Player[]>([]);
  const players = useGameStore((store) => store.players);
  const setPlayers = useGameStore((store) => store.updatePlayers);
  const roomChannelRef = useRef<RealtimeChannel>(null);

  const params = useParams<{ roomId: string }>();
  const searchParams = useSearchParams();

  const roomId = params.roomId;
  const currentUserId = searchParams.get("userId")!;

  useEffect(() => {
    const roomChannel = supabase.channel(`room:${roomId}`, {
      config: {
        presence: { key: currentUserId },
      },
    });

    roomChannel.on("presence", { event: "sync" }, () => {
      const presenceState = roomChannel.presenceState<Player>();
      const newPlayers = Object.entries(presenceState).map(([k, v]) => {
        return {
          id: k,
          name: v[0].name,
          questions: mockQuestions,
        };
      });

      console.log("user sync: ", newPlayers);
      setPlayers(newPlayers);
    });

    roomChannel.on("presence", { event: "join" }, ({ key, newPresences }) => {
      console.log("user joined: ", { key, newPresences });
    });

    roomChannel.on("presence", { event: "leave" }, ({ key, leftPresences }) => {
      console.log("user left: ", { key, leftPresences });
    });

    roomChannel.subscribe(async (status) => {
      if (status === "SUBSCRIBED") {
        await roomChannel.track({ id: currentUserId });
        console.log("presence tracking started for: ", currentUserId);
      }
    });

    roomChannelRef.current = roomChannel;
  }, [roomId, currentUserId]);

  const testUpdateState = async (
    userId: string,
    payload: Partial<Omit<Player, "id">>,
  ) => {
    await roomChannelRef.current?.track({ id: userId, ...payload });
  };

  return { players, testUpdateState };
}
