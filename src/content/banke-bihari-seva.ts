/**
 * Copy for /banke-bihari-vip-darshan-itra-seva, taken from the owner's "VIP Darshan And Itra Sewa" brief.
 * Timings, prices and claims are the owner's figures: change them here only after the owner confirms.
 * The brief's web-team notes apply: keep "reportedly" on the 2025 reforms, show both timing schedules,
 * never add VIP passes, gate numbers, guaranteed waits or "official/authorised" wording, and publish no
 * Offer markup that reads as an entry-ticket price.
 */
import { PHONE_DISPLAY } from "@/config/site";
import type { PhotoKey } from "@/content/images";
import type { Faq } from "@/content/types";

export const SEVA_PATH = "/banke-bihari-vip-darshan-itra-seva";
/** Date (ISO) the page copy was last reviewed. Shown on the page and used as `dateModified`. */
export const SEVA_UPDATED = "2026-11-05";

/**
 * TODO(owner): ISO date (e.g. "2026-11-12") on which the timings below were last checked against the
 * temple's own notice. While `null`, no "Timings verified on …" line is shown.
 */
export const SEVA_TIMINGS_VERIFIED_ON: string | null = null;

export const sevaMeta = {
  title: "VIP Darshan and Itra Seva in Banke Bihari Temple | Timings, Aarti & Honest Guide",
  description: `Is VIP darshan real at Banke Bihari? Harsh Sharma explains the truth, 2026 darshan and aarti timings, Itra Seva, festival darshans, how to avoid crowds and scams. Call ${PHONE_DISPLAY}.`,
  imageAlt: "Devotees at the carved main gate of Banke Bihari Temple, Vrindavan: VIP darshan and Itra Seva guide",
};

/* ------------------------------------------------------------------ */
/* At a glance                                                         */
/* ------------------------------------------------------------------ */

export type GlanceFact = { label: string; value: string; strong?: string; key?: boolean };

export const glance: GlanceFact[] = [
  { label: "Entry fee", strong: "Free.", value: "No ticket is required.", key: true },
  { label: "VIP tickets", strong: "None exist.", value: "See below.", key: true },
  { label: "Location", value: "Vrindavan, Mathura district, Uttar Pradesh" },
  { label: "Deity", value: "Shri Banke Bihari ji (Krishna in tribhanga pose, with Radha-Krishna tradition)" },
  { label: "Darshan style", value: "Jhanki (curtain) darshan: glimpses with the curtain drawn repeatedly" },
  { label: "Daily sessions", value: "Two: morning and evening, with a long midday closure" },
  { label: "Regular mangala aarti?", strong: "No.", value: "Held only on Janmashtami" },
  { label: "Photography", value: "Prohibited inside. Phones and bags are best left outside" },
  { label: "Vehicle access", value: "Cars cannot reach the temple. The last stretch is on foot" },
  { label: "Best time", value: "Weekday morning, soon after opening" },
];

/* ------------------------------------------------------------------ */
/* The truth about VIP darshan                                         */
/* ------------------------------------------------------------------ */

export const vipTruths: { strong: string; rest: string }[] = [
  { strong: "The temple does not sell VIP tickets,", rest: " printed passes, QR-code entries or \"government VIP passes,\" online or offline." },
  { strong: "Darshan at Banke Bihari is free", rest: " for every devotee, whether a farmer or a film star." },
  {
    strong: "In September 2025,",
    rest: " the temple's management committee, formed under a Supreme Court direction, reportedly stopped VIP passes and special slips and moved to a common queue for everyone, with separate entry and exit gates, security reforms and live-streamed darshan.",
  },
  { strong: "Reforms in this temple are still evolving,", rest: " so what was possible in the past may not be possible today." },
];

