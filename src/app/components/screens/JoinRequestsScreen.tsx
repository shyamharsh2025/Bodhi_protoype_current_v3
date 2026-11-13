import {
  ArrowLeft,
  Check,
  CheckCircle2,
  Clock3,
  GraduationCap,
  UserRound,
  UsersRound,
  X,
} from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router';

type JoinRequest = {
  id: number;
  name: string;
  initials: string;
  requestedAt: string;
  tone: string;
};

const initialRequests: JoinRequest[] = [
  {
    id: 1,
    name: 'Aarav Mehta',
    initials: 'AM',
    requestedAt: '2 mins ago',
    tone: 'from-[#72BFFF] to-[#DDF4FF]',
  },
  {
    id: 2,
    name: 'Riya Shah',
    initials: 'RS',
    requestedAt: 'Today · 10:42 AM',
    tone: 'from-[#FF95B2] to-[#FFE0E8]',
  },
  {
    id: 3,
    name: 'Kabir Patel',
    initials: 'KP',
    requestedAt: 'Yesterday · 4:18 PM',
    tone: 'from-[#FFC36E] to-[#FFE7B9]',
  },
];

export default function JoinRequestsScreen() {
  const navigate = useNavigate();
  const [requests, setRequests] = useState(initialRequests);
  const [declineTarget, setDeclineTarget] = useState<JoinRequest | null>(null);
  const [feedback, setFeedback] = useState('');

  const resolveRequest = (request: JoinRequest, approved: boolean) => {
    setRequests((current) => current.filter((item) => item.id !== request.id));
    setFeedback(
      approved
        ? `${request.name} was approved to join Grade 8A.`
        : `${request.name}’s request was declined.`,
    );
    setDeclineTarget(null);
  };

  return (
    <div className="relative mx-auto min-h-dvh w-full max-w-md overflow-hidden bg-[#F4F5FF] text-[#17182E]">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_82%_2%,rgba(209,216,255,0.9)_0%,rgba(240,241,255,0.94)_35%,#F8F8FF_72%,#FFFFFF_100%)]" />
      <div className="pointer-events-none fixed -left-28 top-[460px] h-80 w-80 rounded-full bg-[#CFD8FF]/40 blur-[80px]" />

      <div className="relative z-10">
        <StatusBar />

        <header className="grid grid-cols-[56px_1fr_56px] items-center gap-2 px-5 pb-5 pt-3">
          <button
            aria-label="Go back to League"
            onClick={() => navigate(-1)}
            className="flex h-12 w-12 items-center justify-center rounded-full border border-white/90 bg-white/80 text-[#5A45D8] shadow-[0_10px_28px_rgba(84,75,187,0.10)] backdrop-blur-xl transition active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6752E4]"
          >
            <ArrowLeft className="h-6 w-6" strokeWidth={2.4} />
          </button>

          <div className="min-w-0 text-center">
            <h1 className="bg-gradient-to-r from-[#5842D4] to-[#7548E9] bg-clip-text text-[29px] font-extrabold leading-8 tracking-[-0.7px] text-transparent">
              Join Requests
            </h1>
            <p className="mt-1 text-[15px] font-bold leading-5 text-[#5E6070]">
              Grade 8A · {requests.length} pending
            </p>
          </div>

          <div className="flex h-12 w-12 items-center justify-center justify-self-end rounded-full bg-[linear-gradient(145deg,#7254E8,#5A35D4)] text-white shadow-[0_10px_24px_rgba(91,63,218,0.24)]">
            <UserRound className="h-6 w-6" strokeWidth={2.1} />
          </div>
        </header>

        <main className="px-5">
          <section className="flex items-start gap-3 rounded-[20px] border border-white/90 bg-white/72 px-4 py-4 shadow-[0_12px_28px_rgba(75,67,164,0.08)] backdrop-blur-2xl">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#ECE8FF] text-[#5D45D8]">
              <UsersRound className="h-5 w-5" strokeWidth={2.2} />
            </div>
            <div className="min-w-0 pt-0.5">
              <h2 className="text-[17px] font-extrabold leading-6 tracking-[-0.2px]">
                Review join requests
              </h2>
              <p className="mt-1 text-[12.5px] font-medium leading-5 text-[#626579]">
                Approve students you recognize before they enter Grade 8A.
              </p>
            </div>
          </section>

          {feedback && (
            <div
              role="status"
              className="mt-4 flex items-center gap-2 rounded-[16px] border border-white/90 bg-[#EAF8F2]/90 px-4 py-3 text-[12px] font-bold text-[#167358] shadow-sm backdrop-blur-xl"
            >
              <CheckCircle2 className="h-5 w-5 shrink-0" strokeWidth={2.3} />
              <span className="min-w-0 flex-1">{feedback}</span>
              <button
                aria-label="Dismiss message"
                onClick={() => setFeedback('')}
                className="flex h-8 w-8 items-center justify-center rounded-full active:bg-white/70"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          )}

          {requests.length ? (
            <section aria-label="Pending student requests" className="mt-4 space-y-4">
              {requests.map((request) => (
                <RequestCard
                  key={request.id}
                  request={request}
                  onApprove={() => resolveRequest(request, true)}
                  onDecline={() => setDeclineTarget(request)}
                />
              ))}
            </section>
          ) : (
            <EmptyRequests />
          )}
        </main>
      </div>

      {declineTarget && (
        <div className="fixed inset-0 z-[100] flex items-end justify-center">
          <button
            aria-label="Close decline confirmation"
            onClick={() => setDeclineTarget(null)}
            className="absolute inset-0 bg-[#171936]/40 backdrop-blur-[2px]"
          />
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="decline-title"
            className="relative z-10 w-full max-w-md rounded-t-[30px] border border-white/80 bg-white px-6 pb-[max(2rem,calc(env(safe-area-inset-bottom)+1.5rem))] pt-5 shadow-[0_-18px_44px_rgba(23,25,54,0.18)]"
          >
            <div className="mx-auto mb-5 h-1.5 w-12 rounded-full bg-[#DCD9E8]" />
            <h2 id="decline-title" className="text-[22px] font-extrabold">
              Decline this request?
            </h2>
            <p className="mt-2 text-[14px] font-medium leading-6 text-[#64687C]">
              {declineTarget.name} won’t be added to Grade 8A. They can request to join again later.
            </p>
            <div className="mt-6 grid grid-cols-2 gap-3">
              <button
                onClick={() => setDeclineTarget(null)}
                className="h-12 rounded-full border border-[#DDD9EE] bg-white text-[14px] font-bold text-[#5840D4] active:scale-[0.98]"
              >
                Keep request
              </button>
              <button
                onClick={() => resolveRequest(declineTarget, false)}
                className="h-12 rounded-full bg-[#C65339] text-[14px] font-bold text-white shadow-[0_10px_22px_rgba(198,83,57,0.20)] active:scale-[0.98]"
              >
                Decline
              </button>
            </div>
          </section>
        </div>
      )}
    </div>
  );
}

