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
    <Card className="flex-1 gap-0 p-0">
      <CardContent className="flex min-h-48 p-0">
        <Image
          src={item.image}
          alt={item.title}
          width={240}
          height={240}
          className="h-48 w-full object-cover"
        />
      </CardContent>
      <CardFooter className="flex justify-center py-2">
        <h4 className="text-center text-sm font-semibold">{item.title}</h4>
      </CardFooter>
    </Card>
  );
}
