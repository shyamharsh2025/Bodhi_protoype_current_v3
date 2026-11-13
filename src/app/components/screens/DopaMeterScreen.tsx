import {
  ArrowLeft,
  ArrowRight,
  BarChart3,
  Check,
  Clock3,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  MoreHorizontal,
  MoveHorizontal,
  RefreshCw,
  Sparkles,
  TrendingDown,
  TrendingUp,
  Zap,
} from 'lucide-react';
import type { ReactNode } from 'react';
import { useMemo, useRef, useState } from 'react';
import {
  AnimatePresence,
  animate,
  motion,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from 'motion/react';
import { useNavigate } from 'react-router';
import VoicePoweredOrb from '../VoicePoweredOrb';

type Mood =
  | 'Anxious'
  | 'Confused'
  | 'Grounded'
  | 'Tired'
  | 'Inspired'
  | 'Stressed'
  | 'Overwhelmed'
  | 'Frustrated'
  | 'Lonely'
  | 'Low';

type Recommendation = {
  title: string;
  description: string;
  boost: string;
  route: string;
};

const primaryMoods: Array<{ label: Mood; emoji: string }> = [
  { label: 'Anxious', emoji: '😟' },
  { label: 'Confused', emoji: '🤔' },
  { label: 'Grounded', emoji: '☺️' },
  { label: 'Tired', emoji: '😔' },
  { label: 'Inspired', emoji: '🤩' },
];

const additionalMoods: Array<{ label: Mood; emoji: string }> = [
  { label: 'Stressed', emoji: '😣' },
  { label: 'Overwhelmed', emoji: '🤯' },
  { label: 'Frustrated', emoji: '😠' },
  { label: 'Lonely', emoji: '🙁' },
  { label: 'Low', emoji: '😞' },
];

const allMoods = [...primaryMoods, ...additionalMoods];
const primaryMoodLabels = new Set(primaryMoods.map((mood) => mood.label));

const chakraRecommendationRoutes: Partial<Record<string, string>> = {
  'Ground Chakra Meditation': '/home/chakra-meditation/root',
  'Root Chakra Meditation': '/home/chakra-meditation/root',
  'Sacral Chakra Meditation': '/home/chakra-meditation/sacral',
  'Solar Plexus Chakra Meditation': '/home/chakra-meditation/solar-plexus',
  'Heart Chakra Meditation': '/home/chakra-meditation/heart',
  'Throat Chakra Meditation': '/home/chakra-meditation/throat',
  'Third Eye Chakra Meditation': '/home/chakra-meditation/third-eye',
  'Crown Chakra Meditation': '/home/chakra-meditation/crown',
};

const recommendations: Record<Mood, Recommendation> = {
  Anxious: {
    title: 'Ground Chakra Meditation',
    description: 'Anchor your body and settle your nervous system.',
    boost: '+10% calm boost',
    route: '/home/chakra-meditation/root',
  },
  Confused: {
    title: 'Third Eye Chakra Meditation',
    description: 'Clear mental fog and return to one steady direction.',
    boost: '+9% clarity boost',
    route: '/home/chakra-meditation/third-eye',
  },
  Grounded: {
    title: '10-min Focus Sprint',
    description: 'Use this calm state to enter deep, steady focus.',
    boost: '+12% focus boost',
    route: '/home/focus-sprint',
  },
  Tired: {
    title: 'Breathework',
    description: 'Reset your energy with a short guided breath practice.',
    boost: '+8% energy boost',
    route: '/home/breathwork-prep',
  },
  Inspired: {
    title: 'Journaling',
    description: 'Capture the thought while your mind feels open.',
    boost: '+11% insight boost',
    route: '/home/explore/thought-bank/write',
  },
  Stressed: {
    title: 'Breathework',
    description: 'Release pressure with a short nervous-system reset.',
    boost: '+10% calm boost',
    route: '/home/breathwork-prep',
  },
  Overwhelmed: {
    title: 'Ground Chakra Meditation',
    description: 'Return to your body before choosing the next step.',
    boost: '+11% grounding boost',
    route: '/home/chakra-meditation/root',
  },
  Frustrated: {
    title: 'Breathework',
    description: 'Clear the charge before moving back into action.',
    boost: '+9% reset boost',
    route: '/home/breathwork-prep',
  },
  Lonely: {
    title: 'Journaling',
    description: 'Name what you need and feel a little more held.',
    boost: '+8% clarity boost',
    route: '/home/explore/thought-bank/write',
  },
  Low: {
    title: 'Breathework',
    description: 'Start gently and bring a little energy back online.',
    boost: '+8% energy boost',
    route: '/home/breathwork-prep',
  },
};

function getRecommendationRoute(recommendation: Recommendation) {
  return chakraRecommendationRoutes[recommendation.title] ?? recommendation.route;
}

const neutralDopameterScore = 68;

const transitionMotion = {
  cardTap: 0.2,
  release: 0.2,
  gauge: 0.86,
  recommendation: 0.34,
  reduced: 0.24,
  easeOut: [0.22, 1, 0.36, 1] as const,
  easeIn: [0.4, 0, 1, 1] as const,
};

const dopameterStates: Record<
  Mood,
  {
    delta: number;
    feeling: string;
  }
> = {
  Anxious: {
    delta: -15,
    feeling: 'Feeling Anxious',
  },
  Confused: {
    delta: -10,
    feeling: 'Feeling Confused',
  },
  Grounded: {
    delta: 10,
    feeling: 'Feeling Grounded',
  },
  Tired: {
    delta: -15,
    feeling: 'Feeling Tired',
  },
  Inspired: {
    delta: 15,
    feeling: 'Feeling Inspired',
  },
  Stressed: {
    delta: -15,
    feeling: 'Feeling Stressed',
  },
  Overwhelmed: {
    delta: -15,
    feeling: 'Feeling Overwhelmed',
  },
  Frustrated: {
    delta: -10,
    feeling: 'Feeling Frustrated',
  },
  Lonely: {
    delta: -10,
    feeling: 'Feeling Lonely',
  },
  Low: {
    delta: -15,
    feeling: 'Feeling Low',
  },
};

const week = [
  { day: 'Mo', value: 62, color: '#F5A623' },
  { day: 'Tu', value: 71, color: '#5840D4' },
  { day: 'We', value: 48, color: '#F5A623' },
  { day: 'Th', value: 82, color: '#2FA34A' },
  { day: 'Fr', value: 78, color: '#5840D4', selected: true },
  { day: 'Sa', value: null, color: '#D8D7E2', future: true },
  { day: 'Su', value: null, color: '#D8D7E2', future: true },
];

export default function DopaMeterScreen() {
  const navigate = useNavigate();
  const shouldReduceMotion = useReducedMotion();
  const [showTutorial, setShowTutorial] = useState(true);
  const [showFeelingSelector, setShowFeelingSelector] = useState(false);
  const [resultFeeling, setResultFeeling] = useState<FeelingOption | null>(null);
  const initialMood = useMemo<Mood>(() => {
    const savedMood = sessionStorage.getItem('bodhi-dopameter-mood') as Mood | null;
    return savedMood && allMoods.some((mood) => mood.label === savedMood) ? savedMood : 'Grounded';
  }, []);
  const initialScore = useMemo(() => {
    const savedScore = Number(sessionStorage.getItem('bodhi-dopameter-score'));
    if (Number.isFinite(savedScore) && savedScore >= 0) return Math.min(savedScore, 100);
    return neutralDopameterScore + (dopameterStates[initialMood]?.delta ?? dopameterStates.Grounded.delta);
  }, [initialMood]);
  const [selectedMood, setSelectedMood] = useState<Mood>(initialMood);
  const [displayedMood, setDisplayedMood] = useState<Mood>(initialMood);
  const [recommendationMood, setRecommendationMood] = useState<Mood>(initialMood);
  const [feedbackOverride, setFeedbackOverride] = useState(
    () => sessionStorage.getItem('bodhi-last-feedback') ?? sessionStorage.getItem('bodhi-last-meditation-feedback'),
  );
  const [transitionPhase, setTransitionPhase] = useState<'idle' | 'release' | 'reveal'>('idle');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [announcement, setAnnouncement] = useState('');
  const [moodCardExpanded, setMoodCardExpanded] = useState(false);
  const recommendation = recommendations[recommendationMood] ?? recommendations.Grounded;
  const dopameterState = dopameterStates[displayedMood] ?? dopameterStates.Grounded;
  const recommendationRoute = getRecommendationRoute(recommendation);
  const animatedScore = useMotionValue(initialScore);
  const displayedScore = useTransform(animatedScore, (value) => `${Math.round(value)}`);
  const activeDelta = feedbackOverride
    ? Number(sessionStorage.getItem('bodhi-dopameter-last-delta') ?? 0)
    : dopameterState.delta;
  const activeFeeling = feedbackOverride ? `Feeling ${feedbackOverride}` : dopameterState.feeling;
  const trendIsPositive = activeDelta > 0;
  const trendText = activeDelta === 0 ? 'No change on Dopameter' : `${trendIsPositive ? '+' : ''}${activeDelta} on Dopameter`;
  const visibleMoods = moodCardExpanded ? allMoods : primaryMoods;
  const transitionRun = useRef(0);

  const meter = useMemo(() => {
    const centerX = 172.5;
    const centerY = 202;
    const radius = 145;
    const startAngle = 180;
    const totalSweep = 180;
    const trackEndAngle = startAngle + totalSweep;
    const toPoint = (angle: number) => {
      const rad = (angle * Math.PI) / 180;
      return {
        x: centerX + radius * Math.cos(rad),
        y: centerY + radius * Math.sin(rad),
      };
    };
    const start = toPoint(startAngle);
    const trackEnd = toPoint(trackEndAngle);
    const path = (from: typeof start, to: typeof start) =>
      `M ${from.x.toFixed(2)} ${from.y.toFixed(2)} A ${radius} ${radius} 0 0 1 ${to.x.toFixed(2)} ${to.y.toFixed(2)}`;

    return {
      centerX,
      centerY,
      radius,
      start,
      trackEnd,
      trackPath: path(start, trackEnd),
    };
  }, []);

  const arcProgress = useTransform(animatedScore, [0, 100], [0, 1]);
  const knobLeft = useTransform(animatedScore, (value) => {
    const angle = Math.PI + Math.PI * (value / 100);
    return `${((meter.centerX + meter.radius * Math.cos(angle)) / 345) * 100}%`;
  });
  const knobTop = useTransform(animatedScore, (value) => {
    const angle = Math.PI + Math.PI * (value / 100);
    return `${((meter.centerY + meter.radius * Math.sin(angle)) / 270) * 100}%`;
  });

  if (showTutorial) {
    return (
      <DopameterTutorial
        onBack={() => navigate(-1)}
        onBegin={() => {
          setShowTutorial(false);
          setShowFeelingSelector(true);
        }}
        reduceMotion={Boolean(shouldReduceMotion)}
      />
    );
  }

  if (showFeelingSelector) {
    return (
      <DopameterFeelingSelectorV2
        onBack={() => {
          setShowFeelingSelector(false);
          setShowTutorial(true);
        }}
        onChat={() => navigate('/home/bro')}
        onConfirm={(feeling) => {
          setShowFeelingSelector(false);
          setResultFeeling(feeling);
        }}
        reduceMotion={Boolean(shouldReduceMotion)}
      />
    );
  }

  if (resultFeeling) {
    return (
      <DopameterResultScreen
        feeling={resultFeeling}
        onBack={() => {
          setResultFeeling(null);
          setShowFeelingSelector(true);
        }}
        onChangeFeeling={() => {
          setResultFeeling(null);
          setShowFeelingSelector(true);
        }}
        onChat={() => navigate('/home/bro')}
        onStart={(route) => navigate(route)}
        reduceMotion={Boolean(shouldReduceMotion)}
      />
    );
  }

  const selectMood = async (nextMood: Mood) => {
    if (isTransitioning || nextMood === selectedMood) return;

    const run = ++transitionRun.current;
    const nextState = dopameterStates[nextMood];
    const nextScore = neutralDopameterScore + nextState.delta;
    setSelectedMood(nextMood);
    setFeedbackOverride(null);
    setIsTransitioning(true);
    navigator.vibrate?.(10);

    if (shouldReduceMotion) {
      setTransitionPhase('release');
      await new Promise((resolve) => window.setTimeout(resolve, 90));
      if (run !== transitionRun.current) return;
      animatedScore.set(nextScore);
      setDisplayedMood(nextMood);
      setRecommendationMood(nextMood);
      setTransitionPhase('reveal');
      await new Promise((resolve) => window.setTimeout(resolve, transitionMotion.reduced * 1000));
    } else {
      setTransitionPhase('release');
      await new Promise((resolve) => window.setTimeout(resolve, transitionMotion.release * 1000));
      if (run !== transitionRun.current) return;

      setDisplayedMood(nextMood);
      setTransitionPhase('reveal');
      const gaugeAnimation = animate(animatedScore, nextScore, {
        duration: transitionMotion.gauge,
        ease: transitionMotion.easeOut,
      });
      await gaugeAnimation;
      if (run !== transitionRun.current) return;
      setRecommendationMood(nextMood);
      await new Promise((resolve) => window.setTimeout(resolve, transitionMotion.recommendation * 1000));
    }

    if (run !== transitionRun.current) return;
    sessionStorage.setItem('bodhi-dopameter-mood', nextMood);
    sessionStorage.setItem('bodhi-dopameter-score', `${nextScore}`);
    const direction = nextState.delta > 0 ? `Increased by ${nextState.delta}` : `Decreased by ${Math.abs(nextState.delta)}`;
    setAnnouncement(`Dopameter updated. ${nextState.feeling}. Score ${nextScore} percent. ${direction}.`);
    setTransitionPhase('idle');
    setIsTransitioning(false);
  };

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-white pb-32">
      <div className="absolute top-[-70px] left-[38%] h-[280px] w-[280px] rounded-full bg-[rgba(102,163,255,0.14)] blur-[48px] pointer-events-none" />
      <div className="absolute top-[116px] left-[-40px] h-[430px] w-[480px] bg-[radial-gradient(ellipse_at_50%_36%,rgba(88,64,212,0.13)_0%,rgba(175,167,255,0.08)_36%,rgba(255,255,255,0)_72%)] pointer-events-none" />
      <div className="absolute top-[380px] left-[-90px] h-[300px] w-[300px] rounded-full bg-[rgba(104,152,249,0.12)] blur-[52px] pointer-events-none" />
      <div className="absolute top-[720px] right-[-120px] h-[280px] w-[280px] rounded-full bg-[rgba(154,148,255,0.12)] blur-[52px] pointer-events-none" />

      <div className="relative z-10">
        <StatusBar />

        <header className="grid grid-cols-[48px_1fr_48px] items-center gap-3 px-6 pt-4 pb-3">
          <IconButton label="Go back" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-5 w-5 text-[#5840D4]" strokeWidth={2.2} />
          </IconButton>

          <div className="text-center">
            <h1 className="text-[24px] font-bold leading-8 text-[#10122B]" style={{ fontFamily: 'Inter, sans-serif' }}>
              Dopameter
            </h1>
            <p className="mt-1 text-[14px] font-medium leading-5 text-[#5A5B62]" style={{ fontFamily: 'Inter, sans-serif' }}>
              Track your mood. Boost your momentum.
            </p>
          </div>

          <IconButton label="View analytics">
            <BarChart3 className="h-5 w-5 text-[#5840D4]" strokeWidth={2.2} />
          </IconButton>
        </header>

        <main className="px-6">
          <section className="relative flex flex-col items-center pt-1 pb-0">
            <motion.div
              className="absolute top-6 h-[270px] w-[350px] rounded-full bg-[rgba(88,64,212,0.11)] blur-[58px]"
              animate={{
                opacity: transitionPhase === 'idle' ? 1 : trendIsPositive ? 1.28 : 0.7,
                scale: transitionPhase === 'idle' ? 1 : trendIsPositive ? 1.04 : 0.97,
              }}
              transition={{ duration: shouldReduceMotion ? 0 : 0.55, ease: transitionMotion.easeOut }}
            />
            <div className="absolute top-[112px] h-[150px] w-[365px] rounded-full bg-[rgba(0,153,191,0.075)] blur-[44px]" />
            <div className="absolute inset-x-[-60px] bottom-[-18px] h-[150px] rounded-full bg-[radial-gradient(ellipse_at_50%_45%,rgba(236,232,255,0.36)_0%,rgba(191,216,255,0.14)_42%,rgba(255,255,255,0)_74%)] blur-[30px]" />
            <motion.div
              className="absolute right-7 top-[58px]"
              animate={{ x: transitionPhase === 'idle' ? 0 : 6, y: transitionPhase === 'idle' ? 0 : -5, opacity: transitionPhase === 'idle' ? 0.45 : 0.75 }}
              transition={{ duration: shouldReduceMotion ? 0 : 0.7, ease: transitionMotion.easeOut }}
            >
              <Sparkles className="h-4 w-4 text-[#AFA7FF]" strokeWidth={2} />
            </motion.div>
            <motion.div
              className="absolute left-8 top-[154px]"
              animate={{ x: transitionPhase === 'idle' ? 0 : -5, y: transitionPhase === 'idle' ? 0 : 4, opacity: transitionPhase === 'idle' ? 0.55 : 0.82 }}
              transition={{ duration: shouldReduceMotion ? 0 : 0.7, ease: transitionMotion.easeOut }}
            >
              <Sparkles className="h-3.5 w-3.5 text-[#BFD8FF]" strokeWidth={2} />
            </motion.div>

            <div className="relative h-[270px] w-full max-w-[345px] overflow-visible">
              <svg className="absolute inset-0 h-full w-full overflow-visible" viewBox="0 0 345 270" fill="none">
                <defs>
                  <linearGradient id="dopameterArc" x1="24" y1="200" x2="314" y2="62" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#F2C7FF" />
                    <stop offset="0.3" stopColor="#B796FF" />
                    <stop offset="0.62" stopColor="#745BF2" />
                    <stop offset="1" stopColor="#4A32D4" />
                  </linearGradient>
                  <linearGradient id="dopameterTrack" x1="29" y1="203" x2="316" y2="72" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#F2DEFF" stopOpacity="0.82" />
                    <stop offset="0.55" stopColor="#E6E3FF" stopOpacity="0.72" />
                    <stop offset="1" stopColor="#DCEBFF" stopOpacity="0.68" />
                  </linearGradient>
                  <radialGradient id="dopameterKnob" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(7 5) rotate(58) scale(15)">
                    <stop stopColor="#FFFFFF" />
                    <stop offset="0.5" stopColor="#A195FF" />
                    <stop offset="1" stopColor="#5840D4" />
                  </radialGradient>
                  <filter id="dopameterArcGlow" x="-30" y="-16" width="405" height="268" filterUnits="userSpaceOnUse">
                    <feGaussianBlur stdDeviation="8" result="blur" />
                    <feColorMatrix
                      in="blur"
                      type="matrix"
                      values="0 0 0 0 0.345 0 0 0 0 0.251 0 0 0 0 0.831 0 0 0 0.58 0"
                    />
                    <feBlend in="SourceGraphic" mode="normal" />
                  </filter>
                  <filter id="dopameterRailGlow" x="-42" y="-32" width="429" height="294" filterUnits="userSpaceOnUse">
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
                    x: meter.centerX + (meter.radius + 36) * Math.cos((angle * Math.PI) / 180),
                    y: meter.centerY + (meter.radius + 36) * Math.sin((angle * Math.PI) / 180),
                  };
                  const inner = {
                    x: meter.centerX + (meter.radius + 26) * Math.cos((angle * Math.PI) / 180),
                    y: meter.centerY + (meter.radius + 26) * Math.sin((angle * Math.PI) / 180),
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
                  d={meter.trackPath}
                  stroke="rgba(255,255,255,0.78)"
                  strokeWidth="36"
                  fill="none"
                  strokeLinecap="round"
                  opacity="0.9"
                  filter="url(#dopameterRailGlow)"
                />
                <path
                  d={meter.trackPath}
                  stroke="rgba(255,255,255,0.62)"
                  strokeWidth="31"
                  fill="none"
                  strokeLinecap="round"
                  opacity="0.88"
                />
                <path
                  d={meter.trackPath}
                  stroke="url(#dopameterTrack)"
                  strokeWidth="28"
                  fill="none"
                  strokeLinecap="round"
                />
                <motion.path
                  d={meter.trackPath}
                  stroke="url(#dopameterArc)"
                  strokeWidth="36"
                  strokeLinecap="round"
                  fill="none"
                  pathLength="1"
                  style={{ pathLength: arcProgress }}
                  animate={{ opacity: transitionPhase === 'release' ? 0.16 : 0.28 }}
                  transition={{ duration: transitionMotion.release, ease: transitionMotion.easeIn }}
                  filter="url(#dopameterArcGlow)"
                />
                <motion.path
                  d={meter.trackPath}
                  stroke="url(#dopameterArc)"
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
                animate={{
                  scale: transitionPhase === 'reveal' ? [1, 1.08, 1, 1.04, 1] : 1,
                  boxShadow:
                    transitionPhase === 'reveal'
                      ? '0px 7px 18px rgba(84,75,187,0.42), 0px 0px 22px rgba(166,149,255,0.68)'
                      : '0px 7px 15px rgba(84,75,187,0.30), 0px 0px 14px rgba(255,255,255,0.94)',
                }}
                transition={{
                  duration: shouldReduceMotion ? 0 : transitionMotion.gauge,
                  times: [0, 0.5, 0.82, 0.92, 1],
                  ease: transitionMotion.easeOut,
                }}
              >
                <div className="absolute inset-[8px] rounded-full bg-[radial-gradient(circle_at_35%_25%,#FFFFFF_0%,#9C8DFF_45%,#5840D4_100%)] shadow-[inset_0px_2px_5px_rgba(255,255,255,0.42)]" />
                <div className="absolute left-[11px] top-[9px] h-2 w-2 rounded-full bg-white/80 blur-[1px]" />
              </motion.div>

              <motion.div
                className="absolute inset-x-0 top-[104px] flex flex-col items-center text-center"
                animate={{
                  opacity: transitionPhase === 'release' ? 0.34 : 1,
                  y: transitionPhase === 'release' ? 8 : 0,
                }}
                transition={{
                  duration: transitionPhase === 'release' ? transitionMotion.release : 0.32,
                  delay: transitionPhase === 'reveal' && !shouldReduceMotion ? 0.08 : 0,
                  ease: transitionPhase === 'release' ? transitionMotion.easeIn : transitionMotion.easeOut,
                }}
              >
                <div className="absolute top-1/2 h-[118px] w-[268px] -translate-y-1/2 rounded-full bg-white/60 blur-[30px]" />
                <div className="relative flex items-start justify-center text-[#0E1254]" style={{ fontFamily: 'Inter, sans-serif' }}>
                  <motion.span className="text-[52px] font-bold leading-[52px] tracking-normal">{displayedScore}</motion.span>
                  <span className="mt-2 text-[24px] font-bold leading-7">%</span>
                </div>
                <motion.div
                  className="relative mt-2 text-[18px] font-bold leading-7 text-[#5840D4]"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                  animate={{ opacity: transitionPhase === 'release' ? 0 : 1, y: transitionPhase === 'release' ? 8 : 0 }}
                  transition={{ duration: 0.3, delay: transitionPhase === 'reveal' && !shouldReduceMotion ? 0.16 : 0 }}
                >
                  {activeFeeling}
                </motion.div>
                <motion.div
                  className="relative mt-1 flex items-center gap-1.5 text-[12px] font-semibold leading-4"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                  animate={{
                    opacity: transitionPhase === 'release' ? 0 : 1,
                    y: transitionPhase === 'release' ? 8 : 0,
                    color: trendIsPositive ? '#2FA34A' : activeDelta < 0 ? '#D9785F' : '#5A5B62',
                  }}
                  transition={{ duration: 0.3, delay: transitionPhase === 'reveal' && !shouldReduceMotion ? 0.23 : 0 }}
                >
                  {activeDelta > 0 ? (
                    <TrendingUp className="h-3.5 w-3.5 text-[#2FA34A]" strokeWidth={2.4} />
                  ) : activeDelta < 0 ? (
                    <TrendingDown className="h-3.5 w-3.5 text-[#D9785F]" strokeWidth={2.4} />
                  ) : (
                    <Sparkles className="h-3.5 w-3.5 text-[#8171F2]" strokeWidth={2.2} />
                  )}
                  {trendText}
                </motion.div>
              </motion.div>
            </div>
          </section>

          <section className="mb-4 mt-[-6px] rounded-[22px] border border-[rgba(232,231,241,0.86)] bg-white/94 p-3.5 shadow-[0px_8px_24px_0px_rgba(84,75,187,0.08)]">
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-[18px] font-bold leading-7 text-[#2D2E34]" style={{ fontFamily: 'Inter, sans-serif' }}>
                How are you feeling?
              </h2>
              <button
                onClick={() => {
                  setMoodCardExpanded((expanded) => {
                    const nextExpanded = !expanded;
                    if (!nextExpanded && !primaryMoodLabels.has(selectedMood)) {
                      setSelectedMood('Grounded');
                    }
                    return nextExpanded;
                  });
                }}
                className="flex h-8 items-center gap-1.5 rounded-full px-1 text-[10px] font-bold uppercase leading-3 tracking-[0.4px] text-[#5840D4]"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                {moodCardExpanded ? 'View less' : 'View more'}
                {moodCardExpanded ? (
                  <ChevronUp className="h-3.5 w-3.5" strokeWidth={2.4} />
                ) : (
                  <ChevronDown className="h-3.5 w-3.5" strokeWidth={2.4} />
                )}
              </button>
            </div>

            <div className={`grid grid-cols-5 gap-2 ${moodCardExpanded ? 'gap-y-3' : ''}`}>
              {visibleMoods.map((mood) => {
                const selected = selectedMood === mood.label;
                return (
                  <motion.button
                    key={mood.label}
                    onClick={() => selectMood(mood.label)}
                    disabled={isTransitioning}
                    whileTap={isTransitioning ? undefined : { scale: 0.96 }}
                    animate={{
                      scale: 1,
                      borderColor: selected ? '#5840D4' : 'rgba(255,255,255,0)',
                      backgroundColor: selected ? 'rgba(88,64,212,0.06)' : '#FAFAFF',
                      boxShadow: selected
                        ? '0px 6px 18px rgba(84,75,187,0.18), 0px 0px 14px rgba(125,109,240,0.12)'
                        : '0px 0px 0px rgba(84,75,187,0)',
                    }}
                    transition={{ duration: shouldReduceMotion ? 0 : transitionMotion.cardTap, ease: transitionMotion.easeOut }}
                    className={`flex min-h-[68px] flex-col items-center justify-center rounded-[16px] border transition-all ${
                      selected
                        ? 'border-[#5840D4] bg-[rgba(88,64,212,0.06)] shadow-[0px_6px_16px_0px_rgba(84,75,187,0.12)]'
                        : 'border-transparent bg-[#FAFAFF]'
                    }`}
                    aria-pressed={selected}
                  >
                    <span className="text-[24px] leading-7">{mood.emoji}</span>
                    <motion.span
                      className={`mt-1 ${mood.label.length > 9 ? 'text-[9px]' : 'text-[10px]'} font-bold leading-3`}
                      style={{ fontFamily: 'Inter, sans-serif' }}
                      animate={{ color: selected ? '#5840D4' : '#5A5B62' }}
                      transition={{ duration: shouldReduceMotion ? 0 : transitionMotion.cardTap }}
                    >
                      {mood.label}
                    </motion.span>
                  </motion.button>
                );
              })}
            </div>
          </section>

          <section
            className="mb-5 overflow-hidden rounded-[22px] border border-white/35 shadow-[0px_12px_28px_0px_rgba(84,75,187,0.16)] backdrop-blur-xl"
            style={{
              backgroundImage:
                'radial-gradient(circle at 18% 18%, rgba(255,255,255,0.26), transparent 32%), linear-gradient(111deg, rgba(88,64,212,0.96) 0%, rgba(62,61,198,0.92) 48%, rgba(0,153,191,0.90) 118%)',
            }}
          >
            <div className="relative p-3">
              <div className="absolute inset-0 bg-white/[0.04]" />
              <div className="absolute -right-12 -top-16 h-40 w-40 rounded-full bg-white/14 blur-2xl" />
              <div className="relative min-h-[84px]">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={recommendationMood}
                    className="absolute inset-0 flex items-center gap-3"
                    initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, x: 12 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, x: -12 }}
                    transition={{ duration: shouldReduceMotion ? transitionMotion.reduced : transitionMotion.recommendation, ease: transitionMotion.easeOut }}
                  >
                    <motion.div
                      className="flex h-14 w-14 shrink-0 items-center justify-center rounded-[16px] bg-white/16 shadow-[inset_0px_1px_0px_rgba(255,255,255,0.35)] ring-1 ring-white/24"
                      initial={shouldReduceMotion ? false : { scale: 0.9 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.3, ease: transitionMotion.easeOut }}
                    >
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/18 shadow-[0px_8px_18px_rgba(20,18,70,0.16)]">
                        <Zap className="h-5 w-5 text-white" fill="currentColor" strokeWidth={0} />
                      </div>
                    </motion.div>

                    <div className="min-w-0 flex-1">
                      <div className="mb-1 flex items-center gap-2">
                        <span className="text-[10px] font-bold uppercase leading-3 tracking-[0.8px] text-white/62" style={{ fontFamily: 'Inter, sans-serif' }}>
                          Your Next Best Move
                        </span>
                      </div>
                      <h2 className="text-[18px] font-bold leading-7 text-white" style={{ fontFamily: 'Inter, sans-serif' }}>
                        {recommendation.title}
                      </h2>
                      <motion.div
                        className="mt-2 inline-flex h-6 items-center gap-1.5 rounded-full bg-white/15 px-2.5 ring-1 ring-white/18"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: shouldReduceMotion ? 0 : 0.2, duration: 0.18 }}
                      >
                        <Zap className="h-3.5 w-3.5 text-[#FFD36C]" fill="currentColor" strokeWidth={0} />
                        <span className="text-[10px] font-bold leading-3 text-white/92" style={{ fontFamily: 'Inter, sans-serif' }}>
                          {recommendation.boost}
                        </span>
                      </motion.div>
                    </div>

                    <ChevronRight className="h-5 w-5 shrink-0 text-white/62" strokeWidth={2.2} />
                  </motion.div>
                </AnimatePresence>
              </div>

              <button
                onClick={() => navigate(recommendationRoute)}
                className="relative mt-3 flex h-9 w-full scroll-mb-32 items-center justify-center rounded-full bg-white/95 text-[14px] font-bold leading-5 text-[#5840D4] shadow-[0px_8px_18px_0px_rgba(20,18,70,0.16)] ring-1 ring-white/70 active:scale-[0.98]"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                Start Now
              </button>
            </div>
          </section>

          <section className="rounded-[22px] border border-[rgba(232,231,241,0.86)] bg-white/94 p-4 shadow-[0px_8px_24px_0px_rgba(84,75,187,0.08)]">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-[18px] font-bold leading-7 text-[#2D2E34]" style={{ fontFamily: 'Inter, sans-serif' }}>
                Dopameter Calendar
              </h2>
              <button className="text-[10px] font-bold uppercase leading-3 tracking-[0.4px] text-[#5840D4]" style={{ fontFamily: 'Inter, sans-serif' }}>
                This Month
              </button>
            </div>

            <div className="grid grid-cols-7 gap-2">
              {week.map((item) => (
                <div key={item.day} className="flex flex-col items-center gap-2">
                  <div className="text-[10px] font-bold leading-3 text-[#5A5B62]/70" style={{ fontFamily: 'Inter, sans-serif' }}>
                    {item.day}
                  </div>
                  <PercentCircle {...item} />
                </div>
              ))}
            </div>
          </section>
        </main>
        <div className="sr-only" aria-live="polite" aria-atomic="true">
          {announcement}
        </div>
      </div>
    </div>
  );
}

