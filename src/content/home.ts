/**
 * Homepage copy, verbatim from HomeContent.pdf (founder's first-person voice).
 *
 * Inline markup in any string: `**bold**` → <strong>, `*italic*` → <em>.
 * The phone number, email and website are linked automatically wherever they appear (see components/home/landing/Rich.tsx).
 * Brand facts are interpolated from config/site.ts — never type them by hand here.
 */
import { BRAND_NAME, EMAIL, FOUNDED, FOUNDER, PHONE_DISPLAY, PILGRIMS, RATING, SITE_URL, YEARS } from "@/config/site";

const WEBSITE = `${SITE_URL}/`;
/** "75,000" — the prose says "over 75,000 pilgrims". */
const PILGRIM_COUNT = PILGRIMS.replace(/\+$/, "");

/** Date shown under the hero and used for `dateModified` in schema. Update it whenever this copy changes. */
export const LAST_UPDATED = "2026-10-22";

export type HomeImage = { src: string; alt: string; width: number; height: number };

/** Images still to be supplied — drop the files into /public/images/home/ with these exact names. */
export const images = {
  hero: {
    src: "/images/home/vishram-ghat-yamuna-aarti.webp",
    alt: "Pilgrims at Vishram Ghat in Mathura during evening Yamuna aarti, Mathura Vrindavan tour packages",
    width: 1200,
    height: 630,
  },
  founder: {
    src: "/images/home/founder-harsh-sharma.webp",
    alt: "Harsh Sharma, founder of Mathura Vrindavan Trips, guiding pilgrims near Krishna Janmabhoomi",
    width: 960,
    height: 1200,
  },
  packages: {
    src: "/images/home/pilgrim-family-ac-cab.webp",
    alt: "Pilgrim family in an AC cab with driver-guide on Mathura Vrindavan tour package route",
    width: 1200,
    height: 800,
  },
  bankeBihari: {
    src: "/images/home/banke-bihari-lane-morning.webp",
    alt: "Devotees queuing in the lane to Banke Bihari Temple Vrindavan early morning",
    width: 1200,
    height: 800,
  },
  premMandir: {
    src: "/images/home/prem-mandir-night-lights.webp",
    alt: "Prem Mandir Vrindavan lit up in colourful lights at night, a highlight of Mathura Vrindavan tour packages",
    width: 1200,
    height: 800,
  },
  food: {
    src: "/images/home/mathura-peda-kulhad-lassi.webp",
    alt: "Famous Mathura peda and kulhad lassi, local food on a Mathura Vrindavan tour",
    width: 1200,
    height: 800,
  },
  peda: { src: "/images/home/food-mathura-peda.webp", alt: "Brown, grainy Mathura pedas made from slow-cooked khoa", width: 800, height: 600 },
  lassi: { src: "/images/home/food-kulhad-lassi.webp", alt: "Thick Braj lassi topped with malai in a clay kulhad", width: 800, height: 600 },
  kachori: { src: "/images/home/food-kachori-bedmi-puri.webp", alt: "Kachori with aloo sabzi and bedmi puri, a typical Braj breakfast", width: 800, height: 600 },
  jalebi: { src: "/images/home/food-jalebi-rabri.webp", alt: "Hot jalebis served with a bowl of rabri", width: 800, height: 600 },
  book: {
    src: "/images/home/book-with-harsh-sharma.webp",
    alt: "Contact Mathura Vrindavan Trips to book Mathura Vrindavan tour packages with Harsh Sharma",
    width: 1200,
    height: 800,
  },
} satisfies Record<string, HomeImage>;

/* ------------------------------------------------------------------ */
/* Metadata                                                            */
/* ------------------------------------------------------------------ */

export const homeMeta = {
  /** ≤ 60 chars. The PDF suggestion (~87 chars) would be truncated in results. */
  title: "Mathura Vrindavan Tour Packages | 1, 2 & 3 Day Pilgrim Tours",
  /** ≤ 160 chars. */
  description: `Book Mathura Vrindavan tour packages with ${FOUNDER.name}, a Mathura-born guide: ${YEARS} years, ${RATING}★ rating, ${PILGRIMS} pilgrims served. Call ${PHONE_DISPLAY}.`,
  keywords: [
    "mathura vrindavan tour packages",
    "mathura vrindavan tour package",
    "mathura vrindavan package tour",
    "mathura vrindavan travel packages",
    "mathura vrindavan tour",
    "mathura vrindavan trip",
  ],
};

/* ------------------------------------------------------------------ */
/* Table of contents — ids are stable anchors for every H2             */
/* ------------------------------------------------------------------ */

export const toc = [
  { id: "founder-story", label: "Founder's story" },
  { id: "braj-bhoomi", label: "Braj Bhoomi" },
  { id: "tour-packages", label: "Tour packages" },
  { id: "darshan-guide", label: "Darshan guide" },
  { id: "why-choose-us", label: "Why choose us" },
  { id: "food-guide", label: "Food guide" },
  { id: "travel-logistics", label: "Travel & logistics" },
  { id: "faq", label: "FAQs" },
  { id: "last-words", label: "Last words" },
  { id: "book", label: "Book your tour" },
] as const;

export type TocId = (typeof toc)[number]["id"];

/* ------------------------------------------------------------------ */
/* 1. Hero                                                             */
/* ------------------------------------------------------------------ */

export const hero = {
  eyebrow: `Mathura Vrindavan Tour Packages by ${FOUNDER.name} | Trusted Local Guide Since ${FOUNDED}`,
  title: "Mathura Vrindavan Tour Packages: Walk the Holy Land of Radha and Krishna with a Guide Who Was Born Here",
  greeting: "Radhe Radhe, dear traveller.",
  intro: [
    `My name is ${FOUNDER.name}. I was born in ${FOUNDER.bornIn}, and I have spent my whole life walking the lanes that Shri Krishna walked as a child. Since ${FOUNDED} I have been welcoming pilgrims from every corner of India and from across the world through **${BRAND_NAME}**. Our **Mathura Vrindavan tour packages** are built the way I would plan a visit for my own mother: unhurried, spiritually rich, comfortable, and honest.`,
    `So far we have guided **over ${PILGRIM_COUNT} pilgrims**, and our guests have given us a **${RATING}-star rating**. I do not say this to boast. Every one of those people trusted us with something sacred, a long-awaited darshan or a promise made to a parent, and that trust is the most precious thing I own.`,
    "If you are searching for a **Mathura Vrindavan tour package** that treats this land as a living pilgrimage rather than a checklist of sightseeing stops, you have come to the right place.",
  ],
  contactTitle: "Talk to me directly:",
  contactLabels: { call: "📞 Call or WhatsApp:", email: "✉️ Email:", website: "🌐 Website:" },
  website: WEBSITE,
  afterTrust: [
    "Whether you want a quick **Mathura Vrindavan tour** in a single day, a relaxed two-day yatra, or a full three-day Braj experience with Govardhan, Barsana and Gokul, this page will help you plan it. I have also put everything I have learned in eleven years into the sections below: temple timings, crowd secrets, food, weather, transport, packing, and answers to the questions pilgrims ask me most often.",
    "Please grab a cup of chai and read on. I promise it will be worth your time.",
  ],
};

export const trustStats = [
  { value: FOUNDED, label: "Since" },
  { value: `${RATING}★`, label: "Rating" },
  { value: PILGRIMS, label: "Pilgrims" },
  { value: YEARS, label: "Years" },
];

/* ------------------------------------------------------------------ */
/* 2. Founder's story                                                  */
/* ------------------------------------------------------------------ */

