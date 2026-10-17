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
import { JsonLd } from "@/components/seo/JsonLd";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { site } from "@/config/site";
import { homeFaqs } from "@/content/faqs";
import { galleryItems } from "@/content/home";
import { photos } from "@/content/images";
import { buildMetadata } from "@/lib/seo";
import { faqSchema, webPageSchema } from "@/lib/schema";

const title = `${site.name} — Vrindavan & Mathura Pilgrimage Tours`;
const description =
  "Private Vrindavan, Mathura and Braj pilgrimage tours — Banke Bihari, Prem Mandir, Govardhan, Barsana and more. Darshan-first itineraries, private car and WhatsApp support.";

export const metadata = buildMetadata({ title, description, path: "/", absoluteTitle: true, image: photos["prem-mandir-night"].src });

export default function HomePage() {
  const gallery = galleryItems.map((g) => {
    const p = photos[g.image];
    return { src: p.src, alt: p.alt, caption: g.caption, credit: `Photo: ${p.credit.author} (${p.credit.license})` };
  });

  return (
    <>
      <Hero />
      <Destinations />
      <FeaturedPackages />
      <Experiences />
      <TemplesSection />
      <Circuits />
      <FestivalsSection />
      <WhyUs />
      <AboutHighlights />
      <section aria-labelledby="gallery-title" className="bg-white py-14 sm:py-16 lg:py-20">
        <div className="container-x">
          <SectionHeading centerOnMobile id="gallery-title" eyebrow="Gallery" title="Glimpses of Braj" lede="Tap any photo to view it larger. Photo credits are listed on our image credits page." />
          <div className="mt-8 lg:mt-10">
            <Gallery images={gallery} />
          </div>
        </div>
      </section>
      <GuidesSection />
      <Testimonials />
      <ExploreMore />
      <FaqSection />
      <FinalCta />
      <JsonLd data={[webPageSchema({ path: "/", name: title, description }), faqSchema(homeFaqs)]} />
    </>
  );
}
