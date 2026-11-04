import { ChevronLeft, Zap, Brain, Check } from 'lucide-react';
import { useNavigate } from 'react-router';
import { useState } from 'react';

type OptionId = 'start_immediately' | 'breathwork' | 'meditation';

export default function FocusStartOptionsScreen() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState<OptionId>('start_immediately');

  const handleSelect = (id: OptionId) => {
    setSelected(id);
    const dest =
      id === 'breathwork'
        ? '/home/breathwork-prep'
        : id === 'meditation'
        ? '/home/meditation-prep'
        : '/home/focus-timer';
    setTimeout(() => navigate(dest), 180);
  };

  return (
    <div
      className="relative min-h-screen w-full overflow-hidden"
      style={{
        background:
          'radial-gradient(ellipse at 50% 30%, #071226 0%, #030814 55%, #01040B 100%)',
      }}
    >
      {/* Subtle ambient violet glow */}
      <div className="pointer-events-none absolute top-[120px] left-1/2 -translate-x-1/2 w-[420px] h-[420px] rounded-full bg-[rgba(124,77,255,0.18)] blur-[90px]" />
      <div className="pointer-events-none absolute -bottom-32 -right-20 w-[320px] h-[320px] rounded-full bg-[rgba(124,77,255,0.10)] blur-[80px]" />

      {/* Header */}
      <div className="relative z-10 flex items-center justify-center pt-[70px] pb-2 px-5">
        <button
          onClick={() => navigate(-1)}
          aria-label="Go back"
          className="absolute left-5 top-[70px] w-[44px] h-[44px] rounded-full flex items-center justify-center"
          style={{
            background: 'rgba(19, 29, 52, 0.72)',
            border: '1px solid rgba(255,255,255,0.06)',
            boxShadow: '0 6px 18px rgba(0,0,0,0.35)',
          }}
        >
          <ChevronLeft className="w-5 h-5 text-white" />
        </button>
        <h1
          className="text-white"
          style={{ fontFamily: 'Inter, sans-serif', fontWeight: 800, fontSize: 18 }}
        >
          Start Focus Sprint
        </h1>
      </div>

      {/* Content */}
      <div className="relative z-10 px-7 pt-8 pb-8 max-w-[440px] mx-auto">
        <h2
          className="text-white text-center"
          style={{
            fontFamily: 'Inter, sans-serif',
            fontWeight: 800,
            fontSize: 30,
            lineHeight: '36px',
            letterSpacing: '-0.5px',
          }}
        >
          How do you want to start?
        </h2>
        <p
          className="mt-3 text-center mx-auto"
          style={{
            color: '#B9B8DA',
            fontFamily: 'Inter, sans-serif',
            fontWeight: 500,
            fontSize: 16,
            lineHeight: '24px',
            maxWidth: 320,
          }}
        >
          Set your intention. We'll help you stay in the flow.
        </p>

        {/* Option cards */}
        <div className="mt-8 flex flex-col gap-4">
          <OptionCard
            selected={selected === 'start_immediately'}
            onClick={() => handleSelect('start_immediately')}
            title="Start immediately"
            description="Jump into your session"
            icon={<Zap className="w-6 h-6" style={{ color: '#7C4DFF', fill: '#7C4DFF' }} />}
          />
          <OptionCard
            selected={selected === 'breathwork'}
            onClick={() => handleSelect('breathwork')}
            title="2 min Breathwork"
            description={'Quick breathing to\nclear your mind'}
            badge="Recommended"
            icon={<BreathLines />}
          />
          <OptionCard
            selected={selected === 'meditation'}
            onClick={() => handleSelect('meditation')}
            title="5 min Meditation"
            description={'Deeper preparation for\nbetter focus'}
            badge="Recommended"
            icon={<Lotus />}
          />
        </div>

        {/* Insight card */}
        <div
          className="mt-6 rounded-[22px] px-5 py-4 flex items-center gap-4"
          style={{
            background: 'rgba(10, 18, 36, 0.72)',
            border: '1px solid rgba(153, 164, 211, 0.14)',
            boxShadow: '0 8px 24px rgba(0,0,0,0.35)',
          }}
        >
          <div
            className="w-11 h-11 rounded-full flex items-center justify-center shrink-0"
            style={{
              background: 'rgba(9, 15, 30, 0.55)',
              border: '1px solid rgba(145, 125, 255, 0.18)',
            }}
          >
            <Brain className="w-5 h-5" style={{ color: '#8B6CFF' }} />
          </div>
          <p
            style={{
              color: '#B9B8DA',
              fontFamily: 'Inter, sans-serif',
              fontWeight: 500,
              fontSize: 14,
              lineHeight: '20px',
            }}
          >
            Starting with breathwork or meditation can improve your focus and retention.
          </p>
        </div>
      </div>
    </div>
  );
}