export const founderStory = {
  eyebrow: "Founder's story",
  title: `Why I Started ${BRAND_NAME} in ${FOUNDED}: A Founder's Story`,
  story: [
    "I was born in Mathura, a few minutes' walk from the lanes around Holi Gate. As a child, my day began with the sound of temple bells and the smell of fresh jalebis frying in huge iron kadhais. My grandmother woke us before sunrise, and we walked to the Yamuna to wash our faces in her water before anything else. In Braj we do not call it \"the river.\" We say **Yamuna Maiya**, Mother Yamuna. Nobody here thinks that is strange. It is simply how we grew up.",
    "I did not set out to become a guide. In my early twenties I was helping a cousin who drove a taxi, and one winter a family from Pune arrived at Mathura Junction, exhausted, confused, and already being pulled in four directions by touts offering \"special darshan.\" The grandfather was nearly in tears. He had saved for years to see **Banke Bihari ji**, and within an hour of arriving he had been overcharged and rushed.",
    "I took them under my wing that day. I walked them to Vishram Ghat, then to Krishna Janmabhoomi, and the next morning to Vrindavan, timing everything so they reached Banke Bihari before the worst crowd. When the old man finally stood in front of the deity, he held my hand and wept. He did not say anything. He did not need to.",
    "That day I understood what my work was. Pilgrims are not customers who need processing.",
  ],
  pullQuote: "They are devotees who need **protection, patience, and a good local guide who loves this place as much as they do.**",
  promise: `In **${FOUNDED}** I formally started ${BRAND_NAME} with a very small team and a very simple promise: *no tricks, no rushing, no fake darshan, and no hidden charges.* More than eleven years later, I still run the company on those four principles.`,
  principles: ["No tricks", "No rushing", "No fake darshan", "No hidden charges"],
  lessons: {
    title: "What eleven years on the ground has taught me",
    intro: `Anyone can read a temple's timings on the internet. What I carry in my head after ${YEARS} years is the kind of knowledge no brochure has:`,
    items: [
      { icon: "clock", text: "**Which lane is quiet at 6 a.m.** and which one is impossible after 10." },
      { icon: "users", text: "**Which days the Banke Bihari crowd doubles**, and why a Tuesday afternoon in January is a completely different experience from a Sunday in March." },
      { icon: "sweet", text: "**Where to find the Vrindavan sweet-shop** that makes its rabri fresh each morning, and which stall to skip even though it has a loud signboard." },
      { icon: "shield", text: "**How to read a pandit's intention.** Honest priests are the soul of Braj. A few others see a pilgrim and see only a purse. I know who is who, and I will always steer you towards the right ones." },
      { icon: "monkey", text: "**When monkeys are most active** (yes, this matters; protect your spectacles and phone!)." },
    ],
  },
  connection: {
    title: "My personal connection to Radharani and Krishna",
    paragraphs: [
      "People sometimes ask whether I do this only as a business. My answer is always the same. In Braj, we do not say \"Krishna\" alone. We say **\"Radhe Radhe\"** to greet one another, because Radha Rani is the queen of this land. Krishna is the Lord, but in Vrindavan, it is her kingdom. She is the *Braj Ki Adhishwari*, the ruler of Braj, and every devotee knows that Krishna cannot be reached without her grace.",
      "I have lost count of the times I have stood at Nidhivan at dusk, or on the steps of Radha Kund before dawn, feeling that I am being allowed to live inside a story that has not ended. That feeling is why, after more than a decade, I still wake up excited to take new pilgrims around.",
      "When you book one of our **Mathura Vrindavan travel packages**, you are not booking a transaction with a faceless agency. You are putting your yatra in the hands of a Braj-born family that treats every pilgrim as a guest sent by Thakur ji himself.",
    ],
  },
};

/* ------------------------------------------------------------------ */
/* 3. Understanding Braj Bhoomi                                        */
/* ------------------------------------------------------------------ */

export const brajBhoomi = {
  eyebrow: "Braj Bhoomi",
  title: "Understanding Braj Bhoomi: The History Behind Your Pilgrimage",
  intro:
    "Before I explain our packages, let me give you the background. A pilgrimage means much more when you know what you are looking at. This is the short version of what I tell my guests in the car on the way in.",
  cards: [
    {
      title: "Mathura: The birthplace",
      paragraphs: [
        "Mathura is among the oldest living cities in India. Ancient texts describe it as the capital of the **Shurasena kingdom**, ruled in the Dwapara Yuga by the tyrant **Kamsa**. It was in Kamsa's prison, to Devaki and Vasudeva, that **Shri Krishna was born on the ashtami of Bhadrapada's dark fortnight**, a night we now celebrate as **Janmashtami**.",
        "Historically, Mathura was also a flourishing centre of art and trade. The **Mathura school of sculpture**, famous across ancient India, produced some of the earliest known images of the Buddha and Jain Tirthankaras alongside Hindu deities. Chinese pilgrims such as Fa-Hien and Hiuen Tsang described monasteries here. The city has seen empires rise and fall, and invaders damage its temples, yet the devotion of its people has never been broken.",
      ],
    },
    {
      title: "Vrindavan: The playground of divine love",
      paragraphs: [
        "If Mathura is the place of Krishna's birth, **Vrindavan** is where his *leela* (divine play) with Radha, the gopis, and his childhood friends blossomed. The name comes from *Vrinda* (the sacred tulsi plant) and *vana* (forest). Once it was a dense forest of tulsi, kadamb and peepal trees, where Krishna played the flute and danced the Raas.",
        "By the early medieval period the forest had largely faded from memory. The great saint-poets and acharyas of the sixteenth century rediscovered the sacred sites. **Chaitanya Mahaprabhu** visited in the early 1500s, and his followers, the famous **Six Goswamis of Vrindavan**, identified the holy places and built temples such as Govind Dev, Madan Mohan, Radha Raman and Gopinath. Others, like **Swami Haridas**, the revered musician-saint and guru of Tansen according to tradition, established the devotional traditions that continue to this day.",
      ],
    },
    {
      title: "The wider Braj region",
      paragraphs: [
        "The word **Braj** refers to the larger holy region spread across modern Uttar Pradesh, with parts in Rajasthan and Haryana. Its sacred geography is called the **84 Kos Braj Mandal**, a pilgrimage circuit of about 84 kos (roughly 250 km). Besides Mathura and Vrindavan, it includes:",
      ],
    },
  ],
  places: [
    "**Govardhan**, the sacred hill Krishna lifted on his little finger to protect the villagers from Indra's wrath.",
    "**Barsana**, the hometown of Radha Rani.",
    "**Nandgaon**, where Krishna was raised by Nanda Baba and Yashoda Maiya.",
    "**Gokul** and **Raval**, linked with his infancy, and with Radha's birth in Raval.",
    "**Radha Kund and Shyam Kund**, which many consider the holiest kunds in all Braj.",
  ],
  closing:
    "When you book a **Mathura Vrindavan package tour** with us, I design your route so the story unfolds in a sensible order. You will not hop between places randomly; you will follow the arc of Krishna's life from birth to boyhood to the play of divine love.",
};

/* ------------------------------------------------------------------ */
/* 4. Signature packages                                               */
/* ------------------------------------------------------------------ */

/** A stop on a signature tour. `ref` points at a Darshan Guide entry (used to connect schema nodes). */
export type Stop = { name: string; ref?: AttractionId };

export type SignaturePackage = {
  id: "trip-1-day" | "trip-2-day" | "trip-3-day";
  days: 1 | 2 | 3;
  heading: string;
  /** Name used in schema and WhatsApp messages. */
  name: string;
  popular?: boolean;
  intro: string;
  timeline?: { time: string; stop: string; text?: string }[];
  dayBlocks?: { title: string; rows?: { label: string; text: string }[]; text?: string }[];
  tip?: { label: string; text: string };
  /** Visible stops in order — feeds the TouristTrip itinerary. */
  stops: Stop[];
};

export const packagesSection = {
  eyebrow: "Tour packages",
  title: "Our Signature Mathura Vrindavan Tour Packages (1-Day, 2-Day & 3-Day)",
  intro:
    "Every pilgrim is different. Some come with elderly parents who cannot walk far. Some come with children who need frequent breaks. Some come alone, seeking silence. Over the years I have refined three core itineraries that suit most people, and each one can be customised.",
  includesTitle: "What all our Mathura Vrindavan tour packages include:",
  includes: [
    "Clean, air-conditioned vehicle (sedan, SUV, Tempo Traveller or mini-bus, depending on group size).",
    "An experienced, polite driver who knows the lanes of Braj.",
    "Guidance from me or a trained member of my local team.",
    "Pick-up and drop at Mathura Junction, Vrindavan, your hotel, or your preferred location.",
    "Darshan planned around **crowd timings** and temple closures.",
    "Help with temple rules, prasad, offerings and photography restrictions.",
    "Optional add-ons: hotel or dharamshala booking, aarti arrangements, Govardhan Parikrama support, and vegetarian meal planning.",
  ],
  vegLine: "All our tours are built around **pure vegetarian meals** and the sanctity of the places we visit.",
  ctaLabel: "Plan this yatra on WhatsApp",
  moreTitle: "More tour packages",
};

