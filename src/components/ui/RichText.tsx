import Link from "next/link";
import { Fragment, type ReactNode } from "react";
import { Lightbulb } from "lucide-react";
import type { RichBlock, Section } from "@/content/types";

/** Renders `**bold**` and `[label](/href)` inside content strings. */
function inline(text: string): ReactNode[] {
  const parts = text.split(/(\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\))/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) return <strong key={i}>{part.slice(2, -2)}</strong>;
    const link = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (link) {
      const [, label, href] = link;
      return href.startsWith("/") ? (
        <Link key={i} href={href}>
          {label}
        </Link>
      ) : (
        <a key={i} href={href} target="_blank" rel="noopener noreferrer">
          {label}
        </a>
      );
    }
    return <Fragment key={i}>{part}</Fragment>;
  });
}

export function RichBlocks({ blocks }: { blocks: RichBlock[] }) {
  return (
    <>
      {blocks.map((b, i) => {
        if (typeof b === "string") return <p key={i}>{inline(b)}</p>;
        if ("list" in b)
          return (
            <ul key={i}>
              {b.list.map((item) => (
                <li key={item}>{inline(item)}</li>
              ))}
            </ul>
          );
        if ("h3" in b) return <h3 key={i}>{b.h3}</h3>;
        return (
          <p key={i} className="callout flex gap-3">
            <Lightbulb size={20} aria-hidden="true" className="mt-1 shrink-0 text-ember-deep" />
            <span>{inline(b.tip)}</span>
          </p>
        );
      })}
    </>
  );
}

export function slugify(s: string): string {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

/** Long-form article body: H2 per section, with anchor ids for the table of contents. */
export function RichText({ sections, className = "" }: { sections: Section[]; className?: string }) {
  return (
    <div className={`prose-travel ${className}`}>
      {sections.map((s) => (
        <section key={s.heading} aria-labelledby={slugify(s.heading)}>
          <h2 id={slugify(s.heading)}>{s.heading}</h2>
          <div className="mt-4 space-y-4 [&>*+*]:mt-4">
            <RichBlocks blocks={s.body} />
          </div>
        </section>
      ))}
    </div>
  );
}
