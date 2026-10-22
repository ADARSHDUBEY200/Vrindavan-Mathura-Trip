/** A block of long-form copy: a paragraph, a bulleted list, a sub-heading or a highlighted tip. */
export type RichBlock = string | { list: string[] } | { h3: string } | { tip: string };

export type Section = { heading: string; body: RichBlock[] };

export type Faq = { q: string; a: string };

/** An image with fixed dimensions (its aspect ratio is reserved before it loads). */
export type ContentImage = { src: string; alt: string; width: number; height: number };

/**
 * One block inside a temple / darshan-guide card (components/home/landing/TempleEntry.tsx).
 * Strings use the inline markup `**bold**` / `*italic*`.
 */
export type GuideBlock =
  | { kind: "text"; label?: string; text: string; tone?: "highlight" }
  | { kind: "tips"; label: string; items: string[] }
  /** A real <table>; `label` becomes its caption. */
  | { kind: "seasons"; label: string; columns?: readonly [string, string, string]; rows: { season: string; morning: string; evening: string }[] }
  | { kind: "places"; items: { id: string; text: string }[] }
  | { kind: "timing"; label: string; text: string }
  | { kind: "note"; label: string; text: string }
  /** Groups blocks on a tinted card. `dusk`: deep indigo → crimson, light text. */
  | { kind: "panel"; tone: "dusk"; blocks: GuideBlock[] };
