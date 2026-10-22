/**
 * Brand, contact and navigation settings.
 * The brand facts below are the single source of truth for copy, metadata and schema.
 * Environment variables (see .env.example) can still override the URL, name and contact details.
 */

/* ------------------------------------------------------------------ */
/* Brand facts                                                         */
/* ------------------------------------------------------------------ */

export const BRAND_NAME = "Mathura Vrindavan Trips";
export const SITE_URL = "https://vrindavanmathuratrip.com";

export const FOUNDER = { name: "Harsh Sharma", jobTitle: "Founder & Local Guide", bornIn: "Mathura" } as const;

export const FOUNDED = "2015";
export const RATING = 4.9;
export const PILGRIMS = "75,000+";
export const YEARS = "11+";

export const PHONE_DISPLAY = "+91 99975 28849";
export const PHONE_E164 = "+919997528849";
export const WHATSAPP = "919997528849";
export const EMAIL = "vrindavanmathuratrip@gmail.com";

/**
 * TODO(owner): number of real, verifiable reviews behind the 4.9 rating (e.g. your Google Business Profile count).
 * While this is `null`, no aggregateRating is published in schema. "75,000+ pilgrims" is NOT a review count.
 */
export const REVIEW_COUNT: number | null = null;

/** TODO(owner): office/postal address. Schema omits the address while `streetAddress` is empty. */
export const ADDRESS = {
  streetAddress: "",
  addressLocality: "Mathura",
  addressRegion: "Uttar Pradesh",
  postalCode: "",
  addressCountry: "IN",
} as const;

/** TODO(owner): latitude/longitude of the office. Schema omits `geo` while this is `null`. */
export const GEO: { latitude: number; longitude: number } | null = null;

/** TODO(owner): official profile URLs (Google Business Profile, Instagram, Facebook, YouTube…). */
export const SAME_AS: string[] = [];

/** TODO(owner): when the phone line is answered, e.g. `{ opens: "06:00", closes: "21:00" }` for all 7 days. */
export const OPENING_HOURS: { opens: string; closes: string } | null = null;

/** TODO(owner): Harsh Sharma's own public profiles (not the business pages). Person schema omits `sameAs` while empty. */
export const FOUNDER_SAME_AS: string[] = [];

/** "From" price (INR) quoted on the About page and in the business schema. */
export const STARTING_PRICE = 1199;

/**
 * TODO(owner): one line saying what the ₹1,199 starting price covers (e.g. "per person, …").
 * Nothing is shown on the About page while this is `null` — never fill it with guessed inclusions.
 */
export const STARTING_PRICE_INCLUDES: string | null = null;

/** Date (ISO) the About page copy was last reviewed. Shown on the page and used as `dateModified`. */
export const LAST_UPDATED = "2026-10-22";

/**
 * TODO(owner): set to `true` only once Nidhivan Sarovar Portico and Kridha Residency are confirmed, active partners.
 * While `false`, /tour-packages shows the stays paragraph and FAQ 19 with both hotel names removed,
 * and no LodgingBusiness nodes are published in schema.
 */
export const HOTEL_PARTNERS_CONFIRMED = false;

/**
 * TODO(owner): ISO date (e.g. "2026-11-02") on which the temple timings on /tour-packages were last checked
 * against current temple notices. While `null`, no "Timings verified on …" line is shown.
 */
export const TIMINGS_VERIFIED_ON: string | null = null;

/** `₹1,199` — Indian digit grouping. */
export function formatInr(amount: number): string {
  return `₹${amount.toLocaleString("en-IN")}`;
}

function env(value: string | undefined): string | undefined {
  const trimmed = value?.trim();
  return trimmed ? trimmed : undefined;
}

const siteUrl = (env(process.env.NEXT_PUBLIC_SITE_URL) ?? SITE_URL).replace(/\/+$/, "");

const address = {
  street: env(process.env.NEXT_PUBLIC_ADDRESS_STREET) ?? (ADDRESS.streetAddress || undefined),
  locality: env(process.env.NEXT_PUBLIC_ADDRESS_LOCALITY),
  region: env(process.env.NEXT_PUBLIC_ADDRESS_REGION) ?? ADDRESS.addressRegion,
  postalCode: env(process.env.NEXT_PUBLIC_ADDRESS_POSTAL_CODE) ?? (ADDRESS.postalCode || undefined),
  country: env(process.env.NEXT_PUBLIC_ADDRESS_COUNTRY) ?? ADDRESS.addressCountry,
};

export const site = {
  name: env(process.env.NEXT_PUBLIC_BRAND_NAME) ?? BRAND_NAME,
  url: siteUrl,
  locale: "en_IN",
  tagline: "Private pilgrimage trips to Vrindavan, Mathura & Braj",
  description:
    "Private, unhurried pilgrimage trips to Vrindavan, Mathura, Govardhan, Barsana, Nandgaon and Gokul — planned around darshan timings, with a private car, local Braj know-how and WhatsApp support.",
  contact: {
    whatsapp: env(process.env.NEXT_PUBLIC_WHATSAPP_NUMBER)?.replace(/\D/g, "") || WHATSAPP,
    phone: env(process.env.NEXT_PUBLIC_PHONE) ?? PHONE_DISPLAY,
    email: env(process.env.NEXT_PUBLIC_EMAIL) ?? EMAIL,
  },
  /** Shown only once a street or locality is configured (region/country alone are not an address). */
  address: address.street || address.locality ? address : undefined,
  social: {
    instagram: env(process.env.NEXT_PUBLIC_SOCIAL_INSTAGRAM),
    facebook: env(process.env.NEXT_PUBLIC_SOCIAL_FACEBOOK),
    youtube: env(process.env.NEXT_PUBLIC_SOCIAL_YOUTUBE),
  },
} as const;

