import { absoluteUrl } from "@/lib/seo";
import { NODE_IDS, compact } from "./nodes";
import type { Destination } from "@/content/destinations";
import type { Guide } from "@/content/guides";
import type { Photo } from "@/content/images";
import type { TourPackage } from "@/content/packages";
import type { Temple } from "@/content/temples";
import type { Faq } from "@/content/types";

type Json = Record<string, unknown>;

// Same @ids as the shared nodes in ./nodes.ts.
const ORG_ID = NODE_IDS.organization;
const WEBSITE_ID = NODE_IDS.website;

function imageUrl(photo: Photo): string {
  return absoluteUrl(photo.src.src);
}

export function webPageSchema({ path, name, description }: { path: string; name: string; description: string }): Json {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${absoluteUrl(path)}#webpage`,
    url: absoluteUrl(path),
    name,
    description,
    inLanguage: "en-IN",
    isPartOf: { "@id": WEBSITE_ID },
  };
}

export type Crumb = { name: string; href: string };

export function breadcrumbSchema(crumbs: Crumb[]): Json {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: absoluteUrl(c.href),
    })),
  };
}

export function faqSchema(faqs: Faq[]): Json | undefined {
  if (!faqs.length) return undefined;
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function destinationSchema(d: Destination, photo: Photo, path: string): Json {
  return {
    "@context": "https://schema.org",
    "@type": "TouristDestination",
    name: d.name,
    description: d.metaDescription,
    url: absoluteUrl(path),
    image: imageUrl(photo),
    containedInPlace: { "@type": "State", name: "Uttar Pradesh", containedInPlace: { "@type": "Country", name: "India" } },
    touristType: ["Pilgrims", "Families", "Senior travellers"],
  };
}

export function templeSchema(t: Temple, photo: Photo, path: string): Json {
  return {
    "@context": "https://schema.org",
    "@type": ["HinduTemple", "PlaceOfWorship", "TouristAttraction"],
    name: t.name,
    description: t.summary,
    url: absoluteUrl(path),
    image: imageUrl(photo),
    address: { "@type": "PostalAddress", addressLocality: t.town, addressRegion: "Uttar Pradesh", addressCountry: "IN" },
    hasMap: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(t.mapQuery)}`,
    isAccessibleForFree: true,
  };
}

export function tripSchema(p: TourPackage, photo: Photo, path: string): Json {
  return compact({
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    name: p.title,
    description: p.summary,
    url: absoluteUrl(path),
    image: imageUrl(photo),
    touristType: p.idealFor,
    provider: { "@id": ORG_ID },
    itinerary: {
      "@type": "ItemList",
      itemListElement: p.itinerary.map((d, i) => ({
        "@type": "ListItem",
        position: i + 1,
        item: { "@type": "TouristAttraction", name: `${d.day}: ${d.title}`, description: d.text },
      })),
    },
    // An Offer is only published when the business has set a real price.
    offers: p.price
      ? {
          "@type": "Offer",
          price: p.price.amount,
          priceCurrency: p.price.currency,
          description: p.price.basis,
          url: absoluteUrl(path),
          availability: "https://schema.org/InStock",
        }
      : undefined,
  });
}

export function articleSchema(g: Guide, photo: Photo, path: string): Json {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: g.title,
    description: g.description,
    image: imageUrl(photo),
    url: absoluteUrl(path),
    mainEntityOfPage: absoluteUrl(path),
    dateModified: g.updated,
    datePublished: g.updated,
    inLanguage: "en-IN",
    author: { "@id": ORG_ID },
    publisher: { "@id": ORG_ID },
  };
}

export function itemListSchema(name: string, items: { name: string; href: string }[]): Json {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name,
    itemListElement: items.map((it, i) => ({ "@type": "ListItem", position: i + 1, name: it.name, url: absoluteUrl(it.href) })),
  };
}
