import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock3 } from "lucide-react";
import type { Guide } from "@/content/guides";
import { photos } from "@/content/images";

export function GuideCard({ guide, headingLevel: H = "h3" }: { guide: Guide; headingLevel?: "h2" | "h3" }) {
  const img = photos[guide.image];
  return (
    <article className="group surface card-hover relative flex h-full flex-col overflow-hidden">
      <div className="zoom-media relative aspect-[16/10] bg-sand">
        <Image src={img.src} alt={img.alt} fill sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 85vw" className="object-cover" placeholder="blur" />
      </div>
      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <p className="flex items-center gap-3 text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-ember-deep">
          {guide.category}
          <span className="inline-flex items-center gap-1 font-medium normal-case tracking-normal text-stone">
            <Clock3 size={13} aria-hidden="true" /> {guide.readMinutes} min read
          </span>
        </p>
        <H className="mt-2 text-base font-semibold leading-snug sm:text-[1.05rem]">
          <Link href={`/travel-guide/${guide.slug}`} className="after:absolute after:inset-0 after:content-['']">
            {guide.title}
          </Link>
        </H>
        <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-stone">{guide.excerpt}</p>
        <span className="link-arrow mt-auto pt-4 text-sm" aria-hidden="true">
          Read guide <ArrowRight size={15} className="btn-arrow" />
        </span>
      </div>
    </article>
  );
}