export const signaturePackages: SignaturePackage[] = [
  {
    id: "trip-1-day",
    days: 1,
    heading: 'The 1-Day Mathura Vrindavan Tour Package: "Braj Ek Jhalak"',
    name: "1-Day Mathura Vrindavan Tour Package: Braj Ek Jhalak",
    intro:
      "This is for the traveller short on time: a stopover from Delhi or Agra, a business trip with one free day, or a family testing the waters before a longer visit. It is naturally rushed, but a good plan can make it deeply satisfying. Here is how I structure the day.",
    timeline: [
      { time: "6:30 a.m.", stop: "Pick-up and drive to Mathura.", text: "We aim to reach Mathura early, before the day's traffic." },
      { time: "7:30 a.m.", stop: "Vishram Ghat.", text: "Krishna is said to have rested here after slaying Kamsa. A short boat ride or a quiet moment on the steps with the river in front of you is an ideal beginning." },
      { time: "8:30 a.m.", stop: "Krishna Janmabhoomi.", text: "We visit the Keshav Dev complex and the prison cell shrine marking the birth place. Early hours mean a much shorter security queue." },
      { time: "9:30 a.m.", stop: "Dwarkadhish Temple (optional).", text: "A grand haveli-style temple with intricate woodwork and lively festivals, especially Jhulan Yatra and Holi." },
      { time: "10:30 a.m.", stop: "Drive to Vrindavan.", text: "About 30–40 minutes depending on traffic." },
      { time: "11:30 a.m.", stop: "Banke Bihari Temple.", text: "Reaching here before the mid-day rush is important. We time this carefully." },
      { time: "1:00 p.m.", stop: "Lunch break.", text: "A simple satvik thali, with time to rest." },
      { time: "2:30 p.m.", stop: "ISKCON Temple (Krishna Balaram Mandir).", text: "The marble courtyard, the samadhi of Srila Prabhupada, and the kirtan are deeply peaceful." },
      { time: "4:00 p.m.", stop: "Prem Mandir.", text: "I always schedule Prem Mandir late, so you see the carved marble in daylight and then the **evening light show** as the sun goes down." },
      { time: "7:30 p.m.", stop: "Drop-off or onward travel." },
    ],
    tip: {
      label: "Harsh's tip",
      text: "One day is enough to taste Braj, but you will not feel finished. Many of our one-day guests call me within a year to book a longer return trip. That is how Braj works; it pulls you back.",
    },
    stops: [
      { name: "Vishram Ghat", ref: "vishram-ghat" },
      { name: "Krishna Janmabhoomi", ref: "temple-janmabhoomi" },
      { name: "Dwarkadhish Temple", ref: "temple-dwarkadhish" },
      { name: "Banke Bihari Temple", ref: "temple-banke-bihari" },
      { name: "ISKCON Temple (Krishna Balaram Mandir)", ref: "temple-iskcon" },
      { name: "Prem Mandir", ref: "temple-prem-mandir" },
    ],
  },
  {
    id: "trip-2-day",
    days: 2,
    heading: 'The 2-Day Mathura Vrindavan Tour Package: "Radha Krishna Yatra"',
    name: "2-Day Mathura Vrindavan Tour Package: Radha Krishna Yatra",
    popular: true,
    intro: "This is our most popular **Mathura Vrindavan package tour**, and honestly my personal favourite. Two days give you room to breathe.",
    dayBlocks: [
      {
        title: "Day 1: Mathura, Gokul and Vrindavan Evenings",
        rows: [
          { label: "Morning", text: "Vishram Ghat, Krishna Janmabhoomi, Dwarkadhish Temple." },
          { label: "Late morning", text: "Drive to **Gokul** and **Raman Reti**, where Krishna spent his early childhood. The sandy ground here is lovingly rolled upon by pilgrims, who consider it holy." },
          { label: "Afternoon", text: "Return to Mathura or head to Vrindavan for lunch and rest." },
          { label: "Evening", text: "ISKCON Temple for sandhya aarti and kirtan. The atmosphere at dusk is unforgettable." },
          { label: "Night", text: "Check-in at your Vrindavan stay." },
        ],
      },
      {
        title: "Day 2: The Heart of Vrindavan",
        rows: [
          { label: "Early morning", text: "Quiet walk to **Nidhivan** and **Seva Kunj**, followed by **Radha Raman Temple**." },
          { label: "Mid-morning", text: "**Banke Bihari Temple**, timed to avoid peak crowds." },
          { label: "Afternoon", text: "**Radha Vallabh Temple**, **Madan Mohan Temple**, **Govind Dev (visible parts)**, and **Rangji Mandir**." },
          { label: "Evening", text: "**Prem Mandir** with its night illumination." },
          { label: "Departure", text: "Drop-off at your station, airport, or hotel." },
        ],
      },
    ],
    stops: [
      { name: "Vishram Ghat", ref: "vishram-ghat" },
      { name: "Krishna Janmabhoomi", ref: "temple-janmabhoomi" },
      { name: "Dwarkadhish Temple", ref: "temple-dwarkadhish" },
      { name: "Gokul and Raman Reti", ref: "gokul" },
      { name: "ISKCON Temple", ref: "temple-iskcon" },
      { name: "Nidhivan", ref: "nidhivan" },
      { name: "Seva Kunj", ref: "seva-kunj" },
      { name: "Radha Raman Temple", ref: "temple-radha-raman" },
      { name: "Banke Bihari Temple", ref: "temple-banke-bihari" },
      { name: "Radha Vallabh Temple", ref: "temple-radha-vallabh" },
      { name: "Madan Mohan Temple", ref: "temple-madan-mohan" },
      { name: "Govind Dev (visible parts)" },
      { name: "Rangji Mandir", ref: "temple-rangji" },
      { name: "Prem Mandir", ref: "temple-prem-mandir" },
    ],
  },
  {
    id: "trip-3-day",
    days: 3,
    heading: 'The 3-Day Mathura Vrindavan Tour Package: "Complete Braj Parikrama Experience"',
    name: "3-Day Mathura Vrindavan Tour Package: Complete Braj Parikrama Experience",
    intro: "For those who want to *really* experience Braj, our three-day **Mathura Vrindavan travel package** adds the surrounding sacred sites that most short itineraries skip.",
    dayBlocks: [
      { title: "Day 1: Mathura and Gokul", text: "Vishram Ghat, Krishna Janmabhoomi, Dwarkadhish, Gokul, Raman Reti, Raval (birthplace of Radha), and an evening Yamuna aarti." },
      {
        title: "Day 2: Govardhan, Radha Kund and Barsana",
        text: "Early start to Govardhan. Depending on your fitness and time, we perform a **partial or full Govardhan Parikrama**, visit **Daan Ghati**, **Mansi Ganga**, and **Kusum Sarovar**, and then **Radha Kund and Shyam Kund**. In the afternoon, we continue to **Barsana**, where the hilltop **Shri Radha Rani Temple (Ladli Ji Mandir)** offers sweeping views and a powerful sense of presence. If time allows, we visit **Nandgaon**, with its Nand Bhawan temple on a hillock.",
      },
      {
        title: "Day 3: Vrindavan in Depth",
        text: "Nidhivan, Seva Kunj, Radha Raman, Radha Vallabh, Banke Bihari, Madan Mohan, Gopinath, Rangji, ISKCON, and **Prem Mandir**. We end the evening with a quiet moment on the banks of the Yamuna at Keshi Ghat.",
      },
    ],
    stops: [
      { name: "Vishram Ghat", ref: "vishram-ghat" },
      { name: "Krishna Janmabhoomi", ref: "temple-janmabhoomi" },
      { name: "Dwarkadhish", ref: "temple-dwarkadhish" },
      { name: "Gokul and Raman Reti", ref: "gokul" },
      { name: "Raval (birthplace of Radha)" },
      { name: "Govardhan Parikrama", ref: "govardhan" },
      { name: "Radha Kund and Shyam Kund", ref: "radha-kund" },
      { name: "Shri Radha Rani Temple (Ladli Ji Mandir), Barsana", ref: "barsana-ladli-ji" },
      { name: "Nandgaon", ref: "nandgaon" },
      { name: "Nidhivan", ref: "nidhivan" },
      { name: "Seva Kunj", ref: "seva-kunj" },
      { name: "Radha Raman", ref: "temple-radha-raman" },
      { name: "Radha Vallabh", ref: "temple-radha-vallabh" },
      { name: "Banke Bihari", ref: "temple-banke-bihari" },
      { name: "Madan Mohan", ref: "temple-madan-mohan" },
      { name: "Gopinath", ref: "temple-gopinath" },
      { name: "Rangji", ref: "temple-rangji" },
      { name: "ISKCON", ref: "temple-iskcon" },
      { name: "Prem Mandir", ref: "temple-prem-mandir" },
      { name: "Keshi Ghat" },
    ],
  },
];

export const customTours = {
  title: "Customised and Group Mathura Vrindavan Tours",
  intro: "Many of our guests need something different. Over the years we have arranged:",
  items: [
    { icon: "seniors", text: "**Senior citizen–friendly tours** with minimal walking, wheelchair help, and e-rickshaw support in narrow lanes." },
    { icon: "family", text: "**Family tours** with children, including child-friendly meal and rest breaks." },
    { icon: "groups", text: "**Corporate and school groups**, handled with more vehicles and extra guides." },
    { icon: "kirtan", text: "**Bhajan and kirtan mandali yatras**, with timings for satsang." },
    { icon: "festival", text: "**Festival-special tours** for Holi, Janmashtami, Radhashtami, and Govardhan Puja." },
    { icon: "globe", text: "**Foreign devotee tours**, where I speak in English and explain customs patiently." },
  ],
  closing: `If you need a **Mathura Vrindavan tour package** that does not quite match any of the above, just call me on **${PHONE_DISPLAY}**. We will design it together.`,
};

/* ------------------------------------------------------------------ */
/* 5. Darshan guide                                                    */
/* ------------------------------------------------------------------ */

export type AttractionId =
  | "temple-banke-bihari"
  | "temple-iskcon"
  | "temple-prem-mandir"
  | "temple-janmabhoomi"
  | "vishram-ghat"
  | "temple-dwarkadhish"
  | "temple-radha-raman"
  | "nidhivan"
  | "seva-kunj"
  | "temple-radha-vallabh"
  | "temple-madan-mohan"
  | "temple-gopinath"
  | "temple-rangji"
  | "govardhan"
  | "radha-kund"
  | "barsana-ladli-ji"
  | "nandgaon"
  | "gokul";

