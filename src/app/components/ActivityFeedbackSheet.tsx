import { Check, Sparkles, TrendingUp } from 'lucide-react';
import { animate, motion, useMotionValue, useReducedMotion, useTransform } from 'motion/react';
import { useEffect, useState } from 'react';

type FeedbackOption = {
  id: string;
  label: string;
  emoji: string;
  delta: number;
  fullWidth?: boolean;
};

export type FeedbackActivity = 'meditation' | 'focus-sprint' | 'journaling';

type FeedbackConfig = {
  question: string;
  helper: string;
  ariaLabel: string;
  options: FeedbackOption[];
};

const feedbackConfigs: Record<FeedbackActivity, FeedbackConfig> = {
  meditation: {
    question: 'How do you feel now?',
    helper: 'Choose what fits best after this meditation.',
    ariaLabel: 'How do you feel after the meditation?',
    options: [
      { id: 'calmer', label: 'Calmer', emoji: '😌', delta: 10 },
      { id: 'clearer', label: 'Clearer', emoji: '✨', delta: 10 },
      { id: 'grounded', label: 'Grounded', emoji: '🧘', delta: 10 },
      { id: 'inspired', label: 'Inspired', emoji: '🤩', delta: 10 },
      { id: 'unsettled', label: 'Still unsettled', emoji: '😕', delta: 0, fullWidth: true },
    ],
  },
  'focus-sprint': {
    question: 'How did that session feel?',
    helper: 'Choose what best reflects your focus session.',
    ariaLabel: 'How did the focus session feel?',
    options: [
      { id: 'focused', label: 'Focused', emoji: '🎯', delta: 15 },
      { id: 'accomplished', label: 'Accomplished', emoji: '🏆', delta: 15 },
      { id: 'motivated', label: 'Motivated', emoji: '⚡', delta: 12 },
      { id: 'tired-worth-it', label: 'Tired, but worth it', emoji: '😮‍💨', delta: 10 },
      { id: 'unsatisfied', label: 'Unsatisfied', emoji: '😕', delta: 0, fullWidth: true },
    ],
  },
  journaling: {
    question: 'How do you feel after writing?',
    helper: 'Choose what fits best after this entry.',
    ariaLabel: 'How do you feel after writing?',
    options: [
      { id: 'lighter', label: 'Lighter', emoji: '🪶', delta: 15 },
      { id: 'clearer', label: 'Clearer', emoji: '✨', delta: 15 },
      { id: 'settled', label: 'Settled', emoji: '🧘', delta: 12 },
      { id: 'unresolved', label: 'Unresolved', emoji: '🧩', delta: 0 },
      { id: 'overwhelmed', label: 'Overwhelmed', emoji: '😵‍💫', delta: 0, fullWidth: true },
    ],
  },
};

function getStoredScore() {
  const rawScore = sessionStorage.getItem('bodhi-dopameter-score');
  if (rawScore === null) return 68;
  const storedScore = Number(rawScore);
  return Number.isFinite(storedScore) && storedScore >= 0 ? Math.min(storedScore, 100) : 68;
}