const tutorialFeelings = [
  { label: 'Peaceful', emoji: '😌', angle: -90, glow: 'rgba(255,210,82,.74)' },
  { label: 'Loved', emoji: '🥰', angle: -45, glow: 'rgba(255,92,170,.62)' },
  { label: 'Frustrated', emoji: '😤', angle: 0, glow: 'rgba(255,101,82,.67)' },
  { label: 'Uncertain', emoji: '🤔', angle: 45, glow: 'rgba(255,190,74,.68)' },
  { label: 'Energised', emoji: '🤩', angle: 90, glow: 'rgba(57,230,201,.65)' },
  { label: 'Sad', emoji: '😭', angle: 135, glow: 'rgba(72,162,255,.62)' },
  { label: 'Overwhelmed', emoji: '😣', angle: 180, glow: 'rgba(86,167,255,.62)' },
  { label: 'Happy', emoji: '😊', angle: 225, glow: 'rgba(213,110,255,.62)' },
];

function DopameterTutorial({
  onBack,
  onBegin,
  reduceMotion,
}: {
  onBack: () => void;
  onBegin: () => void;
  reduceMotion: boolean;
}) {
  return (
    <div
      className="relative min-h-[100dvh] overflow-hidden text-[#0C1045]"
      style={{
        background:
          'radial-gradient(circle at 8% 21%, rgba(255,170,209,.48), transparent 28%), radial-gradient(circle at 92% 20%, rgba(132,191,255,.58), transparent 31%), radial-gradient(circle at 51% 68%, rgba(167,116,255,.36), transparent 38%), linear-gradient(160deg,#FFF9FC 0%,#F3F5FF 48%,#F3F9FF 100%)',
        fontFamily: 'Inter, sans-serif',
      }}
    >
      <div className="pointer-events-none absolute -left-32 top-[31%] h-64 w-64 rounded-full border border-white/75 bg-[radial-gradient(circle_at_60%_50%,rgba(245,205,255,.46),rgba(255,255,255,.05))]" />
      <div className="pointer-events-none absolute -right-36 top-[11%] h-80 w-80 rounded-full border border-white/75 bg-[radial-gradient(circle_at_30%_55%,rgba(194,224,255,.55),rgba(255,255,255,.04))]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-[-12%] h-[42%] bg-[radial-gradient(ellipse_at_50%_0%,rgba(196,177,255,.3),transparent_65%)]" />

      <div className="relative z-10 mx-auto flex min-h-[100dvh] w-full max-w-[430px] flex-col px-5 pb-[max(16px,env(safe-area-inset-bottom))]">
        <StatusBar />

        <header className="grid grid-cols-[52px_1fr_52px] items-center gap-2 pt-2">
          <IconButton label="Go back" onClick={onBack}>
            <ArrowLeft className="h-[22px] w-[22px] text-[#4028D4]" strokeWidth={2.15} />
          </IconButton>
          <div className="text-center">
            <h1 className="bg-[linear-gradient(105deg,#28238F_0%,#6137E8_58%,#2C76CE_118%)] bg-clip-text text-[29px] font-extrabold leading-8 tracking-[-1px] text-transparent">
              Dopameter
            </h1>
            <p className="mt-1 text-[13px] font-medium text-[#626790]">Check in with yourself</p>
          </div>
          <IconButton label="More options">
            <MoreHorizontal className="h-[22px] w-[22px] text-[#4028D4]" strokeWidth={2.4} />
          </IconButton>
        </header>

        <main className="flex flex-1 flex-col items-center pt-10 text-center">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col items-center"
          >
            <h2 className="max-w-[360px] text-[42px] font-extrabold leading-[43px] tracking-[-2.1px] text-[#0C1045]">
              How are you,<br />really?
            </h2>
            <p className="mt-4 max-w-[330px] text-[16px] font-medium leading-[23px] text-[#5F648C]">
              Give us a vibe check — whatever feels true right now.
            </p>
          </motion.div>

          <div className="relative mt-7 h-[420px] w-[420px] shrink-0" aria-label="Explore a range of feelings">
            <motion.div
              aria-hidden="true"
              className="absolute inset-[-18px] rounded-full bg-[conic-gradient(from_25deg,rgba(81,165,255,.14),rgba(244,96,191,.26),rgba(255,180,86,.20),rgba(70,231,203,.2),rgba(99,107,255,.24),rgba(81,165,255,.14))] blur-[26px]"
              animate={reduceMotion ? undefined : { rotate: 360, scale: [1, 1.025, 1] }}
              transition={{ rotate: { duration: 34, ease: 'linear', repeat: Infinity }, scale: { duration: 5.6, ease: 'easeInOut', repeat: Infinity } }}
            />
            <motion.div
              aria-hidden="true"
              className="absolute inset-[32px] rounded-full border border-white/85 bg-[conic-gradient(from_160deg,rgba(115,182,255,.13),rgba(236,108,210,.18),rgba(255,206,114,.12),rgba(78,225,210,.13),rgba(132,106,255,.16),rgba(115,182,255,.13))] shadow-[inset_0_0_72px_rgba(255,255,255,.86),0_25px_80px_rgba(84,57,197,.18)] backdrop-blur-[4px]"
              animate={reduceMotion ? undefined : { rotate: -360 }}
              transition={{ duration: 52, ease: 'linear', repeat: Infinity }}
            />
            <div aria-hidden="true" className="absolute inset-[61px] rounded-full border border-white/75 shadow-[0_0_30px_rgba(255,255,255,.72)]" />
            <div aria-hidden="true" className="absolute inset-0">
              {Array.from({ length: 32 }, (_, index) => (
                <span
                  key={index}
                  className="absolute left-1/2 top-1/2 h-[16px] w-[3px] rounded-full bg-white shadow-[0_0_7px_rgba(255,255,255,.94)]"
                  style={{ transform: `translate(-50%, -50%) rotate(${index * 11.25}deg) translateY(-111px)` }}
                />
              ))}
            </div>

            {tutorialFeelings.map((feeling, index) => {
              const radius = 151;
              const radians = (feeling.angle * Math.PI) / 180;
              const x = 210 + radius * Math.cos(radians);
              const y = 210 + radius * Math.sin(radians);
              return (
                <motion.div
                  key={feeling.label}
                  className="absolute z-10 -translate-x-1/2 -translate-y-1/2"
                  style={{ left: x, top: y }}
                  initial={reduceMotion ? false : { opacity: 0, scale: 0.75 }}
                  animate={reduceMotion ? { opacity: 1, scale: 1 } : { opacity: 1, scale: 1, y: [0, index % 2 === 0 ? -3 : 3, 0] }}
                  transition={{ opacity: { delay: 0.16 + index * 0.045, duration: 0.3 }, scale: { delay: 0.16 + index * 0.045, duration: 0.3 }, y: { duration: 4 + index * 0.18, ease: 'easeInOut', repeat: Infinity } }}
                >
                  <div
                    className="relative flex h-[72px] w-[72px] items-center justify-center rounded-full border border-white/65 text-[38px] backdrop-blur-[8px]"
                    style={{
                      background: 'radial-gradient(circle at 34% 24%, rgba(255,255,255,.58) 0%, rgba(255,255,255,.18) 48%, rgba(255,255,255,.04) 100%)',
                      boxShadow: `0 14px 32px rgba(51,40,118,.14), 0 0 34px ${feeling.glow}, 0 0 64px ${feeling.glow}, inset 0 2px 3px rgba(255,255,255,.92), inset 0 -6px 16px rgba(125,112,226,.08)`,
                    }}
                  >
                    <span aria-hidden="true" className="absolute left-[14px] top-[9px] h-[12px] w-[21px] rotate-[-18deg] rounded-full bg-white/48 blur-[2px]" />
                    <span className="relative" role="img" aria-label={feeling.label}>{feeling.emoji}</span>
                  </div>
                </motion.div>
              );
            })}

            <motion.button
              type="button"
              onClick={onBegin}
              whileTap={reduceMotion ? undefined : { scale: 0.96 }}
              className="absolute left-1/2 top-1/2 z-20 flex h-[158px] w-[158px] -translate-x-1/2 -translate-y-1/2 cursor-pointer flex-col items-center justify-center rounded-full border border-white/90 bg-[radial-gradient(circle_at_35%_24%,rgba(255,255,255,.98)_0%,rgba(242,237,255,.88)_52%,rgba(209,227,255,.78)_100%)] text-[#3020B9] shadow-[0_18px_44px_rgba(74,52,180,.24),0_0_38px_rgba(207,177,255,.62),inset_0_2px_3px_white,inset_0_-8px_20px_rgba(110,118,229,.08)] backdrop-blur-xl outline-none transition-[box-shadow,transform] duration-200 hover:shadow-[0_20px_48px_rgba(74,52,180,.28),0_0_44px_rgba(207,177,255,.72),inset_0_2px_3px_white] focus-visible:ring-4 focus-visible:ring-[#6754E8]/35"
              aria-label="Explore feelings"
            >
              <span aria-hidden="true" className="absolute left-[31px] top-[20px] h-[17px] w-[42px] rotate-[-18deg] rounded-full bg-white/55 blur-[4px]" />
              <span className="relative text-[18px] font-extrabold leading-[22px] tracking-[-.3px]">Tap to explore<br />feelings</span>
            </motion.button>
          </div>
        </main>
      </div>
    </div>
  );
}

