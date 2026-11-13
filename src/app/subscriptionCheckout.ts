export type SubscriptionPlan = 'monthly' | 'yearly';

export type CouponOffer = {
  code: string;
  discountPercent: number;
  description: string;
};

type SubscriptionCheckoutState = {
  plan: SubscriptionPlan;
  couponCode: string | null;
};

const STORAGE_KEY = 'bodhi-subscription-checkout';

export const PLAN_PRICES: Record<SubscriptionPlan, number> = {
  monthly: 350,
  yearly: 2500,
};

const COUPON_OFFERS: Record<string, CouponOffer> = {
  BODHI25: {
    code: 'BODHI25',
    discountPercent: 25,
    description: '25% off your first paid billing period',
  },
};

const defaultState: SubscriptionCheckoutState = {
  plan: 'yearly',
  couponCode: null,
};

export function loadSubscriptionCheckout(): SubscriptionCheckoutState {
  if (typeof window === 'undefined') return defaultState;

  try {
    const stored = JSON.parse(window.sessionStorage.getItem(STORAGE_KEY) ?? '{}') as Partial<SubscriptionCheckoutState>;
    return {
      plan: stored.plan === 'monthly' || stored.plan === 'yearly' ? stored.plan : defaultState.plan,
      couponCode: typeof stored.couponCode === 'string' ? stored.couponCode : null,
    };
  } catch {
    return defaultState;
  }
}

export function saveSubscriptionCheckout(nextState: SubscriptionCheckoutState) {
  if (typeof window === 'undefined') return;
  window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(nextState));
}

export function normalizeCouponCode(code: string) {
  return code.trim().toUpperCase();
}

export function findCouponOffer(code: string | null | undefined) {
  if (!code) return null;
  return COUPON_OFFERS[normalizeCouponCode(code)] ?? null;
}

export function getSubscriptionPricing(plan: SubscriptionPlan, offer: CouponOffer | null) {
  const originalPrice = PLAN_PRICES[plan];
  const discountAmount = offer ? originalPrice * (offer.discountPercent / 100) : 0;
  const firstCharge = originalPrice - discountAmount;

  return {
    originalPrice,
    discountAmount,
    firstCharge,
    billingPeriod: plan === 'yearly' ? 'year' : 'month',
  };
}

export function formatIndianRupees(value: number) {
  const hasDecimals = !Number.isInteger(value);
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: hasDecimals ? 2 : 0,
    maximumFractionDigits: hasDecimals ? 2 : 0,
  })
    .format(value)
    .replace(/\s/g, '');
}

export function getTrialChargeDate() {
  const date = new Date();
  date.setDate(date.getDate() + 7);
  return new Intl.DateTimeFormat('en-IN', { day: 'numeric', month: 'short' }).format(date);
}
