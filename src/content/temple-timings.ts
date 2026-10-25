import type { Faq } from "./types";

/*
 * Darshan and aarti timings for /mathura-vrindavan-temple-timings.
 *
 * Compiled from several published Braj timing lists and news reports of temple-committee notices,
 * then cross-checked against each other. Where sources disagree, or a temple changed its hours
 * recently, the entry carries a `confirm` reason and the page shows a "Confirm" badge.
 * Never fill a gap with a guessed time — leave it out instead.
 */

/** ISO date the timings were last compiled. Shown on the page. */
export const TIMINGS_COMPILED = "2026-10-25";

/** 24-hour "HH:MM" open and close times. */
export type Window = { from: string; to: string };

export type Hours = {
  morning?: Window;
  evening?: Window;
  /** Open through the day with no midday closure. */
  allDay?: Window;
  /** Short aarti summary for the table. */
  aarti?: string;
  note?: string;
};

export type AreaId = "vrindavan" | "mathura" | "govardhan-barsana" | "gokul-baldeo";

export type TimingRow = {
  id: string;
  name: string;
  /** Name in Devanagari. */
  hindi: string;
  /** Extra search terms (other common names). */
  aliases?: string;
  place: string;
  area: AreaId;
  summer: Hours;
  /** Omitted when the temple keeps the same hours all year. */
  winter?: Hours;
  /** The listed times are aarti slots, not general opening hours (ghats). */
  aartiOnly?: boolean;
  note?: string;
  /** Why the visitor should confirm before going (conflicting sources, recent change). */
  confirm?: string;
  /** Slug of the temple's guide page under /temples. */
  templeSlug?: string;
};

export type TimingArea = {
  id: AreaId;
  title: string;
  short: string;
  hindi: string;
  lede: string;
  page: { label: string; href: string };
};

export const timingAreas: TimingArea[] = [
  {
    id: "vrindavan",
    title: "Vrindavan temple timings",
    short: "Vrindavan",
    hindi: "वृन्दावन",
    lede: "Most Vrindavan temples open in the morning, close for Thakur ji’s afternoon rest and reopen in the late afternoon. The old-town temples around Banke Bihari sit within a short walk of each other.",
    page: { label: "Vrindavan travel guide", href: "/vrindavan" },
  },
  {
    id: "mathura",
    title: "Mathura temple timings",
    short: "Mathura",
    hindi: "मथुरा",
    lede: "Krishna Janmabhoomi keeps long hours, while Dwarkadhish opens only for short darshan slots. Vishram Ghat is open all day, with the Yamuna aarti at dawn and dusk.",
    page: { label: "Mathura travel guide", href: "/mathura" },
  },
  {
    id: "govardhan-barsana",
    title: "Govardhan, Barsana & Nandgaon timings",
    short: "Govardhan & Barsana",
    hindi: "गोवर्धन · बरसाना",
    lede: "These hilltop and parikrama temples sit 25–50 km from Vrindavan, so plan them as a full day. Barsana’s Shriji temple keeps a long morning session.",
    page: { label: "Govardhan & Barsana guide", href: "/govardhan-barsana" },
  },
  {
    id: "gokul-baldeo",
    title: "Gokul, Mahavan & Baldeo timings",
    short: "Gokul & Baldeo",
    hindi: "गोकुल · बलदेव",
    lede: "Across the Yamuna from Mathura, these temples of Krishna’s childhood and of Dauji are usually covered together in a half-day circuit.",
    page: { label: "Full Braj Yatra guide", href: "/braj-yatra" },
  },
];

const w = (from: string, to: string): Window => ({ from, to });

