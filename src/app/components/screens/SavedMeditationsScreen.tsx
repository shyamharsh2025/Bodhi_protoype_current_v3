import { ArrowLeft, Clock, Play } from 'lucide-react';
import { useNavigate, useParams } from 'react-router';
import rootChakraImage from '../../../imports/ReturnUserHome/680b9473c856efcb97e710b14b817e94ed6c94f3.png';
import sacralChakraImage from '../../../imports/ReturnUserHome/a284d845041011ceb06c656399145b8c5c74bc5d.png';
import heartChakraImage from '../../../imports/ReturnUserHome/33c81ac0148d41512ccbf9408cc3b4f4bde8048d.png';

const meditations = [
  { title: 'Ground Chakra Meditation', minutes: 18, image: rootChakraImage, path: '/home/chakra-meditation/root' },
  { title: 'Sacral Chakra Meditation', minutes: 15, image: sacralChakraImage, path: '/home/chakra-meditation/sacral' },
  { title: 'Heart Chakra Meditation', minutes: 20, image: heartChakraImage, path: '/home/chakra-meditation/heart' },
];

export default function SavedMeditationsScreen() {
  const navigate = useNavigate();
  const { collection } = useParams();
  const isDownloads = collection === 'downloads';
  const title = isDownloads ? 'Downloads' : 'Favourites';

  return (
    <div className="relative mx-auto min-h-dvh w-full max-w-md overflow-hidden bg-[linear-gradient(180deg,#EAF3FF_0%,#F7F8FF_34%,#FFFFFF_100%)] px-5 pb-32 pt-5 text-[#171936]">
      <header className="relative flex items-center gap-4 pt-4">
        <button aria-label="Go back" onClick={() => navigate(-1)} className="flex h-12 w-12 items-center justify-center rounded-full border border-white/90 bg-white/88 text-[#5840D4] shadow-[0_10px_24px_rgba(84,75,187,0.11)]">
          <ArrowLeft className="h-6 w-6" strokeWidth={2.3} />
        </button>
        <div>
          <h1 className="text-[28px] font-extrabold leading-8 tracking-[-0.45px] text-[#5840D4]">{title}</h1>
          <p className="mt-1 text-[14px] font-medium text-[#64687C]">{isDownloads ? '5 ready offline' : '8 saved meditations'}</p>
        </div>
      </header>

      <main className="relative mt-8 space-y-3.5">
        {meditations.map((item) => (
          <div
            key={item.title}
            className="rounded-[24px] border-[1.5px] border-[#AFA5FF]/72 bg-[linear-gradient(135deg,rgba(255,255,255,0.96)_0%,rgba(248,250,255,0.92)_48%,rgba(239,245,255,0.88)_100%)] shadow-[0px_18px_38px_rgba(84,75,187,0.18),inset_0px_0px_0px_1px_rgba(255,255,255,0.82),0px_0px_28px_rgba(105,139,255,0.10)] backdrop-blur-xl"
          >
            <div className="flex min-h-[102px] w-full items-center gap-3 px-3.5 py-4 text-left">
              <button type="button" onClick={() => navigate(item.path)} className="flex min-w-0 flex-1 items-center gap-3 text-left active:scale-[0.99]">
                <div className="h-[62px] w-[62px] shrink-0 overflow-hidden rounded-full border-[2px] border-white bg-[#F3F1FF] shadow-[0px_12px_24px_rgba(84,75,187,0.17)]">
                  <img src={item.image} alt="" className="h-full w-full object-cover" />
                </div>

                <div className="min-w-0 flex-1">
                  <h2 className="line-clamp-2 text-[19px] font-extrabold leading-[23px] tracking-normal text-[#151A4D]">
                    {item.title}
                  </h2>
                  <div className="mt-2 flex items-center gap-1.5 text-[14px] font-semibold leading-5 text-[#656A8F]">
                    <Clock className="h-4 w-4 text-[#5F62A3]" strokeWidth={2.15} />
                    <span>{item.minutes} min</span>
                  </div>
                </div>
              </button>

              <button
                type="button"
                aria-label={`Play ${item.title}`}
                onClick={() => navigate(`${item.path}/session`)}
                className="flex h-[46px] w-[46px] shrink-0 items-center justify-center rounded-full bg-[linear-gradient(135deg,#8171F2_0%,#5840D4_54%,#3B82F6_100%)] shadow-[0px_12px_24px_rgba(84,75,187,0.34)] active:scale-[0.96]"
              >
                <Play className="ml-0.5 h-[22px] w-[22px] text-white" fill="white" strokeWidth={2} />
              </button>
            </div>
          </div>
        ))}
      </main>
    </div>
  );
}
