import {
  ArrowLeft,
  Bell,
  Check,
  ChevronRight,
  Clock3,
  Flame,
  Hourglass,
  Play,
  Shuffle,
  UserRound,
  UsersRound,
} from 'lucide-react';
import type { CSSProperties, ReactNode } from 'react';
import { useNavigate } from 'react-router';
import calmResetImage from '../../../imports/ReturnUserHome/33c81ac0148d41512ccbf9408cc3b4f4bde8048d.png';

const classMembers = [
  { name: 'Kabir Patel', initials: 'KP', status: 'Ready for today', streak: '17-day streak', complete: false, tone: 'violet' },
  { name: 'Riya Shah', initials: 'RS', status: 'Ready for today', streak: '12-day streak', complete: false, tone: 'rose' },
  { name: 'Aarav Mehta', initials: 'AM', status: 'Ready for today', streak: '4-day streak', complete: false, tone: 'blue' },
  { name: 'Meera Joshi', initials: 'MJ', status: 'Ready for today', streak: '3-day streak', complete: false, tone: 'amber' },
];

export default function ClassCircleScreen({ variant = 'unassigned' }: { variant?: 'unassigned' | 'empty' }) {
  const navigate = useNavigate();
  const isEmpty = variant === 'empty';

  return (
    <div className="relative mx-auto min-h-screen w-full max-w-[480px] overflow-hidden pb-10 text-[#111326]">
      <div className="pointer-events-none absolute left-[-34%] top-[490px] h-[390px] w-[390px] rounded-full bg-[#becbff]/20 blur-[68px]" />
      <div className="pointer-events-none absolute right-[-38%] top-[-90px] h-[390px] w-[390px] rounded-full bg-[#dce2ff]/65 blur-[70px]" />

      <div className="relative z-10">
        <StatusBar />

        <header className="grid grid-cols-[52px_1fr_104px] items-center px-5 pb-[11px] pt-[14px] max-[350px]:grid-cols-[48px_1fr_94px] max-[350px]:px-4 sm:px-6">
          <button
            type="button"
            aria-label="Go back"
            onClick={() => navigate(-1)}
            className="flex h-12 w-12 items-center justify-center rounded-full border border-white/90 bg-white/80 shadow-[0_8px_24px_rgba(77,66,180,0.08)] backdrop-blur-md transition-transform active:scale-95 max-[350px]:h-11 max-[350px]:w-11"
          >
            <ArrowLeft className="h-[22px] w-[22px] text-[#6045df]" strokeWidth={2.35} />
          </button>

          <div className="min-w-0 px-2 text-center">
            <h1 className="text-[28px] font-extrabold leading-[32px] tracking-[-0.8px] text-[#6045df] max-[350px]:text-[25px]">League</h1>
            <p className="mt-1 whitespace-nowrap text-[14px] font-semibold leading-5 text-[#5f6069] max-[350px]:text-[12px]">
              Grade 8A · 30 students
            </p>
          </div>

          <div className="flex items-center justify-end gap-2.5 max-[350px]:gap-1.5">
            <button
              type="button"
              aria-label="Notifications"
              className="flex h-12 w-12 items-center justify-center rounded-full border border-white/90 bg-white/80 shadow-[0_8px_24px_rgba(77,66,180,0.08)] backdrop-blur-md transition-transform active:scale-95 max-[350px]:h-11 max-[350px]:w-11"
            >
              <Bell className="h-[20px] w-[20px] text-[#34363e]" strokeWidth={2.1} />
            </button>
            <button
              type="button"
              aria-label="Open profile"
              className="flex h-12 w-12 items-center justify-center rounded-full bg-[linear-gradient(145deg,#5940da,#7049ee)] shadow-[0_9px_22px_rgba(88,64,212,0.24)] transition-transform active:scale-95 max-[350px]:h-11 max-[350px]:w-11"
            >
              <UserRound className="h-[27px] w-[27px] text-white" strokeWidth={1.9} />
            </button>
          </div>
        </header>

        <main className="space-y-4 px-5 sm:px-6">
          <section className="relative overflow-hidden rounded-[25px] border border-white/30 bg-[#6746e7] px-[15px] pb-[15px] pt-[15px] text-white shadow-[0_18px_34px_rgba(71,73,196,0.20)] sm:px-[17px] sm:pb-[17px]">
            <div className="absolute inset-0 bg-[linear-gradient(132deg,#5939d7_0%,#704df1_50%,#2aa7e8_115%)]" />
            <div className="absolute right-[-70px] top-[46px] h-[190px] w-[190px] rounded-full bg-[#5cc4ff]/35 blur-[34px]" />
            <div className="absolute left-[-74px] top-[-84px] h-[190px] w-[190px] rounded-full bg-[#7c63ff]/48 blur-[40px]" />

            <div className="relative">
              <div className="inline-flex h-8 items-center gap-2 rounded-full border border-white/30 bg-white/15 px-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.22)] backdrop-blur-sm">
                <UsersRound className="h-[16px] w-[16px]" strokeWidth={2} />
                <span className="text-[11px] font-extrabold uppercase leading-none tracking-[0.1px]">
                  {isEmpty ? 'Your League Starts Here' : "Today's Class Status"}
                </span>
              </div>

              <div className="relative mt-5 min-h-[112px] pr-[108px] max-[350px]:min-h-[130px] max-[350px]:pr-[92px]">
                <div className="min-w-0 pb-1">
                  <h2 className="max-w-[224px] text-[18px] font-extrabold leading-[24px] tracking-[-0.25px] text-white max-[350px]:text-[16px] max-[350px]:leading-[21px]">
                    {isEmpty ? 'Your league starts with today' : "Today's practice is still open"}
                  </h2>
                  <p className="mt-2 max-w-[205px] text-[12px] font-semibold leading-[17px] text-white/90 max-[350px]:text-[11px] max-[350px]:leading-4">
                    {isEmpty
                      ? 'Your teacher may assign a practice here. If not, you can still choose one and make today count.'
                      : "Your teacher hasn't assigned one yet — you can still practise on your own."}
                  </p>
                </div>
                <div className="absolute right-0 top-[-17px] max-[350px]:top-[-7px]">
                  <ProgressRing completed={0} total={30} />
                </div>
              </div>

              <div className="mt-3 grid h-[78px] grid-cols-4 overflow-hidden rounded-[19px] border border-white/30 bg-white/20 shadow-[inset_0_1px_0_rgba(255,255,255,0.20)] backdrop-blur-md">
                <StatusMetric
                  icon={<UsersRound className="h-[17px] w-[17px] text-[#5b45da]" strokeWidth={2.5} />}
                  iconClass="bg-[#d9d2ff]"
                  label="Students"
                  value="30"
                />
                <StatusMetric
                  icon={<Check className="h-[18px] w-[18px] text-[#098f78]" strokeWidth={3} />}
                  iconClass="bg-[#baf5e5]"
                  label="Completed"
                  value="0"
                  divided
                />
                <StatusMetric
                  icon={<Hourglass className="h-[17px] w-[17px] text-[#d78b14]" strokeWidth={2.6} />}
                  iconClass="bg-[#ffe0a9]"
                  label="Ready"
                  value="30"
                  divided
                />
                <StatusMetric
                  icon={<Flame className="h-[17px] w-[17px] fill-[#ed664b] text-[#ed664b]" strokeWidth={2.1} />}
                  iconClass="bg-[#ffd6cf]"
                  label="7-Day Avg"
                  value={isEmpty ? '—' : '67%'}
                  divided
                />
              </div>
            </div>
          </section>

          <section className="rounded-[25px] border border-white/80 bg-white/90 p-[15px] shadow-[0_13px_35px_rgba(86,80,171,0.09)] backdrop-blur-sm sm:p-[18px]">
            <div className="grid grid-cols-[68px_1fr] gap-x-[14px]">
              <div className="row-span-2 flex h-[68px] w-[68px] items-center justify-center rounded-full border-[5px] border-white bg-white shadow-[0_7px_22px_rgba(56,48,111,0.12)] ring-1 ring-[#ecebf4]">
                <img src={calmResetImage} alt="A person meditating in a calm space" className="h-full w-full rounded-full object-cover" />
              </div>

              <div className="flex min-w-0 items-center justify-between gap-2">
                <p className="text-[10px] font-extrabold uppercase leading-4 tracking-[0.2px] text-[#7252ec]">Today&apos;s Practice</p>
                <span className="inline-flex h-7 shrink-0 items-center gap-1.5 rounded-full bg-[#f0f1f7] px-3 text-[11px] font-bold text-[#61687b]">
                  <Clock3 className="h-[14px] w-[14px]" strokeWidth={2.2} />
                  {isEmpty ? 'Getting started' : 'No assignment yet'}
                </span>
              </div>

              <div className="min-w-0">
                <h2 className="mt-1.5 max-w-[205px] text-[20px] font-extrabold leading-[24px] tracking-[-0.35px] text-[#111326]">
                  {isEmpty ? 'Start your first practice' : 'Pick your practice for today'}
                </h2>
                <p className="mt-2 text-[12px] font-semibold leading-[17px] text-[#64656d]">
                  {isEmpty
                    ? "Try Bodhi's 5-Min Calm Reset, or choose one that feels right."
                    : "Start with Bodhi's pick or choose your own. Either way, today counts."}
                </p>
              </div>
            </div>

            <div className="mt-[18px] grid grid-cols-2 gap-3 max-[350px]:grid-cols-1">
              <button
                type="button"
                onClick={() => navigate('/home/meditation-detail')}
                className="flex h-[48px] min-w-0 items-center justify-center gap-2 rounded-full bg-[linear-gradient(135deg,#5a38e4,#5d6ef3)] px-2 text-[12px] font-extrabold text-white shadow-[0_10px_20px_rgba(83,65,219,0.23)] transition-transform active:scale-[0.98]"
              >
                <Play className="h-[17px] w-[17px] shrink-0 fill-white" strokeWidth={1.8} />
                <span className="whitespace-nowrap">Start Practice</span>
              </button>
              <button
                type="button"
                onClick={() => navigate('/home/explore')}
                className="flex h-[48px] min-w-0 items-center justify-center gap-2 rounded-full border border-[#dedaf1] bg-white/75 px-2 text-[12px] font-extrabold text-[#6045df] shadow-[0_7px_18px_rgba(84,75,187,0.06)] transition-transform active:scale-[0.98]"
              >
                <Shuffle className="h-[17px] w-[17px] shrink-0" strokeWidth={2.15} />
                <span className="whitespace-nowrap">Choose your own</span>
              </button>
            </div>
          </section>

          <section>
            <h2 className="mb-[18px] px-1 text-[24px] font-extrabold leading-8 tracking-[-0.65px] text-[#111326]">Class Members</h2>

            <div className="space-y-3">
              {classMembers.map((member) => (
                <button
                  type="button"
                  key={member.name}
                  onClick={() => navigate('/home/sessions/member-profile')}
                  className={`flex w-full items-center gap-3 rounded-[23px] border border-white/90 bg-white/90 px-[14px] py-[13px] text-left shadow-[0_10px_28px_rgba(86,80,171,0.08)] backdrop-blur-sm transition-transform active:scale-[0.99] ${isEmpty ? 'min-h-[86px]' : 'min-h-[102px]'}`}
                >
                  <Avatar initials={member.initials} tone={member.tone} complete={member.complete} neutral={isEmpty} />
                  <div className="min-w-0 flex-1">
                    <h3 className="truncate text-[16px] font-extrabold leading-5 tracking-[-0.2px] text-[#111326]">{member.name}</h3>
                    <div className="mt-1.5 flex flex-wrap items-center gap-1.5">
                      <span className={`inline-flex rounded-full px-3 py-1 text-[11px] font-extrabold leading-4 ${member.complete ? 'bg-[#dff5eb] text-[#15926f]' : 'bg-[#eeeaff] text-[#6546d8]'}`}>
                        {isEmpty ? 'Ready to begin' : member.status}
                      </span>
                    </div>
                    {!isEmpty && <div className="mt-1.5">
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-[#fff2e0] px-3 py-1 text-[11px] font-extrabold leading-4 text-[#a9670e]">
                        <Flame className="h-[14px] w-[14px] text-[#e8901f]" strokeWidth={2.2} />
                        {member.streak}
                      </span>
                    </div>}
                  </div>
                  <ChevronRight className="h-[21px] w-[21px] shrink-0 text-[#a7a8ae]" strokeWidth={2.4} />
                </button>
              ))}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

function ProgressRing({ completed, total }: { completed: number; total: number }) {
  const radius = 43;
  const circumference = 2 * Math.PI * radius;
  const progress = completed / total;

  return (
    <div className="relative h-[106px] w-[106px] shrink-0 max-[350px]:h-[88px] max-[350px]:w-[88px]" aria-label={`${completed} of ${total} completed`}>
      <div className="absolute inset-[12px] rounded-full bg-[#6974ef]/30 blur-[8px]" />
      <svg className="relative h-full w-full -rotate-90 drop-shadow-[0_0_8px_rgba(255,255,255,0.45)]" viewBox="0 0 106 106" aria-hidden="true">
        <circle cx="53" cy="53" r={radius} fill="none" stroke="rgba(255,255,255,0.22)" strokeWidth="14" />
        <circle cx="53" cy="53" r={radius} fill="none" stroke="white" strokeLinecap="round" strokeWidth="14" strokeDasharray={circumference} strokeDashoffset={circumference * (1 - progress)} />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
        <span className="text-[19px] font-extrabold leading-5 tracking-[-0.4px] max-[350px]:text-[16px]">{completed}/{total}</span>
        <span className="mt-0.5 text-[9px] font-bold leading-3 max-[350px]:text-[8px]">Completed</span>
      </div>
    </div>
  );
}

function StatusMetric({ icon, iconClass, label, value, divided = false }: { icon: ReactNode; iconClass: string; label: string; value: string; divided?: boolean }) {
  return (
    <div className={`relative flex flex-col items-center justify-center ${divided ? 'before:absolute before:inset-y-2.5 before:left-0 before:w-px before:bg-white/24' : ''}`}>
      <div className={`mb-1 flex h-8 w-8 items-center justify-center rounded-full ${iconClass}`}>{icon}</div>
      <div className="text-[20px] font-extrabold leading-5 tracking-[-0.35px] text-[#101329]">{value}</div>
      <div className="mt-0.5 whitespace-nowrap text-[9px] font-bold leading-3 text-[#3f4765]">{label}</div>
    </div>
  );
}

function Avatar({ initials, tone, complete, neutral = false }: { initials: string; tone: string; complete: boolean; neutral?: boolean }) {
  const tones: Record<string, { background: string; ring: string }> = {
    violet: { background: 'linear-gradient(135deg,#7f6cff,#c9bcff)', ring: '#cfc7ff' },
    rose: { background: 'linear-gradient(135deg,#ff9ec0,#ffe1e7)', ring: '#ffd0df' },
    blue: { background: 'linear-gradient(135deg,#74c8ff,#e2f4ff)', ring: '#c7e9ff' },
    amber: { background: 'linear-gradient(135deg,#ffc36e,#ffe4b6)', ring: '#ffe2b7' },
  };
  const selected = tones[tone] ?? tones.violet;

  return (
    <div
      className="relative flex h-[50px] w-[50px] shrink-0 items-center justify-center rounded-full border-[3px] border-white text-[13px] font-extrabold text-[#17182a] shadow-[0_0_0_1px_var(--avatar-ring),0_6px_15px_rgba(50,45,101,0.11)]"
      style={{ background: selected.background, '--avatar-ring': selected.ring } as CSSProperties}
    >
      {initials}
      <span className={`absolute bottom-[-1px] right-[-1px] h-[13px] w-[13px] rounded-full border-[2px] border-white ${complete ? 'bg-[#1abb7a]' : neutral ? 'bg-[#aeb3c0]' : 'bg-[#f2a536]'}`} />
    </div>
  );
}

function StatusBar() {
  return (
    <div className="flex items-center justify-between px-6 pb-1 pt-5">
      <div className="text-[14px] font-bold leading-5 tracking-[-0.15px]">9:41</div>
      <div className="flex items-center gap-1.5" aria-label="Phone status">
        <svg className="h-[12px] w-[19px]" viewBox="0 0 19.2 12.2264" fill="none" aria-hidden="true">
          <path fillRule="evenodd" clipRule="evenodd" d="M19.2 1.14623C19.2.513183 18.7224 0 18.1333 0H17.0667C16.4776 0 16 .513183 16 1.14623V11.0802C16 11.7132 16.4776 12.2264 17.0667 12.2264H18.1333C18.7224 12.2264 19.2 11.7132 19.2 11.0802V1.14623ZM11.7659 2.44528H12.8326C13.4217 2.44528 13.8992 2.97078 13.8992 3.61902V11.0527C13.8992 11.7009 13.4217 12.2264 12.8326 12.2264H11.7659C11.1768 12.2264 10.6992 11.7009 10.6992 11.0527V3.61902C10.6992 2.97078 11.1768 2.44528 11.7659 2.44528ZM7.43411 5.09433H6.36745C5.77834 5.09433 5.30078 5.62652 5.30078 6.28301V11.0377C5.30078 11.6942 5.77834 12.2264 6.36745 12.2264H7.43411C8.02322 12.2264 8.50078 11.6942 8.50078 11.0377V6.28301C8.50078 5.62652 8.02322 5.09433 7.43411 5.09433ZM2.13333 7.53962H1.06667C.477563 7.53962 0 8.06421 0 8.71132V11.0547C0 11.7018.477563 12.2264 1.06667 12.2264H2.13333C2.72244 12.2264 3.2 11.7018 3.2 11.0547V8.71132C3.2 8.06421 2.72244 7.53962 2.13333 7.53962Z" fill="black" />
        </svg>
        <svg className="h-[12px] w-[17px]" viewBox="0 0 17.1417 12.3283" fill="none" aria-hidden="true">
          <path fillRule="evenodd" clipRule="evenodd" d="M8.5713 2.46628C11.0584 2.46639 13.4504 3.38847 15.2529 5.04195C15.3887 5.1696 15.6056 5.16799 15.7393 5.03834L17.0368 3.77487C17.1045 3.70911 17.1422 3.62004 17.1417 3.52735C17.1411 3.43467 17.1023 3.34603 17.0338 3.28104C12.3028-1.09368 4.83907-1.09368.108056 3.28104C.039524 3.34598.000639766 3.4346.00000782398 3.52728C-.000624118 3.61996.0370483 3.70906.104689 3.77487L1.40255 5.03834C1.53615 5.16819 1.75327 5.1698 1.88893 5.04195C3.69167 3.38836 6.08395 2.46628 8.5713 2.46628ZM8.56795 6.68656C9.92527 6.68647 11.2341 7.19821 12.2403 8.12234C12.3763 8.2535 12.5907 8.25065 12.7234 8.11593L14.0106 6.79663C14.0784 6.72742 14.1161 6.63355 14.1151 6.53599C14.1141 6.43844 14.0746 6.34536 14.0054 6.27757C10.9416 3.38672 6.19688 3.38672 3.13305 6.27757C3.06384 6.34536 3.02435 6.43849 3.02345 6.53607C3.02254 6.63365 3.06028 6.72752 3.12822 6.79663L4.41513 8.11593C4.54778 8.25065 4.76215 8.2535 4.89823 8.12234C5.90368 7.19882 7.21152 6.68713 8.56795 6.68656ZM11.0924 9.48011C11.0943 9.58546 11.0572 9.68703 10.9899 9.76084L8.81327 12.2156C8.74946 12.2877 8.66247 12.3283 8.5717 12.3283C8.48093 12.3283 8.39394 12.2877 8.33013 12.2156L6.1531 9.76084C6.08585 9.68697 6.04886 9.58537 6.05085 9.48002C6.05284 9.37467 6.09365 9.27491 6.16364 9.20429C7.55374 7.8904 9.58966 7.8904 10.9798 9.20429C11.0497 9.27497 11.0904 9.37476 11.0924 9.48011Z" fill="black" />
        </svg>
        <svg className="h-[13px] w-[27px]" viewBox="0 0 27.328 13" fill="none" aria-hidden="true">
          <rect x=".5" y=".5" width="24" height="12" rx="3.8" stroke="black" opacity=".35" />
          <path d="M26 4.78113V8.8566C26.8047 8.51143 27.328 7.70847 27.328 6.81886C27.328 5.92926 26.8047 5.1263 26 4.78113" fill="black" opacity=".4" />
          <rect x="2" y="2" width="21" height="9" rx="2.5" fill="black" />
        </svg>
      </div>
    </div>
  );
}
