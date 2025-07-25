// import { Card } from "@/components/ui/card";
import { Card } from "@/components/ui/card";
import React from "react";

export default function HeaderComponent() {
  return (
    <div className="flex h-40 items-center justify-center">
      <h2
        className="font-gaeilge-kids flex flex-col text-center text-7xl/14 font-bold text-shadow-[4px_4px_0_#000]"
        style={{
          WebkitTextStroke: "0.5px var(--foreground)",
        }}
      >
        <span className="text-warning rotate-1">Drag n&apos;</span>
        <span className="text-secondary -rotate-4">Drop</span>
      </h2>
    </div>
  );
}
