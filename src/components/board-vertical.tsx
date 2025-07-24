import React from "react";
import { Avatar, AvatarFallback } from "./ui/avatar";

interface BoardVerticalProps {
  index: number;
}

export default function BoardVertical({ index }: BoardVerticalProps) {
  return (
    <div
      className="border-foreground border-2 bg-white p-4 shadow-[8px_8px_0_0_var(--warning)]"
      key={index}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h4 className="text-2xl font-bold">{index + 1}</h4>
          <Avatar className="bg-main size-10">
            <AvatarFallback className="bg-main text-xl text-white">
              A
            </AvatarFallback>
          </Avatar>
          <p className="text-lg font-medium">Aliando</p>
        </div>
        <div className="flex items-center gap-2">
          <p className="text-lg font-bold">100pts</p>
        </div>
      </div>
    </div>
  );
}
