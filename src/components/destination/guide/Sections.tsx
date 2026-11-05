import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Car, CheckCircle2, Clock, Globe, Info, Mail, Package, Phone, Plane, Sparkles, TrainFront } from "lucide-react";
import { Fact, PlaceIndex, PlaceTitle, SeasonCards, SectionHead, YearBar } from "@/components/destination/kit";
import { EnquiryForm } from "@/components/forms/EnquiryForm";
import { EnquireButton } from "@/components/tour-packages/EnquireButton";
import { EnquiryButtons } from "@/components/ui/EnquiryButtons";
import { FOUNDER, RATING, FOUNDED, PILGRIMS, mailtoHref, phoneHref, site } from "@/config/site";
import { BRAJ_MONTHS, type BrajGuide, type GuideExperience, type GuidePlace } from "@/content/braj/types";
import { price } from "@/content/braj/common";
import { photos } from "@/content/images";
import { Bullets, IconField, Inset, Paragraphs, Photo, Rich, TipBox } from "./parts";

const updatedOn = (iso: string) => new Date(iso).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });

/** Splits a list into runs, so consecutive cards share one grid. */
function runs<T extends { layout: string }>(items: readonly T[]) {
  const out: (T | T[])[] = [];
  for (const item of items) {
    const last = out.at(-1);
    if (item.layout !== "card") out.push(item);
    else if (Array.isArray(last)) last.push(item);
    else out.push([item]);
  }
  return out;
}
const cols = (n: number) => (n % 3 === 0 ? "md:grid-cols-2 lg:grid-cols-3 md:[&>*:last-child]:col-span-2 lg:[&>*:last-child]:col-span-1" : "md:grid-cols-2");

/* ------------------------------------------------------------------ */
/* Opening                                                             */
/* ------------------------------------------------------------------ */

/** The founder's letter, beside a ledger of quick facts. */
export function Intro({ g }: { g: BrajGuide }) {
  const tel = phoneHref();
  return (
    <section aria-labelledby="intro-title" className="dg-section">
      <div className="container-x grid items-start gap-10 lg:grid-cols-12 lg:gap-14">
        <div className="lg:col-span-7">
          <header className="dg-head">
            <p className="eyebrow">A letter from a Brijwasi</p>
            <h2 id="intro-title" className="dg-h2 mt-3">
              {g.intro.greeting}
            </h2>
          </header>
          <Paragraphs items={g.intro.paragraphs} className="mt-5" />
          <p className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-stone">
            <span className="font-semibold text-ink">{FOUNDER.name}</span>
            <span aria-hidden="true">·</span>
            <span>{FOUNDER.jobTitle}</span>
            <span aria-hidden="true">·</span>
            <span>
              Last updated <time dateTime={g.updated}>{updatedOn(g.updated)}</time>
            </span>
          </p>
          <ul className="mt-5 flex flex-wrap gap-2">
            {tel && (
              <li>
                <a href={tel} className="dg-chip">
                  <Phone size={15} aria-hidden="true" /> {site.contact.phone}
                </a>
              </li>
            )}
            <li className="min-w-0 max-w-full">
              <a href={mailtoHref(`${g.name} trip enquiry`)} className="dg-chip max-w-full break-all">
                <Mail size={15} aria-hidden="true" /> {site.contact.email}
              </a>
            </li>
            <li>
              <Link href="/tour-packages" className="dg-chip">
                <Package size={15} aria-hidden="true" /> Mathura Vrindavan Tour Packages
              </Link>
            </li>
          </ul>
          <p className="dg-note mt-6">
            <Info size={17} aria-hidden="true" />
            <span>
              <Rich text={g.intro.note} />
            </span>
          </p>
        </div>

        <aside id="glance" aria-labelledby="glance-title" className="dg-card reveal overflow-hidden lg:sticky lg:top-36 lg:col-span-5">
          <div className="dg-wash dg-head border-b border-[var(--dg-o100)] px-6 py-5">
            <p className="eyebrow">Quick facts</p>
            <h2 id="glance-title" className="dg-h3 mt-2">
              {g.glance.title}
            </h2>
          </div>
          <dl className="divide-y divide-line px-6">
            {g.glance.rows.map((r) => (
              <div key={r.label} className="grid gap-1 py-3.5 sm:grid-cols-[9.5rem_minmax(0,1fr)] sm:gap-4">
                <dt className="dg-label pt-0.5">{r.label}</dt>
                <dd className="text-[0.9rem] font-medium leading-snug text-ink">{r.value}</dd>
              </div>
            ))}
          </dl>
        </aside>
      </div>
    </section>
  );
}

