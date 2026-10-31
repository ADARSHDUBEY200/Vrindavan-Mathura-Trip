import Image from "next/image";
import Link from "next/link";
import {
  Accessibility,
  ArrowRight,
  Baby,
  BedDouble,
  CalendarDays,
  Car,
  Check,
  Clock3,
  Footprints,
  IndianRupee,
  Landmark,
  MapPin,
  Mountain,
  PartyPopper,
  Plane,
  Plus,
  Route,
  ShieldCheck,
  Sparkles,
  Train,
  Users,
  UtensilsCrossed,
  Wallet,
  type LucideIcon,
} from "lucide-react";
import { Bullets, GuideTip, Note, Paras, Ticks } from "@/components/home/pdf/kit";
import { Rich } from "@/components/home/landing/Rich";
import { WhatsappIcon } from "@/components/svg/TravelIcons";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { TIMINGS_VERIFIED_ON } from "@/config/site";
import type { TourPackagesPage } from "@/content/tour-packages";
import type { GuideBlock } from "@/content/types";
import type { CatalogPackage } from "@/lib/cms/packages";
import type { Crumb } from "@/lib/schema";
import { whatsappLink } from "@/lib/whatsapp";
import { PackageFilterGrid, type FilterItem } from "./PackageFilterGrid";
import { TourCard } from "./TourCard";
import { FramedImage, Heading, Rule, SectionLabel } from "./ui";

type C = TourPackagesPage;

const FACT_ICONS: Record<string, LucideIcon> = {
  price: IndianRupee,
  duration: Clock3,
  temples: Landmark,
  route: Route,
  airport: Plane,
  pickup: MapPin,
  included: Car,
  suits: Users,
  best: CalendarDays,
};

const ADDON_ICONS: Record<string, LucideIcon> = { braj: Mountain, parikrama: Footprints, festival: PartyPopper, seniors: Accessibility, family: Baby };
const REACH_ICONS: Record<string, LucideIcon> = { train: Train, road: Route, plane: Plane, pickup: Car };

const btn = "inline-flex min-h-12 items-center justify-center gap-2 rounded-xl px-6 text-sm font-semibold transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-2";

/* ------------------------------------------------------------------ */
/* Hero, quick facts                                                   */
/* ------------------------------------------------------------------ */

export function ArchiveHero({ c, crumbs }: { c: C; crumbs: Crumb[] }) {
  const h = c.hero;
  const wa = whatsappLink(h.whatsappMessage);
  return (
    <section aria-labelledby="page-title" className="relative overflow-hidden bg-linear-to-br from-[#9a3412] via-[#c2410c] to-[#f97316] pb-14 pt-28 text-white sm:pt-32 lg:pb-16">
      <div className="container-x grid items-center gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-14">
        <div>
          <Breadcrumbs items={crumbs} light />
          <p className="mt-5 inline-flex rounded-full bg-orange-50 px-3 py-1 text-[0.8125rem] font-semibold text-orange-700">{h.priceBadge}</p>
          <h1 id="page-title" className="mt-4 text-[clamp(1.75rem,1.3rem+2vw,2.75rem)] font-extrabold leading-[1.14] tracking-[-0.02em] text-white">
            {h.title}
          </h1>

          <div className="mt-6 rounded-2xl border-l-4 border-amber-300 bg-white/12 p-5 text-[0.95rem] leading-relaxed">
            <p className="font-bold">{h.greeting}</p>
            <p className="mt-1.5 [&_strong]:font-bold [&_strong]:text-white">
              <Rich text={h.intro} />
            </p>
          </div>
          <p className="mt-5 text-[0.95rem] leading-relaxed text-white/95">{h.leadOut}</p>

          <div className="mt-6 flex flex-wrap gap-3">
            {wa && (
              <a href={wa} target="_blank" rel="noopener noreferrer" className={`${btn} bg-green-600 text-white hover:bg-green-700 focus-visible:outline-white`}>
                <WhatsappIcon size={18} />
                {h.contactTitle}
                <span className="sr-only"> (opens WhatsApp)</span>
              </a>
            )}
            <Link href="/contact" className={`${btn} bg-white text-orange-700 hover:bg-orange-50 focus-visible:outline-white`}>
              Get an exact quote
            </Link>
          </div>
          <ul className="mt-4 space-y-1 text-sm text-white/95 [&_a]:text-white [&_a]:decoration-white/50">
            <li>
              {h.contactLabels.email} <Rich text={h.email} />
            </li>
            <li>
              {h.contactLabels.website} <Rich text={h.website} />
            </li>
          </ul>
        </div>

        <FramedImage src={c.images.hero.src} alt={c.images.hero.alt} preload sizes="(min-width: 1024px) 38rem, 92vw" className="aspect-4/3 rounded-3xl shadow-lift" />
      </div>
    </section>
  );
}

