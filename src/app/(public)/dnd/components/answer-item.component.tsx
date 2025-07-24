import { Card } from "@/components/ui/card";
import { cn } from "@/utils/classname";
import { usePageStorage } from "../storage/page.storage";
import { useMemo } from "react";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";

interface AnswerItemProps {
  id: string;
}

export default function AnswerItemComponent({ id }: AnswerItemProps) {
  const { getItem } = usePageStorage();
  const item = getItem(id);

  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id,
    disabled: !item,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
        <AnswerItem id={id} />
      </div>

      <span className="text-lg text-gray-500">Daerah</span>
    </div>
  );
}

export function AnswerItem(props: AnswerItemProps) {
  const { id } = props;
  const { getItem } = usePageStorage();
  const item = getItem(id);

  const renderItem = useMemo(() => {
    if (!item) {
      return <p>Drop your answers here.</p>;
    }
    return (
      <div className="relative">
        <img
          className="size-full"
          src="https://placehold.co/400"
          alt="placeholder"
        />
        <h3 className="absolute bottom-6 w-full translate-y-1/2">
          {item.title}
        </h3>
      </div>
    );
  }, [item]);

  return (
    <Card className="flex size-[250px] items-center justify-center py-0 text-center">
      {renderItem}
    </Card>
  );
}