export type TempleBlock =
  | { kind: "text"; label?: string; text: string }
  | { kind: "tips"; label: string; items: string[] }
  | { kind: "seasons"; label: string; rows: { season: string; morning: string; evening: string }[] }
  | { kind: "places"; items: { id: AttractionId; text: string }[] };

export type DarshanEntry = {
  n: number;
  /** Anchor id, and the schema @id for single-site entries. */
  id: string;
  title: string;
  image?: HomeImage;
  blocks: TempleBlock[];
};

export const darshanGuide = {
  eyebrow: "Darshan guide",
  title: "The Ultimate Braj Darshan Guide: Temples, Timings and Insider Tips",
  intro:
    "This is the part I enjoy writing the most. I have visited these temples thousands of times, and each time I notice something new. Below is a deep-dive into the major darshan sites on any **Mathura Vrindavan tour**, with what to know before you go.",
  note: {
    label: "Important note:",
    text: "Temple timings change with the season (summer vs winter) and during festivals. The timings below are the general patterns I have observed over the years. Always confirm with us the day before your visit, as I do for all our guests.",
  },
  glanceTitle: "Timings at a glance",
  glanceCaption:
    "Approximate. Temple timings change with the season (summer vs winter) and during festivals. Always confirm with us the day before your visit.",
};

export const darshanEntries: DarshanEntry[] = [
  {
    n: 1,
    id: "temple-banke-bihari",
    title: "Shri Banke Bihari Temple, Vrindavan",
    image: images.bankeBihari,
    blocks: [
      {
        kind: "text",
        label: "Spiritual significance",
        text: "Banke Bihari is the beloved deity of Vrindavan. The word *banke* means \"bent in three places,\" describing the *tribhanga* posture of Krishna. The deity was revealed to the saint-musician **Swami Haridas** at **Nidhivan**, whose bhajans were so deeply devoted that Thakur ji manifested in a form joined as Radha and Krishna in one. The present temple was built in the nineteenth century, and the deity is worshipped here as a *child-like, playful* Krishna rather than a majestic one.",
      },
      {
        kind: "text",
        label: "A tradition that surprises first-timers",
        text: "At Banke Bihari, a **curtain is repeatedly drawn and opened** during darshan. Devotees say that if you gaze at Thakur ji too long without interruption, his playful, loving eyes will \"capture\" you and he may not let you go. The pujaris therefore draw the curtain every few moments. This is not an inconvenience. It is part of the temple's living lore.",
      },
      {
        kind: "text",
        text: "Another unique custom: **there is no mangala aarti** (pre-dawn aarti) here on most days, because it is said that Bihari ji, the divine child, is allowed to sleep late after nights of Raas leela. The special mangala aarti is performed only on **Janmashtami**.",
      },
      {
        kind: "seasons",
        label: "Typical timings (approximate)",
        rows: [
          { season: "Summer", morning: "roughly 7:45 a.m. to 12:00 noon", evening: "roughly 5:30 p.m. to 9:30 p.m." },
          { season: "Winter", morning: "roughly 8:45 a.m. to 1:00 p.m.", evening: "roughly 4:30 p.m. to 8:30 p.m." },
        ],
      },
      {
        kind: "tips",
        label: "My insider tips",
        items: [
          "**Go on a weekday** and reach before the temple opens. Weekends, Ekadashi, full-moon days and holidays can bring enormous crowds.",
          "**The lanes are very narrow.** I always advise elderly pilgrims to come with a family member or with us. We can guide you through the easiest approach and rest points.",
          "**Leave bags, phones and cameras in your vehicle or hotel.** Pickpocketing in dense crowds is a real concern, and mobile phones are not allowed inside the sanctum area in many cases.",
          "**Wear lightweight clothing**; the crowd can make the interior very warm.",
          "**Do not hand money to anyone who calls you \"VIP darshan.\"** Genuine devotion needs no tricks. We will show you the safest, most dignified way.",
          "**Prasad:** Offer simple items like pedas, flowers, or tulsi leaves. Avoid giving big donations to random \"pandits\" outside.",
          "**Where to stand:** If you want a clearer view, move patiently to the left side of the main hall; you often get a longer unobstructed look there than in the centre. Be patient and respectful with those around you.",
        ],
      },
    ],
  },
  {
    n: 2,
    id: "temple-iskcon",
    title: "ISKCON Vrindavan: Shri Krishna Balaram Mandir",
    blocks: [
      {
        kind: "text",
        label: "Spiritual significance",
        text: "Founded in **1975** by **A.C. Bhaktivedanta Swami Prabhupada**, the founder of ISKCON, this temple is one of the most globally recognised centres of Krishna consciousness. The beautiful white marble complex houses the deities of **Krishna-Balaram**, **Radha-Shyamasundar**, and **Gaura-Nitai**. The samadhi mandir of Srila Prabhupada sits in the courtyard, a peaceful place for silence and reflection.",
      },
      {
        kind: "text",
        label: "What I love most",
        text: "The *kirtan* here is hypnotic. Devotees from many countries dance in the courtyard, and even people who arrive curious or sceptical often find themselves swaying. The temple is also exceptionally clean and organised.",
      },
      { kind: "text", label: "Typical timings", text: "Generally open from about 4:30 a.m. with mangala aarti, closing around 1 p.m. for rest, reopening at roughly 4 p.m. until about 8:30 p.m." },
      {
        kind: "tips",
        label: "My insider tips",
        items: [
          "**Attend the evening aarti** (around sunset). The atmosphere is electric yet serene.",
          "**The prasadam here is excellent** and very hygienic. If you stay for a meal, you will have an authentic satvik experience.",
          "**Dress modestly.** The temple is welcoming but strict about decorum.",
          "**Visit the bookshop and museum** for a deeper insight into Vaishnava philosophy, especially if you are bringing curious teenagers.",
        ],
      },
    ],
  },
  {
    n: 3,
    id: "temple-prem-mandir",
    title: "Prem Mandir, Vrindavan",
    image: images.premMandir,
    blocks: [
      {
        kind: "text",
        label: "Spiritual significance",
        text: "Prem Mandir was established by **Jagadguru Kripalu Maharaj** and was opened to the public in **2012**. It is a modern marvel built in white Italian marble, with an intricately carved exterior depicting stories from Krishna's life. The name means \"Temple of Divine Love,\" and it enshrines **Radha-Krishna** and **Sita-Ram** along with scenes from the Bhagavata.",
      },
      {
        kind: "text",
        label: "What makes it special",
        text: "The sheer craftsmanship is astonishing. Thousands of carved panels narrate **Krishna leelas**, from his birth in prison to the lifting of Govardhan. In the evening, the entire structure is lit in changing colours, and a **musical fountain and light show** draws large crowds.",
      },
      { kind: "text", label: "Typical timings", text: "Generally open from around 5:30 a.m. to 12 noon and then 4:30 p.m. to 8:30 p.m. The light show typically runs in the evening hours." },
      {
        kind: "tips",
        label: "My insider tips",
        items: [
          "**Visit twice in one day if possible**: once in daylight to study the carvings, and again after dark when the lights come on.",
          "**Allow enough time**; people underestimate how long it takes to see everything.",
          "**Mobile phones are normally restricted inside the main sanctum**, so use the designated lockers.",
          "**For photographers:** The best photographs are taken just after sunset when the sky still has a trace of blue and the temple glows.",
          "**Avoid festival weekends** unless you enjoy crowds.",
        ],
      },
    ],
  },
  {
    n: 4,
    id: "temple-janmabhoomi",
    title: "Shri Krishna Janmabhoomi, Mathura",
    blocks: [
      {
        kind: "text",
        label: "Spiritual significance",
        text: "This is the place of **Shri Krishna's birth**, the *Garbha Griha* or prison cell in which Devaki and Vasudeva were held. Standing here you are in what tradition identifies as the **birth place of the Lord**. The complex is also known as **Katra Keshav Dev**, and the area has been a sacred site for millennia, with successive temples built and rebuilt on or near the spot over the centuries.",
      },
      {
        kind: "text",
        label: "What you will see",
        text: "The Garbha Griha shrine, the **Keshav Dev Temple**, the **Bhagavat Bhavan**, and a quiet complex of gardens and smaller shrines. There are strict security checks, as at many major sites in India.",
      },
      { kind: "text", label: "Typical timings", text: "Generally from about 5 a.m. to 12 noon and then 3 p.m. to 8 p.m., with winter variations." },
      {
        kind: "tips",
        label: "My insider tips",
        items: [
          "**Carry only the essentials.** Mobile phones, cameras, bags, and electronics are generally not allowed inside, so use the cloakroom facilities outside.",
          "**Arrive early** for shorter security lines.",
          "**Take time at the Garbha Griha.** Many pilgrims pass quickly because of the queue. Stand quietly for a moment and let the weight of the place settle in. For many of my guests this is the most emotional moment of the whole trip.",
          "**During Janmashtami**, the entire city is in festival mood, and darshan queues can be extremely long. If you plan that week, please book with us well ahead.",
        ],
      },
    ],
  },
  {
    n: 5,
    id: "vishram-ghat",
    title: "Vishram Ghat, Mathura",
    blocks: [
      {
        kind: "text",
        label: "Spiritual significance",
        text: "After slaying Kamsa, Krishna is said to have rested at this ghat on the Yamuna, hence the name *Vishram* (\"rest\"). It is the most important bathing ghat in Mathura. Traditionally, pilgrims begin Mathura Parikrama here.",
      },
      {
        kind: "text",
        label: "My favourite hour",
        text: "Sunrise, and again at evening aarti. The Yamuna aarti is a gentle ritual with lamps, bells and chants. It does not have the grandeur of larger aartis elsewhere in India, but it is deeply intimate and local.",
      },
      {
        kind: "tips",
        label: "Insider tips",
        items: [
          "**Boat rides** are available, but agree on the price before boarding.",
          "**Be cautious about bathing** if the water level or cleanliness concerns you. Many pilgrims simply sprinkle water on their head.",
          "**Beware of fake \"priests\"** insisting on rituals. Politely decline; we can introduce trustworthy pandits if you wish.",
        ],
      },
    ],
  },
  {
    n: 6,
    id: "temple-dwarkadhish",
    title: "Dwarkadhish Temple, Mathura",
    blocks: [
      {
        kind: "text",
        text: "Built in the early nineteenth century, this beautiful temple has carved pillars, painted ceilings, and a lively atmosphere. It follows the **Pushtimarg** tradition, where the deity is cared for like a beloved child, with seasonal clothing and carefully planned *bhog* offerings. It is especially colourful during **Holi, Jhulan Yatra and Hindola** festivals.",
      },
    ],
  },
  {
    n: 7,
    id: "temple-radha-raman",
    title: "Radha Raman Temple, Vrindavan",
    blocks: [
      {
        kind: "text",
        text: "One of Vrindavan's most revered shrines, Radha Raman's deity is believed to have **self-manifested** from a shaligram stone for **Gopal Bhatta Goswami**. The deity is small, only about a foot tall, but very powerful in the hearts of devotees. There is no separate Radha idol; Radha is worshipped through a decorated crown placed beside Krishna. The temple's kitchen is said to have kept a sacred flame burning for centuries. A calm, traditional atmosphere makes this a favourite for those seeking contemplation.",
      },
    ],
  },
  {
    n: 8,
    id: "nidhivan-seva-kunj",
    title: "Nidhivan and Seva Kunj",
    blocks: [
      {
        kind: "text",
        text: "These two sacred groves are at the heart of the Raas leela legend. At **Nidhivan**, twisted tulsi trees grow in pairs, and tradition says they become gopis at night to dance with Krishna. The grove is closed after dusk, and local belief holds that no one stays within. Whatever your view, the place has a remarkable stillness. **Seva Kunj** is believed to be where Radha-Krishna rested after the Raas. Please be respectful here and avoid loud conversation.",
      },
    ],
  },
  {
    n: 9,
    id: "vrindavan-goswami-temples",
    title: "Radha Vallabh, Madan Mohan, Gopinath and Rangji Temples",
    blocks: [
      {
        kind: "places",
        items: [
          { id: "temple-radha-vallabh", text: "**Radha Vallabh:** Known for its distinctive tradition of worshipping Radha at the centre, with its rich devotional music (*samaj gayan*)." },
          { id: "temple-madan-mohan", text: "**Madan Mohan:** One of the oldest temples in Vrindavan, perched on a high bank near Kali Ghat." },
          { id: "temple-gopinath", text: "**Gopinath:** Connected with Madhu Pandit Goswami and renowned for its serenity." },
          { id: "temple-rangji", text: "**Rangji Temple:** A rare South Indian–style temple in Vrindavan, with a tall gopuram and a large courtyard dedicated to Lord Ranganatha. It makes a fascinating contrast with the other Braj temples." },
        ],
      },
    ],
  },
  {
    n: 10,
    id: "braj-add-ons",
    title: "Govardhan, Radha Kund, Barsana, Nandgaon and Gokul (Our 3-Day Add-ons)",
    blocks: [
      {
        kind: "places",
        items: [
          { id: "govardhan", text: "**Govardhan Hill and Parikrama (about 21 km):** Walking or driving around the sacred hill is a deeply moving experience. Many devotees walk barefoot. For those unable to walk, we arrange vehicle support to key stops like **Daan Ghati, Mansi Ganga, Kusum Sarovar and Radha Kund**." },
          { id: "radha-kund", text: "**Radha Kund and Shyam Kund:** Considered among the holiest water bodies in Braj, especially on the night of **Ahoi Ashtami**, when thousands bathe at midnight." },
          { id: "barsana-ladli-ji", text: "**Barsana:** Radha's village, with its famous hilltop **Ladli Ji Temple**, reached by many steps. The **Lathmar Holi** here is world famous." },
          { id: "nandgaon", text: "**Nandgaon:** Where Krishna grew up, with the **Nand Bhawan temple** sitting on a hill." },
          { id: "gokul", text: "**Gokul and Raman Reti:** Early childhood sites, including **Nand Bhawan, Brahmand Ghat and Raman Reti**." },
        ],
      },
    ],
  },
];