/** Why the place matters: one photograph beside the story, closing on its key line. */
export function Story({ g }: { g: BrajGuide }) {
  const s = g.story;
  return (
    <section id="story" aria-labelledby="story-title" className="dg-section dg-cream">
      <div className="container-x grid items-center gap-8 lg:grid-cols-12 lg:gap-14">
        <figure className="reveal-zoom lg:col-span-5">
          <Photo photo={s.image} position={s.imagePosition} sizes="(min-width: 1024px) 40vw, 92vw" className="dg-photo-lg aspect-[4/3] shadow-lift lg:aspect-[4/5]">
            {s.caption && <figcaption className="dg-caption">{s.caption}</figcaption>}
          </Photo>
        </figure>
        <div className="lg:col-span-7">
          <header className="dg-head">
            <p className="eyebrow">{s.eyebrow}</p>
            <h2 id="story-title" className="dg-h2 mt-3">
              {s.title}
            </h2>
          </header>
          <Paragraphs items={s.paragraphs} className="mt-4" />
          {s.highlight && (
            <p className="dg-quote mt-6">
              <Rich text={s.highlight} />
            </p>
          )}
        </div>
      </div>
    </section>
  );
}

export function Callout({ g }: { g: BrajGuide }) {
  if (!g.callout) return null;
  return (
    <section aria-labelledby="callout-title" className="pt-10 lg:pt-14">
      <div className="container-x">
        <div className="dg-wash grid gap-4 rounded-[1.5rem] border border-[var(--dg-o100)] p-6 sm:p-8 lg:grid-cols-[auto_minmax(0,1fr)] lg:gap-8">
          <span className="dg-icon mx-auto size-12 lg:mx-0" aria-hidden="true">
            <Info size={20} />
          </span>
          <div>
            <h2 id="callout-title" className="dg-h3 dg-head">
              {g.callout.title}
            </h2>
            <p className="dg-body mt-3">
              <Rich text={g.callout.text} />
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Places                                                              */
/* ------------------------------------------------------------------ */

function PlaceBody({ place, n, className = "" }: { place: GuidePlace; n: number; className?: string }) {
  return (
    <div className={className}>
      <PlaceTitle n={n} id={`${place.id}-title`} name={place.name} href={place.href} />
      <Paragraphs items={place.paragraphs} className="mt-4" />
      {place.note && (
        <p className="dg-note mt-5">
          <Info size={17} aria-hidden="true" />
          <span>
            <Rich text={place.note} />
          </span>
        </p>
      )}
    </div>
  );
}

function Timings({ place }: { place: GuidePlace }) {
  if (!place.timings) return null;
  return (
    <Fact icon={Clock} label={place.timings.label}>
      <Rich text={place.timings.text} />
    </Fact>
  );
}

/** A long entry: the photograph holds still while the text scrolls past it. */
function FeaturePlace({ place, n }: { place: GuidePlace; n: number }) {
  return (
    <article id={place.id} aria-labelledby={`${place.id}-title`} className="grid gap-8 lg:grid-cols-12 lg:gap-14">
      <div className="lg:col-span-6">
        {place.image ? (
          <Photo photo={place.image} position={place.imagePosition} sizes="(min-width: 1280px) 600px, (min-width: 1024px) 48vw, 92vw" className="dg-photo-lg aspect-[4/3] shadow-lift lg:sticky lg:top-40 lg:aspect-auto lg:h-[min(38rem,calc(100svh-12rem))]">
            {place.caption && <span className="dg-caption">{place.caption}</span>}
            {place.inset && <Inset photo={place.inset} />}
          </Photo>
        ) : (
          <IconField icon={place.icon} className="dg-photo dg-photo-lg aspect-[4/3]" />
        )}
      </div>
      <div className="lg:col-span-6">
        <PlaceBody place={place} n={n} />
        {place.timings && (
          <div className="dg-card mt-6 p-5">
            <Timings place={place} />
          </div>
        )}
        {place.tip && <TipBox tip={place.tip} className="mt-4" />}
      </div>
    </article>
  );
}

/** A photograph to one side, alternating with each split entry. */
function SplitPlace({ place, n, flip }: { place: GuidePlace; n: number; flip: boolean }) {
  return (
    <article id={place.id} aria-labelledby={`${place.id}-title`} className="grid items-center gap-8 lg:grid-cols-12 lg:gap-14">
      {place.image && (
        <Photo
          photo={place.image}
          position={place.imagePosition}
          sizes="(min-width: 1024px) 40vw, 92vw"
          className={`reveal-zoom dg-photo-lg aspect-[4/3] shadow-lift sm:aspect-[16/11] lg:col-span-5 lg:aspect-[4/5] ${flip ? "lg:order-2 lg:col-start-8" : ""}`}
        >
          {place.caption && <span className="dg-caption">{place.caption}</span>}
          {place.inset && <Inset photo={place.inset} />}
        </Photo>
      )}
      <div className={place.image ? `lg:col-span-7 ${flip ? "lg:order-1" : ""}` : "lg:col-span-12"}>
        <PlaceBody place={place} n={n} />
        <div className="mt-5 grid gap-4">
          <Timings place={place} />
          {place.tip && <TipBox tip={place.tip} />}
        </div>
      </div>
    </article>
  );
}

/** The walk's one dark card: legend on the left, practical notes on the right. */
function DarkPlace({ place, n }: { place: GuidePlace; n: number }) {
  return (
    <article id={place.id} aria-labelledby={`${place.id}-title`} className="dg-dark overflow-hidden rounded-[1.75rem]">
      {place.image && <Photo photo={place.image} position={place.imagePosition} sizes="(min-width: 1280px) 1216px, 100vw" className="h-60 rounded-none sm:h-80 lg:h-[22rem]" />}
      <div className="grid gap-8 p-6 sm:p-9 lg:grid-cols-12 lg:gap-12 lg:p-11">
        <PlaceBody place={place} n={n} className="lg:col-span-7" />
        <div className="grid content-start gap-4 lg:col-span-5 lg:border-l lg:border-white/12 lg:pl-10">
          <Timings place={place} />
          {place.tip && <TipBox tip={place.tip} />}
        </div>
      </div>
    </article>
  );
}

/** A shorter stop as a card: photograph or icon field on top, notes beneath. */
function CardPlace({ place, n }: { place: GuidePlace; n: number }) {
  return (
    <article id={place.id} aria-labelledby={`${place.id}-title`} className="dg-card flex flex-col overflow-hidden">
      {place.image ? (
        <Photo photo={place.image} position={place.imagePosition} sizes="(min-width: 1024px) 31vw, (min-width: 768px) 46vw, 92vw" className="aspect-[16/10] rounded-none" />
      ) : (
        <IconField icon={place.icon} className="h-20" />
      )}
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <PlaceBody place={place} n={n} />
        {place.timings && (
          <div className="mt-5 border-t border-line pt-5">
            <Timings place={place} />
          </div>
        )}
        {place.tip && <TipBox tip={place.tip} className="mt-4" />}
      </div>
    </article>
  );
}

export function Places({ g }: { g: BrajGuide }) {
  const { items } = g.places;
  const number = (p: GuidePlace) => items.indexOf(p) + 1;
  let splits = 0;
  return (
    <section id="places" aria-labelledby="places-title" className="dg-section">
      <div className="container-x">
        <SectionHead id="places-title" eyebrow="Sacred places" title={g.places.title} lede={<Rich text={g.places.lede} />} />
        <div className="mt-7">
          <PlaceIndex
            items={items.map((p) => ({
              id: p.id,
              name: p.name,
              image: p.image ? <Photo photo={p.image} alt="" sizes="(min-width: 1024px) 11rem, 10rem" className="absolute inset-0 rounded-none" /> : <IconField icon={p.icon} className="absolute inset-0" />,
            }))}
          />
        </div>
        <div className="mt-12 grid gap-14 lg:mt-16 lg:gap-20">
          {runs(items).map((run) =>
            Array.isArray(run) ? (
              <div key={run[0].id} className={`reveal-stagger grid gap-5 ${cols(run.length)}`}>
                {run.map((p) => (
                  <CardPlace key={p.id} place={p} n={number(p)} />
                ))}
              </div>
            ) : run.layout === "feature" ? (
              <FeaturePlace key={run.id} place={run} n={number(run)} />
            ) : run.layout === "dark" ? (
              <DarkPlace key={run.id} place={run} n={number(run)} />
            ) : (
              <SplitPlace key={run.id} place={run} n={number(run)} flip={splits++ % 2 === 1} />
            ),
          )}
          {g.places.more && (
            <section aria-labelledby="more-places-title" className="border-t border-line pt-12 lg:pt-14">
              <SectionHead id="more-places-title" as="h3" title={g.places.more.title} />
              <ul className={`reveal-stagger mt-5 grid gap-3 sm:grid-cols-2 ${g.places.more.items.length === 3 ? "lg:grid-cols-3" : "lg:grid-cols-4"}`}>
                {g.places.more.items.map((m) => (
                  <li key={m.name} className="dg-card p-5">
                    <h4 className="dg-h4">{m.name}</h4>
                    <p className="dg-small mt-1.5">
                      <Rich text={m.text} />
                    </p>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Things to do                                                        */
/* ------------------------------------------------------------------ */

const expId = (e: GuideExperience, i: number) => e.id ?? `thing-${i + 1}`;

/** The festival set piece: a dark card with the photographs, the story and the long tip list side by side. */
function FeatureExperience({ e, id }: { e: GuideExperience; id: string }) {
  return (
    <article id={id} aria-labelledby={`${id}-title`} className="dg-dark overflow-hidden rounded-[1.75rem]">
      {e.image && (
        <Photo photo={e.image} position={e.imagePosition} sizes="(min-width: 1280px) 1216px, 100vw" className="h-64 rounded-none sm:h-80 lg:h-[24rem]">
          {e.inset && <Inset photo={e.inset} />}
        </Photo>
      )}
      <div className="grid gap-8 p-6 sm:p-9 lg:grid-cols-12 lg:gap-12 lg:p-11">
        <div className="lg:col-span-7">
          <header className="dg-head">
            {e.eyebrow && <p className="eyebrow">{e.eyebrow}</p>}
            <h3 id={`${id}-title`} className={`dg-h2 ${e.eyebrow ? "mt-3" : ""}`}>
              {e.title}
            </h3>
          </header>
          <Paragraphs items={e.paragraphs} className="mt-5" />
        </div>
        {e.tip && <TipBox tip={e.tip} className="self-start lg:col-span-5" />}
        {e.close && (
          <p className="dg-small border-t border-white/12 pt-5 lg:col-span-12">
            <Rich text={e.close} />
          </p>
        )}
      </div>
    </article>
  );
}

function SplitExperience({ e, id, flip }: { e: GuideExperience; id: string; flip: boolean }) {
  return (
    <article id={id} aria-labelledby={`${id}-title`} className="grid items-start gap-8 lg:grid-cols-12 lg:gap-14">
      {e.image ? (
        <Photo photo={e.image} position={e.imagePosition} sizes="(min-width: 1024px) 40vw, 92vw" className={`reveal-zoom dg-photo-lg aspect-[4/3] shadow-lift lg:col-span-5 lg:aspect-[5/4] ${flip ? "lg:order-2 lg:col-start-8" : ""}`}>
          {e.inset && <Inset photo={e.inset} />}
        </Photo>
      ) : null}
      <div className={e.image ? `lg:col-span-7 ${flip ? "lg:order-1" : ""}` : "lg:col-span-7"}>
        <h3 id={`${id}-title`} className="dg-h3 dg-head">
          {e.title}
        </h3>
        <Paragraphs items={e.paragraphs} className="mt-3" />
        {e.list && (
          <div className="dg-card mt-5 p-5">
            {e.list.title && <p className="dg-label">{e.list.title}</p>}
            <Bullets items={e.list.items} className={e.list.title ? "mt-3" : ""} />
          </div>
        )}
        {e.image && e.tip && <TipBox tip={e.tip} className="mt-5" />}
        {e.close && (
          <p className="dg-small mt-4">
            <Rich text={e.close} />
          </p>
        )}
      </div>
      {!e.image && e.tip && <TipBox tip={e.tip} className="lg:col-span-5" />}
    </article>
  );
}

function CardExperience({ e, id }: { e: GuideExperience; id: string }) {
  return (
    <article id={id} aria-labelledby={`${id}-title`} className="dg-card flex flex-col overflow-hidden">
      {e.image && <Photo photo={e.image} position={e.imagePosition} sizes="(min-width: 1024px) 31vw, (min-width: 768px) 46vw, 92vw" className="aspect-[16/9] rounded-none" />}
      <div className="p-5 sm:p-6">
        {!e.image && (
          <span className="dg-icon mb-4 max-md:mx-auto" aria-hidden="true">
            <Sparkles size={18} />
          </span>
        )}
        <h3 id={`${id}-title`} className="dg-h4 dg-head text-[1.05rem]">
          {e.title}
        </h3>
        <Paragraphs items={e.paragraphs} className="dg-small mt-2" />
        {e.tip && <TipBox tip={e.tip} className="mt-4" />}
      </div>
    </article>
  );
}

export function Things({ g }: { g: BrajGuide }) {
  const { items } = g.things;
  const ids = new Map(items.map((e, i) => [e, expId(e, i)]));
  let splits = 0;
  return (
    <section id="things-to-do" aria-labelledby="things-title" className="dg-section dg-cream">
      <div className="container-x">
        <SectionHead id="things-title" eyebrow="Beyond darshan" title={g.things.title} lede={<Rich text={g.things.lede} />} />
        <div className="mt-8 grid gap-12 lg:gap-16">
          {runs(items).map((run) =>
            Array.isArray(run) ? (
              <div key={ids.get(run[0])} className={`reveal-stagger grid gap-5 ${cols(run.length)}`}>
                {run.map((e) => (
                  <CardExperience key={ids.get(e)} e={e} id={ids.get(e)!} />
                ))}
              </div>
            ) : run.layout === "feature" ? (
              <FeatureExperience key={ids.get(run)} e={run} id={ids.get(run)!} />
            ) : (
              <SplitExperience key={ids.get(run)} e={run} id={ids.get(run)!} flip={splits++ % 2 === 1} />
            ),
          )}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Planning                                                            */
/* ------------------------------------------------------------------ */

export function BestTime({ g }: { g: BrajGuide }) {
  const b = g.bestTime;
  const months = BRAJ_MONTHS.map((season, i) => ({ season, festival: b.festivals[i] }));
  return (
    <section id="best-time" aria-labelledby="best-time-title" className="dg-section">
      <div className="container-x">
        <div className="grid items-center gap-8 lg:grid-cols-12 lg:gap-14">
          <div className={b.image ? "lg:col-span-7" : "lg:col-span-12"}>
            <SectionHead id="best-time-title" eyebrow="When to come" title={b.title} />
            <p className="dg-body mt-4 max-w-2xl">
              <Rich text={b.text} />
            </p>
          </div>
          {b.image && <Photo photo={b.image} sizes="(min-width: 1024px) 38vw, 92vw" className="reveal-zoom dg-photo-lg aspect-[16/10] lg:col-span-5" />}
        </div>
        <div className="mt-9">
          <YearBar months={months} />
        </div>
        <div className="mt-6">
          <SeasonCards seasons={b.seasons} />
        </div>
        <div className="mt-8 grid gap-5">
          {b.peaks.map((p) => (
            <div key={p.title} className={`dg-card overflow-hidden ${p.image ? "grid lg:grid-cols-12" : ""}`}>
              {p.image && <Photo photo={p.image} sizes="(min-width: 1024px) 34vw, 92vw" className="aspect-[16/10] rounded-none lg:col-span-5 lg:aspect-auto lg:min-h-full" />}
              <div className={`grid gap-6 p-6 sm:p-8 ${p.image ? "lg:col-span-7" : "lg:grid-cols-12 lg:gap-10"}`}>
                <h3 className={`dg-h3 dg-head ${p.image ? "" : "lg:col-span-4"}`}>{p.title}</h3>
                <div className={p.image ? "" : "lg:col-span-8"}>
                  {p.paragraphs && <Paragraphs items={p.paragraphs} />}
                  {p.points && (p.tipLabel ? <TipBox tip={{ label: p.tipLabel, points: p.points }} className="mt-5" /> : <Bullets items={p.points} className={p.paragraphs ? "mt-4" : ""} />)}
                  {p.close && (
                    <p className="dg-small mt-4">
                      <Rich text={p.close} />
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
        {b.close && (
          <p className="dg-body mt-6 max-w-3xl">
            <Rich text={b.close} />
          </p>
        )}
      </div>
    </section>
  );
}

const MODE_ICON = { air: Plane, train: TrainFront, road: Car } as const;

export function Reach({ g }: { g: BrajGuide }) {
  const r = g.reach;
  return (
    <section id="reach" aria-labelledby="reach-title" className="dg-section dg-cream">
      <div className="container-x">
        <div className="grid items-center gap-8 lg:grid-cols-12 lg:gap-14">
          <SectionHead id="reach-title" eyebrow="Getting here" title={r.title} lede={<Rich text={r.lede} />} className={r.image ? "lg:col-span-7" : "lg:col-span-12"} />
          {r.image && <Photo photo={r.image} sizes="(min-width: 1024px) 38vw, 92vw" className="reveal-zoom dg-photo-lg aspect-[16/10] lg:col-span-5" />}
        </div>
        <div className="reveal-stagger mt-8 grid gap-4 lg:grid-cols-3">
          {r.modes.map((m) => {
            const Icon = MODE_ICON[m.key];
            return (
              <div key={m.key} className="dg-card p-5 sm:p-6">
                <h3 className="dg-h4 flex items-center gap-3">
                  <span className="dg-icon">
                    <Icon size={18} aria-hidden="true" />
                  </span>
                  {m.title}
                </h3>
                {m.text && (
                  <p className="dg-body mt-4">
                    <Rich text={m.text} />
                  </p>
                )}
                {m.points && <Bullets items={m.points} className="mt-4" />}
                {m.note && (
                  <p className="dg-small mt-4 border-t border-line pt-4">
                    <Rich text={m.note} />
                  </p>
                )}
              </div>
            );
          })}
        </div>
        {r.note && (
          <div className="dg-card mt-4 flex gap-4 p-5 sm:p-6">
            <span className="dg-icon" aria-hidden="true">
              <Info size={18} />
            </span>
            <p className="dg-body">
              <strong className="font-semibold text-ink">{r.note.label}:</strong> <Rich text={r.note.text} />
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

/** A sample day beside the packing list. */
export function Plan({ g }: { g: BrajGuide }) {
  const { day, carry } = g;
  return (
    <section id="plan" aria-label="Plan your day" className="dg-section">
      <div className={`container-x grid items-start gap-5 lg:gap-6 ${day ? "lg:grid-cols-2" : ""}`}>
        {day && (
          <div className="dg-card p-6 sm:p-8">
            <header className="dg-head">
              <p className="eyebrow">Day plan</p>
              <h2 className="dg-h3 mt-3">{day.title}</h2>
              {day.lede && <p className="dg-small mt-1.5">{day.lede}</p>}
            </header>
            <ol className="dg-steps mt-6">
              {day.stops.map((s) => (
                <li key={s.time}>
                  <p className="text-[0.8rem] font-semibold tabular-nums text-ember-deep">{s.time}</p>
                  <p className="dg-body mt-0.5">
                    <Rich text={s.text} />
                  </p>
                </li>
              ))}
            </ol>
            {day.close && (
              <p className="dg-note mt-6">
                <Info size={17} aria-hidden="true" />
                <span>
                  <Rich text={day.close} />
                </span>
              </p>
            )}
          </div>
        )}
        <div className="dg-wash rounded-[1.25rem] border border-[var(--dg-o100)] p-6 sm:p-8">
          <header className="dg-head">
            <p className="eyebrow">Pack light</p>
            <h2 className="dg-h3 mt-3">{carry.title}</h2>
          </header>
          <ul className={`mt-6 grid gap-3 ${day ? "" : "sm:grid-cols-2 sm:gap-x-8"}`}>
            {carry.items.map((t) => (
              <li key={t} className="flex gap-3 text-[0.9375rem] leading-relaxed text-ink-soft">
                <CheckCircle2 size={18} aria-hidden="true" className="mt-0.5 shrink-0 text-ember-deep" />
                <span>
                  <Rich text={t} />
                </span>
              </li>
            ))}
          </ul>
          {carry.close && <p className="dg-small mt-5 border-t border-[var(--dg-o100)] pt-4">{carry.close}</p>}
        </div>
      </div>
    </section>
  );
}

export function Stay({ g }: { g: BrajGuide }) {
  return (
    <section id="stay" aria-labelledby="stay-title" className="dg-section pt-0 lg:pt-0">
      <div className="container-x">
        <div className="dg-wash grid gap-6 rounded-[1.75rem] border border-[var(--dg-o100)] p-6 sm:p-9 lg:grid-cols-12 lg:gap-12 lg:p-11">
          <header className="dg-head lg:col-span-5">
            <p className="eyebrow">Rest</p>
            <h2 id="stay-title" className="dg-h2 mt-3">
              {g.stay.title}
            </h2>
          </header>
          <div className="lg:col-span-7">
            <Paragraphs items={g.stay.paragraphs} />
            <EnquireButton className="btn btn-dark mt-6 max-md:w-full">
              Ask about stays <ArrowRight size={18} aria-hidden="true" className="btn-arrow" />
            </EnquireButton>
          </div>
        </div>
      </div>
    </section>
  );
}

const trust = [
  { label: "Serving pilgrims since", value: FOUNDED },
  { label: "Star rated", value: `${RATING}` },
  { label: "Pilgrims guided", value: PILGRIMS },
  { label: "Packages from", value: price },
];

/** The invitation, over the hero photograph: the founder's note beside the enquiry form. */
export function Book({ g }: { g: BrajGuide }) {
  const tel = phoneHref();
  const backdrop = photos[g.hero.image];
  return (
    <section id="book" aria-labelledby="book-title" className="dg-section dg-cream pt-0 lg:pt-0">
      <div className="container-x">
        <div className="dg-dark relative isolate overflow-hidden rounded-[1.75rem]">
          <Image src={backdrop.src} alt="" fill sizes="(min-width: 1280px) 1216px, 100vw" className="-z-20 object-cover" />
          <div className="dg-photo-veil absolute inset-0 -z-10" aria-hidden="true" />
          <div className="grid gap-10 p-6 sm:p-9 lg:grid-cols-12 lg:gap-12 lg:p-12">
            <div className="lg:col-span-6">
              <header className="dg-head">
                <p className="eyebrow">Your trip</p>
                <h2 id="book-title" className="dg-h2 mt-3">
                  {g.book.title}
                </h2>
              </header>
              <Paragraphs items={g.book.paragraphs} className="mt-5" />
              <ul className="mt-6 grid gap-2.5 text-[0.9rem]">
                {tel && (
                  <li className="flex flex-wrap items-center gap-2">
                    <Phone size={16} aria-hidden="true" className="text-[var(--dg-o300)]" />
                    <span className="font-medium text-white">Call or WhatsApp {FOUNDER.name}:</span>
                    <a href={tel} className="dg-link">
                      {site.contact.phone}
                    </a>
                  </li>
                )}
                <li className="flex flex-wrap items-center gap-2">
                  <Mail size={16} aria-hidden="true" className="text-[var(--dg-o300)]" />
                  <span className="font-medium text-white">Email:</span>
                  <a href={mailtoHref(`${g.name} trip enquiry`)} className="dg-link break-all">
                    {site.contact.email}
                  </a>
                </li>
                <li className="flex flex-wrap items-center gap-2">
                  <Globe size={16} aria-hidden="true" className="text-[var(--dg-o300)]" />
                  <span className="font-medium text-white">Website:</span>
                  <Link href="/tour-packages" className="dg-link">
                    Mathura Vrindavan Tour Packages
                  </Link>
                </li>
              </ul>
              <EnquiryButtons message={g.hero.whatsappMessage} light className="mt-6" />
            </div>
            <div className="dg-light lg:col-span-6">
              <EnquiryForm title={g.book.formTitle} />
            </div>
          </div>
          <div className="border-t border-white/10 px-6 py-8 text-center sm:px-9 lg:px-12">
            <p className="mx-auto max-w-2xl text-lg font-medium leading-snug tracking-tight text-white sm:text-xl">{g.book.closing}</p>
            <p className="mt-3 font-semibold text-[var(--dg-o300)]">
              <span lang="hi">राधे राधे</span>
              <span className="sr-only">Radhe Radhe.</span>
            </p>
            <p className="mt-1 text-sm text-white/70">
              {FOUNDER.name}, Founder, Mathura Vrindavan Trips
            </p>
            <ul className="mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-1.5 text-xs text-white/65">
              {trust.map((t) => (
                <li key={t.label}>
                  {t.label} <span className="font-semibold text-white/90">{t.value}</span>
                </li>
              ))}
              <li>
                <Link href="/image-credits" className="underline underline-offset-4 hover:text-white">
                  Image credits
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

