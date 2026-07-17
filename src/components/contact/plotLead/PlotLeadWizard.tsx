import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type KeyboardEvent,
} from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  CheckIcon,
  Loader2Icon,
  SparklesIcon,
  XIcon,
} from 'lucide-react';
import { Button } from '../../ui/Button';
import { Input } from '../../ui/Input';
import { useBodyScrollLock } from '../../../hooks/useBodyScrollLock';
import { usePrefersReducedMotion } from '../../../hooks/usePrefersReducedMotion';
import {
  DEFAULT_LEAD_PROJECT_ID,
  LEAD_PROJECTS,
  PLOT_SIZE_OPTIONS,
  PURCHASE_TIMELINE_OPTIONS,
  SITE_VISIT_OPTIONS,
  WORK_TYPE_OPTIONS,
} from '../../../config/leadProjects';
import {
  isNonEmptyName,
  isValidPakistaniPhone,
  normalizePakistaniPhone,
} from '../../../lib/plotLeadValidation';
import { submitPlotLead, queuePlotLead } from '../../../lib/submissions';
import { trackPlotLeadConversion } from '../../../lib/leadAnalytics';
import {
  openVisitorPlotLeadWhatsApp,
  type PlotLeadPayload,
} from '../../../lib/plotLeadWhatsApp';
import { ChoiceCard } from './ChoiceCard';
import {
  INITIAL_PLOT_LEAD,
  QUESTION_STEP_COUNT,
  type PlotLeadFormData,
  type WizardPhase,
} from './types';

const slide = {
  initial: { opacity: 0, x: 36 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -36 },
};

type Props = {
  /** When true, wizard fills the viewport as a modal overlay. */
  open?: boolean;
  onClose?: () => void;
};

