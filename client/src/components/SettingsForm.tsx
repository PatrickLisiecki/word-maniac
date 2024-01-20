import React, { useState } from "react";

import Settings from "@/types/Settings";

interface SettingsFormProps {
  settings: Settings;
  setSettings: React.Dispatch<React.SetStateAction<Settings>>;
  isRunning: boolean;
  setIsRunning: React.Dispatch<React.SetStateAction<boolean>>;
  setValidWords: React.Dispatch<React.SetStateAction<string[]>>;
  setSeconds: React.Dispatch<React.SetStateAction<number>>;
}

export default function SettingsForm({
  settings,
  setSettings,
  isRunning,
  setIsRunning,
  setValidWords,
  setSeconds,
}: SettingsFormProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSeconds(parseInt(settings.timeLimit));
    setIsRunning(!isRunning);
    setValidWords([]);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full flex flex-col items-center">
      {/* Word Length Slider */}
      <div className="w-full min-h-[40px] flex flex-col p-2">
        <label
          htmlFor="wordLength"
          className="block mb-2 text-xl font-semibold tracking-tight text-white dark:text-white"
        >
          Word Length - {settings.wordLength}
        </label>

        <input
          type="range"
          min="2"
          max="20"
          step="1"
          value={settings.wordLength ? settings.wordLength : 2}
          id="wordLength"
          onChange={(e) =>
            setSettings({ ...settings, wordLength: e.target.value })
          }
          className="w-full h-3 bg-gray-400 rounded-lg appearance-none cursor-pointer dark:bg-white accent-[#343434]"
        ></input>
      </div>

      {/* Time Limit Slider */}
      <div className="w-full min-h-[40px] flex flex-col p-2">
        <label
          htmlFor="timeLimit"
          className="block mb-2 text-xl font-semibold tracking-tight text-white dark:text-white"
        >
          Time Limit - {settings.timeLimit}s
        </label>
        <input
          type="range"
          min="15"
          max="120"
          step="15"
          value={settings.timeLimit ? settings.timeLimit : 60}
          id="timeLimit"
          onChange={(e) =>
            setSettings({ ...settings, timeLimit: e.target.value })
          }
          className="w-full h-3 bg-gray-400 rounded-lg appearance-none cursor-pointer dark:bg-white accent-[#343434]"
        ></input>
      </div>

      {/* Start Letter Input */}
      <div className="w-full min-h-[40px] flex flex-col p-2">
        <label
          htmlFor="start"
          className="block mb-2 text-xl font-semibold tracking-tight text-gray-900 dark:text-white"
        >
          Start String - {settings.start}
        </label>
        <input
          type="text"
          value={settings.start}
          placeholder="Starting letter"
          id="start"
          onChange={(e) => setSettings({ ...settings, start: e.target.value })}
          className="block w-full cursor-text rounded border border-gray-500 bg-[#1E1E1E] p-2.5 text-white placeholder:text-[#747778] focus:outline-none"
        ></input>
      </div>

      {/* Begin Game Button */}
      <div className="w-full min-h-[40px] flex flex-col justify-center p-2">
        <button
          type="submit"
          className={`${
            isRunning ? "hover:border-red-400" : "hover:border-green-400"
          } block w-full p-2.5 rounded border border-gray-500 bg-[#1E1E1E]`}
        >
          {isRunning ? "Stop Game" : "Begin Game"}
        </button>
      </div>
    </form>
  );
}
