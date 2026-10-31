import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Mail, Phone, Plus } from "lucide-react";
import { EnquireButton } from "@/components/tour-packages/EnquireButton";
import { Lotus, Mandala } from "@/components/svg/Ornaments";
import { WhatsappIcon } from "@/components/svg/TravelIcons";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { STARTING_PRICE, STARTING_PRICE_INCLUDES, TIMINGS_VERIFIED_ON, formatInr, mailtoHref, phoneHref, site } from "@/config/site";
import type { TempleChapter, TempleEntry } from "@/content/temples-page";
import { hasTempleImage, templeImageSrc } from "@/lib/cms/temple-image";
import type { TemplesPageContent } from "@/lib/cms/site-pages";
import type { TempleCardData } from "@/lib/cms/temples";
import type { Crumb } from "@/lib/schema";
import { whatsappLink } from "@/lib/whatsapp";
import { Txt } from "./kit";
import { TempleExplorer } from "./TempleExplorer";

type C = { c: TemplesPageContent };

const NUMERALS = "०१२३४५६७८९";
const TIMINGS_HREF = "/mathura-vrindavan-temple-timings";
const enquiry = "Radhe Radhe! I am planning a temple darshan in Mathura Vrindavan and would like your help.";

function Kicker({ children }: { children: React.ReactNode }) {
  return <p className="tmpl-kicker">{children}</p>;
}

