import { useId } from 'react';

export default function KarmaMark({
  size = 32,
  className = '',
}: {
  size?: number;
  className?: string;
}) {
  const id = useId().replace(/:/g, '');
  const coinGradient = `karma-coin-${id}`;
  const rimGradient = `karma-rim-${id}`;
  const starGradient = `karma-star-${id}`;
  const shadow = `karma-shadow-${id}`;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 200 200"
      fill="none"
      className={className}
      role="img"
      aria-label="Karma"
    >
      <defs>
        <linearGradient id={rimGradient} x1="34" y1="20" x2="174" y2="182" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FFF2C8" />
          <stop offset="0.24" stopColor="#F3B8E4" />
          <stop offset="0.52" stopColor="#FFF0B3" />
          <stop offset="0.8" stopColor="#E88DD1" />
          <stop offset="1" stopColor="#FFDCA0" />
        </linearGradient>
        <radialGradient id={coinGradient} cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(70 50) rotate(48) scale(155)">
          <stop stopColor="#C9A7FF" />
          <stop offset="0.42" stopColor="#8B6AF2" />
          <stop offset="0.78" stopColor="#6547DC" />
          <stop offset="1" stopColor="#4A32C4" />
        </radialGradient>
        <linearGradient id={starGradient} x1="66" y1="59" x2="135" y2="140" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FFFFFF" />
          <stop offset="0.45" stopColor="#FFF1C8" />
          <stop offset="1" stopColor="#FFD18A" />
        </linearGradient>
        <filter id={shadow} x="-28" y="-20" width="256" height="264" filterUnits="userSpaceOnUse">
          <feDropShadow dx="0" dy="12" stdDeviation="12" floodColor="#5840D4" floodOpacity="0.3" />
        </filter>
      </defs>

      <g filter={`url(#${shadow})`}>
        <circle cx="100" cy="96" r="86" fill={`url(#${rimGradient})`} />
        <circle cx="100" cy="96" r="80" fill="#7858E8" stroke="#FFF7DE" strokeWidth="2" />
        <circle cx="100" cy="96" r="72" fill={`url(#${coinGradient})`} stroke="#D9C5FF" strokeWidth="2" />
        <path
          d="M100 49C104 76 110 88 140 96C111 103 105 115 100 144C95 116 89 104 60 96C89 88 95 76 100 49Z"
          fill={`url(#${starGradient})`}
          stroke="#FFF6DB"
          strokeWidth="3"
          strokeLinejoin="round"
        />
        <path d="M55 49C66 37 80 30 95 27" stroke="white" strokeOpacity="0.55" strokeWidth="5" strokeLinecap="round" />
      </g>
    </svg>
  );
}
