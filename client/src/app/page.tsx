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

  const handleWordSubmit: React.FormEventHandler<HTMLFormElement> = async (
    e: React.FormEvent,
  ) => {
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
            setSeconds={setSeconds}
          />
        </div>

        <div className="min-w-[800px] flex flex-col my-24 py-12">
          {/* Game Input */}
          <span className="scroll-m-20 text-xl font-semibold tracking-tight text-red-600 block">
            {error ? error : "🚀"}
          </span>

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