export const redFlags: { flag: string; why: string }[] = [
  { flag: "\"Official government VIP ticket\" or \"QR code entry\"", why: "No such document exists" },
  { flag: "A guaranteed waiting time (\"only 20 minutes\")", why: "Queue conditions are not in any agent's control" },
  { flag: "Payment to a personal UPI ID or number", why: "No accountability, and no receipt" },
  { flag: "UPI links \"in the name of the temple trust\"", why: "Donations to the temple must go through its official, receipted channels" },
  { flag: "\"Only 2 slots left today!\" pressure", why: "A classic tactic to rush you" },
  { flag: "No written quote, no refund terms", why: "You are paying on trust alone" },
  { flag: "A tout in the lane or at the station offering \"special entry\"", why: "Common at Mathura Junction and around the temple" },
  { flag: "\"Certificates\" shown as images with no way to verify them", why: "Easy to fake" },
];

export const weDo: string[] = [
  "Plan your darshan for the calmest day and hour",
  "Guide and escort you through the lanes",
  "Help elders with e-rickshaws, rest stops and lockers",
  "Coordinate Itra Seva through the traditional sevayat families only where the temple's current arrangements allow",
  "Give a written quote before you pay",
  "Refund seva fees if the seva cannot be performed",
];

export const weDoNot: string[] = [
  "Sell tickets or passes",
  "Promise a fixed waiting time",
  "Claim to be the temple's official booking office",
  "Promise queue-jumping or a \"VIP gate\"",
  "Add charges at the last minute",
  "Collect \"donations\" in the temple's name",
];

/* ------------------------------------------------------------------ */
/* Timings                                                             */
/* ------------------------------------------------------------------ */

export type Season = "summer" | "winter";
/** Minutes after midnight. */
export type Window = { from: number; to: number };
export type Schedule = { id: "traditional" | "revised"; name: string; note: string; summer: { morning: Window; evening: Window }; winter: { morning: Window; evening: Window } };

const t = (h: number, m = 0) => h * 60 + m;

export const schedules: Schedule[] = [
  {
    id: "traditional",
    name: "Traditional schedule",
    note: "Still widely published",
    summer: { morning: { from: t(7, 45), to: t(12) }, evening: { from: t(17, 30), to: t(21, 30) } },
    winter: { morning: { from: t(8, 45), to: t(13) }, evening: { from: t(16, 30), to: t(20, 30) } },
  },
  {
    id: "revised",
    name: "Revised schedule",
    note: "Reported after the 2025 management reforms",
    summer: { morning: { from: t(7), to: t(12, 45) }, evening: { from: t(16, 15), to: t(21, 45) } },
    winter: { morning: { from: t(8), to: t(13, 45) }, evening: { from: t(16), to: t(21, 15) } },
  },
];

/** "7:45 a.m.", "12:00 noon", "5:30 p.m." — the brief's own style. */
export function clock(min: number): string {
  const h = Math.floor(min / 60);
  const m = min % 60;
  if (h === 12 && m === 0) return "12:00 noon";
  const h12 = h % 12 === 0 ? 12 : h % 12;
  return `${h12}:${String(m).padStart(2, "0")} ${h < 12 ? "a.m." : "p.m."}`;
}

export const howToBeSure: { strong: string; rest: string }[] = [
  { strong: "Check the notice at the temple", rest: " or ask locals at the lane entrance on the day." },
  { strong: "Ask us.", rest: " We call and confirm the current timings the day before each guest's visit." },
  { strong: "Plan with a buffer.", rest: " If you arrive 30 to 45 minutes before the earliest listed opening, you are safe in either case." },
];

export const timingTips: { strong: string; rest: string }[] = [
  { strong: "Entry into the morning session usually stops before the session closes,", rest: " since the queue has to clear. Do not arrive in the last hour and expect to get in." },
  { strong: "The midday closure is long", rest: " (often five to six hours in summer). Use it to rest, eat and visit smaller temples." },
  { strong: "Evening darshan", rest: " is beautiful but can be busy, especially in winter, when the window is shorter." },
];

