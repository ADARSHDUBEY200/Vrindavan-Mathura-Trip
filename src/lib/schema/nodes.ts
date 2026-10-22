import {
  BRAND_NAME,
  EMAIL,
  FOUNDED,
  FOUNDER,
  FOUNDER_SAME_AS,
  GEO,
  OPENING_HOURS,
  PHONE_E164,
  PILGRIMS,
  RATING,
  REVIEW_COUNT,
  SAME_AS,
  STARTING_PRICE,
  YEARS,
  formatInr,
  site,
} from "@/config/site";
import { ABOUT_PATH, aboutImages, type AboutImage } from "@/content/about";
import { absoluteUrl } from "@/lib/seo";

/*
 * Shared JSON-LD entities. Every page that describes the business must use these builders so the
 * @ids — and the nodes behind them — are byte-identical site-wide. Different @ids (or different
 * facts under the same @id) make Google treat them as separate businesses.
 */

export type Json = Record<string, unknown>;

export const NODE_IDS = {
  website: `${site.url}/#website`,
  organization: `${site.url}/#organization`,
  business: `${site.url}/#business`,
  founder: `${site.url}/#founder`,
  logo: `${site.url}/#logo`,
  founderImage: `${site.url}/#founder-image`,
  /** Lives on /about; referenced from the founder node as `mainEntityOfPage`. */
  aboutPage: `${absoluteUrl(ABOUT_PATH)}#webpage`,
} as const;

export const ref = (id: string) => ({ "@id": id });

/** Drops undefined/null values and empty arrays. */
export function compact<T extends Json>(obj: T): T {
  return Object.fromEntries(Object.entries(obj).filter(([, v]) => v !== undefined && v !== null && !(Array.isArray(v) && v.length === 0))) as T;
}

const place = (name: string) => ({ "@type": "Place", name });

const AREA_SERVED = ["Mathura", "Vrindavan", "Govardhan", "Barsana", "Gokul", "Nandgaon", "Radha Kund"];


function postalAddress(): Json | undefined {
  const a = site.address;
  // Omitted until a real street/locality is configured (see ADDRESS in config/site.ts).
  if (!a) return undefined;
  return compact({
    "@type": "PostalAddress",
    streetAddress: a.street,
    addressLocality: a.locality,
    addressRegion: a.region,
    postalCode: a.postalCode,
    addressCountry: a.country,
  });
}

export function imageObjectNode(id: string, image: AboutImage): Json {
  return {
    "@type": "ImageObject",
    "@id": id,
    url: absoluteUrl(image.src),
    contentUrl: absoluteUrl(image.src),
    width: image.width,
    height: image.height,
    caption: image.alt,
  };
}

export function webSiteNode(): Json {
  return {
    "@type": "WebSite",
    "@id": NODE_IDS.website,
    url: site.url,
    name: BRAND_NAME,
    inLanguage: "en-IN",
    publisher: ref(NODE_IDS.organization),
  };
}

export function logoNode(): Json {
  return {
    "@type": "ImageObject",
    "@id": NODE_IDS.logo,
    url: absoluteUrl("/icon.svg"),
    contentUrl: absoluteUrl("/icon.svg"),
    width: 512,
    height: 512,
    caption: `${BRAND_NAME} logo`,
  };
}

export function founderImageNode(): Json {
  return imageObjectNode(NODE_IDS.founderImage, aboutImages.founder);
}

export function organizationNode(): Json {
  return compact({
    "@type": "Organization",
    "@id": NODE_IDS.organization,
    name: BRAND_NAME,
    url: site.url,
    description: site.description,
    logo: ref(NODE_IDS.logo),
    image: ref(NODE_IDS.logo),
    email: EMAIL,
    telephone: PHONE_E164,
    foundingDate: FOUNDED,
    foundingLocation: place("Mathura"),
    founder: ref(NODE_IDS.founder),
    slogan: "Seva Over Business",
    knowsLanguage: ["en", "hi"],
    // numberOfEmployees: omitted — not known.
    sameAs: SAME_AS,
  });
}