export const timingRows: TimingRow[] = [
  /* ----------------------------- Vrindavan ----------------------------- */
  {
    id: "banke-bihari",
    name: "Shri Banke Bihari Temple",
    hindi: "श्री बांके बिहारी मंदिर",
    aliases: "bihari ji thakur ji",
    place: "Vrindavan",
    area: "vrindavan",
    summer: { morning: w("07:00", "12:30"), evening: w("16:15", "21:30"), aarti: "Shringar 7:10 am · Rajbhog 12:25 pm · Shayan 9:25 pm" },
    winter: { morning: w("08:00", "13:45"), evening: w("16:00", "21:15"), aarti: "Shringar 8:00 am · Rajbhog 1:30 pm · Shayan 9:00 pm" },
    confirm: "Hours were extended by the court-appointed temple committee from 30 September 2025, and a legal challenge to the change was reported. Many lists still show the older summer hours of 7:45 am – 12:00 noon and 5:30 – 9:30 pm.",
    templeSlug: "banke-bihari",
  },
  {
    id: "prem-mandir",
    name: "Prem Mandir",
    hindi: "प्रेम मंदिर",
    aliases: "kripalu fountain light show",
    place: "Vrindavan",
    area: "vrindavan",
    summer: { morning: w("08:30", "12:00"), evening: w("16:30", "20:30"), aarti: "Darshan aarti 8:30 am & 4:30 pm · Shayan 8:10 pm", note: "Light & fountain show 7:30 – 8:00 pm" },
    winter: { morning: w("08:30", "12:00"), evening: w("16:30", "20:30"), aarti: "Darshan aarti 8:30 am & 4:30 pm · Shayan 8:10 pm", note: "Light & fountain show 7:00 – 7:30 pm" },
    note: "A parikrama aarti is held at 5:00 am.",
    templeSlug: "prem-mandir",
  },
  {
    id: "iskcon",
    name: "ISKCON Krishna-Balaram Mandir",
    hindi: "इस्कॉन कृष्ण-बलराम मंदिर",
    aliases: "iskcon krishna balaram hare krishna",
    place: "Raman Reti, Vrindavan",
    area: "vrindavan",
    summer: { morning: w("04:30", "12:45"), evening: w("16:30", "20:00"), aarti: "Mangla 4:30 am · Rajbhog 12:00 noon · Sandhya 6:30 pm · Shayan 8:00 pm" },
    note: "One published list gives mangla aarti at 5:00 am.",
    templeSlug: "iskcon-krishna-balaram",
  },
  {
    id: "radha-raman",
    name: "Shri Radha Raman Temple",
    hindi: "श्री राधा रमण मंदिर",
    place: "Vrindavan",
    area: "vrindavan",
    summer: { morning: w("08:30", "12:30"), evening: w("18:00", "20:30"), aarti: "Mangla 4:00 am" },
    winter: { morning: w("08:30", "12:30"), evening: w("18:00", "20:30"), aarti: "Mangla 5:30 am" },
    templeSlug: "radha-raman",
  },
  {
    id: "radha-vallabh",
    name: "Shri Radha Vallabh Temple",
    hindi: "श्री राधा वल्लभ मंदिर",
    place: "Vrindavan",
    area: "vrindavan",
    summer: { morning: w("07:00", "12:00"), evening: w("18:30", "21:00") },
    note: "One older list gives 5:00 am – 12:00 noon and 6:00 – 9:00 pm.",
    templeSlug: "radha-vallabh",
  },
  {
    id: "rangji",
    name: "Shri Rangji Temple",
    hindi: "श्री रंगजी मंदिर",
    aliases: "ranganath rang ji",
    place: "Vrindavan",
    area: "vrindavan",
    summer: { morning: w("05:30", "10:30"), evening: w("16:00", "21:00"), aarti: "Aarti 5:30 am & 6:30 pm" },
    winter: { morning: w("06:00", "11:00"), evening: w("16:00", "21:00"), aarti: "Aarti 6:00 am & 6:30 pm" },
    templeSlug: "rangji",
  },
  {
    id: "govind-dev-ji",
    name: "Govind Dev Ji Temple",
    hindi: "श्री गोविंद देव जी मंदिर",
    aliases: "govind dev govinda",
    place: "Vrindavan",
    area: "vrindavan",
    summer: { morning: w("08:00", "11:00"), evening: w("17:00", "20:30") },
    winter: { morning: w("09:00", "11:30"), evening: w("17:00", "20:30") },
    templeSlug: "govind-dev-ji",
  },
  {
    id: "nidhivan",
    name: "Nidhivan",
    hindi: "निधिवन",
    aliases: "nidhi van",
    place: "Vrindavan",
    area: "vrindavan",
    summer: { morning: w("06:00", "12:30"), evening: w("16:00", "20:00") },
    winter: { morning: w("06:00", "12:00"), evening: w("16:00", "19:00") },
    note: "Gates close after the evening aarti; no one stays inside at night.",
    templeSlug: "nidhivan",
  },
  {
    id: "seva-kunj",
    name: "Seva Kunj",
    hindi: "सेवा कुंज",
    aliases: "sevakunj nikunjvan",
    place: "Vrindavan",
    area: "vrindavan",
    summer: { morning: w("07:00", "12:00"), evening: w("18:30", "21:00") },
    winter: { morning: w("07:00", "12:00"), evening: w("16:30", "18:30") },
    note: "Closed at night, like Nidhivan.",
    templeSlug: "seva-kunj",
  },
  {
    id: "radha-damodar",
    name: "Shri Radha Damodar Temple",
    hindi: "श्री राधा दामोदर मंदिर",
    place: "Vrindavan",
    area: "vrindavan",
    summer: { morning: w("08:30", "12:30"), evening: w("17:30", "21:30") },
    winter: { morning: w("08:30", "12:00"), evening: w("17:00", "20:30") },
  },
  {
    id: "shahji",
    name: "Shahji Temple",
    hindi: "शाहजी मंदिर",
    aliases: "shah ji tedhe khambe",
    place: "Vrindavan",
    area: "vrindavan",
    summer: { morning: w("09:00", "12:00"), evening: w("18:00", "21:00") },
  },
  {
    id: "katyayani-peeth",
    name: "Katyayani Peeth",
    hindi: "कात्यायनी पीठ",
    aliases: "katyayni shakti peeth",
    place: "Vrindavan",
    area: "vrindavan",
    summer: { morning: w("07:00", "11:00"), evening: w("17:30", "20:30") },
    winter: { morning: w("07:00", "12:30"), evening: w("17:30", "20:30") },
  },
  {
    id: "gopeshwar-mahadev",
    name: "Gopeshwar Mahadev Temple",
    hindi: "गोपेश्वर महादेव मंदिर",
    aliases: "shiv",
    place: "Vrindavan",
    area: "vrindavan",
    summer: { morning: w("07:00", "12:30"), evening: w("16:30", "20:30") },
    winter: { morning: w("07:30", "12:30"), evening: w("16:30", "20:30") },
  },
  {
    id: "priya-kant-ju",
    name: "Priya Kant Ju Temple",
    hindi: "प्रिया कांत जू मंदिर",
    aliases: "priyakant",
    place: "Vrindavan",
    area: "vrindavan",
    summer: { morning: w("05:00", "12:00"), evening: w("17:00", "21:00") },
    winter: { morning: w("06:00", "12:00"), evening: w("16:00", "20:00") },
  },
  {
    id: "tatiya-sthan",
    name: "Tatiya Sthan",
    hindi: "टटिया स्थान",
    place: "Vrindavan",
    area: "vrindavan",
    summer: { morning: w("08:30", "12:00"), evening: w("17:30", "20:30") },
    winter: { morning: w("08:00", "12:30"), evening: w("15:00", "20:00") },
  },
  {
    id: "goda-vihar",
    name: "Goda Vihar Temple",
    hindi: "गोदा विहार मंदिर",
    place: "Vrindavan",
    area: "vrindavan",
    summer: { morning: w("08:00", "12:30"), evening: w("16:00", "20:30") },
    winter: { morning: w("08:00", "12:00"), evening: w("16:00", "20:00") },
  },
  {
    id: "pagal-baba",
    name: "Pagal Baba Temple",
    hindi: "पागल बाबा मंदिर",
    place: "Vrindavan",
    area: "vrindavan",
    summer: { morning: w("08:00", "12:30"), evening: w("16:00", "20:30") },
  },
  {
    id: "vaishno-devi-dham",
    name: "Vaishno Devi Dham",
    hindi: "वैष्णो देवी धाम",
    place: "Vrindavan",
    area: "vrindavan",
    summer: { morning: w("06:20", "08:00"), evening: w("19:20", "20:30") },
    aartiOnly: true,
    confirm: "Published lists give only these aarti-darshan slots, not general opening hours.",
  },
  {
    id: "yamuna-aarti-vrindavan",
    name: "Yamuna Aarti",
    hindi: "यमुना आरती",
    aliases: "keshi ghat jamuna",
    place: "Vrindavan ghats",
    area: "vrindavan",
    summer: { evening: w("17:00", "19:00") },
    winter: { evening: w("16:00", "18:00") },
    aartiOnly: true,
    confirm: "Aarti follows sunset, so the exact time moves through the season and varies by ghat.",
  },

  /* ------------------------------ Mathura ------------------------------ */
  {
    id: "krishna-janmabhoomi",
    name: "Shri Krishna Janmabhoomi",
    hindi: "श्री कृष्ण जन्मभूमि",
    aliases: "janmasthan birthplace keshav dev",
    place: "Mathura",
    area: "mathura",
    summer: { morning: w("05:00", "12:00"), evening: w("16:00", "21:30"), aarti: "Mangla 5:30 am · Makhan bhog 8:00 am · Sandhya 6:00 pm" },
    winter: { morning: w("05:30", "12:00"), evening: w("15:00", "20:30"), aarti: "Mangla 5:30 am · Makhan bhog 8:00 am · Sandhya 6:00 pm" },
    note: "Phones, cameras and bags are not allowed inside; lockers are near the entrance.",
    templeSlug: "krishna-janmabhoomi",
  },
  {
    id: "dwarkadhish",
    name: "Dwarkadhish Temple",
    hindi: "द्वारकाधीश मंदिर",
    aliases: "dwarkadheesh",
    place: "Mathura",
    area: "mathura",
    summer: { morning: w("06:30", "10:30"), evening: w("16:00", "19:00"), aarti: "Opens in short jhanki slots — see the full schedule below" },
    winter: { morning: w("06:30", "10:30"), evening: w("15:30", "18:00"), aarti: "Opens in short jhanki slots — see the full schedule below", note: "Last listed aarti 6:00 pm" },
    templeSlug: "dwarkadhish",
  },
  {
    id: "vishram-ghat",
    name: "Vishram Ghat Yamuna Aarti",
    hindi: "विश्राम घाट",
    aliases: "yamuna aarti jamuna",
    place: "Mathura",
    area: "mathura",
    summer: { morning: w("07:00", "07:15"), evening: w("18:45", "19:00") },
    winter: { morning: w("06:45", "07:00"), evening: w("18:45", "19:00") },
    aartiOnly: true,
    note: "The ghat itself is open all day.",
    confirm: "Another published list gives 4:45 am and 7:30 pm. The evening aarti generally follows sunset.",
    templeSlug: "vishram-ghat",
  },
  {
    id: "birla-mandir",
    name: "Birla Mandir (Gita Mandir)",
    hindi: "बिरला मंदिर (गीता मंदिर)",
    aliases: "gita geeta",
    place: "Mathura–Vrindavan road",
    area: "mathura",
    summer: { morning: w("05:00", "12:00"), evening: w("14:00", "21:00") },
    winter: { morning: w("05:30", "12:00"), evening: w("14:00", "20:30") },
    note: "One list gives a 5:00 am winter opening.",
  },

  /* ---------------------- Govardhan, Barsana, Nandgaon ---------------------- */
  {
    id: "daan-ghati",
    name: "Daan Ghati Temple",
    hindi: "दानघाटी मंदिर",
    aliases: "dan ghati giriraj",
    place: "Govardhan",
    area: "govardhan-barsana",
    summer: { allDay: w("06:00", "21:00"), aarti: "Mangla 4:00 am" },
    winter: { allDay: w("07:00", "21:00"), aarti: "Aarti 7:00 am" },
    templeSlug: "daan-ghati-govardhan",
  },
  {
    id: "mukharvind",
    name: "Mukharvind Temple",
    hindi: "मुखारविंद मंदिर",
    aliases: "giriraj jatipura mansi ganga",
    place: "Govardhan",
    area: "govardhan-barsana",
    summer: { morning: w("07:30", "12:30"), evening: w("16:30", "20:30") },
    winter: { morning: w("07:30", "12:30"), evening: w("16:00", "20:30") },
    templeSlug: "mukharvind-govardhan",
  },
  {
    id: "shriji-barsana",
    name: "Shri Radha Rani Temple (Shriji)",
    hindi: "श्री राधा रानी मंदिर (श्रीजी)",
    aliases: "ladli ji ladliji",
    place: "Barsana",
    area: "govardhan-barsana",
    summer: { morning: w("05:00", "14:00"), evening: w("17:00", "20:00"), aarti: "Mangla 5:00 am" },
    templeSlug: "radha-rani-temple-barsana",
  },
  {
    id: "kirti-mandir",
    name: "Kirti Mandir",
    hindi: "कीर्ति मंदिर",
    aliases: "kriti",
    place: "Barsana",
    area: "govardhan-barsana",
    summer: { morning: w("05:00", "14:00"), evening: w("17:00", "21:00"), aarti: "Aarti 5:00 am" },
  },
  {
    id: "nand-baba-nandgaon",
    name: "Nand Baba Temple (Nand Bhawan)",
    hindi: "नंद बाबा मंदिर (नंद भवन)",
    aliases: "nand bhawan",
    place: "Nandgaon",
    area: "govardhan-barsana",
    summer: { morning: w("07:00", "13:00"), evening: w("15:00", "21:00") },
    templeSlug: "nand-bhawan-nandgaon",
  },
  {
    id: "shani-dev-kokilavan",
    name: "Shani Dev Temple",
    hindi: "शनि देव मंदिर",
    aliases: "shani dham",
    place: "Kokilavan",
    area: "govardhan-barsana",
    summer: { morning: w("05:00", "12:30"), evening: w("16:00", "20:00") },
  },

  /* ------------------------ Gokul, Mahavan, Baldeo ------------------------ */
  {
    id: "dauji",
    name: "Shri Dauji Temple",
    hindi: "श्री दाऊजी मंदिर",
    aliases: "baldeo balram balarama",
    place: "Baldeo",
    area: "gokul-baldeo",
    summer: { morning: w("06:00", "11:00"), evening: w("16:00", "21:00") },
    winter: { morning: w("07:00", "12:00"), evening: w("15:00", "20:00") },
    templeSlug: "dauji-baldeo",
  },
  {
    id: "raman-reti",
    name: "Raman Reti Ashram",
    hindi: "रमण रेती आश्रम",
    aliases: "ramanreti",
    place: "Mahavan, near Gokul",
    area: "gokul-baldeo",
    summer: { morning: w("04:00", "11:00"), evening: w("16:30", "20:30") },
    note: "Another list gives 5:00 am – 12:00 noon and 4:00 – 8:30 pm.",
    templeSlug: "gokul",
  },
  {
    id: "nand-bhavan-gokul",
    name: "Nand Bhavan",
    hindi: "नंद भवन",
    aliases: "nand bhawan",
    place: "Gokul",
    area: "gokul-baldeo",
    summer: { morning: w("05:00", "12:00"), evening: w("14:00", "21:00"), aarti: "Aarti 5:00 am" },
    winter: { morning: w("05:30", "12:00"), evening: w("18:00", "20:30"), aarti: "Mangla 5:30 am" },
    confirm: "The winter evening slot is listed only as an aarti-darshan window.",
  },
];

