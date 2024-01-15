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
      className="px-4 flex flex-col items-center"
    >
      {/* Word Input */}
      <div className="w-full min-h-[40px] flex flex-col justify-center p-2 relative">
        <input
          type="text"
          value={currentWord}
          placeholder="Start typing..."
          id="currentWord"
          onChange={(e) => setCurrentWord(e.target.value)}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-4 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        ></input>
        <button
          type="submit"
          className="absolute right-3 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg hover:ring-blue-500 hover:border-blue-500 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:hover:ring-blue-500 dark:hover:border-blue-500"
        >
          Submit
        </button>
      </div>
    </form>
  );
}
