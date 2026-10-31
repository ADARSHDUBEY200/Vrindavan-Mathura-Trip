import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock, TriangleAlert } from "lucide-react";
import { bankeBihari, bestPlaces, darshanDay, iskcon, keshiGhat, moreTemples, nidhivan, picUrl, pics, pictureWall, premMandir, radhaRaman, vaishnoDevi } from "@/content/vrindavan";
import { Lotus } from "@/components/svg/Ornaments";
import { ChapterMark, Head, LocalTips, PlaceHeading, Prose, Shot, TipLine } from "./kit";
import { PictureWall } from "./PictureWall";

function TimingLine({ text, className = "" }: { text: string; className?: string }) {
  return (
    <p className={`vrn-timing ${className}`}>
      <Clock size={16} aria-hidden="true" className="mt-1 shrink-0" />
      <span>
        <Prose text={text} />
      </span>
    </p>
  );
}

/** The seven chapters as a row of temple niches: curtains part on hover, each opens its chapter. */
export function BestPlacesIntro() {
  return (
    <section id="best-places" aria-labelledby="best-places-title" className="bg-chandan pb-16 pt-16 lg:pb-24 lg:pt-24">
      <div className="container-x">
        <Head id="best-places-title" title={bestPlaces.title} lede={<Prose text={bestPlaces.lede} />} />
        <ol className="vrn-niches mt-10">
          {bestPlaces.index.map((p, i) => (
            <li key={p.id}>
              <a href={`#${p.id}`} className="group block">
                <span className="vrn-cusp relative block aspect-[3/5] bg-shyam">
                  <Shot pic={{ ...p.picture, alt: "" }} sizes="(min-width: 1024px) 13vw, 42vw" className="object-cover transition-transform duration-1200 ease-braj group-hover:scale-105" />
                  <span className="vrn-curtain vrn-curtain-hover" aria-hidden="true" />
                </span>
                <span className="mt-3 flex items-baseline gap-2">
                  <ChapterMark n={i + 1} className="text-lg text-haldi-deep" />
                  <span className="text-sm font-semibold leading-snug text-ink group-hover:underline group-hover:underline-offset-4">{p.name}</span>
                </span>
              </a>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/** १ Banke Bihari: kumkum ground, with the curtain drawing and opening on the photograph. */
export function BankeBihariChapter() {
  return (
    <article id={bankeBihari.id} aria-labelledby="ch-banke" className="vrn-dark bg-kumkum py-16 lg:py-28">
      <div className="container-x grid items-start gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-20">
        <figure className="lg:sticky lg:top-40">
          <div className="vrn-cusp relative mx-auto aspect-[3/4] max-w-md bg-black lg:max-w-none">
            <Shot pic={pics.gate} sizes="(min-width: 1024px) 34vw, (min-width: 480px) 28rem, 100vw" />
            <span className="vrn-curtain vrn-curtain-breathe" aria-hidden="true" />
          </div>
        </figure>
        <div>
          <ChapterMark n={1} className="text-5xl text-haldi" />
          <PlaceHeading id="ch-banke" name={bankeBihari.name} href={bankeBihari.href} />
          <div className="vrn-body mt-5 grid gap-4">
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

          <div className="vrn-ledger mt-8">
            <table>
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

          <LocalTips label={bankeBihari.tipLabel} items={bankeBihari.tips} className="mt-8" />
        </div>
      </div>
    </article>
  );
}

/** २ Prem Mandir: two frames for "once for the carvings, once for the lights". The night frame cycles like the show. */
export function PremMandirChapter() {
  return (
    <article id={premMandir.id} aria-labelledby="ch-prem" className="vrn-dark bg-[#070a1f] py-16 lg:py-28">
      <div className="container-x">
        <div className="grid gap-3 sm:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)] sm:gap-4">
          <figure className="relative aspect-[4/3] overflow-hidden rounded-lg bg-shyam sm:mt-16 sm:aspect-auto sm:h-[calc(100%-4rem)]">
            <Shot pic={pics.premDay} sizes="(min-width: 640px) 38vw, 100vw" className="object-cover object-[35%_50%]" />
            <figcaption className="vrn-frame-label">{premMandir.dayLabel}</figcaption>
          </figure>
          <figure className="relative aspect-[4/3] overflow-hidden rounded-lg bg-black">
            <Shot pic={pics.premNight} sizes="(min-width: 640px) 60vw, 100vw" className="vrn-lightshow object-cover object-[50%_70%]" />
            <figcaption className="vrn-frame-label">{premMandir.nightLabel}</figcaption>
          </figure>
        </div>

        <div className="mt-10 grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <ChapterMark n={2} className="text-5xl text-haldi" />
            <PlaceHeading id="ch-prem" name={premMandir.name} href={premMandir.href} />
            <div className="vrn-body mt-5 grid gap-4">
              <p>
                <Prose text={premMandir.significance} />
              </p>
              <p>
                <Prose text={premMandir.show} />
              </p>
            </div>
            <TimingLine text={premMandir.timing} className="mt-6" />
          </div>
          <LocalTips label={premMandir.tipLabel} items={premMandir.tips} className="lg:mt-16" />
        </div>
      </div>
    </article>
  );
}

/** ३ Nidhivan: the grove, what Braj believes, and the plain warning about monkeys. */
export function NidhivanChapter() {
  return (
    <article id={nidhivan.id} aria-labelledby="ch-nidhivan" className="vrn-dark bg-tulsi py-16 lg:py-28">
      <div className="container-x">
        <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-20">
          <div>
            <ChapterMark n={3} className="text-5xl text-haldi" />
            <PlaceHeading id="ch-nidhivan" name={nidhivan.name} href={nidhivan.href} />
            <p className="vrn-body mt-5">
              <Prose text={nidhivan.significance} />
            </p>
            <p className="vrn-body mt-6">
              <Prose text={nidhivan.mysteriesLead} />
            </p>
            <ol className="vrn-mysteries mt-5">
              {nidhivan.mysteries.map((m) => (
                <li key={m}>
                  <Prose text={m} />
                </li>
              ))}
            </ol>
          </div>
          <figure className="vrn-cusp relative aspect-[3/4] w-full bg-black lg:mt-20">
            <Shot pic={pics.nidhivan} sizes="(min-width: 1024px) 36vw, 100vw" className="vrn-grove object-cover object-[30%_100%]" />
          </figure>
        </div>

        <blockquote className="vrn-quote mx-auto mt-14 max-w-3xl text-center lg:mt-20">{nidhivan.honesty}</blockquote>

        <div className="mt-14 grid items-stretch gap-6 lg:mt-20 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)]">
          <div className="vrn-warning">
            <p className="flex items-center gap-2.5 text-base font-bold">
              <TriangleAlert size={20} aria-hidden="true" className="shrink-0" />
              {nidhivan.warningLabel}
            </p>
            <ul className="vrn-rules mt-2">
              {nidhivan.warnings.map((w) => (
                <li key={w}>
                  <Prose text={w} />
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col gap-5">
            <Link href={nidhivan.nearbyHref} className="group relative block min-h-52 flex-1 overflow-hidden rounded-lg bg-black">
              <Shot pic={pics.sevaKunj} sizes="(min-width: 1024px) 34vw, 100vw" className="object-cover transition-transform duration-1200 ease-braj group-hover:scale-105" />
              <span className="vrn-frame-label">Seva Kunj</span>
            </Link>
            <p className="vrn-body">
              <Prose text={nidhivan.nearby} />
            </p>
            <TimingLine text={nidhivan.timing} />
          </div>
        </div>
      </div>
    </article>
  );
}

/** ४ ५ ६ The quieter shrines, set on paper: one wide, then two side by side. */
export function QuietChapters() {
  return (
    <div className="bg-chandan py-16 lg:py-28">
      <div className="container-x grid gap-16 lg:gap-24">
        <article id={iskcon.id} aria-labelledby="ch-iskcon">
          <div className="relative aspect-[16/10] overflow-hidden rounded-lg bg-shyam sm:aspect-[21/9]">
            <Shot pic={pics.iskcon} sizes="(min-width: 1280px) 1216px, 100vw" className="object-cover object-[50%_35%]" />
          </div>
          <div className="mt-7 grid gap-x-16 gap-y-5 lg:grid-cols-2">
            <div>
              <ChapterMark n={4} className="text-5xl text-haldi-deep" />
              <PlaceHeading id="ch-iskcon" name={iskcon.name} href={iskcon.href} />
              <p className="vrn-body mt-4">
                <Prose text={iskcon.significance} />
              </p>
            </div>
            <div className="grid content-start gap-5 lg:pt-14">
              <p className="vrn-body">
                <Prose text={iskcon.kirtan} />
              </p>
              <TimingLine text={iskcon.timing} />
              <TipLine text={iskcon.tip} />
            </div>
          </div>
        </article>

        <div className="grid gap-16 lg:grid-cols-2 lg:gap-14">
          <article id={radhaRaman.id} aria-labelledby="ch-raman">
            <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-shyam">
              <Shot pic={pics.radhaRaman} sizes="(min-width: 1024px) 45vw, 100vw" />
            </div>
            <ChapterMark n={5} className="mt-6 text-5xl text-haldi-deep" />
            <PlaceHeading id="ch-raman" name={radhaRaman.name} href={radhaRaman.href} />
            <p className="vrn-body mt-4">
              <Prose text={radhaRaman.significance} />
            </p>
            <TimingLine text={radhaRaman.timing} className="mt-5" />
            <TipLine text={radhaRaman.tip} className="mt-5" />
          </article>

          <article id={vaishnoDevi.id} aria-labelledby="ch-vaishno" className="lg:mt-24">
            <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-shyam">
              <Shot pic={pics.vaishno} sizes="(min-width: 1024px) 45vw, 100vw" className="object-cover object-[60%_30%]" />
            </div>
            <ChapterMark n={6} className="mt-6 text-5xl text-haldi-deep" />
            <PlaceHeading id="ch-vaishno" name={vaishnoDevi.name} />
            <p className="vrn-body mt-4">
              <Prose text={vaishnoDevi.significance} />
            </p>
            <TimingLine text={vaishnoDevi.timing} className="mt-5" />
            <TipLine text={vaishnoDevi.tip} className="mt-5" />
          </article>
        </div>
      </div>
    </div>
  );
}

/** ७ Keshi Ghat: the river fills the screen, the words sit in its dusk. */
export function KeshiGhatChapter() {
  return (
    <article id={keshiGhat.id} aria-labelledby="ch-keshi" className="vrn-dark bg-yamuna">
      <div className="relative aspect-[4/3] sm:aspect-[21/9]">
        <Shot pic={pics.keshi} sizes="100vw" className="object-cover object-[50%_62%]" />
        <div className="absolute inset-0 bg-linear-to-t from-yamuna via-transparent to-transparent" aria-hidden="true" />
      </div>
      <div className="container-x relative grid gap-x-16 gap-y-5 pb-16 lg:grid-cols-2 lg:pb-24">
        <div>
          <ChapterMark n={7} className="text-5xl text-haldi" />
          <PlaceHeading id="ch-keshi" name={keshiGhat.name} />
          <p className="vrn-body mt-4">
            <Prose text={keshiGhat.significance} />
          </p>
        </div>
        <div className="grid content-start gap-5 lg:pt-14">
          <TimingLine text={keshiGhat.timing} />
          <TipLine text={keshiGhat.tip} />
        </div>
      </div>
    </article>
  );
}

/** An index of further temples: ruled rows, each with a small picture where we have one. */
export function MoreTemples() {
  return (
    <section aria-labelledby="more-temples" className="bg-chandan py-16 lg:py-24">
      <div className="container-x grid gap-8 lg:grid-cols-[minmax(0,0.75fr)_minmax(0,1.25fr)] lg:gap-16">
        <h3 id="more-temples" className="vrn-h3 lg:sticky lg:top-40 lg:self-start">
          {moreTemples.title}
        </h3>
        <ul className="divide-y divide-mitti/15 border-y border-mitti/15">
          {moreTemples.items.map((t) => (
            <li key={t.name} className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-5 py-4">
              <div>
                <h4 className="font-semibold text-ink">
                  {t.links.length === 1 ? (
                    <Link href={t.links[0].href} className="vrn-link">
                      {t.name}
                    </Link>
                  ) : t.links.length === 2 ? (
                    <>
                      <Link href={t.links[0].href} className="vrn-link">
                        {t.links[0].label}
                      </Link>{" "}
                      and{" "}
                      <Link href={t.links[1].href} className="vrn-link">
                        {t.links[1].label}
                      </Link>
                    </>
                  ) : (
                    t.name
                  )}
                </h4>
                <p className="mt-1 text-[0.95rem] leading-relaxed text-stone">
                  <Prose text={t.text} />
                </p>
              </div>
              {t.picture && (
                <div className="relative size-16 overflow-hidden rounded-full bg-chandan-deep sm:size-20">
                  <Image src={picUrl(t.picture)} alt="" fill sizes="80px" className="object-cover" />
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
    <section aria-labelledby="darshan-day-title" className="bg-chandan pb-16 lg:pb-24">
      <div className="container-x">
        <h3 id="darshan-day-title" className="vrn-h3">
          {darshanDay.title}
        </h3>
        <p className="vrn-body mt-2 max-w-2xl">{darshanDay.lede}</p>

        <div className="vrn-strip mt-7">
          <div className="vrn-strip-scale" aria-hidden="true">
            {ticks.map((t) => (
              <span key={t.hour} style={{ left: pct(t.hour) }}>
                {t.label}
              </span>
            ))}
          </div>
          <ul>
            {darshanDay.rows.map((r) => (
              <li key={`${r.name}-${r.season ?? "all"}`} className="vrn-strip-row">
                <a href={r.href} className="vrn-strip-name">
                  {r.name}
                  {r.season && <span> · {r.season}</span>}
                </a>
                <div className="vrn-strip-track" aria-hidden="true">
                  {ticks.map((t) => (
                    <i key={t.hour} style={{ left: pct(t.hour) }} />
                  ))}
                  {r.windows.map(([a, b]) => (
                    <b key={a} style={{ left: pct(a), width: `${((b - a) / span) * 100}%` }} />
                  ))}
                </div>
                <p className="vrn-strip-text">{r.text}</p>
              </li>
            ))}
          </ul>
        </div>

        <Link href={darshanDay.timetable.href} className="link-arrow mt-6 text-sm">
          {darshanDay.timetable.label}
          <ArrowRight size={15} aria-hidden="true" className="btn-arrow" />
        </Link>
      </div>
    </section>
  );
}

export function VrindavanPictures() {
  return (
    <section aria-labelledby="pictures-title" className="bg-chandan-deep py-16 lg:py-24">
      <div className="container-x">
        <h3 id="pictures-title" className="vrn-h3 flex items-center gap-3">
          <Lotus className="w-8 text-haldi-deep" />
          {pictureWall.title}
        </h3>
        <div className="mt-7">
          <PictureWall frames={pictureWall.frames.map((f) => ({ ...f, src: picUrl(f) }))} />
        </div>
      </div>
    </section>
  );
}
