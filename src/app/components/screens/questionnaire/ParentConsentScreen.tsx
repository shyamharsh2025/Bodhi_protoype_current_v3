import { FormEvent, useState } from 'react';
import { Check, Mail, Phone, ShieldCheck } from 'lucide-react';
import { useNavigate } from 'react-router';
import OnboardingLayout from '../../onboarding/OnboardingLayout';

type ContactMethod = 'phone' | 'email';

export default function ParentConsentScreen() {
  const navigate = useNavigate();
  const [method, setMethod] = useState<ContactMethod>('phone');
  const [contact, setContact] = useState('');
  const [error, setError] = useState('');

  const changeMethod = (nextMethod: ContactMethod) => {
    setMethod(nextMethod);
    setContact('');
    setError('');
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const value = contact.trim();

    if (!value) {
      setError(`Enter your parent or guardian's ${method === 'phone' ? 'mobile number' : 'email address'}.`);
      return;
    }

    if (method === 'phone' && !/^\+?[\d\s()-]{8,18}$/.test(value)) {
      setError('Enter a valid mobile number, including the country code.');
      return;
    }

    if (method === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      setError('Enter a valid email address.');
      return;
    }

    setError('');
    navigate('/questionnaire/parent-verification', {
      state: { contact: value, method },
    });
  };

  const isPhone = method === 'phone';

  return (
    <OnboardingLayout totalSteps={3} currentStep={3} visualVariant="consent">
      <form onSubmit={handleSubmit} className="relative flex h-full flex-col">
        <div aria-hidden="true" className="pointer-events-none absolute -right-28 -top-24 h-64 w-64 rounded-full bg-white/55 blur-[70px]" />
        <div aria-hidden="true" className="pointer-events-none absolute -left-24 top-64 h-56 w-56 rounded-full bg-[#DDEBFF]/35 blur-[80px]" />

        <div className="relative">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/80 bg-white/55 py-1.5 pl-2 pr-3 shadow-[0_8px_24px_rgba(79,70,229,0.08)] backdrop-blur-xl">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-[#7C6CF2] to-[#4F46E5] shadow-md shadow-indigo-500/20">
              <ShieldCheck className="h-4 w-4 text-white" strokeWidth={2.2} />
            </span>
            <span className="text-[11px] font-bold tracking-[0.08em] text-[#5146C9]">A SAFE STEP FOR YOUR ACCOUNT</span>
          </div>
          <h1 className="max-w-[345px] text-[30px] font-bold leading-[1.12] tracking-[-0.025em] text-[#171728]">
            A parent needs to approve your account
          </h1>
          <p className="mt-3 max-w-[355px] text-[15px] leading-[1.55] text-[#68687B]">
            Enter their details below. We’ll send a one-time code so they can approve your account.
          </p>
        </div>

        <div className="relative mt-6 rounded-[26px] border border-[#EBECF3] bg-white/90 p-4 shadow-[0_14px_34px_rgba(70,64,120,0.07),inset_0_1px_0_white] backdrop-blur-xl">
          <fieldset>
            <legend className="mb-3 block text-[11px] font-bold tracking-[0.08em] text-[#303043]">
              HOW SHOULD WE CONTACT THEM?
            </legend>
            <div className="grid grid-cols-2 rounded-[24px] border border-[#E5E6EE] bg-[#FAFBFE] p-1 shadow-[0_4px_14px_rgba(70,64,120,0.04)]">
              {(['phone', 'email'] as ContactMethod[]).map((option) => {
                const selected = method === option;
                return (
                  <button
                    key={option}
                    type="button"
                    aria-pressed={selected}
                    onClick={() => changeMethod(option)}
                    className={`flex min-h-[52px] cursor-pointer items-center justify-center rounded-[20px] border-[1.5px] text-[15px] font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5B4FDB] focus-visible:ring-offset-2 ${
                      selected
                        ? 'border-[#5B4FDB] bg-gradient-to-r from-[#F7F5FF] to-[#F4FAFF] text-[#5549CF] shadow-[0_6px_16px_rgba(79,70,229,0.09)] ring-1 ring-[#159BD7]/25'
                        : 'border-transparent bg-transparent text-[#666675] hover:bg-white/45 hover:text-gray-800'
                    }`}
                  >
                    {option === 'phone' ? 'Mobile number' : 'Email ID'}
                  </button>
                );
              })}
            </div>
          </fieldset>

          <div className="mt-4">
            <label htmlFor="parent-contact" className="mb-2 block text-[11px] font-bold tracking-[0.06em] text-[#303043]">
              PARENT OR GUARDIAN’S {isPhone ? 'MOBILE NUMBER' : 'EMAIL ADDRESS'}
            </label>
            <div className="relative">
              {isPhone ? (
                <Phone className="pointer-events-none absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
              ) : (
                <Mail className="pointer-events-none absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
              )}
              <input
                id="parent-contact"
                type={isPhone ? 'tel' : 'email'}
                inputMode={isPhone ? 'tel' : 'email'}
                autoComplete={isPhone ? 'tel' : 'email'}
                value={contact}
                onChange={(event) => {
                  setContact(event.target.value);
                  if (error) setError('');
                }}
                onBlur={() => {
                  if (!contact.trim()) setError(`Enter your parent or guardian's ${isPhone ? 'mobile number' : 'email address'}.`);
                }}
                aria-invalid={Boolean(error)}
                aria-describedby={error ? 'parent-contact-error' : 'parent-contact-help'}
                placeholder={isPhone ? '+91 98765 43210' : 'parent@example.com'}
                className={`min-h-[60px] w-full rounded-[22px] border bg-white py-4 pl-13 pr-5 text-[16px] text-gray-900 shadow-[0_5px_16px_rgba(70,64,120,0.05)] transition-all placeholder:text-[#A3A3B5] focus:outline-none focus:ring-2 ${
                  error ? 'border-red-400 focus:ring-red-200' : 'border-[#E0E0EC] focus:border-[#5B4FDB]/50 focus:ring-[#5B4FDB]/20'
                }`}
              />
            </div>
            {error ? (
              <p id="parent-contact-error" role="alert" className="mt-2 text-[12px] font-medium text-red-600">
                {error}
              </p>
            ) : (
              <p id="parent-contact-help" className="mt-2 text-[12px] leading-5 text-[#77778B]">
                {isPhone
                  ? 'Include the country code with the mobile number.'
                  : 'We’ll send the verification code to this email address.'}
              </p>
            )}
          </div>
        </div>

        <div className="relative mt-4 flex items-start gap-3 px-1">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#CFCBF8] bg-gradient-to-br from-white to-[#E7E5FF] shadow-[0_7px_18px_rgba(91,79,219,0.15)]">
            <ShieldCheck className="h-[18px] w-[18px] text-[#5B4FDB]" strokeWidth={2} />
          </div>
          <div className="pt-0.5">
            <p className="text-[13px] font-semibold text-[#36364A]">Their contact details stay private</p>
            <div className="mt-1 flex items-center gap-1.5 text-[12px] leading-5 text-[#737388]">
              <Check className="h-3.5 w-3.5 shrink-0 text-[#5B4FDB]" strokeWidth={2.5} />
              Used only for this approval and verification.
            </div>
          </div>
        </div>

        <div className="relative mt-auto pt-6">
          <button
            type="submit"
            className="relative min-h-[62px] w-full cursor-pointer overflow-hidden rounded-[32px] border border-white/20 bg-gradient-to-r from-[#5C4FDB] via-[#7164ED] to-[#5A50E6] text-[17px] font-bold text-white shadow-[0_16px_32px_rgba(79,70,229,0.32),inset_0_1px_0_rgba(255,255,255,0.35)] transition-all duration-200 before:absolute before:inset-x-8 before:top-0 before:h-px before:bg-gradient-to-r before:from-transparent before:via-white/70 before:to-transparent hover:brightness-105 hover:shadow-[0_18px_36px_rgba(79,70,229,0.38)] active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5B4FDB] focus-visible:ring-offset-2"
          >
            <span className="relative">Send verification code →</span>
          </button>
          <p className="mx-auto mt-3 max-w-[330px] text-center text-[11px] leading-4 text-[#69697C]">
            Your account stays pending until they approve it.
          </p>
        </div>
      </form>
    </OnboardingLayout>
  );
}
