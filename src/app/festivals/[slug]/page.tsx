import Link from "next/link";
import { notFound } from "next/navigation";
import { AlertTriangle, ArrowRight, CalendarDays, MapPin } from "lucide-react";
import { PackageCard } from "@/components/cards/PackageCard";
import { FinalCta } from "@/components/home/Sections";
import { PageHero } from "@/components/layout/PageHero";
import { JsonLd } from "@/components/seo/JsonLd";
import { EnquiryButtons } from "@/components/ui/EnquiryButtons";
import { FaqList } from "@/components/ui/FaqList";
import { RichText } from "@/components/ui/RichText";
import { DATE_ADVICE, festivals, getFestival } from "@/content/festivals";
import { photos } from "@/content/images";
import { getPackage } from "@/content/packages";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbSchema, faqSchema, webPageSchema } from "@/lib/schema";

export function generateStaticParams() {
  return festivals.map((f) => ({ slug: f.slug }));
}

export async function generateMetadata({ params }: PageProps<"/festivals/[slug]">) {
  const { slug } = await params;
  const f = getFestival(slug);
  if (!f) return {};
  return buildMetadata({
    title: `${f.name} — Festival Guide`,
    description: `${f.summary} Usually ${f.months}. Tips, places and how to plan your visit.`,
    path: `/festivals/${f.slug}`,
    image: photos[f.image].src,
  });
}

export default async function FestivalPage({ params }: PageProps<"/festivals/[slug]">) {
  const { slug } = await params;
  const f = getFestival(slug);
  if (!f) notFound();

  const path = `/festivals/${f.slug}`;
  const crumbs = [
    { name: "Home", href: "/" },
    { name: "Festivals", href: "/festivals" },
    { name: f.name, href: path },
  ];
  const pkg = f.packageSlug ? getPackage(f.packageSlug) : undefined;
  const others = festivals.filter((x) => x.slug !== f.slug).slice(0, 4);

  return (
    <>
      <PageHero
        eyebrow="Festival guide"
        title={f.name}
        lede={f.summary}
        crumbs={crumbs}
        image={photos[f.image]}
        meta={
          <ul className="flex flex-wrap gap-2">
            <li className="tag">
              <CalendarDays size={14} aria-hidden="true" /> {f.months}
            </li>
            <li className="tag">
              <MapPin size={14} aria-hidden="true" /> {f.places.join(", ")}
            </li>
          </ul>
        }
      >
        <EnquiryButtons message={`Radhe Radhe! I'd like to plan a trip for ${f.name}.`} />
      </PageHero>

      <div className="container-x grid gap-12 py-14 lg:grid-cols-[1.3fr_0.7fr] lg:py-20">
        <div className="min-w-0">
          <p className="flex gap-3 rounded-2xl border border-saffron-soft bg-saffron-wash px-5 py-4 text-sm leading-relaxed text-ink-soft">
            <AlertTriangle size={18} aria-hidden="true" className="mt-0.5 shrink-0 text-ember-deep" />
            <span>
              <strong className="text-ink">Approximate timing: {f.months}.</strong> {DATE_ADVICE}
            </span>
          </p>
          <RichText sections={f.sections} className="mt-4" />
          <section aria-labelledby="tips-title" className="prose-travel">
            <h2 id="tips-title">Tips for festival travellers</h2>
            <ul>
              {f.tips.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          </section>
          {f.faqs.length > 0 && (
            <section aria-labelledby="ffaq-title" className="mt-12">
              <h2 id="ffaq-title" className="display-3 mb-6">
                Questions about {f.name}
              </h2>
              <FaqList items={f.faqs} />
            </section>
          )}
        </div>

        <aside className="grid content-start gap-6 lg:sticky lg:top-28 lg:self-start" aria-label="Related">
          {pkg && (
            <div>
              <p className="eyebrow mb-4">Festival package</p>
              <PackageCard pkg={pkg} />
            </div>
          )}
          <nav aria-labelledby="more-fest" className="surface p-6">
            <h2 id="more-fest" className="font-semibold">
              More festivals
            </h2>
            <ul className="mt-4 grid gap-1">
              {others.map((o) => (
                <li key={o.slug}>
                  <Link href={`/festivals/${o.slug}`} className="flex items-center justify-between gap-3 rounded-xl px-3 py-2.5 hover:bg-cream">
                    <span>
                      <span className="block font-medium text-ink">{o.name}</span>
                      <span className="block text-xs text-stone">{o.months}</span>
                    </span>
                    <ArrowRight size={16} aria-hidden="true" className="shrink-0 text-ember-deep" />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </aside>
      </div>

      <FinalCta title={`Experience ${f.name} in Braj`} />

      <JsonLd data={[webPageSchema({ path, name: f.name, description: f.summary }), breadcrumbSchema(crumbs), faqSchema(f.faqs)]} />
    </>
  );
}
