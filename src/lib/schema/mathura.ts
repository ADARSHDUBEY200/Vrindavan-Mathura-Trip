import { photos, type PhotoKey } from "@/content/images";
import { MATHURA_PATH, MATHURA_UPDATED, mathuraMeta, mathuraFaqs, placeOrder, type Place } from "@/content/mathura";
import { plainText } from "@/lib/rich-text";
import { absoluteUrl } from "@/lib/seo";
import { faqSchema } from "./index";
import { NODE_IDS, ref, startingOfferNode, type Json } from "./nodes";

const PAGE_URL = absoluteUrl(MATHURA_PATH);

const IDS = {
  webpage: `${PAGE_URL}#webpage`,
  breadcrumb: `${PAGE_URL}#breadcrumb`,
  destination: `${PAGE_URL}#destination`,
  primaryImage: `${PAGE_URL}#primary-image`,
  startingOffer: `${PAGE_URL}#starting-offer`,
} as const;

/** Visible breadcrumb on the page (kept in sync with the BreadcrumbList below). */
export const mathuraCrumbs = [
  { name: "Home", href: "/" },
  { name: "Mathura", href: MATHURA_PATH },
];

const imageUrl = (key: PhotoKey) => absoluteUrl(photos[key].src.src);

/** The schema.org type that fits each stop; Vishram Ghat and the fort are plain attractions. */
const PLACE_TYPES: Record<string, string | string[]> = {
  janmasthan: ["HinduTemple", "TouristAttraction"],
  dwarkadhish: ["HinduTemple", "TouristAttraction"],
  museum: ["Museum", "TouristAttraction"],
  "jama-masjid": ["Mosque", "TouristAttraction"],
};

function placeNode(p: Place): Json {
  return {
    "@type": PLACE_TYPES[p.id] ?? "TouristAttraction",
    name: p.name,
    description: plainText(p.history[0]),
    image: imageUrl(p.image),
    url: absoluteUrl(p.href ?? `${MATHURA_PATH}#${p.id}`),
    address: { "@type": "PostalAddress", addressLocality: "Mathura", addressRegion: "Uttar Pradesh", addressCountry: "IN" },
  };
}

/**
 * Page-level graph. The TravelAgency, Organization and founder nodes come from <SiteSchema> on every
 * public page, so they are referenced by @id here and never defined twice.
 */
function mathuraGraph(): Json {
  const webPage = {
    "@type": "WebPage",
    "@id": IDS.webpage,
    url: PAGE_URL,
    name: mathuraMeta.title,
    description: mathuraMeta.description,
    inLanguage: "en-IN",
    isPartOf: ref(NODE_IDS.website),
    about: ref(IDS.destination),
    mainEntity: ref(IDS.destination),
    primaryImageOfPage: ref(IDS.primaryImage),
    breadcrumb: ref(IDS.breadcrumb),
    author: ref(NODE_IDS.founder),
    publisher: ref(NODE_IDS.business),
    dateModified: MATHURA_UPDATED,
    mentions: ref(IDS.startingOffer),
  };

  const breadcrumb = {
    "@type": "BreadcrumbList",
    "@id": IDS.breadcrumb,
    itemListElement: mathuraCrumbs.map((c, i) => ({ "@type": "ListItem", position: i + 1, name: c.name, item: absoluteUrl(c.href) })),
  };

  const primaryImage = {
    "@type": "ImageObject",
    "@id": IDS.primaryImage,
    url: imageUrl("mathura-vishram-ghat-dusk"),
    contentUrl: imageUrl("mathura-vishram-ghat-dusk"),
    width: photos["mathura-vishram-ghat-dusk"].src.width,
    height: photos["mathura-vishram-ghat-dusk"].src.height,
    caption: mathuraMeta.imageAlt,
    creditText: photos["mathura-vishram-ghat-dusk"].credit.author,
  };

  const destination = {
    "@type": ["Place", "TouristDestination"],
    "@id": IDS.destination,
    name: "Mathura",
    description: mathuraMeta.description,
    url: PAGE_URL,
    image: ref(IDS.primaryImage),
    geo: { "@type": "GeoCoordinates", latitude: 27.4924, longitude: 77.6737 },
    address: { "@type": "PostalAddress", addressLocality: "Mathura", addressRegion: "Uttar Pradesh", addressCountry: "IN" },
    containedInPlace: { "@type": "State", name: "Uttar Pradesh", containedInPlace: { "@type": "Country", name: "India" } },
    touristType: ["Pilgrims", "Families", "Senior travellers"],
    includesAttraction: placeOrder.map(placeNode),
  };

  return {
    "@context": "https://schema.org",
    "@graph": [webPage, breadcrumb, primaryImage, destination, startingOfferNode(IDS.startingOffer, absoluteUrl("/tour-packages"))],
  };
}

/** Every JSON-LD block for /mathura. FAQPage stays a top-level block, as scripts/check-schema.mjs expects. */
export function mathuraSchema(): (Json | undefined)[] {
  return [mathuraGraph(), faqSchema(mathuraFaqs)];
}
