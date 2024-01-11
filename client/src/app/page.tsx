"use client";

import React, { useState, useEffect } from "react";
import Header from "@/components/Header";

interface Settings {
  wordLength: string;
  timeLimit: string;
  startLetter: string;
}

export default function Home() {
  const [settings, setSettings] = useState<Settings>({
    wordLength: "3",
    timeLimit: "15",
    startLetter: "A",
  });

  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [seconds, setSeconds] = useState<number>(0);
  const [currentWord, setCurrentWord] = useState<string>("");
  const [validWords, setValidWords] = useState<any>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSeconds(parseInt(settings.timeLimit));
    setIsRunning(!isRunning);
  };

  const handleWordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentWord.length === parseInt(settings.wordLength)) {
      setValidWords([...validWords, currentWord]);
      setCurrentWord("");
    }
  };

  useEffect(() => {
    let timer: any;

    if (isRunning) {
      timer = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds - 1);
      }, 1000);

      if (seconds === 0) {
        setIsRunning(false);
      }
    }

    return () => clearInterval(timer);
  }, [isRunning, seconds]);

  return (
    <main className="w-full max-h-screen flex flex-col">
      <Header />
      <section className="h-full mx-auto flex flex-row">
        {/* Settings Menu */}
        <div className="min-w-[400px] min-h-[600px] my-24 py-12 border-r border-gray-400">
          {/* Timer */}
          <div className="w-full min-h-[60px] grid place-items-center">
            <span className="scroll-m-20 text-2xl font-semibold tracking-tight">
              {seconds} seconds
            </span>
          </div>

          <form
            onSubmit={handleSubmit}
            className="w-full p-4 flex flex-col items-center"
          >
            {/* Word Length Slider */}
            <div className="w-full min-h-[40px] flex flex-col p-2">
              <label
                htmlFor="wordLength"
                className="block mb-2 scroll-m-20 text-xl font-semibold tracking-tight text-gray-900 dark:text-white"
              >
                Word Length - {settings.wordLength}
              </label>
              <input
                type="range"
                min="1"
                max="20"
                step="1"
                value={settings.wordLength ? settings.wordLength : 1}
                id="wordLength"
                onChange={(e) =>
                  setSettings({ ...settings, wordLength: e.target.value })
                }
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
              ></input>
            </div>

            {/* Time Limit Slider */}
            <div className="w-full min-h-[40px] flex flex-col p-2">
              <label
                htmlFor="timeLimit"
                className="block mb-2 scroll-m-20 text-xl font-semibold tracking-tight text-gray-900 dark:text-white"
              >
                Time Limit - {settings.timeLimit}s
              </label>
              <input
                type="range"
                min="0"
                max="120"
                step="15"
                value={settings.timeLimit ? settings.timeLimit : 0}
                id="timeLimit"
                onChange={(e) =>
                  setSettings({ ...settings, timeLimit: e.target.value })
                }
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
              ></input>
            </div>

            {/* Start Letter Input */}
            <div className="w-full min-h-[40px] flex flex-col p-2">
              <label
                htmlFor="startLetter"
                className="block mb-2 scroll-m-20 text-xl font-semibold tracking-tight text-gray-900 dark:text-white"
              >
                Start Letter - {settings.startLetter}
              </label>
              <input
                type="text"
                value={settings.startLetter}
                placeholder="Starting letter"
                id="startLetter"
                onChange={(e) =>
                  setSettings({ ...settings, startLetter: e.target.value })
                }
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              ></input>
            </div>

            {/* Begin Game Button */}
            <div className="w-full min-h-[40px] flex flex-col justify-center p-2">
              <button
                type="submit"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg hover:ring-blue-500 hover:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:hover:ring-blue-500 dark:hover:border-blue-500"
              >
                {isRunning ? "Stop Game" : "Begin Game"}
              </button>
            </div>
          </form>
        </div>

        <div className="min-w-[800px] flex flex-col my-24 py-12">
          {/* Word Input */}
          <form
            onSubmit={handleWordSubmit}
            className="p-4 flex flex-col items-center"
          >
            {/* Start Letter Input */}
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
        </div>
      </section>
    </main>
  );
}
