interface ProgressDotsProps {
  total: number;
  current: number;
}

export default function ProgressDots({ total, current }: ProgressDotsProps) {
  return (
    <div className="flex items-center justify-center gap-1.5">
      {Array.from({ length: total }).map((_, index) => (
        <div
          key={index}
          className={`h-1.5 rounded-full transition-all duration-300 ${
            index < current
              ? 'w-1.5 bg-[#5B4FDB]'
              : 'w-1.5 bg-[#D1D5DB]'
          }`}
        />
      ))}
    </div>
  );
}
