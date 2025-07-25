"use client";

import BoardHorizontal from "@/components/board-horizontal";
import BoardVertical from "@/components/board-vertical";
import Leaderboard from "@/components/leaderboar";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Container() {
  return (
    <main className="h-screen w-full">
      <section>
        <div className="mx-auto max-w-[90%] pt-10">
          <div className="w-full">
            <div className="flex h-40 items-center justify-center">
              <div className="flex -translate-y-8 items-center">
                <div className="relative rotate-4">
                  <h2 className="text-foreground font-gaeilge-kids text-7xl">
                    nungguin
                  </h2>
                  <div className="absolute -top-[4px] left-[4px]">
                    <h2
                      className="text-main font-gaeilge-kids text-7xl"
                      style={{
                        WebkitTextStroke: "0.5px var(--foreground)",
                      }}
                    >
                      nungguin
                    </h2>
                  </div>
                </div>
                <div className="relative -translate-x-16 translate-y-16 rotate-2">
                  <h2 className="text-foreground font-gaeilge-kids text-7xl">
                    temen
                  </h2>
                  <div className="absolute -top-[4px] right-[4px]">
                    <h2
                      className="text-warning font-gaeilge-kids text-7xl"
                      style={{
                        WebkitTextStroke: "0.5px var(--foreground)",
                      }}
                    >
                      temen
                    </h2>
                  </div>
                </div>
              </div>
            </div>
            <div className="mx-auto h-[calc(100vh-240px)] max-w-[640px]">
              <div className="flex h-full w-full flex-col items-center justify-center">
                <div className="mb-12 grid w-full grid-cols-2 gap-4">
                  {Array.from({ length: 6 }).map((_, index) => (
                    <div className="col-span-1" key={index}>
                      <BoardVertical index={index} isShowPoint={false} />
                    </div>
                  ))}
                </div>
                <div className="flex items-center justify-center gap-8">
                  <Button className="bg-secondary text-foreground h-16 rounded-full px-16 text-2xl font-bold">
                    Beranda
                  </Button>
                  <Button className="bg-main h-16 rounded-full px-16 text-2xl font-bold">
                    Siap (4/6)
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
