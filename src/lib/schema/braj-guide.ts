import type { BrajGuide, GuidePlace } from "@/content/braj/types";
import { photos } from "@/content/images";
import { plainText } from "@/lib/rich-text";
import { absoluteUrl } from "@/lib/seo";
import { faqSchema } from "./index";
import { NODE_IDS, ref, startingOfferNode, type Json } from "./nodes";

/** Visible breadcrumb on a guide (kept in sync with the BreadcrumbList below). */
export const guideCrumbs = (g: BrajGuide) => [
  { name: "Home", href: "/" },
  { name: g.name, href: g.path },
];

/** The schema.org type for each stop: lakes, ghats and hills are plain attractions. */
const TEMPLE = /temple|mandir|bhavan|bhawan|ladli/i;

function placeNode(g: BrajGuide, p: GuidePlace): Json {
  return {
    "@type": TEMPLE.test(p.name) ? ["HinduTemple", "TouristAttraction"] : "TouristAttraction",
    name: p.name,
    description: plainText(p.paragraphs[0]).replace(/^(Spiritual significance|Significance):\s*/, ""),
    ...(p.image ? { image: absoluteUrl(photos[p.image].src.src) } : {}),
    url: absoluteUrl(p.href ?? `${g.path}#${p.id}`),
    address: { "@type": "PostalAddress", addressLocality: g.name, addressRegion: "Uttar Pradesh", addressCountry: "IN" },
  };
}

/**
 * Page-level graph. The TravelAgency, Organization and founder nodes come from <SiteSchema> on every
 * public page, so they are referenced by @id here and never defined twice.
 */
function guideGraph(g: BrajGuide): Json {
  const url = absoluteUrl(g.path);
  const ids = { webpage: `${url}#webpage`, breadcrumb: `${url}#breadcrumb`, destination: `${url}#destination`, primaryImage: `${url}#primary-image`, offer: `${url}#starting-offer` };
  const hero = photos[g.hero.image];
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": ids.webpage,
        url,
        name: g.meta.title,
        description: g.meta.description,
        inLanguage: "en-IN",
        isPartOf: ref(NODE_IDS.website),
        about: ref(ids.destination),
        mainEntity: ref(ids.destination),
        primaryImageOfPage: ref(ids.primaryImage),
        breadcrumb: ref(ids.breadcrumb),
        author: ref(NODE_IDS.founder),
        publisher: ref(NODE_IDS.business),
        dateModified: g.updated,
        mentions: ref(ids.offer),
      },
      {
        "@type": "BreadcrumbList",
        "@id": ids.breadcrumb,
        itemListElement: guideCrumbs(g).map((c, i) => ({ "@type": "ListItem", position: i + 1, name: c.name, item: absoluteUrl(c.href) })),
      },
      {
        "@type": "ImageObject",
        "@id": ids.primaryImage,
        url: absoluteUrl(hero.src.src),
        contentUrl: absoluteUrl(hero.src.src),
        width: hero.src.width,
        height: hero.src.height,
        caption: g.meta.imageAlt,
        creditText: hero.credit.author,
      },
      {
        "@type": ["Place", "TouristDestination"],
        "@id": ids.destination,
        name: g.name,
        description: g.meta.description,
        url,
        image: ref(ids.primaryImage),
        geo: { "@type": "GeoCoordinates", ...g.geo },
        address: { "@type": "PostalAddress", addressLocality: g.name, addressRegion: "Uttar Pradesh", addressCountry: "IN" },
        containedInPlace: { "@type": "State", name: "Uttar Pradesh", containedInPlace: { "@type": "Country", name: "India" } },
        touristType: ["Pilgrims", "Families", "Senior travellers"],
        includesAttraction: g.places.items.map((p) => placeNode(g, p)),
      },
      startingOfferNode(ids.offer, absoluteUrl("/tour-packages")),
    ],
  };
}

/** Every JSON-LD block for a guide. FAQPage stays a top-level block, as scripts/check-schema.mjs expects. */
export function brajGuideSchema(g: BrajGuide): (Json | undefined)[] {
  return [guideGraph(g), faqSchema(g.faqs)];
}
