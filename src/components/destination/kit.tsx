import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRight, ArrowUpRight, CloudRain, Lightbulb, MessageCircle, Snowflake, Sun, type LucideIcon } from "lucide-react";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { EnquiryButtons } from "@/components/ui/EnquiryButtons";
import { FaqList } from "@/components/ui/FaqList";
import type { Faq } from "@/content/types";
import type { Crumb } from "@/lib/schema";

/* Shared building blocks for the destination guides. Styles live in ./guide.css (`.dg-*`). */

export const pad2 = (n: number) => String(n).padStart(2, "0");

type HeroProps = {
  crumbs: Crumb[];
  photo: { src: StaticImageData | string; alt: string };
  objectPosition?: string;
  badge: ReactNode;
  /** H1, in three parts: the place in the brand gradient, the lead, and the subtitle on its own line. */
  place: string;
  lead: string;
  sub: string;
  lede: ReactNode;
  actions: ReactNode;
  stats: readonly { value: string; label: string }[];
};

/** Inset photo hero with the title over its dark foot and a stats card overlapping the bottom edge. */
export function DestinationHero({ crumbs, photo, objectPosition = "50% 50%", badge, place, lead, sub, lede, actions, stats }: HeroProps) {
  const blur = typeof photo.src !== "string";
  return (
    <section aria-labelledby="page-title" className="pt-[5.75rem] sm:pt-[6.5rem]">
      <div className="container-x">
        <div className="hero-in">
          <Breadcrumbs items={crumbs} />
        </div>
        <div className="dg-hero-frame mt-4 flex min-h-[32rem] flex-col justify-end sm:min-h-[34rem] lg:h-[min(40rem,calc(100svh-11rem))] lg:min-h-[33rem]">
          <Image src={photo.src} alt={photo.alt} fill preload sizes="(min-width: 1280px) 1216px, 100vw" placeholder={blur ? "blur" : "empty"} className="dg-hero-photo -z-20 object-cover" style={{ objectPosition }} />
          <div className="dg-hero-scrim absolute inset-0 -z-10" aria-hidden="true" />
          <div className="dg-head grid items-end gap-6 p-5 pb-16 sm:p-9 sm:pb-20 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] lg:gap-10 lg:p-11 lg:pb-20">
            <div>
              <p className="hero-in hero-in-1 dg-badge">{badge}</p>
              <h1 id="page-title" className="dg-h1 hero-in hero-in-2 mt-4 text-white">
                <span className="dg-brand dg-brand-light">{place}</span> {lead}:<span className="dg-h1-sub text-white/90">{sub}</span>
              </h1>
            </div>
            <div className="hero-in hero-in-3">
              <p className="max-w-md text-[0.95rem] leading-relaxed text-white/85 max-md:mx-auto [&_strong]:text-white">{lede}</p>
              <div className="mt-5 flex flex-wrap gap-2.5 max-md:justify-center [&>div]:max-md:justify-center">{actions}</div>
            </div>
          </div>
        </div>
        <dl className="dg-stats hero-in hero-in-4 relative z-10 mx-3 -mt-11 sm:mx-8 lg:mx-auto lg:max-w-4xl">
          {stats.map((s) => (
            <div key={s.label} className="flex flex-col-reverse justify-end">
              <dt className="mt-0.5 text-xs text-stone">{s.label}</dt>
              <dd className="dg-brand text-xl font-bold tracking-tight sm:text-2xl">{s.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

type HeadProps = {
  id: string;
  eyebrow?: string;
  title: ReactNode;
  lede?: ReactNode;
  /** Sits at the right of the heading on wide screens (a link, a button). */
  aside?: ReactNode;
  as?: "h2" | "h3";
  className?: string;
};

/** Eyebrow, heading and lede. The `id` is what the section's `aria-labelledby` points at. */
export function SectionHead({ id, eyebrow, title, lede, aside, as: H = "h2", className = "" }: HeadProps) {
  const text = (
    <div className="max-w-3xl">
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <H id={id} className={`${H === "h2" ? "dg-h2" : "dg-h3"} ${eyebrow ? "mt-3" : ""}`}>
        {title}
      </H>
      {lede && <p className="dg-lede mt-3 max-w-2xl">{lede}</p>}
    </div>
  );
  if (!aside) return <header className={`dg-head ${className}`}>{text}</header>;
  return (
    <header className={`dg-head flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between ${className}`}>
      {text}
      <div className="shrink-0">{aside}</div>
    </header>
  );
}

/** The guide's voice: a local tip, as one paragraph or a list. */
export function Tip({ label, children, className = "" }: { label: string; children: ReactNode; className?: string }) {
  return (
    <aside aria-label={label.replace(/:$/, "")} className={`dg-tip ${className}`}>
      <p className="dg-tip-label">
        <Lightbulb size={16} aria-hidden="true" />
        {label.replace(/:$/, "")}
      </p>
      <div className="mt-2 text-[0.9rem] leading-relaxed text-ink-soft">{children}</div>
    </aside>
  );
}

/** A labelled fact with an icon: timings, entry, what to expect. */
export function Fact({ icon: Icon, label, children }: { icon: LucideIcon; label: string; children: ReactNode }) {
  return (
    <div className="dg-fact">
      <Icon size={17} aria-hidden="true" />
      <div>
        <p className="dg-label">{label.replace(/:$/, "")}</p>
        <div className="dg-small mt-1 text-ink-soft">{children}</div>
      </div>
    </div>
  );
}

/** Stop number and place title, linked to the place's own page when it has one. */
export function PlaceTitle({ n, id, name, href, className = "" }: { n: number; id: string; name: string; href?: string; className?: string }) {
  return (
    <header className={`dg-head ${className}`}>
      <span className="dg-num" aria-hidden="true">
        {pad2(n)}
      </span>
      <h3 id={id} className="dg-h3 mt-3">
        {href ? (
          <Link href={href} className="group/t inline decoration-[color:var(--dg-o300)] decoration-2 underline-offset-[0.2em] hover:underline">
            {name}
            <ArrowUpRight aria-hidden="true" className="ml-1 inline size-[0.8em] align-baseline text-ember-deep transition-transform duration-300 group-hover/t:-translate-y-0.5 group-hover/t:translate-x-0.5" />
          </Link>
        ) : (
          name
        )}
      </h3>
    </header>
  );
}

/** The places as a rail of photo cards, each jumping to its entry below. */
export function PlaceIndex({ items }: { items: { id: string; name: string; image: ReactNode }[] }) {
  return (
    <ol className="dg-index reveal-stagger" data-few={items.length <= 5 ? "" : undefined} style={{ "--dg-index-cols": items.length } as React.CSSProperties}>
      {items.map((p, i) => (
        <li key={p.id}>
          <a href={`#${p.id}`} className="dg-index-link group">
            <div className="dg-photo aspect-[4/5]">{p.image}</div>
            <span className="mt-2.5 flex items-start gap-2 px-1.5">
              <span className="pt-px text-xs font-semibold tabular-nums text-ember-deep">{pad2(i + 1)}</span>
              <span className="text-[0.8125rem] font-medium leading-snug text-ink">{p.name}</span>
            </span>
          </a>
        </li>
      ))}
    </ol>
  );
}

const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
type Season = "winter" | "summer" | "monsoon";
type Month = { season: Season; best?: "peak" | "good"; festival?: string };

/** The year as one bar: colour (and lightness) names the season, a rule beneath marks the best months, every month is labelled. */
export function YearBar({ months, showBest = false }: { months: readonly Month[]; showBest?: boolean }) {
  return (
    <div>
      <ol className="dg-year">
        {months.map((m, i) => (
          <li key={MONTHS[i]} data-season={m.season} data-best={showBest ? m.best : undefined}>
            <span aria-hidden="true">{MONTHS[i].slice(0, 3)}</span>
            <span className="sr-only">
              {MONTHS[i]}: {m.season}
              {m.best === "peak" ? ", very best weather" : m.best === "good" ? ", within the best time to visit" : ""}
              {m.festival ? `, ${m.festival}` : ""}
            </span>
            {m.festival && <i aria-hidden="true" title={m.festival} />}
          </li>
        ))}
      </ol>
      <ul className={`flex flex-wrap gap-x-5 gap-y-1.5 text-xs text-stone ${showBest ? "mt-5" : "mt-3"}`} aria-hidden="true">
        <li className="dg-key dg-key-winter">Winter</li>
        <li className="dg-key dg-key-summer">Summer</li>
        <li className="dg-key dg-key-monsoon">Monsoon</li>
        {showBest && (
          <>
            <li className="dg-key dg-key-best">Best weather</li>
            <li className="dg-key dg-key-good">Best time to visit</li>
          </>
        )}
        {months.some((m) => m.festival) && <li className="dg-key dg-key-fest">Festive peak</li>}
      </ul>
    </div>
  );
}

const SEASON_ICON: Record<Season, LucideIcon> = { winter: Snowflake, summer: Sun, monsoon: CloudRain };

export function SeasonCards({ seasons }: { seasons: readonly { key: string; name: string; tag?: string; months: string; note: string }[] }) {
  return (
    <ul className="reveal-stagger grid gap-3 md:grid-cols-3">
      {seasons.map((s) => {
        const Icon = SEASON_ICON[s.key as Season];
        return (
          <li key={s.key} className="dg-card p-5">
            <div className="flex items-center gap-3">
              <span className="dg-icon">
                <Icon size={18} aria-hidden="true" />
              </span>
              <div>
                <h3 className="dg-h4">
                  {s.name}
                  {s.tag && <span className="ml-1.5 rounded-full bg-[var(--dg-o50)] px-2 py-0.5 text-[0.7rem] font-semibold text-ember-deep">{s.tag}</span>}
                </h3>
                <p className="text-sm font-medium text-ember-deep">{s.months}</p>
              </div>
            </div>
            <p className="dg-small mt-3">{s.note}</p>
          </li>
        );
      })}
    </ul>
  );
}

/** FAQ: sticky heading with a contact card beside the site's standard accordion. */
export function FaqBlock({ title, items, whatsappMessage, className = "" }: { title: string; items: Faq[]; whatsappMessage: string; className?: string }) {
  return (
    <section id="faq" aria-labelledby="faq-title" className={`dg-section ${className}`}>
      <div className="container-x grid gap-8 lg:grid-cols-[minmax(0,0.75fr)_minmax(0,1.25fr)] lg:gap-14">
        <div className="dg-head lg:sticky lg:top-40 lg:self-start">
          <p className="eyebrow">Before you ask</p>
          <h2 id="faq-title" className="dg-h2 mt-3">
            {title}
          </h2>
          <div className="dg-card mt-6 hidden p-5 lg:block">
            <p className="flex items-center gap-2.5 font-semibold text-ink">
              <span className="dg-icon size-9">
                <MessageCircle size={17} aria-hidden="true" />
              </span>
              Still have a question?
            </p>
            <p className="dg-small mt-2">Send it on WhatsApp for a personal answer from our team.</p>
            <EnquiryButtons message={whatsappMessage} showPhone={false} size="sm" className="mt-4" />
          </div>
        </div>
        <FaqList items={items} />
      </div>
    </section>
  );
}

/** "Keep planning": internal links as compact cards. */
export function LinkCards({ id, title, items, className = "", children }: { id: string; title: string; items: readonly { label: string; text: string; href: string }[]; className?: string; children?: ReactNode }) {
  return (
    <nav aria-labelledby={id} className={`dg-section ${className}`}>
      <div className="container-x">
        <SectionHead id={id} eyebrow="Keep planning" title={title} />
        <ul className={`reveal-stagger mt-7 grid gap-3 sm:grid-cols-2 ${items.length % 4 !== 0 && items.length % 3 === 0 ? "lg:grid-cols-3" : "lg:grid-cols-4"}`}>
          {items.map((l) => (
            <li key={l.href}>
              <Link href={l.href} className="dg-card dg-lift group flex h-full items-start gap-3 p-4">
                <span className="min-w-0 flex-1">
                  <span className="block text-[0.9rem] font-semibold text-ink">{l.label}</span>
                  <span className="mt-1 block text-[0.8125rem] leading-snug text-stone">{l.text}</span>
                </span>
                <ArrowRight size={16} aria-hidden="true" className="btn-arrow mt-0.5 shrink-0 text-ember-deep" />
              </Link>
            </li>
          ))}
        </ul>
        {children}
      </div>
    </nav>
  );
}
