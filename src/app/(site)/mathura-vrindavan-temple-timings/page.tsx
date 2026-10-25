import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import { JsonLd } from "@/components/seo/JsonLd";
import { AartiPanel } from "@/components/timings/AartiPanel";
import { devanagari } from "@/components/timings/fonts";
import { SeasonRoot, SeasonSwitch } from "@/components/timings/Season";
import { TempleSearch } from "@/components/timings/TempleSearch";
import { TimingsCta } from "@/components/timings/TimingsCta";
import { TimingsHero } from "@/components/timings/TimingsHero";
import { RegionTimetable, searchKey, shortName } from "@/components/timings/Timetable";
import { FaqList } from "@/components/ui/FaqList";
import { photos } from "@/content/images";
import { TIMINGS_COMPILED, aartiSchedules, festivalChanges, templeDay, timingAreas, timingFaqs, timingRows, visitTips } from "@/content/temple-timings";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbSchema, faqSchema, itemListSchema, webPageSchema } from "@/lib/schema";
import { whatsappLink } from "@/lib/whatsapp";

const path = "/mathura-vrindavan-temple-timings";
const year = TIMINGS_COMPILED.slice(0, 4);
const title = `Mathura Vrindavan Temple Timings ${year}: Darshan & Aarti`;
const description =
  "Summer and winter darshan and aarti timings for 32 temples in Vrindavan, Mathura, Govardhan, Barsana and Gokul, including Banke Bihari, Prem Mandir and ISKCON.";
const crumbs = [
  { name: "Home", href: "/" },
  { name: "Temples", href: "/temples" },
  { name: "Temple Timings", href: path },
];
const compiledOn = new Date(TIMINGS_COMPILED).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });

// The share image is only used for link previews; the page itself carries no photos.
export const metadata = buildMetadata({ title, description, path, image: photos["banke-bihari-gate"].src, absoluteTitle: true });

const sectionLinks = [
  { label: "The temple day", href: "#temple-day" },
  { label: "Aarti schedules", href: "#aarti-schedules" },
  { label: "Before you visit", href: "#before-you-visit" },
  { label: "Questions", href: "#timings-faq" },
];

const relatedLinks = [
  { label: "Temples of Braj", text: "History, dress code and tips for each temple", href: "/temples" },
  { label: "The rhythm of darshan", text: "Why temples open and close through the day", href: "/travel-guide/temple-timings-and-darshan" },
  { label: "Festivals of Braj", text: "Janmashtami, Holi, Radhashtami and more", href: "/festivals" },
  { label: "Vrindavan one-day darshan", text: "A day planned around these timings", href: "/tour-packages/vrindavan-one-day-darshan" },
];

/** Eyebrow, H2 and an optional lede, set above a ruled line. */
function SectionTitle({ id, eyebrow, title: heading, lede }: { id: string; eyebrow: string; title: string; lede?: ReactNode }) {
  return (
    <div className="reveal border-b border-ink/80 pb-3">
      <p className="eyebrow">{eyebrow}</p>
      <h2 id={id} className="mt-2 text-lg font-bold tracking-tight text-ink sm:text-xl">
        {heading}
      </h2>
      {lede && <p className="mt-1 max-w-2xl text-[0.8125rem] leading-relaxed text-stone sm:text-sm">{lede}</p>}
    </div>
  );
}