/* ------------------------------------------------------------------ */
/* Aarti and daily rituals (traditional schedule)                       */
/* ------------------------------------------------------------------ */

export type Ritual = { name: string; summer: string; winter: string; what: string; phase: "day" | "rest" | "night" };

export const rituals: Ritual[] = [
  { name: "Temple opens (morning)", summer: "7:45 a.m.", winter: "8:45 a.m.", what: "Doors open, and darshan begins", phase: "day" },
  { name: "Shringar Aarti", summer: "About 8:00 a.m.", winter: "About 9:00 a.m.", what: "The deity, freshly dressed and adorned, is honoured", phase: "day" },
  { name: "Rajbhog", summer: "About 11:00 a.m. to 12:00 noon", winter: "About 12:00 noon to 1:00 p.m.", what: "The main midday food offering, just before closing", phase: "day" },
  { name: "Morning closure", summer: "About 12:00 noon", winter: "About 1:00 p.m.", what: "The deity rests", phase: "rest" },
  { name: "Temple reopens (evening)", summer: "5:30 p.m.", winter: "4:30 p.m.", what: "Evening darshan begins", phase: "night" },
  { name: "Shayan Bhog", summer: "About 8:30 p.m. to 9:00 p.m.", winter: "About 7:30 p.m. to 8:00 p.m.", what: "The night offering", phase: "night" },
  { name: "Shayan Aarti and closing", summer: "About 9:30 p.m.", winter: "About 8:30 p.m.", what: "The final aarti, and the deity retires", phase: "night" },
];

export const ritualMeanings: { name: string; text: string }[] = [
  {
    name: "Shringar Aarti",
    text: "The morning adornment. The deity is dressed in fresh clothes and jewellery, and flowers are arranged. Many pilgrims find this the most beautiful and calm window, as the temple is fresh and the crowd is just building.",
  },
  {
    name: "Rajbhog",
    text: "The grand midday meal for the Lord. The atmosphere is intense, and the hall is at its fullest, so I do not recommend it for elders or small children.",
  },
  { name: "Shayan Aarti", text: "The lullaby at the end of the day, a quiet, tender closing." },
];

/* ------------------------------------------------------------------ */
/* Festival calendar                                                    */
/* ------------------------------------------------------------------ */

/** 1 = High … 5 = the highest of the year. Only the brief's own labels are shown. */
export type Festival = { name: string; season: string; special: string; crowd: string; level: 1 | 2 | 3 | 4 | 5 };

export const festivalDarshans: Festival[] = [
  { name: "Basant Panchami", season: "Jan to Feb", special: "Yellow dress and the spring mood that signals Holi", crowd: "High", level: 2 },
  { name: "Phoolon ki Holi / Holi darshan", season: "Feb to Mar", special: "Flower petals and gulal in the temple, around Rangbhari Ekadashi and Holi", crowd: "Extreme", level: 4 },
  { name: "Phool Bangla", season: "Summer (April to July)", special: "The sanctum decorated as a bower of fresh flowers", crowd: "High on weekends", level: 1 },
  { name: "Akshaya Tritiya", season: "April to May", special: "Sandalwood adornment and the rare charan darshan (the Lord's feet)", crowd: "Extreme", level: 4 },
  { name: "Hariyali Teej / Jhulan", season: "July to Aug", special: "The famed gold and silver swing (hindola) darshan", crowd: "Extreme", level: 4 },
  { name: "Janmashtami", season: "Aug to Sep", special: "The only mangala aarti of the year, at the Lord's birthday", crowd: "The highest of the year", level: 5 },
  { name: "Sharad Purnima", season: "Oct", special: "Bihari ji is said to appear with a flute and crown", crowd: "Very high", level: 3 },
  { name: "Annakut / Govardhan Puja", season: "Oct to Nov", special: "Mountain of food offerings", crowd: "High", level: 2 },
  { name: "Bihari ji Pragatya Divas", season: "Nov to Dec (Margashirsha)", special: "Celebrates the day the deity appeared", crowd: "High", level: 2 },
];

