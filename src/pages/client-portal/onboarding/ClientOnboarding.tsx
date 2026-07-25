import {
  useState,
  useEffect,
  useRef,
  useCallback,
  type ChangeEvent,
  type DragEvent,
  type KeyboardEvent,
  type ReactNode,
  type ComponentType,
} from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  User,
  Shield,
  FileText,
  CheckCircle2,
  ChevronRight,
  ChevronLeft,
  ChevronDown,
  UploadCloud,
  MapPin,
  Phone,
  Lock,
  Eye,
  EyeOff,
  AlertCircle,
  Loader2,
  X,
  Paperclip,
} from 'lucide-react';
import { Button } from '@/components';
import { APP_CONFIG } from '@/constants';
import { useUIStore } from '@/store/useUIStore';

/* -------------------------------------------------------------------------- */
/*  Types & config                                                            */
/* -------------------------------------------------------------------------- */

type DocKey = 'photoId' | 'proofOfAddress' | 'ssnProof' | 'other';

interface OnboardingForm {
  fullName: string;
  phone: string;
  ssn: string;
  address: string;
  provider: string;
  providerUsername: string;
  providerPassword: string;
  authorized: boolean;
  documents: Record<DocKey, File | null>;
}

type Errors = Partial<Record<keyof OnboardingForm | DocKey, string>>;

const STEPS = [
  { id: 1, title: 'Your details', icon: User },
  { id: 2, title: 'Monitoring', icon: Shield },
  { id: 3, title: 'Documents', icon: FileText },
  { id: 4, title: 'Done', icon: CheckCircle2 },
] as const;

const PROVIDERS = ['MyFreeScoreNow', 'IdentityIQ', 'SmartCredit'];

const MAX_FILE_MB = 10;
const ACCEPTED_TYPES = 'image/png,image/jpeg,image/heic,application/pdf';

const REQUIRED_DOCS: DocKey[] = ['photoId', 'proofOfAddress', 'ssnProof'];

/* -------------------------------------------------------------------------- */
/*  Formatting + validation helpers                                           */
/* -------------------------------------------------------------------------- */

const digits = (v: string) => v.replace(/\D/g, '');

function formatPhone(value: string) {
  const d = digits(value).slice(0, 10);
  if (d.length <= 3) return d;
  if (d.length <= 6) return `(${d.slice(0, 3)}) ${d.slice(3)}`;
  return `(${d.slice(0, 3)}) ${d.slice(3, 6)}-${d.slice(6)}`;
}

function formatSSN(value: string) {
  const d = digits(value).slice(0, 9);
  if (d.length <= 3) return d;
  if (d.length <= 5) return `${d.slice(0, 3)}-${d.slice(3)}`;
  return `${d.slice(0, 3)}-${d.slice(3, 5)}-${d.slice(5)}`;
}

function formatBytes(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function validateStep(step: number, form: OnboardingForm): Errors {
  const errors: Errors = {};

  if (step === 1) {
    if (form.fullName.trim().length < 3) {
      errors.fullName = 'Enter your full legal name as it appears on your ID.';
    }
    if (digits(form.phone).length !== 10) {
      errors.phone = 'Enter a 10-digit phone number.';
    }
    if (digits(form.ssn).length !== 9) {
      errors.ssn = 'Enter all 9 digits of your Social Security number.';
    }
    if (form.address.trim().length < 8) {
      errors.address = 'Enter your full street address, city, state and ZIP.';
    }
  }

  if (step === 2) {
    if (!form.provider) errors.provider = 'Choose your monitoring provider.';
    if (!form.providerUsername.trim()) {
      errors.providerUsername = 'Enter the username for that provider.';
    }
    if (!form.providerPassword) {
      errors.providerPassword = 'Enter the password or token for that provider.';
    }
  }

  if (step === 3) {
    REQUIRED_DOCS.forEach((key) => {
      if (!form.documents[key]) errors[key] = 'This document is required.';
    });
    if (!form.authorized) {
      errors.authorized = 'Check the box to authorize us to work on your file.';
    }
  }

  return errors;
}

/* -------------------------------------------------------------------------- */
/*  Shared field primitives                                                   */
/* -------------------------------------------------------------------------- */

const fieldBase =
  'w-full h-12 rounded-xl border bg-white text-surface-900 text-[15px] leading-none ' +
  'placeholder:text-surface-400 shadow-sm transition-colors ' +
  'focus:outline-none focus:ring-4 focus:ring-primary-500/15';

const fieldOk = 'border-surface-200 focus:border-primary-500';
const fieldBad = 'border-red-400 focus:border-red-500 focus:ring-red-500/15';

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} className="flex items-start gap-1.5 text-xs font-medium text-red-600">
      <AlertCircle className="mt-px h-3.5 w-3.5 shrink-0" aria-hidden="true" />
      <span>{message}</span>
    </p>
  );
}

