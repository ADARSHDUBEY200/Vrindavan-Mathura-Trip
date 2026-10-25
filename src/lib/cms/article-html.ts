import "server-only";
import { site } from "@/config/site";
import { htmlToText } from "./blog-fields";

export type ArticleHeading = { id: string; text: string; level: 2 | 3 };

const BLOCKED_PAIRED = /<(script|style|object|embed|form|button|textarea|select|link|meta|base|noscript|colgroup)\b[^>]*>[\s\S]*?<\/\1\s*>/gi;
const BLOCKED_SINGLE = /<\/?(script|style|object|embed|form|input|button|textarea|select|link|meta|base|noscript|col|colgroup|font|o:p)\b[^>]*>/gi;
const ALLOWED_IFRAME = /^https:\/\/(www\.)?(youtube\.com|youtube-nocookie\.com|google\.com\/maps|maps\.google\.com)\//i;

/** Attributes kept per tag; everything else (style, class, dir, width, data-*, on*…) is dropped. */
const KEEP: Record<string, string[]> = {
  a: ["href", "title", "target", "rel"],
  img: ["src", "alt", "title", "width", "height"],
  iframe: ["src", "title"],
  td: ["colspan", "rowspan"],
  th: ["colspan", "rowspan", "scope"],
  ol: ["start"],
};

function slugifyHeading(text: string): string {
  return (
    text
      .toLowerCase()
      .normalize("NFKD")
      .replace(/[̀-ͯ]/g, "")
      .replace(/&/g, " and ")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 80) || "section"
  );
}

const attr = (attrs: string, name: string) => attrs.match(new RegExp(`\\s${name}\\s*=\\s*("([^"]*)"|'([^']*)'|([^\\s>]+))`, "i"));
const attrValue = (attrs: string, name: string) => {
  const m = attr(attrs, name);
  return m ? (m[2] ?? m[3] ?? m[4] ?? "") : undefined;
};

/** px size of a `font-size` declaration (pt converted), or 0. */
function fontSize(style: string): number {
  const m = style.match(/font-size:\s*([\d.]+)\s*(px|pt)/i);
  if (!m) return 0;
  return m[2].toLowerCase() === "pt" ? Number(m[1]) * (4 / 3) : Number(m[1]);
}

/**
 * Google Docs pastes headings as `<p><span style="font-size:23px">Heading</span></p>`.
 * Turn short, span-only paragraphs set in large type into real H2/H3 (so they get anchors and styling).
 */
function promotePseudoHeadings(html: string): string {
  return html.replace(/<p\b[^>]*>((?:\s|&nbsp;|<span\b[^>]*>[^<]*<\/span>)+)<\/p>/gi, (match, inner: string) => {
    const sizes = [...inner.matchAll(/<span\b([^>]*)>/gi)].map((m) => fontSize(attrValue(m[1], "style") ?? ""));
    const size = Math.max(0, ...sizes);
    const text = htmlToText(inner);
    if (!text || text.length > 140 || /[.!?:]$/.test(text) && text.length > 90) return match;
    if (size >= 20) return `<h2>${text}</h2>`;
    if (size >= 17.5) return `<h3>${text}</h3>`;
    return match;
  });
}

/** Rebuilds every opening tag with only safe, meaningful attributes. Keeps centred paragraphs. */
function cleanAttributes(html: string): string {
  return html.replace(/<([a-z][a-z0-9]*)\b([^>]*?)(\/?)>/gi, (_, rawTag: string, attrs: string, selfClose: string) => {
    const tag = rawTag.toLowerCase();
    const style = attrValue(attrs, "style") ?? "";
    const out: string[] = [];
    for (const name of KEEP[tag] ?? []) {
      const v = attrValue(attrs, name);
      if (v === undefined) continue;
      if ((name === "href" || name === "src") && /^\s*(javascript|vbscript|data:text\/html)/i.test(v)) continue;
      out.push(`${name}="${v.replace(/"/g, "&quot;")}"`);
    }
    if ((tag === "p" || tag.match(/^h[1-6]$/)) && /text-align:\s*center/i.test(style)) out.push('class="center"');
    // Docs exports bold/italic as styled spans.
    if (tag === "span" && /font-weight:\s*(700|bold)/i.test(style)) out.push('data-b=""');
    if (tag === "span" && /font-style:\s*italic/i.test(style)) out.push('data-i=""');
    return `<${tag}${out.length ? ` ${out.join(" ")}` : ""}${selfClose}>`;
  });
}

/** Removes attribute-less <span> wrappers and turns bold/italic spans into <strong>/<em>. */
function unwrapSpans(html: string): string {
  let out = html;
  for (let i = 0; i < 4; i++) {
    const next = out
      .replace(/<span data-b="" data-i="">([^<]*)<\/span>/g, "<strong><em>$1</em></strong>")
      .replace(/<span data-b="">([^<]*)<\/span>/g, "<strong>$1</strong>")
      .replace(/<span data-i="">([^<]*)<\/span>/g, "<em>$1</em>")
      .replace(/<span>((?:(?!<\/?span\b)[\s\S])*?)<\/span>/g, "$1");
    if (next === out) break;
    out = next;
  }
  return out.replace(/<span data-[bi]=""(?: data-i="")?>/g, "<span>");
}

