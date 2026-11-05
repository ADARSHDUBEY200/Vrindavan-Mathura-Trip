import Link from "next/link";
import { ArrowRight, ArrowUpRight, BedDouble, Car, Footprints, Info, Plane, TrainFront, Zap, type LucideIcon } from "lucide-react";
import { PackageCard } from "@/components/cards/PackageCard";
import { SeasonCards, SectionHead, YearBar } from "@/components/destination/kit";
import { alleys, bestTime, nearby, pics, reach, stay, twoDays } from "@/content/vrindavan";
import { getPackages } from "@/content/packages";
import { EnquiryTrigger } from "./EnquiryTrigger";
import { Prose, Shot } from "./kit";

export function AlleysSection() {
  return (
    <section id={alleys.id} aria-labelledby="alleys-title" className="dg-section dg-cream">
      <div className="container-x grid items-start gap-8 lg:grid-cols-12 lg:gap-14">
        <div className="dg-photo dg-photo-lg reveal-zoom aspect-[4/3] lg:sticky lg:top-40 lg:col-span-5 lg:aspect-[4/5]">
          <Shot pic={pics.lane} sizes="(min-width: 1024px) 40vw, 92vw" className="object-cover object-[50%_60%]" />
        </div>
        <div className="lg:col-span-7">
          <SectionHead id="alleys-title" eyebrow="Walking the lanes" title={alleys.title} lede={alleys.lede} />
          <ol className="dg-rules mt-5">
            {alleys.rules.map((r) => (
              <li key={r}>
                <Prose text={r} />
              </li>
            ))}
          </ol>
          <p className="dg-note mt-5">
            <Info size={17} aria-hidden="true" />
            <span>{alleys.close}</span>
          </p>
        </div>
      </div>
    </section>
  );
}

/** The year as one bar: colour names the season, a rule beneath marks the best months, labels are always visible. */
export function BestTimeSection() {
  return (
    <section id={bestTime.id} aria-labelledby="best-time-title" className="dg-section">
      <div className="container-x">
        <div className="grid items-center gap-8 lg:grid-cols-12 lg:gap-14">
          <SectionHead id="best-time-title" eyebrow="When to come" title={bestTime.title} lede={<Prose text={bestTime.lede} />} className="lg:col-span-7" />
          <div className="dg-photo dg-photo-lg relative hidden aspect-[16/10] lg:col-span-5 lg:block">
            <Shot pic={bestTime.picture} sizes="38vw" />
          </div>
        </div>

        <div className="mt-8">
          <YearBar months={bestTime.months} showBest />
        </div>
        <div className="mt-6">
          <SeasonCards seasons={bestTime.seasons} />
        </div>

        <h3 className="dg-h3 mt-10">{bestTime.peaksTitle.replace(/:$/, "")}</h3>
        <ul className="reveal-stagger mt-4 grid gap-3 md:grid-cols-3">
          {bestTime.peaks.map((p) => (
            <li key={p.name}>
              <Link href={p.href} className="dg-card dg-lift group block h-full p-5">
                <span className="dg-label">{p.when}</span>
                <span className="dg-h4 mt-1.5 flex items-center justify-between gap-2">
                  {p.name}
                  <ArrowUpRight size={16} aria-hidden="true" className="text-ember-deep transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </span>
                <span className="dg-small mt-2 block">{p.text}</span>
              </Link>
            </li>
          ))}
        </ul>

        <p className="dg-body mt-6 max-w-3xl">
          <Prose text={bestTime.close} />
        </p>
      </div>
    </section>
  );
}

const REACH_ICON: Record<string, LucideIcon> = { air: Plane, train: TrainFront, road: Car };
const AROUND_ICON: Record<string, LucideIcon> = { "E-rickshaws": Zap, "Private car": Car, Walking: Footprints };