interface OptionCardProps {
  selected: boolean;
  onClick: () => void;
  title: string;
  description: string;
  badge?: string;
  icon: React.ReactNode;
}

function OptionCard({ selected, onClick, title, description, badge, icon }: OptionCardProps) {
  return (
    <button
      onClick={onClick}
      className="w-full text-left rounded-[24px] p-4 flex items-center gap-4 transition-all duration-200"
      style={{
        background: selected ? 'rgba(10, 18, 36, 0.82)' : 'rgba(10, 18, 36, 0.74)',
        border: selected ? '1.5px solid #7C4DFF' : '1px solid rgba(153, 164, 211, 0.16)',
        boxShadow: selected
          ? '0 0 0 4px rgba(124, 77, 255, 0.18), 0 10px 30px rgba(124, 77, 255, 0.22)'
          : '0 6px 18px rgba(0,0,0,0.35)',
      }}
    >
      {/* Icon */}
      <div
        className="w-[58px] h-[58px] rounded-full flex items-center justify-center shrink-0"
        style={{
          background: 'rgba(9, 15, 30, 0.55)',
          border: '1px solid rgba(145, 125, 255, 0.18)',
        }}
      >
        {icon}
      </div>

      {/* Text */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <span
            className="text-white"
            style={{
              fontFamily: 'Inter, sans-serif',
              fontWeight: 800,
              fontSize: 18,
              lineHeight: '24px',
            }}
          >
            {title}
          </span>
          {badge && (
            <span
              className="inline-flex items-center px-2.5 h-[22px] rounded-full"
              style={{
                background: 'linear-gradient(90deg, #BFAAFF, #D6CCFF)',
                color: '#22164E',
                fontFamily: 'Inter, sans-serif',
                fontWeight: 800,
                fontSize: 11,
                letterSpacing: '0.2px',
              }}
            >
              {badge}
            </span>
          )}
        </div>
        <p
          className="mt-1 whitespace-pre-line"
          style={{
            color: '#B9B8DA',
            fontFamily: 'Inter, sans-serif',
            fontWeight: 500,
            fontSize: 14,
            lineHeight: '20px',
          }}
        >
          {description}
        </p>
      </div>

      {/* Selection control */}
      <div
        className="w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-all"
        style={{
          background: selected ? '#7C4DFF' : 'transparent',
          border: selected ? '1.5px solid #7C4DFF' : '1.5px solid rgba(153, 164, 211, 0.35)',
          boxShadow: selected ? '0 0 12px rgba(124,77,255,0.55)' : 'none',
        }}
      >
        {selected && <Check className="w-4 h-4 text-white" strokeWidth={3} />}
      </div>
    </button>
  );
}

function BreathLines() {
  return (
    <svg width="26" height="20" viewBox="0 0 26 20" fill="none">
      <path
        d="M2 5 Q 8 1, 14 5 T 24 5"
        stroke="#A891FF"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M2 10 Q 8 6, 14 10 T 24 10"
        stroke="#A891FF"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
        opacity="0.85"
      />
      <path
        d="M2 15 Q 8 11, 14 15 T 24 15"
        stroke="#A891FF"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
        opacity="0.7"
      />
    </svg>
  );
}

function Lotus() {
  return (
    <svg width="26" height="24" viewBox="0 0 26 24" fill="none">
      <path
        d="M13 4 C 11 10, 11 14, 13 19 C 15 14, 15 10, 13 4 Z"
        stroke="#8B6CFF"
        strokeWidth="1.6"
        fill="none"
      />
      <path
        d="M5 10 C 7 12, 10 17, 13 19 C 12 16, 9 12, 5 10 Z"
        stroke="#8B6CFF"
        strokeWidth="1.6"
        fill="none"
      />
      <path
        d="M21 10 C 19 12, 16 17, 13 19 C 14 16, 17 12, 21 10 Z"
        stroke="#8B6CFF"
        strokeWidth="1.6"
        fill="none"
      />
      <path
        d="M2 14 C 5 16, 10 19, 13 19 C 10 19, 6 18, 2 14 Z"
        stroke="#8B6CFF"
        strokeWidth="1.4"
        fill="none"
        opacity="0.85"
      />
      <path
        d="M24 14 C 21 16, 16 19, 13 19 C 16 19, 20 18, 24 14 Z"
        stroke="#8B6CFF"
        strokeWidth="1.4"
        fill="none"
        opacity="0.85"
      />
    </svg>
  );
}
