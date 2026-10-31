import Image from "next/image";
import Link from "next/link";
import { Fragment, type ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";
import { Rich as Marks } from "@/components/home/landing/Rich";
import { Lotus } from "@/components/svg/Ornaments";
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
          <Link key={i} href={link[2]} className="mt-link">
            {link[1]}
          </Link>
        );
      })}
    </>
  );
}

type HeadingProps = {
  id: string;
  kicker: string;
  title: ReactNode;
  lede?: string;
  className?: string;
};

/** Kicker and serif H2. The `id` is what the section's `aria-labelledby` points at. */
export function Heading({ id, kicker, title, lede, className = "" }: HeadingProps) {
  return (
    <header className={`max-w-3xl ${className}`}>
      <p className="mt-kicker">{kicker}</p>
      <h2 id={id} className="mt-h2 mt-4">
        {title}
      </h2>
      {lede && (
        <p className="mt-5 max-w-2xl text-[1.0625rem] leading-relaxed text-ink-soft">
          <Rich text={lede} />
        </p>
      )}
    </header>
  );
}

type MediaProps = {
  photo: PhotoKey;
  sizes: string;
  className?: string;
  imgClassName?: string;
  alt?: string;
};

/** A `fill` photo in a sized frame. The tinted frame also stands in if an image ever fails to load. */
export function Media({ photo, sizes, className = "", imgClassName = "object-cover", alt }: MediaProps) {
  const p = photos[photo];
  return (
    <div className={`mt-media zoom-media overflow-hidden bg-parchment-deep ${className}`}>
      <Image src={p.src} alt={alt ?? p.alt} fill sizes={sizes} placeholder="blur" className={imgClassName} />
    </div>
  );
}

/** A labelled paragraph: "Timings and entry:", "What to expect:" and so on. */
export function Detail({ label, text, className = "" }: { label: string; text: string; className?: string }) {
  return (
    <div className={className}>
      <p className="mt-label">{label}</p>
      <p className="mt-body mt-2">
        <Rich text={text} />
      </p>
    </div>
  );
}

/** The guide's voice: a lotus-marked note in the founder's own words. */
export function LocalTip({ label, text, points, className = "" }: { label: string; text?: string; points?: readonly string[]; className?: string }) {
  return (
    <aside aria-label={label.replace(/:$/, "")} className={`mt-tip ${className}`}>
      <p className="mt-tip-label">
        <Lotus className="w-5" aria-hidden="true" />
        {label}
      </p>
      {text && (
        <p className="mt-body mt-3">
          <Rich text={text} />
        </p>
      )}
      {points && (
        <ul className="mt-3 grid gap-3">
          {points.map((t) => (
            <li key={t} className="mt-body mt-point">
              <Rich text={t} />
            </li>
          ))}
        </ul>
      )}
    </aside>
  );
}

/** A diamond-bulleted list of rich lines. */
export function Points({ items, className = "" }: { items: readonly string[]; className?: string }) {
  return (
    <ul className={`grid gap-3 ${className}`}>
      {items.map((t) => (
        <li key={t} className="mt-body mt-point">
          <Rich text={t} />
        </li>
      ))}
    </ul>
  );
}

/** Text link with a small arrow, used for "keep planning" links. */
export function ArrowLink({ href, children, className = "" }: { href: string; children: ReactNode; className?: string }) {
  return (
    <Link href={href} className={`link-arrow group ${className}`}>
      {children}
      <ArrowUpRight size={16} aria-hidden="true" className="btn-arrow" />
    </Link>
  );
}
