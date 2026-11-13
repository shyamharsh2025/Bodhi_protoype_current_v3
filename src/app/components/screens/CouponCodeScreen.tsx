import {
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  Check,
  CircleCheck,
  ShieldCheck,
  Sparkles,
  Star,
  TicketPercent,
} from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import { type FormEvent, useRef, useState } from 'react';
import { useNavigate } from 'react-router';
import bodhiLogo from '../../../assets/bodhi-logo.png';
import {
  findCouponOffer,
  formatIndianRupees,
  getSubscriptionPricing,
  getTrialChargeDate,
  loadSubscriptionCheckout,
  normalizeCouponCode,
  saveSubscriptionCheckout,
} from '../../subscriptionCheckout';
import { SubscriptionStatusBar } from './SubscriptionScreen';

export default function CouponCodeScreen() {
  const navigate = useNavigate();
  const shouldReduceMotion = useReducedMotion();
  const inputRef = useRef<HTMLInputElement>(null);
  const [checkout] = useState(loadSubscriptionCheckout);
  const [code, setCode] = useState(checkout.couponCode ?? '');
  const [validatedOffer, setValidatedOffer] = useState(() => findCouponOffer(checkout.couponCode));
  const [error, setError] = useState('');
  const pricing = getSubscriptionPricing(checkout.plan, validatedOffer);
  const planLabel = checkout.plan === 'yearly' ? 'Yearly Plan' : 'Monthly Plan';

  const enter = (delay = 0) => ({
    initial: shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 12 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: shouldReduceMotion ? 0.12 : 0.34, delay, ease: [0.22, 1, 0.36, 1] as const },
  });

  const handleApply = (event: FormEvent) => {
    event.preventDefault();
    const normalizedCode = normalizeCouponCode(code);

    if (!normalizedCode) {
      setValidatedOffer(null);
      setError('Enter a coupon code to continue.');
      inputRef.current?.focus();
      return;
    }

    const offer = findCouponOffer(normalizedCode);
    if (!offer) {
      setValidatedOffer(null);
      setError('We couldn’t find that code. Check the spelling and try again.');
      inputRef.current?.focus();
      return;
    }

    setCode(offer.code);
    setValidatedOffer(offer);
    setError('');
  };

  const handleContinue = () => {
    if (!validatedOffer) return;
    saveSubscriptionCheckout({ plan: checkout.plan, couponCode: validatedOffer.code });
    navigate('/home/subscription');
  };

  const handleRemove = () => {
    setCode('');
    setValidatedOffer(null);
    setError('');
    saveSubscriptionCheckout({ plan: checkout.plan, couponCode: null });
    window.requestAnimationFrame(() => inputRef.current?.focus());
  };

  const continueWithoutCode = () => {
    saveSubscriptionCheckout({ plan: checkout.plan, couponCode: null });
    navigate('/home/subscription');
  };

  return (
    <div className="relative mx-auto min-h-dvh w-full max-w-md overflow-hidden bg-[#F8F7FF] text-[#151936]">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_82%_7%,rgba(211,216,255,0.98)_0%,rgba(242,236,255,0.90)_30%,rgba(239,247,255,0.85)_60%,rgba(255,255,255,0.98)_100%)]" />
      <div className="pointer-events-none fixed left-[-160px] top-[310px] h-[360px] w-[360px] rounded-full bg-[#E2C8FF]/34 blur-[80px]" />
      <div className="pointer-events-none fixed right-[-170px] top-[610px] h-[390px] w-[390px] rounded-full bg-[#BDEBFF]/32 blur-[84px]" />

      <div className="relative z-10 pb-9">
        <SubscriptionStatusBar />

        <header className="relative flex min-h-[76px] items-start justify-center px-5 pt-1">
          <button
            type="button"
            aria-label="Back to Bodhi Premium"
            onClick={() => navigate('/home/subscription')}
            className="absolute left-5 top-1 flex h-12 w-12 items-center justify-center rounded-full border border-white/90 bg-white/88 text-[#5840D4] shadow-[0_10px_24px_rgba(84,64,187,0.11)] backdrop-blur-xl transition active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5840D4]"
          >
            <ArrowLeft className="h-6 w-6" strokeWidth={2.35} />
          </button>
          <motion.img
            src={bodhiLogo}
            alt="Bodhi"
            width={800}
            height={300}
            className="h-[56px] w-[150px] object-contain mix-blend-multiply"
            {...enter()}
          />
        </header>

        <main className="space-y-5 px-5">
          <motion.section className="pt-1 text-center" {...enter(0.05)}>
            <div className="relative mx-auto mb-4 flex h-24 w-24 items-center justify-center">
              <span className="absolute inset-0 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.98)_18%,rgba(222,215,255,0.72)_53%,rgba(171,203,255,0.08)_74%,transparent_76%)] shadow-[0_16px_40px_rgba(98,75,210,0.18)]" />
              <span className="absolute inset-[11px] rounded-full border border-white/90 bg-white/35 backdrop-blur-xl" />
              <TicketPercent className="relative h-11 w-11 text-[#5A42D8] drop-shadow-[0_5px_9px_rgba(83,62,204,0.24)]" strokeWidth={1.8} />
              <Sparkles className="absolute -right-1 top-2 h-5 w-5 text-[#8C6EF0]" strokeWidth={1.8} />
            </div>
            <h1 className="text-[29px] font-extrabold leading-[35px] tracking-[-0.75px] text-[#121B43]">
              Have a <span className="bg-[linear-gradient(90deg,#277FF0,#7A3FE6)] bg-clip-text text-transparent">coupon code?</span>
            </h1>
            <p className="mx-auto mt-2 max-w-[330px] text-[14px] font-medium leading-[21px] text-[#60667F]">
              Enter your code to unlock an available offer before starting your trial.
            </p>
          </motion.section>

          <motion.section
            className="relative overflow-hidden rounded-[27px] border-[1.5px] border-[#CEC6EF]/90 bg-[linear-gradient(125deg,rgba(255,255,255,0.94),rgba(246,242,255,0.89),rgba(237,247,255,0.91))] p-4 shadow-[0_20px_42px_rgba(66,54,145,0.14),inset_0_1px_0_white] backdrop-blur-2xl"
            {...enter(0.1)}
          >
            <div className="pointer-events-none absolute -right-12 -top-14 h-40 w-40 rounded-full bg-[#C9C1FF]/26 blur-3xl" />
            <form className="relative" onSubmit={handleApply} noValidate>
              <label htmlFor="coupon-code" className="mb-2 block px-1 text-[13px] font-bold text-[#30344F]">
                Coupon code
              </label>
              <div
                className={`flex min-h-[60px] items-center gap-2 rounded-[19px] border bg-white/78 p-1.5 pl-4 shadow-[inset_0_1px_0_white] transition focus-within:ring-2 ${
                  error
                    ? 'border-[#D75B6C] focus-within:ring-[#D75B6C]/25'
                    : validatedOffer
                      ? 'border-[#83D8BA] focus-within:ring-[#20A779]/20'
                      : 'border-[#D2C9F1] focus-within:border-[#7258E3] focus-within:ring-[#7258E3]/20'
                }`}
              >
                <TicketPercent className="h-5 w-5 shrink-0 text-[#6247D9]" strokeWidth={2.05} aria-hidden="true" />
                <input
                  ref={inputRef}
                  id="coupon-code"
                  name="coupon-code"
                  type="text"
                  inputMode="text"
                  autoCapitalize="characters"
                  autoComplete="off"
                  spellCheck={false}
                  maxLength={24}
                  value={code}
                  onChange={(event) => {
                    setCode(event.target.value.toUpperCase());
                    setError('');
                    if (validatedOffer && normalizeCouponCode(event.target.value) !== validatedOffer.code) {
                      setValidatedOffer(null);
                    }
                  }}
                  placeholder="Enter coupon code"
                  aria-describedby={error ? 'coupon-error' : 'coupon-help'}
                  aria-invalid={Boolean(error)}
                  className="h-11 min-w-0 flex-1 bg-transparent text-[16px] font-bold uppercase tracking-[0.5px] text-[#20233D] outline-none placeholder:font-medium placeholder:normal-case placeholder:tracking-normal placeholder:text-[#8A8EA3]"
                />
                <button
                  type="submit"
                  disabled={!code.trim()}
                  className="h-12 shrink-0 rounded-[15px] bg-[linear-gradient(100deg,#4B73EE,#713FE3)] px-4 text-[14px] font-bold text-white shadow-[0_8px_18px_rgba(84,64,187,0.22)] transition active:scale-[0.97] disabled:cursor-not-allowed disabled:bg-[#E4E1F1] disabled:text-[#9B99AC] disabled:shadow-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5840D4] focus-visible:ring-offset-2"
                >
                  Apply
                </button>
              </div>
              <div className="min-h-[28px] px-1 pt-2" aria-live="polite">
                {error ? (
                  <p id="coupon-error" role="alert" className="flex items-start gap-1.5 text-[12px] font-semibold leading-[18px] text-[#B83246]">
                    <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" strokeWidth={2.2} />
                    {error}
                  </p>
                ) : (
                  <p id="coupon-help" className="text-[11px] font-medium leading-[18px] text-[#73788F]">
                    Codes aren’t case-sensitive and can be applied before payment.
                  </p>
                )}
              </div>
            </form>

            {validatedOffer && (
              <motion.div
                role="status"
                className="relative mt-1 flex items-center gap-3 rounded-[18px] border border-[#A9E1CE] bg-[linear-gradient(100deg,rgba(235,255,247,0.92),rgba(238,252,250,0.86))] px-3.5 py-3 shadow-[0_10px_22px_rgba(23,145,103,0.09)]"
                initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: shouldReduceMotion ? 0.1 : 0.22 }}
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#19B47D] text-white shadow-[0_7px_16px_rgba(25,180,125,0.24)]">
                  <Check className="h-5 w-5" strokeWidth={2.8} />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-[14px] font-extrabold text-[#183A32]">{validatedOffer.code} applied</span>
                  <span className="mt-0.5 block text-[12px] font-semibold text-[#16805F]">{validatedOffer.description}</span>
                </span>
              </motion.div>
            )}
          </motion.section>

          {validatedOffer && (
            <motion.section
              aria-label="Discounted plan summary"
              className="relative overflow-hidden rounded-[27px] bg-[linear-gradient(145deg,#6550EF,#43C4E5_55%,#B74BEE)] p-[1.5px] shadow-[0_20px_42px_rgba(69,58,167,0.18)]"
              {...enter(0.04)}
            >
              <div className="relative overflow-hidden rounded-[25px] bg-[linear-gradient(145deg,rgba(255,255,255,0.94),rgba(244,239,255,0.90),rgba(235,248,255,0.91))] p-5 backdrop-blur-2xl">
                <div className="pointer-events-none absolute -right-14 -top-16 h-44 w-44 rounded-full bg-[#C8B7FF]/30 blur-3xl" />
                <div className="relative flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[linear-gradient(145deg,#B79BFF,#6F53E8)] text-white shadow-[0_9px_20px_rgba(84,64,187,0.22)]">
                      {checkout.plan === 'yearly' ? <Star className="h-5 w-5" fill="currentColor" strokeWidth={1.8} /> : <TicketPercent className="h-5 w-5" strokeWidth={2} />}
                    </span>
                    <div>
                      <h2 className="text-[18px] font-extrabold text-[#20233D]">{planLabel}</h2>
                      <p className="text-[11px] font-semibold text-[#686D83]">7-day free trial included</p>
                    </div>
                  </div>
                  {checkout.plan === 'yearly' && (
                    <span className="rounded-full bg-[linear-gradient(90deg,#5B3FDC,#7D35EA)] px-2.5 py-1 text-[10px] font-bold text-white shadow-sm">
                      Best Value
                    </span>
                  )}
                </div>

                <dl className="relative mt-5 space-y-3 text-[13px] font-semibold">
                  <div className="flex items-center justify-between gap-4 text-[#676C84]">
                    <dt>Original price</dt>
                    <dd className="tabular-nums">{formatIndianRupees(pricing.originalPrice)}</dd>
                  </div>
                  <div className="flex items-center justify-between gap-4 text-[#0A8F66]">
                    <dt>Coupon discount ({validatedOffer.discountPercent}%)</dt>
                    <dd className="tabular-nums">−{formatIndianRupees(pricing.discountAmount)}</dd>
                  </div>
                  <div className="border-t border-[#DCD7EA] pt-4">
                    <div className="flex items-start justify-between gap-4">
                      <dt className="font-extrabold text-[#252940]">
                        First charge
                        <span className="mt-0.5 block text-[10px] font-semibold text-[#777C92]">after trial · {getTrialChargeDate()}</span>
                      </dt>
                      <dd className="text-right tabular-nums">
                        <span className="block text-[27px] font-extrabold tracking-[-0.7px] text-[#5840D4]">{formatIndianRupees(pricing.firstCharge)}</span>
                        <span className="text-[11px] font-semibold text-[#686D83]">/{pricing.billingPeriod}</span>
                      </dd>
                    </div>
                  </div>
                </dl>

                <div className="relative mt-4 flex items-start gap-2 rounded-[16px] border border-[#C7DCEF] bg-white/62 px-3 py-2.5 text-[11px] font-semibold leading-[17px] text-[#555B76]">
                  <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-[#5840D4]" strokeWidth={2.2} />
                  ₹0 is due today. Your plan renews at {formatIndianRupees(pricing.originalPrice)}/{pricing.billingPeriod} after the discounted billing period.
                </div>
              </div>
            </motion.section>
          )}

          <motion.div className="pt-1 text-center" {...enter(0.16)}>
            {validatedOffer ? (
              <>
                <button
                  type="button"
                  onClick={handleContinue}
                  className="group relative grid min-h-[64px] w-full grid-cols-[24px_1fr_24px] items-center overflow-hidden rounded-[22px] bg-[linear-gradient(100deg,#2388F3_0%,#5450E3_49%,#8A31EF_100%)] px-5 text-[18px] font-bold text-white shadow-[0_18px_38px_rgba(75,67,218,0.30),inset_0_1px_0_rgba(255,255,255,0.38)] transition active:scale-[0.985] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5840D4] focus-visible:ring-offset-2"
                >
                  <Sparkles className="relative h-6 w-6" strokeWidth={2.15} />
                  <span className="relative text-center">Apply &amp; Continue</span>
                  <ArrowRight className="relative h-6 w-6 transition-transform duration-200 group-hover:translate-x-0.5" strokeWidth={2.5} />
                </button>
                <button
                  type="button"
                  onClick={handleRemove}
                  className="mt-3 min-h-11 rounded-full px-5 text-[13px] font-bold text-[#6247D9] transition hover:bg-white/50 active:bg-white/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5840D4]"
                >
                  Remove code
                </button>
              </>
            ) : (
              <button
                type="button"
                onClick={continueWithoutCode}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-5 text-[13px] font-bold text-[#6247D9] transition hover:bg-white/55 active:bg-white/75 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5840D4]"
              >
                Continue without a code
                <ArrowRight className="h-4 w-4" strokeWidth={2.4} />
              </button>
            )}
            <p className="mt-2 flex items-center justify-center gap-1.5 text-[11px] font-semibold leading-5 text-[#6C7189]">
              <CircleCheck className="h-4 w-4 text-[#5840D4]" strokeWidth={2.1} />
              Your discount will be reflected before payment.
            </p>
          </motion.div>
        </main>
      </div>
    </div>
  );
}
