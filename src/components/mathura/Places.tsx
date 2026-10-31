import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { morePlaces, placeOrder, places, placesIntro, tipLabel, vrindavanAddOns, type Place } from "@/content/mathura";
import { photos } from "@/content/images";
import { Detail, Heading, LocalTip, Media, Rich } from "./parts";

const number = (p: Place) => String(placeOrder.indexOf(p) + 1).padStart(2, "0");

/** Stop number and H3, linked to the place's own page when it has one. */
function PlaceTitle({ place, className = "" }: { place: Place; className?: string }) {
  return (
    <header className={className}>
      <p className="mt-stop" aria-hidden="true">
        {number(place)}
      </p>
      <h3 id={`${place.id}-title`} className="mt-h3 mt-1">
        {place.href ? (
          <Link href={place.href} className="group inline decoration-marigold decoration-2 underline-offset-[0.15em] hover:underline">
            {place.name}
            <ArrowUpRight size={22} aria-hidden="true" className="btn-arrow ml-1 inline align-baseline text-sandstone" />
          </Link>
        ) : (
          place.name
        )}
      </h3>
    </header>
  );
}

function History({ place, className = "" }: { place: Place; className?: string }) {
  return (
    <div className={className}>
      <p className="mt-label">Historical significance:</p>
      <div className="mt-prose mt-2">
        {place.history.map((h) => (
          <p key={h}>
            <Rich text={h} />
          </p>
        ))}
      </div>
    </div>
  );
}

const Timings = ({ place, className }: { place: Place; className?: string }) => <Detail label={place.timingsLabel} text={place.timings} className={className} />;

/** 01: the image holds still while the longest entry scrolls past it. */
function Janmasthan() {
  const p = places.janmasthan;
  return (
    <article id={p.id} aria-labelledby={`${p.id}-title`} className="container-x grid gap-8 lg:grid-cols-12 lg:gap-14">
      <div className="lg:col-span-6">
        <div className="lg:sticky lg:top-40">
          <Media photo={p.image} sizes="(min-width: 1280px) 600px, (min-width: 1024px) 48vw, 92vw" className="aspect-[4/3] rounded-[1.75rem] shadow-lift lg:aspect-auto lg:h-[min(46rem,calc(100svh-11.5rem))]" imgClassName="object-cover object-[50%_40%]" />
        </div>
      </div>
      <div className="lg:col-span-6">
        <PlaceTitle place={p} />
        <History place={p} className="mt-6" />
        <div className="mt-8 grid gap-6 border-t border-line pt-6 sm:grid-cols-2">
          <Timings place={p} />
          {p.expect && <Detail label="What to expect:" text={p.expect} />}
        </div>
        <LocalTip label={tipLabel} points={p.tips} className="mt-8" />
      </div>
    </article>
  );
}

/** 02: a temple doorway frame. */
function Dwarkadhish() {
  const p = places.dwarkadhish;
  return (
    <article id={p.id} aria-labelledby={`${p.id}-title`} className="container-x grid items-center gap-10 lg:grid-cols-12 lg:gap-14">
      <div className="reveal-zoom order-1 mx-auto w-full max-w-md lg:order-2 lg:col-span-5 lg:col-start-8 lg:max-w-none">
        <Media photo={p.image} sizes="(min-width: 1024px) 38vw, (min-width: 640px) 28rem, 92vw" className="arch aspect-[4/5] shadow-lift" />
      </div>
      <div className="order-2 lg:order-1 lg:col-span-6">
        <PlaceTitle place={p} />
        <History place={p} className="mt-6" />
        <Timings place={p} className="mt-6" />
        {p.tip && <LocalTip label={tipLabel} text={p.tip} className="mt-7" />}
      </div>
    </article>
  );
}

