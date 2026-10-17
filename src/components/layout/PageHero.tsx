import Image from "next/image";
import type { ReactNode } from "react";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Eyebrow } from "@/components/ui/SectionHeading";
import type { Photo } from "@/content/images";
import type { Crumb } from "@/lib/schema";

type PageHeroProps = {
  eyebrow: string;
  title: ReactNode;
  lede?: ReactNode;
  crumbs: Crumb[];
  image?: Photo;
  children?: ReactNode;
  /** Small facts/meta rendered under the lede. */
  meta?: ReactNode;
};

/**
 * Inner-page hero. With an image: a rounded photo banner carrying the H1, plus an overlapping
 * info card for the lede, meta and actions. Without an image: a clean gradient header.
 */
export function PageHero({ eyebrow, title, lede, crumbs, image, children, meta }: PageHeroProps) {
  if (!image) {
    return (
      <section aria-labelledby="page-title" className="bg-hero relative overflow-hidden pb-10 pt-28 sm:pb-14 sm:pt-32">
        <div className="bg-dots pointer-events-none absolute inset-0 mask-[radial-gradient(60%_70%_at_20%_30%,black,transparent)]" aria-hidden="true" />
        <div className="container-x relative max-w-4xl text-center sm:text-left lg:max-w-7xl">
          <div className="hero-in flex justify-center sm:justify-start">
            <Breadcrumbs items={crumbs} />
          </div>
          <Eyebrow className="hero-in hero-in-1 mt-5">{eyebrow}</Eyebrow>
          <h1 id="page-title" className="display-1 hero-in hero-in-2 mt-3 max-w-3xl">
            {title}
          </h1>
          {lede && <p className="lede hero-in hero-in-3 mx-auto mt-4 max-w-2xl sm:mx-0">{lede}</p>}
          {meta && <div className="hero-in hero-in-3 mt-5">{meta}</div>}
          {children && <div className="hero-in hero-in-4 mt-6">{children}</div>}
        </div>
      </section>
    );
  }

  const hasCard = Boolean(lede || meta || children);
  return (
    <section aria-labelledby="page-title" className="bg-hero pb-10 pt-[5.25rem] sm:pt-24 lg:pb-14">
      <div className="container-x">
        <div className="relative flex min-h-68 flex-col justify-end overflow-hidden rounded-3xl bg-ink shadow-lift sm:min-h-80 lg:min-h-96 lg:rounded-[1.75rem]">
          <Image src={image.src} alt={image.alt} fill preload sizes="(min-width: 1280px) 1216px, 100vw" className="object-cover" placeholder="blur" />
          <div className="absolute inset-0 bg-linear-to-t from-black/85 via-black/35 to-black/10 lg:bg-linear-to-r lg:from-black/80 lg:via-black/40 lg:to-transparent" aria-hidden="true" />
          <div className={`relative px-5 pt-16 sm:px-9 lg:px-14 ${hasCard ? "pb-12 sm:pb-14" : "pb-7 sm:pb-9"}`}>
            <div className="hero-in">
              <Breadcrumbs items={crumbs} light />
            </div>
            <p className="hero-in hero-in-1 mt-3 inline-flex w-fit items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-amber-200 backdrop-blur-sm">
              <span className="size-1.5 rounded-full bg-linear-to-r from-orange-400 to-amber-400" aria-hidden="true" />
              {eyebrow}
            </p>
            <h1 id="page-title" className="display-1 hero-in hero-in-2 mt-3 max-w-3xl text-white">
              {title}
            </h1>
          </div>
        </div>

        {hasCard && (
          <div className="surface hero-in hero-in-3 relative z-10 mx-3 -mt-8 p-5 sm:mx-8 sm:p-6 lg:mx-14 lg:flex lg:items-center lg:justify-between lg:gap-10">
            <div className="min-w-0">
              {lede && <p className="lede max-w-3xl">{lede}</p>}
              {meta && <div className={lede ? "mt-4" : ""}>{meta}</div>}
            </div>
            {children && <div className="mt-5 shrink-0 lg:mt-0">{children}</div>}
          </div>
        )}
      </div>
    </section>
  );
}
