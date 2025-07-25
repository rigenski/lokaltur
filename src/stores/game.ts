import { create } from "zustand";

export type Question =
  | {
      type: "quiz";
      q: string;
      a: string;
      choices: string[];
    }
  | {
      type: "drawing";
      q: string;
      a: string;
      isDrawer: boolean;
      drawingData?: Array<{ x: number; y: number }>;
    };

export type Player = {
  id: string;
  name: string;
  questions: Question[];
};

interface GameState {
  currentQuestion: number;
  playerIdTurn: Player["id"] | null;
  players: Player[];
  updatePlayers: (players: Player[]) => void;
  updateCurrentQuestion: () => void;
}

export const useGameStore = create<GameState>((set) => ({
  players: [],
  updatePlayers: (players) => set(() => ({ players })),

  playerIdTurn: null,
  currentQuestion: 0,
  updateCurrentQuestion: () =>
    set((state) => ({ currentQuestion: state.currentQuestion + 1 })),
}));
