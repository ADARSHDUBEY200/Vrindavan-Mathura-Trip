import "server-only";
import { cacheLife, cacheTag } from "next/cache";
import { LAST_UPDATED } from "@/config/site";
import { templesPage, TEMPLES_PAGE_SECTIONS, type TemplesPage } from "@/content/temples-page";
import { tourPackagesPage, type TourPackagesPage } from "@/content/tour-packages";
import { createPublicClient } from "@/lib/supabase/public";
import { SITE_PAGE_TABLE, TEMPLES_PAGE_SLUG, TOUR_PACKAGES_PAGE_SLUG } from "./config";

export const CMS_PAGES_TAG = "cms-pages";

const isPlain = (v: unknown): v is Record<string, unknown> => Boolean(v) && typeof v === "object" && !Array.isArray(v);

/** Saved values win; objects merge key by key, so a section added to the defaults later still appears. Arrays replace. */
export function mergeContent<T>(base: T, saved: unknown): T {
  if (!isPlain(base) || !isPlain(saved)) return saved === undefined || saved === null ? base : (saved as T);
  const out: Record<string, unknown> = { ...base };
  for (const [k, v] of Object.entries(saved)) out[k] = mergeContent(base[k], v);
  return out as T;
}

export type TourPackagesContent = TourPackagesPage & { updatedOn: string };

/**
 * /tour-packages copy: the published SitePage row over the PDF defaults in content/tour-packages.ts.
 * Falls back to the defaults alone when no row is published or the table does not exist yet.
 */
export async function getTourPackagesContent(): Promise<TourPackagesContent> {
  "use cache";
  cacheLife("hours");
  cacheTag(CMS_PAGES_TAG);

  const defaults = { ...tourPackagesPage, updatedOn: LAST_UPDATED };
  const supabase = createPublicClient();
  if (!supabase) return defaults;
  try {
    const { data, error } = await supabase.from(SITE_PAGE_TABLE).select("content,updated_at").eq("slug", TOUR_PACKAGES_PAGE_SLUG).eq("status", "published").maybeSingle();
    if (error || !data?.content) return defaults;
    return { ...mergeContent(tourPackagesPage, data.content), updatedOn: String(data.updated_at ?? LAST_UPDATED).slice(0, 10) };
  } catch (err) {
    console.error("[cms] tour packages page", err);
    return defaults;
  }
}

export type TemplesPageContent = TemplesPage & { updatedOn: string };

/** Saved order, plus any section added to the page since it was saved. */
const sectionOrder = (order: string[]) => {
  const known = Object.keys(TEMPLES_PAGE_SECTIONS);
  return [...order.filter((k) => known.includes(k)), ...known.filter((k) => !order.includes(k))];
};

/** /temples copy: the published SitePage row over the PDF defaults in content/temples-page.ts. */
export async function getTemplesPageContent(): Promise<TemplesPageContent> {
  "use cache";
  cacheLife("hours");
  cacheTag(CMS_PAGES_TAG);

  const defaults = { ...templesPage, updatedOn: LAST_UPDATED };
  const supabase = createPublicClient();
  if (!supabase) return defaults;
  try {
    const { data, error } = await supabase.from(SITE_PAGE_TABLE).select("content,updated_at").eq("slug", TEMPLES_PAGE_SLUG).eq("status", "published").maybeSingle();
    if (error || !data?.content) return defaults;
    const merged = mergeContent(templesPage, data.content);
    return { ...merged, order: sectionOrder(merged.order), updatedOn: String(data.updated_at ?? LAST_UPDATED).slice(0, 10) };
  } catch (err) {
    console.error("[cms] temples page", err);
    return defaults;
  }
}
