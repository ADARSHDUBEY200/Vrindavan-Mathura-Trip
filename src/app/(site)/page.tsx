import type { Metadata } from "next";
import { Destinations } from "@/components/home/Destinations";
import { Gallery } from "@/components/home/Gallery";
import { Hero } from "@/components/home/Hero";
import {
  AboutHighlights,
  Circuits,
  Experiences,
  ExploreMore,
  FaqSection,
  FeaturedPackages,
  FestivalsSection,
  FinalCta,
  GuidesSection,
  TemplesSection,
  Testimonials,
  WhyUs,
} from "@/components/home/Sections";
import { BookSection, GuideFaqSection, LastWordsSection } from "@/components/home/pdf/ClosingSections";
import { DarshanGuideSection } from "@/components/home/pdf/DarshanSection";
import { FoodGuideSection, PromiseSection, TravelSection } from "@/components/home/pdf/GuideSections";
import { SignaturePackagesSection, type PackageMatch } from "@/components/home/pdf/PackagesSection";
import { BrajSection, FounderSection, IntroSection } from "@/components/home/pdf/StorySections";
import { JsonLd } from "@/components/seo/JsonLd";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SITE_URL, site } from "@/config/site";
import { homeFaqs } from "@/content/faqs";
import { homeMeta, images, signaturePackages } from "@/content/home";
import { photos } from "@/content/images";
import { galleryItems } from "@/content/sections";
import { getPublishedPackages, matchSignaturePackage, type CmsPackage } from "@/lib/cms/packages";
import { buildHomeSchema } from "@/lib/schema/home";

const ogImage = { url: images.hero.src, width: images.hero.width, height: images.hero.height, alt: images.hero.alt };

export const metadata: Metadata = {
  title: { absolute: homeMeta.title },
  description: homeMeta.description,
  keywords: homeMeta.keywords,
  alternates: { canonical: `${SITE_URL}/` },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
  openGraph: {
    type: "website",
    url: `${SITE_URL}/`,
    siteName: site.name,
    locale: site.locale,
    title: homeMeta.title,
    description: homeMeta.description,
    images: [ogImage],
  },
  twitter: { card: "summary_large_image", title: homeMeta.title, description: homeMeta.description, images: [ogImage] },
};

/** "View package" links for signature tours that match a published CMS package with a live product page. */
function packageMatches(cms: CmsPackage[]) {
  const matches: Partial<Record<(typeof signaturePackages)[number]["id"], PackageMatch>> = {};
  for (const p of signaturePackages) {
    const m = matchSignaturePackage(p.days, cms);
    if (m) matches[p.id] = { path: m.path, title: m.title, price: m.price };
  }
  return matches;
}

/*
 * The original homepage, section for section, with the long-form guide (content/home.ts) woven in.
 * New sections reuse the site's own components and alternate white / cream with their neighbours.
 */
export default async function HomePage() {
  // Cached ("use cache" + cms-packages tag), so the page still prerenders as static HTML.
  const cms = await getPublishedPackages();
  const { graph, faq } = buildHomeSchema(cms, homeFaqs);

  const gallery = galleryItems.map((g) => {
    const p = photos[g.image];
    return { src: p.src, alt: p.alt, caption: g.caption, credit: `Photo: ${p.credit.author} (${p.credit.license})` };
  });

  return (
    <>
      <Hero />
      <IntroSection />
      <Destinations />
      <FounderSection />
      <BrajSection />
      <FeaturedPackages />
      <SignaturePackagesSection matches={packageMatches(cms)} />
      <Experiences />
      <TemplesSection />
      <DarshanGuideSection />
      <Circuits />
      <FestivalsSection />
      <WhyUs />
      <PromiseSection />
      <AboutHighlights />
      <section aria-labelledby="gallery-title" className="bg-white py-14 sm:py-16 lg:py-20">
        <div className="container-x">
          <SectionHeading centerOnMobile id="gallery-title" eyebrow="Gallery" title="Glimpses of Braj" lede="Tap any photo to view it larger. Photo credits are listed on our image credits page." />
          <div className="mt-8 lg:mt-10">
            <Gallery images={gallery} />
          </div>
        </div>
      </section>
      <FoodGuideSection />
      <TravelSection />
      <GuidesSection />
      <Testimonials />
      <ExploreMore />
      <FaqSection />
      <GuideFaqSection />
      <LastWordsSection />
      <BookSection />
      <FinalCta />
      <JsonLd data={[graph, faq]} />
    </>
  );
}
