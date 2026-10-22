/**
 * /tour-packages copy, verbatim from TourPackagesContent.pdf (Harsh Sharma's first-person voice).
 *
 * Inline markup in any string: `**bold**` → <strong>, `*italic*` → <em>.
 * The phone number, email and website are linked automatically wherever they appear (components/home/landing/Rich.tsx).
 * Brand facts are interpolated from config/site.ts — never type them by hand here.
 * "Quick Notes for Your Web Team (Not for Publication)" from the PDF is deliberately not published.
 */
import {
  BRAND_NAME,
  EMAIL,
  FOUNDED,
  FOUNDER,
  HOTEL_PARTNERS_CONFIRMED,
  PHONE_DISPLAY,
  PILGRIMS,
  RATING,
  SITE_URL,
  STARTING_PRICE,
  YEARS,
  formatInr,
} from "@/config/site";
import type { ContentImage, GuideBlock } from "./types";

export const TOUR_PACKAGES_PATH = "/tour-packages";

const PRICE = formatInr(STARTING_PRICE);
const WEBSITE = `${SITE_URL}/`;
/** "75,000" — the intro says "more than 75,000 pilgrims". */
const PILGRIM_COUNT = PILGRIMS.replace(/\+$/, "");

/** Placeholders — drop the real photos into /public/images/tour-packages/ with these exact names. */
export const images = {
  hero: {
    src: "/images/tour-packages/banke-bihari-sunrise-devotees.webp",
    alt: `Devotees walking toward Banke Bihari Temple in Vrindavan at sunrise, Vrindavan tour packages by ${BRAND_NAME}`,
    width: 1200,
    height: 630,
  },
  founder: {
    src: "/images/tour-packages/harsh-sharma-vrindavan-gali.webp",
    alt: `${FOUNDER.name}, local Braj guide, in a narrow Vrindavan gali near Seva Kunj`,
    width: 960,
    height: 1200,
  },
  packages: {
    src: "/images/tour-packages/ac-cab-near-prem-mandir.webp",
    alt: "Comfortable AC cab for Vrindavan trip packages waiting near Prem Mandir",
    width: 1200,
    height: 800,
  },
  bankeBihari: {
    src: "/images/tour-packages/banke-bihari-lane-flower-sellers.webp",
    alt: "Banke Bihari Temple Vrindavan lane with devotees and flower sellers",
    width: 1200,
    height: 800,
  },
  premMandir: {
    src: "/images/tour-packages/prem-mandir-evening-light-show.webp",
    alt: "Prem Mandir Vrindavan lit in colourful lights at night for the evening light show",
    width: 1200,
    height: 800,
  },
  nidhivan: {
    src: "/images/tour-packages/nidhivan-twisted-tulsi-trees.webp",
    alt: "Twisted tulsi trees in Nidhivan Vrindavan, a sacred grove linked to the Raas leela",
    width: 1200,
    height: 800,
  },
  parikrama: {
    src: "/images/tour-packages/parikrama-marg-barefoot-dawn.webp",
    alt: "Pilgrims walking barefoot on Vrindavan Parikrama Marg at dawn",
    width: 1200,
    height: 800,
  },
  hotel: {
    src: "/images/tour-packages/premium-hotel-room-vrindavan.webp",
    alt: "Premium 4 star hotel room in Vrindavan for pilgrims on Vrindavan tour packages",
    width: 1200,
    height: 800,
  },
  food: {
    src: "/images/tour-packages/kachori-sabzi-kulhad-lassi.webp",
    alt: "Hot kachori sabzi and kulhad lassi at a street stall in Vrindavan",
    width: 1200,
    height: 800,
  },
  transport: {
    src: "/images/tour-packages/e-rickshaw-vrindavan-road.webp",
    alt: "E-rickshaw on a Vrindavan road near temples, helpful for Vrindavan trip planning",
    width: 1200,
    height: 800,
  },
  book: {
    src: "/images/tour-packages/contact-mathura-vrindavan-trips.webp",
    alt: `Contact ${BRAND_NAME} for Vrindavan tour packages from ${PRICE}`,
    width: 1200,
    height: 800,
  },
} satisfies Record<string, ContentImage>;

/* ------------------------------------------------------------------ */
/* Metadata                                                            */
/* ------------------------------------------------------------------ */

export const tpMeta = {
  /** ≤ 60 chars. The PDF's suggestion (~72 chars) would be truncated in results. */
  title: `Vrindavan Tour Packages from ${PRICE} | Local Guide, ${RATING}★`,
  /** ≤ 160 chars. "4-5 star stays" is left out until HOTEL_PARTNERS_CONFIRMED. */
  description: `Vrindavan tour packages from ${PRICE} with ${FOUNDER.name}, a Braj-born guide (${YEARS} yrs, ${RATING}★). Banke Bihari timings, Nidhivan, Prem Mandir. Call ${PHONE_DISPLAY}.`,
  keywords: [
    "vrindavan tour packages",
    "vrindavan tour package",
    "vrindavan trip packages",
    "vrindavan travel packages",
    "weekend vrindavan trip package",
    "banke bihari timings",
    "prem mandir light show timing",
    "nidhivan vrindavan",
    "vrindavan parikrama",
  ],
};

/* ------------------------------------------------------------------ */
/* Table of contents — ids are stable anchors for every H2             */
/* ------------------------------------------------------------------ */

export const toc = [
  { id: "personal-connection", label: "My connection" },
  { id: "tour-packages", label: "Tour packages" },
  { id: "darshan-guide", label: "Darshan guide" },
  { id: "parikrama", label: "Parikrama" },
  { id: "luxury-stays", label: "Luxury stays" },
  { id: "food", label: "Food & street secrets" },
  { id: "travel", label: "Travel & best time" },
  { id: "faq", label: "FAQs" },
  { id: "book", label: "Book your trip" },
] as const;

/* ------------------------------------------------------------------ */
/* 1. Hero                                                             */
/* ------------------------------------------------------------------ */

export const hero = {
  title: `Vrindavan Tour Packages from ${PRICE}: Your Local Guide to the Holy Land of Radha and Krishna`,
  greeting: "Radhe Radhe, dear pilgrim.",
  intro: `I am ${FOUNDER.name}, founder of **${BRAND_NAME}**. Since ${FOUNDED} I have been helping devotees plan their **Vrindavan tour packages** with the care I would give my own family. Our customised packages start at just **${PRICE}**, and over the years we have guided **more than ${PILGRIM_COUNT} pilgrims**, who have given us a **${RATING}-star rating**. If you are looking for a Vrindavan trip that feels like a pilgrimage and not a sightseeing race, you are in the right place.`,
  contactTitle: `Call or WhatsApp me directly: ${PHONE_DISPLAY}`,
  contactLabels: { email: "✉️ Email:", website: "🌐 Website:" },
  email: EMAIL,
  website: WEBSITE,
  leadOut:
    "I wrote this page as the guide I wish every first-time visitor had in their pocket. It covers my favourite temples, honest darshan timings, the mystery of Nidhivan, the evening light show at Prem Mandir, the Parikrama, where to eat in the narrow lanes, and answers to the questions pilgrims ask me every week. Take your time with it.",
  priceBadge: `Packages from ${PRICE}`,
  whatsappMessage: "Radhe Radhe! I'd like to plan a Vrindavan trip.",
};

