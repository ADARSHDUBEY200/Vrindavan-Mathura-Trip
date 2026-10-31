import { asArray, asObject, asString, withIds } from "./utils";

/*
 * Temple URL rules and the shape of the Temple row's `details` column (see supabase-temples.sql).
 * Shared by the public pages, the admin editor and the seed script, so nothing here may import
 * server-only modules or image files.
 */

export const TEMPLES_PATH = "/temples";
export const templePath = (slug: string) => `${TEMPLES_PATH}/${slug}`;

export const TEMPLE_CATEGORIES = ["Radha Krishna Temple", "Goswami Temple", "Vishnu Temple", "Shiva Temple", "Modern Temple", "Sacred Grove", "Ghat & Kund", "Sacred Hill", "Pilgrimage Town"] as const;

export type GlanceRow = { id: string; label: string; value: string };
export type DarshanRow = { id: string; season: string; session: string; time: string; note: string };
export type AartiRow = { id: string; season: string; name: string; time: string };
export type FestivalRow = { id: string; name: string; when: string; highlight: string };
export type RouteRow = { id: string; from: string; distance: string; how: string };
export type NearbyRow = { id: string; name: string; distance: string; text: string; href: string };
export type GalleryItem = { id: string; image: string; alt: string; caption: string };
export type TipRow = { id: string; text: string };
export type StatRow = { id: string; value: string; label: string };
export type RelatedRow = { id: string; slug: string };
/** A section the editor adds to one temple's page. Each one can be moved, hidden or removed. */
export type CustomSection = { id: string; heading: string; html: string; image: string; alt: string };
export type TempleAddress = { street: string; locality: string; city: string; state: string; postalCode: string };

export type TempleDetails = {
  category: string;
  featured: boolean;
  /** Lower numbers come first on the archive; blank sorts after the numbered temples. */
  sortOrder: string;
  /** Short line on temple cards. */
  timingNote: string;
  stats: StatRow[];
  darshan: DarshanRow[];
  aarti: AartiRow[];
  visiting: GlanceRow[];
  significance: string;
  festivals: FestivalRow[];
  tips: TipRow[];
  goodToKnow: string;
  address: TempleAddress;
  mapUrl: string;
  mapQuery: string;
  latitude: string;
  longitude: string;
  routes: RouteRow[];
  gallery: GalleryItem[];
  nearby: NearbyRow[];
  related: RelatedRow[];
  sections: CustomSection[];
  /** Page order: block keys and `custom:<section id>`. */
  order: string[];
  /** Block keys switched off for this temple. */
  hidden: string[];
  updatedOn: string;
};

export const EMPTY_DETAILS: TempleDetails = {
  category: "",
  featured: false,
  sortOrder: "",
  timingNote: "",
  stats: [],
  darshan: [],
  aarti: [],
  visiting: [],
  significance: "",
  festivals: [],
  tips: [],
  goodToKnow: "",
  address: { street: "", locality: "", city: "", state: "Uttar Pradesh", postalCode: "" },
  mapUrl: "",
  mapQuery: "",
  latitude: "",
  longitude: "",
  routes: [],
  gallery: [],
  nearby: [],
  related: [],
  sections: [],
  order: [],
  hidden: [],
  updatedOn: "",
};

/** Tolerates rows saved before a field existed, and a missing column. */
export function toTempleDetails(raw: unknown): TempleDetails {
  const d = asObject<Record<string, unknown>>(raw, {});
  return {
    category: asString(d.category),
    featured: d.featured === true,
    sortOrder: asString(d.sortOrder),
    timingNote: asString(d.timingNote),
    stats: withIds<StatRow>(d.stats),
    darshan: withIds<DarshanRow>(d.darshan),
    aarti: withIds<AartiRow>(d.aarti),
    visiting: withIds<GlanceRow>(d.visiting),
    significance: asString(d.significance),
    festivals: withIds<FestivalRow>(d.festivals),
    tips: withIds<TipRow>(d.tips),
    goodToKnow: asString(d.goodToKnow),
    address: { ...EMPTY_DETAILS.address, ...asObject<Partial<TempleAddress>>(d.address, {}) },
    mapUrl: asString(d.mapUrl),
    mapQuery: asString(d.mapQuery),
    latitude: asString(d.latitude),
    longitude: asString(d.longitude),
    routes: withIds<RouteRow>(d.routes),
    gallery: withIds<GalleryItem>(d.gallery),
    nearby: withIds<NearbyRow>(d.nearby),
    related: withIds<RelatedRow>(d.related),
    sections: withIds<CustomSection>(d.sections),
    order: asArray<string>(d.order).filter((k) => typeof k === "string"),
    hidden: asArray<string>(d.hidden).filter((k) => typeof k === "string"),
    updatedOn: asString(d.updatedOn),
  };
}

