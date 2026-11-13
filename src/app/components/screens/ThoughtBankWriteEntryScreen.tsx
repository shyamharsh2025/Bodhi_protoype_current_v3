import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Cloud,
  FileText,
  Leaf,
  Mic,
  Smile,
  Sparkles,
  Sun,
} from 'lucide-react';
import { AnimatePresence } from 'motion/react';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import ActivityFeedbackSheet from '../ActivityFeedbackSheet';

const moods = [
  { label: 'Calm', icon: Leaf, selected: true },
  { label: 'Grateful', icon: Smile },
  { label: 'Heavy', icon: Cloud },
  { label: 'Hopeful', icon: Sun },
];

export default function ThoughtBankWriteEntryScreen() {
  const navigate = useNavigate();
  const [entry, setEntry] = useState('');
  const [showFeedback, setShowFeedback] = useState(false);

  const saveEntry = () => {
    if (document.activeElement instanceof HTMLElement) document.activeElement.blur();
    sessionStorage.setItem(
      'bodhi-last-thought-bank-entry',
      JSON.stringify({
        body: entry,
        savedAt: new Date().toISOString(),
      }),
    );
    setShowFeedback(true);
  };

  return (
    <div className="relative min-h-screen bg-white pb-8">
      <div className="absolute top-[-70px] left-[38%] w-[280px] h-[280px] bg-[rgba(102,163,255,0.14)] rounded-full blur-[48px] pointer-events-none" />
      <div className="absolute top-[420px] left-[-90px] w-[300px] h-[300px] bg-[rgba(104,152,249,0.12)] rounded-full blur-[52px] pointer-events-none" />
      <div className="absolute bottom-[-80px] right-[-120px] w-[280px] h-[280px] bg-[rgba(154,148,255,0.13)] rounded-full blur-[52px] pointer-events-none" />

      <div className="relative z-10">
        <StatusBar />

        <header className="grid grid-cols-[52px_1fr_52px] items-center gap-3 px-6 pt-5 pb-6">
          <button
            onClick={() => navigate(-1)}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-[rgba(232,231,241,0.85)] bg-white shadow-[0px_6px_16px_0px_rgba(84,75,187,0.07)]"
            aria-label="Go back"
          >
            <ArrowLeft className="h-5 w-5 text-[#5840D4]" strokeWidth={2.2} />
          </button>

          <div className="text-center">
            <h1 className="text-[24px] font-bold text-[#5840D4] leading-8" style={{ fontFamily: 'Inter, sans-serif' }}>
              Thought Bank
            </h1>
            <p className="mt-1 text-[14px] font-medium text-[#5A5B62] leading-5" style={{ fontFamily: 'Inter, sans-serif' }}>
              Thursday, May 16
            </p>
          </div>

          <button
            className="flex h-11 w-11 items-center justify-center rounded-full border border-[rgba(232,231,241,0.85)] bg-white shadow-[0px_6px_16px_0px_rgba(84,75,187,0.07)]"
            aria-label="Reflection idea"
          >
            <Sparkles className="h-5 w-5 text-[#5840D4]" strokeWidth={2.1} />
          </button>
        </header>

        <main className="px-6">
          <section className="relative mb-5 overflow-hidden rounded-[22px] border border-[rgba(232,231,241,0.88)] bg-white p-5 shadow-[0px_10px_26px_0px_rgba(84,75,187,0.12)]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_82%_20%,rgba(154,148,255,0.24),transparent_34%),linear-gradient(140deg,rgba(255,255,255,0.98)_0%,rgba(247,246,255,0.94)_100%)]" />
            <Sparkles className="absolute right-10 top-14 h-4 w-4 text-white/90" fill="white" strokeWidth={2} />
            <Sparkles className="absolute right-20 bottom-12 h-4 w-4 text-white/90" fill="white" strokeWidth={2} />

            <div className="relative z-10">
              <div className="inline-flex h-7 items-center gap-2 rounded-full bg-[rgba(88,64,212,0.07)] px-3">
                <Sparkles className="h-3.5 w-3.5 text-[#5840D4]" strokeWidth={2.1} />
                <span className="text-[10px] font-bold uppercase tracking-[0.8px] text-[#5840D4] leading-3" style={{ fontFamily: 'Inter, sans-serif' }}>
                  OPTIONAL PROMPT
                </span>
              </div>
              <h2 className="mt-5 max-w-[292px] text-[24px] font-bold text-[#2D2E34] leading-8" style={{ fontFamily: 'Inter, sans-serif' }}>
                What is one thing you want to understand more clearly today?
              </h2>
              <p className="mt-4 text-[14px] font-medium text-[#5A5B62] leading-5" style={{ fontFamily: 'Inter, sans-serif' }}>
                Use this if it helps you begin.
              </p>
            </div>
          </section>

          <section className="mb-5 flex items-center gap-1.5" aria-label="Mood selection">
            {moods.map((mood) => {
              const Icon = mood.icon;
              return (
                <button
                  key={mood.label}
                  className={`flex h-11 shrink-0 items-center justify-center gap-1.5 rounded-full px-2 ${
                    mood.selected
                      ? 'border border-[#5840D4] bg-white text-[#5840D4] shadow-[0px_6px_14px_0px_rgba(84,75,187,0.10)]'
                      : 'border border-[rgba(232,231,241,0.8)] bg-white text-[#5A5B62] shadow-[0px_6px_14px_0px_rgba(84,75,187,0.06)]'
                  }`}
                  aria-pressed={mood.selected}
                >
                  <Icon className="h-4 w-4 shrink-0" strokeWidth={2.1} />
                  <span className="text-[12px] font-semibold leading-4" style={{ fontFamily: 'Inter, sans-serif' }}>
                    {mood.label}
                  </span>
                </button>
              );
            })}
          </section>

          <section className="relative mb-5 min-h-[360px] overflow-hidden rounded-[22px] border border-[rgba(232,231,241,0.8)] bg-white shadow-[0px_8px_22px_0px_rgba(84,75,187,0.10)]">
            <textarea
              value={entry}
              onChange={(event) => setEntry(event.target.value)}
              className="relative z-10 h-[312px] w-full resize-none bg-transparent px-5 pt-5 text-[14px] font-medium leading-5 text-[#2D2E34] outline-none placeholder:text-[#9A98B8]"
              style={{ fontFamily: 'Inter, sans-serif' }}
              placeholder="Write freely..."
              aria-label="Thought Bank entry"
            />
            <div className="absolute bottom-5 left-5 z-10 flex items-center gap-2 text-[#9A98B8]">
              <Sparkles className="h-4 w-4" strokeWidth={2} />
              <span className="text-[12px] font-medium leading-4" style={{ fontFamily: 'Inter, sans-serif' }}>
                A space to reflect freely
              </span>
            </div>
          </section>

          <section className="mb-5 grid grid-cols-3 divide-x divide-[#E8E7F1] overflow-hidden rounded-[22px] border border-[rgba(232,231,241,0.8)] bg-white shadow-[0px_8px_22px_0px_rgba(84,75,187,0.10)]">
            <UtilityItem icon={CheckCircle2} title="Auto-saved" subtitle="Just now" />
            <UtilityItem icon={Mic} title="Voice note" />
            <UtilityItem icon={FileText} title="Save draft" />
          </section>

          <button
            onClick={saveEntry}
            className="mb-4 flex h-14 w-full items-center justify-center gap-3 rounded-full shadow-[0px_10px_24px_0px_rgba(84,75,187,0.22)]"
            style={{ backgroundImage: 'linear-gradient(8.34389deg, rgb(84, 75, 187) 0%, rgb(154, 148, 255) 100%)' }}
          >
            <span className="text-[18px] font-bold text-[#F5F1FF] leading-7" style={{ fontFamily: 'Inter, sans-serif' }}>
              Save Entry
            </span>
            <ArrowRight className="h-5 w-5 text-white/85" strokeWidth={2.1} />
          </button>

          <button
            onClick={() => navigate('/home/explore/thought-bank')}
            className="mx-auto block h-11 px-5 text-[14px] font-bold text-[#5840D4] leading-5"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            Continue later
          </button>
        </main>
      </div>

      <AnimatePresence>
        {showFeedback && (
          <ActivityFeedbackSheet
            activity="journaling"
            activityTitle="Thought Bank reflection"
            durationLabel="Entry saved"
            onSave={() => navigate('/home/karma-reward')}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

function UtilityItem({
  icon: Icon,
  title,
  subtitle,
}: {
  icon: typeof CheckCircle2;
  title: string;
  subtitle?: string;
}) {
  return (
    <button className="flex min-h-[72px] items-center justify-center gap-2 px-2 text-center">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[rgba(88,64,212,0.08)]">
        <Icon className="h-5 w-5 text-[#5840D4]" strokeWidth={2.1} />
      </div>
      <div className="min-w-0 text-left">
        <div className="text-[12px] font-bold text-[#2D2E34] leading-4" style={{ fontFamily: 'Inter, sans-serif' }}>
          {title}
        </div>
        {subtitle ? (
          <div className="text-[12px] font-medium text-[#9A98B8] leading-4" style={{ fontFamily: 'Inter, sans-serif' }}>
            {subtitle}
          </div>
        ) : null}
      </div>
    </button>
  );
}

function StatusBar() {
  return (
    <div className="flex items-center justify-between px-6 pt-4 pb-2">
      <div className="text-[14px] font-semibold leading-5 tracking-normal">9:41</div>
      <div className="flex items-center gap-1.5">
        <svg className="w-[19px] h-[12px]" viewBox="0 0 19.2 12.2264" fill="none">
          <path fillRule="evenodd" clipRule="evenodd" d="M19.2 1.14623C19.2 0.513183 18.7224 0 18.1333 0H17.0667C16.4776 0 16 0.513183 16 1.14623V11.0802C16 11.7132 16.4776 12.2264 17.0667 12.2264H18.1333C18.7224 12.2264 19.2 11.7132 19.2 11.0802V1.14623ZM11.7659 2.44528H12.8326C13.4217 2.44528 13.8992 2.97078 13.8992 3.61902V11.0527C13.8992 11.7009 13.4217 12.2264 12.8326 12.2264H11.7659C11.1768 12.2264 10.6992 11.7009 10.6992 11.0527V3.61902C10.6992 2.97078 11.1768 2.44528 11.7659 2.44528ZM7.43411 5.09433H6.36745C5.77834 5.09433 5.30078 5.62652 5.30078 6.28301V11.0377C5.30078 11.6942 5.77834 12.2264 6.36745 12.2264H7.43411C8.02322 12.2264 8.50078 11.6942 8.50078 11.0377V6.28301C8.50078 5.62652 8.02322 5.09433 7.43411 5.09433ZM2.13333 7.53962H1.06667C0.477563 7.53962 0 8.06421 0 8.71132V11.0547C0 11.7018 0.477563 12.2264 1.06667 12.2264H2.13333C2.72244 12.2264 3.2 11.7018 3.2 11.0547V8.71132C3.2 8.06421 2.72244 7.53962 2.13333 7.53962Z" fill="black" />
        </svg>
        <svg className="w-[17px] h-[12px]" viewBox="0 0 17.1417 12.3283" fill="none">
          <path fillRule="evenodd" clipRule="evenodd" d="M8.5713 2.46628C11.0584 2.46639 13.4504 3.38847 15.2529 5.04195C15.3887 5.1696 15.6056 5.16799 15.7393 5.03834L17.0368 3.77487C17.1045 3.70911 17.1422 3.62004 17.1417 3.52735C17.1411 3.43467 17.1023 3.34603 17.0338 3.28104C12.3028 -1.09368 4.83907 -1.09368 0.108056 3.28104C0.039524 3.34598 0.000639766 3.4346 7.82398e-06 3.52728C-0.000624118 3.61996 0.0370483 3.70906 0.104689 3.77487L1.40255 5.03834C1.53615 5.16819 1.75327 5.1698 1.88893 5.04195C3.69167 3.38836 6.08395 2.46628 8.5713 2.46628ZM8.56795 6.68656C9.92527 6.68647 11.2341 7.19821 12.2403 8.12234C12.3763 8.2535 12.5907 8.25065 12.7234 8.11593L14.0106 6.79663C14.0784 6.72742 14.1161 6.63355 14.1151 6.53599C14.1141 6.43844 14.0746 6.34536 14.0054 6.27757C10.9416 3.38672 6.19688 3.38672 3.13305 6.27757C3.06384 6.34536 3.02435 6.43849 3.02345 6.53607C3.02254 6.63365 3.06028 6.72752 3.12822 6.79663L4.41513 8.11593C4.54778 8.25065 4.76215 8.2535 4.89823 8.12234C5.90368 7.19882 7.21152 6.68713 8.56795 6.68656ZM11.0924 9.48011C11.0943 9.58546 11.0572 9.68703 10.9899 9.76084L8.81327 12.2156C8.74946 12.2877 8.66247 12.3283 8.5717 12.3283C8.48093 12.3283 8.39394 12.3283 8.33013 12.2156L6.1531 9.76084C6.08585 9.68697 6.04886 9.58537 6.05085 9.48002C6.05284 9.37467 6.09365 9.27491 6.16364 9.20429C7.55374 7.8904 9.58966 7.8904 10.9798 9.20429C11.0497 9.27497 11.0904 9.37476 11.0924 9.48011Z" fill="black" />
        </svg>
        <svg className="w-[27px] h-[13px]" viewBox="0 0 27.328 13" fill="none">
          <rect x="0.5" y="0.5" width="24" height="12" rx="3.8" stroke="black" opacity="0.35" />
          <path d="M26 4.78113V8.8566C26.8047 8.51143 27.328 7.70847 27.328 6.81886C27.328 5.92926 26.8047 5.1263 26 4.78113" fill="black" opacity="0.4" />
          <rect x="2" y="2" width="21" height="9" rx="2.5" fill="black" />
        </svg>
      </div>
    </div>
  );
}