/* ------------------------------------------------------------------ */
/* 2. My Personal Connection to Vrindavan                              */
/* ------------------------------------------------------------------ */

export const connection = {
  eyebrow: "My connection",
  title: "My Personal Connection to Vrindavan",
  story: [
    'I was born in Braj and grew up a short drive from Vrindavan. My first memory of this town is not of a temple. It is of my grandmother holding my hand in a crowded lane, saying "Radhe Radhe" to every person we passed, whether she knew them or not. In Vrindavan nobody says hello. Everyone says Radhe Radhe, and a stranger becomes a family member for a moment.',
    `After **${YEARS} years of guiding pilgrims**, I can tell you what makes Vrindavan different from any other holy place in the world. Most pilgrimage sites ask you to go up toward God, through a tall mountain, a long climb or a grand ritual. Vrindavan brings God down to your level. Here the Lord is a naughty child who steals butter, a young boy who plays the flute, a friend who waits at the door of his beloved. Nobody is asked to be learned or perfect. You are only asked to love.`,
  ],
  /** Pulled out from the second paragraph above (which stays complete). */
  pullQuote: "Vrindavan brings God down to your level.",
  smallThings:
    'You will notice it in small things. The widow selling tulsi garlands outside a temple calls the deity "Laddu Gopal" as if he were her grandson. The rickshaw driver stops to bow when a temple bell rings. A monkey snatches your glasses, and the shopkeeper laughs and says, "Bihari ji\'s leela." That is the Vrindavan I want you to see.',
  closing:
    "I know the hidden **galis** (lanes) that tourists never find, the hour when a temple courtyard goes quiet, and the shortcuts around a jam. I also know the difference between a pujari who serves and a tout who sells. Most of what I share on this page comes from mistakes I watched pilgrims make and from stories I have been told by old Brijwasis who have lived here all their lives.",
};

/* ------------------------------------------------------------------ */
/* 3. Our Top Vrindavan Tour Packages                                  */
/* ------------------------------------------------------------------ */

/** Schema @id fragments of the places on this page. Ids already used on the homepage are identical there. */
export type PlaceId =
  | "temple-banke-bihari"
  | "temple-prem-mandir"
  | "temple-iskcon"
  | "temple-radha-raman"
  | "temple-rangji"
  | "temple-radha-vallabh"
  | "temple-madan-mohan"
  | "temple-govind-dev"
  | "temple-gopeshwar-mahadev"
  | "nidhivan"
  | "seva-kunj"
  | "swami-haridas-samadhi"
  | "keshi-ghat"
  | "vrindavan-parikrama";

export type Stop = { name: string; ref?: PlaceId };

export type TpPackageId = "trip-1-day" | "trip-2-day" | "trip-weekend" | "add-ons";

export type TpPackage = {
  id: TpPackageId;
  /** Short tab label (desktop). */
  tab: string;
  heading: string;
  /** Name used in schema and the pre-filled WhatsApp message. */
  name: string;
  /** Travel days, used to match a CMS package page. */
  days?: number;
  /** Words in the title or slug that identify a matching CMS package (checked before `days`). */
  matchWords?: RegExp;
  ribbon?: string;
  intro: string;
  timeline?: { time: string; text: string }[];
  tip?: { label: string; text: string };
  dayBlocks?: { title: string; text: string }[];
  rows?: { label: string; text: string }[];
  note?: string;
  addons?: { icon: "braj" | "parikrama" | "festival" | "seniors" | "family"; text: string }[];
  closing?: string;
  /** Visible stops in order — feeds the TouristTrip itinerary. */
  stops?: Stop[];
  touristType?: string[];
};

export const packagesSection = {
  eyebrow: "Tour packages",
  title: "Our Top Vrindavan Tour Packages",
  intro:
    "Every pilgrim is different. A retired couple wants an easy pace with plenty of rest. A group of friends wants to see everything. A mother wants her newborn to have first darshan at Banke Bihari. We have shaped our **Vrindavan trip packages** around these real needs, and each one can be customised.",
  priceLead: `Our customised packages start from ${PRICE}.`,
  priceText:
    "The final price depends on your group size, vehicle, number of days and whether you want a stay. I will always send you a written quote that spells out what is included and what is not, so there are no surprises later.",
  includesTitle: "What our Vrindavan travel packages generally include:",
  includes: [
    "Clean, AC vehicle with an experienced driver who knows Braj roads",
    "Local guidance from me or a trained member of my team",
    "Darshan planned around crowd patterns and temple closing hours",
    "Help with lockers, offerings, prasad and temple rules",
    "Pick-up and drop at Delhi, Agra, Mathura Junction, Vrindavan station or your hotel",
    "Optional hotel booking, from simple stays to 4 and 5-star properties",
  ],
  ctaLabel: "Plan this on WhatsApp",
  /* UI labels for the CMS catalogue below the four packages. */
  catalogTitle: "All Vrindavan and Braj tour packages",
  catalogFilterLegend: "Filter packages by duration",
  mathuraLink: { label: "Planning Mathura too? See our Mathura Vrindavan tour packages →", href: "/#tour-packages" },
};