/* ------------------------------------------------------------------ */
/* Itra Seva and pricing                                               */
/* ------------------------------------------------------------------ */

export const itraWorks: string[] = [
  "The seva is performed by a Goswami (a sevayat, from the families who have served the deity for generations) on the devotee's behalf. The devotee does not touch the deity. This is a firm tradition, so no, you cannot perform the Itra Seva with your own hands.",
  "The devotee's name and family details may be spoken during the offering, along with their prayer.",
  "It is offered at a time the sevayat family and the temple schedule allow, often during Shringar or other seva windows.",
];

export const itraReceives: { strong: string; rest: string }[] = [
  { strong: "The blessing of the offering", rest: " and the sacred Charanamrit" },
  { strong: "A small portion of the blessed Itra", rest: " as prasad to take home" },
];

export const carefulPromises: { strong: string; rest: string }[] = [
  { strong: "Seva arrangements can change,", rest: " and they depend on the sevayat family, the day's schedule and the temple's current rules." },
  { strong: "We confirm availability first,", rest: " and only then quote you." },
  { strong: "We never collect money as a \"donation to the temple.\"", rest: " Any offering meant for the temple should go through its official, receipted channels." },
  { strong: "If the seva cannot be performed on your date,", rest: " you do not pay for it, or you are refunded in full." },
];

export type SevaOptionId = "itra" | "phool-bangla" | "guided";

export type SevaOption = { id: SevaOptionId; name: string; price: string; priceNote?: string; covers: string; bestFor: string; image: PhotoKey };

export const sevaOptions: SevaOption[] = [
  { id: "itra", name: "Standard Itra Seva", price: "₹1,100 to ₹2,100", covers: "Perfume offering on your behalf, Charanamrit and Itra prasad", bestFor: "A simple, heartfelt seva", image: "banke-bihari" },
  {
    id: "phool-bangla",
    name: "Special Phool Bangla Seva",
    price: "₹5,100 to ₹11,000",
    covers: "Coordination of a floral decoration seva (seasonal, subject to availability and permission)",
    bestFor: "Special occasions, vows and summer visits",
    image: "phool-bangla",
  },
  {
    id: "guided",
    name: "Guided Darshan Assistance",
    price: "from ₹1,199",
    priceNote: "Included in our trip packages",
    covers: "Timing advice, a local guide and escort, locker help, support for elders",
    bestFor: "Families, seniors and first-time visitors",
    image: "banke-bihari-gate",
  },
];

export const included: { strong: string; rest: string }[] = [
  { strong: "A written quote", rest: " with every line item" },
  { strong: "Seva materials", rest: " and coordination" },
  { strong: "Confirmation of availability", rest: " before you pay" },
  { strong: "A guide", rest: " on the day for seva bookings" },
  { strong: "Clear refund terms", rest: "" },
];

export const notIncluded: { strong: string; rest: string }[] = [
  { strong: "Your own temple offerings", rest: " (flowers, prasad, donations made directly at the temple)" },
  { strong: "Transport, meals or hotel,", rest: " unless you choose a package" },
  { strong: "Anything the temple itself does not permit", rest: " on your date" },
];

/* ------------------------------------------------------------------ */
/* How we help                                                         */
/* ------------------------------------------------------------------ */

export const bookingSteps: { title: string; text: string }[] = [
  { title: "Contact us", text: `on WhatsApp or call ${PHONE_DISPLAY}.` },
  { title: "Share your travel date, group size", text: "and anything we should know, such as elderly parents, wheelchair needs or small children." },
  { title: "We check availability,", text: "and tell you honestly what is and is not possible on your date. You receive a written quote and clear terms." },
  {
    title: "On the day, our guide meets you",
    text: "at a pre-agreed point near the temple area (usually close to Vidyapeeth Chauraha, which we confirm with you), and walks you through the lanes, lockers and queue.",
  },
  { title: "You take darshan", text: "in the temple's own queue and system. If you booked a seva, we coordinate it, and you receive your prasad." },
];

