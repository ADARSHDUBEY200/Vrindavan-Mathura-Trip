import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Clock,
  EyeOff,
  Footprints,
  Hotel,
  House,
  Hourglass,
  Mail,
  Map as MapIcon,
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
import { LAST_UPDATED, SAME_AS, STARTING_PRICE, STARTING_PRICE_INCLUDES, formatInr, mailtoHref, phoneHref, site } from "@/config/site";
import { PACKAGES_PATH, aboutContact, aboutHero, aboutImages, aboutMilestone, aboutPhilosophy, aboutStory, aboutTeam, aboutWhy } from "@/content/about";
import { testimonials } from "@/content/sections";
import { aboutCrumbs } from "@/lib/schema/about";
import { whatsappLink } from "@/lib/whatsapp";
import { CountUp } from "./CountUp";
import { LetterHeading, LetterSection, Paragraphs, Rich, crimson, letterFont, letterLink, letterText } from "./letter";

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

function IconBadge({ name, className = "size-11 rounded-xl" }: { name: string; className?: string }) {
  const Cmp = icons[name] ?? ShieldCheck;
  return (
    <span className={`icon-badge ${className}`}>
      <Cmp size={20} aria-hidden="true" />
    </span>
  );
}

const lastUpdatedLabel = new Date(`${LAST_UPDATED}T00:00:00Z`).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });

/** Google profile from SAME_AS, else the homepage testimonials (when any exist). */
const reviewsHref =
  SAME_AS.find((u) => /google\.[^/]+\/maps|g\.page|maps\.app\.goo\.gl|share\.google/.test(u)) ?? (testimonials.length ? "/#testimonials-title" : undefined);

const tel = phoneHref();

/* 1. Hero ------------------------------------------------------------------ */
export function AboutHero() {
  const img = aboutImages.founder;
  return (
    <section aria-labelledby="about-title" className="bg-hero relative overflow-hidden pb-12 pt-28 sm:pt-32 lg:pb-16">
      <div className="bg-dots pointer-events-none absolute inset-0 mask-[radial-gradient(60%_70%_at_20%_30%,black,transparent)]" aria-hidden="true" />
      <div className="container-x relative">
        <div className="grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
          <div className="min-w-0">
            <Breadcrumbs items={aboutCrumbs} />
            <h1 id="about-title" className="display-1 mt-5 max-w-3xl">
              {aboutHero.title}
            </h1>
            <p className={`${letterFont.className} mt-6 text-2xl text-[#8b2510] sm:text-3xl`}>
              <Rich text={aboutHero.greeting} />
            </p>
            <Paragraphs items={aboutHero.paragraphs} className="mt-5 max-w-3xl" />
            <p className={`${letterText} mt-6 max-w-3xl italic text-ink-soft`}>{aboutHero.leadOut}</p>
          </div>

          <div className="relative mx-auto w-full max-w-sm lg:max-w-md">
            <div aria-hidden="true" className="absolute -inset-5 rounded-[2.5rem] bg-linear-to-br from-orange-300/60 via-amber-200/50 to-orange-100/30 blur-2xl" />
            <Image
              src={img.src}
              alt={img.alt}
              width={img.width}
              height={img.height}
              preload
              sizes="(min-width: 1024px) 28rem, (min-width: 640px) 24rem, 90vw"
              className="relative aspect-[4/5] h-auto w-full rounded-[2rem] bg-sand object-cover shadow-lift ring-4 ring-orange-200 ring-offset-4 ring-offset-white"
            />
          </div>
        </div>

        <ul
          aria-label="At a glance"
          className={`${crimson} mt-12 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 rounded-2xl px-5 py-3.5 text-sm font-semibold text-white shadow-lift sm:text-[0.95rem] [&>li+li]:before:mr-4 [&>li+li]:before:text-amber-300 [&>li+li]:before:content-['·']`}
        >
          {aboutHero.trust.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>
        <p className="mt-4 text-center text-sm text-stone sm:text-left">
          Last updated: <time dateTime={LAST_UPDATED}>{lastUpdatedLabel}</time>
        </p>
      </div>
    </section>
  );
}

/* 2. My story ---------------------------------------------------------------- */
export function AboutStory() {
  const img = aboutImages.lane;
  const s = aboutStory;
  return (
    <LetterSection id={s.id}>
      <div className="mx-auto max-w-3xl">
        <LetterHeading id={s.id} eyebrow={s.eyebrow} title={s.title} />
      </div>
      <div className="mx-auto mt-10 max-w-5xl">
        <Image src={img.src} alt={img.alt} width={img.width} height={img.height} sizes="(min-width: 1024px) 64rem, 100vw" className="aspect-video h-auto w-full rounded-2xl bg-sand object-cover shadow-soft" />
      </div>
      <div className="mx-auto mt-10 max-w-3xl">
        <Paragraphs items={s.paragraphs} />

        <div className="relative mt-12 rounded-2xl border-l-4 border-orange-500 bg-saffron-wash px-6 pb-7 pt-9 sm:px-9">
          <span className="absolute -top-5 left-6 grid size-10 place-items-center rounded-full bg-white text-orange-500 shadow-soft">
            <Quote size={20} aria-hidden="true" />
          </span>
          <p className={letterText}>
            <span className={`${letterFont.className} block text-2xl leading-snug text-[#8b2510] sm:text-3xl`}>{s.pullQuote.lead}</span>
            <span className="mt-4 block">
              <Rich text={s.pullQuote.rest} />
            </span>
          </p>
        </div>

        <div className="mt-12 rounded-2xl border border-orange-100 bg-saffron-wash p-6 sm:p-8">
          <h3 className="display-3">{s.connection.title}</h3>
          <Paragraphs items={s.connection.paragraphs} className="mt-4" />
        </div>
      </div>
    </LetterSection>
  );
}

/* 3. Why we started -------------------------------------------------------- */
export function AboutWhy() {
  const img = aboutImages.elders;
  const s = aboutWhy;
  return (
    <LetterSection id={s.id} cream>
      <div className="mx-auto max-w-3xl">
        <LetterHeading id={s.id} eyebrow={s.eyebrow} title={s.title} />
      </div>
      <div className="mx-auto mt-10 grid max-w-5xl items-start gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:gap-12">
        <Image
          src={img.src}
          alt={img.alt}
          width={img.width}
          height={img.height}
          sizes="(min-width: 1024px) 26rem, 100vw"
          className="aspect-[4/3] h-auto w-full rounded-2xl bg-sand object-cover shadow-soft lg:sticky lg:top-28"
        />
        <Paragraphs items={s.story} />
      </div>
      <div className="mx-auto mt-8 max-w-3xl space-y-6">
        <p className={letterText}>
          {s.conveyor.before}
          <strong className="rounded-md bg-orange-100 px-1.5 py-0.5 font-bold text-[#8b2510]">{s.conveyor.emphasis}</strong>
          {s.conveyor.after}
        </p>
        <p className={letterText}>
          <Rich text={s.promisesIntro} />
        </p>
      </div>
      <ul className="mx-auto mt-8 grid max-w-5xl grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        {s.promises.map((p) => (
          <li key={p.text} className="reveal surface flex flex-col items-center gap-3 p-5 text-center sm:p-6">
            <IconBadge name={p.icon} className="size-12 rounded-2xl" />
            <strong className="text-base font-bold text-ink sm:text-lg">{p.text}</strong>
          </li>
        ))}
      </ul>
      <p className={`${letterText} mx-auto mt-8 max-w-3xl italic`}>{s.closing}</p>
    </LetterSection>
  );
}