export default function ActivityFeedbackSheet({
  activity,
  activityTitle,
  durationLabel,
  onSave,
}: {
  activity: FeedbackActivity;
  activityTitle: string;
  durationLabel: string;
  onSave: () => void;
}) {
  const shouldReduceMotion = useReducedMotion();
  const config = feedbackConfigs[activity];
  const [selected, setSelected] = useState<FeedbackOption | null>(null);
  const [isReadyForInput, setIsReadyForInput] = useState(false);
  const [initialScore] = useState(getStoredScore);
  const [visibleScore, setVisibleScore] = useState(initialScore);
  const animatedScore = useMotionValue(initialScore);
  const arcProgress = useTransform(animatedScore, [0, 100], [0, 1]);
  const knobLeft = useTransform(animatedScore, (value) => {
    const angle = Math.PI + Math.PI * (value / 100);
    return `${((172.5 + 145 * Math.cos(angle)) / 345) * 100}%`;
  });
  const knobTop = useTransform(animatedScore, (value) => {
    const angle = Math.PI + Math.PI * (value / 100);
    return `${((202 + 145 * Math.sin(angle)) / 270) * 100}%`;
  });

  useEffect(() => {
    const timer = window.setTimeout(() => setIsReadyForInput(true), shouldReduceMotion ? 100 : 380);
    return () => window.clearTimeout(timer);
  }, [shouldReduceMotion]);

  const chooseFeedback = (option: FeedbackOption) => {
    if (!isReadyForInput) return;
    const nextScore = Math.min(initialScore + option.delta, 100);
    setSelected(option);
    setVisibleScore(nextScore);
    navigator.vibrate?.(10);
    animate(animatedScore, nextScore, {
      duration: shouldReduceMotion ? 0.2 : 0.72,
      ease: [0.22, 1, 0.36, 1],
    });
  };

  const saveFeedback = () => {
    if (!selected) return;
    const nextScore = Math.min(initialScore + selected.delta, 100);
    const recordedAt = new Date().toISOString();
    const mood =
      selected.id === 'inspired' || selected.id === 'motivated' || selected.id === 'accomplished'
        ? 'Inspired'
        : selected.id === 'overwhelmed'
          ? 'Overwhelmed'
          : selected.id === 'unresolved'
            ? 'Confused'
            : 'Grounded';
    const feedbackRecord = {
      activity,
      title: activityTitle,
      durationLabel,
      response: selected.label,
      delta: selected.delta,
      scoreBefore: initialScore,
      scoreAfter: nextScore,
      recordedAt,
    };

    sessionStorage.setItem('bodhi-dopameter-score', `${nextScore}`);
    sessionStorage.setItem('bodhi-dopameter-last-delta', `${selected.delta}`);
    sessionStorage.setItem('bodhi-dopameter-mood', mood);
    sessionStorage.setItem('bodhi-last-feedback', selected.label);
    sessionStorage.setItem('bodhi-last-feedback-activity', activity);
    sessionStorage.setItem('bodhi-activity-feedback', JSON.stringify(feedbackRecord));
    sessionStorage.setItem('bodhi-reward-context', JSON.stringify(feedbackRecord));

    if (activity === 'meditation') {
      sessionStorage.setItem('bodhi-last-meditation-feedback', selected.label);
      sessionStorage.setItem(
        'bodhi-meditation-feedback',
        JSON.stringify({ ...feedbackRecord, meditation: activityTitle }),
      );
    } else if (activity === 'focus-sprint') {
      sessionStorage.setItem('bodhi-last-focus-feedback', selected.label);
      sessionStorage.setItem('bodhi-focus-feedback', JSON.stringify(feedbackRecord));
    } else {
      sessionStorage.setItem('bodhi-last-journal-feedback', selected.label);
      sessionStorage.setItem('bodhi-journal-feedback', JSON.stringify(feedbackRecord));
    }
    navigator.vibrate?.(18);
    onSave();
  };

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-end justify-center bg-[#171638]/48 px-0 backdrop-blur-[2px]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: shouldReduceMotion ? 0.15 : 0.24 }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="feedback-title"
    >
      <motion.section
        className="relative max-h-[76dvh] w-full max-w-md overflow-y-auto rounded-t-[34px] border border-white/80 bg-[linear-gradient(180deg,rgba(255,255,255,0.98)_0%,rgba(249,248,255,0.99)_100%)] px-5 pb-[max(24px,env(safe-area-inset-bottom))] pt-3 shadow-[0px_-22px_54px_rgba(41,37,100,0.20)]"
        initial={shouldReduceMotion ? { opacity: 0 } : { y: '100%' }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      >
        <div className="mx-auto mb-3 h-1.5 w-12 rounded-full bg-[#C9C6DC]" aria-hidden="true" />
        <h2 id="feedback-title" className="text-center text-[20px] font-extrabold leading-7 text-[#24253A]">
          Dopameter
        </h2>

        <div className="relative mx-auto -mt-1 aspect-[345/270] w-full max-w-[345px] overflow-visible">
          <div className="pointer-events-none absolute top-6 h-[194px] w-full rounded-full bg-[rgba(88,64,212,0.11)] blur-[52px]" />
          <Sparkles className="absolute right-7 top-[58px] h-4 w-4 text-[#AFA7FF]/45" strokeWidth={2} aria-hidden="true" />
          <Sparkles className="absolute left-8 top-[154px] h-3.5 w-3.5 text-[#BFD8FF]/55" strokeWidth={2} aria-hidden="true" />

          <svg className="absolute inset-0 h-full w-full overflow-visible" viewBox="0 0 345 270" fill="none" aria-hidden="true">
            <defs>
              <linearGradient id="feedbackDopameterArc" x1="24" y1="200" x2="314" y2="62" gradientUnits="userSpaceOnUse">
                <stop stopColor="#F2C7FF" />
                <stop offset="0.3" stopColor="#B796FF" />
                <stop offset="0.62" stopColor="#745BF2" />
                <stop offset="1" stopColor="#4A32D4" />
              </linearGradient>
              <linearGradient id="feedbackDopameterTrack" x1="29" y1="203" x2="316" y2="72" gradientUnits="userSpaceOnUse">
                <stop stopColor="#F2DEFF" stopOpacity="0.82" />
                <stop offset="0.55" stopColor="#E6E3FF" stopOpacity="0.72" />
                <stop offset="1" stopColor="#DCEBFF" stopOpacity="0.68" />
              </linearGradient>
              <filter id="feedbackDopameterArcGlow" x="-30" y="-16" width="405" height="268" filterUnits="userSpaceOnUse">
                <feGaussianBlur stdDeviation="8" result="blur" />
                <feColorMatrix
                  in="blur"
                  type="matrix"
                  values="0 0 0 0 0.345 0 0 0 0 0.251 0 0 0 0 0.831 0 0 0 0.58 0"
                />
                <feBlend in="SourceGraphic" mode="normal" />
              </filter>
              <filter id="feedbackDopameterRailGlow" x="-42" y="-32" width="429" height="294" filterUnits="userSpaceOnUse">
                <feGaussianBlur stdDeviation="9" result="blur" />
                <feColorMatrix
                  in="blur"
                  type="matrix"
                  values="0 0 0 0 1 0 0 0 0 0.972 0 0 0 0 1 0 0 0 1 0"
                />
                <feBlend in="SourceGraphic" mode="normal" />
              </filter>
            </defs>

            {[205, 230, 270, 310, 335].map((angle) => {
              const outer = {
                x: 172.5 + 181 * Math.cos((angle * Math.PI) / 180),
                y: 202 + 181 * Math.sin((angle * Math.PI) / 180),
              };
              const inner = {
                x: 172.5 + 171 * Math.cos((angle * Math.PI) / 180),
                y: 202 + 171 * Math.sin((angle * Math.PI) / 180),
              };
              return (
                <line
                  key={angle}
                  x1={outer.x.toFixed(2)}
                  y1={outer.y.toFixed(2)}
                  x2={inner.x.toFixed(2)}
                  y2={inner.y.toFixed(2)}
                  stroke="rgba(88,64,212,0.34)"
                  strokeWidth="4"
                  strokeLinecap="round"
                />
              );
            })}
            <path
              d="M 27.50 202.00 A 145 145 0 0 1 317.50 202.00"
              stroke="rgba(255,255,255,0.78)"
              strokeWidth="36"
              fill="none"
              strokeLinecap="round"
              opacity="0.9"
              filter="url(#feedbackDopameterRailGlow)"
            />
            <path
              d="M 27.50 202.00 A 145 145 0 0 1 317.50 202.00"
              stroke="rgba(255,255,255,0.62)"
              strokeWidth="31"
              fill="none"
              strokeLinecap="round"
              opacity="0.88"
            />
            <path
              d="M 27.50 202.00 A 145 145 0 0 1 317.50 202.00"
              stroke="url(#feedbackDopameterTrack)"
              strokeWidth="28"
              fill="none"
              strokeLinecap="round"
            />
            <motion.path
              d="M 27.50 202.00 A 145 145 0 0 1 317.50 202.00"
              stroke="url(#feedbackDopameterArc)"
              strokeWidth="36"
              strokeLinecap="round"
              fill="none"
              opacity="0.28"
              pathLength="1"
              style={{ pathLength: arcProgress }}
              filter="url(#feedbackDopameterArcGlow)"
            />
            <motion.path
              d="M 27.50 202.00 A 145 145 0 0 1 317.50 202.00"
              stroke="url(#feedbackDopameterArc)"
              strokeWidth="28"
              strokeLinecap="round"
              fill="none"
              pathLength="1"
              style={{ pathLength: arcProgress }}
            />
          </svg>

          <motion.div
            className="absolute z-20 h-9 w-9 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white shadow-[0px_7px_15px_rgba(84,75,187,0.30),0px_0px_14px_rgba(255,255,255,0.94)] ring-[2px] ring-white/75"
            style={{ left: knobLeft, top: knobTop }}
            animate={{ scale: selected ? [1, 1.1, 1] : 1 }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.72 }}
          >
            <div className="absolute inset-[8px] rounded-full bg-[radial-gradient(circle_at_35%_25%,#FFFFFF_0%,#9C8DFF_45%,#5840D4_100%)] shadow-[inset_0px_2px_5px_rgba(255,255,255,0.42)]" />
            <div className="absolute left-[11px] top-[9px] h-2 w-2 rounded-full bg-white/80 blur-[1px]" />
          </motion.div>

          <div className="absolute inset-x-0 top-[104px] flex flex-col items-center text-center">
            <div className="absolute top-1/2 h-[118px] w-[268px] -translate-y-1/2 rounded-full bg-white/60 blur-[30px]" />
            <div className="relative flex items-start justify-center text-[#0E1254]">
              <span className="inline-block min-w-[2ch] text-[52px] font-bold leading-[52px] tracking-normal tabular-nums">{visibleScore}</span>
              <span className="mt-2 text-[24px] font-bold leading-7">%</span>
            </div>
            <p className="relative mt-2 text-[18px] font-bold leading-7 text-[#5840D4]">
              {selected ? `Feeling ${selected.label}` : 'Your current Dopameter'}
            </p>
            <div className="relative mt-1 flex min-h-4 items-center justify-center gap-1.5 text-[12px] font-semibold leading-4">
              {selected && selected.delta > 0 ? (
                <>
                  <TrendingUp className="h-3.5 w-3.5 text-[#2FA34A]" strokeWidth={2.4} />
                  <span className="text-[#2FA34A]">+{selected.delta} on Dopameter</span>
                </>
              ) : selected ? (
                <span className="text-[#5A5B62]">No score change — and that’s okay</span>
              ) : (
                <span className="text-[#5A5B62]">Take a moment and check in</span>
              )}
            </div>
          </div>
        </div>

        <div className="mt-1 text-center">
          <div className="flex items-center justify-center gap-2">
            <h3 className="text-[25px] font-extrabold leading-8 text-[#24253A]">{config.question}</h3>
            <Sparkles className="h-5 w-5 text-[#8171F2]" strokeWidth={2} aria-hidden="true" />
          </div>
          <p className="mt-1 text-[14px] font-medium leading-5 text-[#6B6B86]">
            {config.helper}
          </p>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-3" role="radiogroup" aria-label={config.ariaLabel}>
          {config.options.map((option) => {
            const isSelected = selected?.id === option.id;
            return (
              <motion.button
                key={option.id}
                type="button"
                role="radio"
                aria-checked={isSelected}
                disabled={!isReadyForInput}
                onClick={() => chooseFeedback(option)}
                whileTap={{ scale: 0.97 }}
                className={`relative flex min-h-[66px] items-center justify-center gap-3 rounded-[20px] border px-3 text-[15px] font-extrabold transition-colors focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#8171F2]/30 ${
                  option.fullWidth ? 'col-span-2' : ''
                } ${
                  isSelected
                    ? 'border-[#6B50E8] bg-[#F8F6FF] text-[#6349E6] shadow-[0px_8px_22px_rgba(84,64,212,0.14)]'
                    : 'border-[#EEECF6] bg-white text-[#292A3D] shadow-[0px_8px_22px_rgba(65,58,120,0.07)]'
                }`}
              >
                <span className="text-[28px] leading-none" aria-hidden="true">{option.emoji}</span>
                <span>{option.label}</span>
                {isSelected && (
                  <motion.span
                    className="absolute right-3 flex h-6 w-6 items-center justify-center rounded-full bg-[#6349E6] text-white"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 430, damping: 22 }}
                  >
                    <Check className="h-4 w-4" strokeWidth={3} />
                  </motion.span>
                )}
              </motion.button>
            );
          })}
        </div>

        <motion.button
          type="button"
          disabled={!selected}
          onClick={saveFeedback}
          whileTap={selected ? { scale: 0.98 } : undefined}
          animate={{ opacity: selected ? 1 : 0.48 }}
          className="mt-4 flex min-h-12 w-full items-center justify-center rounded-full bg-[linear-gradient(105deg,#6F55E8_0%,#5840D4_52%,#397ECF_120%)] px-6 text-[16px] font-extrabold text-white shadow-[0px_12px_24px_rgba(84,64,212,0.24)] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#8171F2]/35 disabled:cursor-not-allowed"
        >
          {selected ? 'Save check-in' : 'Choose how you feel'}
        </motion.button>
      </motion.section>
    </motion.div>
  );
}