export function QuickFacts({ c }: { c: C }) {
  const f = c.quickFacts;
  return (
    <section aria-labelledby="quick-facts-title" className="bg-white pb-4 pt-12 sm:pt-14">
      <div className="container-x">
        <div className="rounded-3xl border border-gray-100 bg-[#fffdf9] p-5 shadow-soft sm:p-7">
          <Heading id="quick-facts-title">{f.title}</Heading>
          <dl className="mt-6 grid gap-3.5 sm:grid-cols-2 lg:grid-cols-3">
            {f.items.map((item) => {
              const Icon = FACT_ICONS[item.icon] ?? Sparkles;
              return (
                <div key={item.label} className="flex gap-3 rounded-2xl border border-gray-100 bg-white p-4 shadow-soft">
                  <Icon size={20} aria-hidden="true" className="mt-0.5 shrink-0 text-orange-600" />
                  <div>
                    <dt className="text-xs font-bold uppercase tracking-wider text-orange-700">{item.label}</dt>
                    <dd className="mt-1 text-sm leading-relaxed text-gray-700">{item.value}</dd>
                  </div>
                </div>
              );
            })}
          </dl>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Personal connection                                                 */
/* ------------------------------------------------------------------ */

export function Connection({ c }: { c: C }) {
  const s = c.connection;
  return (
    <section id="personal-connection" aria-labelledby="personal-connection-title" className="scroll-mt-24 bg-white py-12 sm:py-14">
      <div className="container-x">
        <Heading id="personal-connection-title">{s.title}</Heading>
        <Paras items={s.story} className="mt-5 max-w-none" />
        <blockquote className="my-6 border-l-4 border-orange-500 pl-5 text-xl font-bold leading-snug text-gray-900">{s.pullQuote}</blockquote>
        <Paras items={[s.smallThings, s.closing]} className="max-w-none" />
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Package listing                                                     */
/* ------------------------------------------------------------------ */

/** One trip of each length in turn, so "All" shows the range. The "from <city>" copies of a trip come last within each length. */
function shuffleByLength(list: CatalogPackage[]): CatalogPackage[] {
  const lengths = [...new Set(list.map((p) => p.days))];
  const queues = lengths.map((d) => {
    const same = list.filter((p) => p.days === d);
    return [...same.filter((p) => !/\bfrom\b/i.test(p.title)), ...same.filter((p) => /\bfrom\b/i.test(p.title))];
  });
  const out: CatalogPackage[] = [];
  while (queues.some((q) => q.length)) for (const q of queues) if (q.length) out.push(q.shift()!);
  return out;
}

export function PackageListing({ c, catalog }: { c: C; catalog: CatalogPackage[] }) {
  const s = c.packagesSection;
  const items: FilterItem[] = shuffleByLength(catalog).map((p) => ({ key: p.slug, days: p.days, card: <TourCard pkg={p} perks={s.perks} idealFor={s.idealFor} /> }));
  return (
    <section id="tour-packages" aria-labelledby="tour-packages-title" className="scroll-mt-24 bg-white px-3 py-6 sm:px-6">
      <div className="mx-auto max-w-[87rem] rounded-3xl bg-saffron-wash py-10 sm:py-12">
        <div className="container-x">
          <Heading id="tour-packages-title">{s.catalogTitle}</Heading>
          <p className="mt-4 max-w-2xl text-[0.95rem] leading-relaxed text-gray-700">{s.catalogIntro}</p>
          <PackageFilterGrid items={items} />
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Packages by duration                                                */
/* ------------------------------------------------------------------ */

function DurationCard({ pkg, href }: { pkg: C["packages"][number]; href?: string }) {
  return (
    <article id={pkg.id} aria-labelledby={`${pkg.id}-title`} className={`flex scroll-mt-24 flex-col rounded-2xl border p-5 shadow-soft sm:p-6 ${pkg.ribbon ? "border-orange-300 bg-orange-50/60" : "border-gray-100 bg-white"}`}>
      {pkg.ribbon && <p className="mb-2.5 w-fit rounded-full bg-orange-600 px-2.5 py-0.5 text-xs font-bold text-white">{pkg.ribbon}</p>}
      <h3 id={`${pkg.id}-title`} className="text-lg font-bold leading-snug text-gray-900">
        {pkg.heading}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-gray-600">
        <Rich text={pkg.intro} />
      </p>

      {pkg.timeline && (
        <ul className="mt-4 space-y-2.5 text-sm leading-relaxed text-gray-700">
          {pkg.timeline.map((t) => (
            <li key={t.time} className="flex gap-2.5">
              <span className="mt-2 size-1.5 shrink-0 rounded-full bg-orange-500" aria-hidden="true" />
              <span>
                <strong className="font-semibold text-gray-900">{t.time}</strong> {t.text}
              </span>
            </li>
          ))}
        </ul>
      )}
      {pkg.dayBlocks?.map((d) => (
        <div key={d.title} className="mt-4">
          <h4 className="text-sm font-bold text-gray-900">{d.title}</h4>
          <p className="mt-1 text-sm leading-relaxed text-gray-700">{d.text}</p>
        </div>
      ))}
      {pkg.rows && (
        <ul className="mt-4 space-y-2.5 text-sm leading-relaxed text-gray-700">
          {pkg.rows.map((r) => (
            <li key={r.label}>
              <strong className="font-semibold text-gray-900">{r.label}</strong> {r.text}
            </li>
          ))}
        </ul>
      )}
      {pkg.note && <p className="mt-4 text-sm leading-relaxed text-gray-600">{pkg.note}</p>}
      {href && (
        <Link href={href} className="mt-auto inline-flex items-center gap-1.5 pt-5 text-sm font-semibold text-orange-600 hover:text-orange-700">
          View this package
          <ArrowRight size={15} aria-hidden="true" />
        </Link>
      )}
    </article>
  );
}

export function ByDuration({ c, links }: { c: C; links: Partial<Record<string, string>> }) {
  const s = c.packagesSection;
  const main = c.packages.filter((p) => !p.addons);
  const addOns = c.packages.find((p) => p.addons);
  const tip = main.find((p) => p.tip)?.tip;
  const wa = whatsappLink(c.hero.whatsappMessage);
  return (
    <section aria-labelledby="by-duration-title" className="bg-white py-12 sm:py-14">
      <div className="container-x">
        <Heading id="by-duration-title">{s.title}</Heading>
        <Paras items={[s.intro]} className="mt-5 max-w-3xl" />
        <p className="mt-3 max-w-3xl text-[0.95rem] leading-relaxed text-gray-700">
          <strong className="font-bold text-gray-900">{s.priceLead}</strong> {s.priceText}
        </p>

        <div className="mt-8 grid items-stretch gap-5 lg:grid-cols-3">
          {main.map((p) => (
            <DurationCard key={p.id} pkg={p} href={links[p.id]} />
          ))}
        </div>

        {tip && (
          <div className="mt-6">
            <GuideTip label={tip.label} text={tip.text} />
          </div>
        )}

        <div className="mt-8 grid gap-5 lg:grid-cols-2">
          <div className="rounded-2xl border border-orange-200 bg-white p-5 sm:p-7">
            <h3 className="text-lg font-bold text-gray-900">{s.includesTitle}</h3>
            <Ticks items={s.includes} className="mt-4" />
          </div>
          {addOns && (
            <div id={addOns.id} className="scroll-mt-24 rounded-2xl border border-gray-100 bg-white p-5 shadow-soft sm:p-7">
              <h3 className="text-lg font-bold text-gray-900">{addOns.heading}</h3>
              <p className="mt-1 text-sm text-gray-600">{addOns.intro}</p>
              <ul className="mt-4 space-y-3">
                {addOns.addons?.map((a) => {
                  const Icon = ADDON_ICONS[a.icon] ?? Sparkles;
                  return (
                    <li key={a.text} className="flex gap-3 text-sm leading-relaxed text-gray-700">
                      <span className="icon-badge size-8 rounded-lg">
                        <Icon size={16} aria-hidden="true" />
                      </span>
                      <span>
                        <Rich text={a.text} />
                      </span>
                    </li>
                  );
                })}
              </ul>
              {addOns.closing && (
                <p className="mt-4 text-sm leading-relaxed text-gray-700">
                  <Rich text={addOns.closing} />
                </p>
              )}
            </div>
          )}
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3 rounded-2xl border border-gray-100 bg-gray-50 px-5 py-4">
          <p className="min-w-0 flex-1 text-sm leading-relaxed text-gray-700 sm:text-[0.95rem]">
            <strong className="font-bold text-gray-900">Next step:</strong> {s.nextStep}
          </p>
          {wa ? (
            <a href={wa} target="_blank" rel="noopener noreferrer" className={`${btn} min-h-11 bg-orange-500 text-white hover:bg-orange-600 focus-visible:outline-orange-500`}>
              {s.ctaLabel}
            </a>
          ) : (
            <Link href="/contact" className={`${btn} min-h-11 bg-orange-500 text-white hover:bg-orange-600 focus-visible:outline-orange-500`}>
              Get an exact quote
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Darshan guide                                                       */
/* ------------------------------------------------------------------ */

const LABEL = "text-xs font-bold uppercase tracking-[0.14em] text-orange-700";

function Block({ block }: { block: GuideBlock }) {
  switch (block.kind) {
    case "text":
      return (
        <div className={block.tone === "highlight" ? "rounded-2xl bg-orange-50 p-4 sm:p-5" : ""}>
          {block.label && <p className={LABEL}>{block.label}</p>}
          <p className={`${block.label ? "mt-1.5" : ""} text-[0.95rem] leading-[1.8] text-gray-700`}>
            <Rich text={block.text} />
          </p>
        </div>
      );
    case "tips":
      return (
        <div>
          <p className={LABEL}>{block.label}</p>
          <Bullets items={block.items} className="mt-2 text-[0.95rem]" />
        </div>
      );
    case "seasons":
      return (
        <div>
          <p className={LABEL}>{block.label}</p>
          <div className="mt-2 overflow-x-auto rounded-xl border border-gray-200">
            <table className="w-full min-w-[28rem] text-left text-sm">
              <thead className="bg-orange-50 text-gray-900">
                <tr>
                  {(block.columns ?? ["Season", "Morning", "Evening"]).map((col) => (
                    <th key={col} scope="col" className="px-4 py-2.5 font-semibold">
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 text-gray-700">
                {block.rows.map((r) => (
                  <tr key={r.season}>
                    <th scope="row" className="px-4 py-2.5 font-normal">
                      <Rich text={r.season} />
                    </th>
                    <td className="px-4 py-2.5">{r.morning}</td>
                    <td className="px-4 py-2.5">{r.evening}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      );
    case "timing":
      return (
        <p className="flex gap-2.5 rounded-xl bg-gray-50 p-3.5 text-sm leading-relaxed text-gray-700">
          <Clock3 size={17} aria-hidden="true" className="mt-0.5 shrink-0 text-orange-600" />
          <span>
            <strong className="font-semibold text-gray-900">{block.label}</strong> {block.text}
          </span>
        </p>
      );
    case "note":
      return <Note label={block.label} text={block.text} />;
    case "places":
      return null;
    case "panel":
      return (
        <div className="space-y-5 rounded-2xl bg-orange-50/70 p-4 sm:p-6">
          {block.blocks.map((b, i) => (
            <Block key={i} block={b} />
          ))}
        </div>
      );
  }
}

export function DarshanGuide({ c }: { c: C }) {
  const g = c.darshanGuide;
  return (
    <section id="darshan-guide" aria-labelledby="darshan-guide-title" className="scroll-mt-24 bg-saffron-wash/50 py-12 sm:py-14">
      <div className="container-x">
        <SectionLabel icon={Landmark}>{g.eyebrow}</SectionLabel>
        <Heading id="darshan-guide-title" className="mt-3">
          {g.title}
        </Heading>
        <p className="mt-4 max-w-3xl text-[0.95rem] leading-relaxed text-gray-700">{g.intro}</p>
        <div className="mt-5">
          <Note label={g.note.label} text={g.note.text} />
        </div>
        {TIMINGS_VERIFIED_ON && <p className="mt-2 text-xs text-gray-500">Timings verified on {TIMINGS_VERIFIED_ON}.</p>}

        {/* Native <details>: all of the guide stays in the HTML. */}
        <div className="mt-8 divide-y divide-gray-100 overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-soft">
          {c.templeEntries.map((t) => (
            <details key={t.id} id={t.id} open={t.n === 1} className="faq-item group scroll-mt-24">
              <summary className="flex min-h-11 items-center gap-4 px-4 py-4 text-left transition-colors hover:bg-orange-50/60 sm:px-6">
                <span className="grid size-9 shrink-0 place-items-center rounded-full bg-orange-50 text-sm font-bold text-orange-700 ring-1 ring-orange-200" aria-hidden="true">
                  {String(t.n).padStart(2, "0")}
                </span>
                <h3 className="flex-1 text-[0.95rem] font-bold text-gray-900 sm:text-base">{t.title}</h3>
                <span className="faq-icon icon-badge size-6 rounded-full">
                  <Plus size={14} aria-hidden="true" />
                </span>
              </summary>
              <div className="space-y-5 px-4 pb-6 sm:px-6 sm:pl-[4.75rem]">
                {t.image && <FramedImage src={t.image.src} alt={t.image.alt} sizes="(min-width: 1024px) 40rem, 90vw" className="aspect-16/9 max-w-2xl" />}
                {t.blocks.map((b, i) => (
                  <Block key={i} block={b} />
                ))}
                {t.templeSlug && (
                  <Link href={`/temples/${t.templeSlug}`} className="inline-flex items-center gap-1.5 text-sm font-semibold text-orange-600 hover:text-orange-700">
                    {t.templeLinkLabel}
                    <ArrowRight size={15} aria-hidden="true" />
                  </Link>
                )}
              </div>
            </details>
          ))}
        </div>

        <h3 className="mt-10 text-xl font-bold text-gray-900">{g.otherTitle}</h3>
        <ul className="mt-4 grid gap-3.5 sm:grid-cols-2 lg:grid-cols-3">
          {c.otherTemples.map((t) => (
            <li key={t.id} id={t.id} className="scroll-mt-24 rounded-2xl border border-gray-100 bg-white p-4 shadow-soft">
              <p className="font-semibold text-gray-900">{t.templeSlug ? <Link href={`/temples/${t.templeSlug}`} className="hover:text-orange-600">{t.name}</Link> : t.name}</p>
              <p className="mt-1 text-sm leading-relaxed text-gray-600">
                <Rich text={t.text} />
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Parikrama, stays, food                                              */
/* ------------------------------------------------------------------ */

export function Parikrama({ c }: { c: C }) {
  const p = c.parikrama;
  return (
    <section id="parikrama" aria-labelledby="parikrama-title" className="scroll-mt-24 bg-white py-12 sm:py-14">
      <div className="container-x grid gap-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-12">
        <div>
          <SectionLabel icon={Footprints}>{p.eyebrow}</SectionLabel>
          <Heading id="parikrama-title" className="mt-3">
            {p.title}
          </Heading>
          <p className="mt-5 text-[0.95rem] leading-relaxed text-gray-700">
            {p.lead} <strong className="font-bold text-gray-900">{p.leadEmphasis}</strong>
          </p>
          <ul className="mt-4 flex flex-wrap gap-2">
            {p.stats.map((s) => (
              <li key={s} className="rounded-full bg-orange-50 px-3 py-1 text-xs font-semibold text-orange-700">
                {s}
              </li>
            ))}
          </ul>
          <div className="mt-5 space-y-4">
            {p.blocks.map((b) => (
              <Block key={b.label} block={{ kind: "text", label: b.label, text: b.text }} />
            ))}
          </div>
          <div className="mt-6">
            <GuideTip label={p.memory.label} text={p.memory.text} />
          </div>
        </div>
        <div>
          <FramedImage src={c.images.parikrama.src} alt={c.images.parikrama.alt} sizes="(min-width: 1024px) 30rem, 92vw" className="aspect-4/3" />
          <h3 className="mt-6 text-lg font-bold text-gray-900">{p.tipsLabel}</h3>
          <Bullets items={p.tips} className="mt-2 text-[0.95rem]" />
        </div>
      </div>
    </section>
  );
}

export function Stays({ c }: { c: C }) {
  const s = c.stays;
  const icons: Record<string, LucideIcon> = { proximity: MapPin, food: UtensilsCrossed, rest: BedDouble, safety: ShieldCheck, hassle: Sparkles };
  return (
    <section id="luxury-stays" aria-labelledby="luxury-stays-title" className="scroll-mt-24 bg-gray-50 py-12 sm:py-14">
      <div className="container-x grid gap-8 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-12">
        <FramedImage src={c.images.hotel.src} alt={c.images.hotel.alt} sizes="(min-width: 1024px) 30rem, 92vw" className="aspect-4/3 lg:sticky lg:top-28 lg:self-start" />
        <div>
          <SectionLabel icon={BedDouble}>{s.eyebrow}</SectionLabel>
          <Heading id="luxury-stays-title" className="mt-3">
            {s.title}
          </Heading>
          <Paras items={[s.intro, s.hotels]} className="mt-5 max-w-none" />
          <h3 className="mt-6 text-lg font-bold text-gray-900">{s.benefitsTitle}</h3>
          <ul className="mt-3 grid gap-3 sm:grid-cols-2">
            {s.benefits.map((b) => {
              const Icon = icons[b.icon] ?? Sparkles;
              return (
                <li key={b.text} className="flex gap-3 rounded-2xl border border-gray-100 bg-white p-4 text-sm leading-relaxed text-gray-700 shadow-soft">
                  <Icon size={18} aria-hidden="true" className="mt-0.5 shrink-0 text-orange-600" />
                  <span>
                    <Rich text={b.text} />
                  </span>
                </li>
              );
            })}
          </ul>
          <Paras items={[s.budget]} className="mt-5 max-w-none" />
        </div>
      </div>
    </section>
  );
}

export function Food({ c }: { c: C }) {
  const f = c.food;
  return (
    <section id="food" aria-labelledby="food-title" className="scroll-mt-24 bg-white py-12 sm:py-14">
      <div className="container-x">
        <SectionLabel icon={UtensilsCrossed}>{f.eyebrow}</SectionLabel>
        <Heading id="food-title" className="mt-3">
          {f.title}
        </Heading>
        <Paras items={[f.intro]} className="mt-5 max-w-3xl" />

        <div className="mt-7 grid gap-4 md:grid-cols-2">
          {f.items.map((item) => (
            <article key={item.title} className="rounded-2xl border border-gray-100 bg-white p-5 shadow-soft">
              <h3 className="flex items-center gap-2.5 text-base font-bold text-gray-900">
                <span aria-hidden="true">{item.emoji}</span>
                {item.title}
              </h3>
              {item.text && (
                <p className="mt-2 text-sm leading-relaxed text-gray-700">
                  <Rich text={item.text} />
                </p>
              )}
              {item.list && <Bullets items={item.list} className="mt-2 text-sm" />}
            </article>
          ))}
        </div>

        <div className="mt-7 grid gap-5 md:grid-cols-2">
          <div className="rounded-2xl bg-orange-50/70 p-5 sm:p-6">
            <h3 className="text-lg font-bold text-gray-900">{f.chooseTitle}</h3>
            <Bullets items={f.choose} className="mt-2 text-[0.95rem]" />
          </div>
          <div className="rounded-2xl bg-orange-50/70 p-5 sm:p-6">
            <h3 className="text-lg font-bold text-gray-900">{f.secretsTitle}</h3>
            <Bullets items={f.secrets} className="mt-2 text-[0.95rem]" />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Travel, FAQ, related links, booking                                 */
/* ------------------------------------------------------------------ */

export function Travel({ c }: { c: C }) {
  const t = c.travel;
  return (
    <section id="travel" aria-labelledby="travel-title" className="scroll-mt-24 bg-gray-50 py-12 sm:py-14">
      <div className="container-x">
        <SectionLabel icon={Route}>{t.eyebrow}</SectionLabel>
        <Heading id="travel-title" className="mt-3">
          {t.title}
        </Heading>

        <h3 className="mt-7 text-lg font-bold text-gray-900">{t.reachTitle}</h3>
        <ul className="mt-3 grid gap-3.5 md:grid-cols-2">
          {t.reach.map((r) => {
            const Icon = REACH_ICONS[r.icon] ?? MapPin;
            return (
              <li key={r.label} className="flex gap-3 rounded-2xl border border-gray-100 bg-white p-4 text-sm leading-relaxed text-gray-700 shadow-soft">
                <Icon size={19} aria-hidden="true" className="mt-0.5 shrink-0 text-orange-600" />
                <span>
                  <strong className="font-semibold text-gray-900">{r.label}</strong> <Rich text={r.text} />
                </span>
              </li>
            );
          })}
        </ul>

        <div className="mt-7 grid gap-5 lg:grid-cols-2">
          <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-soft sm:p-6">
            <h3 className="text-lg font-bold text-gray-900">{t.trafficTitle}</h3>
            <Bullets items={t.traffic} className="mt-2 text-[0.95rem]" />
          </div>
          <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-soft sm:p-6">
            <h3 className="text-lg font-bold text-gray-900">{t.localTitle}</h3>
            <p className="mt-1 text-sm text-gray-600">{t.localIntro}</p>
            <Bullets items={t.local.map((l) => l.text)} className="mt-2 text-[0.95rem]" />
          </div>
          <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-soft sm:p-6">
            <h3 className="text-lg font-bold text-gray-900">{t.bestTimeTitle}</h3>
            <Bullets items={t.seasons.map((s) => s.text)} className="mt-2 text-[0.95rem]" />
          </div>
          <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-soft sm:p-6">
            <h3 className="text-lg font-bold text-gray-900">{t.packingTitle}</h3>
            <Ticks items={t.packing} className="mt-3" />
          </div>
        </div>
      </div>
    </section>
  );
}

export function FaqAccordion({ items, title, eyebrow, id = "faq" }: { items: { q: string; a: string }[]; title: string; eyebrow?: string; id?: string }) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="scroll-mt-24 bg-saffron-wash/60 py-12 sm:py-14">
      <div className="container-x max-w-4xl">
        {eyebrow && <p className="w-fit rounded-full bg-orange-100 px-3 py-1 text-[0.8125rem] font-semibold text-orange-700">{eyebrow}</p>}
        <Heading id={`${id}-title`} className="mt-3">
          {title}
        </Heading>
        <div className="mt-6 divide-y divide-gray-100 overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-soft">
          {items.map((f, i) => (
            <details key={f.q} className="faq-item group">
              <summary className="flex items-start justify-between gap-4 px-4 py-4 text-left text-[0.95rem] font-semibold text-gray-900 transition-colors hover:bg-orange-50/60 sm:px-6">
                <span>
                  {i + 1}. <Rich text={f.q} />
                </span>
                <span className="faq-icon icon-badge mt-0.5 size-6 rounded-full">
                  <Plus size={14} aria-hidden="true" />
                </span>
              </summary>
              <p className="px-4 pb-5 text-sm leading-relaxed text-gray-700 sm:px-6 sm:text-[0.95rem]">
                <Rich text={f.a} />
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

export function RelatedLinks({ c }: { c: C }) {
  return (
    <nav aria-label="Related pages" className="bg-white pb-2 pt-10">
      <ul className="container-x flex flex-wrap gap-2.5">
        {c.relatedLinks.map((l) => (
          <li key={l.href}>
            <Link href={l.href} className="inline-flex h-10 items-center gap-1.5 rounded-full border border-gray-200 bg-white px-4 text-sm font-medium text-gray-700 transition-colors hover:border-orange-300 hover:text-orange-700">
              {l.label}
              <ArrowRight size={14} aria-hidden="true" className="text-orange-500" />
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export function BookSection({ c, updatedOn }: { c: C; updatedOn: string }) {
  const b = c.book;
  const wa = whatsappLink(b.whatsappMessage);
  return (
    <section id="book" aria-labelledby="book-title" className="scroll-mt-24 bg-white py-12 sm:py-14">
      <div className="container-x">
        <div className="grid overflow-hidden rounded-3xl bg-linear-to-br from-[#7c2d12] to-[#9a3412] text-white shadow-lift lg:grid-cols-[minmax(0,1.3fr)_minmax(0,0.7fr)]">
          <div className="p-6 sm:p-10">
            <h2 id="book-title" className="text-[clamp(1.5rem,1.2rem+1.1vw,2.125rem)] font-extrabold leading-tight tracking-[-0.02em] text-white">
              {b.title}
            </h2>
            <Rule />
            <div className="mt-5 space-y-3 text-[0.95rem] leading-relaxed text-white/90 [&_a]:text-white [&_strong]:text-white">
              {b.paragraphs.map((p) => (
                <p key={p.slice(0, 40)}>
                  <Rich text={p} />
                </p>
              ))}
            </div>
            <ul className="mt-5 space-y-1.5 text-[0.95rem] text-white/90 [&_a]:text-white [&_strong]:text-white">
              {b.contact.map((line) => (
                <li key={line}>
                  <Rich text={line} />
                </li>
              ))}
            </ul>
            <p className="mt-5 text-sm text-amber-200 [&_strong]:text-amber-100">
              {b.stats.map((s, i) => (
                <span key={s}>
                  {i > 0 && " · "}
                  <Rich text={s} />
                </span>
              ))}
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              {wa && (
                <a href={wa} target="_blank" rel="noopener noreferrer" className={`${btn} bg-green-600 text-white hover:bg-green-700 focus-visible:outline-white`}>
                  <WhatsappIcon size={18} />
                  Book on WhatsApp
                  <span className="sr-only"> (opens WhatsApp)</span>
                </a>
              )}
              <Link href="/contact" className={`${btn} bg-white text-orange-700 hover:bg-orange-50 focus-visible:outline-white`}>
                Get an exact quote
              </Link>
            </div>
            <p className="mt-6 italic text-white/90">{b.closing}</p>
            <p className="mt-1 font-bold">{b.blessing} 🙏</p>
            <p className="mt-1 text-sm italic text-white/80">{b.signature}</p>
          </div>
          <div className="relative min-h-56 lg:min-h-full">
            <Image src={c.images.book.src} alt={c.images.book.alt} fill sizes="(min-width: 1024px) 26rem, 92vw" className="object-cover" />
          </div>
        </div>
        <p className="mt-4 flex items-center gap-1.5 text-xs text-gray-500">
          <Wallet size={13} aria-hidden="true" />
          Page last updated on {new Date(updatedOn).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}.
          <Check size={13} aria-hidden="true" className="text-emerald-600" />
          Prices are confirmed in your written quote.
        </p>
      </div>
    </section>
  );
}
