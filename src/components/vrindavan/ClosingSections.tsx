import Link from "next/link";
import { Globe, Mail, Phone } from "lucide-react";
import { FaqBlock, LinkCards } from "@/components/destination/kit";
import { EnquiryForm } from "@/components/forms/EnquiryForm";
import { WhatsappIcon } from "@/components/svg/TravelIcons";
import { mailtoHref, phoneHref, site } from "@/config/site";
import { book, continuePlanning, faqTitle, pageCredits, vrindavanFaqs, whatsappMessage } from "@/content/vrindavan";
import { whatsappLink } from "@/lib/whatsapp";
import { Prose } from "./kit";

export function FaqSection() {
  return <FaqBlock title={faqTitle} items={vrindavanFaqs} whatsappMessage={whatsappMessage} className="dg-cream" />;
}

/** The invitation: the founder's note beside the enquiry form, on the page's warm dark ground. */
export function BookSection() {
  const wa = whatsappLink(whatsappMessage);
  const tel = phoneHref();
  return (
    <section id={book.id} aria-labelledby="book-title" className="dg-section dg-cream pt-0 lg:pt-0">
      <div className="container-x">
        <div className="dg-dark overflow-hidden rounded-[1.75rem]">
          <div className="grid items-start gap-10 p-6 sm:p-9 lg:grid-cols-12 lg:gap-12 lg:p-12">
            <div className="lg:col-span-6">
              <p className="eyebrow">Your trip</p>
              <h2 id="book-title" className="dg-h2 mt-3">
                {book.title}
              </h2>
              <div className="dg-prose dg-body mt-5">
                {book.paragraphs.map((p) => (
                  <p key={p}>
                    <Prose text={p} />
                  </p>
                ))}
              </div>

              <p className="dg-label mt-6">{book.callLabel}</p>
              <div className="mt-3 flex flex-wrap gap-2.5">
                {wa && (
                  <a href={wa} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp">
                    <WhatsappIcon size={18} /> WhatsApp
                    <span className="sr-only"> (opens WhatsApp)</span>
                  </a>
                )}
                {tel && (
                  <a href={tel} className="btn btn-outline-light">
                    <Phone size={17} aria-hidden="true" /> {site.contact.phone}
                  </a>
                )}
              </div>
              <dl className="mt-5 grid gap-2.5 text-[0.9rem]">
                <div className="flex flex-wrap items-center gap-2">
                  <dt className="flex items-center gap-2 font-medium text-white">
                    <Mail size={16} aria-hidden="true" className="text-[var(--dg-o300)]" />
                    {book.emailLabel}:
                  </dt>
                  <dd>
                    <a href={mailtoHref("Vrindavan package enquiry")} className="dg-link break-all">
                      {site.contact.email}
                    </a>
                  </dd>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <dt className="flex items-center gap-2 font-medium text-white">
                    <Globe size={16} aria-hidden="true" className="text-[var(--dg-o300)]" />
                    {book.websiteLabel}:
                  </dt>
                  <dd>
                    <Link href={book.website.href} className="dg-link">
                      {book.website.label}
                    </Link>
                  </dd>
                </div>
              </dl>
            </div>

            {/* The form is shared with the rest of the site, so it keeps the light palette. */}
            <div className="dg-light lg:col-span-6">
              <EnquiryForm title="Tell me about your Vrindavan trip" defaultPackage="" />
            </div>
          </div>

          <div className="border-t border-white/10 px-6 py-8 text-center sm:px-9 lg:px-12">
            <p className="mx-auto max-w-2xl text-lg font-medium leading-snug tracking-tight text-white sm:text-xl">{book.closing}</p>
            <p className="mt-3 font-semibold text-[var(--dg-o300)]">
              <span lang="hi">राधे राधे</span>
              <span className="sr-only">{book.blessing}</span>
            </p>
            <p className="mt-1 text-sm text-white/70">{book.signature}</p>
            <ul className="mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-1.5 text-xs text-white/65">
              {book.trust.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

export function ContinuePlanning() {
  return (
    <LinkCards id="continue-title" title="Continue planning your Braj yatra" items={continuePlanning}>
      <p className="mt-8 text-xs leading-relaxed text-stone">
        Photographs from Wikimedia Commons, listed on our{" "}
        <Link href="/image-credits" className="underline underline-offset-2">
          image credits
        </Link>{" "}
        page, along with{" "}
        {pageCredits.map((c, i) => (
          <span key={c.src}>
            <a href={c.credit.sourceUrl} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2">
              {c.label}
            </a>{" "}
            by {c.credit.author} (
            <a href={c.credit.licenseUrl} target="_blank" rel="noopener noreferrer license" className="underline underline-offset-2">
              {c.credit.license}
            </a>
            ){i < pageCredits.length - 1 ? ", " : "."}
          </span>
        ))}
      </p>
    </LinkCards>
  );
}
