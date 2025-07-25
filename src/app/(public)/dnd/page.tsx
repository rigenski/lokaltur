"use client";

import Leaderboard from "@/components/leaderboar";
import { Button } from "@/components/ui/button";
import {
  closestCorners,
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
} from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { toast } from "sonner";
import dndQNA from "../../../data/drag-n-drop.json";
import AnswerContainer from "./_components/answer-container.component";
import DNDContainer from "./_components/dnd-container";
import ItemComponent from "./_components/item.component";
import { PageProvider, usePageStorage } from "./_storage/page.storage";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Page() {
  const randomDnD = dndQNA[Math.floor(Math.random() * dndQNA.length)];

  return (
    <PageProvider
      question={randomDnD}
      items={randomDnD.options.map((opt, index) => ({
        id: `options-${index + 1}`,
        image: opt.image,
        title: opt.label,
      }))}
      answerInformations={randomDnD.answer}
      totalAnswers={randomDnD.answer.length}
    >
      <DnD />
    </PageProvider>
  );
}

function DnD() {
  const {
    _question,
    items,
    options,
    answers,
    activeId,
    answerInformations,
    setActiveId,
    setAnswers,
    setOptions,
    moveItem,
    switchItem,
    getItem,
  } = usePageStorage();

  const router = useRouter();

  const findContainer = (item: string) => {
    const index = item.split("-");
    if (index?.[0] === "options") {
      return "options";
    } else if (index?.[0] === "answer") {
      return "answer";
    }
    console.warn(`Container for item ${item} not found.`);
    // If no container is found, return null or handle it as needed
    // This could be an error, or you might want to return a default container

    return null;
  };

  /**
   * Handles the start of a drag event.
   * @param event DragStartEvent
   */
  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;

    setActiveId(active.id as string);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) return;

    const fromContainer = findContainer(active.id as string);
    const toContainer = findContainer(over.id as string);

    // handle switch same container
    const isSameContainer = fromContainer === toContainer;
    const isFromContainerOption = fromContainer === "options";

    if (isSameContainer) {
      const containerItems = isFromContainerOption
        ? [...options]
        : [...answers];
      const activeIndex = containerItems.indexOf(active.id as string);
      const overIndex = containerItems.indexOf(over.id as string);
      const newItems = arrayMove(containerItems, activeIndex, overIndex);
      if (isFromContainerOption) setOptions(newItems);
      else setAnswers(newItems);

      moveItem(activeIndex, overIndex);
    } else {
      const toDragableItem = getItem(over.id as string);
      if (isFromContainerOption) {
        if (!toDragableItem) {
          const newOptions = options.filter((option) => option !== active.id);
          setOptions(newOptions);
        }

        switchItem(active.id as string, over.id as string);
      } else if (!isFromContainerOption) {
        const findUndefinedOption = Object.entries(items).find(
          ([key, value]) => value === undefined,
        );

        const newKey = findUndefinedOption ? findUndefinedOption[0] : undefined;

        if (!newKey) {
          console.warn("No available option to add the item to.");
          return;
        }

        // push new key to options
        const newOptions = [...options, newKey];
        const overIndex = newOptions.indexOf(over.id as string);
        const newItems = arrayMove(
          newOptions,
          newOptions.length - 1,
          overIndex,
        );
        setOptions(newItems);

        switchItem(active.id as string, newKey);
      }
    }
  };

  const onSubmitAnswer = () => {
    const playerAnswer = answers.map((id) => getItem(id)).filter(Boolean);

    if (playerAnswer.length !== answerInformations.length) {
      toast.error("Lengkapi jawabanmu");
      return;
    }

    // TODO:
    return {
      playerAnswer,
      question: _question,
    };
  };

  // useEffect(() => {
  //   const playerAnswer = answers.map((id) => getItem(id)).filter(Boolean);

  //   if (playerAnswer.length < answerInformations.length) {
  //     router.push("/quiz");
  //   }
  // }, [answers, answerInformations]);

  // console.log(answers, answerInformations);

  return (
    <main className="h-screen w-full">
      <section>
        <div className="mx-auto max-w-[90%] pt-10">
          <div className="w-full">
            <div className="flex h-40 items-center justify-center">
              <div className="flex -translate-y-8 items-center">
                <div className="relative -rotate-2">
                  <h2 className="text-foreground font-gaeilge-kids text-7xl">
                    geser
                  </h2>
                  <div className="absolute -top-[4px] left-[4px]">
                    <h2
                      className="text-secondary font-gaeilge-kids text-7xl"
                      style={{
                        WebkitTextStroke: "0.5px var(--foreground)",
                      }}
                    >
                      geser
                    </h2>
                  </div>
                </div>
                <div className="relative -translate-x-16 translate-y-16 rotate-2">
                  <h2 className="text-foreground font-gaeilge-kids text-7xl">
                    pilihanmu
                  </h2>
                  <div className="absolute -top-[4px] right-[4px]">
                    <h2
                      className="text-success font-gaeilge-kids text-7xl"
                      style={{
                        WebkitTextStroke: "0.5px var(--foreground)",
                      }}
                    >
                      pilihanmu
                    </h2>
                  </div>
                </div>
              </div>
            </div>
            <div className="border-foreground h-[calc(100vh-240px)] w-full">
              <div className="grid h-full w-full grid-cols-4 gap-8">
                <div className="col-span-1">
                  <Leaderboard />
                </div>

                <div className="col-span-3">
                  <div className="w-full">
                    <DndContext
                      collisionDetection={closestCorners}
                      onDragStart={handleDragStart}
                      onDragEnd={handleDragEnd}
                    >
                      <DNDContainer id="options" items={options} />
                      <AnswerContainer items={answers} />
                      <DragOverlay>
                        {activeId && activeId.startsWith("options-") ? (
                          <ItemComponent id={activeId} />
                        ) : null}
                      </DragOverlay>
                    </DndContext>
                  </div>

                  {/* <Button onClick={onSubmitAnswer}>Selesai</Button> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
