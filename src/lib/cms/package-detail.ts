import "server-only";
import { cacheLife, cacheTag } from "next/cache";
import { site } from "@/config/site";
import type { Faq } from "@/content/types";
import { createPublicClient } from "@/lib/supabase/public";
import { prepareArticleHtml } from "./article-html";
import { TABLES } from "./config";
import { durationLabel, packagePath, segmentOf } from "./package-fields";
import { CMS_PACKAGES_TAG } from "./packages";
import { isBlankHtml } from "./utils";

export type PackageImage = { src: string; alt: string };
export type ItineraryActivity = { time: string; text: string };
export type PackageDay = { day: number; title: string; tag: string; html: string; activities: ItineraryActivity[] };
export type PackageReview = { name: string; text: string; rating: number | null };
export type PackageTiming = { temple: string; morningOpens: string; afternoonCloses: string; eveningOpens: string; entry?: string };
export type SeniorRow = { location: string; stepsWalking: string; seniorExperience: string; emiApproach: string };
export type ReachRow = { city: string; mode: string; travelTime: string; service: string };
export type GroundTruthBlock = { heading: string; points: string[] };
export type Recommendation = { condition: string; recommendation: string; linkLabel: string; linkHref: string };

export type PackageDetail = {
  slug: string;
  title: string;
  category: string;
  destination: string;
  price: number | null;
  days: number | null;
  nights: number | null;
  durationLabel: string | null;
  segment: string;
  path: string;
  rating: number | null;
  reviews: number | null;
  metaTitle: string;
  metaDescription: string;
  schemaTitle: string;
  schemaDescription: string;
  heroBadge: string;
  hero: PackageImage | null;
  gallery: PackageImage[];
  quickAnswer: string;
  overview: string;
  highlights: string[];
  inclusions: string[];
  exclusions: string[];
  notes: string[];
  itinerary: PackageDay[];
  stops: { label: string; place: string }[];
  route: { source: string; destination: string; stops: string[] };
  includes: { transfer: boolean; stay: boolean; breakfast: boolean; sightseeing: boolean };
  sources: string[];
  faqs: Faq[];
  testimonials: PackageReview[];
  policies: { title: string; text: string }[];
  groupPricing: { size: string; price: number }[];
  timings: { title: string; note: string; rows: PackageTiming[] };
  senior: { note: string; rows: SeniorRow[] };
  howToReach: ReachRow[];
  groundTruth: GroundTruthBlock[];
  recommendations: Recommendation[];
  video: { id: string; minutes: number | null; uploadDate: string; title: string } | null;
  guideBio: string;
};

type Json = Record<string, unknown>;

/**
 * The Package table is shared with the operator's other brand, so its rows can't be edited for this site.
 * These are swapped at read time: another brand's name in this site's policies, and its "30% OFF" campaign
 * in search titles, must never reach the public page.
 */
const FOREIGN_BRANDS = /experience\s+my\s+india|vrindavan\s+mathura\s+guide/gi;
const FOREIGN_OFFER = /\s*\|\s*\d+%\s*off\b/gi;

function rebrand<T>(value: T): T {
  if (typeof value === "string") return value.replace(FOREIGN_BRANDS, site.name) as T;
  if (Array.isArray(value)) return value.map(rebrand) as T;
  if (value && typeof value === "object") {
    // `image` values are storage URLs: file names must stay exactly as uploaded.
    return Object.fromEntries(Object.entries(value).map(([k, v]) => [k, k === "image" ? v : rebrand(v)])) as T;
  }
  return value;
}

const str = (v: unknown) => (typeof v === "string" ? v.trim() : typeof v === "number" ? String(v) : "");
const list = (v: unknown): Json[] => (Array.isArray(v) ? v.filter((x): x is Json => Boolean(x) && typeof x === "object") : []);
const obj = (v: unknown): Json => (v && typeof v === "object" && !Array.isArray(v) ? (v as Json) : {});
const texts = (v: unknown) =>
  list(v)
    .map((x) => str(x.description))
    .filter(Boolean);

function count(v: unknown): number | null {
  const n = Number(String(v ?? "").replace(/[^\d.]/g, ""));
  return Number.isFinite(n) && n > 0 ? n : null;
}

const rows = <T extends object>(v: unknown, keys: (keyof T & string)[]): T[] =>
  list(v)
    .map((r) => Object.fromEntries(keys.map((k) => [k, str(r[k])])) as T)
    .filter((r) => Object.values(r).some(Boolean));

function toDays(value: unknown): PackageDay[] {
  // Every day's HTML shares one id pool, so a heading repeated across days keeps a unique anchor.
  const used: string[] = [];
  return list(value).map((d, i) => {
    const prepared = isBlankHtml(str(d.description)) ? { html: "", headings: [] } : prepareArticleHtml(str(d.description), used);
    used.push(...prepared.headings.map((h) => h.id));
    return {
      day: count(d.day) ?? i + 1,
      title: str(d.title),
      tag: str(d.tag),
      html: prepared.html,
      activities: list(d.activities)
        .map((a) => ({ time: str(a.time), text: str(a.text) }))
        .filter((a) => a.text),
    };
  });
}

