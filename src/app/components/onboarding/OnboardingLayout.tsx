import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router';
import ProgressDots from './ProgressDots';

interface OnboardingLayoutProps {
  children: React.ReactNode;
  totalSteps: number;
  currentStep: number;
  onBack?: () => void;
  showProgress?: boolean;
  visualVariant?: 'default' | 'consent';
}

export default function OnboardingLayout({
  children,
  totalSteps,
  currentStep,
  onBack,
  showProgress = true,
  visualVariant = 'default',
}: OnboardingLayoutProps) {
  const navigate = useNavigate();
  const isConsent = visualVariant === 'consent';

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      navigate(-1);
    }
  };

  return (
    <div className={`relative min-h-dvh flex flex-col overflow-hidden ${isConsent ? 'bg-[#FBFCFF]' : 'bg-gradient-to-br from-[#E8ECFE] via-[#EEF2FF] to-[#E0E7FF]'}`}>
      {/* Subtle background orbs */}
      <div className={`absolute right-0 top-0 h-[320px] w-[320px] rounded-full blur-[110px] ${isConsent ? 'bg-[#DCEAFF]/75' : 'bg-gradient-to-br from-[#C084FC]/20 to-[#A78BFA]/20'}`}></div>
      <div className={`absolute bottom-0 left-0 h-[320px] w-[320px] rounded-full blur-[110px] ${isConsent ? 'bg-[#E8F1FF]/80' : 'bg-gradient-to-br from-[#5B4FDB]/10 to-[#3B82F6]/10'}`}></div>

      {/* Status Bar */}
      <div className="relative z-10 flex items-center justify-between px-8 pt-4 pb-2">
        <div className="text-[15px] font-semibold">9:41</div>
        <div className="flex items-center gap-1">
          <div className="flex gap-0.5">
            {[...Array(4)].map((_, i) => (
              <div key={i} className={`w-0.5 h-3 rounded-full ${i < 3 ? 'bg-gray-900' : 'bg-gray-400'}`}></div>
            ))}
          </div>
          <svg width="16" height="12" viewBox="0 0 16 12" fill="none" className="ml-1">
            <path d="M1 6C1 3.79086 2.79086 2 5 2H11C13.2091 2 15 3.79086 15 6C15 8.20914 13.2091 10 11 10H5C2.79086 10 1 8.20914 1 6Z" fill="#000"/>
            <rect x="13" y="3" width="2" height="6" rx="1" fill="#000"/>
          </svg>
          <div className="w-6 h-3 rounded-full bg-gray-900 ml-0.5"></div>
        </div>
      </div>

      {/* Header with Back Button and Progress */}
      <div className="relative z-10 px-6 pt-4 pb-6">
        <div className="flex items-center justify-between mb-6">
          <button
            type="button"
            aria-label="Go back"
            onClick={handleBack}
            className={`flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border shadow-[0_6px_18px_rgba(70,64,120,0.08)] backdrop-blur-sm transition-all duration-200 active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5B4FDB] focus-visible:ring-offset-2 ${isConsent ? 'border-[#ECECF3] bg-white/90 hover:bg-white' : 'border-white/70 bg-white/55 hover:bg-white/75'}`}
          >
            <ArrowLeft className="w-5 h-5 text-[#5B4FDB]" />
          </button>
          {showProgress && <ProgressDots total={totalSteps} current={currentStep} visualVariant={visualVariant} />}
          <div className="w-10"></div>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-0 flex-1 flex flex-col px-6 pb-6">
        {children}
      </div>

      {/* Home Indicator */}
      <div className="relative z-10 pb-2">
        <div className="w-32 h-1.5 bg-gray-900 rounded-full mx-auto"></div>
      </div>
    </div>
  );
}
