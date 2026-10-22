import { GuideCard } from "@/components/cards/GuideCard";
import { FinalCta } from "@/components/home/Sections";
import { PageHero } from "@/components/layout/PageHero";
import { JsonLd } from "@/components/seo/JsonLd";
import { guides } from "@/content/guides";
import { photos } from "@/content/images";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbSchema, itemListSchema, webPageSchema } from "@/lib/schema";

const title = "Vrindavan & Mathura Travel Guide";
const description =
  "Practical travel guides for Vrindavan, Mathura and Braj: best time to visit, how many days you need, how to reach from Delhi and Agra, temple timings, where to stay, Govardhan Parikrama and tips for seniors.";
const crumbs = [
  { name: "Home", href: "/" },
  { name: "Travel Guide", href: "/travel-guide" },
];

export const metadata = buildMetadata({ title, description, path: "/travel-guide", image: photos["keshi-ghat"].src });

export default function GuidesPage() {
  return (
    <>
      <PageHero
        eyebrow="Travel guide"
        title="Plan your Braj yatra with confidence"
        lede="Honest, practical guides to seasons, routes, darshan rhythm and getting around — written to help you spend more of your trip in devotion and less in logistics."
        crumbs={crumbs}
        image={photos["yamuna-vrindavan"]}
      />
      <section aria-labelledby="list-title" className="pb-20 pt-6 lg:pb-28">
        <div className="container-x">
          <h2 id="list-title" className="sr-only">
            All travel guides
          </h2>
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {guides.map((g) => (
              <li key={g.slug} className="reveal">
                <GuideCard guide={g} />
              </li>
            ))}
          </ul>
        </div>
      </section>
      <FinalCta />
      <JsonLd
        data={[
          webPageSchema({ path: "/travel-guide", name: title, description }),
          breadcrumbSchema(crumbs),
          itemListSchema(title, guides.map((g) => ({ name: g.title, href: `/travel-guide/${g.slug}` }))),
        ]}
      />
    </>
  );
}
