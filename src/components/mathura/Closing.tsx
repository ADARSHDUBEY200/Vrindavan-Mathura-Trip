import Image from "next/image";
import Link from "next/link";
import { Mail, Phone, Plus } from "lucide-react";
import { EnquiryForm } from "@/components/forms/EnquiryForm";
import { EnquiryButtons } from "@/components/ui/EnquiryButtons";
import { mailtoHref, phoneHref, site } from "@/config/site";
import { photos } from "@/content/images";
import { book, continuePlanning, faqTitle, mathuraFaqs, mathuraHero } from "@/content/mathura";
import { ArrowLink, Rich } from "./parts";

export function MathuraFaq() {
  return (
    <section id="faq" aria-labelledby="faq-title" className="py-16 lg:py-24">
      <div className="container-x grid gap-10 lg:grid-cols-12 lg:gap-14">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-40">
            <p className="mt-kicker">Before you ask</p>
            <h2 id="faq-title" className="mt-h2 mt-4">
              {faqTitle}
            </h2>
          </div>
        </div>
        {/* Native <details>: works without JavaScript and keeps every answer in the HTML for FAQPage schema. */}
        <div className="border-b border-ink/20 lg:col-span-8">
          {mathuraFaqs.map((f, i) => (
            <details key={f.q} className="faq-item border-t border-ink/20">
              <summary className="flex items-start justify-between gap-5 py-5">
                <h3 className="font-editorial text-[1.5rem] leading-snug sm:text-[1.65rem]">
                  <span className="mr-2 text-sandstone">{i + 1}.</span>
                  {f.q}
                </h3>
                <span className="faq-icon mt-1 grid size-8 shrink-0 place-items-center rounded-full border border-ink/25 text-sandstone">
                  <Plus size={16} aria-hidden="true" />
                </span>
              </summary>
              <p className="mt-body max-w-2xl pb-6">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ContinuePlanning() {
  return (
    <section aria-labelledby="continue-title" className="pb-16 lg:pb-24">
      <div className="container-x">
        <h2 id="continue-title" className="mt-h3">
          Keep planning
        </h2>
        <ul className="mt-6 grid gap-x-10 sm:grid-cols-2 lg:grid-cols-3">
          {continuePlanning.map((l) => (
            <li key={l.href} className="border-t border-ink/20 py-4">
              <ArrowLink href={l.href}>{l.label}</ArrowLink>
              <p className="mt-1 text-sm text-stone">{l.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function Book() {
  const backdrop = photos["mathura-vishram-ghat-dusk"];
  const tel = phoneHref();
  return (
    <section id="book" aria-labelledby="book-title" className="mt-dark relative isolate overflow-hidden">
      <Image src={backdrop.src} alt="" fill sizes="100vw" className="-z-20 object-cover object-[68%_70%]" />
      <div className="mt-book-veil absolute inset-0 -z-10" aria-hidden="true" />

      <div className="container-x grid gap-12 py-16 lg:grid-cols-12 lg:gap-14 lg:py-24">
        <div className="lg:col-span-6">
          <p className="mt-kicker">Your trip</p>
          <h2 id="book-title" className="mt-h2 mt-4">
            {book.title}
          </h2>
          <div className="mt-prose mt-6">
            {book.paragraphs.map((p) => (
              <p key={p}>
                <Rich text={p} />
              </p>
            ))}
          </div>

          <ul className="mt-7 grid gap-2.5 text-[0.95rem]">
            {tel && (
              <li className="flex flex-wrap items-center gap-2">
                <Phone size={16} aria-hidden="true" className="text-marigold" />
                <span className="font-semibold text-white">{book.callLabel}</span>
                <a href={tel} className="mt-link">
                  {site.contact.phone}
                </a>
              </li>
            )}
            <li className="flex flex-wrap items-center gap-2">
              <Mail size={16} aria-hidden="true" className="text-marigold" />
              <span className="font-semibold text-white">Email:</span>
              <a href={mailtoHref("Mathura trip enquiry")} className="mt-link break-all">
                {site.contact.email}
              </a>
            </li>
            <li className="flex flex-wrap items-center gap-2">
              <span className="font-semibold text-white">Website:</span>
              <Link href="/tour-packages" className="mt-link">
                Mathura Vrindavan Tour Packages
              </Link>
            </li>
          </ul>
          <EnquiryButtons message={mathuraHero.whatsappMessage} light className="mt-7" />
        </div>

        {/* The form is shared with the rest of the site, so it keeps the light palette. */}
        <div id="enquiry" className="mt-light lg:col-span-6">
          <EnquiryForm title={book.formTitle} />
        </div>
      </div>

      <div className="container-x pb-28 text-center sm:pb-16">
        <p className="mt-closing mx-auto max-w-3xl">{book.closing}</p>
        <p className="mt-4 text-lg font-semibold text-white">{book.signoff}</p>
        <p className="mt-1 text-sm italic text-white/80">{book.signature}</p>
        <ul className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-1.5 border-t border-white/15 pt-5 text-[0.8rem] text-white/75">
          {book.strip.map((s) => (
            <li key={s}>{s}</li>
          ))}
          <li>
            <Link href="/image-credits" className="underline underline-offset-4 hover:text-white">
              Image credits
            </Link>
          </li>
        </ul>
      </div>
    </section>
  );
}
