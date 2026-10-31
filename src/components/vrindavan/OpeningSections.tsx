import Link from "next/link";
import { ArrowRight, CalendarDays, Mail, Phone } from "lucide-react";
import { WhatsappIcon } from "@/components/svg/TravelIcons";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { FOUNDER, mailtoHref, phoneHref } from "@/config/site";
import { glance, hero, intro, pics, vrindavanCrumbs, VRINDAVAN_UPDATED, whatsappMessage, why } from "@/content/vrindavan";
import { whatsappLink } from "@/lib/whatsapp";
import { EnquiryTrigger } from "./EnquiryTrigger";
import { Prose, Shot } from "./kit";

const updatedLabel = new Date(VRINDAVAN_UPDATED).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });

/** Full-bleed opening: the jhanki curtain draws back once, as it does at Banke Bihari. */
export function VrindavanHero() {
  const wa = whatsappLink(whatsappMessage);
  return (
    <section aria-labelledby="vrn-title" className="vrn-dark relative isolate flex min-h-svh flex-col overflow-hidden bg-shyam lg:min-h-[max(100svh,44rem)]">
      <Shot pic={pics.hero} sizes="100vw" preload className="vrn-hero-photo -z-10 object-cover object-[50%_40%]" />
      <div className="vrn-hero-scrim absolute inset-0 -z-10" aria-hidden="true" />
      <div className="vrn-curtain vrn-curtain-once" aria-hidden="true" />

      <div className="container-x pt-[5.75rem] sm:pt-28">
        <Breadcrumbs items={vrindavanCrumbs} light />
      </div>

      <div className="container-x mt-auto pb-24 pt-16 xl:pb-10">
        <div className="grid items-end gap-x-14 gap-y-7 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)]">
          <div>
            <p className="hero-in flex flex-wrap items-baseline gap-x-3 text-[0.95rem] text-white/90 sm:text-base">
              <span lang="hi" className="vrn-display text-xl text-haldi sm:text-2xl">
                राधे राधे
              </span>
              {hero.greeting}
            </p>
            <h1 id="vrn-title" className="hero-in hero-in-1 mt-3">
              <span className="vrn-h1 block">{hero.titleLead}:</span>{" "}
              <span className="vrn-h1-rest mt-2 block">{hero.titleRest}</span>
            </h1>
          </div>
          <div className="hero-in hero-in-2">
            <p className="max-w-md text-[0.98rem] leading-relaxed text-white/90 sm:text-[1.05rem]">{hero.lede}</p>
            <div className="mt-5 flex flex-wrap gap-2.5">
              <EnquiryTrigger className="btn btn-primary">
                Plan my trip
                <ArrowRight size={17} aria-hidden="true" className="btn-arrow" />
              </EnquiryTrigger>
              {wa && (
                <a href={wa} target="_blank" rel="noopener noreferrer" className="btn btn-outline-light">
                  <WhatsappIcon size={18} />
                  WhatsApp
                  <span className="sr-only"> (opens WhatsApp)</span>
                </a>
              )}
            </div>
          </div>
        </div>

        <dl className="hero-in hero-in-3 mt-6 grid grid-cols-4 gap-x-3 border-t border-white/20 pt-4 sm:mt-8 sm:pt-5">
          {hero.stats.map((s) => (
            <div key={s.label} className="flex flex-col-reverse justify-end gap-0.5">
              <dt className="text-[0.68rem] leading-tight text-white/75 sm:text-xs">{s.label}</dt>
              <dd className="vrn-display text-lg leading-tight text-white sm:text-[1.75rem]">{s.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

/** The guide's letter, beside a niche-shaped ledger of quick facts. */
export function VrindavanIntro() {
  const tel = phoneHref();
  return (
    <section aria-label="Introduction" className="bg-chandan py-16 lg:py-24">
      <div className="container-x grid items-start gap-12 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)] lg:gap-20">
        <div>
          <p className="vrn-lead">
            <Prose text={intro.lead} />
          </p>
          <p className="vrn-body mt-6">
            <Prose text={intro.body} />
          </p>

          <p className="mt-7 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-stone">
            <span className="font-semibold text-ink">{FOUNDER.name}</span>
            <span>{FOUNDER.jobTitle}</span>
            <span className="inline-flex items-center gap-1.5">
              <CalendarDays size={14} aria-hidden="true" />
              Last updated <time dateTime={VRINDAVAN_UPDATED}>{updatedLabel}</time>
            </span>
          </p>

          <ul className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-sm font-semibold">
            <li>
              <a href={tel} className="vrn-link inline-flex items-center gap-1.5">
                <Phone size={15} aria-hidden="true" /> {intro.phone}
              </a>
            </li>
            <li>
              <a href={mailtoHref("Vrindavan trip enquiry")} className="vrn-link inline-flex items-center gap-1.5 break-all">
                <Mail size={15} aria-hidden="true" /> {intro.email}
              </a>
            </li>
            <li>
              <Link href={intro.packagesLink.href} className="vrn-link">
                {intro.packagesLink.label}
              </Link>
            </li>
          </ul>

          <p className="vrn-callout mt-8">
            <Prose text={intro.timingNote} />
          </p>
        </div>

        <aside aria-labelledby="glance-title" className="vrn-niche vrn-dark bg-shyam reveal">
          <h2 id="glance-title" className="vrn-h3 text-center">
            {glance.title}
          </h2>
          <dl className="mt-6 divide-y divide-white/15">
            {glance.rows.map((r) => (
              <div key={r.label} className="py-3">
                <dt className="text-xs font-semibold text-haldi">{r.label}</dt>
                <dd className="mt-0.5 text-[0.95rem] leading-snug text-white">{r.value}</dd>
              </div>
            ))}
          </dl>
        </aside>
      </div>
    </section>
  );
}

/** Why Vrindavan is different: a river photograph, the argument, and the name taken apart. */
export function VrindavanWhy() {
  return (
    <section aria-labelledby="why-title" className="bg-chandan-deep">
      <div className="grid lg:grid-cols-2">
        <div className="relative min-h-72 sm:min-h-96 lg:min-h-full">
          <Shot pic={pics.yamuna} sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover object-[22%_50%]" />
        </div>
        <div className="container-x py-14 lg:mx-0 lg:max-w-[42rem] lg:px-14 lg:py-24">
          <h2 id="why-title" className="vrn-h2">
            {why.title}
          </h2>
          <div className="vrn-body mt-6 grid gap-4">
            {why.paragraphs.map((p) => (
              <p key={p}>
                <Prose text={p} />
              </p>
            ))}
          </div>
          <p aria-hidden="true" className="vrn-name-sum">
            <span>
              <b lang="hi">वृन्दा</b>
              tulsi
            </span>
            <i>+</i>
            <span>
              <b lang="hi">वन</b>
              forest
            </span>
            <i>=</i>
            <span>
              <b lang="hi">वृन्दावन</b>
              Vrindavan
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}
