import "@/components/temples/temples.css";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/seo/JsonLd";
import { TempleBody, TempleHero } from "@/components/temples/TempleDetail";
import { TEMPLES_PATH } from "@/lib/cms/temple-fields";
import { getPublishedTemple, getPublishedTemples, pickTemples } from "@/lib/cms/temples";
import { breadcrumbSchema, faqSchema, templePlaceSchema, webPageSchema } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";

/**
 * Temples published after a build have no prerendered page. Rendering them on request (instead of streaming
 * behind Suspense) keeps full SEO tags in the HTML and a real 404 status for draft or deleted slugs.
 */
export const instant = false;

export async function generateStaticParams() {
  const temples = await getPublishedTemples();
  return temples.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: PageProps<"/temples/[slug]">) {
  const { slug } = await params;
  const t = await getPublishedTemple(slug);
  if (!t) return { title: "Temple not found", robots: { index: false } };
  return buildMetadata({
    title: t.metaTitle,
    description: t.metaDescription,
    path: t.path,
    image: t.image ? { src: t.image.url } : undefined,
    imageAlt: t.image?.alt,
    largeImagePreview: true,
  });
}

export default async function TemplePage({ params }: PageProps<"/temples/[slug]">) {
  const { slug } = await params;
  const [t, all] = await Promise.all([getPublishedTemple(slug), getPublishedTemples()]);
  if (!t) notFound();

  const crumbs = [
    { name: "Home", href: "/" },
    { name: "Temples", href: TEMPLES_PATH },
    { name: t.name, href: t.path },
  ];

  return (
    <div className="tdp">
      <TempleHero t={t} crumbs={crumbs} firstBlock={t.blocks[0] ?? "reach"} />
      <TempleBody t={t} related={pickTemples(all, t.related)} />
      <JsonLd
        data={[
          webPageSchema({ path: t.path, name: t.metaTitle, description: t.metaDescription }),
          breadcrumbSchema(crumbs),
          templePlaceSchema(t),
          t.blocks.includes("faqs") ? faqSchema(t.faqs) : undefined,
        ]}
      />
    </div>
  );
}
