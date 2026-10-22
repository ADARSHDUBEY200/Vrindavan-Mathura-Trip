import Link from "next/link";
import { notFound } from "next/navigation";
import { Clock3, RefreshCw } from "lucide-react";
import { GuideCard } from "@/components/cards/GuideCard";
import { PackageCard } from "@/components/cards/PackageCard";
import { EnquiryForm } from "@/components/forms/EnquiryForm";
import { FinalCta } from "@/components/home/Sections";
import { PageHero } from "@/components/layout/PageHero";
import { JsonLd } from "@/components/seo/JsonLd";
import { FaqList } from "@/components/ui/FaqList";
import { RichText, slugify } from "@/components/ui/RichText";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getGuide, guides } from "@/content/guides";
import { photos } from "@/content/images";
import { getPackages } from "@/content/packages";
import { buildMetadata } from "@/lib/seo";
import { articleSchema, breadcrumbSchema, faqSchema } from "@/lib/schema";

export function generateStaticParams() {
  return guides.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: PageProps<"/travel-guide/[slug]">) {
  const { slug } = await params;
  const g = getGuide(slug);
  if (!g) return {};
  return buildMetadata({ title: g.title, description: g.description, path: `/travel-guide/${g.slug}`, image: photos[g.image].src, type: "article" });
}

function formatDate(iso: string) {
  return new Intl.DateTimeFormat("en-IN", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" }).format(new Date(`${iso}T00:00:00Z`));
}

export default async function GuidePage({ params }: PageProps<"/travel-guide/[slug]">) {
  const { slug } = await params;
  const g = getGuide(slug);
  if (!g) notFound();

  const path = `/travel-guide/${g.slug}`;
  const img = photos[g.image];
  const crumbs = [
    { name: "Home", href: "/" },
    { name: "Travel Guide", href: "/travel-guide" },
    { name: g.title, href: path },
  ];
  const pkgs = getPackages(g.relatedPackages ?? []);
  const more = guides.filter((x) => x.slug !== g.slug).slice(0, 3);

  return (
    <>
      <PageHero
        eyebrow={`Travel guide · ${g.category}`}
        title={g.title}
        lede={g.excerpt}
        crumbs={crumbs}
        image={img}
        meta={
          <p className="flex flex-wrap gap-x-5 gap-y-1 text-sm text-stone">
            <span className="inline-flex items-center gap-1.5">
              <Clock3 size={15} aria-hidden="true" className="text-ember-deep" /> {g.readMinutes} min read
            </span>
            <span className="inline-flex items-center gap-1.5">
              <RefreshCw size={15} aria-hidden="true" className="text-ember-deep" /> Updated <time dateTime={g.updated}>{formatDate(g.updated)}</time>
            </span>
          </p>
        }
      />

      <div className="container-x grid gap-12 py-14 lg:grid-cols-[0.3fr_1fr_0.45fr] lg:py-20">
        <nav aria-labelledby="toc-title" className="hidden lg:sticky lg:top-28 lg:block lg:self-start">
          <h2 id="toc-title" className="text-xs font-semibold uppercase tracking-[0.16em] text-ember-deep">
            On this page
          </h2>
          <ol className="mt-4 grid gap-2 border-l border-line text-sm">
            {g.sections.map((s) => (
              <li key={s.heading}>
                <a href={`#${slugify(s.heading)}`} className="-ml-px block border-l-2 border-transparent py-1 pl-4 text-stone hover:border-saffron hover:text-ink">
                  {s.heading}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        <article className="min-w-0">
          <RichText sections={g.sections} className="[&>section:first-child>h2]:mt-0" />
          {g.faqs && g.faqs.length > 0 && (
            <section aria-labelledby="gfaq-title" className="mt-14">
              <h2 id="gfaq-title" className="display-3 mb-6">
                Frequently asked
              </h2>
              <FaqList items={g.faqs} />
            </section>
          )}
          <p className="mt-12 text-sm text-stone">
            Timings, distances and festival dates in this guide are indicative and change over time. <Link href="/contact" className="font-medium text-ember-deep underline underline-offset-2">Ask us</Link> for current details before you travel.
          </p>
        </article>

        <aside className="lg:sticky lg:top-28 lg:self-start" aria-label="Plan your trip">
          <EnquiryForm title="Need help planning?" compact />
        </aside>
      </div>

      {pkgs.length > 0 && (
        <section aria-labelledby="gpkg-title" className="bg-cream py-16 lg:py-24">
          <div className="container-x">
            <SectionHeading id="gpkg-title" eyebrow="Trips that fit" title="Suggested packages" />
            <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {pkgs.map((p) => (
                <li key={p.slug}>
                  <PackageCard pkg={p} />
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <section aria-labelledby="more-title" className="py-16 lg:py-24">
        <div className="container-x">
          <SectionHeading id="more-title" eyebrow="Keep reading" title="More travel guides" />
          <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {more.map((m) => (
              <li key={m.slug}>
                <GuideCard guide={m} />
              </li>
            ))}
          </ul>
        </div>
      </section>

      <FinalCta />

      <JsonLd data={[articleSchema(g, img, path), breadcrumbSchema(crumbs), g.faqs ? faqSchema(g.faqs) : undefined]} />
    </>
  );
}
