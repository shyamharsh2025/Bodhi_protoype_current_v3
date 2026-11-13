import { ArrowRight, ArrowUpRight, Bell } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import { useRef, useState } from 'react';
import { useNavigate } from 'react-router';
import rootChakraImage from '../../../imports/ReturnUserHome/680b9473c856efcb97e710b14b817e94ed6c94f3.png';
import sacralChakraImage from '../../../imports/ReturnUserHome/a284d845041011ceb06c656399145b8c5c74bc5d.png';
import PersonalLibraryCard from '../PersonalLibraryCard';

export default function TodayScreen() {
  const navigate = useNavigate();
  const shouldReduceMotion = useReducedMotion();
  const forYouRef = useRef<HTMLDivElement>(null);
  const [forYouSlide, setForYouSlide] = useState(0);

  const updateForYouSlide = () => {
    const carousel = forYouRef.current;
    if (!carousel) return;
    const cards = Array.from(carousel.children) as HTMLElement[];
    const closest = cards.reduce(
      (best, card, index) => {
        const distance = Math.abs(card.offsetLeft - carousel.offsetLeft - carousel.scrollLeft);
        return distance < best.distance ? { index, distance } : best;
      },
      { index: 0, distance: Number.POSITIVE_INFINITY },
    );
    setForYouSlide(closest.index);
  };

  const goToForYouSlide = (index: number) => {
    const carousel = forYouRef.current;
    const card = carousel?.children[index] as HTMLElement | undefined;
    if (!carousel || !card) return;
    carousel.scrollTo({ left: card.offsetLeft - carousel.offsetLeft, behavior: 'smooth' });
    setForYouSlide(index);
  };

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
    <div
      className="relative min-h-screen overflow-hidden pb-6"
      style={{
        background:
          'linear-gradient(180deg, #EAF3FF 0%, #F7FAFF 22%, #FFFFFF 48%, #FAFAFF 74%, #FFFFFF 100%)',
      }}
    >
      {/* Background Decorative Blobs */}
      <div className="pointer-events-none absolute right-[-120px] top-[-100px] h-[300px] w-[300px] rounded-full bg-[#CFE4FF]/45 blur-[76px]" />
      <div className="pointer-events-none absolute left-[-150px] top-[430px] h-[340px] w-[340px] rounded-full bg-[#DDD6FF]/30 blur-[88px]" />
      <div className="pointer-events-none absolute right-[-150px] top-[820px] h-[320px] w-[320px] rounded-full bg-[#CAE9FF]/28 blur-[90px]" />

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
            <button
              aria-label="Notifications"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/90 bg-white/82 shadow-[0_14px_28px_rgba(42,48,90,0.12),0_6px_14px_rgba(84,75,187,0.09),inset_0_1px_0_rgba(255,255,255,0.98)] backdrop-blur-xl transition active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5840D4]"
            >
              <Bell className="w-[18px] h-[18px] text-[#5840D4]" strokeWidth={2} />
            </button>
            <button
              aria-label="Open teacher profile"
              onClick={() => navigate('/home/profile')}
              className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-white bg-[linear-gradient(145deg,#F1EDFF_0%,#DED7FF_100%)] text-[13px] font-extrabold text-[#5840D4] shadow-[0_14px_28px_rgba(42,48,90,0.14),0_6px_14px_rgba(84,75,187,0.12),inset_0_1px_0_rgba(255,255,255,0.96)] transition active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5840D4]"
            >
              AP
            </button>
          </div>
        </div>

        {/* Streak Section */}
        <div className="mx-6 mb-6">
          <div
            className="relative overflow-hidden rounded-[22px] border-[1.5px] border-[#D5D2EA]/75 bg-white/74 shadow-[0_18px_38px_rgba(42,48,90,0.10),0_7px_18px_rgba(84,75,187,0.08),inset_0_1px_0_rgba(255,255,255,0.98)] backdrop-blur-xl"
          >
            <div className="pointer-events-none absolute -right-16 -top-20 h-44 w-44 rounded-full bg-[#D7E8FF]/46 blur-3xl" />
            <div className="pointer-events-none absolute inset-[1px] rounded-[20px] ring-1 ring-inset ring-[#DCD9F3]/45" />
            <div
              onClick={() => navigate('/home/voice-orb')}
              className="relative cursor-pointer px-4 pb-4 pt-4 transition active:scale-[0.99]"
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
          <motion.button
            onClick={() => navigate('/home/dopa-meter')}
            whileTap={shouldReduceMotion ? undefined : { scale: 0.985, y: 1 }}
            transition={{ type: 'spring', stiffness: 520, damping: 34 }}
            className="relative h-[128px] w-full overflow-hidden rounded-[22px] border border-white/55 text-left shadow-[0_20px_38px_rgba(42,48,90,0.17),0_10px_24px_rgba(84,75,187,0.16),inset_0_1px_0_rgba(255,255,255,0.26)] transition active:scale-[0.99]"
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
                  <div className="pointer-events-none absolute -right-8 -top-14 h-36 w-36 rounded-full bg-white/12 blur-2xl" />
                  <div className="pointer-events-none absolute left-[-20px] top-[-36px] h-24 w-40 rotate-[-12deg] bg-[linear-gradient(100deg,transparent,rgba(255,255,255,0.10),transparent)] blur-xl" />
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
          </motion.button>
        </div>

        {/* All Sessions */}
        <div className="mx-6 mb-7">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2.5">
              <span className="h-5 w-1 rounded-full bg-[linear-gradient(180deg,#7659E8_0%,#4C8AF2_100%)] shadow-[0_4px_10px_rgba(88,64,212,0.22)]" aria-hidden="true" />
              <h2 className="text-[18px] font-bold text-[#2D2E34] leading-7" style={{ fontFamily: 'Inter, sans-serif' }}>
                All Sessions
              </h2>
            </div>
            <button className="text-[10px] font-bold text-[#544BBB] uppercase tracking-[0.4px] leading-3" style={{ fontFamily: 'Inter, sans-serif' }}>
              VIEW ALL
            </button>
          </div>

          <div className="flex gap-4">
            {/* Root Chakra Card */}
            <motion.button
              onClick={() => navigate('/home/chakra-meditation/root')}
              whileTap={shouldReduceMotion ? undefined : { scale: 0.975, y: 1 }}
              transition={{ type: 'spring', stiffness: 520, damping: 34 }}
              className="relative flex min-h-[146px] flex-1 flex-col overflow-hidden rounded-[22px] border-[1.5px] border-[#D7D4EB]/75 bg-white/76 p-4 text-left shadow-[0_16px_34px_rgba(42,48,90,0.10),0_7px_17px_rgba(84,75,187,0.08),inset_0_1px_0_rgba(255,255,255,0.98)] backdrop-blur-xl transition active:scale-[0.985]"
            >
              <div className="pointer-events-none absolute -right-10 -top-12 h-28 w-28 rounded-full bg-[#DED8FF]/42 blur-2xl" />
              <div className="relative mb-5 flex items-start justify-between">
                <div className="h-11 w-11 overflow-hidden rounded-full border-2 border-white bg-[#E8E4FA] shadow-[0_9px_18px_rgba(84,75,187,0.14),inset_0_1px_0_rgba(255,255,255,0.92)]">
                  <img src={rootChakraImage} alt="" className="h-full w-full object-cover" />
                </div>
                <div className="rounded-full border border-white/90 bg-[#F0EDFF]/78 px-2.5 py-1 shadow-[0_5px_12px_rgba(84,75,187,0.07)]">
                  <span className="text-[10px] font-bold text-[#5840D4] uppercase tracking-[0px] leading-3" style={{ fontFamily: 'Inter, sans-serif' }}>
                    MEDITATION
                  </span>
                </div>
              </div>

              <div className="relative flex flex-1 flex-col justify-end">
                <h4 className="text-[14px] font-bold text-[#2D2E34] leading-5 mb-3" style={{ fontFamily: 'Inter, sans-serif' }}>
                  Root Chakra
                </h4>
                <div className="mb-2 flex items-center justify-between text-[12px]">
                  <span className="rounded-full border border-white/90 bg-white/70 px-2 py-0.5 font-bold text-[#666979] shadow-[0_4px_10px_rgba(84,75,187,0.06)]" style={{ fontFamily: 'Inter, sans-serif' }}>
                    18 MIN
                  </span>
                  <span className="rounded-full bg-[#ECE8FF]/80 px-2 py-0.5 font-extrabold text-[#5840D4]" style={{ fontFamily: 'Inter, sans-serif' }}>
                    75%
                  </span>
                </div>
                <div className="bg-[#E8E7F1] h-1.5 rounded-full overflow-hidden">
                  <div
                    className="relative h-full overflow-hidden rounded-full"
                    style={{
                      width: '75%',
                      backgroundImage: 'linear-gradient(152.195deg, rgb(88, 64, 212) 3.9747%, rgb(0, 153, 191) 111.33%)',
                    }}
                  >
                    <motion.span
                      aria-hidden="true"
                      className="absolute inset-y-0 left-[-45%] w-[42%] skew-x-[-18deg] bg-gradient-to-r from-transparent via-white/75 to-transparent"
                      initial={false}
                      animate={shouldReduceMotion ? { opacity: 0 } : { x: ['0%', '360%'], opacity: [0, 0.85, 0] }}
                      transition={{ duration: 1.25, delay: 0.55, ease: 'easeOut' }}
                    />
                  </div>
                </div>
              </div>
            </motion.button>

            {/* Sacral Chakra Card */}
            <motion.button
              onClick={() => navigate('/home/chakra-meditation/sacral')}
              whileTap={shouldReduceMotion ? undefined : { scale: 0.975, y: 1 }}
              transition={{ type: 'spring', stiffness: 520, damping: 34 }}
              className="relative flex min-h-[146px] flex-1 flex-col overflow-hidden rounded-[22px] border-[1.5px] border-[#D7D4EB]/75 bg-white/76 p-4 text-left shadow-[0_16px_34px_rgba(42,48,90,0.10),0_7px_17px_rgba(84,75,187,0.08),inset_0_1px_0_rgba(255,255,255,0.98)] backdrop-blur-xl transition active:scale-[0.985]"
            >
              <div className="pointer-events-none absolute -right-10 -top-12 h-28 w-28 rounded-full bg-[#D2ECFF]/46 blur-2xl" />
              <div className="relative mb-5 flex items-start justify-between">
                <div className="h-11 w-11 overflow-hidden rounded-full border-2 border-white bg-[#F3E4CC] shadow-[0_9px_18px_rgba(124,97,58,0.12),inset_0_1px_0_rgba(255,255,255,0.92)]">
                  <img src={sacralChakraImage} alt="" className="h-full w-full object-cover" />
                </div>
                <div className="rounded-full border border-white/90 bg-[#F0EDFF]/78 px-2.5 py-1 shadow-[0_5px_12px_rgba(84,75,187,0.07)]">
                  <span className="text-[10px] font-bold text-[#5840D4] uppercase tracking-[0px] leading-3" style={{ fontFamily: 'Inter, sans-serif' }}>
                    MEDITATION
                  </span>
                </div>
              </div>

              <div className="relative flex flex-1 flex-col justify-end">
                <h4 className="text-[14px] font-bold text-[#2D2E34] leading-5 mb-3" style={{ fontFamily: 'Inter, sans-serif' }}>
                  Sacral Chakra
                </h4>
                <div className="mb-2 flex items-center justify-between text-[12px]">
                  <span className="rounded-full border border-white/90 bg-white/70 px-2 py-0.5 font-bold text-[#666979] shadow-[0_4px_10px_rgba(84,75,187,0.06)]" style={{ fontFamily: 'Inter, sans-serif' }}>
                    15 MIN
                  </span>
                  <span className="rounded-full bg-[#ECE8FF]/80 px-2 py-0.5 font-extrabold text-[#5840D4]" style={{ fontFamily: 'Inter, sans-serif' }}>
                    30%
                  </span>
                </div>
                <div className="bg-[#E8E7F1] h-1.5 rounded-full overflow-hidden">
                  <div
                    className="relative h-full overflow-hidden rounded-full"
                    style={{
                      width: '30%',
                      backgroundImage: 'linear-gradient(127.173deg, rgb(88, 64, 212) 3.9747%, rgb(0, 153, 191) 111.33%)',
                    }}
                  >
                    <motion.span
                      aria-hidden="true"
                      className="absolute inset-y-0 left-[-45%] w-[42%] skew-x-[-18deg] bg-gradient-to-r from-transparent via-white/75 to-transparent"
                      initial={false}
                      animate={shouldReduceMotion ? { opacity: 0 } : { x: ['0%', '360%'], opacity: [0, 0.85, 0] }}
                      transition={{ duration: 1.25, delay: 0.72, ease: 'easeOut' }}
                    />
                  </div>
                </div>
              </div>
            </motion.button>
          </div>
        </div>

        {/* For You */}
        <div className="ml-6">
          <div className="mr-6 flex items-center justify-between mb-4">
            <div className="flex items-center gap-2.5">
              <span className="h-5 w-1 rounded-full bg-[linear-gradient(180deg,#7659E8_0%,#4C8AF2_100%)] shadow-[0_4px_10px_rgba(88,64,212,0.22)]" aria-hidden="true" />
              <h2 className="text-[18px] font-bold text-[#2D2E34] leading-7" style={{ fontFamily: 'Inter, sans-serif' }}>
                For You
              </h2>
            </div>
            <button className="text-[10px] font-bold text-[#5840D4] uppercase tracking-[0.4px] leading-3" style={{ fontFamily: 'Inter, sans-serif' }}>
              VIEW ALL
            </button>
          </div>

          <div
            ref={forYouRef}
            onScroll={updateForYouSlide}
            className="scrollbar-hide -my-8 flex snap-x snap-mandatory gap-3 overflow-x-auto overscroll-x-contain py-8 pr-6 scroll-smooth"
            aria-label="For You carousel"
          >
            <motion.div
              role="button"
              tabIndex={0}
              onClick={() => navigate('/home/chakra-meditation')}
              onKeyDown={(event) => {
                if (event.key === 'Enter' || event.key === ' ') navigate('/home/chakra-meditation');
              }}
              whileTap={shouldReduceMotion ? undefined : { scale: 0.985, y: 1 }}
              transition={{ type: 'spring', stiffness: 520, damping: 34 }}
              className="h-[232px] w-[321px] shrink-0 snap-start cursor-pointer overflow-hidden rounded-[22px] bg-white"
              style={{
                boxShadow:
                  '0 8px 22px rgba(42,48,90,0.08), 0 3px 10px rgba(84,75,187,0.065), inset 0 1px 0 rgba(255,255,255,0.96)',
                border: '1.5px solid rgba(188,183,232,0.78)',
              }}
            >
              <div
                className="relative h-[108px] overflow-hidden"
                style={{
                  background: 'linear-gradient(135deg, #E8ECFE 0%, #BFD8FF 52%, #8171F2 100%)',
                }}
              >
                <div className="absolute left-3 top-3 z-10 rounded-full border border-white/80 bg-white/82 px-3 py-1 shadow-[0_7px_16px_rgba(42,48,90,0.10)] backdrop-blur-md">
                  <span className="text-[10px] font-extrabold uppercase tracking-[0.45px] text-[#5B4FDB]" style={{ fontFamily: 'Inter, sans-serif' }}>
                    Recommended
                  </span>
                </div>
                <img
                  src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
                  alt=""
                  onError={(event) => {
                    event.currentTarget.style.display = 'none';
                  }}
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(21,26,77,0.02)_0%,rgba(21,26,77,0.04)_50%,rgba(21,26,77,0.20)_100%)]" />
                <div className="absolute inset-x-0 bottom-0 h-px bg-white/70" />
              </div>

              <div className="bg-white px-5 py-3">
                <h3 className="text-[18px] leading-6 text-[#2D2E34]" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 850 }}>
                  Chakra Reset Series
                </h3>
                <p className="mt-1 text-[12px] font-extrabold uppercase tracking-[0.5px] text-[#6D55D8]" style={{ fontFamily: 'Inter, sans-serif' }}>
                  PERSONALISED FOR YOU • 7 SESSIONS
                </p>
                <button
                  onClick={(event) => {
                    event.stopPropagation();
                    navigate('/home/chakra-meditation');
                  }}
                  className="mt-2.5 flex h-10 w-full items-center justify-center rounded-full text-center"
                  style={{
                    background: 'linear-gradient(135deg, #8171F2 0%, #5B4FDB 52%, #4D86F7 100%)',
                    boxShadow: '0 12px 22px rgba(42,48,90,0.16), 0 10px 20px rgba(84,75,187,0.25), inset 0 1px 0 rgba(255,255,255,0.30)',
                  }}
                >
                  <span className="text-[14px] font-extrabold leading-5 text-white" style={{ fontFamily: 'Inter, sans-serif' }}>
                    Begin
                  </span>
                </button>
              </div>
            </motion.div>

            <PersonalLibraryCard kind="favourites" onClick={() => navigate('/home/explore/favourites')} />
            <PersonalLibraryCard kind="downloads" onClick={() => navigate('/home/explore/downloads')} />
          </div>

          <div className="mr-6 mt-1 flex h-8 items-center justify-center gap-2" aria-label={`Slide ${forYouSlide + 1} of 3`}>
            {[0, 1, 2].map((index) => (
              <button
                key={index}
                type="button"
                aria-label={`Go to slide ${index + 1}`}
                onClick={() => goToForYouSlide(index)}
                className="flex h-8 w-8 items-center justify-center rounded-full"
              >
                <span className={`h-2 rounded-full transition-all ${forYouSlide === index ? 'w-6 bg-[#5840D4]' : 'w-2 bg-[#CBC7DF]'}`} />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
