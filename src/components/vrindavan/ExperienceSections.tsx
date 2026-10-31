import Link from "next/link";
import { bazaars, brajFood, brajHoli, eveningAarti, parikrama, pics, thingsToDo } from "@/content/vrindavan";
import { Head, LocalTips, Prose, Shot, TipLine } from "./kit";

/** The ring walks clockwise, as pilgrims do. */
function ParikramaRing() {
  return (
    <div className="vrn-ring" aria-hidden="true">
      <svg viewBox="0 0 120 120">
        <circle cx="60" cy="60" r="54" className="vrn-ring-path" />
      </svg>
      <span className="vrn-ring-walker" />
      <p>
        <b>{parikrama.distance}</b>
        {parikrama.distanceNote}
      </p>
    </div>
  );
}

export function ThingsToDoIntro() {
  return (
    <section id="things-to-do" aria-labelledby="things-title" className="bg-chandan pt-16 lg:pt-24">
      <div className="container-x">
        <Head id="things-title" title={thingsToDo.title} lede={<Prose text={thingsToDo.lede} />} />
      </div>
    </section>
  );
}

/** The route as Braj itself drew it: a 19th-century pilgrim painting of the Vraj Parikrama. */
export function ParikramaSection() {
  return (
    <section aria-labelledby="parikrama-title" className="bg-chandan py-12 lg:py-16">
      <div className="container-x grid items-start gap-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-16">
        <figure className="relative mx-auto w-full max-w-xl lg:sticky lg:top-40 lg:max-w-none">
          <div className="vrn-painting">
            <div className="relative aspect-[898/1260]">
              <Shot pic={pics.pichhavai} sizes="(min-width: 1024px) 38vw, 100vw" />
            </div>
          </div>
          <figcaption className="mt-3 text-xs leading-relaxed text-stone">{parikrama.paintingCaption}</figcaption>
          <ParikramaRing />
        </figure>
        <div>
          <h3 id="parikrama-title" className="vrn-h3">
            {parikrama.title}
          </h3>
          <div className="vrn-body mt-5 grid gap-4">
            <p>
              <Prose text={parikrama.intro} />
            </p>
            <p>
              <Prose text={parikrama.why} />
            </p>
          </div>
          <LocalTips label={parikrama.tipLabel} items={parikrama.tips} className="mt-7" />
          <div className="mt-9 border-t border-mitti/15 pt-7">
            <p className="vrn-body">{parikrama.storyLead}</p>
            <blockquote className="vrn-quote mt-3">{parikrama.storyQuote}</blockquote>
            <p className="vrn-body mt-3">{parikrama.storyClose}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

/** Three colours of Holi, full width, with a single block of practical copy. */
export function HoliSection() {
  return (
    <section aria-labelledby="holi-title" className="vrn-dark bg-kumkum">
      <ul className="grid gap-px sm:grid-cols-3">
        {brajHoli.frames.map((f) => (
          <li key={f.label}>
            <Link href={f.href} className="group relative block aspect-[16/10] overflow-hidden bg-black sm:aspect-[4/5]">
              <Shot pic={f.picture} sizes="(min-width: 640px) 34vw, 100vw" className="object-cover transition-transform duration-1200 ease-braj group-hover:scale-105" />
              <span className="vrn-frame-label">{f.label}</span>
            </Link>
          </li>
        ))}
      </ul>
      <div className="container-x grid gap-5 py-12 lg:grid-cols-[minmax(0,0.75fr)_minmax(0,1.25fr)] lg:gap-16 lg:py-16">
        <h3 id="holi-title" className="vrn-h3">
          {brajHoli.title}
        </h3>
        <p className="vrn-body">
          <Prose text={brajHoli.text} />
        </p>
      </div>
    </section>
  );
}

export function AartiSection() {
  return (
    <section aria-labelledby="aarti-title" className="vrn-dark bg-yamuna">
      <div className="grid lg:grid-cols-2">
        <div className="vrn-flush-left flex flex-col justify-center px-4 py-12 sm:px-6 lg:py-20">
          <h3 id="aarti-title" className="vrn-h3">
            {eveningAarti.title}
          </h3>
          <p className="vrn-lead mt-4">
            <Prose text={eveningAarti.text} />
          </p>
        </div>
        <div className="relative aspect-[4/3] lg:aspect-auto lg:min-h-[28rem]">
          <Shot pic={pics.diya} sizes="(min-width: 1024px) 50vw, 100vw" />
        </div>
      </div>
    </section>
  );
}

/** A printed menu beside three round thalis. */
export function FoodSection() {
  const plates = [
    { picture: pics.rabri, className: "w-[62%] left-0 top-0 z-10" },
    { picture: pics.kachori, className: "w-[52%] right-0 top-[20%] z-20" },
    { picture: pics.lassi, className: "w-[44%] left-[14%] bottom-0 z-30" },
  ];
  return (
    <section id={brajFood.id} aria-labelledby="food-title" className="bg-chandan-deep py-16 lg:py-24">
      <div className="container-x grid items-start gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-20">
        <div className="relative mx-auto aspect-square w-full max-w-md lg:sticky lg:top-40 lg:max-w-none">
          {plates.map((p) => (
            <div key={p.picture.alt} className={`vrn-plate absolute aspect-square ${p.className}`}>
              <Shot pic={p.picture} sizes="(min-width: 1024px) 24vw, 60vw" />
            </div>
          ))}
        </div>
        <div>
          <h3 id="food-title" className="vrn-h3">
            {brajFood.title}
          </h3>
          <p className="vrn-body mt-3">{brajFood.lede}</p>
          <dl className="vrn-menu mt-6">
            {brajFood.dishes.map((d) => (
              <div key={d.name}>
                <dt>{d.name}</dt>
                <dd>
                  <Prose text={d.text} />
                </dd>
              </div>
            ))}
          </dl>
          <p className="vrn-callout mt-7">
            <Prose text={brajFood.rules} />
          </p>
        </div>
      </div>
    </section>
  );
}

export function BazaarSection() {
  return (
    <section aria-labelledby="bazaar-title" className="bg-chandan py-16 lg:py-24">
      <div className="container-x grid items-center gap-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-16">
        <div className="relative aspect-[16/10] overflow-hidden rounded-lg bg-chandan-deep">
          <Shot pic={pics.street} sizes="(min-width: 1024px) 56vw, 100vw" className="object-cover object-[80%_50%]" />
        </div>
        <div>
          <h3 id="bazaar-title" className="vrn-h3">
            {bazaars.title}
          </h3>
          <dl className="mt-5 grid gap-5">
            {bazaars.items.map((b) => (
              <div key={b.name}>
                <dt className="vrn-display text-xl text-ink">{b.name}</dt>
                <dd className="vrn-body mt-1">
                  <Prose text={b.text} />
                </dd>
              </div>
            ))}
          </dl>
          <TipLine text={bazaars.tip} className="mt-6" />
        </div>
      </div>
    </section>
  );
}
