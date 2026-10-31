import Link from "next/link";
import { ArrowRight, Car, CloudRain, Footprints, Plane, Snowflake, Sun, TrainFront, Zap, type LucideIcon } from "lucide-react";
import { PackageCard } from "@/components/cards/PackageCard";
import { alleys, bestTime, nearby, pics, reach, stay, twoDays, type SeasonKey } from "@/content/vrindavan";
import { getPackages } from "@/content/packages";
import { EnquiryTrigger } from "./EnquiryTrigger";
import { Head, Prose, Shot } from "./kit";

export function AlleysSection() {
  return (
    <section id={alleys.id} aria-labelledby="alleys-title" className="vrn-dark bg-shyam">
      <div className="grid lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
        <div className="relative min-h-80 sm:min-h-[28rem] lg:min-h-full">
          <Shot pic={pics.lane} sizes="(min-width: 1024px) 40vw, 100vw" className="object-cover object-[50%_60%]" />
          <div className="absolute inset-0 bg-linear-to-t from-shyam to-transparent to-40% lg:bg-linear-to-l lg:to-30%" aria-hidden="true" />
        </div>
        <div className="container-x py-14 lg:mx-0 lg:max-w-[46rem] lg:px-14 lg:py-24">
          <Head id="alleys-title" title={alleys.title} lede={alleys.lede} />
          <ol className="vrn-lane mt-8">
            {alleys.rules.map((r) => (
              <li key={r}>
                <Prose text={r} />
              </li>
            ))}
          </ol>
          <p className="vrn-body mt-8 border-t border-white/15 pt-6">{alleys.close}</p>
        </div>
      </div>
    </section>
  );
}

const SEASON_ICON: Record<SeasonKey, LucideIcon> = { winter: Snowflake, summer: Sun, monsoon: CloudRain };

