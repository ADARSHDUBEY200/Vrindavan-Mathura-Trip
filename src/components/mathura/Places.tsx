import Link from "next/link";
import { ArrowUpRight, Clock, ShieldCheck } from "lucide-react";
import { Fact, PlaceIndex, PlaceTitle, SectionHead } from "@/components/destination/kit";
import { morePlaces, placeOrder, places, placesIntro, tipLabel, vrindavanAddOns, type Place } from "@/content/mathura";
import { photos } from "@/content/images";
import { LocalTip, Media, Rich } from "./parts";

const stop = (p: Place) => placeOrder.indexOf(p) + 1;

function Title({ place, className = "" }: { place: Place; className?: string }) {
  return <PlaceTitle n={stop(place)} id={`${place.id}-title`} name={place.name} href={place.href} className={className} />;
}

function History({ place, className = "" }: { place: Place; className?: string }) {
  return (
    <div className={`dg-prose dg-body ${className}`}>
      {place.history.map((h) => (
        <p key={h}>
          <Rich text={h} />
        </p>
      ))}
    </div>
  );
}

function Timings({ place }: { place: Place }) {
  return (
    <Fact icon={Clock} label={place.timingsLabel}>
      <Rich text={place.timings} />
    </Fact>
  );
}

/** 01: the photograph holds still while the longest entry scrolls past it. */
function Janmasthan() {
  const p = places.janmasthan;
  return (
    <article id={p.id} aria-labelledby={`${p.id}-title`} className="grid gap-8 lg:grid-cols-12 lg:gap-14">
      <div className="lg:col-span-6">
        <Media photo={p.image} sizes="(min-width: 1280px) 600px, (min-width: 1024px) 48vw, 92vw" className="dg-photo-lg aspect-[4/3] shadow-lift lg:sticky lg:top-40 lg:aspect-auto lg:h-[min(40rem,calc(100svh-12rem))]" imgClassName="object-cover object-[50%_40%]">
          <span className="dg-caption">Katra Keshav Dev, Mathura</span>
        </Media>
      </div>
      <div className="lg:col-span-6">
        <Title place={p} />
        <p className="dg-label mt-5">Historical significance</p>
        <History place={p} className="mt-2" />
        <div className="dg-card mt-6 grid gap-5 p-5 sm:grid-cols-2">
          <Timings place={p} />
          {p.expect && (
            <Fact icon={ShieldCheck} label="What to expect">
              <Rich text={p.expect} />
            </Fact>
          )}
        </div>
        <LocalTip label={tipLabel} points={p.tips} className="mt-4" />
      </div>
    </article>
  );
}

/** 02: text first, the temple to the side. */
function Dwarkadhish() {
  const p = places.dwarkadhish;
  return (
    <article id={p.id} aria-labelledby={`${p.id}-title`} className="grid items-center gap-8 lg:grid-cols-12 lg:gap-14">
      <Media photo={p.image} sizes="(min-width: 1024px) 40vw, (min-width: 640px) 28rem, 92vw" className="reveal-zoom dg-photo-lg mx-auto aspect-[4/3] w-full shadow-lift sm:aspect-[16/11] lg:order-2 lg:col-span-5 lg:col-start-8 lg:aspect-[4/5]" />
      <div className="lg:order-1 lg:col-span-7">
        <Title place={p} />
        <History place={p} className="mt-4" />
        <div className="mt-5 grid gap-4">
          <Timings place={p} />
          {p.tip && <LocalTip label={tipLabel} text={p.tip} />}
        </div>
      </div>
    </article>
  );
}

/** 03: legend and record side by side, on the page's one dark card in this walk. */
function KansaQila() {
  const p = places["kansa-qila"];
  const [legend, record] = p.history;
  return (
    <article id={p.id} aria-labelledby={`${p.id}-title`} className="dg-dark overflow-hidden rounded-[1.75rem]">
      <div className="relative h-60 sm:h-80 lg:h-[24rem]">
        <Media photo={p.image} sizes="(min-width: 1280px) 1216px, 100vw" className="absolute inset-0 rounded-none" imgClassName="object-cover object-[50%_40%]" />
        <div className="absolute inset-0 bg-linear-to-t from-[#1f120c] via-[#1f120c]/30 to-transparent" aria-hidden="true" />
      </div>
      <div className="relative -mt-10 p-6 pt-0 sm:p-9 sm:pt-0 lg:p-11 lg:pt-0">
        <Title place={p} />
        <div className="mt-6 grid gap-6 lg:grid-cols-2 lg:gap-0">
          <div className="lg:border-r lg:border-white/12 lg:pr-10">
            <p className="dg-label">The story that lives in people&apos;s hearts</p>
            <p className="dg-lead mt-2.5">
              <Rich text={legend} />
            </p>
          </div>
          <div className="lg:pl-10">
            <p className="dg-label">The history that lives in the bricks</p>
            <p className="dg-body mt-2.5">
              <Rich text={record} />
            </p>
          </div>
        </div>
        <div className="mt-8 grid gap-4 border-t border-white/12 pt-6 lg:grid-cols-2 lg:gap-10">
          <Timings place={p} />
          {p.tip && <LocalTip label={tipLabel} text={p.tip} />}
        </div>
      </div>
    </article>
  );
}

