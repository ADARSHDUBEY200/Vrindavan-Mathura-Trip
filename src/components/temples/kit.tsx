import Image from "next/image";
import Link from "next/link";
import { Fragment } from "react";
import { Rich } from "@/components/home/landing/Rich";
import { Lotus } from "@/components/svg/Ornaments";
import type { TempleCardData } from "@/lib/cms/temples";

const INTERNAL_LINK = /(\[[^\]]+\]\([^)]+\))/g;

/** Editable copy: `**bold**`, `*italic*` and `[label](/href)`. */
export function Txt({ text }: { text: string }) {
  return (
    <>
      {text.split(INTERNAL_LINK).map((part, i) => {
        const link = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
        return link ? (
          <Link key={i} href={link[2]} className="tmpl-link">
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

/** Arched temple card, used by the finder and by "related temples". */
export function ArchCard({ temple, index, headingLevel: H = "h3" }: { temple: TempleCardData; index?: number; headingLevel?: "h2" | "h3" }) {
  return (
    <article className="tmpl-card group">
      <div className="tmpl-card-arch">
        {temple.image ? (
          <Image src={temple.image.src} alt={temple.image.alt} fill sizes="(min-width: 1024px) 22vw, (min-width: 640px) 30vw, 46vw" className="object-cover" />
        ) : (
          <span className="tmpl-card-empty">
            <Lotus className="w-16" />
          </span>
        )}
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-linear-to-t from-black/55 to-transparent" aria-hidden="true" />
        {temple.town && <span className="tmpl-card-town">{temple.town}</span>}
        {index !== undefined && (
          <span className="tmpl-card-num tmpl-font" aria-hidden="true">
            {String(index + 1).padStart(2, "0")}
          </span>
        )}
      </div>
      <div className="px-0.5 pt-3">
        <H className="text-[0.95rem] font-semibold leading-snug sm:text-base">
          <Link href={temple.path} className="after:absolute after:inset-0 after:content-[''] group-hover:text-ember-deep">
            {temple.name}
          </Link>
        </H>
        {temple.category && <p className="mt-0.5 text-xs font-medium text-ember-deep">{temple.category}</p>}
        {temple.summary && <p className="mt-1 line-clamp-2 text-sm leading-relaxed text-stone">{temple.summary}</p>}
      </div>
    </article>
  );
}