/* ------------------------------------------------------------------ */
/* Planning your visit                                                 */
/* ------------------------------------------------------------------ */

export const gettingThere: { strong: string; rest: string }[] = [
  { strong: "Cars cannot reach the temple.", rest: " The last stretch is through narrow lanes on foot." },
  { strong: "From your hotel,", rest: " take a short e-rickshaw ride or walk. Agree the fare before you sit." },
  { strong: "Our drivers", rest: " drop you at the nearest practical point and pick you up at an agreed spot. This matters hugely for elders." },
  { strong: "Parking", rest: " near the old town is limited. Do not try to drive in." },
];

export const whatToCarry: { strong: string; rest: string }[] = [
  { strong: "Leave phones, cameras, bags and electronics", rest: " in your vehicle or hotel, or use lockers near the temple. Photography and video are prohibited inside, and rules are enforced." },
  { strong: "Carry only the essentials:", rest: " small cash for offerings, a photocopy of ID and a handkerchief." },
  { strong: "Wear slip-on footwear.", rest: " Shoes are removed outside, and you will want them to be easy to find." },
  { strong: "Keep your glasses, phone and snacks", rest: " in a zipped bag, because the monkeys here are expert thieves." },
];

export const laneSafety: { strong: string; rest: string }[] = [
  { strong: "Walk on the edge of the flow,", rest: " not the centre." },
  { strong: "Keep your bag in front of you,", rest: " zipped." },
  { strong: "Hold hands with children and elders.", rest: "" },
  { strong: "Agree on a meeting point", rest: " in case you get separated, since mobile networks often fail in crowds." },
  { strong: "If the lane is packed and you are being pushed,", rest: " step to the side and wait. No darshan is worth a crush." },
];

/* ------------------------------------------------------------------ */
/* Best time                                                           */
/* ------------------------------------------------------------------ */

/** `calm`: 3 = calmest … 0 = most packed. Drives the meter only; the words are the brief's. */
export const timeOfDay: { name: string; text: string; calm: 0 | 1 | 2 | 3 }[] = [
  { name: "Weekday, first hour after opening", text: "The calmest and coolest window. This is when I take most of my guests, and many other guides agree.", calm: 3 },
  { name: "Post-Shringar window", text: "Many pilgrims find the period soon after the morning adornment to be the best balance of beauty and space.", calm: 2 },
  { name: "Evening", text: "Lovely, but the windows can be shorter and the crowd heavy in winter.", calm: 1 },
  { name: "Rajbhog window (just before the midday closure)", text: "The most intense and packed.", calm: 0 },
];

export const dayOfWeek: { strong: string; rest: string }[] = [
  { strong: "Tuesday to Thursday", rest: " are usually the quietest." },
  { strong: "Saturdays, Sundays and public holidays", rest: " bring waves of day-trippers from Delhi, Agra and nearby cities." },
  { strong: "Ekadashi and Purnima", rest: " draw larger crowds than usual." },
];

export const seasons: { name: string; months: string; text: string }[] = [
  { name: "Winter", months: "Oct to Mar", text: "Best weather. Foggy mornings, cold floors and busy weekends" },
  { name: "Summer", months: "Apr to Jun", text: "Very hot, quiet weekdays, Phool Bangla and cooling decorations" },
  { name: "Monsoon", months: "Jul to Sep", text: "Humid and green. Jhulan Yatra and Janmashtami crowds" },
];

/* ------------------------------------------------------------------ */
/* Families and seniors                                                */
/* ------------------------------------------------------------------ */

