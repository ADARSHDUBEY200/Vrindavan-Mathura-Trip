import Link from "next/link";
import { ArrowRight, Car, Navigation, Plane, TrainFront } from "lucide-react";
import { EnquireButton } from "@/components/tour-packages/EnquireButton";
import { bestTime, itineraries, nearMathura, reach, stay } from "@/content/mathura";
import { ArrowLink, Detail, Heading, LocalTip, Media, Points, Rich } from "./parts";

const seasonFill = { winter: "bg-marigold text-ink", summer: "bg-sandstone text-white", monsoon: "bg-peacock-teal text-white" } as const;

export function BestTime() {
  return (
    <section id="best-time" aria-labelledby="best-time-title" className="bg-parchment-deep py-16 lg:py-24">
      <div className="container-x">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-6">
            <Heading id="best-time-title" kicker="When to come" title={bestTime.title} />
            <p className="mt-prose mt-5">
              <Rich text={bestTime.text} />
            </p>
          </div>
          <Media photo={bestTime.image} sizes="(min-width: 1280px) 520px, (min-width: 1024px) 42vw, 92vw" className="aspect-[16/10] rounded-[1.75rem] shadow-lift lg:col-span-5 lg:col-start-8 lg:aspect-auto" />
        </div>

        {/* The ribbon repeats the seasons listed below it, so it is hidden from assistive tech. */}
        <div className="mt-12 grid grid-cols-12 gap-0.5 overflow-hidden rounded-xl sm:gap-1" aria-hidden="true">
          {bestTime.months.map(([letter, season], i) => (
            <span key={i} className={`grid h-11 place-items-center text-xs font-semibold sm:h-14 sm:text-sm ${seasonFill[season]}`}>
              {letter}
            </span>
          ))}
        </div>

        <ul className="mt-6 grid gap-8 sm:grid-cols-3">
          {bestTime.seasons.map((s) => (
            <li key={s.key} className="border-t-2 border-ink/20 pt-4">
              <h3 className="font-editorial text-[1.75rem] leading-tight">{s.name}</h3>
              <p className="mt-1 text-sm font-semibold text-sandstone">{s.months}</p>
              <p className="mt-body mt-2">{s.note}</p>
            </li>
          ))}
        </ul>

        <div className="mt-14 grid gap-8 lg:grid-cols-12 lg:gap-14">
          <h3 className="mt-h3 lg:col-span-4">{bestTime.festivalsTitle}</h3>
          <div className="lg:col-span-8">
            <Points items={bestTime.festivals} />
            <p className="mt-body mt-6">
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
    <figure className="mx-auto w-full max-w-[22rem] lg:sticky lg:top-40">
      <svg viewBox="0 0 320 520" role="img" aria-label="Route map: Delhi about 145 to 150 km north of Mathura, Vrindavan about 11 to 15 km north of Mathura, and Agra about 55 to 60 km south of Mathura" className="w-full">
        <path d="M118 0C70 70 150 120 128 190s-50 80-6 140 60 90 72 190" fill="none" stroke="#2f6f9f" strokeWidth="9" strokeLinecap="round" opacity="0.6" />
        <path d="M100 58 212 310 208 366 250 468" fill="none" stroke="#f0b252" strokeWidth="1.5" strokeDasharray="5 6" />

        <g fontFamily="var(--font-sans)">
          <circle cx="100" cy="58" r="6" fill="#fff7ea" />
          <text x="116" y="54" fontSize="17" fontWeight="600" fill="#fff7ea">Delhi</text>
          <text x="116" y="72" fontSize="11" fill="#c9bfb1">IGI Airport · 150 to 160 km</text>

          <text x="174" y="186" fontSize="12" fontWeight="600" fill="#f0b252">145 to 150 km</text>
          <text x="174" y="202" fontSize="11" fill="#c9bfb1">Yamuna Expressway, NH-19</text>

          <circle cx="212" cy="310" r="6" fill="#fff7ea" />
          <text x="226" y="306" fontSize="15" fontWeight="600" fill="#fff7ea">Vrindavan</text>
          <text x="226" y="322" fontSize="11" fill="#f0b252">11 to 15 km</text>

          <circle cx="208" cy="366" r="13" fill="#f0b252" opacity="0.25" />
          <circle cx="208" cy="366" r="7" fill="#f0b252" />
          <text x="194" y="372" textAnchor="end" fontSize="19" fontWeight="600" fill="#fff7ea">Mathura</text>

          <text x="240" y="416" fontSize="12" fontWeight="600" fill="#f0b252">55 to 60 km</text>

          <circle cx="250" cy="468" r="6" fill="#fff7ea" />
          <text x="236" y="473" textAnchor="end" fontSize="17" fontWeight="600" fill="#fff7ea">Agra</text>
          <text x="236" y="490" textAnchor="end" fontSize="11" fill="#c9bfb1">Kheria Airport</text>
        </g>

        <text x="44" y="300" fontFamily="var(--font-editorial)" fontStyle="italic" fontSize="17" fill="#8fb8d6" transform="rotate(-82 44 300)">
          the Yamuna
        </text>
      </svg>
      <figcaption className="mt-2 text-center text-xs text-stone">Schematic map, not to scale</figcaption>
    </figure>
  );
}