interface TextFieldProps {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  icon?: ComponentType<{ className?: string }>;
  error?: string;
  placeholder?: string;
  type?: 'text' | 'tel' | 'password';
  inputMode?: 'text' | 'tel' | 'numeric';
  autoComplete?: string;
  maxLength?: number;
  hint?: ReactNode;
  className?: string;
  secretToggle?: boolean;
}

function TextField({
  id,
  label,
  value,
  onChange,
  icon: Icon,
  error,
  placeholder,
  type = 'text',
  inputMode,
  autoComplete = 'off',
  maxLength,
  hint,
  className = '',
  secretToggle = false,
}: TextFieldProps) {
  const [revealed, setRevealed] = useState(false);
  const isSecret = secretToggle && type === 'password';
  const inputType = isSecret ? (revealed ? 'text' : 'password') : type;

  return (
    <div className={`space-y-1.5 ${className}`}>
      <label htmlFor={id} className="block text-sm font-semibold text-surface-700">
        {label}
      </label>
      <div className="relative">
        {Icon && (
          <span className="pointer-events-none absolute inset-y-0 left-0 flex w-11 items-center justify-center">
            <Icon className="h-[18px] w-[18px] shrink-0 text-surface-400" aria-hidden="true" />
          </span>
        )}
        <input
          id={id}
          type={inputType}
          value={value}
          inputMode={inputMode}
          autoComplete={autoComplete}
          maxLength={maxLength}
          placeholder={placeholder}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${id}-error` : undefined}
          onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(e.target.value)}
          className={`${fieldBase} ${error ? fieldBad : fieldOk} ${Icon ? 'pl-11' : 'pl-4'} ${
            isSecret ? 'pr-12' : 'pr-4'
          }`}
        />
        {isSecret && (
          <button
            type="button"
            onClick={() => setRevealed((v) => !v)}
            aria-label={revealed ? `Hide ${label}` : `Show ${label}`}
            className="absolute inset-y-0 right-0 flex w-12 items-center justify-center rounded-r-xl text-surface-400 transition-colors hover:text-surface-700 focus:outline-none focus-visible:ring-4 focus-visible:ring-primary-500/15"
          >
            {revealed ? (
              <EyeOff className="h-[18px] w-[18px] shrink-0" aria-hidden="true" />
            ) : (
              <Eye className="h-[18px] w-[18px] shrink-0" aria-hidden="true" />
            )}
          </button>
        )}
      </div>
      {hint && !error && <p className="text-xs text-surface-500">{hint}</p>}
      <FieldError id={`${id}-error`} message={error} />
    </div>
  );
}

interface SelectFieldProps {
  id: string;
  label: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
  error?: string;
}

function SelectField({ id, label, value, options, onChange, error }: SelectFieldProps) {
  return (
    <div className="space-y-1.5">
      <label htmlFor={id} className="block text-sm font-semibold text-surface-700">
        {label}
      </label>
      <div className="relative">
        <select
          id={id}
          value={value}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${id}-error` : undefined}
          onChange={(e) => onChange(e.target.value)}
          className={`${fieldBase} ${error ? fieldBad : fieldOk} cursor-pointer appearance-none pl-4 pr-11 font-medium`}
        >
          <option value="" disabled>
            Select a provider
          </option>
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        {/* appearance-none removes the native arrow, so draw our own */}
        <span className="pointer-events-none absolute inset-y-0 right-0 flex w-11 items-center justify-center">
          <ChevronDown className="h-[18px] w-[18px] shrink-0 text-surface-400" aria-hidden="true" />
        </span>
      </div>
      <FieldError id={`${id}-error`} message={error} />
    </div>
  );
}

