import { useDroppable } from "@dnd-kit/core";
import { SortableContext } from "@dnd-kit/sortable";
import React from "react";
import { Card } from "@/components/ui/card";
import SortableItem from "./sortable-item.component";
import AnswerItemComponent from "./answer-item.component";

interface AnswerContainerProps {
  items: string[];
}

export default function AnswerContainer({ items }: AnswerContainerProps) {
  return (
    <Card className="p-4">
      <SortableContext id="answer" items={items}>
        <div className="flex justify-between gap-4">
          {items.map((id) => (
            <AnswerDroppable key={id} id={id} item={id} />
          ))}
        </div>
      </SortableContext>
    </Card>
  );
}

interface AnswerDroppableProps {
  id: string;
  item?: string;
}

export function AnswerDroppable({ id, item }: AnswerDroppableProps) {
  const { setNodeRef } = useDroppable({ id });

  return (
    <div ref={setNodeRef}>
      <AnswerItemComponent id={id} />
    </div>
  );
}
