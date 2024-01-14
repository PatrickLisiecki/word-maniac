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
  );
}
