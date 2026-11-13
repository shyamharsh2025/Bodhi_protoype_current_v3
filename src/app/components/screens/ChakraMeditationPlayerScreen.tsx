import {
  ArrowLeft,
  Bookmark,
  Download,
  Info,
  Pause,
  Play,
  Share2,
  SkipBack,
  SkipForward,
  Volume2,
} from 'lucide-react';
import { AnimatePresence } from 'motion/react';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import rootChakraImage from '../../../imports/ReturnUserHome/680b9473c856efcb97e710b14b817e94ed6c94f3.png';
import ActivityFeedbackSheet from '../ActivityFeedbackSheet';

const chakraTitles: Record<string, string> = {
  root: 'Ground Chakra Meditation',
  sacral: 'Sacral Chakra Meditation',
  'solar-plexus': 'Solar Plexus Chakra Meditation',
  heart: 'Heart Chakra Meditation',
  throat: 'Throat Chakra Meditation',
  'third-eye': 'Third Eye Chakra Meditation',
  crown: 'Crown Chakra Meditation',
};

const chakraDurations: Record<string, string> = {
  root: '18 min',
  sacral: '15 min',
  'solar-plexus': '16 min',
  heart: '20 min',
  throat: '14 min',
  'third-eye': '17 min',
  crown: '19 min',
};

const focusTitles: Record<string, string> = {
  'nsdr-quick-reset': 'NSDR Quick Reset',
  'nsdr-deep-recovery': 'NSDR Deep Recovery',
  'yog-nidra': 'Yog Nidra',
  'trataka-meditation': 'Trataka Meditation',
  'binaural-beats-for-focus': 'Binaural Beats for Focus',
  'breathework-for-focus': 'Breathework for Focus',
  'grounding-and-calm': 'Meditation for Grounding and Calm',
};

const focusDurations: Record<string, string> = {
  'nsdr-quick-reset': '12 min',
  'nsdr-deep-recovery': '25 min',
  'yog-nidra': '20 min',
  'trataka-meditation': '14 min',
  'binaural-beats-for-focus': '18 min',
  'breathework-for-focus': '10 min',
  'grounding-and-calm': '15 min',
};

const emotionalTitles: Record<string, string> = {
  'calm-your-anxiety': 'Calm Your Anxiety',
  'release-stress': 'Release Stress',
  'move-through-anger': 'Move Through Anger',
  'ease-overthinking': 'Ease Overthinking',
  'when-you-feel-sad': 'When You Feel Sad',
  'work-through-frustration': 'Work Through Frustration',
  'handle-worry': 'Handle Worry',
  'overcome-self-doubt': 'Overcome Self-Doubt',
  'release-guilt': 'Release Guilt',
  'feel-misunderstood': 'When You Feel Misunderstood',
  'feel-judged': 'When You Feel Judged',
  'handle-expectations': 'Handle Expectations',
};

const emotionalDurations: Record<string, string> = {
  'calm-your-anxiety': '14 min',
  'release-stress': '13 min',
  'move-through-anger': '16 min',
  'ease-overthinking': '12 min',
  'when-you-feel-sad': '15 min',
  'work-through-frustration': '13 min',
  'handle-worry': '12 min',
  'overcome-self-doubt': '14 min',
  'release-guilt': '16 min',
  'feel-misunderstood': '13 min',
  'feel-judged': '12 min',
  'handle-expectations': '15 min',
};

const awarenessTitles: Record<string, string> = {
  'mind-decode': 'Mind Decode',
  'objective-observer': 'The Objective Observer',
  'know-your-patterns': 'Know Your Patterns',
  'pause-before-you-react': 'Pause Before You React',
  'build-self-awareness': 'Build Self-Awareness',
};

const awarenessDurations: Record<string, string> = {
  'mind-decode': '12 min',
  'objective-observer': '14 min',
  'know-your-patterns': '13 min',
  'pause-before-you-react': '10 min',
  'build-self-awareness': '15 min',
};

const regulationTitles: Record<string, string> = {
  'master-your-mind': 'Master Your Mind',
  'regulate-anger': 'Regulate Anger',
  'release-and-let-go': 'Release & Let Go',
  'build-inner-peace': 'Build Inner Peace',
  'strengthen-emotional-control': 'Strengthen Emotional Control',
  'respond-dont-react': "Respond, Don't React",
};

const regulationDurations: Record<string, string> = {
  'master-your-mind': '15 min',
  'regulate-anger': '14 min',
  'release-and-let-go': '13 min',
  'build-inner-peace': '16 min',
  'strengthen-emotional-control': '15 min',
  'respond-dont-react': '12 min',
};

