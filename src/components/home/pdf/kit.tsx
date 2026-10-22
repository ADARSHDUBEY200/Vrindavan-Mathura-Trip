import Image from "next/image";
import type { ReactNode } from "react";
import { Check, Info } from "lucide-react";
import { Rich } from "@/components/home/landing/Rich";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { HomeImage } from "@/content/home";

/*
 * Building blocks for the long-form homepage sections. They use only the site's existing design
 * language — SectionHeading, .surface cards, .prose-travel text, .icon-badge, .callout — so the
 * new content sits inside the original homepage without changing its look.
 */

/** Section band matching the original homepage sections (white / cream, same padding and container). */
export function Band({
  id,
  eyebrow,
  title,
  lede,
  tone,
  children,
}: {
  id: string;
  eyebrow: string;
  title: ReactNode;
  lede?: ReactNode;
  tone: "white" | "cream";
  children: ReactNode;
}) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className={`${tone === "cream" ? "bg-cream" : "bg-white"} py-14 sm:py-16 lg:py-20`}>
      <div className="container-x">
        <SectionHeading centerOnMobile id={`${id}-title`} eyebrow={eyebrow} title={title} lede={lede} className="[&>div]:max-w-3xl" />
        <div className="mt-8 lg:mt-10">{children}</div>
      </div>
    </section>
  );
}

/** Card / sub-section heading (H3), same scale as the site's `display-3`. */
export const h3 = "display-3";

/** Long-form paragraphs in the site's article typography. */
export function Paras({ items, className = "" }: { items: string[]; className?: string }) {
  return (
    <div className={`prose-travel max-w-3xl ${className}`}>
      {items.map((p) => (
        <p key={p.slice(0, 48)}>
          <Rich text={p} />
        </p>
      ))}
    </div>
  );
}

/** Diamond-bullet list in the article typography. */
export function Bullets({ items, className = "" }: { items: string[]; className?: string }) {
  return (
    <div className={`prose-travel ${className}`}>
      <ul>
        {items.map((t) => (
          <li key={t}>
            <Rich text={t} />
          </li>
        ))}
      </ul>
    </div>
  );
}

/** Tick list — the pattern used in the About highlights section. */
export function Ticks({ items, columns = 1, className = "" }: { items: string[]; columns?: 1 | 2; className?: string }) {
  return (
    <ul className={`grid gap-3 ${columns === 2 ? "md:grid-cols-2 md:gap-x-8" : ""} ${className}`}>
      {items.map((t) => (
        <li key={t} className="flex gap-3 text-[0.95rem] leading-relaxed text-ink-soft">
          <span className="icon-badge mt-0.5 size-6 rounded-full">
            <Check size={14} aria-hidden="true" />
          </span>
          <span>
            <Rich text={t} />
          </span>
        </li>
      ))}
    </ul>
  );
}

/** "Harsh's tip" / "Harsh's advice" — the site's orange callout with a 🙏 badge. */
export function GuideTip({ label, text }: { label: string; text: string }) {
  return (
    <aside aria-label={label} className="flex max-w-3xl gap-4 rounded-card border border-saffron-soft bg-saffron-wash p-4 sm:p-5">
      <span className="grid size-10 shrink-0 place-items-center rounded-full bg-white text-lg shadow-soft" aria-hidden="true">
        🙏
      </span>
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-ember-deep">{label}</p>
        <p className="mt-1 text-[0.95rem] leading-relaxed text-ink-soft">
          <Rich text={text} />
        </p>
      </div>
    </aside>
  );
}

/** Information note (timings disclaimer etc.). */
export function Note({ label, text }: { label: string; text: string }) {
  return (
    <aside aria-label={label.replace(/:$/, "")} className="flex max-w-3xl gap-3 rounded-card border border-amber-200 bg-amber-50 p-4 sm:p-5">
      <Info size={20} className="mt-0.5 shrink-0 text-gold-deep" aria-hidden="true" />
      <p className="text-[0.95rem] leading-relaxed text-ink-soft">
        <strong className="font-semibold text-ink">{label}</strong> {text}
      </p>
    </aside>
  );
}

/** Content photo in the site's media frame. Lazy unless `priority`. */
export function Photo({ image, sizes, className = "", priority = false }: { image: HomeImage; sizes: string; className?: string; priority?: boolean }) {
  return (
    <div className={`zoom-media relative overflow-hidden bg-sand shadow-soft ${className.includes("arch") ? "" : "rounded-card"} ${className}`} style={{ aspectRatio: `${image.width} / ${image.height}` }}>
      <Image src={image.src} alt={image.alt} fill sizes={sizes} priority={priority} className="object-cover" />
    </div>
  );
}