export function TemplesHero({ c, crumbs }: C & { crumbs: Crumb[] }) {
  const { hero } = c;
  const images = hero.images.filter((i) => hasTempleImage(i.src)).slice(0, 3);
  return (
    <section aria-labelledby="page-title" className="tmpl-hero pb-16 pt-28 sm:pt-32 lg:pb-24">
      <Mandala className="tmpl-hero-mandala spin-slower" aria-hidden="true" />
      <div className="container-x grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14">
        <div>
          <div className="hero-in">
            <Breadcrumbs items={crumbs} light />
          </div>
          <p className="hero-in hero-in-1 mt-6 text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-amber-200">{hero.eyebrow}</p>
          <h1 id="page-title" className="hero-in hero-in-2 mt-3">
            <span className="tmpl-h1 tmpl-font block">{hero.title}</span>
            <span className="tmpl-h1-rest tmpl-font mt-3 block">{hero.titleRest}</span>
          </h1>
          <p className="hero-in hero-in-3 mt-5 max-w-xl text-[1.05rem] leading-relaxed text-[#efe5d6]">{hero.lede}</p>
          <div className="hero-in hero-in-4 mt-7 flex flex-wrap gap-3">
            <a href="#temple-finder" className="btn btn-primary">
              {hero.primaryLabel}
              <ArrowRight size={18} aria-hidden="true" className="btn-arrow" />
            </a>
            <EnquireButton className="btn btn-outline-light">{hero.secondaryLabel}</EnquireButton>
          </div>
          <dl className="tmpl-stats hero-in hero-in-4 mt-9">
            {hero.stats.map((s, i) => (
              <div key={i} className="flex flex-col-reverse justify-end">
                <dt className="tmpl-stat-label">{s.label}</dt>
                <dd className="tmpl-stat-value tmpl-font">{s.value}</dd>
              </div>
            ))}
          </dl>
        </div>
        {images.length > 0 && (
          <div className="tmpl-portals tt-art-in mx-auto w-full max-w-md lg:max-w-none">
            {images.map((image, i) => (
              <div key={i} className="tmpl-portal">
                <Image src={templeImageSrc(image.src)} alt={image.alt} fill preload={i === 1} sizes="(min-width: 1024px) 15vw, 30vw" className="object-cover" />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export function WelcomeLetter({ c }: C) {
  const { letter } = c;
  const tel = phoneHref();
  return (
    <section id="welcome" aria-labelledby="welcome-title" className="tmpl-section">
      <div className="container-x max-w-4xl">
        <div className="tmpl-letter">
          <h2 id="welcome-title" className="tmpl-greeting tmpl-font">
            {letter.greeting}
          </h2>
          <div className="tmpl-body mt-5 grid gap-4">
            {letter.paragraphs.map((p, i) => (
              <p key={i}>
                <Txt text={p} />
              </p>
            ))}
          </div>
          <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm font-semibold">
            <span className="text-stone">{letter.contactLabel}:</span>
            {tel && (
              <a href={tel} className="tmpl-link inline-flex items-center gap-1.5">
                <Phone size={15} aria-hidden="true" /> {site.contact.phone}
              </a>
            )}
            <a href={mailtoHref()} className="tmpl-link inline-flex items-center gap-1.5 break-all">
              <Mail size={15} aria-hidden="true" /> {site.contact.email}
            </a>
            <Link href="/tour-packages" className="tmpl-link">
              {letter.packagesLabel}
            </Link>
          </div>
          <p className="tmpl-note mt-6">
            <strong className="text-ink">{letter.noteTitle}:</strong> <Txt text={letter.noteText} />
          </p>
        </div>
      </div>
    </section>
  );
}

export function MandirGlance({ c }: C) {
  const { glance } = c;
  return (
    <section id="mandir-list" aria-labelledby="mandir-list-title" className="tmpl-section tmpl-section-deep">
      <div className="container-x">
        <Kicker>{glance.eyebrow}</Kicker>
        <h2 id="mandir-list-title" className="tmpl-h2 tmpl-font">
          {glance.title}
        </h2>
        <p className="tmpl-lede">
          <Txt text={glance.intro} />
        </p>
        <div className="mt-9 grid gap-5 lg:grid-cols-3">
          {glance.groups.map((g, i) => (
            <div key={i} className="tmpl-ledger">
              <div className="tmpl-ledger-head">
                <h3 className="tmpl-font">{g.place}</h3>
                <span className="text-xs text-[#f4ece0]">{g.rows.length} entries</span>
              </div>
              {g.rows.map((r, j) => {
                const body = (
                  <>
                    <p className="tmpl-ledger-name">{r.temple}</p>
                    <p className="tmpl-ledger-known">{r.knownFor}</p>
                  </>
                );
                return r.link ? (
                  <Link key={j} href={r.link} className="tmpl-ledger-row">
                    {body}
                  </Link>
                ) : (
                  <div key={j} className="tmpl-ledger-row">
                    {body}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function TempleFinder({ c, temples }: C & { temples: TempleCardData[] }) {
  const { explorer } = c;
  return (
    <section id="temple-finder" aria-labelledby="temple-finder-title" className="tmpl-section">
      <div className="container-x">
        <Kicker>{explorer.eyebrow}</Kicker>
        <h2 id="temple-finder-title" className="tmpl-h2 tmpl-font">
          {explorer.title}
        </h2>
        <p className="tmpl-lede">
          <Txt text={explorer.text} />
        </p>
        <TempleExplorer temples={temples} searchLabel={explorer.searchLabel} allLabel={explorer.allLabel} emptyText={explorer.emptyText} />
        <p className="mt-10 text-sm">
          <Link href={TIMINGS_HREF} className="link-arrow">
            {explorer.timingsLabel}
            <ArrowRight size={16} aria-hidden="true" className="btn-arrow" />
          </Link>
        </p>
      </div>
    </section>
  );
}

function EntryHeading({ entry }: { entry: TempleEntry }) {
  return (
    <h3 className="tmpl-h3 tmpl-font">
      {entry.link ? (
        <Link href={entry.link} className="group inline underline-offset-[0.2em] hover:underline">
          {entry.name}
          <ArrowUpRight aria-hidden="true" className="ml-1 inline size-[0.75em] align-baseline opacity-60 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </Link>
      ) : (
        entry.name
      )}
    </h3>
  );
}

function Entry({ entry, flip }: { entry: TempleEntry; flip: boolean }) {
  const hasPhoto = hasTempleImage(entry.image.src);
  const table = entry.timingTable.rows.filter((r) => r.season.trim());
  const shrines = entry.shrines.filter((s) => s.name.trim());
  return (
    <article className={`tmpl-entry ${hasPhoto ? (flip ? "tmpl-entry-flip" : "") : "tmpl-entry-plain"}`}>
      {hasPhoto && (
        <div className="tmpl-entry-media">
          <div className="tmpl-entry-photo">
            <Image src={templeImageSrc(entry.image.src)} alt={entry.image.alt || entry.name} fill sizes="(min-width: 1024px) 34vw, 100vw" className="object-cover" />
          </div>
        </div>
      )}
      <div className="min-w-0">
        <EntryHeading entry={entry} />
        <div className="tmpl-body mt-4 grid gap-4">
          {entry.points.map((p, i) => (
            <p key={i}>
              {p.label && <span className="tmpl-point-label">{p.label}</span>}
              <Txt text={p.text} />
            </p>
          ))}
        </div>
        {table.length > 0 && (
          <div className="tmpl-table-wrap mt-5">
            <table className="tmpl-table">
              <caption className="px-4 py-2.5 text-left text-sm font-semibold text-ink">{entry.timingTable.title}</caption>
              <thead>
                <tr>
                  <th scope="col">Season</th>
                  <th scope="col">Morning</th>
                  <th scope="col">Evening</th>
                </tr>
              </thead>
              <tbody>
                {table.map((r, i) => (
                  <tr key={i}>
                    <th scope="row">{r.season}</th>
                    <td data-label="Morning">{r.morning}</td>
                    <td data-label="Evening">{r.evening}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        {entry.timings && (
          <p className="tmpl-timing mt-5">
            <Txt text={entry.timings} />
          </p>
        )}
        {shrines.length > 0 && (
          <div className="mt-5 grid gap-3">
            {shrines.map((s, i) => (
              <div key={i} className="tmpl-shrine">
                <h4 className="tmpl-font text-lg font-semibold leading-tight">{s.name}</h4>
                <p className="mt-1.5 text-[0.9375rem] leading-relaxed text-ink-soft">
                  <Txt text={s.text} />
                </p>
              </div>
            ))}
          </div>
        )}
        {entry.tip && (
          <p className="tmpl-tip mt-5">
            <Lotus className="mt-1 w-5 shrink-0 text-[#f4b942]" />
            <span>
              <span className="tmpl-tip-label">{entry.tipLabel}</span>
              <Txt text={entry.tip} />
            </span>
          </p>
        )}
        {entry.link && (
          <p className="mt-4 text-sm">
            <Link href={entry.link} className="link-arrow">
              Full guide to {entry.name.split(":")[0]}
              <ArrowRight size={16} aria-hidden="true" className="btn-arrow" />
            </Link>
          </p>
        )}
      </div>
    </article>
  );
}

function Chapter({ chapter, index }: { chapter: TempleChapter; index: number }) {
  const more = chapter.more.filter((m) => m.name.trim());
  return (
    <section id={chapter.id} aria-labelledby={`${chapter.id}-title`} className={`tmpl-section ${index % 2 ? "tmpl-section-deep" : ""}`}>
      <div className="container-x">
        <div className="tmpl-chapter-head">
          <span aria-hidden="true" lang="hi" className="tmpl-chapter-mark tmpl-font">
            {NUMERALS[(index + 1) % 10]}
          </span>
          <div>
            <h2 id={`${chapter.id}-title`} className="tmpl-h2 tmpl-font">
              {chapter.title}
            </h2>
            <p className="tmpl-lede">
              <Txt text={chapter.intro} />
            </p>
          </div>
        </div>
        <div className="mt-9">
          {chapter.entries.map((e, i) => (
            <Entry key={i} entry={e} flip={i % 2 === 1} />
          ))}
        </div>
        {more.length > 0 && (
          <div className="border-t border-line pt-9">
            <h3 className="tmpl-h3 tmpl-font">{chapter.moreTitle}</h3>
            <dl className="mt-5 grid gap-3 sm:grid-cols-2">
              {more.map((m, i) => (
                <div key={i} className="tmpl-shrine">
                  <dt className="font-semibold text-ink">{m.name}</dt>
                  <dd className="mt-1 text-[0.9375rem] leading-relaxed text-ink-soft">
                    <Txt text={m.text} />
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        )}
      </div>
    </section>
  );
}

export function TempleChapters({ c }: C) {
  return (
    <>
      {c.chapters.map((chapter, i) => (
        <Chapter key={chapter.id || i} chapter={chapter} index={i} />
      ))}
    </>
  );
}

export function DarshanPlanner({ c }: C) {
  const { planner } = c;
  return (
    <section id="timings" aria-labelledby="timings-title" className="tmpl-section">
      <div className="container-x">
        <Kicker>{planner.eyebrow}</Kicker>
        <h2 id="timings-title" className="tmpl-h2 tmpl-font">
          {planner.title}
        </h2>
        <p className="tmpl-lede">
          <Txt text={planner.intro} />
        </p>
        <div className="tmpl-table-wrap mt-8">
          <table className="tmpl-table">
            <thead>
              <tr>
                <th scope="col">{planner.columns.temple}</th>
                <th scope="col">{planner.columns.morning}</th>
                <th scope="col">{planner.columns.evening}</th>
                <th scope="col">{planner.columns.best}</th>
              </tr>
            </thead>
            <tbody>
              {planner.rows.map((r, i) => (
                <tr key={i}>
                  <th scope="row">{r.temple}</th>
                  <td data-label={planner.columns.morning}>{r.morning}</td>
                  <td data-label={planner.columns.evening}>{r.evening}</td>
                  <td data-label={planner.columns.best}>{r.best}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {TIMINGS_VERIFIED_ON && <p className="mt-2 text-xs text-stone">Timings verified on {TIMINGS_VERIFIED_ON}.</p>}
        <p className="mt-4 text-sm">
          <Link href={TIMINGS_HREF} className="link-arrow">
            {planner.fullTimetableLabel}
            <ArrowRight size={16} aria-hidden="true" className="btn-arrow" />
          </Link>
        </p>
        <div className="tmpl-plan mt-9">
          <h3 className="tmpl-h3 tmpl-font">{planner.planTitle}</h3>
          <p className="mt-3 max-w-3xl leading-relaxed">
            <Txt text={planner.planText} />
          </p>
        </div>
      </div>
    </section>
  );
}

export function Etiquette({ c }: C) {
  const { etiquette } = c;
  return (
    <section id="etiquette" aria-labelledby="etiquette-title" className="tmpl-section tmpl-section-deep">
      <div className="container-x">
        <Kicker>{etiquette.eyebrow}</Kicker>
        <h2 id="etiquette-title" className="tmpl-h2 tmpl-font">
          {etiquette.title}
        </h2>
        <div className="mt-9 grid gap-5 md:grid-cols-2">
          {etiquette.blocks.map((b, i) => {
            const list = b.list.filter((l) => l.label.trim() || l.text.trim());
            return (
              <div key={i}>
                <div className="tmpl-guide-card">
                  <h3 className="tmpl-font">{b.title}</h3>
                  {b.text && (
                    <p className="tmpl-body mt-3 text-[0.9375rem]">
                      <Txt text={b.text} />
                    </p>
                  )}
                  {list.length > 0 && (
                    <ul className="tmpl-rules">
                      {list.map((l, j) => (
                        <li key={j}>
                          {l.label && <strong className="text-ink">{l.label}</strong>} <Txt text={l.text} />
                        </li>
                      ))}
                    </ul>
                  )}
                  {b.closing && (
                    <p className="tmpl-body mt-3 text-[0.9375rem]">
                      <Txt text={b.closing} />
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function TemplesFaq({ c }: C) {
  return (
    <section id="faqs" aria-labelledby="faqs-title" className="tmpl-section">
      <div className="container-x max-w-4xl">
        <Kicker>{c.faqSection.eyebrow}</Kicker>
        <h2 id="faqs-title" className="tmpl-h2 tmpl-font">
          {c.faqSection.title}
        </h2>
        <div className="mt-7 border-t border-line">
          {c.faqs.map((f, i) => (
            <details key={i} className="tmpl-faq">
              <summary>
                <span>{f.q}</span>
                <span className="faq-icon icon-badge mt-0.5 size-6 rounded-full">
                  <Plus size={14} aria-hidden="true" />
                </span>
              </summary>
              <p className="pb-4 leading-relaxed text-ink-soft">
                <Txt text={f.a} />
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

export function BookJourney({ c }: C) {
  const { book } = c;
  const wa = whatsappLink(enquiry);
  const tel = phoneHref();
  return (
    <section id="book" aria-labelledby="book-title" className="tmpl-book py-16 lg:py-24">
      <Mandala className="tmpl-hero-mandala" aria-hidden="true" />
      <div className="container-x max-w-4xl">
        <p className="text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-amber-200">{book.eyebrow}</p>
        <h2 id="book-title" className="tmpl-h2 tmpl-font mt-3">
          {book.title}
        </h2>
        <div className="mt-5 grid gap-4 text-[1.0625rem] leading-relaxed">
          {book.paragraphs.map((p, i) => (
            <p key={i}>
              <Txt text={p} />
            </p>
          ))}
        </div>
        {STARTING_PRICE_INCLUDES && (
          <p className="mt-3 text-sm">
            {formatInr(STARTING_PRICE)}: {STARTING_PRICE_INCLUDES}
          </p>
        )}
        <div className="mt-7 flex flex-wrap gap-3">
          {wa && (
            <a href={wa} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp">
              <WhatsappIcon size={20} /> Enquire on WhatsApp
              <span className="sr-only"> (opens WhatsApp)</span>
            </a>
          )}
          {tel && (
            <a href={tel} className="btn btn-outline-light">
              <Phone size={18} aria-hidden="true" /> Call {site.contact.phone}
            </a>
          )}
          <Link href="/tour-packages" className="btn btn-outline-light">
            See tour packages
          </Link>
        </div>
        <ul className="mt-7 flex flex-wrap gap-2">
          {book.trust.map((t, i) => (
            <li key={i} className="tmpl-trust">
              {t}
            </li>
          ))}
        </ul>
        <p className="tmpl-font mt-8 text-2xl font-medium leading-snug text-white">{book.blessing}</p>
        <p className="mt-2 font-semibold text-white">{book.closing}</p>
        <p className="mt-1 text-sm">{book.signature}</p>
        <p className="mt-6 text-xs text-[#dacfbf]">Last updated {c.updatedOn}</p>
      </div>
    </section>
  );
}
