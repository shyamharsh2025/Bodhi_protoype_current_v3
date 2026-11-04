import { Bell, Search, SlidersHorizontal, Plus, Target, BookOpen, Bookmark, Play, Eye, Heart, ShieldCheck } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import { useNavigate, useSearchParams } from 'react-router';

const sectionVariants = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0 },
};

const tapTransition = { type: 'spring', stiffness: 520, damping: 34 };

export default function ExploreScreen() {
  const navigate = useNavigate();
  const shouldReduceMotion = useReducedMotion();
  const [searchParams] = useSearchParams();
  const assignmentTarget = searchParams.get('assign');
  const selectedCount = Number(searchParams.get('count') || '0');
  const resolvedSelectedCount = selectedCount > 0 ? selectedCount : 1;
  const replaceExisting = searchParams.get('replace') === '1';
  const isClassAssignment = assignmentTarget === 'class';
  const isStudentAssignment = assignmentTarget === 'students';
  const isAssignmentMode = isClassAssignment || isStudentAssignment;
  const assignmentQuery = isStudentAssignment
    ? `?assign=students&count=${resolvedSelectedCount}${replaceExisting ? '&replace=1' : ''}`
    : isClassAssignment
      ? '?assign=class'
      : '';
  const assignmentContext = isStudentAssignment
    ? `Assigning to ${resolvedSelectedCount} ${resolvedSelectedCount === 1 ? 'student' : 'students'}`
    : 'Assigning to Grade 8A';
  const openPlaylist = () => navigate(`/home/chakra-meditation${assignmentQuery}`);
  const openRootChakra = () => navigate(`/home/chakra-meditation/root${assignmentQuery}`);
  const openFocusPlaylist = () => navigate('/home/focus-concentration');
  const openEmotionalPlaylist = () => navigate('/home/emotional-wellbeing');
  const openAwarenessPlaylist = () => navigate('/home/awareness-observation');
  const openRegulationPlaylist = () => navigate('/home/regulation-control');

  const categories = [
    {
      title: 'Focus & Concentration',
      img: 'https://images.unsplash.com/photo-1499209974431-9dddcece7f88?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600',
      tint: 'from-[#2F2A66]/38 via-[#5840D4]/24 to-[#151A4D]/54',
      icon: Target,
    },
    {
      title: 'Awareness and Observation',
      img: 'https://images.unsplash.com/photo-1532978879514-6cb1a2da6f04?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600',
      tint: 'from-[#1E2A78]/34 via-[#5840D4]/20 to-[#10122B]/56',
      icon: Eye,
    },
    {
      title: 'Emotional Wellbeing',
      img: 'https://images.unsplash.com/photo-1500964757637-c85e8a162699?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600',
      tint: 'from-[#3D5A4F]/32 via-[#5840D4]/18 to-[#10122B]/54',
      icon: Heart,
    },
    {
      title: 'Regulation and Control',
      img: 'https://images.unsplash.com/photo-1518604666860-9ed391f76460?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600',
      tint: 'from-[#0E5D7C]/30 via-[#5840D4]/20 to-[#10122B]/54',
      icon: ShieldCheck,
    },
  ];

  const chakras = [
    { title: 'Root Chakra', minutes: 16, path: '/home/chakra-meditation/root' },
    { title: 'Sacral Chakra', minutes: 15, path: '/home/chakra-meditation/sacral' },
  ];

  return (
    <div
      className="relative min-h-screen overflow-hidden pb-32"
      style={{
        background:
          'linear-gradient(180deg, #EAF3FF 0%, #F7FAFF 22%, #FFFFFF 45%, #FFFFFF 100%)',
      }}
    >
      <div className="pointer-events-none absolute right-[-130px] top-[-92px] h-[270px] w-[270px] rounded-full bg-[#CFE4FF]/38 blur-[72px]" />

      <motion.div
        className="relative z-10 px-5 pt-3"
        initial={shouldReduceMotion ? false : 'hidden'}
        animate="visible"
        transition={shouldReduceMotion ? { duration: 0 } : { staggerChildren: 0.045, delayChildren: 0.02 }}
      >
        {/* Header */}
        <motion.div variants={sectionVariants} transition={{ duration: 0.28, ease: 'easeOut' }} className="flex items-start justify-between mb-6 pt-1">
          <div>
            <h1 style={{ color: '#5B4FDB', fontFamily: 'Inter, sans-serif', fontWeight: 850, fontSize: 28, lineHeight: '32px', letterSpacing: '-0.45px' }}>
              {isAssignmentMode ? 'Choose Meditation' : 'Hey Anusha'}
            </h1>
            <p style={{ color: '#25263A', fontFamily: 'Inter, sans-serif', fontWeight: 650, fontSize: 15, marginTop: 2 }}>
              {isAssignmentMode ? assignmentContext : 'Explore'}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <motion.button
              aria-label="Notifications"
              whileTap={shouldReduceMotion ? undefined : { scale: 0.94 }}
              transition={tapTransition}
              className="w-12 h-12 rounded-full bg-white/94 flex items-center justify-center border border-white/90 cursor-pointer"
              style={{ boxShadow: '0 16px 30px rgba(42,48,90,0.16), 0 6px 16px rgba(84,75,187,0.14), inset 0 1px 0 rgba(255,255,255,0.96)' }}
            >
              <Bell className="w-6 h-6" style={{ color: '#5B4FDB' }} strokeWidth={2.35} />
            </motion.button>
            <div
              className="w-12 h-12 rounded-full overflow-hidden"
              style={{ boxShadow: '0 14px 28px rgba(42,48,90,0.18), 0 6px 16px rgba(84,75,187,0.14)', border: '2px solid white' }}
            >
              <img
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=200"
                alt="avatar"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </motion.div>

        {/* Search */}
        <motion.div variants={sectionVariants} transition={{ duration: 0.28, ease: 'easeOut' }} className="relative mb-6">
          <input
            type="text"
            placeholder="Search"
            className="w-full pl-6 pr-24 py-4 rounded-[26px] bg-white/94 text-[16px] focus:outline-none"
            style={{
              fontFamily: 'Inter, sans-serif',
              color: '#2d2e34',
              border: '1px solid rgba(226,230,242,0.95)',
              boxShadow: '0 18px 34px rgba(42,48,90,0.14), 0 8px 18px rgba(84,75,187,0.10), inset 0 1px 0 rgba(255,255,255,0.94)',
            }}
          />
          <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-3">
            <SlidersHorizontal className="w-6 h-6" style={{ color: '#5B4FDB' }} strokeWidth={2.35} />
            <Search className="w-6 h-6" style={{ color: '#5B4FDB' }} strokeWidth={2.35} />
          </div>
        </motion.div>

        {!isAssignmentMode && (
          <motion.div variants={sectionVariants} transition={{ duration: 0.28, ease: 'easeOut' }} className="grid grid-cols-4 gap-3 mb-8">
            <CircleAction label="Your Stack" onClick={() => navigate('/home/sessions')}>
              <Plus className="w-7 h-7" style={{ color: '#5B4FDB' }} strokeWidth={2.5} />
            </CircleAction>
            <CircleAction label="Meditation" onClick={openPlaylist}>
              <MeditationPoseIcon />
            </CircleAction>
            <CircleAction label="Focus Sprint" onClick={() => navigate('/home/focus-sprint')}>
              <FocusSprintIcon />
            </CircleAction>
            <CircleAction label="Journal" onClick={() => navigate('/home/explore/thought-bank')}>
              <BookOpen className="w-7 h-7" style={{ color: '#5B4FDB' }} strokeWidth={2.45} />
            </CircleAction>
          </motion.div>
        )}

        {/* For You */}
        <motion.div variants={sectionVariants} transition={{ duration: 0.28, ease: 'easeOut' }}>
          <SectionHeader
            title="For You"
            action="VIEW ALL"
            onAction={isAssignmentMode ? openPlaylist : () => navigate('/home/explore/new-for-you')}
          />
        </motion.div>

        <motion.button
          onClick={openPlaylist}
          variants={sectionVariants}
          whileTap={shouldReduceMotion ? undefined : { scale: 0.985, y: 1 }}
          transition={tapTransition}
          className="w-full text-left rounded-[22px] bg-white overflow-hidden mb-8 cursor-pointer"
          style={{
            boxShadow:
              '0 18px 38px rgba(42,48,90,0.15), 0 8px 18px rgba(84,75,187,0.13), inset 0 1px 0 rgba(255,255,255,0.96)',
            border: '1.5px solid rgba(188,183,232,0.78)',
          }}
        >
          <div>
            <div
              className="relative w-full overflow-hidden"
              style={{
                height: 138,
                background: 'linear-gradient(135deg, #E8ECFE 0%, #BFD8FF 52%, #8171F2 100%)',
              }}
            >
              <img
                src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
                alt=""
                onError={(event) => {
                  event.currentTarget.style.display = 'none';
                }}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(21,26,77,0.02)_0%,rgba(21,26,77,0.04)_50%,rgba(21,26,77,0.20)_100%)]" />
              <div className="absolute inset-x-0 bottom-0 h-px bg-white/70" />
            </div>
          </div>
          <div className="px-5 pt-4 pb-4 bg-white">
            <h3 style={{ color: '#2d2e34', fontFamily: 'Inter, sans-serif', fontWeight: 850, fontSize: 18, lineHeight: '24px' }}>
              {isAssignmentMode ? 'Assign Chakra Reset Series' : 'Chakra Reset Series'}
            </h3>
            <p style={{ color: '#6D55D8', fontFamily: 'Inter, sans-serif', fontWeight: 800, fontSize: 12, letterSpacing: '0.5px', marginTop: 4 }}>
              SERIES • 7 SESSION
            </p>
            <div
              className="mt-3.5 w-full h-[44px] rounded-full flex items-center justify-center"
              style={{
                background: 'linear-gradient(135deg, #8171F2 0%, #5B4FDB 52%, #4D86F7 100%)',
                boxShadow: '0 12px 22px rgba(42,48,90,0.16), 0 10px 20px rgba(84,75,187,0.25), inset 0 1px 0 rgba(255,255,255,0.30)',
              }}
            >
              <span className="text-white" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 800, fontSize: 14 }}>
                {isAssignmentMode ? 'Choose Series' : 'Begin'}
              </span>
            </div>
          </div>
        </motion.button>

        {/* Browse Categories */}
        <motion.h2
          variants={sectionVariants}
          transition={{ duration: 0.28, ease: 'easeOut' }}
          className="mb-3"
          style={{ color: '#2d2e34', fontFamily: 'Inter, sans-serif', fontWeight: 850, fontSize: 20, letterSpacing: '-0.25px' }}
        >
          Browse Categories
        </motion.h2>
        <motion.div variants={sectionVariants} transition={{ duration: 0.28, ease: 'easeOut' }} className="grid grid-cols-2 gap-3 mb-7">
          {categories.map((c) => (
            <CategoryCard
              key={c.title}
              category={c}
              onClick={
                c.title === 'Focus & Concentration'
                  ? openFocusPlaylist
                  : c.title === 'Emotional Wellbeing'
                    ? openEmotionalPlaylist
                    : c.title === 'Awareness and Observation'
                      ? openAwarenessPlaylist
                      : c.title === 'Regulation and Control'
                        ? openRegulationPlaylist
                        : openRootChakra
              }
            />
          ))}
        </motion.div>

        {/* Chakra Reset Series list */}
        <motion.div variants={sectionVariants} transition={{ duration: 0.28, ease: 'easeOut' }}>
          <SectionHeader title="Chakra Reset Series" action="VIEW ALL" onAction={openPlaylist} />
        </motion.div>

        <motion.div variants={sectionVariants} transition={{ duration: 0.28, ease: 'easeOut' }} className="flex flex-col gap-3">
          {chakras.map((item) => (
            <motion.button
              key={item.title}
              onClick={() => navigate(`${item.path}${assignmentQuery}`)}
              whileTap={shouldReduceMotion ? undefined : { scale: 0.985, y: 1 }}
              transition={tapTransition}
              className="w-full rounded-[22px] p-3.5 flex items-center gap-3 text-left cursor-pointer"
              style={{
                background: 'linear-gradient(135deg, rgba(255,255,255,0.97) 0%, rgba(248,250,255,0.94) 58%, rgba(240,246,255,0.9) 100%)',
                boxShadow: '0 20px 38px rgba(42,48,90,0.13), 0 10px 24px rgba(84,75,187,0.12), inset 0 1px 0 rgba(255,255,255,0.92)',
                border: '1.5px solid rgba(198,202,222,0.88)',
              }}
            >
              <div
                className="w-14 h-14 rounded-full flex items-center justify-center shrink-0 border-2 border-white"
                style={{
                  background: 'linear-gradient(135deg, #F4F1FF 0%, #DAD2FF 100%)',
                  boxShadow: '0 12px 22px rgba(42,48,90,0.12), 0 8px 16px rgba(84,75,187,0.12)',
                }}
              >
                <LotusIcon small />
              </div>
              <div className="flex-1 min-w-0">
                <p style={{ color: '#2d2e34', fontFamily: 'Inter, sans-serif', fontWeight: 800, fontSize: 15 }}>
                  {item.title}
                </p>
                <p style={{ color: '#9A98B8', fontFamily: 'Inter, sans-serif', fontWeight: 500, fontSize: 12, marginTop: 1 }}>
                  {item.minutes} min
                </p>
              </div>
              <span className="w-9 h-9 rounded-full flex items-center justify-center" aria-hidden="true">
                <Bookmark className="w-5 h-5" style={{ color: '#5B4FDB' }} />
              </span>
              <span
                className="w-11 h-11 rounded-full flex items-center justify-center shrink-0"
                style={{
                  background: 'linear-gradient(135deg, #8171F2 0%, #5B4FDB 58%, #4D86F7 100%)',
                  boxShadow: '0 14px 24px rgba(42,48,90,0.18), 0 10px 20px rgba(84,75,187,0.28)',
                }}
                aria-hidden="true"
              >
                <Play className="w-4 h-4 text-white" fill="white" />
              </span>
            </motion.button>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
}

function CategoryCard({
  category,
  onClick,
}: {
  category: { title: string; img: string; tint: string; icon: LucideIcon };
  onClick: () => void;
}) {
  const Icon = category.icon;
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.button
      onClick={onClick}
      whileTap={shouldReduceMotion ? undefined : { scale: 0.975, y: 1 }}
      transition={tapTransition}
      className="relative overflow-hidden rounded-[18px] text-left cursor-pointer"
      style={{
        aspectRatio: '1.35 / 1',
        boxShadow: '0 20px 34px rgba(42,48,90,0.20), 0 9px 18px rgba(84,75,187,0.14), inset 0 1px 0 rgba(255,255,255,0.46)',
        border: '1.25px solid rgba(255,255,255,0.88)',
      }}
    >
      <div className="absolute inset-0 bg-[linear-gradient(135deg,#DCD6FF_0%,#8FB7FF_48%,#5840D4_100%)]" />
      <img
        src={category.img}
        alt=""
        onError={(event) => {
          event.currentTarget.style.display = 'none';
        }}
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className={`absolute inset-0 bg-gradient-to-br ${category.tint}`} />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(16,18,43,0.06)_0%,rgba(16,18,43,0.34)_58%,rgba(16,18,43,0.67)_100%)]" />
      <div className="absolute inset-0 ring-1 ring-inset ring-white/24" />
      <div
        className="absolute right-2.5 top-2.5 flex h-10 w-10 items-center justify-center rounded-full bg-white/95"
        style={{ boxShadow: '0 12px 20px rgba(16,18,43,0.24), inset 0 1px 0 rgba(255,255,255,0.9)' }}
      >
        <Icon className="h-5 w-5 text-[#5B4FDB]" strokeWidth={2.5} />
      </div>
      <div className="absolute inset-x-0 bottom-0 p-3.5">
        <p className="text-white drop-shadow-sm" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 800, fontSize: 15, lineHeight: '18px' }}>
          {category.title}
        </p>
      </div>
    </motion.button>
  );
}

