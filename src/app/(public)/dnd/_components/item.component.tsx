import { Card, CardContent, CardFooter } from "@/components/ui/card";
import Image from "next/image";
import { usePageStorage } from "../_storage/page.storage";

interface ItemProps {
  id: string;
}

export default function ItemComponent(props: ItemProps) {
  const { getItem } = usePageStorage();
  const { id } = props;

  const item = getItem(id);

  if (!item) {
    return <p>Item not found.</p>;
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
        <h4 className="text-center text-sm font-semibold">{item.title}</h4>
      </CardFooter>
    </Card>
  );
}
