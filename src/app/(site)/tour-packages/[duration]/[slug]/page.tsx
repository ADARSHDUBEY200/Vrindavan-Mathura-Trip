import { notFound, permanentRedirect } from "next/navigation";
import { EnquiryForm } from "@/components/forms/EnquiryForm";
import { JsonLd } from "@/components/seo/JsonLd";
import { FaqAccordion } from "@/components/tour-packages/ArchiveSections";
import { PackageHero } from "@/components/tour-packages/PackageHero";
import {
  BookingCta,
  DayStrip,
  FactTiles,
  GroundTruth,
  GuideCard,
  Highlights,
  HowToReach,
  IncludedBadges,
  InclusionsExclusions,
  Itinerary,
  JourneyRoute,
  KnowBeforeYouGo,
  Overview,
  Policies,
  QuickAnswer,
  QuickNavigation,
  Recommendations,
  RelatedPackages,
  Reviews,
  SeniorGuide,
  Timings,
  TrustSection,
} from "@/components/tour-packages/PackageSections";
import { getPublishedPackage } from "@/lib/cms/package-detail";
import { PACKAGES_PATH, durationLabel } from "@/lib/cms/package-fields";
import { getPublishedPackages, toCatalog } from "@/lib/cms/packages";
import { getTourPackagesContent } from "@/lib/cms/site-pages";
import { breadcrumbSchema, faqSchema, packageTripSchema, packageVideoSchema, webPageSchema } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";

/**
 * Packages published after a build have no prerendered page. Rendering them on request (instead of streaming
 * behind Suspense) keeps full SEO tags in the HTML, a real 404 for removed slugs and a real redirect for moved ones.
 */
export const instant = false;

/** Placeholder used when no package is published yet: Cache Components needs at least one param at build time. */
const PLACEHOLDER = "__no-published-packages__";

export async function generateStaticParams() {
  const packages = await getPublishedPackages();
  return packages.length ? packages.map((p) => ({ duration: p.segment, slug: p.slug })) : [{ duration: PLACEHOLDER, slug: PLACEHOLDER }];
}

export async function generateMetadata({ params }: PageProps<"/tour-packages/[duration]/[slug]">) {
  const { slug } = await params;
  const p = slug === PLACEHOLDER ? null : await getPublishedPackage(slug);
  if (!p) return { title: "Package not found", robots: { index: false } };
  return buildMetadata({
    title: p.metaTitle,
    description: p.metaDescription,
    path: p.path,
    image: p.hero ? { src: p.hero.src } : undefined,
    imageAlt: p.hero?.alt,
    absoluteTitle: true,
    largeImagePreview: true,
  });
}

export default async function PackagePage({ params }: PageProps<"/tour-packages/[duration]/[slug]">) {
  const { duration, slug } = await params;
  if (slug === PLACEHOLDER) notFound();
  const [p, content, cms] = await Promise.all([getPublishedPackage(slug), getTourPackagesContent(), getPublishedPackages()]);
  if (!p) notFound();
  // The duration changed in the CMS: keep old links working and one canonical URL.
  if (duration !== p.segment) permanentRedirect(p.path);

  const defaults = content.packageDefaults;
  const { perks, idealFor } = content.packagesSection;
  const crumbs = [
    { name: "Home", href: "/" },
    { name: "Packages", href: PACKAGES_PATH },
    { name: durationLabel(p.days)?.replace(/ \/.*$/, "") ?? "Package", href: `${PACKAGES_PATH}/${p.segment}` },
    { name: p.title, href: p.path },
  ];
  // Same length first; "from <city>" copies of a trip last.
  const others = toCatalog(cms).filter((x) => x.slug !== p.slug);
  const score = (x: (typeof others)[number]) => (x.days === p.days ? 0 : 2) + (/\bfrom\b/i.test(x.title) ? 1 : 0);
  const related = others.toSorted((a, b) => score(a) - score(b)).slice(0, 3);

  return (
    <div className="about-palette">
      <PackageHero p={p} crumbs={crumbs} />

      <div className="container-x grid gap-8 py-8 lg:grid-cols-[minmax(0,1fr)_21rem] lg:gap-10 lg:py-10">
        <div className="min-w-0 space-y-9">
          <QuickNavigation p={p} />
          <QuickAnswer p={p} />
          <FactTiles p={p} />
          <DayStrip p={p} />
          <IncludedBadges p={p} />
          <JourneyRoute p={p} />
          <Overview p={p} />
          <Highlights p={p} />
          <Timings p={p} defaults={defaults} />
          <GuideCard p={p} defaults={defaults} />
          <Itinerary p={p} />
          <SeniorGuide p={p} />
          <HowToReach p={p} defaults={defaults} />
          <InclusionsExclusions p={p} />
          <GroundTruth p={p} />
        </div>

        <aside id="enquire" aria-label="Enquire about this package" className="scroll-mt-24 lg:sticky lg:top-24 lg:self-start">
          <EnquiryForm defaultPackage={p.title} title="Enquire About This Package" compact />
        </aside>
      </div>

      <BookingCta p={p} defaults={defaults} />
      <Recommendations p={p} />
      <KnowBeforeYouGo p={p} />
      <Reviews p={p} />
      <TrustSection defaults={defaults} />
      {p.faqs.length > 0 && <FaqAccordion items={p.faqs} title="Frequently Asked Questions" eyebrow="Need Help?" />}
      <Policies p={p} />
      <RelatedPackages items={related} perks={perks} idealFor={idealFor} />

      <JsonLd
        data={[
          webPageSchema({ path: p.path, name: p.schemaTitle, description: p.schemaDescription }),
          breadcrumbSchema(crumbs),
          packageTripSchema(p),
          packageVideoSchema(p),
          faqSchema(p.faqs),
        ]}
      />
    </div>
  );
}
