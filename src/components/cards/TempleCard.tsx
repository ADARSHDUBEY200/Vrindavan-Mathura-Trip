import Image from "next/image";
import Link from "next/link";
import { Clock } from "lucide-react";
import { TempleIcon } from "@/components/svg/TravelIcons";
import { photos } from "@/content/images";
import type { Temple } from "@/content/temples";

export function TempleCard({ temple, headingLevel: H = "h3" }: { temple: Temple; headingLevel?: "h2" | "h3" }) {
  const img = photos[temple.image];
  return (
    <article className="group relative flex h-full flex-col">
      <div className="zoom-media arch relative aspect-[4/5] bg-sand shadow-soft">
        <Image src={img.src} alt={img.alt} fill sizes="(min-width: 1024px) 22vw, (min-width: 640px) 30vw, 70vw" className="object-cover" placeholder="blur" />
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-t from-black/55 to-transparent" aria-hidden="true" />
        <span className="absolute bottom-2.5 left-2.5 inline-flex items-center gap-1 rounded-full bg-white/95 px-2 py-0.5 text-[0.65rem] font-semibold text-ember-deep sm:bottom-3 sm:left-3 sm:px-2.5 sm:text-xs">
          <TempleIcon size={12} /> {temple.town}
        </span>
      </div>
      <div className="px-0.5 pt-3">
        <H className="text-sm font-semibold leading-snug sm:text-base">
          <Link href={`/temples/${temple.slug}`} className="after:absolute after:inset-0 after:content-[''] group-hover:text-ember-deep">
            {temple.name}
          </Link>
        </H>
        <p className="mt-1 hidden text-sm leading-relaxed text-stone sm:line-clamp-2">{temple.summary}</p>
        <p className="mt-1.5 inline-flex items-start gap-1.5 text-xs text-ink-soft sm:mt-2">
          <Clock size={13} aria-hidden="true" className="mt-0.5 shrink-0 text-ember-deep" />
          {temple.timingNote}
        </p>
      </div>
    </article>
  );
}
