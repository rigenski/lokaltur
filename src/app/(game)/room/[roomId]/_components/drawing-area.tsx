import { Card } from "@/components/ui/card";
import { DrawingCanvas } from "./drawing-canvas";

export function DrawingArea() {
  return (
    <Card className="col-span-full min-h-96 bg-white p-0 xl:col-span-1 xl:row-span-2">
      <DrawingCanvas />
    </Card>
  );
}