export function ReachSection() {
  const max = Math.max(...reach.distances.map((d) => d.km));
  return (
    <section id={reach.id} aria-labelledby="reach-title" className="dg-section dg-cream">
      <div className="container-x">
        <div className="grid items-end gap-6 lg:grid-cols-2 lg:gap-14">
          <SectionHead id="reach-title" eyebrow="Getting here" title={reach.title} lede={reach.lede} />
          <ul className="dg-card grid gap-3.5 p-5">
            {reach.distances.map((d) => (
              <li key={d.from} className="text-sm">
                <p className="flex justify-between gap-4 text-ink">
                  <span className="font-medium">{d.from}</span>
                  <span className="text-stone">{d.label}</span>
                </p>
                <span className="dg-distance" style={{ width: `${(d.km / max) * 100}%` }} aria-hidden="true" />
              </li>
            ))}
          </ul>
        </div>

        <div className="reveal-stagger mt-6 grid gap-4 lg:grid-cols-3">
          {reach.modes.map((m) => {
            const Icon = REACH_ICON[m.key];
            return (
              <div key={m.key} className="dg-card p-5 sm:p-6">
                <h3 className="dg-h4 flex items-center gap-3">
                  <span className="dg-icon">
                    <Icon size={18} aria-hidden="true" />
                  </span>
                  {m.title}
                </h3>
                <ul className="dg-bullets mt-4">
                  {m.points.map((p) => (
                    <li key={p}>
                      <Prose text={p} />
                    </li>
                  ))}
                </ul>
                {m.note && (
                  <p className="dg-small mt-4 border-t border-line pt-4">
                    <Prose text={m.note} />
                  </p>
                )}
              </div>
            );
          })}
        </div>

        <div className="dg-card mt-4 p-5 sm:p-6">
          <h3 className="dg-h4">{reach.aroundTitle}</h3>
          <dl className="mt-4 grid gap-5 md:grid-cols-3 md:gap-8">
            {reach.around.map((a) => {
              const Icon = AROUND_ICON[a.name];
              return (
                <div key={a.name} className="flex gap-3">
                  <span className="dg-icon size-9">
                    <Icon size={16} aria-hidden="true" />
                  </span>
                  <div>
                    <dt className="text-[0.9rem] font-semibold text-ink">{a.name}</dt>
                    <dd className="dg-small mt-0.5">{a.text}</dd>
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

/** Tiles in order of distance. The first two are larger: most guests go no further. */
export function NearbySection() {
  return (
    <section id={nearby.id} aria-labelledby="nearby-title" className="dg-section">
      <div className="container-x">
        <SectionHead id="nearby-title" eyebrow="Going further" title={nearby.title} lede={<Prose text={nearby.lede} />} />
        <ul className="dg-nearby reveal-stagger mt-7">
          {nearby.places.map((p) => (
            <li key={p.name}>
              <Link href={p.href} className="dg-tile">
                <Shot pic={p.picture} sizes="(min-width: 1024px) 34vw, (min-width: 640px) 50vw, 100vw" />
                <span className="dg-tile-arrow" aria-hidden="true">
                  <ArrowUpRight size={16} />
                </span>
                <span className="dg-tile-body">
                  {p.distance && <span className="text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-[var(--dg-o300)]">{p.distance}</span>}
                  <span className="dg-h4 mt-0.5 block text-[1.1rem] text-white">{p.name}</span>
                  <span className="mt-1 block text-sm leading-snug text-white/85">{p.text}</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function TwoDaysSection() {
  const pkgs = getPackages(twoDays.packageSlugs);
  return (
    <section aria-labelledby="two-days-title" className="dg-section dg-cream">
      <div className="container-x">
        <SectionHead id="two-days-title" eyebrow="A simple plan" title={twoDays.title} lede={twoDays.lede} />

        <ol className="reveal-stagger mt-7 grid gap-3 md:grid-cols-3">
          {twoDays.days.map((d, i) => (
            <li key={d.label} className={`dg-card p-5 ${i === twoDays.days.length - 1 ? "border-dashed bg-white/60 shadow-none" : ""}`}>
              <span className="dg-num">{d.label}</span>
              <ul className="dg-steps mt-4">
                {d.stops.map((s) => (
                  <li key={s} className="text-[0.95rem] font-medium leading-snug text-ink">
                    {s}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ol>

        <h3 className="dg-h3 mt-10">{twoDays.packagesTitle}</h3>
        <ul className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {pkgs.map((p) => (
            <li key={p.slug}>
              <PackageCard pkg={p} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/** The range of stays, plainest to most comfortable, beside the offer. */
export function StaySection() {
  return (
    <section id={stay.id} aria-labelledby="stay-title" className="dg-section">
      <div className="container-x">
        <div className="dg-wash grid items-center gap-8 rounded-[1.75rem] border border-[var(--dg-o100)] p-6 sm:p-9 lg:grid-cols-12 lg:gap-12 lg:p-11">
          <div className="lg:col-span-7">
            <p className="eyebrow">Rest</p>
            <h2 id="stay-title" className="dg-h2 mt-3">
              {stay.title}
            </h2>
            <div className="dg-prose dg-body mt-4">
              {stay.paragraphs.map((p) => (
                <p key={p}>
                  <Prose text={p} />
                </p>
              ))}
            </div>
            <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
              <EnquiryTrigger className="btn btn-dark">
                Tell me your budget and needs
                <ArrowRight size={17} aria-hidden="true" className="btn-arrow" />
              </EnquiryTrigger>
              <Link href={stay.guide.href} className="dg-link text-sm">
                {stay.guide.label}
              </Link>
            </div>
          </div>
          <ol className="reveal-stagger grid gap-2.5 lg:col-span-5" aria-label="Stays in Vrindavan, from simple to premium">
            {stay.tiers.map((t, i) => {
              const top = i === stay.tiers.length - 1;
              return (
                <li key={t} className={`flex items-center gap-3 rounded-2xl border px-4 py-3.5 text-[0.9rem] font-medium ${top ? "border-transparent bg-linear-to-r from-[var(--dg-o500)] to-[var(--dg-a500)] text-ink shadow-[0_10px_24px_-12px_rgb(249_115_22/0.6)]" : "border-line bg-white text-ink"}`}>
                  <BedDouble size={17} aria-hidden="true" className={top ? "text-ink" : "text-ember-deep"} />
                  {t}
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
