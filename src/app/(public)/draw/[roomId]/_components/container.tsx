"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import Leaderboard from "@/components/leaderboar";
import { MOCK_CHANNEL, createClient } from "@/utils/supabase";
import { DrawingArea } from "./drawing-area";
import { DrawingGuesses } from "./drawing-guesses";
import { useGame } from "../../_hooks/use-game";

export default function Container() {
  const { players, testUpdateState } = useGame();

  return (
    <section className="mx-auto flex h-svh min-h-svh items-center justify-center p-8">
      <div className="grid size-full grid-cols-1 gap-8 sm:grid-cols-2 xl:grid-cols-[minmax(0,_300px)_1fr_minmax(0,_300px)]">
        {/* <Leaderboard /> */}
        <div className="flex flex-col gap-2">
          {players.map((player) => (
            <div
              className=""
              key={player.id}
              onClick={() => testUpdateState(player.id, { name: "something" })}
            >
              {player.id} - name: {player.name}
            </div>
          ))}
        </div>
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
              {"K___S".split("").map((c, i) => (
                <span key={i}>{c}</span>
              ))}
            </div>
          </CardContent>
        </Card>

        <DrawingGuesses />
      </div>
    </section>
  );
}
