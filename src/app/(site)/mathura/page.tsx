import { Book, ContinuePlanning, MathuraFaq } from "@/components/mathura/Closing";
import { Experiences } from "@/components/mathura/Experiences";
import { editorial } from "@/components/mathura/fonts";
import { GuideNav } from "@/components/mathura/GuideNav";
import { Glance, Intro, MathuraHero } from "@/components/mathura/Opening";
import { Places } from "@/components/mathura/Places";
import { BestTime, HowToReach, Itineraries, NearMathura, Stay } from "@/components/mathura/Planning";
import "@/components/mathura/mathura.css";
import { JsonLd } from "@/components/seo/JsonLd";
import { devanagari } from "@/components/timings/fonts";
import { photos } from "@/content/images";
import { MATHURA_PATH, guideLinks, mathuraMeta } from "@/content/mathura";
import { buildMetadata } from "@/lib/seo";
import { mathuraSchema } from "@/lib/schema/mathura";

export const metadata = buildMetadata({
  title: mathuraMeta.title,
  description: mathuraMeta.description,
  path: MATHURA_PATH,
  image: photos["vishram-ghat"].src,
  imageAlt: mathuraMeta.imageAlt,
  absoluteTitle: true,
  largeImagePreview: true,
});

export default function Page() {
  return (
    <div className={`mathura-page ${editorial.variable} ${devanagari.variable}`}>
      <MathuraHero />
      <div className="relative">
        <GuideNav links={guideLinks} />
        <Intro />
        <Glance />
        <Places />
        <Experiences />
        <BestTime />
        <HowToReach />
        <Itineraries />
        <NearMathura />
        <Stay />
        <MathuraFaq />
        <ContinuePlanning />
      </div>
      <Book />
      <JsonLd data={mathuraSchema()} />
    </div>
  );
}
