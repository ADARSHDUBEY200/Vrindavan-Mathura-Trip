import Link from "next/link";
import { ArrowRight, Info, Mail, Package, Phone } from "lucide-react";
import { DestinationHero } from "@/components/destination/kit";
import { EnquireButton } from "@/components/tour-packages/EnquireButton";
import { EnquiryButtons } from "@/components/ui/EnquiryButtons";
import { FOUNDER, STARTING_PRICE, STARTING_PRICE_INCLUDES, formatInr, mailtoHref, phoneHref, site } from "@/config/site";
import { photos } from "@/content/images";
import { MATHURA_UPDATED, mathuraGlance, mathuraHero, mathuraIntro, mathuraMeta, mathuraTrust } from "@/content/mathura";
import { mathuraCrumbs } from "@/lib/schema/mathura";
import { Media, Rich } from "./parts";

const updatedOn = new Date(MATHURA_UPDATED).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });

/** The ghat at blue hour, inset in a rounded frame, with the trust facts on a card across its foot. */
export function MathuraHero() {
  const [lead, sub] = mathuraHero.rest.split(": ");
  return (
    <DestinationHero
      crumbs={mathuraCrumbs}
      photo={{ src: photos["mathura-vishram-ghat-dusk"].src, alt: mathuraMeta.imageAlt }}
      objectPosition="68% 60%"
      badge={
        <>
          <span lang="hi" className="font-semibold text-[var(--dg-o300)]">
            {mathuraHero.scriptWord}
          </span>
          <span aria-hidden="true" className="text-white/50">
            ·
          </span>
          A local guide by {FOUNDER.name}
        </>
      }
      place={mathuraHero.word}
      lead={lead}
      sub={sub}
      lede={<Rich text={mathuraHero.lede} />}
      actions={
        <>
          <EnquireButton className="btn btn-primary">
            Plan my Mathura trip
            <ArrowRight size={17} aria-hidden="true" className="btn-arrow" />
          </EnquireButton>
          <EnquiryButtons message={mathuraHero.whatsappMessage} showPhone={false} light />
        </>
      }
      stats={mathuraTrust}
    />
  );
}

/** The founder's letter, beside the 1880s painting of the same ghats. */
export function Intro() {
  const tel = phoneHref();
  return (
    <section aria-labelledby="intro-title" className="dg-section">
      <div className="container-x grid items-start gap-10 lg:grid-cols-12 lg:gap-14">
        <div className="lg:col-span-7">
          <p className="eyebrow">A letter from a Brijwasi</p>
          <h2 id="intro-title" className="dg-h2 mt-3">
            {mathuraHero.greeting}
          </h2>
          <div className="dg-prose dg-body mt-5">
            {mathuraIntro.paragraphs.map((p) => (
              <p key={p}>
                <Rich text={p} />
              </p>
            ))}
          </div>
          {STARTING_PRICE_INCLUDES && (
            <p className="dg-small mt-3">
              {formatInr(STARTING_PRICE)}: {STARTING_PRICE_INCLUDES}
            </p>
          )}

          <ul className="mt-6 flex flex-wrap gap-2">
            {tel && (
              <li>
                <a href={tel} className="dg-chip">
                  <Phone size={15} aria-hidden="true" /> {site.contact.phone}
                </a>
              </li>
            )}
            <li className="min-w-0 max-w-full">
              <a href={mailtoHref("Mathura trip enquiry")} className="dg-chip max-w-full break-all">
                <Mail size={15} aria-hidden="true" /> {site.contact.email}
              </a>
            </li>
            <li>
              <Link href={mathuraIntro.packagesLink.href} className="dg-chip">
                <Package size={15} aria-hidden="true" /> {mathuraIntro.packagesLink.label}
              </Link>
            </li>
          </ul>

          <aside aria-label="Timings and fees" className="dg-note mt-6">
            <Info size={17} aria-hidden="true" />
            <p>
              <strong className="font-semibold text-ink">{mathuraIntro.note.label}</strong> {mathuraIntro.note.text}{" "}
              <span className="text-stone">
                Last updated <time dateTime={MATHURA_UPDATED}>{updatedOn}</time>.
              </span>
            </p>
          </aside>
        </div>

        <figure className="reveal-zoom mx-auto w-full max-w-md lg:sticky lg:top-36 lg:col-span-5 lg:max-w-none">
          <Media photo="mathura-ghats-weeks" sizes="(min-width: 1024px) 38vw, (min-width: 640px) 28rem, 92vw" className="dg-photo-lg aspect-[4/3] shadow-lift sm:aspect-[4/5] lg:aspect-[5/6]" imgClassName="object-cover object-[36%_50%]" />
          <figcaption className="dg-small mt-3 text-center">Along the Ghats, Mathura, as Edwin Lord Weeks painted it in the 1880s</figcaption>
        </figure>
      </div>
    </section>
  );
}

/** Quick facts as a ruled grid of white cells on cream. */
export function Glance() {
  return (
    <section id="glance" aria-labelledby="glance-title" className="dg-section dg-cream">
      <div className="container-x grid gap-8 lg:grid-cols-12 lg:gap-14">
        <div className="lg:col-span-4">
          <p className="eyebrow">Quick facts</p>
          <h2 id="glance-title" className="dg-h2 mt-3">
            {mathuraGlance.title}
          </h2>
          <p className="dg-lede mt-3">Everything you need to shape the trip, before the detail below.</p>
        </div>
        <dl className="reveal-stagger grid gap-px overflow-hidden rounded-[1.25rem] border border-line bg-line sm:grid-cols-2 lg:col-span-8 lg:grid-cols-3">
          {mathuraGlance.facts.map((f) => (
            <div key={f.label} className="bg-white p-5">
              <dt className="dg-label">{f.label}</dt>
              <dd className="mt-1.5 text-[0.95rem] font-medium leading-snug text-ink">{f.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
