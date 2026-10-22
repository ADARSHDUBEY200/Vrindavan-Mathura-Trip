import { notFound } from "next/navigation";
import { CalendarDays, Check, Info, MapPin, Minus, Sparkles, Users, Wallet } from "lucide-react";
import { PackageCard } from "@/components/cards/PackageCard";
import { EnquiryForm } from "@/components/forms/EnquiryForm";
import { PageHero } from "@/components/layout/PageHero";
import { JsonLd } from "@/components/seo/JsonLd";
import { Lotus } from "@/components/svg/Ornaments";
import { EnquiryButtons } from "@/components/ui/EnquiryButtons";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { photos } from "@/content/images";
import { formatPrice, getPackage, getPackages, packages } from "@/content/packages";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbSchema, tripSchema, webPageSchema } from "@/lib/schema";
import { packageWhatsappMessage } from "@/lib/whatsapp";

export function generateStaticParams() {
  return packages.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/tour-packages/[slug]">) {
  const { slug } = await params;
  const p = getPackage(slug);
  if (!p) return {};
  return buildMetadata({
    title: `${p.title} — Itinerary`,
    description: `${p.duration} private trip: ${p.summary}`.slice(0, 300),
    path: `/tour-packages/${p.slug}`,
    image: photos[p.image].src,
  });
}