function Mode({ icon: Icon, title, children }: { icon: typeof Car; title: string; children: React.ReactNode }) {
  return (
    <div className="border-t border-white/15 pt-6">
      <h3 className="flex items-center gap-3 font-editorial text-[1.9rem] leading-tight">
        <span className="grid size-10 shrink-0 place-items-center rounded-full bg-white/10 text-marigold">
          <Icon size={19} aria-hidden="true" />
        </span>
        {title}
      </h3>
      <div className="mt-4">{children}</div>
    </div>
  );
}

export function HowToReach() {
  return (
    <section id="reach" aria-labelledby="reach-title" className="mt-dark py-16 lg:py-24">
      <div className="container-x">
        <Heading id="reach-title" kicker="Getting here" title={reach.title} lede={reach.lede} />
        <div className="mt-12 grid gap-12 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-4">
            <RouteMap />
          </div>
          <div className="grid gap-8 lg:col-span-8">
            <Mode icon={Plane} title={reach.air.title}>
              <Points items={reach.air.points} />
              <Detail label={reach.air.noteLabel} text={reach.air.note} className="mt-5" />
            </Mode>
            <Mode icon={TrainFront} title={reach.train.title}>
              <p className="mt-body">
                <Rich text={reach.train.text} />
              </p>
              <LocalTip label={reach.train.noteLabel} text={reach.train.note} className="mt-5" />
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
    <section id="itineraries" aria-labelledby="itineraries-title" className="py-16 lg:py-24">
      <div className="container-x">
        <Heading id="itineraries-title" kicker="Day by day" title={itineraries.title} />
        <div className="mt-12 grid gap-14 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-6">
            <h3 className="mt-h3">{oneDay.title}</h3>
            <p className="mt-body mt-2 italic">{oneDay.lede}</p>
            {/* The line runs from sunrise gold to night blue, the arc of the day itself. */}
            <ol className="mt-sunpath mt-7">
              {oneDay.stops.map((s) => (
                <li key={s.time}>
                  <p className="font-editorial text-[1.4rem] leading-none text-sandstone">{s.time}</p>
                  <p className="mt-body mt-1">
                    <strong className="font-semibold text-ink">{s.title}</strong> {s.text}
                  </p>
                </li>
              ))}
            </ol>
          </div>

          <div className="lg:col-span-6">
            <h3 className="mt-h3">{twoDay.title}</h3>
            <p className="mt-body mt-2 italic">{twoDay.lede}</p>
            <div className="mt-7 grid gap-5">
              {twoDay.days.map((d) => (
                <div key={d.title} className="rounded-[1.5rem] bg-parchment-deep p-6 sm:p-7">
                  <h4 className="font-editorial text-[1.75rem] leading-tight">{d.title}</h4>
                  <dl className="mt-4 grid gap-3">
                    {d.slots.map((s) => (
                      <div key={s.when} className="sm:grid sm:grid-cols-[8.5rem_1fr] sm:gap-3">
                        <dt className="mt-label pt-0.5">{s.when}</dt>
                        <dd className="mt-body">{s.text}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              ))}
            </div>
            <ArrowLink href={twoDay.packageHref} className="mt-6">
              See the Mathura Vrindavan 2 Days package
            </ArrowLink>
          </div>
        </div>
      </div>
    </section>
  );
}

export function NearMathura() {
  return (
    <section id="near" aria-labelledby="near-title" className="pb-16 lg:pb-24">
      <div className="container-x">
        <Heading id="near-title" kicker="Going further" title={nearMathura.title} lede={nearMathura.lede} />
        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-6">
          {nearMathura.items.map((n, i) => (
            <li key={n.name} className={i < 2 ? "lg:col-span-3" : i === 4 ? "sm:col-span-2 lg:col-span-2" : "lg:col-span-2"}>
              <Link href={n.href} className="group mt-tile block h-full">
                <Media photo={n.image} sizes={i < 2 ? "(min-width: 1024px) 46vw, (min-width: 640px) 46vw, 92vw" : "(min-width: 1024px) 31vw, (min-width: 640px) 46vw, 92vw"} className={i < 2 ? "aspect-[16/10]" : "aspect-[4/3]"} />
                <div className="mt-tile-body">
                  {n.distance && <p className="text-xs font-medium uppercase tracking-[0.14em] text-marigold">{n.distance}</p>}
                  <h3 className="mt-1 font-editorial text-[1.75rem] leading-tight text-white">{n.name}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-white/85">{n.text}</p>
                </div>
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
    <section id="stay" aria-labelledby="stay-title" className="bg-parchment-deep py-16 lg:py-24">
      <div className="container-x grid gap-8 lg:grid-cols-12 lg:gap-14">
        <div className="lg:col-span-5">
          <p className="mt-kicker">Rest</p>
          <h2 id="stay-title" className="mt-h2 mt-4">
            {stay.title}
          </h2>
        </div>
        <div className="lg:col-span-7">
          <p className="mt-scene-sm">{stay.lead}</p>
          <p className="mt-prose mt-4">
            <Rich text={stay.text} />
          </p>
          <EnquireButton className="btn btn-dark mt-6">
            Ask about stays <ArrowRight size={18} aria-hidden="true" className="btn-arrow" />
          </EnquireButton>
        </div>
      </div>
    </section>
  );
}