type FeelingOption = {
  label: string;
  emoji: string;
  glow: string;
  accent: string;
};

const feelingOptions: FeelingOption[] = [
  { label: 'Excited', emoji: '🤩', glow: 'rgba(255,197,72,.82)', accent: '#F6A817' },
  { label: 'Loving', emoji: '🥰', glow: 'rgba(255,91,166,.70)', accent: '#EA5794' },
  { label: 'Grateful', emoji: '🙏', glow: 'rgba(143,108,255,.68)', accent: '#7656E8' },
  { label: 'Grounded', emoji: '☺️', glow: 'rgba(55,211,183,.64)', accent: '#28A88C' },
  { label: 'Inspired', emoji: '🤩', glow: 'rgba(178,105,255,.68)', accent: '#9059DD' },
  { label: 'Anxious', emoji: '😟', glow: 'rgba(99,165,255,.66)', accent: '#5E82CE' },
  { label: 'Confused', emoji: '🤔', glow: 'rgba(255,183,73,.68)', accent: '#D89935' },
  { label: 'Tired', emoji: '😔', glow: 'rgba(111,145,228,.62)', accent: '#697CBD' },
  { label: 'Stressed', emoji: '😣', glow: 'rgba(172,114,255,.64)', accent: '#865DC8' },
  { label: 'Overwhelmed', emoji: '🤯', glow: 'rgba(245,102,142,.66)', accent: '#D45B7B' },
  { label: 'Frustrated', emoji: '😤', glow: 'rgba(255,105,82,.70)', accent: '#DC6652' },
  { label: 'Lonely', emoji: '🙁', glow: 'rgba(100,155,232,.62)', accent: '#637AB5' },
  { label: 'Low', emoji: '😞', glow: 'rgba(97,133,211,.60)', accent: '#6672A5' },
  { label: 'Calm', emoji: '😌', glow: 'rgba(83,180,255,.65)', accent: '#4A9BD7' },
  { label: 'Happy', emoji: '😊', glow: 'rgba(255,214,77,.72)', accent: '#F0B72A' },
];

