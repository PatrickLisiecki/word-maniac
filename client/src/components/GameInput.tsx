import React from "react";

interface GameInputProps {
  currentWord: string;
  setCurrentWord: React.Dispatch<React.SetStateAction<string>>;
  handleWordSubmit: React.FormEventHandler<HTMLFormElement>;
}

export default function GameInput({
  currentWord,
  setCurrentWord,
  handleWordSubmit,
}: GameInputProps) {
  return (
    <form
      onSubmit={handleWordSubmit}
      className="p-4 flex flex-col items-center"
    >
      {/* Word Input */}
      <div className="w-full min-h-[40px] flex flex-col justify-center relative">
        <input
          type="text"
          value={currentWord}
          placeholder="Start typing..."
          id="currentWord"
          onChange={(e) => setCurrentWord(e.target.value)}
          className="bblock w-full cursor-text rounded border border-gray-500 bg-[#1E1E1E] p-4 text-white placeholder:text-[#747778] focus:outline-none"
        ></input>
        <button
          type="submit"
          className="absolute right-4 p-2.5 text-sm rounded-lg border border-gray-500 bg-[#1E1E1E] hover:border-green-400"
        >
          Submit
        </button>
      </div>
    </form>
  );
}
