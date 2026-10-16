/**
 * Brand, contact and navigation settings.
 * Contact details come only from environment variables (see .env.example);
 * anything that is not set stays `undefined` and the UI hides it.
 */

function env(value: string | undefined): string | undefined {
  const trimmed = value?.trim();
  return trimmed ? trimmed : undefined;
}

const siteUrl = (env(process.env.NEXT_PUBLIC_SITE_URL) ?? "http://localhost:3000").replace(/\/+$/, "");

const address = {
  street: env(process.env.NEXT_PUBLIC_ADDRESS_STREET),
  locality: env(process.env.NEXT_PUBLIC_ADDRESS_LOCALITY),
  region: env(process.env.NEXT_PUBLIC_ADDRESS_REGION),
  postalCode: env(process.env.NEXT_PUBLIC_ADDRESS_POSTAL_CODE),
  country: env(process.env.NEXT_PUBLIC_ADDRESS_COUNTRY),
};

export const site = {
  name: env(process.env.NEXT_PUBLIC_BRAND_NAME) ?? "Braj Dham Yatra",
  url: siteUrl,
  locale: "en_IN",
  tagline: "Private pilgrimage trips to Vrindavan, Mathura & Braj",
  description:
    "Private, unhurried pilgrimage trips to Vrindavan, Mathura, Govardhan, Barsana, Nandgaon and Gokul — planned around darshan timings, with a private car, local Braj know-how and WhatsApp support.",
  contact: {
    whatsapp: env(process.env.NEXT_PUBLIC_WHATSAPP_NUMBER)?.replace(/\D/g, "") || undefined,
    phone: env(process.env.NEXT_PUBLIC_PHONE),
    email: env(process.env.NEXT_PUBLIC_EMAIL),
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
