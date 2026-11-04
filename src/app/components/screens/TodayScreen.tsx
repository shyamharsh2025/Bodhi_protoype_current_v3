import { ArrowRight, ArrowUpRight, Bell } from 'lucide-react';
import { useNavigate } from 'react-router';

export default function TodayScreen() {
  const navigate = useNavigate();

  const weekDays = [
    { label: 'S', active: true, filled: 0.2 },
    { label: 'M', active: true, filled: 0.6 },
    { label: 'T', active: true, filled: 0.6 },
    { label: 'W', active: true, filled: 0.6 },
    { label: 'T', active: true, filled: 0.6 },
    { label: 'TODAY', active: true, filled: 1, isToday: true },
    { label: 'S', active: false, filled: 0 },
    { label: 'S', active: false, filled: 0 },
  ];

  return (
    <div className="relative min-h-screen bg-white pb-6">
      {/* Background Decorative Blobs */}
      <div className="absolute top-[-70px] left-[38%] w-[280px] h-[280px] bg-[rgba(102,163,255,0.14)] rounded-full blur-[48px] pointer-events-none" />
      <div className="absolute top-[520px] left-[-90px] w-[300px] h-[300px] bg-[rgba(104,152,249,0.12)] rounded-full blur-[52px] pointer-events-none" />

      <div className="relative z-10">
        {/* Status Bar */}
        <div className="flex items-center justify-between px-6 pt-4 pb-2">
          <div className="text-[14px] font-semibold leading-5 tracking-normal">9:41</div>
          <div className="flex items-center gap-1.5">
            <svg className="w-[19px] h-[12px]" viewBox="0 0 19.2 12.2264" fill="none">
              <path fillRule="evenodd" clipRule="evenodd" d="M19.2 1.14623C19.2 0.513183 18.7224 0 18.1333 0H17.0667C16.4776 0 16 0.513183 16 1.14623V11.0802C16 11.7132 16.4776 12.2264 17.0667 12.2264H18.1333C18.7224 12.2264 19.2 11.7132 19.2 11.0802V1.14623ZM11.7659 2.44528H12.8326C13.4217 2.44528 13.8992 2.97078 13.8992 3.61902V11.0527C13.8992 11.7009 13.4217 12.2264 12.8326 12.2264H11.7659C11.1768 12.2264 10.6992 11.7009 10.6992 11.0527V3.61902C10.6992 2.97078 11.1768 2.44528 11.7659 2.44528ZM7.43411 5.09433H6.36745C5.77834 5.09433 5.30078 5.62652 5.30078 6.28301V11.0377C5.30078 11.6942 5.77834 12.2264 6.36745 12.2264H7.43411C8.02322 12.2264 8.50078 11.6942 8.50078 11.0377V6.28301C8.50078 5.62652 8.02322 5.09433 7.43411 5.09433ZM2.13333 7.53962H1.06667C0.477563 7.53962 0 8.06421 0 8.71132V11.0547C0 11.7018 0.477563 12.2264 1.06667 12.2264H2.13333C2.72244 12.2264 3.2 11.7018 3.2 11.0547V8.71132C3.2 8.06421 2.72244 7.53962 2.13333 7.53962Z" fill="black" />
            </svg>
            <svg className="w-[17px] h-[12px]" viewBox="0 0 17.1417 12.3283" fill="none">
              <path fillRule="evenodd" clipRule="evenodd" d="M8.5713 2.46628C11.0584 2.46639 13.4504 3.38847 15.2529 5.04195C15.3887 5.1696 15.6056 5.16799 15.7393 5.03834L17.0368 3.77487C17.1045 3.70911 17.1422 3.62004 17.1417 3.52735C17.1411 3.43467 17.1023 3.34603 17.0338 3.28104C12.3028 -1.09368 4.83907 -1.09368 0.108056 3.28104C0.039524 3.34598 0.000639766 3.4346 7.82398e-06 3.52728C-0.000624118 3.61996 0.0370483 3.70906 0.104689 3.77487L1.40255 5.03834C1.53615 5.16819 1.75327 5.1698 1.88893 5.04195C3.69167 3.38836 6.08395 2.46628 8.5713 2.46628ZM8.56795 6.68656C9.92527 6.68647 11.2341 7.19821 12.2403 8.12234C12.3763 8.2535 12.5907 8.25065 12.7234 8.11593L14.0106 6.79663C14.0784 6.72742 14.1161 6.63355 14.1151 6.53599C14.1141 6.43844 14.0746 6.34536 14.0054 6.27757C10.9416 3.38672 6.19688 3.38672 3.13305 6.27757C3.06384 6.34536 3.02435 6.43849 3.02345 6.53607C3.02254 6.63365 3.06028 6.72752 3.12822 6.79663L4.41513 8.11593C4.54778 8.25065 4.76215 8.2535 4.89823 8.12234C5.90368 7.19882 7.21152 6.68713 8.56795 6.68656ZM11.0924 9.48011C11.0943 9.58546 11.0572 9.68703 10.9899 9.76084L8.81327 12.2156C8.74946 12.2877 8.66247 12.3283 8.5717 12.3283C8.48093 12.3283 8.39394 12.2877 8.33013 12.2156L6.1531 9.76084C6.08585 9.68697 6.04886 9.58537 6.05085 9.48002C6.05284 9.37467 6.09365 9.27491 6.16364 9.20429C7.55374 7.8904 9.58966 7.8904 10.9798 9.20429C11.0497 9.27497 11.0904 9.37476 11.0924 9.48011Z" fill="black" />
            </svg>
            <svg className="w-[27px] h-[13px]" viewBox="0 0 27.328 13" fill="none">
              <rect x="0.5" y="0.5" width="24" height="12" rx="3.8" stroke="black" opacity="0.35" />
              <path d="M26 4.78113V8.8566C26.8047 8.51143 27.328 7.70847 27.328 6.81886C27.328 5.92926 26.8047 5.1263 26 4.78113" fill="black" opacity="0.4" />
              <rect x="2" y="2" width="21" height="9" rx="2.5" fill="black" />
            </svg>
          </div>
        </div>

        {/* Header */}
        <div className="flex items-center justify-between px-6 pt-4 pb-5">
          <div>
            <h1 className="text-[24px] font-bold text-[#5840D4] leading-8" style={{ fontFamily: 'Inter, sans-serif' }}>
              Hey teacher
            </h1>
            <p className="text-[14px] font-medium text-[#2D2E34] leading-5 mt-1" style={{ fontFamily: 'Inter, sans-serif' }}>
              Good Morning
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button className="w-11 h-11 rounded-full bg-white border border-[rgba(232,231,241,0.85)] flex items-center justify-center shadow-[0px_6px_16px_0px_rgba(84,75,187,0.07)]">
              <Bell className="w-[18px] h-[18px] text-[#5840D4]" strokeWidth={2} />
            </button>
            <div className="w-11 h-11 rounded-full border-2 border-[rgba(88,64,212,0.28)] bg-[#D2BE9F] shadow-[0px_6px_16px_0px_rgba(84,75,187,0.08)]" />
          </div>
        </div>

        {/* Streak Section */}
        <div className="mx-6 mb-6">
          <div className="bg-white border border-[#E8E7F1] rounded-[22px] shadow-[0px_8px_24px_0px_rgba(84,75,187,0.08)] overflow-hidden">
            <div
              onClick={() => navigate('/home/voice-orb')}
              className="px-4 pt-4 pb-4 cursor-pointer"
            >
              <div className="flex items-center justify-between mb-5 pl-2">
                <h3 className="text-[14px] font-semibold text-[#2D2E34] leading-5" style={{ fontFamily: 'Inter, sans-serif' }}>
                  You are on a 12 day streak
                </h3>
                <ArrowUpRight className="h-5 w-5 text-[#544BBB]/75" strokeWidth={2} />
              </div>

              <div className="flex items-start justify-between px-1">
                {weekDays.map((day, idx) => (
                  <div key={idx} className="flex flex-col items-center gap-2 flex-1 min-w-0">
                    <div
                      className="text-[10px] font-semibold tracking-[0.2px] uppercase leading-3"
                      style={{
                        fontFamily: 'Inter, sans-serif',
                        color: day.isToday ? '#5840D4' : 'rgba(90,91,98,0.5)',
                      }}
                    >
                      {day.label}
                    </div>
                    {day.isToday ? (
                      <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#544BBB] to-[#9A94FF] flex items-center justify-center shadow-[0px_0px_0px_4px_rgba(74,71,210,0.08),0px_5px_12px_0px_rgba(74,71,210,0.22)]">
                        <svg className="w-3 h-[15px]" viewBox="0 0 12 15" fill="none">
                          <path d="M3 15L3.75 9.75H0L6.75 0H8.25L7.5 6H12L4.5 15H3V15" fill="white" />
                        </svg>
                      </div>
                    ) : day.active ? (
                      <div
                        className="w-9 h-9 rounded-full flex items-center justify-center"
                        style={{
                          backgroundColor: day.filled > 0.5 ? 'rgba(88,64,212,0.6)' : 'rgba(88,64,212,0.2)',
                        }}
                      >
                        <svg className="w-[10px] h-[13px]" viewBox="0 0 8 10" fill="none">
                          <path d="M2 10L2.5 6.5H0L4.5 0H5.5L5 4H8L3 10H2V10" fill="white" />
                        </svg>
                      </div>
                    ) : (
                      <div className="w-9 h-9 rounded-full border-2 border-[#DCDCE7]" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Dopa Meter */}
        <div className="mx-6 mb-7">
          <button
            onClick={() => navigate('/home/dopa-meter')}
            className="w-full h-[128px] rounded-[22px] shadow-[0px_10px_26px_0px_rgba(84,75,187,0.16)] relative overflow-hidden text-left"
            style={{
              backgroundImage: 'linear-gradient(108.358deg, rgb(88, 64, 212) 3.9747%, rgb(0, 153, 191) 111.33%)',
            }}
          >
            {(() => {
              const pct = 78;
              const r = 51.2;
              const arcLen = Math.PI * r;
              const dashOffset = arcLen * (1 - pct / 100);
              return (
                <div className="relative h-full">
                  <div className="absolute inset-0 bg-white/[0.04]" />
                  <div className="relative h-[92px] flex items-center justify-between gap-5 px-6">
                    <div className="flex min-w-0 flex-col items-start justify-center">
                      <div
                        className="text-white/55 uppercase"
                        style={{
                          fontFamily: 'Inter, sans-serif',
                          fontWeight: 700,
                          fontSize: 10,
                          lineHeight: '12px',
                          letterSpacing: '0.8px',
                        }}
                      >
                        DOPA METER
                      </div>
                      <h3
                        className="text-white mt-2 whitespace-nowrap"
                        style={{
                          fontFamily: 'Inter, sans-serif',
                          fontWeight: 700,
                          fontSize: 24,
                          lineHeight: '27px',
                          letterSpacing: '0px',
                        }}
                      >
                        Feeling Good
                      </h3>
                    </div>

                    <div className="relative shrink-0 self-center" style={{ width: 82, height: 62 }}>
                      <svg className="w-full h-[46px]" viewBox="0 0 115.2 64" fill="none">
                        <path
                          d="M6.4 57.6C6.4 29.3419 29.3419 6.4 57.6 6.4C85.858 6.4 108.8 29.3419 108.8 57.6"
                          stroke="rgba(255,255,255,0.24)"
                          strokeWidth="8"
                          strokeLinecap="round"
                        />
                        <path
                          d="M6.4 57.6C6.4 29.3419 29.3419 6.4 57.6 6.4C85.858 6.4 108.8 29.3419 108.8 57.6"
                          stroke="rgba(255,255,255,0.92)"
                          strokeWidth="8"
                          strokeLinecap="round"
                          strokeDasharray={arcLen}
                          strokeDashoffset={dashOffset}
                          style={{ transition: 'stroke-dashoffset 1.2s cubic-bezier(0.22, 1, 0.36, 1)' }}
                        />
                      </svg>
                      <div
                        className="absolute inset-x-0 top-[30px] flex items-baseline justify-center text-white"
                        style={{
                          fontFamily: 'Inter, sans-serif',
                          fontWeight: 700,
                          fontSize: 18,
                          lineHeight: '20px',
                          letterSpacing: '0px',
                        }}
                      >
                        {pct}
                        <span style={{ fontWeight: 700, fontSize: 10, marginLeft: 2 }}>%</span>
                      </div>
                      <div
                        className="absolute inset-x-0 bottom-0 text-center text-white/58 uppercase"
                        style={{
                          fontFamily: 'Inter, sans-serif',
                          fontWeight: 700,
                          fontSize: 10,
                          lineHeight: '12px',
                          letterSpacing: '0.7px',
                        }}
                      >
                        TODAY
                      </div>
                    </div>
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 h-9 border-t border-white/10 bg-white/[0.07] px-6 flex items-center justify-between">
                    <div
                      className="text-white/90"
                      style={{
                        fontFamily: 'Inter, sans-serif',
                        fontWeight: 600,
                        fontSize: 14,
                        lineHeight: '20px',
                        letterSpacing: '0px',
                      }}
                    >
                      Update your check-in
                    </div>
                    <ArrowRight className="h-5 w-5 text-white/75" strokeWidth={2} />
                  </div>
                </div>
              );
            })()}
          </button>
        </div>

        {/* All Sessions */}
        <div className="mx-6 mb-7">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-[18px] font-bold text-[#2D2E34] leading-7" style={{ fontFamily: 'Inter, sans-serif' }}>
              All Sessions
            </h2>
            <button className="text-[10px] font-bold text-[#544BBB] uppercase tracking-[0.4px] leading-3" style={{ fontFamily: 'Inter, sans-serif' }}>
              VIEW ALL
            </button>
          </div>

          <div className="flex gap-4">
            {/* Root Chakra Card */}
            <button
              onClick={() => navigate('/home/chakra-meditation/root')}
              className="flex-1 bg-white border border-[rgba(232,231,241,0.8)] rounded-[22px] p-4 shadow-[0px_8px_22px_0px_rgba(84,75,187,0.10)] min-h-[146px] flex flex-col text-left"
            >
              <div className="flex items-start justify-between mb-5">
                <div className="w-11 h-11 rounded-full bg-[#D9D9D9] shadow-[inset_0px_2px_4px_0px_rgba(0,0,0,0.04)]" />
                <div className="bg-[rgba(88,64,212,0.08)] px-2.5 py-1 rounded-full">
                  <span className="text-[10px] font-bold text-[#5840D4] uppercase tracking-[0px] leading-3" style={{ fontFamily: 'Inter, sans-serif' }}>
                    FOCUS
                  </span>
                </div>
              </div>

              <div className="flex-1 flex flex-col justify-end">
                <h4 className="text-[14px] font-bold text-[#2D2E34] leading-5 mb-3" style={{ fontFamily: 'Inter, sans-serif' }}>
                  Root Chakra
                </h4>
                <div className="flex items-center justify-between text-[12px] mb-2">
                  <span className="font-semibold text-[#5A5B62] uppercase" style={{ fontFamily: 'Inter, sans-serif' }}>
                    15 MIN
                  </span>
                  <span className="font-bold text-[#5840D4]" style={{ fontFamily: 'Inter, sans-serif' }}>
                    75%
                  </span>
                </div>
                <div className="bg-[#E8E7F1] h-1.5 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: '75%',
                      backgroundImage: 'linear-gradient(152.195deg, rgb(88, 64, 212) 3.9747%, rgb(0, 153, 191) 111.33%)',
                    }}
                  />
                </div>
              </div>
            </button>

            {/* Sacral Chakra Card */}
            <button
              onClick={() => navigate('/home/chakra-meditation/sacral')}
              className="flex-1 bg-white border border-[rgba(232,231,241,0.8)] rounded-[22px] p-4 shadow-[0px_8px_22px_0px_rgba(84,75,187,0.10)] min-h-[146px] flex flex-col text-left"
            >
              <div className="flex items-start justify-between mb-5">
                <div className="w-11 h-11 rounded-full bg-[#D2BE9F] shadow-[inset_0px_2px_4px_0px_rgba(0,0,0,0.04)]" />
                <div className="bg-[rgba(88,64,212,0.08)] px-2.5 py-1 rounded-full">
                  <span className="text-[10px] font-bold text-[#5840D4] uppercase tracking-[0px] leading-3" style={{ fontFamily: 'Inter, sans-serif' }}>
                    MEDITATE
                  </span>
                </div>
              </div>

              <div className="flex-1 flex flex-col justify-end">
                <h4 className="text-[14px] font-bold text-[#2D2E34] leading-5 mb-3" style={{ fontFamily: 'Inter, sans-serif' }}>
                  Sacral Chakra
                </h4>
                <div className="flex items-center justify-between text-[12px] mb-2">
                  <span className="font-semibold text-[#5A5B62] uppercase" style={{ fontFamily: 'Inter, sans-serif' }}>
                    10 MIN
                  </span>
                  <span className="font-bold text-[#5840D4]" style={{ fontFamily: 'Inter, sans-serif' }}>
                    30%
                  </span>
                </div>
                <div className="bg-[#E8E7F1] h-1.5 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: '30%',
                      backgroundImage: 'linear-gradient(127.173deg, rgb(88, 64, 212) 3.9747%, rgb(0, 153, 191) 111.33%)',
                    }}
                  />
                </div>
              </div>
            </button>
          </div>
        </div>

        {/* New For You */}
        <div className="mx-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-[18px] font-bold text-[#2D2E34] leading-7" style={{ fontFamily: 'Inter, sans-serif' }}>
              New For You
            </h2>
            <button className="text-[10px] font-bold text-[#5840D4] uppercase tracking-[0.4px] leading-3" style={{ fontFamily: 'Inter, sans-serif' }}>
              VIEW ALL
            </button>
          </div>

          <div
            role="button"
            tabIndex={0}
            onClick={() => navigate('/home/chakra-meditation')}
            onKeyDown={(event) => {
              if (event.key === 'Enter' || event.key === ' ') navigate('/home/chakra-meditation');
            }}
            className="cursor-pointer bg-white rounded-[22px] border border-[#E8E7F1] shadow-[0px_8px_22px_0px_rgba(84,75,187,0.10)] overflow-hidden"
          >
            <div
              className="h-[160px] relative overflow-hidden"
              style={{
                backgroundImage: 'linear-gradient(140.729deg, rgb(154, 148, 255) 0%, rgb(101, 76, 161) 100%)',
              }}
            >
              <div className="absolute inset-0 bg-[#A59D94]" />
            </div>

            <div className="p-5">
              <h3 className="text-[18px] font-bold text-[#2D2E34] leading-7 mb-1" style={{ fontFamily: 'Inter, sans-serif' }}>
                Chakra Reset Series
              </h3>
              <p className="text-[12px] font-semibold text-[#654CA1] tracking-[0.3px] uppercase mb-4" style={{ fontFamily: 'Inter, sans-serif' }}>
                SERIES • 7 SESSION
              </p>
              <button
                onClick={(event) => {
                  event.stopPropagation();
                  navigate('/home/chakra-meditation');
                }}
                className="w-full py-3 rounded-full text-center"
                style={{
                  backgroundImage: 'linear-gradient(8.34389deg, rgb(84, 75, 187) 0%, rgb(154, 148, 255) 100%)',
                }}
              >
                <span className="text-[14px] font-bold text-[#F5F1FF] leading-5" style={{ fontFamily: 'Inter, sans-serif' }}>
                  Begin
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