function CircleAction({ label, onClick, children }: { label: string; onClick: () => void; children: React.ReactNode }) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.button
      onClick={onClick}
      whileTap={shouldReduceMotion ? undefined : { scale: 0.94, y: 1 }}
      transition={tapTransition}
      className="flex flex-col items-center gap-2 cursor-pointer"
    >
      <div
        className="w-[68px] h-[68px] rounded-full bg-white flex items-center justify-center"
        style={{
          border: '4px solid rgba(116,101,232,0.92)',
          boxShadow: '0 20px 32px rgba(42,48,90,0.18), 0 12px 24px rgba(84,75,187,0.27), inset 0 2px 0 rgba(255,255,255,0.98)',
        }}
      >
        {children}
      </div>
      <span className="whitespace-nowrap" style={{ color: '#686A73', fontFamily: 'Inter, sans-serif', fontWeight: 750, fontSize: 12 }}>
        {label}
      </span>
    </motion.button>
  );
}

function SectionHeader({ title, action, onAction }: { title: string; action: string; onAction: () => void }) {
  return (
    <div className="flex items-center justify-between mb-3.5">
      <h2 style={{ color: '#2d2e34', fontFamily: 'Inter, sans-serif', fontWeight: 850, fontSize: 20, letterSpacing: '-0.25px' }}>
        {title}
      </h2>
      <button onClick={onAction} className="min-h-9 px-1" style={{ color: '#5B4FDB', fontFamily: 'Inter, sans-serif', fontWeight: 800, fontSize: 12, letterSpacing: '0.5px' }}>
        {action}
      </button>
    </div>
  );
}

