"use client";

import React from "react";
import {
  DndContext,
  closestCorners,
  DragStartEvent,
  DragEndEvent,
  DragOverlay,
} from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import ContainerComponent from "./components/container.component";
import AnswerContainer from "./components/answer-container.component";
import { PageProvider, usePageStorage } from "./storage/page.storage";
import { mockItems, totalAnswers } from "./mock";
import ItemComponent from "./components/item.component";
import HeaderComponent from "./components/header.component";
import LeaderboardComponent from "./components/leaderboard.component";

export default function Page() {
  return (
    <PageProvider items={mockItems} totalAnswers={totalAnswers}>
      <DnD />
    </PageProvider>
  );
}

function DnD() {
  const {
    items,
    options,
    answers,
    activeId,
    setActiveId,
    setAnswers,
    setOptions,
    moveItem,
    switchItem,
    getItem,
  } = usePageStorage();

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

  return (
    <section className="mx flex min-h-dvh flex-col">
      <HeaderComponent />
      <div className="flex h-full w-full gap-12 p-4">
        <LeaderboardComponent />

        <div className="flex flex-1 flex-col gap-12">
          <DndContext
            collisionDetection={closestCorners}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
          >
            <ContainerComponent id="options" items={options} />
            <AnswerContainer items={answers} />
            <DragOverlay>
              {activeId && activeId.startsWith("options-") ? (
                <ItemComponent asOverlay id={activeId} />
              ) : null}
            </DragOverlay>
          </DndContext>
        </div>
      </div>
    </section>
  );
}
