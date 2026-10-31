import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import {
  ArrowRight,
  CircleCheck,
  Clock,
  EyeOff,
  Footprints,
  Hotel,
  House,
  Hourglass,
  Landmark,
  Mail,
  Map as MapIcon,
  MapPin,
  Phone,
  Quote,
  Receipt,
  ShieldCheck,
  Star,
  UserCheck,
  Utensils,
  type LucideIcon,
} from "lucide-react";
import { EnquiryForm } from "@/components/forms/EnquiryForm";
import { WhatsappIcon } from "@/components/svg/TravelIcons";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { FOUNDED, FOUNDER, LAST_UPDATED, SAME_AS, STARTING_PRICE, STARTING_PRICE_INCLUDES, formatInr, mailtoHref, phoneHref, site } from "@/config/site";
import { PACKAGES_PATH, aboutContact, aboutHero, aboutImages, aboutMilestone, aboutPhilosophy, aboutStory, aboutTeam, aboutWhy, type AboutImage } from "@/content/about";
import { testimonials } from "@/content/sections";
import { aboutCrumbs } from "@/lib/schema/about";
import { whatsappLink } from "@/lib/whatsapp";
import { CountUp } from "./CountUp";
import { LetterHeading, LetterSection, Paragraphs, Rich, accent, eyebrowChip, letterFont, letterLink, letterText } from "./letter";

const icons: Record<string, LucideIcon> = {
  shield: ShieldCheck,
  clock: Clock,
  "eye-off": EyeOff,
  receipt: Receipt,
  hourglass: Hourglass,
  footprints: Footprints,
  map: MapIcon,
  "user-check": UserCheck,
  utensils: Utensils,
  hotel: Hotel,
};

function IconBadge({ name, className = "size-10" }: { name: string; className?: string }) {
  const Cmp = icons[name] ?? ShieldCheck;
  return (
    <span className={`about-icon ${className}`}>
      <Cmp size={19} aria-hidden="true" />
    </span>
  );
}

/** Rounded photo with a gentle scroll-in and hover zoom. */
function Photo({ img, sizes, className = "aspect-4/3" }: { img: AboutImage; sizes: string; className?: string }) {
  return (
    <div className={`about-photo reveal-zoom ${className}`}>
      <Image src={img.src} alt={img.alt} width={img.width} height={img.height} sizes={sizes} className="h-full w-full object-cover" />
    </div>
  );
}

/**
 * Image-beside-text layout. The image column is narrower (5/12) and sticks while the text scrolls on desktop;
 * on mobile the image sits above the text.
 */
function Split({ img, side = "left", children }: { img: AboutImage; side?: "left" | "right"; children: ReactNode }) {
  return (
    <div className="mx-auto grid max-w-6xl items-start gap-7 lg:grid-cols-12 lg:gap-12">
      <div className={`lg:sticky lg:top-28 lg:col-span-5 ${side === "right" ? "lg:order-last" : ""}`}>
        <Photo img={img} sizes="(min-width: 1280px) 30rem, (min-width: 1024px) 40vw, 100vw" />
      </div>
      <div className="min-w-0 lg:col-span-7">{children}</div>
    </div>
  );
}

function Stars({ size = 16, className = "text-amber-400" }: { size?: number; className?: string }) {
  return (
    <span className={`flex gap-0.5 ${className}`} aria-hidden="true">
      {Array.from({ length: 5 }, (_, i) => (
        <Star key={i} size={size} fill="currentColor" strokeWidth={0} />
      ))}
    </span>
  );
}

const lastUpdatedLabel = new Date(`${LAST_UPDATED}T00:00:00Z`).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });

/** Google profile from SAME_AS, else the homepage testimonials (when any exist). */
const reviewsHref =
  SAME_AS.find((u) => /google\.[^/]+\/maps|g\.page|maps\.app\.goo\.gl|share\.google/.test(u)) ?? (testimonials.length ? "/#testimonials-title" : undefined);

const tel = phoneHref();

/* 1. Hero ------------------------------------------------------------------ */

/** Trust items that lead with a figure ("11+ Years Guiding") become stats; the rest become check pills. */
const trustStats = aboutHero.trust.flatMap((t) => {
  const m = t.match(/^([\d.,]+[+★]?)\s+(.+)$/);
  return m ? [{ text: t, value: m[1], label: m[2] }] : [];
});
const trustPills = aboutHero.trust.filter((t) => !trustStats.some((s) => s.text === t));