export function PlotLeadWizard({ open = true, onClose }: Props) {
  const reduceMotion = usePrefersReducedMotion();
  const dialogTitleId = useId();
  const inputRef = useRef<HTMLInputElement>(null);

  const [step, setStep] = useState(0);
  const [phase, setPhase] = useState<WizardPhase>('questions');
  const [data, setData] = useState<PlotLeadFormData>({
    ...INITIAL_PLOT_LEAD,
    projectId: DEFAULT_LEAD_PROJECT_ID,
  });
  const [error, setError] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);

  useBodyScrollLock(open);

  const progress =
    phase === 'review'
      ? 100
      : Math.round(((step + 1) / QUESTION_STEP_COUNT) * 100);

  const update = useCallback(
    <K extends keyof PlotLeadFormData>(key: K, value: PlotLeadFormData[K]) => {
      setData((prev) => ({ ...prev, [key]: value }));
      setError(null);
    },
    []
  );

  const validateStep = useCallback((): string | null => {
    switch (step) {
      case 0:
        return isNonEmptyName(data.firstName) ? null : 'Please enter your first name';
      case 1:
        return isNonEmptyName(data.lastName) ? null : 'Please enter your last name';
      case 2:
        return isValidPakistaniPhone(data.phone)
          ? null
          : 'Enter a valid Pakistani mobile number (e.g. 03XX XXXXXXX)';
      case 3:
        return data.city.trim().length >= 2 ? null : 'Please enter your city';
      case 4:
        return data.workType ? null : 'Please select business or private job';
      case 5:
        return data.projectId ? null : 'Please select a project';
      case 6:
        return data.plotSize ? null : 'Please select a plot size';
      case 7:
        return data.purchaseTimeline ? null : 'Please select when you plan to purchase';
      case 8:
        return data.siteVisit ? null : 'Please choose a site visit preference';
      default:
        return null;
    }
  }, [step, data]);

  const advanceFromChoice = useCallback(
    (patch: Partial<PlotLeadFormData>) => {
      setData((prev) => ({ ...prev, ...patch }));
      setError(null);
      window.setTimeout(() => {
        if (step < QUESTION_STEP_COUNT - 1) {
          setStep((s) => s + 1);
        } else {
          setPhase('review');
        }
      }, reduceMotion ? 0 : 220);
    },
    [step, reduceMotion]
  );

  const goNext = useCallback(() => {
    const err = validateStep();
    if (err) {
      setError(err);
      return;
    }
    setError(null);
    if (step < QUESTION_STEP_COUNT - 1) {
      setStep((s) => s + 1);
    } else {
      setPhase('review');
    }
  }, [step, validateStep]);

  const goBack = useCallback(() => {
    setError(null);
    if (phase === 'review') {
      setPhase('questions');
      setStep(QUESTION_STEP_COUNT - 1);
      return;
    }
    setStep((s) => Math.max(0, s - 1));
  }, [phase]);

  useEffect(() => {
    if (!open || phase !== 'questions') return;
    const t = window.setTimeout(() => inputRef.current?.focus(), 120);
    return () => window.clearTimeout(t);
  }, [open, step, phase]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: globalThis.KeyboardEvent) => {
      if (e.key === 'Escape' && onClose) onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  const handleEnter = (e: KeyboardEvent) => {
    if (e.key !== 'Enter' || phase !== 'questions') return;
    if (step < 5) return;
    e.preventDefault();
    goNext();
  };

  const buildPayload = (): PlotLeadPayload => ({
    firstName: data.firstName.trim(),
    lastName: data.lastName.trim(),
    phone: normalizePakistaniPhone(data.phone),
    city: data.city.trim(),
    workType: data.workType,
    projectId: data.projectId,
    plotSize: data.plotSize,
    purchaseTimeline: data.purchaseTimeline,
    siteVisit: data.siteVisit,
    submittedAt: new Date().toISOString(),
  });

  const handleSubmit = async () => {
    setSubmitError(null);
    setPhase('submitting');
    const payload = buildPayload();

    const res = await submitPlotLead(payload);
    if (!res.ok) {
      setPhase('review');
      setSubmitError(res.error);
      return;
    }

    completePlotLeadSuccess(payload);
  };

  const completePlotLeadSuccess = (payload: PlotLeadPayload) => {
    trackPlotLeadConversion({
      projectId: payload.projectId,
      plotSize: payload.plotSize,
      source: 'plot_lead_wizard',
    });

    openVisitorPlotLeadWhatsApp(payload);
  };

  const handleWhatsAppFallback = () => {
    const payload = buildPayload();
    queuePlotLead(payload);
    completePlotLeadSuccess(payload);
  };

  if (!open) return null;

  const stepTitles: Record<number, { title: string; subtitle?: string }> = {
    0: {
      title: "Let's Find Your Perfect Plot",
      subtitle:
        'Answer a few quick questions and our property consultant will contact you shortly.',
    },
    1: { title: 'What is your Last Name?' },
    2: { title: 'What is your WhatsApp Number?' },
    3: { title: 'Which city do you live in?' },
    4: {
      title: 'Do you run a business or have a private job?',
      subtitle: 'This helps us recommend the right investment options for you.',
    },
    5: { title: 'Which project are you interested in?' },
    6: { title: 'Which plot size are you interested in?' },
    7: { title: 'When are you planning to purchase?' },
    8: { title: 'Would you like a FREE Site Visit?' },
  };

  const current = stepTitles[step];

  return (
    <div
      className="fixed inset-0 z-[75] flex flex-col bg-navy-950/80 backdrop-blur-md"
      role="presentation"
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
        <div className="absolute -left-24 top-0 h-72 w-72 rounded-full bg-gold-500/15 blur-3xl" />
        <div className="absolute -right-16 bottom-0 h-80 w-80 rounded-full bg-navy-500/30 blur-3xl" />
      </div>

      <div className="relative flex min-h-0 flex-1 flex-col">
        {/* Top bar */}
        <div className="shrink-0 border-b border-white/10 bg-navy-950/40 px-4 py-3 backdrop-blur-xl sm:px-6">
          <div className="mx-auto flex max-w-2xl items-center gap-3">
            <div className="min-w-0 flex-1">
              <div className="mb-1.5 flex items-center justify-between gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-gold-300/90">
                <span className="inline-flex items-center gap-1.5">
                  <SparklesIcon className="h-3 w-3" aria-hidden />
                  {phase === 'review' ? 'Review' : `Step ${step + 1} of ${QUESTION_STEP_COUNT}`}
                </span>
                <span>{progress}%</span>
              </div>
              <div className="h-1.5 overflow-hidden rounded-full bg-navy-800">
                <motion.div
                  className="h-full bg-gradient-to-r from-gold-400 via-gold-500 to-gold-600"
                  initial={false}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: reduceMotion ? 0 : 0.45, ease: 'easeOut' }}
                />
              </div>
            </div>
            {onClose && (
              <button
                type="button"
                onClick={onClose}
                aria-label="Close form"
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/15 text-cream/80 transition hover:bg-white/10 hover:text-cream"
              >
                <XIcon className="h-5 w-5" />
              </button>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="flex min-h-0 flex-1 items-center justify-center overflow-y-auto overscroll-contain px-4 py-6 sm:px-6 sm:py-10">
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby={dialogTitleId}
            className="w-full max-w-xl rounded-[1.75rem] border border-white/10 bg-white/80 p-6 shadow-[0_32px_80px_-24px_rgba(0,0,0,0.55)] backdrop-blur-xl dark:border-gold-500/20 dark:bg-navy-900/85 sm:max-w-2xl sm:p-8 md:p-10"
          >
            <AnimatePresence mode="wait">
              {phase === 'review' || phase === 'submitting' ? (
                <motion.div
                  key="review"
                  initial={reduceMotion ? false : slide.initial}
                  animate={slide.animate}
                  exit={slide.exit}
                  transition={{ duration: 0.28 }}
                  className="text-center"
                >
                  <motion.div
                    initial={reduceMotion ? false : { scale: 0.85, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: 'spring', stiffness: 260, damping: 20 }}
                    className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-accent-green shadow-[0_0_40px_rgba(34,197,94,0.25)]"
                  >
                    <CheckIcon className="h-10 w-10 text-white" aria-hidden />
                  </motion.div>
                  <h2
                    id={dialogTitleId}
                    className="font-display text-3xl font-bold text-navy-900 dark:text-cream sm:text-4xl"
                  >
                    You&apos;re Almost Done!
                  </h2>
                  <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-navy-600 dark:text-cream/75 sm:text-base">
                    Tap the button below — WhatsApp will open with your details already written.
                    Just press <strong className="font-semibold text-navy-800 dark:text-cream">Send</strong>.
                  </p>
                  <ul className="mx-auto mt-6 max-w-xs space-y-3 text-left text-sm font-medium text-navy-800 dark:text-cream/90">
                    {[
                      'Latest prices',
                      'Payment plan',
                      'Plot availability',
                      'Free site visit',
                    ].map((item) => (
                      <li key={item} className="flex items-center gap-2.5">
                        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent-green-soft text-accent-green">
                          <CheckIcon className="h-3.5 w-3.5" />
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>
                  {submitError && (
                    <div className="mt-6 space-y-3">
                      <p className="rounded-xl border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-700 dark:text-red-300">
                        {submitError}
                      </p>
                      <Button
                        variant="secondary"
                        size="lg"
                        className="w-full min-h-[3rem]"
                        onClick={handleWhatsAppFallback}
                      >
                        Send via WhatsApp instead
                      </Button>
                    </div>
                  )}
                  <Button
                    variant="primary"
                    size="lg"
                    className="mt-8 w-full min-h-[3.25rem] text-base"
                    onClick={handleSubmit}
                    disabled={phase === 'submitting'}
                  >
                    {phase === 'submitting' ? (
                      <>
                        <Loader2Icon className="h-5 w-5 animate-spin" aria-hidden />
                        Submitting…
                      </>
                    ) : (
                      'Submit & Open WhatsApp'
                    )}
                  </Button>
                  <button
                    type="button"
                    onClick={goBack}
                    disabled={phase === 'submitting'}
                    className="mt-4 text-sm font-semibold text-navy-500 underline-offset-2 hover:underline disabled:opacity-50 dark:text-cream/55"
                  >
                    Go back and edit
                  </button>
                </motion.div>
              ) : (
                <motion.div
                  key={`step-${step}`}
                  initial={reduceMotion ? false : slide.initial}
                  animate={slide.animate}
                  exit={slide.exit}
                  transition={{ duration: 0.28 }}
                >
                  <h2
                    id={dialogTitleId}
                    className="font-display text-2xl font-bold leading-tight text-navy-900 dark:text-cream sm:text-3xl md:text-[2rem]"
                  >
                    {step === 0 ? (
                      current.title
                    ) : (
                      <>
                        <span className="block text-sm font-semibold uppercase tracking-[0.22em] text-gold-600 dark:text-gold-400">
                          Question {step + 1}
                        </span>
                        <span className="mt-2 block">{current.title}</span>
                      </>
                    )}
                  </h2>
                  {current.subtitle && (
                    <p className="mt-3 text-sm leading-relaxed text-navy-600 dark:text-cream/75 sm:text-base">
                      {current.subtitle}
                    </p>
                  )}

                  <div className="mt-8 min-h-[140px]">
                    {step === 0 && (
                      <Input
                        ref={inputRef}
                        label="First Name"
                        placeholder="Your first name"
                        value={data.firstName}
                        onChange={(e) => update('firstName', e.target.value)}
                        onKeyDown={handleEnter}
                        autoComplete="given-name"
                        error={error ?? undefined}
                      />
                    )}
                    {step === 1 && (
                      <Input
                        ref={inputRef}
                        label="Last Name"
                        placeholder="Your last name"
                        value={data.lastName}
                        onChange={(e) => update('lastName', e.target.value)}
                        onKeyDown={handleEnter}
                        autoComplete="family-name"
                        error={error ?? undefined}
                      />
                    )}
                    {step === 2 && (
                      <Input
                        ref={inputRef}
                        label="Phone Number"
                        type="tel"
                        inputMode="tel"
                        placeholder="03XX XXXXXXX"
                        value={data.phone}
                        onChange={(e) => update('phone', e.target.value)}
                        onKeyDown={handleEnter}
                        autoComplete="tel"
                        error={error ?? undefined}
                      />
                    )}
                    {step === 3 && (
                      <Input
                        ref={inputRef}
                        label="Your City"
                        placeholder="e.g. Islamabad, Rawalpindi, Lahore"
                        value={data.city}
                        onChange={(e) => update('city', e.target.value)}
                        onKeyDown={handleEnter}
                        autoComplete="address-level2"
                        error={error ?? undefined}
                      />
                    )}
                    {step === 4 && (
                      <div className="grid gap-3 sm:grid-cols-2">
                        {WORK_TYPE_OPTIONS.map((opt) => (
                          <ChoiceCard
                            key={opt}
                            label={opt}
                            description={
                              opt === 'Business'
                                ? 'Self-employed or business owner'
                                : 'Salaried / private sector job'
                            }
                            selected={data.workType === opt}
                            onClick={() => advanceFromChoice({ workType: opt })}
                          />
                        ))}
                      </div>
                    )}
                    {step === 5 && (
                      <div className="grid gap-3">
                        {LEAD_PROJECTS.map((project) => (
                          <ChoiceCard
                            key={project.id}
                            label={project.label}
                            description={project.detail}
                            badge={'badge' in project ? project.badge : undefined}
                            selected={data.projectId === project.id}
                            onClick={() => advanceFromChoice({ projectId: project.id })}
                          />
                        ))}
                      </div>
                    )}
                    {step === 6 && (
                      <div className="grid gap-3 sm:grid-cols-2">
                        {PLOT_SIZE_OPTIONS.map((size) => (
                          <ChoiceCard
                            key={size}
                            label={size}
                            selected={data.plotSize === size}
                            onClick={() => advanceFromChoice({ plotSize: size })}
                          />
                        ))}
                      </div>
                    )}
                    {step === 7 && (
                      <div className="grid gap-2.5 sm:grid-cols-2">
                        {PURCHASE_TIMELINE_OPTIONS.map((opt) => (
                          <ChoiceCard
                            key={opt}
                            label={opt}
                            compact
                            selected={data.purchaseTimeline === opt}
                            onClick={() => advanceFromChoice({ purchaseTimeline: opt })}
                          />
                        ))}
                      </div>
                    )}
                    {step === 8 && (
                      <div className="grid gap-3 sm:grid-cols-2">
                        {SITE_VISIT_OPTIONS.map((opt) => (
                          <ChoiceCard
                            key={opt}
                            label={opt}
                            selected={data.siteVisit === opt}
                            onClick={() => advanceFromChoice({ siteVisit: opt })}
                          />
                        ))}
                      </div>
                    )}
                    {error && step >= 4 && (
                      <p className="mt-3 text-sm text-red-500" role="alert">
                        {error}
                      </p>
                    )}
                  </div>

                  <div className="mt-8 flex items-center justify-between gap-3 border-t border-navy-100 pt-6 dark:border-navy-700">
                    <Button
                      type="button"
                      variant="ghost"
                      onClick={goBack}
                      disabled={step === 0}
                      className="min-h-[2.75rem]"
                    >
                      <ArrowLeftIcon className="h-4 w-4" aria-hidden />
                      Previous
                    </Button>
                    <Button
                      type="button"
                      variant="primary"
                      onClick={goNext}
                      className="min-h-[2.75rem] min-w-[8rem]"
                      disabled={step === 4 || step >= 6}
                    >
                      Next
                      <ArrowRightIcon className="h-4 w-4" aria-hidden />
                    </Button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
