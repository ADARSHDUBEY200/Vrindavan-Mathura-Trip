import Image from "next/image";
import Link from "next/link";
import { Mail, Phone } from "lucide-react";
import { EnquireButton } from "@/components/tour-packages/EnquireButton";
import { EnquiryButtons } from "@/components/ui/EnquiryButtons";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { STARTING_PRICE, STARTING_PRICE_INCLUDES, formatInr, mailtoHref, phoneHref, site } from "@/config/site";
import { photos } from "@/content/images";
import { MATHURA_UPDATED, mathuraGlance, mathuraHero, mathuraIntro, mathuraMeta, mathuraTrust } from "@/content/mathura";
import { mathuraCrumbs } from "@/lib/schema/mathura";
import { Media, Rich } from "./parts";

const updatedOn = new Date(MATHURA_UPDATED).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });

/** Full-bleed opening: the ghat at blue hour, with the city's name set large across it. */
export function MathuraHero() {
  const hero = photos["mathura-vishram-ghat-dusk"];
  return (
    <section aria-labelledby="page-title" className="mt-dark relative isolate flex min-h-svh flex-col overflow-hidden bg-dusk">
      <Image src={hero.src} alt={mathuraMeta.imageAlt} fill loading="eager" fetchPriority="high" sizes="100vw" placeholder="blur" className="ken-burns -z-20 object-cover object-[68%_60%]" />
      <div className="mt-hero-veil absolute inset-0 -z-10" aria-hidden="true" />

      <div className="container-x pt-[6.5rem] sm:pt-[7.5rem]">
        <div className="hero-in">
          <Breadcrumbs items={mathuraCrumbs} light />
        </div>
      </div>

      <div className="container-x mt-auto pt-10">
        <p className="hi hero-in hero-in-1 text-2xl text-marigold sm:text-3xl" lang="hi">
          {mathuraHero.scriptWord}
        </p>
        <h1 id="page-title" className="hero-in hero-in-1">
          <span className="mt-hero-word">{mathuraHero.word}</span>{" "}
          <span className="mt-hero-rest">{mathuraHero.rest}</span>
        </h1>
        <div className="hero-in hero-in-3 mt-7 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between lg:gap-12">
          <div className="max-w-xl">
            <p className="font-editorial text-[1.7rem] italic leading-tight text-white">{mathuraHero.greeting}</p>
            <p className="mt-2 text-[0.95rem] leading-relaxed text-white/85">
              <Rich text={mathuraHero.lede} />
            </p>
          </div>
          <div className="flex flex-wrap gap-3 lg:justify-end xl:shrink-0 xl:flex-nowrap">
            <EnquireButton className="btn btn-primary">Plan my Mathura trip</EnquireButton>
            <EnquiryButtons message={mathuraHero.whatsappMessage} light className="max-sm:[&>a[href^='tel:']]:hidden" />
          </div>
        </div>
      </div>

      <div className="container-x hero-in hero-in-4 pb-24 pt-8 sm:pb-8">
        <dl className="grid grid-cols-2 gap-x-6 gap-y-4 border-t border-white/20 pt-5 sm:grid-cols-4">
          {mathuraTrust.map((t) => (
            <div key={t.label} className="flex flex-col-reverse">
              <dt className="mt-1 text-[0.72rem] uppercase tracking-[0.14em] text-white/70">{t.label}</dt>
              <dd className="text-xl font-semibold text-white sm:text-2xl">{t.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

/** The founder's letter, set like the opening page of a travel journal. */
export function Intro() {
  const tel = phoneHref();
  return (
    <section aria-labelledby="intro-title" className="pb-16 pt-28 sm:pt-32 lg:pb-24">
      <div className="container-x grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
        <figure className="reveal-zoom mx-auto w-full max-w-md lg:col-span-5 lg:max-w-none">
          <Media photo="mathura-ghats-weeks" sizes="(min-width: 1024px) 38vw, (min-width: 640px) 28rem, 92vw" className="arch aspect-[4/5] shadow-lift" imgClassName="object-cover object-[36%_50%]" />
          <figcaption className="mt-4 text-center text-sm italic text-stone">Along the Ghats, Mathura, as Edwin Lord Weeks painted it in the 1880s</figcaption>
        </figure>

        <div className="lg:col-span-7">
          <p className="mt-kicker">A letter from a Brijwasi</p>
          <h2 id="intro-title" className="mt-h2 mt-4">
            {mathuraHero.greeting}
          </h2>
          <div className="mt-prose mt-7">
            {mathuraIntro.paragraphs.map((p, i) => (
              <p key={p} className={i === 0 ? "mt-dropcap" : ""}>
                <Rich text={p} />
              </p>
            ))}
          </div>
          {STARTING_PRICE_INCLUDES && (
            <p className="mt-4 text-sm text-stone">
              {formatInr(STARTING_PRICE)}: {STARTING_PRICE_INCLUDES}
            </p>
          )}

          <ul className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3 text-[0.85rem] font-medium min-[360px]:text-[0.95rem]">
            {tel && (
              <li>
                <a href={tel} className="mt-link inline-flex items-center gap-2">
                  <Phone size={16} aria-hidden="true" /> {site.contact.phone}
                </a>
              </li>
            )}
            <li className="min-w-0">
              <a href={mailtoHref("Mathura trip enquiry")} className="mt-link inline-flex items-center gap-2 break-all">
                <Mail size={16} aria-hidden="true" className="shrink-0" /> {site.contact.email}
              </a>
            </li>
            <li>
              <Link href={mathuraIntro.packagesLink.href} className="mt-link">
                {mathuraIntro.packagesLink.label}
              </Link>
            </li>
          </ul>

          <aside aria-label="Timings and fees" className="mt-8 border-l-2 border-marigold pl-5">
            <p className="mt-body">
              <strong className="font-semibold text-ink">{mathuraIntro.note.label}</strong> {mathuraIntro.note.text}
            </p>
            <p className="mt-2 text-sm text-stone">
              Last updated: <time dateTime={MATHURA_UPDATED}>{updatedOn}</time>
            </p>
          </aside>
        </div>
      </div>
    </section>
  );
}

/** Quick facts as a night-blue ledger: ruled rows, no boxes. */
export function Glance() {
  return (
    <section id="glance" aria-labelledby="glance-title" className="mt-dark py-16 lg:py-24">
      <div className="container-x grid gap-10 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-4">
          <p className="mt-kicker">Quick facts</p>
          <h2 id="glance-title" className="mt-h2 mt-4">
            {mathuraGlance.title}
          </h2>
        </div>
        <dl className="reveal-stagger grid gap-x-12 sm:grid-cols-2 lg:col-span-8">
          {mathuraGlance.facts.map((f) => (
            <div key={f.label} className="border-t border-white/15 py-5">
              <dt className="mt-label">{f.label}</dt>
              <dd className="mt-2 font-editorial text-[1.6rem] leading-snug text-white">{f.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