const selectorSlots = [
  { offset: -2, left: '15%', top: 168, size: 62, opacity: 0.54 },
  { offset: -1, left: '25%', top: 101, size: 74, opacity: 0.92 },
  { offset: 0, left: '50%', top: 24, size: 106, opacity: 1 },
  { offset: 1, left: '75%', top: 101, size: 74, opacity: 0.92 },
  { offset: 2, left: '85%', top: 168, size: 62, opacity: 0.54 },
];

const roundDialSlots = [
  { offset: -2, angle: -145, size: 62, opacity: 0.58 },
  { offset: -1, angle: -120, size: 76, opacity: 0.92 },
  { offset: 0, angle: -90, size: 108, opacity: 1 },
  { offset: 1, angle: -60, size: 76, opacity: 0.92 },
  { offset: 2, angle: -35, size: 62, opacity: 0.58 },
];

function DopameterFeelingSelectorV2({
  onBack,
  onChat,
  onConfirm,
  reduceMotion,
}: {
  onBack: () => void;
  onChat: () => void;
  onConfirm: (feeling: FeelingOption) => void;
  reduceMotion: boolean;
}) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [confirmedFeeling, setConfirmedFeeling] = useState<string | null>(null);
  const selectedFeeling = feelingOptions[selectedIndex];

  const selectRelative = (direction: number) => {
    setSelectedIndex((current) => (current + direction + feelingOptions.length) % feelingOptions.length);
    setConfirmedFeeling(null);
    navigator.vibrate?.(10);
  };

  const selectExact = (index: number) => {
    if (index === selectedIndex) return;
    setSelectedIndex(index);
    setConfirmedFeeling(null);
    navigator.vibrate?.(8);
  };

  const confirmFeeling = () => {
    sessionStorage.setItem('bodhi-dopameter-new-feeling', selectedFeeling.label);
    sessionStorage.setItem('bodhi-dopameter-new-feeling-emoji', selectedFeeling.emoji);
    setConfirmedFeeling(selectedFeeling.label);
    navigator.vibrate?.([12, 28, 18]);
    window.setTimeout(() => onConfirm(selectedFeeling), reduceMotion ? 80 : 420);
  };

  return (
    <div
      className="relative min-h-[100dvh] overflow-hidden text-[#0C1045]"
      style={{
        background:
          'radial-gradient(circle at 9% 22%,rgba(232,176,255,.43),transparent 29%),radial-gradient(circle at 91% 17%,rgba(126,193,255,.56),transparent 31%),radial-gradient(circle at 50% 56%,rgba(156,113,255,.24),transparent 39%),linear-gradient(158deg,#FCF9FF 0%,#F1F5FF 47%,#F5FAFF 100%)',
        fontFamily: 'Inter, sans-serif',
      }}
    >
      <div className="pointer-events-none absolute -left-36 top-[28%] h-80 w-80 rounded-full border border-white/65 bg-[#E6D8FF]/20" />
      <div className="pointer-events-none absolute -right-36 top-[35%] h-72 w-72 rounded-full border border-white/65 bg-[#D9EBFF]/24" />
      <div className="pointer-events-none absolute inset-x-[-18%] bottom-[-10%] h-[49%] bg-[radial-gradient(ellipse_at_50%_8%,rgba(199,175,255,.38),rgba(168,218,255,.17)_42%,transparent_70%)] blur-[24px]" />

      <div className="relative z-10 mx-auto flex min-h-[100dvh] w-full max-w-[430px] flex-col px-5 pb-[max(14px,env(safe-area-inset-bottom))]">
        <StatusBar />

        <header className="grid grid-cols-[52px_1fr_52px] items-center gap-2 pt-2">
          <IconButton label="Back to Dopameter introduction" onClick={onBack}>
            <ArrowLeft className="h-[22px] w-[22px] text-[#4028D4]" strokeWidth={2.15} />
          </IconButton>
          <div className="text-center">
            <h1 className="bg-[linear-gradient(105deg,#28238F_0%,#6137E8_58%,#2C76CE_118%)] bg-clip-text text-[29px] font-extrabold leading-8 tracking-[-1px] text-transparent">
              Dopameter
            </h1>
            <p className="mt-1 text-[13px] font-medium text-[#626790]">Check in with yourself</p>
          </div>
          <div aria-hidden="true" />
        </header>

        <main className="flex flex-1 flex-col items-center pt-3 text-center">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.36, ease: [0.22, 1, 0.36, 1] }}
          >
            <h2 className="bg-[linear-gradient(112deg,#11144E_0%,#272072_57%,#5845C5_112%)] bg-clip-text text-[30px] font-extrabold leading-[34px] tracking-[-1.2px] text-transparent">
              Let’s check in.<br />How are you feeling?
            </h2>
          </motion.div>

          <div
            className="relative mt-28 h-[310px] w-[430px] shrink-0 outline-none"
            data-swipe-ignore="true"
            role="group"
            aria-label={`Swipeable feeling selector. ${selectedFeeling.label} selected.`}
            tabIndex={0}
            onKeyDown={(event) => {
              if (event.key === 'ArrowLeft') selectRelative(-1);
              if (event.key === 'ArrowRight') selectRelative(1);
            }}
          >
            <div aria-hidden="true" className="absolute left-1/2 top-[72px] h-[460px] w-[460px] -translate-x-1/2 rounded-full border border-white/90 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,.78),rgba(235,230,255,.27)_30%,rgba(215,232,255,.08)_54%,transparent_69%)] shadow-[0_-18px_58px_rgba(105,72,221,.17),inset_0_2px_2px_rgba(255,255,255,.88)]" />
            <div aria-hidden="true" className="absolute left-1/2 top-[96px] h-[412px] w-[412px] -translate-x-1/2 rounded-full border border-white/74" />
            <div aria-hidden="true" className="absolute left-1/2 top-[121px] h-[362px] w-[362px] -translate-x-1/2 rounded-full border border-[#9D8CF1]/20" />

            <div aria-hidden="true" className="absolute inset-0">
              {Array.from({ length: 31 }, (_, index) => {
                const angle = -148 + index * (116 / 30);
                const radians = (angle * Math.PI) / 180;
                const x = 215 + 145 * Math.cos(radians);
                const y = 302 + 145 * Math.sin(radians);
                const isMajor = index % 5 === 0;
                return (
                  <span
                    key={index}
                    className="absolute rounded-full bg-[linear-gradient(180deg,#A995FF,#5A4AD4)] shadow-[0_0_10px_rgba(116,84,230,.44)]"
                    style={{
                      left: x,
                      top: y,
                      width: isMajor ? 4 : 2,
                      height: isMajor ? 17 : 10,
                      opacity: isMajor ? 0.78 : 0.5,
                      transform: `translate(-50%,-50%) rotate(${angle + 90}deg)`,
                    }}
                  />
                );
              })}
            </div>

            <motion.div
              className="absolute inset-0 z-20 cursor-grab touch-pan-y active:cursor-grabbing"
              drag={reduceMotion ? false : 'x'}
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.34}
              dragMomentum
              dragSnapToOrigin
              onDragEnd={(_, info) => {
                const intent = info.offset.x + info.velocity.x * 0.12;
                if (Math.abs(intent) < 34) return;
                selectRelative(intent < 0 ? 1 : -1);
              }}
              whileDrag={reduceMotion ? undefined : { scale: 0.992 }}
              transition={{ type: 'spring', stiffness: 430, damping: 34, mass: 0.72 }}
            >
              <AnimatePresence initial={false} mode="popLayout">
                {roundDialSlots.map((slot) => {
                  const optionIndex = (selectedIndex + slot.offset + feelingOptions.length) % feelingOptions.length;
                  const feeling = feelingOptions[optionIndex];
                  const radians = (slot.angle * Math.PI) / 180;
                  const x = 215 + 230 * Math.cos(radians);
                  const y = 302 + 230 * Math.sin(radians);
                  const isSelected = slot.offset === 0;

                  return (
                    <motion.button
                      key={`${slot.offset}-${feeling.label}`}
                      type="button"
                      onClick={() => selectExact(optionIndex)}
                      className="absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center outline-none focus-visible:ring-4 focus-visible:ring-[#6754E8]/30"
                      style={{ left: x, top: y, opacity: slot.opacity }}
                      initial={reduceMotion ? false : { opacity: 0, scale: 0.7 }}
                      animate={{ opacity: slot.opacity, scale: 1 }}
                      exit={reduceMotion ? undefined : { opacity: 0, scale: 0.76 }}
                      transition={{ duration: reduceMotion ? 0 : 0.26, ease: [0.22, 1, 0.36, 1] }}
                      aria-label={`${feeling.label}${isSelected ? ', selected' : ''}`}
                      aria-pressed={isSelected}
                    >
                      {isSelected ? (
                        <span
                          className="relative flex h-[116px] w-[116px] items-center justify-center rounded-full p-[3px]"
                          style={{
                            background: 'conic-gradient(from 205deg,#77D9FF,#7359F2,#DA72FF,#FFFFFF,#4BBEFF,#7657ED)',
                            boxShadow: '0 0 12px rgba(255,255,255,1),0 0 28px rgba(127,82,255,.92),0 0 54px rgba(85,179,255,.72),0 0 82px rgba(199,91,255,.38)',
                          }}
                        >
                          <motion.span
                            aria-hidden="true"
                            className="pointer-events-none absolute inset-0 z-10 rounded-full"
                            style={{
                              background: 'conic-gradient(from 0deg,transparent 0deg,transparent 278deg,rgba(153,112,255,.16) 302deg,rgba(255,255,255,.98) 331deg,#6CE0FF 346deg,transparent 360deg)',
                              WebkitMask: 'radial-gradient(farthest-side,transparent calc(100% - 4px),#000 calc(100% - 3px))',
                              mask: 'radial-gradient(farthest-side,transparent calc(100% - 4px),#000 calc(100% - 3px))',
                              filter: 'drop-shadow(0 0 7px rgba(255,255,255,.95)) drop-shadow(0 0 12px rgba(100,191,255,.78))',
                            }}
                            animate={reduceMotion ? undefined : { rotate: 360 }}
                            transition={{ duration: 2.65, repeat: Infinity, ease: 'linear' }}
                          />
                          <span className="relative flex h-full w-full items-center justify-center rounded-full border border-white/80 bg-[radial-gradient(circle_at_34%_22%,rgba(255,255,255,.94),rgba(240,233,255,.54)_48%,rgba(139,195,255,.23)_100%)] text-[55px] shadow-[inset_0_2px_4px_white,inset_0_-10px_24px_rgba(105,76,214,.13)] backdrop-blur-xl">
                            <span aria-hidden="true" className="absolute left-[23px] top-[14px] h-[15px] w-[34px] -rotate-[18deg] rounded-full bg-white/68 blur-[3px]" />
                            <span className="relative" role="img" aria-hidden="true">{feeling.emoji}</span>
                          </span>
                        </span>
                      ) : (
                        <span
                          className="relative flex items-center justify-center rounded-full border border-white/68 text-center backdrop-blur-[10px]"
                          style={{
                            width: slot.size,
                            height: slot.size,
                            fontSize: Math.abs(slot.offset) === 2 ? 30 : 39,
                            background: 'radial-gradient(circle at 34% 22%,rgba(255,255,255,.62),rgba(255,255,255,.16)_55%,rgba(255,255,255,.04))',
                            boxShadow: `0 12px 28px rgba(50,38,125,.12),0 0 25px ${feeling.glow},inset 0 2px 2px rgba(255,255,255,.82)`,
                          }}
                        >
                          <span role="img" aria-hidden="true">{feeling.emoji}</span>
                        </span>
                      )}

                      {Math.abs(slot.offset) <= 1 && (
                        <span
                          className={`mt-2 whitespace-nowrap font-bold ${isSelected ? 'rounded-full border border-white/95 bg-white/62 px-5 py-1.5 text-[17px] text-[#5B3FDA] shadow-[0_8px_24px_rgba(86,60,192,.17),inset_0_1px_0_white] backdrop-blur-xl' : 'text-[13px] text-[#4F5684]'}`}
                        >
                          {feeling.label}
                        </span>
                      )}
                    </motion.button>
                  );
                })}
              </AnimatePresence>
            </motion.div>

            <div aria-hidden="true" className="absolute left-1/2 top-[164px] z-30 h-0 w-0 -translate-x-1/2 border-l-[9px] border-r-[9px] border-t-[15px] border-l-transparent border-r-transparent border-t-[#7256E6] drop-shadow-[0_4px_7px_rgba(94,64,206,.4)]" />

            <div className="pointer-events-none absolute left-1/2 top-[236px] z-30 flex -translate-x-1/2 flex-col items-center">
              <MoveHorizontal className="h-7 w-7 text-[#665EB0]" strokeWidth={1.8} />
              <p className="mt-2 text-[12px] font-bold uppercase tracking-[1.35px] text-[#6D719D]">Swipe to explore</p>
              <p className="mt-1 text-[11px] font-medium text-[#8588AA]">Glide through more feelings</p>
            </div>
          </div>

          <div className="relative mt-1 w-full max-w-[366px] rounded-full p-[1.5px] shadow-[0_18px_38px_rgba(72,48,192,.28),0_0_30px_rgba(81,149,255,.22)]" style={{ background: 'linear-gradient(105deg,#D47CFF,#FFFFFF 34%,#6F7EFF 67%,#61C9FF)' }}>
            <motion.button
              type="button"
              onClick={confirmFeeling}
              whileTap={reduceMotion ? undefined : { scale: 0.982 }}
              className="relative flex h-[58px] w-full items-center justify-center overflow-hidden rounded-full bg-[linear-gradient(108deg,#7234E8_0%,#5936E4_47%,#258FEF_110%)] px-7 text-[17px] font-extrabold text-white shadow-[inset_0_1px_0_rgba(255,255,255,.42),inset_0_-8px_20px_rgba(38,42,165,.18)] outline-none focus-visible:ring-4 focus-visible:ring-[#6754E8]/30"
              aria-label={`Choose ${selectedFeeling.label}`}
            >
              <motion.span
                aria-hidden="true"
                className="absolute top-[-34px] h-28 w-24 rotate-[20deg] bg-[linear-gradient(90deg,transparent,rgba(255,255,255,.38),transparent)] blur-lg"
                animate={reduceMotion ? undefined : { x: [-210, 250] }}
                transition={{ duration: 3.4, repeat: Infinity, repeatDelay: 1.8, ease: 'easeInOut' }}
              />
              <AnimatePresence mode="wait" initial={false}>
                {confirmedFeeling === selectedFeeling.label ? (
                  <motion.span key="confirmed" className="relative flex items-center gap-2" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }}>
                    <Check className="h-5 w-5" strokeWidth={2.5} />
                    {selectedFeeling.label} selected
                  </motion.span>
                ) : (
                  <motion.span key="choose" className="relative flex items-center gap-2" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }}>
                    <Sparkles className="h-[18px] w-[18px]" strokeWidth={2.1} />
                    Choose {selectedFeeling.label}
                    <ArrowRight className="h-[18px] w-[18px]" strokeWidth={2.2} />
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
          </div>

          <button
            type="button"
            onClick={onChat}
            className="mt-3 flex h-[76px] w-full max-w-[366px] items-center rounded-[24px] border border-white/90 bg-white/58 px-3.5 text-left shadow-[0_16px_38px_rgba(54,47,122,.12),inset_0_1px_0_white] backdrop-blur-2xl transition active:scale-[.988] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#6754E8]/25"
            aria-label="Chat with Bro if your feeling is not listed"
          >
            <span className="relative h-[56px] w-[56px] shrink-0 overflow-hidden rounded-full border border-white/80 bg-[#24105B] shadow-[0_8px_24px_rgba(85,52,202,.31),0_0_22px_rgba(91,184,255,.3)]">
              <VoicePoweredOrb variant="energySphere" enableVoiceControl={false} className="h-full w-full scale-[1.18]" />
            </span>
            <span className="ml-3 min-w-0 flex-1">
              <span className="block text-[11px] font-semibold text-[#75799D]">Can’t find the right feeling?</span>
              <span className="mt-0.5 block text-[19px] font-extrabold tracking-[-.4px] text-[#12133E]">Chat with Bro</span>
            </span>
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[linear-gradient(135deg,#7650F2,#4738D7)] text-white shadow-[0_8px_20px_rgba(76,50,196,.25),inset_0_1px_0_rgba(255,255,255,.35)]">
              <ArrowRight className="h-5 w-5" strokeWidth={2.2} />
            </span>
          </button>

          <div className="sr-only" aria-live="polite">{confirmedFeeling ? `${confirmedFeeling} selected` : ''}</div>
        </main>
      </div>
    </div>
  );
}