const playerActions = [
  { label: 'Share', icon: Share2 },
  { label: 'Download', icon: Download },
  { label: 'Favorite', icon: Bookmark },
  { label: 'Sound', icon: Volume2 },
  { label: 'Info', icon: Info },
];

export default function ChakraMeditationPlayerScreen() {
  const navigate = useNavigate();
  const { chakra, focus, emotional, awareness, regulation } = useParams();
  const [isPlaying, setIsPlaying] = useState(true);
  const [showFeedback, setShowFeedback] = useState(false);
  const isCompleted = showFeedback;
  const isFocusMeditation = Boolean(focus);
  const isEmotionalMeditation = Boolean(emotional);
  const isAwarenessMeditation = Boolean(awareness);
  const isRegulationMeditation = Boolean(regulation);
  const meditationSlug = regulation ?? awareness ?? emotional ?? focus ?? chakra ?? 'root';
  const title = isRegulationMeditation
    ? regulationTitles[meditationSlug] ?? regulationTitles['master-your-mind']
    : isAwarenessMeditation
      ? awarenessTitles[meditationSlug] ?? awarenessTitles['mind-decode']
      : isEmotionalMeditation
      ? emotionalTitles[meditationSlug] ?? emotionalTitles['calm-your-anxiety']
      : isFocusMeditation
      ? focusTitles[meditationSlug] ?? focusTitles['nsdr-quick-reset']
      : chakraTitles[meditationSlug] ?? chakraTitles.root;
  const duration = isRegulationMeditation
    ? regulationDurations[meditationSlug] ?? regulationDurations['master-your-mind']
    : isAwarenessMeditation
      ? awarenessDurations[meditationSlug] ?? awarenessDurations['mind-decode']
      : isEmotionalMeditation
      ? emotionalDurations[meditationSlug] ?? emotionalDurations['calm-your-anxiety']
      : isFocusMeditation
      ? focusDurations[meditationSlug] ?? focusDurations['nsdr-quick-reset']
      : chakraDurations[meditationSlug] ?? chakraDurations.root;
  const categoryLabel = isRegulationMeditation
    ? 'Guided regulation meditation'
    : isAwarenessMeditation
      ? 'Guided awareness meditation'
      : isEmotionalMeditation
    ? 'Guided emotional meditation'
    : isFocusMeditation
      ? 'Guided focus meditation'
      : 'Guided chakra meditation';

  return (
    <div className="relative mx-auto min-h-screen w-full max-w-md overflow-hidden bg-[#EEF2FF] text-[#25263A]">
      <div className="absolute inset-0 scale-110 opacity-45 blur-3xl">
        <img src={rootChakraImage} alt="" aria-hidden="true" className="h-full w-full object-cover" />
      </div>
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(232,241,255,0.92)_0%,rgba(232,224,255,0.94)_46%,rgba(255,255,255,0.98)_100%)]" />
      <div className="pointer-events-none absolute right-[-110px] top-10 h-[280px] w-[280px] rounded-full bg-[#C4E9FF]/55 blur-[72px]" />
      <div className="pointer-events-none absolute left-[-110px] top-[360px] h-[280px] w-[280px] rounded-full bg-[#C8B8FF]/60 blur-[76px]" />

      <div className="relative z-10 min-h-screen">
        <StatusBar />

        <header className="grid grid-cols-[54px_minmax(0,1fr)_54px] items-center px-5 pb-3 pt-5">
          <button
            aria-label="Go back"
            onClick={() => navigate(-1)}
            className="flex h-12 w-12 items-center justify-center rounded-full border border-white/80 bg-white/84 shadow-[0px_10px_22px_rgba(84,75,187,0.12)] backdrop-blur-xl active:scale-[0.96]"
          >
            <ArrowLeft className="h-6 w-6 text-[#5840D4]" strokeWidth={2.35} />
          </button>
          <h1 className="min-w-0 text-center text-[18px] font-extrabold leading-6 tracking-normal text-[#2D2E34]">
            Meditation
          </h1>
          <div />
        </header>

        <main className="px-8 pb-8 pt-2">
          <div className="relative mx-auto aspect-square w-full max-w-[292px] overflow-hidden rounded-[28px] bg-[#F4F5FF] shadow-[0px_22px_48px_rgba(84,75,187,0.22)]">
            <img
              src={rootChakraImage}
              alt="Meditating figure in front of a bright moon"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(234,241,255,0.06)_0%,rgba(255,255,255,0.00)_54%,rgba(84,75,187,0.16)_100%)]" />
          </div>

          <section className="mt-6">
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                <p className="text-[12px] font-extrabold uppercase leading-4 tracking-[0.08em] text-[#8171F2]">
                  {isCompleted ? 'Completed ✨' : 'Now Playing'}
                </p>
                <h2 className="mt-1 text-[25px] font-extrabold leading-8 tracking-normal text-[#2D2E34]">
                  {title}
                </h2>
                <p className="mt-1 text-[16px] font-semibold leading-6 text-[#6B6B86]">
                  {duration} · {categoryLabel}
                </p>
              </div>
              <button
                aria-label="Meditation options"
                className="mt-7 flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white/62 text-[#5840D4] shadow-[0px_8px_20px_rgba(84,75,187,0.10)] backdrop-blur-xl active:scale-[0.96]"
              >
                <Info className="h-5 w-5" strokeWidth={2.35} />
              </button>
            </div>

            <div className="mt-5">
              <div className="relative h-5">
                <div className="absolute left-0 right-0 top-2 h-1.5 rounded-full bg-white/70 shadow-[inset_0px_1px_0px_rgba(255,255,255,0.7)]" />
                <div className={`absolute left-0 top-2 h-1.5 rounded-full bg-[linear-gradient(90deg,#8171F2_0%,#5840D4_100%)] shadow-[0px_0px_12px_rgba(129,113,242,0.34)] transition-[width] duration-300 ${isCompleted ? 'w-full' : 'w-[39%]'}`} />
                <div className={`absolute top-1/2 h-5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full border-[3px] border-white bg-[#5840D4] shadow-[0px_6px_14px_rgba(84,75,187,0.32)] transition-[left] duration-300 ${isCompleted ? 'left-full' : 'left-[39%]'}`} />
              </div>
              <div className="mt-1 flex items-center justify-between text-[13px] font-semibold leading-5 text-[#6B6B86]">
                <span>{isCompleted ? duration.replace(' min', ':00') : '6:17'}</span>
                <span>{isCompleted ? duration.replace(' min', ':00') : '17:00'}</span>
              </div>
            </div>

            <div className="mt-5 flex items-center justify-between">
              <button
                aria-label="Previous"
                className="flex h-16 w-16 items-center justify-center rounded-full text-[#5840D4] active:scale-[0.96]"
              >
                <SkipBack className="h-10 w-10" strokeWidth={2.1} />
              </button>
              <button
                aria-label="Play meditation"
                onClick={() => setIsPlaying((value) => !value)}
                className="flex h-20 w-20 items-center justify-center rounded-full bg-white text-[#5840D4] shadow-[0px_18px_34px_rgba(84,75,187,0.20)] active:scale-[0.97]"
              >
                {isPlaying ? (
                  <Pause className="h-10 w-10 text-[#5840D4]" fill="#5840D4" strokeWidth={2} />
                ) : (
                  <Play className="ml-1 h-12 w-12 text-[#5840D4]" fill="#5840D4" strokeWidth={2} />
                )}
              </button>
              <button
                aria-label="Next"
                onClick={() => {
                  setIsPlaying(false);
                  setShowFeedback(true);
                }}
                className="flex h-16 w-16 items-center justify-center rounded-full text-[#5840D4] active:scale-[0.96]"
              >
                <SkipForward className="h-10 w-10" strokeWidth={2.1} />
              </button>
            </div>

            <div className="mt-6 grid grid-cols-5 gap-2">
              {playerActions.map(({ label, icon: Icon }) => (
                <button
                  key={label}
                  className="flex min-w-0 flex-col items-center gap-2 text-center active:scale-[0.97]"
                >
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white/64 text-[#5840D4] shadow-[0px_8px_20px_rgba(84,75,187,0.08)] backdrop-blur-xl">
                    <Icon className="h-5 w-5 text-[#5840D4]" strokeWidth={2.35} />
                  </span>
                  <span className="text-[11.5px] font-bold leading-4 text-[#6B6B86]">{label}</span>
                </button>
              ))}
            </div>
          </section>
        </main>
      </div>
      <AnimatePresence>
        {showFeedback && (
          <ActivityFeedbackSheet
            activity="meditation"
            activityTitle={title}
            durationLabel={duration}
            onSave={() => navigate('/home/karma-reward')}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

function StatusBar() {
  return (
    <div className="flex items-center justify-between px-7 pb-2 pt-8">
      <div className="text-[14px] font-semibold leading-5 tracking-normal text-black">9:41</div>
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
