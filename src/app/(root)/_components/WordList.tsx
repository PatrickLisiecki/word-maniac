interface WordListProps {
  validWords: Array<string>;
}

export default function WordList({ validWords }: WordListProps) {
  return (
    <div className="flex w-full flex-col items-center border-t border-gray-400">
      <div className="my-2 w-full text-center">
        <span className="text-2xl font-semibold tracking-tight">Word Bank</span>
      </div>
      <div className="grid w-full grid-cols-3 place-items-center gap-2 overflow-auto px-12">
        {validWords.length > 0 &&
          validWords.map((word: any, index: number) => {
            return (
              <span key={index} className="text-xl text-black dark:text-white">
                {word}
              </span>
            );
          })}
      </div>
    </div>
  );
}
