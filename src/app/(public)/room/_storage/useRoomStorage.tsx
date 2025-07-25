import { createContext, useContext, useRef } from "react";
import { createStore, useStore } from "zustand";
import dnd from "../../../../data/drag-n-drop.json";
import drawing from "../../../../data/drawing.json";
import quiz from "../../../../data/quiz.json";

type DndQuestion = (typeof dnd)[number];
type DrawingQuestion = (typeof drawing)[number];
type QuizQuestion = (typeof quiz)[number];

type Question = DndQuestion | DrawingQuestion | QuizQuestion;

interface PageProps {
  nickname: string;
  roomId: string;
  roomStatus: "waiting" | "playing" | "finished";
  currentGame?: {
    status: "waiting" | "playing" | "finished";
    type: "dnd" | "quiz" | "drawing";
    question: Question;
  };
}

interface PageStorage extends PageProps {
  setCurrentGame: (game: PageProps["currentGame"]) => void;
}

type PageStore = ReturnType<typeof createPageStorage>;

export const BearContext = createContext<PageStore | null>(null);

interface InitialState {
  nickname: string;
  roomId: string;
  roomStatus: "waiting" | "playing" | "finished";
}

const createPageStorage = (initialState: InitialState) => {
  return createStore<PageStorage>()((set) => ({
    ...initialState,
    setCurrentGame: (game) => set({ currentGame: game }),
  }));
};

type PageProviderProps = React.PropsWithChildren<InitialState>;

export function PageProvider({ children, ...props }: PageProviderProps) {
  const storeRef = useRef<PageStore>(null);
  if (!storeRef.current) {
    storeRef.current = createPageStorage(props);
  }
  return (
    <BearContext.Provider value={storeRef.current}>
      {children}
    </BearContext.Provider>
  );
}

export function usePageStorage() {
  const context = useContext(BearContext);
  if (!context) {
    throw new Error("usePageStorage must be used within a PageProvider");
  }

  return useStore(context);
}
