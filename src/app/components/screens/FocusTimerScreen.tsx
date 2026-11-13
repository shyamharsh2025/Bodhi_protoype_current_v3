import { ChevronLeft, X, Lock, Music, Pause, Play, Minus, Plus, Sparkles, ChevronRight, Droplets, Trash2, Brain, Clock } from 'lucide-react';
import { useNavigate } from 'react-router';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

export default function FocusTimerScreen() {
  const navigate = useNavigate();
  const [sessionMinutes, setSessionMinutes] = useState(45);
  const [elapsed, setElapsed] = useState(1);
  const [musicPlaying, setMusicPlaying] = useState(true);
  const [showImprove, setShowImprove] = useState(false);
  const [paused, setPaused] = useState(false);

  const total = sessionMinutes * 60;
  const remaining = Math.max(total - elapsed, 0);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => setElapsed((s) => s + 1), 1000);
    return () => clearInterval(id);
  }, [paused]);

  useEffect(() => {
    if (elapsed > total) setElapsed(total);
    if (elapsed >= total && total > 0) {
      sessionStorage.setItem(
        'bodhi-active-focus-session',
        JSON.stringify({
          title: 'Math Assignment – Chapter 3',
          durationLabel: `${sessionMinutes} min`,
          completedAt: new Date().toISOString(),
        }),
      );
      navigate('/home/focus-complete');
    }
  }, [total, elapsed, navigate, sessionMinutes]);

  const minutes = String(Math.floor(remaining / 60)).padStart(2, '0');
  const seconds = String(remaining % 60).padStart(2, '0');
  const progress = Math.min(elapsed / total, 1);

  const RING_SIZE = 280;
  const STROKE = 12;
  const radius = (RING_SIZE - STROKE) / 2;
  const circumference = 2 * Math.PI * radius;
  const dashOffset = circumference * (1 - progress);

  const improveOptions = [
    { icon: Droplets, title: 'Cold Exposure', desc: 'Wash your face with cold water to get a quick dopamine boost' },
    { icon: Trash2, title: 'Declutter', desc: 'Clear your space to free up mental bandwidth.' },
    { icon: Brain, title: 'Active Recall', desc: "Test yourself on what you're learning to strengthen memory." },
    { icon: Clock, title: 'Study Cycles', desc: 'Use 45–90 min deep work cycles for optimal brain performance.' },
  ];

  return (
    <div
      className="relative min-h-screen w-full overflow-hidden flex flex-col"
      style={{
        background:
          'radial-gradient(ellipse at 50% 30%, #0a1230 0%, #050a1c 50%, #020713 100%)',
      }}
    >
      <div className="pointer-events-none absolute top-[180px] left-1/2 -translate-x-1/2 w-[420px] h-[420px] rounded-full bg-[rgba(109,91,255,0.18)] blur-[100px]" />
      <div className="pointer-events-none absolute top-0 left-[18%] w-[1px] h-full bg-gradient-to-b from-transparent via-[rgba(109,91,255,0.10)] to-transparent" />
      <div className="pointer-events-none absolute top-0 right-[22%] w-[1px] h-full bg-gradient-to-b from-transparent via-[rgba(87,212,255,0.08)] to-transparent" />

      <div className="relative z-10 flex items-center justify-between pt-[70px] px-6">
        <button
          onClick={() => navigate(-1)}
          aria-label="Back"
          className="w-[46px] h-[46px] rounded-full flex items-center justify-center"
          style={{ background: 'rgba(255,255,255,0.055)', border: '1px solid rgba(255,255,255,0.06)' }}
        >
          <ChevronLeft className="w-5 h-5 text-white" />
        </button>
        <button
          onClick={() => navigate('/home')}
          aria-label="Close"
          className="w-[46px] h-[46px] rounded-full flex items-center justify-center"
          style={{ background: 'rgba(255,255,255,0.055)', border: '1px solid rgba(255,255,255,0.06)' }}
        >
          <X className="w-5 h-5 text-white" />
        </button>
      </div>

      <div className="relative z-10 mt-6 text-center px-6">
        <h1
          className="text-white"
          style={{ fontFamily: 'Inter, sans-serif', fontWeight: 800, fontSize: 24, lineHeight: '28px', letterSpacing: '-0.4px' }}
        >
          Math Assignment – Chapter 3
        </h1>
        <p className="mt-2" style={{ color: '#B7AEFF', fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 17 }}>
          {sessionMinutes} min session
        </p>
      </div>

      <div className="relative z-10 mt-7 mx-auto" style={{ width: RING_SIZE, height: RING_SIZE }}>
        <div
          className="absolute inset-2 rounded-full animate-[ringPulse_4s_ease-in-out_infinite]"
          style={{ boxShadow: '0 0 40px rgba(109,91,255,0.45), 0 0 80px rgba(109,91,255,0.18)' }}
        />
        <svg width={RING_SIZE} height={RING_SIZE} className="absolute inset-0 -rotate-90">
          <circle cx={RING_SIZE / 2} cy={RING_SIZE / 2} r={radius} stroke="rgba(109,91,255,0.28)" strokeWidth={STROKE} fill="none" />
          <circle
            cx={RING_SIZE / 2}
            cy={RING_SIZE / 2}
            r={radius}
            stroke="#6D5BFF"
            strokeWidth={STROKE}
            strokeLinecap="round"
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={dashOffset}
            style={{ filter: 'drop-shadow(0 0 8px rgba(109,91,255,0.7))' }}
          />
          <circle
            cx={RING_SIZE / 2}
            cy={RING_SIZE / 2}
            r={radius}
            stroke="#D8CCFF"
            strokeWidth={STROKE}
            strokeLinecap="round"
            fill="none"
            strokeDasharray={`${circumference * 0.04} ${circumference}`}
            strokeDashoffset={dashOffset}
            style={{ filter: 'drop-shadow(0 0 10px rgba(216,204,255,0.9))' }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span
            className="text-white"
            style={{ fontFamily: 'Inter, sans-serif', fontWeight: 800, fontSize: 56, lineHeight: '60px', letterSpacing: '-1px' }}
          >
            {minutes}:{seconds}
          </span>
          <div className="mt-3 flex items-center gap-2">
            <Lock className="w-4 h-4" style={{ color: '#7D6CFF' }} />
            <span style={{ color: '#B7B4D8', fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 16 }}>
              Stay locked in
            </span>
          </div>
        </div>
      </div>

      {/* Pause / End session controls */}
      <div className="relative z-10 mt-7 mx-8 grid grid-cols-2 gap-4">
        <button
          onClick={() => setPaused((p) => !p)}
          className="h-[52px] rounded-full flex items-center justify-center gap-3 active:scale-[0.98] transition-transform"
          style={{
            background: 'rgba(8, 13, 31, 0.74)',
            border: '1.2px solid rgba(139,124,255,0.34)',
            boxShadow: '0 14px 34px rgba(0,0,0,0.28)',
          }}
        >
          {paused ? (
            <Play className="w-5 h-5" style={{ color: '#B7AEFF' }} fill="#B7AEFF" />
          ) : (
            <Pause className="w-5 h-5" style={{ color: '#B7AEFF' }} fill="#B7AEFF" />
          )}
          <span className="text-white" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: 16 }}>
            {paused ? 'Resume' : 'Pause'}
          </span>
        </button>
        <button
          onClick={() => {
            sessionStorage.setItem(
              'bodhi-active-focus-session',
              JSON.stringify({
                title: 'Math Assignment – Chapter 3',
                durationLabel: `${sessionMinutes} min`,
                completedAt: new Date().toISOString(),
              }),
            );
            navigate('/home/focus-complete');
          }}
          className="h-[52px] rounded-full flex items-center justify-center gap-3 active:scale-[0.98] transition-transform"
          style={{
            background: 'rgba(255, 90, 100, 0.08)',
            border: '1.2px solid rgba(255, 118, 118, 0.38)',
            boxShadow: '0 14px 34px rgba(255,90,100,0.08)',
          }}
        >
          <span
            className="w-5 h-5 rounded-[5px] flex items-center justify-center"
            style={{ border: '1.6px solid #FF7777' }}
          >
            <X className="w-3 h-3" style={{ color: '#FF7777' }} strokeWidth={3} />
          </span>
          <span style={{ color: '#FF8A8A', fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: 16 }}>
            End session
          </span>
        </button>
      </div>

      <div className="relative z-10 mt-5 mx-6">
        <div
          className="rounded-[22px] p-4 flex items-center gap-4"
          style={{
            background: 'rgba(9, 14, 32, 0.78)',
            border: '1px solid rgba(139,124,255,0.22)',
            boxShadow: '0 18px 40px rgba(0,0,0,0.28)',
          }}
        >
          <div
            className="w-12 h-12 rounded-full flex items-center justify-center shrink-0"
            style={{ background: 'rgba(9, 15, 30, 0.55)', border: '1px solid rgba(145, 125, 255, 0.18)' }}
          >
            <Music className="w-5 h-5" style={{ color: '#7D6CFF' }} />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-white truncate" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 800, fontSize: 16 }}>
              Deep Focus · Instrumental
            </p>
            <p className="mt-0.5" style={{ color: '#B7B4D8', fontFamily: 'Inter, sans-serif', fontWeight: 500, fontSize: 14 }}>
              Low music
            </p>
          </div>
          <button
            onClick={() => setMusicPlaying((p) => !p)}
            aria-label={musicPlaying ? 'Pause music' : 'Play music'}
            className="w-12 h-12 rounded-full flex items-center justify-center shrink-0"
            style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.05)' }}
          >
            {musicPlaying ? <Pause className="w-5 h-5 text-white" fill="white" /> : <Play className="w-5 h-5 text-white" fill="white" />}
          </button>
        </div>
      </div>

      <div className="relative z-10 mt-7 mx-6 flex items-start justify-between">
        <div className="flex flex-col items-center">
          <button
            onClick={() => setSessionMinutes((m) => Math.max(5, m - 10))}
            aria-label="Reduce 10 minutes"
            className="w-[60px] h-[60px] rounded-full flex items-center justify-center active:scale-95 transition-transform"
            style={{ background: 'rgba(255,255,255,0.055)', border: '1px solid rgba(255,255,255,0.05)' }}
          >
            <Minus className="w-6 h-6 text-white" strokeWidth={2.5} />
          </button>
          <span className="mt-2.5" style={{ color: '#B7B4D8', fontFamily: 'Inter, sans-serif', fontWeight: 500, fontSize: 14 }}>
            -10 min
          </span>
        </div>

        <div className="flex flex-col items-center pt-1">
          <span className="text-white" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 800, fontSize: 30, lineHeight: '34px' }}>
            {String(sessionMinutes).padStart(2, '0')}:00
          </span>
          <span style={{ color: '#B7B4D8', fontFamily: 'Inter, sans-serif', fontWeight: 500, fontSize: 14, marginTop: 2 }}>
            Session time
          </span>
          <button>
            <span style={{ color: '#7D6CFF', fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: 14 }}>
              Edit time
            </span>
          </button>
        </div>

        <div className="flex flex-col items-center">
          <button
            onClick={() => setSessionMinutes((m) => Math.min(180, m + 10))}
            aria-label="Add 10 minutes"
            className="w-[60px] h-[60px] rounded-full flex items-center justify-center active:scale-95 transition-transform"
            style={{ background: 'rgba(255,255,255,0.055)', border: '1px solid rgba(255,255,255,0.05)' }}
          >
            <Plus className="w-6 h-6 text-white" strokeWidth={2.5} />
          </button>
          <span className="mt-2.5" style={{ color: '#B7B4D8', fontFamily: 'Inter, sans-serif', fontWeight: 500, fontSize: 14 }}>
            +10 min
          </span>
        </div>
      </div>

      <div className="relative z-10 mt-6 mb-8 mx-6">
        <button
          onClick={() => setShowImprove(true)}
          className="w-full text-left rounded-[22px] p-4 flex items-center gap-4 active:scale-[0.99] transition-transform"
          style={{
            background: 'rgba(9, 14, 32, 0.78)',
            border: '1px solid rgba(139,124,255,0.22)',
            boxShadow: '0 18px 40px rgba(0,0,0,0.28)',
          }}
        >
          <div
            className="w-12 h-12 rounded-full flex items-center justify-center shrink-0"
            style={{
              background: 'radial-gradient(circle at 30% 30%, rgba(240,199,255,0.25), rgba(139,124,255,0.15))',
              border: '1px solid rgba(240,199,255,0.25)',
              boxShadow: '0 0 18px rgba(240,199,255,0.25)',
            }}
          >
            <Sparkles className="w-5 h-5" style={{ color: '#F0C7FF' }} />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-white" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 800, fontSize: 16 }}>
              Improve your focus
            </p>
            <p className="mt-0.5" style={{ color: '#B7B4D8', fontFamily: 'Inter, sans-serif', fontWeight: 500, fontSize: 14 }}>
              Tips & tools to go deeper
            </p>
          </div>
          <ChevronRight className="w-6 h-6 text-white shrink-0" />
        </button>
      </div>

      {showImprove && createPortal(
        <div className="fixed inset-0 z-[9999] flex items-end justify-center">
          <button
            aria-label="Close"
            onClick={() => setShowImprove(false)}
            className="absolute inset-0 bg-[rgba(2,7,19,0.6)] backdrop-blur-[2px]"
          />
          <div
            className="relative w-full max-w-[440px] rounded-t-[28px] max-h-[85vh] overflow-y-auto"
            style={{
              background: 'linear-gradient(180deg, #0a1230 0%, #050a1c 100%)',
              border: '1px solid rgba(139,124,255,0.22)',
              boxShadow: '0 -20px 50px rgba(0,0,0,0.5)',
              animation: 'slideUp 0.3s ease-out',
            }}
          >
            <button
              onClick={() => setShowImprove(false)}
              aria-label="Close"
              className="w-full flex justify-center pt-4 pb-2"
            >
              <div className="w-12 h-1.5 rounded-full bg-[#7D6CFF]" />
            </button>
            <div className="px-7 pt-3 pb-10">
              <h3 className="text-white" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 800, fontSize: 22 }}>
                Improve your focus
              </h3>
              <p style={{ color: '#B7B4D8', fontFamily: 'Inter, sans-serif', fontWeight: 500, fontSize: 14, marginTop: 4 }}>
                Small tweaks. Big impact.
              </p>
              <div className="mt-5 flex flex-col gap-3">
                {improveOptions.map((opt) => {
                  const Icon = opt.icon;
                  return (
                    <button
                      key={opt.title}
                      onClick={() => setShowImprove(false)}
                      className="w-full rounded-[20px] p-4 flex items-center gap-4 text-left"
                      style={{
                        background: 'rgba(10, 16, 35, 0.76)',
                        border: '1px solid rgba(139,124,255,0.22)',
                        boxShadow: '0 8px 24px rgba(0,0,0,0.35)',
                      }}
                    >
                      <div
                        className="w-12 h-12 rounded-full flex items-center justify-center shrink-0"
                        style={{ background: 'rgba(9, 15, 30, 0.55)', border: '1px solid rgba(145, 125, 255, 0.22)' }}
                      >
                        <Icon className="w-5 h-5" style={{ color: '#7D6CFF' }} />
                      </div>
                      <div className="flex-1">
                        <p className="text-white" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 800, fontSize: 16 }}>
                          {opt.title}
                        </p>
                        <p style={{ color: '#B7B4D8', fontFamily: 'Inter, sans-serif', fontWeight: 500, fontSize: 13, marginTop: 2 }}>
                          {opt.desc}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
          <style>{`@keyframes slideUp { from { transform: translateY(100%); } to { transform: translateY(0); } }`}</style>
        </div>,
        document.body
      )}

      <style>{`
        @keyframes ringPulse {
          0%, 100% { opacity: 0.7; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.02); }
        }
      `}</style>
    </div>
  );
}
