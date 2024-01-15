import React from "react";

interface WordListProps {
  validWords: Array<string>;
}

export default function WordList({ validWords }: WordListProps) {
  return (
    <div className="w-full border-t border-gray-400 flex flex-col items-center">
      <div className="w-full text-center my-2">
        <span className="text-2xl font-semibold tracking-tight">Word Bank</span>
      </div>
      <div className="w-full px-12 grid grid-cols-3 gap-2 place-items-center overflow-auto">
        {validWords.length > 0 &&
          validWords.map((word: any, index: number) => {
            return (
              <span key={index} className="text-xl text-black dark:text-white">
                {word}
              </span>
            );
          })}
      </div>
    </div>
  );
}
