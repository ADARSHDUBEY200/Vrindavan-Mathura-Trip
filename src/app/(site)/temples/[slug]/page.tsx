import Link from "next/link";
import { notFound } from "next/navigation";
import { AlertTriangle, ExternalLink, Lightbulb, MapPin, Shirt, Sun } from "lucide-react";
import { TempleCard } from "@/components/cards/TempleCard";
import { FinalCta } from "@/components/home/Sections";
import { PageHero } from "@/components/layout/PageHero";
import { JsonLd } from "@/components/seo/JsonLd";
import { EnquiryButtons } from "@/components/ui/EnquiryButtons";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { photos } from "@/content/images";
import { TIMING_DISCLAIMER, getTemple, getTemples, temples } from "@/content/temples";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbSchema, templeSchema, webPageSchema } from "@/lib/schema";

const townPage: Record<string, string> = {
  Vrindavan: "/vrindavan",
  Mathura: "/mathura",
  Govardhan: "/govardhan-barsana",
  Barsana: "/govardhan-barsana",
  Nandgaon: "/govardhan-barsana",
  Gokul: "/braj-yatra",
  Baldeo: "/braj-yatra",
};

export function generateStaticParams() {
  return temples.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: PageProps<"/temples/[slug]">) {
  const { slug } = await params;
  const t = getTemple(slug);
  if (!t) return {};
  return buildMetadata({
    title: `${t.name}, ${t.town} — Timings & Guide`,
    description: `${t.summary} Approximate darshan timings, dress code, history and visiting tips.`,
    path: `/temples/${t.slug}`,
    image: photos[t.image].src,
  });
}

export default async function TemplePage({ params }: PageProps<"/temples/[slug]">) {
  const { slug } = await params;
  const t = getTemple(slug);
  if (!t) notFound();

  const path = `/temples/${t.slug}`;
  const img = photos[t.image];
  const crumbs = [
    { name: "Home", href: "/" },
    { name: "Temples", href: "/temples" },
    { name: t.name, href: path },
  ];
  const nearby = getTemples(t.nearby);
  const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(t.mapQuery)}`;

  return (
    <>
      <PageHero
        eyebrow={`Temple · ${t.town}`}
        title={t.name}
        lede={t.summary}
        crumbs={crumbs}
        image={img}
        meta={
          <p className="inline-flex items-center gap-2 text-sm text-stone">
            <MapPin size={16} aria-hidden="true" className="text-ember-deep" />
            <span>
              <Link href={townPage[t.town]} className="underline-offset-4 hover:underline">
                {t.town}
              </Link>
              {", Uttar Pradesh"}
            </span>
          </p>
        }
      >
        <EnquiryButtons message={`Radhe Radhe! I'd like to plan a visit to ${t.name}.`} />
      </PageHero>

      <div className="container-x grid gap-12 py-14 lg:grid-cols-[1.25fr_0.75fr] lg:py-20">
        <div>
          <section aria-labelledby="history-title" className="prose-travel">
            <h2 id="history-title" className="mt-0!">
              History & significance
            </h2>
            {t.history.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </section>

          <section aria-labelledby="tips-title" className="prose-travel mt-12">
            <h2 id="tips-title">Tips for your visit</h2>
            <ul>
              {t.tips.map((tip) => (
                <li key={tip}>{tip}</li>
              ))}
            </ul>
            {t.goodToKnow && (
              <p className="callout flex gap-3">
                <Lightbulb size={20} aria-hidden="true" className="mt-1 shrink-0 text-ember-deep" />
                <span>{t.goodToKnow}</span>
              </p>
            )}
          </section>
        </div>

        <aside className="grid content-start gap-6 lg:sticky lg:top-28 lg:self-start" aria-label="Visiting information">
          <section aria-labelledby="timings-title" className="surface p-6">
            <h2 id="timings-title" className="flex items-center gap-2.5 text-lg font-semibold">
              <Sun size={20} aria-hidden="true" className="text-ember-deep" /> Darshan timings
            </h2>
            <div className="mt-4 grid gap-4">
              {t.timings.map((s) => (
                <div key={s.season}>
                  <p className="text-sm font-semibold text-ink">{s.season}</p>
                  <dl className="mt-2 grid gap-1.5 text-[0.95rem]">
                    {s.windows.map((w) => (
                      <div key={w.label} className="flex justify-between gap-4 rounded-xl bg-cream px-3 py-2">
                        <dt className="text-stone">{w.label}</dt>
                        <dd className="text-right font-medium text-ink">{w.time}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              ))}
            </div>
            <p className="mt-4 flex gap-2 text-xs leading-relaxed text-stone">
              <AlertTriangle size={15} aria-hidden="true" className="mt-0.5 shrink-0 text-ember-deep" />
              <span>
                <strong className="text-ink-soft">Subject to change.</strong> {TIMING_DISCLAIMER}
              </span>
            </p>
          </section>

          <section aria-labelledby="dress-title" className="surface p-6">
            <h2 id="dress-title" className="flex items-center gap-2.5 text-lg font-semibold">
              <Shirt size={20} aria-hidden="true" className="text-ember-deep" /> Dress code
            </h2>
            <p className="mt-3 text-[0.95rem] leading-relaxed text-stone">{t.dressCode}</p>
          </section>

          <a href={mapUrl} target="_blank" rel="noopener noreferrer" className="btn btn-dark w-full">
            <MapPin size={18} aria-hidden="true" /> Open in Google Maps
            <ExternalLink size={16} aria-hidden="true" />
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        </aside>
      </div>

      {nearby.length > 0 && (
        <section aria-labelledby="nearby-title" className="bg-white py-16 lg:py-24">
          <div className="container-x">
            <SectionHeading id="nearby-title" eyebrow="Nearby" title="Temples close by" />
            <ul className="mt-12 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
              {nearby.map((n) => (
                <li key={n.slug}>
                  <TempleCard temple={n} />
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <FinalCta title={`Visit ${t.name} with us`} />

      <JsonLd data={[webPageSchema({ path, name: t.name, description: t.summary }), breadcrumbSchema(crumbs), templeSchema(t, img, path)]} />
    </>
  );
}
