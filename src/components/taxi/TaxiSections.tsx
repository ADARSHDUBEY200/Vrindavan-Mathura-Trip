import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Armchair,
  BadgeIndianRupee,
  CalendarCheck,
  CalendarDays,
  CarFront,
  Check,
  Clock3,
  Fuel,
  Globe,
  HeartHandshake,
  Hourglass,
  Landmark,
  Luggage,
  Mail,
  MapPin,
  MapPinned,
  Moon,
  Phone,
  Plane,
  Plus,
  Receipt,
  Route as RouteIcon,
  ShieldCheck,
  Snowflake,
  Sparkles,
  SquareParking,
  Star,
  UserRound,
  Users,
  Wallet,
  type LucideIcon,
} from "lucide-react";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { WhatsappIcon } from "@/components/svg/TravelIcons";
import { BookCabButton } from "@/components/taxi/TaxiBooking";
import { FOUNDED, FOUNDER, PILGRIMS, RATING, YEARS, formatInr, mailtoHref, phoneHref, site } from "@/config/site";
import { photos } from "@/content/images";
import {
  RATE_NOTE,
  TAXI_UPDATED,
  airport,
  bookingNeeds,
  fleet,
  inclusions,
  kosStops,
  localTour,
  outstation,
  quoteLines,
  rateLabel,
  routes,
  safetyPoints,
  taxiFaqs,
  vehicleLabel,
  type Vehicle,
} from "@/content/taxi";
import type { Crumb } from "@/lib/schema";
import { whatsappLink } from "@/lib/whatsapp";

/* ------------------------------------------------------------------ */
/* Shared bits                                                         */
/* ------------------------------------------------------------------ */

const primaryBtn = "btn btn-primary";
const waMessage = (what: string) => `Radhe Radhe! I'd like to book ${what}. Could you share a written quote?`;

function Kicker({ children, light = false, className = "" }: { children: React.ReactNode; light?: boolean; className?: string }) {
  return <p className={`tx-kicker ${light ? "tx-kicker-light" : ""} ${className}`}>{children}</p>;
}

function WhatsappButton({ message, label = "WhatsApp", className = "btn btn-whatsapp" }: { message: string; label?: string; className?: string }) {
  const href = whatsappLink(message);
  if (!href) return null;
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
      <WhatsappIcon size={19} />
      {label}
      <span className="sr-only"> (opens WhatsApp)</span>
    </a>
  );
}

/* ------------------------------------------------------------------ */
/* 1. Hero                                                             */
/* ------------------------------------------------------------------ */

