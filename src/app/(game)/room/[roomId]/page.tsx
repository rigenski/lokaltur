import Image from "next/image";
import { Card, CardTitle, CardContent } from "@/components/ui/card";
import { Leaderboards } from "./_components/leaderboards";
import { DrawingArea } from "./_components/drawing-area";
import { DrawingGuesses } from "./_components/drawing-guesses";

export default function GameRoom() {
  return (
    <section className="mx-auto flex h-svh min-h-svh items-center justify-center p-8">
      <div className="grid size-full grid-cols-1 gap-8 sm:grid-cols-2 xl:grid-cols-[minmax(0,_300px)_1fr_minmax(0,_300px)]">
        <Leaderboards />
        <DrawingArea />

        {/* Hint */}
        <Card className="sm:col-span-1 xl:col-start-3 xl:row-start-1">
          <CardContent className="flex flex-col items-center justify-center gap-6">
            <CardTitle>Petunjuk</CardTitle>
            <Image
              src="https://placehold.co/200x200"
              alt=""
              width={200}
              height={200}
              className="rounded-base"
            />
            <div className="inline-flex items-center gap-2 text-xl font-bold">
              {"K___S".split("").map((c) => (
                <span key={c}>{c}</span>
              ))}
            </div>
          </CardContent>
        </Card>

        <DrawingGuesses />
      </div>
    </section>
  );
}
