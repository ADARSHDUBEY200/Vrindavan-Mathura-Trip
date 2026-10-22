import "server-only";
import { cacheLife, cacheTag } from "next/cache";
import { createClient } from "@supabase/supabase-js";
import type { StaticImageData } from "next/image";
import { photos } from "@/content/images";
import { getPackage, packages as staticPackages } from "@/content/packages";
import { TABLES } from "./config";

export const CMS_PACKAGES_TAG = "cms-packages";

/**
 * Flip to `true` once /tour-packages/[slug] renders published CMS rows.
 * Until then that route only serves the static packages in content/packages.ts,
 * so CMS slugs would 404 and are never linked (or priced) from the homepage.
 */
export const CMS_PACKAGE_PAGES_LIVE = false;

export type CmsPackage = {
  slug: string;
  title: string;
  /** Rupees, or `null` when the CMS row has no usable price. */
  price: number | null;
  days: number | null;
  nights?: number | null;
  /** The row's own rating (e.g. 4.8), or `null`. Display only — never used as an aggregate rating in schema. */
  rating?: number | null;
  image?: { src: string; alt: string };
};

type Row = {
  slug: string | null;
  title: string | null;
  price: string | null;
  day: string | null;
  night?: string | null;
  rating?: string | null;
  heroimage?: { image?: string; alt?: string } | null;
};

function toNumber(value: string | null): number | null {
  const n = Number(String(value ?? "").replace(/[^\d.]/g, ""));
  return Number.isFinite(n) && n > 0 ? n : null;
}

/** Published packages from the Supabase `Package` table. Returns `[]` when Supabase is not configured or unreachable. */
export async function getPublishedPackages(): Promise<CmsPackage[]> {
  "use cache";
  cacheLife("hours");
  cacheTag(CMS_PACKAGES_TAG);

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return [];

  try {
    const supabase = createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false } });
    const { data, error } = await supabase.from(TABLES.Package).select("slug,title,price,day,night,rating,heroimage").eq("status", "published");
    if (error || !data) {
      console.error("[cms] published packages", error?.message);
      return [];
    }
    return (data as Row[])
      .filter((r): r is Row & { slug: string; title: string } => Boolean(r.slug && r.title))
      .map((r) => ({
        slug: r.slug,
        title: r.title,
        price: toNumber(r.price),
        days: toNumber(r.day),
        nights: Number.isFinite(Number(r.night)) && r.night !== null && r.night !== "" ? Number(r.night) : null,
        rating: toNumber(r.rating ?? null),
        image: r.heroimage?.image ? { src: r.heroimage.image, alt: r.heroimage.alt || r.title } : undefined,
      }));
  } catch (err) {
    console.error("[cms] published packages", err);
    return [];
  }
}

/** Public product page for a CMS package, or `undefined` when no page renders it yet. */
export function cmsPackagePath(slug: string): string | undefined {
  return CMS_PACKAGE_PAGES_LIVE || getPackage(slug) ? `/tour-packages/${slug}` : undefined;
}

/** Packages that combine Braj with somewhere else, or start from a far city — not a match for a Mathura–Vrindavan signature tour. */
const NOT_SIGNATURE = /agra|taj|delhi|from|golden|ayodhya|kashi|varanasi|khatu|haridwar|premanand|chitrakoot|prayagraj|84/i;

/**
 * The published CMS package that corresponds to a signature tour of `days` days:
 * same length, Mathura + Vrindavan only, with the plainest (shortest) title winning.
 */
export function matchSignaturePackage(days: number, list: CmsPackage[]): (CmsPackage & { path: string }) | undefined {
  const match = list
    .filter((p) => p.days === days && /mathura/i.test(p.title) && /vrindavan/i.test(p.title) && !NOT_SIGNATURE.test(`${p.title} ${p.slug}`))
    .sort((a, b) => a.title.length - b.title.length)[0];
  const path = match && cmsPackagePath(match.slug);
  return match && path ? { ...match, path } : undefined;
}

/* ------------------------------------------------------------------ */
/* Package catalogue (the /tour-packages card grid)                    */
/* ------------------------------------------------------------------ */

export type CatalogPackage = {
  slug: string;
  title: string;
  price: number | null;
  days: number | null;
  /** e.g. "2 Days / 1 Night". */
  durationLabel: string | null;
  rating: number | null;
  image?: { src: string | StaticImageData; alt: string };
  /** Product page, only when one actually renders (see CMS_PACKAGE_PAGES_LIVE). */
  path?: string;
};

const plural = (n: number, word: string) => `${n} ${word}${n === 1 ? "" : "s"}`;

/**
 * Published CMS packages, or — when the CMS is empty or unreachable — the static packages in content/packages.ts,
 * so the grid is never blank. Sorted by length, then price.
 */
export function toCatalog(cms: CmsPackage[]): CatalogPackage[] {
  const list: CatalogPackage[] = cms.length
    ? cms.map((p) => ({
        slug: p.slug,
        title: p.title,
        price: p.price,
        days: p.days,
        durationLabel: p.days ? [plural(p.days, "Day"), p.nights ? plural(p.nights, "Night") : ""].filter(Boolean).join(" / ") : null,
        rating: p.rating ?? null,
        image: p.image,
        path: cmsPackagePath(p.slug),
      }))
    : staticPackages.map((p) => ({
        slug: p.slug,
        title: p.title,
        price: p.price?.amount ?? null,
        days: p.days,
        durationLabel: p.duration,
        rating: null,
        image: { src: photos[p.image].src, alt: photos[p.image].alt },
        path: `/tour-packages/${p.slug}`,
      }));
  return list.sort((a, b) => (a.days ?? 99) - (b.days ?? 99) || (a.price ?? Infinity) - (b.price ?? Infinity) || a.title.localeCompare(b.title));
}

/** Combined circuits and far-away starting points: never the match for a Vrindavan-only package. */
const NOT_VRINDAVAN_ONLY = /mathura|agra|taj|delhi|from|gokul|govardhan|barsana|ayodhya|kashi|varanasi|khatu|haridwar|rishikesh|84|braj/i;

/**
 * The live product page for a /tour-packages signature package: first by name (`words`), then by length
 * (same number of days, Vrindavan only). Only packages whose page actually renders are considered.
 */
export function matchCatalogPackage(catalog: CatalogPackage[], words?: RegExp, days?: number): CatalogPackage | undefined {
  const live = catalog.filter((p) => p.path);
  const byName = words && live.find((p) => words.test(p.title) || words.test(p.slug));
  if (byName) return byName;
  if (!days) return undefined;
  return live
    .filter((p) => p.days === days && /vrindavan/i.test(p.title) && !NOT_VRINDAVAN_ONLY.test(`${p.title} ${p.slug}`))
    .sort((a, b) => a.title.length - b.title.length)[0];
}
