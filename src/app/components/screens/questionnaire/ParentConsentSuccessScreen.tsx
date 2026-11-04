import { useNavigate } from 'react-router';
import { Check, ShieldCheck, Sparkles } from 'lucide-react';
import OnboardingLayout from '../../onboarding/OnboardingLayout';

const celebrationDots = [
  'left-[8%] top-[20%] h-2 w-2 bg-[#6D5FE8]',
  'left-[17%] top-[66%] h-1.5 w-1.5 bg-[#55C7D3]',
  'left-[25%] top-[8%] h-1 w-1 bg-[#5B4FDB]',
  'right-[17%] top-[23%] h-2.5 w-2.5 bg-[#58C9D3]',
  'right-[7%] top-[60%] h-2 w-2 bg-[#725FEA]',
  'right-[28%] bottom-[6%] h-1.5 w-1.5 bg-[#51BFD0]',
];

export default function ParentConsentSuccessScreen() {
  const navigate = useNavigate();

  return (
    <OnboardingLayout totalSteps={5} currentStep={5} visualVariant="consent">
      <main className="relative flex h-full flex-col items-center text-center" aria-labelledby="success-title">
        <div aria-hidden="true" className="pointer-events-none absolute -right-28 -top-24 h-72 w-72 rounded-full bg-white/55 blur-[75px]" />
        <div aria-hidden="true" className="pointer-events-none absolute -left-28 top-52 h-64 w-64 rounded-full bg-[#DDEBFF]/28 blur-[85px]" />

        <div className="relative mt-6 h-[154px] w-[154px]" aria-hidden="true">
          <div className="absolute inset-4 rounded-full border border-white bg-gradient-to-br from-white/95 to-[#EEF4FF]/90 shadow-[0_20px_48px_rgba(79,70,229,0.11),inset_0_1px_0_white]" />
          <div className="absolute inset-[38px] flex items-center justify-center rounded-full border border-white/50 bg-gradient-to-br from-[#13BDA7] via-[#18BFA0] to-[#82CC63] shadow-[0_14px_30px_rgba(24,170,139,0.28),inset_0_1px_0_rgba(255,255,255,0.5)]">
            <Check className="h-12 w-12 text-white" strokeWidth={3.2} />
          </div>
          {celebrationDots.map((className, index) => (
            <span key={index} className={`absolute rounded-full shadow-sm ${className}`} />
          ))}
          <Sparkles className="absolute left-2 top-[46%] h-4 w-4 text-[#6959E2]" />
          <Sparkles className="absolute right-1 top-[35%] h-3.5 w-3.5 text-[#5F55DF]" />
        </div>

        <div className="relative mt-6">
          <div className="mx-auto mb-3 inline-flex items-center gap-1.5 rounded-full border border-white/80 bg-white/55 px-3 py-1.5 text-[11px] font-bold tracking-[0.08em] text-[#5146C9] shadow-[0_8px_20px_rgba(79,70,229,0.08)] backdrop-blur-xl">
            <ShieldCheck className="h-3.5 w-3.5" />
            CONSENT VERIFIED
          </div>
          <h1 id="success-title" className="text-[34px] font-bold leading-tight tracking-[-0.03em] text-[#171728]">
            You’re all set!
          </h1>
          <p className="mx-auto mt-3 max-w-[330px] text-[15px] leading-[1.55] text-[#68687B]">
            Thanks for approving. Your child’s Bodhi journey is ready to begin.
          </p>
        </div>

        <section className="relative mt-7 flex w-full items-start gap-3 rounded-[26px] border border-[#EBECF3] bg-white/90 p-4 text-left shadow-[0_14px_34px_rgba(70,64,120,0.07),inset_0_1px_0_white] backdrop-blur-xl" aria-labelledby="next-step-title">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[16px] border border-white bg-gradient-to-br from-[#F5F3FF] to-[#E3E1FF] shadow-[0_7px_17px_rgba(91,79,219,0.13)]">
            <ShieldCheck className="h-[22px] w-[22px] text-[#5B4FDB]" strokeWidth={1.8} />
          </span>
          <div className="pt-0.5">
            <h2 id="next-step-title" className="text-[14px] font-bold text-[#29293B]">What happens next?</h2>
            <p className="mt-1 text-[13px] leading-[1.5] text-[#656579]">
              We’ll personalize the experience for your child with a few quick wellbeing questions.
            </p>
          </div>
        </section>

        <div className="relative mt-auto w-full pt-8">
          <button
            type="button"
            onClick={() => navigate('/questionnaire/behavior-1')}
            className="relative min-h-[62px] w-full cursor-pointer overflow-hidden rounded-[32px] border border-white/20 bg-gradient-to-r from-[#5C4FDB] via-[#7164ED] to-[#5A50E6] text-[17px] font-bold text-white shadow-[0_16px_32px_rgba(79,70,229,0.32),inset_0_1px_0_rgba(255,255,255,0.35)] transition-all duration-200 before:absolute before:inset-x-8 before:top-0 before:h-px before:bg-gradient-to-r before:from-transparent before:via-white/70 before:to-transparent hover:brightness-105 hover:shadow-[0_18px_36px_rgba(79,70,229,0.38)] active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5B4FDB] focus-visible:ring-offset-2"
          >
            <span className="relative">Continue →</span>
          </button>
          <button
            type="button"
            onClick={() => navigate('/questionnaire/parent-approval')}
            className="mt-2 min-h-11 cursor-pointer rounded-full px-5 text-[13px] font-semibold text-[#5549CF] transition-colors hover:bg-white/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5B4FDB]"
          >
            Go back
          </button>
        </div>
      </main>
    </OnboardingLayout>
  );
}
