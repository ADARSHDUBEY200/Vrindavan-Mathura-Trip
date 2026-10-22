export function slugify(value: string): string {
  return value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 120);
}

export function uid(): string {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") return crypto.randomUUID();
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
}

export function titleCase(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .replace(/\s+/g, " ")
    .replace(/\b\p{L}/gu, (c) => c.toUpperCase());
}

/** Recursively drops "", null, undefined, empty arrays and empty objects. */
export function stripEmpty<T>(value: T): T | undefined {
  if (value === null || value === undefined) return undefined;
  if (typeof value === "string") return (value.trim() === "" ? undefined : value) as T | undefined;
  if (typeof value === "number") return (Number.isFinite(value) ? value : undefined) as T | undefined;
  if (Array.isArray(value)) {
    const items = value.map((v) => stripEmpty(v)).filter((v) => v !== undefined);
    return (items.length ? items : undefined) as T | undefined;
  }
  if (typeof value === "object") {
    const out: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(value as Record<string, unknown>)) {
      if (k === "id") continue; // an id alone does not make a row non-empty
      const cleaned = stripEmpty(v);
      if (cleaned !== undefined) out[k] = cleaned;
    }
    if (!Object.keys(out).length) return undefined;
    const id = (value as Record<string, unknown>).id;
    if (id !== undefined) out.id = id;
    return out as T;
  }
  return value;
}

/** True when an HTML string has no visible text (e.g. SunEditor's empty "<p><br></p>"). */
export function isBlankHtml(html: string | undefined | null): boolean {
  if (!html) return true;
  return html.replace(/<[^>]*>/g, "").replace(/&nbsp;/g, " ").trim() === "";
}

export function htmlTextLength(html: string | undefined | null): number {
  if (!html) return 0;
  return html.replace(/<[^>]*>/g, "").replace(/&nbsp;/g, " ").trim().length;
}

export function formatDate(iso: string | null | undefined): string {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
}

export const asString = (v: unknown): string => (v === null || v === undefined ? "" : String(v));
export const asArray = <T>(v: unknown): T[] => (Array.isArray(v) ? (v as T[]) : []);
export const asObject = <T extends object>(v: unknown, fallback: T): T =>
  v && typeof v === "object" && !Array.isArray(v) ? { ...fallback, ...(v as Partial<T>) } : fallback;

/** Ensures every row in a jsonb list has an id the editors can key on. */
export function withIds<T extends { id?: string }>(rows: unknown): (T & { id: string })[] {
  return asArray<T>(rows).map((r) => ({ ...r, id: r?.id || uid() }));
}
