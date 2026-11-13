import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Clock3,
  Feather,
  FileText,
  Shield,
  Sparkles,
  Target,
  Users,
  Zap,
} from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import type { CSSProperties } from 'react';
import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router';
import rootChakraImage from '../../../imports/ReturnUserHome/680b9473c856efcb97e710b14b817e94ed6c94f3.png';
import KarmaMark from '../KarmaMark';

type RewardActivity = 'meditation' | 'focus-sprint' | 'journaling';

type RewardContext = {
  activity: RewardActivity;
  title: string;
  durationLabel: string;
  response: string;
  delta: number;
  recordedAt: string;
};

type RewardConfig = {
  karma: number;
  title: string;
  body: string;
  honestTitle: string;
  honestBody: string;
  defaultTitle: string;
  defaultDuration: string;
  streakValue: string;
  streakLabel: string;
  nextLabel: string;
  nextTitle: string;
  nextAction: string;
  nextRoute: string;
};

const rewardConfigs: Record<RewardActivity, RewardConfig> = {
  meditation: {
    karma: 15,
    title: 'You showed up for yourself.',
    body: 'That small act of care builds real momentum.',
    honestTitle: 'You were honest with yourself.',
    honestBody: 'Checking in truthfully is how real self-trust begins.',
    defaultTitle: 'Ground Chakra Meditation',
    defaultDuration: '18 min',
    streakValue: '12-day',
    streakLabel: 'streak held',
    nextLabel: 'Optional reflection',
    nextTitle: 'A moment to reflect',
    nextAction: 'Journal',
    nextRoute: '/home/explore/thought-bank/write',
  },
  'focus-sprint': {
    karma: 25,
    title: 'You closed the loop.',
    body: 'That focused effort moved meaningful work forward.',
    honestTitle: 'You learned what needs adjusting.',
    honestBody: 'An honest check-in makes the next sprint stronger.',
    defaultTitle: 'Focus Sprint',
    defaultDuration: '45 min',
    streakValue: '4-day',
    streakLabel: 'focus streak',
    nextLabel: 'Keep the momentum',
    nextTitle: 'Plan the next sprint',
    nextAction: 'Plan',
    nextRoute: '/home/focus-sprint',
  },
  journaling: {
    karma: 15,
    title: 'You made space for yourself.',
    body: 'Putting thoughts into words creates room for clarity.',
    honestTitle: 'You stayed with what was real.',
    honestBody: 'Writing it down still matters, even when it feels unresolved.',
    defaultTitle: 'Thought Bank reflection',
    defaultDuration: 'Entry saved',
    streakValue: '3 entries',
    streakLabel: 'this week',
    nextLabel: 'Your thought is safe',
    nextTitle: 'Return when you’re ready',
    nextAction: 'Entries',
    nextRoute: '/home/explore/thought-bank',
  },
};

function getRewardContext(): RewardContext {
  try {
    const stored = JSON.parse(sessionStorage.getItem('bodhi-reward-context') ?? '{}') as Partial<RewardContext>;
    if (stored.activity && rewardConfigs[stored.activity]) {
      const config = rewardConfigs[stored.activity];
      return {
        activity: stored.activity,
        title: stored.title ?? config.defaultTitle,
        durationLabel: stored.durationLabel ?? config.defaultDuration,
        response: stored.response ?? '',
        delta: typeof stored.delta === 'number' && Number.isFinite(stored.delta) ? stored.delta : 0,
        recordedAt: stored.recordedAt ?? new Date().toISOString(),
      };
    }
  } catch {
    // Fall through to the legacy meditation reward context.
  }

  try {
    const legacy = JSON.parse(sessionStorage.getItem('bodhi-meditation-feedback') ?? '{}') as {
      meditation?: string;
      response?: string;
      recordedAt?: string;
    };
    return {
      activity: 'meditation',
      title: legacy.meditation ?? rewardConfigs.meditation.defaultTitle,
      durationLabel: rewardConfigs.meditation.defaultDuration,
      response: legacy.response ?? sessionStorage.getItem('bodhi-last-meditation-feedback') ?? 'Grounded',
      delta: Number(sessionStorage.getItem('bodhi-dopameter-last-delta') ?? 10),
      recordedAt: legacy.recordedAt ?? 'current-meditation',
    };
  } catch {
    return {
      activity: 'meditation',
      title: rewardConfigs.meditation.defaultTitle,
      durationLabel: rewardConfigs.meditation.defaultDuration,
      response: 'Grounded',
      delta: 10,
      recordedAt: 'current-meditation',
    };
  }
}

