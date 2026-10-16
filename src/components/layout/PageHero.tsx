import Image from "next/image";
import type { ReactNode } from "react";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { ArchOutline, Lotus, Mandala } from "@/components/svg/Ornaments";
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

/** Inner-page hero: breadcrumbs, H1 and an arch-framed photo. */
export function PageHero({ eyebrow, title, lede, crumbs, image, children, meta }: PageHeroProps) {
  return (
    <section aria-labelledby="page-title" className="bg-hero relative overflow-hidden pb-14 pt-28 sm:pt-32 lg:pb-20">
      <div className="bg-dots pointer-events-none absolute inset-0 [mask-image:radial-gradient(60%_70%_at_20%_30%,black,transparent)]" aria-hidden="true" />
      <Mandala className="spin-slow pointer-events-none absolute -right-48 -top-40 size-[36rem] text-saffron/15" />

      <div className={`container-x relative grid items-center gap-10 ${image ? "lg:grid-cols-[1.2fr_0.8fr]" : ""}`}>
        <div className={image ? "" : "max-w-3xl"}>
          <div className="hero-in">
            <Breadcrumbs items={crumbs} />
          </div>
          <Eyebrow className="hero-in hero-in-1 mt-6">{eyebrow}</Eyebrow>
          <h1 id="page-title" className="display-1 hero-in hero-in-2 mt-4">
            {title}
          </h1>
          {lede && <p className="lede hero-in hero-in-3 mt-5 max-w-2xl">{lede}</p>}
          {meta && <div className="hero-in hero-in-3 mt-6">{meta}</div>}
          {children && <div className="hero-in hero-in-4 mt-8">{children}</div>}
        </div>

        {image && (
          <div className="relative mx-auto w-full max-w-[17rem] sm:max-w-sm lg:max-w-none">
            <ArchOutline className="pointer-events-none absolute -inset-4 h-[calc(100%+2rem)] w-[calc(100%+2rem)] text-saffron/50" />
            <div className="arch relative aspect-[4/5] bg-sand shadow-lift">
              <Image src={image.src} alt={image.alt} fill preload sizes="(min-width: 1024px) 36vw, (min-width: 640px) 24rem, 17rem" className="object-cover" placeholder="blur" />
            </div>
            <Lotus className="absolute -bottom-5 left-1/2 w-20 -translate-x-1/2 text-saffron" />
          </div>
        )}
      </div>
    </section>
  );
}
