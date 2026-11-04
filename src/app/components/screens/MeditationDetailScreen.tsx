import { ArrowLeft, MoreVertical, Share2, Bookmark, Play, Droplet, Sparkles, Lightbulb, Infinity, Scale } from 'lucide-react';
import { useNavigate } from 'react-router';

export default function MeditationDetailScreen() {
  const navigate = useNavigate();

  return (
    <div className="h-full flex flex-col bg-gradient-to-b from-[#E8E5F8] to-white">
      {/* Header */}
      <div className="flex items-center justify-between px-6 pt-4 pb-6">
        <button onClick={() => navigate(-1)} className="w-10 h-10 rounded-full bg-white/60 backdrop-blur-sm flex items-center justify-center shadow-sm">
          <ArrowLeft className="w-5 h-5 text-[#5B4FDB]" />
        </button>
        <h1 className="text-[18px] font-bold text-[#5B4FDB]">Sacral Chakra</h1>
        <button className="w-10 h-10 rounded-full bg-white/60 backdrop-blur-sm flex items-center justify-center shadow-sm">
          <MoreVertical className="w-5 h-5 text-[#5B4FDB]" />
        </button>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto px-6 pb-24">
        {/* Main Visual Card */}
        <div className="flex justify-center mb-6">
          <div className="w-48 h-48 rounded-[40px] bg-white shadow-lg flex items-center justify-center">
            <div className="w-28 h-28 rounded-full bg-gradient-to-br from-[#5B4FDB] to-[#7C3AED] flex items-center justify-center">
              <Droplet className="w-12 h-12 text-white" fill="white" />
            </div>
          </div>
        </div>

        {/* Tag Pills */}
        <div className="flex flex-wrap gap-2 mb-5 justify-center">
          <span className="px-4 py-2 rounded-full bg-[#5B4FDB]/10 text-[#5B4FDB] text-[13px] font-semibold">
            20 min
          </span>
          <span className="px-4 py-2 rounded-full bg-white/70 backdrop-blur-sm text-gray-700 text-[13px] font-medium">
            Breathing
          </span>
          <span className="px-4 py-2 rounded-full bg-white/70 backdrop-blur-sm text-gray-700 text-[13px] font-medium">
            Restlessness
          </span>
          <span className="px-4 py-2 rounded-full bg-white/70 backdrop-blur-sm text-gray-700 text-[13px] font-medium">
            Body awareness
          </span>
        </div>

        {/* Description */}
        <div className="mb-6 text-center">
          <p className="text-[14px] text-gray-600 leading-relaxed">
            Focuses on the Sacral Chakra (Svadhishana), located below your navel...{' '}
            <button className="text-[#5B4FDB] font-semibold">See more</button>
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-4 shadow-sm">
            <div className="w-10 h-10 rounded-full bg-[#5B4FDB]/10 flex items-center justify-center mb-2">
              <Sparkles className="w-5 h-5 text-[#5B4FDB]" />
            </div>
            <p className="text-[13px] font-semibold text-gray-800">Supports creativity</p>
          </div>
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-4 shadow-sm">
            <div className="w-10 h-10 rounded-full bg-[#5B4FDB]/10 flex items-center justify-center mb-2">
              <Lightbulb className="w-5 h-5 text-[#5B4FDB]" />
            </div>
            <p className="text-[13px] font-semibold text-gray-800">Encourages curiosity</p>
          </div>
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-4 shadow-sm">
            <div className="w-10 h-10 rounded-full bg-[#5B4FDB]/10 flex items-center justify-center mb-2">
              <Infinity className="w-5 h-5 text-[#5B4FDB]" />
            </div>
            <p className="text-[13px] font-semibold text-gray-800">Builds openness</p>
          </div>
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-4 shadow-sm">
            <div className="w-10 h-10 rounded-full bg-[#5B4FDB]/10 flex items-center justify-center mb-2">
              <Scale className="w-5 h-5 text-[#5B4FDB]" />
            </div>
            <p className="text-[13px] font-semibold text-gray-800">Stabilises emotions</p>
          </div>
        </div>

        {/* Preview Player */}
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-5 shadow-sm mb-6">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[11px] font-bold text-gray-600 tracking-wider">PREVIEW</span>
            <span className="text-[13px] font-medium text-gray-600">1:13 / 5:00</span>
          </div>
          <div className="relative h-1.5 bg-gray-200 rounded-full overflow-hidden">
            <div className="absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-[#5B4FDB] to-[#7C3AED] rounded-full"></div>
          </div>
        </div>
      </div>

      {/* Fixed Bottom Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-t from-white via-white to-transparent px-6 pt-4 pb-6">
        <div className="flex items-center justify-center gap-4">
          <button className="w-12 h-12 rounded-full bg-white/70 backdrop-blur-sm flex items-center justify-center shadow-sm">
            <Share2 className="w-5 h-5 text-[#5B4FDB]" />
          </button>
          <button
            onClick={() => navigate('/home/meditation-session')}
            className="flex-1 max-w-[200px] px-8 py-4 rounded-full bg-gradient-to-r from-[#5B4FDB] to-[#7C3AED] flex items-center justify-center gap-2 shadow-lg"
          >
            <Play className="w-5 h-5 text-white" fill="white" />
            <span className="text-[16px] font-bold text-white">Begin</span>
          </button>
          <button className="w-12 h-12 rounded-full bg-white/70 backdrop-blur-sm flex items-center justify-center shadow-sm">
            <Bookmark className="w-5 h-5 text-[#5B4FDB]" />
          </button>
        </div>
      </div>
    </div>
  );
}
