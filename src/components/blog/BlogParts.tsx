import Link from "next/link";
import { ArrowLeft, ArrowRight, BadgeCheck, CalendarHeart, HeartHandshake, Star } from "lucide-react";
import { Mandala } from "@/components/svg/Ornaments";
import { FacebookIcon, WhatsappIcon, XIcon } from "@/components/svg/TravelIcons";
import { EnquiryButtons } from "@/components/ui/EnquiryButtons";
import { FOUNDED, PILGRIMS, RATING, YEARS } from "@/config/site";
import { BLOGS_PATH } from "@/lib/cms/blogs";
import { absoluteUrl } from "@/lib/seo";

/* ------------------------------------------------------------------ */
/* Planning CTA: cocoa band with the trust figures alongside            */
/* ------------------------------------------------------------------ */

export function PlanTripBand({
  title = "Planning a Vrindavan & Mathura trip?",
  text = "Private car, unhurried darshan timings and a local team on WhatsApp — tell us your dates and we’ll shape the plan around you.",
  message,
  id = "plan-band-title",
  pilgrims = PILGRIMS,
}: {
  title?: string;
  text?: string;
  message?: string;
  id?: string;
  pilgrims?: string;
}) {
  const trust = [
    { Icon: HeartHandshake, value: pilgrims, label: "Pilgrims served" },
    { Icon: Star, value: `${RATING}★`, label: "Pilgrim rating" },
    { Icon: CalendarHeart, value: YEARS, label: `Years · since ${FOUNDED}` },
    { Icon: BadgeCheck, value: "100%", label: "Private, local team" },
  ];
  return (
    <section aria-labelledby={id} className="relative isolate overflow-hidden rounded-2xl bg-cocoa px-5 py-9 text-white sm:px-10 sm:py-12 lg:px-14 lg:py-14">
      <div className="pointer-events-none absolute -right-28 -top-28 -z-10 size-96 rounded-full bg-orange-600/45 blur-3xl" aria-hidden="true" />
      <div className="pointer-events-none absolute -bottom-32 -left-24 -z-10 size-80 rounded-full bg-amber-500/15 blur-3xl" aria-hidden="true" />
      <Mandala className="pointer-events-none absolute -right-24 top-1/2 -z-10 hidden size-112 -translate-y-1/2 text-orange-400/10 lg:block" />

      <div className="grid gap-9 lg:grid-cols-[1.1fr_1fr] lg:items-center lg:gap-16">
        <div>
          <p className="flex items-center gap-3 text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-amber-300">
            <span className="h-0.5 w-7 bg-linear-to-r from-orange-500 to-amber-400" aria-hidden="true" />
            Plan your visit
          </p>
          <h2 id={id} className="display-2 mt-3 text-white">
            {title}
          </h2>
          <p className="mt-3 max-w-xl text-[0.95rem] leading-relaxed text-white/75">{text}</p>
          <EnquiryButtons message={message} size="sm" light className="mt-6" />
          <Link href="/tour-packages" className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-amber-300 underline-offset-4 hover:underline">
            Browse tour packages <ArrowRight size={15} aria-hidden="true" className="btn-arrow" />
          </Link>
        </div>

        <ul className="grid grid-cols-2 gap-px overflow-hidden rounded-xl bg-white/10 ring-1 ring-white/10" aria-label="Why pilgrims trust us">
          {trust.map(({ Icon, value, label }) => (
            <li key={label} className="bg-cocoa-soft/95 p-4 sm:p-6">
              <Icon size={20} aria-hidden="true" className="text-orange-400" />
              <span className="mt-3 block text-xl font-bold tracking-tight text-white sm:text-2xl">{value}</span>
              <span className="mt-0.5 block text-xs leading-snug text-white/65">{label}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Category tabs + pagination (plain links: crawlable, no client JS)   */
/* ------------------------------------------------------------------ */

export function blogListHref({ category, page }: { category?: string; page?: number }): string {
  const params = new URLSearchParams();
  if (category) params.set("category", category);
  if (page && page > 1) params.set("page", String(page));
  const qs = params.toString();
  return `${BLOGS_PATH}${qs ? `?${qs}` : ""}#latest`;
}

export function CategoryTabs({ categories, active, total }: { categories: { name: string; slug: string; count: number }[]; active?: string; total: number }) {
  const tabs = [{ name: "All stories", slug: "", count: total }, ...categories];
  return (
    <nav aria-label="Blog categories" className="border-y border-line">
      <ul className="no-scrollbar -mx-4 flex gap-1 overflow-x-auto px-4 py-2.5 sm:mx-0 sm:flex-wrap sm:px-0">
        {tabs.map((c) => {
          const current = (active ?? "") === c.slug;
          return (
            <li key={c.slug || "all"} className="shrink-0">
              <Link
                href={blogListHref({ category: c.slug || undefined })}
                aria-current={current ? "page" : undefined}
                className={`inline-flex min-h-11 items-center gap-2 whitespace-nowrap rounded-md px-3.5 text-sm font-medium transition-colors duration-300 ${
                  current ? "bg-orange-700 text-white shadow-[0_10px_20px_-12px_rgb(194_65_12/0.9)]" : "text-ink-soft hover:bg-orange-100 hover:text-ember-deep"
                }`}
              >
                {c.name}
                <span className={`text-[0.7rem] font-semibold tabular-nums ${current ? "text-white/80" : "text-stone"}`}>{c.count}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

/** Numbered pages with ellipses around the current page. */
function pageList(current: number, total: number): (number | "…")[] {
  const pages = new Set([1, total, current - 1, current, current + 1].filter((p) => p >= 1 && p <= total));
  const sorted = [...pages].sort((a, b) => a - b);
  const out: (number | "…")[] = [];
  sorted.forEach((p, i) => {
    if (i > 0 && p - sorted[i - 1] > 1) out.push("…");
    out.push(p);
  });
  return out;
}

export function Pagination({ page, totalPages, category }: { page: number; totalPages: number; category?: string }) {
  if (totalPages <= 1) return null;
  const btn = "grid min-h-11 min-w-11 place-items-center rounded-md border border-line bg-white px-3 text-sm font-semibold text-ink-soft transition-colors hover:border-orange-600 hover:text-ember-deep";
  return (
    <nav aria-label="Blog pages" className="mt-14 flex flex-col items-center gap-3 border-t border-line pt-8 sm:flex-row sm:justify-between">
      <p className="text-sm text-stone">
        Page <strong className="font-semibold text-ink">{page}</strong> of {totalPages}
      </p>
      <ul className="flex flex-wrap items-center justify-center gap-1.5">
        <li>
          {page > 1 ? (
            <Link href={blogListHref({ category, page: page - 1 })} rel="prev" className={btn}>
              <span className="inline-flex items-center gap-1">
                <ArrowLeft size={15} aria-hidden="true" /> Prev
              </span>
            </Link>
          ) : (
            <span className={`${btn} pointer-events-none opacity-40`} aria-hidden="true">
              <span className="inline-flex items-center gap-1">
                <ArrowLeft size={15} /> Prev
              </span>
            </span>
          )}
        </li>
        {pageList(page, totalPages).map((p, i) =>
          p === "…" ? (
            <li key={`gap-${i}`} className="px-1 text-stone" aria-hidden="true">
              …
            </li>
          ) : (
            <li key={p}>
              {p === page ? (
                <span aria-current="page" className={`${btn} border-orange-700 bg-orange-700 text-white`}>
                  {p}
                </span>
              ) : (
                <Link href={blogListHref({ category, page: p })} className={btn} aria-label={`Page ${p}`}>
                  {p}
                </Link>
              )}
            </li>
          ),
        )}
        <li>
          {page < totalPages ? (
            <Link href={blogListHref({ category, page: page + 1 })} rel="next" className={btn}>
              <span className="inline-flex items-center gap-1">
                Next <ArrowRight size={15} aria-hidden="true" />
              </span>
            </Link>
          ) : (
            <span className={`${btn} pointer-events-none opacity-40`} aria-hidden="true">
              <span className="inline-flex items-center gap-1">
                Next <ArrowRight size={15} />
              </span>
            </span>
          )}
        </li>
      </ul>
    </nav>
  );
}

/* ------------------------------------------------------------------ */
/* Share links                                                         */
/* ------------------------------------------------------------------ */

export function ShareLinks({ path, title }: { path: string; title: string }) {
  const url = absoluteUrl(path);
  const links = [
    { label: "WhatsApp", href: `https://wa.me/?text=${encodeURIComponent(`${title} ${url}`)}`, Icon: WhatsappIcon, tone: "hover:border-green-300 hover:text-green-700" },
    { label: "X (Twitter)", href: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`, Icon: XIcon, tone: "hover:border-slate-400 hover:text-ink" },
    { label: "Facebook", href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, Icon: FacebookIcon, tone: "hover:border-blue-300 hover:text-blue-700" },
  ];
  return (
    <div className="flex flex-wrap items-center gap-3">
      <p className="text-sm font-semibold text-ink">Share this guide</p>
      <ul className="flex gap-2">
        {links.map(({ label, href, Icon, tone }) => (
          <li key={label}>
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Share on ${label} (opens in a new tab)`}
              className={`grid size-10 place-items-center rounded-full border border-line bg-white text-ink-soft transition ${tone}`}
            >
              <Icon size={18} aria-hidden="true" />
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
