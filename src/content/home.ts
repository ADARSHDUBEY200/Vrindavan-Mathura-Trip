import type { PhotoKey } from "./images";

export const hero = {
  eyebrow: "Discover the Land of Krishna",
  /** The words in `highlight` are rendered with the gradient + swash treatment. */
  titleBefore: "Experience the Divine Leela of",
  highlight: ["Vrindavan", "Mathura"] as const,
  intro:
    "Private, unhurried pilgrimages across Braj — planned around darshan timings, with your own car, local know-how and someone to call on WhatsApp whenever you need.",
  stats: [
    { value: "≈ 15 km", label: "between Mathura & Vrindavan" },
    { value: "1–7 days", label: "flexible itineraries" },
    { value: "Private", label: "transport & local help" },
  ],
};

/** Hero carousel cards. Keep titles short — they're set in large uppercase type. */
export const heroSlides: { eyebrow: string; title: string; text: string; image: PhotoKey; cta: { label: string; href: string } }[] = [
  {
    eyebrow: "Vrindavan · Prem Mandir",
    title: "Marble that glows at dusk",
    text: "Banke Bihari darshan by day, Prem Mandir’s evening lights by night — Vrindavan at an easy pace.",
    image: "prem-mandir",
    cta: { label: "Explore Vrindavan", href: "/vrindavan" },
  },
  {
    eyebrow: "Mathura · Evening aarti",
    title: "Lamps on the Yamuna",
    text: "Brass lamps and floating diyas at Vishram Ghat, where Krishna rested after defeating Kamsa.",
    image: "vishram-ghat",
    cta: { label: "Explore Mathura", href: "/mathura" },
  },
  {
    eyebrow: "Govardhan · Parikrama",
    title: "Walk around Giriraj ji",
    text: "The 21 km parikrama past Kusum Sarovar, Mansi Ganga and Radha Kund — on foot or by car.",
    image: "kusum-sarovar",
    cta: { label: "Plan a Govardhan day", href: "/govardhan-barsana" },
  },
  {
    eyebrow: "Festival yatras",
    title: "A week of colour in Braj",
    text: "Flower Holi at Banke Bihari, Lathmar Holi in Barsana and Nandgaon. Book early — we’ll time it.",
    image: "holi-vrindavan",
    cta: { label: "See festivals", href: "/festivals" },
  },
  {
    eyebrow: "Barsana · Shri Radha",
    title: "Radha Rani’s hilltop home",
    text: "Climb Bhanugarh hill to the Shriji temple, then on to Nanda Baba’s village of Nandgaon.",
    image: "radha-rani-barsana",
    cta: { label: "View the temple", href: "/temples/radha-rani-temple-barsana" },
  },
];

export const destinationCards: { name: string; href: string; image: PhotoKey; text: string; distance: string }[] = [
  { name: "Vrindavan", href: "/vrindavan", image: "prem-mandir", text: "Banke Bihari, Prem Mandir, ISKCON and the Yamuna ghats.", distance: "Heart of Braj" },
  { name: "Mathura", href: "/mathura", image: "vishram-ghat", text: "Krishna Janmabhoomi, Dwarkadhish and Vishram Ghat aarti.", distance: "≈ 15 km from Vrindavan" },
  { name: "Govardhan", href: "/govardhan-barsana", image: "govardhan-dham", text: "Giriraj ji, the 21 km parikrama and Radha Kund.", distance: "≈ 25 km from Mathura" },
  { name: "Barsana & Nandgaon", href: "/govardhan-barsana", image: "radha-rani-barsana", text: "Shri Radha’s hilltop temple and Nanda Baba’s village.", distance: "≈ 45 km from Mathura" },
  { name: "Gokul & Baldeo", href: "/braj-yatra", image: "gokul", text: "Krishna’s childhood village and the temple of Dauji.", distance: "≈ 15–20 km from Mathura" },
];

