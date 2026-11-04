import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Check, ClipboardCheck, HeartHandshake, LockKeyhole, ShieldCheck, UserRoundCheck } from 'lucide-react';
import OnboardingLayout from '../../onboarding/OnboardingLayout';

const reviewItems = [
  {
    title: 'What is Bodhi?',
    description: 'A meditation-led wellbeing app that helps young people focus, reset, and build healthy habits.',
    icon: HeartHandshake,
  },
  {
    title: 'What information do we collect?',
    description: 'Basic details such as name, age, class or grade, and app activity used to personalize the experience.',
    icon: ShieldCheck,
  },
  {
    title: 'How is it used?',
    description: 'To provide and improve Bodhi, personalize recommendations, send important updates, and help keep the account safe.',
    icon: LockKeyhole,
  },
  {
    title: 'Your rights as a guardian',
    description: 'You can withdraw consent or request deletion of the child’s account and associated information.',
    icon: UserRoundCheck,
  },
];

export default function ParentAccountApprovalScreen() {
  const navigate = useNavigate();
  const [hasConsented, setHasConsented] = useState(false);

  return (
    <OnboardingLayout totalSteps={5} currentStep={5} visualVariant="consent">
      <main
        className="relative -mx-6 h-full overflow-y-auto px-6 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        aria-labelledby="approval-title"
      >
        <div aria-hidden="true" className="pointer-events-none absolute -right-24 top-0 h-64 w-64 rounded-full bg-white/50 blur-[70px]" />
        <div aria-hidden="true" className="pointer-events-none absolute -left-28 top-[420px] h-60 w-60 rounded-full bg-[#DDEBFF]/30 blur-[80px]" />

        <div className="relative flex flex-col items-center text-center">
          <div className="relative mb-4 flex h-[88px] w-[88px] items-center justify-center rounded-[28px] border border-white/90 bg-gradient-to-br from-white to-[#E5E3FF] shadow-[0_20px_45px_rgba(79,70,229,0.18),inset_0_1px_0_white]">
            <ClipboardCheck className="h-11 w-11 text-[#6255E7]" strokeWidth={1.65} />
            <span className="absolute -right-2 -top-2 flex h-9 w-9 items-center justify-center rounded-[14px] border-2 border-white bg-gradient-to-br from-[#7B6DF1] to-[#4F46D8] shadow-lg shadow-indigo-500/25">
              <ShieldCheck className="h-[19px] w-[19px] text-white" strokeWidth={2.2} />
            </span>
          </div>

          <h1 id="approval-title" className="max-w-[330px] text-[30px] font-bold leading-[1.12] tracking-[-0.025em] text-[#171728]">
            Approve this Bodhi account
          </h1>
          <p className="mt-3 max-w-[340px] text-[14px] leading-[1.55] text-[#68687B]">
            Please review how Bodhi supports your child and uses their information before giving consent.
          </p>
        </div>

        <section
          aria-label="Account and privacy summary"
          className="relative mt-6 overflow-hidden rounded-[26px] border border-[#EBECF3] bg-white/90 px-4 shadow-[0_14px_34px_rgba(70,64,120,0.07),inset_0_1px_0_white] backdrop-blur-xl"
        >
          {reviewItems.map(({ title, description, icon: Icon }, index) => (
            <article key={title} className={`flex gap-3 py-4 ${index > 0 ? 'border-t border-[#ECECF3]' : ''}`}>
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[16px] border border-white bg-gradient-to-br from-[#F5F3FF] to-[#E4E2FF] shadow-[0_7px_16px_rgba(91,79,219,0.12)]">
                <Icon className="h-[21px] w-[21px] text-[#5B4FDB]" strokeWidth={1.8} />
              </span>
              <div className="pt-0.5">
                <h2 className="text-[14px] font-bold leading-5 text-[#29293B]">{title}</h2>
                <p className="mt-1 text-[12px] leading-[1.55] text-[#656579]">{description}</p>
              </div>
            </article>
          ))}
        </section>

        <p className="relative mt-4 text-center text-[12px] leading-5 text-[#6B6B7E]">
          Read our{' '}
          <button type="button" className="min-h-8 cursor-pointer rounded px-1 font-semibold text-[#5549CF] underline decoration-[#5549CF]/30 underline-offset-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5B4FDB]">
            Privacy Policy
          </button>{' '}
          and{' '}
          <button type="button" className="min-h-8 cursor-pointer rounded px-1 font-semibold text-[#5549CF] underline decoration-[#5549CF]/30 underline-offset-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5B4FDB]">
            Terms of Service
          </button>
          .
        </p>

        <label className="relative mt-4 flex cursor-pointer items-start gap-3 rounded-[26px] border border-[#EBECF3] bg-white/90 p-4 shadow-[0_14px_34px_rgba(70,64,120,0.07),inset_0_1px_0_white] backdrop-blur-xl transition-colors hover:bg-white">
          <input
            type="checkbox"
            checked={hasConsented}
            onChange={(event) => setHasConsented(event.target.checked)}
            className="peer sr-only"
          />
          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-[9px] border-[1.5px] border-[#B9B5E8] bg-white text-transparent shadow-sm transition-all peer-checked:border-[#5B4FDB] peer-checked:bg-gradient-to-br peer-checked:from-[#6F61E9] peer-checked:to-[#4F46D8] peer-checked:text-white peer-focus-visible:ring-2 peer-focus-visible:ring-[#5B4FDB] peer-focus-visible:ring-offset-2">
            <Check className="h-4 w-4" strokeWidth={3} />
          </span>
          <span className="text-[13px] leading-[1.55] text-[#4F4F62]">
            I confirm that I am the parent or legal guardian, I am 18 years or older, and I consent to this child using Bodhi.
          </span>
        </label>

        <button
          type="button"
          disabled={!hasConsented}
          onClick={() => navigate('/questionnaire/parent-success')}
          className="relative mt-5 min-h-[62px] w-full cursor-pointer overflow-hidden rounded-[32px] border border-white/20 bg-gradient-to-r from-[#5C4FDB] via-[#7164ED] to-[#5A50E6] text-[17px] font-bold text-white shadow-[0_16px_32px_rgba(79,70,229,0.32),inset_0_1px_0_rgba(255,255,255,0.35)] transition-all duration-200 before:absolute before:inset-x-8 before:top-0 before:h-px before:bg-gradient-to-r before:from-transparent before:via-white/70 before:to-transparent hover:brightness-105 disabled:cursor-not-allowed disabled:opacity-45 disabled:shadow-none active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5B4FDB] focus-visible:ring-offset-2"
        >
          <span className="relative">Approve &amp; continue →</span>
        </button>

        <div className="relative mb-2 mt-3 flex items-center justify-center gap-1.5 text-[11px] text-[#737388]">
          <LockKeyhole className="h-3.5 w-3.5 text-[#5B4FDB]" strokeWidth={2} />
          Your consent and information are kept secure.
        </div>
      </main>
    </OnboardingLayout>
  );
}