/**
 * Schema details for every Darshan Guide site. `description` is the first sentence of its text above;
 * `hours` only where the guide states timings (all approximate).
 */
export const attractions: Record<
  AttractionId,
  {
    name: string;
    kind: "temple" | "place";
    locality: string;
    description: string;
    hours?: { opens: string; closes: string; note?: string }[];
  }
> = {
  "temple-banke-bihari": {
    name: "Shri Banke Bihari Temple",
    kind: "temple",
    locality: "Vrindavan",
    description: "Banke Bihari is the beloved deity of Vrindavan.",
    hours: [
      { opens: "07:45", closes: "12:00", note: "Summer morning darshan (approximate)" },
      { opens: "17:30", closes: "21:30", note: "Summer evening darshan (approximate)" },
      { opens: "08:45", closes: "13:00", note: "Winter morning darshan (approximate)" },
      { opens: "16:30", closes: "20:30", note: "Winter evening darshan (approximate)" },
    ],
  },
  "temple-iskcon": {
    name: "ISKCON Vrindavan: Shri Krishna Balaram Mandir",
    kind: "temple",
    locality: "Vrindavan",
    description: "Founded in 1975 by A.C. Bhaktivedanta Swami Prabhupada, the founder of ISKCON, this temple is one of the most globally recognised centres of Krishna consciousness.",
    hours: [
      { opens: "04:30", closes: "13:00", note: "Approximate; opens with mangala aarti" },
      { opens: "16:00", closes: "20:30", note: "Approximate" },
    ],
  },
  "temple-prem-mandir": {
    name: "Prem Mandir",
    kind: "temple",
    locality: "Vrindavan",
    description: "Prem Mandir was established by Jagadguru Kripalu Maharaj and was opened to the public in 2012.",
    hours: [
      { opens: "05:30", closes: "12:00", note: "Approximate" },
      { opens: "16:30", closes: "20:30", note: "Approximate; light show in the evening hours" },
    ],
  },
  "temple-janmabhoomi": {
    name: "Shri Krishna Janmabhoomi",
    kind: "temple",
    locality: "Mathura",
    description: "This is the place of Shri Krishna's birth, the Garbha Griha or prison cell in which Devaki and Vasudeva were held.",
    hours: [
      { opens: "05:00", closes: "12:00", note: "Approximate, with winter variations" },
      { opens: "15:00", closes: "20:00", note: "Approximate, with winter variations" },
    ],
  },
  "vishram-ghat": {
    name: "Vishram Ghat",
    kind: "place",
    locality: "Mathura",
    description: "After slaying Kamsa, Krishna is said to have rested at this ghat on the Yamuna, hence the name Vishram (\"rest\").",
  },
  "temple-dwarkadhish": {
    name: "Dwarkadhish Temple",
    kind: "temple",
    locality: "Mathura",
    description: "Built in the early nineteenth century, this beautiful temple has carved pillars, painted ceilings, and a lively atmosphere.",
  },
  "temple-radha-raman": {
    name: "Radha Raman Temple",
    kind: "temple",
    locality: "Vrindavan",
    description: "One of Vrindavan's most revered shrines, Radha Raman's deity is believed to have self-manifested from a shaligram stone for Gopal Bhatta Goswami.",
  },
  nidhivan: {
    name: "Nidhivan",
    kind: "place",
    locality: "Vrindavan",
    description: "At Nidhivan, twisted tulsi trees grow in pairs, and tradition says they become gopis at night to dance with Krishna.",
  },
  "seva-kunj": {
    name: "Seva Kunj",
    kind: "place",
    locality: "Vrindavan",
    description: "Seva Kunj is believed to be where Radha-Krishna rested after the Raas.",
  },
  "temple-radha-vallabh": {
    name: "Radha Vallabh Temple",
    kind: "temple",
    locality: "Vrindavan",
    description: "Known for its distinctive tradition of worshipping Radha at the centre, with its rich devotional music (samaj gayan).",
  },
  "temple-madan-mohan": {
    name: "Madan Mohan Temple",
    kind: "temple",
    locality: "Vrindavan",
    description: "One of the oldest temples in Vrindavan, perched on a high bank near Kali Ghat.",
  },
  "temple-gopinath": {
    name: "Gopinath Temple",
    kind: "temple",
    locality: "Vrindavan",
    description: "Connected with Madhu Pandit Goswami and renowned for its serenity.",
  },
  "temple-rangji": {
    name: "Rangji Temple",
    kind: "temple",
    locality: "Vrindavan",
    description: "A rare South Indian–style temple in Vrindavan, with a tall gopuram and a large courtyard dedicated to Lord Ranganatha.",
  },
  govardhan: {
    name: "Govardhan Hill and Parikrama",
    kind: "place",
    locality: "Govardhan",
    description: "Walking or driving around the sacred hill is a deeply moving experience.",
  },
  "radha-kund": {
    name: "Radha Kund and Shyam Kund",
    kind: "place",
    locality: "Radha Kund",
    description: "Considered among the holiest water bodies in Braj, especially on the night of Ahoi Ashtami, when thousands bathe at midnight.",
  },
  "barsana-ladli-ji": {
    name: "Shri Radha Rani Temple (Ladli Ji Mandir), Barsana",
    kind: "temple",
    locality: "Barsana",
    description: "Radha's village, with its famous hilltop Ladli Ji Temple, reached by many steps.",
  },
  nandgaon: {
    name: "Nandgaon",
    kind: "place",
    locality: "Nandgaon",
    description: "Where Krishna grew up, with the Nand Bhawan temple sitting on a hill.",
  },
  gokul: {
    name: "Gokul and Raman Reti",
    kind: "place",
    locality: "Gokul",
    description: "Early childhood sites, including Nand Bhawan, Brahmand Ghat and Raman Reti.",
  },
};

