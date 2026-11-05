import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, TriangleAlert } from "lucide-react";
import { PlaceIndex, PlaceTitle, SectionHead } from "@/components/destination/kit";
import { bankeBihari, bestPlaces, darshanDay, iskcon, keshiGhat, moreTemples, nidhivan, picUrl, pics, pictureWall, premMandir, radhaRaman, vaishnoDevi } from "@/content/vrindavan";
import { LocalTips, Prose, Shot, TimingLine, TipLine } from "./kit";
import { PictureWall } from "./PictureWall";

/** The seven chapters as a rail of photo cards, each opening its chapter. */
export function BestPlacesIntro() {
  return (
    <section id="best-places" aria-labelledby="best-places-title" className="dg-section">
      <div className="container-x">
        <SectionHead id="best-places-title" eyebrow="Temples and sacred places" title={bestPlaces.title} lede={<Prose text={bestPlaces.lede} />} />
        <div className="mt-7">
          <PlaceIndex items={bestPlaces.index.map((p) => ({ id: p.id, name: p.name, image: <Shot pic={{ ...p.picture, alt: "" }} sizes="(min-width: 1024px) 11rem, 10rem" /> }))} />
        </div>
      </div>
    </section>
  );
}

/** 01 Banke Bihari: the heart of Vrindavan, on the page's warm dark ground. */
export function BankeBihariChapter() {
  return (
    <article id={bankeBihari.id} aria-labelledby="ch-banke" className="dg-dark dg-section">
      <div className="container-x grid items-start gap-8 lg:grid-cols-12 lg:gap-14">
        <figure className="dg-photo dg-photo-lg reveal-zoom aspect-[4/3] bg-black sm:aspect-[16/11] lg:sticky lg:top-40 lg:col-span-5 lg:aspect-[4/5]">
          <Shot pic={pics.gate} sizes="(min-width: 1024px) 40vw, 92vw" />
          <figcaption className="dg-caption">The gate of Banke Bihari</figcaption>
        </figure>
        <div className="lg:col-span-7">
          <PlaceTitle n={1} id="ch-banke" name={bankeBihari.name} href={bankeBihari.href} />
          <div className="dg-prose dg-body mt-4">
            <p>
              <Prose text={bankeBihari.significance} />
            </p>
            <p>
              <Prose text={bankeBihari.jhanki} />
            </p>
            <p>
              <Prose text={bankeBihari.aarti} />
            </p>
          </div>

          <div className="dg-card mt-6 overflow-x-auto">
            <table className="dg-table">
              <caption>{bankeBihari.timings.caption}</caption>
              <thead>
                <tr>
                  <th scope="col">Season</th>
                  <th scope="col">Morning</th>
                  <th scope="col">Evening</th>
                </tr>
              </thead>
              <tbody>
                {bankeBihari.timings.rows.map((r) => (
                  <tr key={r.season}>
                    <th scope="row">{r.season}</th>
                    <td>{r.morning}</td>
                    <td>{r.evening}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <LocalTips label={bankeBihari.tipLabel} items={bankeBihari.tips} className="mt-4" />
        </div>
      </div>
    </article>
  );
}

/** 02 Prem Mandir: two frames for "once for the carvings, once for the lights". */
export function PremMandirChapter() {
  return (
    <article id={premMandir.id} aria-labelledby="ch-prem" className="dg-section">
      <div className="container-x">
        <div className="reveal-stagger grid gap-3 sm:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)] sm:gap-4">
          <figure className="dg-photo dg-photo-zoom aspect-[4/3] sm:aspect-auto">
            <Shot pic={pics.premDay} sizes="(min-width: 640px) 38vw, 100vw" className="object-cover object-[35%_50%]" />
            <figcaption className="dg-caption">{premMandir.dayLabel}</figcaption>
          </figure>
          <figure className="dg-photo dg-photo-zoom aspect-[4/3] bg-black sm:aspect-[16/10]">
            <Shot pic={pics.premNight} sizes="(min-width: 640px) 60vw, 100vw" className="object-cover object-[50%_70%]" />
            <figcaption className="dg-caption">{premMandir.nightLabel}</figcaption>
          </figure>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-7">
            <PlaceTitle n={2} id="ch-prem" name={premMandir.name} href={premMandir.href} />
            <div className="dg-prose dg-body mt-4">
              <p>
                <Prose text={premMandir.significance} />
              </p>
              <p>
                <Prose text={premMandir.show} />
              </p>
            </div>
            <TimingLine text={premMandir.timing} className="mt-5" />
          </div>
          <LocalTips label={premMandir.tipLabel} items={premMandir.tips} className="self-start lg:col-span-5 lg:mt-12" />
        </div>
      </div>
    </article>
  );
}

/** 03 Nidhivan: the grove, what Braj believes, and the plain warning about monkeys. */
export function NidhivanChapter() {
  return (
    <article id={nidhivan.id} aria-labelledby="ch-nidhivan" className="dg-section dg-cream">
      <div className="container-x">
        <div className="grid items-start gap-8 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-7">
            <PlaceTitle n={3} id="ch-nidhivan" name={nidhivan.name} href={nidhivan.href} />
            <p className="dg-body mt-4">
              <Prose text={nidhivan.significance} />
            </p>
            <p className="dg-body mt-4">
              <Prose text={nidhivan.mysteriesLead} />
            </p>
            <ol className="dg-rules mt-3">
              {nidhivan.mysteries.map((m) => (
                <li key={m}>
                  <Prose text={m} />
                </li>
              ))}
            </ol>
          </div>
          <figure className="dg-photo dg-photo-lg reveal-zoom aspect-[4/3] bg-black lg:sticky lg:top-40 lg:col-span-5 lg:aspect-[4/5]">
            <Shot pic={pics.nidhivan} sizes="(min-width: 1024px) 40vw, 92vw" className="object-cover object-[30%_100%]" />
            <figcaption className="dg-caption">The tulsi grove at Nidhivan</figcaption>
          </figure>
        </div>

        <blockquote className="dg-quote mx-auto mt-10 max-w-3xl lg:mt-12">{nidhivan.honesty}</blockquote>

        <div className="mt-10 grid items-stretch gap-4 lg:mt-12 lg:grid-cols-12 lg:gap-5">
          <aside aria-label="Monkey warning" className="dg-warn lg:col-span-7">
            <p className="flex items-center gap-2.5 font-semibold text-ink">
              <span className="dg-icon size-9 bg-[var(--dg-a100)] text-[var(--dg-a900)] shadow-none">
                <TriangleAlert size={17} aria-hidden="true" />
              </span>
              {nidhivan.warningLabel}
            </p>
            <ul className="dg-bullets mt-4">
              {nidhivan.warnings.map((w) => (
                <li key={w}>
                  <Prose text={w} />
                </li>
              ))}
            </ul>
          </aside>
          <div className="dg-card flex flex-col overflow-hidden lg:col-span-5">
            <Link href={nidhivan.nearbyHref} className="group relative block aspect-[16/9]">
              <span className="dg-photo absolute inset-0 rounded-none">
                <Shot pic={pics.sevaKunj} sizes="(min-width: 1024px) 34vw, 92vw" />
              </span>
              <span className="dg-caption inline-flex items-center gap-1">
                Seva Kunj <ArrowUpRight size={13} aria-hidden="true" />
              </span>
            </Link>
            <div className="grid gap-4 p-5">
              <p className="dg-body">
                <Prose text={nidhivan.nearby} />
              </p>
              <TimingLine text={nidhivan.timing} />
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

/** 04 05 06 The quieter shrines, as three cards. */
export function QuietChapters() {
  const shrines = [
    { place: iskcon, n: 4, aria: "ch-iskcon", picture: pics.iskcon, position: "object-[50%_35%]", extra: iskcon.kirtan },
    { place: radhaRaman, n: 5, aria: "ch-raman", picture: pics.radhaRaman, position: "object-center" },
    { place: vaishnoDevi, n: 6, aria: "ch-vaishno", picture: pics.vaishno, position: "object-[60%_30%]" },
  ];
  return (
    <section aria-label="More temples to visit" className="dg-section">
      <div className="container-x">
        <div className="reveal-stagger grid gap-5 md:grid-cols-2 lg:grid-cols-3 md:[&>*:last-child]:col-span-2 lg:[&>*:last-child]:col-span-1">
          {shrines.map(({ place, n, aria, picture, position, extra }) => (
            <article key={place.id} id={place.id} aria-labelledby={aria} className="dg-card flex flex-col overflow-hidden">
              <div className="dg-photo aspect-[16/10] rounded-none">
                <Shot pic={picture} sizes="(min-width: 1024px) 31vw, (min-width: 768px) 46vw, 92vw" className={`object-cover ${position}`} />
              </div>
              <div className="flex flex-1 flex-col p-5 sm:p-6">
                <PlaceTitle n={n} id={aria} name={place.name} href={"href" in place ? place.href : undefined} />
                <div className="dg-prose dg-body mt-3">
                  <p>
                    <Prose text={place.significance} />
                  </p>
                  {extra && (
                    <p>
                      <Prose text={extra} />
                    </p>
                  )}
                </div>
                <TimingLine text={place.timing} className="mt-5 border-t border-line pt-5" />
                <TipLine text={place.tip} className="mt-4" />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/** 07 Keshi Ghat: the river fills the frame, with the notes on a card over it. */
export function KeshiGhatChapter() {
  return (
    <article id={keshiGhat.id} aria-labelledby="ch-keshi" className="dg-section pt-0 lg:pt-0">
      <div className="container-x">
        <div className="relative lg:flex lg:min-h-[34rem] lg:items-center lg:justify-end lg:p-8">
          <div className="dg-photo dg-photo-lg aspect-[4/3] bg-black sm:aspect-[16/9] lg:absolute lg:inset-0 lg:aspect-auto">
            <Shot pic={pics.keshi} sizes="(min-width: 1280px) 1216px, 100vw" className="object-cover object-[50%_62%]" />
          </div>
          <div className="dg-card reveal relative mx-3 -mt-12 p-6 sm:mx-8 sm:p-8 lg:m-0 lg:max-w-[32rem] lg:shadow-lift">
            <PlaceTitle n={7} id="ch-keshi" name={keshiGhat.name} />
            <p className="dg-body mt-4">
              <Prose text={keshiGhat.significance} />
            </p>
            <TimingLine text={keshiGhat.timing} className="mt-5" />
            <TipLine text={keshiGhat.tip} className="mt-4" />
          </div>
        </div>
      </div>
    </article>
  );
}

/** An index of further temples: ruled rows in one card, each with a small picture where we have one. */
export function MoreTemples() {
  return (
    <section aria-labelledby="more-temples" className="dg-section dg-cream">
      <div className="container-x grid gap-6 lg:grid-cols-12 lg:gap-14">
        <div className="lg:sticky lg:top-40 lg:col-span-4 lg:self-start">
          <p className="eyebrow">If you have more time</p>
          <h3 id="more-temples" className="dg-h2 mt-3">
            {moreTemples.title}
          </h3>
        </div>
        <ul className="dg-card divide-y divide-line px-5 sm:px-6 lg:col-span-8">
          {moreTemples.items.map((t) => (
            <li key={t.name} className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-5 py-4">
              <div>
                <h4 className="dg-h4">
                  {t.links.length === 1 ? (
                    <Link href={t.links[0].href} className="hover:text-ember-deep">
                      {t.name}
                    </Link>
                  ) : t.links.length === 2 ? (
                    <>
                      <Link href={t.links[0].href} className="hover:text-ember-deep">
                        {t.links[0].label}
                      </Link>{" "}
                      and{" "}
                      <Link href={t.links[1].href} className="hover:text-ember-deep">
                        {t.links[1].label}
                      </Link>
                    </>
                  ) : (
                    t.name
                  )}
                </h4>
                <p className="dg-small mt-1">
                  <Prose text={t.text} />
                </p>
              </div>
              {t.picture && (
                <div className="relative size-14 overflow-hidden rounded-xl bg-[var(--dg-sand)] sm:size-16">
                  <Image src={picUrl(t.picture)} alt="" fill sizes="64px" className="object-cover" />
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/** Direct-labelled day strip: one ink on one scale, with every window also written out in text. */
export function DarshanDay() {
  const { startHour, endHour } = darshanDay;
  const span = endHour - startHour;
  const pct = (h: number) => `${((h - startHour) / span) * 100}%`;
  const ticks = [
    { hour: 6, label: "6 am" },
    { hour: 12, label: "Noon" },
    { hour: 18, label: "6 pm" },
  ];

  return (
    <section aria-labelledby="darshan-day-title" className="dg-section dg-cream pt-0 lg:pt-0">
      <div className="container-x">
        <div className="dg-card p-5 sm:p-8">
          <SectionHead
            id="darshan-day-title"
            as="h3"
            title={darshanDay.title}
            lede={darshanDay.lede}
            aside={
              <Link href={darshanDay.timetable.href} className="link-arrow group text-sm">
                {darshanDay.timetable.label}
                <ArrowRight size={15} aria-hidden="true" className="btn-arrow" />
              </Link>
            }
          />
          <div className="dg-strip mt-6">
            <div className="dg-strip-scale" aria-hidden="true">
              {ticks.map((t) => (
                <span key={t.hour} style={{ left: pct(t.hour) }}>
                  {t.label}
                </span>
              ))}
            </div>
            <ul>
              {darshanDay.rows.map((r) => (
                <li key={`${r.name}-${r.season ?? "all"}`} className="dg-strip-row">
                  <a href={r.href} className="dg-strip-name">
                    {r.name}
                    {r.season && <span> · {r.season}</span>}
                  </a>
                  <div className="dg-strip-track" aria-hidden="true">
                    {ticks.map((t) => (
                      <i key={t.hour} style={{ left: pct(t.hour) }} />
                    ))}
                    {r.windows.map(([a, b]) => (
                      <b key={a} style={{ left: pct(a), width: `${((b - a) / span) * 100}%` }} />
                    ))}
                  </div>
                  <p className="dg-strip-text">{r.text}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

export function VrindavanPictures() {
  return (
    <section aria-labelledby="pictures-title" className="dg-section">
      <div className="container-x">
        <SectionHead id="pictures-title" as="h3" eyebrow="Gallery" title={pictureWall.title} />
        <div className="mt-6">
          <PictureWall frames={pictureWall.frames.map((f) => ({ ...f, src: picUrl(f) }))} />
        </div>
      </div>
    </section>
  );
}
