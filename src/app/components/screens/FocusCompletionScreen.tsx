import { ChevronLeft, BarChart3, Check, CheckCircle2, Lock, ChevronRight } from 'lucide-react';
import { AnimatePresence } from 'motion/react';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import ActivityFeedbackSheet from '../ActivityFeedbackSheet';

const CONFETTI = [
  { x: 12, y: 24, c: '#6D5BFF', r: -18, w: 10, h: 3 },
  { x: 28, y: 8, c: '#FFC84D', r: 24, w: 4, h: 4 },
  { x: 42, y: 30, c: '#57D4FF', r: 12, w: 9, h: 3 },
  { x: 58, y: 14, c: '#FF8FA3', r: -28, w: 8, h: 3 },
  { x: 72, y: 42, c: '#63C96B', r: 40, w: 4, h: 4 },
  { x: 86, y: 22, c: '#8A76FF', r: -10, w: 9, h: 3 },
  { x: 18, y: 60, c: '#FFC84D', r: 60, w: 8, h: 3 },
  { x: 50, y: 70, c: '#6D5BFF', r: -45, w: 4, h: 4 },
  { x: 80, y: 64, c: '#57D4FF', r: 22, w: 9, h: 3 },
  { x: 8, y: 80, c: '#FF8FA3', r: 12, w: 4, h: 4 },
  { x: 92, y: 84, c: '#8EF28D', r: -36, w: 8, h: 3 },
  { x: 36, y: 92, c: '#8A76FF', r: 14, w: 4, h: 4 },
];

