"use client";

import { useState, useEffect } from "react";

import SettingsForm from "./_components/SettingsForm";
import Timer from "./_components/Timer";
import GameInput from "./_components/GameInput";
import WordList from "./_components/WordList";
import Footer from "./_components/Footer";

import Settings from "@/types/Settings";

import checkWord from "@/api/checkWord";

export default function Home() {
  // Game Settings
  const [settings, setSettings] = useState<Settings>({
    // Default settings
    wordLength: "3",
    timeLimit: "60",
    start: "A",
  });

  // Is the game in progress?
  const [isRunning, setIsRunning] = useState<boolean>(false);

  // Timer for game
  const [seconds, setSeconds] = useState<number>(0);

  // User Input
  const [currentWord, setCurrentWord] = useState<string>("");

  // Collection of valid user-submitted words
  const [validWords, setValidWords] = useState<Array<string>>([]);

  // Error and final message
  const [message, setMessage] = useState<string>("");

  // Is the game screen expanded?
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

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

  // Every time the timer is decremented run this effect
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
    <main className="flex h-screen max-h-screen w-full items-center justify-center">
      {/* Game Screen */}
      <div
        className={`${
          isExpanded ? "h-full w-full" : "rounded-2xl border border-gray-500"
        } flex flex-row overflow-hidden bg-white dark:bg-dark`}
      >
        {/* Sidebar Menu */}
        <aside className="flex min-h-[600px] min-w-[400px] flex-col justify-between border-r border-gray-400 bg-gray-300 p-6 dark:bg-sidebar">
          <div className="text-center text-3xl font-semibold tracking-tight text-dark dark:text-white">
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

          {/* Sidebar Footer */}
          <Footer isExpanded={isExpanded} setIsExpanded={setIsExpanded} />
        </aside>

        <div className="flex w-full min-w-[800px] flex-col">
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
              } mt-auto block w-full p-2 text-center text-xl font-semibold tracking-tight text-white`}
            >
              {message}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
