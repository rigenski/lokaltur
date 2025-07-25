import Image from "next/image";
import React from "react";
import BoardVertical from "./board-vertical";
import users from "../data/user.json";

export default function Leaderboard() {
  return (
    <div>
      <div className="flex justify-start">
        <div className="relative mb-4">
          <h2
            className="text-main text-2xl font-bold text-nowrap"
            style={{
              WebkitTextStroke: "1px var(--foreground)",
            }}
          >
            SKOR SEMENTARA
          </h2>
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
        {users.map((user) => (
          <BoardVertical index={user.id} key={user.id} item={user} />
        ))}
      </div>
    </div>
  );
}