export function localBusinessNode(): Json {
  const geo = GEO ? { "@type": "GeoCoordinates", latitude: GEO.latitude, longitude: GEO.longitude } : undefined;
  return compact({
    "@type": ["TravelAgency", "LocalBusiness"],
    "@id": NODE_IDS.business,
    name: BRAND_NAME,
    url: site.url,
    description: site.description,
    image: ref(NODE_IDS.logo),
    logo: ref(NODE_IDS.logo),
    telephone: PHONE_E164,
    email: EMAIL,
    parentOrganization: ref(NODE_IDS.organization),
    founder: ref(NODE_IDS.founder),
    address: postalAddress(),
    geo,
    areaServed: AREA_SERVED.map(place),
    // Generic tier only: this node is on every page, but the ₹1,199 starting price is only shown on /about,
    // so the concrete Offer lives in the About graph (offeredBy → #business). See startingOfferNode().
    priceRange: "₹₹",
    // Only with a real, verifiable review count. "75,000+ pilgrims" is not a review count.
    aggregateRating:
      typeof REVIEW_COUNT === "number" && REVIEW_COUNT > 0
        ? { "@type": "AggregateRating", ratingValue: RATING, reviewCount: REVIEW_COUNT, bestRating: 5, worstRating: 1 }
        : undefined,
    openingHoursSpecification: OPENING_HOURS
      ? {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
          opens: OPENING_HOURS.opens,
          closes: OPENING_HOURS.closes,
        }
      : undefined,
    sameAs: SAME_AS,
  });
}

export function founderNode(): Json {
  return compact({
    "@type": "Person",
    "@id": NODE_IDS.founder,
    name: FOUNDER.name,
    jobTitle: FOUNDER.jobTitle,
    description: `Mathura-born local guide who has run ${BRAND_NAME} since ${FOUNDED}, with ${YEARS} years of guiding and ${PILGRIMS} pilgrims guided across Braj.`,
    image: ref(NODE_IDS.founderImage),
    birthPlace: place(FOUNDER.bornIn),
    homeLocation: place(FOUNDER.bornIn),
    nationality: { "@type": "Country", name: "India" },
    knowsLanguage: ["English", "Hindi"],
    knowsAbout: ["Braj Bhoomi", "Mathura", "Vrindavan", "Banke Bihari Temple", "Krishna Janmabhoomi", "Nidhivan", "Radha Kund", "Govardhan Parikrama"],
    // The founder relation is expressed as Organization.founder (schema.org has no `founderOf`,
    // and `owns` only accepts Product/OwnershipInfo).
    worksFor: ref(NODE_IDS.organization),
    telephone: PHONE_E164,
    email: EMAIL,
    url: absoluteUrl(ABOUT_PATH),
    mainEntityOfPage: ref(NODE_IDS.aboutPage),
    sameAs: FOUNDER_SAME_AS,
  });
}

/** Page-level Offer for the advertised starting price. Only for pages that show that price. */
export function startingOfferNode(id: string, url: string): Json {
  return {
    "@type": "Offer",
    "@id": id,
    url,
    offeredBy: ref(NODE_IDS.business),
    priceSpecification: { "@type": "PriceSpecification", minPrice: STARTING_PRICE, priceCurrency: "INR" },
    itemOffered: { "@type": "Service", name: "Braj tour packages" },
    description: `Braj tour packages from ${formatInr(STARTING_PRICE)}`,
  };
}

/** All shared entities, in a stable order. Spread into any page's `@graph`. */
export function sharedNodes(): Json[] {
  return [webSiteNode(), organizationNode(), localBusinessNode(), founderNode(), logoNode(), founderImageNode()];
}

/** The shared entities as a standalone graph (for pages without their own graph). */
export function sharedGraph(): Json {
  return { "@context": "https://schema.org", "@graph": sharedNodes() };
}
