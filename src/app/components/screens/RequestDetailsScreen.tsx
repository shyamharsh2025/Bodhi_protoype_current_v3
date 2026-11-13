import {
  ArrowLeft,
  Bug,
  Check,
  Clock3,
  CreditCard,
  FileText,
  LifeBuoy,
  MessageSquareText,
  Paperclip,
  ShieldCheck,
} from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import { type ComponentType, useMemo, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router';
import { SubscriptionStatusBar } from './SubscriptionScreen';

type RequestStatus = 'In review' | 'Resolved' | 'Closed';

type RequestSummary = {
  requestId: string;
  category: string;
  dateLabel?: string;
  status: RequestStatus;
};

type StoredRequest = {
  requestId?: string;
  category?: string;
  submittedAt?: string;
  description?: string;
  attachmentName?: string;
};

type RequestDetails = RequestSummary & {
  submittedLabel: string;
  outcomeLabel?: string;
  message: string;
  attachmentName?: string;
  supportUpdate: string;
};

const supportRequestsKey = 'bodhi-support-requests';

const referenceDetails: Record<string, RequestDetails> = {
  'BOD-1042': {
    requestId: 'BOD-1042',
    category: 'Payment & Subscription',
    status: 'In review',
    submittedLabel: 'Submitted 2 days ago',
    message: 'I need help confirming the subscription charge and the plan linked to my account.',
    supportUpdate: 'Our support team is reviewing the payment details. We’ll notify you as soon as there is an update.',
  },
  'BOD-0988': {
    requestId: 'BOD-0988',
    category: 'Bug / Technical Issue',
    status: 'Resolved',
    submittedLabel: 'Submitted on Aug 10, 2026',
    outcomeLabel: 'Resolved on Aug 12, 2026',
    message: 'The app was freezing when I tried to start a Focus Sprint after selecting a duration. It happened twice and the session did not begin.',
    attachmentName: 'focus-sprint-screenshot.png',
    supportUpdate: 'We investigated the issue and released a fix in the latest app version. Please update the app and try again.',
  },
  'BOD-0912': {
    requestId: 'BOD-0912',
    category: 'Privacy & Data',
    status: 'Closed',
    submittedLabel: 'Submitted on Jul 25, 2026',
    outcomeLabel: 'Closed on Jul 28, 2026',
    message: 'I wanted to understand which profile information is visible to my school and how I can manage it.',
    supportUpdate: 'We shared the relevant privacy controls and data visibility information. This request is now closed.',
  },
};

const statusStyles: Record<RequestStatus, { background: string; color: string; Icon: typeof Check }> = {
  'In review': { background: 'bg-[#FFF2DA]', color: 'text-[#B96300]', Icon: Clock3 },
  Resolved: { background: 'bg-[#E3F9EC]', color: 'text-[#137A50]', Icon: Check },
  Closed: { background: 'bg-[#EFF1F7]', color: 'text-[#667392]', Icon: Check },
};

function iconForCategory(category: string): ComponentType<{ className?: string; strokeWidth?: number }> {
  if (/payment|subscription/i.test(category)) return CreditCard;
  if (/bug|technical/i.test(category)) return Bug;
  if (/privacy|data/i.test(category)) return ShieldCheck;
  return LifeBuoy;
}

function loadStoredRequest(requestId: string): StoredRequest | undefined {
  try {
    const parsed = JSON.parse(window.localStorage.getItem(supportRequestsKey) ?? '[]') as StoredRequest[];
    return Array.isArray(parsed) ? parsed.find((request) => request.requestId === requestId) : undefined;
  } catch {
    return undefined;
  }
}

function formatSubmittedAt(value?: string) {
  if (!value) return 'Submitted recently';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return 'Submitted recently';
  return `Submitted on ${new Intl.DateTimeFormat('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }).format(date)}`;
}

export default function RequestDetailsScreen() {
  const navigate = useNavigate();
  const location = useLocation();
  const { requestId = 'BOD-0988' } = useParams();
  const shouldReduceMotion = useReducedMotion();
  const routeRequest = (location.state as { request?: RequestSummary } | null)?.request;
  const [feedback, setFeedback] = useState('');

  const details = useMemo<RequestDetails>(() => {
    const stored = loadStoredRequest(requestId);
    if (stored?.requestId && stored.category) {
      return {
        requestId: stored.requestId,
        category: stored.category,
        status: 'In review',
        submittedLabel: formatSubmittedAt(stored.submittedAt),
        message: stored.description || 'Your support request has been received and is being reviewed.',
        attachmentName: stored.attachmentName,
        supportUpdate: 'Your request is with Bodhi Support. We’ll notify you when the team shares an update.',
      };
    }

    return referenceDetails[requestId] ?? {
      requestId,
      category: routeRequest?.category ?? 'General Help',
      status: routeRequest?.status ?? 'In review',
      submittedLabel: routeRequest?.dateLabel ?? 'Submitted recently',
      message: 'Your request has been received by Bodhi Support.',
      supportUpdate: 'We’re reviewing the request and will share an update soon.',
    };
  }, [requestId, routeRequest]);

  const CategoryIcon = iconForCategory(details.category);
  const status = statusStyles[details.status];
  const StatusIcon = status.Icon;
  const primaryLabel = details.status === 'In review' ? 'Add an update' : details.status === 'Resolved' ? 'Issue happened again' : 'Reopen request';

  const enter = (delay = 0) => ({
    initial: shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 9 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: shouldReduceMotion ? 0.1 : 0.3, delay: shouldReduceMotion ? 0 : delay, ease: 'easeOut' as const },
  });

  return (
    <div className="relative mx-auto min-h-dvh w-full max-w-md overflow-hidden bg-[#F8F8FF] text-[#15172C]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_78%_3%,rgba(219,224,255,0.9)_0%,rgba(246,246,255,0.95)_40%,rgba(255,255,255,0.99)_82%)]" />
      <div className="pointer-events-none absolute -left-28 top-[470px] h-80 w-80 rounded-full bg-[#DDE3FF]/40 blur-[86px]" />

      <div className="relative z-10 pb-[max(28px,env(safe-area-inset-bottom))]">
        <SubscriptionStatusBar />

        <header className="px-4 pb-6 pt-3 sm:px-5">
          <div className="grid grid-cols-[48px_minmax(0,1fr)_48px] items-center">
            <button
              type="button"
              aria-label="Back to previous requests"
              onClick={() => navigate(-1)}
              className="flex h-12 w-12 touch-manipulation items-center justify-center rounded-full border border-white/90 bg-white/82 text-[#5840D4] shadow-[0_10px_26px_rgba(72,61,160,0.11)] backdrop-blur-xl transition duration-200 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5840D4] focus-visible:ring-offset-2"
            >
              <ArrowLeft className="h-6 w-6" strokeWidth={2.35} />
            </button>
            <motion.h1 {...enter()} className="px-2 text-center text-[25px] font-extrabold leading-8 tracking-[-0.6px] text-[#12162D]">
              Request Details
            </motion.h1>
            <span aria-hidden="true" />
          </div>
          <motion.p {...enter(0.03)} className="mx-auto mt-3 max-w-[310px] text-center text-[14px] font-semibold leading-5 text-[#777D9A]">
            Review your earlier support request.
          </motion.p>
        </header>

        <main className="space-y-4 px-4 sm:px-5">
          <motion.section {...enter(0.05)} aria-labelledby="request-summary" className="rounded-[26px] border border-white/95 bg-white/80 p-5 shadow-[0_16px_38px_rgba(72,65,145,0.09),inset_0_1px_0_rgba(255,255,255,0.98)] backdrop-blur-2xl">
            <div className="flex items-start gap-3.5">
              <span className="flex h-[54px] w-[54px] shrink-0 items-center justify-center rounded-full bg-[#EEE9FF] text-[#6243E0]">
                <CategoryIcon className="h-[26px] w-[26px]" strokeWidth={2.05} />
              </span>
              <div className="min-w-0 flex-1">
                <h2 id="request-summary" className="text-[19px] font-extrabold leading-6 tracking-[-0.25px] text-[#141831]">#{details.requestId}</h2>
                <p className="mt-1 text-[15px] font-semibold leading-5 text-[#252942]">{details.category}</p>
              </div>
              <span className={`flex min-h-[40px] shrink-0 items-center gap-1.5 rounded-full px-3 ${status.background} ${status.color}`}>
                <StatusIcon className="h-[18px] w-[18px]" strokeWidth={2.35} />
                <span className="whitespace-nowrap text-[12px] font-extrabold">{details.status}</span>
              </span>
            </div>
            <div className="mt-4 border-t border-[#E8E6F2] pt-3 text-[13px] font-medium leading-5 text-[#78809F]">
              <p>{details.submittedLabel}</p>
              {details.outcomeLabel && <p className="mt-1">{details.outcomeLabel}</p>}
            </div>
          </motion.section>

          <motion.section {...enter(0.08)} aria-labelledby="original-message" className="rounded-[24px] border border-white/95 bg-white/80 p-5 shadow-[0_14px_34px_rgba(72,65,145,0.08)] backdrop-blur-2xl">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#EEE9FF] text-[#6243E0]">
                <FileText className="h-5 w-5" strokeWidth={2.1} />
              </span>
              <h2 id="original-message" className="text-[17px] font-extrabold text-[#171B35]">Original message</h2>
            </div>
            <p className="mt-3 rounded-[17px] bg-[#F4F3FC]/88 px-4 py-3.5 text-[14px] font-medium leading-[21px] text-[#626B91]">{details.message}</p>
          </motion.section>

          {details.attachmentName && (
            <motion.section {...enter(0.1)} aria-labelledby="request-attachment" className="rounded-[24px] border border-white/95 bg-white/80 p-5 shadow-[0_14px_34px_rgba(72,65,145,0.08)] backdrop-blur-2xl">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#EEE9FF] text-[#6243E0]">
                  <Paperclip className="h-5 w-5" strokeWidth={2.1} />
                </span>
                <div className="min-w-0">
                  <h2 id="request-attachment" className="text-[17px] font-extrabold text-[#171B35]">Attachment</h2>
                  <p className="mt-0.5 truncate text-[12px] font-semibold text-[#777F9D]">{details.attachmentName}</p>
                </div>
              </div>
            </motion.section>
          )}

          <motion.section {...enter(0.12)} aria-labelledby="support-update" className="rounded-[24px] border border-white/95 bg-white/80 p-5 shadow-[0_14px_34px_rgba(72,65,145,0.08)] backdrop-blur-2xl">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#EEE9FF] text-[#6243E0]">
                <MessageSquareText className="h-5 w-5" strokeWidth={2.1} />
              </span>
              <h2 id="support-update" className="text-[17px] font-extrabold text-[#171B35]">Support update</h2>
            </div>
            <p className="mt-3 rounded-[17px] bg-[#F4F3FC]/88 px-4 py-3.5 text-[14px] font-medium leading-[21px] text-[#626B91]">{details.supportUpdate}</p>
          </motion.section>

          <motion.div {...enter(0.14)}>
            <button
              type="button"
              onClick={() => setFeedback(details.status === 'In review' ? 'Your update option is ready.' : 'Bodhi Support has been notified for follow-up.')}
              className="flex min-h-[56px] w-full touch-manipulation items-center justify-center rounded-[19px] bg-[linear-gradient(100deg,#5B32E7_0%,#7040EF_52%,#6331E7_100%)] px-6 text-[16px] font-extrabold text-white shadow-[0_14px_28px_rgba(91,50,231,0.24)] transition duration-200 active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5840D4] focus-visible:ring-offset-2"
            >
              {primaryLabel}
            </button>
            <p aria-live="polite" className={`min-h-6 px-3 pt-2 text-center text-[12px] font-semibold leading-5 text-[#5E42D8] transition-opacity ${feedback ? 'opacity-100' : 'opacity-0'}`}>
              {feedback || 'Action confirmation'}
            </p>
          </motion.div>
        </main>
      </div>
    </div>
  );
}