type FeelingResultState = {
  tension: number;
  description: string;
  recommendation: string;
  duration: string;
  route: string;
};

const feelingResultStates: Record<string, FeelingResultState> = {
  Excited: { tension: 0.34, description: 'There’s bright, forward-moving energy in you right now.', recommendation: 'Focus Flow', duration: '8 min', route: '/home/focus-sprint' },
  Happy: { tension: 0.16, description: 'You seem open, light, and connected to the moment.', recommendation: 'Heart Chakra Meditation', duration: '10 min', route: '/home/chakra-meditation/heart' },
  Loving: { tension: 0.12, description: 'There’s warmth and connection moving through you.', recommendation: 'Heart Chakra Meditation', duration: '10 min', route: '/home/chakra-meditation/heart' },
  Grateful: { tension: 0.08, description: 'You’re noticing what feels meaningful and supportive.', recommendation: 'Gratitude Reset', duration: '6 min', route: '/home/chakra-meditation/heart' },
  Calm: { tension: 0.03, description: 'Your inner world feels soft, spacious, and settled.', recommendation: 'Deep Grounding', duration: '8 min', route: '/home/chakra-meditation/root' },
  Grounded: { tension: 0.06, description: 'You feel steady, present, and connected to yourself.', recommendation: 'Ground Chakra Meditation', duration: '8 min', route: '/home/chakra-meditation/root' },
  Inspired: { tension: 0.28, description: 'Your mind feels open and ready to create or begin.', recommendation: 'Focus Flow', duration: '8 min', route: '/home/focus-sprint' },
  Anxious: { tension: 0.92, description: 'Your system may be carrying extra alertness right now.', recommendation: 'Calm Your Anxiety', duration: '7 min', route: '/home/emotional-wellbeing/calm-your-anxiety' },
  Confused: { tension: 0.62, description: 'Your thoughts may be asking for space and a clearer direction.', recommendation: 'Third Eye Meditation', duration: '8 min', route: '/home/chakra-meditation/third-eye' },
  Tired: { tension: 0.5, description: 'Your energy feels lower and may be asking for recovery.', recommendation: 'NSDR Quick Reset', duration: '5 min', route: '/home/focus-concentration/nsdr-quick-reset' },
  Stressed: { tension: 0.88, description: 'There’s pressure in your system that deserves a pause.', recommendation: 'NSDR Quick Reset', duration: '5 min', route: '/home/focus-concentration/nsdr-quick-reset' },
  Overwhelmed: { tension: 1, description: 'It feels like there’s a lot on your mind right now.', recommendation: 'NSDR Quick Reset', duration: '5 min', route: '/home/focus-concentration/nsdr-quick-reset' },
  Frustrated: { tension: 0.82, description: 'There’s charged energy here that may need room to soften.', recommendation: 'Release & Reset', duration: '6 min', route: '/home/breathwork-prep' },
  Lonely: { tension: 0.68, description: 'You may be longing for connection, warmth, or reassurance.', recommendation: 'Heart Chakra Meditation', duration: '10 min', route: '/home/chakra-meditation/heart' },
  Low: { tension: 0.64, description: 'Things feel heavier right now, so we’ll begin gently.', recommendation: 'NSDR Quick Reset', duration: '5 min', route: '/home/focus-concentration/nsdr-quick-reset' },
};

function pulseEnergyY(
  progress: number,
  centerY: number,
  amplitude: number,
  frequency: number,
  phase: number,
  layerSeed: number,
) {
  const edgeSoftening = 0.58 + 0.42 * Math.sin(progress * Math.PI);
  const primary = Math.sin(progress * Math.PI * 2 * frequency + phase);
  const longFlow = Math.sin(progress * Math.PI * 2 * (frequency * 0.48) - phase * 0.74 + layerSeed * 0.52) * 0.5;
  const finePulse = Math.sin(progress * Math.PI * 2 * (frequency * 1.83) + phase * 0.36 - layerSeed) * 0.16;
  const leftSurge = Math.exp(-Math.pow((progress - 0.34) / 0.17, 2)) * Math.sin(phase + layerSeed * 0.8) * 0.24;
  const rightSurge = Math.exp(-Math.pow((progress - 0.7) / 0.2, 2)) * Math.cos(phase * 0.7 - layerSeed) * 0.2;

  return centerY + (primary + longFlow + finePulse + leftSurge + rightSurge) * amplitude * edgeSoftening;
}

function buildPulseRibbon(
  width: number,
  centerY: number,
  amplitude: number,
  frequency: number,
  phase: number,
  thickness: number,
  layerSeed: number,
) {
  const points = 44;
  const curve = (index: number, direction: number) => {
    const x = (index / points) * width;
    const progress = index / points;
    const breathingThickness = thickness * (0.72 + 0.28 * Math.sin(progress * Math.PI * 3 + layerSeed));
    const y = pulseEnergyY(progress, centerY, amplitude, frequency, phase, layerSeed) + direction * breathingThickness / 2;
    return `${x.toFixed(1)} ${y.toFixed(1)}`;
  };

  const upper = Array.from({ length: points + 1 }, (_, index) => curve(index, -1));
  const lower = Array.from({ length: points + 1 }, (_, reverseIndex) => curve(points - reverseIndex, 1));
  return `M ${upper.join(' L ')} L ${lower.join(' L ')} Z`;
}

function buildPulseLine(
  width: number,
  centerY: number,
  amplitude: number,
  frequency: number,
  phase: number,
  layerSeed: number,
) {
  const points = 44;
  const line = Array.from({ length: points + 1 }, (_, index) => {
    const progress = index / points;
    const x = progress * width;
    const y = pulseEnergyY(progress, centerY, amplitude, frequency, phase, layerSeed);
    return `${x.toFixed(1)} ${y.toFixed(1)}`;
  });
  return `M ${line.join(' L ')}`;
}

