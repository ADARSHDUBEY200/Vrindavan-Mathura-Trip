import dynamic from "next/dynamic";
import { Mail, Plus, Quote } from "lucide-react";
import { Rich } from "@/components/home/landing/Rich";
import { TempleSkyline } from "@/components/svg/Ornaments";
import { EnquiryButtons } from "@/components/ui/EnquiryButtons";
import { EMAIL, PHONE_DISPLAY, PHONE_E164 } from "@/config/site";
import { bookSection, faqGroups, faqSection, images, lastWords } from "@/content/home";
import { Band, Paras, Photo } from "./kit";

// Client form, code-split; below the fold.
const EnquiryForm = dynamic(() => import("@/components/forms/EnquiryForm").then((m) => m.EnquiryForm));

/** The PDF's 30 questions, in the same accordion style as the original FAQ list. Follows it in the cream band. */
export function GuideFaqSection() {
  return (
    <Band id="faq-guide" eyebrow={faqSection.eyebrow} title={faqSection.title} tone="cream">
      <div className="grid gap-8">
        {faqGroups.map((group) => (
          <div key={group.id} id={group.id}>
            <p className="text-center text-xs font-semibold uppercase tracking-[0.16em] text-stone sm:text-left">{group.title}</p>
            <div className="mt-3 divide-y divide-line overflow-hidden rounded-card border border-line bg-white shadow-soft">
              {group.items.map((f) => (
                <details key={f.n} className="faq-item group">
                  <summary className="flex min-h-11 items-start justify-between gap-4 px-4 py-4 text-left transition-colors hover:bg-orange-50/60 sm:px-6">
                    <h3 className="text-[0.95rem] font-semibold text-ink">
                      <span className="text-ember-deep">{f.n}. </span>
                      {f.q}
                    </h3>
                    <span className="faq-icon icon-badge mt-0.5 size-6 rounded-full">
                      <Plus size={14} aria-hidden="true" />
                    </span>
                  </summary>
                  <div className="faq-answer px-4 pb-5 text-sm leading-relaxed text-stone sm:px-6 sm:text-[0.95rem]">
                    <p>
                      <Rich text={f.a} />
                    </p>
                  </div>
                </details>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Band>
  );
}

export function LastWordsSection() {
  const l = lastWords;
  return (
    <section id="last-words" aria-labelledby="last-words-title" className="bg-white py-14 sm:py-16 lg:py-20">
      <div className="container-x max-w-3xl text-center">
        <p className="eyebrow justify-center">{l.eyebrow}</p>
        <h2 id="last-words-title" className="display-2 mt-2.5">
          {l.title}
        </h2>
        <p className="lede mt-6">{l.lead}</p>
        <ul className="mt-6 grid gap-4 text-left">
          {l.memories.map((m) => (
            <li key={m} className="surface p-5 sm:p-6">
              <figure>
                <Quote size={24} aria-hidden="true" className="text-saffron" />
                <blockquote className="mt-3 leading-relaxed text-ink-soft">{m}</blockquote>
              </figure>
            </li>
          ))}
        </ul>
        <Paras items={l.paragraphs} className="mx-auto mt-8 text-left sm:text-center" />
      </div>
    </section>
  );
}

export function BookSection() {
  const b = bookSection;
  return (
    <Band id="book" eyebrow={b.eyebrow} title={b.title} lede={b.intro} tone="cream">
      {/* Same orange → amber panel as the site's closing call-to-action */}
      <div className="relative overflow-hidden rounded-[1.5rem] bg-linear-to-r from-orange-500 to-amber-500 shadow-glow lg:grid lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:rounded-[1.75rem]">
        <Photo image={images.book} sizes="(min-width: 1024px) 40vw, 100vw" className="rounded-none shadow-none lg:h-full" />
        <div className="relative px-5 pb-16 pt-7 sm:px-10 sm:pb-20 lg:px-12 lg:py-10">
          <div className="pointer-events-none absolute -right-20 -top-24 size-72 rounded-full bg-white/15 blur-2xl" aria-hidden="true" />
          <ul className="relative grid gap-2 text-[0.95rem] text-ink">
            <li>
              <strong className="font-semibold">{b.contactLabels.call}</strong>{" "}
              <a href={`tel:${PHONE_E164}`} className="font-semibold underline underline-offset-4 hover:no-underline">
                {PHONE_DISPLAY}
              </a>
            </li>
            <li>
              <strong className="font-semibold">{b.contactLabels.email}</strong>{" "}
              <a href={`mailto:${EMAIL}`} className="break-all font-semibold underline underline-offset-4 hover:no-underline">
                {EMAIL}
              </a>
            </li>
            <li>
              <strong className="font-semibold">{b.contactLabels.website}</strong> <span className="break-all">{b.website}</span>
            </li>
          </ul>
          <div className="relative mt-6 flex flex-wrap gap-3">
            <EnquiryButtons onGradient message={b.whatsappMessage} />
            <a href={`mailto:${EMAIL}`} className="btn btn-white min-h-11">
              <Mail size={18} aria-hidden="true" /> Email
            </a>
          </div>
          <p className="relative mt-6 text-sm font-medium text-ink/85">
            <Rich text={b.stats} />
          </p>
          <TempleSkyline className="pointer-events-none absolute inset-x-0 bottom-0 h-12 w-full text-white/25 sm:h-16 lg:h-14" />
        </div>
      </div>

      <div className="mt-10 grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,28rem)] lg:items-start lg:gap-12">
        <div>
          <Paras items={[b.tell]} />
          <p className="display-3 mt-8">{b.closing}</p>
          <p className="mt-3 italic text-ember-deep">{b.signature}</p>
        </div>
        <div className="surface p-5 sm:p-6">
          <EnquiryForm compact />
        </div>
      </div>
    </Band>
  );
}