export const crowdRealities: { strong: string; rest: string; lead?: string }[] = [
  { lead: "The lanes are ", strong: "narrow", rest: ", and crowds build quickly, especially on weekends, Ekadashi and festivals." },
  { strong: "Queues can run long,", rest: " and pushing is common." },
  { strong: "Pickpocketing and lost phones", rest: " are real risks." },
  { lead: "Elders and small children ", strong: "tire quickly,", rest: " and heat in summer adds to it." },
  { strong: "Monkeys", rest: " snatch glasses, phones and prasad." },
];

export const guideChanges: { strong: string; rest: string }[] = [
  { strong: "We choose the calmest day and hour,", rest: " usually a weekday soon after opening." },
  { strong: "We drop you at the right point,", rest: " so elders do not walk extra distance." },
  { strong: "We hold the plan together:", rest: " lockers, a meeting point, rest stops, water and a patient pace." },
  { strong: "We never rush you", rest: " in front of Thakur Ji." },
];

export const seniorTips: { strong: string; rest: string }[] = [
  { strong: "Come with an attendant", rest: " or family member who can stay beside you." },
  { strong: "Ask about assistance", rest: " at the entrance. We plan the approach in advance." },
  { strong: "Take breaks.", rest: " The midday closure is a gift. Rest at your hotel." },
  { strong: "Carry medicines,", rest: " water and glucose." },
  { strong: "Choose a hotel close to the lanes,", rest: " so you can return and rest between sessions." },
];

/* ------------------------------------------------------------------ */
/* Sample plans                                                        */
/* ------------------------------------------------------------------ */

export type PlanStop = { when: string; what: string; rest?: string };
export type SamplePlan = { title: string; lead?: string; days: { label?: string; summary?: string; stops: PlanStop[] }[] };

export const samplePlans: SamplePlan[] = [
  {
    title: "A 1-Day Vrindavan Darshan Plan",
    days: [
      {
        stops: [
          { when: "Early morning", what: "Arrive in Vrindavan,", rest: " with a short walk to the temple lane." },
          { when: "At opening", what: "Banke Bihari darshan,", rest: " soon after the doors open." },
          { when: "Late morning", what: "Radha Raman Temple", rest: " and a quiet moment in the courtyard." },
          { when: "Midday", what: "Lunch and rest", rest: " during the temple closure." },
          { when: "Afternoon", what: "ISKCON Krishna Balaram Mandir." },
          { when: "Evening", what: "Prem Mandir", rest: " in daylight and after dark for the lights." },
        ],
      },
    ],
  },
  {
    title: "A 2-Day Plan with a Seva",
    days: [
      { label: "Day 1", summary: "Arrive, check in and rest, ISKCON in the afternoon and Prem Mandir lights in the evening.", stops: [] },
      {
        label: "Day 2",
        stops: [
          { when: "Early morning", what: "Nidhivan and Seva Kunj", rest: " while the groves are quiet." },
          { when: "Opening time", what: "Banke Bihari darshan,", rest: " and your Itra Seva if it has been confirmed." },
          { when: "Late morning", what: "Radha Vallabh and Madan Mohan." },
          { when: "Afternoon", what: "Rest." },
          { when: "Evening", what: "A second, gentler visit to Banke Bihari,", rest: " or Keshi Ghat for a quiet aarti by the Yamuna." },
        ],
      },
    ],
  },
  {
    title: "A Festival Plan (Janmashtami, Holi, Akshaya Tritiya)",
    days: [
      {
        stops: [
          { when: "Plan", what: "Book stays and a guide six to eight weeks ahead." },
          { when: "Travel", what: "Arrive a day early", rest: " and rest." },
          { when: "Focus", what: "Choose one major priority", rest: " (for example, Banke Bihari mangala aarti or Mathura Janmabhoomi at midnight), not everything." },
          { when: "Return", what: "Plan your return,", rest: " since vehicles are scarce late at night." },
        ],
      },
    ],
  },
];

/* ------------------------------------------------------------------ */
/* Nearby, food, stay                                                  */
/* ------------------------------------------------------------------ */