export const experiences: { title: string; text: string; image: PhotoKey; shape: "arch" | "round" }[] = [
  { title: "Banke Bihari darshan", text: "The beloved curtain-darshan in the lanes of old Vrindavan — timed for the calmest window.", image: "banke-bihari", shape: "arch" },
  { title: "Prem Mandir light show", text: "White marble slowly turning every colour as dusk falls over Vrindavan.", image: "prem-mandir-night", shape: "round" },
  { title: "Yamuna aarti at Vishram Ghat", text: "Brass lamps, conches and floating diyas where Krishna rested after defeating Kamsa.", image: "vishram-ghat", shape: "round" },
  { title: "Govardhan Parikrama", text: "Walk — or ride — the 21 km path around Giriraj ji, stopping at sacred kunds.", image: "govardhan-dham", shape: "arch" },
  { title: "Boat ride at Keshi Ghat", text: "Drift on the Yamuna at sunset past the sandstone ghats of Vrindavan.", image: "keshi-ghat", shape: "round" },
  { title: "Braj Holi", text: "Flowers at Banke Bihari, lathis in Barsana — a week of colour like nowhere else.", image: "holi-vrindavan", shape: "arch" },
];

export const circuits: { title: string; text: string; image: PhotoKey; href: string; days: string }[] = [
  { title: "Agra + Braj", text: "The Taj Mahal with two days of darshan in Mathura and Vrindavan.", image: "taj-mahal", href: "/tour-packages/agra-mathura-vrindavan-3-days", days: "3 days" },
  { title: "Braj + Ayodhya + Varanasi", text: "Krishna’s Braj, Shri Ram’s Ayodhya and the ghats of Kashi.", image: "varanasi-aarti", href: "/tour-packages/braj-ayodhya-varanasi-6-days", days: "6 days" },
  { title: "Haridwar–Rishikesh + Braj", text: "From Ganga aarti in the foothills to the Yamuna of Vrindavan.", image: "rishikesh", href: "/tour-packages/haridwar-rishikesh-braj-5-days", days: "5 days" },
];

export const whyUs: { icon: string; title: string; text: string }[] = [
  { icon: "guide", title: "Local Braj know-how", text: "Planning by people who know the lanes, the temples and the stories behind them." },
  { icon: "car", title: "Your own private car", text: "Clean AC car with a patient driver — no shared coaches, no fixed group schedule." },
  { icon: "clock", title: "Darshan-first timing", text: "Days arranged around temple opening windows, not the other way round." },
  { icon: "train", title: "Airport & railway pickup", text: "Met at Delhi airport, Mathura Junction, Agra or your home." },
  { icon: "whatsapp", title: "WhatsApp support", text: "A real person to message before and during your trip." },
  { icon: "heart", title: "Senior-friendly pacing", text: "Rest built in, fewer steps where possible, and help in crowded places." },
];

export const about = {
  eyebrow: "About us",
  title: "Pilgrimage planning with a Braj heart",
  paragraphs: [
    "Too many families arrive in Braj with deep devotion and spend the day in traffic, in the wrong queue, or in front of temple doors that have just closed for the afternoon.",
    "We plan it differently. We start with darshan timings and the pace of the slowest member of your group, then build transport, stays and stops around them. Every trip is private, and every plan is shaped on a call or a WhatsApp chat — not from a brochure.",
  ],
  points: ["Private trips only — never a shared coach", "Honest, itemised quotes", "Help before, during and after your yatra"],
  images: ["radha-raman", "keshi-ghat", "phool-bangla"] as PhotoKey[],
};

export const galleryItems: { image: PhotoKey; caption: string }[] = [
  { image: "phool-bangla", caption: "Phool Bangla at Banke Bihari" },
  { image: "prem-mandir", caption: "Prem Mandir at night" },
  { image: "nidhivan", caption: "The tulsi grove of Nidhivan" },
  { image: "lathmar-holi", caption: "Lathmar Holi in Nandgaon" },
  { image: "rangji", caption: "Rangji temple gopuram" },
  { image: "keshi-ghat", caption: "Dusk at Keshi Ghat" },
  { image: "kusum-sarovar", caption: "Chhatris of Kusum Sarovar" },
  { image: "govind-dev", caption: "Govind Dev Ji temple" },
  { image: "radha-rani-barsana", caption: "Radha Rani temple, Barsana" },
  { image: "mansi-ganga", caption: "Mansi Ganga, Govardhan" },
];

/**
 * Real guest testimonials only — with the guest's permission.
 * The Testimonials section stays hidden while this list is empty. Never invent entries.
 */
export const testimonials: { quote: string; name: string; place?: string; trip?: string }[] = [];