export default function KarmaRewardScreen() {
  const navigate = useNavigate();
  const shouldReduceMotion = useReducedMotion();
  const rewardContext = useMemo(getRewardContext, []);
  const config = rewardConfigs[rewardContext.activity];
  const [displayedReward, setDisplayedReward] = useState(shouldReduceMotion ? config.karma : 0);
  const [leagueCompleted, setLeagueCompleted] = useState(18);
  const message =
    rewardContext.delta > 0
      ? { title: config.title, body: config.body }
      : { title: config.honestTitle, body: config.honestBody };

  useEffect(() => {
    const awardId = rewardContext.recordedAt;
    if (sessionStorage.getItem('bodhi-last-karma-award') !== awardId) {
      const currentKarma = Number(sessionStorage.getItem('bodhi-karma-points') ?? 0);
      sessionStorage.setItem('bodhi-karma-points', `${Math.max(0, currentKarma) + config.karma}`);
      sessionStorage.setItem('bodhi-last-karma-award', awardId);
    }

    const currentStreak = Number(sessionStorage.getItem('bodhi-streak-days') ?? 11);
    sessionStorage.setItem('bodhi-streak-days', `${Math.max(12, currentStreak)}`);
    if (navigator.userActivation?.isActive) navigator.vibrate?.([12, 42, 18]);
  }, [config.karma, rewardContext.recordedAt]);

  useEffect(() => {
    if (shouldReduceMotion) {
      setDisplayedReward(config.karma);
      setLeagueCompleted(19);
      return;
    }

    let frame = 0;
    const startedAt = performance.now();
    const countReward = (now: number) => {
      const progress = Math.min((now - startedAt) / 720, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayedReward(Math.round(config.karma * eased));
      if (progress < 1) frame = requestAnimationFrame(countReward);
    };
    frame = requestAnimationFrame(countReward);
    const leagueTimer = window.setTimeout(() => setLeagueCompleted(19), 980);

    return () => {
      cancelAnimationFrame(frame);
      window.clearTimeout(leagueTimer);
    };
  }, [config.karma, shouldReduceMotion]);

  const enter = (delay = 0) => ({
    initial: shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 12 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: shouldReduceMotion ? 0.12 : 0.32, delay, ease: [0.22, 1, 0.36, 1] as const },
  });

  return (
    <div className="relative mx-auto min-h-dvh w-full max-w-md overflow-hidden bg-[#F8F7FF] text-[#171936]">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_50%_14%,rgba(255,255,255,1)_0%,rgba(241,232,255,0.92)_29%,rgba(235,241,255,0.78)_64%,rgba(255,255,255,0.97)_100%)]" />
      <div className="pointer-events-none fixed left-[-100px] top-[420px] h-80 w-80 rounded-full bg-[#C9BBFF]/22 blur-[68px]" />
      <div className="pointer-events-none fixed right-[-110px] top-10 h-72 w-72 rounded-full bg-[#BCEAFF]/28 blur-[72px]" />

      <div className="relative z-10">
        <StatusBar />
        <main className="flex min-h-[calc(100dvh-40px)] flex-col px-5 pb-6 pt-0">
          <motion.section className="relative flex flex-col items-center pt-5 text-center" {...enter()}>
            <div className="pointer-events-none absolute top-1 h-60 w-[350px] rounded-full bg-[radial-gradient(circle,rgba(255,247,205,0.92)_0%,rgba(194,173,255,0.42)_36%,rgba(255,255,255,0)_72%)]" />
            <div className="pointer-events-none absolute top-5 h-48 w-80 opacity-70 [background:repeating-conic-gradient(from_0deg,rgba(255,255,255,0)_0deg,rgba(255,255,255,0)_12deg,rgba(255,242,190,0.42)_13deg,rgba(255,255,255,0)_15deg)] [mask-image:radial-gradient(circle,black_0%,transparent_70%)]" />
            <RewardSpark className="left-8 top-14 text-[#FFCA73]" delay={0.08} />
            <RewardSpark className="right-8 top-20 text-[#8171F2]" delay={0.14} />
            <RewardSpark className="right-20 top-4 text-[#FFD68C]" delay={0.2} small />
            <RewardSpark className="left-16 top-36 text-[#A38BF4]" delay={0.25} small />

            <motion.div
              className="relative"
              style={{ transformPerspective: 900 }}
              initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.7, rotateY: -110 }}
              animate={{ opacity: 1, scale: [0.7, 1.07, 1], rotateY: [-110, 14, 0] }}
              transition={{ duration: shouldReduceMotion ? 0 : 0.58, times: [0, 0.72, 1], ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="absolute inset-3 rounded-full bg-[#FFDFA0]/60 blur-2xl" />
              <motion.div
                className="absolute inset-0 rounded-full ring-2 ring-[#FFE2A0]/60"
                animate={shouldReduceMotion ? undefined : { scale: [0.9, 1.18, 1.34], opacity: [0, 0.62, 0] }}
                transition={{ duration: 0.9, delay: 0.35, ease: 'easeOut' }}
              />
              <KarmaMark size={138} className="relative" />
              <motion.div
                className="absolute inset-0 rounded-full bg-[linear-gradient(110deg,transparent_24%,rgba(255,255,255,0.72)_44%,transparent_62%)]"
                initial={{ x: '-85%', opacity: 0 }}
                animate={shouldReduceMotion ? { opacity: 0 } : { x: ['-85%', '85%'], opacity: [0, 0.82, 0] }}
                transition={{ duration: 0.58, delay: 0.4, repeat: shouldReduceMotion ? 0 : Infinity, repeatDelay: 5.2 }}
                aria-hidden="true"
              />
            </motion.div>

            <motion.div
              className="w-full"
              {...enter(shouldReduceMotion ? 0 : 0.2)}
            >
              <motion.div
                className="mx-auto mt-4 inline-flex h-10 items-center gap-2 rounded-full border border-white/90 bg-[linear-gradient(115deg,rgba(255,255,255,0.88),rgba(239,231,255,0.86))] px-4 shadow-[0px_8px_20px_rgba(84,64,212,0.14),inset_0px_1px_0px_rgba(255,255,255,0.95)] backdrop-blur-xl"
                initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.82 }}
                animate={{ opacity: 1, scale: [0.82, 1.05, 1] }}
                transition={{ duration: 0.4, delay: shouldReduceMotion ? 0 : 0.32, ease: [0.22, 1, 0.36, 1] }}
              >
                <KarmaMark size={25} />
                <span className="min-w-[161px] text-left text-[18px] font-black leading-6 text-[#5840D4]">+{displayedReward} Karma earned</span>
              </motion.div>
              <h1 className="mt-4 text-[25px] font-black leading-[31px] tracking-[-0.7px] text-[#312262]">
                {message.title}
              </h1>
              <p className="mx-auto mt-1 max-w-[320px] text-[14px] font-semibold leading-5 text-[#555875]">{message.body}</p>
            </motion.div>
          </motion.section>

          <div className="mt-4 flex flex-1 flex-col gap-6">
          <motion.section
            data-premium-card="todays-win"
            className="relative isolate flex min-h-[134px] items-center overflow-visible rounded-[27px] border-[1.5px] border-[#C5B7F8]/75 bg-[linear-gradient(120deg,rgba(255,255,255,0.68)_0%,rgba(239,233,255,0.56)_54%,rgba(220,236,255,0.50)_100%)] px-4 py-[18px] shadow-[0_20px_42px_rgba(66,54,145,0.17),0_4px_12px_rgba(112,91,210,0.10),inset_0_1px_0_rgba(255,255,255,0.98),inset_0_-1px_0_rgba(116,96,198,0.13)] backdrop-blur-[28px] backdrop-saturate-[1.22]"
            {...enter(shouldReduceMotion ? 0 : 0.36)}
          >
            <PremiumPerimeter phase={0} reduced={shouldReduceMotion} />
            <GlassSheen delay={0.7} reduced={shouldReduceMotion} />
            <div className="relative z-10 h-[94px] w-[94px] shrink-0 overflow-hidden rounded-[21px] shadow-[0px_10px_22px_rgba(45,42,88,0.19)] ring-1 ring-white/80">
              <ActivityThumbnail activity={rewardContext.activity} />
              <div className="absolute inset-0 ring-1 ring-inset ring-white/40" />
            </div>
            <div className="relative z-10 ml-4 min-w-0 flex-1">
              <p className="text-[10px] font-black uppercase tracking-[1.1px] text-[#7258DF]">Today’s win</p>
              <h2 className="mt-1.5 text-[17px] font-black leading-5 text-[#20223C]">{rewardContext.title}</h2>
              <div className="mt-2.5 flex flex-wrap items-center gap-2">
                <span className="inline-flex h-7 items-center gap-1.5 rounded-full border border-white/90 bg-white/72 px-2.5 text-[11px] font-extrabold text-[#5840D4] shadow-[0px_5px_12px_rgba(84,64,212,0.08)]">
                  <CheckCircle2 className="h-3.5 w-3.5" fill="#5840D4" stroke="white" strokeWidth={2.5} />
                  Completed
                </span>
                <span className="inline-flex h-7 items-center gap-1.5 rounded-full border border-white/80 bg-white/58 px-2.5 text-[11px] font-bold text-[#666984]">
                  {rewardContext.activity === 'journaling' ? (
                    <FileText className="h-3.5 w-3.5 text-[#5840D4]" />
                  ) : (
                    <Clock3 className="h-3.5 w-3.5 text-[#5840D4]" />
                  )}
                  {rewardContext.durationLabel}
                </span>
              </div>
            </div>
          </motion.section>

          <motion.section
            data-premium-card="momentum"
            className="relative isolate min-h-[162px] overflow-visible rounded-[27px] border-[1.5px] border-[#C5B7F8]/75 bg-[linear-gradient(125deg,rgba(255,250,235,0.62)_0%,rgba(239,230,255,0.56)_48%,rgba(217,232,255,0.50)_100%)] px-4 pb-4 pt-[18px] shadow-[0_20px_42px_rgba(66,54,145,0.18),0_4px_12px_rgba(112,91,210,0.10),inset_0_1px_0_rgba(255,255,255,0.98),inset_0_-1px_0_rgba(116,96,198,0.13)] backdrop-blur-[28px] backdrop-saturate-[1.22]"
            {...enter(shouldReduceMotion ? 0 : 0.43)}
          >
            <PremiumPerimeter phase={0.35} reduced={shouldReduceMotion} />
            <GlassSheen delay={0.9} reduced={shouldReduceMotion} />
            <div className="relative z-10 flex items-center justify-between px-1 pb-3">
              <p className="text-[10px] font-black uppercase tracking-[1.15px] text-[#7258DF]">Momentum charged</p>
              <Sparkles className="h-4 w-4 text-[#A68DF2]" strokeWidth={2} />
            </div>
            <div className="relative z-10 grid grid-cols-2 divide-x divide-white/80 overflow-hidden rounded-[20px] border border-white/75 bg-white/34 shadow-[0_7px_18px_rgba(76,62,159,0.08),inset_0_1px_0_rgba(255,255,255,0.92),inset_0_-1px_0_rgba(123,102,211,0.08)] backdrop-blur-xl">
              <button
                onClick={() => navigate('/home/journey')}
                className="flex min-h-[98px] items-center px-3.5 text-left active:bg-white/24"
              >
                <motion.span
                  className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[linear-gradient(145deg,#FFD66B_0%,#F28A35_100%)] text-white shadow-[0px_8px_18px_rgba(225,126,44,0.26),inset_0px_1px_0px_rgba(255,255,255,0.65)]"
                  animate={shouldReduceMotion ? undefined : { rotate: [0, 360] }}
                  transition={{ duration: 0.72, delay: 1.05, repeat: shouldReduceMotion ? 0 : Infinity, repeatDelay: 4.4, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Zap className="h-7 w-7" fill="white" strokeWidth={1.5} />
                </motion.span>
                <span className="ml-2.5">
                  <span className="block text-[14px] font-black leading-4 text-[#35233E]">{config.streakValue}</span>
                  <span className="mt-1 block text-[11px] font-bold leading-4 text-[#8A664A]">{config.streakLabel}</span>
                </span>
              </button>
              <button
                onClick={() => navigate('/home/sessions/league')}
                className="flex min-h-[98px] items-center px-3.5 text-left active:bg-white/24"
              >
                <motion.span
                  className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[linear-gradient(145deg,#9475F0,#5840D4)] text-white shadow-[0px_8px_18px_rgba(84,64,212,0.25),inset_0px_1px_0px_rgba(255,255,255,0.55)]"
                  animate={shouldReduceMotion ? undefined : { scale: [1, 1.08, 1] }}
                  transition={{ duration: 0.62, delay: 1.15, repeat: shouldReduceMotion ? 0 : Infinity, repeatDelay: 2.8, ease: 'easeInOut' }}
                >
                  <Shield className="absolute h-10 w-10 text-white/20" fill="currentColor" strokeWidth={1.4} />
                  <Users className="relative h-[22px] w-[22px]" fill="rgba(255,255,255,0.22)" strokeWidth={2.1} />
                </motion.span>
                <span className="ml-2.5">
                  <span className="block text-[14px] font-black leading-4 text-[#292641]">{leagueCompleted}/30</span>
                  <span className="mt-1 block max-w-[75px] text-[10px] font-bold leading-3 text-[#6C6790]">You moved the class forward</span>
                </span>
              </button>
            </div>
          </motion.section>

          <motion.button
            onClick={() => navigate(config.nextRoute)}
            data-premium-card="reflection"
            className="relative isolate flex min-h-[104px] w-full items-center overflow-visible rounded-[25px] border-[1.5px] border-[#C5B7F8]/75 bg-[linear-gradient(120deg,rgba(255,255,255,0.66),rgba(235,228,255,0.53))] px-4 py-4 text-left shadow-[0_18px_38px_rgba(66,54,145,0.16),0_4px_12px_rgba(112,91,210,0.09),inset_0_1px_0_rgba(255,255,255,0.98),inset_0_-1px_0_rgba(116,96,198,0.13)] backdrop-blur-[28px] backdrop-saturate-[1.22] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#8171F2]/30"
            whileTap={{ scale: 0.985 }}
            {...enter(shouldReduceMotion ? 0 : 0.53)}
          >
            <PremiumPerimeter phase={0.7} reduced={shouldReduceMotion} />
            <GlassSheen delay={1.08} reduced={shouldReduceMotion} />
            <span className="relative z-10 flex h-16 w-16 shrink-0 items-center justify-center rounded-[19px] bg-[linear-gradient(145deg,#9672F2,#6443DD)] text-white shadow-[0px_8px_18px_rgba(84,64,212,0.22)]">
              {rewardContext.activity === 'focus-sprint' ? (
                <Target className="h-8 w-8" strokeWidth={1.8} />
              ) : rewardContext.activity === 'journaling' ? (
                <BookOpen className="h-8 w-8" strokeWidth={1.8} />
              ) : (
                <Feather className="h-8 w-8" strokeWidth={1.8} />
              )}
            </span>
            <div className="relative z-10 ml-4 min-w-0 flex-1">
              <p className="text-[9px] font-extrabold uppercase tracking-[1.1px] text-[#6349E6]">{config.nextLabel}</p>
              <h3 className="mt-1.5 text-[16px] font-black leading-5 text-[#24263E]">{config.nextTitle}</h3>
            </div>
            <span className="relative z-10 ml-3 inline-flex h-10 shrink-0 items-center gap-1.5 rounded-full bg-white/82 px-3.5 text-[12px] font-extrabold text-[#5840D4] shadow-[0px_6px_14px_rgba(84,75,187,0.10)]">
              {config.nextAction}
              <ArrowRight className="h-4 w-4" strokeWidth={2.5} />
            </span>
          </motion.button>

          <motion.button
            onClick={() => navigate('/home')}
            className="flex h-12 w-full items-center justify-center rounded-full border border-[#DCD4FF] bg-white/78 text-[15px] font-extrabold text-[#5840D4] shadow-[0px_8px_18px_rgba(84,75,187,0.09),inset_0px_1px_0px_rgba(255,255,255,0.95)] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#8171F2]/25 active:scale-[0.98]"
            {...enter(shouldReduceMotion ? 0 : 0.58)}
          >
            Done
          </motion.button>
          </div>
        </main>
      </div>
    </div>
  );
}

function ActivityThumbnail({ activity }: { activity: RewardActivity }) {
  if (activity === 'meditation') {
    return <img src={rootChakraImage} alt="" className="h-full w-full object-cover" />;
  }

  if (activity === 'focus-sprint') {
    return (
      <div
        className="relative flex h-full w-full items-center justify-center overflow-hidden bg-[radial-gradient(circle_at_32%_20%,rgba(255,255,255,0.72),transparent_26%),linear-gradient(145deg,#1B245B_0%,#5840D4_54%,#8D76F2_100%)]"
        aria-hidden="true"
      >
        <span className="absolute h-[76px] w-[76px] rounded-full border border-white/24" />
        <span className="absolute h-[54px] w-[54px] rounded-full border border-white/36" />
        <Target className="relative h-10 w-10 text-white drop-shadow-[0_5px_12px_rgba(27,20,82,0.36)]" strokeWidth={1.8} />
        <span className="absolute bottom-3 right-3 h-2 w-2 rounded-full bg-[#FFD77B] shadow-[0_0_10px_rgba(255,215,123,0.9)]" />
      </div>
    );
  }

  return (
    <div
      className="relative flex h-full w-full items-center justify-center overflow-hidden bg-[radial-gradient(circle_at_28%_18%,rgba(255,255,255,0.88),transparent_28%),linear-gradient(145deg,#E8E0FF_0%,#AF92F2_52%,#6F50DC_100%)]"
      aria-hidden="true"
    >
      <span className="absolute -right-3 top-3 h-16 w-16 rounded-full bg-white/16 blur-sm" />
      <BookOpen className="relative h-10 w-10 text-white drop-shadow-[0_5px_12px_rgba(56,38,122,0.28)]" strokeWidth={1.7} />
      <Sparkles className="absolute right-3 top-3 h-4 w-4 text-[#FFE3A3]" strokeWidth={1.8} />
    </div>
  );
}

const perimeterMask: CSSProperties = {
  padding: '2.4px',
  WebkitMask: 'linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)',
  WebkitMaskComposite: 'xor',
  mask: 'linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)',
  maskComposite: 'exclude',
};

const perimeterGlowMask: CSSProperties = {
  ...perimeterMask,
  padding: '5.5px',
};

function PremiumPerimeter({ phase, reduced }: { phase: number; reduced: boolean | null }) {
  const gradient =
    'conic-gradient(from 0deg, transparent 0deg 316deg, rgba(170,148,246,0) 322deg, rgba(189,172,250,0.26) 328deg, rgba(233,227,255,0.78) 334deg, rgba(255,255,255,0.98) 339deg, rgba(250,248,255,0.94) 343deg, rgba(204,190,252,0.58) 349deg, transparent 357deg)';

  return (
    <>
      <span
        className="pointer-events-none absolute inset-0 z-[2] grid place-items-center overflow-hidden rounded-[inherit] opacity-75 blur-[5px] drop-shadow-[0_0_6px_rgba(142,119,230,0.58)]"
        style={perimeterGlowMask}
        aria-hidden="true"
      >
        <span
          className="block h-[540px] w-[540px] shrink-0 will-change-transform"
          style={{
            background: gradient,
            animation: reduced ? 'none' : `karma-perimeter-spin 4.4s linear ${-phase}s infinite`,
          }}
        />
      </span>
      <span
        className="pointer-events-none absolute inset-0 z-[3] grid place-items-center overflow-hidden rounded-[inherit] opacity-95 drop-shadow-[0_0_3px_rgba(159,137,239,0.62)]"
        style={perimeterMask}
        aria-hidden="true"
      >
        <span
          className="block h-[520px] w-[520px] shrink-0 will-change-transform"
          style={{
            background: gradient,
            animation: reduced ? 'none' : `karma-perimeter-spin 4.4s linear ${-phase}s infinite`,
          }}
        />
      </span>
    </>
  );
}

function GlassSheen({ delay, reduced }: { delay: number; reduced: boolean | null }) {
  return (
    <span className="pointer-events-none absolute inset-0 z-[1] overflow-hidden rounded-[inherit]" aria-hidden="true">
      <span className="absolute inset-[1px] rounded-[inherit] bg-[radial-gradient(circle_at_10%_0%,rgba(255,255,255,0.48),transparent_40%),radial-gradient(circle_at_88%_105%,rgba(143,180,255,0.24),transparent_46%),radial-gradient(circle_at_56%_112%,rgba(186,157,255,0.14),transparent_38%)]" />
      <span className="absolute inset-[1px] rounded-[inherit] shadow-[inset_0_1px_1px_rgba(255,255,255,0.88),inset_1px_0_0_rgba(255,255,255,0.38),inset_0_-1px_1px_rgba(128,108,210,0.12)]" />
      <span className="absolute -left-[18%] -top-[58%] h-[158%] w-[98%] rotate-[-17deg] rounded-[46%] bg-[linear-gradient(112deg,rgba(255,255,255,0.34)_0%,rgba(255,255,255,0.22)_45%,rgba(255,255,255,0.07)_66%,transparent_80%)] opacity-75 blur-[7px]" />
      <motion.span
        className="absolute -bottom-[70%] -left-[72%] -top-[70%] w-[88%] rotate-[16deg] bg-[linear-gradient(90deg,transparent_0%,rgba(255,255,255,0.12)_22%,rgba(255,255,255,0.42)_48%,rgba(255,255,255,0.11)_72%,transparent_100%)] blur-[8px] will-change-transform"
        initial={{ x: '0%', opacity: 0.34 }}
        animate={reduced ? { opacity: 0.24 } : { x: ['0%', '230%'], opacity: [0.26, 0.48, 0.26] }}
        transition={{ duration: 7.2, delay, repeat: reduced ? 0 : Infinity, ease: 'linear' }}
      />
    </span>
  );
}

function RewardSpark({ className, delay, small = false }: { className: string; delay: number; small?: boolean }) {
  return (
    <motion.div
      className={`absolute ${className}`}
      initial={{ opacity: 0, scale: 0.4 }}
      animate={{ opacity: [0, 1, 0.8], scale: [0.4, 1.12, 1] }}
      transition={{ duration: 0.48, delay, ease: [0.22, 1, 0.36, 1] }}
      aria-hidden="true"
    >
      <Sparkles className={small ? 'h-4 w-4' : 'h-6 w-6'} strokeWidth={1.8} />
    </motion.div>
  );
}

function StatusBar() {
  return (
    <div className="flex items-center justify-between px-7 pb-1 pt-4">
      <div className="text-[14px] font-semibold leading-5 text-black">9:41</div>
      <div className="flex items-center gap-1.5">
        <span className="flex h-3 items-end gap-0.5">
          <span className="h-1.5 w-1 rounded-sm bg-black" />
          <span className="h-2 w-1 rounded-sm bg-black" />
          <span className="h-2.5 w-1 rounded-sm bg-black" />
          <span className="h-3 w-1 rounded-sm bg-black" />
        </span>
        <span className="h-3 w-4 rounded-[3px] border-2 border-black border-t-0" />
        <span className="h-[13px] w-[27px] rounded-[5px] border border-black/40 p-[2px]">
          <span className="block h-full w-[20px] rounded-[3px] bg-black" />
        </span>
      </div>
    </div>
  );
}