export const tpPackages: TpPackage[] = [
  {
    id: "trip-1-day",
    tab: "1-Day Darshan",
    heading: "1-Day Vrindavan Darshan Package",
    name: "1-Day Vrindavan Darshan Package",
    days: 1,
    matchWords: /one[- ]day[- ]darshan|one[- ]day vrindavan|vrindavan[- ]one[- ]day/i,
    intro:
      "This is the best **Vrindavan tour package** for travellers on a tight schedule, such as a Delhi-Agra traveller, a business visitor with one free day, or a family who wants a first taste. It is busy but deeply satisfying when planned well.",
    timeline: [
      { time: "Early morning:", text: "Pick-up and drive to Vrindavan. We aim to reach before the town fills up." },
      { time: "Morning:", text: "Banke Bihari darshan, timed so you avoid the worst crowds." },
      { time: "Late morning:", text: "Radha Raman Temple, a peaceful, traditional shrine." },
      { time: "Lunch:", text: "A simple satvik thali and some rest." },
      { time: "Afternoon:", text: "ISKCON Krishna Balaram Mandir and its marble courtyard." },
      { time: "Evening:", text: "Prem Mandir in daylight and then after dark, when the lights come on." },
      { time: "Night:", text: "Drop-off at your station, airport or hotel." },
    ],
    tip: {
      label: "Harsh's tip",
      text: "One day gives you the highlights, but Vrindavan always leaves you wanting more. Most of our one-day guests come back within a year.",
    },
    stops: [
      { name: "Banke Bihari", ref: "temple-banke-bihari" },
      { name: "Radha Raman Temple", ref: "temple-radha-raman" },
      { name: "ISKCON Krishna Balaram Mandir", ref: "temple-iskcon" },
      { name: "Prem Mandir", ref: "temple-prem-mandir" },
    ],
    touristType: ["Pilgrims", "Families", "Business travellers"],
  },
  {
    id: "trip-2-day",
    tab: "2-Day Stay",
    heading: "2-Day Vrindavan Stay Package: My Most Recommended",
    name: "2-Day Vrindavan Stay Package",
    days: 2,
    matchWords: /vrindavan[- ]stay|2[- ]days? vrindavan(?! mathura)/i,
    ribbon: "Most Recommended",
    intro: "If you can spare two days, please do. This **Vrindavan tour** lets you breathe, and breathing is the whole point.",
    dayBlocks: [
      {
        title: "Day 1: Arrival, ISKCON and Prem Mandir",
        text: "Arrive and check in, rest, and visit ISKCON for the afternoon darshan and the lively evening aarti. After dusk we go to Prem Mandir for the light show. You sleep in Vrindavan and wake up to temple bells.",
      },
      {
        title: "Day 2: Nidhivan, Banke Bihari and the old temples",
        text: "An early start takes us to Nidhivan and Seva Kunj while the groves are still silent. Next comes Banke Bihari, followed by Radha Raman, Radha Vallabh, Madan Mohan and Rangji Mandir. We finish with a quiet half hour at Keshi Ghat by the Yamuna if time allows.",
      },
    ],
    stops: [
      { name: "ISKCON", ref: "temple-iskcon" },
      { name: "Prem Mandir", ref: "temple-prem-mandir" },
      { name: "Nidhivan", ref: "nidhivan" },
      { name: "Seva Kunj", ref: "seva-kunj" },
      { name: "Banke Bihari", ref: "temple-banke-bihari" },
      { name: "Radha Raman", ref: "temple-radha-raman" },
      { name: "Radha Vallabh", ref: "temple-radha-vallabh" },
      { name: "Madan Mohan", ref: "temple-madan-mohan" },
      { name: "Rangji Mandir", ref: "temple-rangji" },
      { name: "Keshi Ghat", ref: "keshi-ghat" },
    ],
    touristType: ["Pilgrims", "First-time visitors", "Families"],
  },
  {
    id: "trip-weekend",
    tab: "Weekend Trip",
    heading: "Weekend Vrindavan Trip Package",
    name: "Weekend Vrindavan Trip Package",
    matchWords: /weekend/i,
    intro:
      "Weekends in Vrindavan are beautiful but crowded, especially Saturdays and Sundays, when day-trippers pour in from Delhi, Agra and nearby cities. I design our **weekend Vrindavan trip package** to beat the crowd without missing anything.",
    rows: [
      { label: "Friday evening or Saturday dawn:", text: "Arrive early and settle into your stay." },
      {
        label: "Saturday:",
        text: "Prioritise ISKCON, Prem Mandir and the smaller, quieter temples. Banke Bihari can be very full on Saturdays, so I usually save it for Sunday's early window or skip peak hours altogether.",
      },
      { label: "Sunday:", text: "Nidhivan at opening, then Banke Bihari right after opening time, then a relaxed lunch and departure." },
    ],
    note: "If you can take a weekday off instead, you will enjoy a far calmer visit. But when weekends are your only option, this plan makes it comfortable.",
    stops: [
      { name: "ISKCON", ref: "temple-iskcon" },
      { name: "Prem Mandir", ref: "temple-prem-mandir" },
      { name: "Nidhivan", ref: "nidhivan" },
      { name: "Banke Bihari", ref: "temple-banke-bihari" },
    ],
    touristType: ["Pilgrims", "Weekend travellers"],
  },
  {
    id: "add-ons",
    tab: "Add-ons",
    heading: "Add-ons and Special Vrindavan Packages",
    name: "Add-ons and Special Vrindavan Packages",
    intro: "Many guests build on these basics:",
    addons: [
      { icon: "braj", text: "**Mathura, Govardhan, Barsana and Gokul** for a full Braj yatra" },
      { icon: "parikrama", text: "**Vrindavan Parikrama** with a guide, in full or in part" },
      { icon: "festival", text: "**Festival-special packages** for Holi, Janmashtami, Radhashtami, Govardhan Puja and Jhulan Yatra" },
      { icon: "seniors", text: "**Senior-friendly Vrindavan travel packages** with e-rickshaw support, wheelchair help and extra rest stops" },
      { icon: "family", text: "**Family packages** with child-friendly breaks, and **group packages** for bhajan mandalis and satsang groups" },
    ],
    closing: `If you want a **Vrindavan trip package** that does not match any of these, call me on **${PHONE_DISPLAY}** and we will design it together.`,
  },
];

/** The Service › OfferCatalog in schema. Every entry is named in the packages section above. */
export const services = [
  "1-Day Vrindavan Darshan Package",
  "2-Day Vrindavan Stay Package",
  "Weekend Vrindavan Trip Package",
  "Vrindavan Parikrama with a guide",
  "Festival-special packages",
  "Senior-friendly Vrindavan travel packages",
  "Family and group packages",
  "Hotel booking, from simple stays to 4 and 5-star properties",
];

/* ------------------------------------------------------------------ */
/* 4. The Ultimate Vrindavan Darshan Guide                             */
/* ------------------------------------------------------------------ */

export type TempleEntryData = {
  n: number;
  /** DOM anchor; also the schema @id fragment of the temple. */
  id: PlaceId;
  title: string;
  /** Static temple guide at /temples/[slug] (content/temples.ts), linked from the card. */
  templeSlug?: string;
  templeLinkLabel?: string;
  image?: ContentImage;
  blocks: GuideBlock[];
};

export const darshanGuide = {
  eyebrow: "Darshan guide",
  title: "The Ultimate Vrindavan Darshan Guide",
  intro:
    "This is the heart of the page, and the part I enjoy most. I have visited these temples thousands of times, and each visit still teaches me something.",
  note: {
    label: "A note on timings:",
    text: "Temple timings in Vrindavan change with the season and during festivals, and temple management sometimes revises schedules and crowd rules. What I share below is the usual pattern I have seen over the years. I always reconfirm with the temple the day before every guest's visit, and I suggest you do the same.",
  },
  otherTitle: "Other Temples Worth Your Time",
};