interface DropzoneProps {
  id: string;
  label: string;
  description: string;
  required?: boolean;
  file: File | null;
  error?: string;
  onSelect: (file: File | null) => void;
}

function Dropzone({ id, label, description, required, file, error, onSelect }: DropzoneProps) {
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const { addToast } = useUIStore();

  const accept = useCallback(
    (candidate: File | undefined) => {
      if (!candidate) return;
      if (candidate.size > MAX_FILE_MB * 1024 * 1024) {
        addToast({
          title: `${candidate.name} is larger than ${MAX_FILE_MB} MB. Upload a smaller file.`,
          variant: 'danger',
        });
        return;
      }
      onSelect(candidate);
    },
    [addToast, onSelect],
  );

  const onDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(false);
    accept(e.dataTransfer.files?.[0]);
  };

  return (
    <div className="space-y-1.5">
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={onDrop}
        className={`flex h-full flex-col rounded-2xl border-2 border-dashed p-5 text-center transition-colors ${
          error
            ? 'border-red-300 bg-red-50/40'
            : file
              ? 'border-emerald-300 bg-emerald-50/40'
              : dragging
                ? 'border-primary-500 bg-primary-50/60'
                : 'border-surface-200 bg-white hover:border-primary-300 hover:bg-primary-50/20'
        }`}
      >
        <div
          className={`mx-auto mb-3 flex h-11 w-11 items-center justify-center rounded-full ${
            file ? 'bg-emerald-100 text-emerald-600' : 'bg-surface-100 text-surface-400'
          }`}
        >
          {file ? (
            <CheckCircle2 className="h-5 w-5 shrink-0" aria-hidden="true" />
          ) : (
            <UploadCloud className="h-5 w-5 shrink-0" aria-hidden="true" />
          )}
        </div>

        <h4 className="mb-1 text-sm font-bold text-surface-900">
          {label}
          {!required && <span className="ml-1 font-medium text-surface-400">(optional)</span>}
        </h4>
        <p className="mb-5 text-xs leading-relaxed text-surface-500">{description}</p>

        {file ? (
          <div className="mt-auto flex items-center gap-2 rounded-xl border border-surface-200 bg-white px-3 py-2 text-left">
            <Paperclip className="h-4 w-4 shrink-0 text-surface-400" aria-hidden="true" />
            <span className="min-w-0 flex-1 truncate text-xs font-semibold text-surface-800">
              {file.name}
            </span>
            <span className="shrink-0 text-[11px] text-surface-400">{formatBytes(file.size)}</span>
            <button
              type="button"
              onClick={() => {
                onSelect(null);
                if (inputRef.current) inputRef.current.value = '';
              }}
              aria-label={`Remove ${file.name}`}
              className="shrink-0 rounded-lg p-1 text-surface-400 transition-colors hover:bg-surface-100 hover:text-red-600"
            >
              <X className="h-4 w-4 shrink-0" aria-hidden="true" />
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="mt-auto w-full rounded-xl border border-surface-200 bg-surface-50 px-4 py-2.5 text-sm font-bold text-surface-700 shadow-sm transition-colors hover:border-primary-200 hover:bg-white hover:text-primary-600 focus:outline-none focus-visible:ring-4 focus-visible:ring-primary-500/15"
          >
            Choose file
          </button>
        )}

        <input
          id={id}
          ref={inputRef}
          type="file"
          accept={ACCEPTED_TYPES}
          className="hidden"
          onChange={(e) => accept(e.target.files?.[0])}
        />
      </div>
      <FieldError id={`${id}-error`} message={error} />
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Progress tracker                                                          */
/* -------------------------------------------------------------------------- */

function ProgressTracker({ currentStep }: { currentStep: number }) {
  const percent = ((currentStep - 1) / (STEPS.length - 1)) * 100;

  return (
    <div className="mb-12 pb-8 sm:pb-10" role="group" aria-label="Onboarding progress">
      <div className="relative mx-auto flex max-w-[560px] items-center justify-between">
        <div className="absolute left-0 top-6 h-1 w-full -translate-y-1/2 rounded-full bg-surface-200" />
        <div
          className="absolute left-0 top-6 h-1 -translate-y-1/2 rounded-full bg-primary-500 transition-[width] duration-500 ease-out motion-reduce:transition-none"
          style={{ width: `${percent}%` }}
        />

        {STEPS.map((step) => {
          const Icon = step.icon;
          const isActive = step.id === currentStep;
          const isDone = step.id < currentStep;

          return (
            <div key={step.id} className="relative">
              <div
                aria-current={isActive ? 'step' : undefined}
                className={`flex h-12 w-12 items-center justify-center rounded-full border-2 bg-white transition-colors duration-300 ${
                  isDone
                    ? 'border-primary-500 bg-primary-500 text-white'
                    : isActive
                      ? 'border-primary-500 text-primary-600 shadow-lg shadow-primary-500/20'
                      : 'border-surface-200 text-surface-400'
                }`}
              >
                <Icon className="h-5 w-5 shrink-0" aria-hidden="true" />
              </div>
              <span
                className={`absolute left-1/2 top-[calc(100%+0.5rem)] hidden -translate-x-1/2 whitespace-nowrap text-xs font-bold sm:block ${
                  isActive ? 'text-primary-600' : isDone ? 'text-surface-900' : 'text-surface-400'
                }`}
              >
                {step.title}
              </span>
            </div>
          );
        })}
      </div>

      {/* Labels stack badly on narrow screens, so show only the current one */}
      <p className="mt-4 text-center text-sm font-bold text-primary-600 sm:hidden">
        {STEPS[currentStep - 1].title}
      </p>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Page                                                                      */
/* -------------------------------------------------------------------------- */

const INITIAL_FORM: OnboardingForm = {
  fullName: '',
  phone: '',
  ssn: '',
  address: '',
  provider: '',
  providerUsername: '',
  providerPassword: '',
  authorized: false,
  documents: { photoId: null, proofOfAddress: null, ssnProof: null, other: null },
};

export function ClientOnboarding() {
  const [currentStep, setCurrentStep] = useState(1);
  const [form, setForm] = useState<OnboardingForm>(INITIAL_FORM);
  const [errors, setErrors] = useState<Errors>({});
  const [isSaving, setIsSaving] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { addToast } = useUIStore();

  const isLastStep = currentStep === STEPS.length;

  const set = <K extends keyof OnboardingForm>(key: K, value: OnboardingForm[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const setDocument = (key: DocKey, file: File | null) => {
    setForm((prev) => ({ ...prev, documents: { ...prev.documents, [key]: file } }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  useEffect(() => {
    cardRef.current?.scrollIntoView({ block: 'start', behavior: 'smooth' });
  }, [currentStep]);

  const handleNext = async () => {
    if (isSaving) return;

    if (isLastStep) {
      navigate('/client/dashboard');
      return;
    }

    const stepErrors = validateStep(currentStep, form);
    if (Object.keys(stepErrors).length > 0) {
      setErrors(stepErrors);
      addToast({ title: 'Check the highlighted fields before continuing.', variant: 'danger' });
      return;
    }

    // Step 3 is the last data-entry step, so this is where the file is saved.
    if (currentStep === 3) {
      setIsSaving(true);
      try {
        // TODO: replace with the real onboarding submit call
        await new Promise((resolve) => setTimeout(resolve, 900));
        setCurrentStep(4);
        addToast({ title: 'Your profile is saved. Welcome aboard.', variant: 'success' });
      } catch {
        addToast({ title: "We couldn't save your profile. Try again.", variant: 'danger' });
      } finally {
        setIsSaving(false);
      }
      return;
    }

    setCurrentStep((prev) => prev + 1);
  };

  const handleBack = () => {
    // Once the file is submitted there is nothing to go back to.
    if (currentStep > 1 && !isLastStep) setCurrentStep((prev) => prev - 1);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement;
    if (e.key === 'Enter' && target.tagName === 'INPUT') {
      e.preventDefault();
      void handleNext();
    }
  };

  return (
    <div className="relative flex min-h-screen flex-col overflow-x-hidden bg-surface-50">
      {/* Ambient background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 h-[420px] w-[900px] max-w-none -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 opacity-10 blur-3xl"
      />

      <header className="sticky top-0 z-50 w-full border-b border-surface-200 bg-white/90 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-[1000px] items-center justify-between px-4">
          <div className="flex min-w-0 items-center gap-3">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary-50 p-1">
              <img
                src={APP_CONFIG.logoUrl}
                alt=""
                className="h-full w-full object-contain"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
            </div>
            <span className="truncate text-lg font-bold tracking-tight text-surface-900">
              Client setup
            </span>
          </div>
          <span className="shrink-0 text-sm font-medium text-surface-500">
            Step {currentStep} of {STEPS.length}
          </span>
        </div>
      </header>

      <main className="relative z-10 w-full flex-1 px-4 py-10 sm:py-14">
        <div className="mx-auto w-full max-w-[800px]">
          <ProgressTracker currentStep={currentStep} />

          <div
            ref={cardRef}
            onKeyDown={handleKeyDown}
            className="flex min-h-[520px] flex-col overflow-hidden rounded-2xl border border-surface-200 bg-white shadow-xl shadow-surface-900/5"
          >
            <div className="flex-1 p-6 sm:p-8 lg:p-10">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={currentStep}
                  initial={{ opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -16 }}
                  transition={{ duration: 0.25, ease: 'easeOut' }}
                >
                  {currentStep === 1 && (
                    <StepDetails form={form} errors={errors} set={set} />
                  )}
                  {currentStep === 2 && (
                    <StepMonitoring form={form} errors={errors} set={set} />
                  )}
                  {currentStep === 3 && (
                    <StepDocuments
                      form={form}
                      errors={errors}
                      set={set}
                      setDocument={setDocument}
                    />
                  )}
                  {currentStep === 4 && <StepComplete />}
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="flex items-center justify-between gap-3 border-t border-surface-200 bg-surface-50 p-5 sm:px-8">
              {currentStep > 1 && !isLastStep ? (
                <Button variant="outline" onClick={handleBack} className="bg-white">
                  <ChevronLeft className="mr-2 h-4 w-4 shrink-0" aria-hidden="true" />
                  Back
                </Button>
              ) : (
                <span />
              )}

              <Button onClick={handleNext} disabled={isSaving} className="px-8 shadow-md">
                {isSaving ? (
                  <>
                    <Loader2
                      className="mr-2 h-4 w-4 shrink-0 animate-spin motion-reduce:animate-none"
                      aria-hidden="true"
                    />
                    Saving
                  </>
                ) : (
                  <>
                    {isLastStep ? 'Go to dashboard' : 'Continue'}
                    <ChevronRight className="ml-2 h-4 w-4 shrink-0" aria-hidden="true" />
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Steps                                                                     */
/* -------------------------------------------------------------------------- */

interface StepProps {
  form: OnboardingForm;
  errors: Errors;
  set: <K extends keyof OnboardingForm>(key: K, value: OnboardingForm[K]) => void;
}

function StepHeader({
  title,
  subtitle,
  icon: Icon,
}: {
  title: string;
  subtitle: string;
  icon?: ComponentType<{ className?: string }>;
}) {
  return (
    <div className="mx-auto max-w-lg text-center">
      {Icon && (
        <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-50 text-primary-600">
          <Icon className="h-7 w-7 shrink-0" aria-hidden="true" />
        </div>
      )}
      <h2 className="mb-2 text-2xl font-black tracking-tight text-surface-900 sm:text-3xl">
        {title}
      </h2>
      <p className="text-base text-surface-500 sm:text-lg">{subtitle}</p>
    </div>
  );
}

function StepDetails({ form, errors, set }: StepProps) {
  return (
    <div className="space-y-8">
      <StepHeader
        title={`Welcome to ${APP_CONFIG.name}`}
        subtitle="Start with the details the bureaus need to match your file."
      />

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <TextField
          id="fullName"
          label="Full legal name"
          className="md:col-span-2"
          icon={User}
          value={form.fullName}
          onChange={(v) => set('fullName', v)}
          placeholder="First Middle Last"
          autoComplete="name"
          error={errors.fullName}
        />
        <TextField
          id="phone"
          label="Phone number"
          icon={Phone}
          type="tel"
          inputMode="tel"
          value={form.phone}
          onChange={(v) => set('phone', formatPhone(v))}
          placeholder="(555) 123-4567"
          autoComplete="tel"
          error={errors.phone}
        />
        <TextField
          id="ssn"
          label="Social Security number"
          icon={Lock}
          type="password"
          inputMode="numeric"
          secretToggle
          value={form.ssn}
          onChange={(v) => set('ssn', formatSSN(v))}
          placeholder="123-45-6789"
          maxLength={11}
          error={errors.ssn}
          hint="Encrypted at rest. Used only to verify your identity with the bureaus."
        />
        <TextField
          id="address"
          label="Current address"
          className="md:col-span-2"
          icon={MapPin}
          value={form.address}
          onChange={(v) => set('address', v)}
          placeholder="123 Main St, City, ST 06804"
          autoComplete="street-address"
          error={errors.address}
        />
      </div>
    </div>
  );
}

function StepMonitoring({ form, errors, set }: StepProps) {
  return (
    <div className="space-y-8">
      <StepHeader
        icon={Shield}
        title="Connect monitoring"
        subtitle="We pull your three-bureau report from your monitoring service to find the items worth disputing."
      />

      <div className="mx-auto w-full max-w-lg space-y-5 rounded-2xl border border-surface-200 bg-surface-50/60 p-6 sm:p-8">
        <SelectField
          id="provider"
          label="Provider"
          value={form.provider}
          options={PROVIDERS}
          onChange={(v) => set('provider', v)}
          error={errors.provider}
        />
        <TextField
          id="providerUsername"
          label="Username"
          value={form.providerUsername}
          onChange={(v) => set('providerUsername', v)}
          placeholder="Username on that account"
          error={errors.providerUsername}
        />
        <TextField
          id="providerPassword"
          label="Password or token"
          type="password"
          secretToggle
          value={form.providerPassword}
          onChange={(v) => set('providerPassword', v)}
          placeholder="Password on that account"
          error={errors.providerPassword}
        />

        <div className="flex items-start gap-3 rounded-xl border border-blue-100 bg-blue-50/60 p-4">
          <Shield className="mt-0.5 h-5 w-5 shrink-0 text-blue-500" aria-hidden="true" />
          <p className="text-xs font-medium leading-relaxed text-blue-800">
            Credentials are encrypted and used only to pull your reports. You can disconnect
            monitoring from your dashboard at any time.
          </p>
        </div>
      </div>
    </div>
  );
}

function StepDocuments({
  form,
  errors,
  set,
  setDocument,
}: StepProps & { setDocument: (key: DocKey, file: File | null) => void }) {
  return (
    <div className="space-y-8">
      <StepHeader
        icon={FileText}
        title="Verify your identity"
        subtitle="The bureaus reject disputes without proof of identity and address. PDF, JPG or PNG, up to 10 MB each."
      />

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Dropzone
          id="doc-photoId"
          label="Photo ID"
          description="Driver's license or state ID, front side, all four corners visible."
          required
          file={form.documents.photoId}
          error={errors.photoId}
          onSelect={(f) => setDocument('photoId', f)}
        />
        <Dropzone
          id="doc-proofOfAddress"
          label="Proof of address"
          description="Utility bill or bank statement from the last 60 days."
          required
          file={form.documents.proofOfAddress}
          error={errors.proofOfAddress}
          onSelect={(f) => setDocument('proofOfAddress', f)}
        />
        <Dropzone
          id="doc-ssnProof"
          label="SSN verification"
          description="Social Security card or a W-2 showing your full name."
          required
          file={form.documents.ssnProof}
          error={errors.ssnProof}
          onSelect={(f) => setDocument('ssnProof', f)}
        />
        <Dropzone
          id="doc-other"
          label="Anything else"
          description="Bureau letters, police reports or other supporting files."
          file={form.documents.other}
          error={errors.other}
          onSelect={(f) => setDocument('other', f)}
        />
      </div>

      <div className="space-y-1.5">
        <label
          htmlFor="authorized"
          className={`flex cursor-pointer items-start gap-3 rounded-xl border p-4 transition-colors ${
            errors.authorized
              ? 'border-red-300 bg-red-50/40'
              : 'border-surface-200 bg-surface-50/60 hover:border-primary-200'
          }`}
        >
          <input
            id="authorized"
            type="checkbox"
            checked={form.authorized}
            aria-invalid={Boolean(errors.authorized)}
            aria-describedby={errors.authorized ? 'authorized-error' : undefined}
            onChange={(e) => set('authorized', e.target.checked)}
            className="mt-0.5 h-5 w-5 shrink-0 cursor-pointer rounded border-surface-300 text-primary-600 focus:ring-4 focus:ring-primary-500/15"
          />
          <span className="text-sm leading-relaxed text-surface-700">
            I confirm these documents are mine and authorize {APP_CONFIG.name} to communicate with
            the credit bureaus and furnishers on my behalf. I can cancel at any time.
          </span>
        </label>
        <FieldError id="authorized-error" message={errors.authorized} />
      </div>
    </div>
  );
}

function StepComplete() {
  return (
    <div className="flex flex-col items-center justify-center space-y-6 py-10 text-center">
      <div className="relative">
        <div className="absolute inset-0 rounded-full bg-emerald-500 opacity-20 blur-3xl" />
        <div className="relative z-10 flex h-24 w-24 items-center justify-center rounded-full border-4 border-white bg-emerald-100 text-emerald-600 shadow-xl">
          <CheckCircle2 className="h-12 w-12 shrink-0" aria-hidden="true" />
        </div>
      </div>

      <div className="max-w-md space-y-3">
        <h2 className="text-2xl font-black tracking-tight text-surface-900 sm:text-3xl">
          You're all set
        </h2>
        <p className="text-lg leading-relaxed text-surface-500">
          We're analyzing your report now and building your first round of disputes.
        </p>
      </div>

      <ol className="mt-4 w-full max-w-sm space-y-4 rounded-xl border border-surface-200 bg-surface-50 p-6 text-left">
        {[
          'We review every negative and inaccurate item',
          'Your first round of dispute letters is generated',
          'You track responses and score changes in your dashboard',
        ].map((text, index) => (
          <li key={text} className="flex items-start gap-3">
            <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary-100 text-xs font-bold text-primary-600">
              {index + 1}
            </span>
            <span className="text-sm font-medium text-surface-600">{text}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}
