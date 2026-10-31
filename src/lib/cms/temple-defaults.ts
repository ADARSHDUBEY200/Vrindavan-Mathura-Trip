import { BRAND_NAME, FOUNDED, FOUNDER, RATING } from "@/config/site";
import { aartiSchedules, formatWindow, timingRows, type Hours, type TimingRow } from "@/content/temple-timings";
import { temples, type Temple } from "@/content/temples";
import { templesPage, type TempleEntry } from "@/content/temples-page";
import { plainText } from "@/lib/rich-text";
import { EMPTY_DETAILS, TEMPLE_BLOCKS, templePath, type AartiRow, type DarshanRow, type RouteRow, type TempleDetails } from "./temple-fields";

/*
 * The site's existing temple guides, written as Temple table rows. There is one mapping, used twice:
 * by scripts/generate-temple-seed.ts to fill the table (supabase-temples.sql), and by lib/cms/temples.ts
 * when the table is empty or unreachable, so /temples and every /temples/* link keep working.
 * Facts come from content/temples.ts, content/temple-timings.ts and the PDF copy in content/temples-page.ts.
 */

export type TempleRow = {
  title: string;
  location: string;
  slug: string;
  meta: { title: string; description: string };
  schema: { title: string; description: string };
  image: string;
  alt: string;
  subcontent: string;
  content: string;
  history: string;
  timing: string;
  bestvisit: string;
  journey: string;
  templeoverview: string;
  quickanswer: string;
  ataglance: { id: string; label: string; value: string }[];
  whybook: { heading: string; intro: string; rows: { id: string; reason: string; detail: string }[]; outro: string };
  faqs: { id: string; question: string; answer: string }[];
  details: TempleDetails;
  status: "published";
};

/** Fully covered in the PDF and in the timetable, but with no guide page until now. No site photo exists for either yet. */
const PDF_ONLY_TEMPLES: Temple[] = [
  {
    slug: "gita-mandir",
    name: "Gita Mandir (Birla Mandir)",
    town: "Mathura",
    image: "vishram-ghat",
    summary: "A calm red sandstone temple on the Mathura–Vrindavan road, with the Bhagavad Gita inscribed on its pillars.",
    timingNote: "Morning to midday, afternoon to evening",
    history: [],
    timings: [],
    dressCode: "Modest clothing that covers shoulders and knees; shoes off outside.",
    tips: [],
    nearby: ["krishna-janmabhoomi", "dwarkadhish"],
    mapQuery: "Gita Mandir Birla Mandir Mathura",
  },
  {
    slug: "bhuteshwar-mahadev",
    name: "Bhuteshwar Mahadev",
    town: "Mathura",
    image: "vishram-ghat",
    summary: "One of Mathura's most ancient Shiva shrines, where Shiva is honoured as the guardian of Krishna's land.",
    timingNote: "Early morning until night, generally",
    history: [],
    timings: [],
    dressCode: "Modest clothing that covers shoulders and knees; shoes off outside.",
    tips: [],
    nearby: ["krishna-janmabhoomi", "vishram-ghat"],
    mapQuery: "Bhuteshwar Mahadev Temple Mathura",
  },
];

const NO_PHOTO = new Set(PDF_ONLY_TEMPLES.map((t) => t.slug));

/** From content/images.ts. Copied because the seed script runs outside the bundler and cannot import .jpg files. */
const PHOTO_ALT: Record<string, string> = {
  "banke-bihari": "Ornate facade of Shri Banke Bihari Temple rising above the lanes of Vrindavan",
  "prem-mandir-night": "Prem Mandir in Vrindavan illuminated in blue and white lights at night",
  iskcon: "Decorated altar of Radha Krishna deities at ISKCON Vrindavan",
  nidhivan: "Twisted tulsi trees inside the sacred grove of Nidhivan, Vrindavan",
  "seva-kunj": "Shady trees in the sacred garden of Seva Kunj, Vrindavan",
  "radha-raman": "Silver altar and checkered marble floor inside Radha Raman Temple, Vrindavan",
  "radha-vallabh": "Devotees seated before the decorated altar at Radha Vallabh Temple, Vrindavan",
  "govind-dev": "Red sandstone facade of the 16th-century Govind Dev Ji Temple in Vrindavan",
  "madan-mohan": "Red sandstone spire of Madan Mohan Temple on a hillock in Vrindavan",
  rangji: "Tall white gopuram gateway of Shri Rangji Temple in Vrindavan",
  janmabhoomi: "Pink sandstone temple at the Shri Krishna Janmabhoomi complex in Mathura",
  dwarkadhish: "Painted courtyard and carved balconies of Dwarkadhish Temple, Mathura",
  "vishram-ghat": "Boats and lit temples along Vishram Ghat on the Yamuna in Mathura at dusk",
  "radha-rani-barsana": "Devotees in the courtyard of Shri Radha Rani Temple, Barsana",
  "nandgaon-holi": "Crowds celebrating Holi with bright colours in Nandgaon",
  "daan-ghati": "Temple pavilion with a sculpted Govardhan hill at Daan Ghati, Govardhan",
  "mansi-ganga": "Mansi Ganga lake in Govardhan with temples along its far bank",
  gokul: "A small temple gateway in the village of Gokul near Mathura",
  dauji: "Devotional image of Dauji and Revati Maiya at the Baldeo temple",
};

