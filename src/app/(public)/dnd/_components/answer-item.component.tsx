import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { usePageStorage } from "../_storage/page.storage";
import { useMemo } from "react";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import Image from "next/image";

interface AnswerItemProps {
  id: string;
  index: number;
}

export default function AnswerItemComponent({ id, index }: AnswerItemProps) {
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
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <AnswerItem index={index} id={id} />
    </div>
  );
}

export function AnswerItem(props: AnswerItemProps) {
  const { id } = props;
  const { getItem } = usePageStorage();

  const item = getItem(id);

  const renderFooter = useMemo(() => {
    if (!item) return "Drop jawabanmu";

    return item.title;
  }, [item]);

  return (
    <Card className="gap-0 p-0">
      <CardContent className="flex min-h-48 p-0">
        <Image
          src={item?.image ?? "/assets/dot-pattern.png"}
          alt="image"
          height={240}
          width={240}
          className="h-48 w-full object-cover"
        />
      </CardContent>
      <CardFooter className="flex justify-center py-2">
        <h4 className="text-center text-sm font-semibold">{renderFooter}</h4>
      </CardFooter>
    </Card>
  );
}
