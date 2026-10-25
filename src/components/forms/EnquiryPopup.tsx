"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { createContext, use, useActionState, useCallback, useEffect, useEffectEvent, useId, useRef, useState, type FormEvent, type ReactNode } from "react";
import { ArrowLeft, ArrowRight, CalendarDays, ChevronDown, Loader2, Mail, MapPin, Minus, Package, PencilLine, Plus, Send, ShieldCheck, User, Users, X } from "lucide-react";
import { submitEnquiry, type EnquiryState } from "@/app/actions/enquiry";
import { EnquirySuccess } from "@/components/forms/EnquiryForm";
import { Lotus } from "@/components/svg/Ornaments";
import { packages } from "@/content/packages";

/* ------------------------------------------------------------------ */
/* Provider: one popup for the whole public site (not the admin CMS)   */
/* ------------------------------------------------------------------ */

const EnquiryPopupContext = createContext<(() => void) | null>(null);

/** Returns a function that opens the site-wide enquiry popup. */
export function useEnquiryPopup() {
  const open = use(EnquiryPopupContext);
  if (!open) throw new Error("useEnquiryPopup must be used inside <EnquiryPopupProvider>");
  return open;
}

/** Opens on its own once per browser session, this long after a page loads. */
const AUTO_OPEN_MS = 15_000;
const SEEN_KEY = "enquiry-popup-seen";
/** Pages that already lead with an enquiry form. */
const NO_AUTO_OPEN = ["/contact"];

function seen(): boolean {
  try {
    return sessionStorage.getItem(SEEN_KEY) === "1";
  } catch {
    return false;
  }
}

function markSeen() {
  try {
    sessionStorage.setItem(SEEN_KEY, "1");
  } catch {
    /* storage blocked: the popup may simply auto-open again */
  }
}

export function EnquiryPopupProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const resetOnClose = useRef(false);
  const [formKey, setFormKey] = useState(0);

  const open = useCallback(() => {
    markSeen();
    const d = dialogRef.current;
    if (!d || d.open) return;
    d.showModal();
    // Start on the heading rather than the first button, so no focus ring flashes on open.
    d.querySelector<HTMLElement>("[data-autofocus]")?.focus();
  }, []);

  useEffect(() => {
    if (NO_AUTO_OPEN.includes(pathname) || seen()) return;
    const t = setTimeout(() => {
      // Don't interrupt someone already in a dialog (e.g. the mobile menu).
      if (seen() || document.querySelector('[aria-modal="true"], dialog[open]')) return;
      open();
    }, AUTO_OPEN_MS);
    return () => clearTimeout(t);
  }, [pathname, open]);

  return (
    <EnquiryPopupContext value={open}>
      {children}
      <dialog
        ref={dialogRef}
        aria-label="Trip enquiry"
        onClose={() => {
          // A sent enquiry starts fresh next time; a half-filled one keeps its values.
          if (resetOnClose.current) {
            resetOnClose.current = false;
            setFormKey((k) => k + 1);
          }
        }}
        onClick={(e) => {
          if (e.target === e.currentTarget) e.currentTarget.close();
        }}
        className="enquiry-dialog m-0 mt-auto max-h-[94dvh] w-full max-w-full overflow-hidden rounded-t-3xl bg-white p-0 text-ink shadow-[0_30px_80px_-20px_rgb(28_13_5/0.55)] open:flex open:flex-col sm:m-auto sm:max-h-[94dvh] sm:w-[calc(100%-2rem)] sm:max-w-[27rem] sm:rounded-3xl"
      >
        <EnquiryPopupForm
          key={formKey}
          onClose={() => dialogRef.current?.close()}
          onSuccess={() => {
            resetOnClose.current = true;
          }}
        />
      </dialog>
    </EnquiryPopupContext>
  );
}

/* ------------------------------------------------------------------ */
/* Three-step form                                                     */
/* ------------------------------------------------------------------ */

const STEPS = ["Your Details", "Trip Details", "Review & Send"] as const;

