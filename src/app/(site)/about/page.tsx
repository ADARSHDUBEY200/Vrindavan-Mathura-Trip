import { AboutContact, AboutHero, AboutMilestone, AboutPhilosophy, AboutStory, AboutTeam, AboutWhy } from "@/components/about/AboutSections";
import { JsonLd } from "@/components/seo/JsonLd";
import { FOUNDER } from "@/config/site";
import { ABOUT_PATH, aboutImages, aboutMeta } from "@/content/about";
import { buildMetadata } from "@/lib/seo";
import { buildAboutSchema } from "@/lib/schema/about";

const [firstName, ...rest] = FOUNDER.name.split(" ");

export const metadata = buildMetadata({
  title: aboutMeta.title,
  description: aboutMeta.description,
  path: ABOUT_PATH,
  absoluteTitle: true,
  type: "profile",
  profile: { firstName, lastName: rest.join(" ") },
  image: aboutImages.founderOg,
  imageAlt: aboutImages.founderOg.alt,
  largeImagePreview: true,
});

/** A letter from Harsh Sharma — copy from AboutUsContent.pdf, rendered from content/about.ts. */
export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <AboutStory />
      <AboutWhy />
      <AboutPhilosophy />
      <AboutMilestone />
      <AboutTeam />
      <AboutContact />
      {/* The only JSON-LD on this page: SiteSchema skips the global graph on /about (OWN_GRAPH_PATHS). */}
      <JsonLd data={buildAboutSchema()} />
    </>
  );
}