export const nearby: { name: string; text: string; image: PhotoKey; href?: string }[] = [
  { name: "Radha Raman Temple", text: "A self-manifested deity and a calm, traditional atmosphere.", image: "radha-raman", href: "/temples/radha-raman" },
  { name: "Radha Vallabh Temple", text: "Radha is worshipped at the centre, with beautiful devotional music.", image: "radha-vallabh", href: "/temples/radha-vallabh" },
  { name: "Madan Mohan and Govind Dev", text: "Two of the oldest temples in Vrindavan.", image: "madan-mohan", href: "/temples/madan-mohan" },
  {
    name: "Nidhivan and Seva Kunj",
    text: "The sacred groves linked with the Raas Leela and with Swami Haridas, who is traditionally said to have revealed Banke Bihari here.",
    image: "nidhivan",
    href: "/temples/nidhivan",
  },
  { name: "Prem Mandir", text: "White marble carvings and the evening light show.", image: "prem-mandir-night", href: "/temples/prem-mandir" },
  { name: "ISKCON Temple", text: "Kirtan and a global devotee community.", image: "iskcon", href: "/temples/iskcon-krishna-balaram" },
  { name: "Keshi Ghat", text: "A quiet riverside aarti on the Yamuna.", image: "keshi-ghat" },
];

export const foods: { strong: string; rest: string; image?: PhotoKey }[] = [
  { strong: "Kachori with aloo sabzi", rest: " (the classic breakfast)", image: "kachori-sabzi" },
  { strong: "Kulhad lassi", rest: " with malai", image: "kulhad-lassi-malai" },
  { strong: "Rabri and jalebi", rest: "", image: "jalebi-rabri-plate" },
  { strong: "Peda", rest: " (Mathura-Vrindavan style, grainy and caramelised)", image: "mathura-peda" },
  { strong: "Malpua, thandai and makhan mishri", rest: "" },
];

/* ------------------------------------------------------------------ */
/* FAQs                                                                */
/* ------------------------------------------------------------------ */

