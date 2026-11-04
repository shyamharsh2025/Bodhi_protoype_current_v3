import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router';
import ProgressDots from './ProgressDots';

interface OnboardingLayoutProps {
  children: React.ReactNode;
  totalSteps: number;
  currentStep: number;
  onBack?: () => void;
  showProgress?: boolean;
}

export default function OnboardingLayout({
  children,
  totalSteps,
  currentStep,
  onBack,
  showProgress = true,
}: OnboardingLayoutProps) {
  const navigate = useNavigate();

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      navigate(-1);
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col overflow-hidden bg-gradient-to-br from-[#E8ECFE] via-[#EEF2FF] to-[#E0E7FF]">
      {/* Subtle background orbs */}
      <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-gradient-to-br from-[#C084FC]/20 to-[#A78BFA]/20 rounded-full blur-[100px]"></div>
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-gradient-to-br from-[#5B4FDB]/10 to-[#3B82F6]/10 rounded-full blur-[100px]"></div>

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
            onClick={handleBack}
            className="w-10 h-10 rounded-full bg-white/50 backdrop-blur-sm flex items-center justify-center shadow-sm hover:bg-white/70 transition-all"
          >
            <ArrowLeft className="w-5 h-5 text-[#5B4FDB]" />
          </button>
          {showProgress && <ProgressDots total={totalSteps} current={currentStep} />}
          <div className="w-10"></div>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex-1 flex flex-col px-6 pb-6">
        {children}
      </div>

      {/* Home Indicator */}
      <div className="relative z-10 pb-2">
        <div className="w-32 h-1.5 bg-gray-900 rounded-full mx-auto"></div>
      </div>
    </div>
  );
}
