import {
  AlertCircle,
  ArrowLeft,
  Bug,
  Check,
  ChevronDown,
  ChevronRight,
  ClipboardList,
  CreditCard,
  FilePenLine,
  ImagePlus,
  LifeBuoy,
  LoaderCircle,
  MessageSquareWarning,
  ShieldCheck,
  X,
} from 'lucide-react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import {
  type ChangeEvent,
  type ComponentType,
  type FormEvent,
  useEffect,
  useRef,
  useState,
} from 'react';
import { useNavigate } from 'react-router';
import { SubscriptionStatusBar } from './SubscriptionScreen';

type Category = {
  id: string;
  label: string;
  icon: ComponentType<{ className?: string; strokeWidth?: number }>;
};

type SupportRequest = {
  requestId: string;
  category: string;
  submittedAt: string;
  status: 'Submitted';
  description?: string;
  attachmentName?: string;
};

const categories: Category[] = [
  { id: 'general', label: 'General Help', icon: LifeBuoy },
  { id: 'technical', label: 'Report a bug or technical issue', icon: Bug },
  { id: 'payment', label: 'Payment & Subscription', icon: CreditCard },
  { id: 'privacy', label: 'Privacy & Data', icon: ShieldCheck },
  { id: 'complaint', label: 'Complaint / Grievance', icon: MessageSquareWarning },
  { id: 'feedback', label: 'Feedback / Suggestion', icon: FilePenLine },
];

const defaultCategory = categories[1];
const maximumAttachmentSize = 20 * 1024 * 1024;
const supportSequenceKey = 'bodhi-support-request-sequence';
const lastSupportRequestKey = 'bodhi-last-support-request-id';
const supportRequestsKey = 'bodhi-support-requests';

function loadSupportRequests(): SupportRequest[] {
  try {
    const storedRequests = JSON.parse(window.localStorage.getItem(supportRequestsKey) ?? '[]');
    return Array.isArray(storedRequests) ? storedRequests : [];
  } catch {
    return [];
  }
}

function createSupportRequestId(category: string, description: string, attachmentName?: string) {
  try {
    const storedSequence = Number.parseInt(window.localStorage.getItem(supportSequenceKey) ?? '', 10);
    const nextSequence = Number.isFinite(storedSequence) ? storedSequence + 1 : 1042;
    const requestId = `BOD-${nextSequence}`;
    window.localStorage.setItem(supportSequenceKey, String(nextSequence));
    window.localStorage.setItem(lastSupportRequestKey, requestId);
    const requests = loadSupportRequests();
    const newRequest: SupportRequest = {
      requestId,
      category,
      submittedAt: new Date().toISOString(),
      status: 'Submitted',
      description,
      attachmentName,
    };
    window.localStorage.setItem(supportRequestsKey, JSON.stringify([newRequest, ...requests].slice(0, 20)));
    return requestId;
  } catch {
    return `BOD-${String(Date.now()).slice(-4)}`;
  }
}

