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
    <div className="flex flex-col items-center gap-4">
      <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
        <AnswerItem index={index} id={id} />
      </div>
    </div>
  );
}

export function AnswerItem(props: AnswerItemProps) {
  const { id } = props;
  const { getItem, getAnswerInformationByIndex } = usePageStorage();

  const answerItems = getAnswerInformationByIndex(props.index);
  const item = getItem(id);

  const renderItem = useMemo(() => {
    return (
      <Card className="gap-0 p-0">
        <CardContent className="p-0">
          <Image
            src="https://placehold.co/400"
            alt=""
            height={240}
            width={240}
            className="size-full object-cover"
          />
        </CardContent>
        <CardFooter className="flex justify-center py-2">
          <h4 className="text-center text-sm font-semibold">
            {item?.title ?? answerItems?.target}
          </h4>
        </CardFooter>
      </Card>
    );
  }, [answerItems, item]);

  if (answerItems) {
    return <>{renderItem}</>;
  }

  return (
    <Card className="gap-0 p-0">
      <CardContent className="p-0">
        <Image
          src="https://placehold.co/400"
          alt=""
          height={240}
          width={240}
          className="size-full object-cover"
        />
      </CardContent>
      <CardFooter className="flex justify-center py-2">
        <h4 className="text-center text-sm font-semibold">
          Drop your answers here.
        </h4>
      </CardFooter>
    </Card>
  );
}
