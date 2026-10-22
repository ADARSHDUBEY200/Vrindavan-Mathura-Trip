import Link from "next/link";
import { Accessibility, ArrowRight, Baby, Building2, Clock3, Globe2, Music, PartyPopper, type LucideIcon } from "lucide-react";
import { Rich } from "@/components/home/landing/Rich";
import { WhatsappIcon } from "@/components/svg/TravelIcons";
import { formatInr } from "@/config/site";
import { customTours, images, packagesSection, signaturePackages, type SignaturePackage } from "@/content/home";
import { packageWhatsappMessage, whatsappLink } from "@/lib/whatsapp";
import { Band, GuideTip, Paras, Photo, Ticks, h3 } from "./kit";

export type PackageMatch = { path: string; title: string; price: number | null };

const customIcons: Record<string, LucideIcon> = { seniors: Accessibility, family: Baby, groups: Building2, kirtan: Music, festival: PartyPopper, globe: Globe2 };

function SignatureCard({ pkg, match }: { pkg: SignaturePackage; match?: PackageMatch }) {
  const wa = whatsappLink(packageWhatsappMessage(pkg.name));
  return (
    <article id={pkg.id} aria-labelledby={`${pkg.id}-title`} className="surface relative p-5 sm:p-7">
      <div className="flex flex-wrap items-center gap-2">
        <span className="tag">
          <Clock3 size={13} aria-hidden="true" /> {pkg.days}-Day
        </span>
        {pkg.popular && <span className="rounded-full bg-linear-to-r from-orange-500 to-amber-500 px-3 py-1 text-xs font-bold text-ink shadow-glow">Most Popular</span>}
      </div>
      <h3 id={`${pkg.id}-title`} className={`${h3} mt-3`}>
        {pkg.heading}
      </h3>
      <Paras items={[pkg.intro]} className="mt-2" />

      {pkg.timeline && (
        <ol className="relative mt-6 space-y-4 border-l-2 border-saffron-soft pl-6">
          {pkg.timeline.map((t) => (
            <li key={t.time} className="relative">
              <span className="absolute -left-[1.95rem] top-1.5 size-3 rounded-full border-2 border-white bg-saffron ring-2 ring-saffron-soft" aria-hidden="true" />
              <span className="tag">{t.time}</span>
              <p className="mt-1.5 text-[0.95rem] leading-relaxed text-ink-soft">
                <strong className="font-semibold text-ink">{t.stop}</strong>
                {t.text && (
                  <>
                    {" "}
                    <Rich text={t.text} />
                  </>
                )}
              </p>
            </li>
          ))}
        </ol>
      )}

      {pkg.dayBlocks && (
        <div className="mt-6 grid gap-4 lg:grid-cols-2">
          {pkg.dayBlocks.map((d, i) => (
            <div key={d.title} className={`rounded-card bg-cream p-4 sm:p-5 ${pkg.dayBlocks!.length === 3 && i === 2 ? "lg:col-span-2" : ""}`}>
              <h4 className="text-[0.95rem] font-semibold text-ink">{d.title}</h4>
              {d.rows && (
                <dl className="mt-3 space-y-2.5">
                  {d.rows.map((r) => (
                    <div key={r.label} className="sm:grid sm:grid-cols-[8rem_1fr] sm:gap-3">
                      <dt className="text-sm font-semibold text-ember-deep">{r.label}:</dt>
                      <dd className="text-sm leading-relaxed text-stone sm:text-[0.95rem]">
                        <Rich text={r.text} />
                      </dd>
                    </div>
                  ))}
                </dl>
              )}
              {d.text && (
                <p className="mt-2 text-sm leading-relaxed text-stone sm:text-[0.95rem]">
                  <Rich text={d.text} />
                </p>
              )}
            </div>
          ))}
        </div>
      )}

      {pkg.tip && (
        <div className="mt-6">
          <GuideTip label={pkg.tip.label} text={pkg.tip.text} />
        </div>
      )}

      <div className="mt-6 flex flex-wrap items-center gap-3 border-t border-line pt-5">
        {wa && (
          <a href={wa} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp btn-sm min-h-11">
            <WhatsappIcon size={18} />
            {packagesSection.ctaLabel}
            <span className="sr-only"> (opens WhatsApp)</span>
          </a>
        )}
        {match && (
          <Link href={match.path} className="link-arrow min-h-11 text-sm">
            {match.price ? `View package · from ${formatInr(match.price)}` : "View package"}
            <ArrowRight size={16} aria-hidden="true" className="btn-arrow" />
          </Link>
        )}
      </div>
    </article>
  );
}

/** Follows the original "Tour packages" rail, continuing its cream band. */
export function SignaturePackagesSection({ matches }: { matches: Partial<Record<SignaturePackage["id"], PackageMatch>> }) {
  const s = packagesSection;
  return (
    <Band id="tour-packages" eyebrow={s.eyebrow} title={s.title} tone="cream">
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] lg:items-start lg:gap-12">
        <div>
          <Paras items={[s.intro]} />
          <div className="surface mt-6 p-5 sm:p-6">
            <p className="font-semibold text-ink">{s.includesTitle}</p>
            <Ticks items={s.includes} className="mt-4" />
            <p className="mt-5 text-[0.95rem] leading-relaxed text-ink-soft">
              <Rich text={s.vegLine} />
            </p>
          </div>
        </div>
        <Photo image={images.packages} sizes="(min-width: 1024px) 36vw, 92vw" />
      </div>

      <div className="mt-10 grid gap-6">
        {signaturePackages.map((p) => (
          <SignatureCard key={p.id} pkg={p} match={matches[p.id]} />
        ))}
      </div>

      <div className="mt-12">
        <h3 className={h3}>{customTours.title}</h3>
        <p className="lede mt-2">{customTours.intro}</p>
        <ul className="mt-6 grid gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
          {customTours.items.map((item) => {
            const Icon = customIcons[item.icon] ?? Globe2;
            return (
              <li key={item.text} className="reveal surface card-hover flex gap-4 p-4 sm:p-5">
                <span className="icon-badge size-11 rounded-xl">
                  <Icon size={20} aria-hidden="true" />
                </span>
                <p className="text-sm leading-relaxed text-stone">
                  <Rich text={item.text} />
                </p>
              </li>
            );
          })}
        </ul>
        <Paras items={[customTours.closing]} className="mt-6" />
      </div>
    </Band>
  );
}
