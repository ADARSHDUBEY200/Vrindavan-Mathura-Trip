import { ArchiveHero, BookSection, ByDuration, Connection, DarshanGuide, FaqAccordion, Food, PackageListing, Parikrama, QuickFacts, RelatedLinks, Stays, Travel } from "@/components/tour-packages/ArchiveSections";
import { JsonLd } from "@/components/seo/JsonLd";
import { tpPackages } from "@/content/tour-packages";
import { getPublishedPackages, matchCatalogPackage, toCatalog } from "@/lib/cms/packages";
import { PACKAGES_PATH } from "@/lib/cms/package-fields";
import { getTourPackagesContent } from "@/lib/cms/site-pages";
import { plainText } from "@/lib/rich-text";
import { breadcrumbSchema, faqSchema, itemListSchema, webPageSchema } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";

const crumbs = [
  { name: "Home", href: "/" },
  { name: "Tour Packages", href: PACKAGES_PATH },
];

export async function generateMetadata() {
  const c = await getTourPackagesContent();
  return {
    ...buildMetadata({ title: c.meta.title, description: c.meta.description, path: PACKAGES_PATH, image: { src: c.images.hero.src }, imageAlt: c.images.hero.alt, absoluteTitle: true, largeImagePreview: true }),
    keywords: c.meta.keywords,
  };
}

export default async function TourPackagesPage() {
  const [c, cms] = await Promise.all([getTourPackagesContent(), getPublishedPackages()]);
  const catalog = toCatalog(cms);
  const show = (section: string) => !c.hidden.includes(section);

  // "View this package" on the summary cards, when a live package matches.
  const links = Object.fromEntries(tpPackages.map((p) => [p.id, matchCatalogPackage(catalog, p.matchWords, p.days)?.path]));
  const faqs = c.faqs.map((f) => ({ q: plainText(f.q), a: plainText(f.a) }));

  return (
    <div className="about-palette">
      <ArchiveHero c={c} crumbs={crumbs} />
      {show("quickFacts") && <QuickFacts c={c} />}
      {show("connection") && <Connection c={c} />}
      {show("listing") && <PackageListing c={c} catalog={catalog} />}
      {show("byDuration") && <ByDuration c={c} links={links} />}
      {show("darshanGuide") && <DarshanGuide c={c} />}
      {show("parikrama") && <Parikrama c={c} />}
      {show("stays") && <Stays c={c} />}
      {show("food") && <Food c={c} />}
      {show("travel") && <Travel c={c} />}
      {show("faqs") && <FaqAccordion items={c.faqs} title={c.faqSection.title} eyebrow={c.faqSection.eyebrow} />}
      {show("relatedLinks") && <RelatedLinks c={c} />}
      <BookSection c={c} updatedOn={c.updatedOn} />

      <JsonLd
        data={[
          webPageSchema({ path: PACKAGES_PATH, name: c.meta.title, description: c.meta.description }),
          breadcrumbSchema(crumbs),
          itemListSchema(c.packagesSection.catalogTitle, catalog.flatMap((p) => (p.path ? [{ name: p.title, href: p.path }] : []))),
          show("faqs") ? faqSchema(faqs) : undefined,
        ]}
      />
    </div>
  );
}