const COUNTRIES = [
  { iso: "IN", code: "+91" },
  { iso: "US", code: "+1" },
  { iso: "GB", code: "+44" },
  { iso: "CA", code: "+1" },
  { iso: "AU", code: "+61" },
  { iso: "AE", code: "+971" },
  { iso: "SG", code: "+65" },
  { iso: "NP", code: "+977" },
  { iso: "DE", code: "+49" },
  { iso: "FR", code: "+33" },
  { iso: "NZ", code: "+64" },
  { iso: "ZA", code: "+27" },
] as const;

type Values = {
  name: string;
  email: string;
  country: string;
  phone: string;
  message: string;
  dates: string;
  travellers: string;
  city: string;
  package: string;
};
type Field = keyof Values;
type Errors = Partial<Record<Field, string>>;

const EMPTY: Values = { name: "", email: "", country: "IN", phone: "", message: "", dates: "", travellers: "2", city: "", package: "" };
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const initialState: EnquiryState = { status: "idle" };

const dialCode = (iso: string) => COUNTRIES.find((c) => c.iso === iso)?.code ?? "+91";

/** Mirrors the server checks in submitEnquiry so a step only advances when it will be accepted. */
function validate(step: number, v: Values): Errors {
  const e: Errors = {};
  if (step === 0) {
    if (v.name.trim().length < 2) e.name = "Please tell us your name.";
    if (v.email.trim() && !EMAIL.test(v.email.trim())) e.email = "Please enter a valid email address.";
    const local = v.phone.replace(/\D/g, "");
    const total = dialCode(v.country).replace(/\D/g, "").length + local.length;
    if (v.country === "IN" ? local.length !== 10 : local.length < 6 || total < 10 || total > 15) {
      e.phone = v.country === "IN" ? "Please enter a 10-digit mobile number." : "Please enter a valid phone number.";
    }
  }
  if (step === 1 && v.travellers) {
    const n = Number(v.travellers);
    if (!Number.isInteger(n) || n < 1 || n > 200) e.travellers = "Please enter the number of travellers (1–200).";
  }
  return e;
}

const labelCls = "mb-1.5 block text-xs font-semibold text-ink-soft";
const inputCls =
  "w-full rounded-xl border border-[#ece4dc] bg-[#faf7f4] text-sm text-cocoa outline-none transition placeholder:text-[#a89a8e] hover:border-[#e0d3c6] focus:border-orange-500 focus:bg-white focus:ring-4 focus:ring-orange-500/12 aria-invalid:border-red-400 aria-invalid:bg-red-50/40";
const iconCls = "pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[#b39f8e] transition-colors peer-focus:text-orange-600";
const stepBtnCls =
  "grid size-11 shrink-0 place-items-center rounded-xl border border-[#ece4dc] bg-white text-ink-soft transition-colors hover:border-orange-500 hover:text-ember-deep";

