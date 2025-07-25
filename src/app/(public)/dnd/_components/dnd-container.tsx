import React from "react";
import { useDroppable } from "@dnd-kit/core";
import { SortableContext } from "@dnd-kit/sortable";
import SortableItem from "./sortable-item.component";

interface ContainerProps {
  id: string;
  items: string[];
}

export default function DNDContainer({ id, items }: ContainerProps) {
  const { setNodeRef } = useDroppable({
    id,
  });

  return (
    <SortableContext id={id} items={items}>
      <div className="mb-24 grid grid-cols-6 gap-4" ref={setNodeRef}>
        {items.map((id) => (
          <div className="col-span-1" key={id}>
            <SortableItem key={id} id={id} />
          </div>
        ))}
      </div>
    </SortableContext>
  );
}
