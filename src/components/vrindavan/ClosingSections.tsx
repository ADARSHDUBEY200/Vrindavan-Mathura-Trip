import Link from "next/link";
import { ArrowRight, Globe, Mail, Phone } from "lucide-react";
import { EnquiryForm } from "@/components/forms/EnquiryForm";
import { WhatsappIcon } from "@/components/svg/TravelIcons";
import { FaqList } from "@/components/ui/FaqList";
import { mailtoHref, phoneHref, site } from "@/config/site";
import { book, continuePlanning, faqTitle, pageCredits, vrindavanFaqs, whatsappMessage } from "@/content/vrindavan";
import { whatsappLink } from "@/lib/whatsapp";
import { Prose } from "./kit";

export function FaqSection() {
  return (
    <section id="faq" aria-labelledby="faq-title" className="bg-chandan py-16 lg:py-24">
      <div className="container-x grid gap-8 lg:grid-cols-[minmax(0,0.7fr)_minmax(0,1.3fr)] lg:gap-16">
        <h2 id="faq-title" className="vrn-h2 lg:sticky lg:top-40 lg:self-start">
          {faqTitle}
        </h2>
        <FaqList items={vrindavanFaqs} />
      </div>
    </section>
  );
}

/** Closing darshan: the curtain from the opening frames the invitation. */
export function BookSection() {
  const wa = whatsappLink(whatsappMessage);
  const tel = phoneHref();
  return (
    <section id={book.id} aria-labelledby="book-title" className="vrn-dark vrn-closing relative isolate overflow-hidden bg-shyam py-16 lg:py-28">
      <div className="vrn-drape vrn-drape-left" aria-hidden="true" />
      <div className="vrn-drape vrn-drape-right" aria-hidden="true" />
      <div className="container-x relative grid items-start gap-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-16 lg:px-20">
        <div>
          <h2 id="book-title" className="vrn-h2">
            {book.title}
          </h2>
          <div className="vrn-body mt-6 grid gap-4">
            {book.paragraphs.map((p) => (
              <p key={p}>
                <Prose text={p} />
              </p>
            ))}
          </div>

          <dl className="mt-7 grid gap-3 text-[0.95rem]">
            <div>
              <dt className="text-xs font-semibold text-haldi">{book.callLabel}</dt>
              <dd className="mt-1 flex flex-wrap gap-2.5">
                {tel && (
                  <a href={tel} className="btn btn-outline-light">
                    <Phone size={17} aria-hidden="true" /> {site.contact.phone}
                  </a>
                )}
                {wa && (
                  <a href={wa} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp">
                    <WhatsappIcon size={18} /> WhatsApp
                    <span className="sr-only"> (opens WhatsApp)</span>
                  </a>
                )}
              </dd>
            </div>
            <div className="flex flex-wrap gap-x-7 gap-y-2 pt-1">
              <div>
                <dt className="sr-only">{book.emailLabel}</dt>
                <dd>
                  <a href={mailtoHref("Vrindavan package enquiry")} className="vrn-link inline-flex items-center gap-2 break-all">
                    <Mail size={16} aria-hidden="true" /> {site.contact.email}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="sr-only">{book.websiteLabel}</dt>
                <dd>
                  <Link href={book.website.href} className="vrn-link inline-flex items-center gap-2">
                    <Globe size={16} aria-hidden="true" /> {book.website.label}
                  </Link>
                </dd>
              </div>
            </div>
          </dl>

          <ul className="mt-7 flex flex-wrap gap-x-4 gap-y-1 text-sm text-white/80">
            {book.trust.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
        </div>

        <div className="vrn-form">
          <EnquiryForm title="Tell me about your Vrindavan trip" defaultPackage="" />
        </div>

        <div className="text-center lg:col-span-2 lg:mt-6">
          <p className="vrn-quote mx-auto max-w-3xl">{book.closing}</p>
          <p className="vrn-display mt-3 text-2xl text-haldi">
            <span lang="hi">राधे राधे</span>
            <span className="sr-only">{book.blessing}</span>
          </p>
          <p className="mt-2 text-sm text-white/75">{book.signature}</p>
        </div>
      </div>
    </section>
  );
}

export function ContinuePlanning() {
  return (
    <nav aria-labelledby="continue-title" className="bg-chandan-deep py-12 lg:py-16">
      <div className="container-x">
        <h2 id="continue-title" className="vrn-h4">
          Continue planning your Braj yatra
        </h2>
        <ul className="mt-5 grid gap-x-8 sm:grid-cols-2 lg:grid-cols-4">
          {continuePlanning.map((l) => (
            <li key={l.href} className="border-t border-mitti/20">
              <Link href={l.href} className="group flex items-center gap-3 py-3">
                <span className="min-w-0 flex-1">
                  <span className="block text-sm font-semibold text-ink group-hover:underline group-hover:underline-offset-4">{l.label}</span>
                  <span className="mt-0.5 block text-xs leading-snug text-stone">{l.text}</span>
                </span>
                <ArrowRight size={15} aria-hidden="true" className="btn-arrow shrink-0 text-haldi-deep" />
              </Link>
            </li>
          ))}
        </ul>

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
      </div>
    </nav>
  );
}