function RequestCard({
  request,
  onApprove,
  onDecline,
}: {
  request: JoinRequest;
  onApprove: () => void;
  onDecline: () => void;
}) {
  return (
    <article className="rounded-[24px] border border-white/95 bg-white/85 p-4 shadow-[0_14px_34px_rgba(72,66,149,0.10)] backdrop-blur-2xl">
      <div className="flex gap-3">
        <div className="relative flex h-[66px] w-[66px] shrink-0 items-center justify-center rounded-full border border-[#DDD6FF] bg-white p-1 shadow-[0_8px_18px_rgba(84,75,187,0.10)]">
          <div className={`flex h-full w-full items-center justify-center rounded-full bg-gradient-to-br ${request.tone}`}>
            <span className="text-[17px] font-extrabold">{request.initials}</span>
          </div>
          <span className="absolute -bottom-0.5 -right-0.5 flex h-6 w-6 items-center justify-center rounded-full border-2 border-white bg-[#6546DF] text-white">
            <UserRound className="h-3.5 w-3.5" strokeWidth={2.2} />
          </span>
        </div>

        <div className="min-w-0 flex-1 pt-0.5">
          <div className="flex items-start justify-between gap-2">
            <h3 className="truncate text-[18px] font-extrabold leading-6 tracking-[-0.2px]">{request.name}</h3>
            <span className="flex shrink-0 items-center gap-1 rounded-full bg-[#EAF7F2] px-2 py-1 text-[10px] font-bold text-[#168065]">
              <GraduationCap className="h-3.5 w-3.5" strokeWidth={2.2} />
              Student
            </span>
          </div>
          <p className="mt-1 text-[12.5px] font-semibold text-[#6D7083]">
            Requested to join Grade 8A
          </p>
          <div className="mt-2 flex items-center gap-1.5 whitespace-nowrap text-[10px] font-semibold text-[#85899B]">
            <span className="flex items-center gap-1">
              <Clock3 className="h-4 w-4" strokeWidth={2.1} />
              {request.requestedAt}
            </span>
            <span aria-hidden="true">•</span>
            <span className="rounded-full bg-[#EEE9FF] px-1.5 py-1 font-bold text-[#6449D8]">
              Class code request
            </span>
          </div>
        </div>
      </div>

      <div className="ml-[78px] mt-4 grid grid-cols-2 gap-2.5">
        <button
          onClick={onDecline}
          className="h-11 rounded-full border border-[#A995FF] bg-white text-[13px] font-bold text-[#5D43D8] transition active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6752E4]"
        >
          Decline
        </button>
        <button
          onClick={onApprove}
          className="flex h-11 items-center justify-center gap-2 rounded-full bg-[linear-gradient(120deg,#7045E8,#5147DE_55%,#3D78EF)] text-[13px] font-bold text-white shadow-[0_8px_18px_rgba(84,75,187,0.22)] transition active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6752E4]"
        >
          <Check className="h-4 w-4" strokeWidth={2.5} />
          Approve
        </button>
      </div>
    </article>
  );
}

