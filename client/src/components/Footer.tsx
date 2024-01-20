import React from "react";

import { CornersIcon, GitHubLogoIcon } from "@radix-ui/react-icons";

import ModeToggle from "./ui/ModeToggle";

interface FooterProps {
  isExpanded: boolean;
  setIsExpanded: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Footer({ isExpanded, setIsExpanded }: FooterProps) {
  return (
    <div className="flex w-full flex-row space-x-2 p-2">
      {/* Dark Mode Toggle */}
      <ModeToggle />

      {/* Toggle Fullscreen Button */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="inline-flex h-10 w-10 items-center justify-center whitespace-nowrap rounded-md border border-neutral-200 bg-white text-sm font-medium ring-offset-white transition-colors hover:bg-neutral-100 hover:text-neutral-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:border-neutral-800 dark:bg-neutral-950 dark:ring-offset-neutral-950 dark:hover:bg-neutral-800 dark:hover:text-neutral-50 dark:focus-visible:ring-neutral-300"
      >
        <svg
          width="15"
          height="15"
          viewBox="0 0 15 15"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <CornersIcon />
        </svg>
      </button>

      <a
        href="https://github.com/PatrickLisiecki"
        rel="noopener noreferrer"
        target="_blank"
        className="inline-flex h-10 w-10 items-center justify-center whitespace-nowrap rounded-md border border-neutral-200 bg-white text-sm font-medium ring-offset-white transition-colors hover:bg-neutral-100 hover:text-neutral-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:border-neutral-800 dark:bg-neutral-950 dark:ring-offset-neutral-950 dark:hover:bg-neutral-800 dark:hover:text-neutral-50 dark:focus-visible:ring-neutral-300"
      >
        <GitHubLogoIcon />
      </a>
    </div>
  );
}
