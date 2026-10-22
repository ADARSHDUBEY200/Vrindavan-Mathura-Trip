import { site } from "@/config/site";
import {
  LAST_UPDATED,
  areaServed,
  attractions,
  brajBhoomi,
  faqGroups,
  homeMeta,
  images,
  services,
  signaturePackages,
  type AttractionId,
} from "@/content/home";
import { matchSignaturePackage, type CmsPackage } from "@/lib/cms/packages";
import { plainText } from "@/lib/rich-text";
import { absoluteUrl } from "@/lib/seo";
import { NODE_IDS, compact, imageObjectNode, ref, sharedNodes, type Json } from "./nodes";

/*
 * Homepage JSON-LD: one connected @graph (shared site entities + page entities) and a separate FAQPage.
 * Every fact here is visible on the page. Shared nodes come from ./nodes so they are identical site-wide.
 */

const HOME_URL = `${site.url}/`;
const id = (fragment: string) => `${site.url}/#${fragment}`;

export const HOME_IDS = {
  webpage: id("webpage"),
  breadcrumb: id("breadcrumb"),
  heroImage: id("hero-image"),
  founderPhoto: id("home-founder-image"),
  packages: id("packages"),
  braj: id("braj"),
  services: id("services"),
  faq: id("faq"),
} as const;

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
const place = (name: string) => ({ "@type": "Place", name });

/** One Darshan Guide site. Exported so other pages (e.g. /tour-packages) publish byte-identical nodes. */
export function attractionNode(key: AttractionId): Json {
  const a = attractions[key];
  return compact({
    "@type": a.kind === "temple" ? ["HinduTemple", "TouristAttraction"] : "TouristAttraction",
    "@id": id(key),
    name: a.name,
    description: a.description,
    address: { "@type": "PostalAddress", addressLocality: a.locality, addressRegion: "Uttar Pradesh", addressCountry: "IN" },
    // Only the four temples whose timings the guide states. All approximate; seasons noted per row.
    openingHoursSpecification: a.hours?.map((h) => compact({ "@type": "OpeningHoursSpecification", dayOfWeek: DAYS, opens: h.opens, closes: h.closes, description: h.note })),
  });
}

function tripNodes(cms: CmsPackage[]): Json[] {
  return signaturePackages.map((pkg) => {
    const match = matchSignaturePackage(pkg.days, cms);
    const url = match ? absoluteUrl(match.path) : `${HOME_URL}#${pkg.id}`;
    return compact({
      "@type": "TouristTrip",
      "@id": id(pkg.id),
      name: pkg.name,
      description: plainText(pkg.intro),
      url: `${HOME_URL}#${pkg.id}`,
      touristType: ["Pilgrims", "Families", "Senior citizens"],
      itinerary: {
        "@type": "ItemList",
        numberOfItems: pkg.stops.length,
        itemListElement: pkg.stops.map((stop, i) => ({
          "@type": "ListItem",
          position: i + 1,
          item: stop.ref ? ref(id(stop.ref)) : { "@type": "TouristAttraction", name: stop.name },
        })),
      },
      provider: ref(NODE_IDS.business),
      // Price only when the matching CMS package has one (it is then shown on the card).
      offers: compact({
        "@type": "Offer",
        url,
        priceCurrency: "INR",
        price: match?.price ?? undefined,
        availability: "https://schema.org/InStock",
        offeredBy: ref(NODE_IDS.business),
      }),
      subjectOf: match ? { "@type": "WebPage", url: absoluteUrl(match.path), name: match.title } : undefined,
    });
  });
}

function servicesNode(): Json {
  const served = areaServed.map(place);
  return {
    "@type": "Service",
    "@id": HOME_IDS.services,
    name: "Mathura Vrindavan tour packages",
    serviceType: "Pilgrimage tours",
    provider: ref(NODE_IDS.business),
    areaServed: served,
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Mathura Vrindavan Trips services",
      itemListElement: services.map((name) => ({
        "@type": "Offer",
        offeredBy: ref(NODE_IDS.business),
        itemOffered: { "@type": "Service", name, provider: ref(NODE_IDS.business), areaServed: served },
      })),
    },
  };
}

/** Braj Bhoomi destination; every attraction node points to it via containedInPlace. */
export function brajNode(): Json {
  return {
    "@type": "TouristDestination",
    "@id": HOME_IDS.braj,
    name: "Braj Bhoomi — Mathura & Vrindavan",
    description: plainText(brajBhoomi.cards[2].paragraphs[0]).split(/(?<=.)s/)[0],
    // geo omitted: no coordinates are stated on the page.
    containedInPlace: { "@type": "State", name: "Uttar Pradesh", containedInPlace: { "@type": "Country", name: "India" } },
    touristType: ["Pilgrims", "Families", "Senior citizens"],
    includesAttraction: (Object.keys(attractions) as AttractionId[]).map((k) => ref(id(k))),
  };
}

/**
 * @param extraFaqs other Q&As visible on the homepage (the original "Questions pilgrims often ask" list).
 */
export function buildHomeSchema(cmsPackages: CmsPackage[], extraFaqs: { q: string; a: string }[] = []): { graph: Json; faq: Json } {
  const attractionIds = Object.keys(attractions) as AttractionId[];

  const graph: Json[] = [
    ...sharedNodes(),
    {
      "@type": "WebPage",
      "@id": HOME_IDS.webpage,
      url: HOME_URL,
      name: homeMeta.title,
      description: homeMeta.description,
      inLanguage: "en-IN",
      isPartOf: ref(NODE_IDS.website),
      about: ref(NODE_IDS.business),
      primaryImageOfPage: ref(HOME_IDS.heroImage),
      image: [ref(HOME_IDS.heroImage), ref(HOME_IDS.founderPhoto)],
      breadcrumb: ref(HOME_IDS.breadcrumb),
      author: ref(NODE_IDS.founder),
      reviewedBy: ref(NODE_IDS.founder),
      datePublished: LAST_UPDATED,
      dateModified: LAST_UPDATED,
      speakable: { "@type": "SpeakableSpecification", cssSelector: ["#home-intro", ".faq-answer"] },
      mainEntity: ref(HOME_IDS.packages),
    },
    {
      "@type": "BreadcrumbList",
      "@id": HOME_IDS.breadcrumb,
      itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: HOME_URL }],
    },
    imageObjectNode(HOME_IDS.heroImage, images.hero),
    { ...imageObjectNode(HOME_IDS.founderPhoto, images.founder), about: ref(NODE_IDS.founder) },
    {
      "@type": "ItemList",
      "@id": HOME_IDS.packages,
      name: "Signature Mathura Vrindavan Tour Packages",
      numberOfItems: signaturePackages.length,
      itemListElement: signaturePackages.map((p, i) => ({ "@type": "ListItem", position: i + 1, item: ref(id(p.id)) })),
    },
    ...tripNodes(cmsPackages),
    brajNode(),
    ...attractionIds.map(attractionNode),
    servicesNode(),
  ];

  const faq: Json = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": HOME_IDS.faq,
    mainEntityOfPage: ref(HOME_IDS.webpage),
    inLanguage: "en-IN",
    mainEntity: faqGroups
      .flatMap((g) => g.items)
      .concat(extraFaqs.map((f, i) => ({ n: 100 + i, ...f })))
      .map((f) => ({ q: plainText(f.q), a: plainText(f.a) }))
      .filter((f) => f.q && f.a)
      .map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };

  return { graph: { "@context": "https://schema.org", "@graph": graph }, faq };
}
