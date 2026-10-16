import Image from "next/image";
import { CalendarRange, Car, Navigation, Plane, TrainFront } from "lucide-react";
import { PackageCard } from "@/components/cards/PackageCard";
import { TempleCard } from "@/components/cards/TempleCard";
import { FinalCta } from "@/components/home/Sections";
import { PageHero } from "@/components/layout/PageHero";
import { JsonLd } from "@/components/seo/JsonLd";
import { Mandala, OrnamentDivider } from "@/components/svg/Ornaments";
import { EnquiryButtons } from "@/components/ui/EnquiryButtons";
import { FaqList } from "@/components/ui/FaqList";
import { Eyebrow, SectionHeading } from "@/components/ui/SectionHeading";
import type { Destination } from "@/content/destinations";
import { photos } from "@/content/images";
import { getPackages } from "@/content/packages";
import { getTemples } from "@/content/temples";
import { breadcrumbSchema, destinationSchema, faqSchema, webPageSchema } from "@/lib/schema";

const reachIcons: Record<string, typeof Car> = {
  "By road": Car,
  "By train": TrainFront,
  "By air": Plane,
};

export function DestinationTemplate({ d }: { d: Destination }) {
  const path = `/${d.slug}`;
  const hero = photos[d.image];
  const crumbs = [
    { name: "Home", href: "/" },
    { name: d.name, href: path },
  ];
  const templeList = getTemples(d.templeSlugs);
  const pkgs = getPackages(d.packageSlugs);

  return (
    <>
      <PageHero
        eyebrow={d.eyebrow}
        title={d.title}
        lede={d.intro}
        crumbs={crumbs}
        image={hero}
        meta={
          <dl className="grid max-w-xl grid-cols-3 gap-3">
            {d.facts.map((f) => (
              <div key={f.label} className="rounded-2xl border border-line bg-white/80 px-3 py-3">
                <dt className="text-xs text-stone">{f.label}</dt>
                <dd className="mt-0.5 text-sm font-semibold text-ink sm:text-base">{f.value}</dd>
              </div>
            ))}
          </dl>
        }
      >
        <EnquiryButtons message={`Radhe Radhe! I'd like to plan a trip to ${d.name}.`} />
      </PageHero>

      {/* Overview */}
      <section aria-labelledby="overview-title" className="py-16 lg:py-24">
        <div className="container-x grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <Eyebrow>Overview</Eyebrow>
            <h2 id="overview-title" className="display-2 mt-3">
              About {d.name}
            </h2>
            <OrnamentDivider className="mt-6 max-w-xs" />
          </div>
          <div className="prose-travel">
            {d.overview.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </div>
      </section>

      {/* Top temples */}
      <section aria-labelledby="temples-title" className="bg-white py-16 lg:py-24">
        <div className="container-x">
          <SectionHeading
            id="temples-title"
            eyebrow="Top temples"
            title={`Temples to visit in ${d.name}`}
            lede="Timings on each temple page are approximate and change with seasons and festivals."
          />
          <ul className="mt-12 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
            {templeList.map((t) => (
              <li key={t.slug} className="reveal">
                <TempleCard temple={t} />
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Experiences */}
      <section aria-labelledby="exp-title" className="py-16 lg:py-24">
        <div className="container-x">
          <SectionHeading id="exp-title" eyebrow="Experiences" title={`Things to experience in ${d.name}`} />
          <ul className="reveal swipe-row mt-12 sm:grid sm:grid-flow-row sm:grid-cols-2 sm:gap-6 sm:overflow-visible lg:grid-cols-4">
            {d.experiences.map((e, i) => {
              const img = photos[e.image];
              return (
                <li key={e.title}>
                  <figure className="group h-full">
                    <div className={`zoom-media relative aspect-[4/5] bg-sand shadow-soft ${i % 2 === 0 ? "arch" : "rounded-card"}`}>
                      <Image src={img.src} alt={img.alt} fill sizes="(min-width: 1024px) 23vw, (min-width: 640px) 45vw, 78vw" className="object-cover" placeholder="blur" />
                    </div>
                    <figcaption className="mt-4">
                      <h3 className="font-semibold">{e.title}</h3>
                      <p className="mt-1 text-[0.95rem] leading-relaxed text-stone">{e.text}</p>
                    </figcaption>
                  </figure>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* Best time + how to reach */}
      <section aria-labelledby="plan-title" className="relative overflow-hidden bg-cream py-16 lg:py-24">
        <Mandala className="spin-slow pointer-events-none absolute -right-52 -top-32 size-[32rem] text-saffron/15" />
        <div className="container-x relative">
          <SectionHeading id="plan-title" eyebrow="Plan your visit" title="When to go & how to get there" />
          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            <div className="surface p-7 sm:p-9">
              <h3 className="flex items-center gap-3 text-xl font-semibold">
                <CalendarRange size={24} aria-hidden="true" className="text-ember-deep" /> Best time to visit
              </h3>
              <p className="mt-3 leading-relaxed text-stone">{d.bestTime.summary}</p>
              <ul className="mt-6 grid gap-4">
                {d.bestTime.seasons.map((s) => (
                  <li key={s.label} className="rounded-2xl bg-cream p-4">
                    <p className="font-semibold text-ink">
                      {s.label} <span className="font-normal text-stone">· {s.months}</span>
                    </p>
                    <p className="mt-1 text-[0.95rem] leading-relaxed text-stone">{s.note}</p>
                  </li>
                ))}
              </ul>
            </div>
            <div className="surface p-7 sm:p-9">
              <h3 className="flex items-center gap-3 text-xl font-semibold">
                <Navigation size={24} aria-hidden="true" className="text-ember-deep" /> How to reach
              </h3>
              <ul className="mt-6 grid gap-5">
                {d.howToReach.map((r) => {
                  const RIcon = reachIcons[r.mode] ?? Navigation;
                  return (
                    <li key={r.mode} className="flex gap-4">
                      <span className="grid size-11 shrink-0 place-items-center rounded-full bg-saffron-wash text-ember-deep">
                        <RIcon size={20} aria-hidden="true" />
                      </span>
                      <div>
                        <p className="font-semibold text-ink">{r.mode}</p>
                        <p className="mt-1 text-[0.95rem] leading-relaxed text-stone">{r.text}</p>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Packages */}
      <section aria-labelledby="pkg-title" className="py-16 lg:py-24">
        <div className="container-x">
          <SectionHeading id="pkg-title" eyebrow="Suggested packages" title={`Trips that include ${d.name}`} lede="Every package is private and can be adjusted to your dates and pace." />
          <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {pkgs.map((p) => (
              <li key={p.slug} className="reveal">
                <PackageCard pkg={p} />
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* FAQs */}
      <section aria-labelledby="dfaq-title" className="bg-white py-16 lg:py-24">
        <div className="container-x grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionHeading id="dfaq-title" eyebrow="FAQ" title={`${d.name}: common questions`} />
          <FaqList items={d.faqs} />
        </div>
      </section>

      <FinalCta title={`Plan your ${d.name} yatra`} />

      <JsonLd
        data={[
          webPageSchema({ path, name: d.metaTitle, description: d.metaDescription }),
          breadcrumbSchema(crumbs),
          destinationSchema(d, hero, path),
          faqSchema(d.faqs),
        ]}
      />
    </>
  );
}
