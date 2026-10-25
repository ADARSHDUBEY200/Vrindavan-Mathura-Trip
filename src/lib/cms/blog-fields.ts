/**
 * Shape of the Blog row's `seoContent` jsonb, shared by the admin editor and the public pages.
 * Every key is optional: rows saved before a field existed simply omit it, and empty values
 * are stripped on save (see BlogForm `toRow`).
 */
export type BlogSeoContent = {
  /* Hero & listing */
  /** Place the article is about, shown next to the category (e.g. "Mathura"). */
  location?: string;
  /** ISO date (YYYY-MM-DD) the article was last reviewed. Falls back to the publish date. */
  updatedOn?: string;
  /** Overrides the computed reading time (minutes). */
  readMinutes?: number;
  /** Computed from the content on every save, so /blogs cards never need the article HTML. */
  readMinutesAuto?: number;
  /** Pinned as the large lead story on /blogs. */
  featured?: boolean;

  /* Author */
  authorRole?: string;
  authorImage?: string;
  /** Shown in the author box and the "Meet your guide" section. */
  guideBio?: string;

  /* Summary blocks above the body */
  quickAnswer?: string; // HTML
  quickFacts?: { id?: string; label: string; value: string }[];
  keyTakeaways?: { id?: string; text: string }[];
  /** "A word from your guide" — personal note before the body. */
  guideIntro?: string;

  /* Callouts after the body */
  /** "The honest bit" — limits, caveats, what to skip. */
  honestNote?: string;
  /** Closing tip from the guide. */
  guideTip?: string;
  relatedLinks?: { id?: string; label: string; href: string }[];
  cta?: { title?: string; text?: string };

  /* Video */
  videoSrc?: string;
  videoDuration?: number | string;
  videoTitle?: string;
  videoOverlayTitle?: string;
  videoTestimonials?: { id?: string; title: string; url: string; city?: string }[];

  /* Social proof & planning */
  recommendations?: { id?: string; situation: string; recommendation: string; packageName?: string; packageLink?: string }[];
  reviews?: { name: string; city?: string; date?: string; rating?: number; text: string; packageName?: string; packageLink?: string }[];
  totalRating?: number;
  totalReviews?: number;
  pilgrimsServed?: string;
  templeTimings?: { title?: string; note?: string; htmlContent?: string };
};

/** YouTube video id from a watch, embed, shorts or youtu.be URL (or a bare id). */
export function youtubeId(url: string | undefined | null): string | null {
  if (!url) return null;
  const value = url.trim();
  if (/^[\w-]{11}$/.test(value)) return value;
  const match = value.match(/(?:youtube(?:-nocookie)?\.com\/(?:embed\/|shorts\/|live\/|watch\?(?:.*&)?v=|v\/)|youtu\.be\/)([\w-]{11})/i);
  return match ? match[1] : null;
}

export const youtubeEmbedUrl = (id: string) => `https://www.youtube-nocookie.com/embed/${id}?rel=0`;
export const youtubeWatchUrl = (id: string) => `https://www.youtube.com/watch?v=${id}`;
export const youtubeThumbUrl = (id: string) => `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;

/** Plain text of an HTML string. */
export function htmlToText(html: string | undefined | null): string {
  if (!html) return "";
  return decodeEntities(html.replace(/<(script|style)\b[\s\S]*?<\/\1>/gi, " ").replace(/<[^>]*>/g, " "))
    .replace(/\s+/g, " ")
    .trim();
}

export function decodeEntities(text: string): string {
  return text
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#0?39;|&apos;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(Number(n)));
}

/** "23 October 2026" (or "Oct 2026" with `short`). Plain dates are read as calendar days; timestamps in IST. */
export function formatBlogDate(iso: string, short = false): string {
  const dateOnly = /^\d{4}-\d{2}-\d{2}$/.test(iso);
  const date = new Date(dateOnly ? `${iso}T00:00:00Z` : iso);
  if (Number.isNaN(date.getTime())) return "";
  return new Intl.DateTimeFormat("en-IN", {
    ...(short ? { month: "short", year: "numeric" } : { day: "numeric", month: "long", year: "numeric" }),
    timeZone: dateOnly ? "UTC" : "Asia/Kolkata",
  }).format(date);
}

/** Reading time at ~200 words per minute, never less than 1. */
export function readingMinutes(html: string | undefined | null): number {
  const words = htmlToText(html).split(" ").filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}