export default function TempleTimingsPage() {
  const wa = whatsappLink("Radhe Radhe! Could you confirm today’s darshan timings for the temples I plan to visit?") ?? "/contact";

  return (
    <div className={devanagari.variable}>
      <TimingsHero
        crumbs={crumbs}
        templeCount={timingRows.length}
        regionCount={timingAreas.length}
        compiled={{ iso: TIMINGS_COMPILED, label: compiledOn }}
        confirmHref={wa}
      />

      <SeasonRoot className="container-x grid gap-6 pb-14 pt-5 lg:grid-cols-[14.5rem_minmax(0,1fr)] lg:gap-12 lg:pb-20 lg:pt-10">
        {/* Finder: a sticky search bar on phones, a sticky sidebar index on desktop */}
        <aside aria-label="Find a temple" className="sticky top-[5.1rem] z-30 sm:top-[5.6rem] lg:top-26 lg:z-auto lg:self-start">
          <div className="flex items-center gap-2 rounded-2xl border border-line bg-white/95 p-1.5 shadow-soft backdrop-blur-md lg:flex-col lg:items-stretch lg:gap-3 lg:border-0 lg:bg-transparent lg:p-0 lg:shadow-none lg:backdrop-blur-none">
            <TempleSearch total={timingRows.length} className="flex-1" />
            <SeasonSwitch />
          </div>

          <nav aria-label="Temple index" className="no-scrollbar mt-6 hidden max-h-[calc(100dvh-17rem)] overflow-y-auto pb-2 lg:block">
            {timingAreas.map((area) => {
              const rows = timingRows.filter((r) => r.area === area.id);
              return (
                <div key={area.id} data-region className="mb-5">
                  <a href={`#${area.id}`} className="flex items-baseline justify-between text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-ink hover:text-ember-deep">
                    {area.short}
                    <span className="font-medium tabular-nums text-stone">{rows.length}</span>
                  </a>
                  <ul className="mt-2 border-l border-line">
                    {rows.map((r) => (
                      <li key={r.id} data-temple={searchKey(r)}>
                        <a href={`#t-${r.id}`} className="-ml-px block border-l border-transparent py-1 pl-3 text-[0.8125rem] leading-snug text-ink-soft transition-colors hover:border-saffron hover:text-ember-deep">
                          {shortName(r)}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
            <ul className="grid gap-1 border-t border-line pt-4 text-[0.8125rem] font-medium">
              {sectionLinks.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="text-ink-soft hover:text-ember-deep">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        <div className="grid min-w-0 gap-14 lg:gap-16">
          {/* Timetables */}
          <div id="timetables" className="grid scroll-mt-20 gap-12 lg:scroll-mt-6">
            <p id="timings-empty" hidden className="rounded-2xl border border-dashed border-line px-5 py-8 text-center text-sm text-stone">
              No temple matches your search. Try another spelling, or{" "}
              <a href={wa} className="font-semibold text-ember-deep underline underline-offset-4">
                ask us
              </a>
              .
            </p>
            {timingAreas.map((area) => (
              <RegionTimetable key={area.id} area={area} rows={timingRows.filter((r) => r.area === area.id)} />
            ))}
            <p className="max-w-3xl text-xs leading-relaxed text-stone">
              <strong className="font-semibold text-ink-soft">How these timings were compiled:</strong> we cross-checked several published Braj timing lists and news reports of temple-committee notices, last on <time dateTime={TIMINGS_COMPILED}>{compiledOn}</time>. Where sources disagree, we show the most widely reported time and say so in the notes. Times we could not find in a published source are left out.
            </p>
          </div>

          {/* The temple day */}
          <section id="temple-day" aria-labelledby="temple-day-title" className="scroll-mt-20 lg:scroll-mt-6">
            <SectionTitle
              id="temple-day-title"
              eyebrow="Reading the schedule"
              title="The temple day"
              lede="Darshan follows Thakur ji’s daily routine. These are the aartis named in the timetables, with the range of times they fall at across the temples above."
            />
            <ol className="reveal-stagger mt-5 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 xl:grid-cols-3">
              {templeDay.map((p, i) => (
                <li key={p.name} className="group bg-white p-4 transition-colors duration-300 hover:bg-orange-50/50 sm:p-5">
                  <p className="flex items-baseline gap-2">
                    <span className="text-[0.68rem] font-semibold tabular-nums text-stone transition-colors group-hover:text-ember-deep">{String(i + 1).padStart(2, "0")}</span>
                    <span className="text-[0.95rem] font-semibold text-ink">{p.name}</span>
                    <span lang="hi" className="hi text-sm text-ember-deep">
                      {p.hindi}
                    </span>
                  </p>
                  <p className="mt-1 text-[0.8125rem] font-medium tabular-nums text-ink-soft">{p.time}</p>
                  <p className="mt-1.5 text-[0.8125rem] leading-relaxed text-stone">{p.text}</p>
                </li>
              ))}
            </ol>
          </section>

          {/* Aarti schedules */}
          <section id="aarti-schedules" aria-labelledby="aarti-title" className="scroll-mt-20 lg:scroll-mt-6">
            <SectionTitle id="aarti-title" eyebrow="Aarti schedules" title="Full daily schedules" lede="The complete published sequence of aartis and darshan slots at the temples where timing matters most. Follows the summer / winter switch." />
            <div className="mt-5 gap-4 md:columns-2 [&>*]:mb-4 [&>*]:break-inside-avoid">
              {aartiSchedules.map((s) => (
                <AartiPanel key={s.id} schedule={s} />
              ))}
            </div>
          </section>

          {/* Before you visit */}
          <section id="before-you-visit" aria-labelledby="visit-title" className="scroll-mt-20 lg:scroll-mt-6">
            <SectionTitle id="visit-title" eyebrow="Before you visit" title="Special days and visitor notes" />
            <div className="mt-5 grid gap-8 xl:grid-cols-[1.15fr_1fr] xl:gap-10">
              <div>
                <h3 className="text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-ink">When the usual timings don’t apply</h3>
                <dl className="reveal mt-3 divide-y divide-line overflow-hidden rounded-2xl border border-line bg-white">
                  {festivalChanges.map((f) => (
                    <div key={f.name} className="grid gap-1 px-4 py-3 sm:grid-cols-[9.5rem_1fr] sm:gap-4 sm:px-5 xl:grid-cols-1 xl:gap-1">
                      <dt className="text-[0.8125rem] font-semibold text-ink">
                        {f.href ? (
                          <Link href={f.href} className="underline-offset-4 hover:text-ember-deep hover:underline">
                            {f.name}
                          </Link>
                        ) : (
                          f.name
                        )}
                      </dt>
                      <dd className="text-[0.8125rem] leading-relaxed text-stone">{f.text}</dd>
                    </div>
                  ))}
                </dl>
              </div>
              <div>
                <h3 className="text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-ink">Visitor notes</h3>
                <ul className="tt-bullets reveal-stagger mt-3 grid gap-3.5">
                  {visitTips.map((t) => (
                    <li key={t.title} className="text-[0.8125rem] leading-relaxed text-stone">
                      <strong className="block font-semibold text-ink">{t.title}</strong>
                      {t.text}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* FAQ + related */}
          <section id="timings-faq" aria-labelledby="faq-title" className="scroll-mt-20 lg:scroll-mt-6">
            <SectionTitle id="faq-title" eyebrow="Questions" title="Temple timings: common questions" />
            <FaqList items={timingFaqs} className="reveal mt-5" />
            <nav aria-labelledby="related-title" className="mt-10">
              <h2 id="related-title" className="text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-ink">
                Continue planning
              </h2>
              <ul className="reveal-stagger mt-3 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2">
                {relatedLinks.map((l) => (
                  <li key={l.href} className="bg-white">
                    <Link href={l.href} className="group flex h-full items-center gap-4 px-4 py-3.5 transition-colors hover:bg-orange-50/60 sm:px-5">
                      <span className="min-w-0 flex-1">
                        <span className="block text-sm font-semibold text-ink group-hover:text-ember-deep">{l.label}</span>
                        <span className="mt-0.5 block text-xs text-stone">{l.text}</span>
                      </span>
                      <ArrowRight size={16} aria-hidden="true" className="btn-arrow shrink-0 text-ember-deep" />
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </section>
        </div>
      </SeasonRoot>

      <TimingsCta />

      <JsonLd
        data={[
          webPageSchema({ path, name: title, description }),
          breadcrumbSchema(crumbs),
          itemListSchema(
            "Temple timings in Mathura and Vrindavan",
            timingRows.filter((r) => r.templeSlug).map((r) => ({ name: r.name, href: `/temples/${r.templeSlug}` })),
          ),
          faqSchema(timingFaqs),
        ]}
      />
    </div>
  );
}
