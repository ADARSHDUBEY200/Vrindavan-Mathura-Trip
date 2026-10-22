/** Inline markup used in content files: `**bold**` and `*italic*`. */
export const INLINE_MARKS = /(\*\*[^*]+?\*\*|\*[^*\s][^*]*?\*)/g;

/** Plain text for schema and meta: inline markup removed. */
export function plainText(text: string): string {
  return text
    .replace(/\*\*([^*]+?)\*\*/g, "$1")
    .replace(/\*([^*\s][^*]*?)\*/g, "$1")
    .replace(/\s+/g, " ")
    .trim();
}