export default async function PackagePage({ params }: PageProps<"/tour-packages/[slug]">) {
  const { slug } = await params;
  const p = getPackage(slug);
  if (!p) notFound();

  const path = `/tour-packages/${p.slug}`;
  const img = photos[p.image];
  const crumbs = [
    { name: "Home", href: "/" },
    { name: "Tour Packages", href: "/tour-packages" },
    { name: p.title, href: path },
  ];
  const related = getPackages(p.related);

  return (
    <>
      <PageHero
        eyebrow={`Tour package · ${p.duration}`}
        title={p.title}
        lede={p.summary}
        crumbs={crumbs}
        image={img}
        meta={
          <ul className="flex flex-wrap gap-2 text-sm">
            <li className="tag">
              <CalendarDays size={14} aria-hidden="true" /> {p.duration}
            </li>
            <li className="tag">
              <MapPin size={14} aria-hidden="true" /> Starts from {p.startsFrom}
            </li>
            <li className="tag">
              <Wallet size={14} aria-hidden="true" /> {formatPrice(p)}
            </li>
          </ul>
        }
      >
        <EnquiryButtons message={packageWhatsappMessage(p.title)} />
      </PageHero>

      <div className="container-x grid gap-14 py-14 lg:grid-cols-[1.3fr_0.7fr] lg:py-20">
        <div className="min-w-0">
          {/* Highlights */}
          <section aria-labelledby="highlights-title">
            <h2 id="highlights-title" className="display-3 flex items-center gap-3">
              <Sparkles size={24} aria-hidden="true" className="text-ember-deep" /> Highlights
            </h2>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {p.highlights.map((h) => (
                <li key={h} className="flex gap-3 rounded-2xl border border-line bg-white p-4 text-[0.95rem] text-ink-soft">
                  <Lotus className="mt-0.5 w-6 shrink-0 text-saffron" />
                  {h}
                </li>
              ))}
            </ul>
          </section>

          {/* Itinerary timeline */}
          <section aria-labelledby="itinerary-title" className="mt-16">
            <h2 id="itinerary-title" className="display-3">
              Day-by-day itinerary
            </h2>
            <ol className="relative mt-8 border-l-2 border-dashed border-saffron-soft pl-8 sm:pl-10">
              {p.itinerary.map((d, i) => (
                <li key={d.day + d.title} className="relative pb-10 last:pb-0">
                  <span className="absolute -left-[2.6rem] top-0 grid size-9 place-items-center rounded-full bg-linear-to-br from-saffron to-gold text-xs font-bold text-ink shadow-glow sm:-left-[3.1rem] sm:size-10" aria-hidden="true">
                    {i + 1}
                  </span>
                  <p className="text-sm font-semibold uppercase tracking-[0.14em] text-ember-deep">{d.day}</p>
                  <h3 className="mt-1 text-lg font-semibold">{d.title}</h3>
                  <p className="mt-2 leading-relaxed text-stone">{d.text}</p>
                  {d.stops && d.stops.length > 0 && (
                    <ul className="mt-3 flex flex-wrap gap-2" aria-label="Stops">
                      {d.stops.map((s) => (
                        <li key={s} className="rounded-full border border-line bg-white px-3 py-1 text-xs font-medium text-ink-soft">
                          {s}
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ol>
          </section>

          {/* Inclusions & exclusions */}
          <section aria-labelledby="incl-title" className="mt-16">
            <h2 id="incl-title" className="display-3">
              What’s included
            </h2>
            <div className="mt-6 grid gap-5 md:grid-cols-2">
              <div className="surface p-6">
                <h3 className="font-semibold text-peacock-teal">Typically included</h3>
                <ul className="mt-4 grid gap-3 text-[0.95rem] text-ink-soft">
                  {p.inclusions.map((x) => (
                    <li key={x} className="flex gap-3">
                      <Check size={18} aria-hidden="true" className="mt-0.5 shrink-0 text-peacock-teal" />
                      {x}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="surface p-6">
                <h3 className="font-semibold text-ember-deep">Not included</h3>
                <ul className="mt-4 grid gap-3 text-[0.95rem] text-ink-soft">
                  {p.exclusions.map((x) => (
                    <li key={x} className="flex gap-3">
                      <Minus size={18} aria-hidden="true" className="mt-0.5 shrink-0 text-ember-deep" />
                      {x}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <p className="mt-4 text-sm text-stone">Final inclusions are confirmed in writing in your quote.</p>
          </section>

          {/* Notes + ideal for */}
          <section aria-labelledby="notes-title" className="mt-16 grid gap-5 md:grid-cols-2">
            <div className="rounded-card border border-saffron-soft bg-saffron-wash p-6">
              <h2 id="notes-title" className="flex items-center gap-2 font-semibold">
                <Info size={18} aria-hidden="true" className="text-ember-deep" /> Good to know
              </h2>
              <ul className="mt-4 grid gap-3 text-[0.95rem] leading-relaxed text-ink-soft">
                {p.notes.map((n) => (
                  <li key={n}>{n}</li>
                ))}
              </ul>
            </div>
            <div className="rounded-card border border-line bg-white p-6">
              <h2 className="flex items-center gap-2 font-semibold">
                <Users size={18} aria-hidden="true" className="text-ember-deep" /> Ideal for
              </h2>
              <ul className="mt-4 flex flex-wrap gap-2">
                {p.idealFor.map((n) => (
                  <li key={n} className="tag">
                    {n}
                  </li>
                ))}
              </ul>
            </div>
          </section>
        </div>

        <aside className="lg:sticky lg:top-28 lg:self-start" aria-label="Enquire about this trip">
          <div className="surface mb-6 p-6">
            <p className="text-sm text-stone">Price</p>
            <p className="mt-1 text-2xl font-bold">{formatPrice(p)}</p>
            <p className="mt-2 text-sm leading-relaxed text-stone">Depends on dates, group size, vehicle and hotels — we send an itemised quote.</p>
            <EnquiryButtons message={packageWhatsappMessage(p.title)} size="sm" className="mt-5" showPhone fallbackHref="#enquire" />
          </div>
          <div id="enquire">
            <EnquiryForm defaultPackage={p.title} title="Enquire about this trip" compact />
          </div>
        </aside>
      </div>

      <section aria-labelledby="related-title" className="bg-cream py-16 lg:py-24">
        <div className="container-x">
          <SectionHeading id="related-title" eyebrow="You may also like" title="Related trips" />
          <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((r) => (
              <li key={r.slug}>
                <PackageCard pkg={r} />
              </li>
            ))}
          </ul>
        </div>
      </section>

      <JsonLd data={[webPageSchema({ path, name: p.title, description: p.summary }), breadcrumbSchema(crumbs), tripSchema(p, img, path)]} />
    </>
  );
}
