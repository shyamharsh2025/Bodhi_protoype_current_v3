import { ChevronLeft, BarChart3, Pencil, ArrowRight, SlidersHorizontal } from 'lucide-react';
import { useNavigate } from 'react-router';
import { useState } from 'react';

const DURATIONS = [15, 25, 45, 60];

export default function FocusSprintScreen() {
  const navigate = useNavigate();
  const [task, setTask] = useState('');
  const [selected, setSelected] = useState<number | 'custom'>(15);

  return (
    <div
      className="min-h-screen w-full"
      style={{
        background: 'linear-gradient(to bottom, #FAFBFF 0%, #F2F0FF 45%, #F8F7FF 100%)',
      }}
    >
      <div className="relative max-w-[440px] mx-auto px-5 pt-[58px] pb-8">
        {/* Decorative wave */}
        <div
          className="pointer-events-none absolute right-0 w-[210px] h-[105px] opacity-40 blur-[2px]"
          style={{
            top: 120,
            background:
              'radial-gradient(ellipse at 30% 50%, #DCD7FF 0%, rgba(220,215,255,0) 60%), radial-gradient(ellipse at 70% 50%, #8E7CFF 0%, rgba(142,124,255,0) 60%)',
          }}
        />

        {/* Header buttons */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => navigate(-1)}
            aria-label="Go back"
            className="w-[46px] h-[46px] rounded-full bg-white flex items-center justify-center shadow-[0px_10px_24px_rgba(85,65,180,0.14)]"
          >
            <ChevronLeft className="w-6 h-6 text-[#6A4CF6]" strokeWidth={2.5} />
          </button>
          <button
            aria-label="Stats"
            className="w-[46px] h-[46px] rounded-full bg-white flex items-center justify-center shadow-[0px_10px_24px_rgba(85,65,180,0.14)]"
          >
            <BarChart3 className="w-[23px] h-[23px] text-[#6A4CF6]" strokeWidth={2.5} />
          </button>
        </div>

        {/* Hero */}
        <div className="mt-[60px] relative">
          <h1
            className="text-[34px] leading-[41px] tracking-[-0.5px] text-[#10132F]"
            style={{ fontWeight: 800 }}
          >
            What are you<br />working on?
          </h1>
          <p
            className="mt-3 text-[17px] leading-[27px] text-[#626780]"
            style={{ fontWeight: 500 }}
          >
            Set your intention. We'll help you<br />stay in the zone.
          </p>
        </div>

        {/* Divider */}
        <div className="mt-6 h-px bg-[#E5E1F4] opacity-85" />

        {/* Task Card */}
        <div
          className="mt-5 bg-white rounded-[24px] p-[22px]"
          style={{ boxShadow: '0px 16px 36px rgba(85,65,180,0.10)' }}
        >
          <h2
            className="text-[20px] leading-[26px] text-[#10132F]"
            style={{ fontWeight: 760 }}
          >
            What task are you focusing on?
          </h2>
          <div
            className="mt-4 relative bg-white rounded-[17px] border-[1.5px] border-[#DED8FF] flex items-center gap-3 px-4 h-[58px]"
            style={{ boxShadow: '0px 8px 22px rgba(85,65,180,0.08)' }}
          >
            <Pencil className="w-[22px] h-[22px] text-[#6A4CF6] shrink-0" strokeWidth={2.2} />
            <input
              type="text"
              value={task}
              onChange={(e) => setTask(e.target.value)}
              placeholder="e.g., Study Math Chapter 3"
              className="flex-1 bg-transparent outline-none text-[18px] text-[#10132F] placeholder-[#9A9DB5]"
              style={{ fontWeight: 500 }}
            />
          </div>
        </div>

        {/* Duration Card */}
        <div
          className="mt-5 bg-white rounded-[24px] p-[22px]"
          style={{ boxShadow: '0px 16px 36px rgba(85,65,180,0.10)' }}
        >
          <h2
            className="text-[20px] leading-[26px] text-[#10132F]"
            style={{ fontWeight: 760 }}
          >
            How long do you want to focus?
          </h2>
          <div className="mt-4 flex gap-[10px]">
            {DURATIONS.map((d) => {
              const active = selected === d;
              return (
                <button
                  key={d}
                  onClick={() => setSelected(d)}
                  className="flex-1 h-[66px] rounded-[16px] flex flex-col items-center justify-center bg-white transition-colors"
                  style={{
                    border: `1.5px solid ${active ? '#6A4CF6' : '#E4E0F7'}`,
                    color: active ? '#6A4CF6' : '#5F6275',
                  }}
                >
                  <span
                    className="text-[22px] leading-[26px]"
                    style={{ fontWeight: 800 }}
                  >
                    {d}
                  </span>
                  <span
                    className="text-[13px] leading-[18px]"
                    style={{ fontWeight: 650 }}
                  >
                    min
                  </span>
                </button>
              );
            })}
            <button
              onClick={() => setSelected('custom')}
              className="flex-1 h-[66px] rounded-[16px] flex flex-col items-center justify-center bg-white"
              style={{
                border: `1.5px solid ${selected === 'custom' ? '#6A4CF6' : '#E4E0F7'}`,
                color: selected === 'custom' ? '#6A4CF6' : '#5F6275',
              }}
            >
              <SlidersHorizontal className="w-5 h-5" strokeWidth={2.2} />
              <span
                className="text-[12px] leading-[16px] mt-1"
                style={{ fontWeight: 650 }}
              >
                Custom
              </span>
            </button>
          </div>
        </div>

        {/* CTA */}
        <button
          onClick={() => navigate('/home/focus-start-options')}
          className="mt-7 w-full h-[58px] rounded-[17px] flex items-center justify-center relative active:scale-[0.99] transition-transform"
          style={{
            background:
              'linear-gradient(to right, #5F39F5 0%, #7B5DF7 52%, #613CF2 100%)',
            boxShadow: '0px 16px 34px rgba(93,61,245,0.28)',
          }}
        >
          <span
            className="text-white text-[20px]"
            style={{ fontWeight: 800 }}
          >
            Start Focus Sprint
          </span>
          <ArrowRight
            className="absolute right-5 text-white w-[27px] h-[27px]"
            strokeWidth={2.5}
          />
        </button>
      </div>
    </div>
  );
}
