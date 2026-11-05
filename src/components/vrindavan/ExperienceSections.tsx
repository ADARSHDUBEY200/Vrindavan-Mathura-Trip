import Link from "next/link";
import { ArrowUpRight, Footprints, UtensilsCrossed } from "lucide-react";
import { SectionHead } from "@/components/destination/kit";
import { bazaars, brajFood, brajHoli, eveningAarti, parikrama, pics, thingsToDo } from "@/content/vrindavan";
import { LocalTips, Prose, Shot, TipLine } from "./kit";

export function ThingsToDoIntro() {
  return (
    <section id="things-to-do" aria-labelledby="things-title" className="dg-section dg-cream pb-0 lg:pb-0">
      <div className="container-x">
        <SectionHead id="things-title" eyebrow="Beyond the temples" title={thingsToDo.title} lede={<Prose text={thingsToDo.lede} />} />
      </div>
    </section>
  );
}

/** The route as Braj itself drew it: a 19th-century pilgrim painting of the Vraj Parikrama, hung on a white mat. */
export function ParikramaSection() {
  return (
    <section aria-labelledby="parikrama-title" className="dg-section dg-cream pt-8 lg:pt-10">
      <div className="container-x grid items-start gap-8 lg:grid-cols-12 lg:gap-14">
        <figure className="relative mx-auto w-full max-w-md lg:sticky lg:top-40 lg:col-span-5 lg:max-w-none">
          <div className="dg-card p-3">
            <div className="dg-photo relative aspect-[898/1260] rounded-xl">
              <Shot pic={pics.pichhavai} sizes="(min-width: 1024px) 38vw, 100vw" />
            </div>
          </div>
          <figcaption className="dg-small mt-3 text-center text-xs">{parikrama.paintingCaption}</figcaption>
          <p aria-hidden="true" className="dg-card absolute right-3 top-3 flex items-center gap-3 px-4 py-3 shadow-lift sm:right-5 sm:top-5">
            <span className="dg-icon size-9">
              <Footprints size={17} />
            </span>
            <span>
              <b className="block text-base font-bold leading-tight text-ink">{parikrama.distance}</b>
              <span className="text-xs text-stone">{parikrama.distanceNote}</span>
            </span>
          </p>
        </figure>
        <div className="lg:col-span-7">
          <h3 id="parikrama-title" className="dg-h2">
            {parikrama.title}
          </h3>
          <div className="dg-prose dg-body mt-4">
            <p>
              <Prose text={parikrama.intro} />
            </p>
            <p>
              <Prose text={parikrama.why} />
            </p>
          </div>
          <LocalTips label={parikrama.tipLabel} items={parikrama.tips} className="mt-6" />
          <div className="dg-card mt-4 p-5 sm:p-6">
            <p className="dg-body">{parikrama.storyLead}</p>
            <blockquote className="dg-quote mt-4">{parikrama.storyQuote}</blockquote>
            <p className="dg-small mt-4">{parikrama.storyClose}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

/** Three colours of Holi as photo tiles, with a single block of practical copy. */
export function HoliSection() {
  return (
    <section aria-labelledby="holi-title" className="dg-section">
      <div className="container-x">
        <div className="grid gap-4 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-5">
            <p className="eyebrow">February and March</p>
            <h3 id="holi-title" className="dg-h2 mt-3">
              {brajHoli.title}
            </h3>
          </div>
          <p className="dg-body lg:col-span-7 lg:pt-8">
            <Prose text={brajHoli.text} />
          </p>
        </div>
        <ul className="reveal-stagger mt-7 grid gap-4 sm:grid-cols-3">
          {brajHoli.frames.map((f) => (
            <li key={f.label}>
              <Link href={f.href} className="dg-tile aspect-[16/10] sm:aspect-[4/5]">
                <Shot pic={f.picture} sizes="(min-width: 640px) 31vw, 92vw" />
                <span className="dg-tile-arrow" aria-hidden="true">
                  <ArrowUpRight size={16} />
                </span>
                <span className="dg-tile-body">
                  <span className="dg-h4 block text-[1.05rem] text-white">{f.label}</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function AartiSection() {
  return (
    <section aria-labelledby="aarti-title" className="dg-section pt-0 lg:pt-0">
      <div className="container-x">
        <div className="dg-dark grid overflow-hidden rounded-[1.75rem] lg:grid-cols-2">
          <div className="flex flex-col justify-center p-6 sm:p-9 lg:p-12">
            <p className="eyebrow">At sunset</p>
            <h3 id="aarti-title" className="dg-h2 mt-3">
              {eveningAarti.title}
            </h3>
            <p className="mt-4 text-[1rem] leading-[1.75] text-white/90 sm:text-[1.08rem]">
              <Prose text={eveningAarti.text} />
            </p>
          </div>
          <div className="relative aspect-[4/3] lg:aspect-auto lg:min-h-[26rem]">
            <Shot pic={pics.diya} sizes="(min-width: 1024px) 50vw, 100vw" />
          </div>
        </div>
      </div>
    </section>
  );
}

/** Three plates beside the menu. */
export function FoodSection() {
  return (
    <section id={brajFood.id} aria-labelledby="food-title" className="dg-section dg-cream">
      <div className="container-x grid items-start gap-8 lg:grid-cols-12 lg:gap-14">
        <div className="reveal-stagger grid grid-cols-2 grid-rows-2 gap-3 lg:sticky lg:top-40 lg:col-span-5">
          <div className="dg-photo dg-photo-zoom row-span-2 min-h-72 sm:min-h-96">
            <Shot pic={pics.rabri} sizes="(min-width: 1024px) 20vw, 46vw" />
          </div>
          <div className="dg-photo dg-photo-zoom aspect-square">
            <Shot pic={pics.kachori} sizes="(min-width: 1024px) 20vw, 46vw" />
          </div>
          <div className="dg-photo dg-photo-zoom aspect-square">
            <Shot pic={pics.lassi} sizes="(min-width: 1024px) 20vw, 46vw" />
          </div>
        </div>
        <div className="lg:col-span-7">
          <p className="eyebrow">Eat like a Brijwasi</p>
          <h3 id="food-title" className="dg-h2 mt-3">
            {brajFood.title}
          </h3>
          <p className="dg-lede mt-3">{brajFood.lede}</p>
          <dl className="dg-card mt-6 divide-y divide-line px-5 sm:px-6">
            {brajFood.dishes.map((d) => (
              <div key={d.name} className="grid gap-1 py-4 sm:grid-cols-[9rem_minmax(0,1fr)] sm:gap-5">
                <dt className="dg-h4 flex items-start gap-2">
                  <UtensilsCrossed size={14} aria-hidden="true" className="mt-1 shrink-0 text-ember-deep" />
                  {d.name}
                </dt>
                <dd className="dg-small text-ink-soft">
                  <Prose text={d.text} />
                </dd>
              </div>
            ))}
          </dl>
          <TipLine text={brajFood.rules} className="mt-4" />
        </div>
      </div>
    </section>
  );
}

export function BazaarSection() {
  return (
    <section aria-labelledby="bazaar-title" className="dg-section">
      <div className="container-x grid items-center gap-8 lg:grid-cols-12 lg:gap-14">
        <div className="dg-photo dg-photo-lg reveal-zoom aspect-[16/10] lg:col-span-7">
          <Shot pic={pics.street} sizes="(min-width: 1024px) 56vw, 100vw" className="object-cover object-[80%_50%]" />
        </div>
        <div className="lg:col-span-5">
          <p className="eyebrow">Souvenirs</p>
          <h3 id="bazaar-title" className="dg-h2 mt-3">
            {bazaars.title}
          </h3>
          <dl className="mt-5 grid gap-3">
            {bazaars.items.map((b) => (
              <div key={b.name} className="dg-card p-4">
                <dt className="dg-h4">{b.name}</dt>
                <dd className="dg-small mt-1 text-ink-soft">
                  <Prose text={b.text} />
                </dd>
              </div>
            ))}
          </dl>
          <TipLine text={bazaars.tip} className="mt-4" />
        </div>
      </div>
    </section>
  );
}
