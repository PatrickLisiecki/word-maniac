"use client";
import React from "react";
import ModeToggle from "./ModeToggle";

export default function Header() {
  return (
    <header className="w-full min-h-[50px] p-4 border-b border-gray-200">
      <div className="w-full px-36 flex items-center justify-between">
        <span className="scroll-m-20 text-3xl font-semibold tracking-tight">
          Word Maniac
        </span>
        <ModeToggle />
      </div>
    </header>
  );
}
