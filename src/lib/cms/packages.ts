import "server-only";
import { cacheLife, cacheTag } from "next/cache";
import type { StaticImageData } from "next/image";
import { photos } from "@/content/images";
import { packages as staticPackages } from "@/content/packages";
import { createPublicClient } from "@/lib/supabase/public";
import { TABLES } from "./config";
import { durationLabel, packagePath, segmentOf } from "./package-fields";

export const CMS_PACKAGES_TAG = "cms-packages";

export type CmsPackage = {
  slug: string;
  title: string;
  /** First URL segment of the product page, e.g. "five-days". */
  segment: string;
  /** Product page: /tour-packages/{segment}/{slug}. */
  path: string;
  destination?: string;
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
  duration?: string | null;
  destination?: string | null;
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

  const supabase = createPublicClient();
  if (!supabase) return [];

  try {
    const { data, error } = await supabase.from(TABLES.Package).select("slug,title,price,day,night,duration,destination,rating,heroimage").eq("status", "published");
    if (error || !data) {
      console.error("[cms] published packages", error?.message);
      return [];
    }
    return (data as Row[])
      .filter((r): r is Row & { slug: string; title: string } => Boolean(r.slug && r.title))
      .map((r) => {
        const days = toNumber(r.day);
        const segment = segmentOf(r.duration, days);
        return {
          slug: r.slug,
          title: r.title,
          segment,
          path: packagePath(segment, r.slug),
          destination: r.destination?.trim() || undefined,
          price: toNumber(r.price),
          days,
          nights: Number.isFinite(Number(r.night)) && r.night !== null && r.night !== "" ? Number(r.night) : null,
          rating: toNumber(r.rating ?? null),
          image: r.heroimage?.image ? { src: r.heroimage.image, alt: r.heroimage.alt || r.title } : undefined,
        };
      });
  } catch (err) {
    console.error("[cms] published packages", err);
    return [];
  }
}

/** Packages that combine Braj with somewhere else, or start from a far city — not a match for a Mathura–Vrindavan signature tour. */
const NOT_SIGNATURE = /agra|taj|delhi|from|golden|ayodhya|kashi|varanasi|khatu|haridwar|premanand|chitrakoot|prayagraj|84/i;

/**
 * The published CMS package that corresponds to a signature tour of `days` days:
 * same length, Mathura + Vrindavan only, with the plainest (shortest) title winning.
 */
export function matchSignaturePackage(days: number, list: CmsPackage[]): CmsPackage | undefined {
  return list
    .filter((p) => p.days === days && /mathura/i.test(p.title) && /vrindavan/i.test(p.title) && !NOT_SIGNATURE.test(`${p.title} ${p.slug}`))
    .sort((a, b) => a.title.length - b.title.length)[0];
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
  /** Places on the trip, e.g. ["Mathura", "Vrindavan", "Agra"]. May be empty. */
  route: string[];
  destination?: string;
  /** Product page. */
  path?: string;
};

const PLACES: [RegExp, string][] = [
  [/84 kos/i, "Braj 84 Kos"],
  [/mathura/i, "Mathura"],
  [/vrindavan/i, "Vrindavan"],
  [/gokul/i, "Gokul"],
  [/govardhan/i, "Govardhan"],
  [/barsana/i, "Barsana"],
  [/nandgaon/i, "Nandgaon"],
  [/agra|taj mahal/i, "Agra"],
  [/delhi/i, "Delhi"],
  [/jaipur/i, "Jaipur"],
  [/ayodhya/i, "Ayodhya"],
  [/kashi/i, "Kashi"],
  [/varanasi/i, "Varanasi"],
  [/prayagraj/i, "Prayagraj"],
  [/chitrakoot/i, "Chitrakoot"],
  [/haridwar/i, "Haridwar"],
  [/rishikesh/i, "Rishikesh"],
  [/khatu/i, "Khatu Shyam"],
  [/salasar/i, "Salasar"],
  [/ajmer/i, "Ajmer"],
  [/pushkar/i, "Pushkar"],
];

/** Places a CMS title names, in the order the title names them ("…from Delhi" is the pickup, not a stop). */
function placesInTitle(title: string): string[] {
  const stops = title.replace(/\bfrom\b.*$/i, "");
  return PLACES.map(([re, name]) => ({ name, at: stops.search(re) }))
    .filter((p) => p.at >= 0)
    .sort((a, b) => a.at - b.at)
    .map((p) => p.name);
}

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
        durationLabel: durationLabel(p.days, p.nights),
        rating: p.rating ?? null,
        image: p.image,
        route: placesInTitle(p.title),
        destination: p.destination,
        path: p.path,
      }))
    : staticPackages.map((p) => ({
        slug: p.slug,
        title: p.title,
        price: p.price?.amount ?? null,
        days: p.days,
        durationLabel: p.duration,
        rating: null,
        image: { src: photos[p.image].src, alt: photos[p.image].alt },
        route: p.route,
        path: `/tour-packages/${p.slug}`,
      }));
  return list.sort((a, b) => (a.days ?? 99) - (b.days ?? 99) || (a.price ?? Infinity) - (b.price ?? Infinity) || a.title.localeCompare(b.title));
}

const BRAJ = /mathura|vrindavan|gokul|govardhan|barsana|nandgaon|braj|84 kos|premanand/i;

/**
 * Trips that actually reach Braj, without the "…from Bangalore / Chennai / Mumbai" copies of the same itinerary.
 * Falls back to the whole catalogue if that leaves nothing.
 */
export function brajCatalog(catalog: CatalogPackage[]): CatalogPackage[] {
  const core = catalog.filter((p) => BRAJ.test(p.title) && !/\bfrom\b/i.test(p.title));
  return core.length ? core : catalog;
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
