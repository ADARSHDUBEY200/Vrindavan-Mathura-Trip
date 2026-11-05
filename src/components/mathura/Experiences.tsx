import { SectionHead, pad2 } from "@/components/destination/kit";
import { aarti, boatRide, lanes, otherThings, peda, thingsIntro } from "@/content/mathura";
import { LocalTip, Media, Points, Rich } from "./parts";

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

/** The section's one set piece: no photograph, just the scene in words and the lamps drifting away. */
function Aarti() {
  return (
    <article id="aarti" aria-labelledby="aarti-title" className="dg-dark dg-aarti relative overflow-hidden rounded-[1.75rem]">
      <div className="relative z-10 mx-auto max-w-3xl px-6 pb-32 pt-12 text-center sm:px-10 lg:pb-40 lg:pt-16">
        <p className="eyebrow justify-center">At sunset</p>
        <h3 id="aarti-title" className="dg-h2 mt-3">
          {aarti.title}
        </h3>
        <p className="mt-5 text-[1rem] leading-[1.75] text-white/90 sm:text-[1.08rem]">
          <Rich text={aarti.scene} />
        </p>
        <p className="dg-body mt-5">
          <Rich text={aarti.close} />
        </p>
      </div>
      <div className="absolute inset-x-0 bottom-0 h-60" aria-hidden="true">
        {DIYAS.map((d) => (
          <span key={d.x} className="dg-diya" style={{ left: d.x, "--dx": d.dx, animationDelay: d.delay } as React.CSSProperties} />
        ))}
      </div>
    </article>
  );
}

function BoatRide() {
  return (
    <article aria-labelledby="boat-title" className="dg-card flex flex-col overflow-hidden">
      <Media photo={boatRide.image} sizes="(min-width: 1024px) 600px, 92vw" className="aspect-[16/10] rounded-none" />
      <div className="p-6 sm:p-7">
        <h3 id="boat-title" className="dg-h3">
          {boatRide.title}
        </h3>
        <p className="dg-body mt-3">
          <Rich text={boatRide.text} />
        </p>
        <Points items={boatRide.tips} className="mt-4" />
      </div>
    </article>
  );
}

function Peda() {
  const [sweet, lassi] = peda.images;
  return (
    <article aria-labelledby="peda-title" className="dg-card flex flex-col overflow-hidden">
      <Media photo={sweet} sizes="(min-width: 1024px) 600px, 92vw" className="aspect-[16/10] rounded-none">
        <Media photo={lassi} sizes="8rem" className="absolute bottom-3 right-3 z-10 aspect-[3/4] w-20 rounded-xl border-[3px] border-white shadow-lift sm:w-28" imgClassName="object-cover object-[50%_60%]" />
      </Media>
      <div className="p-6 sm:p-7">
        <h3 id="peda-title" className="dg-h3">
          {peda.title}
        </h3>
        <p className="dg-body mt-3">
          <Rich text={peda.text} />
        </p>
        <p className="dg-label mt-5">{peda.listTitle.replace(/:$/, "")}</p>
        <Points items={peda.list} className="mt-2.5" />
        <p className="dg-quote mt-5 text-base">
          <Rich text={peda.close} />
        </p>
      </div>
    </article>
  );
}

/** The food lanes as one wide card: the street, two plates, and what to order. */
function Lanes() {
  const dishes = lanes.eat.filter((e) => e.image);
  return (
    <article aria-labelledby="lanes-title" className="dg-card grid overflow-hidden lg:grid-cols-12">
      <Media photo={lanes.image} sizes="(min-width: 1024px) 34vw, 92vw" className="aspect-[16/10] rounded-none lg:col-span-5 lg:aspect-auto lg:min-h-full" imgClassName="object-cover object-[50%_45%]" />
      <div className="p-6 sm:p-8 lg:col-span-7 lg:p-9">
        <h3 id="lanes-title" className="dg-h3">
          {lanes.title}
        </h3>
        <p className="dg-body mt-3">
          <Rich text={lanes.text} />
        </p>
        <div className="mt-5 grid grid-cols-2 gap-3">
          {dishes.map((d) => d.image && <Media key={d.name} photo={d.image} sizes="(min-width: 1024px) 22vw, 44vw" className="dg-photo-zoom aspect-[3/2] rounded-xl" />)}
        </div>
        <p className="dg-label mt-6">{lanes.eatTitle.replace(/:$/, "")}</p>
        <ul className="mt-3 grid gap-x-6 gap-y-3 sm:grid-cols-2">
          {lanes.eat.map((e) => (
            <li key={e.name} className="border-l-2 border-[var(--dg-o200)] pl-3">
              <strong className="block text-[0.9rem] font-semibold text-ink">{e.name}</strong>
              <span className="dg-small">{e.text}</span>
            </li>
          ))}
        </ul>
        <LocalTip label={lanes.rulesTitle} text={lanes.rules} className="mt-6" />
      </div>
    </article>
  );
}

function OtherThings() {
  return (
    <section aria-labelledby="other-things-title">
      <SectionHead id="other-things-title" as="h3" title={otherThings.title} />
      <ul className="reveal-stagger mt-5 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
        {otherThings.items.map((t, i) => (
          <li key={t} className="dg-card flex gap-4 p-5">
            <span className="dg-num shrink-0" aria-hidden="true">
              {pad2(i + 1)}
            </span>
            <p className="dg-small text-ink-soft">
              <Rich text={t} />
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function Experiences() {
  return (
    <section id="things-to-do" aria-labelledby="things-title" className="dg-section dg-cream">
      <div className="container-x">
        <SectionHead id="things-title" eyebrow="Beyond sightseeing" title={thingsIntro.title} lede={<Rich text={thingsIntro.lede} />} />
        <div className="mt-8 grid gap-5 lg:gap-6">
          <Aarti />
          <div className="reveal-stagger grid items-start gap-5 lg:grid-cols-2 lg:gap-6">
            <BoatRide />
            <Peda />
          </div>
          <Lanes />
        </div>
        <div className="mt-12 lg:mt-14">
          <OtherThings />
        </div>
      </div>
    </section>
  );
}
