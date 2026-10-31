import "@/components/vrindavan/vrindavan.css";
import { JsonLd } from "@/components/seo/JsonLd";
import { BookSection, ContinuePlanning, FaqSection } from "@/components/vrindavan/ClosingSections";
import { AartiSection, BazaarSection, FoodSection, HoliSection, ParikramaSection, ThingsToDoIntro } from "@/components/vrindavan/ExperienceSections";
import { eczar } from "@/components/vrindavan/fonts";
import { VrindavanHero, VrindavanIntro, VrindavanWhy } from "@/components/vrindavan/OpeningSections";
import { AlleysSection, BestTimeSection, NearbySection, ReachSection, StaySection, TwoDaysSection } from "@/components/vrindavan/PlanningSections";
import { SectionNav } from "@/components/vrindavan/SectionNav";
import { BankeBihariChapter, BestPlacesIntro, DarshanDay, KeshiGhatChapter, MoreTemples, NidhivanChapter, PremMandirChapter, QuietChapters, VrindavanPictures } from "@/components/vrindavan/TempleSections";
import { photos } from "@/content/images";
import { sectionNav, VRINDAVAN_PATH, vrindavanMeta } from "@/content/vrindavan";
import { buildMetadata } from "@/lib/seo";
import { buildVrindavanSchema } from "@/lib/schema/vrindavan";

const heroPhoto = photos["prem-mandir"];

export const metadata = buildMetadata({
  title: vrindavanMeta.title,
  description: vrindavanMeta.description,
  path: VRINDAVAN_PATH,
  image: heroPhoto.src,
  imageAlt: heroPhoto.alt,
  absoluteTitle: true,
  largeImagePreview: true,
});

/** Vrindavan travel guide: copy from "Vrindavan Content.pdf", rendered from content/vrindavan.ts. */
export default function VrindavanPage() {
  const schema = buildVrindavanSchema();
  return (
    <div className={`vrn ${eczar.variable}`}>
      <VrindavanHero />
      <VrindavanIntro />
      <SectionNav items={sectionNav} />
      <VrindavanWhy />
      <BestPlacesIntro />
      <BankeBihariChapter />
      <PremMandirChapter />
      <NidhivanChapter />
      <QuietChapters />
      <KeshiGhatChapter />
      <MoreTemples />
      <DarshanDay />
      <VrindavanPictures />
      <ThingsToDoIntro />
      <ParikramaSection />
      <HoliSection />
      <AartiSection />
      <FoodSection />
      <BazaarSection />
      <AlleysSection />
      <BestTimeSection />
      <ReachSection />
      <NearbySection />
      <TwoDaysSection />
      <StaySection />
      <FaqSection />
      <BookSection />
      <ContinuePlanning />
      {/* The only JSON-LD on this page: SiteSchema skips the global graph on /vrindavan (OWN_GRAPH_PATHS). */}
      <JsonLd data={[schema.graph, schema.faq]} />
    </div>
  );
}
