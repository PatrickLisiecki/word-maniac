"use client";

import React, { useState, useEffect } from "react";

import Header from "@/components/Header";
import SettingsForm from "@/components/SettingsForm";
import Timer from "@/components/Timer";

import Settings from "@/types/Settings";

import checkWord from "@/api/checkWord";

export default function Home() {
  const [settings, setSettings] = useState<Settings>({
    wordLength: "3",
    timeLimit: "15",
    startLetter: "A",
  });

  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [seconds, setSeconds] = useState<number>(0);
  const [currentWord, setCurrentWord] = useState<string>("");
  const [validWords, setValidWords] = useState<Array<string>>([]);
  const [error, setError] = useState<string>("");

  const isUnique = (word: string): boolean => {
    for (const curr of validWords) {
      if (curr.toLowerCase() === word.toLowerCase()) {
        return false;
      }
    }

    console.log("UNIQUE");

    return true;
  };

  const checkValidWord = async (word: string) => {
    if (
      word.length === parseInt(settings.wordLength) &&
      word.toLowerCase().charAt(0) === settings.startLetter.toLowerCase() &&
      isRunning &&
      isUnique(word) === true
    ) {
      const data = await checkWord(word);
      console.log(data);
      if (data) {
        return true;
      }

      return false;
    }

    return false;
  };

  const handleWordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (await checkValidWord(currentWord)) {
      setValidWords([...validWords, currentWord]);
      setCurrentWord("");
    } else {
      setError("Invalid Word!");
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
        {/* Menu */}
        <div className="min-w-[400px] min-h-[600px] my-24 py-12 border-r border-gray-400">
          {/* Timer */}
          <Timer time={seconds} />

          {/* Settings */}
          <SettingsForm
            settings={settings}
            setSettings={setSettings}
            isRunning={isRunning}
            setIsRunning={setIsRunning}
            setValidWords={setValidWords}
          />
        </div>

        <div className="min-w-[800px] flex flex-col my-24 py-12">
          {/* Word Input */}
          <form
            onSubmit={handleWordSubmit}
            className="p-4 flex flex-col items-center"
          >
            {/* Start Letter Input */}
            <span className="scroll-m-20 text-xl font-semibold tracking-tight text-red-600 block">
              {error ? error : "🚀"}
            </span>
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
