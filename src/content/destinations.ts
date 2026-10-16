import type { PhotoKey } from "./images";
import type { Faq } from "./types";

export type Destination = {
  slug: "vrindavan" | "mathura" | "govardhan-barsana" | "braj-yatra";
  name: string;
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  title: string;
  intro: string;
  image: PhotoKey;
  /** Short facts shown beside the hero. */
  facts: { label: string; value: string }[];
  overview: string[];
  templeSlugs: string[];
  experiences: { title: string; text: string; image: PhotoKey }[];
  bestTime: { summary: string; seasons: { label: string; months: string; note: string }[] };
  howToReach: { mode: string; text: string }[];
  packageSlugs: string[];
  faqs: Faq[];
};

const standardSeasons = [
  { label: "Winter", months: "October – March", note: "Pleasant days, cool mornings and evenings. Kartik, Diwali and Holi fall in this window — the most popular time to visit." },
  { label: "Summer", months: "April – June", note: "Very hot afternoons (often above 40°C). Plan darshan early and late; summer brings Phool Bangla decorations." },
  { label: "Monsoon", months: "July – September", note: "Humid with intermittent rain, but green and festive — Jhulan Yatra, Janmashtami and Radhashtami." },
];

export const destinations: Destination[] = [
  {
    slug: "vrindavan",
    name: "Vrindavan",
    metaTitle: "Vrindavan Tour & Temple Guide",
    metaDescription:
      "Plan a Vrindavan trip: Banke Bihari, Prem Mandir, ISKCON, Nidhivan and the Yamuna ghats, with darshan timings, the best time to visit, how to reach and private tour packages.",
    eyebrow: "Destination · Vrindavan",
    title: "Vrindavan — the forest of Radha Krishna’s leela",
    intro:
      "Narrow lanes alive with ‘Radhe Radhe’, more than five thousand temples by local count, and a river that remembers every pastime. Vrindavan is where most pilgrims feel Braj most deeply.",
    image: "prem-mandir",
    facts: [
      { label: "From Mathura", value: "≈ 12–15 km" },
      { label: "From Delhi", value: "≈ 3–4 hrs by road" },
      { label: "Ideal stay", value: "1–2 days" },
    ],
    overview: [
      "Vrindavan was once a forest of tulsi where the young Krishna herded cows and danced the raas with the gopis. In the 16th century, saints of the Bhakti movement — the Goswamis of Vrindavan, Swami Haridas, Hit Harivansh — rediscovered its sacred places, and the town grew into the great pilgrimage centre it is today.",
      "A visit here is less about sightseeing than about mood: darshan at Banke Bihari, kirtan at ISKCON, a quiet hour at Nidhivan or Seva Kunj, and the evening on the Yamuna at Keshi Ghat. We plan days around darshan windows, so you spend your time in temples rather than queues and traffic.",
    ],
    templeSlugs: ["banke-bihari", "prem-mandir", "iskcon-krishna-balaram", "nidhivan", "seva-kunj", "radha-raman", "radha-vallabh", "govind-dev-ji", "madan-mohan", "rangji"],
    experiences: [
      { title: "Banke Bihari darshan", text: "Feel the famous curtain-darshan in the heart of the old town.", image: "banke-bihari" },
      { title: "Prem Mandir lights", text: "Watch the marble temple glow as the evening show begins.", image: "prem-mandir-night" },
      { title: "Boat ride at Keshi Ghat", text: "Drift on the Yamuna at dusk past centuries-old ghats.", image: "keshi-ghat" },
      { title: "Kirtan at ISKCON", text: "Join the courtyard kirtan at Krishna-Balaram Mandir.", image: "iskcon" },
    ],
    bestTime: {
      summary: "October to March is the most comfortable time. Holi week (February–March) and Kartik (October–November) are the most atmospheric — and the busiest.",
      seasons: standardSeasons,
    },
    howToReach: [
      { mode: "By road", text: "From Delhi, the Yamuna Expressway brings you to the Vrindavan exit in about 3–3.5 hours in normal traffic. From Agra it is roughly 1.5 hours." },
      { mode: "By train", text: "Mathura Junction is the main railhead, with frequent trains from Delhi. Vrindavan is a 25–30 minute drive from the station." },
      { mode: "By air", text: "Delhi’s IGI airport is the usual gateway (about 4 hours by road). Agra airport has a few domestic flights, and Noida International Airport at Jewar sits off the Yamuna Expressway — check whether your airline operates there." },
      { mode: "Getting around", text: "The old town is best on foot or by e-rickshaw; cars cannot enter the Banke Bihari lanes. A private car is ideal between areas like Prem Mandir, ISKCON and the ghats." },
    ],
    packageSlugs: ["vrindavan-one-day-darshan", "mathura-vrindavan-2-days", "agra-mathura-vrindavan-3-days"],
    faqs: [
      { q: "How many days do I need in Vrindavan?", a: "One full day covers the main temples; two days let you see them at an unhurried pace, add the early ISKCON aarti and spend an evening at the ghats." },
      { q: "Can cars go to Banke Bihari temple?", a: "No. Cars stop at the edge of the old town and you walk or take an e-rickshaw through the lanes. We drop you as close as is permitted." },
      { q: "Is Vrindavan suitable for senior citizens?", a: "Yes, with the right pacing. Avoid festival days at Banke Bihari, plan rest in the afternoon, and use e-rickshaws for the lanes." },
    ],
  },
  {
    slug: "mathura",
    name: "Mathura",
    metaTitle: "Mathura Tour & Temple Guide",
    metaDescription:
      "Plan a Mathura trip: Shri Krishna Janmabhoomi, Dwarkadhish, Vishram Ghat Yamuna aarti and Gokul — with timings, travel tips and private Mathura Vrindavan tour packages.",
    eyebrow: "Destination · Mathura",
    title: "Mathura — the birthplace of Shri Krishna",
    intro:
      "One of the seven sacred cities of India, Mathura is where Krishna was born in Kamsa’s prison. Today it is a lively riverside town of ghats, havelis and temples, and the gateway to all of Braj.",
    image: "vishram-ghat",
    facts: [
      { label: "From Delhi", value: "≈ 180 km" },
      { label: "From Agra", value: "≈ 1–1.5 hrs" },
      { label: "Ideal stay", value: "½ – 1 day" },
    ],
    overview: [
      "Mathura’s history reaches back thousands of years — it was a great city of the Shurasena kingdom and later a major centre of art under the Kushans. For pilgrims, though, it is above all Krishna’s birthplace, and the starting point of the Braj parikrama at Vishram Ghat.",
      "Most visitors combine Mathura with Vrindavan. We usually plan Mathura for an afternoon and evening — Janmabhoomi, Dwarkadhish’s short darshan windows, and the Yamuna aarti — or as a base for Gokul and Baldeo across the river.",
    ],
    templeSlugs: ["krishna-janmabhoomi", "dwarkadhish", "vishram-ghat", "gokul", "dauji-baldeo"],
    experiences: [
      { title: "Yamuna aarti at Vishram Ghat", text: "Lamps, conches and floating diyas at sunset.", image: "vishram-ghat" },
      { title: "Krishna Janmabhoomi", text: "Pay respects at the sacred birthplace.", image: "janmabhoomi" },
      { title: "Dwarkadhish darshan", text: "A grand haveli temple in the old city.", image: "dwarkadhish" },
      { title: "Gokul & Baldeo", text: "Krishna’s childhood village and Dauji’s temple.", image: "gokul" },
    ],
    bestTime: {
      summary: "October to March for comfortable weather; Janmashtami (August–September) for the great celebration, if you can handle the crowds.",
      seasons: standardSeasons,
    },
    howToReach: [
      { mode: "By road", text: "Mathura sits just off the Yamuna Expressway and NH-19, about 3 hours from Delhi and 1–1.5 hours from Agra." },
      { mode: "By train", text: "Mathura Junction (MTJ) is on the main Delhi–Agra line, with frequent express trains from New Delhi and Hazrat Nizamuddin, typically 2–3 hours." },
      { mode: "By air", text: "Delhi IGI airport is the main gateway; Agra and the new Noida International Airport at Jewar are closer if your airline flies there." },
    ],
    packageSlugs: ["mathura-vrindavan-2-days", "agra-mathura-vrindavan-3-days", "braj-84-kos-yatra"],
    faqs: [
      { q: "What can I not carry into Krishna Janmabhoomi?", a: "Phones, cameras, bags, belts and most electronic items are not allowed. Lockers are available, or you can leave things in our car." },
      { q: "Should I stay in Mathura or Vrindavan?", a: "Most pilgrims prefer Vrindavan for its atmosphere; Mathura is handy for early trains and for Gokul and Baldeo. See our guide on where to stay." },
    ],
  },
  {
    slug: "govardhan-barsana",
    name: "Govardhan & Barsana",
    metaTitle: "Govardhan, Barsana & Nandgaon Guide",
    metaDescription:
      "Plan Govardhan Parikrama, Radha Kund, Barsana’s Radha Rani temple and Nandgaon — with timings, Lathmar Holi tips and same-day private tours from Mathura and Vrindavan.",
    eyebrow: "Destination · Govardhan, Barsana & Nandgaon",
    title: "Govardhan, Barsana & Nandgaon — the heart of Radha Krishna’s Braj",
    intro:
      "West of Vrindavan the land opens into the hills and kunds of Krishna’s childhood: Giriraj ji at Govardhan, Radha Kund, and the hilltop homes of Radha in Barsana and Nanda Baba in Nandgaon.",
    image: "radha-rani-barsana",
    facts: [
      { label: "Mathura → Govardhan", value: "≈ 25 km" },
      { label: "Govardhan → Barsana", value: "≈ 25 km" },
      { label: "Barsana → Nandgaon", value: "≈ 8 km" },
    ],
    overview: [
      "Govardhan hill is worshipped as Krishna himself — the hill he lifted on his little finger to protect the people of Braj from Indra’s storm. Pilgrims walk the 21 km parikrama around it, many barefoot, stopping at Mansi Ganga, Kusum Sarovar, and the twin lakes of Radha Kund and Shyam Kund.",
      "Barsana, home of Shri Radha, and Nandgaon, where Krishna grew up, face each other across the plain. They are best known for Lathmar Holi each spring, but on any ordinary day their hilltop temples are peaceful and full of devotion.",
    ],
    templeSlugs: ["daan-ghati-govardhan", "mukharvind-govardhan", "radha-rani-temple-barsana", "nand-bhawan-nandgaon"],
    experiences: [
      { title: "Govardhan Parikrama", text: "Walk or ride the 21 km path around Giriraj ji.", image: "govardhan-dham" },
      { title: "Kusum Sarovar", text: "Sandstone chhatris reflected in a sacred lake.", image: "kusum-sarovar" },
      { title: "Radha Rani Temple", text: "Climb Bhanugarh hill to Shri Radha’s palace-temple.", image: "radha-rani-barsana" },
      { title: "Lathmar Holi", text: "The legendary Holi of Barsana and Nandgaon.", image: "lathmar-holi" },
    ],
    bestTime: {
      summary: "October to March. Avoid walking the parikrama in summer afternoons. Purnima, Guru Purnima, Radhashtami and Holi week are spectacular but very crowded.",
      seasons: standardSeasons,
    },
    howToReach: [
      { mode: "By road", text: "Govardhan is about 40 minutes from Mathura and an hour from Vrindavan. Barsana and Nandgaon are a further 40 minutes. A private car is by far the easiest way to see all three in a day." },
      { mode: "By train", text: "Travel to Mathura Junction, then continue by road." },
    ],
    packageSlugs: ["govardhan-barsana-same-day", "braj-84-kos-yatra", "mathura-vrindavan-2-days"],
    faqs: [
      { q: "How long does the Govardhan Parikrama take?", a: "On foot, the full 21 km takes most people 5–7 hours. By car or e-rickshaw, with stops, allow 2–3 hours." },
      { q: "How many steps are there at Barsana?", a: "There is a long flight of stone steps up Bhanugarh hill. A ropeway has operated in recent years; we check whether it is running before your visit." },
    ],
  },
  {
    slug: "braj-yatra",
    name: "Full Braj Yatra",
    metaTitle: "Braj 84 Kos Yatra & Full Braj Tour",
    metaDescription:
      "Plan a complete Braj yatra across Mathura, Vrindavan, Gokul, Baldeo, Govardhan, Barsana, Nandgaon and the sacred forests of the 84 Kos parikrama — by private car, at your pace.",
    eyebrow: "Destination · Braj Mandal",
    title: "The full Braj Yatra — 84 Kos of Krishna’s leela",
    intro:
      "Braj Mandal spreads across roughly 84 kos of villages, forests and lakes, each tied to a story from Krishna’s life. A full yatra brings them together: Gokul and Baldeo, the twelve forests, and the hills of Govardhan and Barsana.",
    image: "kusum-sarovar",
    facts: [
      { label: "Circuit", value: "≈ 84 kos (250+ km)" },
      { label: "By road", value: "4–7 days" },
      { label: "On foot", value: "Several weeks" },
    ],
    overview: [
      "The 84 Kos Braj parikrama is traditionally walked over several weeks, often in the monsoon and Kartik seasons, by organised groups of pilgrims. It passes through twelve sacred forests (vans) and countless kunds, villages and shrines.",
      "Most travellers today visit the key sites by road over four to seven days. Our road-based yatra links Mathura, Gokul, Mahavan and Baldeo, Vrindavan, Govardhan and Radha Kund, Barsana, Nandgaon and Kamyavan — with time for darshan, rest, and the stories of each place.",
    ],
    templeSlugs: ["gokul", "dauji-baldeo", "daan-ghati-govardhan", "radha-rani-temple-barsana", "nand-bhawan-nandgaon", "vishram-ghat"],
    experiences: [
      { title: "Gokul & Raman Reti", text: "The sandy groves of Krishna’s childhood.", image: "gokul" },
      { title: "Dauji, Baldeo", text: "The temple of Balarama, Krishna’s elder brother.", image: "dauji" },
      { title: "Mansi Ganga", text: "Evening lamps on Govardhan’s sacred lake.", image: "mansi-ganga" },
      { title: "Barsana’s heights", text: "Views over Braj from Shri Radha’s hill.", image: "barsana-view" },
    ],
    bestTime: {
      summary: "October to March is ideal. Traditional walking groups often go in Bhadrapada (August–September) and Kartik (October–November).",
      seasons: standardSeasons,
    },
    howToReach: [
      { mode: "Starting point", text: "Most yatras begin in Mathura at Vishram Ghat. We can collect you from Delhi, Agra, Mathura Junction or the airport." },
      { mode: "Getting around", text: "A private car with a driver who knows the rural Braj roads is essential; some sites are reached only by narrow village lanes." },
    ],
    packageSlugs: ["braj-84-kos-yatra", "govardhan-barsana-same-day", "janmashtami-special"],
    faqs: [
      { q: "Can we do the 84 Kos Yatra by car?", a: "Yes — a road-based yatra visits the principal sites of the 84 Kos parikrama in 4–7 days. It is not the same as the traditional walking parikrama, which takes several weeks." },
      { q: "Do we need a guide?", a: "It helps a great deal in rural Braj, where the stories behind each kund and grove bring the yatra alive. We can arrange a local guide on request." },
    ],
  },
];

export function getDestination(slug: Destination["slug"]): Destination {
  const d = destinations.find((x) => x.slug === slug);
  if (!d) throw new Error(`Unknown destination: ${slug}`);
  return d;
}
