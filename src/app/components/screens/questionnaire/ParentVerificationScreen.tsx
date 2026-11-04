import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { Check, Clock3, LockKeyhole, Pencil, RefreshCw, ShieldCheck, UsersRound } from 'lucide-react';
import OnboardingLayout from '../../onboarding/OnboardingLayout';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '../../ui/input-otp';

type VerificationState = {
  contact?: string;
  method?: 'phone' | 'email';
};

const CODE_LIFETIME = 165;
const RESEND_DELAY = 45;

function formatTime(seconds: number) {
  const minutes = Math.floor(seconds / 60);
  return `${minutes}:${String(seconds % 60).padStart(2, '0')}`;
}

export default function ParentVerificationScreen() {
  const navigate = useNavigate();
  const location = useLocation();
  const { contact = '', method = 'phone' } = (location.state || {}) as VerificationState;
  const [code, setCode] = useState('');
  const [expiresIn, setExpiresIn] = useState(CODE_LIFETIME);
  const [resendIn, setResendIn] = useState(RESEND_DELAY);
  const [error, setError] = useState('');
  const [announcement, setAnnouncement] = useState('');

  useEffect(() => {
    const timer = window.setInterval(() => {
      setExpiresIn((value) => Math.max(0, value - 1));
      setResendIn((value) => Math.max(0, value - 1));
    }, 1000);
    return () => window.clearInterval(timer);
  }, []);

  const contactLabel = contact || `your parent or guardian’s ${method === 'email' ? 'email' : 'mobile'}`;

  const handleVerify = () => {
    if (expiresIn === 0) {
      setError('This code has expired. Request a new code to continue.');
      return;
    }
    if (code.length !== 6) {
      setError('Enter the complete 6-digit verification code.');
      return;
    }

    setError('');
    navigate('/questionnaire/parent-approval');
  };

  const handleResend = () => {
    if (resendIn > 0) return;
    setCode('');
    setError('');
    setExpiresIn(CODE_LIFETIME);
    setResendIn(RESEND_DELAY);
    setAnnouncement(`A new verification code was sent to ${contactLabel}.`);
  };

  return (
    <OnboardingLayout totalSteps={4} currentStep={4} visualVariant="consent">
      <main className="relative flex h-full flex-col" aria-labelledby="verification-title">
        <div aria-hidden="true" className="pointer-events-none absolute -right-24 -top-28 h-64 w-64 rounded-full bg-white/55 blur-[70px]" />
        <div aria-hidden="true" className="pointer-events-none absolute -left-28 top-44 h-60 w-60 rounded-full bg-[#DDEBFF]/30 blur-[80px]" />

        <div className="relative flex flex-col items-center text-center">
          <div className="relative mb-4 flex h-[88px] w-[88px] items-center justify-center rounded-full border border-white/90 bg-gradient-to-br from-white/95 to-[#E6E4FF]/80 shadow-[0_18px_45px_rgba(79,70,229,0.18),inset_0_1px_0_white]">
            <div className="absolute inset-2 rounded-full border border-[#D8D4FF]/70" />
            <ShieldCheck className="h-11 w-11 text-[#6255E7]" strokeWidth={1.7} />
            <span className="absolute -bottom-1 -right-1 flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-gradient-to-br from-[#786AF0] to-[#5046D8] shadow-lg">
              <LockKeyhole className="h-4 w-4 text-white" strokeWidth={2.2} />
            </span>
          </div>

          <h1 id="verification-title" className="max-w-[340px] text-[30px] font-bold leading-[1.12] tracking-[-0.025em] text-[#171728]">
            Enter the code sent to your parent
          </h1>
          <p className="mt-2 text-[14px] leading-5 text-[#69697C]">We sent a 6-digit verification code to</p>
          <button
            type="button"
            onClick={() => navigate('/questionnaire/parent-consent')}
            className="mt-1 inline-flex min-h-8 cursor-pointer items-center gap-1.5 rounded-full px-2 text-[15px] font-bold text-[#5549CF] transition-colors hover:bg-white/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5B4FDB]"
            aria-label={`Change parent contact, currently ${contactLabel}`}
          >
            <span className="max-w-[285px] truncate">{contactLabel}</span>
            <Pencil className="h-3.5 w-3.5" />
          </button>
        </div>

        <div className="relative mt-5">
          <InputOTP
            maxLength={6}
            value={code}
            onChange={(value) => {
              setCode(value.replace(/\D/g, ''));
              if (error) setError('');
            }}
            aria-label="Six-digit parent verification code"
          >
            <InputOTPGroup className="grid w-full grid-cols-6 gap-2">
              {[0, 1, 2, 3, 4, 5].map((index) => (
                <InputOTPSlot
                  key={index}
                  index={index}
                  className="h-[56px] w-full rounded-[17px] border border-[#E7E8F0] bg-white text-[21px] font-bold text-[#28283A] shadow-[0_5px_15px_rgba(70,64,120,0.05)] transition-all first:rounded-[17px] last:rounded-[17px] data-[active=true]:border-[#5B4FDB] data-[active=true]:bg-white data-[active=true]:ring-2 data-[active=true]:ring-[#159BD7]/10"
                />
              ))}
            </InputOTPGroup>
          </InputOTP>
          <div className="mt-2 min-h-5 text-center">
            {error ? <p role="alert" className="text-[12px] font-medium text-red-600">{error}</p> : null}
          </div>
        </div>

        <div className="relative mt-2 rounded-[26px] border border-[#EBECF3] bg-white/90 p-4 shadow-[0_14px_34px_rgba(70,64,120,0.07),inset_0_1px_0_white] backdrop-blur-xl">
          <div className="flex items-start gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#7769EF] to-[#5147D8] shadow-md shadow-indigo-500/20">
              <UsersRound className="h-5 w-5 text-white" />
            </span>
            <p className="pt-0.5 text-[13px] leading-5 text-[#5F5F73]">
              <strong className="font-semibold text-[#303043]">Ask your parent or guardian</strong> to enter the code sent to their {method === 'email' ? 'email' : 'phone'}.
            </p>
          </div>
          <div className="mt-3 flex items-center justify-between border-t border-[#E6E6F0] pt-3">
            <div className="flex items-center gap-2 text-[12px] text-[#6D6D80]">
              <Clock3 className="h-4 w-4 text-[#5B4FDB]" />
              Code expires in <strong className="font-semibold text-[#5146C9]">{formatTime(expiresIn)}</strong>
            </div>
            <button
              type="button"
              onClick={handleResend}
              disabled={resendIn > 0}
              className="inline-flex min-h-8 cursor-pointer items-center gap-1.5 rounded-full px-2 text-[12px] font-semibold text-[#5549CF] transition-colors hover:bg-[#5B4FDB]/5 disabled:cursor-not-allowed disabled:text-[#9999AA] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5B4FDB]"
            >
              <RefreshCw className="h-3.5 w-3.5" />
              {resendIn > 0 ? `Resend in 0:${String(resendIn).padStart(2, '0')}` : 'Resend code'}
            </button>
          </div>
        </div>

        <div className="relative mt-auto pt-5">
          <button
            type="button"
            onClick={handleVerify}
            disabled={code.length !== 6 || expiresIn === 0}
            className="relative min-h-[62px] w-full cursor-pointer overflow-hidden rounded-[32px] border border-white/20 bg-gradient-to-r from-[#5C4FDB] via-[#7164ED] to-[#5A50E6] text-[17px] font-bold text-white shadow-[0_16px_32px_rgba(79,70,229,0.32),inset_0_1px_0_rgba(255,255,255,0.35)] transition-all duration-200 before:absolute before:inset-x-8 before:top-0 before:h-px before:bg-gradient-to-r before:from-transparent before:via-white/70 before:to-transparent hover:brightness-105 disabled:cursor-not-allowed disabled:opacity-45 disabled:shadow-none active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5B4FDB] focus-visible:ring-offset-2"
          >
            <span className="relative">Verify &amp; continue →</span>
          </button>
          <div className="mt-3 flex items-center justify-center gap-1.5 text-[11px] text-[#737388]">
            <Check className="h-3.5 w-3.5 text-[#5B4FDB]" strokeWidth={2.5} />
            Your information is kept secure.
          </div>
        </div>

        <p className="sr-only" aria-live="polite">{announcement}</p>
      </main>
    </OnboardingLayout>
  );
}