const CATEGORY: Record<string, string> = {
  "banke-bihari": "Radha Krishna Temple",
  "prem-mandir": "Modern Temple",
  "iskcon-krishna-balaram": "Modern Temple",
  nidhivan: "Sacred Grove",
  "seva-kunj": "Sacred Grove",
  "radha-raman": "Goswami Temple",
  "radha-vallabh": "Radha Krishna Temple",
  "govind-dev-ji": "Goswami Temple",
  "madan-mohan": "Goswami Temple",
  rangji: "Vishnu Temple",
  "krishna-janmabhoomi": "Radha Krishna Temple",
  dwarkadhish: "Radha Krishna Temple",
  "vishram-ghat": "Ghat & Kund",
  "radha-rani-temple-barsana": "Radha Krishna Temple",
  "nand-bhawan-nandgaon": "Radha Krishna Temple",
  "daan-ghati-govardhan": "Sacred Hill",
  "mukharvind-govardhan": "Sacred Hill",
  gokul: "Pilgrimage Town",
  "dauji-baldeo": "Radha Krishna Temple",
  "gita-mandir": "Modern Temple",
  "bhuteshwar-mahadev": "Shiva Temple",
};

/** Timetable rows that do not carry a guide slug. */
const TIMING_ROW_ID: Record<string, string> = { "gita-mandir": "birla-mandir" };

const FEATURED = new Set(["banke-bihari", "prem-mandir", "krishna-janmabhoomi", "radha-rani-temple-barsana"]);

const faq = (question: string) => templesPage.faqs.find((f) => f.q === question);

/** The PDF's questions that belong on one temple's page. */
const TEMPLE_FAQS: Record<string, string[]> = {
  "banke-bihari": ["What are the Banke Bihari Temple timings?", "Which temple should I visit first in Vrindavan?", "Are phones allowed inside Mathura Vrindavan temples?"],
  "prem-mandir": ["What are the Prem Mandir timings?", "Are phones allowed inside Mathura Vrindavan temples?"],
  nidhivan: ["Why is Nidhivan closed at night?"],
  "radha-raman": ["What are the seven Goswami temples of Vrindavan?"],
  "govind-dev-ji": ["What are the seven Goswami temples of Vrindavan?"],
  "madan-mohan": ["What are the seven Goswami temples of Vrindavan?"],
  "krishna-janmabhoomi": ["Which temple should I visit first in Mathura?", "Are phones allowed inside Mathura Vrindavan temples?"],
  "vishram-ghat": ["Which temple should I visit first in Mathura?"],
  "daan-ghati-govardhan": ["Is the Govardhan Parikrama difficult?"],
  "mukharvind-govardhan": ["Is the Govardhan Parikrama difficult?"],
};

const SHARED_FAQS = ["What is the dress code for Braj temples?", "Is there an entry fee for temples in Mathura and Vrindavan?"];

