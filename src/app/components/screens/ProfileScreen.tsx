import {
  ArrowLeft,
  Bell,
  Building2,
  Check,
  ChevronDown,
  ChevronRight,
  CircleHelp,
  Database,
  Edit3,
  Moon,
  ShieldCheck,
  UserRound,
} from 'lucide-react';
import { useState, type ComponentType } from 'react';
import { useNavigate } from 'react-router';

const purple = '#5840D4';

const profiles = [
  { name: 'Anusha Patel', role: 'Teacher', initials: 'AP', tone: '#E8E4FF' },
  { name: 'Anusha Patel', role: 'Student', initials: 'AP', tone: '#E4F4FF' },
  { name: 'Meera Patel', role: 'Mother', initials: 'MP', tone: '#FFE8F0' },
];

const settings: Array<{
  title: string;
  subtitle: string;
  icon: ComponentType<{ className?: string; strokeWidth?: number }>;
  toggle?: boolean;
  route?: string;
}> = [
  {
    title: 'Linked School & Class',
    subtitle: 'GGIS Ahmedabad • Grade 8A',
    icon: Building2,
  },
  {
    title: 'Notifications',
    subtitle: 'Reminders and updates',
    icon: Bell,
  },
  {
    title: 'Dark Mode',
    subtitle: 'Reduce eye strain',
    icon: Moon,
    toggle: true,
  },
  {
    title: 'Privacy & Security',
    subtitle: 'Thought Bank PIN, visibility, login...',
    icon: ShieldCheck,
  },
  {
    title: 'Data & Consent',
    subtitle: 'Download data and manage consent',
    icon: Database,
  },
  {
    title: 'Help & Support',
    subtitle: 'Support, app info, policies',
    icon: CircleHelp,
    route: '/home/profile/help-support',
  },
];

