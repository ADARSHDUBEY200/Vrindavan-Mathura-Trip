import Link from "next/link";
import { Tiro_Devanagari_Hindi } from "next/font/google";
import { Fragment, type ReactNode } from "react";
import { Eyebrow } from "@/components/ui/SectionHeading";

/** Devanagari-friendly serif — only for greetings, pull quotes and the signature. */
export const letterFont = Tiro_Devanagari_Hindi({ weight: "400", style: ["normal", "italic"], subsets: ["latin"], display: "swap" });

/** Body copy of the letter. */
export const letterText = "text-[0.9375rem] leading-7 text-gray-600 sm:text-base";

/** Accent for small serif text (names, closing line): one step deeper than the orange-500 headings so it stays readable. */
export const accent = "text-orange-600";

/** Eyebrow rendered as a small outlined chip. */
export const eyebrowChip = "eyebrow-chip rounded-full border border-orange-200 bg-orange-50 px-3 py-1";

/** Inline links inside the letter. */
export const letterLink =
  "font-semibold text-ember-deep underline decoration-orange-300 decoration-2 underline-offset-4 transition-colors hover:decoration-orange-600";

const TOKEN = /(\[(?:[^\]]+)\]\((?:[^)]+)\)|\*\*\*[^*]+\*\*\*|\*\*[^*]+\*\*|\*[^*]+\*)/g;

function inline(text: string, keyPrefix = ""): ReactNode[] {
  return text.split(TOKEN).map((part, i) => {
    const key = `${keyPrefix}${i}`;
    const link = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (link) {
      const [, label, href] = link;
      const children = inline(label, `${key}-`);
      return href.startsWith("/") ? (
        <Link key={key} href={href} className={letterLink}>
          {children}
        </Link>
      ) : (
        <a key={key} href={href} className={letterLink}>
          {children}
        </a>
      );
    }
    if (part.startsWith("***") && part.endsWith("***"))
      return (
        <strong key={key}>
          <em>{part.slice(3, -3)}</em>
        </strong>
      );
    if (part.startsWith("**") && part.endsWith("**")) return <strong key={key} className="font-semibold text-ink">{part.slice(2, -2)}</strong>;
    if (part.length > 2 && part.startsWith("*") && part.endsWith("*")) return <em key={key}>{part.slice(1, -1)}</em>;
    return <Fragment key={key}>{part}</Fragment>;
  });
}

/** Renders one line of About-page inline markup (`**bold**`, `***bold italic***`, `*italic*`, `[text](href)`). */
export function Rich({ text }: { text: string }) {
  return <>{inline(text)}</>;
}

export function Paragraphs({ items, className = "" }: { items: string[]; className?: string }) {
  return (
    <div className={`space-y-6 ${letterText} ${className}`}>
      {items.map((p) => (
        <p key={p.slice(0, 48)}>
          <Rich text={p} />
        </p>
      ))}
    </div>
  );
}

/**
 * Splits a title into a dark lead and an orange-500 accent, like "My Story: **The Boy from Mathura**".
 * Splits after the first ": " or ". ", otherwise accents the last word.
 */
function TwoTone({ title }: { title: string }) {
  const m = title.match(/^(.+?[:.])\s(.+)$/);
  const [lead, tail] = m ? [`${m[1]} `, m[2]] : [title.slice(0, title.lastIndexOf(" ") + 1), title.slice(title.lastIndexOf(" ") + 1)];
  return (
    <>
      {lead}
      <span className="text-orange-500">{tail}</span>
    </>
  );
}

/** Eyebrow chip + two-tone H2 (with a stable id). Left-aligned headings centre on small screens. */
export function LetterHeading({ id, eyebrow, title, align = "center" }: { id: string; eyebrow: string; title: string; align?: "center" | "left" }) {
  return (
    <div className={`reveal ${align === "center" ? "text-center" : "text-center lg:text-left"}`}>
      <Eyebrow className={eyebrowChip}>{eyebrow}</Eyebrow>
      <h2 id={id} className="mt-3 text-[clamp(1.375rem,1.15rem+0.8vw,1.75rem)] font-bold leading-tight tracking-[-0.02em] text-gray-900">
        <TwoTone title={title} />
      </h2>
    </div>
  );
}

type Tone = "white" | "grey" | "dark";
const tones: Record<Tone, string> = {
  white: "bg-white",
  grey: "bg-[#f7f8fa]",
  dark: "about-dark",
};

/** Section shell: white, light grey or the single dark section. */
export function LetterSection({ id, tone = "white", children }: { id: string; tone?: Tone; children: ReactNode }) {
  return (
    <section aria-labelledby={id} className={`relative py-10 sm:py-12 lg:py-14 ${tones[tone]}`}>
      <div className="container-x relative">{children}</div>
    </section>
  );
}
