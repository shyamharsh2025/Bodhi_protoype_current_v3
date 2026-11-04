import { ChevronLeft, Search, SlidersHorizontal, Mic, Bookmark, Play } from 'lucide-react';
import { useNavigate } from 'react-router';

export default function NewForYouScreen() {
  const navigate = useNavigate();

  const sessions = [
    { id: 1, title: 'Box Breathing Reset', duration: '4 min' },
    { id: 2, title: 'Intent Set', duration: '2 min' },
    { id: 3, title: 'Box Breathing Reset', duration: '4 min' },
    { id: 4, title: 'Intent Set', duration: '2 min' },
    { id: 5, title: 'Intent Set', duration: '2 min' },
    { id: 6, title: 'Box Breathing Reset', duration: '4 min' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F5F7FA] to-[#EEF2FF] pb-28">
      {/* Header */}
      <div className="px-6 pt-6 pb-4 flex items-center gap-4">
        <button
          onClick={() => navigate('/home/explore')}
          className="w-10 h-10 rounded-full bg-white/60 backdrop-blur-sm flex items-center justify-center shadow-sm"
        >
          <ChevronLeft className="w-6 h-6 text-gray-800" strokeWidth={2.5} />
        </button>
        <h1 className="text-[22px] font-bold text-gray-900">New for You</h1>
      </div>

      {/* Search Bar */}
      <div className="px-6 mb-6">
        <div className="flex gap-3">
          <div className="flex-1 relative">
            <input
              type="text"
              placeholder="Search"
              className="w-full px-5 py-3.5 pr-20 rounded-[24px] bg-white/60 backdrop-blur-sm text-[15px] text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#5B4FDB]/30 shadow-sm"
            />
            <div className="absolute right-5 top-1/2 -translate-y-1/2 flex items-center gap-3">
              <Search className="w-5 h-5 text-gray-400" />
              <SlidersHorizontal className="w-5 h-5 text-gray-400" />
            </div>
          </div>
          <button className="w-14 h-14 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center shadow-sm">
            <Mic className="w-6 h-6 text-[#5B4FDB]" />
          </button>
        </div>
      </div>

      {/* Session List */}
      <div className="px-6 space-y-3">
        {sessions.map((session) => (
          <button
            key={session.id}
            onClick={() => navigate('/home/chakra-meditation/root')}
            className="w-full bg-white/70 backdrop-blur-sm rounded-3xl p-4 shadow-sm flex items-center gap-4 text-left"
          >
            {/* Gradient Orb */}
            <div className="relative w-16 h-16 flex-shrink-0">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#60A5FA] via-[#5B4FDB] to-[#C084FC] blur-md opacity-80"></div>
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#60A5FA] via-[#5B4FDB] to-[#C084FC]"></div>
            </div>

            {/* Session Info */}
            <div className="flex-1">
              <h3 className="text-[17px] font-bold text-gray-900 mb-0.5">
                {session.title}
              </h3>
              <p className="text-[14px] text-gray-600">{session.duration}</p>
            </div>

            {/* Action Icons */}
            <div className="flex items-center gap-3">
              <button
                className="p-2"
                onClick={(e) => {
                  e.stopPropagation();
                  // Handle bookmark action
                }}
              >
                <Bookmark className="w-5 h-5 text-gray-400" strokeWidth={2} />
              </button>
              <button
                className="p-2"
                onClick={(e) => {
                  e.stopPropagation();
                  // Handle play action
                }}
              >
                <Play className="w-5 h-5 text-[#5B4FDB]" strokeWidth={2} fill="#5B4FDB" />
              </button>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
