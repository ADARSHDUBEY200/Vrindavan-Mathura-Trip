"use client";

import Link from "next/link";
import { createContext, use, useActionState, useCallback, useEffect, useEffectEvent, useId, useRef, useState, type Dispatch, type FormEvent, type ReactNode, type SetStateAction } from "react";
import { ArrowRight, CalendarDays, CarFront, ChevronDown, Clock3, Loader2, MapPin, Minus, Phone, Plus, Route as RouteIcon, Send, ShieldCheck, User, Users, X } from "lucide-react";
import { submitEnquiry, type EnquiryState } from "@/app/actions/enquiry";
import { EnquirySuccess } from "@/components/forms/EnquiryForm";
import { WhatsappIcon } from "@/components/svg/TravelIcons";
import { phoneHref, site } from "@/config/site";
import { fleet, tripTypes, vehicleLabel, type TripType, type VehicleId } from "@/content/taxi";
import { whatsappLink } from "@/lib/whatsapp";

/* ------------------------------------------------------------------ */
/* Provider: one booking dialog for the taxi page                      */
/* ------------------------------------------------------------------ */

export type BookingPreset = { vehicle?: VehicleId; trip?: TripType; notes?: string };

const BookingContext = createContext<((preset?: BookingPreset) => void) | null>(null);

function useBooking() {
  const open = use(BookingContext);
  if (!open) throw new Error("useBooking must be used inside <TaxiBookingProvider>");
  return open;
}

type Values = { name: string; phone: string; pickup: string; date: string; time: string; travellers: string; trip: string; vehicle: string; notes: string };
type Field = keyof Values;

const EMPTY: Values = { name: "", phone: "", pickup: "", date: "", time: "", travellers: "2", trip: "", vehicle: "", notes: "" };
const initialState: EnquiryState = { status: "idle" };

const vehicleName = (id?: string) => {
  const v = fleet.find((f) => f.id === id);
  return v ? vehicleLabel(v) : "";
};

export function TaxiBookingProvider({ children }: { children: ReactNode }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const resetOnClose = useRef(false);
  const [formKey, setFormKey] = useState(0);
  const [values, setValues] = useState<Values>(EMPTY);

  const open = useCallback((p: BookingPreset = {}) => {
    const d = dialogRef.current;
    if (!d || d.open) return;
    // A CTA's preset fills the trip and vehicle (and a route note) without wiping what was already typed.
    setValues((prev) => ({
      ...prev,
      vehicle: p.vehicle ? vehicleName(p.vehicle) : prev.vehicle,
      trip: p.trip ?? prev.trip,
      notes: p.notes && !prev.notes.includes(p.notes) ? [p.notes, prev.notes].filter(Boolean).join("\n") : prev.notes,
    }));
    d.showModal();
    d.querySelector<HTMLElement>("[data-autofocus]")?.focus();
  }, []);

  return (
    <BookingContext value={open}>
      {children}
      <dialog
        ref={dialogRef}
        aria-labelledby="taxi-booking-title"
        onClose={() => {
          // A sent booking starts fresh next time; a half-filled one keeps its values.
          if (resetOnClose.current) {
            resetOnClose.current = false;
            setValues(EMPTY);
            setFormKey((k) => k + 1);
          }
        }}
        onClick={(e) => {
          if (e.target === e.currentTarget) e.currentTarget.close();
        }}
        className="enquiry-dialog m-0 mt-auto max-h-[94dvh] w-full max-w-full overflow-hidden rounded-t-3xl bg-white p-0 text-ink shadow-[0_30px_80px_-20px_rgb(28_13_5/0.55)] open:flex open:flex-col sm:m-auto sm:w-[calc(100%-2rem)] sm:max-w-[40rem] sm:rounded-3xl"
      >
        <BookingForm
          key={formKey}
          v={values}
          setV={setValues}
          onClose={() => dialogRef.current?.close()}
          onSuccess={() => {
            resetOnClose.current = true;
          }}
        />
      </dialog>
    </BookingContext>
  );
}

/** Any button on the page that opens the booking form, optionally pre-filled. */
export function BookCabButton({ children, className = "", vehicle, trip, notes, label }: BookingPreset & { children: ReactNode; className?: string; label?: string }) {
  const open = useBooking();
  return (
    <button type="button" onClick={() => open({ vehicle, trip, notes })} className={className} aria-label={label} aria-haspopup="dialog">
      {children}
    </button>
  );
}

/* ------------------------------------------------------------------ */
/* Form                                                                */
/* ------------------------------------------------------------------ */