export const templeEntries: TempleEntryData[] = [
  {
    n: 1,
    id: "temple-banke-bihari",
    title: "Shri Banke Bihari Temple: Timings, Customs and Crowd Secrets",
    templeSlug: "banke-bihari",
    templeLinkLabel: "Banke Bihari temple guide",
    image: images.bankeBihari,
    blocks: [
      { kind: "text", text: "If Vrindavan has a beating heart, it is Banke Bihari. Almost every pilgrim comes here first." },
      {
        kind: "text",
        label: "The spiritual story:",
        text: "The deity was revealed to the saint-musician **Swami Haridas** at Nidhivan through his devotional music. According to tradition, Haridas ji sang so lovingly that Radha and Krishna appeared together, and at his request they merged into a single form: **Banke Bihari**. The word *banke* means bent in three places, referring to Krishna's graceful *tribhanga* pose. The present temple was built in the nineteenth century.",
      },
      {
        kind: "text",
        label: "The curtain tradition:",
        text: "Do not be surprised when the curtain in front of the deity is drawn and opened again and again. The belief is that if you look at Bihari ji too steadily, his eyes will captivate you, and he may follow you home. The pujaris draw the curtain every few moments to protect devotees from that overpowering love. It is part of the temple's living lore, not an inconvenience.",
      },
      {
        kind: "text",
        label: "Why there is no regular mangala aarti:",
        text: "Bihari ji is worshipped as a young, playful child who has spent the night in Raas, so he is allowed to rest later. The special mangala aarti happens only on **Janmashtami**. This is one of the traditions that most surprises first-timers.",
      },
      {
        kind: "seasons",
        label: "Typical darshan timings (approximate, check before you go):",
        columns: ["Season", "Morning", "Evening"],
        rows: [
          { season: "**Summer** (roughly April to September)", morning: "About 7:45 a.m. to 12:00 noon", evening: "About 5:30 p.m. to 9:30 p.m." },
          { season: "**Winter** (roughly October to March)", morning: "About 8:45 a.m. to 1:00 p.m.", evening: "About 4:30 p.m. to 8:30 p.m." },
        ],
      },
      {
        kind: "tips",
        label: "My insider tips for Banke Bihari:",
        items: [
          "**Go on a weekday, right at opening.** The first hour is the calmest. By mid-morning the lane can be shoulder to shoulder.",
          "**Avoid Saturdays, Sundays, Ekadashi, Purnima and public holidays** if you can. Crowds multiply on these days.",
          "**Leave phones, cameras and bags in your vehicle or hotel.** Mobile phones and photography are generally not permitted inside the sanctum, and pickpocketing is a real concern in dense crowds. Lockers are available nearby, and we help you with them.",
          "**Elderly pilgrims should come with an attendant** or with our team. The lanes are narrow, and we know the gentlest approach and the best places to rest.",
          '**Ignore the "VIP darshan" offers.** If someone on the street promises you a shortcut for money, politely refuse. Genuine darshan does not need to be bought.',
          "**Where to stand:** In the main hall, patiently move to the sides. Many pilgrims find they get a longer, clearer look from the left or right than from the middle crush. Be respectful of those around you, because everyone has waited a long time for this moment.",
          "**What to offer:** Simple items are best: flowers, tulsi leaves or a small box of pedas. Large donations to strangers outside are unnecessary.",
          "**Wear light clothing.** A packed hall gets very warm, even in winter.",
        ],
      },
    ],
  },
  {
    n: 2,
    id: "temple-prem-mandir",
    title: "Prem Mandir: The Evening Light Show",
    templeSlug: "prem-mandir",
    templeLinkLabel: "Prem Mandir temple guide",
    image: images.premMandir,
    blocks: [
      {
        kind: "text",
        text: "If Banke Bihari is the heart of Vrindavan, Prem Mandir is the jewel in its crown. It was founded by **Jagadguru Kripalu Maharaj** and opened to the public in **2012**. It is built of white Italian marble and carved with great care to depict scenes from Krishna's life, including his birth in the prison, the lifting of Govardhan and the Raas leela. Inside you will find Radha-Krishna and Sita-Ram.",
      },
      {
        kind: "text",
        tone: "highlight",
        label: "The light show:",
        text: "After sunset, the entire temple is lit in changing colours, and the marble seems to glow from within. A musical fountain and illumination display draws large evening crowds. The first time I saw it as a young man, I stood still for a long time. Even now, after countless visits, the sight of Prem Mandir turning gold, then blue, then pink against a dark sky quietens me.",
      },
      {
        kind: "timing",
        label: "Typical timings (approximate):",
        text: "Roughly 5:30 a.m. to 12 noon, and then about 4:30 p.m. to 8:30 p.m. Evening illumination and the show are in the later hours. Please confirm the show schedule on the day.",
      },
      {
        kind: "tips",
        label: "My tips for Prem Mandir:",
        items: [
          "**Visit twice in one day if you can.** Come in daylight to study the carvings, and again after dark for the lights.",
          "**Arrive well before sunset.** The best photographs happen just after the sun goes down, when the sky still holds a trace of blue and the marble starts to glow.",
          "**Expect restrictions on mobile phones** inside the main sanctum and use the designated lockers.",
          "**Weekends and festivals get packed.** If you are coming on a Saturday or Sunday, keep extra time for entry and parking.",
          "**Children love it.** Families with young kids often tell me this was the highlight.",
          "**Do not rush.** People underestimate how long it takes to see every panel and gallery.",
        ],
      },
    ],
  },
  {
    n: 3,
    id: "temple-iskcon",
    title: "ISKCON Vrindavan: Shri Krishna Balaram Mandir",
    templeSlug: "iskcon-krishna-balaram",
    templeLinkLabel: "ISKCON Vrindavan temple guide",
    blocks: [
      {
        kind: "text",
        text: "ISKCON's Krishna Balaram Mandir was inaugurated in **1975** and was founded by **A.C. Bhaktivedanta Swami Prabhupada**. It holds the deities of **Krishna-Balaram**, **Radha-Shyamasundar** and **Gaura-Nitai**. In the courtyard stands the samadhi of Srila Prabhupada, a calm place for reflection.",
      },
      {
        kind: "text",
        text: "What I love most is the kirtan. Devotees from many countries sing and dance in the courtyard, and even sceptical visitors often find themselves clapping along. The temple is also very clean and well organised.",
      },
      {
        kind: "timing",
        label: "Typical timings:",
        text: "Early morning mangala aarti from around 4:30 a.m., a midday closing, and an afternoon-to-evening session until about 8:30 p.m. Confirm before your visit.",
      },
      {
        kind: "tips",
        label: "My tips:",
        items: [
          "**Come for the evening aarti and kirtan.** It is a different mood from the older temples.",
          "**Try the prasadam** if you have time. It is simple, hygienic and satvik.",
          "**Dress modestly.** The temple is welcoming but takes decorum seriously.",
          "**Visit the bookstore and the museum** if you are curious about Vaishnava philosophy.",
        ],
      },
    ],
  },
  {
    n: 4,
    id: "nidhivan",
    title: "Nidhivan: The Mystery and Spiritual Significance",
    templeSlug: "nidhivan",
    templeLinkLabel: "Nidhivan guide",
    image: images.nidhivan,
    blocks: [
      { kind: "text", text: 'Nidhivan is the place I take guests when they ask me, "Where is the real Vrindavan?"' },
      {
        kind: "text",
        text: "It does not look like much at first. It is a small, enclosed grove of low, twisted, knotted trees, locally believed to be **tulsi** plants (some identify them as *vana tulsi*), growing in pairs. But walk in quietly and you feel a hush you will not find elsewhere in town.",
      },
      {
        kind: "panel",
        tone: "dusk",
        blocks: [
          {
            kind: "text",
            label: "What the tradition says:",
            text: "Braj tradition holds that every night, Radha, Krishna and the gopis return to Nidhivan to perform the divine **Raas**. The trees, it is said, become gopis to dance with Krishna and turn back into trees by morning. Because of this, the grove is closed after dusk. Local belief says no human, bird or animal is allowed to stay within at night.",
          },
          {
            kind: "text",
            label: "The Rang Mahal:",
            text: "Inside is a small shrine called the **Rang Mahal**. Each evening, the priests prepare a bed and lay out items for Radha's adornment, along with sweets, paan and water. The doors are locked for the night. In the morning, devotees say the bed is found disturbed, the paan chewed and the water used. Pilgrims take this prasad as an indication that the divine couple had rested there.",
          },
          {
            kind: "text",
            label: "Other stories you will hear:",
            text: "Local elders tell of people who tried to stay behind or watch from the surrounding rooftops and lost their sight or speech, or even their sanity. The nearby houses are said to have no windows facing the grove. You will hear the story told with absolute seriousness by Brijwasis.",
          },
          {
            kind: "text",
            label: "How I explain it to guests:",
            text: "I am not here to argue anyone into belief or out of it. I have heard sceptics and devotees alike discuss Nidhivan, and I simply tell guests what Braj has believed for centuries. What I can promise is that the stillness of the place is real, and many of my pilgrims have felt moved here in ways they could not explain. I invite you to stand quietly, close your eyes, listen to the leaves, and let your own heart decide.",
          },
          {
            kind: "text",
            label: "Close by:",
            text: "**Seva Kunj**, where tradition says Radha-Krishna rested after the Raas, and the **Swami Haridas Samadhi** are nearby. They make a natural group, and I usually take guests to all three in sequence.",
          },
          {
            kind: "tips",
            label: "Practical tips:",
            items: [
              "**Visit early morning** when the grove is silent and the light is soft.",
              "**Respect the closing hour.** Nidhivan closes at dusk (roughly 7 to 8 p.m., depending on season), so do not leave it for the end of your day.",
              "**Keep your voice low and put away your phone.** Photography rules vary, so follow the signs and guards.",
              "**Beware of monkeys.** They are everywhere. Keep glasses, snacks and phones tucked away.",
              '**Do not believe anyone who claims to offer "night entry."** There is none.',
            ],
          },
        ],
      },
    ],
  },
  {
    n: 5,
    id: "temple-radha-raman",
    title: "Radha Raman Temple",
    templeSlug: "radha-raman",
    templeLinkLabel: "Radha Raman temple guide",
    blocks: [
      {
        kind: "text",
        text: "One of Vrindavan's most revered temples, Radha Raman is dedicated to a **self-manifested** deity. According to tradition, the saint **Gopal Bhatta Goswami**, a close follower of Chaitanya Mahaprabhu, prayed for a vision of Krishna in his full form, and the deity emerged from a shaligram stone in the sixteenth century. The deity is small, only around a foot tall, yet extraordinarily beautiful.",
      },
      {
        kind: "text",
        text: "There is no separate idol of Radha. Instead, a decorated crown is placed beside the Lord to represent her. The temple is also known for its ancient kitchen, where a sacred flame is said to have been kept burning for centuries. It is peaceful, traditional and less crowded than Banke Bihari, which makes it a favourite for pilgrims who want a quiet moment.",
      },
      { kind: "text", label: "My tip:", text: "Visit in the morning or early evening, and spend a few quiet minutes in the courtyard rather than hurrying out." },
    ],
  },
  {
    n: 6,
    id: "temple-rangji",
    title: "Shri Rangji Mandir (Ranganatha Temple)",
    templeSlug: "rangji",
    templeLinkLabel: "Rangji Mandir temple guide",
    blocks: [
      {
        kind: "text",
        text: "Rangji Mandir surprises first-time visitors because it looks different from the other temples. It is built in the **South Indian Dravidian style**, with a tall gopuram, a large courtyard and a flagstaff plated in metal. It was built in the mid-nineteenth century and is dedicated to **Lord Ranganatha**, a form of Vishnu reclining on the serpent Shesha, in the Sri Vaishnava tradition.",
      },
      {
        kind: "text",
        text: "I love bringing guests here because it shows how wide Vrindavan's devotional world is. Within a few kilometres, you pass from the playful Krishna of Banke Bihari to the majestic Vishnu of the South. The annual **Brahmotsav** festival, held in spring, features grand processions.",
      },
      { kind: "note", label: "Note:", text: "Entry rules and timings differ for certain parts of the temple and for non-Hindu visitors, so please check on the day." },
    ],
  },
];

