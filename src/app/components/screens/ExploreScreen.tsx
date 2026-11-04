import { Bell, Search, SlidersHorizontal, Plus, Target, BookOpen, Bookmark, Play } from 'lucide-react';
import { useNavigate } from 'react-router';

export default function ExploreScreen() {
  const navigate = useNavigate();

  const categories = [
    {
      title: 'Focus & Concentration',
      img: 'https://images.unsplash.com/photo-1499209974431-9dddcece7f88?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600',
      tint: 'from-[#FFB37A]/40 to-[#FF7E54]/30',
    },
    {
      title: 'Sleep',
      img: 'https://images.unsplash.com/photo-1532978879514-6cb1a2da6f04?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600',
      tint: 'from-[#5C7BD9]/30 to-[#1E2A78]/40',
    },
    {
      title: 'Emotional Wellbeing',
      img: 'https://images.unsplash.com/photo-1500964757637-c85e8a162699?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600',
      tint: 'from-[#3D5A4F]/40 to-[#1E332C]/40',
    },
    {
      title: 'Mindfulness',
      img: 'https://images.unsplash.com/photo-1518604666860-9ed391f76460?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600',
      tint: 'from-[#1F4F4A]/40 to-[#0E2A28]/40',
    },
  ];

  const chakras = [
    { title: 'Root Chakra', minutes: 16 },
    { title: 'Sacral Chakra', minutes: 15 },
  ];

  return (
    <div
      className="min-h-screen pb-32"
      style={{
        background:
          'linear-gradient(180deg, #E8ECFE 0%, #EEF2FF 35%, #F4F1FF 70%, #FAFAFF 100%)',
      }}
    >
      <div className="px-5 pt-3">
        {/* Header */}
        <div className="flex items-start justify-between mb-5">
          <div>
            <h1 style={{ color: '#5B4FDB', fontFamily: 'Inter, sans-serif', fontWeight: 800, fontSize: 26, lineHeight: '30px', letterSpacing: '-0.4px' }}>
              Hey Anusha
            </h1>
            <p style={{ color: '#6b6b8a', fontFamily: 'Inter, sans-serif', fontWeight: 500, fontSize: 14, marginTop: 2 }}>
              Explore
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button className="w-10 h-10 rounded-full bg-white flex items-center justify-center" style={{ boxShadow: '0 4px 12px rgba(91,79,219,0.10)' }}>
              <Bell className="w-5 h-5" style={{ color: '#5B4FDB' }} />
            </button>
            <div
              className="w-10 h-10 rounded-full overflow-hidden"
              style={{ boxShadow: '0 4px 12px rgba(91,79,219,0.20)', border: '2px solid white' }}
            >
              <img
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=200"
                alt="avatar"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Search */}
        <div className="relative mb-6">
          <input
            type="text"
            placeholder="Search"
            className="w-full pl-5 pr-24 py-3.5 rounded-[20px] bg-white text-[14px] focus:outline-none"
            style={{
              fontFamily: 'Inter, sans-serif',
              color: '#2d2e34',
              border: '1px solid rgba(91,79,219,0.10)',
              boxShadow: '0 4px 14px rgba(91,79,219,0.08)',
            }}
          />
          <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-3">
            <SlidersHorizontal className="w-5 h-5" style={{ color: '#9A98B8' }} />
            <Search className="w-5 h-5" style={{ color: '#5B4FDB' }} />
          </div>
        </div>

        {/* Quick action circles */}
        <div className="grid grid-cols-4 gap-2 mb-7">
          <CircleAction label="Your Stack" onClick={() => navigate('/home/sessions')}>
            <Plus className="w-7 h-7" style={{ color: '#5B4FDB' }} strokeWidth={2.5} />
          </CircleAction>
          <CircleAction label="Meditation" onClick={() => navigate('/home/meditation-detail')}>
            <LotusIcon />
          </CircleAction>
          <CircleAction label="Focus Sprint" onClick={() => navigate('/home/focus-sprint')}>
            <Target className="w-7 h-7" style={{ color: '#5B4FDB' }} strokeWidth={2.2} />
          </CircleAction>
          <CircleAction label="Thought Bank" onClick={() => navigate('/home/explore/thought-bank')}>
            <BookOpen className="w-7 h-7" style={{ color: '#5B4FDB' }} strokeWidth={2.2} />
          </CircleAction>
        </div>

        {/* For You */}
        <SectionHeader title="For You" action="VIEW ALL" onAction={() => navigate('/home/explore/new-for-you')} />

        <button
          onClick={() => navigate('/home/meditation-detail')}
          className="w-full text-left rounded-[24px] bg-white overflow-hidden mb-7"
          style={{ boxShadow: '0 10px 26px rgba(91,79,219,0.14)', border: '1px solid rgba(91,79,219,0.08)' }}
        >
          <div className="px-4 pt-4">
            <div
              className="w-full rounded-[18px] overflow-hidden"
              style={{ aspectRatio: '16 / 10' }}
            >
              <img
                src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
                alt="Chakra Reset Series"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <div className="px-5 pt-4 pb-5">
            <h3 style={{ color: '#2d2e34', fontFamily: 'Inter, sans-serif', fontWeight: 800, fontSize: 18 }}>
              Chakra Reset Series
            </h3>
            <p style={{ color: '#9A98B8', fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: 11, letterSpacing: '0.6px', marginTop: 4 }}>
              SERIES • 7 SESSION
            </p>
            <div
              className="mt-4 w-full h-[44px] rounded-full flex items-center justify-center"
              style={{
                background: 'linear-gradient(135deg, #7C6BFF 0%, #5B4FDB 100%)',
                boxShadow: '0 8px 18px rgba(91,79,219,0.35)',
              }}
            >
              <span className="text-white" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: 15 }}>
                Begin
              </span>
            </div>
          </div>
        </button>

        {/* Browse Categories */}
        <h2
          className="mb-3"
          style={{ color: '#2d2e34', fontFamily: 'Inter, sans-serif', fontWeight: 800, fontSize: 18 }}
        >
          Browse Categories
        </h2>
        <div className="grid grid-cols-2 gap-3 mb-7">
          {categories.map((c) => (
            <button
              key={c.title}
              onClick={() => navigate('/home/meditation-detail')}
              className="relative rounded-[18px] overflow-hidden text-left"
              style={{ aspectRatio: '1.35 / 1', boxShadow: '0 6px 16px rgba(91,79,219,0.12)' }}
            >
              <img src={c.img} alt={c.title} className="absolute inset-0 w-full h-full object-cover" />
              <div className={`absolute inset-0 bg-gradient-to-br ${c.tint}`} />
              <div className="absolute inset-0 bg-black/30" />
              <div className="absolute top-2.5 right-2.5 w-7 h-7 rounded-full bg-white/30 backdrop-blur-md flex items-center justify-center">
                <Bookmark className="w-3.5 h-3.5 text-white" fill="white" />
              </div>
              <div className="absolute inset-x-0 bottom-0 p-3">
                <p className="text-white" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 800, fontSize: 14, lineHeight: '17px' }}>
                  {c.title}
                </p>
                <p className="text-white/85" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500, fontSize: 11, marginTop: 2 }}>
                  coming soon
                </p>
              </div>
            </button>
          ))}
        </div>

        {/* Chakra Reset Series list */}
        <SectionHeader title="Chakra Reset Series" action="VIEW ALL" onAction={() => navigate('/home/explore/new-for-you')} />

        <div className="flex flex-col gap-3">
          {chakras.map((item) => (
            <button
              key={item.title}
              onClick={() => navigate('/home/meditation-detail')}
              className="w-full bg-white rounded-[20px] p-3 flex items-center gap-3 text-left"
              style={{ boxShadow: '0 8px 20px rgba(91,79,219,0.10)', border: '1px solid rgba(91,79,219,0.08)' }}
            >
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center shrink-0"
                style={{ background: 'linear-gradient(135deg, #EFEAFF 0%, #DDD3FF 100%)' }}
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
                className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
                style={{
                  background: 'linear-gradient(135deg, #7C6BFF 0%, #5B4FDB 100%)',
                  boxShadow: '0 6px 14px rgba(91,79,219,0.35)',
                }}
                aria-hidden="true"
              >
                <Play className="w-4 h-4 text-white" fill="white" />
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function CircleAction({ label, onClick, children }: { label: string; onClick: () => void; children: React.ReactNode }) {
  return (
    <button onClick={onClick} className="flex flex-col items-center gap-2">
      <div
        className="w-[60px] h-[60px] rounded-full bg-white flex items-center justify-center"
        style={{
          border: '2px solid #5B4FDB',
          boxShadow: '0 6px 14px rgba(91,79,219,0.14)',
        }}
      >
        {children}
      </div>
      <span style={{ color: '#5B4FDB', fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 11 }}>
        {label}
      </span>
    </button>
  );
}

function SectionHeader({ title, action, onAction }: { title: string; action: string; onAction: () => void }) {
  return (
    <div className="flex items-center justify-between mb-3">
      <h2 style={{ color: '#2d2e34', fontFamily: 'Inter, sans-serif', fontWeight: 800, fontSize: 18 }}>
        {title}
      </h2>
      <button onClick={onAction} style={{ color: '#5B4FDB', fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: 11, letterSpacing: '0.6px' }}>
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
