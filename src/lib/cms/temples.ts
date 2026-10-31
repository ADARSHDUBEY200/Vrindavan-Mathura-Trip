import "server-only";
import { cacheLife, cacheTag } from "next/cache";
import type { StaticImageData } from "next/image";
import { createPublicClient } from "@/lib/supabase/public";
import { prepareArticleHtml, type ArticleHeading } from "./article-html";
import { TABLES } from "./config";
import { defaultTempleRows, type TempleRow } from "./temple-defaults";
import { customKey, resolveOrder, templePath, toTempleDetails, type AartiRow, type CustomSection, type DarshanRow, type FestivalRow, type GalleryItem, type GlanceRow, type NearbyRow, type RouteRow, type StatRow, type TempleDetails } from "./temple-fields";
import { hasTempleImage, templeImageSrc, templeImageUrl } from "./temple-image";
import { asObject, asString, isBlankHtml, withIds } from "./utils";

export const CMS_TEMPLES_TAG = "cms-temples";

export type TemplePicture = { src: string | StaticImageData; url: string; alt: string };

/** What a temple card and the archive need. */
export type TempleCardData = {
  slug: string;
  name: string;
  town: string;
  category: string;
  summary: string;
  timingNote: string;
  path: string;
  featured: boolean;
  image?: TemplePicture;
};

type Row = Partial<Omit<TempleRow, "details">> & { details?: unknown; created_at?: string };

const LIST_COLUMNS = "slug,title,location,subcontent,image,alt,details,created_at";

const picture = (value: unknown, alt: string): TemplePicture | undefined => {
  const image = asString(value);
  return hasTempleImage(image) ? { src: templeImageSrc(image), url: templeImageUrl(image), alt } : undefined;
};

function toCard(r: Row): TempleCardData {
  const d = toTempleDetails(r.details);
  const name = asString(r.title);
  return {
    slug: asString(r.slug),
    name,
    town: asString(r.location),
    category: d.category,
    summary: asString(r.subcontent),
    timingNote: d.timingNote,
    path: templePath(asString(r.slug)),
    featured: d.featured,
    image: picture(r.image, asString(r.alt) || name),
  };
}

/** Featured first, then the editor's sort number, then newest. */
function sortRows(rows: Row[]): Row[] {
  const rank = (r: Row) => {
    const d = toTempleDetails(r.details);
    const n = Number(d.sortOrder);
    return { featured: d.featured ? 0 : 1, sort: d.sortOrder !== "" && Number.isFinite(n) ? n : Infinity, created: asString(r.created_at) };
  };
  return [...rows].sort((a, b) => {
    const x = rank(a);
    const y = rank(b);
    return x.featured - y.featured || (x.sort === y.sort ? 0 : x.sort - y.sort) || y.created.localeCompare(x.created);
  });
}

/**
 * Published temples, or the built-in guides while the table has none (or cannot be reached), so the archive is
 * never blank and links across the site keep working. Once one temple is published the table is the only source,
 * which is what makes Draft and Delete hide a temple for real.
 */
export async function getPublishedTemples(): Promise<TempleCardData[]> {
  "use cache";
  cacheLife("hours");
  cacheTag(CMS_TEMPLES_TAG);

  const fallback = () => sortRows(defaultTempleRows()).map(toCard);
  const supabase = createPublicClient();
  if (!supabase) return fallback();
  try {
    const { data, error } = await supabase.from(TABLES.Temple).select(LIST_COLUMNS).eq("status", "published");
    if (error) {
      console.error("[cms] published temples", error.message);
      return fallback();
    }
    const rows = ((data ?? []) as Row[]).filter((r) => r.slug && r.title);
    return rows.length ? sortRows(rows).map(toCard) : fallback();
  } catch (err) {
    console.error("[cms] published temples", err);
    return fallback();
  }
}

export type TempleView = TempleCardData & {
  metaTitle: string;
  metaDescription: string;
  schemaTitle: string;
  schemaDescription: string;
  quickAnswer: string;
  overview: string;
  history: string[];
  significance: string;
  guide: { html: string; headings: ArticleHeading[] };
  timingNotes: string;
  bestVisit: string;
  journey: string;
  glance: GlanceRow[];
  stats: StatRow[];
  darshan: DarshanRow[];
  aarti: AartiRow[];
  visiting: GlanceRow[];
  festivals: FestivalRow[];
  tips: string[];
  goodToKnow: string;
  address: TempleDetails["address"];
  addressLine: string;
  mapUrl: string;
  mapEmbed: string;
  geo?: { latitude: number; longitude: number };
  routes: RouteRow[];
  gallery: (GalleryItem & { picture: TemplePicture })[];
  nearby: NearbyRow[];
  related: string[];
  sections: (CustomSection & { body: string; picture?: TemplePicture })[];
  /** Block keys and `custom:<id>` of everything that renders, in page order. */
  blocks: string[];
  whyBook: { heading: string; intro: string; rows: { id: string; reason: string; detail: string }[]; outro: string };
  faqs: { q: string; a: string }[];
  updatedOn: string;
};

const clean = (html: unknown) => (isBlankHtml(asString(html)) ? "" : prepareArticleHtml(asString(html)).html);

