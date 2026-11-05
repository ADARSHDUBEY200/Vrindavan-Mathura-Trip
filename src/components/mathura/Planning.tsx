import Link from "next/link";
import { ArrowRight, ArrowUpRight, Car, Navigation, Plane, TrainFront } from "lucide-react";
import { SeasonCards, SectionHead, YearBar } from "@/components/destination/kit";
import { EnquireButton } from "@/components/tour-packages/EnquireButton";
import { bestTime, itineraries, nearMathura, reach, stay } from "@/content/mathura";
import { ArrowLink, LocalTip, Media, Points, Rich } from "./parts";

export function BestTime() {
  return (
    <section id="best-time" aria-labelledby="best-time-title" className="dg-section">
      <div className="container-x">
        <div className="grid items-center gap-8 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-7">
            <SectionHead id="best-time-title" eyebrow="When to come" title={bestTime.title} />
            <p className="dg-body mt-4 max-w-2xl">
              <Rich text={bestTime.text} />
            </p>
          </div>
          <Media photo={bestTime.image} sizes="(min-width: 1280px) 460px, (min-width: 1024px) 38vw, 92vw" className="reveal-zoom dg-photo-lg aspect-[16/10] lg:col-span-5" />
        </div>

        {/* The bar repeats the season cards below it in a glance; each month also carries a text label. */}
        <div className="mt-9">
          <YearBar months={bestTime.months.map(([, season]) => ({ season }))} />
        </div>
        <div className="mt-6">
          <SeasonCards seasons={bestTime.seasons} />
        </div>

        <div className="dg-card mt-8 grid gap-6 p-6 sm:p-8 lg:grid-cols-12 lg:gap-10">
          <h3 className="dg-h3 lg:col-span-4">{bestTime.festivalsTitle.replace(/:$/, "")}</h3>
          <div className="lg:col-span-8">
            <Points items={bestTime.festivals} />
            <p className="dg-small mt-5">
              <Rich text={bestTime.footer} />
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/** Schematic, not to scale: Delhi, Vrindavan, Mathura and Agra down the Yamuna, with the PDF's distances. */
function RouteMap() {
  return (
    <figure className="dg-card p-5 lg:sticky lg:top-40">
      <svg viewBox="0 0 320 520" role="img" aria-label="Route map: Delhi about 145 to 150 km north of Mathura, Vrindavan about 11 to 15 km north of Mathura, and Agra about 55 to 60 km south of Mathura" className="mx-auto w-full max-w-[20rem]">
        <path d="M118 0C70 70 150 120 128 190s-50 80-6 140 60 90 72 190" fill="none" stroke="#9cc3df" strokeWidth="10" strokeLinecap="round" opacity="0.55" />
        <path d="M100 58 212 310 208 366 250 468" fill="none" stroke="#f97316" strokeWidth="1.75" strokeDasharray="5 6" />

        <g fontFamily="var(--font-sans)">
          <circle cx="100" cy="58" r="6" fill="#1f2328" />
          <text x="116" y="54" fontSize="17" fontWeight="600" fill="#1f2328">Delhi</text>
          <text x="116" y="72" fontSize="11" fill="#5f6672">IGI Airport · 150 to 160 km</text>

          <text x="174" y="186" fontSize="12" fontWeight="600" fill="#c2410c">145 to 150 km</text>
          <text x="174" y="202" fontSize="11" fill="#5f6672">Yamuna Expressway, NH-19</text>

          <circle cx="212" cy="310" r="6" fill="#1f2328" />
          <text x="226" y="306" fontSize="15" fontWeight="600" fill="#1f2328">Vrindavan</text>
          <text x="226" y="322" fontSize="11" fontWeight="500" fill="#c2410c">11 to 15 km</text>

          <circle cx="208" cy="366" r="14" fill="#f97316" opacity="0.18" />
          <circle cx="208" cy="366" r="7" fill="#f97316" />
          <text x="192" y="372" textAnchor="end" fontSize="19" fontWeight="700" fill="#1f2328">Mathura</text>

          <text x="240" y="416" fontSize="12" fontWeight="600" fill="#c2410c">55 to 60 km</text>

          <circle cx="250" cy="468" r="6" fill="#1f2328" />
          <text x="236" y="473" textAnchor="end" fontSize="17" fontWeight="600" fill="#1f2328">Agra</text>
          <text x="236" y="490" textAnchor="end" fontSize="11" fill="#5f6672">Kheria Airport</text>

          <text x="44" y="300" fontSize="13" fontWeight="500" letterSpacing="2" fill="#4f86ad" transform="rotate(-82 44 300)">
            YAMUNA
          </text>
        </g>
      </svg>
      <figcaption className="mt-2 text-center text-xs text-stone">Schematic map, not to scale</figcaption>
    </figure>
  );
}

function Mode({ icon: Icon, title, children }: { icon: typeof Car; title: string; children: React.ReactNode }) {
  return (
    <div className="dg-card p-5 sm:p-6">
      <h3 className="dg-h4 flex items-center gap-3">
        <span className="dg-icon">
          <Icon size={18} aria-hidden="true" />
        </span>
        {title}
      </h3>
      <div className="mt-4">{children}</div>
    </div>
  );
}

export function HowToReach() {
  return (
    <section id="reach" aria-labelledby="reach-title" className="dg-section dg-cream">
      <div className="container-x">
        <SectionHead id="reach-title" eyebrow="Getting here" title={reach.title} lede={<Rich text={reach.lede} />} />
        <div className="mt-8 grid gap-5 lg:grid-cols-12 lg:gap-6">
          <div className="lg:col-span-4">
            <RouteMap />
          </div>
          <div className="reveal-stagger grid content-start gap-5 md:grid-cols-2 lg:col-span-8">
            <Mode icon={Plane} title={reach.air.title}>
              <Points items={reach.air.points} />
              <p className="dg-small mt-4 border-t border-line pt-4">
                <strong className="font-semibold text-ink">{reach.air.noteLabel}</strong> <Rich text={reach.air.note} />
              </p>
            </Mode>
            <Mode icon={TrainFront} title={reach.train.title}>
              <p className="dg-body">
                <Rich text={reach.train.text} />
              </p>
              <LocalTip label={reach.train.noteLabel} text={reach.train.note} className="mt-4" />
            </Mode>
            <Mode icon={Car} title={reach.road.title}>
              <Points items={reach.road.points} />
            </Mode>
            <Mode icon={Navigation} title={reach.around.title}>
              <Points items={reach.around.points} />
            </Mode>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Itineraries() {
  const { oneDay, twoDay } = itineraries;
  return (
    <section id="itineraries" aria-labelledby="itineraries-title" className="dg-section">
      <div className="container-x">
        <SectionHead id="itineraries-title" eyebrow="Day by day" title={itineraries.title} aside={<ArrowLink href={twoDay.packageHref}>See the Mathura Vrindavan 2 Days package</ArrowLink>} />
        <div className="mt-8 grid items-start gap-5 lg:grid-cols-2 lg:gap-6">
          <div className="dg-card p-6 sm:p-8">
            <h3 className="dg-h3">{oneDay.title}</h3>
            <p className="dg-small mt-1.5">{oneDay.lede}</p>
            {/* The line runs from sunrise orange to the evening, the arc of the day itself. */}
            <ol className="dg-steps mt-6">
              {oneDay.stops.map((s) => (
                <li key={s.time}>
                  <p className="text-[0.8rem] font-semibold tabular-nums text-ember-deep">{s.time}</p>
                  <p className="dg-body mt-0.5">
                    <strong className="font-semibold text-ink">{s.title}</strong> {s.text}
                  </p>
                </li>
              ))}
            </ol>
          </div>

          <div className="grid gap-5">
            <div className="px-1">
              <h3 className="dg-h3">{twoDay.title}</h3>
              <p className="dg-small mt-1.5">{twoDay.lede}</p>
            </div>
            {twoDay.days.map((d, i) => (
              <div key={d.title} className="dg-card p-6 sm:p-7">
                <h4 className="dg-h4 flex items-center gap-3">
                  <span className="dg-num" aria-hidden="true">
                    Day {i + 1}
                  </span>
                  {d.title}
                </h4>
                <dl className="mt-4 grid gap-3">
                  {d.slots.map((s) => (
                    <div key={s.when} className="grid gap-1 border-t border-line pt-3 sm:grid-cols-[8rem_1fr] sm:gap-4">
                      <dt className="dg-label pt-0.5">{s.when}</dt>
                      <dd className="dg-small text-ink-soft">{s.text}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function NearMathura() {
  return (
    <section id="near" aria-labelledby="near-title" className="dg-section dg-cream">
      <div className="container-x">
        <SectionHead id="near-title" eyebrow="Going further" title={nearMathura.title} lede={<Rich text={nearMathura.lede} />} />
        <ul className="reveal-stagger mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-6">
          {nearMathura.items.map((n, i) => (
            <li key={n.name} className={i < 2 ? "lg:col-span-3" : i === 4 ? "sm:col-span-2 lg:col-span-2" : "lg:col-span-2"}>
              <Link href={n.href} className={`dg-tile ${i < 2 ? "aspect-[16/10]" : "aspect-[4/3]"} sm:aspect-auto sm:h-64 ${i < 2 ? "lg:h-80" : "lg:h-64"}`}>
                <Media photo={n.image} sizes={i < 2 ? "(min-width: 640px) 46vw, 92vw" : "(min-width: 1024px) 31vw, (min-width: 640px) 46vw, 92vw"} className="absolute inset-0 rounded-none" />
                <span className="dg-tile-arrow" aria-hidden="true">
                  <ArrowUpRight size={16} />
                </span>
                <span className="dg-tile-body">
                  {n.distance && <span className="text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-[var(--dg-o300)]">{n.distance}</span>}
                  <h3 className="dg-h4 mt-0.5 text-[1.1rem]">{n.name}</h3>
                  <span className="mt-1 block text-sm leading-snug text-white/85">{n.text}</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function Stay() {
  return (
    <section id="stay" aria-labelledby="stay-title" className="dg-section">
      <div className="container-x">
        <div className="dg-wash grid gap-6 rounded-[1.75rem] border border-[var(--dg-o100)] p-6 sm:p-9 lg:grid-cols-12 lg:gap-12 lg:p-11">
          <div className="lg:col-span-5">
            <p className="eyebrow">Rest</p>
            <h2 id="stay-title" className="dg-h2 mt-3">
              {stay.title}
            </h2>
          </div>
          <div className="lg:col-span-7">
            <p className="dg-lead">{stay.lead}</p>
            <p className="dg-body mt-3">
              <Rich text={stay.text} />
            </p>
            <EnquireButton className="btn btn-dark mt-6">
              Ask about stays <ArrowRight size={18} aria-hidden="true" className="btn-arrow" />
            </EnquireButton>
          </div>
        </div>
      </div>
    </section>
  );
}