function EnquiryPopupForm({ onClose, onSuccess }: { onClose: () => void; onSuccess: () => void }) {
  const [state, formAction, pending] = useActionState(submitEnquiry, initialState);
  const [step, setStep] = useState(0);
  const [v, setV] = useState<Values>(EMPTY);
  const [errors, setErrors] = useState<Errors>({});
  const uid = useId();
  const bodyRef = useRef<HTMLDivElement>(null);
  const successRef = useRef<HTMLDivElement>(null);
  const id = (f: string) => `${uid}-${f}`;
  const last = STEPS.length - 1;

  const reportSuccess = useEffectEvent(() => onSuccess());
  useEffect(() => {
    if (state.status === "success") {
      reportSuccess();
      successRef.current?.focus();
    }
  }, [state]);

  const set = (f: Field) => (e: { target: { value: string } }) => {
    setV((prev) => ({ ...prev, [f]: e.target.value }));
    if (errors[f]) setErrors((prev) => ({ ...prev, [f]: undefined }));
  };

  function goTo(next: number) {
    setStep(next);
    bodyRef.current?.scrollTo({ top: 0 });
  }

  /** Validates the given step; on failure shows it and focuses its first invalid field. */
  function check(s: number): boolean {
    const e = validate(s, v);
    const first = Object.keys(e)[0];
    if (!first) return true;
    setErrors(e);
    if (s !== step) goTo(s);
    requestAnimationFrame(() => document.getElementById(id(first))?.focus());
    return false;
  }

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    // Enter on an earlier step means "Continue"; on the last step every step must still pass.
    if (step < last) {
      e.preventDefault();
      if (check(step)) goTo(step + 1);
      return;
    }
    if (!check(0) || !check(1)) e.preventDefault();
  }

  const errorText = (f: Field) =>
    errors[f] ? (
      <p id={id(`${f}-error`)} className="mt-1 text-xs font-medium text-[#b91c1c]">
        {errors[f]}
      </p>
    ) : null;
  const a11y = (f: Field) => ({ id: id(f), "aria-invalid": Boolean(errors[f]), "aria-describedby": errors[f] ? id(`${f}-error`) : undefined });
  const travellers = (delta: number) => setV((p) => ({ ...p, travellers: String(Math.min(200, Math.max(1, (Number(p.travellers) || 0) + delta))) }));

  const closeButton = (
    <button
      type="button"
      onClick={onClose}
      aria-label="Close enquiry form"
      className="absolute right-4 top-4 grid size-8 place-items-center rounded-full text-stone transition-colors hover:bg-[#f4ece4] hover:text-ink"
    >
      <X size={18} aria-hidden="true" />
    </button>
  );

  if (state.status === "success") {
    return (
      <div className="no-scrollbar relative overflow-y-auto">
        {closeButton}
        <EnquirySuccess ref={successRef} state={state} className="px-6 pb-8 pt-12" />
      </div>
    );
  }

  const country = dialCode(v.country);
  const review: { label: string; value: string; step: number }[] = [
    { label: "Name", value: v.name, step: 0 },
    { label: "Phone", value: `${country} ${v.phone}`, step: 0 },
    { label: "Email", value: v.email, step: 0 },
    { label: "Request", value: v.message, step: 0 },
    { label: "Dates", value: v.dates, step: 1 },
    { label: "Travellers", value: v.travellers, step: 1 },
    { label: "From", value: v.city, step: 1 },
    { label: "Package", value: v.package || "Not sure yet", step: 1 },
  ];

  return (
    <form action={formAction} onSubmit={onSubmit} noValidate className="flex min-h-0 flex-1 flex-col">
      <div className="relative px-5 pb-4 pt-5 sm:px-6">
        <div className="flex items-center gap-3 pr-8">
          <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-linear-to-br from-orange-500 to-orange-700 text-white shadow-[0_8px_16px_-8px_rgb(234_88_12/0.9)]">
            <Lotus className="w-6" />
          </span>
          <div data-autofocus tabIndex={-1} className="min-w-0 outline-none">
            <p className="text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-ember-deep">
              Step {step + 1} of {STEPS.length}
            </p>
            <h2 className="text-lg font-bold leading-tight tracking-tight text-cocoa">{STEPS[step]}</h2>
          </div>
        </div>
        <ol className="mt-4 grid grid-cols-3 gap-1.5" aria-hidden="true">
          {STEPS.map((label, i) => (
            <li key={label} className="h-1 overflow-hidden rounded-full bg-[#f1e9e1]">
              <span className={`block h-full origin-left rounded-full bg-linear-to-r from-orange-600 to-amber-500 transition-transform duration-500 ease-braj ${i <= step ? "scale-x-100" : "scale-x-0"}`} />
            </li>
          ))}
        </ol>
        {closeButton}
      </div>

      <div ref={bodyRef} className="no-scrollbar min-h-0 flex-1 overflow-y-auto px-5 pb-2 pt-1 sm:px-6">
        {state.status === "error" && (
          <p role="alert" className="mb-4 rounded-xl border border-[#fecaca] bg-[#fef2f2] px-3.5 py-2.5 text-xs font-medium text-[#991b1b]">
            {state.message} {state.errors && Object.values(state.errors).join(" ")}
          </p>
        )}

        {/* Honeypot — hidden from people and assistive tech. */}
        <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
          <label htmlFor={id("company")}>Company</label>
          <input id={id("company")} type="text" name="company" tabIndex={-1} autoComplete="off" />
        </div>
        {/* The server action receives the full number in one field. */}
        <input type="hidden" name="phone" value={`${country} ${v.phone.replace(/\D/g, "")}`} />

        <fieldset hidden={step !== 0} className="grid gap-3.5">
          <legend className="sr-only">Your details</legend>
          <div>
            <label htmlFor={id("name")} className={labelCls}>
              Full name
            </label>
            <div className="relative">
              <input {...a11y("name")} name="name" type="text" autoComplete="name" maxLength={80} placeholder="Your full name" value={v.name} onChange={set("name")} className={`peer ${inputCls} h-11 pl-10 pr-3.5`} />
              <User size={16} aria-hidden="true" className={iconCls} />
            </div>
            {errorText("name")}
          </div>
          <div>
            <label htmlFor={id("email")} className={labelCls}>
              Email <span className="font-normal text-stone">(optional)</span>
            </label>
            <div className="relative">
              <input {...a11y("email")} name="email" type="email" autoComplete="email" inputMode="email" maxLength={120} placeholder="you@example.com" value={v.email} onChange={set("email")} className={`peer ${inputCls} h-11 pl-10 pr-3.5`} />
              <Mail size={16} aria-hidden="true" className={iconCls} />
            </div>
            {errorText("email")}
          </div>
          <div>
            <label htmlFor={id("phone")} className={labelCls}>
              Phone / WhatsApp
            </label>
            <div className="flex rounded-xl transition focus-within:ring-4 focus-within:ring-orange-500/12">
              <div className="relative shrink-0">
                <label htmlFor={id("country")} className="sr-only">
                  Country code
                </label>
                <select
                  id={id("country")}
                  value={v.country}
                  onChange={set("country")}
                  autoComplete="tel-country-code"
                  className={`${inputCls} h-11 w-[5.75rem] cursor-pointer appearance-none rounded-r-none border-r-0 pl-3.5 pr-7 font-semibold focus:ring-0`}
                >
                  {COUNTRIES.map((c) => (
                    <option key={c.iso} value={c.iso}>
                      {c.iso} {c.code}
                    </option>
                  ))}
                </select>
                <ChevronDown size={13} aria-hidden="true" className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-stone" />
              </div>
              <input
                {...a11y("phone")}
                type="tel"
                inputMode="numeric"
                autoComplete="tel-national"
                maxLength={16}
                placeholder={v.country === "IN" ? "10-digit mobile number" : "Phone number"}
                value={v.phone}
                onChange={set("phone")}
                className={`${inputCls} h-11 min-w-0 flex-1 rounded-l-none px-3.5 focus:ring-0`}
              />
            </div>
            {errorText("phone")}
          </div>
          <div>
            <label htmlFor={id("message")} className={labelCls}>
              Special request <span className="font-normal text-stone">(optional)</span>
            </label>
            <textarea
              id={id("message")}
              name="message"
              rows={2}
              maxLength={1200}
              placeholder="Temples you’d love to visit, special needs…"
              value={v.message}
              onChange={set("message")}
              className={`${inputCls} block resize-none px-3.5 py-2.5 leading-relaxed`}
            />
          </div>
        </fieldset>

        <fieldset hidden={step !== 1} className="grid gap-3.5">
          <legend className="sr-only">Trip details</legend>
          <div>
            <label htmlFor={id("dates")} className={labelCls}>
              Travel dates
            </label>
            <div className="relative">
              <input {...a11y("dates")} name="dates" type="text" maxLength={80} placeholder="e.g. 12–14 Nov, flexible" value={v.dates} onChange={set("dates")} className={`peer ${inputCls} h-11 pl-10 pr-3.5`} />
              <CalendarDays size={16} aria-hidden="true" className={iconCls} />
            </div>
          </div>
          <div>
            <label htmlFor={id("travellers")} className={labelCls}>
              Travellers
            </label>
            <div className="flex items-center gap-2">
              <button type="button" aria-label="One fewer traveller" onClick={() => travellers(-1)} className={stepBtnCls}>
                <Minus size={16} aria-hidden="true" />
              </button>
              <div className="relative flex-1">
                <input
                  {...a11y("travellers")}
                  name="travellers"
                  type="number"
                  inputMode="numeric"
                  min={1}
                  max={200}
                  value={v.travellers}
                  onChange={set("travellers")}
                  className={`peer ${inputCls} h-11 pl-10 pr-3.5 font-semibold [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none`}
                />
                <Users size={16} aria-hidden="true" className={iconCls} />
              </div>
              <button type="button" aria-label="One more traveller" onClick={() => travellers(1)} className={stepBtnCls}>
                <Plus size={16} aria-hidden="true" />
              </button>
            </div>
            {errorText("travellers")}
          </div>
          <div>
            <label htmlFor={id("city")} className={labelCls}>
              Starting city
            </label>
            <div className="relative">
              <input {...a11y("city")} name="city" type="text" autoComplete="address-level2" maxLength={80} placeholder="Delhi, Agra, Mathura…" value={v.city} onChange={set("city")} className={`peer ${inputCls} h-11 pl-10 pr-3.5`} />
              <MapPin size={16} aria-hidden="true" className={iconCls} />
            </div>
          </div>
          <div>
            <label htmlFor={id("package")} className={labelCls}>
              Package interest
            </label>
            <div className="relative">
              <select {...a11y("package")} name="package" value={v.package} onChange={set("package")} className={`peer ${inputCls} h-11 cursor-pointer appearance-none pl-10 pr-9`}>
                <option value="">Not sure yet — help me plan</option>
                {packages.map((p) => (
                  <option key={p.slug} value={p.title}>
                    {p.title}
                  </option>
                ))}
                <option value="Custom trip">Custom trip</option>
              </select>
              <Package size={16} aria-hidden="true" className={iconCls} />
              <ChevronDown size={15} aria-hidden="true" className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-stone" />
            </div>
          </div>
        </fieldset>

        <div hidden={step !== 2}>
          <dl className="divide-y divide-[#f1e9e1] rounded-xl border border-[#f1e9e1] bg-[#faf7f4]">
            {review.map((r) => (
              <div key={r.label} className="grid grid-cols-[5.5rem_minmax(0,1fr)_auto] items-start gap-2 px-3.5 py-2 text-[0.8rem]">
                <dt className="text-stone">{r.label}</dt>
                <dd className="break-words font-medium text-cocoa">{r.value.trim() || <span className="font-normal text-[#a89a8e]">—</span>}</dd>
                <dd>
                  <button type="button" onClick={() => goTo(r.step)} className="grid size-6 place-items-center rounded-md text-stone transition-colors hover:bg-white hover:text-ember-deep" aria-label={`Edit ${r.label.toLowerCase()}`}>
                    <PencilLine size={13} aria-hidden="true" />
                  </button>
                </dd>
              </div>
            ))}
          </dl>
          <p className="mt-3 text-[0.7rem] leading-relaxed text-stone">
            We use your details only to reply to this enquiry. See our{" "}
            <Link href="/privacy-policy" onClick={onClose} className="font-medium text-ember-deep underline underline-offset-2">
              privacy policy
            </Link>
            .
          </p>
        </div>
      </div>

      <div className="px-5 pb-5 pt-4 sm:px-6">
        <div className="flex gap-2.5">
          {step > 0 && (
            <button
              type="button"
              onClick={() => goTo(step - 1)}
              aria-label="Back"
              className="grid size-11 shrink-0 place-items-center rounded-xl border border-[#ece4dc] bg-white text-ink-soft transition-colors hover:border-orange-500 hover:text-ember-deep"
            >
              <ArrowLeft size={18} aria-hidden="true" />
            </button>
          )}
          <button
            type="submit"
            disabled={pending}
            className="group/cta inline-flex h-11 flex-1 items-center justify-center gap-2 rounded-xl bg-linear-to-r from-orange-600 to-orange-700 text-sm font-semibold text-white shadow-[0_12px_24px_-12px_rgb(234_88_12/0.9)] transition-[filter,transform] hover:-translate-y-px hover:brightness-110 disabled:cursor-wait disabled:opacity-80"
          >
            {step < last ? (
              <>
                Continue <ArrowRight size={16} aria-hidden="true" className="transition-transform group-hover/cta:translate-x-0.5" />
              </>
            ) : pending ? (
              <>
                <Loader2 size={16} aria-hidden="true" className="animate-spin" /> Sending…
              </>
            ) : (
              <>
                <Send size={15} aria-hidden="true" /> Send Enquiry
              </>
            )}
          </button>
        </div>
        <p className="mt-3 flex items-center justify-center gap-1.5 text-[0.7rem] text-stone">
          <ShieldCheck size={13} aria-hidden="true" className="text-orange-600" /> Free trip planning · Your details stay private
        </p>
      </div>
    </form>
  );
}
