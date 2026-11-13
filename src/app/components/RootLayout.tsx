import { Outlet, useLocation, useNavigate } from 'react-router';
import type { PointerEvent } from 'react';
import { useRef } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import BottomNavigation from './BottomNavigation';

const prototypeFlow = [
  '/home',
  '/home/explore',
  '/home/explore/thought-bank',
  '/home/explore/thought-bank/recent-entries',
  '/home/explore/thought-bank/write',
  '/home/sessions',
  '/home/journey',
];

const emptyCaseFlow = ['/home', '/bodhi-empty-case', '/home/explore'];

const interactiveSelector = [
  'input',
  'textarea',
  'select',
  '[contenteditable="true"]',
  '[data-swipe-ignore="true"]',
].join(',');

function getFlow(pathname: string) {
  if (pathname === '/bodhi-empty-case') return emptyCaseFlow;
  return prototypeFlow;
}

function getFlowIndex(pathname: string, flow: string[]) {
  const exactIndex = flow.indexOf(pathname);
  if (exactIndex >= 0) return exactIndex;

  return flow.findIndex((path) => pathname === path || pathname.startsWith(`${path}/`));
}

export default function RootLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const swipeStartRef = useRef<{ x: number; y: number; target: EventTarget | null } | null>(null);

  // Hide navigation on focused, immersive task screens.
  const showNav =
    !location.pathname.includes('/bro') &&
    !location.pathname.includes('/ai-companion') &&
    !location.pathname.includes('/meditation-session') &&
    !location.pathname.includes('/thought-bank/write') &&
    !location.pathname.includes('/chakra-meditation') &&
    !location.pathname.includes('/focus-concentration') &&
    !location.pathname.includes('/emotional-wellbeing') &&
    !location.pathname.includes('/awareness-observation') &&
    !location.pathname.includes('/regulation-control') &&
    !location.pathname.includes('/focus-sprint') &&
    !location.pathname.includes('/focus-start-options') &&
    !location.pathname.includes('/focus-timer') &&
    !location.pathname.includes('/breathwork-prep') &&
    !location.pathname.includes('/meditation-prep') &&
    !location.pathname.includes('/focus-complete') &&
    !location.pathname.includes('/karma-reward') &&
    !location.pathname.includes('/dopa-meter') &&
    location.pathname !== '/home/sessions/league' &&
    location.pathname !== '/home/sessions/league/first-time' &&
    !location.pathname.includes('/profile') &&
    !location.pathname.includes('/subscription');

  const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    swipeStartRef.current = {
      x: event.clientX,
      y: event.clientY,
      target: event.target,
    };
  };

  const handlePointerUp = (event: PointerEvent<HTMLDivElement>) => {
    const swipeStart = swipeStartRef.current;
    if (!swipeStart) return;

    swipeStartRef.current = null;

    if (swipeStart.target instanceof Element && swipeStart.target.closest(interactiveSelector)) return;

    const deltaX = event.clientX - swipeStart.x;
    const deltaY = event.clientY - swipeStart.y;

    if (Math.abs(deltaX) < 72 || Math.abs(deltaY) > 72) return;

    const flow = getFlow(location.pathname);
    const currentIndex = getFlowIndex(location.pathname, flow);
    if (currentIndex < 0) return;

    const nextIndex = deltaX < 0 ? currentIndex + 1 : currentIndex - 1;
    const nextPath = flow[nextIndex];
    if (!nextPath) return;

    event.preventDefault();
    event.stopPropagation();
    navigate(nextPath);
    window.requestAnimationFrame(() => window.scrollTo({ top: 0, behavior: 'smooth' }));
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-[#E8ECFE] via-[#EEF2FF] to-[#E0E7FF] overflow-hidden">
      {/* Background decorative elements */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-20 right-10 w-64 h-64 bg-[#5B4FDB]/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-40 left-10 w-80 h-80 bg-[#3B82F6]/5 rounded-full blur-3xl"></div>
      </div>

      {/* Main content */}
      <div
        className={`relative z-10 min-h-screen touch-pan-y ${showNav ? 'pb-32' : ''}`}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, x: 18 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -18 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom Navigation */}
      {showNav && <BottomNavigation />}
    </div>
  );
}
