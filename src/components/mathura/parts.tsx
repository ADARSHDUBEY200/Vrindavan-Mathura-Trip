import Image from "next/image";
import Link from "next/link";
import { Fragment, type ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import { Rich as Marks } from "@/components/home/landing/Rich";
import { Tip } from "@/components/destination/kit";
import { photos, type PhotoKey } from "@/content/images";

const LINKS = /(\[[^\]]+\]\([^)]+\))/g;

/** The home page's inline markup (`**bold**`, `*italic*`, auto-linked phone and email) plus `[text](href)`. */
export function Rich({ text }: { text: string }) {
  return (
    <>
      {text.split(LINKS).map((part, i) => {
        const link = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
        if (!link) return <Fragment key={i}>{<Marks text={part} />}</Fragment>;
        return (
          <Link key={i} href={link[2]} className="dg-link">
            {link[1]}
          </Link>
        );
      })}
    </>
  );
}

type MediaProps = {
  photo: PhotoKey;
  sizes: string;
  className?: string;
  imgClassName?: string;
  alt?: string;
  children?: ReactNode;
};

/** A `fill` photo in a sized, rounded frame. The frame's tint also stands in if an image ever fails to load. */
export function Media({ photo, sizes, className = "", imgClassName = "object-cover", alt, children }: MediaProps) {
  const p = photos[photo];
  return (
    <div className={`dg-photo ${className}`}>
      <Image src={p.src} alt={alt ?? p.alt} fill sizes={sizes} placeholder="blur" className={imgClassName} />
      {children}
    </div>
  );
}

/** A tip in the founder's words: one paragraph or a list. */
export function LocalTip({ label, text, points, className = "" }: { label: string; text?: string; points?: readonly string[]; className?: string }) {
  return (
    <Tip label={label} className={className}>
      {text && (
        <p>
          <Rich text={text} />
        </p>
      )}
      {points && <Points items={points} />}
    </Tip>
  );
}

/** A diamond-bulleted list of rich lines. */
export function Points({ items, className = "" }: { items: readonly string[]; className?: string }) {
  return (
    <ul className={`dg-bullets ${className}`}>
      {items.map((t) => (
        <li key={t}>
          <Rich text={t} />
        </li>
      ))}
    </ul>
  );
}

/** Text link with a small arrow, used for "keep planning" links. */
export function ArrowLink({ href, children, className = "" }: { href: string; children: ReactNode; className?: string }) {
  return (
    <Link href={href} className={`link-arrow group text-sm ${className}`}>
      {children}
      <ArrowRight size={16} aria-hidden="true" className="btn-arrow" />
    </Link>
  );
}