export function TaxiHero({ crumbs }: { crumbs: Crumb[] }) {
  const tel = phoneHref();
  const sedan = fleet[0];
  return (
    <section id="taxi-hero" aria-labelledby="page-title" className="tx-hero relative overflow-hidden pb-20 pt-28 sm:pt-32 lg:pb-24">
      <div className="tx-grid-bg pointer-events-none absolute inset-0" aria-hidden="true" />
      <div className="container-x relative grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
        <div className="text-center sm:text-left">
          <div className="hero-in flex justify-center sm:justify-start">
            <Breadcrumbs items={crumbs} />
          </div>
          <p className="hero-in hero-in-1 mt-5 inline-flex items-center gap-2.5 rounded-full border border-orange-200/80 bg-white/80 px-3.5 py-1.5 text-xs font-semibold text-ink-soft shadow-soft backdrop-blur">
            <span className="tx-live-dot" aria-hidden="true" />
            Cabs 24/7 · Serving pilgrims since {FOUNDED}
          </p>
          <h1 id="page-title" className="hero-in hero-in-2 mt-4 text-[clamp(1.55rem,1.25rem+1.35vw,2.35rem)] font-bold leading-[1.15] tracking-[-0.022em]">
            <span className="block">
              Mathura Vrindavan Taxi Services<span className="sr-only">:</span>
            </span>
            <span className="text-gradient">Safe, Affordable &amp; Local Cabs</span>
          </h1>
          <p className="hero-in hero-in-3 mt-4 text-[0.95rem] font-semibold text-ink">Radhe Radhe, dear traveller.</p>
          <p className="lede hero-in hero-in-3 mx-auto mt-1.5 max-w-xl sm:mx-0">
            I am {FOUNDER.name}, born in {FOUNDER.bornIn}, with <strong className="font-semibold text-ink">{YEARS} years</strong> of organising transport for devotees. Our{" "}
            <strong className="font-semibold text-ink">Mathura Vrindavan taxi services</strong> start at just <strong className="font-semibold text-ink">{rateLabel(sedan)}</strong> for sedans, run{" "}
            <strong className="font-semibold text-ink">24/7</strong> (including airport drops and early-morning temple darshans) and are driven by local Brijwasi chauffeurs who know the lanes, the
            temple timings and the parking spots. We have safely served <strong className="font-semibold text-ink">over {PILGRIMS.replace("+", "")} pilgrims</strong>, and they have given us a{" "}
            <strong className="font-semibold text-ink">{RATING}-star rating</strong>.
          </p>

          <div className="hero-in hero-in-4 mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <BookCabButton className={`${primaryBtn} h-12 px-6 text-[0.95rem]`}>
              <CarFront size={19} aria-hidden="true" /> Book a Cab
              <ArrowRight size={17} aria-hidden="true" className="btn-arrow" />
            </BookCabButton>
            <WhatsappButton message={waMessage("a cab in Mathura Vrindavan")} label="Book on WhatsApp" className="btn btn-whatsapp h-12 px-6 text-[0.95rem]" />
            {tel && (
              <a href={tel} className="btn btn-outline h-12 px-5 text-[0.95rem]">
                <Phone size={17} aria-hidden="true" className="text-orange-600" /> {site.contact.phone}
              </a>
            )}
          </div>
          <p className="hero-in hero-in-4 mt-4 flex flex-wrap items-center justify-center gap-x-3 gap-y-1.5 text-[0.8rem] text-stone sm:justify-start">
            <span className="inline-flex items-center gap-1.5">
              <Mail size={14} aria-hidden="true" className="text-orange-600" />
              <a href={mailtoHref("Cab booking")} className="hover:text-ink hover:underline">
                {site.contact.email}
              </a>
            </span>
            <span aria-hidden="true" className="text-line">
              |
            </span>
            <Link href="/tour-packages" className="inline-flex items-center gap-1.5 font-medium text-ember-deep hover:underline">
              <Globe size={14} aria-hidden="true" /> Mathura Vrindavan Tour Packages
            </Link>
          </p>
        </div>

        {/* Visual: the car, a fare ticket and an airport chip */}
        <div className="hero-in hero-in-2 relative mx-auto w-full max-w-xl pb-10 lg:max-w-none lg:pb-6">
          <div className="relative aspect-[5/4] overflow-hidden rounded-[1.75rem] bg-orange-50 shadow-[0_30px_60px_-30px_rgb(28_13_5/0.45)] ring-1 ring-black/5">
            <Image src={photos["taxi-innova"].src} alt={photos["taxi-innova"].alt} fill preload placeholder="blur" sizes="(min-width: 1280px) 560px, (min-width: 1024px) 44vw, 92vw" className="object-cover" />
            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-t from-cocoa/70 to-transparent" aria-hidden="true" />
            <div className="tx-road-line absolute inset-x-0 bottom-4" aria-hidden="true" />
            <ul className="absolute left-4 top-4 flex flex-wrap gap-1.5 text-[0.7rem] font-semibold text-ink">
              <li className="inline-flex items-center gap-1 rounded-full bg-white/90 px-2.5 py-1 backdrop-blur">
                <Snowflake size={12} aria-hidden="true" className="text-orange-600" /> AC
              </li>
              <li className="inline-flex items-center gap-1 rounded-full bg-white/90 px-2.5 py-1 backdrop-blur">
                <Sparkles size={12} aria-hidden="true" className="text-orange-600" /> Cleaned before each trip
              </li>
            </ul>
          </div>

          {/* Fare ticket */}
          <div className="tx-float absolute -bottom-1 left-3 w-[15.5rem] sm:-left-6 lg:-left-8">
            <div className="tx-ticket rounded-2xl bg-white p-4 shadow-[0_20px_40px_-18px_rgb(28_13_5/0.45)]">
              <p className="text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-stone">Sedans from</p>
              <p className="tx-rate mt-0.5 text-[1.9rem] font-bold leading-none text-ink">
                ₹{sedan.rate.min}
                <span className="ml-0.5 text-sm font-semibold text-stone">/km</span>
              </p>
              <ul className="tx-perf mt-3 grid grid-cols-3 gap-1 pt-2.5 text-[0.65rem] leading-tight text-stone">
                {fleet.slice(1).map((v) => (
                  <li key={v.id}>
                    <span className="block font-semibold text-ink">{v.rate.min === v.rate.max ? `₹${v.rate.min}` : `₹${v.rate.min}–${v.rate.max}`}</span>
                    {v.category.split(" /")[0]}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Airport chip */}
          <div className="tx-float-late absolute right-3 top-3 sm:-right-5 sm:top-8">
            <div className="flex items-center gap-3 rounded-2xl bg-cocoa px-3.5 py-3 text-white shadow-[0_18px_36px_-16px_rgb(28_13_5/0.7)]">
              <span className="grid size-9 place-items-center rounded-xl bg-linear-to-br from-orange-500 to-amber-500">
                <Plane size={17} aria-hidden="true" />
              </span>
              <span className="text-xs leading-tight">
                <span className="block text-white/65">Delhi IGI drops</span>
                <span className="block text-sm font-semibold">from {formatInr(airport.price)}</span>
              </span>
            </div>
          </div>

          {/* Rating */}
          <div className="absolute -bottom-1 right-3 hidden rounded-2xl bg-white px-3.5 py-2.5 shadow-lift sm:block">
            <p className="flex items-center gap-1 text-sm font-bold text-ink">
              <Star size={15} aria-hidden="true" className="fill-amber-400 text-amber-400" /> {RATING}
              <span className="font-medium text-stone">· {PILGRIMS} pilgrims</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* 2. Stats band                                                       */
/* ------------------------------------------------------------------ */

export function TaxiStats() {
  const stats: { icon: LucideIcon; value: string; label: string }[] = [
    { icon: CalendarCheck, value: FOUNDED, label: "Serving pilgrims since" },
    { icon: Users, value: PILGRIMS, label: "Pilgrims served safely" },
    { icon: Star, value: `${RATING}★`, label: "Star rating" },
    { icon: Clock3, value: "24/7", label: "Pickups and support" },
    { icon: BadgeIndianRupee, value: rateLabel(fleet[0]), label: "Sedans from" },
  ];
  return (
    <div className="container-x relative z-10 -mt-12">
      <ul className="reveal grid grid-cols-2 gap-y-4 rounded-[1.4rem] border border-line bg-white px-3 py-5 shadow-[0_24px_50px_-30px_rgb(28_13_5/0.35)] sm:grid-cols-3 sm:px-5 lg:grid-cols-5 lg:py-6">
        {stats.map(({ icon: Icon, value, label }, i) => (
          <li key={label} className={`tx-stat flex flex-col items-center gap-1 px-2 text-center lg:flex-row lg:gap-3.5 lg:px-5 lg:text-left ${i === stats.length - 1 ? "col-span-2 sm:col-span-1" : ""}`}>
            <span className="icon-badge size-10 rounded-xl">
              <Icon size={18} aria-hidden="true" />
            </span>
            <span>
              <span className="tx-rate block text-lg font-bold leading-tight text-ink">{value}</span>
              <span className="block text-xs text-stone">{label}</span>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* 3. Why a local taxi: founder note + Braj distance map              */
/* ------------------------------------------------------------------ */

type MapNode = { name: string; x: number; y: number; href: string; hub?: boolean; anchor?: "start" | "end" | "middle"; dx?: number; dy?: number };
const mapNodes: MapNode[] = [
  { name: "Mathura", x: 300, y: 236, href: "/mathura", hub: true, anchor: "start", dx: 18, dy: 5 },
  { name: "Vrindavan", x: 330, y: 92, href: "/vrindavan", anchor: "start", dx: 14, dy: 5 },
  { name: "Gokul", x: 392, y: 322, href: "/gokul", anchor: "start", dx: 14, dy: 5 },
  { name: "Govardhan", x: 150, y: 262, href: "/govardhan", anchor: "end", dx: -14, dy: 5 },
  { name: "Barsana", x: 86, y: 146, href: "/barsana", anchor: "middle", dx: 0, dy: 26 },
  { name: "Nandgaon", x: 126, y: 54, href: "/nandgaon", anchor: "start", dx: 14, dy: 5 },
];
const mapEdges: { d: string; label: string; lx: number; ly: number }[] = [
  { d: "M300 236 L330 92", label: "11–15 km", lx: 350, ly: 166 },
  { d: "M300 236 L392 322", label: "10–15 km", lx: 384, ly: 266 },
  { d: "M300 236 L150 262", label: "21–26 km", lx: 226, ly: 274 },
  { d: "M300 236 Q190 120 86 146", label: "45–55 km", lx: 196, ly: 150 },
  { d: "M86 146 L126 54", label: "8–10 km", lx: 62, ly: 96 },
];

function BrajMap() {
  return (
    <figure className="reveal relative overflow-hidden rounded-[1.6rem] border border-line bg-[#fffaf3] p-4 sm:p-6">
      <div className="bg-dots pointer-events-none absolute inset-0 opacity-60" aria-hidden="true" />
      <figcaption className="relative flex flex-wrap items-center justify-between gap-2">
        <span className="inline-flex items-center gap-2 text-sm font-semibold text-ink">
          <MapPinned size={17} aria-hidden="true" className="text-orange-600" /> Braj by road, from Mathura
        </span>
        <span className="text-[0.7rem] text-stone">Schematic, not to scale</span>
      </figcaption>
      <svg viewBox="0 0 460 370" className="relative mt-2 h-auto w-full" role="img" aria-label="Road distances: Mathura to Vrindavan 11 to 15 km, to Gokul 10 to 15 km, to Govardhan 21 to 26 km, to Barsana 45 to 55 km; Barsana to Nandgaon 8 to 10 km.">
        <g fill="none" strokeLinecap="round">
          {mapEdges.map((e) => (
            <g key={e.d}>
              <path d={e.d} stroke="#fed7aa" strokeWidth="9" />
              <path d={e.d} className="tx-map-edge" stroke="#ea580c" strokeWidth="2" />
            </g>
          ))}
        </g>
        {mapEdges.map((e) => (
          <g key={e.label + e.lx} aria-hidden="true">
            <rect x={e.lx - 34} y={e.ly - 11} width="68" height="22" rx="11" fill="#1c0d05" />
            <text x={e.lx} y={e.ly + 4} textAnchor="middle" fontSize="11" fontWeight="600" fill="#fff">
              {e.label}
            </text>
          </g>
        ))}
        {mapNodes.map((n) => (
          <a key={n.name} href={n.href} className="tx-map-link">
            <title>{`${n.name} guide`}</title>
            {n.hub && <circle cx={n.x} cy={n.y} r="22" fill="#f97316" opacity="0.15" />}
            <circle className="tx-map-node" cx={n.x} cy={n.y} r={n.hub ? 11 : 7} fill={n.hub ? "#f97316" : "#fff"} stroke={n.hub ? "#fff" : "#ea580c"} strokeWidth={n.hub ? 3 : 2.5} />
            <text className="tx-map-label" x={n.x + (n.dx ?? 0)} y={n.y + (n.dy ?? 0)} textAnchor={n.anchor} fontSize={n.hub ? 15 : 13} fontWeight={n.hub ? 700 : 600} fill="#1f2328">
              {n.name}
            </text>
          </a>
        ))}
      </svg>
    </figure>
  );
}

export function WhyLocal() {
  return (
    <section aria-labelledby="why-local" className="py-14 sm:py-16 lg:py-20">
      <div className="container-x grid items-center gap-10 lg:grid-cols-[1fr_1fr] lg:gap-14">
        <div>
          <div className="tx-head max-w-xl">
            <Kicker>Why a local taxi</Kicker>
            <h2 id="why-local" className="tx-h2 mt-2.5">
              Why Pilgrims Need a Local Taxi in Braj
            </h2>
            <p className="lede mt-3">
              Braj is spread out. Mathura, Vrindavan, Govardhan, Gokul, Barsana and Nandgaon sit 10 to 55 km apart, temple timings split the day into morning and evening windows and the old lanes
              are impossible to navigate without local knowledge. A good <strong className="font-semibold text-ink">Mathura taxi service</strong> does more than move you from A to B. It protects
              your time, your energy and your wallet. That is the service I built.
            </p>
          </div>

          <blockquote className="reveal relative mt-7 rounded-[1.4rem] border border-orange-100 bg-linear-to-br from-orange-50 to-white p-5 sm:p-6">
            <span className="absolute -top-3 left-5 rounded-full bg-cocoa px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-orange-200">A note from {FOUNDER.name.split(" ")[0]}</span>
            <p className="text-[0.95rem] leading-relaxed text-ink-soft">
              Let me tell you what a pilgrim&apos;s worst day in Braj looks like. The grandmother is tired, the train was late and a stranger at the station is quoting a fare that changes three
              times before you reach the car. That is exactly what I started <strong className="font-semibold text-ink">{site.name}</strong> in {FOUNDED} to prevent.
            </p>
            <footer className="mt-4 flex items-center gap-3">
              <span className="grid size-10 place-items-center rounded-full bg-linear-to-br from-orange-500 to-amber-500 text-sm font-bold text-white" aria-hidden="true">
                HS
              </span>
              <span className="text-sm leading-tight">
                <cite className="block font-semibold not-italic text-ink">{FOUNDER.name}</cite>
                <Link href="/about" className="text-xs text-stone hover:text-ember-deep hover:underline">
                  Founder, born in {FOUNDER.bornIn}
                </Link>
              </span>
            </footer>
          </blockquote>
        </div>
        <BrajMap />
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* 4. Fleet                                                            */
/* ------------------------------------------------------------------ */

function VehicleCard({ v, index }: { v: Vehicle; index: number }) {
  const photo = photos[v.image];
  const ranged = v.rate.min !== v.rate.max;
  return (
    <article aria-labelledby={`car-${v.id}`} className="tx-car flex flex-col overflow-hidden rounded-[1.4rem] border border-line bg-white shadow-soft">
      <div className="tx-car-media relative aspect-[16/11] overflow-hidden bg-linear-to-b from-orange-50 to-white">
        <Image src={photo.src} alt={photo.alt} fill placeholder="blur" sizes="(min-width: 1280px) 300px, (min-width: 1024px) 23vw, (min-width: 640px) 46vw, 92vw" className="object-cover" />
        <span className="absolute left-3 top-3 rounded-full bg-white/92 px-2.5 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.1em] text-ember-deep backdrop-blur">
          0{index + 1} · {v.category.split(" /")[0]}
        </span>
        <span className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 rounded-full bg-cocoa/88 px-2.5 py-1 text-xs font-semibold text-white backdrop-blur">
          <Users size={13} aria-hidden="true" className="text-orange-300" /> {v.seats}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 id={`car-${v.id}`} className="text-lg font-bold leading-tight">
          {v.category}
        </h3>
        <p className="mt-0.5 text-sm text-stone">{v.models}</p>

        <div className="mt-4 flex items-end justify-between gap-3 rounded-2xl bg-[#fffaf3] px-4 py-3 ring-1 ring-orange-100">
          <div>
            <p className="text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-stone">Rate</p>
            <p className="tx-rate text-[1.65rem] font-bold leading-none text-ink">
              {ranged ? `₹${v.rate.min}–${v.rate.max}` : `₹${v.rate.min}`}
              <span className="ml-0.5 text-sm font-semibold text-stone">/km</span>
            </p>
            {ranged && <span className="sr-only">{rateLabel(v)}</span>}
          </div>
          <span className="inline-flex items-center gap-1 rounded-full bg-white px-2 py-1 text-[0.68rem] font-semibold text-ink-soft ring-1 ring-line">
            <Snowflake size={12} aria-hidden="true" className="text-orange-600" /> AC
          </span>
        </div>

        <p className="mt-4 flex items-start gap-2 text-sm text-ink-soft">
          <HeartHandshake size={16} aria-hidden="true" className="mt-0.5 shrink-0 text-orange-600" />
          <span>
            <span className="font-semibold text-ink">Ideal for:</span> {v.idealFor}
          </span>
        </p>

        <div className="mt-auto flex gap-2 pt-5">
          <BookCabButton vehicle={v.id} className={`${primaryBtn} btn-sm h-11 flex-1`}>
            Book this cab <ArrowRight size={15} aria-hidden="true" className="btn-arrow" />
          </BookCabButton>
          {whatsappLink() && (
            <a
              href={whatsappLink(waMessage(`a ${vehicleLabel(v)}`))}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Book the ${v.category} on WhatsApp (opens WhatsApp)`}
              className="grid size-11 shrink-0 place-items-center rounded-full bg-whatsapp text-white transition-transform hover:-translate-y-px"
            >
              <WhatsappIcon size={20} />
            </a>
          )}
        </div>
      </div>
    </article>
  );
}

export function Fleet() {
  return (
    <section id="fleet" aria-labelledby="fleet-title" className="bg-[#fffaf3] py-14 sm:py-16 lg:py-20">
      <div className="container-x">
        <div className="flex flex-col items-center gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div className="tx-head max-w-2xl">
            <Kicker>Fleet and fares</Kicker>
            <h2 id="fleet-title" className="tx-h2 mt-2.5">
              Our Premium Taxi Fleet &amp; Transparent Pricing
            </h2>
            <p className="lede mt-3">
              Every vehicle is <strong className="font-semibold text-ink">AC, regularly serviced and cleaned before each trip</strong>. Choose the one that fits your group.
            </p>
          </div>
          <BookCabButton className="btn btn-outline shrink-0">
            <Receipt size={17} aria-hidden="true" className="text-orange-600" /> Get a written quote
          </BookCabButton>
        </div>

        <div className="reveal-stagger mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
          {fleet.map((v, i) => (
            <VehicleCard key={v.id} v={v} index={i} />
          ))}
        </div>
        <p className="mx-auto mt-5 max-w-3xl text-center text-[0.8rem] italic leading-relaxed text-stone">{RATE_NOTE}</p>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* 5. No hidden charges: the written-quote receipt + Tempo Traveller   */
/* ------------------------------------------------------------------ */

export function HonestPricing() {
  const tempo = fleet.find((v) => v.id === "tempo")!;
  const sedan = fleet[0];
  const specs: { icon: LucideIcon; text: string }[] = [
    { icon: Users, text: "12 to 17 seats" },
    { icon: Snowflake, text: "AC" },
    { icon: Armchair, text: "Pushback seats" },
    { icon: Luggage, text: "Luggage space" },
    { icon: BadgeIndianRupee, text: rateLabel(tempo) },
  ];
  return (
    <section aria-labelledby="no-hidden" className="py-14 sm:py-16 lg:py-20">
      <div className="container-x">
        <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          <div className="tx-head max-w-xl">
            <Kicker>Transparent pricing</Kicker>
            <h2 id="no-hidden" className="tx-h2 mt-2.5">
              What &ldquo;no hidden charges&rdquo; means at our company
            </h2>
            <p className="lede mt-3">I use this phrase carefully, because many travellers have been burned by it. For us it means one thing:</p>
            <p className="mt-5 border-orange-500 text-[1.2rem] font-semibold leading-snug tracking-tight text-ink sm:border-l-4 sm:pl-5 sm:text-[1.35rem]">
              You see every line of your fare before you confirm, not after you arrive.
            </p>
            <p className="lede mt-5">
              Nothing gets added at the end of the journey. If something is optional, I say it is optional.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <BookCabButton className={primaryBtn}>
                Ask for my written quote <ArrowRight size={17} aria-hidden="true" className="btn-arrow" />
              </BookCabButton>
            </div>
          </div>

          {/* The receipt */}
          <div className="tx-receipt-wrap reveal mx-auto w-full max-w-md">
            <div className="tx-receipt relative rounded-t-[1.4rem] px-6 pb-10 pt-6 sm:px-7">
              <div className="flex items-center justify-between gap-3">
                <span className="inline-flex items-center gap-2.5">
                  <span className="icon-badge size-10 rounded-xl">
                    <Receipt size={18} aria-hidden="true" />
                  </span>
                  <span className="leading-tight">
                    <span className="block text-sm font-bold text-ink">Your written quote lists:</span>
                    <span className="block text-[0.7rem] text-stone">{site.name}</span>
                  </span>
                </span>
                <span className="text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-stone">Before you pay</span>
              </div>

              <ol className="tx-perf mt-5 grid gap-3 pt-5">
                {quoteLines.map((line, i) => (
                  <li key={line} className="flex items-start gap-3 text-sm text-ink-soft">
                    <span className="tx-rate mt-px w-6 shrink-0 text-xs font-bold text-orange-600">0{i + 1}</span>
                    <span className="flex-1">{line}</span>
                    <Check size={16} aria-hidden="true" className="mt-0.5 shrink-0 text-peacock-teal" />
                  </li>
                ))}
              </ol>

              <div className="tx-perf mt-5 pt-5">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="text-sm font-bold text-ink">An example of how billing works</h3>
                  <span className="rounded-full bg-orange-50 px-2 py-0.5 text-[0.65rem] font-semibold italic text-ember-deep">Illustration only</span>
                </div>
                <dl className="mt-3 grid gap-2 text-sm">
                  <div className="flex items-baseline justify-between gap-3">
                    <dt className="text-ink-soft">
                      Sedan trip of 100 km at {rateLabel(sedan)}
                    </dt>
                    <dd className="tx-rate font-bold text-ink">{formatInr(100 * sedan.rate.min)}</dd>
                  </div>
                  <div className="flex items-baseline justify-between gap-3">
                    <dt className="text-ink-soft">Tolls and parking</dt>
                    <dd className="text-right text-xs font-semibold text-ink">At actuals, on your quote</dd>
                  </div>
                </dl>
                <p className="mt-3 text-xs leading-relaxed text-stone">Local sightseeing and airport transfers are priced as fixed packages (see below), so you know the total upfront.</p>
              </div>

              <p className="tx-stamp absolute -right-2 bottom-9 rounded-lg px-2.5 py-1 text-center text-[0.62rem] font-bold uppercase leading-tight tracking-[0.12em] text-peacock-teal sm:-right-5">
                Nothing added
                <br />
                at the end
              </p>
            </div>
          </div>
        </div>

        {/* Tempo Traveller on rent */}
        <article aria-labelledby="tempo-title" className="reveal mt-14 grid overflow-hidden rounded-[1.75rem] border border-orange-100 bg-linear-to-br from-orange-50 via-white to-amber-50/60 md:grid-cols-[0.95fr_1.05fr]">
          <div className="relative min-h-60 md:min-h-full">
            <Image src={photos[tempo.image].src} alt={photos[tempo.image].alt} fill placeholder="blur" sizes="(min-width: 768px) 46vw, 100vw" className="object-cover" />
            <span className="absolute left-4 top-4 rounded-full bg-cocoa/88 px-3 py-1 text-xs font-semibold text-white backdrop-blur">For groups of 12 to 17</span>
          </div>
          <div className="p-6 text-center sm:p-8 sm:text-left lg:p-10">
            <Kicker>Group travel</Kicker>
            <h3 id="tempo-title" className="mt-2.5 text-[clamp(1.25rem,1.1rem+0.6vw,1.6rem)] font-bold leading-tight tracking-tight">
              Need a Tempo Traveller on rent in Mathura?
            </h3>
            <p className="mt-3 text-[0.95rem] leading-relaxed text-ink-soft">
              For groups, a <strong className="font-semibold text-ink">Tempo Traveller on rent in Mathura</strong> is the most comfortable and economical choice. It seats{" "}
              <strong className="font-semibold text-ink">12 to 17</strong> with AC, pushback seats and luggage space, and it keeps the whole family or satsang group in one vehicle. This is the
              vehicle I recommend for temple groups, bhajan mandalis and big family yatras. Tell me your headcount and dates, and I will quote you the right size.
            </p>
            <ul className="mt-5 flex flex-wrap justify-center gap-2 sm:justify-start">
              {specs.map(({ icon: Icon, text }) => (
                <li key={text} className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-ink-soft ring-1 ring-orange-100">
                  <Icon size={14} aria-hidden="true" className="text-orange-600" /> {text}
                </li>
              ))}
            </ul>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <BookCabButton vehicle="tempo" className={primaryBtn}>
                Quote for my group <ArrowRight size={17} aria-hidden="true" className="btn-arrow" />
              </BookCabButton>
              <WhatsappButton message={waMessage(`a Tempo Traveller (12 to 17 seater) for my group`)} label="Ask on WhatsApp" />
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* 6. Packages bento + routes board                                    */
/* ------------------------------------------------------------------ */

function PriceTag({ amount, light = false }: { amount: number; light?: boolean }) {
  return (
    <p className={`inline-flex items-baseline gap-1 rounded-full px-3 py-1 ${light ? "bg-white/10 text-white ring-1 ring-white/15" : "bg-orange-50 text-ink ring-1 ring-orange-100"}`}>
      <span className={`text-[0.65rem] font-semibold uppercase tracking-[0.12em] ${light ? "text-orange-200" : "text-ember-deep"}`}>from</span>
      <span className="tx-rate text-base font-bold">{formatInr(amount)}</span>
    </p>
  );
}

function CardIcon({ icon: Icon }: { icon: LucideIcon }) {
  return (
    <span className="icon-badge size-11 rounded-2xl">
      <Icon size={20} aria-hidden="true" />
    </span>
  );
}

export function Packages() {
  return (
    <section id="packages" aria-labelledby="packages-title" className="bg-[#fffaf3] py-14 sm:py-16 lg:py-20">
      <div className="container-x">
        <div className="tx-head tx-head-center max-w-2xl text-center">
          <Kicker className="justify-center">Trips we run every day</Kicker>
          <h2 id="packages-title" className="tx-h2 mt-2.5">
            Top Taxi Packages &amp; Popular Routes
          </h2>
        </div>

        <div className="reveal-stagger mt-8 grid gap-4 lg:grid-cols-12 lg:gap-5">
          {/* Local sightseeing */}
          <article aria-labelledby="pkg-local" className="flex flex-col rounded-[1.5rem] border border-line bg-white p-5 shadow-soft sm:p-7 lg:col-span-7">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <CardIcon icon={Landmark} />
                <h3 id="pkg-local" className="text-lg font-bold leading-tight sm:text-xl">
                  Local Sightseeing Tour (Same Day)
                </h3>
              </div>
              <PriceTag amount={localTour.price} />
            </div>
            <p className="mt-4 text-[0.95rem] leading-relaxed text-ink-soft">
              Looking for a <strong className="font-semibold text-ink">Mathura local sightseeing cab</strong> that does not rush you? Our same-day city tour covers the heart of Braj, and{" "}
              <strong className="font-semibold text-ink">packages start at {formatInr(localTour.price)}</strong> for local city tours, depending on vehicle and route.
            </p>
            <div className="mt-5 grid gap-5 sm:grid-cols-[1.15fr_0.85fr]">
              <div>
                <h4 className="text-sm font-bold text-ink">A typical route:</h4>
                <ol className="tx-timeline mt-3 grid gap-3">
                  {localTour.stops.map((s, i) => (
                    <li key={s.place} className="relative flex gap-3 text-sm">
                      <span className={`relative z-10 grid size-6 shrink-0 place-items-center rounded-full text-[0.65rem] font-bold ${i === 0 || i === localTour.stops.length - 1 ? "bg-orange-500 text-white" : "bg-white text-orange-600 ring-2 ring-orange-300"}`}>
                        {i + 1}
                      </span>
                      <span className="leading-snug text-ink-soft">
                        <strong className="font-semibold text-ink">{s.place}</strong>
                        {s.when && ` ${s.when}`}
                      </span>
                    </li>
                  ))}
                </ol>
              </div>
              <div className="relative hidden min-h-48 overflow-hidden rounded-2xl sm:block">
                <Image src={photos["prem-mandir-night"].src} alt={photos["prem-mandir-night"].alt} fill placeholder="blur" sizes="(min-width: 1024px) 22vw, 40vw" className="object-cover" />
                <span className="absolute inset-x-2 bottom-2 rounded-xl bg-cocoa/80 px-3 py-2 text-[0.7rem] font-medium text-white backdrop-blur">Prem Mandir, for the evening lights</span>
              </div>
            </div>
            <p className="mt-5 rounded-2xl bg-[#fffaf3] p-4 text-sm leading-relaxed text-ink-soft ring-1 ring-orange-100">
              <strong className="font-semibold text-ink">What you get:</strong> {localTour.includes}
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <BookCabButton trip="Local sightseeing (same day)" className={`${primaryBtn} btn-sm`}>
                Book a sightseeing cab <ArrowRight size={15} aria-hidden="true" className="btn-arrow" />
              </BookCabButton>
            </div>
          </article>

          {/* Airport */}
          <article aria-labelledby="pkg-airport" className="tx-dark-card flex flex-col rounded-[1.5rem] p-5 text-white shadow-lift sm:p-7 lg:col-span-5">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <span className="grid size-11 place-items-center rounded-2xl bg-linear-to-br from-orange-500 to-amber-500">
                <Plane size={20} aria-hidden="true" />
              </span>
              <PriceTag amount={airport.price} light />
            </div>
            <h3 id="pkg-airport" className="mt-4 text-lg font-bold leading-tight text-white sm:text-xl">
              Delhi Airport to Mathura/Vrindavan Drop
            </h3>

            {/* Boarding pass */}
            <div className="mt-4 rounded-2xl bg-white/[0.06] p-4 ring-1 ring-white/10">
              <div className="flex items-center gap-3 text-sm font-semibold">
                <span className="leading-tight">
                  <span className="block text-[0.62rem] font-medium uppercase tracking-[0.14em] text-orange-200">From</span>
                  Delhi IGI
                </span>
                <span className="relative flex flex-1 items-center" aria-hidden="true">
                  <span className="tx-perf-light w-full" />
                  <Plane size={15} className="absolute left-1/2 -translate-x-1/2 rotate-45 bg-transparent text-orange-300" />
                </span>
                <span className="text-right leading-tight">
                  <span className="block text-[0.62rem] font-medium uppercase tracking-[0.14em] text-orange-200">To</span>
                  Mathura / Vrindavan
                </span>
              </div>
              <p className="tx-perf-light mt-3 flex justify-between pt-2.5 text-xs text-white/70">
                <span>150 to 160 km</span>
                <span>3 to 3.5 hrs</span>
              </p>
            </div>

            <p className="mt-4 text-sm leading-relaxed text-white/75">
              The <strong className="font-semibold text-white">Delhi to Mathura Vrindavan taxi</strong> is our most booked route. The distance from{" "}
              <strong className="font-semibold text-white">Delhi IGI Airport</strong> to Mathura is roughly 150 to 160 km, usually 3 to 3.5 hours via the Yamuna Expressway or NH-19, depending on
              traffic.
            </p>
            <ul className="mt-4 grid gap-2">
              {airport.features.map((f) => (
                <li key={f.title} className="flex gap-2.5 text-sm text-white/75">
                  <Check size={16} aria-hidden="true" className="mt-0.5 shrink-0 text-orange-300" />
                  <span>
                    <strong className="font-semibold text-white">{f.title}</strong> {f.text}
                  </span>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-xs leading-relaxed text-white/60">
              We also do pickups from Delhi, Noida and Gurugram railway stations and hotels, plus <strong className="font-semibold text-white/85">Agra Airport and Mathura Junction</strong>.
            </p>
            <div className="mt-auto pt-5">
              <BookCabButton trip="Delhi airport to Mathura/Vrindavan" className="btn btn-white btn-sm">
                Book an airport transfer <ArrowRight size={15} aria-hidden="true" className="btn-arrow" />
              </BookCabButton>
            </div>
          </article>

          {/* Outstation */}
          <article aria-labelledby="pkg-outstation" className="flex flex-col overflow-hidden rounded-[1.5rem] border border-line bg-white shadow-soft lg:col-span-5">
            <div className="relative aspect-[16/8] overflow-hidden">
              <Image src={photos["taj-mahal"].src} alt={photos["taj-mahal"].alt} fill placeholder="blur" sizes="(min-width: 1024px) 40vw, 100vw" className="object-cover" />
              <span className="absolute bottom-3 left-3 inline-flex items-center gap-1.5 rounded-full bg-white/92 px-3 py-1 text-xs font-semibold text-ink backdrop-blur">
                <RouteIcon size={13} aria-hidden="true" className="text-orange-600" /> Agra is 55 to 60 km away
              </span>
            </div>
            <div className="flex flex-1 flex-col p-5 sm:p-7">
              <h3 id="pkg-outstation" className="text-lg font-bold leading-tight sm:text-xl">
                Outstation Tours: Agra, Jaipur and Beyond
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-ink-soft">
                Many pilgrims combine Braj with history. Our <strong className="font-semibold text-ink">Mathura to Agra taxi</strong> is a favourite, since{" "}
                <strong className="font-semibold text-ink">Agra is only 55 to 60 km away</strong>, about 1 to 1.5 hours.
              </p>
              <ul className="mt-4 grid gap-2.5">
                {outstation.map((o) => (
                  <li key={o.title} className="flex gap-2.5 text-sm text-ink-soft">
                    <Check size={16} aria-hidden="true" className="mt-0.5 shrink-0 text-orange-600" />
                    <span>
                      <strong className="font-semibold text-ink">{o.title}</strong> {o.text}
                    </span>
                  </li>
                ))}
              </ul>
              <div className="mt-auto pt-5">
                <BookCabButton trip="Mathura to Agra / Taj Mahal" className={`${primaryBtn} btn-sm`}>
                  Plan an outstation trip <ArrowRight size={15} aria-hidden="true" className="btn-arrow" />
                </BookCabButton>
              </div>
            </div>
          </article>

          {/* 84 Kos */}
          <article aria-labelledby="pkg-kos" className="grid overflow-hidden rounded-[1.5rem] border border-line bg-white shadow-soft sm:grid-cols-[1.25fr_0.75fr] lg:col-span-7">
            <div className="flex flex-col p-5 sm:p-7">
              <div className="flex items-center gap-3">
                <CardIcon icon={RouteIcon} />
                <h3 id="pkg-kos" className="text-lg font-bold leading-tight sm:text-xl">
                  The Complete 84 Kos Braj Yatra
                </h3>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-ink-soft">
                The <strong className="font-semibold text-ink">84 Kos Yatra taxi</strong> is a specialised service. The 84 Kos Braj Mandal is a sacred circuit of roughly{" "}
                <strong className="font-semibold text-ink">250 km</strong>, and doing it properly takes planning. Our drivers know the parikrama routes, the stops, the right timings and where to
                wait for you.
              </p>
              <h4 className="mt-4 text-sm font-bold text-ink">We cover the key stops:</h4>
              <ul className="mt-2.5 grid gap-2">
                {kosStops.map((s) => (
                  <li key={s.area} className="flex gap-2.5 text-sm text-ink-soft">
                    <MapPin size={15} aria-hidden="true" className="mt-0.5 shrink-0 text-orange-600" />
                    <span>
                      {s.href ? (
                        <Link href={s.href} className="font-semibold text-ink underline decoration-orange-300 decoration-2 underline-offset-[3px] hover:text-ember-deep">
                          {s.area.replace(/[,:]$/, "")}
                        </Link>
                      ) : (
                        <strong className="font-semibold text-ink">{s.area.replace(/[,:]$/, "")}</strong>
                      )}
                      {s.area.endsWith(",") ? "," : ":"} {s.places}
                    </span>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-sm leading-relaxed text-ink-soft">
                You can book it as a <strong className="font-semibold text-ink">multi-day package with a dedicated driver,</strong> or as shorter segments, such as a Govardhan Parikrama day with
                vehicle support or a <strong className="font-semibold text-ink">Barsana and Nandgaon combined day trip.</strong> Because Braj temples and routes vary by season and festival, I plan
                the sequence personally.
              </p>
              <div className="mt-auto flex flex-wrap gap-3 pt-5">
                <BookCabButton trip="84 Kos Braj Yatra" className={`${primaryBtn} btn-sm`}>
                  Plan my 84 Kos Yatra <ArrowRight size={15} aria-hidden="true" className="btn-arrow" />
                </BookCabButton>
              </div>
            </div>
            <div className="relative hidden min-h-full sm:block">
              <Image src={photos["govardhan-hill"].src} alt={photos["govardhan-hill"].alt} fill placeholder="blur" sizes="(min-width: 1024px) 22vw, 36vw" className="object-cover" />
              <div className="absolute inset-0 bg-linear-to-t from-cocoa/60 via-transparent to-transparent" aria-hidden="true" />
              <p className="absolute inset-x-3 bottom-3 text-xs font-medium text-white">Govardhan, on the parikrama route</p>
            </div>
          </article>
        </div>

        <RoutesBoard />
      </div>
    </section>
  );
}

function RoutesBoard() {
  return (
    <div className="reveal tx-board mt-5 overflow-hidden rounded-[1.75rem] p-5 text-white sm:p-8">
      <div className="flex flex-col items-center gap-3 text-center sm:flex-row sm:justify-between sm:text-left">
        <div>
          <Kicker light className="justify-center sm:justify-start">
            Distances and drive times
          </Kicker>
          <h3 id="routes-title" className="mt-2 text-[clamp(1.2rem,1.05rem+0.6vw,1.55rem)] font-bold text-white">
            Popular Routes at a Glance
          </h3>
        </div>
        <span className="inline-flex items-center gap-2 rounded-full bg-white/[0.07] px-3 py-1.5 text-xs font-semibold text-white/80 ring-1 ring-white/10">
          <span className="tx-live-dot" aria-hidden="true" /> Cabs on every route, 24/7
        </span>
      </div>

      <table className="mt-6 w-full border-separate border-spacing-0 text-left text-sm" aria-labelledby="routes-title">
        <thead className="max-sm:sr-only">
          <tr className="text-[0.65rem] uppercase tracking-[0.16em] text-orange-200/80">
            <th scope="col" className="border-b border-white/10 pb-3 font-semibold">
              Route
            </th>
            <th scope="col" className="border-b border-white/10 pb-3 font-semibold">
              Approx. distance
            </th>
            <th scope="col" className="border-b border-white/10 pb-3 font-semibold">
              Approx. time
            </th>
            <th scope="col" className="border-b border-white/10 pb-3 text-right font-semibold">
              <span className="sr-only">Book</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {routes.map((r) => (
            <tr key={r.from + r.to} className="tx-board-row max-sm:grid max-sm:grid-cols-[1fr_auto] max-sm:gap-x-3 max-sm:gap-y-1 max-sm:border-b max-sm:border-white/10 max-sm:py-3.5">
              <th scope="row" className="py-3.5 pr-4 font-semibold sm:border-b sm:border-white/10 max-sm:col-span-2 max-sm:py-0">
                <span className="inline-flex flex-wrap items-center gap-x-2 gap-y-0.5">
                  {r.from}
                  <ArrowRight size={14} aria-hidden="true" className="text-orange-400" />
                  <span className="sr-only">to</span>
                  {r.href ? (
                    <Link href={r.href} className="underline decoration-white/25 underline-offset-4 hover:text-orange-200 hover:decoration-orange-300">
                      {r.to}
                    </Link>
                  ) : (
                    r.to
                  )}
                </span>
              </th>
              <td className="tx-board-cell py-3.5 pr-4 text-orange-200 sm:border-b sm:border-white/10 max-sm:py-0 max-sm:text-xs">
                <span className="sm:hidden">Distance: </span>
                {r.distance}
              </td>
              <td className="tx-board-cell py-3.5 pr-4 text-white/80 sm:border-b sm:border-white/10 max-sm:col-start-1 max-sm:py-0 max-sm:text-xs">
                <span className="sm:hidden">Time: </span>
                {r.time}
              </td>
              <td className="py-3.5 text-right sm:border-b sm:border-white/10 max-sm:col-start-2 max-sm:row-span-2 max-sm:row-start-2 max-sm:self-center max-sm:py-0">
                <BookCabButton
                  notes={`Route: ${r.from} to ${r.to}`}
                  label={`Book a cab from ${r.from} to ${r.to}`}
                  className="inline-flex items-center gap-1 rounded-full bg-white/[0.08] px-3 py-1.5 text-xs font-semibold text-white ring-1 ring-white/15 transition-colors hover:bg-orange-500 hover:ring-orange-500"
                >
                  Book <ArrowUpRight size={13} aria-hidden="true" />
                </BookCabButton>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="mt-4 text-xs italic text-white/55">Times vary with traffic, fog (December and January) and festival diversions.</p>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* 7. Why choose us                                                    */
/* ------------------------------------------------------------------ */

export function WhyUs() {
  const reasons: { icon: LucideIcon; title: string; body: React.ReactNode }[] = [
    {
      icon: UserRound,
      title: "Local Brijwasi drivers",
      body: (
        <>
          Our drivers are <strong className="font-semibold text-ink">born or raised in Braj.</strong> They know which lane is closed on Ekadashi, where to drop you for Banke Bihari so you do not
          walk an extra kilometre and which parking spot is safe near each temple. They also work as <strong className="font-semibold text-ink">basic guides,</strong> telling you the story of
          each place as you arrive. You get local knowledge for the price of a cab.
        </>
      ),
    },
    {
      icon: ShieldCheck,
      title: "Safety first",
      body: (
        <ul className="mt-1 grid gap-2">
          {safetyPoints.map((s) => (
            <li key={s.title} className="flex gap-2.5">
              <Check size={16} aria-hidden="true" className="mt-0.5 shrink-0 text-peacock-teal" />
              <span>
                <strong className="font-semibold text-ink">{s.title}</strong> {s.text}
              </span>
            </li>
          ))}
        </ul>
      ),
    },
    {
      icon: Hourglass,
      title: "Flexibility: no rushing at the temple",
      body: (
        <>
          Pilgrims should not be hurried. Waiting time at temples is built into our planning, and your driver will not nag you to leave. If you want to sit another half hour at Nidhivan or the
          Vishram Ghat aarti, you sit. I would rather lose an hour than have a devotee feel rushed.
        </>
      ),
    },
    {
      icon: Wallet,
      title: "Protection from overcharging",
      body: (
        <>
          Rogue drivers at stations and bus stands are the single biggest complaint I hear. With us, <strong className="font-semibold text-ink">the fare is agreed before you travel,</strong> and
          your quote is in writing. If a driver ever asks for more than what you agreed, call me directly.
        </>
      ),
    },
    {
      icon: Star,
      title: "Experience that shows",
      body: (
        <>
          Since <strong className="font-semibold text-ink">{FOUNDED},</strong> we have served <strong className="font-semibold text-ink">over {PILGRIMS.replace("+", "")} pilgrims,</strong> many of
          them elderly parents travelling with their children, and many of them return. That is the review I care about most.
        </>
      ),
    },
  ];
  const lane = photos["banke-bihari-lane"];
  return (
    <section aria-labelledby="why-us" className="py-14 sm:py-16 lg:py-20">
      <div className="container-x grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <div className="tx-head max-w-xl">
            <Kicker>Why families come back</Kicker>
            <h2 id="why-us" className="tx-h2 mt-2.5">
              Why Choose {site.name} for Your Cabs?
            </h2>
            <p className="lede mt-3">There are plenty of Vrindavan cab booking options online. Here is why families keep coming back to us.</p>
          </div>
          <figure className="reveal relative mt-7 hidden aspect-[5/4] overflow-hidden rounded-[1.6rem] sm:block">
            <Image src={lane.src} alt={lane.alt} fill placeholder="blur" sizes="(min-width: 1024px) 34vw, 92vw" className="object-cover" />
            <div className="absolute inset-0 bg-linear-to-t from-cocoa/85 via-cocoa/20 to-transparent" aria-hidden="true" />
            <figcaption className="absolute inset-x-0 bottom-0 p-5 text-white sm:p-6">
              <p className="text-lg font-semibold leading-snug">&ldquo;I would rather lose an hour than have a devotee feel rushed.&rdquo;</p>
              <p className="mt-2 text-xs text-white/70">{FOUNDER.name}, Founder</p>
            </figcaption>
          </figure>
        </div>

        <ol className="reveal-stagger grid gap-3.5">
          {reasons.map(({ icon: Icon, title, body }, i) => (
            <li key={title} className="group relative grid grid-cols-[auto_1fr] gap-4 rounded-[1.4rem] border border-line bg-white p-5 shadow-soft transition-colors hover:border-orange-200 sm:p-6">
              <div className="flex flex-col items-center gap-2">
                <span className="icon-badge size-11 rounded-2xl">
                  <Icon size={20} aria-hidden="true" />
                </span>
                <span className="tx-rate text-[0.7rem] font-bold text-stone">0{i + 1}</span>
              </div>
              <div>
                <h3 className="text-base font-bold leading-snug sm:text-lg">{title}</h3>
                <div className="mt-1.5 text-sm leading-relaxed text-ink-soft">{body}</div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* 8. What's included                                                  */
/* ------------------------------------------------------------------ */

const inclusionIcons: Record<string, LucideIcon> = {
  Vehicle: CarFront,
  Driver: UserRound,
  Fuel,
  "Tolls and parking": SquareParking,
  "Waiting time": Hourglass,
  "Night pickups": Moon,
  Payment: Wallet,
};

export function Included() {
  return (
    <section aria-labelledby="included" className="bg-[#fffaf3] py-14 sm:py-16 lg:py-20">
      <div className="container-x">
        <div className="tx-head max-w-2xl">
          <Kicker>Before you book</Kicker>
          <h2 id="included" className="tx-h2 mt-2.5">
            What Is Included and What to Expect
          </h2>
        </div>
        <dl className="reveal-stagger mt-8 grid gap-3.5 sm:grid-cols-2 lg:grid-cols-4">
          {inclusions.map(({ item, text }) => {
            const Icon = inclusionIcons[item] ?? Check;
            return (
              <div key={item} className="rounded-[1.25rem] border border-line bg-white p-5 shadow-soft transition-colors hover:border-orange-200">
                <dt className="flex items-center gap-3 text-sm font-bold text-ink">
                  <span className="grid size-9 place-items-center rounded-xl bg-orange-50 text-orange-600 ring-1 ring-orange-100">
                    <Icon size={17} aria-hidden="true" />
                  </span>
                  {item}
                </dt>
                <dd className="mt-3 text-sm leading-relaxed text-ink-soft">{text}</dd>
              </div>
            );
          })}
          <div className="flex flex-col justify-between gap-4 rounded-[1.25rem] bg-cocoa p-5 text-white">
            <dt className="text-sm font-bold text-white">Questions about your fare?</dt>
            <dd className="flex flex-col gap-2">
              <BookCabButton className="btn btn-primary btn-sm">
                Get a written quote <ArrowRight size={15} aria-hidden="true" className="btn-arrow" />
              </BookCabButton>
              <WhatsappButton message="Radhe Radhe! I have a question about a cab fare." label="Ask on WhatsApp" className="btn btn-whatsapp btn-sm" />
            </dd>
          </div>
        </dl>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* 9. FAQs                                                             */
/* ------------------------------------------------------------------ */

export function TaxiFaqs() {
  const tel = phoneHref();
  return (
    <section aria-labelledby="taxi-faqs" className="py-14 sm:py-16 lg:py-20">
      <div className="container-x grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-14">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <div className="tx-head max-w-md">
            <Kicker>Questions pilgrims ask</Kicker>
            <h2 id="taxi-faqs" className="tx-h2 mt-2.5">
              Frequently Asked Questions About Mathura Vrindavan Taxi Services
            </h2>
          </div>
          <div className="mt-6 hidden rounded-[1.4rem] border border-line bg-[#fffaf3] p-5 lg:block">
            <p className="text-sm font-semibold text-ink">Did not find your answer?</p>
            <p className="mt-1 text-sm text-stone">Ask {FOUNDER.name} directly, 24/7.</p>
            <div className="mt-4 flex flex-col gap-2">
              <WhatsappButton message="Radhe Radhe! I have a question about booking a cab." label="Ask on WhatsApp" className="btn btn-whatsapp btn-sm" />
              {tel && (
                <a href={tel} className="btn btn-outline btn-sm">
                  <Phone size={15} aria-hidden="true" className="text-orange-600" /> Call {site.contact.phone}
                </a>
              )}
            </div>
          </div>
        </div>

        <div className="overflow-hidden rounded-[1.4rem] border border-line bg-white shadow-soft">
          {taxiFaqs.map((f, i) => (
            <details key={f.q} className="tx-faq border-b border-line transition-colors last:border-b-0" name="taxi-faq">
              <summary className="flex items-start gap-3.5 px-4 py-4 text-left sm:px-6">
                <span className="tx-rate mt-0.5 w-6 shrink-0 text-xs font-bold text-orange-600">{String(i + 1).padStart(2, "0")}</span>
                <span className="flex-1 text-[0.95rem] font-semibold leading-snug text-ink">{f.q}</span>
                <span className="tx-faq-icon grid size-7 shrink-0 place-items-center rounded-full bg-orange-50 text-orange-600">
                  <Plus size={15} aria-hidden="true" />
                </span>
              </summary>
              <p className="pb-5 pl-[3.25rem] pr-5 text-sm leading-relaxed text-ink-soft sm:pl-[3.75rem] sm:pr-8 sm:text-[0.95rem]">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* 10. Book Your Cab Instantly                                         */
/* ------------------------------------------------------------------ */

const needIcons: LucideIcon[] = [MapPin, Users, Landmark, CalendarDays];

export function BookInstantly() {
  const tel = phoneHref();
  const wa = whatsappLink(waMessage("a cab"));
  const updated = new Date(`${TAXI_UPDATED}T00:00:00`).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });
  return (
    <section aria-labelledby="book-now" className="pb-16 pt-2 sm:pb-20">
      <div className="container-x">
        <div className="tx-cta reveal relative overflow-hidden rounded-[2rem] p-6 text-white sm:p-10 lg:p-12">
          <div className="tx-road-line absolute inset-x-0 top-0 opacity-70" aria-hidden="true" />
          <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-12">
            <div className="text-center sm:text-left">
              <Kicker light className="justify-center sm:justify-start">
                Book in advance
              </Kicker>
              <h2 id="book-now" className="tx-h2 mt-2.5 text-white">
                Book Your Cab Instantly
              </h2>
              <p className="mt-3 text-[0.95rem] leading-relaxed text-white/75">
                Do not leave your transport to chance when you arrive in a crowded pilgrimage town. <strong className="font-semibold text-white">Book in advance,</strong> especially around{" "}
                <strong className="font-semibold text-white">Holi, Janmashtami, Radhashtami, Diwali and the winter weekends,</strong> when good vehicles and trusted drivers disappear weeks ahead.
              </p>
              <h3 className="mt-6 text-sm font-semibold text-orange-200">Here is all I need from you:</h3>
              <ul className="mt-3 grid gap-2.5 text-left sm:grid-cols-2">
                {bookingNeeds.map((n, i) => {
                  const Icon = needIcons[i];
                  return (
                    <li key={n.title} className="flex items-start gap-3 rounded-2xl bg-white/[0.06] p-3.5 text-sm ring-1 ring-white/10">
                      <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-orange-500/15 text-orange-300">
                        <Icon size={16} aria-hidden="true" />
                      </span>
                      <span className="text-white/70">
                        <strong className="font-semibold text-white">{n.title}</strong> {n.text}
                      </span>
                    </li>
                  );
                })}
              </ul>
              <p className="mt-5 text-sm text-white/75">
                I will reply personally with a <strong className="font-semibold text-white">clear written quote and no hidden charges,</strong> usually within the hour.
              </p>
            </div>

            <div className="flex flex-col gap-3 rounded-[1.5rem] bg-white/[0.05] p-5 ring-1 ring-white/10 sm:p-6">
              <BookCabButton className="btn btn-primary h-13 w-full text-[0.95rem]">
                <CarFront size={19} aria-hidden="true" /> Open the booking form
                <ArrowRight size={17} aria-hidden="true" className="btn-arrow" />
              </BookCabButton>
              {wa && (
                <a href={wa} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp h-13 w-full text-[0.95rem]">
                  <WhatsappIcon size={20} /> WhatsApp {FOUNDER.name} (24/7)
                  <span className="sr-only"> (opens WhatsApp)</span>
                </a>
              )}
              {tel && (
                <a href={tel} className="btn btn-outline-light h-12 w-full">
                  <Phone size={17} aria-hidden="true" /> Call {site.contact.phone}
                </a>
              )}
              <a href={mailtoHref("Cab booking")} className="btn btn-outline-light h-12 w-full">
                <Mail size={17} aria-hidden="true" /> {site.contact.email}
              </a>
              <Link href="/tour-packages" className="mt-1 inline-flex items-center justify-center gap-1.5 text-sm font-semibold text-orange-200 hover:text-white hover:underline">
                <Globe size={15} aria-hidden="true" /> Book online: Mathura Vrindavan Tour Packages
              </Link>
            </div>
          </div>

          <div className="mt-9 border-t border-white/10 pt-6">
            <ul className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs font-medium text-white/70 lg:justify-start">
              <li>
                <strong className="font-semibold text-white">{site.name}</strong>: serving pilgrims since {FOUNDED}
              </li>
              <li className="inline-flex items-center gap-1.5">
                <Star size={13} aria-hidden="true" className="fill-amber-400 text-amber-400" /> {RATING}-star rated
              </li>
              <li className="inline-flex items-center gap-1.5">
                <HeartHandshake size={13} aria-hidden="true" className="text-orange-300" /> {PILGRIMS} pilgrims served safely
              </li>
              <li className="inline-flex items-center gap-1.5">
                <CarFront size={13} aria-hidden="true" className="text-orange-300" /> Sedans from {rateLabel(fleet[0])}
              </li>
            </ul>
            <div className="mt-5 flex flex-col items-center justify-between gap-3 text-center sm:flex-row sm:text-left">
              <p className="text-sm text-white/85">
                Radhe Radhe. Your journey begins the moment you call.
                <span className="mt-0.5 block text-xs italic text-white/55">
                  {FOUNDER.name}, Founder, {site.name}
                </span>
              </p>
              <p className="text-[0.7rem] text-white/45">
                Last updated <time dateTime={TAXI_UPDATED}>{updated}</time>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
