import { Card } from "@/components/ui/card";
import { cn } from "@/utils/classname";
import { usePageStorage } from "../storage/page.storage";
import { useMemo } from "react";

interface ItemProps {
  id: string;
  asOverlay?: boolean;
}

export default function ItemComponent(props: ItemProps) {
  const { getItem } = usePageStorage();
  const { id, asOverlay } = props;

  const item = getItem(id);

  if (!item) {
    return <p>Item not found.</p>;
  }

  return (
    <Card
      className={cn(
        "w-[200px] bg-white py-0 text-center transition-transform duration-200 hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0px_0px_#000]",
        { "opacity-50": asOverlay },
      )}
    >
      <div>
        <img
          style={{ objectFit: "cover" }}
          className="size-full"
          src="https://placehold.co/400"
          alt="placeholder"
        />
        <h3 className="py-2 text-lg font-semibold">{item.title}</h3>
      </div>
    </Card>
  );
}