/** The year as one ribbon: colour names the season, a rule underneath marks the best months, labels are always visible. */
export function BestTimeSection() {
  return (
    <section id={bestTime.id} aria-labelledby="best-time-title" className="bg-chandan py-16 lg:py-24">
      <div className="container-x">
        <div className="grid items-end gap-8 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,0.7fr)] lg:gap-16">
          <Head id="best-time-title" title={bestTime.title} lede={<Prose text={bestTime.lede} />} />
          <div className="relative hidden aspect-[16/9] overflow-hidden rounded-lg bg-chandan-deep lg:block">
            <Shot pic={bestTime.picture} sizes="30vw" />
          </div>
        </div>

        <ol className="vrn-year mt-10">
          {bestTime.months.map((m) => (
            <li key={m.name} data-season={m.season} data-best={m.best}>
              <span aria-hidden="true">{m.name.slice(0, 3)}</span>
              <span className="sr-only">
                {m.name}: {m.season}
                {m.best === "peak" ? ", very best weather" : m.best === "good" ? ", within the best time to visit" : ""}
                {m.festival ? `, ${m.festival}` : ""}
              </span>
              {m.festival && <i aria-hidden="true" title={m.festival} />}
            </li>
          ))}
        </ol>
        <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-1 text-xs text-stone" aria-hidden="true">
          <li className="vrn-key vrn-key-best">Best weather</li>
          <li className="vrn-key vrn-key-good">Best time to visit</li>
          <li className="vrn-key vrn-key-fest">Festive peak</li>
        </ul>

        <ul className="mt-10 grid gap-px overflow-hidden rounded-lg border border-mitti/15 bg-mitti/15 md:grid-cols-3">
          {bestTime.seasons.map((s) => {
            const Icon = SEASON_ICON[s.key];
            return (
              <li key={s.key} data-season={s.key} className="vrn-season">
                <p className="flex items-center gap-2 font-semibold text-ink">
                  <Icon size={18} aria-hidden="true" />
                  {s.name}
                  {s.tag && <span className="text-sm font-normal text-stone">({s.tag})</span>}
                </p>
                <p className="vrn-display mt-1 text-xl text-ink">{s.months}</p>
                <p className="mt-2 text-[0.95rem] leading-relaxed text-stone">{s.note}</p>
              </li>
            );
          })}
        </ul>

        <h3 className="mt-12 font-semibold text-ink">{bestTime.peaksTitle}</h3>
        <dl className="mt-3 divide-y divide-mitti/15 border-y border-mitti/15">
          {bestTime.peaks.map((p) => (
            <div key={p.name} className="grid gap-x-8 gap-y-1 py-4 md:grid-cols-[14rem_minmax(0,1fr)]">
              <dt>
                <Link href={p.href} className="vrn-display text-xl text-ink underline-offset-4 hover:underline">
                  {p.name}
                </Link>
                <span className="block text-sm text-stone">{p.when}</span>
              </dt>
              <dd className="vrn-body">{p.text}</dd>
            </div>
          ))}
        </dl>

        <p className="vrn-body mt-7 max-w-3xl">
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
    <section id={reach.id} aria-labelledby="reach-title" className="bg-chandan-deep py-16 lg:py-24">
      <div className="container-x">
        <div className="grid items-end gap-8 lg:grid-cols-2 lg:gap-16">
          <Head id="reach-title" title={reach.title} lede={reach.lede} />
          <ul className="grid gap-3">
            {reach.distances.map((d) => (
              <li key={d.from} className="text-sm">
                <p className="flex justify-between gap-4 text-ink">
                  <span className="font-medium">{d.from}</span>
                  <span className="text-stone">{d.label}</span>
                </p>
                <span className="vrn-distance" style={{ width: `${(d.km / max) * 100}%` }} aria-hidden="true" />
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-12 grid gap-10 lg:grid-cols-3 lg:gap-8">
          {reach.modes.map((m) => {
            const Icon = REACH_ICON[m.key];
            return (
              <div key={m.key}>
                <h3 className="vrn-h4 flex items-center gap-2.5 border-b border-mitti/20 pb-3">
                  <Icon size={21} aria-hidden="true" className="text-haldi-deep" />
                  {m.title}
                </h3>
                <ul className="mt-3 grid gap-3 text-[0.95rem] leading-relaxed text-stone">
                  {m.points.map((p) => (
                    <li key={p}>
                      <Prose text={p} />
                    </li>
                  ))}
                </ul>
                {m.note && (
                  <p className="mt-4 text-[0.95rem] leading-relaxed text-stone">
                    <Prose text={m.note} />
                  </p>
                )}
              </div>
            );
          })}
        </div>

        <div className="vrn-dark mt-12 rounded-lg bg-shyam p-6 sm:p-8">
          <h3 className="vrn-h4">{reach.aroundTitle}</h3>
          <dl className="mt-5 grid gap-5 md:grid-cols-3 md:gap-8">
            {reach.around.map((a) => {
              const Icon = AROUND_ICON[a.name];
              return (
                <div key={a.name}>
                  <dt className="flex items-center gap-2 font-semibold text-ink">
                    <Icon size={18} aria-hidden="true" className="text-haldi" />
                    {a.name}
                  </dt>
                  <dd className="mt-1 text-[0.95rem] leading-relaxed text-stone">{a.text}</dd>
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
    <section id={nearby.id} aria-labelledby="nearby-title" className="bg-chandan py-16 lg:py-24">
      <div className="container-x">
        <Head id="nearby-title" title={nearby.title} lede={<Prose text={nearby.lede} />} />
        <ul className="vrn-nearby mt-9">
          {nearby.places.map((p) => (
            <li key={p.name}>
              <Link href={p.href} className="group relative block h-full min-h-56 overflow-hidden rounded-lg bg-shyam">
                <Shot pic={p.picture} sizes="(min-width: 1024px) 34vw, (min-width: 640px) 50vw, 100vw" className="object-cover transition-transform duration-1200 ease-braj group-hover:scale-105" />
                <span className="vrn-tile">
                  {p.distance && <span className="text-xs font-semibold text-haldi">{p.distance}</span>}
                  <span className="vrn-display block text-[1.4rem] leading-tight text-white">{p.name}</span>
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
    <section aria-labelledby="two-days-title" className="bg-chandan pb-16 lg:pb-24">
      <div className="container-x">
        <h2 id="two-days-title" className="vrn-h2">
          {twoDays.title}
        </h2>
        <p className="vrn-lede mt-3">{twoDays.lede}</p>

        <ol className="vrn-route mt-8">
          {twoDays.days.map((d) => (
            <li key={d.label}>
              <p className="text-sm font-semibold text-haldi-deep">{d.label}</p>
              <ul className="mt-1">
                {d.stops.map((s) => (
                  <li key={s} className="vrn-display text-xl leading-snug text-ink">
                    {s}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ol>

        <h3 className="vrn-h4 mt-14">{twoDays.packagesTitle}</h3>
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

/** The range of stays as a rising stair, plainest to most comfortable. */
export function StaySection() {
  return (
    <section id={stay.id} aria-labelledby="stay-title" className="vrn-dark bg-tulsi py-16 lg:py-24">
      <div className="container-x grid items-center gap-10 lg:grid-cols-2 lg:gap-20">
        <div>
          <h2 id="stay-title" className="vrn-h2">
            {stay.title}
          </h2>
          <div className="vrn-body mt-5 grid gap-4">
            {stay.paragraphs.map((p) => (
              <p key={p}>
                <Prose text={p} />
              </p>
            ))}
          </div>
          <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3">
            <EnquiryTrigger className="btn btn-white">
              Tell me your budget and needs
              <ArrowRight size={17} aria-hidden="true" className="btn-arrow" />
            </EnquiryTrigger>
            <Link href={stay.guide.href} className="vrn-link text-sm font-semibold">
              {stay.guide.label}
            </Link>
          </div>
        </div>
        <ol className="vrn-stair" aria-label="Stays in Vrindavan, from simple to premium">
          {stay.tiers.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ol>
      </div>
    </section>
  );
}