const ROUTES: Record<string, Omit<RouteRow, "id">[]> = {
  Vrindavan: [
    { from: "Mathura", distance: "Roughly 11 to 15 km", how: "30 to 45 minutes by road, longer on festival days. A private car is the most comfortable choice." },
    { from: "Delhi", distance: "Roughly 160 to 180 km", how: "About 3 to 3.5 hours on the Yamuna Expressway in normal traffic, or a train to Mathura Junction and a 25 to 30 minute drive." },
    { from: "Agra", distance: "About 55 to 60 km to Mathura", how: "Around 1 to 1.5 hours to Mathura by road, then on to Vrindavan." },
    { from: "Within Vrindavan", distance: "Short hops", how: "Cars cannot enter the narrow old-town lanes, so walk or take an e-rickshaw for the last stretch. Agree the fare before you sit." },
  ],
  Mathura: [
    { from: "Vrindavan", distance: "Roughly 11 to 15 km", how: "30 to 45 minutes by road, longer on festival days." },
    { from: "Delhi", distance: "Roughly 160 to 180 km", how: "Frequent express trains reach Mathura Junction (MTJ) in about 2 to 3 hours, or drive the Yamuna Expressway in about 3 to 3.5 hours." },
    { from: "Agra", distance: "About 55 to 60 km", how: "Around 1 to 1.5 hours by road. Trains from Agra Cantt are frequent and quick." },
  ],
  Govardhan: [
    { from: "Mathura", distance: "About 25 km", how: "By road. A private car makes it easy to combine with Barsana." },
    { from: "Barsana", distance: "About 25 km", how: "By road." },
  ],
  Barsana: [
    { from: "Govardhan", distance: "About 25 km", how: "By road. A private car is the most comfortable way to travel between the towns of Braj." },
    { from: "Nandgaon", distance: "About 8 km", how: "A short drive. Most pilgrims see both on the same day." },
  ],
  Nandgaon: [{ from: "Barsana", distance: "About 8 km", how: "A short drive. Most pilgrims see both on the same day." }],
  Gokul: [{ from: "Vrindavan", distance: "About 20 km", how: "By road, usually combined with Mathura or Baldeo." }],
  Baldeo: [{ from: "Mathura", distance: "South-east of Mathura", how: "By road, usually combined with Gokul for a half-day circuit." }],
};

const whyBook: TempleRow["whybook"] = {
  heading: `Why book with ${BRAND_NAME}`,
  intro: `Since ${FOUNDED}, ${FOUNDER.name} and a team of local Brijwasis have guided pilgrims through these lanes, with a ${RATING}-star rating from our guests.`,
  rows: [
    { id: "w1", reason: "Local Brijwasi guides", detail: "A team born and raised in Braj, who know the right lane at the right hour." },
    { id: "w2", reason: "Darshan planned around timings", detail: "We reconfirm temple timings the day before and plan around crowd patterns." },
    { id: "w3", reason: "Clear written quotes", detail: "Customised packages with no hidden charges." },
    { id: "w4", reason: "Gentle on seniors and families", detail: "Gentler routes, rest breaks and e-rickshaw or wheelchair help." },
    { id: "w5", reason: "Stays arranged for you", detail: "Simple ashram stays or comfortable hotels near the major temples." },
  ],
  outro: "Tell us your dates and who is travelling, and we will reply with a plan that suits you.",
};

const escapeHtml = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