/** 03: legend and history set side by side on fired brick, as the guide tells it. */
function KansaQila() {
  const p = places["kansa-qila"];
  const [legend, record] = p.history;
  return (
    <article id={p.id} aria-labelledby={`${p.id}-title`} className="mt-dark mt-brick relative">
      <div className="relative h-[44svh] min-h-72 lg:h-[72svh]">
        <Media photo={p.image} sizes="100vw" className="absolute inset-0 bg-brick" imgClassName="object-cover object-[50%_40%]" />
        <div className="mt-fort-fade absolute inset-0" aria-hidden="true" />
      </div>
      <div className="container-x relative -mt-20 pb-16 lg:-mt-40 lg:pb-24">
        <PlaceTitle place={p} className="max-w-3xl" />
        <p className="mt-label mt-8">Historical significance:</p>
        <div className="mt-4 grid gap-8 lg:grid-cols-2 lg:gap-0">
          <div className="lg:border-r lg:border-white/15 lg:pr-12">
            <p className="font-editorial text-xl italic text-marigold">The story that lives in people&apos;s hearts</p>
            <p className="mt-3 font-editorial text-[1.75rem] leading-snug text-white">
              <Rich text={legend} />
            </p>
          </div>
          <div className="lg:pl-12">
            <p className="font-editorial text-xl italic text-marigold">The history that lives in the bricks</p>
            <p className="mt-prose mt-3">
              <Rich text={record} />
            </p>
          </div>
        </div>
        <div className="mt-10 grid gap-6 lg:grid-cols-2 lg:gap-12">
          <Timings place={p} />
          {p.tip && <LocalTip label={tipLabel} text={p.tip} />}
        </div>
      </div>
    </article>
  );
}

/** 04: a wide view of the water, with three short columns beneath. */
function PotaraKund() {
  const p = places["potara-kund"];
  return (
    <article id={p.id} aria-labelledby={`${p.id}-title`} className="container-x">
      <Media photo={p.image} sizes="(min-width: 1280px) 1216px, 92vw" className="reveal-zoom aspect-[4/3] rounded-[1.75rem] shadow-lift sm:aspect-[16/9] lg:aspect-[21/9]" imgClassName="object-cover object-[50%_62%]" />
      <div className="mt-8 grid gap-8 lg:grid-cols-12 lg:gap-12">
        <PlaceTitle place={p} className="lg:col-span-3" />
        <div className="lg:col-span-5">
          <History place={p} />
          <Timings place={p} className="mt-6" />
        </div>
        {p.tip && <LocalTip label={tipLabel} text={p.tip} className="lg:col-span-4" />}
      </div>
    </article>
  );
}

/** 05: the museum building with one of its sculptures laid over the corner. */
function Museum() {
  const p = places.museum;
  const buddha = photos["mathura-museum-buddha"];
  return (
    <article id={p.id} aria-labelledby={`${p.id}-title`} className="container-x grid items-center gap-10 lg:grid-cols-12 lg:gap-14">
      <figure className="relative pb-14 lg:col-span-6 lg:pb-20">
        <Media photo={p.image} sizes="(min-width: 1280px) 600px, (min-width: 1024px) 48vw, 92vw" className="aspect-[4/3] rounded-[1.75rem] shadow-lift" />
        <Media photo="mathura-museum-buddha" alt={buddha.alt} sizes="(min-width: 640px) 12rem, 8rem" className="absolute bottom-0 right-5 aspect-[1/2] w-28 rounded-xl border-4 border-parchment shadow-lift sm:right-8 sm:w-40 lg:w-44" imgClassName="object-cover object-top" />
      </figure>
      <div className="lg:col-span-6">
        <PlaceTitle place={p} />
        <History place={p} className="mt-6" />
        <Timings place={p} className="mt-6" />
        {p.tip && <LocalTip label={tipLabel} text={p.tip} className="mt-7" />}
      </div>
    </article>
  );
}

/** 06: hung like a painting, because it is one. */
function JamaMasjid() {
  const p = places["jama-masjid"];
  return (
    <article id={p.id} aria-labelledby={`${p.id}-title`} className="bg-parchment-deep py-16 lg:py-24">
      <div className="container-x grid items-center gap-10 lg:grid-cols-12 lg:gap-14">
        <div className="lg:col-span-5">
          <PlaceTitle place={p} />
          <History place={p} className="mt-6" />
          <Timings place={p} className="mt-6" />
        </div>
        <div className="lg:col-span-7">
          <figure className="mt-mat">
            <Media photo={p.image} sizes="(min-width: 1280px) 660px, (min-width: 1024px) 54vw, 86vw" className="aspect-[4/3]" />
            <figcaption className="mt-3 text-center text-sm italic text-stone">The mosque of Abd-un-Nabi, painted by Thomas Daniell in 1827</figcaption>
          </figure>
          {p.tip && <LocalTip label={tipLabel} text={p.tip} className="mt-7" />}
        </div>
      </div>
    </article>
  );
}