/** Rows for the "Timings at a glance" table — every value is stated in the guide above. */
export const timingsAtGlance = [
  { temple: "Shri Banke Bihari Temple (summer)", href: "#temple-banke-bihari", morning: "7:45 a.m. – 12:00 noon", evening: "5:30 p.m. – 9:30 p.m." },
  { temple: "Shri Banke Bihari Temple (winter)", href: "#temple-banke-bihari", morning: "8:45 a.m. – 1:00 p.m.", evening: "4:30 p.m. – 8:30 p.m." },
  { temple: "ISKCON Krishna Balaram Mandir", href: "#temple-iskcon", morning: "4:30 a.m. – 1 p.m.", evening: "4 p.m. – 8:30 p.m." },
  { temple: "Prem Mandir", href: "#temple-prem-mandir", morning: "5:30 a.m. – 12 noon", evening: "4:30 p.m. – 8:30 p.m." },
  { temple: "Shri Krishna Janmabhoomi", href: "#temple-janmabhoomi", morning: "5 a.m. – 12 noon", evening: "3 p.m. – 8 p.m." },
];

/* ------------------------------------------------------------------ */
/* 6. Why choose us                                                    */
/* ------------------------------------------------------------------ */

export const whyChoose = {
  eyebrow: "Our promise",
  title: `Why Choose ${BRAND_NAME}? (Our Promise to You)`,
  intro: "When you are choosing among **Mathura Vrindavan tours**, you will find many options. Here is why thousands of families keep coming back to us:",
  items: [
    { emoji: "⭐", title: `A ${RATING}-star rating built on real experiences`, text: `We have never chased reviews through tricks. Our ${RATING}-star rating comes from pilgrims who simply told others what they experienced. I read many of those messages myself, and a few I have saved for years.` },
    { emoji: "🙏", title: `Over ${PILGRIM_COUNT} pilgrims guided since ${FOUNDED}`, text: "That number reminds me of the responsibility I carry. Behind each one is a family or an individual whose yatra mattered deeply." },
    { emoji: "🧭", title: "Born-in-Mathura local knowledge", text: "I am not a visitor learning on the job. I know the shortcuts, the quiet hours, the hidden shrines, the honest shopkeepers and the places to avoid. This knowledge saves you time, money and stress." },
    { emoji: "🚗", title: "Comfortable, clean vehicles and courteous drivers", text: "Our drivers are not just drivers. They know Braj roads, speak politely to elders, and wait patiently while you take your time in prayer." },
    { emoji: "💬", title: "Transparent pricing, no hidden charges", text: "I will tell you what is included and what is not, in writing, before you pay. If something is optional, I say so. No surprise \"temple fees,\" no \"darshan tax.\"" },
    { emoji: "🕉", title: "Respect for your faith and pace", text: "Some guests want a very ritual-focused tour, while others want a quiet cultural one. I never impose beliefs. I simply help you experience the holy land in the way that is meaningful to you." },
    { emoji: "👵", title: "Special care for seniors and families", text: "Many of our guests are elderly parents travelling with their children. We take extra care with timings, rest stops, and accessible routes." },
    { emoji: "📞", title: "Always reachable", text: `You will have my direct number: **${PHONE_DISPLAY}**. If something goes wrong during your trip, you will not be calling a call centre. You will be talking to me or my team.` },
  ],
};

/* ------------------------------------------------------------------ */
/* 7. Food guide                                                       */
/* ------------------------------------------------------------------ */

export const foodGuide = {
  eyebrow: "Food guide",
  title: "Local Secrets & Food Guide: What to Eat in Mathura and Vrindavan",
  intro:
    "A pilgrimage feeds the soul, but in Braj it also feeds the stomach very generously. The region's food is **pure vegetarian**, mostly dairy-rich, and tied to Krishna's love for butter and milk. Here are the tastes I always recommend.",
  foods: [
    {
      title: "Mathura Peda: The icon",
      image: images.peda,
      paragraphs: [
        "The **Mathura peda** is world-famous. Made from slow-cooked khoa (reduced milk solids) and sugar, it has a grainy, caramelised texture and a deep brown colour. It is quite different from the soft white pedas found elsewhere.",
        "**How to choose:** Look for shops that make fresh batches daily. The peda should smell milky and slightly toasty, not overly sweet. Ask for a taste before buying large quantities. A good peda keeps for several days if stored cool.",
      ],
    },
    {
      title: "Lassi in a kulhad",
      image: images.lassi,
      paragraphs: [
        "Braj lassi is thick, creamy and often topped with a layer of malai, served in a clay *kulhad*. The cool, earthy taste in the afternoon heat is one of my favourite memories of childhood. Sweet is traditional, though many shops make salted or flavoured versions too.",
      ],
    },
    {
      title: "Kachori-Sabzi and Bedmi Puri",
      image: images.kachori,
      paragraphs: [
        "A typical Braj breakfast is **kachori with spicy potato (aloo) sabzi** or **bedmi puri**, a fried bread made with a lentil-spiced dough. Served hot with tangy chutney, this meal fuels a morning of temple walking. If you are sensitive to spice, tell the vendor, and they will adjust it.",
      ],
    },
    {
      title: "Jalebi and Rabri",
      image: images.jalebi,
      paragraphs: ["Fresh, hot **jalebis** are best eaten in the early morning, often with a bowl of rich **rabri** (sweetened thickened milk). It is indulgent and perfect."],
    },
  ],
  otherTitle: "Other tastes you must try",
  others: [
    "**Malpua** with rabri, especially during festivals.",
    "**Thandai** in summer and during Holi.",
    "**Makhan Mishri** (butter with sugar crystals), offered to Krishna as a beloved bhog.",
    "**Kheer, halwa and seasonal sweets** offered at temples as prasad.",
    "**Chaat and Dahi Bhalla** in the market areas.",
    "**Singhara and seasonal fruits** during fasting periods like Ekadashi.",
  ],
  safetyTitle: "Food safety tips from my experience",
  safety: [
    "**Choose busy shops.** High turnover means fresh food.",
    "**Drink bottled or filtered water** if your stomach is delicate.",
    "**Be careful with cut fruit and ice** in peak summer.",
    "**Vrindavan's food is satvik** in most temples, with no onion or garlic. Many restaurants follow the same practice out of respect for the holy land.",
    "**For elderly or diabetic guests,** I always plan lighter food stops.",
  ],
  secretsTitle: "Local secrets only a Braj-born guide knows",
  secrets: [
    "**The best time to see the Banke Bihari lane** with the least pushing is in the first hour after the temple opens on a weekday.",
    "**Quiet lanes** like those around Seva Kunj feel almost like a village even though they are in the middle of the town.",
    "**Parikrama Marg in Vrindavan** (about 10 km) is a beautiful pre-dawn walk if you are physically fit, with devotees chanting softly along the way.",
    "**Monkey etiquette:** Do not carry loose snacks, spectacles, or phones in your hand. Keep them in a zipped bag. I have seen countless pairs of glasses vanish!",
    "**Say \"Radhe Radhe\"** to everyone you meet. It changes the way people treat you, and doors open with more warmth.",
    "**Shopping for souvenirs:** Tulsi malas, Krishna poshak (deity clothing), brass items, and handmade garlands are best bought from the established stores near temples. I will gladly point you to fair-priced ones.",
  ],
};

/* ------------------------------------------------------------------ */
/* 8. Travel & logistics                                               */
/* ------------------------------------------------------------------ */

