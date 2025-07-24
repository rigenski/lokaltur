import Image from "next/image";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function GameRoom() {
  return (
    <section className="mx-auto flex min-h-svh w-[95%] items-center justify-center">
      <div className="grid w-full grid-cols-1 gap-8 p-4 sm:grid-cols-2 xl:grid-cols-[minmax(0,_250px)_1fr_minmax(0,_250px)]">
        {/* Leaderboard */}
        <Card className="col-span-full xl:col-span-1 xl:row-span-2">
          <CardContent className="flex flex-col gap-6">
            <CardTitle>Papan Peringkat</CardTitle>
            <div className="inline-flex items-center gap-4">
              <Avatar className="overflow-visible">
                <Badge
                  variant="neutral"
                  className="absolute -top-4 left-1/2 -translate-x-1/2"
                >
                  1
                </Badge>
                <AvatarFallback>AM</AvatarFallback>
              </Avatar>
              <div className="space-y-0.5">
                <p>Mister Potato</p>
                <p>90 pts</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Drawing Area */}
        <Card className="col-span-full min-h-96 xl:col-span-1 xl:row-span-2">
          <CardContent>
            <p>Something will be in here</p>
          </CardContent>
        </Card>

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
          </CardContent>
        </Card>

        {/* Answer */}
        <Card className="sm:col-span-1 xl:col-start-3 xl:row-start-2">
          <CardContent className="flex flex-col gap-6">
            <CardTitle>Tebakan</CardTitle>
            <div className="flex max-h-40 flex-col gap-2 overflow-y-auto">
              {[...Array(50).keys()].map((i) => (
                <div className="inline-flex items-center gap-2" key={i}>
                  <span>Mister Potato:</span>
                  <span>javanese kris batik</span>
                </div>
              ))}
            </div>

            <Input type="text" placeholder="Masukkan jawaban kamu . . ." />
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