/* ------------------------------------------------------------------ */
/* Detailed aarti schedules                                            */
/* ------------------------------------------------------------------ */

export type AartiItem = { time: string; name: string };

export type AartiSchedule = {
  id: string;
  rowId: string;
  name: string;
  hindi: string;
  place: string;
  summer: AartiItem[];
  /** Omitted when the schedule is the same all year. */
  winter?: AartiItem[];
  note?: string;
  confirm?: string;
};

const a = (time: string, name: string): AartiItem => ({ time, name });

const premMandirDay = [
  a("5:00 am", "Parikrama aarti"),
  a("6:30 am", "Bhog"),
  a("8:30 am", "Darshan opens · aarti"),
  a("11:30 am", "Bhog"),
  a("12:00 noon", "Doors close"),
  a("4:30 pm", "Darshan reopens · aarti"),
  a("5:30 pm", "Bhog"),
  a("7:00 pm", "Parikrama"),
];

const dwarkadhishMorning = [a("6:30 – 7:00 am", "Mangla"), a("7:40 – 7:55 am", "Shringar"), a("8:25 – 8:45 am", "Gwal"), a("10:00 – 10:30 am", "Rajbhog")];

export const aartiSchedules: AartiSchedule[] = [
  {
    id: "aarti-banke-bihari",
    rowId: "banke-bihari",
    name: "Shri Banke Bihari Temple",
    hindi: "श्री बांके बिहारी मंदिर",
    place: "Vrindavan",
    summer: [a("7:00 am", "Darshan opens"), a("7:10 am", "Shringar aarti"), a("12:25 pm", "Rajbhog aarti"), a("12:30 pm", "Morning darshan closes"), a("4:15 pm", "Evening darshan opens"), a("9:25 pm", "Shayan aarti"), a("9:30 pm", "Darshan closes")],
    winter: [a("8:00 am", "Shringar aarti · darshan opens"), a("1:30 pm", "Rajbhog aarti"), a("1:45 pm", "Morning darshan closes"), a("4:00 pm", "Evening darshan opens"), a("9:00 pm", "Shayan aarti"), a("9:15 pm", "Darshan closes")],
    note: "There are no bells or conch here, and the curtain is drawn every few minutes. Mangla aarti is held only once a year, on Janmashtami night.",
    confirm: "The temple committee’s revised schedule (from 30 September 2025).",
  },
  {
    id: "aarti-prem-mandir",
    rowId: "prem-mandir",
    name: "Prem Mandir",
    hindi: "प्रेम मंदिर",
    place: "Vrindavan",
    summer: [...premMandirDay, a("7:30 – 8:00 pm", "Light & fountain show"), a("8:10 pm", "Shayan aarti"), a("8:30 pm", "Doors close")],
    winter: [...premMandirDay, a("7:00 – 7:30 pm", "Light & fountain show"), a("8:10 pm", "Shayan aarti"), a("8:30 pm", "Doors close")],
  },
  {
    id: "aarti-iskcon",
    rowId: "iskcon",
    name: "ISKCON Krishna-Balaram Mandir",
    hindi: "इस्कॉन कृष्ण-बलराम मंदिर",
    place: "Vrindavan",
    summer: [
      a("4:30 am", "Mangla aarti"),
      a("7:15 am", "Guru puja"),
      a("7:30 am", "Bhagavatam class"),
      a("8:30 am", "Shringar aarti"),
      a("12:00 noon", "Rajbhog aarti"),
      a("4:30 pm", "Doors reopen · dhoop aarti"),
      a("6:30 pm", "Sandhya aarti"),
      a("7:30 pm", "Gita class"),
      a("8:00 pm", "Shayan aarti"),
    ],
    note: "Published lists differ by a few minutes on some slots; one gives mangla aarti at 5:00 am.",
  },
  {
    id: "aarti-janmabhoomi",
    rowId: "krishna-janmabhoomi",
    name: "Shri Krishna Janmabhoomi",
    hindi: "श्री कृष्ण जन्मभूमि",
    place: "Mathura",
    summer: [a("5:00 am", "Darshan opens"), a("5:30 am", "Mangla aarti"), a("8:00 am", "Makhan bhog"), a("12:00 noon", "Morning darshan closes"), a("4:00 pm", "Evening darshan opens"), a("6:00 pm", "Sandhya aarti"), a("9:30 pm", "Darshan closes")],
    winter: [a("5:30 am", "Darshan opens · mangla aarti"), a("8:00 am", "Makhan bhog"), a("12:00 noon", "Morning darshan closes"), a("3:00 pm", "Evening darshan opens"), a("6:00 pm", "Sandhya aarti"), a("8:30 pm", "Darshan closes")],
  },
  {
    id: "aarti-dwarkadhish",
    rowId: "dwarkadhish",
    name: "Dwarkadhish Temple",
    hindi: "द्वारकाधीश मंदिर",
    place: "Mathura",
    summer: [...dwarkadhishMorning, a("4:00 – 4:20 pm", "Utthapan"), a("4:45 – 5:05 pm", "Bhog"), a("5:20 – 5:40 pm", "Aarti"), a("6:30 – 7:00 pm", "Shayan")],
    winter: [...dwarkadhishMorning, a("3:30 – 3:50 pm", "Utthapan"), a("4:45 – 5:05 pm", "Bhog"), a("6:00 pm", "Aarti")],
    note: "Worship follows the Pushti Marg tradition: the doors open only for these short jhankis. No winter Shayan time is published.",
  },
  {
    id: "aarti-vishram-ghat",
    rowId: "vishram-ghat",
    name: "Vishram Ghat Yamuna Aarti",
    hindi: "विश्राम घाट",
    place: "Mathura",
    summer: [a("7:00 – 7:15 am", "Morning Yamuna aarti"), a("6:45 – 7:00 pm", "Evening Yamuna aarti")],
    winter: [a("6:45 – 7:00 am", "Morning Yamuna aarti"), a("6:45 – 7:00 pm", "Evening Yamuna aarti")],
    note: "Reach 20–30 minutes early for a place on the steps, or watch from a boat.",
    confirm: "Sources disagree, and the evening aarti generally follows sunset.",
  },
];