function EmptyRequests() {
  return (
    <section className="mt-8 flex flex-col items-center rounded-[24px] border border-white/90 bg-white/75 px-6 py-10 text-center shadow-[0_14px_34px_rgba(72,66,149,0.08)] backdrop-blur-xl">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#EEE9FF] text-[#5D43D8]">
        <CheckCircle2 className="h-8 w-8" strokeWidth={2.1} />
      </div>
      <h2 className="mt-4 text-[20px] font-extrabold">All caught up</h2>
      <p className="mt-2 text-[13px] font-medium leading-5 text-[#686C80]">
        There are no pending requests to join Grade 8A.
      </p>
    </section>
  );
}

function StatusBar() {
  return (
    <div className="flex items-center justify-between px-6 pb-2 pt-4">
      <span className="text-[14px] font-semibold leading-5 text-black">9:41</span>
      <div className="flex items-center gap-1.5 text-black" aria-label="Phone status">
        <svg className="h-[12px] w-[19px]" viewBox="0 0 19.2 12.3" fill="currentColor" aria-hidden="true">
          <rect y="7.5" width="3.2" height="4.8" rx="1" />
          <rect x="5.3" y="5.1" width="3.2" height="7.2" rx="1" />
          <rect x="10.7" y="2.4" width="3.2" height="9.9" rx="1" />
          <rect x="16" width="3.2" height="12.3" rx="1" />
        </svg>
        <svg className="h-[13px] w-[18px]" viewBox="0 0 20 14" fill="none" aria-hidden="true">
          <path d="M1.5 4.5A12.7 12.7 0 0 1 18.5 4.5M4.4 8A8.3 8.3 0 0 1 15.6 8M7.7 11.2a3.5 3.5 0 0 1 4.6 0" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
          <circle cx="10" cy="13" r="1" fill="currentColor" />
        </svg>
        <svg className="h-[14px] w-[28px]" viewBox="0 0 28 14" fill="none" aria-hidden="true">
          <rect x=".7" y=".7" width="24" height="12.6" rx="4" stroke="currentColor" strokeOpacity=".4" strokeWidth="1.4" />
          <rect x="2.6" y="2.6" width="20.2" height="8.8" rx="2.5" fill="currentColor" />
          <path d="M26 4.7c1 .4 1.5 1.1 1.5 2.3S27 9 26 9.3V4.7Z" fill="currentColor" opacity=".45" />
        </svg>
      </div>
    </div>
  );
}