export default function FocusCompletionScreen() {
  const navigate = useNavigate();
  const [showFeedback, setShowFeedback] = useState(false);
  const focusSession = (() => {
    try {
      return JSON.parse(sessionStorage.getItem('bodhi-active-focus-session') ?? '{}') as {
        title?: string;
        durationLabel?: string;
      };
    } catch {
      return {};
    }
  })();
  const focusTitle = focusSession.title ?? 'Math Assignment – Chapter 3';
  const focusDuration = focusSession.durationLabel ?? '45 min';

  return (
    <div
      className="relative min-h-screen w-full overflow-hidden flex flex-col"
      style={{
        background:
          'radial-gradient(ellipse at 50% 25%, #0a1230 0%, #050a1c 50%, #020713 100%)',
      }}
    >
      {/* Ambient glow */}
      <div className="pointer-events-none absolute top-[140px] left-1/2 -translate-x-1/2 w-[420px] h-[420px] rounded-full bg-[rgba(109,91,255,0.20)] blur-[100px]" />
      <div className="pointer-events-none absolute top-0 left-[18%] w-[1px] h-full bg-gradient-to-b from-transparent via-[rgba(109,91,255,0.10)] to-transparent" />
      <div className="pointer-events-none absolute top-0 right-[22%] w-[1px] h-full bg-gradient-to-b from-transparent via-[rgba(87,212,255,0.08)] to-transparent" />

      {/* Top nav */}
      <div className="relative z-10 flex items-center justify-between pt-[70px] px-6">
        <button
          onClick={() => navigate(-1)}
          aria-label="Back"
          className="w-[46px] h-[46px] rounded-full flex items-center justify-center"
          style={{
            background: 'rgba(255,255,255,0.055)',
            border: '1px solid rgba(139,124,255,0.16)',
            boxShadow: '0 10px 28px rgba(0,0,0,0.35)',
          }}
        >
          <ChevronLeft className="w-5 h-5 text-white" />
        </button>
        <button
          onClick={() => navigate('/home/journey')}
          aria-label="Stats"
          className="w-[40px] h-[40px] flex items-center justify-center"
        >
          <BarChart3 className="w-6 h-6 text-white" strokeWidth={2.2} />
        </button>
      </div>

      {/* Hero: confetti + badge */}
      <div className="relative z-10 mt-6 mx-auto" style={{ width: 280, height: 200 }}>
        {/* Confetti */}
        <div className="absolute inset-0 pointer-events-none">
          {CONFETTI.map((p, i) => (
            <span
              key={i}
              className="absolute rounded-full animate-[confettiFloat_1.4s_ease-out]"
              style={{
                left: `${p.x}%`,
                top: `${p.y}%`,
                width: p.w,
                height: p.h,
                background: p.c,
                transform: `rotate(${p.r}deg)`,
                opacity: 0.9,
                boxShadow: `0 0 8px ${p.c}66`,
              }}
            />
          ))}
        </div>
        {/* Badge */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <div
            className="relative w-[124px] h-[124px] rounded-full flex items-center justify-center animate-[badgeIn_0.6s_ease-out]"
            style={{
              background:
                'radial-gradient(circle at center, rgba(109,91,255,0.42), rgba(10,16,35,0.92))',
              boxShadow:
                '0 0 34px rgba(109,91,255,0.45), 0 0 30px rgba(255,200,77,0.22)',
            }}
          >
            <svg className="absolute inset-0 -rotate-90" width="124" height="124" viewBox="0 0 124 124">
              <defs>
                <linearGradient id="ringGrad" x1="0%" y1="100%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#6D5BFF" />
                  <stop offset="55%" stopColor="#8A76FF" />
                  <stop offset="100%" stopColor="#FFC84D" />
                </linearGradient>
              </defs>
              <circle
                cx="62"
                cy="62"
                r="56"
                stroke="url(#ringGrad)"
                strokeWidth="7"
                fill="none"
                strokeLinecap="round"
              />
            </svg>
            <Check
              className="relative z-10 text-white animate-[tickDraw_0.5s_ease-out_0.2s_both]"
              style={{ width: 56, height: 56, filter: 'drop-shadow(0 0 18px rgba(255,255,255,0.45))' }}
              strokeWidth={5}
            />
          </div>
        </div>
      </div>

      {/* Title */}
      <div className="relative z-10 mt-6 text-center px-6">
        <div className="flex items-center justify-center gap-3">
          <h1
            className="text-white"
            style={{ fontFamily: 'Inter, sans-serif', fontWeight: 800, fontSize: 36, lineHeight: '40px', letterSpacing: '-0.5px' }}
          >
            Loop Closed
          </h1>
          <CheckCircle2 className="w-7 h-7" style={{ color: '#63C96B' }} fill="rgba(99,201,107,0.18)" />
        </div>
        <p
          className="mt-3 whitespace-pre-line"
          style={{ color: '#B7B4D8', fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 18, lineHeight: '24px' }}
        >
          {'You stayed focused.\nGreat work!'}
        </p>
      </div>

      {/* Stat cards */}
      <div className="relative z-10 mt-7 mx-10 grid grid-cols-2 gap-4">
        <StatCard number="45:00" label="Focus time" labelColor="#FFFFFF" />
        <StatCard number="+25" label="Karma points" labelColor="#B7B4D8" />
      </div>

      {/* Progress summary */}
      <div className="relative z-10 mt-6 mx-10 grid grid-cols-2 gap-8">
        <ProgressItem label="Sessions today" value="1 of 3" progress={0.33} fill="#6D5BFF" />
        <ProgressItem label="Current streak" value="3 days" emoji="🔥" progress={0.6} fill="rgba(139,124,255,0.5)" />
      </div>

      {/* Lock-in card */}
      <div className="relative z-10 mt-6 mx-8">
        <button
          className="w-full text-left rounded-[22px] p-4 flex items-center gap-4 active:scale-[0.99] transition-transform"
          style={{
            background: 'rgba(8, 13, 31, 0.82)',
            border: '1px solid rgba(139,124,255,0.24)',
            boxShadow: '0 18px 42px rgba(0,0,0,0.32)',
          }}
        >
          <div
            className="w-12 h-12 rounded-full flex items-center justify-center shrink-0"
            style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(142,242,141,0.18)' }}
          >
            <Lock className="w-5 h-5" style={{ color: '#8EF28D' }} />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-white" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 800, fontSize: 16 }}>
              Lock in what you studied
            </p>
            <p
              className="mt-0.5 whitespace-pre-line"
              style={{ color: '#B7B4D8', fontFamily: 'Inter, sans-serif', fontWeight: 500, fontSize: 13, lineHeight: '18px' }}
            >
              {'Reinforce your focus and\nearn extra karma points.'}
            </p>
          </div>
          <ChevronRight className="w-6 h-6 text-white shrink-0" />
        </button>
      </div>

      {/* Bottom buttons */}
      <div className="relative z-10 mt-auto mx-8 mb-3">
        <button
          onClick={() => setShowFeedback(true)}
          className="w-full h-[56px] rounded-[18px] active:scale-[0.98] transition-transform"
          style={{
            background: 'linear-gradient(135deg, #7B68FF 0%, #543BEE 100%)',
            boxShadow: '0 18px 48px rgba(91,70,255,0.42)',
          }}
        >
          <span className="text-white" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 800, fontSize: 18 }}>
            Done
          </span>
        </button>
      </div>
      <div className="relative z-10 flex items-center justify-center pb-6">
        <button>
          <span style={{ color: '#B7AEFF', fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: 16 }}>
            View Summary
          </span>
        </button>
      </div>

      <style>{`
        @keyframes confettiFloat {
          0% { transform: translate(0,0) scale(0.4); opacity: 0; }
          40% { opacity: 1; }
          100% { transform: translate(var(--tx,0), 12px) scale(1); opacity: 0.9; }
        }
        @keyframes badgeIn {
          0% { transform: scale(0.86); opacity: 0; }
          70% { transform: scale(1.04); opacity: 1; }
          100% { transform: scale(1); }
        }
        @keyframes tickDraw {
          0% { transform: scale(0.6); opacity: 0; }
          100% { transform: scale(1); opacity: 1; }
        }
      `}</style>

      <AnimatePresence>
        {showFeedback && (
          <ActivityFeedbackSheet
            activity="focus-sprint"
            activityTitle={focusTitle}
            durationLabel={focusDuration}
            onSave={() => navigate('/home/karma-reward')}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

function StatCard({ number, label, labelColor }: { number: string; label: string; labelColor: string }) {
  return (
    <div
      className="rounded-[18px] py-3 flex flex-col items-center justify-center"
      style={{
        background: 'rgba(8, 13, 31, 0.80)',
        border: '1px solid rgba(139,124,255,0.26)',
        boxShadow: '0 16px 36px rgba(0,0,0,0.28)',
        height: 84,
      }}
    >
      <span className="text-white" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 800, fontSize: 26 }}>
        {number}
      </span>
      <span style={{ color: labelColor, fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 14, marginTop: 2 }}>
        {label}
      </span>
    </div>
  );
}

function ProgressItem({
  label,
  value,
  emoji,
  progress,
  fill,
}: {
  label: string;
  value: string;
  emoji?: string;
  progress: number;
  fill: string;
}) {
  return (
    <div>
      <p style={{ color: '#8F8AAE', fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 13 }}>
        {label}
      </p>
      <p className="mt-1 text-white flex items-center gap-1.5" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 800, fontSize: 17 }}>
        {value} {emoji && <span style={{ fontSize: 18 }}>{emoji}</span>}
      </p>
      <div
        className="mt-2 h-2 rounded-full overflow-hidden"
        style={{ background: 'rgba(139,124,255,0.16)' }}
      >
        <div
          className="h-full rounded-full"
          style={{ width: `${Math.max(0, Math.min(progress, 1)) * 100}%`, background: fill }}
        />
      </div>
    </div>
  );
}
