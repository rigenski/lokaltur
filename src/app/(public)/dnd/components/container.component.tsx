import React from "react";
import { useDroppable } from "@dnd-kit/core";
import { SortableContext } from "@dnd-kit/sortable";
import SortableItem from "./sortable-item.component";

interface ContainerProps {
  id: string;
  items: string[];
}

export default function ContainerComponent({ id, items }: ContainerProps) {
  const { setNodeRef } = useDroppable({
    id,
  });

  return (
    <SortableContext id={id} items={items}>
      <div className="flex flex-1 flex-wrap gap-4" ref={setNodeRef}>
        {items.map((id) => (
          <SortableItem key={id} id={id} />
        ))}
      </div>
    </SortableContext>
  );
}
