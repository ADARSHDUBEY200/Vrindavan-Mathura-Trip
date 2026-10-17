import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CalendarDays, MapPin } from "lucide-react";
import { photos } from "@/content/images";
import { formatPrice, type TourPackage } from "@/content/packages";

type Props = { pkg: TourPackage; variant?: "default" | "feature"; headingLevel?: "h2" | "h3" };

export function PackageCard({ pkg, variant = "default", headingLevel: H = "h3" }: Props) {
  const img = photos[pkg.image];
  const href = `/tour-packages/${pkg.slug}`;

  if (variant === "feature") {
    return (
      <article className="group surface card-hover relative grid overflow-hidden lg:grid-cols-[1.1fr_1fr]">
        <div className="zoom-media relative aspect-[16/10] bg-sand lg:aspect-auto lg:min-h-[21rem]">
          <Image src={img.src} alt={img.alt} fill sizes="(min-width: 1024px) 40vw, 100vw" className="object-cover" placeholder="blur" />
          <span className="tag absolute left-3 top-3 bg-white/95">Featured trip</span>
        </div>
        <div className="flex flex-col p-5 sm:p-7">
          <p className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs font-medium text-stone sm:text-sm">
            <span className="inline-flex items-center gap-1.5">
              <CalendarDays size={16} aria-hidden="true" className="text-ember-deep" /> {pkg.duration}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <MapPin size={16} aria-hidden="true" className="text-ember-deep" /> {pkg.route.join(" · ")}
            </span>
          </p>
          <H className="display-3 mt-2">
            <Link href={href} className="after:absolute after:inset-0 after:content-['']">
              {pkg.title}
            </Link>
          </H>
          <p className="mt-2 text-sm leading-relaxed text-stone sm:text-[0.95rem]">{pkg.summary}</p>
          <ul className="mt-4 grid gap-1.5 text-sm text-ink-soft sm:grid-cols-2 sm:gap-x-4">
            {pkg.highlights.slice(0, 4).map((h) => (
              <li key={h} className="flex gap-2.5">
                <span aria-hidden="true" className="mt-[0.45rem] size-1.5 shrink-0 rotate-45 rounded-[1px] bg-linear-to-r from-orange-500 to-amber-500" />
                {h}
              </li>
            ))}
          </ul>
          <div className="mt-auto flex items-center justify-between gap-4 pt-5">
            <p className="text-sm font-semibold text-ink">{formatPrice(pkg)}</p>
            <span className="link-arrow text-sm" aria-hidden="true">
              View itinerary <ArrowRight size={15} className="btn-arrow" />
            </span>
          </div>
        </div>
      </article>
    );
  }

  const kind = pkg.filters.includes("combo") ? "Combo circuit" : pkg.slug.includes("janmashtami") ? "Festival" : pkg.days <= 1 ? "Day trip" : undefined;
  return (
    <article className="group surface card-hover relative flex h-full flex-col overflow-hidden">
      <div className="zoom-media relative aspect-[4/3] bg-sand">
        <Image src={img.src} alt={img.alt} fill sizes="(min-width: 1024px) 23vw, (min-width: 640px) 45vw, 80vw" className="object-cover" placeholder="blur" />
        <div className="absolute inset-x-0 top-0 flex items-start justify-between gap-2 p-3">
          <span className="inline-flex items-center gap-1 rounded-full bg-white/95 px-2.5 py-1 text-[0.7rem] font-semibold text-ink shadow-soft">
            <CalendarDays size={12} aria-hidden="true" className="text-ember-deep" /> {pkg.duration}
          </span>
          {kind && <span className="rounded-full bg-linear-to-r from-orange-500 to-amber-500 px-2.5 py-1 text-[0.68rem] font-bold text-ink">{kind}</span>}
        </div>
      </div>
      <div className="flex flex-1 flex-col p-4">
        <p className="flex items-center gap-1.5 text-xs text-stone">
          <MapPin size={13} aria-hidden="true" className="shrink-0 text-ember-deep" />
          <span className="truncate">{pkg.route.join(" · ")}</span>
        </p>
        <H className="mt-1.5 line-clamp-2 text-[0.98rem] font-semibold leading-snug transition-colors group-hover:text-ember-deep">
          <Link href={href} className="after:absolute after:inset-0 after:content-['']">
            {pkg.title}
          </Link>
        </H>
        <p className="mb-4 mt-1.5 line-clamp-2 text-[0.8rem] leading-relaxed text-stone">
          <span className="font-medium text-ink-soft">Ideal for:</span> {pkg.idealFor.slice(0, 2).join(", ")}
        </p>
        <div className="mt-auto flex items-center justify-between gap-3 border-t border-line pt-3">
          <p className="leading-tight">
            <span className="block text-[0.68rem] text-stone">Private trip</span>
            <span className="text-sm font-bold text-ink">{formatPrice(pkg)}</span>
          </p>
          <span className="icon-badge size-9 rounded-full transition-transform duration-300 group-hover:translate-x-0.5" aria-hidden="true">
            <ArrowRight size={16} />
          </span>
        </div>
      </div>
    </article>
  );
}
