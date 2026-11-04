import { Sun, Clock, Sparkles, Compass, TrendingUp } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router';

export default function BottomNavigation() {
  const location = useLocation();
  const navigate = useNavigate();

  const tabs = [
    { id: 'today', label: 'Today', icon: Sun, path: '/home' },
    { id: 'explore', label: 'Explore', icon: Compass, path: '/home/explore' },
    { id: 'bro', label: '', icon: Sparkles, path: '/home/bro', isCenter: true },
    { id: 'sessions', label: 'Sessions', icon: Clock, path: '/home/sessions' },
    { id: 'journey', label: 'Journey', icon: TrendingUp, path: '/home/journey' },
  ];

  const isActive = (path: string) => {
    if (path === '/home') {
      return location.pathname === '/home' || location.pathname === '/bodhi-empty-case' || location.pathname === '/home/dopa-meter';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 px-4 pb-safe">
      <div className="bg-white/86 backdrop-blur-xl rounded-[32px] shadow-[0px_12px_32px_0px_rgba(84,75,187,0.12)] border border-white/80 mx-auto max-w-md mb-4">
        <div className="flex items-center justify-around px-3 py-3 relative">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const active = isActive(tab.path);

            if (tab.isCenter) {
              return (
                <button
                  key={tab.id}
                  onClick={() => navigate(tab.path)}
                  className="relative -mt-6 min-h-11 min-w-11"
                >
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center shadow-[0px_12px_28px_0px_rgba(84,75,187,0.22)] transition-all ${
                    active
                      ? 'bg-gradient-to-br from-[#5B4FDB] to-[#7C3AED] scale-110'
                      : 'bg-gradient-to-br from-[#5B4FDB] to-[#7C3AED]'
                  }`}>
                    <Icon className="w-7 h-7 text-white" strokeWidth={2.5} />
                  </div>
                </button>
              );
            }

            return (
              <button
                key={tab.id}
                onClick={() => navigate(tab.path)}
                className="flex min-h-11 min-w-14 flex-col items-center gap-1 py-2 px-2 rounded-2xl transition-colors"
              >
                <div className={`transition-colors ${
                  active ? 'text-[#5B4FDB]' : 'text-gray-500'
                }`}>
                  <Icon className="w-6 h-6" strokeWidth={active ? 2.4 : 2} />
                </div>
                <span className={`text-[12px] font-semibold leading-4 transition-colors ${
                  active ? 'text-[#5B4FDB]' : 'text-gray-500'
                }`}>
                  {tab.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
