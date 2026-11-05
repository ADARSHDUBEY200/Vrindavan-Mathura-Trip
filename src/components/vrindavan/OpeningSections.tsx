import Link from "next/link";
import { ArrowRight, CalendarDays, Info, Mail, Package, Phone } from "lucide-react";
import { DestinationHero } from "@/components/destination/kit";
import { WhatsappIcon } from "@/components/svg/TravelIcons";
import { FOUNDER, mailtoHref, phoneHref } from "@/config/site";
import { glance, hero, intro, pics, vrindavanCrumbs, VRINDAVAN_UPDATED, whatsappMessage, why } from "@/content/vrindavan";
import { whatsappLink } from "@/lib/whatsapp";
import { EnquiryTrigger } from "./EnquiryTrigger";
import { Prose, Shot } from "./kit";

const updatedLabel = new Date(VRINDAVAN_UPDATED).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });

/** Prem Mandir at night, inset in a rounded frame, with the trust facts across its foot. */
export function VrindavanHero() {
  const wa = whatsappLink(whatsappMessage);
  const [place, ...lead] = hero.titleLead.split(" ");
  return (
    <DestinationHero
      crumbs={vrindavanCrumbs}
      photo={pics.hero}
      objectPosition="50% 40%"
      badge={
        <>
          <span lang="hi" className="font-semibold text-[var(--dg-o300)]">
            राधे राधे
          </span>
          <span aria-hidden="true" className="text-white/50">
            ·
          </span>
          {hero.greeting}
        </>
      }
      place={place}
      lead={lead.join(" ")}
      sub={hero.titleRest}
      lede={hero.lede}
      actions={
        <>
          <EnquiryTrigger className="btn btn-primary">
            Plan my trip
            <ArrowRight size={17} aria-hidden="true" className="btn-arrow" />
          </EnquiryTrigger>
          {wa && (
            <a href={wa} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp">
              <WhatsappIcon size={18} />
              WhatsApp
              <span className="sr-only"> (opens WhatsApp)</span>
            </a>
          )}
        </>
      }
      stats={hero.stats}
    />
  );
}

/** The guide's letter, beside a ledger of quick facts. */
export function VrindavanIntro() {
  const tel = phoneHref();
  return (
    <section aria-label="Introduction" className="dg-section">
      <div className="container-x grid items-start gap-10 lg:grid-cols-12 lg:gap-14">
        <div className="lg:col-span-7">
          <p className="eyebrow">A letter from a Brijwasi</p>
          <p className="dg-lead mt-4">
            <Prose text={intro.lead} />
          </p>
          <p className="dg-body mt-4">
            <Prose text={intro.body} />
          </p>

          <p className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-stone">
            <span className="font-semibold text-ink">{FOUNDER.name}</span>
            <span aria-hidden="true">·</span>
            <span>{FOUNDER.jobTitle}</span>
            <span aria-hidden="true">·</span>
            <span className="inline-flex items-center gap-1.5">
              <CalendarDays size={14} aria-hidden="true" />
              Last updated <time dateTime={VRINDAVAN_UPDATED}>{updatedLabel}</time>
            </span>
          </p>

          <ul className="mt-5 flex flex-wrap gap-2">
            {tel && (
              <li>
                <a href={tel} className="dg-chip">
                  <Phone size={15} aria-hidden="true" /> {intro.phone}
                </a>
              </li>
            )}
            <li className="min-w-0 max-w-full">
              <a href={mailtoHref("Vrindavan trip enquiry")} className="dg-chip max-w-full break-all">
                <Mail size={15} aria-hidden="true" /> {intro.email}
              </a>
            </li>
            <li>
              <Link href={intro.packagesLink.href} className="dg-chip">
                <Package size={15} aria-hidden="true" /> {intro.packagesLink.label}
              </Link>
            </li>
          </ul>

          <p className="dg-note mt-6">
            <Info size={17} aria-hidden="true" />
            <span>
              <Prose text={intro.timingNote} />
            </span>
          </p>
        </div>

        <aside aria-labelledby="glance-title" className="dg-card reveal overflow-hidden lg:sticky lg:top-36 lg:col-span-5">
          <div className="dg-wash border-b border-[var(--dg-o100)] px-6 py-5">
            <p className="eyebrow">Quick facts</p>
            <h2 id="glance-title" className="dg-h3 mt-2">
              {glance.title}
            </h2>
          </div>
          <dl className="divide-y divide-line px-6">
            {glance.rows.map((r) => (
              <div key={r.label} className="grid gap-1 py-3.5 sm:grid-cols-[9.5rem_minmax(0,1fr)] sm:gap-4">
                <dt className="dg-label pt-0.5">{r.label}</dt>
                <dd className="text-[0.9rem] font-medium leading-snug text-ink">{r.value}</dd>
              </div>
            ))}
          </dl>
        </aside>
      </div>
    </section>
  );
}

/** Why Vrindavan is different: the river beside the argument, and the name taken apart. */
export function VrindavanWhy() {
  return (
    <section aria-labelledby="why-title" className="dg-section dg-cream">
      <div className="container-x grid items-center gap-8 lg:grid-cols-12 lg:gap-14">
        <div className="dg-photo dg-photo-lg reveal-zoom aspect-[4/3] lg:col-span-5 lg:aspect-[4/5]">
          <Shot pic={pics.yamuna} sizes="(min-width: 1024px) 40vw, 92vw" className="object-cover object-[22%_50%]" />
        </div>
        <div className="lg:col-span-7">
          <p className="eyebrow">The spirit of the place</p>
          <h2 id="why-title" className="dg-h2 mt-3">
            {why.title}
          </h2>
          <div className="dg-prose dg-body mt-4">
            {why.paragraphs.map((p) => (
              <p key={p}>
                <Prose text={p} />
              </p>
            ))}
          </div>
          <p aria-hidden="true" className="mt-6 flex flex-wrap items-center gap-2.5 text-xs text-stone">
            <span className="dg-card inline-flex flex-col px-4 py-2.5">
              <b lang="hi" className="text-lg font-semibold text-ink">
                वृन्दा
              </b>
              tulsi
            </span>
            <span className="text-lg font-medium text-ember-deep">+</span>
            <span className="dg-card inline-flex flex-col px-4 py-2.5">
              <b lang="hi" className="text-lg font-semibold text-ink">
                वन
              </b>
              forest
            </span>
            <span className="text-lg font-medium text-ember-deep">=</span>
            <span className="inline-flex flex-col rounded-[1.25rem] bg-linear-to-r from-[var(--dg-o500)] to-[var(--dg-a500)] px-4 py-2.5 text-ink">
              <b lang="hi" className="text-lg font-semibold">
                वृन्दावन
              </b>
              Vrindavan
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}