function toDetail(raw: Json & { slug: string; title: string }): PackageDetail {
  const r = rebrand(raw);
  const seo = obj(r.seoContent);
  const meta = obj(r.meta);
  const schema = obj(r.schema);
  const hero = obj(r.heroimage);
  const route = obj(r.destroutes);
  const groups = obj(seo.groupPricing);
  const days = count(r.day);
  const nightsValue = Number(r.night);
  const nights = r.night !== null && r.night !== "" && Number.isFinite(nightsValue) ? nightsValue : null;
  const segment = segmentOf(str(r.duration), days);
  const metaDescription = str(meta.description);

  const stops = list(route.segments)
    .map((s) => str(s.to))
    .filter(Boolean);
  const destination = str(route.destination);

  return {
    slug: r.slug,
    title: r.title,
    category: str(r.category),
    destination: str(r.destination),
    price: count(r.price),
    days,
    nights,
    durationLabel: durationLabel(days, nights),
    segment,
    path: packagePath(segment, r.slug),
    rating: count(r.rating),
    reviews: count(r.reviews),
    metaTitle: str(meta.title).replace(FOREIGN_OFFER, "") || r.title,
    metaDescription: metaDescription || r.title,
    schemaTitle: str(schema.title).replace(FOREIGN_OFFER, "") || r.title,
    schemaDescription: str(schema.description) || metaDescription || r.title,
    heroBadge: str(seo.heroBadge),
    hero: str(hero.image) ? { src: str(hero.image), alt: str(hero.alt) || r.title } : null,
    gallery: list(r.childImage)
      .filter((c) => str(c.image))
      .map((c) => ({ src: str(c.image), alt: str(c.alt) || r.title })),
    quickAnswer: isBlankHtml(str(seo.shortDescription)) ? "" : prepareArticleHtml(str(seo.shortDescription)).html,
    overview: isBlankHtml(str(r.overview)) ? "" : prepareArticleHtml(str(r.overview)).html,
    highlights: texts(r.highlights),
    inclusions: texts(r.inclusions),
    exclusions: texts(r.exclusions),
    notes: texts(r.documents),
    itinerary: toDays(r.itinerary),
    stops: list(r.durationbreakdown)
      .map((d) => ({ label: str(d.days), place: str(d.place) }))
      .filter((d) => d.place),
    route: {
      source: str(route.source),
      destination,
      // The last leg ends at the destination, which the route card shows as "Final arrival".
      stops: stops.at(-1) === destination ? stops.slice(0, -1) : stops,
    },
    includes: { transfer: Boolean(r.transfer_included), stay: Boolean(r.stay_included), breakfast: Boolean(r.breakfast_included), sightseeing: Boolean(r.sightseeing_included) },
    sources: Array.isArray(r.available_src) ? r.available_src.filter((s): s is string => typeof s === "string") : [],
    faqs: list(r.faqs)
      .map((f) => ({ q: str(f.question), a: str(f.answer) }))
      .filter((f) => f.q && f.a),
    testimonials: list(r.testimonials)
      .map((t) => ({ name: str(t.name), text: str(t.description), rating: count(t.rating) }))
      .filter((t) => t.name && t.text),
    policies: list(r.policies)
      .map((p) => ({ title: str(p.title), text: str(p.description) }))
      .filter((p) => p.title && p.text),
    groupPricing: (["group2", "group4", "group6"] as const).flatMap((k) => {
      const price = count(groups[k]);
      return price ? [{ size: k.slice(5), price }] : [];
    }),
    timings: { title: str(seo.templeTitle), note: str(seo.templeNote), rows: rows<PackageTiming>(seo.templeTimings, ["temple", "morningOpens", "afternoonCloses", "eveningOpens", "entry"]) },
    senior: { note: str(seo.seniorNote), rows: rows<SeniorRow>(seo.seniorGuide, ["location", "stepsWalking", "seniorExperience", "emiApproach"]) },
    howToReach: rows<ReachRow>(seo.howToReach, ["city", "mode", "travelTime", "service"]),
    groundTruth: list(seo.groundTruth)
      .map((g) => ({ heading: str(g.heading), points: Array.isArray(g.points) ? g.points.map(str).filter(Boolean) : [] }))
      .filter((g) => g.points.length),
    recommendations: rows<Recommendation>(seo.recommendations, ["condition", "recommendation", "linkLabel", "linkHref"]),
    video: str(seo.videoId) ? { id: str(seo.videoId), minutes: count(seo.videoDuration), uploadDate: str(seo.videoUploadDate), title: str(seo.videoOverlayTitle) } : null,
    guideBio: str(seo.guideBio),
  };
}

/** One published package by slug, or `null`. */
export async function getPublishedPackage(slug: string): Promise<PackageDetail | null> {
  "use cache";
  cacheLife("hours");
  cacheTag(CMS_PACKAGES_TAG);

  const supabase = createPublicClient();
  if (!supabase) return null;
  try {
    const { data, error } = await supabase.from(TABLES.Package).select("*").eq("slug", slug).eq("status", "published").maybeSingle();
    if (error) console.error("[cms] package", slug, error.message);
    const row = data as (Json & { slug: string | null; title: string | null }) | null;
    if (!row?.slug || !row.title) return null;
    return toDetail(row as Json & { slug: string; title: string });
  } catch (err) {
    console.error("[cms] package", slug, err);
    return null;
  }
}