export const travel = {
  eyebrow: "Plan your trip",
  title: "Travel & Logistics: How to Plan Your Mathura Vrindavan Trip",
  intro: "Many pilgrims worry about logistics, so let me be as practical as I can.",
  reachTitle: "How to reach Mathura and Vrindavan",
  reach: [
    {
      icon: "train",
      label: "By Train:",
      text: "**Mathura Junction** is on the busy Delhi–Mumbai and Delhi–Chennai corridors, so many express and superfast trains stop here. It is one of the easiest ways to arrive from Delhi, Agra, Jaipur, Gwalior, Bhopal, Mumbai and beyond. Vrindavan also has its own railway station, though it is served by fewer trains.",
    },
    {
      icon: "road",
      label: "By Road:",
      text: "The **Yamuna Expressway** and the **Delhi–Agra highway (NH-19)** connect Mathura to Delhi (about 145–150 km, usually 2.5 to 3.5 hours depending on traffic) and to Agra (about 55–60 km, around 1.5 hours). Driving in is easy, and parking near temples is limited, so we advise using a local driver.",
    },
    {
      icon: "plane",
      label: "By Air:",
      text: "The nearest major airport is **Delhi's Indira Gandhi International Airport**, from where you can take a cab (about 3–3.5 hours) to Mathura or Vrindavan. Agra's airport is closer but has limited flights. If newer airports in the region have started operations by the time you travel, ask us and we will advise on the best option.",
    },
    { icon: "pickup", label: "Pick-up service:", text: "We can meet you at Delhi airport, Delhi railway stations, Agra, Mathura Junction, or your hotel." },
  ],
  distance: {
    title: "How far is Vrindavan from Mathura?",
    stats: [
      { value: "11–15 km", label: "Mathura to Vrindavan" },
      { value: "30–45 min", label: "by road, normally" },
    ],
    text: "Roughly **11–15 km**, depending on your starting point. Normally the drive takes **30 to 45 minutes**, though festival-day traffic can double that. It is the most important distance in your trip, and travelling it comfortably is a big part of a good yatra.",
  },
  modesTitle: "How to travel between Mathura and Vrindavan",
  modes: [
    { icon: "car", text: "**Private car or taxi (recommended):** Comfortable, flexible, and time-saving, especially for families and seniors." },
    { icon: "rickshaw", text: "**E-rickshaws and auto-rickshaws:** Great for narrow temple lanes in the old town. Agree on a fare beforehand." },
    { icon: "bus", text: "**Local buses and shared vehicles:** Cheap, but crowded and slower." },
    { icon: "walk", text: "**Walking in the old town and temple areas:** Many core temples are in tight areas where vehicles cannot enter, so you will walk a bit. Comfortable footwear helps." },
  ],
  bestTimeTitle: "Best time to visit Mathura and Vrindavan",
  seasons: [
    {
      tag: "Oct – Mar",
      name: "Best season",
      tone: "best",
      text: "**October to March (Winter, Best Season):** Pleasant weather and festivals like **Sharad Purnima, Govardhan Puja, Kartik Maas rituals,** and **Diwali**. Evenings can be cold in December and January, with fog affecting trains and roads. Pack warm layers.",
    },
    {
      tag: "Feb – Mar",
      name: "Holi season",
      tone: "holi",
      text: "**February to March (Spring, Holi season): Basant Panchami** begins the festive build-up to **Holi**. The Braj Holi festivities, including **Lathmar Holi** in Barsana and Nandgaon, are legendary. They are also extremely crowded, so book early.",
    },
    {
      tag: "Apr – Jun",
      name: "Summer",
      tone: "summer",
      text: "**April to June (Summer):** Very hot, with temperatures often above 40°C. Pilgrims do come, especially in the early morning and evening. If you travel then, start before sunrise, drink lots of water, and rest in the afternoon.",
    },
    {
      tag: "Jul – Sep",
      name: "Monsoon",
      tone: "monsoon",
      text: "**July to September (Monsoon):** The landscape is green and lovely, and **Hariyali Teej, Jhulan Yatra** and **Janmashtami** fall in this period. Expect humidity and occasional heavy rain.",
    },
  ] as const,
  festivalsTitle: "Major festivals worth planning around",
  festivals: [
    { name: "Janmashtami", when: "August–September", text: "The city's biggest celebration." },
    { name: "Radhashtami", when: "a fortnight after Janmashtami", text: "Radha's birthday, grandly celebrated at Barsana and Raval." },
    { name: "Holi", when: "February–March", text: "A multi-day festival unlike anywhere else." },
    { name: "Govardhan Puja and Diwali", when: "October–November", text: "Special annakut offerings and lamps." },
    { name: "Jhulan Yatra / Hindola", when: "monsoon", text: "Deities swing on decorated swings." },
    { name: "Gaura Purnima, Akshaya Tritiya and Ram Navami", text: "Lesser known but deeply meaningful." },
  ],
  advice: {
    label: "Harsh's advice",
    text: "If you can, avoid the two or three most crowded days (like the main Holi day or Janmashtami night) unless you thrive on crowds. The days just before and after are often more spiritually rewarding.",
  },
  packingTitle: "Seasonal packing guide: what I tell every guest",
  packing: [
    {
      id: "all",
      label: "All seasons",
      heading: "All seasons:",
      items: [
        "Comfortable, easy-to-remove footwear (shoes are left outside temples; slip-ons are best)",
        "Modest clothing covering shoulders and knees",
        "A small, zip-able bag or cross-body pouch",
        "A reusable water bottle",
        "Sunscreen, sunglasses, and a hat or scarf",
        "Basic medicines, including those for stomach upset",
        "Photocopies of ID, as temples and hotels may ask for them",
        "A small amount of cash in small denominations for offerings",
        "Tissues or hand sanitiser",
      ],
    },
    { id: "winter", label: "Winter", heading: "Winter (November to February):", items: ["Warm jackets, shawls, socks (cold marble floors can be very chilly)", "Woollen caps for early mornings"] },
    { id: "summer", label: "Summer", heading: "Summer (April to June):", items: ["Cotton clothes, a cap, plenty of electrolytes", "Light umbrella for shade"] },
    { id: "monsoon", label: "Monsoon", heading: "Monsoon (July to September):", items: ["Raincoat or umbrella, quick-dry clothing, waterproof bag covers"] },
  ],
  avoid: { label: "What to avoid carrying:", text: "Expensive jewellery, loose snacks near monkeys, and large bags that you will not be allowed to carry into temples." },
  stay: {
    title: "Staying in Mathura and Vrindavan",
    text: "You can choose from simple dharamshalas, ashram guesthouses, mid-range hotels and comfortable boutique stays. Staying in **Vrindavan** gives you proximity to the major temples. Staying in **Mathura** is easier for railway connections. We can help you find the right option for your budget and comfort.",
  },
};

/* ------------------------------------------------------------------ */
/* 9. FAQ — wording verbatim; grouped by topic, original numbers kept   */
/* ------------------------------------------------------------------ */

export type HomeFaq = { n: number; q: string; a: string };

export const faqSection = {
  eyebrow: "FAQs",
  title: "Frequently Asked Questions About Mathura Vrindavan Tour Packages",
};