/* 4. Philosophy -------------------------------------------------------------- */
export function AboutPhilosophy() {
  const s = aboutPhilosophy;
  const includes = STARTING_PRICE_INCLUDES;
  return (
    <LetterSection id={s.id}>
      <div className="mx-auto max-w-3xl">
        <LetterHeading id={s.id} eyebrow={s.eyebrow} title={s.title} />
        <p className={`${letterText} mt-8`}>
          <Rich text={s.intro} />
        </p>
      </div>
      <div className={`${crimson} relative mx-auto my-10 max-w-4xl overflow-hidden rounded-2xl px-6 py-10 text-center shadow-lift sm:px-12 sm:py-12`}>
        <Quote size={36} aria-hidden="true" className="mx-auto text-amber-300" />
        <p className={`${letterFont.className} mt-4 text-2xl leading-snug text-white sm:text-3xl`}>
          <strong className="font-normal">{s.quote}</strong>
        </p>
      </div>
      <div className="mx-auto max-w-3xl space-y-6">
        <p className={letterText}>{s.introAfter}</p>
        <p className={letterText}>{s.beliefsIntro}</p>
      </div>
      <ul className="mx-auto mt-8 grid max-w-5xl gap-4 sm:grid-cols-2">
        {s.beliefs.map((b) => (
          <li key={b.lead} className="reveal surface flex gap-4 p-5 sm:p-6">
            <IconBadge name={b.icon} />
            <p className="text-base leading-7 text-gray-700">
              <strong className="font-semibold text-ink">{b.lead}</strong> {b.text}
            </p>
          </li>
        ))}
      </ul>

      <div className="mx-auto mt-14 max-w-5xl">
        <h3 className="display-3 mx-auto max-w-3xl text-center sm:text-left lg:mx-0">{s.luxury.title}</h3>
        <div className="mt-6 grid items-start gap-8 lg:grid-cols-[0.75fr_1.25fr] lg:gap-12">
          <div className="rounded-2xl border border-orange-100 bg-saffron-wash p-7 text-center shadow-soft">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-ember-deep">Braj tour packages</p>
            <p className="mt-2 leading-none">
              <span className="text-lg font-semibold text-ink-soft">from </span>
              <span className="text-5xl font-extrabold tracking-tight text-orange-600 sm:text-6xl">{formatInr(STARTING_PRICE)}</span>
            </p>
            {includes && (
              <p className="mt-4 text-sm leading-6 text-stone">
                <span className="font-semibold text-ink">What the {formatInr(STARTING_PRICE)} starting price includes:</span> {includes}
              </p>
            )}
            <Link href={PACKAGES_PATH} className="btn btn-primary mt-6">
              Explore our tour packages <ArrowRight size={18} aria-hidden="true" className="btn-arrow" />
            </Link>
          </div>
          <Paragraphs items={s.luxury.paragraphs} />
        </div>
      </div>
    </LetterSection>
  );
}

