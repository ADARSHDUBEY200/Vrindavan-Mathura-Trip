/** Package URL rules, shared by the public pages and the admin editor (no server-only imports). */

export const PACKAGES_PATH = "/tour-packages";

const WORDS = ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen"];

/** 1 → "one-day", 5 → "five-days". This is the first URL segment of a package page. */
export function durationSegment(days: number): string {
  const word = WORDS[days - 1] ?? String(days);
  return days === 1 ? `${word}-day` : `${word}-days`;
}

export const isDurationSegment = (value: string) => /^[a-z0-9]+-days?$/.test(value);

/** The row's own `duration` when it is already a URL segment, otherwise one built from its day count. */
export function segmentOf(duration: string | null | undefined, days: number | null | undefined): string {
  const value = (duration ?? "").trim();
  if (isDurationSegment(value)) return value;
  return days && days > 0 ? durationSegment(days) : "custom-days";
}

export const packagePath = (segment: string, slug: string) => `${PACKAGES_PATH}/${segment}/${slug}`;

const plural = (n: number, word: string) => `${n} ${word}${n === 1 ? "" : "s"}`;

/** "2 Days / 1 Night". Some rows carry negative nights on a day trip: only a positive count is an overnight. */
export function durationLabel(days: number | null | undefined, nights?: number | null): string | null {
  if (!days) return null;
  return [plural(days, "Day"), nights && nights > 0 ? plural(nights, "Night") : ""].filter(Boolean).join(" / ");
}