export const sevaFaqs: Faq[] = [
  {
    q: "Can I book Banke Bihari VIP tickets online?",
    a: "No. No VIP tickets exist, and the temple does not sell passes online or offline. What we offer is guided darshan planning and Itra Seva coordination through the traditional sevayat families, where permitted.",
  },
  { q: "Is there an official Banke Bihari VIP entry booking website?", a: "No. No official temple website sells VIP entry. Be careful with any site that claims otherwise." },
  {
    q: "What is the Banke Bihari temple VIP darshan price?",
    a: "There is no official price, because there is no official VIP darshan. Our indicative seva prices are in the table above, and they cover seva materials, dakshina and coordination, not entry.",
  },
  {
    q: "What are the Banke Bihari temple timings today?",
    a: "The traditional figures are about 7:45 a.m. to 12 noon and 5:30 to 9:30 p.m. in summer, and 8:45 a.m. to 1 p.m. and 4:30 to 8:30 p.m. in winter. A revised schedule reported after the 2025 reforms runs longer. Always confirm on the day, and we do it for you.",
  },
  { q: "When do the summer and winter schedules begin?", a: "Roughly after Holi (summer) and after Diwali (winter). Please confirm the exact changeover date for your year." },
  {
    q: "What is the Banke Bihari aarti timing?",
    a: "Traditionally, Shringar is about 8:00 a.m. in summer and 9:00 a.m. in winter, Rajbhog is late morning to noon (summer) or noon to 1 p.m. (winter), and Shayan aarti is about 9:30 p.m. (summer) or 8:30 p.m. (winter). These may shift under the revised schedule.",
  },
  { q: "Is there a mangala aarti at Banke Bihari?", a: "Not on ordinary days. It is held only on Janmashtami." },
  {
    q: "Why is the curtain drawn again and again?",
    a: "Tradition says that a steady gaze at Bihari ji captivates the devotee. The curtain is drawn so you receive glimpses and are protected from overwhelming love.",
  },
  {
    q: "How long does darshan take?",
    a: "It depends on the day. On a quiet weekday morning the wait can be short. On weekends, Ekadashi and festivals it can be hours. I cannot promise a fixed time, and you should not trust anyone who does.",
  },
  { q: "Can I do the Itra Seva with my own hands?", a: "No. Only the Goswamis touch the deity. They perform it on your behalf, and you receive the prasad." },
  { q: "Is alcohol used in Itra?", a: "No. Itra offered to Thakur Ji is natural and alcohol-free, such as sandalwood or mogra." },
  { q: "What is the dress code at Banke Bihari Temple?", a: "Modest, traditional clothing covering shoulders and knees. Slip-on footwear is practical." },
  { q: "Are phones and cameras allowed inside?", a: "No. Photography and video are prohibited, and phones and bags are best left in your vehicle, hotel or a locker." },
  { q: "Is entry free?", a: "Yes. Darshan is free for everyone." },
  {
    q: "How do I get a calm darshan without any \"VIP\" pass?",
    a: "Go on a weekday, soon after opening. Avoid weekends, Ekadashi, Purnima and festival days. Confirm current timings, and arrive early.",
  },
  {
    q: "Is Banke Bihari suitable for senior citizens?",
    a: "Yes, with planning. Come with an attendant, choose a quiet day and hour, use lockers and rest during the midday closure. We plan gentler routes and timings for elders.",
  },
  {
    q: "Can I watch Banke Bihari darshan online?",
    a: "The management has reportedly introduced live-streamed darshan so that devotees who cannot travel can watch. Please check the current official channels.",
  },
  { q: "What happens if the seva cannot be done on my date?", a: "You are not charged for it, or you are refunded in full. I would not take money for something I cannot arrange." },
  {
    q: "How should I pay?",
    a: "Only to our confirmed business details, against a written quote. Never pay a \"temple trust\" UPI link or a personal number sent by a stranger. Any offering for the temple itself should go through its official, receipted channels.",
  },
  {
    q: "Can I book Phool Bangla?",
    a: "We can coordinate it where the sevayat family offers it and the temple permits, mostly in summer, subject to availability. Prices are confirmed in your quote.",
  },
  {
    q: "What is the best time for Banke Bihari darshan?",
    a: "A weekday morning in the first hour after opening. Winter and summer both work, but avoid festival days and weekends if you want calm.",
  },
  {
    q: "Can I take my own prasad inside?",
    a: "Offerings and prasad rules vary. We advise carrying simple items (flowers, tulsi, pedas) and following the temple's instructions on the day.",
  },
  {
    q: "How far is Banke Bihari from Mathura?",
    a: "Vrindavan is about 11 to 15 km from Mathura, usually a 30 to 45 minute drive. The last stretch to the temple is on foot.",
  },
  {
    q: "Do you provide hotel stays?",
    a: "Yes. We arrange stays from simple ashram guesthouses to top 4 and 5-star hotels, and we can offer combined darshan-and-stay quotes.",
  },
];

/** FAQ 25 carries the live contact details, so it is built from config rather than written out. */
export function bookingFaq(phone: string, email: string, url: string): Faq {
  return { q: "How do I book your help?", a: `Call or WhatsApp ${phone}, email ${email} or visit ${url}.` };
}

/* ------------------------------------------------------------------ */
/* Enquiry form                                                        */
/* ------------------------------------------------------------------ */

export const sevaInterests = [
  "Guided darshan planning",
  "Standard Itra Seva",
  "Special Phool Bangla Seva",
  "Darshan with a hotel stay",
  "Festival darshan plan",
  "Not sure yet, please advise",
] as const;

export type SevaInterest = (typeof sevaInterests)[number];

export const sevaNeeds = ["Elderly parents", "Wheelchair needs", "Small children"] as const;