/* ------------------------------------------------------------------ */
/* The temple day                                                      */
/* ------------------------------------------------------------------ */

/** The aarti names used in the timetables. Time ranges are drawn from the timings above. */
export const templeDay: { name: string; hindi: string; time: string; text: string }[] = [
  { name: "Mangla", hindi: "मंगला", time: "4:00 – 6:30 am", text: "The first aarti, as Thakur ji is woken before dawn." },
  { name: "Shringar", hindi: "श्रृंगार", time: "7:00 – 9:00 am", text: "The deity is bathed and dressed; morning darshan is in full swing." },
  { name: "Rajbhog", hindi: "राजभोग", time: "10:00 am – 1:45 pm", text: "The midday meal offering. Doors close soon after for rest." },
  { name: "Utthapan", hindi: "उत्थापन", time: "3:00 – 6:30 pm", text: "Thakur ji rises from rest and evening darshan begins." },
  { name: "Sandhya", hindi: "संध्या", time: "6:00 – 7:00 pm", text: "The dusk aarti with lamps, often the most atmospheric." },
  { name: "Shayan", hindi: "शयन", time: "6:30 – 9:30 pm", text: "The last aarti before the deity is put to rest for the night." },
];

/* ------------------------------------------------------------------ */
/* Festivals, tips and FAQs                                            */
/* ------------------------------------------------------------------ */

