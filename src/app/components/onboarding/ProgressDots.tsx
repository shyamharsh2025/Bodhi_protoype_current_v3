interface ProgressDotsProps {
  total: number;
  current: number;
  visualVariant?: 'default' | 'consent';
}

export default function ProgressDots({ total, current, visualVariant = 'default' }: ProgressDotsProps) {
  const isConsent = visualVariant === 'consent';

  return (
    <div className="flex items-center justify-center gap-1.5">
      {Array.from({ length: total }).map((_, index) => (
        <div
          key={index}
          className={`h-1.5 w-1.5 rounded-full transition-all duration-300 ${
            index === current - 1
              ? isConsent
                ? 'bg-gradient-to-br from-[#5B4FDB] to-[#168ED2] shadow-[0_0_0_3px_rgba(91,79,219,0.06)]'
                : 'bg-[#5146D9] shadow-[0_0_0_3px_rgba(91,79,219,0.08)]'
              : index < current - 1
                ? isConsent ? 'bg-[#C5B9FA]' : 'bg-[#B9B2F7]'
                : 'bg-[#D8D9E5]'
          }`}
        />
      ))}
    </div>
  );
}
