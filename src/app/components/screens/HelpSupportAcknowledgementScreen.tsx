import { ArrowLeft, Check, CheckCheck, Copy } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { SubscriptionStatusBar } from './SubscriptionScreen';

type AcknowledgementState = {
  requestId?: string;
  submitted?: boolean;
  category?: string;
};

const lastSupportRequestKey = 'bodhi-last-support-request-id';

function getFallbackRequestId() {
  try {
    return window.localStorage.getItem(lastSupportRequestKey) ?? 'BOD-1042';
  } catch {
    return 'BOD-1042';
  }
}

async function copyToClipboard(value: string) {
  if (navigator.clipboard?.writeText) {
    try {
      await navigator.clipboard.writeText(value);
      return;
    } catch {
      // Fall through to the DOM-based copy fallback when permission is unavailable.
    }
  }

  const input = document.createElement('textarea');
  input.value = value;
  input.style.position = 'fixed';
  input.style.opacity = '0';
  document.body.appendChild(input);
  input.select();
  document.execCommand('copy');
  document.body.removeChild(input);
}

export default function HelpSupportAcknowledgementScreen() {
  const navigate = useNavigate();
  const location = useLocation();
  const shouldReduceMotion = useReducedMotion();
  const locationState = location.state as AcknowledgementState | null;
  const [requestId] = useState(() => locationState?.requestId ?? getFallbackRequestId());
  const [copied, setCopied] = useState(false);
  const copyTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(
    () => () => {
      if (copyTimerRef.current) clearTimeout(copyTimerRef.current);
    },
    [],
  );

  const leaveAcknowledgement = () => {
    if (locationState?.submitted) {
      navigate(-1);
      return;
    }

    navigate('/home/profile', { replace: true });
  };

  const handleCopy = async () => {
    try {
      await copyToClipboard(`#${requestId}`);
      setCopied(true);
      if (copyTimerRef.current) clearTimeout(copyTimerRef.current);
      copyTimerRef.current = setTimeout(() => setCopied(false), 2200);
    } catch {
      setCopied(false);
    }
  };

  const enter = (delay = 0) => ({
    initial: shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    transition: {
      duration: shouldReduceMotion ? 0.1 : 0.32,
      delay: shouldReduceMotion ? 0 : delay,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  });

  return (
    <div className="relative mx-auto flex min-h-dvh w-full max-w-md flex-col overflow-hidden bg-[#F8F8FF] text-[#15172C]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_78%_2%,rgba(221,226,255,0.90)_0%,rgba(247,247,255,0.95)_39%,rgba(255,255,255,0.99)_78%)]" />
      <div className="pointer-events-none absolute -left-28 top-[380px] h-80 w-80 rounded-full bg-[#D9DEFF]/34 blur-[82px]" />
      <div className="pointer-events-none absolute -right-32 bottom-[-80px] h-80 w-80 rounded-full bg-[#E8DBFF]/32 blur-[84px]" />

      <div className="relative z-10 flex min-h-dvh flex-col pb-[max(24px,env(safe-area-inset-bottom))]">
        <SubscriptionStatusBar />

        <header className="relative px-5 pb-7 pt-2 text-center">
          <button
            type="button"
            aria-label="Back to profile"
            onClick={leaveAcknowledgement}
            className="absolute left-5 top-2 flex h-12 w-12 touch-manipulation items-center justify-center rounded-full border border-white/90 bg-white/82 text-[#5840D4] shadow-[0_10px_26px_rgba(72,61,160,0.11)] backdrop-blur-xl transition duration-200 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5840D4] focus-visible:ring-offset-2"
          >
            <ArrowLeft className="h-6 w-6" strokeWidth={2.35} />
          </button>

          <motion.h1
            className="pt-[86px] text-[30px] font-extrabold leading-[36px] tracking-[-0.7px] text-[#12162D]"
            {...enter()}
          >
            Help &amp; Support
          </motion.h1>
        </header>

        <main className="flex flex-1 flex-col px-4 sm:px-5">
          <motion.section
            aria-labelledby="support-acknowledgement-title"
            className="rounded-[28px] border border-white/95 bg-white/78 px-6 py-8 text-center shadow-[0_22px_52px_rgba(72,65,145,0.11),inset_0_1px_0_rgba(255,255,255,0.98)] backdrop-blur-2xl"
            {...enter(0.05)}
          >
            <div className="mx-auto flex h-[104px] w-[104px] items-center justify-center rounded-full bg-[radial-gradient(circle,rgba(229,224,255,0.98)_0%,rgba(235,232,255,0.86)_58%,rgba(246,245,255,0.58)_59%,rgba(250,249,255,0.22)_76%)] shadow-[0_14px_30px_rgba(91,62,214,0.10)]">
              <span className="flex h-[72px] w-[72px] items-center justify-center rounded-full bg-[linear-gradient(145deg,#EEE9FF,#DED7FF)] text-[#5C37E1] shadow-[inset_0_1px_0_rgba(255,255,255,0.95)]">
                <Check className="h-10 w-10" strokeWidth={3.4} aria-hidden="true" />
              </span>
            </div>

            <h2 id="support-acknowledgement-title" className="mt-7 text-[31px] font-extrabold leading-[38px] tracking-[-0.8px] text-[#10142C]">
              We’ve got it
            </h2>
            <p className="mx-auto mt-3 max-w-[330px] text-[16px] font-medium leading-6 text-[#727897]">
              Your request has been sent to Bodhi Support. We’ll get back to you on your registered email.
            </p>

            <div className="mt-7 flex min-h-[82px] items-center gap-3 rounded-[20px] border border-[#D7D2F1] bg-[linear-gradient(120deg,rgba(249,248,255,0.96),rgba(241,241,255,0.85))] px-4 text-left shadow-[inset_0_1px_0_white]">
              <div className="min-w-0 flex-1">
                <p className="text-[13px] font-semibold leading-5 text-[#777D9D]">Request ID</p>
                <p className="mt-0.5 truncate text-[21px] font-extrabold leading-7 tracking-[-0.35px] text-[#141831]">
                  #{requestId}
                </p>
              </div>
              <button
                type="button"
                aria-label={copied ? 'Request ID copied' : 'Copy request ID'}
                onClick={handleCopy}
                className="flex h-12 w-12 shrink-0 touch-manipulation items-center justify-center rounded-full text-[#6446DC] transition duration-200 active:bg-white/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6549DD]"
              >
                {copied ? <CheckCheck className="h-6 w-6" strokeWidth={2.4} /> : <Copy className="h-6 w-6" strokeWidth={2.2} />}
              </button>
            </div>

            <p className="mt-5 text-[13px] font-medium leading-5 text-[#777D99]">
              Keep this handy if you need to follow up.
            </p>
            <p aria-live="polite" className="sr-only">
              {copied ? 'Request ID copied to clipboard.' : ''}
            </p>
          </motion.section>

          <motion.div className="mt-auto pt-8" {...enter(0.1)}>
            <button
              type="button"
              onClick={leaveAcknowledgement}
              className="flex min-h-[58px] w-full touch-manipulation items-center justify-center rounded-[20px] bg-[linear-gradient(100deg,#5B32E7_0%,#6D36E8_50%,#5931DF_100%)] px-6 text-[17px] font-extrabold text-white shadow-[0_14px_28px_rgba(91,50,231,0.24)] transition duration-200 active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5840D4] focus-visible:ring-offset-2"
            >
              Done
            </button>
          </motion.div>
        </main>
      </div>
    </div>
  );
}
