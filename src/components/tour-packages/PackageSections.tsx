import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  Bed,
  Bus,
  CalendarDays,
  ChevronDown,
  ChevronRight,
  Clock3,
  Coffee,
  FileText,
  Flag,
  HandHeart,
  IndianRupee,
  Info,
  Landmark,
  ListChecks,
  MapPin,
  Minus,
  Check,
  Play,
  Route,
  ShieldCheck,
  Sparkles,
  Star,
  Users,
  Video,
  Zap,
} from "lucide-react";
import { Stars } from "./PackageHero";
import { TourCard } from "./TourCard";
import { DataTable, Heading, RichHtml, SectionLabel } from "./ui";
import { WhatsappIcon } from "@/components/svg/TravelIcons";
import { FOUNDED, FOUNDER, PILGRIMS, RATING, formatInr } from "@/config/site";
import { formatTime, timingRows, type Hours } from "@/content/temple-timings";
import type { TourPackagesPage } from "@/content/tour-packages";
import type { CatalogPackage } from "@/lib/cms/packages";
import type { PackageDetail, PackageTiming } from "@/lib/cms/package-detail";
import { packageWhatsappMessage, whatsappLink } from "@/lib/whatsapp";

type Defaults = TourPackagesPage["packageDefaults"];

/** Anchors for Quick Navigation. Only sections that render are listed. */
export function packageNav(p: PackageDetail) {
  return [
    { id: "quick-answer", label: "Quick Answer", on: true },
    { id: "overview", label: "Overview", on: Boolean(p.overview) },
    { id: "highlights", label: "Highlights", on: p.highlights.length > 0 },
    { id: "itinerary", label: "Itinerary", on: p.itinerary.length > 0 },
    { id: "inclusions", label: "Inclusions", on: p.inclusions.length + p.exclusions.length > 0 },
    { id: "faq", label: "FAQ", on: p.faqs.length > 0 },
  ].filter((n) => n.on);
}

