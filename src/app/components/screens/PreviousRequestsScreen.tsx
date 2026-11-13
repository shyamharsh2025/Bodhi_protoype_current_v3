import {
  ArrowLeft,
  Bug,
  Check,
  ChevronRight,
  Clock3,
  CreditCard,
  FilePenLine,
  LifeBuoy,
  MessageSquareWarning,
  ShieldCheck,
} from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import { type ComponentType, useMemo } from 'react';
import { useNavigate } from 'react-router';
import { SubscriptionStatusBar } from './SubscriptionScreen';

type RequestStatus = 'In review' | 'Resolved' | 'Closed';

type RequestItem = {
  requestId: string;
  category: string;
  dateLabel: string;
  status: RequestStatus;
};

type StoredRequest = {
  requestId?: string;
  category?: string;
  submittedAt?: string;
};

const supportRequestsKey = 'bodhi-support-requests';

const referenceRequests: RequestItem[] = [
  { requestId: 'BOD-1042', category: 'Payment & Subscription', dateLabel: 'Submitted 2 days ago', status: 'In review' },
  { requestId: 'BOD-0988', category: 'Bug / Technical Issue', dateLabel: 'Resolved on Aug 12', status: 'Resolved' },
  { requestId: 'BOD-0912', category: 'Privacy & Data', dateLabel: 'Closed on Jul 28', status: 'Closed' },
];

const categoryIcons: Array<{ match: RegExp; icon: ComponentType<{ className?: string; strokeWidth?: number }> }> = [
  { match: /payment|subscription/i, icon: CreditCard },
  { match: /bug|technical/i, icon: Bug },
  { match: /privacy|data/i, icon: ShieldCheck },
  { match: /feedback|suggestion/i, icon: FilePenLine },
  { match: /complaint|grievance/i, icon: MessageSquareWarning },
  { match: /general|help/i, icon: LifeBuoy },
];

const statusStyles: Record<RequestStatus, { background: string; color: string; Icon: typeof Check }> = {
  'In review': { background: 'bg-[#FFF2DA]', color: 'text-[#C96C00]', Icon: Clock3 },
  Resolved: { background: 'bg-[#E3F9EC]', color: 'text-[#168958]', Icon: Check },
  Closed: { background: 'bg-[#EFF1F7]', color: 'text-[#7380A2]', Icon: Check },
};

function loadStoredRequests(): RequestItem[] {
  try {
    const parsed = JSON.parse(window.localStorage.getItem(supportRequestsKey) ?? '[]') as StoredRequest[];
    if (!Array.isArray(parsed)) return [];

    return parsed
      .filter((request) => request.requestId && request.category)
      .map((request) => ({
        requestId: request.requestId as string,
        category: request.category as string,
        dateLabel: formatSubmittedDate(request.submittedAt),
        status: 'In review' as const,
      }));
  } catch {
    return [];
  }
}

function formatSubmittedDate(value?: string) {
  if (!value) return 'Submitted recently';
  const submittedAt = new Date(value);
  if (Number.isNaN(submittedAt.getTime())) return 'Submitted recently';

  const elapsedMinutes = Math.max(0, Math.floor((Date.now() - submittedAt.getTime()) / 60000));
  if (elapsedMinutes < 1) return 'Submitted just now';
  if (elapsedMinutes < 60) return `Submitted ${elapsedMinutes} min ago`;
  const elapsedHours = Math.floor(elapsedMinutes / 60);
  if (elapsedHours < 24) return `Submitted ${elapsedHours} hr${elapsedHours === 1 ? '' : 's'} ago`;
  const elapsedDays = Math.floor(elapsedHours / 24);
  if (elapsedDays <= 7) return `Submitted ${elapsedDays} day${elapsedDays === 1 ? '' : 's'} ago`;
  return `Submitted on ${new Intl.DateTimeFormat('en-IN', { day: 'numeric', month: 'short' }).format(submittedAt)}`;
}

function iconForCategory(category: string) {
  return categoryIcons.find(({ match }) => match.test(category))?.icon ?? LifeBuoy;
}