export const festivalChanges: { name: string; text: string; href?: string }[] = [
  { name: "Janmashtami", text: "Banke Bihari holds its once-a-year mangla aarti, and Krishna Janmabhoomi celebrates the midnight abhishek. Expect very long queues and road closures.", href: "/festivals/janmashtami" },
  { name: "Holi season", text: "From Barsana’s Lathmar Holi to Phoolon wali Holi at Banke Bihari, regular hours give way to festival schedules and very large crowds.", href: "/festivals/lathmar-holi" },
  { name: "Radhashtami", text: "Barsana fills to capacity for Shri Radha’s appearance day, and Vrindavan’s Radha temples hold special darshan.", href: "/festivals/radhashtami" },
  { name: "Akshaya Tritiya", text: "The only day of the year when Banke Bihari ji’s charan (feet) darshan is offered, and one of the busiest days at the temple." },
  { name: "Hariyali Teej & Jhulan", text: "In the monsoon month of Shravan, deities are placed on decorated swings and many temples adjust their evening darshan." },
  { name: "Diwali & Govardhan Puja", text: "Annakut offerings and Govardhan parikrama crowds change the day’s rhythm. Many temples also switch to winter hours around this time.", href: "/festivals/govardhan-puja" },
];

export const visitTips: { title: string; text: string }[] = [
  { title: "Go early, on a weekday", text: "Weekends, Ekadashi, Purnima and festival days are the busiest. The first hour after opening on a weekday is calmest." },
  { title: "Carry little to Janmabhoomi", text: "Phones, cameras, bags and many electronic items are not allowed inside. Leave them in the car or use the lockers." },
  { title: "Dress modestly", text: "Covered, comfortable Indian or modest clothing is expected at every temple. Some temples restrict leather items." },
  { title: "Plan for footwear", text: "Shoes come off outside each temple. Use the counters (some charge a small fee) and wear slip-ons on temple days." },
  { title: "Ask before photographing", text: "Photography is usually not allowed inside the sanctum. Prem Mandir’s gardens are one of the few places where it is generally fine." },
  { title: "Pace the day for seniors", text: "Barsana has a long flight of steps, and the old-town lanes are crowded. Build in the midday closure as rest time." },
];