const labelCls = "mb-1.5 block text-xs font-semibold text-ink-soft";
const inputCls =
  "w-full rounded-xl border border-[#ece4dc] bg-[#faf7f4] text-sm text-cocoa outline-none transition placeholder:text-[#9a8b7e] hover:border-[#e0d3c6] focus:border-orange-500 focus:bg-white focus:ring-4 focus:ring-orange-500/12 aria-invalid:border-red-400 aria-invalid:bg-red-50/40";
const iconCls = "pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[#b39f8e] transition-colors peer-focus:text-orange-600";
const stepBtnCls = "grid size-11 shrink-0 place-items-center rounded-xl border border-[#ece4dc] bg-white text-ink-soft transition-colors hover:border-orange-500 hover:text-ember-deep";

/** Mirrors the server checks in submitEnquiry. */
function validate(v: Values): Partial<Record<Field, string>> {
  const e: Partial<Record<Field, string>> = {};
  if (v.name.trim().length < 2) e.name = "Please tell us your name.";
  const digits = v.phone.replace(/\D/g, "");
  if (digits.length < 10 || digits.length > 15 || !/^[+\d\s()-]+$/.test(v.phone.trim())) e.phone = "Please enter a valid phone or WhatsApp number.";
  if (!v.pickup.trim()) e.pickup = "Please tell us where to pick you up.";
  const n = Number(v.travellers);
  if (!Number.isInteger(n) || n < 1 || n > 200) e.travellers = "Please enter the number of travellers (1–200).";
  return e;
}

function formatDate(iso: string) {
  if (!iso) return "";
  const d = new Date(`${iso}T00:00:00`);
  return Number.isNaN(d.getTime()) ? iso : d.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
}

/** The same booking as a WhatsApp message, for visitors who would rather chat. */
function whatsappText(v: Values) {
  return [
    "Radhe Radhe! I'd like to book a cab.",
    v.name.trim() && `Name: ${v.name.trim()}`,
    v.trip && `Trip: ${v.trip}`,
    v.vehicle && `Vehicle: ${v.vehicle}`,
    v.pickup.trim() && `Pickup: ${v.pickup.trim()}`,
    (v.date || v.time) && `Date & time: ${[formatDate(v.date), v.time].filter(Boolean).join(", ")}`,
    v.travellers && `Travellers: ${v.travellers}`,
    v.notes.trim() && `Places / notes: ${v.notes.trim()}`,
  ]
    .filter(Boolean)
    .join("\n");
}

type FormProps = { v: Values; setV: Dispatch<SetStateAction<Values>>; onClose: () => void; onSuccess: () => void };

