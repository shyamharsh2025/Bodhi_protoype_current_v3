import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  Check,
  ChevronDown,
  Gift,
  LockKeyhole,
  RefreshCw,
  ShieldCheck,
  Sparkles,
  Star,
  Tag,
  TicketPercent,
} from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import lotusImage from '../../../assets/bodhi-premium-lotus.png';
import bodhiLogo from '../../../assets/bodhi-logo.png';
import {
  findCouponOffer,
  formatIndianRupees,
  getSubscriptionPricing,
  getTrialChargeDate,
  loadSubscriptionCheckout,
  saveSubscriptionCheckout,
  type SubscriptionPlan,
} from '../../subscriptionCheckout';

type Plan = SubscriptionPlan;

const benefits = [
  'Complete meditation and breathwork library',
  'Focus Sprint and concentration tools',
  'Private Thought Bank and personal insights',
  'Dopameter trends and wellbeing reflections',
  'Three profiles included with the yearly plan',
];

export default function SubscriptionScreen() {
  const navigate = useNavigate();
  const shouldReduceMotion = useReducedMotion();
  const [selectedPlan, setSelectedPlan] = useState<Plan>(() => loadSubscriptionCheckout().plan);
  const [appliedCoupon] = useState(() => findCouponOffer(loadSubscriptionCheckout().couponCode));
  const [benefitsOpen, setBenefitsOpen] = useState(
    () => new URLSearchParams(window.location.search).get('included') === 'open',
  );
  const pricing = getSubscriptionPricing(selectedPlan, appliedCoupon);

  const selectPlan = (plan: Plan) => {
    setSelectedPlan(plan);
    saveSubscriptionCheckout({ plan, couponCode: appliedCoupon?.code ?? null });
  };

  const enter = (delay = 0) => ({
    initial: shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 14 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: shouldReduceMotion ? 0.12 : 0.36, delay, ease: [0.22, 1, 0.36, 1] as const },
  });

  return (
    <div className="relative mx-auto min-h-dvh w-full max-w-md overflow-hidden bg-[#F8F7FF] text-[#151936]">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_76%_8%,rgba(215,218,255,0.96)_0%,rgba(241,235,255,0.88)_28%,rgba(239,246,255,0.82)_58%,rgba(255,255,255,0.98)_100%)]" />
      <div className="pointer-events-none fixed left-[-140px] top-[580px] h-[380px] w-[380px] rounded-full bg-[#E5C7FF]/30 blur-[78px]" />
      <div className="pointer-events-none fixed right-[-150px] top-[720px] h-[390px] w-[390px] rounded-full bg-[#BDEBFF]/30 blur-[82px]" />

      <div className="relative z-10 pb-8">
        <SubscriptionStatusBar />

        <header className="relative min-h-[350px]">
          <button
            aria-label="Go back"
            onClick={() => navigate(-1)}
            className="absolute left-5 top-4 z-30 flex h-12 w-12 items-center justify-center rounded-full border border-white/90 bg-white/88 text-[#5840D4] shadow-[0_10px_24px_rgba(84,64,187,0.11)] backdrop-blur-xl transition active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5840D4]"
          >
            <ArrowLeft className="h-6 w-6" strokeWidth={2.35} />
          </button>

          <motion.div className="relative z-20 flex justify-center pt-2" {...enter()}>
            <img
              src={bodhiLogo}
              alt="Bodhi"
              width={800}
              height={300}
              className="h-[62px] w-[166px] object-contain mix-blend-multiply"
            />
          </motion.div>

          <motion.div
            className="pointer-events-none absolute right-[-120px] top-[24px] z-0 h-[330px] w-[330px] overflow-hidden rounded-full opacity-88 [mask-image:radial-gradient(circle_at_center,black_50%,transparent_74%)]"
            initial={shouldReduceMotion ? { opacity: 0.9 } : { opacity: 0, scale: 0.94 }}
            animate={{ opacity: 0.9, scale: 1 }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.75, ease: [0.22, 1, 0.36, 1] }}
          >
            <img
              src={lotusImage}
              alt=""
              aria-hidden="true"
              width={900}
              height={900}
              className="h-full w-full object-cover"
            />
          </motion.div>

          <motion.div className="relative z-10 px-6 pt-[48px]" {...enter(0.08)}>
            <p className="mb-2.5 text-[10px] font-bold uppercase tracking-[1.45px] text-[#7058DC]">
              Bodhi Premium
            </p>
            <h1 className="max-w-[292px] text-[32px] font-extrabold leading-[38px] tracking-[-0.9px] text-[#121B43]">
              Unlock your full Bodhi experience
            </h1>
            <p className="mt-3 max-w-[270px] text-[15px] font-medium leading-[23px] text-[#565C79]">
              Meditate, reflect, focus and grow with the complete Bodhi experience.
            </p>
          </motion.div>
        </header>

        <main className="space-y-5 px-5">
          <motion.section
            className="relative isolate overflow-hidden rounded-[27px] border-[1.5px] border-[#C9BFF4]/80 bg-[linear-gradient(120deg,rgba(255,255,255,0.94),rgba(244,240,255,0.91),rgba(234,245,255,0.92))] p-5 shadow-[0_20px_42px_rgba(66,54,145,0.14),inset_0_1px_0_rgba(255,255,255,1)] backdrop-blur-2xl"
            {...enter(0.14)}
          >
            <div className="absolute -right-10 -top-12 h-36 w-36 rounded-full bg-[#C9C1FF]/28 blur-3xl" />
            <div className="relative flex items-center gap-4">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-white bg-[linear-gradient(145deg,#F5F0FF,#E4EFFF)] text-[#5840D4] shadow-[0_10px_24px_rgba(84,64,187,0.13),inset_0_1px_0_white]">
                <CalendarDays className="h-7 w-7" strokeWidth={2.15} />
              </div>
              <div>
                <h2 className="text-[20px] font-bold leading-7 text-[#1E213B]">7-day free trial</h2>
                <p className="mt-1 text-[14px] font-medium leading-5 text-[#656A84]">
                  Cancel anytime. Access continues until the end of your billing period.
                </p>
              </div>
            </div>
          </motion.section>

          <motion.section aria-label="Choose a subscription plan" className="grid grid-cols-2 gap-3" {...enter(0.2)}>
            <PlanCard
              plan="monthly"
              selected={selectedPlan === 'monthly'}
              onSelect={() => selectPlan('monthly')}
            />
            <PlanCard
              plan="yearly"
              selected={selectedPlan === 'yearly'}
              onSelect={() => selectPlan('yearly')}
            />
          </motion.section>

          <motion.section {...enter(0.24)}>
            <button
              type="button"
              onClick={() => {
                saveSubscriptionCheckout({ plan: selectedPlan, couponCode: appliedCoupon?.code ?? null });
                navigate('/home/subscription/coupon');
              }}
              aria-label={appliedCoupon ? `Coupon ${appliedCoupon.code} applied. Manage coupon` : 'Add a coupon or offer code'}
              className={`group relative flex min-h-[88px] w-full items-center gap-4 overflow-hidden rounded-[25px] border-[1.5px] px-4 text-left backdrop-blur-2xl transition duration-200 active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5840D4] focus-visible:ring-offset-2 ${
                appliedCoupon
                  ? 'border-[#A9E1CE] bg-[linear-gradient(120deg,rgba(247,255,252,0.94),rgba(238,253,248,0.91),rgba(241,244,255,0.92))] shadow-[0_16px_34px_rgba(37,143,109,0.11),inset_0_1px_0_white]'
                  : 'border-[#CBC3ED]/90 bg-[linear-gradient(120deg,rgba(255,255,255,0.92),rgba(247,242,255,0.88),rgba(237,246,255,0.90))] shadow-[0_16px_34px_rgba(66,54,145,0.11),inset_0_1px_0_white]'
              }`}
            >
              <span className="pointer-events-none absolute -right-8 -top-10 h-28 w-28 rounded-full bg-[#C9C1FF]/24 blur-3xl" />
              <span
                className={`relative flex h-13 w-13 shrink-0 items-center justify-center rounded-[17px] border border-white shadow-[0_9px_20px_rgba(84,64,187,0.13),inset_0_1px_0_white] ${
                  appliedCoupon
                    ? 'bg-[linear-gradient(145deg,#E4FFF4,#DDF3FF)] text-[#087C5A]'
                    : 'bg-[linear-gradient(145deg,#F5F0FF,#E4EFFF)] text-[#5840D4]'
                }`}
              >
                {appliedCoupon ? <Check className="h-6 w-6" strokeWidth={2.6} /> : <TicketPercent className="h-6 w-6" strokeWidth={2.15} />}
              </span>
              <span className="relative min-w-0 flex-1">
                <span className="block text-[16px] font-extrabold leading-6 text-[#20233D]">
                  {appliedCoupon ? `${appliedCoupon.code} applied` : 'Have a coupon or offer code?'}
                </span>
                <span className={`mt-0.5 block text-[12px] font-semibold leading-5 ${appliedCoupon ? 'text-[#167458]' : 'text-[#666B84]'}`}>
                  {appliedCoupon
                    ? `Save ${formatIndianRupees(pricing.discountAmount)} on your first ${pricing.billingPeriod}`
                    : 'Apply it before you continue'}
                </span>
              </span>
              <ArrowRight className={`relative h-5 w-5 shrink-0 transition-transform duration-200 group-hover:translate-x-0.5 ${appliedCoupon ? 'text-[#118263]' : 'text-[#5840D4]'}`} strokeWidth={2.4} />
            </button>
          </motion.section>

          <motion.section
            className="overflow-hidden rounded-[25px] border-[1.5px] border-[#D2C9F1]/85 bg-white/92 shadow-[0_16px_34px_rgba(66,54,145,0.12),inset_0_1px_0_white] backdrop-blur-xl"
            {...enter(0.28)}
          >
            <button
              aria-expanded={benefitsOpen}
              onClick={() => setBenefitsOpen((open) => !open)}
              className="flex min-h-[100px] w-full items-center gap-4 px-5 text-left transition active:bg-[#F6F3FF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#5840D4]"
            >
              <span className="flex h-13 w-13 shrink-0 items-center justify-center rounded-full border border-[#DFD7FB] bg-[#F4F0FF] text-[#5840D4] shadow-[0_8px_18px_rgba(84,64,187,0.10)]">
                <Gift className="h-6 w-6" strokeWidth={2.25} />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-[18px] font-black leading-6">What’s included</span>
                <span className="mt-1 block text-[13px] font-semibold leading-5 text-[#666B84]">
                  Meditation, Focus Sprint, Thought Bank, Bro, Dopameter and insights
                </span>
              </span>
              <ChevronDown
                className={`h-6 w-6 shrink-0 text-[#646980] transition-transform duration-200 ${benefitsOpen ? 'rotate-180' : ''}`}
                strokeWidth={2.3}
              />
            </button>

            {benefitsOpen && (
              <div className="border-t border-[#E8E3F6] px-5 pb-5 pt-4">
                <ul className="space-y-3">
                  {benefits.map((benefit) => (
                    <li key={benefit} className="flex items-start gap-3 text-[13px] font-semibold leading-5 text-[#555B76]">
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#EDE8FF] text-[#5840D4]">
                        <Check className="h-3 w-3" strokeWidth={3} />
                      </span>
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </motion.section>

          <motion.section
            aria-label="Subscription assurances"
            className="grid grid-cols-3 divide-x divide-[#DCD8EA] rounded-[23px] border border-[#DCD8EA] bg-white/86 px-2 py-4 shadow-[0_12px_28px_rgba(66,54,145,0.09)] backdrop-blur-xl"
            {...enter(0.32)}
          >
            <TrustItem icon={ShieldCheck} label="Secure payment" />
            <TrustItem icon={RefreshCw} label="Cancel anytime" />
            <TrustItem icon={LockKeyhole} label="Private & safe" />
          </motion.section>

          <motion.div className="pt-1" {...enter(0.36)}>
            <button
              className="group relative grid min-h-[64px] w-full grid-cols-[24px_1fr_24px] items-center overflow-hidden rounded-[22px] bg-[linear-gradient(100deg,#2388F3_0%,#5450E3_49%,#8A31EF_100%)] px-5 text-[19px] font-bold text-white shadow-[0_18px_38px_rgba(75,67,218,0.30),inset_0_1px_0_rgba(255,255,255,0.38)] transition active:scale-[0.985] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5840D4] focus-visible:ring-offset-2"
            >
              <span className="absolute inset-0 bg-[linear-gradient(110deg,transparent_24%,rgba(255,255,255,0.23)_47%,transparent_68%)] opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
              <Sparkles className="relative h-6 w-6" strokeWidth={2.15} />
              <span className="relative text-center">Start 7-Day Free Trial</span>
              <ArrowRight className="relative h-6 w-6" strokeWidth={2.5} />
            </button>
            <p className="mt-3 px-4 text-center text-[12px] font-semibold leading-5 text-[#676C84]">
              {appliedCoupon
                ? `₹0 today. ${formatIndianRupees(pricing.firstCharge)} on ${getTrialChargeDate()}, then ${formatIndianRupees(pricing.originalPrice)}/${pricing.billingPeriod}.`
                : `₹0 today. ${formatIndianRupees(pricing.originalPrice)} on ${getTrialChargeDate()} after your free trial.`}
            </p>
          </motion.div>
        </main>
      </div>
    </div>
  );
}

function PlanCard({
  plan,
  selected,
  onSelect,
}: {
  plan: Plan;
  selected: boolean;
  onSelect: () => void;
}) {
  const yearly = plan === 'yearly';
  const shouldReduceMotion = useReducedMotion();

  return (
    <button
      aria-pressed={selected}
      onClick={onSelect}
      className={`relative min-h-[256px] overflow-hidden rounded-[26px] p-[1.5px] text-left shadow-[0_17px_34px_rgba(66,54,145,0.13)] transition duration-200 active:scale-[0.985] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5840D4] ${
        selected
          ? 'bg-[linear-gradient(145deg,#6550EF,#42C5E6_55%,#B74BEE)]'
          : 'bg-[linear-gradient(145deg,rgba(255,255,255,0.95),rgba(194,188,226,0.82),rgba(218,235,251,0.86))]'
      }`}
    >
      {selected && (
        <motion.span
          aria-hidden="true"
          className="absolute -inset-[80%] bg-[conic-gradient(from_0deg,transparent_0deg,transparent_245deg,rgba(255,255,255,0.95)_285deg,rgba(90,197,255,0.95)_310deg,transparent_345deg)]"
          animate={shouldReduceMotion ? undefined : { rotate: 360 }}
          transition={{ duration: 5.8, repeat: shouldReduceMotion ? 0 : Infinity, ease: 'linear' }}
        />
      )}
      <span
        className={`relative flex h-full min-h-[253px] flex-col rounded-[24px] p-3.5 backdrop-blur-[24px] ${
          selected
            ? 'bg-[linear-gradient(145deg,rgba(255,255,255,0.86),rgba(240,235,255,0.78),rgba(228,246,255,0.82))] shadow-[inset_0_1px_0_rgba(255,255,255,0.96),inset_0_-1px_0_rgba(113,91,210,0.10)]'
            : 'bg-[linear-gradient(145deg,rgba(255,255,255,0.88),rgba(248,246,255,0.80),rgba(238,245,255,0.78))] shadow-[inset_0_1px_0_rgba(255,255,255,0.96)]'
        }`}
      >
        <span className="grid h-10 grid-cols-[40px_1fr_24px] items-center gap-1">
          <span className={`flex h-10 w-10 items-center justify-center rounded-full border border-white shadow-[0_8px_18px_rgba(84,64,187,0.13)] ${selected ? 'bg-[linear-gradient(145deg,#B79BFF,#6F53E8)] text-white' : 'bg-[#F3EFFF] text-[#5840D4]'}`}>
            {yearly ? <Star className="h-5 w-5" fill="currentColor" strokeWidth={1.8} /> : <CalendarDays className="h-5 w-5" strokeWidth={2.15} />}
          </span>
          {yearly ? (
            <span className="justify-self-center whitespace-nowrap rounded-full bg-[linear-gradient(90deg,#5B3FDC,#7D35EA)] px-1.5 py-1 text-[8px] font-bold text-white shadow-sm">
              Best Value
            </span>
          ) : (
            <span />
          )}
          <span className={`flex h-6 w-6 items-center justify-center rounded-full border-2 ${selected ? 'border-[#5840D4]' : 'border-[#AEB1C1]'}`}>
            {selected && <span className="h-3 w-3 rounded-full bg-[#267FF1]" />}
          </span>
        </span>

        <span className="mt-4 text-[17px] font-bold leading-6 text-[#1E213B]">{yearly ? 'Yearly' : 'Monthly'}</span>
        <span className="mt-2 flex items-end gap-1 whitespace-nowrap text-[#5A42D8]">
          <span className={`font-bold tracking-[-0.8px] ${yearly ? 'text-[27px]' : 'text-[29px]'}`}>
            {yearly ? '₹2,500' : '₹350'}
          </span>
          <span className="pb-1 text-[10px] font-medium text-[#686D83]">
            /{yearly ? 'year' : 'month'}
          </span>
        </span>

        {yearly ? (
          <>
            <span className="mt-1 text-[12px] font-semibold text-[#6046D8]">₹208 / month</span>
            <span className="mt-3 inline-flex w-fit items-center gap-1.5 rounded-full bg-[#E7F8F1] px-2 py-1 text-[10px] font-bold text-[#0A8F66]">
              <Tag className="h-3.5 w-3.5" strokeWidth={2.3} />
              Save ₹1,700
            </span>
          </>
        ) : (
          <span className="mt-6 border-t border-[#E3E0EB] pt-4 text-[11px] font-semibold leading-4 text-[#6E7288]">
            Billed monthly after trial.
          </span>
        )}

        {yearly && (
          <span className="mt-auto border-t border-[#DDD9E9] pt-3 text-[11px] font-semibold leading-4 text-[#6E7288]">
            Billed yearly after trial.
          </span>
        )}
      </span>
    </button>
  );
}

function TrustItem({
  icon: Icon,
  label,
}: {
  icon: typeof ShieldCheck;
  label: string;
}) {
  return (
    <div className="flex min-w-0 flex-col items-center gap-2 px-2 text-center">
      <Icon className="h-6 w-6 text-[#5840D4]" strokeWidth={2.25} />
      <span className="text-[11px] font-bold leading-4 text-[#555B74]">{label}</span>
    </div>
  );
}

export function SubscriptionStatusBar() {
  return (
    <div className="relative z-30 flex items-center justify-between px-6 pb-2 pt-4">
      <span className="text-[14px] font-semibold leading-5 text-black">9:41</span>
      <div className="flex items-center gap-1.5 text-black" aria-label="Phone status">
        <svg className="h-[12px] w-[19px]" viewBox="0 0 19.2 12.3" fill="currentColor" aria-hidden="true">
          <rect y="7.5" width="3.2" height="4.8" rx="1" />
          <rect x="5.3" y="5.1" width="3.2" height="7.2" rx="1" />
          <rect x="10.7" y="2.4" width="3.2" height="9.9" rx="1" />
          <rect x="16" width="3.2" height="12.3" rx="1" />
        </svg>
        <svg className="h-[13px] w-[18px]" viewBox="0 0 20 14" fill="none" aria-hidden="true">
          <path d="M1.5 4.5A12.7 12.7 0 0 1 18.5 4.5M4.4 8A8.3 8.3 0 0 1 15.6 8M7.7 11.2a3.5 3.5 0 0 1 4.6 0" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
          <circle cx="10" cy="13" r="1" fill="currentColor" />
        </svg>
        <svg className="h-[14px] w-[28px]" viewBox="0 0 28 14" fill="none" aria-hidden="true">
          <rect x=".7" y=".7" width="24" height="12.6" rx="4" stroke="currentColor" strokeOpacity=".4" strokeWidth="1.4" />
          <rect x="2.6" y="2.6" width="20.2" height="8.8" rx="2.5" fill="currentColor" />
          <path d="M26 4.7c1 .4 1.5 1.1 1.5 2.3S27 9 26 9.3V4.7Z" fill="currentColor" opacity=".45" />
        </svg>
      </div>
    </div>
  );
}
