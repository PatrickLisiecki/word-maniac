interface GameInputProps {
  currentWord: string;
  setCurrentWord: React.Dispatch<React.SetStateAction<string>>;
  handleWordSubmit: React.FormEventHandler<HTMLFormElement>;
}

export default function GameInput({
  currentWord,
  setCurrentWord,
  handleWordSubmit,
}: GameInputProps) {
  return (
    <form
      onSubmit={handleWordSubmit}
      className="flex flex-col items-center p-4"
    >
      {/* Word Input */}
      <div className="relative flex min-h-[40px] w-full flex-col justify-center">
        <input
          type="text"
          value={currentWord}
          placeholder="Start typing..."
          id="currentWord"
          onChange={(e) => setCurrentWord(e.target.value)}
          className="block w-full cursor-text rounded border border-gray-500 p-4 text-dark placeholder:text-place focus:outline-none dark:bg-dark dark:text-white"
        ></input>
        <button
          type="submit"
          className="absolute right-4 rounded-lg border border-gray-500 p-2.5 text-sm hover:border-green-400 dark:bg-dark"
        >
          Submit
        </button>
      </div>
    </form>
  );
}
