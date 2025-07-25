import React, { Fragment } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import ItemComponent from "./item.component";

interface SortableItemProps {
  id: string;
}

export default function SortableItem(props: SortableItemProps) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: props.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <Fragment>
      <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
        <ItemComponent id={props.id} />
      </div>
    </Fragment>
  );
}