function formatFileSize(bytes: number) {
  if (bytes < 1024 * 1024) return `${Math.max(1, Math.round(bytes / 1024))} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export default function HelpSupportScreen() {
  const navigate = useNavigate();
  const shouldReduceMotion = useReducedMotion();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const submitTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [selectedCategory, setSelectedCategory] = useState(defaultCategory);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [description, setDescription] = useState('');
  const [attachment, setAttachment] = useState<File | null>(null);
  const [descriptionError, setDescriptionError] = useState('');
  const [attachmentError, setAttachmentError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const handlePointerDown = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsCategoryOpen(false);
      }
    };

    document.addEventListener('mousedown', handlePointerDown);
    return () => document.removeEventListener('mousedown', handlePointerDown);
  }, []);

  useEffect(
    () => () => {
      if (submitTimerRef.current) clearTimeout(submitTimerRef.current);
    },
    [],
  );

  const selectCategory = (category: Category) => {
    setSelectedCategory(category);
    setIsCategoryOpen(false);
  };

  const handleAttachment = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/') && !file.type.startsWith('video/')) {
      setAttachment(null);
      setAttachmentError('Choose a photo or video file.');
      event.target.value = '';
      return;
    }

    if (file.size > maximumAttachmentSize) {
      setAttachment(null);
      setAttachmentError('Choose a file smaller than 20 MB.');
      event.target.value = '';
      return;
    }

    setAttachment(file);
    setAttachmentError('');
  };

  const removeAttachment = () => {
    setAttachment(null);
    setAttachmentError('');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmedDescription = description.trim();

    if (!trimmedDescription) {
      setDescriptionError('Please describe what happened so our support team can help.');
      descriptionRef.current?.focus();
      return;
    }

    setDescriptionError('');
    setIsSubmitting(true);

    submitTimerRef.current = setTimeout(() => {
      const requestId = createSupportRequestId(selectedCategory.label, trimmedDescription, attachment?.name);
      navigate('/home/profile/help-support/acknowledgement', {
        replace: true,
        state: {
          requestId,
          submitted: true,
          category: selectedCategory.label,
        },
      });
    }, 650);
  };

  const SelectedIcon = selectedCategory.icon;

  return (
    <div className="relative mx-auto min-h-dvh w-full max-w-md overflow-hidden bg-[#F8F8FF] text-[#15172C]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_78%_3%,rgba(219,224,255,0.88)_0%,rgba(246,246,255,0.94)_38%,rgba(255,255,255,0.98)_78%)]" />
      <div className="pointer-events-none absolute -left-28 top-[510px] h-80 w-80 rounded-full bg-[#D9DEFF]/36 blur-[82px]" />
      <div className="pointer-events-none absolute -right-32 top-[980px] h-80 w-80 rounded-full bg-[#E7D9FF]/34 blur-[84px]" />

      <div className="relative z-10 pb-10">
        <SubscriptionStatusBar />

        <header className="px-4 pb-5 pt-3 sm:px-5">
          <div className="grid grid-cols-[48px_minmax(0,1fr)_48px] items-center">
            <button
              type="button"
              aria-label="Back to profile"
              onClick={() => navigate(-1)}
              className="flex h-12 w-12 shrink-0 touch-manipulation items-center justify-center rounded-full border border-white/90 bg-white/82 text-[#5840D4] shadow-[0_10px_26px_rgba(72,61,160,0.11)] backdrop-blur-xl transition duration-200 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5840D4] focus-visible:ring-offset-2"
            >
              <ArrowLeft className="h-6 w-6" strokeWidth={2.35} />
            </button>

            <motion.h1
              initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: shouldReduceMotion ? 0.1 : 0.28, ease: 'easeOut' }}
              className="px-2 text-center text-[25px] font-extrabold leading-8 tracking-[-0.6px] text-[#12162D]"
            >
              Help &amp; Support
            </motion.h1>
            <span aria-hidden="true" />
          </div>

          <motion.p
            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: shouldReduceMotion ? 0.1 : 0.28, delay: shouldReduceMotion ? 0 : 0.03, ease: 'easeOut' }}
            className="mx-auto mt-3 max-w-[310px] text-center text-[13px] font-semibold leading-5 text-[#777C96]"
          >
            Tell us what you need help with and we’ll get back to you.
          </motion.p>

          <motion.button
            type="button"
            aria-label="View previous support requests"
            onClick={() => navigate('/home/profile/help-support/requests')}
            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: shouldReduceMotion ? 0.1 : 0.28, delay: shouldReduceMotion ? 0 : 0.04, ease: 'easeOut' }}
            className="mt-5 flex min-h-[64px] w-full touch-manipulation items-center gap-3.5 rounded-[21px] border border-white/95 bg-white/76 px-4 text-left shadow-[0_12px_28px_rgba(72,65,145,0.09),inset_0_1px_0_rgba(255,255,255,0.98)] backdrop-blur-2xl transition duration-200 active:bg-white/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5840D4]"
          >
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#ECE8FF] text-[#5E42DB]">
              <ClipboardList className="h-5 w-5" strokeWidth={2.1} />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block text-[15px] font-extrabold leading-5 text-[#20233C]">Previous Requests</span>
              <span className="mt-0.5 block text-[11px] font-semibold leading-4 text-[#7A7F99]">Track your submitted support requests</span>
            </span>
            <ChevronRight className="h-5 w-5 shrink-0 text-[#777C96]" strokeWidth={2.35} />
          </motion.button>
        </header>

        <main className="px-4 sm:px-5">
          <motion.form
            onSubmit={handleSubmit}
            noValidate
            className="rounded-[28px] border border-white/95 bg-white/78 px-5 py-6 shadow-[0_20px_48px_rgba(72,65,145,0.11),inset_0_1px_0_rgba(255,255,255,0.98)] backdrop-blur-2xl"
            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: shouldReduceMotion ? 0.1 : 0.34, delay: shouldReduceMotion ? 0 : 0.05, ease: 'easeOut' }}
          >
            <section aria-labelledby="support-category-label">
              <h2 id="support-category-label" className="text-[17px] font-extrabold leading-6 tracking-[-0.2px]">
                1. Select a category
              </h2>

              <div ref={dropdownRef} className="mt-3.5">
                <button
                  type="button"
                  aria-expanded={isCategoryOpen}
                  aria-controls="support-category-options"
                  onClick={() => setIsCategoryOpen((open) => !open)}
                  onKeyDown={(event) => {
                    if (event.key === 'Escape') setIsCategoryOpen(false);
                  }}
                  className={`flex min-h-[64px] w-full touch-manipulation items-center gap-3.5 rounded-[19px] border px-3.5 text-left shadow-[inset_0_1px_0_rgba(255,255,255,0.96)] transition duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6549DD] ${
                    isCategoryOpen
                      ? 'border-[#BFB2F6] bg-[#F4F1FF]/92'
                      : 'border-[#D9D3F2] bg-[linear-gradient(110deg,rgba(250,249,255,0.96),rgba(243,242,255,0.86))] active:bg-[#F2EFFF]'
                  }`}
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#E9E4FF] text-[#6248DC]">
                    <SelectedIcon className="h-5 w-5" strokeWidth={2.1} />
                  </span>
                  <span className="min-w-0 flex-1 text-[15px] font-bold leading-[21px] text-[#20233B]">
                    {selectedCategory.label}
                  </span>
                  <ChevronDown
                    aria-hidden="true"
                    className={`h-5 w-5 shrink-0 text-[#777C99] transition-transform duration-200 ${isCategoryOpen ? 'rotate-180' : ''}`}
                    strokeWidth={2.4}
                  />
                </button>

                <AnimatePresence initial={false}>
                  {isCategoryOpen && (
                    <motion.div
                      id="support-category-options"
                      role="listbox"
                      aria-label="Support categories"
                      initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: shouldReduceMotion ? 0 : -4 }}
                      transition={{ duration: shouldReduceMotion ? 0.1 : 0.2, ease: 'easeOut' }}
                      className="mt-2 overflow-hidden rounded-[20px] border border-[#E0DCF2] bg-white/94 p-1.5 shadow-[0_14px_32px_rgba(65,55,137,0.12)] backdrop-blur-2xl"
                    >
                      {categories.map((category) => {
                        const Icon = category.icon;
                        const selected = category.id === selectedCategory.id;
                        return (
                          <button
                            key={category.id}
                            type="button"
                            role="option"
                            aria-selected={selected}
                            onClick={() => selectCategory(category)}
                            className={`flex min-h-[52px] w-full items-center gap-3 rounded-[15px] px-3 text-left transition duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#6549DD] ${
                              selected ? 'bg-[#F0EDFF] text-[#3E2EA5]' : 'text-[#272A42] active:bg-[#F7F5FF]'
                            }`}
                          >
                            <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${selected ? 'bg-[#E4DEFF] text-[#5E42DD]' : 'bg-[#F1F2F8] text-[#626985]'}`}>
                              <Icon className="h-[19px] w-[19px]" strokeWidth={2} />
                            </span>
                            <span className="min-w-0 flex-1 text-[14px] font-semibold leading-5">{category.label}</span>
                            {selected && <Check className="h-5 w-5 shrink-0 text-[#5B3FE0]" strokeWidth={2.7} />}
                          </button>
                        );
                      })}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </section>

            <section aria-labelledby="support-description-label" className="mt-7">
              <div className="flex items-end justify-between gap-3">
                <h2 id="support-description-label" className="text-[17px] font-extrabold leading-6 tracking-[-0.2px]">
                  2. Describe your issue
                </h2>
                <span className="shrink-0 text-[12px] font-semibold tabular-nums text-[#787D98]">
                  {description.length}/1000
                </span>
              </div>

              <div className="relative mt-3.5">
                <textarea
                  ref={descriptionRef}
                  id="support-description"
                  name="support-description"
                  maxLength={1000}
                  rows={5}
                  value={description}
                  aria-labelledby="support-description-label"
                  aria-describedby={descriptionError ? 'support-description-error' : undefined}
                  aria-invalid={Boolean(descriptionError)}
                  placeholder="Let us know what’s going on…"
                  onBlur={() => {
                    if (!description.trim()) {
                      setDescriptionError('Please describe what happened so our support team can help.');
                    }
                  }}
                  onChange={(event) => {
                    setDescription(event.target.value);
                    if (event.target.value.trim()) setDescriptionError('');
                  }}
                  className={`min-h-[144px] w-full resize-none rounded-[19px] border bg-[linear-gradient(130deg,rgba(252,251,255,0.96),rgba(244,244,255,0.86))] px-4 py-4 text-[16px] font-medium leading-6 text-[#25283E] outline-none shadow-[inset_0_1px_0_white] transition placeholder:text-[#9296AF] focus:ring-2 ${
                    descriptionError
                      ? 'border-[#D96A78] focus:border-[#C94B5D] focus:ring-[#D96A78]/20'
                      : 'border-[#DAD5F2] focus:border-[#7155E0] focus:ring-[#7155E0]/18'
                  }`}
                />
              </div>
              {descriptionError && (
                <p id="support-description-error" role="alert" className="mt-2 flex items-start gap-1.5 text-[12px] font-semibold leading-[18px] text-[#B83246]">
                  <AlertCircle className="mt-px h-4 w-4 shrink-0" strokeWidth={2.2} />
                  {descriptionError}
                </p>
              )}
            </section>

            <section aria-labelledby="support-attachment-label" className="mt-7">
              <h2 id="support-attachment-label" className="text-[17px] font-extrabold leading-6 tracking-[-0.2px]">
                3. Add attachment <span className="font-medium text-[#8A8EA8]">(optional)</span>
              </h2>

              <input
                ref={fileInputRef}
                id="support-attachment"
                name="support-attachment"
                type="file"
                accept="image/*,video/*"
                className="sr-only"
                onChange={handleAttachment}
                aria-describedby={attachmentError ? 'support-attachment-error' : 'support-attachment-help'}
              />

              {attachment ? (
                <div className="mt-4 flex min-h-[96px] items-center gap-3 rounded-[20px] border border-[#CFC8F3] bg-[#F7F5FF]/86 px-4 py-3 shadow-[inset_0_1px_0_white]">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#E9E4FF] text-[#6044DA]">
                    <ImagePlus className="h-5 w-5" strokeWidth={2.15} />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-[13px] font-bold text-[#272A42]">{attachment.name}</span>
                    <span className="mt-1 block text-[11px] font-semibold text-[#777C96]">{formatFileSize(attachment.size)} · Ready to attach</span>
                  </span>
                  <button
                    type="button"
                    aria-label={`Remove ${attachment.name}`}
                    onClick={removeAttachment}
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-[#6F7390] transition active:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6549DD]"
                  >
                    <X className="h-5 w-5" strokeWidth={2.25} />
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="mt-3.5 flex min-h-[136px] w-full touch-manipulation flex-col items-center justify-center rounded-[19px] border border-dashed border-[#BFB5F2] bg-[linear-gradient(130deg,rgba(252,251,255,0.88),rgba(244,243,255,0.74))] px-4 py-4 text-center transition duration-200 active:bg-[#F3F0FF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6549DD]"
                >
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#E9E4FF] text-[#6044DA] shadow-[0_7px_16px_rgba(96,68,218,0.10)]">
                    <ImagePlus className="h-[22px] w-[22px]" strokeWidth={2.05} />
                  </span>
                  <span className="mt-2 text-[14px] font-bold text-[#5B3FD8]">Tap to add photo or video</span>
                  <span id="support-attachment-help" className="mt-1 text-[12px] font-medium leading-5 text-[#858AA4]">
                    Screenshots help us understand better
                  </span>
                </button>
              )}

              {attachmentError && (
                <p id="support-attachment-error" role="alert" className="mt-2 flex items-start gap-1.5 text-[12px] font-semibold leading-[18px] text-[#B83246]">
                  <AlertCircle className="mt-px h-4 w-4 shrink-0" strokeWidth={2.2} />
                  {attachmentError}
                </p>
              )}
            </section>

            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-6 flex min-h-[56px] w-full touch-manipulation items-center justify-center gap-2 rounded-[19px] bg-[linear-gradient(100deg,#5B32E7_0%,#6D36E8_50%,#5931DF_100%)] px-6 text-[16px] font-extrabold text-white shadow-[0_14px_28px_rgba(91,50,231,0.24)] transition duration-200 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5840D4] focus-visible:ring-offset-2"
            >
              {isSubmitting ? (
                <>
                  <LoaderCircle className="h-5 w-5 animate-spin motion-reduce:animate-none" strokeWidth={2.4} />
                  Submitting…
                </>
              ) : (
                'Submit'
              )}
            </button>
          </motion.form>
        </main>
      </div>

    </div>
  );
}
