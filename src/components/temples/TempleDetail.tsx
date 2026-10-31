import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { BadgeCheck, BookOpen, CalendarDays, ChevronDown, Clock, Compass, Flower2, HelpCircle, Images, Info, Landmark, Lightbulb, List, MapPin, MessageCircle, Route, ScrollText, Sparkles } from "lucide-react";
import { EnquiryForm } from "@/components/forms/EnquiryForm";
import { Lotus } from "@/components/svg/Ornaments";
import { WhatsappIcon } from "@/components/svg/TravelIcons";
import { EnquireButton } from "@/components/tour-packages/EnquireButton";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { FaqList } from "@/components/ui/FaqList";
import { FOUNDER, TIMINGS_VERIFIED_ON } from "@/config/site";
import { TIMING_DISCLAIMER } from "@/content/temples";
import type { TempleBlock } from "@/lib/cms/temple-fields";
import type { TempleCardData, TempleView } from "@/lib/cms/temples";
import { formatDate } from "@/lib/cms/utils";
import type { Crumb } from "@/lib/schema";
import { whatsappLink } from "@/lib/whatsapp";
import { ArchCard } from "./kit";
import { TempleGallery } from "./TempleGallery";

type Meta = { title: string; sub: string; icon: typeof Clock };

const BLOCK_META: Record<TempleBlock, Meta> = {
  quickAnswer: { title: "Quick Answer", sub: "The short answer, up front", icon: Sparkles },
  glance: { title: "At a Glance", sub: "Timings, location and key facts", icon: Info },
  visitor: { title: "Visitor Guide", sub: "Darshan, aarti and best time to visit", icon: Clock },
  overview: { title: "Temple Overview", sub: "What makes this place special", icon: Landmark },
  history: { title: "History & Significance", sub: "The story behind the temple", icon: ScrollText },
  guide: { title: "Complete Guide", sub: "Everything about the temple", icon: BookOpen },
  festivals: { title: "Festivals", sub: "When the temple is at its most alive", icon: CalendarDays },
  reach: { title: "Location & How to Reach", sub: "Address, map and routes", icon: MapPin },
  gallery: { title: "Explore the Temple", sub: "Photo gallery", icon: Images },
  tips: { title: "Local Tips", sub: "What only a local knows", icon: Lightbulb },
  enquiry: { title: "Plan Your Visit", sub: "Tell us your dates", icon: MessageCircle },
  nearby: { title: "Nearby & Related", sub: "Combine these on the same day", icon: Compass },
  whyBook: { title: "Why Book With Us", sub: "What you get", icon: BadgeCheck },
  faqs: { title: "Visitor Questions", sub: "Asked by pilgrims like you", icon: HelpCircle },
};

const anchor = (key: string) => key.replace("custom:", "section-");

function blockMeta(t: TempleView, key: string): Meta {
  if (!key.startsWith("custom:")) return BLOCK_META[key as TempleBlock];
  const section = t.sections.find((s) => `custom:${s.id}` === key);
  return { title: section?.heading || "More about this temple", sub: "", icon: Flower2 };
}

function Rich({ html, className = "" }: { html: string; className?: string }) {
  return <div className={`tdp-rich ${className}`} dangerouslySetInnerHTML={{ __html: html }} />;
}

function Card({ id, meta, n, children }: { id: string; meta: Meta; n: number; children: ReactNode }) {
  const Icon = meta.icon;
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="tdp-card">
      <header className="tdp-head">
        <span className="tdp-icon">
          <Icon size={20} aria-hidden="true" />
        </span>
        <div>
          <h2 id={`${id}-title`}>
            <span className="sr-only">{n}. </span>
            {meta.title}
          </h2>
          {meta.sub && <span className="tdp-sub">{meta.sub}</span>}
        </div>
      </header>
      {children}
    </section>
  );
}