/** `tel:` href built from the configured phone number. */
export function phoneHref(phone = site.contact.phone): string | undefined {
  return phone ? `tel:${phone.replace(/[^\d+]/g, "")}` : undefined;
}

export const mailtoHref = (subject?: string) => `mailto:${site.contact.email}${subject ? `?subject=${encodeURIComponent(subject)}` : ""}`;

export function formatAddress(): string | undefined {
  if (!site.address) return undefined;
  const { street, locality, region, postalCode } = site.address;
  return [street, locality, [region, postalCode].filter(Boolean).join(" ")].filter(Boolean).join(", ");
}

/* ------------------------------------------------------------------ */
/* Navigation                                                          */
/* ------------------------------------------------------------------ */

/** Keys refer to entries in `content/images.ts`. */
export type NavLink = { label: string; href: string; note?: string; image?: string };
export type NavItem =
  | { label: string; href: string; menu?: undefined }
  | { label: string; href?: string; menu: { links: NavLink[]; footer?: NavLink } };

export const mainNav: NavItem[] = [
  { label: "Home", href: "/" },
  {
    label: "Destinations",
    menu: {
      links: [
        { label: "Vrindavan", href: "/vrindavan", note: "Banke Bihari, Prem Mandir & the ghats", image: "prem-mandir" },
        { label: "Mathura", href: "/mathura", note: "Janmabhoomi, Dwarkadhish & Vishram Ghat", image: "vishram-ghat" },
        { label: "Govardhan & Barsana", href: "/govardhan-barsana", note: "Parikrama, Radha Rani & Nandgaon", image: "radha-rani-barsana" },
        { label: "Full Braj Yatra", href: "/braj-yatra", note: "Gokul, Baldeo & the wider 84 Kos", image: "kusum-sarovar" },
      ],
    },
  },
  {
    label: "Temples",
    href: "/temples",
    menu: {
      links: [
        { label: "Banke Bihari", href: "/temples/banke-bihari", note: "Vrindavan’s most loved darshan", image: "banke-bihari" },
        { label: "Prem Mandir", href: "/temples/prem-mandir", note: "White marble & evening lights", image: "prem-mandir-night" },
        { label: "Krishna Janmabhoomi", href: "/temples/krishna-janmabhoomi", note: "Birthplace of Shri Krishna", image: "janmabhoomi" },
        { label: "Radha Rani, Barsana", href: "/temples/radha-rani-temple-barsana", note: "Hilltop home of Shri Radha", image: "radha-rani-barsana" },
      ],
      footer: { label: "All temples of Braj", href: "/temples" },
    },
  },
  {
    label: "Tour Packages",
    href: "/tour-packages",
    menu: {
      links: [
        { label: "Vrindavan One-Day Darshan", href: "/tour-packages/vrindavan-one-day-darshan", note: "Same-day from Delhi or Mathura", image: "banke-bihari-gate" },
        { label: "Mathura Vrindavan 2 Days", href: "/tour-packages/mathura-vrindavan-2-days", note: "The classic first visit", image: "dwarkadhish" },
        { label: "Agra Mathura Vrindavan", href: "/tour-packages/agra-mathura-vrindavan-3-days", note: "Taj Mahal + Braj in 3 days", image: "taj-mahal" },
        { label: "Braj 84 Kos Yatra", href: "/tour-packages/braj-84-kos-yatra", note: "Five days across Braj", image: "govardhan-dham" },
      ],
      footer: { label: "View all tour packages", href: "/tour-packages" },
    },
  },
  { label: "Festivals", href: "/festivals" },
  {
    label: "Travel Guide",
    href: "/travel-guide",
    menu: {
      links: [
        { label: "Best time to visit", href: "/travel-guide/best-time-to-visit-vrindavan-mathura", note: "Season by season", image: "holi-vrindavan" },
        { label: "How to reach Braj", href: "/travel-guide/how-to-reach-vrindavan-mathura", note: "From Delhi, Agra & beyond", image: "yamuna-vrindavan" },
        { label: "Temple timings", href: "/travel-guide/temple-timings-and-darshan", note: "The rhythm of darshan", image: "phool-bangla" },
        { label: "First-visit tips", href: "/travel-guide/first-visit-tips-vrindavan", note: "Small things that help", image: "vrindavan-street" },
      ],
      footer: { label: "All travel guides", href: "/travel-guide" },
    },
  },
  { label: "About Us", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export const policyLinks: NavLink[] = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms & Conditions", href: "/terms-and-conditions" },
  { label: "Cancellation Policy", href: "/cancellation-policy" },
  { label: "Image Credits", href: "/image-credits" },
];
