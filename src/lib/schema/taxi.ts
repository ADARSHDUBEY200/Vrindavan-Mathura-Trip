import { PHONE_E164 } from "@/config/site";
import { photos } from "@/content/images";
import { TAXI_PATH, TAXI_UPDATED, airport, fleet, localTour, taxiFaqs, taxiMeta, vehicleLabel } from "@/content/taxi";
import { absoluteUrl } from "@/lib/seo";
import { NODE_IDS, ref, type Json } from "./nodes";

/** Visible breadcrumb on the taxi page (kept in sync with the BreadcrumbList below). */
export const taxiCrumbs = [
  { name: "Home", href: "/" },
  { name: "Taxi Service", href: TAXI_PATH },
];

const AREA = ["Mathura", "Vrindavan", "Govardhan", "Barsana", "Gokul", "Nandgaon"];

/**
 * Page-level graph: WebPage, BreadcrumbList, the TaxiService with its offers, and the FAQPage.
 * The TravelAgency, Organization and founder nodes come from <SiteSchema> on every public page,
 * so they are referenced by @id here and never defined twice.
 */
export function taxiGraph(): Json {
  const url = absoluteUrl(TAXI_PATH);
  const ids = { webpage: `${url}#webpage`, breadcrumb: `${url}#breadcrumb`, service: `${url}#taxi-service`, faq: `${url}#faq`, image: `${url}#primary-image` };
  const hero = photos["taxi-innova"];

  const perKm = fleet.map((v) => ({
    "@type": "Offer",
    name: vehicleLabel(v),
    description: `${v.seats}. Ideal for ${v.idealFor.toLowerCase()}.`,
    priceCurrency: "INR",
    priceSpecification: {
      "@type": "UnitPriceSpecification",
      priceCurrency: "INR",
      ...(v.rate.min === v.rate.max ? { price: v.rate.min } : { minPrice: v.rate.min, maxPrice: v.rate.max }),
      unitCode: "KMT",
      unitText: "km",
    },
    url,
  }));

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": ids.webpage,
        url,
        name: taxiMeta.title,
        description: taxiMeta.description,
        inLanguage: "en-IN",
        isPartOf: ref(NODE_IDS.website),
        about: ref(ids.service),
        mainEntity: ref(ids.service),
        primaryImageOfPage: ref(ids.image),
        breadcrumb: ref(ids.breadcrumb),
        author: ref(NODE_IDS.founder),
        publisher: ref(NODE_IDS.business),
        dateModified: TAXI_UPDATED,
      },
      {
        "@type": "ImageObject",
        "@id": ids.image,
        url: absoluteUrl(hero.src.src),
        contentUrl: absoluteUrl(hero.src.src),
        width: hero.src.width,
        height: hero.src.height,
        caption: hero.alt,
        creditText: hero.credit.author,
        license: hero.credit.licenseUrl,
        acquireLicensePage: hero.credit.sourceUrl,
      },
      {
        "@type": "BreadcrumbList",
        "@id": ids.breadcrumb,
        itemListElement: taxiCrumbs.map((c, i) => ({ "@type": "ListItem", position: i + 1, name: c.name, item: absoluteUrl(c.href) })),
      },
      {
        "@type": "TaxiService",
        "@id": ids.service,
        name: "Mathura Vrindavan Taxi Services",
        serviceType: "Taxi and cab hire",
        description: taxiMeta.description,
        url,
        image: ref(ids.image),
        provider: ref(NODE_IDS.business),
        areaServed: AREA.map((name) => ({ "@type": "City", name })),
        availableChannel: { "@type": "ServiceChannel", serviceUrl: url, servicePhone: { "@type": "ContactPoint", telephone: PHONE_E164, contactType: "reservations", availableLanguage: ["en", "hi"] } },
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Taxi fares",
          itemListElement: [
            ...perKm,
            {
              "@type": "Offer",
              name: "Local sightseeing tour (same day)",
              priceCurrency: "INR",
              priceSpecification: { "@type": "PriceSpecification", minPrice: localTour.price, priceCurrency: "INR" },
              description: "Same-day Mathura and Vrindavan city tour. Starting price depends on vehicle and route.",
              url,
            },
            {
              "@type": "Offer",
              name: "Delhi IGI Airport to Mathura/Vrindavan transfer",
              priceCurrency: "INR",
              priceSpecification: { "@type": "PriceSpecification", minPrice: airport.price, priceCurrency: "INR" },
              description: "One-way airport transfer. Starting price depends on vehicle and timing.",
              url,
            },
          ],
        },
      },
      {
        "@type": "FAQPage",
        "@id": ids.faq,
        isPartOf: ref(ids.webpage),
        mainEntity: taxiFaqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
      },
    ],
  };
}