export const faqGroups: { id: string; title: string; items: HomeFaq[] }[] = [
  {
    id: "faq-planning",
    title: "Planning",
    items: [
      { n: 1, q: "What is the best Mathura Vrindavan tour package for first-time visitors?", a: "For most first-timers, I recommend the **2-day Mathura Vrindavan tour package**. It covers the key temples in both cities without rushing. If you have only one day, the 1-day package works, but you will have to move quickly." },
      { n: 2, q: "How many days are enough for a Mathura Vrindavan tour?", a: "Two days is ideal for the main sights. Three days lets you add Govardhan, Barsana, Nandgaon and Gokul. If you love spiritual immersion, even four or five days can be fulfilling." },
      { n: 3, q: "Is a one-day Mathura Vrindavan trip possible?", a: "Yes. With an early start, you can visit Krishna Janmabhoomi, Vishram Ghat, Banke Bihari, ISKCON and Prem Mandir in a day. It is busy, but many guests tell us it was still memorable." },
      { n: 4, q: "What is included in your Mathura Vrindavan travel packages?", a: "Our standard packages include an AC vehicle, driver, local guidance, planned darshan timings and pick-up and drop. Hotels, meals and special pujas can be added. I always share a clear inclusion list before you confirm." },
      { n: 5, q: "What is the distance between Mathura and Vrindavan?", a: "About 11–15 km, and typically 30–45 minutes by road." },
      { n: 6, q: "What is the best time to visit Mathura Vrindavan?", a: "**October to March** offers the most comfortable weather. Festivals such as Janmashtami, Holi and Diwali are spiritually rich but crowded." },
    ],
  },
  {
    id: "faq-temples",
    title: "Temples & Darshan",
    items: [
      { n: 7, q: "Which temples should I not miss on a Mathura Vrindavan tour?", a: "Banke Bihari, Krishna Janmabhoomi, ISKCON Krishna Balaram Mandir, Prem Mandir, Radha Raman, Nidhivan, Dwarkadhish and Vishram Ghat. For a longer visit, add Govardhan, Radha Kund and Barsana." },
      { n: 8, q: "What time does Banke Bihari Temple open?", a: "Morning darshan usually begins between 7:45 and 8:45 a.m. depending on the season, with an evening session in the afternoon or evening. Timings change, so please confirm before you go. We will check for you." },
      { n: 9, q: "How do I avoid crowds at Banke Bihari?", a: "Go on a weekday, reach soon after opening, and avoid festival days and weekends. Early morning and late evening are usually calmer than mid-day." },
      { n: 10, q: "Are mobile phones allowed inside temples?", a: "In many major temples, including Krishna Janmabhoomi and sometimes Prem Mandir and Banke Bihari, mobile phones and cameras are restricted inside the sanctum. Cloakrooms or lockers are usually available. We will help you with this." },
      { n: 11, q: "Is there a dress code for Mathura and Vrindavan temples?", a: "There is no rigid uniform, but modest clothing is expected. Cover your shoulders and knees. Avoid very short or sleeveless outfits. Cotton kurtas, salwar suits, saris, or simple shirts and trousers are all fine." },
    ],
  },
  {
    id: "faq-safety",
    title: "Safety & Who It Suits",
    items: [
      { n: 12, q: "Is Mathura Vrindavan safe for solo women travellers?", a: "Generally yes, especially in main temple areas during the day. As in any busy pilgrimage town, I advise basic precautions: avoid isolated lanes late at night, keep valuables hidden, and travel with a trusted driver. Many women travel with our service every year, and we take extra care for them." },
      { n: 13, q: "Is the tour suitable for senior citizens?", a: "Absolutely. A large number of our guests are elderly. We plan fewer stops per day, include rest breaks, and use e-rickshaws or wheelchairs wherever needed." },
      { n: 14, q: "Can I bring children on a Mathura Vrindavan tour?", a: "Yes. Children generally enjoy the colourful temples, boat rides, lights at Prem Mandir and sweet treats. We keep a relaxed pace and arrange snack stops." },
    ],
  },
  {
    id: "faq-food",
    title: "Food",
    items: [
      { n: 15, q: "What are the must-try foods in Mathura and Vrindavan?", a: "Mathura peda, kulhad lassi, kachori-sabzi, bedmi puri, jalebi with rabri, malpua, and thandai. Fresh, local and vegetarian." },
      { n: 16, q: "Is non-vegetarian food available in Mathura Vrindavan?", a: "The holy areas of Mathura and especially Vrindavan are largely vegetarian, and many places do not serve meat or even onion and garlic. We follow this tradition on all our tours." },
    ],
  },
  {
    id: "faq-travel",
    title: "Travel & Booking",
    items: [
      { n: 17, q: "How do I reach Mathura from Delhi?", a: "By train, Mathura Junction is well connected and the journey takes roughly 1.5 to 3 hours depending on the train. By road, the Yamuna Expressway or NH-19 will take around 2.5 to 3.5 hours." },
      { n: 18, q: "Do you provide pick-up from Delhi airport or railway stations?", a: "Yes. We arrange pick-ups from Delhi, Agra, Mathura Junction, Vrindavan and other locations. Tell us your timings and we will plan it." },
      { n: 19, q: "Can I customise my Mathura Vrindavan package tour?", a: "Of course. Most of our guests tweak something, whether it is adding Govardhan, skipping a temple, or extending to Agra. Call or email us and we will tailor it." },
      { n: 20, q: "How early should I book for Holi or Janmashtami?", a: "As early as possible. For major festivals, I recommend booking at least four to eight weeks ahead, since hotels and vehicles fill up quickly." },
      { n: 21, q: "Is Govardhan Parikrama part of your packages?", a: "It is part of our 3-day package and can be added to others. We arrange vehicle support for those who cannot walk the full 21 km." },
      { n: 22, q: "Can foreign tourists book your Mathura Vrindavan tours?", a: "Yes. We have guided visitors from many countries. I speak English and Hindi and explain customs carefully so that first-time visitors feel comfortable." },
      { n: 28, q: "How can I book a Mathura Vrindavan tour package with you?", a: `Call or WhatsApp **${PHONE_DISPLAY}**, email **${EMAIL}**, or visit **${WEBSITE}**. I will personally help you pick the right plan.` },
      { n: 29, q: "What if my plans change after booking?", a: "Life happens. Contact us as early as possible, and we will do our best to adjust dates or arrangements fairly." },
    ],
  },
  {
    id: "faq-customs",
    title: "Customs & Tips",
    items: [
      { n: 23, q: "What should I offer at temples?", a: "Usually flowers, tulsi leaves, sweets like pedas, or a simple donation. Do not feel pressured into large amounts. Offerings should come from the heart." },
      { n: 24, q: "Are there any scams I should be aware of?", a: "Like any busy pilgrimage place, there are occasional touts offering \"VIP darshan\" or forced rituals. Politely refuse. Booking with a trusted local guide protects you from most of these problems." },
      { n: 25, q: "What is the Vrindavan Parikrama?", a: "A circular walk of about 10 km around the sacred town, usually performed barefoot while chanting. Many devotees do it in the early morning. We can arrange an easier, partial version if you prefer." },
      { n: 26, q: "How is the weather in Mathura Vrindavan in winter and summer?", a: "Winter days are mild to cool, but nights can be cold and foggy. Summer is very hot, often above 40°C. Monsoon is humid with periods of rain." },
      { n: 27, q: "Is photography allowed?", a: "Outside the inner sanctums, usually yes. Inside, it is often restricted. Always respect signs and temple staff." },
    ],
  },
  {
    id: "faq-why-us",
    title: "Why Us",
    items: [
      {
        n: 30,
        q: `Why should I choose ${BRAND_NAME} over other travel agencies?`,
        a: `Because I was born here, I have guided over ${PILGRIM_COUNT} pilgrims since ${FOUNDED}, and my ${RATING}-star rating comes from people who trusted us. You get honest pricing, personal attention, and a guide who treats Braj as home.`,
      },
    ],
  },
];

/* ------------------------------------------------------------------ */
/* 10. Last words                                                      */
/* ------------------------------------------------------------------ */

export const lastWords = {
  eyebrow: "From my heart",
  title: "A Few Last Words from My Heart",
  lead: `When I think about the thousands of faces I have met since ${FOUNDED},`,
  memories: [
    "I remember a woman from Kerala who touched the dust of Raman Reti to her forehead and said nothing for ten minutes.",
    "I remember a young couple who came to seek blessings before their wedding and left with their eyes glowing.",
    "I remember an old Bengali gentleman who asked me to sit with him in silence at Nidhivan and who whispered, \"Now I can go in peace.\"",
  ],
  paragraphs: [
    "These are the moments I live for. They are why a **Mathura Vrindavan tour** with us is never just logistics. It is an invitation into a story that has been told for five thousand years and is still being lived every single day.",
    "Braj does not ask for perfection from you. It asks for presence. Come as you are, with your questions, your tiredness, and your hopes. The rest is between you and Thakur ji.",
    "If you have been waiting for the right time to plan your **Mathura Vrindavan package tour**, let this be it.",
  ],
};

/* ------------------------------------------------------------------ */
/* 11. Book your tour                                                  */
/* ------------------------------------------------------------------ */

export const bookSection = {
  eyebrow: "Book now",
  title: "Book Your Mathura Vrindavan Tour Package Today",
  intro: "I would be honoured to be your guide, your host, and, I hope, your friend in Braj.",
  contactLabels: { call: `📞 Call or WhatsApp ${FOUNDER.name}:`, email: "✉️ Email:", website: "🌐 Website:" },
  website: WEBSITE,
  stats: `**${BRAND_NAME}**: serving pilgrims since ${FOUNDED} · ⭐ ${RATING}-star rated · 🙏 ${PILGRIMS} pilgrims guided`,
  tell: `Tell me your dates, the number of travellers, and any special needs, such as elderly parents, small children, or a particular festival. I will reply personally with a clear plan and a transparent quote. Whether you are looking for **Mathura Vrindavan tour packages**, a family-friendly **Mathura Vrindavan travel package**, or a fully customised **Mathura Vrindavan tour**, we are ready to make it smooth, safe and spiritually rewarding.`,
  closing: "Radhe Radhe. 🙏 Come home to Braj.",
  signature: `— ${FOUNDER.name}, Founder, ${BRAND_NAME}`,
  whatsappMessage: "Radhe Radhe Harsh ji! I'd like to book a Mathura Vrindavan tour package. My dates and group details are:",
};

/** Services listed in the OfferCatalog — each one is stated on the page (packages, add-ons, customised tours). */
export const services = [
  "Private Mathura Vrindavan tours by car",
  "Senior citizen–friendly tours",
  "Family tours",
  "Corporate & school group tours",
  "Festival-special tours (Holi, Janmashtami, Radhashtami, Govardhan Puja)",
  "Foreign devotee tours (English-speaking)",
  "Govardhan Parikrama support",
  "Hotel & dharamshala booking",
];

export const areaServed = ["Mathura", "Vrindavan", "Govardhan", "Barsana", "Nandgaon", "Gokul", "Radha Kund"];