export const otherTemples: { id: PlaceId; name: string; text: string; templeSlug?: string }[] = [
  { id: "temple-radha-vallabh", name: "Radha Vallabh Temple", templeSlug: "radha-vallabh", text: "Famous for its tradition of worshipping Radha as supreme and its beautiful *samaj gayan* music." },
  { id: "temple-madan-mohan", name: "Madan Mohan Temple", templeSlug: "madan-mohan", text: "One of the oldest in Vrindavan, standing on a high bank near the Yamuna." },
  { id: "temple-govind-dev", name: "Govind Dev Temple", templeSlug: "govind-dev-ji", text: "A once-grand temple built in the sixteenth century, with a dramatic red sandstone structure." },
  { id: "temple-gopeshwar-mahadev", name: "Gopeshwar Mahadev", text: "A rare Shiva temple in Vrindavan, where Shiva is said to have come in the form of a gopi to join the Raas." },
  { id: "keshi-ghat", name: "Keshi Ghat", text: "On the Yamuna, where I take guests for the quiet evening **Yamuna Aarti** and a few moments by the water." },
];

/* ------------------------------------------------------------------ */
/* 5. Vrindavan Parikrama                                              */
/* ------------------------------------------------------------------ */

export const parikrama = {
  eyebrow: "Parikrama",
  title: "Vrindavan Parikrama: The Significance of the Sacred Circle",
  lead: "If you ask me what to do in Vrindavan if you have the energy, I will say:",
  leadEmphasis: "walk the Parikrama.",
  stats: ["~10 km", "Clockwise", "Best before sunrise"],
  blocks: [
    {
      label: "What it is:",
      text: "The Vrindavan Parikrama is a circular path of roughly **10 kilometres** around the holy town. Pilgrims walk it clockwise, often barefoot, chanting the names of Radha and Krishna. In the Braj tradition, circumambulating a sacred place is an act of surrender: you put the Lord at the centre of your life and walk around him.",
    },
    {
      label: "Why it matters:",
      text: "Braj tradition teaches that every step on this path counts. The Parikrama passes through the ancient groves and lanes where the divine leelas are believed to have happened. It is not a hike. It is a slow, meditative way to be inside the holy land rather than only a visitor to it.",
    },
    {
      label: "The best time:",
      text: "Early morning, before sunrise, when the path is quiet and the air is cool. In summer, please start before dawn, because the afternoon sun is harsh. Winter mornings are lovely but cold and sometimes foggy.",
    },
  ],
  memory: {
    label: "My personal memory:",
    text: 'Years ago I walked it with an elderly woman who insisted on going barefoot. At every turn she paused, touched the ground and whispered something. When I asked what she was saying, she smiled and said, "I\'m asking Radha Rani\'s permission to walk in her home." I have never forgotten that.',
    quote: "I'm asking Radha Rani's permission to walk in her home.",
  },
  tipsLabel: "Practical tips:",
  tips: [
    "**Start at Vrindavan's Parikrama Marg** and follow the crowd. The route is well marked by devotees.",
    "**Wear comfortable footwear.** Many walk barefoot, but the road can be hot or rough.",
    "**Carry water and a light snack**, and keep them zipped away from monkeys.",
    "**Not fit for the full 10 km?** We arrange a shorter, partial Parikrama or an easier vehicle-assisted version for elders. A pilgrim's love matters more than distance.",
    "**Go with a companion** and keep valuables minimal.",
  ],
};

