import { Bell, ArrowUpRight, User } from 'lucide-react';
import { useNavigate } from 'react-router';

export default function SessionsScreen() {
  const navigate = useNavigate();
  return (
    <div className="px-6 pt-4 pb-6">
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-[28px] font-bold text-[#5B4FDB] leading-tight">Hey Anusha</h1>
          <p className="text-[15px] text-gray-600">2 task planned for today</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="w-11 h-11 rounded-full bg-white/60 backdrop-blur-sm flex items-center justify-center shadow-sm">
            <Bell className="w-5 h-5 text-gray-700" />
          </button>
          <div className="w-11 h-11 rounded-full bg-gradient-to-br from-[#5B4FDB] to-[#7C3AED] flex items-center justify-center shadow-sm">
            <User className="w-6 h-6 text-white" />
          </div>
        </div>
      </div>

      {/* Class Status Card */}
      <button
        onClick={() => navigate('/home/sessions/league')}
        className="w-full bg-gradient-to-r from-[#5B4FDB] to-[#3B82F6] rounded-3xl p-6 mb-5 shadow-lg relative overflow-hidden text-left"
      >
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48bGluZWFyR3JhZGllbnQgaWQ9ImciIHgxPSIwJSIgeTE9IjAlIiB4Mj0iMTAwJSIgeTI9IjEwMCUiPjxzdG9wIG9mZnNldD0iMCUiIHN0eWxlPSJzdG9wLWNvbG9yOnJnYigyNTUsMjU1LDI1NSk7c3RvcC1vcGFjaXR5OjAuMSIgLz48c3RvcCBvZmZzZXQ9IjEwMCUiIHN0eWxlPSJzdG9wLWNvbG9yOnJnYigyNTUsMjU1LDI1NSk7c3RvcC1vcGFjaXR5OjAiIC8+PC9saW5lYXJHcmFkaWVudD48L2RlZnM+PHJlY3Qgd2lkdGg9IjIwMCIgaGVpZ2h0PSIyMDAiIGZpbGw9InVybCgjZykiLz48L3N2Zz4=')] opacity-30"></div>
        <div className="relative">
          <div className="flex items-center justify-between mb-4">
            <div className="inline-block px-3 py-1.5 bg-white/25 backdrop-blur-sm rounded-full border border-white/30">
              <span className="text-[11px] font-bold text-white tracking-wider">CLASS STATUS</span>
            </div>
            <div className="text-[32px] font-bold text-white">18/30</div>
          </div>
          <div className="mb-2">
            <p className="text-[14px] text-white/90 mb-2">Classmates finished all tasks</p>
            <div className="relative h-2 bg-white/20 rounded-full overflow-hidden backdrop-blur-sm">
              <div className="absolute inset-y-0 left-0 w-[60%] bg-white rounded-full"></div>
            </div>
          </div>
        </div>
      </button>

      {/* Session Notes Card */}
      <button className="w-full bg-white/60 backdrop-blur-sm rounded-3xl p-5 mb-6 shadow-sm flex items-center justify-between">
        <div className="text-left">
          <h3 className="text-[20px] font-bold text-gray-900 mb-1">Session notes</h3>
          <p className="text-[14px] text-gray-600">Take a pause and reflect</p>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-[14px] text-gray-500">0 Notes</span>
          <div className="w-10 h-10 rounded-full bg-[#5B4FDB]/10 flex items-center justify-center">
            <ArrowUpRight className="w-5 h-5 text-[#5B4FDB]" />
          </div>
        </div>
      </button>

      {/* All Sessions Section */}
      <div className="mb-5">
        <div className="mb-4">
          <h2 className="text-[22px] font-bold text-gray-900">All Sessions</h2>
        </div>

        {/* Date Filter Pills */}
        <div className="flex gap-2 mb-5 overflow-x-auto pb-2 -mx-6 px-6 scrollbar-hide">
          <button className="px-5 py-2.5 rounded-full bg-[#5B4FDB] text-white font-semibold text-[14px] shadow-lg whitespace-nowrap">
            All
          </button>
          <button className="px-5 py-2.5 rounded-full bg-white/50 backdrop-blur-sm text-gray-700 font-medium text-[14px] whitespace-nowrap">
            12 September
          </button>
          <button className="px-5 py-2.5 rounded-full bg-white/50 backdrop-blur-sm text-gray-700 font-medium text-[14px] whitespace-nowrap">
            13 September
          </button>
          <button className="px-5 py-2.5 rounded-full bg-white/50 backdrop-blur-sm text-gray-700 font-medium text-[14px] whitespace-nowrap">
            14 September
          </button>
        </div>

        {/* Session Cards */}
        <div className="space-y-4">
          {/* Session 1 */}
          <button
            onClick={() => navigate('/home/chakra-meditation/root')}
            className="w-full bg-white/60 backdrop-blur-sm rounded-3xl p-5 shadow-sm text-left"
          >
            <div className="flex items-start gap-4 mb-4">
              <div className="w-12 h-12 rounded-full bg-[#5B4FDB]/10 flex items-center justify-center flex-shrink-0">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#5B4FDB" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <polygon points="10 8 16 12 10 16 10 8" fill="#5B4FDB" />
                </svg>
              </div>
              <div className="flex-1">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h4 className="text-[18px] font-bold text-gray-900 mb-1">Morning Focus</h4>
                    <p className="text-[14px] text-gray-600">15 MIN</p>
                  </div>
                  <div className="inline-block px-2.5 py-1 bg-[#5B4FDB]/10 rounded-lg">
                    <span className="text-[11px] font-bold text-[#5B4FDB] tracking-wide">FOCUS</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative h-2 bg-gray-200 rounded-full overflow-hidden">
              <div className="absolute inset-y-0 left-0 w-3/4 bg-gradient-to-r from-[#5B4FDB] to-[#4F46E5] rounded-full"></div>
            </div>
            <div className="text-right mt-2">
              <span className="text-[14px] font-bold text-[#5B4FDB]">75%</span>
            </div>
          </button>

          {/* Session 2 */}
          <button
            onClick={() => navigate('/home/chakra-meditation/sacral')}
            className="w-full bg-white/60 backdrop-blur-sm rounded-3xl p-5 shadow-sm text-left"
          >
            <div className="flex items-start gap-4 mb-4">
              <div className="w-12 h-12 rounded-full bg-[#8B5CF6]/10 flex items-center justify-center flex-shrink-0">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#8B5CF6" strokeWidth="2">
                  <path d="M12 2L2 7l10 5 10-5-10-5z" />
                  <path d="M2 17l10 5 10-5" />
                </svg>
              </div>
              <div className="flex-1">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h4 className="text-[18px] font-bold text-gray-900 mb-1">Sleep Ritual</h4>
                    <p className="text-[14px] text-gray-600">10 MIN</p>
                  </div>
                  <div className="inline-block px-2.5 py-1 bg-[#8B5CF6]/10 rounded-lg">
                    <span className="text-[11px] font-bold text-[#8B5CF6] tracking-wide">MEDITATE</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative h-2 bg-gray-200 rounded-full overflow-hidden">
              <div className="absolute inset-y-0 left-0 w-[30%] bg-gradient-to-r from-[#8B5CF6] to-[#7C3AED] rounded-full"></div>
            </div>
            <div className="text-right mt-2">
              <span className="text-[14px] font-bold text-[#8B5CF6]">30%</span>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
