import React from "react";

interface TimerProps {
  time: number;
}

export default function Timer({ time }: TimerProps) {
  return (
    <div className="w-full min-h-[60px] grid place-items-center">
      <span className="scroll-m-20 text-2xl font-semibold tracking-tight text-red-500">
        {time} seconds
      </span>
    </div>
  );
}
