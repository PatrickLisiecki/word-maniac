"use client";

import React, { useState, useEffect } from "react";

import SettingsForm from "@/components/SettingsForm";
import Timer from "@/components/Timer";
import GameInput from "@/components/GameInput";
import WordList from "@/components/WordList";
import ModeToggle from "@/components/ModeToggle";

import Settings from "@/types/Settings";

import checkWord from "@/api/checkWord";

export default function Home() {
  const [settings, setSettings] = useState<Settings>({
    wordLength: "3",
    timeLimit: "15",
    start: "A",
  });

  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [seconds, setSeconds] = useState<number>(0);
  const [currentWord, setCurrentWord] = useState<string>("");
  const [validWords, setValidWords] = useState<Array<string>>([]);
  const [message, setMessage] = useState<string>("");

  // Checks if current word has already been submitted
  const isUnique = (word: string): boolean => {
    for (const curr of validWords) {
      if (curr.toLowerCase() === word.toLowerCase()) {
        return false;
      }
    }

    console.log("UNIQUE");

    return true;
  };

  // Checks if current word matches the starting string
  const hasSubstring = (word: string, start: string): boolean => {
    // How many letters should be checked
    let startLen = start.length;

    // The beginning of the word up until the start length
    let wordSubstr = word.substring(0, startLen);

    if (wordSubstr.toLowerCase() === start.toLowerCase()) {
      return true;
    }

    return false;
  };

  const isMinimumLength = (word: string, len: number): boolean => {
    return word.length === len;
  };

  const isValid = async (word: string): Promise<boolean> => {
    // Check if minimum criteria is met to consider the word
    if (
      isMinimumLength(word, parseInt(settings.wordLength)) &&
      hasSubstring(word, settings.start) &&
      isUnique(word) &&
      isRunning
    ) {
      // Check if word exists
      const data = await checkWord(word);

      // JSON data
      // console.log(data);

      if (data) {
        return true;
      }

      return false;
    }

    return false;
  };

  const handleWordSubmit: React.FormEventHandler<HTMLFormElement> = async (
    e: React.FormEvent,
  ) => {
    e.preventDefault();

    // Check if word is valid before adding to word list
    if (await isValid(currentWord)) {
      setValidWords([...validWords, currentWord]);
      setCurrentWord("");
    } else {
      setMessage("Invalid Word!");
    }
  };

  useEffect(() => {
    let timer: any;

    // Decrement seconds
    if (isRunning) {
      timer = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds - 1);
      }, 1000);

      // Stop game at 0
      if (seconds === 0) {
        setIsRunning(false);

        setMessage(`You guessed ${validWords.length} words!`);
      }
    }

    return () => clearInterval(timer);
  }, [isRunning, seconds]);

  return (
    <main className="w-full h-screen max-h-screen flex justify-center items-center">
      <div className="border border-gray-500 flex flex-row rounded-2xl bg-white dark:bg-[#1e1e1e] overflow-hidden">
        {/* Sidebar Menu */}
        <aside className="min-w-[400px] min-h-[600px] flex flex-col justify-between p-6 border-r border-gray-400 bg-[#2F4F4F]">
          <div className="text-3xl font-semibold tracking-tight text-center">
            Word Maniac
          </div>

          {/* Timer */}
          <Timer time={seconds} />

          {/* Settings */}
          <SettingsForm
            settings={settings}
            setSettings={setSettings}
            isRunning={isRunning}
            setIsRunning={setIsRunning}
            setValidWords={setValidWords}
            setSeconds={setSeconds}
          />

          <ModeToggle />
        </aside>

        <div className="min-w-[800px] flex flex-col">
          {/* Game Input */}
          <GameInput
            currentWord={currentWord}
            setCurrentWord={setCurrentWord}
            handleWordSubmit={handleWordSubmit}
          />

          <WordList validWords={validWords} />

          {message && (
            <div
              className={`${
                isRunning ? "bg-red-500" : "bg-green-500"
              } w-full text-center text-xl font-semibold tracking-tight text-white bg-red-500 block mt-auto p-2`}
            >
              {message}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