/** 07: the walk ends at the river, at full width. */
function VishramGhat() {
  const p = places["vishram-ghat"];
  return (
    <article id={p.id} aria-labelledby={`${p.id}-title`} className="relative lg:min-h-[52rem]">
      <Media photo={p.image} sizes="100vw" className="h-[46svh] min-h-72 lg:absolute lg:inset-0 lg:h-auto" imgClassName="object-cover object-[50%_55%]" />
      <div className="container-x relative -mt-14 lg:mt-0 lg:flex lg:min-h-[52rem] lg:items-center lg:justify-end lg:py-14">
        <div className="reveal rounded-[1.75rem] bg-parchment p-6 shadow-lift sm:p-9 lg:max-w-[38rem]">
          <PlaceTitle place={p} />
          <History place={p} className="mt-5" />
          <Timings place={p} className="mt-5" />
          {p.tip && <LocalTip label={tipLabel} text={p.tip} className="mt-6" />}
        </div>
      </div>
    </article>
  );
}

function AddOns() {
  return (
    <section aria-labelledby="addons-title" className="container-x">
      <div className="max-w-2xl">
        <h3 id="addons-title" className="mt-h3">
          {vrindavanAddOns.title}
        </h3>
        <p className="mt-prose mt-3">
          <Rich text={vrindavanAddOns.lede} />
        </p>
      </div>
      <ul className="swipe-row mt-8 sm:grid sm:grid-flow-row sm:grid-cols-3 sm:gap-5 sm:overflow-visible">
        {vrindavanAddOns.items.map((item) => (
          <li key={item.name}>
            <Link href={item.href} className="group mt-tile block">
              <Media photo={item.image} sizes="(min-width: 640px) 31vw, 80vw" className="aspect-[3/4]" />
              <div className="mt-tile-body">
                <h4 className="font-editorial text-[1.75rem] leading-tight text-white">{item.name}</h4>
                <p className="mt-1 text-sm leading-relaxed text-white/85">{item.text}</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
      <p className="mt-body mt-6">
        <Rich text={vrindavanAddOns.footer} />
      </p>
    </section>
  );
}

function MorePlaces() {
  return (
    <section aria-labelledby="more-places-title" className="container-x">
      <h3 id="more-places-title" className="mt-h3">
        {morePlaces.title}
      </h3>
      <ul className="mt-6 grid gap-x-10 sm:grid-cols-2 lg:grid-cols-4">
        {morePlaces.items.map((m) => (
          <li key={m.name} className="border-t border-ink/20 py-4">
            <h4 className="font-editorial text-2xl leading-tight">{m.name}</h4>
            <p className="mt-body mt-1">{m.text}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function Places() {
  return (
    <section id="places" aria-labelledby="places-title" className="pt-16 lg:pt-24">
      <div className="container-x">
        <Heading id="places-title" kicker="The walk" title={placesIntro.title} lede={placesIntro.lede} />
        <ol className="mt-route mt-10">
          {placeOrder.map((p, i) => (
            <li key={p.id}>
              <a href={`#${p.id}`} className="mt-route-link">
                <span className="mt-route-dot">{i + 1}</span>
                {p.name}
              </a>
            </li>
          ))}
        </ol>
      </div>
      <div className="mt-14 grid gap-16 lg:mt-20 lg:gap-28">
        <Janmasthan />
        <Dwarkadhish />
        <KansaQila />
        <PotaraKund />
        <Museum />
        <JamaMasjid />
      </div>
      <VishramGhat />
      <div className="grid gap-16 py-16 lg:gap-20 lg:py-24">
        <AddOns />
        <MorePlaces />
      </div>
    </section>
  );
}