/* ------------------------------------------------------------------ */
/* 6. Luxury Stays in Vrindavan                                        */
/* ------------------------------------------------------------------ */

/** Named only once HOTEL_PARTNERS_CONFIRMED is true (config/site.ts). */
export const HOTEL_PARTNERS = ["Nidhivan Sarovar Portico", "Kridha Residency"] as const;
export const namedHotels: readonly string[] = HOTEL_PARTNERS_CONFIRMED ? HOTEL_PARTNERS : [];

/** HOTEL SWITCH (1 of 2): the stays paragraph. Unconfirmed = the PDF sentence with only the two names removed. */
const hotelOptions = HOTEL_PARTNERS_CONFIRMED
  ? `options may include well-regarded properties such as **${HOTEL_PARTNERS[0]}** and **${HOTEL_PARTNERS[1]}**, along with other comfortable partner hotels.`
  : "options may include well-regarded properties along with other comfortable partner hotels.";

export const stays = {
  eyebrow: "Luxury stays",
  title: "Luxury Stays in Vrindavan: Comfort After a Long Day of Darshan",
  intro:
    "After a day of walking in temple lanes, a comfortable bed matters more than people expect. Many of our guests, especially seniors, families and first-time visitors, want a proper rest in a clean, safe, welcoming place.",
  hotels: `That is why our **Vrindavan travel packages** can include premium stays at **4 and 5-star hotels in Vrindavan**. Depending on availability and your budget, ${hotelOptions} Staying at a good hotel close to the temple area saves you travel time, gives you a calm place to rest in the afternoon and makes early-morning darshan much easier.`,
  benefitsTitle: "What a good stay does for your yatra:",
  benefits: [
    { icon: "proximity", text: "**Proximity.** You are minutes away from the major temples, which helps with early starts." },
    { icon: "food", text: "**Cleanliness and satvik food.** Many hotels offer vegetarian meals that respect the spirit of the place." },
    { icon: "rest", text: "**Rest for elders.** A quiet room and a midday break mean more energy for evening aarti." },
    { icon: "safety", text: "**Safety and comfort for families,** especially women travelling with children." },
    { icon: "hassle", text: "**Hassle-free arrangements.** We coordinate check-in and timings so you are not left searching for a taxi after a long day." },
  ],
  budget: `**Budget travellers are very welcome.** If you prefer an ashram guesthouse, a dharamshala or a simple hotel, I will happily arrange it. A pilgrimage should not depend on your budget. Our packages start at **${PRICE}**, and you can add a premium stay when you want extra comfort. Tell me your preferences and I will suggest the right option, even if it is the simpler one.`,
} as const;

/* ------------------------------------------------------------------ */
/* 7. Local Vrindavan Food and Street Secrets                          */
/* ------------------------------------------------------------------ */

export const food = {
  eyebrow: "Food & street secrets",
  title: "Local Vrindavan Food and Street Secrets",
  intro:
    "Braj is the land where Krishna stole butter, so it is no surprise that its food is rich, creamy and unapologetically sweet. Almost everything in Vrindavan is **pure vegetarian**, and in many temple areas even onion and garlic are avoided. Here are my favourites.",
  items: [
    {
      title: "Lassi in a kulhad",
      emoji: "🥛",
      text: "Vrindavan lassi is thick, cool and often topped with a layer of malai, served in a clay kulhad. After a long walk in the sun, there is nothing better. Sweet is traditional, but salted and flavoured versions are also common. Look for the busy stalls where you see customers lining up. A thick, creamy lassi should almost need a spoon.",
    },
    {
      title: "Kachori-sabzi and bedmi puri",
      emoji: "🥟",
      text: "A typical Braj breakfast is **hot kachori with spicy aloo sabzi** and tangy chutney, or **bedmi puri**, a fried bread made from lentil-spiced dough. Go early, when the kachoris come fresh from the kadhai. If you are sensitive to spice, tell the vendor, and they will go easy on it.",
    },
    {
      title: "Rabri and jalebi",
      emoji: "🍯",
      text: "Thick, sweetened, slow-cooked milk, **rabri**, is eaten fresh in the early morning, often with hot jalebis. It is rich, so I suggest sharing it. Fresh, still-warm jalebi with rabri is one of the great Braj pleasures.",
    },
    {
      title: "Peda, malpua and thandai",
      emoji: "🍬",
      list: [
        "**Vrindavan and Mathura peda:** Grainy, caramelised and made from slow-cooked khoa. Ask for a taste before you buy a large box.",
        "**Malpua with rabri:** Especially popular around festivals.",
        "**Thandai:** A cooling, spiced milk drink, popular in summer and during Holi.",
        "**Makhan mishri:** Butter with sugar crystals, a beloved offering to Krishna.",
      ],
    },
  ] as { title: string; emoji: string; text?: string; list?: string[] }[],
  chooseTitle: "How I choose where to eat",
  choose: [
    "**Pick busy stalls.** High turnover means fresh food.",
    "**Prefer hot, freshly fried items** over anything that has been sitting out.",
    "**Be careful with ice and cut fruit** in peak summer.",
    "**Drink bottled or filtered water** if your stomach is sensitive.",
    "**Check with us if you are diabetic or elderly.** We plan lighter food stops for you.",
  ],
  secretsTitle: "A few local secrets",
  secrets: [
    "**Quiet lanes around Seva Kunj and the old temple areas** feel almost like a village, even in the middle of town. Take a slow walk here in the late afternoon.",
    '**Say "Radhe Radhe" to everyone,** including shopkeepers. It changes how people treat you.',
    "**Buy souvenirs from established stores:** tulsi malas, deity poshak, brass items and garlands. I can point you to fair-priced shops so you avoid tourist traps.",
    "**Keep an eye out for monkeys.** Never carry loose snacks, spectacles or phones in your hand.",
  ],
};

