import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { festivals } from "@/content/festivals";
import { guides } from "@/content/guides";
import { destinationCards } from "@/content/sections";
import { photos, type PhotoKey } from "@/content/images";
import { packages } from "@/content/packages";
import { temples, type Town } from "@/content/temples";

const count = (towns: Town[]) => temples.filter((t) => towns.includes(t.town)).length;
const plural = (n: number, one: string, many = `${one}s`) => `${n} ${n === 1 ? one : many}`;

type Tile = { name: string; href: string; image: PhotoKey; text: string; meta: string };

/** Counts come straight from the content files, so they stay accurate as content changes. */
function tiles(): Tile[] {
  const [vrindavan, mathura, govardhan, barsana, gokul] = destinationCards;
  return [
    { ...vrindavan, meta: plural(count(["Vrindavan"]), "temple") },
    { ...mathura, meta: plural(count(["Mathura"]), "sacred site") },
    { ...govardhan, meta: plural(count(["Govardhan"]), "sacred site") },
    { ...barsana, meta: plural(count(["Barsana", "Nandgaon"]), "temple") },
    { ...gokul, meta: plural(count(["Gokul", "Baldeo"]), "temple") },
    { name: "Temple darshan", href: "/temples", image: "phool-bangla", text: "Timings, history and tips for each temple.", meta: plural(temples.length, "temple guide") },
    { name: "Tour packages", href: "/tour-packages", image: "dwarkadhish", text: "Private trips from one day to a week.", meta: plural(packages.length, "itinerary", "itineraries") },
    { name: "Festival yatras", href: "/festivals", image: "lathmar-holi", text: "Holi, Janmashtami, Kartik and more.", meta: plural(festivals.length, "festival") },
    { name: "Combo circuits", href: "/tour-packages", image: "taj-mahal", text: "Agra, Ayodhya, Varanasi, Rishikesh.", meta: plural(packages.filter((p) => p.filters.includes("combo")).length, "circuit") },
    { name: "Travel guides", href: "/travel-guide", image: "yamuna-vrindavan", text: "Seasons, routes and first-visit tips.", meta: plural(guides.length, "guide") },
  ];
}

export function Destinations() {
  return (
    <section aria-labelledby="destinations-title" className="bg-white py-14 sm:py-16 lg:py-20">
      <div className="container-x">
        <SectionHeading
          centerOnMobile
          id="destinations-title"
          eyebrow="Browse Braj"
          title="Explore the land of Krishna your way"
          lede="Pick a town, a temple or a festival — every tile opens a detailed guide to help you plan."
          action={
            <Link href="/temples" className="link-arrow text-sm">
              All temples <ArrowRight size={16} aria-hidden="true" className="btn-arrow" />
            </Link>
          }
        />

        <ul className="mt-8 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-5 lg:mt-10">
          {tiles().map((t) => {
            const img = photos[t.image];
            return (
              <li key={t.name} className="reveal">
                <article className="group relative h-full overflow-hidden rounded-2xl bg-ink shadow-soft transition-shadow duration-500 hover:shadow-lift">
                  <div className="zoom-media relative aspect-[4/5]">
                    <Image src={img.src} alt={img.alt} fill sizes="(min-width: 768px) 19vw, 48vw" className="object-cover" placeholder="blur" />
                    <div className="absolute inset-0 bg-linear-to-t from-black/85 via-black/30 to-transparent transition-opacity duration-500 group-hover:opacity-90" aria-hidden="true" />
                  </div>
                  <div className="absolute inset-x-0 bottom-0 p-3 text-white sm:p-4">
                    <p className="text-[0.65rem] font-semibold uppercase tracking-wider text-amber-300 sm:text-[0.7rem]">{t.meta}</p>
                    <h3 className="mt-0.5 text-[0.95rem] font-bold leading-snug text-white sm:text-base">
                      <Link href={t.href} className="after:absolute after:inset-0 after:content-['']">
                        {t.name}
                      </Link>
                    </h3>
                    <p className="mt-0.5 line-clamp-2 text-[0.72rem] leading-snug text-white/80 sm:text-xs">{t.text}</p>
                  </div>
                  <span className="absolute right-3 top-3 grid size-8 translate-y-1 place-items-center rounded-full bg-white/90 text-ink opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100" aria-hidden="true">
                    <ArrowRight size={15} className="-rotate-45" />
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