export function AboutHero() {
  const img = aboutImages.hero;
  // "About Mathura Vrindavan Trips: Your Local Companions in Braj Bhoomi" → brand name in the orange gradient, subtitle on its own line.
  const [lead, ...rest] = aboutHero.title.split(": ");
  const subtitle = rest.join(": ");
  const brand = lead.startsWith("About ") ? lead.slice(6) : "";
  return (
    <section aria-labelledby="about-title" className="about-hero relative overflow-hidden pb-10 pt-24 sm:pt-28 lg:pb-12">
      <div className="container-x">
        <div className="mx-auto grid max-w-6xl items-start gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="min-w-0 lg:col-span-7">
            <div className="hero-in">
              <Breadcrumbs items={aboutCrumbs} />
            </div>

            <p className="hero-in hero-in-1 mt-4 inline-flex items-center gap-2 rounded-full border border-orange-200 bg-orange-50 px-3 py-1 text-[0.8125rem] font-medium text-orange-600">
              <MapPin size={15} aria-hidden="true" />
              A letter from {FOUNDER.name}, {FOUNDER.jobTitle}
            </p>

            <h1 id="about-title" className="hero-in hero-in-2 mt-4 max-w-2xl text-[clamp(1.6rem,1.25rem+1.4vw,2.375rem)] font-extrabold leading-[1.2] tracking-tight text-gray-900">
              {brand ? (
                <>
                  About <span className="about-brand-text">{brand}</span>
                  {subtitle && ":"}
                </>
              ) : (
                lead
              )}
              {subtitle && <span className="block">{subtitle}</span>}
            </h1>

            <p className={`${letterFont.className} hero-in hero-in-3 mt-4 text-lg text-gray-900 sm:text-xl`}>
              <Rich text={aboutHero.greeting} />
            </p>

            <div className="hero-in hero-in-3 mt-3 max-w-xl space-y-3 text-[0.9375rem] leading-7 text-gray-600">
              {aboutHero.paragraphs.map((p) => (
                <p key={p.slice(0, 48)}>
                  <Rich text={p} />
                </p>
              ))}
            </div>

            <p className={`${letterFont.className} hero-in hero-in-4 mt-4 max-w-xl border-l-2 border-orange-300 pl-4 text-base italic text-gray-700`}>{aboutHero.leadOut}</p>

            <div className="hero-in hero-in-4 mt-5">
              {trustPills.length > 0 && (
                <ul aria-label="About us" className="flex flex-wrap gap-2.5">
                  {trustPills.map((t) => (
                    <li key={t} className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-3.5 py-2 text-sm font-medium text-gray-900 shadow-[0_1px_2px_rgb(17_24_39/0.05)]">
                      <CircleCheck size={16} aria-hidden="true" className="text-orange-500" />
                      {t}
                    </li>
                  ))}
                </ul>
              )}
              {trustStats.length > 0 && (
                <ul aria-label="At a glance" className="mt-5 flex flex-wrap gap-y-4 divide-x divide-gray-200">
                  {trustStats.map((s) => (
                    <li key={s.text} className="px-5 first:pl-0 sm:px-6">
                      <span className="block text-xl font-extrabold tracking-tight text-orange-500 sm:text-2xl">{s.value}</span>
                      <span className="mt-0.5 block text-xs text-gray-500">{s.label}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <p className="mt-4 text-xs text-gray-500">
              Last updated: <time dateTime={LAST_UPDATED}>{lastUpdatedLabel}</time>
            </p>
          </div>

          <figure className="hero-in hero-in-2 relative mx-auto w-full max-w-xs sm:max-w-sm lg:col-span-5 lg:mt-9 lg:max-w-92">
            <div className="rounded-[1.75rem] bg-white p-2 shadow-[0_1px_2px_rgb(17_24_39/0.06),0_32px_64px_-32px_rgb(17_24_39/0.5)] ring-1 ring-gray-200/70">
              <Image
                src={img.src}
                alt={img.alt}
                width={img.width}
                height={img.height}
                preload
                sizes="(min-width: 1024px) 23rem, (min-width: 640px) 24rem, 90vw"
                className="aspect-4/5 h-auto w-full rounded-[1.35rem] bg-sand object-cover"
              />
            </div>
            {/* Repeats facts from the text, so it is hidden from assistive tech. */}
            <div aria-hidden="true" className="absolute inset-x-5 bottom-5 flex items-center gap-3 rounded-2xl bg-white/95 p-3.5 shadow-lift backdrop-blur">
              <span className="about-icon size-10">
                <Landmark size={18} />
              </span>
              <span className="leading-tight">
                <span className="block text-sm font-semibold text-gray-900">Serving pilgrims since {FOUNDED}</span>
                <span className="mt-0.5 block text-xs text-gray-500">Born and raised in {FOUNDER.bornIn}</span>
              </span>
            </div>
          </figure>
        </div>
      </div>
    </section>
  );
}

/* 2. My story: image left ---------------------------------------------------- */
export function AboutStory() {
  const s = aboutStory;
  return (
    <LetterSection id={s.id}>
      <Split img={aboutImages.lane}>
        <LetterHeading id={s.id} eyebrow={s.eyebrow} title={s.title} align="left" />
        <Paragraphs items={s.paragraphs} className="mt-5" />

        <figure className="reveal mt-6 rounded-2xl border-l-[3px] border-orange-500 bg-orange-50/60 py-5 pl-5 pr-5 sm:pl-6">
          <p className={letterText}>
            <span className={`${letterFont.className} block text-lg leading-snug text-gray-900 sm:text-xl`}>{s.pullQuote.lead}</span>
            <span className="mt-2 block">
              <Rich text={s.pullQuote.rest} />
            </span>
          </p>
        </figure>

        <div className="reveal mt-6">
          <h3 className="text-base font-bold text-gray-900 sm:text-lg">{s.connection.title}</h3>
          <Paragraphs items={s.connection.paragraphs} className="mt-2" />
        </div>
      </Split>
    </LetterSection>
  );
}

/* 3. Why we started: image right ------------------------------------------- */
export function AboutWhy() {
  const s = aboutWhy;
  return (
    <LetterSection id={s.id} tone="grey">
      <Split img={aboutImages.elders} side="right">
        <LetterHeading id={s.id} eyebrow={s.eyebrow} title={s.title} align="left" />
        <div className="mt-5 space-y-4">
          <Paragraphs items={s.story} />
          <p className={letterText}>
            {s.conveyor.before}
            <strong className="box-decoration-clone rounded bg-orange-100 px-1 font-semibold text-gray-900">{s.conveyor.emphasis}</strong>
            {s.conveyor.after}
          </p>
          <p className={letterText}>
            <Rich text={s.promisesIntro} />
          </p>
        </div>
      </Split>
      <ul className="reveal-stagger mx-auto mt-8 grid max-w-6xl grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        {s.promises.map((p) => (
          <li key={p.text} className="about-card flex items-center gap-3 p-4 sm:p-5">
            <IconBadge name={p.icon} />
            <strong className="text-sm font-semibold text-gray-900 sm:text-[0.95rem]">{p.text}</strong>
          </li>
        ))}
      </ul>
      <p className={`${letterText} reveal mx-auto mt-6 max-w-3xl text-center italic`}>{s.closing}</p>
    </LetterSection>
  );
}

/* 4. Philosophy (the one dark section) ------------------------------------- */
export function AboutPhilosophy() {
  const s = aboutPhilosophy;
  const includes = STARTING_PRICE_INCLUDES;
  return (
    <LetterSection id={s.id} tone="dark">
      <div className="mx-auto max-w-3xl">
        <LetterHeading id={s.id} eyebrow={s.eyebrow} title={s.title} />
        <p className={`${letterText} mt-4 text-center`}>
          <Rich text={s.intro} />
        </p>
      </div>

      <figure className="reveal mx-auto my-7 max-w-3xl border-y border-white/10 py-6 text-center">
        <Quote size={24} aria-hidden="true" className="mx-auto text-orange-400" />
        <p className={`${letterFont.className} mt-3 text-xl leading-snug text-white sm:text-2xl`}>
          <strong className="font-normal">{s.quote}</strong>
        </p>
      </figure>

      <div className="mx-auto max-w-3xl space-y-4 text-center">
        <p className={letterText}>{s.introAfter}</p>
        <p className={letterText}>{s.beliefsIntro}</p>
      </div>
      <ul className="reveal-stagger mx-auto mt-7 grid max-w-6xl gap-4 sm:grid-cols-2">
        {s.beliefs.map((b) => (
          <li key={b.lead} className="about-card flex gap-4 p-5">
            <IconBadge name={b.icon} />
            <p className="text-[0.9375rem] leading-7 text-stone-600">
              <strong className="font-semibold text-ink">{b.lead}</strong> {b.text}
            </p>
          </li>
        ))}
      </ul>

      <div className="mx-auto mt-10 grid max-w-6xl items-center gap-7 border-t border-white/10 pt-10 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-7">
          <h3 className="reveal text-center text-lg font-bold sm:text-xl lg:text-left">{s.luxury.title}</h3>
          <Paragraphs items={s.luxury.paragraphs} className="mt-3" />
        </div>
        <div className="reveal-zoom rounded-2xl border border-orange-300/25 bg-white/4 p-6 text-center lg:col-span-5">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-orange-400">Braj tour packages</p>
          <p className="mt-3 leading-none">
            <span className="text-base font-medium text-stone">from </span>
            <span className="text-4xl font-extrabold tracking-tight text-white">{formatInr(STARTING_PRICE)}</span>
          </p>
          {includes && (
            <p className="mt-4 text-sm leading-6 text-stone">
              <span className="font-semibold text-ink">What the {formatInr(STARTING_PRICE)} starting price includes:</span> {includes}
            </p>
          )}
          <Link href={PACKAGES_PATH} className="btn btn-primary mt-5">
            Explore our tour packages <ArrowRight size={18} aria-hidden="true" className="btn-arrow" />
          </Link>
        </div>
      </div>
    </LetterSection>
  );
}

/* 5. Milestone: image left + orange numbers band --------------------------- */
export function AboutMilestone() {
  const s = aboutMilestone;
  const shownTestimonials = testimonials.slice(0, 3);
  return (
    <LetterSection id={s.id}>
      <Split img={aboutImages.milestone}>
        <LetterHeading id={s.id} eyebrow={s.eyebrow} title={s.title} align="left" />
        <p className={`${letterText} mt-4`}>{s.intro}</p>

        {/* The headline figures — the same numbers are in the H3s below, so this band is decorative. */}
        <div aria-hidden="true" className="reveal mt-6 grid grid-cols-2 overflow-hidden rounded-2xl bg-linear-to-r from-orange-500 to-amber-500 text-white shadow-[0_18px_36px_-20px_rgb(249_115_22/0.8)]">
          <div className="px-5 py-5 text-center">
            <p className="text-3xl font-extrabold tracking-tight sm:text-4xl">
              <CountUp value={s.pilgrims.value} suffix="+" />
            </p>
            <p className="mt-1 text-xs font-semibold uppercase tracking-[0.14em] text-white/90">Pilgrims guided</p>
          </div>
          <div className="border-l border-white/25 px-5 py-5 text-center">
            <p className="text-3xl font-extrabold tracking-tight sm:text-4xl">{s.rating.value}★</p>
            <Stars size={14} className="mt-1.5 justify-center text-white" />
          </div>
        </div>
      </Split>

      <div className="reveal-stagger mx-auto mt-8 grid max-w-6xl gap-4 lg:grid-cols-2">
        <article className="about-card p-6">
          <h3 className="text-base font-bold text-gray-900 sm:text-lg">{s.pilgrims.title}</h3>
          <Paragraphs items={s.pilgrims.paragraphs} className="mt-2" />
        </article>

        <article className="about-card p-6">
          <h3 className="text-base font-bold text-gray-900 sm:text-lg">{s.rating.title}</h3>
          <Paragraphs items={s.rating.paragraphs} className="mt-2" />
          <div className="mt-5 flex flex-wrap gap-3">
            {reviewsHref && (
              <a href={reviewsHref} className="btn btn-outline" {...(reviewsHref.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
                <Star size={18} aria-hidden="true" /> Read guest reviews
              </a>
            )}
            {tel && (
              <a href={tel} className="btn btn-primary">
                <Phone size={18} aria-hidden="true" /> Call me
                <span className="sr-only"> on {site.contact.phone}</span>
              </a>
            )}
          </div>
        </article>
      </div>

      {/* Visual echo of the paragraph above — hidden from assistive tech to avoid reading it twice. */}
      <ul aria-hidden="true" className="reveal-stagger mx-auto mt-4 grid max-w-6xl gap-4 sm:grid-cols-3">
        {s.pilgrims.remembered.map((r) => (
          <li key={r.who} className="about-card flex gap-3 p-5">
            <Quote size={18} className="mt-1 shrink-0 text-orange-500" />
            <div>
              <p className={`${letterFont.className} text-lg ${accent}`}>{r.who}</p>
              <p className="mt-0.5 text-sm leading-6 text-gray-600">{r.moment}</p>
            </div>
          </li>
        ))}
      </ul>

      {shownTestimonials.length > 0 && (
        <ul className="reveal-stagger mx-auto mt-6 grid max-w-6xl gap-4 md:grid-cols-3" aria-label="What our guests say">
          {shownTestimonials.map((t) => (
            <li key={t.name + t.quote.slice(0, 20)} className="about-card p-5">
              <figure>
                <Stars />
                <blockquote className="mt-3 text-[0.9375rem] leading-relaxed text-gray-700">{t.quote}</blockquote>
                <figcaption className="mt-3 text-sm">
                  <span className="font-semibold text-gray-900">{t.name}</span>
                  {t.place && <span className="text-gray-500">, {t.place}</span>}
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      )}
    </LetterSection>
  );
}

/* 6. Team: image right ------------------------------------------------------- */
export function AboutTeam() {
  const s = aboutTeam;
  return (
    <LetterSection id={s.id} tone="grey">
      <Split img={aboutImages.team} side="right">
        <LetterHeading id={s.id} eyebrow={s.eyebrow} title={s.title} align="left" />
        <Paragraphs items={[s.intro, s.knowledgeIntro]} className="mt-5" />
        <ul className="reveal-stagger mt-5 grid gap-3">
          {s.knowledge.map((k) => (
            <li key={k.lead} className="flex gap-3.5">
              <IconBadge name={k.icon} className="size-9" />
              <p className={letterText}>
                <strong className="font-semibold text-ink">{k.lead}</strong>
                {k.text.startsWith(",") ? "" : " "}
                {k.text}
              </p>
            </li>
          ))}
        </ul>
        <p className={`${letterText} mt-5`}>{s.drivers}</p>
      </Split>

      <div className="reveal mx-auto mt-8 flex max-w-6xl gap-4 rounded-2xl border border-gray-200 border-l-[3px] border-l-orange-500 bg-white p-5 sm:p-6">
        <span className="about-icon size-10">
          <House size={19} aria-hidden="true" />
        </span>
        <p className={`${letterText} [&_strong]:text-gray-900`}>
          <Rich text={s.local} />
        </p>
      </div>

      {/*
        Team grid — add once real team members (with consent) and photos are available, e.g. in content/about.ts:
        <ul className="reveal-stagger mx-auto mt-8 grid max-w-6xl grid-cols-2 gap-4 sm:grid-cols-4">
          {team.map((m) => (
            <li key={m.name} className="about-card overflow-hidden text-center">
              <Image src={m.photo} alt={`${m.name}, ${m.role} at Mathura Vrindavan Trips`} width={600} height={750} className="aspect-4/5 h-auto w-full object-cover" />
              <p className="mt-3 font-semibold">{m.name}</p>
              <p className="mb-4 text-sm text-stone">{m.role}</p>
            </li>
          ))}
        </ul>
      */}
    </LetterSection>
  );
}

/* 7. Contact / sign-off ------------------------------------------------------ */
export function AboutContact() {
  const s = aboutContact;
  const wa = whatsappLink(s.whatsappMessage);
  const mail = mailtoHref("Braj yatra enquiry");
  const credited = Object.values(aboutImages).filter((i): i is AboutImage & { credit: NonNullable<AboutImage["credit"]> } => "credit" in i && !!i.credit);
  return (
    <LetterSection id={s.id}>
      <Split img={aboutImages.contact}>
        <LetterHeading id={s.id} eyebrow={s.eyebrow} title={s.title} align="left" />
        <Paragraphs items={s.paragraphs} className="mt-5" />
        <ul className="mt-5 space-y-2 rounded-xl border border-gray-200 bg-[#f7f8fa] p-4 text-[0.9375rem] font-semibold text-gray-900 sm:p-5">
          <li>
            <span aria-hidden="true">{s.lines.phone.emoji} </span>
            {s.lines.phone.label}{" "}
            {tel ? (
              <a href={tel} className={letterLink}>
                {site.contact.phone}
              </a>
            ) : (
              site.contact.phone
            )}
          </li>
          <li>
            <span aria-hidden="true">{s.lines.email.emoji} </span>
            {s.lines.email.label}{" "}
            <a href={mail} className={`${letterLink} break-all`}>
              {site.contact.email}
            </a>
          </li>
          <li>
            <span aria-hidden="true">{s.lines.website.emoji} </span>
            {s.lines.website.label} <span className="break-all font-normal text-gray-600">{s.lines.website.value}</span>
          </li>
        </ul>
        <div className="mt-5 flex flex-wrap gap-3">
          {tel && (
            <a href={tel} className="btn btn-primary">
              <Phone size={18} aria-hidden="true" /> Call
            </a>
          )}
          {wa && (
            <a href={wa} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp">
              <WhatsappIcon size={20} /> WhatsApp
              <span className="sr-only"> (opens WhatsApp)</span>
            </a>
          )}
          <a href={mail} className="btn btn-outline">
            <Mail size={18} aria-hidden="true" /> Email
          </a>
        </div>

        <div className="mt-6">
          <p className="text-sm font-semibold text-gray-900">{s.statsLabel}:</p>
          <ul className="mt-2.5 flex flex-wrap gap-2">
            {s.stats.map((t) => (
              <li key={t} className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-[0.8125rem] font-medium text-gray-900">
                <CircleCheck size={14} aria-hidden="true" className="text-orange-500" />
                {t}
              </li>
            ))}
          </ul>
        </div>
      </Split>

      <div className="mx-auto mt-10 grid max-w-6xl items-start gap-8 lg:grid-cols-12 lg:gap-12">
        <div className="reveal lg:col-span-7">
          <div className="text-center lg:text-left">
            <Eyebrow className={eyebrowChip}>Send an enquiry</Eyebrow>
          </div>
          <div className="mt-4">
            <EnquiryForm title={`Tell ${FOUNDER.name} about your yatra`} />
          </div>
        </div>

        <div className="reveal rounded-2xl border border-gray-200 bg-[#f7f8fa] p-6 lg:sticky lg:top-28 lg:col-span-5">
          <p className={`${letterFont.className} text-lg leading-snug ${accent} sm:text-xl`}>{s.closing}</p>
          <p className={`${letterFont.className} mt-4 text-lg text-gray-900`}>
            <Rich text={s.farewell} />
          </p>
          <p className={`${letterFont.className} mt-4 text-right text-lg italic text-gray-700`}>{s.signature}</p>

          <nav aria-label="Keep exploring" className="mt-6 flex flex-wrap gap-3 border-t border-gray-200 pt-5">
            <Link href={PACKAGES_PATH} className="btn btn-primary">
              Explore our tour packages <ArrowRight size={18} aria-hidden="true" className="btn-arrow" />
            </Link>
            <Link href="/" className="btn btn-outline">
              <House size={18} aria-hidden="true" /> Back to Home
            </Link>
          </nav>
        </div>
      </div>

      {credited.length > 0 && (
        <div className="mx-auto mt-10 max-w-6xl border-t border-gray-200 pt-5 text-xs leading-6 text-gray-500">
          <p className="font-semibold text-gray-700">Photo credits</p>
          <ul className="mt-1">
            {credited.map((i) => (
              <li key={i.src}>
                <a href={i.credit.sourceUrl} className="underline underline-offset-2 hover:text-gray-900" target="_blank" rel="noopener noreferrer">
                  {i.alt}
                </a>{" "}
                by {i.credit.author}, licensed under{" "}
                <a href={i.credit.licenseUrl} className="underline underline-offset-2 hover:text-gray-900" target="_blank" rel="noopener noreferrer">
                  {i.credit.license}
                </a>
                , via Wikimedia Commons (cropped and resized).
              </li>
            ))}
          </ul>
        </div>
      )}
    </LetterSection>
  );
}
