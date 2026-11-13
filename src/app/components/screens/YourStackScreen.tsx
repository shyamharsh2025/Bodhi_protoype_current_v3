import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router';
import PersonalLibraryCard from '../PersonalLibraryCard';

export default function YourStackScreen() {
  const navigate = useNavigate();

  return (
    <div className="relative mx-auto min-h-dvh w-full max-w-md overflow-hidden bg-[linear-gradient(180deg,#EAF3FF_0%,#F7F8FF_34%,#FFFFFF_100%)] px-5 pb-32 pt-5 text-[#171936]">
      <div className="pointer-events-none absolute -right-24 -top-20 h-72 w-72 rounded-full bg-[#CBDDFF]/45 blur-[72px]" />
      <header className="relative flex items-center gap-4 pt-4">
        <button
          aria-label="Go back"
          onClick={() => navigate(-1)}
          className="flex h-12 w-12 items-center justify-center rounded-full border border-white/90 bg-white/88 text-[#5840D4] shadow-[0_10px_24px_rgba(84,75,187,0.11)]"
        >
          <ArrowLeft className="h-6 w-6" strokeWidth={2.3} />
        </button>
        <div>
          <h1 className="text-[28px] font-extrabold leading-8 tracking-[-0.45px] text-[#5840D4]">Your Stack</h1>
          <p className="mt-1 text-[14px] font-medium text-[#64687C]">Your saved and offline meditations</p>
        </div>
      </header>

      <main className="relative mt-8 flex flex-col items-center gap-4">
        <PersonalLibraryCard kind="favourites" size="full" onClick={() => navigate('/home/explore/favourites')} />
        <PersonalLibraryCard kind="downloads" size="full" onClick={() => navigate('/home/explore/downloads')} />
      </main>
    </div>
  );
}
