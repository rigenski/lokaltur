import { createContext, useContext, useRef } from "react";
import { createStore, useStore } from "zustand";
import { moveObjectEntry } from "../_utils/util";

interface PageProps {
  _items: DraggableItem[];
  // Define the state and actions for the page storage
  items: { [key: string]: DraggableItem | undefined };

  options: string[];
  answers: string[];

  answerInformations: AnswerInformation[];

  activeId?: string | null;
}

interface PageStorage extends PageProps {
  moveItem: (fromIndex: number, toIndex: number) => void;
  switchItem: (from: string, to: string) => void;
  getItem: (id: string) => DraggableItem | undefined;
  setOptions: (options: string[]) => void;
  setAnswers: (answers: string[]) => void;
  setActiveId: (id: string | undefined) => void;
  getAnswerInformationByIndex: (index: number) => AnswerInformation | undefined;
}

type PageStore = ReturnType<typeof createPageStorage>;

export const BearContext = createContext<PageStore | null>(null);

interface InitialState {
  items: DraggableItem[];
  answerInformations: AnswerInformation[];
  totalAnswers: number;
}

const createPageStorage = (initialState: InitialState) => {
  const { items, totalAnswers } = initialState;

  const mappedItems: { [key: string]: DraggableItem } = items.reduce(
    (acc, item) => {
      acc[item.id] = item;
      return acc;
    },
    {} as { [key: string]: DraggableItem },
  );

  return createStore<PageStorage>((set, get) => ({
    _items: items,
    items: mappedItems,
    options: items.map((item) => item.id),
    answers: Array.from({ length: totalAnswers }, (_, i) => `answer-${i + 1}`),
    answerInformations: initialState.answerInformations,

    // Set the activeId to undefined to clear it
    activeId: undefined,

    getAnswerInformationByIndex: (index: number) => {
      return get().answerInformations?.[index];
    },

    getItem: (id) => {
      return get().items[id];
    },
    moveItem: (fromIndex, toIndex) => {
      const items = get().items;
      const newItems = moveObjectEntry(items, fromIndex, toIndex);

      set({ items: newItems });
    },
    switchItem: (from, to) => {
      const items = get().items;
      const fromItem = items[from];
      const toItem = items[to];

      // Swap the items in the storage
      set((state) => {
        const newItems = { ...state.items };
        newItems[from] = toItem;
        newItems[to] = fromItem;
        return { items: newItems };
      });
    },
    setOptions: (options) => set({ options }),
    setAnswers: (answers) => set({ answers }),
    setActiveId: (id) => set({ activeId: id }),
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
