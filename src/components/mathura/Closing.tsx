import Image from "next/image";
import Link from "next/link";
import { Globe, Mail, Phone } from "lucide-react";
import { FaqBlock, LinkCards } from "@/components/destination/kit";
import { EnquiryForm } from "@/components/forms/EnquiryForm";
import { EnquiryButtons } from "@/components/ui/EnquiryButtons";
import { mailtoHref, phoneHref, site } from "@/config/site";
import { photos } from "@/content/images";
import { book, continuePlanning, faqTitle, mathuraFaqs, mathuraHero, mathuraTrust } from "@/content/mathura";
import { Rich } from "./parts";

export function MathuraFaq() {
  return <FaqBlock title={faqTitle} items={mathuraFaqs} whatsappMessage={mathuraHero.whatsappMessage} className="dg-cream" />;
}

export function ContinuePlanning() {
  return <LinkCards id="continue-title" title="Continue planning your Braj yatra" items={continuePlanning} />;
}

/** The invitation, on the ghat at dusk: the founder's note beside the enquiry form. */
export function Book() {
  const backdrop = photos["mathura-vishram-ghat-dusk"];
  const tel = phoneHref();
  return (
    <section id="book" aria-labelledby="book-title" className="dg-section dg-cream pt-0 lg:pt-0">
      <div className="container-x">
        <div className="dg-dark relative isolate overflow-hidden rounded-[1.75rem]">
          <Image src={backdrop.src} alt="" fill sizes="(min-width: 1280px) 1216px, 100vw" className="-z-20 object-cover object-[68%_70%]" />
          <div className="dg-photo-veil absolute inset-0 -z-10" aria-hidden="true" />

          <div className="grid gap-10 p-6 sm:p-9 lg:grid-cols-12 lg:gap-12 lg:p-12">
            <div className="lg:col-span-6">
              <p className="eyebrow">Your trip</p>
              <h2 id="book-title" className="dg-h2 mt-3">
                {book.title}
              </h2>
              <div className="dg-prose dg-body mt-5">
                {book.paragraphs.map((p) => (
                  <p key={p}>
                    <Rich text={p} />
                  </p>
                ))}
              </div>

              <ul className="mt-6 grid gap-2.5 text-[0.9rem]">
                {tel && (
                  <li className="flex flex-wrap items-center gap-2">
                    <Phone size={16} aria-hidden="true" className="text-[var(--dg-o300)]" />
                    <span className="font-medium text-white">{book.callLabel}</span>
                    <a href={tel} className="dg-link">
                      {site.contact.phone}
                    </a>
                  </li>
                )}
                <li className="flex flex-wrap items-center gap-2">
                  <Mail size={16} aria-hidden="true" className="text-[var(--dg-o300)]" />
                  <span className="font-medium text-white">Email:</span>
                  <a href={mailtoHref("Mathura trip enquiry")} className="dg-link break-all">
                    {site.contact.email}
                  </a>
                </li>
                <li className="flex flex-wrap items-center gap-2">
                  <Globe size={16} aria-hidden="true" className="text-[var(--dg-o300)]" />
                  <span className="font-medium text-white">Website:</span>
                  <Link href="/tour-packages" className="dg-link">
                    Mathura Vrindavan Tour Packages
                  </Link>
                </li>
              </ul>
              <EnquiryButtons message={mathuraHero.whatsappMessage} light className="mt-6" />
            </div>

            {/* The form is shared with the rest of the site, so it keeps the light palette. */}
            <div id="enquiry" className="dg-light lg:col-span-6">
              <EnquiryForm title={book.formTitle} />
            </div>
          </div>

          <div className="border-t border-white/10 px-6 py-8 text-center sm:px-9 lg:px-12">
            <p className="mx-auto max-w-2xl text-lg font-medium leading-snug tracking-tight text-white sm:text-xl">{book.closing}</p>
            <p className="mt-3 font-semibold text-[var(--dg-o300)]">{book.signoff}</p>
            <p className="mt-1 text-sm text-white/70">{book.signature}</p>
            <ul className="mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-1.5 text-xs text-white/65">
              {mathuraTrust.map((t) => (
                <li key={t.label}>
                  {t.label} <span className="font-semibold text-white/90">{t.value}</span>
                </li>
              ))}
              <li>
                <Link href="/image-credits" className="underline underline-offset-4 hover:text-white">
                  Image credits
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
