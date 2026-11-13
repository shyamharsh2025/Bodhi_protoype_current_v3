import { ArrowRight, Download, Heart } from 'lucide-react';
import rootChakraImage from '../../imports/ReturnUserHome/680b9473c856efcb97e710b14b817e94ed6c94f3.png';
import sacralChakraImage from '../../imports/ReturnUserHome/a284d845041011ceb06c656399145b8c5c74bc5d.png';
import heartChakraImage from '../../imports/ReturnUserHome/33c81ac0148d41512ccbf9408cc3b4f4bde8048d.png';

export type LibraryKind = 'favourites' | 'downloads';

const thumbnails = [rootChakraImage, sacralChakraImage, heartChakraImage];

const libraryCopy = {
  favourites: {
    title: 'Favourites',
    count: '8 saved meditations',
    eyebrow: 'Saved for you',
    Icon: Heart,
    accent: '#7255E8',
    iconSurface: 'linear-gradient(145deg, #F2ECFF 0%, #E4DCFF 100%)',
    glow: '#D9CEFF',
    rail: 'linear-gradient(90deg, #7C5CE8 0%, #7455E8 48%, #4C83F2 100%)',
  },
  downloads: {
    title: 'Downloads',
    count: '5 ready offline',
    eyebrow: 'Ready anywhere',
    Icon: Download,
    accent: '#3479D9',
    iconSurface: 'linear-gradient(145deg, #E8F4FF 0%, #D7E8FF 100%)',
    glow: '#C9E6FF',
    rail: 'linear-gradient(90deg, #4C83F2 0%, #3E8DE8 52%, #55B8D6 100%)',
  },
};

