"use client";

import React, { useState, useEffect } from "react";

import Header from "@/components/Header";
import SettingsForm from "@/components/SettingsForm";
import Timer from "@/components/Timer";
import GameInput from "@/components/GameInput";
import WordList from "@/components/WordList";

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

  const checkValidWord = async (word: string): Promise<boolean> => {
    // Check if minimum criteria is met to consider the word
    if (
      word.length === parseInt(settings.wordLength) &&
      word.toLowerCase().charAt(0) === settings.startLetter.toLowerCase() &&
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
    if (await checkValidWord(currentWord)) {
      setValidWords([...validWords, currentWord]);
      setCurrentWord("");
    } else {
      setError("Invalid Word!");
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
      }
    }

    return () => clearInterval(timer);
  }, [isRunning, seconds]);

  return (
    <main className="w-full h-screen max-h-screen flex flex-col">
      <Header />
      <section className="border border-gray-400 mx-auto my-auto flex flex-row rounded-lg bg-gray-200 dark:bg-gray-700">
        {/* Menu */}
        <div className="min-w-[400px] min-h-[600px] py-12 border-r border-gray-400">
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
        </div>

        <div className="min-w-[800px] flex flex-col py-12">
          {/* Game Input */}
          <div className="w-full text-center text-xl font-semibold tracking-tight text-red-500 block">
            {error ? error : ""}
          </div>

          <GameInput
            currentWord={currentWord}
            setCurrentWord={setCurrentWord}
            handleWordSubmit={handleWordSubmit}
          />

          <WordList validWords={validWords} />
        </div>
      </section>
    </main>
  );
}
