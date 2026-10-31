import { aarti, boatRide, lanes, otherThings, peda, thingsIntro } from "@/content/mathura";
import { Heading, LocalTip, Media, Points, Rich } from "./parts";

/** Lamps set adrift: left offset, sideways drift and start delay for each one. */
const DIYAS = [
  { x: "12%", dx: "2.5rem", delay: "0s" },
  { x: "24%", dx: "-1.5rem", delay: "3.2s" },
  { x: "37%", dx: "2rem", delay: "6.5s" },
  { x: "49%", dx: "-2rem", delay: "1.6s" },
  { x: "61%", dx: "1.5rem", delay: "4.8s" },
  { x: "73%", dx: "-1rem", delay: "8s" },
  { x: "85%", dx: "2rem", delay: "2.4s" },
];

/** The page's one set piece: no photograph, just the scene in words and the lamps drifting away. */
function Aarti() {
  return (
    <article id="aarti" aria-labelledby="aarti-title" className="mt-dark mt-aarti relative overflow-hidden">
      <div className="container-x relative z-10 pb-44 pt-20 text-center lg:pb-56 lg:pt-28">
        <h3 id="aarti-title" className="mt-h3 mx-auto max-w-2xl">
          {aarti.title}
        </h3>
        <p className="mt-scene mx-auto mt-8 max-w-4xl">
          <Rich text={aarti.scene} />
        </p>
        <p className="mt-prose mx-auto mt-8 max-w-2xl">
          <Rich text={aarti.close} />
        </p>
      </div>
      <div className="absolute inset-x-0 bottom-0 h-72" aria-hidden="true">
        {DIYAS.map((d) => (
          <span key={d.x} className="mt-diya" style={{ left: d.x, "--dx": d.dx, animationDelay: d.delay } as React.CSSProperties} />
        ))}
      </div>
    </article>
  );
}

function BoatRide() {
  return (
    <article aria-labelledby="boat-title" className="container-x grid items-center gap-10 lg:grid-cols-12 lg:gap-14">
      <div className="lg:col-span-5">
        <h3 id="boat-title" className="mt-h3">
          {boatRide.title}
        </h3>
        <p className="mt-prose mt-5">
          <Rich text={boatRide.text} />
        </p>
        <Points items={boatRide.tips} className="mt-5" />
      </div>
      <Media photo={boatRide.image} sizes="(min-width: 1280px) 640px, (min-width: 1024px) 50vw, 92vw" className="reveal-zoom aspect-[5/4] rounded-[1.75rem] shadow-lift lg:col-span-6 lg:col-start-7" />
    </article>
  );
}

function Peda() {
  const [sweet, lassi] = peda.images;
  return (
    <article aria-labelledby="peda-title" className="bg-parchment-deep py-16 lg:py-24">
      <div className="container-x grid items-center gap-10 lg:grid-cols-12 lg:gap-14">
        <div className="relative pb-16 pr-10 sm:pr-24 lg:col-span-6 lg:pb-24">
          <Media photo={sweet} sizes="(min-width: 1024px) 42vw, 80vw" className="aspect-[4/3] rounded-[1.75rem] shadow-lift" />
          <Media photo={lassi} sizes="(min-width: 640px) 13rem, 9rem" className="absolute bottom-0 right-0 aspect-[3/4] w-32 rounded-2xl border-4 border-parchment-deep shadow-lift sm:w-48 lg:w-52" imgClassName="object-cover object-[50%_60%]" />
        </div>
        <div className="lg:col-span-6">
          <h3 id="peda-title" className="mt-h3">
            {peda.title}
          </h3>
          <p className="mt-prose mt-5">
            <Rich text={peda.text} />
          </p>
          <p className="mt-label mt-7">{peda.listTitle}</p>
          <Points items={peda.list} className="mt-3" />
          <p className="mt-scene-sm mt-6">
            <Rich text={peda.close} />
          </p>
        </div>
      </div>
    </article>
  );
}

function Lanes() {
  const dishes = lanes.eat.filter((e) => e.image);
  return (
    <article aria-labelledby="lanes-title" className="container-x grid gap-10 lg:grid-cols-12 lg:gap-14">
      <Media photo={lanes.image} sizes="(min-width: 1024px) 34vw, 92vw" className="aspect-[4/3] rounded-[1.75rem] shadow-lift sm:aspect-[16/10] lg:col-span-4 lg:aspect-auto lg:min-h-full" imgClassName="object-cover object-[50%_45%]" />
      <div className="lg:col-span-8">
        <h3 id="lanes-title" className="mt-h3">
          {lanes.title}
        </h3>
        <p className="mt-prose mt-5">
          <Rich text={lanes.text} />
        </p>
        <div className="mt-8 grid grid-cols-2 gap-3 sm:gap-4">
          {dishes.map((d) => d.image && <Media key={d.name} photo={d.image} sizes="(min-width: 1024px) 28vw, 46vw" className="aspect-[3/2] rounded-2xl" />)}
        </div>
        <p className="mt-label mt-7">{lanes.eatTitle}</p>
        <ul className="mt-3 grid gap-x-8 gap-y-3 sm:grid-cols-2">
          {lanes.eat.map((e) => (
            <li key={e.name} className="mt-body mt-point">
              <strong className="font-semibold text-ink">{e.name}</strong> {e.text}
            </li>
          ))}
        </ul>
        <LocalTip label={lanes.rulesTitle} text={lanes.rules} className="mt-7" />
      </div>
    </article>
  );
}

function OtherThings() {
  return (
    <section aria-labelledby="other-things-title" className="container-x">
      <h3 id="other-things-title" className="mt-h3">
        {otherThings.title}
      </h3>
      <ul className="mt-6 grid gap-x-10 lg:grid-cols-3">
        {otherThings.items.map((t) => (
          <li key={t} className="mt-body border-t border-ink/20 py-4">
            <Rich text={t} />
          </li>
        ))}
      </ul>
    </section>
  );
}

export function Experiences() {
  return (
    <section id="things-to-do" aria-labelledby="things-title" className="pb-16 lg:pb-24">
      <div className="container-x pb-12 lg:pb-16">
        <Heading id="things-title" kicker="Beyond sightseeing" title={thingsIntro.title} lede={thingsIntro.lede} />
      </div>
      <Aarti />
      <div className="mt-16 grid gap-16 lg:mt-24 lg:gap-24">
        <BoatRide />
        <Peda />
        <Lanes />
        <OtherThings />
      </div>
    </section>
  );
}