function LotusIcon({ small = false }: { small?: boolean }) {
  const size = small ? 22 : 26;
  return (
    <svg width={size} height={size} viewBox="0 0 26 26" fill="none">
      <path d="M13 4 C 11 10, 11 14, 13 19 C 15 14, 15 10, 13 4 Z" stroke="#5B4FDB" strokeWidth="1.8" fill="none" />
      <path d="M5 11 C 7 13, 10 17, 13 19 C 12 16, 9 13, 5 11 Z" stroke="#5B4FDB" strokeWidth="1.8" fill="none" />
      <path d="M21 11 C 19 13, 16 17, 13 19 C 14 16, 17 13, 21 11 Z" stroke="#5B4FDB" strokeWidth="1.8" fill="none" />
      <path d="M2 15 C 5 17, 10 19, 13 19 C 10 19, 6 18.5, 2 15 Z" stroke="#5B4FDB" strokeWidth="1.6" fill="none" opacity="0.85" />
      <path d="M24 15 C 21 17, 16 19, 13 19 C 16 19, 20 18.5, 24 15 Z" stroke="#5B4FDB" strokeWidth="1.6" fill="none" opacity="0.85" />
    </svg>
  );
}

function MeditationPoseIcon() {
  return (
    <svg width="30" height="30" viewBox="0 0 30 30" fill="none" aria-hidden="true">
      <circle cx="15" cy="8" r="3.1" fill="#5B4FDB" />
      <path
        d="M15 12.5C12.5 12.5 10.6 14.2 10.6 16.5V20.5H19.4V16.5C19.4 14.2 17.5 12.5 15 12.5Z"
        fill="#5B4FDB"
      />
      <path
        d="M10.8 20.2C8.2 20.6 6.2 22 5.3 24.3M19.2 20.2C21.8 20.6 23.8 22 24.7 24.3M9 24.2H21"
        stroke="#5B4FDB"
        strokeWidth="2.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11.5 16.5C9.7 16.4 8.1 15.5 7.1 14.1M18.5 16.5C20.3 16.4 21.9 15.5 22.9 14.1"
        stroke="#5B4FDB"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function FocusSprintIcon() {
  return (
    <svg width="30" height="30" viewBox="0 0 30 30" fill="none" aria-hidden="true">
      <path d="M9 5.5H6.5C5.95 5.5 5.5 5.95 5.5 6.5V9" stroke="#5B4FDB" strokeWidth="2.4" strokeLinecap="round" />
      <path d="M21 5.5H23.5C24.05 5.5 24.5 5.95 24.5 6.5V9" stroke="#5B4FDB" strokeWidth="2.4" strokeLinecap="round" />
      <path d="M9 24.5H6.5C5.95 24.5 5.5 24.05 5.5 23.5V21" stroke="#5B4FDB" strokeWidth="2.4" strokeLinecap="round" />
      <path d="M21 24.5H23.5C24.05 24.5 24.5 24.05 24.5 23.5V21" stroke="#5B4FDB" strokeWidth="2.4" strokeLinecap="round" />
      <circle cx="15" cy="15" r="4.2" stroke="#5B4FDB" strokeWidth="2.4" />
      <circle cx="15" cy="15" r="1.7" fill="#5B4FDB" />
    </svg>
  );
}
