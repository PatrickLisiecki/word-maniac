"use client";
import React from "react";
import ModeToggle from "./ModeToggle";

export default function Navbar() {
  return (
    <div className="w-full bg-gray-200 min-h-50px p-4 flex justify-between items-center">
      Navbar
      <ModeToggle />
    </div>
  );
}
