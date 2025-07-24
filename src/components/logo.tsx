import React from "react";

export default function Logo() {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="relative -rotate-4">
        <h2
          className="font-gaeilge-kids text-7xl text-black"
          style={{
            WebkitTextStroke: "1px var(--foreground)",
          }}
        >
          lokaltur
        </h2>
        <div className="absolute -top-1 left-1">
          <h2
            className="font-gaeilge-kids text-warning text-7xl"
            style={{
              WebkitTextStroke: "1px var(--foreground)",
            }}
          >
            lokaltur
          </h2>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <p className="text-xl font-semibold">Belajar dengan </p>
        <div className="relative">
          <h2
            className="text-2xl text-black"
            style={{
              WebkitTextStroke: "0.5px var(--foreground)",
            }}
          >
            BERMAIN
          </h2>
          <div className="absolute -top-[2px] left-[1px]">
            <h2
              className="text-secondary text-2xl"
              style={{
                WebkitTextStroke: "0.5px var(--foreground)",
              }}
            >
              BERMAIN
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
}
