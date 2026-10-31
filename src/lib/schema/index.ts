import { FOUNDER } from "@/config/site";
import { absoluteUrl } from "@/lib/seo";
import { NODE_IDS, compact } from "./nodes";
import type { Destination } from "@/content/destinations";
import type { Guide } from "@/content/guides";
import type { Photo } from "@/content/images";
import type { TourPackage } from "@/content/packages";
import type { Faq } from "@/content/types";
import type { PackageDetail } from "@/lib/cms/package-detail";
import type { TempleView } from "@/lib/cms/temples";

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

/** A temple as a place. Opening hours are left out: they are approximate text, not a schedule search engines should repeat. */
export function templePlaceSchema(t: TempleView): Json {
  const url = absoluteUrl(t.path);
  const fullUrl = (src: string) => (src.startsWith("/") ? absoluteUrl(src) : src);
  const images = [t.image?.url, ...t.gallery.map((g) => g.picture.url)].filter((src): src is string => Boolean(src));
  return compact({
    "@context": "https://schema.org",
    "@type": ["HinduTemple", "PlaceOfWorship", "TouristAttraction"],
    "@id": `${url}#temple`,
    name: t.schemaTitle,
    description: t.schemaDescription,
    url,
    image: images.map(fullUrl),
    address: compact({
      "@type": "PostalAddress",
      streetAddress: t.address.street || undefined,
      addressLocality: t.address.city || t.town,
      addressRegion: t.address.state || "Uttar Pradesh",
      postalCode: t.address.postalCode || undefined,
      addressCountry: "IN",
    }),
    geo: t.geo ? { "@type": "GeoCoordinates", ...t.geo } : undefined,
    hasMap: t.mapUrl,
    containedInPlace: t.town ? { "@type": "City", name: t.town } : undefined,
  });
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

/** TouristTrip for a CMS package. No aggregateRating: row ratings are display-only (see lib/cms/packages.ts). */
export function packageTripSchema(p: PackageDetail): Json {
  const url = absoluteUrl(p.path);
  return compact({
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    "@id": `${url}#trip`,
    name: p.schemaTitle,
    description: p.schemaDescription,
    url,
    image: [p.hero?.src, ...p.gallery.map((g) => g.src)].filter(Boolean),
    provider: { "@id": ORG_ID },
    itinerary: p.itinerary.length
      ? {
          "@type": "ItemList",
          itemListElement: p.itinerary.map((d, i) => ({ "@type": "ListItem", position: i + 1, name: `Day ${d.day}: ${d.title}` })),
        }
      : undefined,
    offers: p.price ? { "@type": "Offer", price: p.price, priceCurrency: "INR", description: "Starting price per person", url, availability: "https://schema.org/InStock" } : undefined,
  });
}

/** VideoObject needs an upload date to be valid, so a package without one publishes no video node. */
export function packageVideoSchema(p: PackageDetail): Json | undefined {
  if (!p.video?.uploadDate) return undefined;
  return compact({
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: p.video.title || p.title,
    description: p.schemaDescription,
    thumbnailUrl: `https://i.ytimg.com/vi/${p.video.id}/hqdefault.jpg`,
    uploadDate: p.video.uploadDate,
    duration: p.video.minutes ? `PT${Math.round(p.video.minutes * 60)}S` : undefined,
    embedUrl: `https://www.youtube.com/embed/${p.video.id}`,
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

/** BlogPosting for a CMS blog. The founder is referenced by @id; any other author is an inline Person. */
export function blogPostingSchema(b: {
  path: string;
  headline: string;
  description: string;
  image?: string;
  imageAlt?: string;
  author: string;
  authorRole?: string;
  category: string;
  publishedAt: string;
  updatedOn: string;
  wordCount?: number;
  keywords?: string[];
}): Json {
  const url = absoluteUrl(b.path);
  const author = !b.author
    ? { "@id": ORG_ID }
    : b.author.trim().toLowerCase() === FOUNDER.name.toLowerCase()
      ? { "@id": NODE_IDS.founder }
      : compact({ "@type": "Person", name: b.author, jobTitle: b.authorRole || undefined, worksFor: { "@id": ORG_ID } });
  return compact({
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${url}#article`,
    headline: b.headline.slice(0, 110),
    description: b.description,
    image: b.image ? { "@type": "ImageObject", url: b.image, caption: b.imageAlt } : undefined,
    url,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    datePublished: b.publishedAt,
    dateModified: b.updatedOn > b.publishedAt.slice(0, 10) ? b.updatedOn : b.publishedAt,
    articleSection: b.category,
    keywords: b.keywords?.length ? b.keywords.join(", ") : undefined,
    wordCount: b.wordCount,
    inLanguage: "en-IN",
    author,
    publisher: { "@id": ORG_ID },
    isPartOf: { "@id": WEBSITE_ID },
  });
}

export function itemListSchema(name: string, items: { name: string; href: string }[]): Json {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name,
    itemListElement: items.map((it, i) => ({ "@type": "ListItem", position: i + 1, name: it.name, url: absoluteUrl(it.href) })),
  };
}
