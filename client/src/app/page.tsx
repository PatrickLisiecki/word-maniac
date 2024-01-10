"use client";

import React, { useState, useEffect } from "react";

export default function Home() {
  const [wordLength, setWordLength] = useState<string>("");
  const [timeLimit, setTimeLimit] = useState<string>("");
  const [startLetter, setStartLetter] = useState<string>("");

  const handleSubmit = () => {};

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <h1 className="text-2xl font-bold tracking-wide">Word Maniac</h1>
      {/* Settings Menu */}
      <form
        onSubmit={handleSubmit}
        className="min-w-[800px] min-h-[300px] bg-gray-200 p-4 flex flex-col  items-center"
      >
        {/* Word Length Slider */}
        <div className="w-full min-h-[40px] bg-blue-300 flex flex-col justify-center p-2">
          <label
            htmlFor="wordLength"
            className="block mb-2 text-md font-medium text-gray-900 dark:text-white"
          >
            Word Length - {wordLength}
          </label>
          <input
            type="range"
            min="1"
            max="20"
            step="1"
            value={wordLength}
            id="wordLength"
            onChange={(e) => setWordLength(e.target.value)}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
          ></input>
        </div>

        {/* Time Limit Slider */}
        <div className="w-full min-h-[40px] bg-blue-300 flex flex-col justify-center p-2">
          <label
            htmlFor="timeLimit"
            className="block mb-2 text-md font-medium text-gray-900 dark:text-white"
          >
            Time Limit - {timeLimit}s
          </label>
          <input
            type="range"
            min="0"
            max="120"
            step="15"
            value={timeLimit}
            id="timeLimit"
            onChange={(e) => setTimeLimit(e.target.value)}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
          ></input>
        </div>

        {/* Start Letter Input */}
        <div className="w-full min-h-[40px] bg-blue-300 flex flex-col justify-center p-2">
          <label
            htmlFor="startLetter"
            className="block mb-2 text-md font-medium text-gray-900 dark:text-white"
          >
            Start Letter - {startLetter}
          </label>
          <input
            type="text"
            value={startLetter}
            placeholder="A"
            id="startLetter"
            onChange={(e) => setStartLetter(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          ></input>
        </div>

        {/* Begin Game Button */}
        <div className="w-full min-h-[40px] bg-blue-300 flex flex-col justify-center p-2">
          <button
            type="submit"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg hover:ring-blue-500 hover:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:hover:ring-blue-500 dark:hover:border-blue-500"
          >
            Begin Game
          </button>
        </div>
      </form>
    </main>
  );
}