/** Drops empty paragraphs/strongs Docs leaves behind, and collapses `&nbsp;` runs. */
function removeEmpties(html: string): string {
  let out = html;
  for (let i = 0; i < 3; i++) {
    out = out
      // Docs puts word spaces in their own spans, e.g. `a<a><span> </span>link</a>`: keep the space.
      .replace(/<(strong|em|b|i|u|span)>(\s|&nbsp;)+<\/\1>/g, " ")
      .replace(/<(strong|em|b|i|u|span)><\/\1>/g, "")
      .replace(/<p[^>]*>(?:\s|&nbsp;|<br\s*\/?>)*<\/p>/gi, "")
      .replace(/<h([1-6])[^>]*>(?:\s|&nbsp;|<br\s*\/?>)*<\/h\1>/gi, "");
  }
  return out.replace(/(&nbsp;\s*){2,}/g, " ").replace(/(\S)&nbsp;(\S)/g, "$1 $2");
}

function sanitize(html: string): string {
  let out = html.replace(/<!--[\s\S]*?-->/g, "").replace(BLOCKED_PAIRED, "").replace(BLOCKED_SINGLE, "");
  out = promotePseudoHeadings(out);
  out = cleanAttributes(out);
  out = unwrapSpans(out);
  // Rebuilt last, so the attribute whitelist above cannot strip loading/allowfullscreen.
  out = out.replace(/<iframe\b([^>]*)>(?:[\s\S]*?<\/iframe>)?/gi, (_, attrs: string) => {
    const src = attrValue(attrs, "src") ?? "";
    if (!ALLOWED_IFRAME.test(src)) return "";
    const title = attrValue(attrs, "title") || "Embedded video";
    return `<div class="embed-frame"><iframe src="${src}" title="${title}" loading="lazy" allowfullscreen referrerpolicy="strict-origin-when-cross-origin"></iframe></div>`;
  });
  // <h1> inside an article would compete with the page title.
  out = out.replace(/<(\/?)h1\b/gi, "<$1h2");
  return removeEmpties(out);
}

function decorate(html: string): string {
  return html
    .replace(/<table\b/gi, '<div class="blog-table-scroll"><table')
    .replace(/<\/table\s*>/gi, "</table></div>")
    .replace(/<img\b(?![^>]*\sloading=)/gi, '<img loading="lazy" decoding="async"')
    .replace(/<a\b([^>]*)>/gi, (match, attrs: string) => {
      const href = attrValue(attrs, "href") ?? "";
      const external = /^https?:\/\//i.test(href) && !href.startsWith(site.url);
      if (!external || /\starget\s*=/i.test(attrs)) return match;
      return `<a${attrs} target="_blank" rel="noopener noreferrer">`;
    });
}

/**
 * Prepares CMS HTML (SunEditor, often pasted from Google Docs) for the public article:
 * - strips scripts, inline styles, Docs widths/classes and non-video iframes, so the site's typography applies;
 * - promotes large-type paragraphs to real headings, and gives every H2/H3 a unique anchor for the table of contents;
 * - wraps tables for horizontal scrolling, lazy-loads images and opens external links in a new tab.
 * `reserved` ids (the page's own section anchors) are never reused by headings.
 */
export function prepareArticleHtml(html: string, reserved: string[] = []): { html: string; headings: ArticleHeading[] } {
  const used = new Set(reserved);
  const headings: ArticleHeading[] = [];
  const uniqueId = (text: string) => {
    const base = slugifyHeading(text);
    let id = base;
    for (let n = 2; used.has(id); n++) id = `${base}-${n}`;
    used.add(id);
    return id;
  };

  let out = sanitize(html);
  // Plain text (no block tags) becomes paragraphs.
  if (!/<(p|h[2-6]|ul|ol|table|div|blockquote)\b/i.test(out)) {
    out = out
      .split(/\n{2,}/)
      .map((p) => p.trim())
      .filter(Boolean)
      .map((p) => `<p>${p}</p>`)
      .join("");
  }

  out = out.replace(/<h([23])\b([^>]*)>([\s\S]*?)<\/h\1\s*>/gi, (_, level: string, attrs: string, inner: string) => {
    const text = htmlToText(inner);
    if (!text) return "";
    const id = uniqueId(text);
    headings.push({ id, text, level: level === "2" ? 2 : 3 });
    // Docs often bolds whole headings; the heading style already does.
    const clean = inner.replace(/^\s*<strong>([\s\S]*)<\/strong>\s*$/i, "$1");
    return `<h${level} id="${id}"${attrs}>${clean}</h${level}>`;
  });

  return { html: decorate(out), headings };
}

/**
 * Clean HTML for a CMS timings table. Docs tables have no <thead>, so the first row is promoted to a header,
 * and cells reading just "Free" become a badge.
 */
export function prepareTableHtml(html: string): string {
  let out = sanitize(html);
  if (!/<thead\b/i.test(out)) {
    out = out.replace(/<tbody>\s*<tr>([\s\S]*?)<\/tr>/i, (_, cells: string) => {
      const head = cells.replace(/<td\b([^>]*)>/gi, '<th scope="col"$1>').replace(/<\/td>/gi, "</th>");
      return `<thead><tr>${head}</tr></thead><tbody>`;
    });
  }
  out = out.replace(/<(t[hd])\b([^>]*)>\s*<p>([\s\S]*?)<\/p>\s*<\/\1>/gi, "<$1$2>$3</$1>");
  out = out.replace(/<td>\s*(free|free entry)\s*<\/td>/gi, '<td><span class="badge-free">$1</span></td>');
  return out.replace(/<table\b/gi, '<div class="timings-scroll"><table').replace(/<\/table\s*>/gi, "</table></div>");
}
