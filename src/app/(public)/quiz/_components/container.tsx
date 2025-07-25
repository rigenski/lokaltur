"use client";

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
                <div className="relative -rotate-2">
                  <h2 className="text-foreground font-gaeilge-kids text-7xl">
                    tebak
                  </h2>
                  <div className="absolute -top-[4px] left-[4px]">
                    <h2
                      className="text-success font-gaeilge-kids text-7xl"
                      style={{
                        WebkitTextStroke: "0.5px var(--foreground)",
                      }}
                    >
                      tebak
                    </h2>
                  </div>
                </div>
                <div className="relative -translate-x-16 translate-y-16 rotate-4">
                  <h2 className="text-foreground font-gaeilge-kids text-7xl">
                    berhadiah
                  </h2>
                  <div className="absolute -top-[4px] right-[4px]">
                    <h2
                      className="text-secondary font-gaeilge-kids text-7xl"
                      style={{
                        WebkitTextStroke: "0.5px var(--foreground)",
                      }}
                    >
                      berhadiah
                    </h2>
                  </div>
                </div>
              </div>
            </div>
            <div className="border-foreground h-[calc(100vh-240px)] w-full">
              <div className="grid h-full w-full grid-cols-4 gap-8">
                <div className="col-span-1">
                  <Leaderboard />
                </div>
                <div className="col-span-3">
                  <div className="flex flex-col gap-8">
                    <div className="flex w-full border-2 bg-white bg-[url('/assets/circular-bg.png')] bg-cover bg-center p-8 shadow-[8px_8px_0_0_var(--secondary)]">
                      <div className="flex flex-col items-start gap-2">
                        <Image
                          src="/assets/quiz/rendang.jpg"
                          alt="question"
                          width={480}
                          height={480}
                          className="h-32 w-auto"
                        />

                        <p className="text-2xl font-bold">
                          Makanan tradisional dari Padang yang terkenal dengan
                          kuah santan kental adalah?
                        </p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-8">
                      <div className="col-span-1">
                        <Button className="bg-secondary text-foreground h-24 w-full rounded-2xl px-16 text-2xl font-bold">
                          <span>Rendang</span>
                        </Button>
                      </div>
                      <div className="col-span-1">
                        <Button className="bg-main text-foreground h-24 w-full rounded-2xl px-16 text-2xl font-bold">
                          <span>Gulai</span>
                        </Button>
                      </div>
                      <div className="col-span-1">
                        <Button className="bg-warning text-foreground h-24 w-full rounded-2xl px-16 text-2xl font-bold">
                          <span>Sate</span>
                        </Button>
                      </div>
                      <div className="col-span-1">
                        <Button className="bg-success text-foreground h-24 w-full rounded-2xl px-16 text-2xl font-bold">
                          <span>Nasi Goreng</span>
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