function BookingForm({ v, setV, onClose, onSuccess }: FormProps) {
  const [state, formAction, pending] = useActionState(submitEnquiry, initialState);
  const [errors, setErrors] = useState<Partial<Record<Field, string>>>({});
  const uid = useId();
  const successRef = useRef<HTMLDivElement>(null);
  const id = (f: string) => `${uid}-${f}`;

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
  const travellers = (delta: number) => setV((p) => ({ ...p, travellers: String(Math.min(200, Math.max(1, (Number(p.travellers) || 0) + delta))) }));

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    const found = validate(v);
    const first = Object.keys(found)[0];
    if (!first) return;
    e.preventDefault();
    setErrors(found);
    requestAnimationFrame(() => document.getElementById(id(first))?.focus());
  }

  const wa = whatsappLink(whatsappText(v));
  const tel = phoneHref();
  const a11y = (f: Field) => ({ id: id(f), "aria-invalid": Boolean(errors[f]), "aria-describedby": errors[f] ? id(`${f}-error`) : undefined });
  const errorText = (f: Field) =>
    errors[f] ? (
      <p id={id(`${f}-error`)} className="mt-1 text-xs font-medium text-[#b91c1c]">
        {errors[f]}
      </p>
    ) : null;

  const closeButton = (
    <button type="button" onClick={onClose} aria-label="Close booking form" className="absolute right-3.5 top-3.5 z-10 grid size-9 place-items-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20">
      <X size={18} aria-hidden="true" />
    </button>
  );

  if (state.status === "success") {
    return (
      <div className="no-scrollbar relative overflow-y-auto">
        <div className="relative h-14 bg-cocoa">{closeButton}</div>
        <h2 id="taxi-booking-title" className="sr-only">
          Cab booking sent
        </h2>
        <EnquirySuccess ref={successRef} state={state} className="px-6 pb-8 pt-8" />
      </div>
    );
  }

  return (
    <form action={formAction} onSubmit={onSubmit} noValidate className="flex min-h-0 flex-1 flex-col">
      {/* Header */}
      <div className="tx-dialog-head relative overflow-hidden bg-cocoa px-5 pb-5 pt-5 text-white sm:px-7">
        <div className="tx-road-line pointer-events-none absolute inset-x-0 bottom-0" aria-hidden="true" />
        <div data-autofocus tabIndex={-1} className="relative pr-10 outline-none">
          <p className="text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-orange-300">Written quote before you pay</p>
          <h2 id="taxi-booking-title" className="mt-1 text-xl font-bold tracking-tight text-white sm:text-2xl">
            Book your cab
          </h2>
          <p className="mt-1 text-sm text-white/70">Share your trip and Harsh will reply personally with a clear, itemised quote.</p>
        </div>
        {closeButton}
      </div>

      <div className="no-scrollbar min-h-0 flex-1 overflow-y-auto px-5 pb-2 pt-5 sm:px-7">
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
        {/* What the server action stores, built from the fields below. */}
        <input type="hidden" name="city" value={v.pickup} />
        <input type="hidden" name="dates" value={[formatDate(v.date), v.time].filter(Boolean).join(", ")} />
        <input type="hidden" name="package" value={["Taxi", v.trip || "Trip not chosen", v.vehicle || "Vehicle not chosen"].join(" · ")} />
        <input type="hidden" name="message" value={v.notes} />

        <div className="grid gap-3.5 sm:grid-cols-2">
          <div>
            <label htmlFor={id("trip")} className={labelCls}>
              Trip type
            </label>
            <div className="relative">
              <select {...a11y("trip")} value={v.trip} onChange={set("trip")} className={`peer ${inputCls} h-11 cursor-pointer appearance-none pl-10 pr-9`}>
                <option value="">Choose a trip</option>
                {tripTypes.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
              <RouteIcon size={16} aria-hidden="true" className={iconCls} />
              <ChevronDown size={15} aria-hidden="true" className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-stone" />
            </div>
          </div>
          <div>
            <label htmlFor={id("vehicle")} className={labelCls}>
              Vehicle
            </label>
            <div className="relative">
              <select {...a11y("vehicle")} value={v.vehicle} onChange={set("vehicle")} className={`peer ${inputCls} h-11 cursor-pointer appearance-none pl-10 pr-9`}>
                <option value="">Not sure, suggest one</option>
                {fleet.map((f) => (
                  <option key={f.id} value={vehicleLabel(f)}>
                    {vehicleLabel(f)}
                  </option>
                ))}
              </select>
              <CarFront size={16} aria-hidden="true" className={iconCls} />
              <ChevronDown size={15} aria-hidden="true" className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-stone" />
            </div>
          </div>

          <div className="sm:col-span-2">
            <label htmlFor={id("pickup")} className={labelCls}>
              Pickup point <span className="text-ember-deep">*</span>
            </label>
            <div className="relative">
              <input {...a11y("pickup")} type="text" maxLength={80} placeholder="Delhi IGI T3, Mathura Junction, your hotel…" value={v.pickup} onChange={set("pickup")} className={`peer ${inputCls} h-11 pl-10 pr-3.5`} />
              <MapPin size={16} aria-hidden="true" className={iconCls} />
            </div>
            {errorText("pickup")}
          </div>

          <div>
            <label htmlFor={id("date")} className={labelCls}>
              Travel date
            </label>
            <div className="relative">
              <input {...a11y("date")} type="date" value={v.date} onChange={set("date")} className={`peer ${inputCls} h-11 pl-10 pr-3`} />
              <CalendarDays size={16} aria-hidden="true" className={iconCls} />
            </div>
          </div>
          <div>
            <label htmlFor={id("time")} className={labelCls}>
              Pickup time
            </label>
            <div className="relative">
              <input {...a11y("time")} type="time" value={v.time} onChange={set("time")} className={`peer ${inputCls} h-11 pl-10 pr-3`} />
              <Clock3 size={16} aria-hidden="true" className={iconCls} />
            </div>
          </div>

          <div>
            <label htmlFor={id("name")} className={labelCls}>
              Your name <span className="text-ember-deep">*</span>
            </label>
            <div className="relative">
              <input {...a11y("name")} name="name" type="text" autoComplete="name" maxLength={80} placeholder="Full name" value={v.name} onChange={set("name")} className={`peer ${inputCls} h-11 pl-10 pr-3.5`} />
              <User size={16} aria-hidden="true" className={iconCls} />
            </div>
            {errorText("name")}
          </div>
          <div>
            <label htmlFor={id("phone")} className={labelCls}>
              Phone / WhatsApp <span className="text-ember-deep">*</span>
            </label>
            <div className="relative">
              <input {...a11y("phone")} name="phone" type="tel" inputMode="tel" autoComplete="tel" maxLength={20} placeholder="+91 98765 43210" value={v.phone} onChange={set("phone")} className={`peer ${inputCls} h-11 pl-10 pr-3.5`} />
              <Phone size={16} aria-hidden="true" className={iconCls} />
            </div>
            {errorText("phone")}
          </div>

          <div className="sm:col-span-2">
            <label htmlFor={id("travellers")} className={labelCls}>
              Travellers, including elders and small children
            </label>
            <div className="flex items-center gap-2 sm:max-w-xs">
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

          <div className="sm:col-span-2">
            <label htmlFor={id("notes")} className={labelCls}>
              Places you want to visit <span className="font-normal text-stone">(optional)</span>
            </label>
            <textarea
              id={id("notes")}
              rows={2}
              maxLength={1200}
              placeholder="Banke Bihari, Prem Mandir, Govardhan… flight or train number"
              value={v.notes}
              onChange={set("notes")}
              className={`${inputCls} block resize-none px-3.5 py-2.5 leading-relaxed`}
            />
          </div>
        </div>
        <p className="mt-3 text-[0.7rem] leading-relaxed text-stone">
          We use your details only to reply to this booking. See our{" "}
          <Link href="/privacy-policy" onClick={onClose} className="font-medium text-ember-deep underline underline-offset-2">
            privacy policy
          </Link>
          .
        </p>
      </div>

      <div className="border-t border-[#f1e9e1] px-5 pb-5 pt-4 sm:px-7">
        <div className="grid gap-2.5 sm:grid-cols-2">
          <button
            type="submit"
            disabled={pending}
            className="group/cta inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-linear-to-r from-orange-600 to-orange-700 text-sm font-semibold text-white shadow-[0_12px_24px_-12px_rgb(234_88_12/0.9)] transition-[filter,transform] hover:-translate-y-px hover:brightness-110 disabled:cursor-wait disabled:opacity-80"
          >
            {pending ? <Loader2 size={16} aria-hidden="true" className="animate-spin" /> : <Send size={15} aria-hidden="true" />}
            {pending ? "Sending…" : "Get my written quote"}
          </button>
          {wa && (
            <a
              href={wa}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-whatsapp text-sm font-semibold text-[#062b14] transition-[filter,transform] hover:-translate-y-px hover:brightness-105"
            >
              <WhatsappIcon size={19} /> Book on WhatsApp
              <span className="sr-only"> (opens WhatsApp with these details)</span>
            </a>
          )}
        </div>
        <p className="mt-3 flex flex-wrap items-center justify-center gap-x-1.5 gap-y-1 text-center text-[0.7rem] text-stone">
          <ShieldCheck size={13} aria-hidden="true" className="text-orange-600" /> No hidden charges
          {tel && (
            <>
              <span aria-hidden="true">·</span>
              <a href={tel} className="font-semibold text-ink-soft underline-offset-2 hover:underline">
                Or call {site.contact.phone}
              </a>
            </>
          )}
        </p>
      </div>
    </form>
  );
}

/* ------------------------------------------------------------------ */
/* Sticky booking bar (phones): appears once the hero is scrolled past */
/* ------------------------------------------------------------------ */

export function StickyBookBar({ watchId }: { watchId: string }) {
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const el = document.getElementById(watchId);
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setShown(!entry.isIntersecting && entry.boundingClientRect.top < 0));
    io.observe(el);
    return () => io.disconnect();
  }, [watchId]);

  return (
    <div
      inert={!shown}
      className={`fixed inset-x-[5.25rem] bottom-[max(1.25rem,env(safe-area-inset-bottom))] z-40 transition-[opacity,translate] duration-500 ease-braj sm:hidden ${shown ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-6 opacity-0"}`}
    >
      <BookCabButton className="tx-sticky-cta flex h-14 w-full items-center justify-center gap-2 rounded-full bg-cocoa text-sm font-semibold text-white">
        Book a Cab <ArrowRight size={16} aria-hidden="true" className="text-orange-300" />
      </BookCabButton>
    </div>
  );
}
