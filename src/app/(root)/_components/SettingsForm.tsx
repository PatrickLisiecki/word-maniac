import { Slider } from "@/components/ui/slider";

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
    <form onSubmit={handleSubmit} className="flex w-full flex-col items-center">
      {/* Word Length Slider */}
      <div className="flex min-h-[40px] w-full flex-col p-2">
        <label
          htmlFor="wordLength"
          className="mb-2 block text-xl font-semibold tracking-tight text-dark dark:text-white"
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
            setSettings({ ...settings, wordLength: parseInt(e.target.value) })
          }
          className="h-2 w-full cursor-pointer appearance-none rounded-full bg-neutral-800 accent-neutral-500 dark:bg-neutral-100"
        ></input>
      </div>

      {/* Time Limit Slider */}
      <div className="flex min-h-[40px] w-full flex-col p-2">
        <label
          htmlFor="timeLimit"
          className="mb-2 block text-xl font-semibold tracking-tight text-dark dark:text-white"
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
          className="h-2 w-full cursor-pointer appearance-none rounded-full bg-neutral-800 accent-neutral-500 dark:bg-neutral-100"
        ></input>
      </div>

      {/* Start String Input */}
      <div className="flex min-h-[40px] w-full flex-col p-2">
        <label
          htmlFor="start"
          className="mb-2 block text-xl font-semibold tracking-tight text-dark dark:text-white"
        >
          Start String - {settings.start}
        </label>

        <input
          type="text"
          value={settings.start}
          placeholder="Starting letter"
          id="start"
          onChange={(e) => setSettings({ ...settings, start: e.target.value })}
          className="block w-full cursor-text rounded border border-gray-500 p-2.5 text-dark placeholder:text-place focus:outline-none dark:bg-dark dark:text-white"
        ></input>
      </div>

      {/* Begin Game Button */}
      <div className="flex min-h-[40px] w-full flex-col justify-center p-2">
        <button
          type="submit"
          className={`${
            isRunning ? "hover:border-red-400" : "hover:border-green-400"
          } block w-full rounded border border-gray-500 bg-white p-2.5 dark:bg-dark`}
        >
          {isRunning ? "Stop Game" : "Begin Game"}
        </button>
      </div>
    </form>
  );
}
