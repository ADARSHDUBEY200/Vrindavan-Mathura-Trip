import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CalendarDays, CircleCheck, MapPin, Star } from "lucide-react";
import { WhatsappIcon } from "@/components/svg/TravelIcons";
import { formatInr } from "@/config/site";
import type { CatalogPackage } from "@/lib/cms/packages";
import { packageWhatsappMessage, whatsappLink } from "@/lib/whatsapp";

type Props = { pkg: CatalogPackage; perks?: readonly string[]; headingLevel?: "h2" | "h3" };

/** Dark pill used for the card's main action (About-page palette: gray-900, orange-500 on hover). */
const primaryBtn =
  "inline-flex h-10 shrink-0 items-center gap-2 rounded-full bg-gray-900 px-4 text-[0.8125rem] font-semibold text-white shadow-[0_8px_18px_-10px_rgb(17_24_39/0.7)] transition-colors duration-300 hover:bg-orange-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500";

/**
 * Card for a catalogue package (CMS row, or the static fallback). Links to the product page only when one renders;
 * otherwise the WhatsApp enquiry is the card's one action.
 *
 * CMS banners are 850×420 with text baked in, so the frame keeps that 85:42 shape (no cropping) and they are served
 * as uploaded: re-encoding or upscaling them is what makes the lettering look soft.
 */
export function CatalogPackageCard({ pkg, perks = [], headingLevel: H = "h3" }: Props) {
  const wa = whatsappLink(packageWhatsappMessage(pkg.title));
  const img = pkg.image;
  const remote = typeof img?.src === "string";

  return (
    <article className="group about-card relative flex h-full min-w-0 flex-col p-2">
      <div className="relative aspect-85/42 overflow-hidden rounded-[0.8rem] bg-sand">
        {img && (
          <Image
            src={img.src}
            alt={img.alt}
            fill
            sizes="(min-width: 1280px) 18rem, (min-width: 1024px) 31vw, (min-width: 640px) 46vw, 92vw"
            unoptimized={remote}
            placeholder={remote ? "empty" : "blur"}
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
          />
        )}
        <div className="absolute inset-x-0 top-0 flex items-start justify-between gap-2 p-2.5">
          {pkg.durationLabel && (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/95 px-2.5 py-1 text-[0.7rem] font-semibold text-gray-900 shadow-[0_1px_2px_rgb(17_24_39/0.08)] backdrop-blur">
              <CalendarDays size={12} aria-hidden="true" className="text-orange-500" /> {pkg.durationLabel}
            </span>
          )}
          {pkg.rating && (
            <span className="ml-auto inline-flex items-center gap-1 rounded-full bg-white/95 px-2 py-1 text-[0.7rem] font-semibold text-gray-900 shadow-[0_1px_2px_rgb(17_24_39/0.08)] backdrop-blur">
              <Star size={12} aria-hidden="true" fill="currentColor" strokeWidth={0} className="text-amber-400" />
              {pkg.rating.toFixed(1)}
              <span className="sr-only"> out of 5</span>
            </span>
          )}
        </div>
      </div>

      <div className="flex flex-1 flex-col px-2.5 pb-2 pt-3.5">
        {pkg.route.length > 0 && (
          <p className="flex items-center gap-1.5 text-xs text-gray-500">
            <MapPin size={13} aria-hidden="true" className="shrink-0 text-orange-500" />
            {/* min-w-0 lets the line actually truncate: without it the unbroken route sets the card's width. */}
            <span className="min-w-0 truncate">{pkg.route.join(" · ")}</span>
          </p>
        )}
        <H className="mt-1.5 line-clamp-2 text-[0.98rem] font-semibold leading-snug tracking-[-0.01em] text-gray-900 transition-colors group-hover:text-orange-500 sm:min-h-[2.6em]">
          {pkg.path ? (
            <Link href={pkg.path} className="after:absolute after:inset-0 after:rounded-[1.125rem] after:content-['']">
              {pkg.title}
            </Link>
          ) : (
            pkg.title
          )}
        </H>

        {perks.length > 0 && (
          <ul aria-label="Included" className="mt-2.5 flex flex-wrap gap-x-2.5 gap-y-1">
            {perks.map((p) => (
              <li key={p} className="inline-flex items-center gap-1 text-[0.7rem] text-gray-600 sm:text-xs xl:text-[0.7rem]">
                <CircleCheck size={13} aria-hidden="true" className="text-orange-500" />
                {p}
              </li>
            ))}
          </ul>
        )}

        <div className="mt-auto pt-4">
          <div className="flex items-center justify-between gap-3 border-t border-gray-100 pt-3.5">
            <p className="leading-tight">
              <span className="block whitespace-nowrap text-[0.7rem] text-gray-500">{pkg.price ? "Starting from" : "Private trip"}</span>
              <span className={`mt-0.5 block font-bold tracking-tight text-gray-900 ${pkg.price ? "text-lg" : "text-sm"}`}>
                {pkg.price ? formatInr(pkg.price) : "Price on request"}
              </span>
            </p>

            {/* "Details" is covered by the title's stretched link; only the WhatsApp button sits above it. */}
            <div className="flex items-center gap-2">
              {pkg.path ? (
                <>
                  {wa && (
                    <a
                      href={wa}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Enquire about ${pkg.title} on WhatsApp`}
                      className="relative z-10 grid size-10 place-items-center rounded-full border border-gray-200 bg-white text-whatsapp-deep transition-colors hover:border-green-300 hover:bg-green-50"
                    >
                      <WhatsappIcon size={18} />
                    </a>
                  )}
                  <span className={primaryBtn} aria-hidden="true">
                    Details
                    <ArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-0.5" />
                  </span>
                </>
              ) : wa ? (
                <a href={wa} target="_blank" rel="noopener noreferrer" className={`group/btn ${primaryBtn}`}>
                  <WhatsappIcon size={16} className="text-whatsapp transition-colors group-hover/btn:text-white" />
                  Enquire now
                  <span className="sr-only"> about {pkg.title} on WhatsApp</span>
                </a>
              ) : (
                <Link href="/contact" className={primaryBtn}>
                  Enquire now
                  <ArrowRight size={15} aria-hidden="true" />
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
