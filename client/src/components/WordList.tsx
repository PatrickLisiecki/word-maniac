import React from "react";

interface WordListProps {
  validWords: Array<string>;
}

export default function WordList({ validWords }: WordListProps) {
  return (
    <div className="min-h-[50px] p-4 flex flex-col items-center">
      <div className="w-full border-b border-gray-400 text-center">
        <span className="scroll-m-20 text-2xl font-semibold tracking-tight">
          Word Bank
        </span>
      </div>
      {validWords.length > 0 &&
        validWords.map((word: any, index: number) => {
          return (
            <span key={index} className="text-md text-black">
              {word}
            </span>
          );
        })}
    </div>
  );
}
