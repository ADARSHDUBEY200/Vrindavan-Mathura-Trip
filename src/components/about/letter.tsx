import Link from "next/link";
import { Tiro_Devanagari_Hindi } from "next/font/google";
import { Fragment, type ReactNode } from "react";
import { OrnamentDivider } from "@/components/svg/Ornaments";
import { Eyebrow } from "@/components/ui/SectionHeading";

/** Devanagari-friendly serif — only for greetings, pull quotes and the signature. */
export const letterFont = Tiro_Devanagari_Hindi({ weight: "400", style: ["normal", "italic"], subsets: ["latin"], display: "swap" });

/** Body copy of the letter. */
export const letterText = "text-lg leading-8 text-gray-700";

/** Inline links inside the letter. */
export const letterLink =
  "font-semibold text-ember-deep underline decoration-orange-300 decoration-2 underline-offset-4 transition-colors hover:decoration-orange-600";

/** Crimson highlight panel (white text is ≥ 12:1 on every stop). */
export const crimson = "bg-[linear-gradient(135deg,#6b1a0a,#8b2510_50%,#7a2008)]";

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

/** Small orange lotus ornament that replaces the PDF's horizontal rules. */
export function LetterDivider() {
  return <OrnamentDivider className="mx-auto mb-10 max-w-xs sm:mb-12" />;
}

/** Eyebrow + H2 (with a stable id) + short gradient underline. */
export function LetterHeading({ id, eyebrow, title }: { id: string; eyebrow: string; title: string }) {
  return (
    <div className="text-center sm:text-left">
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 id={id} className="display-2 mt-2.5">
        {title}
      </h2>
      <span aria-hidden="true" className="mx-auto mt-4 block h-1 w-16 rounded-full bg-linear-to-r from-orange-500 to-amber-500 sm:mx-0" />
    </div>
  );
}

/** Section shell: alternating white / cream background, lotus divider on top. */
export function LetterSection({ id, cream = false, children }: { id: string; cream?: boolean; children: ReactNode }) {
  return (
    <section aria-labelledby={id} className={`${cream ? "bg-saffron-wash" : "bg-white"} py-16 sm:py-20 lg:py-24`}>
      <div className="container-x">
        <LetterDivider />
        {children}
      </div>
    </section>
  );
}
