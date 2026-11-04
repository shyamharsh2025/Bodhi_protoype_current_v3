import { useState } from 'react';
import { Mic, MicOff, ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router';
import { VoicePoweredOrb } from '../VoicePoweredOrb';

export default function VoiceOrbScreen() {
  const navigate = useNavigate();
  const [isRecording, setIsRecording] = useState(false);
  const [, setVoiceDetected] = useState(false);

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-6 bg-gradient-to-br from-[#E8ECFE] via-[#EEF2FF] to-[#E0E7FF]">
      <button
        onClick={() => navigate(-1)}
        aria-label="Go back"
        className="absolute left-5 top-[70px] w-10 h-10 rounded-full bg-white border border-[#E8E7F1]/60 flex items-center justify-center shadow-sm"
      >
        <ChevronLeft className="w-5 h-5 text-[#544BBB]" />
      </button>

      <div className="flex flex-col items-center space-y-8 w-full max-w-md">
        <div className="relative" style={{ width: 'min(384px, 80vw)', aspectRatio: '1 / 1' }}>
          <div className="pointer-events-none absolute inset-[5%] rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.72)_0%,rgba(134,196,255,0.22)_30%,rgba(88,64,212,0.22)_54%,transparent_74%)] blur-2xl" />
          <div className="pointer-events-none absolute inset-[14%] rounded-full bg-[#05091F]/[0.04] blur-xl" />
          <VoicePoweredOrb
            variant="energySphere"
            enableVoiceControl={isRecording}
            className="relative z-10"
            onVoiceDetected={setVoiceDetected}
          />
        </div>
      </div>
    </div>
  );
}