function Table({ head, rows, compact = false }: { head: string[]; rows: string[][]; compact?: boolean }) {
  return (
    <div className="tdp-table-wrap">
      <table className={`tdp-table ${compact ? "tdp-table-compact" : ""}`}>
        {head.length > 0 && (
          <thead>
            <tr>
              {head.map((h) => (
                <th key={h} scope="col">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
        )}
        <tbody>
          {rows.map((row, i) => (
            <tr key={i}>
              {row.map((cell, j) =>
                j === 0 ? (
                  <th key={j} scope="row">
                    {cell}
                  </th>
                ) : (
                  <td key={j}>{cell}</td>
                ),
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/** Drops a column that is empty on every row, such as "Season" for a temple with one schedule all year. */
function trimColumns(head: string[], rows: string[][]) {
  const keep = head.map((_, i) => rows.some((r) => r[i]?.trim()));
  return { head: head.filter((_, i) => keep[i]), rows: rows.map((r) => r.filter((_, i) => keep[i])) };
}

export function TempleHero({ t, crumbs, firstBlock }: { t: TempleView; crumbs: Crumb[]; firstBlock: string }) {
  return (
    <section aria-labelledby="page-title" className="tdp-hero pt-24 sm:pt-28">
      <div className="container-x grid items-center gap-9 lg:grid-cols-2 lg:gap-12">
        <div className="min-w-0">
          <div className="hero-in">
            <Breadcrumbs items={crumbs} light />
          </div>
          <p className="tdp-pill hero-in hero-in-1 mt-5">{t.category || "Sacred temple guide"}</p>
          <h1 id="page-title" className="tdp-h1 hero-in hero-in-2 mt-4">
            {t.name}
          </h1>
          <p className="hero-in hero-in-2 mt-3 inline-flex items-center gap-2 text-[#fde8c8]">
            <MapPin size={17} aria-hidden="true" className="text-[#fbbf24]" /> {t.town}
          </p>
          <p className="tdp-divider hero-in hero-in-3 mt-4" aria-hidden="true">
            ॐ
          </p>
          {t.summary && <p className="hero-in hero-in-3 mt-4 text-[1.05rem] leading-relaxed text-[#ffe9cf]">{t.summary}</p>}
          <div className="hero-in hero-in-4 mt-6 flex flex-wrap items-center gap-3">
            <EnquireButton className="btn btn-primary">Plan Your Visit</EnquireButton>
            <a href={`#${anchor(firstBlock)}`} className="btn btn-outline-light">
              Read the guide
            </a>
          </div>
        </div>
        <div className="min-w-0">
          <div className="tdp-hero-figure">
            {t.image ? (
              <Image src={t.image.src} alt={t.image.alt} fill preload sizes="(min-width: 1024px) 38rem, 100vw" className="object-cover" />
            ) : (
              <span className="grid size-full place-items-center text-[#fbbf24]">
                <Lotus className="w-24" />
              </span>
            )}
            {t.timingNote && (
              <p className="tdp-badge">
                <span className="block text-[0.68rem] font-bold uppercase tracking-[0.12em] text-[#fcd34d]">Temple darshan</span>
                <span className="block text-sm leading-snug text-white">{t.timingNote}</span>
              </p>
            )}
          </div>
          {t.stats.length > 0 && (
            <dl className="tdp-stats mt-5">
              {t.stats.map((s) => (
                <div key={s.id} className="flex flex-col-reverse">
                  <dt className="tdp-stat-label">{s.label}</dt>
                  <dd className="tdp-stat-value">{s.value}</dd>
                </div>
              ))}
            </dl>
          )}
        </div>
      </div>
      <svg className="tdp-wave" viewBox="0 0 1440 80" preserveAspectRatio="none" aria-hidden="true">
        <path fill="currentColor" d="M0 56c180-34 360-38 540-14s360 46 540 26 270-34 360-30v42H0z" />
      </svg>
    </section>
  );
}

function TableOfContents({ t }: { t: TempleView }) {
  return (
    <details open className="tdp-toc">
      <summary>
        <span className="tdp-icon">
          <List size={20} aria-hidden="true" />
        </span>
        Table of Contents
        <span className="tdp-toc-count">{t.blocks.length} sections</span>
        <ChevronDown size={20} aria-hidden="true" className="tdp-toc-chevron" />
      </summary>
      <ol>
        {t.blocks.map((key, i) => {
          const meta = blockMeta(t, key);
          return (
            <li key={key}>
              <a href={`#${anchor(key)}`} className="tdp-toc-link">
                <span className="tdp-num">{String(i + 1).padStart(2, "0")}</span>
                <span>
                  <span className="tdp-toc-title">{meta.title}</span>
                  {meta.sub && <span className="tdp-sub">{meta.sub}</span>}
                </span>
              </a>
              {key === "guide" && t.guide.headings.length > 0 && (
                <ul className="tdp-toc-sub">
                  {t.guide.headings.map((h) => (
                    <li key={h.id}>
                      <a href={`#${h.id}`}>{h.text}</a>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          );
        })}
      </ol>
    </details>
  );
}

function VisitorGuide({ t, message }: { t: TempleView; message: string }) {
  const wa = whatsappLink(message);
  const darshan = trimColumns(
    ["Season", "Session", "Time", "Note"],
    t.darshan.map((d) => [d.season, d.session, d.time, d.note]),
  );
  const aarti = trimColumns(
    ["Season", "Aarti", "Time"],
    t.aarti.map((a) => [a.season, a.name, a.time]),
  );
  return (
    <>
      {t.darshan.length > 0 && (
        <div className="grid gap-3">
          <h3 className="tdp-h3">Opening and closing timings</h3>
          <Table {...darshan} />
        </div>
      )}
      {t.timingNotes && <Rich html={t.timingNotes} className="mt-3 text-[0.9375rem]" />}
      {t.aarti.length > 0 && (
        <div className="mt-6 grid gap-3">
          <h3 className="tdp-h3">Aarti timings</h3>
          <Table {...aarti} />
        </div>
      )}
      <p className="tdp-callout text-sm">
        <Clock size={18} aria-hidden="true" className="mt-0.5 shrink-0 text-[#c2410c]" />
        <span>
          <strong className="text-ink">Subject to change.</strong> {TIMING_DISCLAIMER}
          {TIMINGS_VERIFIED_ON && ` Timings verified on ${TIMINGS_VERIFIED_ON}.`}{" "}
          <Link href="/mathura-vrindavan-temple-timings" className="tmpl-link">
            All temple timings
          </Link>
        </span>
      </p>
      {t.visiting.length > 0 && (
        <div className="mt-6 grid gap-3">
          <h3 className="tdp-h3">Visiting information</h3>
          <Table
            head={[]}
            compact
            rows={t.visiting.map((v) => [v.label, v.value])}
          />
        </div>
      )}
      {t.bestVisit && (
        <div className="mt-6">
          <h3 className="tdp-h3 mb-2">Best time to visit</h3>
          <Rich html={t.bestVisit} />
        </div>
      )}
      <div className="tdp-help">
        <div>
          <p className="font-bold text-ink">Need help planning?</p>
          <p className="text-sm text-stone">We check timings the day before for every guest.</p>
        </div>
        {wa ? (
          <a href={wa} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp btn-sm">
            <WhatsappIcon size={18} /> WhatsApp us
            <span className="sr-only"> (opens WhatsApp)</span>
          </a>
        ) : (
          <EnquireButton className="btn btn-primary btn-sm">Send an enquiry</EnquireButton>
        )}
      </div>
    </>
  );
}

function ReachBlock({ t }: { t: TempleView }) {
  return (
    <>
      {t.addressLine && (
        <p className="flex items-start gap-2 font-medium text-ink">
          <MapPin size={18} aria-hidden="true" className="mt-1 shrink-0 text-[#c2410c]" />
          <span>{t.addressLine}</span>
        </p>
      )}
      <div className="tdp-map mt-4">
        <iframe src={t.mapEmbed} title={`Map of ${t.name}`} loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
      </div>
      <p className="mt-3">
        <a href={t.mapUrl} target="_blank" rel="noopener noreferrer" className="btn btn-dark btn-sm">
          <Route size={16} aria-hidden="true" /> Open in Google Maps
          <span className="sr-only"> (opens in a new tab)</span>
        </a>
      </p>
      {t.journey && <Rich html={t.journey} className="mt-5" />}
      {t.routes.length > 0 && (
        <div className="mt-5 grid gap-3">
          <h3 className="tdp-h3">How to reach</h3>
          <Table
            {...trimColumns(
              ["From", "Distance", "How"],
              t.routes.map((r) => [r.from, r.distance, r.how]),
            )}
          />
        </div>
      )}
    </>
  );
}

function NearbyBlock({ t, related }: { t: TempleView; related: TempleCardData[] }) {
  return (
    <>
      {t.nearby.length > 0 && (
        <>
          <h3 className="tdp-h3">Nearby attractions</h3>
          <ul className="mt-3 grid gap-3 sm:grid-cols-2">
            {t.nearby.map((n) => {
              const body = (
                <>
                  <span className="block font-semibold text-ink">{n.name}</span>
                  {n.distance && <span className="tdp-sub">{n.distance}</span>}
                  {n.text && <span className="mt-1 block text-sm leading-relaxed text-stone">{n.text}</span>}
                </>
              );
              return (
                <li key={n.id}>
                  {n.href ? (
                    <Link href={n.href} className="tdp-nearby">
                      {body}
                    </Link>
                  ) : (
                    <div className="tdp-nearby">{body}</div>
                  )}
                </li>
              );
            })}
          </ul>
        </>
      )}
      {related.length > 0 && (
        <>
          <h3 className="tdp-h3">Related temples</h3>
          <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-7 sm:grid-cols-3">
            {related.map((r) => (
              <li key={r.slug}>
                <ArchCard temple={r} />
              </li>
            ))}
          </ul>
        </>
      )}
    </>
  );
}

function WhyBook({ t, message }: { t: TempleView; message: string }) {
  const wa = whatsappLink(message);
  return (
    <>
      {t.whyBook.heading && <h3 className="tdp-h3">{t.whyBook.heading}</h3>}
      {t.whyBook.intro && <p className="mt-2 leading-relaxed text-ink-soft">{t.whyBook.intro}</p>}
      <div className="mt-4">
        <Table
          compact
          head={["Why", "What you get"]}
          rows={t.whyBook.rows.map((r) => [r.reason, r.detail])}
        />
      </div>
      {t.whyBook.outro && <p className="mt-4 leading-relaxed text-ink-soft">{t.whyBook.outro}</p>}
      <div className="mt-4 flex flex-wrap gap-3">
        {wa && (
          <a href={wa} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp btn-sm">
            <WhatsappIcon size={18} /> Chat on WhatsApp
            <span className="sr-only"> (opens WhatsApp)</span>
          </a>
        )}
        <Link href="/tour-packages" className="btn btn-outline btn-sm">
          Explore tour packages
        </Link>
      </div>
    </>
  );
}

function Block({ t, k, n, related, message }: { t: TempleView; k: string; n: number; related: TempleCardData[]; message: string }) {
  const id = anchor(k);
  const meta = blockMeta(t, k);

  if (k.startsWith("custom:")) {
    const section = t.sections.find((s) => `custom:${s.id}` === k);
    if (!section) return null;
    return (
      <Card id={id} meta={meta} n={n}>
        {section.picture && (
          <div className="relative mb-4 aspect-video overflow-hidden rounded-[0.9rem] bg-[#fef3c7]">
            <Image src={section.picture.src} alt={section.picture.alt} fill sizes="(min-width: 860px) 46rem, 100vw" className="object-cover" />
          </div>
        )}
        {section.body && <Rich html={section.body} />}
      </Card>
    );
  }

  switch (k as TempleBlock) {
    case "quickAnswer":
      return (
        <section id={id} aria-labelledby={`${id}-title`} className="tdp-answer">
          <h2 id={`${id}-title`} className="tdp-answer-label">
            <Sparkles size={13} aria-hidden="true" /> {meta.title}
          </h2>
          <Rich html={t.quickAnswer} className="mt-3" />
        </section>
      );
    case "glance":
      return (
        <Card id={id} meta={meta} n={n}>
          <Table
            head={[]}
            compact
            rows={t.glance.map((g) => [g.label, g.value])}
          />
          <p className="mt-4">
            <Link href="/tour-packages" className="link-arrow text-sm">
              Explore tour packages
            </Link>
          </p>
        </Card>
      );
    case "visitor":
      return (
        <Card id={id} meta={meta} n={n}>
          <VisitorGuide t={t} message={message} />
        </Card>
      );
    case "overview":
      return (
        <Card id={id} meta={meta} n={n}>
          <Rich html={t.overview} />
        </Card>
      );
    case "history":
      return (
        <Card id={id} meta={meta} n={n}>
          {t.history.length > 0 && (
            <div className="tdp-rich">
              {t.history.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          )}
          {t.significance && (
            <>
              <h3 className="tdp-h3 mb-2">Religious significance</h3>
              <Rich html={t.significance} />
            </>
          )}
        </Card>
      );
    case "guide":
      return (
        <Card id={id} meta={meta} n={n}>
          <Rich html={t.guide.html} />
        </Card>
      );
    case "festivals":
      return (
        <Card id={id} meta={meta} n={n}>
          <Table
            {...trimColumns(
              ["Festival", "When", "Highlights"],
              t.festivals.map((f) => [f.name, f.when, f.highlight]),
            )}
          />
        </Card>
      );
    case "reach":
      return (
        <Card id={id} meta={meta} n={n}>
          <ReachBlock t={t} />
        </Card>
      );
    case "gallery":
      return (
        <Card id={id} meta={meta} n={n}>
          <TempleGallery items={t.gallery} />
        </Card>
      );
    case "tips":
      return (
        <Card id={id} meta={meta} n={n}>
          {t.tips.length > 0 && (
            <ul className="tdp-tips">
              {t.tips.map((tip) => (
                <li key={tip}>{tip}</li>
              ))}
            </ul>
          )}
          {t.goodToKnow && (
            <p className="tdp-callout">
              <Lightbulb size={18} aria-hidden="true" className="mt-0.5 shrink-0 text-[#c2410c]" />
              <span>{t.goodToKnow}</span>
            </p>
          )}
        </Card>
      );
    case "enquiry":
      return (
        <div id={id}>
          <EnquiryForm title={`Plan your visit to ${t.name}`} compact />
        </div>
      );
    case "nearby":
      return (
        <Card id={id} meta={meta} n={n}>
          <NearbyBlock t={t} related={related} />
        </Card>
      );
    case "whyBook":
      return (
        <Card id={id} meta={meta} n={n}>
          <WhyBook t={t} message={message} />
        </Card>
      );
    case "faqs":
      return (
        <Card id={id} meta={meta} n={n}>
          <FaqList items={t.faqs} />
        </Card>
      );
    default:
      return null;
  }
}

export function TempleBody({ t, related }: { t: TempleView; related: TempleCardData[] }) {
  const message = `Radhe Radhe! I'd like to plan a visit to ${t.name}.`;
  return (
    <div className="tdp-column tdp-stack pt-6">
      <TableOfContents t={t} />
      {t.blocks.map((key, i) => (
        <Block key={key} t={t} k={key} n={i + 1} related={related} message={message} />
      ))}
      <p className="tdp-byline">
        Guide by {FOUNDER.name}, Founder &amp; Local Guide{t.updatedOn ? ` · Last updated ${formatDate(t.updatedOn)}` : ""}
      </p>
    </div>
  );
}
