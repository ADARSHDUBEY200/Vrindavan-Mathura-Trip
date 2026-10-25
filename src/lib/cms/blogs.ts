import "server-only";
import { cacheLife, cacheTag } from "next/cache";
import type { Faq } from "@/content/types";
import { createPublicClient } from "@/lib/supabase/public";
import { htmlToText, readingMinutes, type BlogSeoContent } from "./blog-fields";
import { TABLES } from "./config";
import { slugify } from "./utils";

export const CMS_BLOGS_TAG = "cms-blogs";
export const BLOGS_PATH = "/blogs";
export const BLOGS_PER_PAGE = 9;

export type BlogImage = { src: string; alt: string };

/** What a blog card needs. */
export type BlogSummary = {
  slug: string;
  title: string;
  category: string;
  categorySlug: string;
  author: string;
  excerpt: string;
  image?: BlogImage;
  /** ISO timestamp of the first save. */
  publishedAt: string;
  /** ISO date (YYYY-MM-DD), or the publish date when not set. */
  updatedOn: string;
  /** `null` on cards for posts saved before reading time was stored (the article page always computes it). */
  readMinutes: number | null;
  featured: boolean;
  location?: string;
};

export type BlogPost = Omit<BlogSummary, "readMinutes"> & {
  readMinutes: number;
  metaTitle: string;
  metaDescription: string;
  schemaTitle: string;
  schemaDescription: string;
  /** Raw CMS HTML — run through prepareArticleHtml before rendering. */
  content: string;
  faqs: Faq[];
  seo: BlogSeoContent;
};

/** Card fields only. The article HTML and the full seoContent are megabytes across hundreds of posts, so the
 *  listing reads just four small keys out of the jsonb with PostgREST JSON paths. */
const SUMMARY_COLUMNS = [
  "created_at,title,category,slug,author,image,alt,subcontent,meta",
  "location:seoContent->>location",
  "updatedOn:seoContent->>updatedOn",
  "readMinutes:seoContent->>readMinutes",
  "readMinutesAuto:seoContent->>readMinutesAuto",
  "featured:seoContent->featured",
].join(",");

type SummaryRow = {
  created_at: string;
  title: string | null;
  category: string | null;
  slug: string | null;
  author: string | null;
  image: string | null;
  alt: string | null;
  subcontent: string | null;
  meta?: { title?: string; description?: string } | null;
  location?: string | null;
  updatedOn?: string | null;
  readMinutes?: string | number | null;
  readMinutesAuto?: string | number | null;
  featured?: boolean | null;
};

type FullRow = Omit<SummaryRow, "location" | "updatedOn" | "readMinutes" | "readMinutesAuto" | "featured"> & {
  content: string | null;
  schema?: { title?: string; description?: string } | null;
  faqs?: { question?: string; answer?: string }[] | null;
  seoContent?: BlogSeoContent | null;
};

const str = (v: unknown) => (typeof v === "string" ? v.trim() : "");
const isoDate = (v: unknown) => (typeof v === "string" && /^\d{4}-\d{2}-\d{2}/.test(v) ? v.slice(0, 10) : "");
const minutes = (v: unknown) => {
  const n = Number(v);
  return v !== null && v !== "" && Number.isFinite(n) && n > 0 ? Math.round(n) : null;
};

function excerptOf(r: SummaryRow, content?: string | null): string {
  const text = str(r.subcontent) || str(r.meta?.description) || htmlToText(content);
  return text.length > 220 ? `${text.slice(0, 217).replace(/\s+\S*$/, "")}…` : text;
}