/* ------------------------------------------------------------------ */
/* 8. Travel Logistics and Best Time to Visit Vrindavan                */
/* ------------------------------------------------------------------ */

export const travel = {
  eyebrow: "Travel & best time",
  title: "Travel Logistics and Best Time to Visit Vrindavan",
  reachTitle: "How to reach Vrindavan",
  reach: [
    {
      icon: "train",
      label: "By train:",
      text: "**Mathura Junction** is the main railhead, about 11–15 km from Vrindavan, and is well connected to Delhi, Agra, Jaipur, Mumbai and beyond. Vrindavan has its own station, but fewer trains stop there.",
    },
    {
      icon: "road",
      label: "By road:",
      text: "The **Yamuna Expressway** and **NH-19** connect Vrindavan to Delhi (about 135–150 km, usually 3 to 3.5 hours) and Agra (about 70 km, roughly 1.5 to 2 hours). Parking near the temples is limited, so a local driver is a big help.",
    },
    {
      icon: "plane",
      label: "By air:",
      text: "The nearest major airport is **Delhi's Indira Gandhi International Airport**, from where a cab takes about three to three and a half hours. If a newer airport near Delhi-NCR has started operations by the time you travel, ask us and we will tell you the best route.",
    },
    { icon: "pickup", label: "Pick-up service:", text: "We can meet you at the airport, railway stations or your hotel." },
  ],
  trafficTitle: "How to avoid peak traffic",
  traffic: [
    "**Start early.** Reaching Vrindavan before 9 a.m. avoids most of the day's traffic.",
    "**Avoid weekends and festival days** when possible. Saturday and Sunday are the busiest.",
    "**Avoid arriving mid-day in summer or at night in dense winter fog.** Fog can slow Expressway travel in December and January.",
    "**Plan around Ekadashi and Purnima,** when more devotees than usual come into town.",
  ],
  localTitle: "Navigating e-rickshaws and local transport",
  localIntro: "Vehicles cannot enter many of the narrowest temple lanes. Here is how it works:",
  local: [
    { icon: "car", text: "**Private car or cab:** Best for the journey into town and between distant sites." },
    { icon: "rickshaw", text: "**E-rickshaws:** Excellent for short hops, especially in the old town. **Agree on the fare before you sit.**" },
    { icon: "walk", text: "**Walking:** Many darshan routes involve walking, so wear comfortable, easy-to-remove footwear." },
    { icon: "team", text: "**Our guests' advantage:** Our driver and team arrange drop-off points and walking routes in advance, so you are not guessing where to get off." },
  ],
  bestTimeTitle: "Best time to visit Vrindavan",
  seasons: [
    {
      tone: "best",
      text: "**October to March (best season):** Pleasant weather and festive energy, including Sharad Purnima, Kartik, Govardhan Puja and Diwali. Winter nights can be cold and foggy, so pack warm layers.",
    },
    { tone: "holi", text: "**February to March (Holi season):** Braj Holi is legendary, but extremely crowded. Book early." },
    { tone: "summer", text: "**April to June (summer):** Very hot, often over 40°C. Start before sunrise and rest during the afternoon." },
    {
      tone: "monsoon",
      text: "**July to September (monsoon):** Green and lovely, with **Jhulan Yatra** and **Janmashtami**. Expect humidity and occasional heavy rain.",
    },
  ] as { tone: "best" | "holi" | "summer" | "monsoon"; text: string }[],
  packingTitle: "Packing essentials",
  packing: [
    "Modest, comfortable clothes covering shoulders and knees",
    "Slip-on footwear (you will remove it often)",
    "A small cross-body bag with a zip",
    "Reusable water bottle, sunscreen, hat or scarf",
    "Warm shawl and socks in winter, as marble floors are cold",
    "Light umbrella or raincoat in monsoon",
    "Small cash in low denominations for offerings",
    "A copy of ID, basic medicines and hand sanitiser",
  ],
};

/* ------------------------------------------------------------------ */
/* 9. FAQ                                                              */
/* ------------------------------------------------------------------ */

/** HOTEL SWITCH (2 of 2): FAQ 19. Unconfirmed = the PDF answer with only the two names removed. */
const faq19 = HOTEL_PARTNERS_CONFIRMED
  ? `Yes. Our Vrindavan packages can include premium stays at hotels such as ${HOTEL_PARTNERS[0]} and ${HOTEL_PARTNERS[1]}, depending on availability and your budget. Simpler stays are available too.`
  : "Yes. Our Vrindavan packages can include premium stays at hotels, depending on availability and your budget. Simpler stays are available too.";

export const faqSection = { eyebrow: "FAQs", title: "Frequently Asked Questions About Vrindavan Tour Packages" };

