import { useDroppable } from "@dnd-kit/core";
import { SortableContext } from "@dnd-kit/sortable";
import { usePageStorage } from "../_storage/page.storage";
import AnswerItemComponent from "./answer-item.component";

interface AnswerContainerProps {
  items: string[];
}

export default function AnswerContainer({ items }: AnswerContainerProps) {
  return (
    <SortableContext id="answer" items={items}>
      <div className="grid grid-cols-6 gap-4">
        {items.map((id, index) => (
          <AnswerDroppable key={id} id={id} item={id} index={index} />
        ))}
      </div>
    </SortableContext>
  );
}

interface AnswerDroppableProps {
  id: string;
  item?: string;
  index: number;
}

export function AnswerDroppable({ id, index }: AnswerDroppableProps) {
  const { getAnswerInformationByIndex } = usePageStorage();
  const { setNodeRef } = useDroppable({ id });

  const answerInformation = getAnswerInformationByIndex(index);

  return (
    <div className="flex flex-col gap-y-2">
      <div className="col-span-1" ref={setNodeRef}>
        <AnswerItemComponent index={index} id={id} />
      </div>
      <p className="text-center">{answerInformation?.target}</p>
    </div>
  );
}
