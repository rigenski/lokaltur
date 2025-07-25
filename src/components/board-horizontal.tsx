import { cn } from "@/utils/classname";
import React from "react";
import { Avatar, AvatarFallback } from "./ui/avatar";

interface BoardHorizontalProps {
  index: number;
  item: {
    id: number;
    name: string;
    point: number;
  };
}

export default function BoardHorizontal({ index, item }: BoardHorizontalProps) {
  return (
    <div
      className="flex h-full flex-col items-center justify-end gap-4"
      key={index}
    >
      <div className="relative flex flex-col items-center gap-2">
        <Avatar className="bg-main size-24">
          <AvatarFallback className="bg-main text-3xl text-white">
            {item?.name?.charAt(0)}
          </AvatarFallback>
        </Avatar>
        <p className="text-xl font-medium">{item?.name}</p>
        <div className="absolute -top-8 left-1/2 -translate-x-1/2">
          <div
            className={cn(
              "border-foreground flex h-12 w-12 items-center justify-center rounded-full border-2",
              index === 0 && "bg-amber-600",
              index === 1 && "bg-yellow-400",
              index === 2 && "bg-gray-400",
            )}
          >
            <p className="text-2xl font-bold text-white">
              {index === 0 && "3"}
              {index === 1 && "1"}
              {index === 2 && "2"}
            </p>
          </div>
        </div>
      </div>
      <div
        className={cn(
          `border-foreground h-16 w-full border-2 bg-white p-4 shadow-[8px_8px_0_0_var(--warning)]`,
          index === 0 && "h-16",
          index === 1 && "h-40",
          index === 2 && "h-28",
        )}
      >
        <div className="flex flex-col items-center justify-between">
          <p className="text-lg font-bold">{item?.point}pts</p>
        </div>
      </div>
    </div>
  );
}