export const faqs: { q: string; a: string }[] = [
  {
    q: "What is the best Vrindavan tour package for first-time visitors?",
    a: "For most first-timers, I recommend the **2-day Vrindavan stay package**. It lets you see the major temples at a gentle pace and experience both the morning silence of Nidhivan and the evening lights of Prem Mandir.",
  },
  {
    q: "How many days are enough for Vrindavan?",
    a: "Two days cover the main temples comfortably. One day is possible but rushed. If you want to add the Parikrama, Govardhan, Barsana and Mathura, three to four days make a richer Braj yatra.",
  },
  {
    q: "How much does a Vrindavan tour package cost?",
    a: `Our customised **Vrindavan tour packages start at ${PRICE}**. The final price depends on your group size, vehicle type, number of days and whether you add a hotel stay. I will always send a clear written quote before you pay anything.`,
  },
  {
    q: "What is included in your Vrindavan travel packages?",
    a: "Typically an AC vehicle, a driver, local guidance, darshan planning and pick-up and drop. Hotels, meals and special pujas can be added. I share a clear inclusions list before you confirm.",
  },
  {
    q: "What are the Banke Bihari Temple timings?",
    a: "As a general pattern, summer morning darshan is roughly 7:45 a.m. to 12 noon and evening about 5:30 to 9:30 p.m. In winter, mornings run roughly 8:45 a.m. to 1 p.m. and evenings 4:30 to 8:30 p.m. Timings change, so please confirm before you go. We check for all our guests.",
  },
  {
    q: "Are phones allowed in Banke Bihari Temple?",
    a: "Mobile phones, cameras and bags are generally not allowed inside the sanctum area. Lockers are available nearby, or you can leave valuables in your vehicle or hotel. Rules can change, so check on the day.",
  },
  {
    q: "What is the best time to visit Banke Bihari to avoid crowds?",
    a: "A weekday, within the first hour of opening. Avoid weekends, Ekadashi, Purnima and public holidays, and expect huge crowds during Holi and Janmashtami.",
  },
  {
    q: "What is the Prem Mandir light show timing?",
    a: "The illumination and fountain show take place in the evening, after sunset, in roughly the 6 to 8:30 p.m. window. The exact schedule varies by season, so confirm on the day. Arrive early to get a good spot.",
  },
  {
    q: "Is Prem Mandir free to enter?",
    a: "Entry to the temple has traditionally been free, though certain special shows or facilities may have separate arrangements. Please check at the time of your visit.",
  },
  {
    q: "Why is Nidhivan closed at night?",
    a: "Tradition says the divine Raas leela takes place in the grove every night, and no one is allowed to stay or watch. The temple closes at dusk and reopens in the morning. The mystery and belief around Nidhivan are central to its spiritual significance.",
  },
  {
    q: "Can I visit Nidhivan after sunset?",
    a: "No. The grove closes around dusk, which is usually between about 7 and 8 p.m. depending on the season. Please plan to be there earlier in the day.",
  },
  {
    q: "How long is the Vrindavan Parikrama?",
    a: "About 10 km. Many devotees walk barefoot at dawn. We can arrange a partial or vehicle-assisted version for those who cannot walk the full distance.",
  },
  {
    q: "Is Vrindavan suitable for senior citizens?",
    a: "Yes, with some planning. Many of our guests are elderly. We choose gentler routes, plan rest stops, arrange e-rickshaws or wheelchair help, and time temples to avoid the worst crowds.",
  },
  {
    q: "Is Vrindavan safe for women and solo travellers?",
    a: "Main temple areas are generally safe in the daytime. As in any crowded pilgrimage town, avoid isolated lanes at night, keep valuables hidden and travel with a trusted driver. Many women travel with our service every year, and we take extra care.",
  },
  {
    q: "What is the dress code for Vrindavan temples?",
    a: "There is no strict uniform, but modest clothing is expected. Cover your shoulders and knees, and avoid very short or sleeveless outfits.",
  },
  {
    q: "What food should I try in Vrindavan?",
    a: "Kachori-sabzi, bedmi puri, kulhad lassi, rabri with jalebi, peda, malpua and thandai. Everything is vegetarian, and many places avoid onion and garlic.",
  },
  { q: "How far is Vrindavan from Mathura?", a: "Roughly 11–15 km, usually 30 to 45 minutes by road, longer on festival days." },
  {
    q: "How do I get from Delhi to Vrindavan?",
    a: "By road via the Yamuna Expressway or NH-19, about 3 to 3.5 hours. By train, take a train to Mathura Junction and then a cab. We can arrange pick-up from Delhi airport or railway stations.",
  },
  { q: "Do you offer 4 and 5-star hotel stays in Vrindavan?", a: faq19 },
  {
    q: "How do I book a Vrindavan tour package with you?",
    a: `Call or WhatsApp **${PHONE_DISPLAY}**, email **${EMAIL}**, or visit **${WEBSITE}**. I will personally help you choose the right plan.`,
  },
];

/* ------------------------------------------------------------------ */
/* 10. Book Your Vrindavan Trip Today                                  */
/* ------------------------------------------------------------------ */

export const book = {
  eyebrow: "Book your trip",
  title: "Book Your Vrindavan Trip Today",
  paragraphs: [
    "I have been walking these lanes for more than eleven years, and I still feel a little shiver every time the first temple bell rings in the morning. A Vrindavan trip is not about checking off temples. It is about letting a place that has held devotion for centuries hold you for a few days.",
    `When you book with **${BRAND_NAME}**, you get a Braj-born guide, a team of local Brijwasis, transparent pricing from **${PRICE}**, comfortable stays at premium hotels if you want them, and a **${RATING}-star** reputation built on **${PILGRIMS} pilgrims** who trusted us with their yatra since ${FOUNDED}.`,
    "Tell me your dates, how many people are travelling and anything that matters, such as elderly parents, young children or a special festival. I will reply personally with a clear plan and a quote with no hidden charges. Whether you want a one-day Vrindavan darshan, a two-day stay or a relaxed weekend Vrindavan trip, I will make it smooth, safe and spiritually rewarding.",
  ],
  contact: [
    `📞 **Call or WhatsApp ${FOUNDER.name}:** **${PHONE_DISPLAY}**`,
    `✉️ **Email:** **${EMAIL}**`,
    `🌐 **Website:** **${WEBSITE}**`,
  ],
  stats: [`**${BRAND_NAME}**: serving pilgrims since ${FOUNDED}`, `⭐ ${RATING}-star rated`, `🙏 ${PILGRIMS} pilgrims guided`, `Packages from ${PRICE}`],
  closing: "Braj does not ask you to be perfect. It only asks you to come.",
  blessing: "Radhe Radhe.",
  signature: `— ${FOUNDER.name}, Founder, ${BRAND_NAME}`,
  whatsappMessage: "Radhe Radhe! I'd like to book a Vrindavan trip. Here are my dates and group size:",
};

/** Internal links the PDF's notes ask for (homepage, About, Mathura and Braj pages). UI labels only. */
export const relatedLinks = [
  { label: "Mathura Vrindavan tour packages", href: "/" },
  { label: `About ${FOUNDER.name}`, href: "/about" },
  { label: "Mathura", href: "/mathura" },
  { label: "Govardhan & Barsana", href: "/govardhan-barsana" },
  { label: "Full Braj Yatra", href: "/braj-yatra" },
];