export function QuickNavigation({ p }: { p: PackageDetail }) {
  return (
    <nav aria-labelledby="quick-nav-title" className="rounded-2xl border border-orange-100 bg-white p-4 shadow-soft sm:p-5">
      <p id="quick-nav-title" className="flex items-center gap-2 text-sm font-bold text-gray-900">
        <span className="grid size-6 place-items-center rounded-full bg-orange-500 text-white">
          <ListChecks size={13} aria-hidden="true" />
        </span>
        Quick Navigation
      </p>
      <ol className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
        {packageNav(p).map((n, i) => (
          <li key={n.id}>
            <a href={`#${n.id}`} className="flex items-center gap-2.5 rounded-xl border border-gray-100 px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-orange-200 hover:bg-orange-50/60">
              <span className="grid size-6 shrink-0 place-items-center rounded-full bg-orange-500 text-xs font-bold text-white" aria-hidden="true">
                {i + 1}
              </span>
              {n.label}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}

export function QuickAnswer({ p }: { p: PackageDetail }) {
  return (
    <section id="quick-answer" aria-labelledby="quick-answer-title" className="scroll-mt-24 rounded-3xl bg-linear-to-br from-[#7c1d06] to-[#8c2a0a] p-5 text-white shadow-lift sm:p-7">
      <p id="quick-answer-title" className="inline-flex items-center gap-1.5 rounded-full bg-rose-600 px-3 py-1 text-xs font-bold uppercase tracking-wider">
        <Zap size={13} aria-hidden="true" /> Quick Answer
      </p>
      {p.quickAnswer ? (
        <RichHtml html={p.quickAnswer} className="mt-3.5 text-[0.95rem] leading-relaxed text-white/95 [&_a]:text-white [&_strong]:text-white" />
      ) : (
        <p className="mt-3.5 text-[0.95rem] leading-relaxed text-white/95">{p.metaDescription}</p>
      )}
    </section>
  );
}

export function FactTiles({ p }: { p: PackageDetail }) {
  const tiles = [
    p.durationLabel && { icon: CalendarDays, label: "Duration", value: p.days && p.nights !== null ? `${p.days}D / ${Math.max(p.nights, 0)}N` : p.durationLabel, sub: p.durationLabel },
    p.price && { icon: IndianRupee, label: "Starting from", value: formatInr(p.price), sub: "per person" },
    p.rating && { icon: Star, label: "Rating", value: `${p.rating.toFixed(1)}★`, sub: p.reviews ? `${p.reviews.toLocaleString("en-IN")} reviews` : "guest rating" },
    { icon: Route, label: "Trip type", value: "Private", sub: "your own car and driver" },
  ].filter((t): t is { icon: typeof Star; label: string; value: string; sub: string } => Boolean(t));
  return (
    <ul className="grid grid-cols-2 gap-3.5 lg:grid-cols-4">
      {tiles.map(({ icon: Icon, label, value, sub }) => (
        <li key={label} className="rounded-2xl border border-gray-100 bg-white p-4 text-center shadow-soft">
          <Icon size={22} aria-hidden="true" className="mx-auto text-orange-500" />
          <p className="mt-2 text-[0.68rem] font-bold uppercase tracking-wider text-gray-500">{label}</p>
          <p className="mt-1 text-xl font-extrabold tracking-tight text-orange-600 sm:text-2xl">{value}</p>
          <p className="mt-0.5 text-xs text-gray-500">{sub}</p>
        </li>
      ))}
    </ul>
  );
}

const ordinal = (n: string) => {
  const v = Number(n);
  if (!v) return { n, suffix: "" };
  const teens = v % 100 >= 11 && v % 100 <= 13;
  return { n, suffix: teens ? "th" : (["th", "st", "nd", "rd"][v % 10] ?? "th") };
};

/** "1st Day in …" strip, scrolled sideways when the trip is long. */
export function DayStrip({ p }: { p: PackageDetail }) {
  if (!p.stops.length) return null;
  return (
    <div className="no-scrollbar flex overflow-x-auto rounded-2xl border border-gray-100 bg-white shadow-soft">
      {p.days !== null && <p className="flex shrink-0 items-center bg-orange-50 px-4">
        <span className="rounded-full bg-orange-500 px-3 py-1.5 text-xs font-bold text-white">{p.days}D / {Math.max(p.nights ?? 0, 0)}N</span>
      </p>}
      <ol className="flex">
        {p.stops.map((s) => {
          const o = ordinal(s.label);
          return (
            <li key={s.label + s.place} className="flex shrink-0 items-center gap-2.5 border-l border-gray-100 px-4 py-3">
              <span className="text-2xl font-extrabold leading-none text-orange-500">
                {o.n}
                <sup className="text-xs font-bold">{o.suffix}</sup>
              </span>
              <span className="leading-tight">
                <span className="block text-[0.65rem] font-semibold uppercase tracking-wider text-gray-500">Day in</span>
                <span className="block max-w-56 truncate text-sm font-semibold text-gray-900">{s.place}</span>
              </span>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

export function IncludedBadges({ p }: { p: PackageDetail }) {
  const items = [
    p.includes.transfer && { icon: Bus, label: "Transfer Included" },
    p.includes.stay && { icon: Bed, label: "Stay Included" },
    p.includes.breakfast && { icon: Coffee, label: "Breakfast Included" },
    p.includes.sightseeing && { icon: MapPin, label: "Sightseeing Included" },
  ].filter((i): i is { icon: typeof Bus; label: string } => Boolean(i));
  if (!items.length) return null;
  return (
    <ul className="grid grid-cols-2 gap-3 border-y border-gray-100 py-4 lg:grid-cols-4">
      {items.map(({ icon: Icon, label }) => (
        <li key={label} className="flex items-center gap-2.5 text-sm font-medium text-gray-800">
          <Icon size={18} aria-hidden="true" />
          {label}
        </li>
      ))}
    </ul>
  );
}

export function JourneyRoute({ p }: { p: PackageDetail }) {
  const { source, destination, stops } = p.route;
  if (!source || !destination) return null;
  const dot = "relative z-10 grid size-10 shrink-0 place-items-center rounded-full text-white shadow-sm";
  return (
    <section aria-labelledby="route-title">
      <SectionLabel icon={Route}>Journey Route</SectionLabel>
      <details open className="group mt-3 overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-soft">
        <summary className="flex cursor-pointer list-none items-center gap-3.5 bg-linear-to-r from-orange-500 to-amber-400 px-5 py-3.5 text-white [&::-webkit-details-marker]:hidden">
          <span className="grid size-10 place-items-center rounded-xl bg-white/20 font-bold" aria-hidden="true">
            A
          </span>
          <span className="flex-1">
            <span className="block text-[0.68rem] font-bold uppercase tracking-wider text-white/90">Route overview</span>
            <span id="route-title" className="block font-bold">
              {source} → {destination}
            </span>
          </span>
          <ChevronDown size={20} aria-hidden="true" className="transition-transform group-open:rotate-180" />
        </summary>
        <ol className="p-5">
          <li className="flex items-center gap-4 pb-5">
            <span className={`${dot} bg-orange-500`}>
              <MapPin size={16} aria-hidden="true" />
            </span>
            <span>
              <span className="block text-[0.68rem] font-bold uppercase tracking-wider text-orange-600">Departure</span>
              <span className="block font-semibold text-gray-900">{source}</span>
            </span>
          </li>
          {stops.map((s, i) => (
            <li key={`${s}-${i}`} className="flex items-center gap-4 pb-5">
              <span className={`${dot} bg-linear-to-br from-orange-400 to-amber-400`}>
                <ChevronRight size={16} aria-hidden="true" />
              </span>
              <span>
                <span className="block text-[0.68rem] font-bold uppercase tracking-wider text-orange-600">Stop {i + 1}</span>
                <span className="block font-semibold text-gray-900">{s}</span>
              </span>
            </li>
          ))}
          <li className="flex items-center gap-4">
            <span className={`${dot} bg-red-500`}>
              <Flag size={16} aria-hidden="true" />
            </span>
            <span>
              <span className="block text-[0.68rem] font-bold uppercase tracking-wider text-red-600">Final arrival</span>
              <span className="block font-semibold text-gray-900">{destination}</span>
            </span>
          </li>
        </ol>
      </details>
    </section>
  );
}

export function Overview({ p }: { p: PackageDetail }) {
  if (!p.overview) return null;
  return (
    <section id="overview" aria-labelledby="overview-title" className="scroll-mt-24">
      <SectionLabel icon={FileText}>Package Overview</SectionLabel>
      <Heading id="overview-title" accent={p.title.replace(/^\d+\s+Days?\s+/i, "")} className="mt-3">
        What&apos;s Inside the
      </Heading>
      <div className="mt-5 overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-soft">
        <div className="h-1 bg-linear-to-r from-orange-500 to-amber-400" aria-hidden="true" />
        <RichHtml html={p.overview} className="p-5 sm:p-8" />
        <p className="flex items-center gap-2 border-t border-orange-100 bg-orange-50/60 px-5 py-3 text-xs italic text-gray-600 sm:px-8">
          <span className="size-1.5 rounded-full bg-orange-500" aria-hidden="true" />
          Details are subject to availability and seasonal adjustments.
        </p>
      </div>
    </section>
  );
}

export function Highlights({ p }: { p: PackageDetail }) {
  if (!p.highlights.length) return null;
  return (
    <section id="highlights" aria-labelledby="highlights-title" className="scroll-mt-24">
      <h2 id="highlights-title" className="text-xl font-bold text-gray-900 sm:text-2xl">
        Trip Highlights
      </h2>
      <ul className="mt-4 space-y-3">
        {p.highlights.map((h) => (
          <li key={h} className="flex gap-3 rounded-2xl bg-orange-50/70 px-4 py-3.5 text-[0.95rem] leading-relaxed text-gray-800">
            <Sparkles size={18} aria-hidden="true" className="mt-0.5 shrink-0 text-orange-500" />
            {h}
          </li>
        ))}
      </ul>
    </section>
  );
}

const CORE_TEMPLES = ["banke-bihari", "krishna-janmabhoomi", "prem-mandir", "iskcon", "nidhivan"];

function summerRow(name: string, h: Hours): PackageTiming | null {
  const open = h.morning ?? h.allDay;
  if (!open) return null;
  return {
    temple: name,
    morningOpens: formatTime(open.from),
    afternoonCloses: h.morning ? formatTime(h.morning.to) : "No midday break",
    eveningOpens: h.evening ? formatTime(h.evening.from) : "Closed",
  };
}

/** The package's own table when it has one, otherwise the core temples from the timings page. */
export function Timings({ p, defaults }: { p: PackageDetail; defaults: Defaults }) {
  const own = p.timings.rows.length > 0;
  const rows = own ? p.timings.rows : timingRows.filter((t) => CORE_TEMPLES.includes(t.id)).flatMap((t) => summerRow(t.name, t.summer) ?? []);
  if (!rows.length) return null;
  const withEntry = rows.some((r) => r.entry);
  return (
    <section aria-labelledby="timings-title">
      <SectionLabel icon={Clock3}>Darshan Timings</SectionLabel>
      <Heading id="timings-title" rule={false} className="mt-3">
        {p.timings.title || defaults.timingsTitle}
      </Heading>
      <p className="mt-2 text-[0.95rem] leading-relaxed text-gray-600">{p.timings.note || defaults.timingsNote}</p>
      <DataTable
        label="Temple timings"
        columns={[
          { key: "temple", label: "Temple", tone: "strong" },
          { key: "morningOpens", label: "Morning opens", tone: "orange" },
          { key: "afternoonCloses", label: "Afternoon closes", tone: "orange" },
          { key: "eveningOpens", label: "Evening opens", tone: "blue" },
          ...(withEntry ? [{ key: "entry" as const, label: "Entry" }] : []),
        ]}
        rows={rows.map((r) => ({ temple: r.temple, morningOpens: r.morningOpens, afternoonCloses: r.afternoonCloses, eveningOpens: r.eveningOpens, entry: r.entry }))}
      />
      <p className="mt-2.5 text-xs text-gray-500">
        {own ? "" : "Summer hours shown; winter hours differ. "}
        <Link href="/mathura-vrindavan-temple-timings" className="font-semibold text-orange-600 hover:text-orange-700">
          See the full temple timetable
        </Link>
      </p>
    </section>
  );
}

export function GuideCard({ p, defaults }: { p: PackageDetail; defaults: Defaults }) {
  const facts = [
    { icon: Landmark, text: "Born in Braj" },
    { icon: HandHeart, text: `${PILGRIMS} pilgrims guided` },
    { icon: CalendarDays, text: `Guiding since ${FOUNDED}` },
    { icon: Star, text: `${RATING} guest rating` },
  ];
  return (
    <section aria-labelledby="guide-title">
      <SectionLabel icon={Video}>Meet Your Guide</SectionLabel>
      <div className={`mt-3 grid gap-7 rounded-3xl bg-linear-to-br from-[#7c1d06] to-[#6e1d05] p-6 text-white shadow-lift sm:p-9 ${p.video ? "lg:grid-cols-2" : ""}`}>
        <div>
          <h2 id="guide-title" className="text-2xl font-extrabold leading-tight text-white sm:text-3xl">
            Meet {FOUNDER.name}, Your Braj Guide
          </h2>
          <span className="mt-3 block h-0.5 w-12 bg-orange-400" aria-hidden="true" />
          <p className="mt-4 text-[0.95rem] leading-relaxed text-white/90">{p.guideBio || defaults.guideBio}</p>
          <ul className="mt-5 grid gap-2.5 sm:grid-cols-2">
            {facts.map(({ icon: Icon, text }) => (
              <li key={text} className="flex items-center gap-2.5 rounded-xl border border-white/15 bg-white/8 px-3 py-2.5 text-xs font-semibold sm:text-[0.8125rem]">
                <Icon size={16} aria-hidden="true" className="shrink-0 text-amber-300" />
                {text}
              </li>
            ))}
          </ul>
        </div>
        {p.video && (
          <a href={`https://www.youtube.com/watch?v=${p.video.id}`} target="_blank" rel="noopener noreferrer" className="group relative block aspect-video self-center overflow-hidden rounded-2xl bg-black">
            <Image src={`https://i.ytimg.com/vi/${p.video.id}/hqdefault.jpg`} alt={p.video.title || `Video about ${p.title}`} fill sizes="(min-width: 1024px) 26rem, 92vw" className="object-cover" />
            <span className="absolute inset-0 grid place-items-center">
              <span className="grid size-14 place-items-center rounded-full bg-orange-500 text-white shadow-lg transition-transform group-hover:scale-105">
                <Play size={22} aria-hidden="true" fill="currentColor" />
              </span>
            </span>
            <span className="sr-only">Watch on YouTube (opens in a new tab)</span>
          </a>
        )}
      </div>
    </section>
  );
}

export function Itinerary({ p }: { p: PackageDetail }) {
  if (!p.itinerary.length) return null;
  return (
    <section id="itinerary" aria-labelledby="itinerary-title" className="scroll-mt-24">
      <h2 id="itinerary-title" className="text-xl font-bold text-gray-900 sm:text-2xl">
        Complete Day by Day Itinerary
      </h2>
      {/* Native <details>: every day stays in the HTML. */}
      <div className="mt-4 space-y-3.5">
        {p.itinerary.map((d, i) => (
          <details key={d.day} open={i === 0} className="group rounded-2xl border border-gray-200 bg-white">
            <summary className="flex cursor-pointer list-none items-center gap-3.5 rounded-2xl px-4 py-4 transition-colors hover:bg-orange-50/50 sm:px-5 [&::-webkit-details-marker]:hidden">
              <span className="shrink-0 rounded-full bg-orange-500 px-3.5 py-1 text-[0.8125rem] font-bold text-white">Day {d.day}</span>
              <h3 className="min-w-0 flex-1 font-bold text-gray-900">{d.title}</h3>
              {d.tag && <span className="hidden shrink-0 rounded-full bg-orange-50 px-2.5 py-0.5 text-xs font-semibold text-orange-700 sm:block">{d.tag}</span>}
              <ChevronDown size={20} aria-hidden="true" className="shrink-0 text-orange-500 transition-transform group-open:rotate-180" />
            </summary>
            <div className="space-y-4 px-4 pb-5 sm:px-5">
              {d.html && <RichHtml html={d.html} />}
              {d.activities.length > 0 && (
                <ul className="space-y-2.5">
                  {d.activities.map((a) => (
                    <li key={a.time + a.text} className="flex gap-3 text-[0.95rem] leading-relaxed text-gray-700">
                      <span className="mt-2 size-1.5 shrink-0 rounded-full bg-orange-500" aria-hidden="true" />
                      <span>
                        {a.time && <strong className="font-semibold text-gray-900">{a.time}: </strong>}
                        {a.text}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}

export function SeniorGuide({ p }: { p: PackageDetail }) {
  if (!p.senior.rows.length) return null;
  return (
    <section aria-labelledby="senior-title">
      <SectionLabel icon={Info}>Accessibility</SectionLabel>
      <Heading id="senior-title" accent="Every Stop Rated" rule={false} className="mt-3">
        Senior Citizen Accessibility Guide
      </Heading>
      {p.senior.note && <p className="mt-2 text-[0.95rem] leading-relaxed text-gray-600">{p.senior.note}</p>}
      <DataTable
        label="Senior citizen accessibility"
        columns={[
          { key: "location", label: "Location", tone: "strong" },
          { key: "stepsWalking", label: "Steps / Walking", tone: "orange" },
          { key: "seniorExperience", label: "Senior Experience", tone: "blue" },
          { key: "emiApproach", label: "Our Approach" },
        ]}
        rows={p.senior.rows}
      />
    </section>
  );
}

export function HowToReach({ p, defaults }: { p: PackageDetail; defaults: Defaults }) {
  const rows = p.howToReach.length ? p.howToReach : defaults.howToReach;
  return (
    <section aria-labelledby="reach-title">
      <SectionLabel icon={MapPin}>How to Reach</SectionLabel>
      <Heading id="reach-title" accent="From Every Major City" rule={false} className="mt-3">
        How to Reach
      </Heading>
      <DataTable
        label="How to reach"
        columns={[
          { key: "city", label: "From City", tone: "strong" },
          { key: "mode", label: "Mode", tone: "orange" },
          { key: "travelTime", label: "Travel Time", tone: "orange" },
          { key: "service", label: "Our Service", tone: "blue" },
        ]}
        rows={rows}
      />
    </section>
  );
}

export function InclusionsExclusions({ p }: { p: PackageDetail }) {
  if (!p.inclusions.length && !p.exclusions.length) return null;
  return (
    <section id="inclusions" aria-labelledby="inclusions-title" className="scroll-mt-24">
      <h2 id="inclusions-title" className="text-xl font-bold text-gray-900 sm:text-2xl">
        Inclusions and Exclusions
      </h2>
      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl border border-emerald-100 bg-emerald-50/50 p-5">
          <h3 className="font-bold text-emerald-800">Included</h3>
          <ul className="mt-3 space-y-2.5 text-[0.95rem] leading-relaxed text-gray-700">
            {p.inclusions.map((x) => (
              <li key={x} className="flex gap-2.5">
                <Check size={17} aria-hidden="true" className="mt-1 shrink-0 text-emerald-600" />
                {x}
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-2xl border border-rose-100 bg-rose-50/50 p-5">
          <h3 className="font-bold text-rose-800">Not included</h3>
          <ul className="mt-3 space-y-2.5 text-[0.95rem] leading-relaxed text-gray-700">
            {p.exclusions.map((x) => (
              <li key={x} className="flex gap-2.5">
                <Minus size={17} aria-hidden="true" className="mt-1 shrink-0 text-rose-600" />
                {x}
              </li>
            ))}
          </ul>
        </div>
      </div>
      {p.groupPricing.length > 0 && (
        <div className="mt-4 rounded-2xl border border-orange-100 bg-white p-5 shadow-soft">
          <h3 className="font-bold text-gray-900">Group pricing (per person)</h3>
          <ul className="mt-3 grid gap-3 sm:grid-cols-3">
            {p.groupPricing.map((g) => (
              <li key={g.size} className="rounded-xl bg-orange-50 px-4 py-3 text-sm text-gray-700">
                Group of {g.size}
                <span className="block text-lg font-extrabold text-orange-600">{formatInr(g.price)}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}

export function GroundTruth({ p }: { p: PackageDetail }) {
  if (!p.groundTruth.length) return null;
  return (
    <>
      {p.groundTruth.map((g) => (
        <section key={g.heading} aria-label={g.heading}>
          <h2 className="text-xl font-bold text-gray-900 sm:text-2xl">{g.heading}</h2>
          <ul className="mt-4 divide-y divide-gray-100 rounded-2xl border border-gray-100 bg-white shadow-soft">
            {g.points.map((point) => (
              <li key={point} className="flex gap-3.5 p-4 text-[0.95rem] leading-relaxed text-gray-700 sm:p-5">
                <BadgeCheck size={20} aria-hidden="true" className="mt-0.5 shrink-0 text-orange-500" />
                {point}
              </li>
            ))}
          </ul>
        </section>
      ))}
    </>
  );
}

export function BookingCta({ p, defaults }: { p: PackageDetail; defaults: Defaults }) {
  const wa = whatsappLink(packageWhatsappMessage(p.title));
  return (
    <section aria-labelledby="book-title" className="bg-white py-12">
      <div className="container-x max-w-3xl">
        <div className="rounded-3xl border-2 border-orange-400 bg-orange-50/40 p-6 text-center sm:p-9">
          <p aria-hidden="true" className="text-3xl">
            🙏
          </p>
          <p className="mt-2 text-xs font-bold uppercase tracking-[0.16em] text-orange-600">Ready to book this</p>
          <h2 id="book-title" className="mt-2 text-2xl font-extrabold leading-tight text-orange-600 sm:text-3xl">
            {p.title}
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-[0.95rem] leading-relaxed text-gray-600">{defaults.bookingText}</p>
          {p.price && (
            <p className="mx-auto mt-4 w-fit rounded-full border border-orange-200 bg-white px-4 py-2 text-sm font-bold text-orange-600">From {formatInr(p.price)} per person</p>
          )}
          <div className="mt-5 flex flex-wrap justify-center gap-3">
            {wa ? (
              <a href={wa} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-12 items-center gap-2 rounded-full bg-green-600 px-7 text-sm font-semibold text-white transition-colors hover:bg-green-700">
                <WhatsappIcon size={18} /> Book on WhatsApp
                <span className="sr-only"> (opens WhatsApp)</span>
              </a>
            ) : (
              <a href="#enquire" className="inline-flex min-h-12 items-center rounded-full bg-orange-500 px-7 text-sm font-semibold text-white hover:bg-orange-600">
                Send an enquiry
              </a>
            )}
          </div>
          <ul className="mt-5 flex flex-wrap justify-center gap-2">
            {defaults.bookingTags.map((t) => (
              <li key={t} className="inline-flex items-center gap-1 rounded-full bg-white px-3 py-1 text-xs font-semibold text-gray-600 shadow-soft">
                <Check size={12} aria-hidden="true" className="text-emerald-600" />
                {t}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

export function Recommendations({ p }: { p: PackageDetail }) {
  if (!p.recommendations.length) return null;
  return (
    <section aria-labelledby="recommend-title" className="bg-orange-50/40 py-12 sm:py-14">
      <div className="container-x max-w-3xl">
        <SectionLabel center>Our Recommendation</SectionLabel>
        <h2 id="recommend-title" className="mt-3 text-center text-2xl font-extrabold text-gray-900 sm:text-3xl">
          Based on <span className="text-orange-500">Your Situation</span>
        </h2>
        <ol className="mt-8 space-y-5">
          {p.recommendations.map((r, i) => (
            <li key={r.condition + i} className="relative pl-11">
              <span className="absolute left-0 top-3 grid size-7 place-items-center rounded-full bg-orange-500 text-xs font-bold text-white" aria-hidden="true">
                {i + 1}
              </span>
              <div className="rounded-2xl border border-orange-100 bg-white p-5 shadow-soft">
                {r.condition && <p className="w-fit rounded-full bg-orange-50 px-2.5 py-0.5 text-xs font-semibold text-orange-700">{r.condition}</p>}
                {r.recommendation && <p className="mt-2.5 font-semibold text-gray-900">{r.recommendation}</p>}
                {r.linkHref && (
                  <Link href={r.linkHref} className="mt-2 inline-flex items-center gap-1.5 text-sm font-semibold text-orange-600 hover:text-orange-700">
                    {r.linkLabel || "View package"}
                    <ArrowRight size={15} aria-hidden="true" />
                  </Link>
                )}
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function KnowBeforeYouGo({ p }: { p: PackageDetail }) {
  if (!p.notes.length) return null;
  return (
    <section aria-labelledby="know-title" className="bg-white py-12 sm:py-14">
      <div className="container-x max-w-4xl">
        <Heading id="know-title" accent="You Go">
          Know Before
        </Heading>
        <ul className="mt-5 space-y-3">
          {p.notes.map((n) => (
            <li key={n} className="flex gap-3 rounded-2xl border border-gray-100 bg-white p-4 text-[0.95rem] leading-relaxed text-gray-700 shadow-soft">
              <Info size={18} aria-hidden="true" className="mt-0.5 shrink-0 text-orange-500" />
              {n}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function Reviews({ p }: { p: PackageDetail }) {
  if (!p.testimonials.length) return null;
  const rated = p.testimonials.map((t) => t.rating).filter((r): r is number => r !== null);
  const average = rated.length ? rated.reduce((a, b) => a + b, 0) / rated.length : null;
  const bars = [5, 4, 3, 2, 1].map((star) => ({ star, n: rated.filter((r) => Math.round(r) === star).length }));
  return (
    <section aria-labelledby="reviews-title" className="bg-gray-50 py-12 sm:py-14">
      <div className="container-x">
        <Heading id="reviews-title" accent="Reviews">
          Guest
        </Heading>
        <div className="mt-6 grid gap-6 lg:grid-cols-[18rem_minmax(0,1fr)]">
          {average !== null && (
            <div className="self-start rounded-2xl border border-gray-100 bg-white p-5 shadow-soft">
              <p className="text-4xl font-extrabold tracking-tight text-gray-900">{average.toFixed(1)}</p>
              <div className="mt-1">
                <Stars value={average} size={17} />
              </div>
              <p className="mt-1 text-sm text-gray-500">
                From {rated.length} {rated.length === 1 ? "review" : "reviews"} below
              </p>
              <ul className="mt-4 space-y-1.5">
                {bars.map((b) => (
                  <li key={b.star} className="flex items-center gap-2 text-xs text-gray-600">
                    <span className="w-3 text-right">{b.star}</span>
                    <span className="h-1.5 flex-1 overflow-hidden rounded-full bg-gray-100">
                      <span className="block h-full rounded-full bg-amber-400" style={{ width: `${(b.n / rated.length) * 100}%` }} />
                    </span>
                    <span className="w-4">{b.n}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
          <ul className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {p.testimonials.map((t) => (
              <li key={t.name + t.text.slice(0, 20)} className="rounded-2xl border border-gray-100 bg-white p-5 shadow-soft">
                {t.rating && <Stars value={t.rating} size={14} />}
                <p className="mt-2 text-sm leading-relaxed text-gray-700">{t.text}</p>
                <p className="mt-3 text-sm font-bold text-gray-900">{t.name}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

export function TrustSection({ defaults }: { defaults: Defaults }) {
  return (
    <section aria-labelledby="trust-title" className="bg-linear-to-b from-orange-50/70 to-white py-12 sm:py-14">
      <div className="container-x">
        <h2 id="trust-title" className="text-[clamp(1.75rem,1.3rem+1.6vw,2.5rem)] font-extrabold leading-tight tracking-[-0.02em] text-orange-600">
          {defaults.trustTitle}
        </h2>
        <p className="mt-3 max-w-2xl text-[0.95rem] leading-relaxed text-gray-700">{defaults.trustIntro}</p>
        <ul className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {defaults.trust.map((t) => (
            <li key={t.title} className="rounded-2xl bg-linear-to-br from-orange-500 to-orange-600 p-5 text-white shadow-[0_14px_26px_-16px_rgb(234_88_12/0.8)]">
              <ShieldCheck size={22} aria-hidden="true" className="text-white/90" />
              <h3 className="mt-3 font-bold text-white">{t.title}</h3>
              <p className="mt-1 text-sm leading-relaxed text-white/95">{t.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function Policies({ p }: { p: PackageDetail }) {
  if (!p.policies.length) return null;
  return (
    <section aria-labelledby="policies-title" className="bg-white py-12 sm:py-14">
      <div className="container-x">
        <Heading id="policies-title" accent="Policies">
          Booking
        </Heading>
        <ul className="mt-6 grid gap-4 md:grid-cols-2">
          {p.policies.map((policy) => (
            <li key={policy.title} className="rounded-2xl border border-gray-100 bg-white p-5 shadow-soft">
              <h3 className="font-bold text-gray-900">{policy.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-gray-600">{policy.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function RelatedPackages({ items, perks, idealFor }: { items: CatalogPackage[]; perks: readonly string[]; idealFor: string }) {
  if (!items.length) return null;
  return (
    <section aria-labelledby="related-title" className="bg-saffron-wash/60 py-12 sm:py-14">
      <div className="container-x">
        <Heading id="related-title" accent="Packages">
          More Tour
        </Heading>
        <ul className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((r) => (
            <li key={r.slug}>
              <TourCard pkg={r} perks={perks} idealFor={idealFor} />
            </li>
          ))}
        </ul>
        <p className="mt-8 text-center">
          <Link href="/tour-packages" className="inline-flex items-center gap-1.5 text-sm font-semibold text-orange-600 hover:text-orange-700">
            <Users size={15} aria-hidden="true" />
            View all tour packages
            <ArrowRight size={15} aria-hidden="true" />
          </Link>
        </p>
      </div>
    </section>
  );
}