export const timingFaqs: Faq[] = [
  {
    q: "What are the Banke Bihari temple timings?",
    a: "Under the temple committee’s revised schedule from September 2025, summer darshan runs from about 7:00 am to 12:30 pm and 4:15 pm to 9:30 pm. Winter darshan runs from about 8:00 am to 1:45 pm and 4:00 pm to 9:15 pm. Older lists still show shorter hours, so confirm on the day.",
  },
  {
    q: "Are Vrindavan and Mathura temples closed in the afternoon?",
    a: "Yes, most of them. Temples close after the Rajbhog aarti, usually between 12:00 noon and 1:45 pm, and reopen between about 3:00 pm and 5:30 pm. Use this break for lunch and rest. Daan Ghati in Govardhan is one of the few listed as open through the day.",
  },
  {
    q: "What time is the Prem Mandir light and fountain show?",
    a: "The musical fountain show usually runs from 7:30 to 8:00 pm in summer and 7:00 to 7:30 pm in winter. The temple lights come on after sunset, and doors close at about 8:30 pm.",
  },
  {
    q: "When is mangla aarti at ISKCON Vrindavan?",
    a: "Mangla aarti at the Krishna-Balaram Mandir is at about 4:30 am, though one published list gives 5:00 am. The morning programme continues with Guru puja and Shringar aarti.",
  },
  {
    q: "What are the Krishna Janmabhoomi timings?",
    a: "In summer it is open about 5:00 am to 12:00 noon and 4:00 pm to 9:30 pm. In winter it is open about 5:30 am to 12:00 noon and 3:00 pm to 8:30 pm. Phones, cameras and bags are not allowed inside.",
  },
  {
    q: "When do temples switch between summer and winter timings?",
    a: "Roughly around Holi (to summer hours) and around Diwali (to winter hours). Each temple switches on its own date, so the first weeks after these festivals are when published timings are most likely to be out of date.",
  },
  {
    q: "Which temples can I cover in one day in Vrindavan?",
    a: "A comfortable day is Banke Bihari, Radha Raman, Radha Vallabh and Nidhivan in the morning. Rest over the afternoon closure, then visit ISKCON in the late afternoon and Prem Mandir for the evening lights.",
  },
  {
    q: "Is there an entry fee for these temples?",
    a: "Darshan at the temples on this page is free. You may pay small amounts for shoe stands, lockers, boat rides or guides, so agree any fee upfront.",
  },
];

/* ------------------------------------------------------------------ */
/* Formatting                                                          */
/* ------------------------------------------------------------------ */

/** "07:00" → "7:00 am", "12:00" → "12:00 noon", "16:15" → "4:15 pm". */
export function formatTime(hhmm: string): string {
  const [h, m] = hhmm.split(":").map(Number);
  if (h === 12 && m === 0) return "12:00 noon";
  const suffix = h >= 12 ? "pm" : "am";
  const hour = h % 12 === 0 ? 12 : h % 12;
  return `${hour}:${String(m).padStart(2, "0")} ${suffix}`;
}

export function formatWindow(win: Window): string {
  return `${formatTime(win.from)} – ${formatTime(win.to)}`;
}