function InnerPulseWave({
  feeling,
  tension,
  reduceMotion,
}: {
  feeling: string;
  tension: number;
  reduceMotion: boolean;
}) {
  const id = feeling.toLowerCase().replace(/[^a-z0-9]/g, '');
  const amplitude = Math.min(84, 18 + Math.pow(tension, 0.62) * 96);
  const frequency = 0.7 + tension * 1.05;
  const speed = 8.2 - tension * 3.8;
  const ease = 1 - tension;
  const warmOpacity = 0.18 + tension * 0.82;
  const coralOpacity = 0.14 + tension * 0.8;
  const magentaOpacity = 0.3 + tension * 0.62;
  const violetOpacity = 0.62 + ease * 0.3;
  const indigoOpacity = 0.38 + ease * 0.58;
  const blueOpacity = 0.22 + ease * 0.76;
  const warmPlateau = 22 + tension * 16;
  const coralReach = 34 + tension * 10;
  const violetReach = 48 + tension * 16;
  const indigoReach = 67 + tension * 15;

  const ribbons = useMemo(
    () =>
      Array.from({ length: 6 }, (_, index) => {
        const layerSeed = index * 0.87 + 0.3;
        const layerAmplitude = amplitude * (1.1 - index * 0.07);
        const base = 116 + (index - 2.5) * 9.5;
        const layerFrequency = frequency + (index - 2.5) * 0.09;
        const thickness = 21 + (5 - index) * 1.7;
        const phases = [index * 0.44, index * 0.44 + 0.68, index * 0.44 + 1.36];
        const trailOffsets = [
          0.12 + tension * 0.05,
          0.28 + tension * 0.08,
          0.48 + tension * 0.12,
        ];
        return {
          paths: phases.map((phaseShift) => buildPulseRibbon(640, base, layerAmplitude, layerFrequency, phaseShift, thickness, layerSeed)),
          lines: phases.map((phaseShift) => buildPulseLine(640, base - thickness * 0.2, layerAmplitude, layerFrequency, phaseShift, layerSeed)),
          trails: trailOffsets.map((trailOffset, trailIndex) =>
            phases.map((phaseShift) =>
              buildPulseRibbon(
                640,
                base + 2 + trailIndex * 3.25,
                layerAmplitude * (1 - trailIndex * 0.035),
                layerFrequency,
                phaseShift - trailOffset,
                thickness * (1.08 + trailIndex * 0.3),
                layerSeed + trailIndex * 0.1,
              ),
            ),
          ),
          opacity: 0.22 + index * 0.07,
        };
      }),
    [amplitude, frequency, tension],
  );

  const trailOpacity = 0.17 + tension * 0.1;

  return (
    <div
      className="relative h-[236px] w-[640px] max-w-none"
      aria-label={`${feeling} inner pulse visualization, ${tension >= 0.55 ? 'tension' : 'ease'} dominant`}
    >
      <div className="absolute left-1/2 top-1 z-20 -translate-x-1/2 rounded-full border border-white/85 bg-white/46 px-4 py-1.5 text-[9px] font-bold uppercase tracking-[2px] text-[#7065AD] shadow-[0_8px_22px_rgba(71,53,151,.09)] backdrop-blur-xl">
        Your inner pulse
      </div>
      <div className="absolute left-[148px] top-[54px] z-20 text-left text-[11px] font-semibold leading-[15px] text-[#8C5F69]">
        More<br />tension
        <span className="mt-1 block h-7 w-px bg-[linear-gradient(#F19772,transparent)]" />
        <span className="-ml-[4px] block h-[9px] w-[9px] rounded-full border border-white bg-[#F49A6C] shadow-[0_0_10px_#FFB077]" />
      </div>
      <div className="absolute right-[148px] top-[54px] z-20 text-right text-[11px] font-semibold leading-[15px] text-[#606CA9]">
        More<br />ease
        <span className="ml-auto mt-1 block h-7 w-px bg-[linear-gradient(#579BFF,transparent)]" />
        <span className="ml-auto -mr-[4px] block h-[9px] w-[9px] rounded-full border border-white bg-[#559EFF] shadow-[0_0_10px_#66B9FF]" />
      </div>

      <div
        className="pointer-events-none absolute left-1/2 top-[92px] h-[112px] w-[430px] -translate-x-1/2 rounded-full opacity-55 blur-3xl"
        style={{
          background: `linear-gradient(90deg, rgba(255,173,90,${0.16 + tension * 0.5}) 0%, rgba(244,132,101,${0.12 + tension * 0.44}) ${coralReach}%, rgba(164,88,236,${0.28 + ease * 0.16}) ${violetReach}%, rgba(72,151,255,${0.14 + ease * 0.46}) 100%)`,
        }}
      />

      <svg className="absolute inset-x-0 bottom-[-8px] h-[218px] w-full overflow-visible" viewBox="0 0 640 230" preserveAspectRatio="none" fill="none" aria-hidden="true">
        <defs>
          <linearGradient id={`pulse-${id}`} x1="0" y1="0" x2="640" y2="0" gradientUnits="userSpaceOnUse">
            <stop stopColor="#FFB36D" stopOpacity={warmOpacity} />
            <stop offset={`${warmPlateau}%`} stopColor="#F8A268" stopOpacity={warmOpacity} />
            <stop offset={`${coralReach}%`} stopColor="#EE7B82" stopOpacity={coralOpacity} />
            <stop offset={`${violetReach}%`} stopColor="#B05AEC" stopOpacity={magentaOpacity} />
            <stop offset={`${indigoReach}%`} stopColor="#6758EA" stopOpacity={violetOpacity} />
            <stop offset="0.9" stopColor="#596DEB" stopOpacity={indigoOpacity} />
            <stop offset="1" stopColor="#45ADFA" stopOpacity={blueOpacity} />
          </linearGradient>
          <linearGradient id={`pulse-shine-${id}`} x1="0" y1="0" x2="640" y2="0" gradientUnits="userSpaceOnUse">
            <stop stopColor="#FFF4DC" stopOpacity=".74" />
            <stop offset=".28" stopColor="#FFF4FB" stopOpacity=".92" />
            <stop offset=".57" stopColor="#F4EBFF" stopOpacity=".92" />
            <stop offset="1" stopColor="#E4F7FF" stopOpacity=".76" />
          </linearGradient>
          <filter id={`pulse-glow-${id}`} x="-30%" y="-70%" width="160%" height="240%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="5.2" result="wideGlow" />
            <feGaussianBlur in="SourceGraphic" stdDeviation="1.45" result="closeGlow" />
            <feMerge>
              <feMergeNode in="wideGlow" />
              <feMergeNode in="closeGlow" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id={`pulse-trail-soft-${id}`} x="-35%" y="-85%" width="170%" height="270%">
            <feGaussianBlur stdDeviation="2.8" />
          </filter>
          <filter id={`pulse-trail-diffuse-${id}`} x="-40%" y="-95%" width="180%" height="290%">
            <feGaussianBlur stdDeviation="7.4" />
          </filter>
        </defs>
        {ribbons.map((ribbon, index) =>
          index % 2 === 0
            ? ribbon.trails.map((trail, trailIndex) => (
                <motion.path
                  key={`trail-${index}-${trailIndex}`}
                  d={trail[0]}
                  animate={reduceMotion ? undefined : { d: [...trail, trail[0]] }}
                  transition={{
                    duration: speed + index * 0.46 + trailIndex * 0.84,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay: -[0.18, 0.44, 0.78][trailIndex],
                  }}
                  fill={`url(#pulse-${id})`}
                  opacity={trailOpacity * [1, 0.62, 0.34][trailIndex]}
                  filter={
                    trailIndex === 1
                      ? `url(#pulse-trail-soft-${id})`
                      : trailIndex === 2
                        ? `url(#pulse-trail-diffuse-${id})`
                        : undefined
                  }
                />
              ))
            : null,
        )}
        {ribbons.map((ribbon, index) => (
          <g key={index}>
            <motion.path
              d={ribbon.paths[0]}
              animate={reduceMotion ? undefined : { d: [...ribbon.paths, ribbon.paths[0]] }}
              transition={{ duration: speed + index * 0.46, repeat: Infinity, ease: 'easeInOut' }}
              fill={`url(#pulse-${id})`}
              opacity={ribbon.opacity}
            />
            <motion.path
              d={ribbon.lines[0]}
              animate={reduceMotion ? undefined : { d: [...ribbon.lines, ribbon.lines[0]] }}
              transition={{ duration: speed + index * 0.46, repeat: Infinity, ease: 'easeInOut' }}
              fill="none"
              stroke={`url(#pulse-shine-${id})`}
              strokeLinecap="round"
              strokeWidth={index % 3 === 0 ? 2.05 : 1.15}
              opacity={Math.min(0.92, 0.68 + index * 0.045)}
              filter={`url(#pulse-glow-${id})`}
            />
          </g>
        ))}
        {Array.from({ length: 9 }, (_, index) => (
          <motion.circle
            key={`spark-${index}`}
            cx={142 + index * 45}
            cy={72 + (index % 3) * 31}
            r={index % 3 === 0 ? 1.8 : 1.1}
            fill="white"
            animate={reduceMotion ? undefined : { opacity: [0.18, 0.92, 0.18], scale: [0.8, 1.35, 0.8] }}
            transition={{ duration: 2.2 + index * 0.16, repeat: Infinity, delay: index * 0.18 }}
          />
        ))}
      </svg>
    </div>
  );
}

function DopameterResultScreen({
  feeling,
  onBack,
  onChangeFeeling,
  onChat,
  onStart,
  reduceMotion,
}: {
  feeling: FeelingOption;
  onBack: () => void;
  onChangeFeeling: () => void;
  onChat: () => void;
  onStart: (route: string) => void;
  reduceMotion: boolean;
}) {
  const state = feelingResultStates[feeling.label] ?? feelingResultStates.Grounded;

  return (
    <div
      className="relative min-h-[100dvh] overflow-hidden text-[#0C1045]"
      style={{
        background:
          'radial-gradient(circle at 8% 26%,rgba(255,184,207,.34),transparent 28%),radial-gradient(circle at 91% 20%,rgba(131,195,255,.48),transparent 31%),radial-gradient(circle at 50% 56%,rgba(180,143,255,.26),transparent 36%),linear-gradient(158deg,#FCFAFF 0%,#F2F5FF 48%,#F6FBFF 100%)',
        fontFamily: 'Inter, sans-serif',
      }}
    >
      <div className="pointer-events-none absolute -left-32 top-[34%] h-64 w-64 rounded-full border border-white/70 bg-white/10" />
      <div className="pointer-events-none absolute -right-36 top-[17%] h-72 w-72 rounded-full border border-white/65 bg-[#E0ECFF]/16" />
      <div className="relative z-10 mx-auto flex min-h-[100dvh] w-full max-w-[430px] flex-col px-5 pb-[max(14px,env(safe-area-inset-bottom))]">
        <StatusBar />

        <header className="grid grid-cols-[52px_1fr_52px] items-center gap-2 pt-2">
          <IconButton label="Back to feeling selector" onClick={onBack}>
            <ArrowLeft className="h-[22px] w-[22px] text-[#4028D4]" strokeWidth={2.15} />
          </IconButton>
          <div className="text-center">
            <h1 className="bg-[linear-gradient(105deg,#28238F_0%,#6137E8_58%,#2C76CE_118%)] bg-clip-text text-[29px] font-extrabold leading-8 tracking-[-1px] text-transparent">Dopameter</h1>
            <p className="mt-1 text-[13px] font-medium text-[#626790]">Check in with yourself</p>
          </div>
          <div aria-hidden="true" />
        </header>

        <main className="flex flex-1 flex-col items-center pt-1 text-center">
          <InnerPulseWave feeling={feeling.label} tension={state.tension} reduceMotion={reduceMotion} />

          <motion.div initial={reduceMotion ? false : { opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.34 }} className="-mt-1 flex flex-col items-center">
            <h2 className="text-[34px] font-extrabold leading-[38px] tracking-[-1.5px] text-[#0B103E]">{feeling.label}</h2>
            <p className="mt-1 max-w-[330px] text-[14px] font-medium leading-5 text-[#666B98]">{state.description}</p>
            <button
              type="button"
              onClick={onChangeFeeling}
              className="mt-3 flex h-9 items-center gap-2 rounded-full border border-white/85 bg-white/48 px-4 text-[13px] font-bold text-[#5539D8] shadow-[0_8px_22px_rgba(78,59,172,.09)] backdrop-blur-xl transition active:scale-95 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#6754E8]/25"
            >
              <RefreshCw className="h-4 w-4" strokeWidth={2.2} />
              Change feeling
            </button>
          </motion.div>

          <motion.section
            initial={reduceMotion ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: reduceMotion ? 0 : 0.12, duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
            className="relative mt-6 flex h-[154px] w-full overflow-hidden rounded-[28px] border-[1.5px] border-[#D7D5F0]/90 bg-white/68 p-3 text-left shadow-[0_24px_52px_rgba(55,48,128,.17),0_9px_24px_rgba(102,84,207,.11),0_0_0_1px_rgba(255,255,255,.72),inset_0_1px_0_white] backdrop-blur-2xl"
          >
            <div className="pointer-events-none absolute -right-16 -top-20 h-48 w-48 rounded-full bg-[#B9D8FF]/28 blur-3xl" />
            <div className="relative h-full w-[108px] shrink-0 overflow-hidden rounded-[20px] border border-white/80 shadow-[0_10px_24px_rgba(50,46,103,.14)]">
              <img
                src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=82&w=500"
                alt="A quiet lake surrounded by mountains"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(92,70,190,.02),rgba(58,43,138,.16))]" />
            </div>
            <div className="relative ml-3 flex min-w-0 flex-1 flex-col py-1">
              <p className="text-[9px] font-bold uppercase tracking-[1.65px] text-[#7067A5]">Your next best move</p>
              <h3 className="mt-1 line-clamp-2 text-[18px] font-extrabold leading-[21px] tracking-[-.45px] text-[#10123F]">{state.recommendation}</h3>
              <div className="mt-1.5 flex items-center gap-1.5 text-[12px] font-bold text-[#5E48D7]">
                <Clock3 className="h-4 w-4" strokeWidth={2.1} />
                {state.duration}
              </div>
              <button
                type="button"
                onClick={() => onStart(state.route)}
                className="mt-auto flex h-9 w-full items-center justify-center gap-2 rounded-full bg-[linear-gradient(105deg,#7637EC,#5140DF_52%,#288FEF)] text-[13px] font-extrabold text-white shadow-[0_10px_22px_rgba(72,49,191,.24),inset_0_1px_0_rgba(255,255,255,.35)] transition active:scale-[.985] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#6754E8]/25"
              >
                Start practice
                <ArrowRight className="h-4 w-4" strokeWidth={2.2} />
              </button>
            </div>
          </motion.section>

          <button
            type="button"
            onClick={onChat}
            className="mt-4 flex h-[72px] w-full items-center rounded-[24px] border border-white/90 bg-white/58 px-3.5 text-left shadow-[0_16px_38px_rgba(54,47,122,.11),inset_0_1px_0_white] backdrop-blur-2xl transition active:scale-[.988] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#6754E8]/25"
            aria-label="Chat with Bro about how you feel"
          >
            <span className="relative h-[52px] w-[52px] shrink-0 overflow-hidden rounded-full border border-white/80 bg-[#24105B] shadow-[0_8px_24px_rgba(85,52,202,.29),0_0_20px_rgba(91,184,255,.28)]">
              <VoicePoweredOrb variant="energySphere" enableVoiceControl={false} className="h-full w-full scale-[1.18]" />
            </span>
            <span className="ml-3 min-w-0 flex-1">
              <span className="block text-[11px] font-semibold text-[#75799D]">Want to talk about it?</span>
              <span className="mt-0.5 block text-[19px] font-extrabold tracking-[-.4px] text-[#12133E]">Chat with Bro</span>
            </span>
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/48 text-[#4F35D7] shadow-[inset_0_1px_0_white] ring-1 ring-white/75">
              <ArrowRight className="h-5 w-5" strokeWidth={2.2} />
            </span>
          </button>
        </main>
      </div>
    </div>
  );
}