export default function ProfileScreen() {
  const navigate = useNavigate();
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isProfileSwitcherOpen, setIsProfileSwitcherOpen] = useState(true);
  const [selectedProfile, setSelectedProfile] = useState(0);
  const activeProfile = profiles[selectedProfile];

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#FCFCFF] pb-10 text-[#202127]">
      <div className="pointer-events-none absolute right-[-120px] top-[-80px] h-[390px] w-[390px] rounded-full bg-[rgba(107,159,255,0.16)] blur-[70px]" />
      <div className="pointer-events-none absolute left-[-170px] top-[650px] h-[420px] w-[420px] rounded-full bg-[rgba(136,114,255,0.12)] blur-[80px]" />

      <div className="relative z-10 mx-auto w-full max-w-md">
        <StatusBar />

        <header className="grid grid-cols-[48px_1fr_48px] items-center px-6 pb-7 pt-5">
          <button
            aria-label="Go back"
            onClick={() => navigate(-1)}
            className="flex h-12 w-12 items-center justify-center rounded-full border border-[#E8E7F1] bg-white text-[#5840D4] shadow-[0_8px_22px_rgba(84,75,187,0.08)] transition active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5840D4]"
          >
            <ArrowLeft className="h-6 w-6" strokeWidth={2.4} />
          </button>
          <h1 className="text-center text-[26px] font-bold leading-8">Profile</h1>
          <span aria-hidden="true" />
        </header>

        <main className="px-6">
          <section className="mb-7 flex items-center gap-5">
            <div className="relative shrink-0">
              <InitialAvatar initials={activeProfile.initials} size="large" />
              <button
                aria-label="Edit profile picture"
                className="absolute -bottom-1 -right-1 flex h-10 w-10 items-center justify-center rounded-full border-[3px] border-white bg-[#5840D4] text-white shadow-[0_6px_14px_rgba(88,64,212,0.25)] transition active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5840D4]"
              >
                <Edit3 className="h-5 w-5" strokeWidth={2.2} />
              </button>
            </div>

            <div className="min-w-0 flex-1">
              <h2 className="truncate text-[28px] font-bold leading-9">{activeProfile.name}</h2>
              <span className="mt-2 inline-flex rounded-full bg-[#F0ECFF] px-3 py-1 text-[14px] font-bold leading-5 text-[#5840D4]">
                {activeProfile.role}
              </span>
              <p className="mt-3 text-[15px] font-medium leading-6 text-[#737585]">
                Grade 8A • GGIS Ahmedabad
              </p>
              <button className="mt-2 min-h-11 text-[15px] font-bold text-[#5840D4] transition active:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5840D4]">
                Edit profile
              </button>
            </div>
          </section>

          <section className="mb-6 rounded-[24px] border border-[#E4E2EE] bg-white/95 p-4 shadow-[0_14px_34px_rgba(84,75,187,0.09)]">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#F0ECFF] text-[#5840D4]">
                <UserRound className="h-6 w-6" strokeWidth={2.1} />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-[13px] font-medium leading-5 text-[#737585]">Using Bodhi as</p>
                <div className="mt-0.5 flex items-center gap-2">
                  <p className="truncate text-[15px] font-bold">{activeProfile.name}</p>
                  <RolePill role={activeProfile.role} />
                </div>
              </div>
              <button
                aria-expanded={isProfileSwitcherOpen}
                aria-label={isProfileSwitcherOpen ? 'Collapse profile switcher' : 'Expand profile switcher'}
                onClick={() => setIsProfileSwitcherOpen((open) => !open)}
                className="flex min-h-11 items-center gap-2 rounded-xl px-1 text-[15px] font-bold text-[#5840D4] transition active:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5840D4]"
              >
                Switch
                <ChevronDown
                  className={`h-5 w-5 text-[#727586] transition-transform duration-200 ${isProfileSwitcherOpen ? 'rotate-180' : ''}`}
                  strokeWidth={2.5}
                />
              </button>
            </div>

            {isProfileSwitcherOpen && (
              <div className="mt-4 overflow-hidden rounded-[20px] border border-[#DDD9F6]">
                {profiles.map((profile, index) => {
                  const selected = index === selectedProfile;
                  return (
                    <button
                      key={`${profile.name}-${profile.role}`}
                      aria-pressed={selected}
                      onClick={() => setSelectedProfile(index)}
                      className={`flex min-h-[64px] w-full items-center gap-3 border-b border-[#E8E7F1] px-3 text-left transition-colors last:border-b-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#5840D4] ${
                        selected ? 'bg-[#F2EFFF]' : 'bg-white active:bg-[#F8F7FF]'
                      }`}
                    >
                      <div
                        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-[13px] font-extrabold text-[#4D43AF]"
                        style={{ backgroundColor: profile.tone }}
                      >
                        {profile.initials}
                      </div>
                      <span className="min-w-0 flex-1 truncate text-[15px] font-bold">{profile.name}</span>
                      <RolePill role={profile.role} />
                      {selected && (
                        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#5840D4] text-white">
                          <Check className="h-5 w-5" strokeWidth={3} />
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            )}
          </section>

          <section
            role="button"
            tabIndex={0}
            aria-label="Open Bodhi Premium subscription plans"
            onClick={() => navigate('/home/subscription')}
            onKeyDown={(event) => {
              if (event.key === 'Enter' || event.key === ' ') navigate('/home/subscription');
            }}
            className="relative mb-7 cursor-pointer overflow-hidden rounded-[24px] bg-[linear-gradient(105deg,#5940DA_0%,#347ED6_55%,#31B5D0_100%)] p-4 text-white shadow-[0_15px_32px_rgba(54,104,208,0.20)] transition active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5840D4] focus-visible:ring-offset-2"
          >
            <div className="absolute -right-8 -top-12 h-36 w-36 rounded-full bg-white/10 blur-xl" />
            <div className="relative flex items-center gap-3">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-white/25 bg-white/10">
                <span className="text-[18px] font-extrabold tracking-tight">B</span>
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="whitespace-nowrap text-[18px] font-bold leading-6">Bodhi Premium</h3>
                <p className="mt-1 text-[13px] font-semibold leading-5 text-white/90">
                  Active plan • 3 profiles included
                </p>
                <p className="mt-1 text-[13px] font-medium text-white/85">Renews on Aug 12</p>
              </div>
              <span className="shrink-0 rounded-full bg-white px-3 py-3 text-[13px] font-bold text-[#5840D4] shadow-sm">
                Manage Plan
              </span>
            </div>
          </section>

          <section className="overflow-hidden rounded-[24px] border border-[#E4E2EE] bg-white/95 px-4 shadow-[0_14px_34px_rgba(84,75,187,0.09)]">
            {settings.map((item) => {
              const Icon = item.icon;

              if (item.route) {
                return (
                  <button
                    key={item.title}
                    type="button"
                    aria-label={`Open ${item.title}`}
                    onClick={() => navigate(item.route!)}
                    className="flex min-h-[82px] w-full touch-manipulation items-center gap-3 border-b border-[#E8E7F1] text-left transition-colors last:border-b-0 active:bg-[#F5F3FF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#5840D4]"
                  >
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#F0ECFF] text-[#5840D4]">
                      <Icon className="h-[22px] w-[22px]" strokeWidth={2.15} />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-[15px] font-bold leading-5">{item.title}</span>
                      <span className="mt-1 block truncate text-[13px] font-medium leading-5 text-[#777A8C]">
                        {item.subtitle}
                      </span>
                    </span>
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-[#7D8090]">
                      <ChevronRight className="h-5 w-5" strokeWidth={2.4} />
                    </span>
                  </button>
                );
              }

              return (
                <div
                  key={item.title}
                  className="flex min-h-[82px] items-center gap-3 border-b border-[#E8E7F1] last:border-b-0"
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#F0ECFF] text-[#5840D4]">
                    <Icon className="h-[22px] w-[22px]" strokeWidth={2.15} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="text-[15px] font-bold leading-5">{item.title}</h3>
                    <p className="mt-1 truncate text-[13px] font-medium leading-5 text-[#777A8C]">
                      {item.subtitle}
                    </p>
                  </div>
                  {item.toggle ? (
                    <button
                      role="switch"
                      aria-checked={isDarkMode}
                      aria-label="Toggle dark mode"
                      onClick={() => setIsDarkMode((enabled) => !enabled)}
                      className={`relative h-9 w-[58px] shrink-0 rounded-full transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5840D4] ${
                        isDarkMode ? 'bg-[#5840D4]' : 'bg-[#D8D8E2]'
                      }`}
                    >
                      <span
                        className={`absolute top-1 h-7 w-7 rounded-full bg-white shadow-sm transition-transform duration-200 ${
                          isDarkMode ? 'translate-x-[26px]' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  ) : (
                    <button
                      aria-label={`Open ${item.title}`}
                      className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-[#7D8090] transition active:bg-[#F3F1FF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5840D4]"
                    >
                      <ChevronRight className="h-5 w-5" strokeWidth={2.4} />
                    </button>
                  )}
                </div>
              );
            })}
          </section>

          <p className="px-6 pb-2 pt-8 text-center text-[13px] font-medium leading-5 text-[#8A8D9F]">
            Bodhi keeps your school, profile, and reflection settings in one calm place.
          </p>
        </main>
      </div>
    </div>
  );
}

function InitialAvatar({ initials, size }: { initials: string; size: 'large' }) {
  return (
    <div className="flex h-[108px] w-[108px] items-center justify-center rounded-full border-[4px] border-[#5840D4] bg-[linear-gradient(145deg,#F1EEFF,#DDEAFF)] p-[5px] shadow-[0_10px_24px_rgba(88,64,212,0.12)]">
      <div className="flex h-full w-full items-center justify-center rounded-full bg-[#EAE6FF] text-[32px] font-extrabold tracking-[-1px] text-[#5840D4]">
        {initials}
      </div>
    </div>
  );
}

function RolePill({ role }: { role: string }) {
  return (
    <span className="shrink-0 rounded-full bg-[#F0ECFF] px-3 py-1 text-[12px] font-bold leading-4 text-[#5840D4]">
      {role}
    </span>
  );
}

function StatusBar() {
  return (
    <div className="flex items-center justify-between px-6 pb-2 pt-4">
      <span className="text-[14px] font-semibold leading-5">9:41</span>
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
