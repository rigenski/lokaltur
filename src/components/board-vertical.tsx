import React from "react";
import { Avatar, AvatarFallback } from "./ui/avatar";

interface BoardVerticalProps {
  index: number;
  item: {
    id: number;
    name: string;
    point: number;
  };
  isShowPoint?: boolean;
}

export default function BoardVertical({
  index,
  isShowPoint = true,
  item,
}: BoardVerticalProps) {
  return (
    <div
      className="border-foreground w-full border-2 bg-white p-4 shadow-[8px_8px_0_0_var(--warning)]"
      key={index}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h4 className="text-2xl font-bold">{item?.id}</h4>
          <Avatar className="bg-main size-10">
            <AvatarFallback className="bg-main text-xl text-white">
              {item?.name?.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <p className="text-lg font-medium">{item?.name}</p>
        </div>
        {isShowPoint && (
          <div className="flex items-center gap-2">
            <p className="text-lg font-bold">{item?.point}pts</p>
          </div>
        )}
      </div>
    </div>
  );
}
