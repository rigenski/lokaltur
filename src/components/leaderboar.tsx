import Image from "next/image";
import React from "react";
import BoardVertical from "./board-vertical";

export default function Leaderboard() {
  return (
    <div>
      <div className="flex justify-start">
        <div className="relative mb-4">
          <h2
            className="text-3xl text-nowrap text-black"
            style={{
              WebkitTextStroke: "0.5px var(--foreground)",
            }}
          >
            Skor Sementara
          </h2>
          <div className="absolute top-[2px] left-[1px]">
            <h2
              className="text-success text-3xl text-nowrap"
              style={{
                WebkitTextStroke: "0.5px var(--foreground)",
              }}
            >
              Skor Sementara
            </h2>
          </div>
          <div className="absolute -top-2 -right-6">
            <Image
              src="/assets/line-skor.png"
              alt="line-skor"
              width={240}
              height={240}
              className="h-6 w-auto"
            />
          </div>
        </div>
      </div>
      <div className="flex h-full flex-col justify-start gap-4">
        {Array.from({ length: 6 }).map((_, index) => (
          <BoardVertical index={index} key={index} />
        ))}
      </div>
    </div>
  );
}
