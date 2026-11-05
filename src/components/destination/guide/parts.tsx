import Image from "next/image";
import Link from "next/link";
import { Fragment, type ReactNode } from "react";
import { Droplets, Flower2, Footprints, Landmark, Leaf, Mountain, Sunrise, type LucideIcon } from "lucide-react";
import { Rich as Marks } from "@/components/home/landing/Rich";
import { Tip } from "@/components/destination/kit";
import type { GuideTip, PlaceIcon } from "@/content/braj/types";
import { photos, type PhotoKey } from "@/content/images";

const LINKS = /(\[[^\]]+\]\([^)]+\))/g;

/** Inline markup: `**bold**`, `*italic*`, auto-linked phone and email, plus `[text](href)`. */
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

export function Paragraphs({ items, className = "" }: { items: readonly string[]; className?: string }) {
  return (
    <div className={`dg-prose dg-body ${className}`}>
      {items.map((p) => (
        <p key={p}>
          <Rich text={p} />
        </p>
      ))}
    </div>
  );
}

export function Bullets({ items, className = "" }: { items: readonly string[]; className?: string }) {
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

type PhotoProps = { photo: PhotoKey; sizes: string; className?: string; position?: string; alt?: string; children?: ReactNode };

/** A `fill` photograph in a rounded, tinted frame. */
export function Photo({ photo, sizes, className = "", position, alt, children }: PhotoProps) {
  const p = photos[photo];
  return (
    <div className={`dg-photo ${className}`}>
      <Image src={p.src} alt={alt ?? p.alt} fill sizes={sizes} placeholder="blur" className="object-cover" style={position ? { objectPosition: position } : undefined} />
      {children}
    </div>
  );
}

/** The smaller photograph laid over a corner of a larger one. */
export function Inset({ photo }: { photo: PhotoKey }) {
  return <Photo photo={photo} sizes="9rem" className="absolute bottom-3 right-3 z-10 aspect-[3/4] w-24 rounded-xl border-[3px] border-white shadow-lift sm:w-32" />;
}

export const PLACE_ICON: Record<PlaceIcon, LucideIcon> = { water: Droplets, footprints: Footprints, leaf: Leaf, temple: Landmark, mountain: Mountain, flower: Flower2, sun: Sunrise };

/** Stands in for a photograph: a soft orange field with the place's line icon. */
export function IconField({ icon, className = "" }: { icon?: PlaceIcon; className?: string }) {
  const Icon = PLACE_ICON[icon ?? "temple"];
  return (
    <span aria-hidden="true" className={`grid place-items-center bg-linear-to-br from-[var(--dg-o50)] to-[var(--dg-a100)] text-ember-deep ${className}`}>
      <Icon size={30} strokeWidth={1.5} />
    </span>
  );
}

export function TipBox({ tip, className = "" }: { tip: GuideTip; className?: string }) {
  return (
    <Tip label={tip.label} className={className}>
      {tip.text && (
        <p>
          <Rich text={tip.text} />
        </p>
      )}
      {tip.points && <Bullets items={tip.points} className={tip.text ? "mt-3" : ""} />}
    </Tip>
  );
}
