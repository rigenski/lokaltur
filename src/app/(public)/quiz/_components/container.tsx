"use client";

import Leaderboard from "@/components/leaderboar";
import Logo from "@/components/logo";
import { Button } from "@/components/ui/button";
import { LightbulbIcon } from "lucide-react";
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
              <div className="grid h-full w-full grid-cols-7 gap-8">
                <div className="col-span-2">
                  <Leaderboard />
                </div>
                <div className="col-span-5">
                  <div className="flex flex-col gap-8">
                    <div className="flex w-full border-2 bg-white bg-[url('/assets/circular-bg.png')] bg-cover bg-center p-8 shadow-[8px_8px_0_0_var(--secondary)]">
                      <div className="flex flex-col items-start gap-2">
                        <Image
                          src="https://nowbuzz.co.id/wp-content/uploads/2023/05/6.jpeg"
                          alt="question"
                          width={480}
                          height={480}
                          className="h-32 w-auto"
                        />

                        <p className="text-2xl font-bold">
                          Berikut ini merupakan rumah adat dari daerah mana?
                        </p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-8">
                      <div className="col-span-1">
                        <Button className="bg-secondary text-foreground h-24 w-full rounded-2xl px-16 text-2xl font-bold">
                          <span>Keris</span>
                        </Button>
                      </div>
                      <div className="col-span-1">
                        <Button className="bg-main text-foreground h-24 w-full rounded-2xl px-16 text-2xl font-bold">
                          <span>Batu</span>
                        </Button>
                      </div>
                      <div className="col-span-1">
                        <Button className="bg-warning text-foreground h-24 w-full rounded-2xl px-16 text-2xl font-bold">
                          <span>Budha</span>
                        </Button>
                      </div>
                      <div className="col-span-1">
                        <Button className="bg-success text-foreground h-24 w-full rounded-2xl px-16 text-2xl font-bold">
                          <span>Lombong</span>
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