function toSummary(r: SummaryRow & { slug: string; title: string }, content?: string | null): BlogSummary {
  const category = str(r.category) || "Travel Guides";
  return {
    slug: r.slug,
    title: r.title,
    category,
    categorySlug: slugify(category),
    author: str(r.author),
    excerpt: excerptOf(r, content),
    image: r.image ? { src: r.image, alt: str(r.alt) || r.title } : undefined,
    publishedAt: r.created_at,
    updatedOn: isoDate(r.updatedOn) || r.created_at.slice(0, 10),
    readMinutes: minutes(r.readMinutes) ?? minutes(r.readMinutesAuto),
    featured: r.featured === true,
    location: str(r.location) || undefined,
  };
}

const hasKeys = <R extends { slug: string | null; title: string | null }>(r: R): r is R & { slug: string; title: string } => Boolean(r.slug && r.title);

/** Published blogs, newest first. `[]` when Supabase is not configured or unreachable. */
export async function getPublishedBlogs(): Promise<BlogSummary[]> {
  "use cache";
  cacheLife("hours");
  cacheTag(CMS_BLOGS_TAG);

  const supabase = createPublicClient();
  if (!supabase) return [];
  try {
    const { data, error } = await supabase.from(TABLES.Blog).select(SUMMARY_COLUMNS).eq("status", "published").order("created_at", { ascending: false });
    if (error || !data) {
      console.error("[cms] published blogs", error?.message);
      return [];
    }
    return (data as unknown as SummaryRow[]).filter(hasKeys).map((r) => toSummary(r));
  } catch (err) {
    console.error("[cms] published blogs", err);
    return [];
  }
}

/** One published blog by slug, or `null`. */
export async function getPublishedBlog(slug: string): Promise<BlogPost | null> {
  "use cache";
  cacheLife("hours");
  cacheTag(CMS_BLOGS_TAG);

  const supabase = createPublicClient();
  if (!supabase) return null;
  try {
    const { data, error } = await supabase.from(TABLES.Blog).select("*").eq("slug", slug).eq("status", "published").maybeSingle();
    if (error) console.error("[cms] blog", slug, error.message);
    const row = data as FullRow | null;
    if (!row || !hasKeys(row)) return null;
    const seo = row.seoContent ?? {};
    const summary = toSummary({ ...row, location: seo.location, updatedOn: seo.updatedOn, readMinutes: seo.readMinutes, featured: seo.featured }, row.content);
    return {
      ...summary,
      readMinutes: summary.readMinutes ?? readingMinutes(row.content),
      metaTitle: str(row.meta?.title) || row.title,
      metaDescription: str(row.meta?.description) || summary.excerpt,
      schemaTitle: str(row.schema?.title) || row.title,
      schemaDescription: str(row.schema?.description) || str(row.meta?.description) || summary.excerpt,
      content: row.content ?? "",
      faqs: (Array.isArray(row.faqs) ? row.faqs : []).map((f) => ({ q: str(f?.question), a: str(f?.answer) })).filter((f) => f.q && f.a),
      seo: row.seoContent ?? {},
    };
  } catch (err) {
    console.error("[cms] blog", slug, err);
    return null;
  }
}

/** Categories that have at least one published blog, in the CMS's own order, then any others. */
export function blogCategories(blogs: BlogSummary[], order: readonly string[]): { name: string; slug: string; count: number }[] {
  const counts = new Map<string, number>();
  for (const b of blogs) counts.set(b.category, (counts.get(b.category) ?? 0) + 1);
  const names = [...order.filter((c) => counts.has(c)), ...[...counts.keys()].filter((c) => !order.includes(c)).sort()];
  return names.map((name) => ({ name, slug: slugify(name), count: counts.get(name) ?? 0 }));
}

/** Same-category posts first, then the newest others. */
export function relatedBlogs(all: BlogSummary[], current: BlogSummary, limit = 3): BlogSummary[] {
  const others = all.filter((b) => b.slug !== current.slug);
  const same = others.filter((b) => b.category === current.category);
  return [...same, ...others.filter((b) => b.category !== current.category)].slice(0, limit);
}

export const blogPath = (slug: string) => `${BLOGS_PATH}/${slug}`;