function DopameterFeelingSelector({
  onBack,
  reduceMotion,
}: {
  onBack: () => void;
  reduceMotion: boolean;
}) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [confirmedFeeling, setConfirmedFeeling] = useState<string | null>(null);
  const dragStart = useRef<number | null>(null);
  const wheelLock = useRef(0);
  const selectedFeeling = feelingOptions[selectedIndex];

  const chooseIndex = (index: number) => {
    const nextIndex = (index + feelingOptions.length) % feelingOptions.length;
    if (nextIndex === selectedIndex) return;
    setSelectedIndex(nextIndex);
    setConfirmedFeeling(null);
    navigator.vibrate?.(8);
  };

  const moveSelection = (direction: number) => chooseIndex(selectedIndex + direction);

  const confirmFeeling = () => {
    sessionStorage.setItem('bodhi-dopameter-new-feeling', selectedFeeling.label);
    sessionStorage.setItem('bodhi-dopameter-new-feeling-emoji', selectedFeeling.emoji);
    setConfirmedFeeling(selectedFeeling.label);
    navigator.vibrate?.([12, 35, 16]);
  };

  return (
    <div
      className="relative min-h-[100dvh] overflow-hidden text-[#0C1045]"
      style={{
        background:
          'radial-gradient(circle at 12% 23%,rgba(230,173,255,.42),transparent 29%),radial-gradient(circle at 91% 18%,rgba(121,190,255,.55),transparent 32%),radial-gradient(circle at 52% 61%,rgba(133,94,255,.24),transparent 37%),linear-gradient(158deg,#FBF9FF 0%,#F2F5FF 46%,#F4FAFF 100%)',
        fontFamily: 'Inter, sans-serif',
      }}
    >
      <div className="pointer-events-none absolute -left-36 top-[27%] h-80 w-80 rounded-full border border-white/60 bg-[#E5D8FF]/20" />
      <div className="pointer-events-none absolute -right-36 top-[34%] h-72 w-72 rounded-full border border-white/70 bg-[#DCEBFF]/24" />
      <div className="pointer-events-none absolute inset-x-[-15%] bottom-[-15%] h-[52%] bg-[radial-gradient(ellipse_at_50%_10%,rgba(199,175,255,.34),rgba(177,220,255,.15)_43%,transparent_70%)] blur-[22px]" />

      <div className="relative z-10 mx-auto flex min-h-[100dvh] w-full max-w-[430px] flex-col px-5 pb-[max(18px,env(safe-area-inset-bottom))]">
        <StatusBar />

        <header className="grid grid-cols-[52px_1fr_52px] items-center gap-2 pt-2">
          <IconButton label="Back to Dopameter introduction" onClick={onBack}>
            <ArrowLeft className="h-[22px] w-[22px] text-[#4028D4]" strokeWidth={2.15} />
          </IconButton>
          <div className="text-center">
            <h1 className="bg-[linear-gradient(105deg,#28238F_0%,#6137E8_58%,#2C76CE_118%)] bg-clip-text text-[29px] font-extrabold leading-8 tracking-[-1px] text-transparent">
              Dopameter
            </h1>
            <p className="mt-1 text-[13px] font-medium text-[#626790]">Check in with yourself</p>
          </div>
          <IconButton label="More options">
            <MoreHorizontal className="h-[22px] w-[22px] text-[#4028D4]" strokeWidth={2.4} />
          </IconButton>
        </header>

        <main className="flex flex-1 flex-col items-center pt-8 text-center">
          <motion.h2
            initial={reduceMotion ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-[365px] text-[38px] font-extrabold leading-[40px] tracking-[-1.9px] text-[#0C1045]"
          >
            How are you feeling<br />right now?
          </motion.h2>

          <div
            className="relative mt-4 h-[386px] w-[520px] shrink-0 touch-pan-y select-none outline-none"
            role="group"
            aria-label={`Feeling selector. ${selectedFeeling.label} selected.`}
            tabIndex={0}
            onKeyDown={(event) => {
              if (event.key === 'ArrowLeft') moveSelection(-1);
              if (event.key === 'ArrowRight') moveSelection(1);
            }}
            onPointerDown={(event) => {
              dragStart.current = event.clientX;
            }}
            onPointerUp={(event) => {
              if (dragStart.current === null) return;
              const distance = event.clientX - dragStart.current;
              dragStart.current = null;
              if (Math.abs(distance) > 28) moveSelection(distance < 0 ? 1 : -1);
            }}
            onWheel={(event) => {
              const now = Date.now();
              if (now - wheelLock.current < 280) return;
              if (Math.abs(event.deltaX) < 8 && Math.abs(event.deltaY) < 8) return;
              wheelLock.current = now;
              moveSelection(event.deltaX + event.deltaY > 0 ? 1 : -1);
            }}
          >
            <motion.div
              aria-hidden="true"
              className="absolute left-1/2 top-[152px] h-[510px] w-[600px] -translate-x-1/2 rounded-full border border-white/85 bg-[radial-gradient(circle_at_50%_4%,rgba(255,255,255,.76),rgba(230,224,255,.22)_30%,transparent_61%)] shadow-[0_-18px_55px_rgba(112,77,225,.14),inset_0_2px_2px_rgba(255,255,255,.82)]"
              animate={reduceMotion ? undefined : { boxShadow: ['0 -18px 55px rgba(112,77,225,.14)', '0 -21px 64px rgba(112,77,225,.22)', '0 -18px 55px rgba(112,77,225,.14)'] }}
              transition={{ duration: 4.8, repeat: Infinity, ease: 'easeInOut' }}
            />
            <div aria-hidden="true" className="absolute left-1/2 top-[190px] h-[510px] w-[510px] -translate-x-1/2 rounded-full border border-white/75" />

            <div aria-hidden="true" className="absolute inset-0">
              {Array.from({ length: 29 }, (_, index) => {
                const angle = -150 + index * (120 / 28);
                const radians = (angle * Math.PI) / 180;
                const x = 260 + 236 * Math.cos(radians);
                const y = 421 + 236 * Math.sin(radians);
                const isMajor = index % 4 === 0;
                return (
                  <span
                    key={index}
                    className="absolute rounded-full bg-[#7662E5] shadow-[0_0_9px_rgba(122,94,238,.42)]"
                    style={{
                      left: x,
                      top: y,
                      width: isMajor ? 4 : 2,
                      height: isMajor ? 18 : 10,
                      opacity: isMajor ? 0.78 : 0.54,
                      transform: `translate(-50%,-50%) rotate(${angle + 90}deg)`,
                    }}
                  />
                );
              })}
            </div>

            <AnimatePresence initial={false} mode="popLayout">
              {selectorSlots.map((slot) => {
                const optionIndex = (selectedIndex + slot.offset + feelingOptions.length) % feelingOptions.length;
                const feeling = feelingOptions[optionIndex];
                const isSelected = slot.offset === 0;
                return (
                  <motion.button
                    layout
                    key={`${slot.offset}-${feeling.label}`}
                    type="button"
                    onClick={() => chooseIndex(optionIndex)}
                    className="absolute z-20 flex -translate-x-1/2 flex-col items-center outline-none focus-visible:ring-4 focus-visible:ring-[#6754E8]/30"
                    style={{ left: slot.left, top: slot.top, opacity: slot.opacity }}
                    initial={reduceMotion ? false : { opacity: 0, scale: 0.72 }}
                    animate={{ opacity: slot.opacity, scale: 1 }}
                    exit={reduceMotion ? undefined : { opacity: 0, scale: 0.78 }}
                    transition={{ duration: reduceMotion ? 0 : 0.25, ease: [0.22, 1, 0.36, 1] }}
                    aria-label={`${feeling.label}${isSelected ? ', selected' : ''}`}
                    aria-pressed={isSelected}
                  >
                    <span
                      className="relative flex items-center justify-center rounded-full border text-center backdrop-blur-xl"
                      style={{
                        width: slot.size,
                        height: slot.size,
                        fontSize: isSelected ? 53 : slot.offset === -2 || slot.offset === 2 ? 30 : 38,
                        borderColor: isSelected ? 'rgba(255,255,255,.98)' : 'rgba(255,255,255,.68)',
                        background: isSelected
                          ? 'radial-gradient(circle at 34% 22%,rgba(255,255,255,.88),rgba(255,255,255,.25) 52%,rgba(217,213,255,.14))'
                          : 'radial-gradient(circle at 34% 22%,rgba(255,255,255,.58),rgba(255,255,255,.13) 58%,rgba(255,255,255,.04))',
                        boxShadow: isSelected
                          ? `0 16px 38px rgba(50,38,125,.22),0 0 30px ${feeling.glow},0 0 68px ${feeling.glow},inset 0 2px 3px white`
                          : `0 12px 28px rgba(50,38,125,.12),0 0 26px ${feeling.glow},inset 0 2px 2px rgba(255,255,255,.8)`,
                      }}
                    >
                      {isSelected && <span aria-hidden="true" className="absolute inset-[-7px] rounded-full border border-white/70 shadow-[0_0_20px_rgba(255,255,255,.9)]" />}
                      <span className="relative" role="img" aria-hidden="true">{feeling.emoji}</span>
                    </span>
                    {Math.abs(slot.offset) <= 1 && (
                      <span
                        className={`mt-2 whitespace-nowrap font-bold ${isSelected ? 'rounded-full border border-white/90 bg-white/58 px-5 py-1.5 text-[17px] text-[#5B3FDA] shadow-[0_8px_22px_rgba(86,60,192,.15)] backdrop-blur-xl' : 'text-[13px] text-[#4F5684]'}`}
                      >
                        {feeling.label}
                      </span>
                    )}
                  </motion.button>
                );
              })}
            </AnimatePresence>

            <div aria-hidden="true" className="absolute left-1/2 top-[174px] h-0 w-0 -translate-x-1/2 border-l-[10px] border-r-[10px] border-t-[17px] border-l-transparent border-r-transparent border-t-[#7256E6] drop-shadow-[0_5px_8px_rgba(94,64,206,.36)]" />

            <div className="absolute left-1/2 top-[258px] z-30 flex -translate-x-1/2 items-center gap-7">
              <button
                type="button"
                onClick={() => moveSelection(-1)}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-white/80 bg-white/48 text-[#514AA0] shadow-[0_8px_22px_rgba(64,51,137,.09)] backdrop-blur-xl transition active:scale-95 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#6754E8]/25"
                aria-label="Previous feeling"
              >
                <ChevronLeft className="h-5 w-5" strokeWidth={2.2} />
              </button>
              <div className="w-[116px] text-center">
                <p className="text-[12px] font-bold uppercase tracking-[1.2px] text-[#777AA3]">Swipe to explore</p>
                <p className="mt-1 text-[11px] font-medium text-[#8588A8]">more feelings</p>
              </div>
              <button
                type="button"
                onClick={() => moveSelection(1)}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-white/80 bg-white/48 text-[#514AA0] shadow-[0_8px_22px_rgba(64,51,137,.09)] backdrop-blur-xl transition active:scale-95 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#6754E8]/25"
                aria-label="Next feeling"
              >
                <ChevronRight className="h-5 w-5" strokeWidth={2.2} />
              </button>
            </div>
          </div>

          <motion.button
            type="button"
            onClick={confirmFeeling}
            whileTap={reduceMotion ? undefined : { scale: 0.985 }}
            className="relative mt-1 flex h-[62px] w-full max-w-[360px] items-center justify-center overflow-hidden rounded-full border border-white/70 bg-[linear-gradient(108deg,#6D36E8_0%,#5039DF_52%,#258DEB_112%)] px-6 text-[17px] font-extrabold text-white shadow-[0_17px_34px_rgba(76,50,198,.27),0_0_28px_rgba(98,117,255,.18),inset_0_1px_0_rgba(255,255,255,.35)] outline-none focus-visible:ring-4 focus-visible:ring-[#6754E8]/30"
            aria-label={`Choose ${selectedFeeling.label}`}
          >
            <span aria-hidden="true" className="absolute -left-4 top-[-28px] h-24 w-36 rotate-[-18deg] bg-[linear-gradient(90deg,transparent,rgba(255,255,255,.23),transparent)] blur-xl" />
            <AnimatePresence mode="wait" initial={false}>
              {confirmedFeeling === selectedFeeling.label ? (
                <motion.span key="confirmed" className="relative flex items-center gap-2" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                  <Check className="h-5 w-5" strokeWidth={2.5} />
                  {selectedFeeling.label} selected
                </motion.span>
              ) : (
                <motion.span key="choose" className="relative" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                  Choose {selectedFeeling.label}
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
          <div className="sr-only" aria-live="polite">{confirmedFeeling ? `${confirmedFeeling} selected` : ''}</div>
        </main>
      </div>
    </div>
  );
}

function DopameterTutorialLegacy({
  onBack,
  onBegin,
  onChat = () => {},
  reduceMotion,
}: {
  onBack: () => void;
  onBegin: () => void;
  onChat?: () => void;
  reduceMotion: boolean;
}) {
  return (
    <div
      className="relative min-h-[100dvh] overflow-hidden text-[#11123D]"
      style={{
        background:
          'radial-gradient(circle at 14% 24%, rgba(255,190,218,.38), transparent 27%), radial-gradient(circle at 88% 29%, rgba(173,213,255,.52), transparent 31%), radial-gradient(circle at 50% 68%, rgba(198,176,255,.34), transparent 34%), linear-gradient(165deg,#FFFBFD 0%,#F5F7FF 47%,#F8FBFF 100%)',
        fontFamily: 'Inter, sans-serif',
      }}
    >
      <div className="pointer-events-none absolute -left-28 top-[34%] h-56 w-56 rounded-full border border-white/70 bg-white/20 blur-[1px]" />
      <div className="pointer-events-none absolute -right-32 top-[12%] h-72 w-72 rounded-full border border-white/70 bg-[#DDEAFF]/20 blur-[1px]" />
      <div className="relative z-10 mx-auto flex min-h-[100dvh] w-full max-w-[430px] flex-col px-5 pb-[max(20px,env(safe-area-inset-bottom))]">
        <StatusBar />

        <header className="grid grid-cols-[48px_1fr_48px] items-center gap-2 pt-2">
          <IconButton label="Go back" onClick={onBack}>
            <ArrowLeft className="h-5 w-5 text-[#4F38D1]" strokeWidth={2.2} />
          </IconButton>
          <div className="text-center">
            <h1 className="bg-[linear-gradient(105deg,#2F299B_5%,#6338E8_60%,#287CCF_115%)] bg-clip-text text-[27px] font-extrabold leading-8 tracking-[-0.8px] text-transparent">
              Dopameter
            </h1>
            <p className="mt-0.5 text-[13px] font-medium text-[#666A91]">A moment to check in</p>
          </div>
          <div aria-hidden="true" />
        </header>

        <main className="flex flex-1 flex-col items-center pt-7 text-center sm:pt-9">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col items-center"
          >
            <div className="mb-3 rounded-full border border-white/90 bg-white/56 px-3 py-1 text-[10px] font-bold uppercase tracking-[1.8px] text-[#6555B9] shadow-[0_8px_24px_rgba(72,61,146,.08)] backdrop-blur-xl">
              There’s room for every feeling
            </div>
            <h2 className="max-w-[350px] text-[36px] font-extrabold leading-[39px] tracking-[-1.7px] text-[#11123D]">
              How are you,<br />really?
            </h2>
            <p className="mt-3 max-w-[334px] text-[15px] font-medium leading-[22px] text-[#5F648B]">
              You don’t need the perfect word. Explore the feelings and choose what feels closest right now.
            </p>
          </motion.div>

          <div className="relative mt-4 h-[350px] w-[350px] max-w-[94vw] shrink-0" aria-label="A range of feelings you can explore">
            <motion.div
              aria-hidden="true"
              className="absolute inset-[25px] rounded-full border border-white/75 bg-white/15 shadow-[inset_0_0_52px_rgba(255,255,255,.72),0_24px_70px_rgba(87,64,212,.12)] backdrop-blur-[2px]"
              animate={reduceMotion ? undefined : { rotate: 360 }}
              transition={{ duration: 60, ease: 'linear', repeat: Infinity }}
            />
            <div aria-hidden="true" className="absolute inset-[66px] rounded-full border border-white/80" />
            <div aria-hidden="true" className="absolute inset-[93px] rounded-full bg-[radial-gradient(circle_at_40%_30%,rgba(255,255,255,.98),rgba(239,235,255,.78)_54%,rgba(207,228,255,.68))] shadow-[0_18px_45px_rgba(83,67,176,.18),inset_0_1px_0_white] ring-1 ring-white" />

            {tutorialFeelings.map((feeling, index) => {
              const radius = 137;
              const radians = (feeling.angle * Math.PI) / 180;
              const x = 175 + radius * Math.cos(radians);
              const y = 175 + radius * Math.sin(radians);
              return (
                <motion.div
                  key={feeling.label}
                  className="absolute z-10 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center"
                  style={{ left: x, top: y }}
                  initial={reduceMotion ? false : { opacity: 0, scale: 0.75 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: reduceMotion ? 0 : 0.2 + index * 0.045, duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div
                    className="flex h-[58px] w-[58px] items-center justify-center rounded-full border border-white/90 bg-white/68 text-[29px] shadow-[0_10px_28px_rgba(63,53,127,.12),inset_0_1px_0_white] backdrop-blur-xl"
                    style={{ boxShadow: `0 10px 28px rgba(63,53,127,.12), 0 0 24px ${feeling.tint}, inset 0 1px 0 white` }}
                  >
                    <span role="img" aria-label={feeling.label}>{feeling.emoji}</span>
                  </div>
                  <span className="mt-1.5 whitespace-nowrap text-[10px] font-bold text-[#5A5E88]">{feeling.label}</span>
                </motion.div>
              );
            })}

            <motion.button
              type="button"
              onClick={onBegin}
              whileTap={reduceMotion ? undefined : { scale: 0.96 }}
              className="absolute left-1/2 top-1/2 z-20 flex h-[144px] w-[144px] -translate-x-1/2 -translate-y-1/2 cursor-pointer flex-col items-center justify-center rounded-full text-[#3020B9] outline-none focus-visible:ring-4 focus-visible:ring-[#6754E8]/30"
              aria-label="Begin your emotional check-in"
            >
              <span className="text-[11px] font-bold uppercase tracking-[1.5px] text-[#7774A5]">Tap to begin</span>
              <span className="mt-1 max-w-[100px] text-[17px] font-extrabold leading-5">Find what feels closest</span>
              <span className="mt-2 flex h-7 w-7 items-center justify-center rounded-full bg-[#5B42DA] text-white shadow-[0_7px_18px_rgba(73,48,197,.32)]">
                <ArrowRight className="h-4 w-4" strokeWidth={2.4} />
              </span>
            </motion.button>
          </div>

          <div className="-mt-1 flex items-center gap-2 rounded-full border border-white/80 bg-white/48 px-3 py-2 text-[11px] font-semibold text-[#696D91] shadow-[0_8px_25px_rgba(69,56,139,.07)] backdrop-blur-xl">
            <Sparkles className="h-3.5 w-3.5 text-[#6950DF]" aria-hidden="true" />
            No right answers — only what feels true to you
          </div>
        </main>

        <button
          type="button"
          onClick={onChat}
          className="mt-5 flex min-h-[76px] w-full cursor-pointer items-center rounded-[24px] border border-white/90 bg-white/65 px-4 text-left shadow-[0_16px_42px_rgba(55,55,110,.11),inset_0_1px_0_white] backdrop-blur-2xl transition active:scale-[.985] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#6754E8]/25"
          aria-label="Chat with Bro if you are not sure what you feel"
        >
          <div className="relative flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-full bg-[conic-gradient(from_210deg,#3E2AB9,#9A55F4,#51B8FF,#4A36D6)] shadow-[0_8px_22px_rgba(75,50,190,.30)]">
            <div className="absolute inset-[5px] rounded-full bg-[radial-gradient(circle_at_35%_25%,#DCCBFF,transparent_28%),radial-gradient(circle_at_60%_68%,#50CEFF,transparent_34%),#39259B]" />
            <div className="relative h-2 w-2 rounded-full bg-white shadow-[15px_0_0_white] -translate-x-[7px]" />
          </div>
          <div className="ml-3 min-w-0 flex-1">
            <p className="text-[12px] font-semibold text-[#74789C]">Not sure what you’re feeling?</p>
            <p className="mt-0.5 text-[20px] font-extrabold tracking-[-.5px] text-[#11123D]">Talk it through with Bro</p>
          </div>
          <span className="ml-2 flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#F0EEFF] text-[#4D32D1]">
            <ArrowRight className="h-5 w-5" strokeWidth={2.2} />
          </span>
        </button>
      </div>
    </div>
  );
}

function IconButton({
  children,
  label,
  onClick,
}: {
  children: ReactNode;
  label: string;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="flex h-11 w-11 items-center justify-center rounded-full border border-[rgba(232,231,241,0.85)] bg-white shadow-[0px_6px_16px_0px_rgba(84,75,187,0.07)] active:scale-95"
      aria-label={label}
    >
      {children}
    </button>
  );
}

function PercentCircle({
  value,
  color,
  selected = false,
  future = false,
}: {
  value: number | null;
  color: string;
  selected?: boolean;
  future?: boolean;
}) {
  if (future || value === null) {
    return (
      <div className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-[#D8D7E2] bg-white/70" />
    );
  }

  return (
    <div
      className={`flex h-11 w-11 items-center justify-center rounded-full ${selected ? 'text-white shadow-[0px_7px_14px_0px_rgba(84,75,187,0.22)]' : 'text-[#2D2E34]'}`}
      style={{
        background: selected
          ? 'linear-gradient(135deg, #5840D4 0%, #7D6DF0 100%)'
          : `conic-gradient(${color} ${value * 3.6}deg, rgba(232,231,241,0.95) ${value * 3.6}deg)`,
      }}
    >
      <div className={`flex h-9 w-9 items-center justify-center rounded-full ${selected ? 'bg-transparent' : 'bg-white'}`}>
        <span className="text-[12px] font-bold leading-4" style={{ fontFamily: 'Inter, sans-serif' }}>
          {value}%
        </span>
      </div>
    </div>
  );
}

function StatusBar() {
  return (
    <div className="flex items-center justify-between px-6 pt-4 pb-2">
      <div className="text-[14px] font-semibold leading-5 tracking-normal">9:41</div>
      <div className="flex items-center gap-1.5">
        <svg className="h-[12px] w-[19px]" viewBox="0 0 19.2 12.2264" fill="none">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M19.2 1.14623C19.2 0.513183 18.7224 0 18.1333 0H17.0667C16.4776 0 16 0.513183 16 1.14623V11.0802C16 11.7132 16.4776 12.2264 17.0667 12.2264H18.1333C18.7224 12.2264 19.2 11.7132 19.2 11.0802V1.14623ZM11.7659 2.44528H12.8326C13.4217 2.44528 13.8992 2.97078 13.8992 3.61902V11.0527C13.8992 11.7009 13.4217 12.2264 12.8326 12.2264H11.7659C11.1768 12.2264 10.6992 11.7009 10.6992 11.0527V3.61902C10.6992 2.97078 11.1768 2.44528 11.7659 2.44528ZM7.43411 5.09433H6.36745C5.77834 5.09433 5.30078 5.62652 5.30078 6.28301V11.0377C5.30078 11.6942 5.77834 12.2264 6.36745 12.2264H7.43411C8.02322 12.2264 8.50078 11.6942 8.50078 11.0377V6.28301C8.50078 5.62652 8.02322 5.09433 7.43411 5.09433ZM2.13333 7.53962H1.06667C0.477563 7.53962 0 8.06421 0 8.71132V11.0547C0 11.7018 0.477563 12.2264 1.06667 12.2264H2.13333C2.72244 12.2264 3.2 11.7018 3.2 11.0547V8.71132C3.2 8.06421 2.72244 7.53962 2.13333 7.53962Z"
            fill="black"
          />
        </svg>
        <svg className="h-[12px] w-[17px]" viewBox="0 0 17.1417 12.3283" fill="none">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M8.5713 2.46628C11.0584 2.46639 13.4504 3.38847 15.2529 5.04195C15.3887 5.1696 15.6056 5.16799 15.7393 5.03834L17.0368 3.77487C17.1045 3.70911 17.1422 3.62004 17.1417 3.52735C17.1411 3.43467 17.1023 3.34603 17.0338 3.28104C12.3028 -1.09368 4.83907 -1.09368 0.108056 3.28104C0.039524 3.34598 0.000639766 3.4346 7.82398e-06 3.52728C-0.000624118 3.61996 0.0370483 3.70906 0.104689 3.77487L1.40255 5.03834C1.53615 5.16819 1.75327 5.1698 1.88893 5.04195C3.69167 3.38836 6.08395 2.46628 8.5713 2.46628ZM8.56795 6.68656C9.92527 6.68647 11.2341 7.19821 12.2403 8.12234C12.3763 8.2535 12.5907 8.25065 12.7234 8.11593L14.0106 6.79663C14.0784 6.72742 14.1161 6.63355 14.1151 6.53599C14.1141 6.43844 14.0746 6.34536 14.0054 6.27757C10.9416 3.38672 6.19688 3.38672 3.13305 6.27757C3.06384 6.34536 3.02435 6.43849 3.02345 6.53607C3.02254 6.63365 3.06028 6.72752 3.12822 6.79663L4.41513 8.11593C4.54778 8.25065 4.76215 8.2535 4.89823 8.12234C5.90368 7.19882 7.21152 6.68713 8.56795 6.68656ZM11.0924 9.48011C11.0943 9.58546 11.0572 9.68703 10.9899 9.76084L8.81327 12.2156C8.74946 12.2877 8.66247 12.3283 8.5717 12.3283C8.48093 12.3283 8.39394 12.3283 8.33013 12.2156L6.1531 9.76084C6.08585 9.68697 6.04886 9.58537 6.05085 9.48002C6.05284 9.37467 6.09365 9.27491 6.16364 9.20429C7.55374 7.8904 9.58966 7.8904 10.9798 9.20429C11.0497 9.27497 11.0904 9.37476 11.0924 9.48011Z"
            fill="black"
          />
        </svg>
        <svg className="h-[13px] w-[27px]" viewBox="0 0 27.328 13" fill="none">
          <rect x="0.5" y="0.5" width="24" height="12" rx="3.8" stroke="black" opacity="0.35" />
          <path d="M26 4.78113V8.8566C26.8047 8.51143 27.328 7.70847 27.328 6.81886C27.328 5.92926 26.8047 5.1263 26 4.78113" fill="black" opacity="0.4" />
          <rect x="2" y="2" width="21" height="9" rx="2.5" fill="black" />
        </svg>
      </div>
    </div>
  );
}
