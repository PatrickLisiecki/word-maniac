interface TimerProps {
  time: number;
}

export default function Timer({ time }: TimerProps) {
  return (
    <div className="grid min-h-[60px] w-full place-items-center">
      <span className="text-3xl font-semibold tracking-tight text-red-500">
        {time} seconds
      </span>
    </div>
  );
}
