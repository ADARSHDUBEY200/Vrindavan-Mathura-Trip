import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, MapPin } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { photos } from "@/content/images";
import { destinationCards } from "@/content/home";

export function Destinations() {
  return (
    <section aria-labelledby="destinations-title" className="bg-white py-14 sm:py-16 lg:py-20">
      <div className="container-x">
        <SectionHeading centerOnMobile
          id="destinations-title"
          eyebrow="Destinations of Braj"
          title="Five places, one story of Krishna"
          lede="From his birthplace in Mathura to the groves of Vrindavan and the hills of Govardhan and Barsana — each town of Braj holds a chapter of his leela."
        />

        <ul className="reveal swipe-row mt-8 md:grid md:grid-flow-row md:grid-cols-2 md:gap-4 md:overflow-visible lg:mt-10 lg:grid-cols-4">
          {destinationCards.map((d, i) => {
            const img = photos[d.image];
            const big = i === 0;
            return (
              <li
                key={d.name}
                className={big ? "md:col-span-2 lg:row-span-2" : undefined}
              >
                <article className="group relative h-full overflow-hidden rounded-card bg-ink shadow-soft">
                  <div className={`zoom-media relative ${big ? "aspect-[4/5] md:aspect-[16/8] lg:aspect-auto lg:h-full lg:min-h-[28rem]" : "aspect-[4/5] md:aspect-[16/11] lg:aspect-[4/3.6]"}`}>
                    <Image src={img.src} alt={img.alt} fill sizes={big ? "(min-width: 1024px) 48vw, (min-width: 768px) 90vw, 80vw" : "(min-width: 1024px) 24vw, (min-width: 768px) 45vw, 80vw"} className="object-cover opacity-90" placeholder="blur" />
                    <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/25 to-transparent" aria-hidden="true" />
                  </div>
                  <div className="absolute inset-x-0 bottom-0 p-4 text-white sm:p-5">
                    <p className="inline-flex items-center gap-1 text-[0.7rem] font-medium text-amber-200 sm:text-xs">
                      <MapPin size={13} aria-hidden="true" /> {d.distance}
                    </p>
                    <h3 className={`mt-1 font-bold text-white ${big ? "text-xl sm:text-2xl lg:text-[1.75rem]" : "text-lg sm:text-xl"}`}>
                      <Link href={d.href} className="after:absolute after:inset-0 after:content-['']">
                        {d.name}
                      </Link>
                    </h3>
                    <p className="mt-1 max-w-sm text-[0.8rem] leading-relaxed text-white/85 sm:text-sm">{d.text}</p>
                  </div>
                  <span
                    className="absolute right-4 top-4 grid size-9 place-items-center rounded-full bg-white/90 text-ink transition-transform duration-500 group-hover:rotate-45"
                    aria-hidden="true"
                  >
                    <ArrowUpRight size={17} />
                  </span>
                </article>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