export default function PersonalLibraryCard({
  kind,
  onClick,
  size = 'compact',
}: {
  kind: LibraryKind;
  onClick: () => void;
  size?: 'compact' | 'wide' | 'full';
}) {
  const item = libraryCopy[kind];
  const Icon = item.Icon;
  const isWide = size === 'wide';
  const isFull = size === 'full';
  const isHorizontal = isWide || isFull;

  if (isHorizontal) {
    return (
      <button
        type="button"
        onClick={onClick}
        aria-label={`Open ${item.title}`}
        className={`group relative shrink-0 snap-start overflow-hidden text-left transition active:scale-[0.985] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5840D4] ${
          isFull ? 'h-[230px] w-full rounded-[26px]' : 'h-[218px] w-[310px] rounded-[24px]'
        }`}
        style={{
          background:
            'linear-gradient(140deg, rgba(255,255,255,0.99) 0%, rgba(250,250,255,0.98) 47%, rgba(240,245,255,0.97) 100%)',
          border: '1.5px solid rgba(184,181,222,0.76)',
          boxShadow:
            '0 18px 48px rgba(42,48,90,0.105), 0 6px 18px rgba(84,75,187,0.08), inset 0 1px 0 rgba(255,255,255,1)',
        }}
      >
        <div className="absolute inset-x-0 top-0 h-1" style={{ background: item.rail }} />
        <div
          className="pointer-events-none absolute -right-12 -top-20 h-56 w-56 rounded-full opacity-40 blur-[58px]"
          style={{ backgroundColor: item.glow }}
        />
        <div className="pointer-events-none absolute inset-[1px] rounded-[inherit] ring-1 ring-inset ring-white/80" />

        <div className={`absolute flex items-center justify-between ${isFull ? 'left-[22px] right-[22px] top-[22px]' : 'left-5 right-5 top-5'}`}>
          <div className="flex items-center gap-3">
            <div
              className={`flex items-center justify-center rounded-[16px] border border-white ${isFull ? 'h-[54px] w-[54px]' : 'h-12 w-12'}`}
              style={{
                background: item.iconSurface,
                boxShadow: '0 12px 24px rgba(84,75,187,0.13), inset 0 1px 0 rgba(255,255,255,0.96)',
              }}
            >
              <Icon className={isFull ? 'h-7 w-7' : 'h-6 w-6'} style={{ color: item.accent }} strokeWidth={2.25} />
            </div>
            <span
              className="rounded-full border border-white/90 bg-white/72 px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-[0.55px] shadow-[0_6px_14px_rgba(84,75,187,0.08)]"
              style={{ color: item.accent, fontFamily: 'Inter, sans-serif' }}
            >
              {item.eyebrow}
            </span>
          </div>
          <span
            className={`flex items-center justify-center rounded-full border border-white bg-white/90 text-[#5840D4] transition group-active:translate-x-0.5 ${
              isFull ? 'h-11 w-11' : 'h-10 w-10'
            }`}
            style={{ boxShadow: '0 10px 20px rgba(42,48,90,0.12), 0 5px 12px rgba(84,75,187,0.10)' }}
          >
            <ArrowRight className="h-5 w-5" strokeWidth={2.35} />
          </span>
        </div>

        <div className={`absolute ${isFull ? 'left-[22px] right-[22px] top-[94px]' : 'left-5 right-5 top-[84px]'}`}>
          <h3
            className={`${isFull ? 'text-[22px] leading-7' : 'text-[20px] leading-6'} font-extrabold tracking-[-0.35px] text-[#171936]`}
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            {item.title}
          </h3>
          <p className="mt-1 text-[12px] font-semibold leading-4 text-[#74788D]" style={{ fontFamily: 'Inter, sans-serif' }}>
            {item.count}
          </p>
        </div>

        <div className={`absolute flex items-center ${isFull ? 'bottom-[18px] left-[22px]' : 'bottom-[18px] left-5'}`} aria-hidden="true">
          {thumbnails.map((src, index) => (
            <div
              key={src}
              className={`overflow-hidden rounded-[13px] border-[3px] border-white bg-[#E9E7F5] shadow-[0_8px_18px_rgba(42,48,90,0.15)] ${
                isFull ? 'h-12 w-12' : 'h-10 w-10'
              } ${index ? '-ml-2.5' : ''}`}
            >
              <img src={src} alt="" className="h-full w-full object-cover" />
            </div>
          ))}
          <span className="ml-3 text-[11px] font-bold text-[#6550CF]" style={{ fontFamily: 'Inter, sans-serif' }}>
            View collection
          </span>
        </div>
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={`Open ${item.title}`}
      className="group relative h-[232px] w-[292px] shrink-0 snap-start overflow-hidden rounded-[22px] p-5 text-left transition active:scale-[0.985] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5840D4]"
      style={{
        background:
          'linear-gradient(135deg, rgba(255,255,255,0.98) 0%, rgba(249,249,255,0.96) 54%, rgba(239,244,255,0.94) 100%)',
        border: '1.5px solid rgba(188,183,232,0.72)',
        boxShadow:
          '0 8px 22px rgba(42,48,90,0.075), 0 3px 10px rgba(84,75,187,0.06), inset 0 1px 0 rgba(255,255,255,0.98)',
      }}
    >
      <div className="pointer-events-none absolute -right-12 -top-14 h-44 w-44 rounded-full bg-[#CBDCFF]/35 blur-3xl" />
      <div className="relative flex items-start justify-between">
        <div
          className="flex h-12 w-12 items-center justify-center rounded-full border border-white/90"
          style={{
            background: item.iconSurface,
            boxShadow: '0 10px 22px rgba(84,75,187,0.12), inset 0 1px 0 rgba(255,255,255,0.92)',
          }}
        >
          <Icon className="h-6 w-6" style={{ color: item.accent }} strokeWidth={2.3} />
        </div>
        <span className="flex h-10 w-10 items-center justify-center rounded-full border border-[#E4E2F1] bg-white/92 text-[#5840D4] shadow-[0_8px_18px_rgba(84,75,187,0.10)] transition group-active:translate-x-0.5">
          <ArrowRight className="h-5 w-5" strokeWidth={2.3} />
        </span>
      </div>

      <div className="relative mt-5">
        <h3 className="text-[19px] font-extrabold leading-6 tracking-[-0.25px] text-[#171936]" style={{ fontFamily: 'Inter, sans-serif' }}>
          {item.title}
        </h3>
        <p className="mt-1 text-[12px] font-semibold leading-4 text-[#74788D]" style={{ fontFamily: 'Inter, sans-serif' }}>
          {item.count}
        </p>
      </div>

      <div className="relative mt-4 flex items-center" aria-hidden="true">
        {thumbnails.map((src, index) => (
          <div
            key={src}
            className={`h-10 w-10 overflow-hidden rounded-full border-[3px] border-white bg-[#E9E7F5] shadow-[0_7px_16px_rgba(42,48,90,0.13)] ${index ? '-ml-2.5' : ''}`}
          >
            <img src={src} alt="" className="h-full w-full object-cover" />
          </div>
        ))}
        <span className="ml-3 text-[11px] font-bold text-[#6550CF]" style={{ fontFamily: 'Inter, sans-serif' }}>
          Open collection
        </span>
      </div>
    </button>
  );
}
