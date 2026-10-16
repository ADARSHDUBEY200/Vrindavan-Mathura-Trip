"use client";

import Link from "next/link";
import { useActionState, useEffect, useId, useRef } from "react";
import { CheckCircle2, Loader2, Mail, Phone, Send } from "lucide-react";
import { submitEnquiry, type EnquiryField, type EnquiryState } from "@/app/actions/enquiry";
import { WhatsappIcon } from "@/components/svg/TravelIcons";
import { phoneHref, site } from "@/config/site";
import { packages } from "@/content/packages";
import { whatsappLink } from "@/lib/whatsapp";

const initialState: EnquiryState = { status: "idle" };

type Props = {
  /** Pre-selects a package in the dropdown. */
  defaultPackage?: string;
  title?: string;
  compact?: boolean;
};

export function EnquiryForm({ defaultPackage, title = "Plan your yatra", compact = false }: Props) {
  const [state, formAction, pending] = useActionState(submitEnquiry, initialState);
  const uid = useId();
  const statusRef = useRef<HTMLDivElement>(null);
  const errorSummaryRef = useRef<HTMLDivElement>(null);
  const id = (f: string) => `${uid}-${f}`;
  const err = (f: EnquiryField) => state.errors?.[f];
  const val = (f: EnquiryField) => state.values?.[f];

  // Move focus to the result so screen-reader and keyboard users hear the outcome.
  useEffect(() => {
    if (state.status === "success") statusRef.current?.focus();
    if (state.status === "error") errorSummaryRef.current?.focus();
  }, [state]);

  if (state.status === "success") {
    const wa = state.whatsappText ? whatsappLink(state.whatsappText) : undefined;
    const tel = phoneHref();
    const mail = site.contact.email
      ? `mailto:${site.contact.email}?subject=${encodeURIComponent("Trip enquiry")}&body=${encodeURIComponent(state.whatsappText ?? "")}`
      : undefined;
    return (
      <div ref={statusRef} tabIndex={-1} role="status" className="surface p-6 text-center outline-none sm:p-9">
        <CheckCircle2 size={44} aria-hidden="true" className="mx-auto text-peacock-teal" />
        <h3 className="mt-4 text-xl font-semibold">Radhe Radhe!</h3>
        <p className="mx-auto mt-2 max-w-md leading-relaxed text-stone">{state.message}</p>
        {!state.delivered && (
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            {wa && (
              <a href={wa} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp">
                <WhatsappIcon size={20} /> Send on WhatsApp
              </a>
            )}
            {mail && (
              <a href={mail} className="btn btn-outline">
                <Mail size={18} aria-hidden="true" /> Send by email
              </a>
            )}
            {tel && (
              <a href={tel} className="btn btn-outline">
                <Phone size={18} aria-hidden="true" /> Call {site.contact.phone}
              </a>
            )}
            {!wa && !mail && !tel && (
              <p className="text-sm text-stone">
                Our contact details are being set up. Please check back shortly.
              </p>
            )}
          </div>
        )}
      </div>
    );
  }

  const fieldCls = "field";
  const labelCls = "mb-1.5 block text-sm font-semibold text-ink";
  const errorEl = (f: EnquiryField) =>
    err(f) ? (
      <p id={id(`${f}-error`)} className="mt-1.5 text-sm font-medium text-[#b91c1c]">
        {err(f)}
      </p>
    ) : null;
  const describe = (f: EnquiryField) => (err(f) ? id(`${f}-error`) : undefined);

  return (
    <form action={formAction} noValidate className={`surface relative p-6 ${compact ? "" : "sm:p-9"}`} aria-labelledby={id("title")}>
      <h3 id={id("title")} className="text-xl font-semibold">
        {title}
      </h3>
      <p className="mt-1.5 text-sm text-stone">Share a few details and we’ll suggest a plan and an itemised quote. Fields marked * are required.</p>

      {state.status === "error" && (
        <div ref={errorSummaryRef} tabIndex={-1} role="alert" className="mt-5 rounded-2xl border border-[#fecaca] bg-[#fef2f2] px-4 py-3 text-sm font-medium text-[#991b1b] outline-none">
          {state.message}
        </div>
      )}

      {/* Honeypot — hidden from people and assistive tech. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor={id("company")}>Company</label>
        <input id={id("company")} type="text" name="company" tabIndex={-1} autoComplete="off" />
      </div>

      <div className={`mt-6 grid gap-5 ${compact ? "" : "sm:grid-cols-2"}`}>
        <div>
          <label htmlFor={id("name")} className={labelCls}>
            Your name *
          </label>
          <input id={id("name")} name="name" type="text" autoComplete="name" required maxLength={80} defaultValue={val("name")} aria-invalid={Boolean(err("name"))} aria-describedby={describe("name")} className={fieldCls} />
          {errorEl("name")}
        </div>
        <div>
          <label htmlFor={id("phone")} className={labelCls}>
            Phone / WhatsApp *
          </label>
          <input id={id("phone")} name="phone" type="tel" inputMode="tel" autoComplete="tel" required maxLength={20} placeholder="+91" defaultValue={val("phone")} aria-invalid={Boolean(err("phone"))} aria-describedby={describe("phone")} className={fieldCls} />
          {errorEl("phone")}
        </div>
        <div>
          <label htmlFor={id("dates")} className={labelCls}>
            Travel dates
          </label>
          <input id={id("dates")} name="dates" type="text" maxLength={80} placeholder="e.g. 12–14 Nov, flexible" defaultValue={val("dates")} className={fieldCls} />
        </div>
        <div>
          <label htmlFor={id("travellers")} className={labelCls}>
            Number of travellers
          </label>
          <input id={id("travellers")} name="travellers" type="number" inputMode="numeric" min={1} max={200} defaultValue={val("travellers")} aria-invalid={Boolean(err("travellers"))} aria-describedby={describe("travellers")} className={fieldCls} />
          {errorEl("travellers")}
        </div>
        <div>
          <label htmlFor={id("city")} className={labelCls}>
            Starting city
          </label>
          <input id={id("city")} name="city" type="text" autoComplete="address-level2" maxLength={80} placeholder="Delhi, Agra, Mathura…" defaultValue={val("city")} className={fieldCls} />
        </div>
        <div>
          <label htmlFor={id("package")} className={labelCls}>
            Package interest
          </label>
          <select id={id("package")} name="package" defaultValue={val("package") ?? defaultPackage ?? ""} className={fieldCls}>
            <option value="">Not sure yet — help me plan</option>
            {packages.map((p) => (
              <option key={p.slug} value={p.title}>
                {p.title}
              </option>
            ))}
            <option value="Custom trip">Custom trip</option>
          </select>
        </div>
        <div className={compact ? "" : "sm:col-span-2"}>
          <label htmlFor={id("message")} className={labelCls}>
            Message
          </label>
          <textarea id={id("message")} name="message" rows={4} maxLength={1200} placeholder="Ages of travellers, temples you’d love to visit, hotel preferences…" defaultValue={val("message")} className={`${fieldCls} resize-y`} />
        </div>
      </div>

      <button type="submit" disabled={pending} className="btn btn-primary mt-7 w-full disabled:cursor-wait disabled:opacity-80 sm:w-auto">
        {pending ? <Loader2 size={18} aria-hidden="true" className="animate-spin" /> : <Send size={18} aria-hidden="true" />}
        {pending ? "Sending…" : "Send enquiry"}
      </button>
      <p className="mt-4 text-xs leading-relaxed text-stone">
        We use your details only to reply to this enquiry. See our{" "}
        <Link href="/privacy-policy" className="font-medium text-ember-deep underline underline-offset-2">
          privacy policy
        </Link>
        .
      </p>
    </form>
  );
}