/** `**bold**`, `*italic*` and `[label](/href)` as HTML, for fields the editor edits as rich text. */
function markdownHtml(text: string): string {
  return escapeHtml(text)
    .replace(/\*\*([^*]+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*([^*\s][^*]*?)\*/g, "<em>$1</em>")
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');
}

const paragraph = (text: string) => `<p>${markdownHtml(text)}</p>`;

function entryOf(slug: string): TempleEntry | undefined {
  return templesPage.chapters.flatMap((c) => c.entries).find((e) => e.link === templePath(slug));
}

function timingRow(slug: string): TimingRow | undefined {
  const id = TIMING_ROW_ID[slug];
  return timingRows.find((r) => r.templeSlug === slug || r.id === id);
}

function hoursRows(hours: Hours, season: string): Omit<DarshanRow, "id">[] {
  const row = (session: string, win: Parameters<typeof formatWindow>[0], note = "") => ({ season, session, time: formatWindow(win), note });
  return [hours.allDay && row("Open", hours.allDay, hours.note), hours.morning && row("Morning", hours.morning), hours.evening && row("Evening", hours.evening, hours.allDay ? "" : hours.note)].filter(
    (r): r is Omit<DarshanRow, "id"> => Boolean(r),
  );
}

function darshanRows(t: Temple, row?: TimingRow): Omit<DarshanRow, "id">[] {
  if (row) return row.winter ? [...hoursRows(row.summer, "Summer"), ...hoursRows(row.winter, "Winter")] : hoursRows(row.summer, "");
  return t.timings.flatMap((s) => s.windows.map((w) => ({ season: s.season, session: w.label, time: w.time, note: "" })));
}

function aartiRows(row?: TimingRow): Omit<AartiRow, "id">[] {
  const schedule = row && aartiSchedules.find((a) => a.rowId === row.id);
  if (!schedule) return [];
  const list = (items: typeof schedule.summer, season: string) => items.map((a) => ({ season, name: a.name, time: a.time }));
  return schedule.winter ? [...list(schedule.summer, "Summer"), ...list(schedule.winter, "Winter")] : list(schedule.summer, "");
}

function timingNotes(row?: TimingRow): string {
  const schedule = row && aartiSchedules.find((a) => a.rowId === row.id);
  const notes = [row?.note, row?.confirm, schedule?.note].filter((n, i, all): n is string => Boolean(n) && all.indexOf(n) === i);
  return notes.map((n) => `<p>${escapeHtml(n)}</p>`).join("");
}

const ids = <T extends object>(prefix: string, rows: T[]) => rows.map((r, i) => ({ id: `${prefix}${i + 1}`, ...r }));

function description(summary: string): string {
  const text = `${summary} Darshan timings, how to reach and local tips.`;
  return text.length <= 160 ? text : summary.slice(0, 160);
}

function toRow(t: Temple, index: number): TempleRow {
  const entry = entryOf(t.slug);
  const row = timingRow(t.slug);
  const darshan = darshanRows(t, row);
  const firstSeason = darshan.filter((d) => d.season === darshan[0]?.season);
  const hours = firstSeason.map((d) => `${d.session.toLowerCase()} ${d.time}`).join(", ");
  const answer = `${t.name} is in ${row?.place ?? t.town}. ${t.summary}${hours ? ` Usual darshan hours${firstSeason[0].season ? ` in ${firstSeason[0].season.toLowerCase()}` : ""}: ${hours}.` : ""}`;
  const overview = (entry?.points ?? []).map((p) => paragraph(p.label && p.label !== "History" ? `**${p.label}.** ${p.text}` : p.text)).join("");
  const faqs = [...(TEMPLE_FAQS[t.slug] ?? []), ...SHARED_FAQS].map(faq).filter((f): f is NonNullable<typeof f> => Boolean(f));
  const noPhoto = NO_PHOTO.has(t.slug);

  return {
    title: t.name,
    location: t.town,
    slug: t.slug,
    meta: { title: `${t.name}, ${t.town}: Timings & Guide`.slice(0, 60), description: description(t.summary) },
    schema: { title: t.name, description: t.summary },
    image: noPhoto ? "" : `photo:${t.image}`,
    alt: noPhoto ? "" : (PHOTO_ALT[t.image] ?? t.name),
    subcontent: t.summary,
    content: "",
    history: t.history.join("\n\n"),
    timing: timingNotes(row),
    bestvisit: "",
    journey: "",
    templeoverview: overview,
    quickanswer: `<p>${escapeHtml(answer)}</p>`,
    ataglance: ids("g", [
      ...(row?.hindi ? [{ label: "Name in Hindi", value: row.hindi }] : []),
      { label: "Location", value: row?.place ?? `${t.town}, Uttar Pradesh` },
      { label: "Type", value: CATEGORY[t.slug] ?? "Temple" },
      { label: "Darshan", value: t.timingNote },
      { label: "Dress code", value: t.dressCode },
    ]),
    whybook: whyBook,
    faqs: faqs.map((f, i) => ({ id: `q${i + 1}`, question: f.q, answer: plainText(f.a) })),
    details: {
      ...EMPTY_DETAILS,
      category: CATEGORY[t.slug] ?? "",
      featured: FEATURED.has(t.slug),
      sortOrder: String(index + 1),
      timingNote: t.timingNote,
      darshan: ids("d", darshan),
      aarti: ids("a", aartiRows(row)),
      visiting: ids("v", [{ label: "Dress code", value: t.dressCode }]),
      tips: ids("t", [...(entry?.tip ? [{ text: plainText(entry.tip) }] : []), ...t.tips.map((text) => ({ text }))]),
      goodToKnow: t.goodToKnow ?? "",
      address: { ...EMPTY_DETAILS.address, locality: row?.place ?? t.town, city: t.town },
      mapQuery: t.mapQuery,
      routes: ids("r", ROUTES[t.town] ?? []),
      related: ids("l", t.nearby.map((slug) => ({ slug }))),
      order: Object.keys(TEMPLE_BLOCKS),
    },
    status: "published",
  };
}

/** Every built-in temple, as rows. */
export function defaultTempleRows(): TempleRow[] {
  return [...temples, ...PDF_ONLY_TEMPLES].map(toRow);
}
