import React from "react";

export default function Logo() {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="relative -rotate-4">
        <h2
          className="font-gaeilge-kids text-8xl text-black"
          style={{
            WebkitTextStroke: "1px var(--foreground)",
          }}
        >
          lokaltur
        </h2>
        <div className="absolute -top-1 left-1">
          <h2
            className="font-gaeilge-kids text-warning text-8xl"
            style={{
              WebkitTextStroke: "1px var(--foreground)",
            }}
          >
            lokaltur
          </h2>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <p className="text-lg font-semibold">
          Jelajahi budayamu dengan bermain
        </p>
      </div>
    </div>
  );
}