function toView(r: Row): TempleView {
  const d = toTempleDetails(r.details);
  const card = toCard(r);
  const meta = asObject<{ title?: string; description?: string }>(r.meta, {});
  const schema = asObject<{ title?: string; description?: string }>(r.schema, {});
  const why = asObject<{ heading?: string; intro?: string; rows?: unknown; outro?: string }>(r.whybook, {});

  const addressLine = [d.address.street, d.address.locality, d.address.city, d.address.state, d.address.postalCode].map((s) => s.trim()).filter((s, i, all) => s && all.indexOf(s) === i).join(", ");
  const latitude = Number(d.latitude);
  const longitude = Number(d.longitude);
  const geo = d.latitude && d.longitude && Number.isFinite(latitude) && Number.isFinite(longitude) ? { latitude, longitude } : undefined;
  const query = geo ? `${geo.latitude},${geo.longitude}` : d.mapQuery.trim() || `${card.name}, ${card.town}`;

  const view: TempleView = {
    ...card,
    metaTitle: meta.title?.trim() || `${card.name}, ${card.town}: Timings & Guide`,
    metaDescription: meta.description?.trim() || card.summary,
    schemaTitle: schema.title?.trim() || card.name,
    schemaDescription: schema.description?.trim() || card.summary,
    quickAnswer: clean(r.quickanswer),
    overview: clean(r.templeoverview),
    history: asString(r.history)
      .split(/\n{2,}/)
      .map((p) => p.trim())
      .filter(Boolean),
    significance: clean(d.significance),
    guide: isBlankHtml(asString(r.content)) ? { html: "", headings: [] } : prepareArticleHtml(asString(r.content)),
    timingNotes: clean(r.timing),
    bestVisit: clean(r.bestvisit),
    journey: clean(r.journey),
    glance: withIds<GlanceRow>(r.ataglance),
    stats: d.stats,
    darshan: d.darshan,
    aarti: d.aarti,
    visiting: d.visiting,
    festivals: d.festivals,
    tips: d.tips.map((t) => t.text).filter(Boolean),
    goodToKnow: d.goodToKnow,
    address: d.address,
    addressLine,
    mapUrl: d.mapUrl || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`,
    mapEmbed: `https://www.google.com/maps?q=${encodeURIComponent(query)}&output=embed`,
    geo,
    routes: d.routes,
    gallery: d.gallery.flatMap((g) => {
      const pic = picture(g.image, g.alt);
      return pic ? [{ ...g, picture: pic }] : [];
    }),
    nearby: d.nearby,
    related: d.related.map((x) => x.slug).filter(Boolean),
    sections: d.sections.map((s) => ({ ...s, body: clean(s.html), picture: picture(s.image, s.alt) })),
    blocks: [],
    whyBook: { heading: asString(why.heading), intro: asString(why.intro), rows: withIds<{ id: string; reason: string; detail: string }>(why.rows), outro: asString(why.outro) },
    faqs: withIds<{ id: string; question: string; answer: string }>(r.faqs).map((f) => ({ q: f.question, a: f.answer })),
    updatedOn: d.updatedOn,
  };

  const hasContent: Record<string, boolean> = {
    quickAnswer: Boolean(view.quickAnswer),
    glance: view.glance.length > 0,
    visitor: view.darshan.length > 0 || view.aarti.length > 0 || Boolean(view.timingNotes || view.bestVisit) || view.visiting.length > 0,
    overview: Boolean(view.overview),
    history: view.history.length > 0 || Boolean(view.significance),
    guide: Boolean(view.guide.html),
    festivals: view.festivals.length > 0,
    reach: true,
    gallery: view.gallery.length > 0,
    tips: view.tips.length > 0 || Boolean(view.goodToKnow),
    enquiry: true,
    nearby: view.nearby.length > 0 || view.related.length > 0,
    whyBook: view.whyBook.rows.length > 0,
    faqs: view.faqs.length > 0,
    ...Object.fromEntries(view.sections.map((s) => [customKey(s.id), Boolean(s.heading.trim() || s.body || s.picture)])),
  };
  view.blocks = resolveOrder(
    d.order,
    d.sections.map((s) => s.id),
  ).filter((key) => hasContent[key] && !d.hidden.includes(key));
  return view;
}

/** One published temple, or `null`. A draft row is invisible here: RLS and the status filter both exclude it. */
export async function getPublishedTemple(slug: string): Promise<TempleView | null> {
  "use cache";
  cacheLife("hours");
  cacheTag(CMS_TEMPLES_TAG);

  const builtIn = () => {
    const row = defaultTempleRows().find((r) => r.slug === slug);
    return row ? toView(row) : null;
  };
  const supabase = createPublicClient();
  if (!supabase) return builtIn();
  try {
    const { data, error } = await supabase.from(TABLES.Temple).select("*").eq("slug", slug).eq("status", "published").maybeSingle();
    if (data && !error) return toView(data as Row);
    // A published list means the table is the source of truth, so a slug missing from it is really gone.
    const { count, error: countError } = await supabase.from(TABLES.Temple).select("id", { count: "exact", head: true }).eq("status", "published");
    if (error) console.error("[cms] published temple", slug, error.message);
    return !error && !countError && count ? null : builtIn();
  } catch (err) {
    console.error("[cms] published temple", slug, err);
    return builtIn();
  }
}

/** Cards for the temples a page links to, in the editor's order. Slugs that are not published are skipped. */
export function pickTemples(all: TempleCardData[], slugs: string[]): TempleCardData[] {
  return slugs.flatMap((slug) => all.find((t) => t.slug === slug) ?? []);
}
