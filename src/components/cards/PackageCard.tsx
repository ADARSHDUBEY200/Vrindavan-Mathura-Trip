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

  return (
    <article className="group surface card-hover relative flex h-full flex-col overflow-hidden">
      <div className="zoom-media relative aspect-[16/10] bg-sand">
        <Image src={img.src} alt={img.alt} fill sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 85vw" className="object-cover" placeholder="blur" />
        <span className="tag absolute left-3 top-3 bg-white/95">{pkg.duration}</span>
      </div>
      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <p className="flex items-center gap-1.5 text-xs text-stone">
          <MapPin size={13} aria-hidden="true" className="text-ember-deep" /> {pkg.route.join(" · ")}
        </p>
        <H className="mt-1.5 text-base font-semibold leading-snug sm:text-[1.05rem]">
          <Link href={href} className="after:absolute after:inset-0 after:content-['']">
            {pkg.title}
          </Link>
        </H>
        <p className="mb-4 mt-1.5 line-clamp-2 text-sm leading-relaxed text-stone">{pkg.summary}</p>
        <div className="mt-auto flex items-center justify-between gap-4 border-t border-line pt-3.5">
          <p className="text-[0.8rem] font-semibold text-ink">{formatPrice(pkg)}</p>
          <span className="link-arrow text-sm" aria-hidden="true">
            Details <ArrowRight size={15} className="btn-arrow" />
          </span>
        </div>
      </div>
    </article>
  );
}