export default function PreviousRequestsScreen() {
  const navigate = useNavigate();
  const shouldReduceMotion = useReducedMotion();
  const requests = useMemo(() => {
    const stored = loadStoredRequests();
    return [stored[0] ?? referenceRequests[0], referenceRequests[1], referenceRequests[2]];
  }, []);

  return (
    <div className="relative mx-auto min-h-dvh w-full max-w-md overflow-hidden bg-[#F8F8FF] text-[#15172C]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_78%_3%,rgba(219,224,255,0.9)_0%,rgba(246,246,255,0.95)_40%,rgba(255,255,255,0.99)_82%)]" />
      <div className="pointer-events-none absolute -left-32 top-[430px] h-80 w-80 rounded-full bg-[#DDE3FF]/42 blur-[86px]" />
      <div className="pointer-events-none absolute -right-32 top-[820px] h-80 w-80 rounded-full bg-[#E8DCFF]/38 blur-[88px]" />

      <div className="relative z-10 pb-10">
        <SubscriptionStatusBar />

        <header className="px-4 pb-7 pt-3 sm:px-5">
          <div className="grid grid-cols-[48px_minmax(0,1fr)_48px] items-center">
            <button
              type="button"
              aria-label="Back to help and support"
              onClick={() => navigate(-1)}
              className="flex h-12 w-12 touch-manipulation items-center justify-center rounded-full border border-white/90 bg-white/82 text-[#5840D4] shadow-[0_10px_26px_rgba(72,61,160,0.11)] backdrop-blur-xl transition duration-200 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5840D4] focus-visible:ring-offset-2"
            >
              <ArrowLeft className="h-6 w-6" strokeWidth={2.35} />
            </button>
            <motion.h1
              initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: shouldReduceMotion ? 0.1 : 0.28, ease: 'easeOut' }}
              className="px-1 text-center text-[25px] font-extrabold leading-8 tracking-[-0.6px] text-[#12162D]"
            >
              Previous Requests
            </motion.h1>
            <span aria-hidden="true" />
          </div>
          <motion.p
            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: shouldReduceMotion ? 0.1 : 0.28, delay: shouldReduceMotion ? 0 : 0.04, ease: 'easeOut' }}
            className="mx-auto mt-3 max-w-[320px] text-center text-[14px] font-semibold leading-5 text-[#777D9A]"
          >
            Track or revisit your earlier support tickets.
          </motion.p>
        </header>

        <main className="space-y-4 px-4 sm:px-5" aria-label="Support request history">
          {requests.map((request, index) => {
            const CategoryIcon = iconForCategory(request.category);
            const status = statusStyles[request.status];
            const StatusIcon = status.Icon;

            return (
              <motion.button
                type="button"
                key={request.requestId}
                aria-label={`Open request ${request.requestId}, ${request.category}, ${request.status}`}
                onClick={() =>
                  navigate(`/home/profile/help-support/requests/${request.requestId}`, {
                    state: { request },
                  })
                }
                initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: shouldReduceMotion ? 0.1 : 0.3, delay: shouldReduceMotion ? 0 : 0.04 + index * 0.045, ease: 'easeOut' }}
                className="flex min-h-[132px] w-full touch-manipulation items-center gap-3.5 rounded-[26px] border border-white/95 bg-white/80 px-4 py-4 text-left shadow-[0_16px_38px_rgba(72,65,145,0.09),inset_0_1px_0_rgba(255,255,255,0.98)] backdrop-blur-2xl transition duration-200 active:scale-[0.99] active:bg-white/92 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6549DD]"
              >
                <span className="flex h-[54px] w-[54px] shrink-0 items-center justify-center rounded-full bg-[#EEE9FF] text-[#6243E0] shadow-[inset_0_1px_0_rgba(255,255,255,0.96)]">
                  <CategoryIcon className="h-[26px] w-[26px]" strokeWidth={2.05} />
                </span>

                <div className="min-w-0 flex-1">
                  <p className="text-[17px] font-extrabold leading-6 tracking-[-0.2px] text-[#141831]">#{request.requestId}</p>
                  <p className="mt-0.5 text-[15px] font-semibold leading-5 text-[#252942]">{request.category}</p>
                  <p className="mt-1.5 text-[13px] font-medium leading-5 text-[#7C83A2]">{request.dateLabel}</p>
                </div>

                <div className="flex shrink-0 items-center gap-1.5">
                  <span className={`flex min-h-[42px] items-center gap-2 rounded-full px-3 ${status.background} ${status.color}`}>
                    <StatusIcon className="h-[19px] w-[19px]" strokeWidth={2.35} />
                    <span className="text-[12px] font-extrabold whitespace-nowrap">{request.status}</span>
                  </span>
                  <ChevronRight className="h-5 w-5 text-[#7C83A2]" strokeWidth={2.35} aria-hidden="true" />
                </div>
              </motion.button>
            );
          })}
        </main>
      </div>
    </div>
  );
}