/** 04 to 06: three shorter stops as a row of cards. */
function PlaceCard({ place, photoClass = "", figure }: { place: Place; photoClass?: string; figure?: React.ReactNode }) {
  return (
    <article id={place.id} aria-labelledby={`${place.id}-title`} className="dg-card flex flex-col overflow-hidden">
      <Media photo={place.image} sizes="(min-width: 1024px) 31vw, (min-width: 640px) 46vw, 92vw" className={`aspect-[4/3] rounded-none ${photoClass}`}>
        {figure}
      </Media>
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <Title place={place} />
        <History place={place} className="mt-3" />
        <div className="mt-5 grid gap-4 border-t border-line pt-5">
          <Timings place={place} />
        </div>
        {place.tip && <LocalTip label={tipLabel} text={place.tip} className="mt-4" />}
      </div>
    </article>
  );
}

function ShortStops() {
  const buddha = photos["mathura-museum-buddha"];
  return (
    <div className="reveal-stagger grid gap-5 md:grid-cols-2 lg:grid-cols-3 md:[&>*:last-child]:col-span-2 lg:[&>*:last-child]:col-span-1">
      <PlaceCard place={places["potara-kund"]} photoClass="[&_img]:object-[50%_62%]" />
      <PlaceCard
        place={places.museum}
        figure={<Media photo="mathura-museum-buddha" alt={buddha.alt} sizes="7rem" className="absolute bottom-3 right-3 z-10 aspect-[1/2] w-20 rounded-xl border-[3px] border-white shadow-lift sm:w-24" imgClassName="object-cover object-top" />}
      />
      <PlaceCard place={places["jama-masjid"]} figure={<span className="dg-caption">Thomas Daniell, 1827</span>} />
    </div>
  );
}

/** 07: the walk ends at the river, with its notes on a card over the photograph. */
function VishramGhat() {
  const p = places["vishram-ghat"];
  return (
    <article id={p.id} aria-labelledby={`${p.id}-title`} className="relative lg:flex lg:min-h-[38rem] lg:items-center lg:justify-end lg:p-8">
      <Media photo={p.image} sizes="(min-width: 1280px) 1216px, 100vw" className="dg-photo-lg aspect-[4/3] sm:aspect-[16/9] lg:absolute lg:inset-0 lg:aspect-auto" imgClassName="object-cover object-[50%_55%]" />
      <div className="dg-card reveal relative mx-3 -mt-12 p-6 sm:mx-8 sm:p-8 lg:m-0 lg:max-w-[33rem] lg:shadow-lift">
        <Title place={p} />
        <History place={p} className="mt-4" />
        <div className="mt-5 grid gap-4">
          <Timings place={p} />
          {p.tip && <LocalTip label={tipLabel} text={p.tip} />}
        </div>
      </div>
    </article>
  );
}

function AddOns() {
  return (
    <section aria-labelledby="addons-title">
      <SectionHead id="addons-title" as="h3" eyebrow="11 to 15 km away" title={vrindavanAddOns.title} lede={<Rich text={vrindavanAddOns.lede} />} />
      <ul className="swipe-row reveal-stagger mt-6 sm:grid sm:grid-flow-row sm:grid-cols-3 sm:gap-4 sm:overflow-visible">
        {vrindavanAddOns.items.map((item) => (
          <li key={item.name}>
            <Link href={item.href} className="dg-tile aspect-[4/5] sm:aspect-[10/11]">
              <Media photo={item.image} sizes="(min-width: 640px) 31vw, 80vw" className="absolute inset-0 rounded-none" />
              <span className="dg-tile-arrow" aria-hidden="true">
                <ArrowUpRight size={16} />
              </span>
              <span className="dg-tile-body">
                <h4 className="dg-h4 text-[1.1rem]">{item.name}</h4>
                <span className="mt-1 block text-sm leading-snug text-white/85">{item.text}</span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
      <p className="dg-small mt-4">
        <Rich text={vrindavanAddOns.footer} />
      </p>
    </section>
  );
}

function MorePlaces() {
  return (
    <section aria-labelledby="more-places-title">
      <SectionHead id="more-places-title" as="h3" title={morePlaces.title} />
      <ul className="reveal-stagger mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {morePlaces.items.map((m) => (
          <li key={m.name} className="dg-card p-5">
            <h4 className="dg-h4">{m.name}</h4>
            <p className="dg-small mt-1.5">{m.text}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function Places() {
  return (
    <section id="places" aria-labelledby="places-title" className="dg-section">
      <div className="container-x">
        <SectionHead id="places-title" eyebrow="The walk" title={placesIntro.title} lede={<Rich text={placesIntro.lede} />} />
        <div className="mt-7">
          <PlaceIndex
            items={placeOrder.map((p) => ({
              id: p.id,
              name: p.name,
              image: <Media photo={p.image} alt="" sizes="(min-width: 1024px) 11rem, 10rem" className="absolute inset-0 rounded-none" />,
            }))}
          />
        </div>
        <div className="mt-12 grid gap-14 lg:mt-16 lg:gap-20">
          <Janmasthan />
          <Dwarkadhish />
          <KansaQila />
          <ShortStops />
          <VishramGhat />
          <div className="grid gap-12 border-t border-line pt-12 lg:gap-14 lg:pt-14">
            <AddOns />
            <MorePlaces />
          </div>
        </div>
      </div>
    </section>
  );
}