/* 5. Milestone --------------------------------------------------------------- */
export function AboutMilestone() {
  const img = aboutImages.milestone;
  const s = aboutMilestone;
  const shownTestimonials = testimonials.slice(0, 3);
  return (
    <LetterSection id={s.id} cream>
      <div className="mx-auto max-w-3xl">
        <LetterHeading id={s.id} eyebrow={s.eyebrow} title={s.title} />
        <p className={`${letterText} mt-8`}>{s.intro}</p>
      </div>
      <div className="mx-auto mt-10 max-w-5xl">
        <Image src={img.src} alt={img.alt} width={img.width} height={img.height} sizes="(min-width: 1024px) 64rem, 100vw" className="aspect-video h-auto w-full rounded-2xl bg-sand object-cover shadow-soft" />
      </div>

      <div className="mx-auto mt-10 grid max-w-5xl gap-6 lg:grid-cols-2">
        <article className="surface p-6 sm:p-8">
          <p className="text-center text-5xl font-extrabold tracking-tight text-orange-600 sm:text-6xl">
            <CountUp value={s.pilgrims.value} suffix="+" />
          </p>
          <h3 className="display-3 mt-5">{s.pilgrims.title}</h3>
          <Paragraphs items={s.pilgrims.paragraphs} className="mt-4" />
        </article>

        <article className="surface p-6 sm:p-8">
          <div className="text-center">
            <p className="text-5xl font-extrabold tracking-tight text-orange-600 sm:text-6xl">
              <span aria-hidden="true">{s.rating.value}★</span>
              <span className="sr-only">Rated {s.rating.value} out of 5 stars</span>
            </p>
            <div className="mt-3 flex justify-center gap-1 text-amber-500" aria-hidden="true">
              {Array.from({ length: 5 }, (_, i) => (
                <Star key={i} size={24} fill="currentColor" strokeWidth={0} />
              ))}
            </div>
          </div>
          <h3 className="display-3 mt-5">{s.rating.title}</h3>
          <Paragraphs items={s.rating.paragraphs} className="mt-4" />
          <div className="mt-6 flex flex-wrap gap-3">
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
      <ul aria-hidden="true" className="mx-auto mt-6 grid max-w-5xl gap-4 sm:grid-cols-3">
        {s.pilgrims.remembered.map((r) => (
          <li key={r.who} className="reveal rounded-2xl border border-orange-100 bg-white p-5 shadow-soft">
            <Quote size={22} className="text-orange-500" />
            <p className={`${letterFont.className} mt-3 text-xl text-[#8b2510]`}>{r.who}</p>
            <p className="mt-1 text-[0.95rem] leading-6 text-gray-700">{r.moment}</p>
          </li>
        ))}
      </ul>

      {shownTestimonials.length > 0 && (
        <ul className="mx-auto mt-10 grid max-w-5xl gap-4 md:grid-cols-3" aria-label="What our guests say">
          {shownTestimonials.map((t) => (
            <li key={t.name + t.quote.slice(0, 20)} className="surface p-5 sm:p-6">
              <figure>
                <blockquote className="leading-relaxed text-ink-soft">{t.quote}</blockquote>
                <figcaption className="mt-4 text-sm">
                  <span className="font-semibold text-ink">{t.name}</span>
                  {t.place && <span className="text-stone">, {t.place}</span>}
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      )}
    </LetterSection>
  );
}

/* 6. Team -------------------------------------------------------------------- */
export function AboutTeam() {
  const img = aboutImages.team;
  const s = aboutTeam;
  return (
    <LetterSection id={s.id}>
      <div className="mx-auto max-w-3xl">
        <LetterHeading id={s.id} eyebrow={s.eyebrow} title={s.title} />
      </div>
      <div className="mx-auto mt-10 max-w-5xl">
        <Image src={img.src} alt={img.alt} width={img.width} height={img.height} sizes="(min-width: 1024px) 64rem, 100vw" className="aspect-video h-auto w-full rounded-2xl bg-sand object-cover shadow-soft" />
      </div>
      <div className="mx-auto mt-10 max-w-3xl">
        <Paragraphs items={[s.intro, s.knowledgeIntro]} />
        <ul className="mt-8 grid gap-4">
          {s.knowledge.map((k) => (
            <li key={k.lead} className="flex gap-4">
              <IconBadge name={k.icon} />
              <p className={letterText}>
                <strong className="font-semibold text-ink">{k.lead}</strong>
                {k.text.startsWith(",") ? "" : " "}
                {k.text}
              </p>
            </li>
          ))}
        </ul>
        <p className={`${letterText} mt-8`}>{s.drivers}</p>
        <div className="mt-10 flex gap-4 rounded-2xl border border-orange-100 border-l-4 border-l-orange-500 bg-saffron-wash p-6 sm:p-8">
          <House size={28} aria-hidden="true" className="mt-1 shrink-0 text-orange-600" />
          <p className={`${letterText} [&_strong]:text-[#8b2510] [&_strong:last-of-type]:text-xl`}>
            <Rich text={s.local} />
          </p>
        </div>

        {/*
          Team grid — add once real team members (with consent) and photos are available, e.g. in content/about.ts:
          <ul className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3">
            {team.map((m) => (
              <li key={m.name} className="surface overflow-hidden text-center">
                <Image src={m.photo} alt={`${m.name}, ${m.role} at Mathura Vrindavan Trips`} width={600} height={750} className="aspect-[4/5] h-auto w-full object-cover" />
                <p className="mt-3 font-semibold">{m.name}</p>
                <p className="mb-4 text-sm text-stone">{m.role}</p>
              </li>
            ))}
          </ul>
        */}
      </div>
    </LetterSection>
  );
}

/* 7. Contact / sign-off ------------------------------------------------------ */
export function AboutContact() {
  const img = aboutImages.contact;
  const s = aboutContact;
  const wa = whatsappLink(s.whatsappMessage);
  const mail = mailtoHref("Braj yatra enquiry");
  return (
    <LetterSection id={s.id} cream>
      <div className="mx-auto max-w-3xl">
        <LetterHeading id={s.id} eyebrow={s.eyebrow} title={s.title} />
      </div>

      <div className="surface mx-auto mt-10 grid max-w-5xl overflow-hidden lg:grid-cols-[0.85fr_1.15fr]">
        <div className="relative aspect-[4/3] bg-sand lg:aspect-auto">
          <Image src={img.src} alt={img.alt} fill sizes="(min-width: 1024px) 26rem, 100vw" className="object-cover" />
        </div>
        <div className="p-6 sm:p-9">
          <Paragraphs items={s.paragraphs} />
          <ul className="mt-7 space-y-2.5 text-base font-semibold text-ink">
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
              {s.lines.website.label} <span className="break-all font-normal text-gray-700">{s.lines.website.value}</span>
            </li>
          </ul>
          <div className="mt-7 flex flex-wrap gap-3">
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
        </div>
      </div>

      <div className="mx-auto mt-8 max-w-5xl text-center sm:text-left">
        <p className="text-sm font-semibold text-ink">{s.statsLabel}:</p>
        <ul className="mt-3 flex flex-wrap justify-center gap-2 sm:justify-start">
          {s.stats.map((t) => (
            <li key={t} className="chip border-orange-200">
              {t}
            </li>
          ))}
        </ul>
      </div>

      <div className="mx-auto mt-12 max-w-3xl">
        <Eyebrow>Send an enquiry</Eyebrow>
        <div className="mt-4">
          <EnquiryForm title="Tell Harsh about your yatra" />
        </div>
      </div>

      <div className="mx-auto mt-14 max-w-3xl">
        <p className={`${letterFont.className} text-2xl leading-snug text-[#8b2510] sm:text-3xl`}>{s.closing}</p>
        <p className={`${letterFont.className} mt-6 text-2xl text-ink`}>
          <Rich text={s.farewell} />
        </p>
        <p className={`${letterFont.className} mt-6 text-right text-xl italic text-ink-soft sm:text-2xl`}>{s.signature}</p>

        <nav aria-label="Keep exploring" className="mt-12 flex flex-wrap justify-center gap-3 sm:justify-start">
          <Link href={PACKAGES_PATH} className="btn btn-primary">
            Explore our tour packages <ArrowRight size={18} aria-hidden="true" className="btn-arrow" />
          </Link>
          <Link href="/" className="btn btn-outline">
            <House size={18} aria-hidden="true" /> Back to Home
          </Link>
        </nav>
      </div>
    </LetterSection>
  );
}