/* ------------------------------------------------------------------ */
/* Page blocks                                                         */
/* ------------------------------------------------------------------ */

export const TEMPLE_BLOCKS = {
  quickAnswer: "Quick answer",
  glance: "At a glance",
  visitor: "Visitor guide (darshan, aarti, best time)",
  overview: "Temple overview",
  history: "History & significance",
  guide: "Complete guide",
  festivals: "Festivals",
  reach: "Address & how to reach",
  gallery: "Image gallery",
  tips: "Local tips",
  enquiry: "Enquiry form",
  nearby: "Nearby attractions & related temples",
  whyBook: "Why book with us",
  faqs: "FAQs",
} as const;

export type TempleBlock = keyof typeof TEMPLE_BLOCKS;

export const customKey = (id: string) => `custom:${id}`;

/** Saved order, without removed sections, plus anything new. New blocks land before the FAQs so they are not buried at the very end. */
export function resolveOrder(order: string[], customIds: string[]): string[] {
  const known = [...Object.keys(TEMPLE_BLOCKS), ...customIds.map(customKey)];
  const kept = order.filter((k) => known.includes(k));
  const out = [...kept];
  for (const key of known) {
    if (out.includes(key)) continue;
    const before = out.indexOf("faqs");
    if (before >= 0 && key !== "whyBook") out.splice(before, 0, key);
    else out.push(key);
  }
  return out;
}

/* ------------------------------------------------------------------ */
/* Validation (editor and API)                                         */
/* ------------------------------------------------------------------ */

const SLUG = /^[a-z0-9]+(-[a-z0-9]+)*$/;

const isHttpUrl = (value: string) => {
  try {
    return ["http:", "https:"].includes(new URL(value).protocol);
  } catch {
    return false;
  }
};

const isCoordinate = (value: string, max: number) => value === "" || (Number.isFinite(Number(value)) && Math.abs(Number(value)) <= max);

/** A link in the CMS: a path on this site, or a full web address. */
export const isSafeHref = (value: string) => value === "" || /^\/(?!\/)/.test(value) || isHttpUrl(value);

/** The rules every save must meet, whichever client sent it. Returns an error message or null. */
export function validateTempleRow(row: Record<string, unknown>): string | null {
  const status = row.status;
  if (status !== "draft" && status !== "published") return "Status must be draft or published";
  if (!asString(row.title).trim()) return "A title is required";
  if (!SLUG.test(asString(row.slug))) return "The slug may only use lowercase letters, numbers and single hyphens";

  const d = toTempleDetails(row.details);
  if (d.mapUrl && !isHttpUrl(d.mapUrl)) return "The Google Maps link must be a full web address";
  if (!isCoordinate(d.latitude, 90)) return "Latitude must be a number between -90 and 90";
  if (!isCoordinate(d.longitude, 180)) return "Longitude must be a number between -180 and 180";
  if (Boolean(d.latitude) !== Boolean(d.longitude)) return "Enter both latitude and longitude, or neither";
  if (d.gallery.some((g) => g.image && !g.alt.trim())) return "Every gallery image needs alt text";
  if (d.nearby.some((n) => !isSafeHref(n.href.trim()))) return "A nearby link must be a path like /temples/nidhivan or a full web address";

  if (status === "published") {
    if (!asString(row.location)) return "Choose a location";
    if (!asString(row.image)) return "Upload a temple image";
    if (!asString(row.alt).trim()) return "Add alt text for the image";
  }
  return null;
}
