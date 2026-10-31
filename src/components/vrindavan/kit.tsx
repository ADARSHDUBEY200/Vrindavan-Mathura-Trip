import Image from "next/image";
import Link from "next/link";
import { Fragment, type ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";
import { Rich } from "@/components/home/landing/Rich";
import { Lotus } from "@/components/svg/Ornaments";
import { picUrl, type Pic } from "@/content/vrindavan";

const INTERNAL_LINK = /(\[[^\]]+\]\([^)]+\))/g;

/** `Rich`, plus `[label](/href)` internal links. */
export function Prose({ text }: { text: string }) {
  return (
    <>
      {text.split(INTERNAL_LINK).map((part, i) => {
        const link = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
        return link ? (
          <Link key={i} href={link[2]} className="vrn-link">
            {link[1]}
          </Link>
        ) : (
          <Fragment key={i}>
            <Rich text={part} />
          </Fragment>
        );
      })}
    </>
  );
}

/**
 * `fill` image; the parent sets the box and its background colour stands in while the frame loads.
 * Only the preloaded hero keeps a blur: across 40 frames the base64 alone adds some 45 KB to the page.
 */
export function Shot({ pic, sizes, className = "object-cover", preload = false }: { pic: Pic; sizes: string; className?: string; preload?: boolean }) {
  return <Image src={preload ? pic.src : picUrl(pic)} alt={pic.alt} fill sizes={sizes} preload={preload} className={className} placeholder={preload && typeof pic.src !== "string" ? "blur" : "empty"} />;
}

const NUMERALS = "०१२३४५६७८९";

/** Chapter numeral in Devanagari: decoration only, the heading carries the meaning. */
export function ChapterMark({ n, className = "" }: { n: number; className?: string }) {
  return (
    <span aria-hidden="true" lang="hi" className={`vrn-numeral ${className}`}>
      {NUMERALS[n]}
    </span>
  );
}

/** H3 for a place: links to its own page when it has one. */
export function PlaceHeading({ name, href, id }: { name: string; href?: string; id?: string }) {
  return (
    <h3 id={id} className="vrn-h3">
      {href ? (
        <Link href={href} className="group inline underline-offset-[0.2em] hover:underline">
          {name}
          <ArrowUpRight aria-hidden="true" className="ml-1 inline size-[0.75em] align-baseline opacity-60 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </Link>
      ) : (
        name
      )}
    </h3>
  );
}

/** H2 with an optional lede. */
export function Head({ id, title, lede, className = "" }: { id: string; title: string; lede?: ReactNode; className?: string }) {
  return (
    <div className={className}>
      <h2 id={id} className="vrn-h2">
        {title}
      </h2>
      {lede && <p className="vrn-lede mt-4 max-w-2xl">{lede}</p>}
    </div>
  );
}

/** A guide's note: lotus label over a ruled list. */
export function LocalTips({ label, items, className = "" }: { label: string; items: string[]; className?: string }) {
  return (
    <div className={`vrn-note ${className}`}>
      <p className="vrn-note-label">
        <Lotus className="w-5 shrink-0" />
        {label}
      </p>
      <ul className="vrn-rules mt-1">
        {items.map((t) => (
          <li key={t}>
            <Prose text={t} />
          </li>
        ))}
      </ul>
    </div>
  );
}

/** The same note, for a single paragraph ("Harsh Sharma's local tip: ..."). */
export function TipLine({ text, className = "" }: { text: string; className?: string }) {
  return (
    <p className={`vrn-tipline ${className}`}>
      <Lotus className="mt-1 w-5 shrink-0" />
      <span>
        <Prose text={text} />
      </span>
    </p>
  );
}
