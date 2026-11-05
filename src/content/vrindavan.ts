import type { StaticImageData } from "next/image";
import {
  BRAND_NAME,
  EMAIL,
  FOUNDED,
  FOUNDER,
  HOTEL_PARTNERS_CONFIRMED,
  PHONE_DISPLAY,
  PILGRIMS,
  RATING,
  STARTING_PRICE,
  YEARS,
  formatInr,
} from "@/config/site";
import { aboutImages } from "./about";
import { photos } from "./images";
import type { Faq } from "./types";

/*
 * /vrindavan copy, taken from "Vrindavan Content.pdf" in the founder's first-person voice.
 * Strings use the inline markup `**bold**` / `*italic*`, plus `[label](/href)` for internal links.
 * The PDF's "Quick Notes for Your Web Team" are not published: the founder's name, the hotel name and the
 * starting price all come from config/site.ts, so those decisions stay in one place.
 */

export const VRINDAVAN_PATH = "/vrindavan";
/** Date (ISO) this guide was last reviewed. Shown on the page, and used for `dateModified` and the sitemap. */
export const VRINDAVAN_UPDATED = "2026-10-30";

const PRICE = formatInr(STARTING_PRICE);
const PILGRIM_COUNT = PILGRIMS.replace("+", "");
const TIP_LABEL = `${FOUNDER.name}'s local tip`;

export const vrindavanMeta = {
  title: "Vrindavan Travel Guide: Best Places to Visit, Things to Do & Local Secrets",
  /** ≤ 160 chars. A shorter cut of the PDF's suggestion, which would be truncated before its price and phone number. */
  description: `Vrindavan guide by Braj-born expert ${FOUNDER.name}: Banke Bihari tips, Prem Mandir lights, Nidhivan, Parikrama, food. From ${PRICE}. Call ${PHONE_DISPLAY}.`,
};

export const vrindavanCrumbs = [
  { name: "Home", href: "/" },
  { name: "Vrindavan", href: VRINDAVAN_PATH },
];

export const whatsappMessage = `Radhe Radhe ${FOUNDER.name} ji! I'd like to plan a Vrindavan trip. My dates and group details are:`;

/* ------------------------------------------------------------------ */
/* Pictures: every alt describes what the frame actually shows         */
/* ------------------------------------------------------------------ */

export type Pic = { src: StaticImageData | string; alt: string };

/** A frame's URL. Passing this rather than the imported object keeps its base64 blur out of the page payload. */
export const picUrl = ({ src }: Pic) => (typeof src === "string" ? src : src.src);

const pic = (key: keyof typeof photos, alt?: string): Pic => ({ src: photos[key].src, alt: alt ?? photos[key].alt });

export const pics = {
  hero: pic("prem-mandir", "Prem Mandir in Vrindavan glowing pink and teal at night, with devotees on the marble forecourt"),
  gate: pic("banke-bihari-gate", "Carved facade and main gate of Banke Bihari Temple in Vrindavan"),
  premNight: pic("prem-mandir-night", "Prem Mandir Vrindavan lit in colourful lights at night, evening light show"),
  premDay: { src: aboutImages.milestone.src, alt: "The white marble domes and carved walls of Prem Mandir, Vrindavan, on a clear morning" },
  nidhivan: pic("nidhivan", "Twisted tulsi trees in Nidhivan Vrindavan sacred grove"),
  sevaKunj: pic("seva-kunj"),
  iskcon: pic("iskcon"),
  radhaRaman: pic("radha-raman"),
  vaishno: pic("vaishno-devi-dham"),
  keshi: pic("keshi-ghat", "Keshi Ghat on the Yamuna in Vrindavan at dusk with devotees"),
  diya: { src: aboutImages.elders.src, alt: aboutImages.elders.alt },
  yamuna: { src: aboutImages.team.src, alt: aboutImages.team.alt },
  lane: pic("banke-bihari-lane"),
  street: pic("vrindavan-street"),
  pichhavai: pic("vraj-parikrama-pichhavai"),
  phoolHoli: pic("flower-holi", "Flower petals showering over a crowd during Phoolon ki Holi"),
  gulal: pic("holi-vrindavan", "A devotee in red playing with gulal during Holi in Vrindavan"),
  lathmar: pic("lathmar-holi", "Clouds of coloured powder during Lathmar Holi in Nandgaon"),
  kachori: pic("kachori-sabzi", "Hot kachori with spicy aloo sabzi on a steel plate, the classic Braj breakfast"),
  lassi: pic("kulhad-lassi-malai"),
  rabri: pic("jalebi-rabri-plate"),
};

/** External-licence credits for the frames that live outside content/images.ts (those are on /image-credits). */
export const pageCredits = [
  { label: "Prem Mandir by morning", ...aboutImages.milestone },
  { label: "Diya offering at Keshi Ghat", ...aboutImages.elders },
  { label: "Devotees on the Yamuna bank", ...aboutImages.team },
];

/* ------------------------------------------------------------------ */
/* Hero and introduction                                               */
/* ------------------------------------------------------------------ */

export const hero = {
  greeting: "Radhe Radhe, dear traveller.",
  titleLead: "Vrindavan Travel Guide",
  titleRest: "Best Places to Visit, Things to Do & Local Secrets",
  lede: 'Vrindavan does not greet you with a skyline. It greets you with a sound: a temple bell, a harmonium, someone calling "Radhe Radhe" from a doorway before you have even stepped out of the car.',
  stats: [
    { value: FOUNDED, label: "Serving pilgrims since" },
    { value: PILGRIMS, label: "Pilgrims guided" },
    { value: `${RATING}`, label: "Star rated" },
    { value: PRICE, label: "Packages from" },
  ],
};

export const intro = {
  lead: "This **Vrindavan travel guide** is the one I wish every visitor carried in their pocket, a complete companion to the **places to visit in Vrindavan**, written by someone who grew up a short walk from these lanes.",
  body: `I am ${FOUNDER.name}, founder of **${BRAND_NAME}**. I was born in Braj Bhoomi, and since ${FOUNDED} I have guided **over ${PILGRIM_COUNT} pilgrims** through this town. Our guests have given us a **${RATING}-star rating**, and our customised packages start from just **${PRICE}**. Vrindavan is commonly said to hold more than 5,000 temples (locals often say 5,500 or more) dedicated to Radha and Krishna, and no one sees them all in a lifetime. After **${YEARS} years of guiding**, I know which ones are worth your limited hours, which lanes are quiet at dawn and which hour to avoid. I have put all of it here.`,
  timingNote:
    "**A note on timings:** Temple timings in Vrindavan change with the season, festivals and management decisions. Everything below is the usual pattern I have observed over the years. Please treat it as a planning guide. We reconfirm with every guest the day before.",
  phone: PHONE_DISPLAY,
  email: EMAIL,
  packagesLink: { label: "Mathura Vrindavan Tour Packages", href: "/tour-packages" },
};

export const glance = {
  title: "Vrindavan at a Glance",
  rows: [
    { label: "Known for", value: "Krishna's childhood leelas, Radha Rani's kingdom, thousands of temples" },
    { label: "Best time", value: "September to March (best weather: October to March)" },
    { label: "Ideal stay", value: "2 days (3 to 4 with Mathura, Govardhan, Barsana)" },
    { label: "Distance from Mathura", value: "About 11 to 15 km" },
    { label: "Distance from Delhi", value: "About 135 to 150 km" },
    { label: "Must-try food", value: "Kulhad lassi, rabri, aloo kachori, malpua, makhan mishri" },
  ],
};

export const why = {
  title: "Why Vrindavan Is Different from Any Other Holy Place",
  paragraphs: [
    'Most pilgrimage towns ask you to climb: a mountain, a long stair, a grand ritual. Vrindavan brings the divine down to your level. Here the Lord is a naughty child stealing butter, a flute player in a tulsi grove, a friend waiting at his beloved\'s door. The widow selling tulsi garlands outside a temple talks to her Laddu Gopal as though he were her grandson. The rickshaw driver stops to bow when a bell rings. A monkey snatches your spectacles, and the shopkeeper smiles and says, "Bihari ji\'s leela."',
    "The name comes from **Vrinda** (the sacred tulsi) and **van** (forest). The forest has largely turned into a town, but the devotion has not thinned. In the sixteenth century, the saints known as the **Goswamis**, followers of Chaitanya Mahaprabhu, rediscovered the lost sacred sites and raised temples that still stand. Swami Haridas and other saint-musicians gave Vrindavan its musical soul. That living tradition is what you walk into.",
  ],
};

/* ------------------------------------------------------------------ */
/* Best places to visit                                                */
/* ------------------------------------------------------------------ */

export const bestPlaces = {
  title: "Best Places to Visit in Vrindavan",
  lede: "These are the **best places to visit in Vrindavan**, in the order I would introduce them to a first-time guest. Together they form a complete **Vrindavan sightseeing** plan.",
  index: [
    { id: "banke-bihari", name: "Shri Banke Bihari Temple", picture: pics.gate },
    { id: "prem-mandir", name: "Prem Mandir", picture: pics.premNight },
    { id: "nidhivan", name: "Nidhivan", picture: pics.nidhivan },
    { id: "iskcon", name: "ISKCON Temple", picture: pics.iskcon },
    { id: "radha-raman", name: "Radha Raman Temple", picture: pics.radhaRaman },
    { id: "vaishno-devi", name: "Vaishno Devi Dham", picture: pics.vaishno },
    { id: "keshi-ghat", name: "Keshi Ghat", picture: pics.keshi },
  ],
};

export const bankeBihari = {
  id: "banke-bihari",
  name: "Shri Banke Bihari Temple",
  href: "/temples/banke-bihari",
  significance:
    "**Spiritual significance:** If Vrindavan has a heartbeat, it is here. The deity is a dark, captivating form of Krishna standing in the *tribhanga* pose (bent in three places), which gives *banke* its meaning. Tradition says he was revealed to the saint-musician **Swami Haridas** at Nidhivan, drawn out by the sweetness of his singing, with Radha and Krishna appearing as one form. The present temple dates from the nineteenth century.",
  jhanki:
    "**The jhanki darshan:** This is what surprises every first-timer at **Banke Bihari Temple darshan**. A curtain in front of the deity is drawn and opened again and again, so you receive glimpses rather than a long gaze. Brijwasis say that if you look steadily into Bihari ji's eyes, he will captivate you and may not let you go, so the priests draw the curtain to protect you from overwhelming love. Once you know this, the interruption becomes part of the blessing.",
  aarti:
    "There is also no regular mangala aarti here, because Bihari ji is worshipped as a playful child who has spent the night in Raas and is allowed to sleep late. The special mangala aarti is held only on **Janmashtami**.",
  timings: {
    caption: "Typical darshan timings (approximate)",
    rows: [
      { season: "Summer (about April to September)", morning: "7:45 a.m. to 12:00 noon", evening: "5:30 p.m. to 9:30 p.m." },
      { season: "Winter (about October to March)", morning: "8:45 a.m. to 1:00 p.m.", evening: "4:30 p.m. to 8:30 p.m." },
    ],
  },
  tipLabel: TIP_LABEL,
  tips: [
    "**Go on a weekday, in the first hour after opening.** By mid-morning the approach lane is shoulder to shoulder, especially on weekends, Ekadashi, Purnima and holidays.",
    "**Leave phones, bags and cameras in your vehicle or hotel.** Phones are generally not allowed near the sanctum, and pickpocketing is real in dense crowds.",
    "**Move patiently toward the sides of the hall** for a clearer, longer look than the central crush.",
    '**Ignore "VIP darshan" offers** in the lane. Genuine darshan does not need to be bought.',
    "**Elderly guests should come with an attendant** or with our team, as the lanes are narrow and we know the gentlest approach and rest points.",
  ],
};

export const premMandir = {
  id: "prem-mandir",
  name: "Prem Mandir",
  href: "/temples/prem-mandir",
  significance:
    '**Spiritual significance:** Founded by **Jagadguru Kripalu Maharaj** and opened to the public in **2012**, Prem Mandir is the modern jewel of Vrindavan. Built of white Italian marble with intricately carved domes and walls, it narrates Krishna\'s life in stone, from his birth in prison to the lifting of Govardhan and the Raas. Inside you will find Radha-Krishna and Sita-Ram. Its name means "Temple of Divine Love."',
  show: "**The evening light and fountain show:** After sunset the whole temple glows, shifting through colours while a musical fountain and illumination display fills the gardens. Families gather on the lawns, children point and the marble seems lit from within. After countless visits, the first change of colour still quietens me.",
  timing:
    "**Typical timings (approximate):** About **5:30 a.m. to 12 noon** and **4:30 p.m. to 8:30 p.m.** The show falls in the evening window, and schedules vary by season, so confirm on the day.",
  dayLabel: "Once for the carvings",
  nightLabel: "Once for the lights",
  tipLabel: TIP_LABEL,
  tips: [
    "**The best time to see the Prem Mandir light show:** arrive in the **late afternoon**, tour the carvings in daylight, then settle into a spot as the sun goes down. The best moment is just after sunset, when the sky still holds a trace of blue and the marble begins to glow.",
    "**Visit twice in one day** if you can: once for the carvings, once for the lights.",
    "**Weekends and festival evenings are very crowded.** Keep extra time for parking and entry.",
    "**Phones are normally restricted inside the main sanctum.** Use the lockers.",
  ],
};

export const nidhivan = {
  id: "nidhivan",
  name: "Nidhivan (Forest of Tulsi)",
  href: "/temples/nidhivan",
  significance:
    '**Spiritual significance:** Nidhivan is where I take guests who ask, "Where is the real Vrindavan?" It looks modest: a small, enclosed grove of low, knotted trees, locally believed to be wild tulsi, growing in pairs. But step in quietly and you feel a hush you will not find elsewhere in town. It is also linked with **Swami Haridas**, who is said to have drawn Banke Bihari out of this very grove.',
  mysteriesLead:
    '**The nighttime mysteries, as Braj tells them:** People ask me for "the truth" about Nidhivan, so let me be honest about what I can and cannot give you. What I can give you is what Brijwasis have believed for centuries.',
  mysteries: [
    "Every night, Radha, Krishna and the gopis are said to return to the grove to dance the divine **Raas**. The trees, it is said, become gopis for the dance and turn back into trees by morning.",
    "Because of this, the grove **closes at dusk**, and local belief says no human, bird or animal stays within overnight.",
    "Inside is the **Rang Mahal**. Each evening, priests lay out a bed, items for Radha's adornment, sweets, paan and water, and lock the doors. In the morning, devotees say the offerings are found disturbed, and they receive them as prasad.",
    "Elders tell stories of people who tried to watch at night and met misfortune, and nearby houses are said to have no windows facing the grove.",
  ],
  honesty:
    "I do not argue anyone into belief or out of it. I cannot prove these accounts, and I would never pretend to. What I can promise is that the stillness of the place is real, and many of my guests have felt moved here in ways they could not explain. Stand quietly, close your eyes, listen to the leaves, and let your own heart decide.",
  nearby:
    "**Nearby: Seva Kunj**, where tradition says Radha-Krishna rested after the Raas, and the samadhi of Swami Haridas. I take guests to all three together.",
  nearbyHref: "/temples/seva-kunj",
  timing: "**Timings (approximate):** Early morning until dusk, roughly 7 to 8 p.m. depending on the season.",
  warningLabel: `${FOUNDER.name}'s local tip, and a serious warning about monkeys`,
  warnings: [
    "**Hide your glasses and phone.** The monkeys here are quick and expert. They snatch spectacles, phones, water bottles, snacks and prasad bags straight from hands, and I have lost count of the guests who have left with one pair fewer than they arrived with.",
    "**Do not wear glasses on your head or hang them from your collar.** Keep them in a zipped bag, or use a strap.",
    "**Do not wave, stare or show teeth at a monkey.** Walk calmly. Never try to snatch things back. A snack or juice packet from a shopkeeper often trades for a phone or spectacles.",
    '**Go early in the morning** when the grove is silent and the light is soft. Do not leave it for the end of your day, since there is no "night entry," whatever anyone tells you.',
    "**Keep your voice low,** and follow photography signs.",
  ],
};

export const iskcon = {
  id: "iskcon",
  name: "ISKCON Temple (Krishna Balaram Mandir)",
  href: "/temples/iskcon-krishna-balaram",
  significance:
    "**Spiritual significance:** Inaugurated in **1975** and founded by **A.C. Bhaktivedanta Swami Prabhupada**, this white marble temple houses the deities of **Krishna-Balaram**, **Radha-Shyamasundar** and **Gaura-Nitai**. Prabhupada's samadhi sits in the courtyard, a calm place for reflection. The temple draws devotees from across the world, and you will hear many languages chanting the same names.",
  kirtan:
    "**The kirtan:** What I love most is the congregational singing. The courtyard fills with dancing, drums and cymbals, and even sceptical visitors often find themselves swaying. The temple is clean, well organised and welcoming, which makes it a gentle first stop for families and foreign guests.",
  timing:
    "**Typical timings (approximate):** Mangala aarti from about **4:30 a.m.**, a midday closing around 1 p.m., and an afternoon-to-evening session from about **4 p.m. to 8:30 p.m.**",
  tip: `**${TIP_LABEL}:** Come for the **evening aarti and kirtan**, which have a different mood from the old Goswami temples. Take the prasadam if you have time, since it is simple, hygienic and satvik. Dress modestly, and visit the bookshop and museum if you are curious about Vaishnava philosophy.`,
};

export const radhaRaman = {
  id: "radha-raman",
  name: "Radha Raman Temple",
  href: "/temples/radha-raman",
  significance:
    "**Spiritual significance:** One of Vrindavan's most revered **sixteenth-century** shrines, belonging to the Gaudiya tradition. The deity is believed to have **self-manifested** from a shaligram stone for **Gopal Bhatta Goswami**, a close follower of Chaitanya Mahaprabhu. He is small, only around a foot tall, yet extraordinarily beautiful. There is no separate idol of Radha. Her presence is honoured by a decorated crown beside the Lord. The temple kitchen is said to have kept a sacred flame burning for centuries, and the atmosphere is calm, traditional and far less crowded than Banke Bihari.",
  timing: "**Typical timings (approximate):** A morning session and an evening session with a midday break. Confirm on the day.",
  tip: `**${TIP_LABEL}:** The temple sits in the old lanes, and cars cannot reach the last stretch. We drop you at the nearest convenient point, and you walk a few minutes through the market lanes. Go in the **morning or early evening** and sit for a few quiet minutes in the courtyard instead of hurrying out.`,
};

export const vaishnoDevi = {
  id: "vaishno-devi",
  name: "Vaishno Devi Dham",
  significance:
    "**Spiritual significance:** Vrindavan's **Vaishno Devi Dham** is a devotional complex built as a replica of the famous cave shrine in Jammu. It is known for its **massive statue of the Goddess** and its tunnel-like cave path, which makes it a favourite with families and with elders who cannot undertake the real pilgrimage. It adds a Devi dimension to a town otherwise devoted to Radha-Krishna.",
  timing: "**Timings (approximate):** Open morning to evening with a midday break. Confirm before visiting.",
  tip: `**${TIP_LABEL}:** The cave path is dim and slightly narrow, so hold on to children and elders, and avoid peak weekend afternoons. It is also a pleasant, uncrowded stop to pair with Prem Mandir.`,
};

export const keshiGhat = {
  id: "keshi-ghat",
  name: "Keshi Ghat",
  significance:
    "**Spiritual significance: Keshi Ghat** is the best known of Vrindavan's riverfront ghats, and it is named after the demon Keshi, whom Krishna is said to have slain here. The old steps, arched pavilions and small shrines sit right on the **Yamuna**, whom we call **Yamuna Maiya**, Mother Yamuna. Next to the ghat stands the old Jugal Kishore temple, one of the older temples by the river.",
  timing: "**Timings:** The ghat is open through the day. The evening aarti takes place around sunset.",
  tip: `**${TIP_LABEL}:** Come in the **late afternoon** and stay for the aarti. The crowd is gentle, the mood is quiet and the view of the river at dusk is lovely. Keep an eye out for the boatmen, agree the price before any ride and politely decline anyone who insists on a ritual.`,
};

export const moreTemples = {
  title: "More Temples in Vrindavan",
  items: [
    {
      name: "Radha Vallabh Temple",
      text: "A rare temple where Radha is worshipped at the centre, with Krishna represented by a crown beside her, known for its devotional *samaj gayan* music.",
      links: [{ label: "Radha Vallabh Temple", href: "/temples/radha-vallabh" }],
      picture: pic("radha-vallabh"),
    },
    {
      name: "Madan Mohan and Govind Dev Ji",
      text: "Two of the oldest temples in the **Seven Goswami** group.",
      links: [
        { label: "Madan Mohan", href: "/temples/madan-mohan" },
        { label: "Govind Dev Ji", href: "/temples/govind-dev-ji" },
      ],
      picture: pic("govind-dev"),
    },
    {
      name: "Shri Rangji Mandir",
      text: "A South Indian-style temple with a tall gopuram, built in the mid-nineteenth century, dedicated to Lord Ranganatha.",
      links: [{ label: "Shri Rangji Mandir", href: "/temples/rangji" }],
      picture: pic("rangji"),
    },
    { name: "Jaipur Mandir, Pagal Baba Temple and Shahji Temple", text: "Beautiful architecture for the curious.", links: [] },
    { name: "Gopeshwar Mahadev", text: "A rare Shiva temple where Shiva is said to have come in the form of a gopi to join the Raas.", links: [] },
  ],
};

/** Mosaic frames, chosen so nothing repeats the chapters above. `span` sets the shape on wide screens. */
export const pictureWall = {
  title: "Vrindavan in Pictures",
  frames: [
    { ...pic("phool-bangla"), caption: "Phool Bangla at Banke Bihari", span: "wide" },
    { ...pic("rangji"), caption: "The gopuram of Shri Rangji Mandir", span: "tall" },
    { ...pic("prem-mandir"), caption: "Prem Mandir after sunset", span: "square" },
    { ...pic("govind-dev"), caption: "Govind Dev Ji", span: "square" },
    { ...pic("radha-vallabh"), caption: "Radha Vallabh Temple", span: "tall" },
    { ...pic("madan-mohan"), caption: "Madan Mohan", span: "wide" },
    { ...pic("banke-bihari"), caption: "Banke Bihari above the lanes", span: "square" },
    { ...pic("yamuna-vrindavan"), caption: "Looking out over the Yamuna", span: "square" },
  ] as (Pic & { caption: string; span: "wide" | "tall" | "square" })[],
};

/** One ink, on one 4 a.m. to 10 p.m. scale. Hours are decimals; only temples with stated hours are drawn. */
export const darshanDay = {
  title: "Darshan Hours Side by Side",
  lede: "The same approximate timings as above, on one clock. We reconfirm with every guest the day before.",
  startHour: 4,
  endHour: 22,
  rows: [
    { name: "Banke Bihari", season: "Summer", href: "#banke-bihari", windows: [[7.75, 12], [17.5, 21.5]], text: "7:45 a.m. to 12 noon · 5:30 to 9:30 p.m." },
    { name: "Banke Bihari", season: "Winter", href: "#banke-bihari", windows: [[8.75, 13], [16.5, 20.5]], text: "8:45 a.m. to 1 p.m. · 4:30 to 8:30 p.m." },
    { name: "Prem Mandir", href: "#prem-mandir", windows: [[5.5, 12], [16.5, 20.5]], text: "5:30 a.m. to 12 noon · 4:30 to 8:30 p.m." },
    { name: "ISKCON Temple", href: "#iskcon", windows: [[4.5, 13], [16, 20.5]], text: "4:30 a.m. to 1 p.m. · 4 to 8:30 p.m." },
  ] as { name: string; season?: string; href: string; windows: [number, number][]; text: string }[],
  timetable: { label: "Timings for every temple in Braj", href: "/mathura-vrindavan-temple-timings" },
};

/* ------------------------------------------------------------------ */
/* Things to do                                                        */
/* ------------------------------------------------------------------ */

export const thingsToDo = {
  title: "Top Things to Do in Vrindavan",
  lede: "Temples are the heart of the visit, but these are the **things to do in Vrindavan** that stay with you.",
};

export const parikrama = {
  title: "Walk the Vrindavan Parikrama",
  distance: "10 to 13 km",
  distanceNote: "Clockwise, often barefoot",
  paintingCaption: "A pichhvai of the Vraj Parikrama. Rajasthan, 19th century.",
  intro:
    "The **Vrindavan Parikrama** is a circular path around the holy town, usually quoted at roughly **10 to 13 km** depending on the route and where you start and end. Pilgrims walk it clockwise, often **barefoot**, chanting the names of Radha and Krishna. In the Braj tradition, circumambulating a sacred place is an act of surrender: you place the Lord at the centre of your life and walk around him.",
  why: "**Why it matters:** The path passes through the old groves and lanes where the divine leelas are believed to have happened. It is not a hike. It is a slow, meditative way to be inside the holy land instead of a visitor to it.",
  tipLabel: TIP_LABEL,
  tips: [
    "**Go before sunrise.** The path is quiet, the air is cool and you will meet devotees chanting softly.",
    "**Barefoot is a devotional choice, not a requirement.** The road can be hot or rough, so many pilgrims carry light slip-ons for difficult stretches.",
    "**Carry water and a light snack,** zipped away from monkeys.",
    "**Not fit for the whole walk?** We arrange a shorter, partial Parikrama or an easier vehicle-assisted version. A pilgrim's love matters more than distance.",
    "**In summer, start well before dawn.** In winter, wear layers, because the early mornings are cold and sometimes foggy.",
  ],
  storyLead: "I once walked it with an elderly woman who insisted on going barefoot. At every turn she paused, touched the ground and whispered something. When I asked what she was saying, she smiled and said,",
  storyQuote: "\"I'm asking Radha Rani's permission to walk in her home.\"",
  storyClose: "I have never forgotten that.",
};

export const brajHoli = {
  title: "Experience Braj Ki Holi",
  text: "If you can plan your trip for **late February or March**, come for **Braj Ki Holi**. Celebrations build for weeks, with **Phoolon ki Holi** (the petal Holi), gulal at Banke Bihari, and the famous **Lathmar Holi** in nearby Barsana and Nandgaon. It is a feast of colour, drums and song. It is also very crowded, so book at least six to eight weeks ahead, wear old white clothes, protect your phone and leave valuables at the hotel. We have a [full festivals guide](/festivals) that covers the details, and festival dates change every year with the lunar calendar.",
  frames: [
    { picture: pics.phoolHoli, label: "Phoolon ki Holi", href: "/festivals/phoolon-wali-holi" },
    { picture: pics.gulal, label: "Gulal at Banke Bihari", href: "/festivals" },
    { picture: pics.lathmar, label: "Lathmar Holi", href: "/festivals/lathmar-holi" },
  ],
};

export const eveningAarti = {
  title: "Evening Aarti at Keshi Ghat",
  text: "For a peaceful alternative to the temple crowds, spend the golden hour at the river. The sun lowers over the Yamuna, bells begin, lamps are lifted in slow circles and small **diyas float away on the water**. The scent of incense and marigold hangs in the air. It is quiet, intimate and a wonderful way to end a day of darshan.",
};

export const brajFood = {
  id: "local-food",
  title: "Indulge in Local Braj Food",
  lede: "Braj is where Krishna stole butter, so the food is rich, creamy and proudly vegetarian, and in many temple areas even onion and garlic are avoided. Here is what I recommend.",
  dishes: [
    { name: "Kulhad lassi", text: "Thick, cool, creamy and often crowned with a layer of malai, served in a clay *kulhad*. A good one should almost need a spoon. Look for the busy stalls with a queue of locals, and ask for it sweet or salted." },
    { name: "Rabri", text: "Slow-cooked, sweetened, thickened milk, best eaten fresh in the morning, often with hot jalebis. It is rich, so share a bowl. For the **best lassi and rabri**, my rule is simple: pick the old, busy shops in the lanes near the temples, where the stirring has not stopped since morning. I share my own favourite spots with every guest who travels with us." },
    { name: "Aloo kachori", text: "Hot from the kadhai with spicy potato sabzi and tangy chutney, the classic Braj breakfast. Go early, when it is fresh. Tell the vendor if you are sensitive to spice." },
    { name: "Malpua", text: "Sweet fried pancakes, often served with rabri, especially around festivals." },
    { name: "Makhan mishri", text: "Fresh white butter with sugar crystals, Krishna's favourite and a beloved offering." },
    { name: "Thandai", text: "A cooling spiced milk drink, loved in summer and at Holi. Ask clearly if you do not want it mixed with bhang." },
  ],
  rules:
    "**My food rules:** Pick busy stalls (high turnover means fresh food), eat hot, freshly fried items, be careful with ice and cut fruit in summer and drink bottled or filtered water if your stomach is sensitive. We plan lighter food stops for elders and diabetic guests.",
};

export const bazaars = {
  title: "Shop in the Local Bazaars",
  items: [
    { name: "Loi Bazaar", text: "A lively market for handicrafts, clothing and everyday goods. It is also where you can find deity clothes (*poshak*) and accessories for Laddu Gopal." },
    { name: "Tilak Dwar", text: "A good area for **rosary beads (tulsi and rudraksha malas), brass idols and spiritual souvenirs**." },
  ],
  tip: `**${FOUNDER.name}'s tip:** Buy from established shops near the temples, ask for fair prices, carry small notes and keep your bag in front of you. I can point you to fairly priced stores so you avoid tourist traps.`,
};

/* ------------------------------------------------------------------ */
/* Planning                                                            */
/* ------------------------------------------------------------------ */

export const alleys = {
  id: "narrow-alleys",
  title: "How to Navigate the Narrow Alleys Safely",
  lede: "Vrindavan's old lanes are charming and also demanding. They were built for walkers, not for cars, and they fill up quickly.",
  rules: [
    "**Walk on the side of the lane, not the centre,** and move with the flow.",
    "**Keep one hand free and your bag in front of you,** zipped.",
    "**Do not stop suddenly** to take photographs in a moving crowd.",
    "**Hold hands with children and elders,** and agree a meeting point in case you get separated, since mobile signals can fail in dense crowds.",
    "**Step aside for cows, bicycles and e-rickshaws.** They share the lane.",
    "**If the lane is packed and you are being pushed, turn back.** No darshan is worth a crush.",
    "**Wear slip-on footwear,** as you will remove it at every temple.",
  ],
  close: "When you travel with us, our driver and guide arrange drop-off points and walking routes in advance, so you are never guessing where to get off.",
};

export type SeasonKey = "winter" | "summer" | "monsoon";

export const bestTime = {
  id: "best-time",
  title: "Best Time to Visit Vrindavan",
  lede: "The **best time to visit Vrindavan** is **September to March**, with the very best weather from **October to March**. Days are pleasant, humidity is low and temperatures can drop toward **10°C** on winter mornings, which makes walking and the Parikrama a pleasure.",
  picture: { src: aboutImages.milestone.src, alt: "Prem Mandir on a pleasant clear morning, best time to visit Vrindavan" } as Pic,
  months: [
    { name: "January", season: "winter", best: "peak" },
    { name: "February", season: "winter", best: "peak", festival: "Holi" },
    { name: "March", season: "winter", best: "peak", festival: "Holi" },
    { name: "April", season: "summer" },
    { name: "May", season: "summer" },
    { name: "June", season: "summer" },
    { name: "July", season: "monsoon" },
    { name: "August", season: "monsoon", festival: "Janmashtami" },
    { name: "September", season: "monsoon", best: "good", festival: "Janmashtami, Radhashtami" },
    { name: "October", season: "winter", best: "peak" },
    { name: "November", season: "winter", best: "peak" },
    { name: "December", season: "winter", best: "peak" },
  ] as { name: string; season: SeasonKey; best?: "peak" | "good"; festival?: string }[],
  seasons: [
    { key: "winter", name: "Winter", tag: "best", months: "October to March", note: "Pleasant days, cold mornings and nights, Kartik, Diwali, Govardhan Puja, Holi" },
    { key: "summer", name: "Summer", months: "April to June", note: "Very hot (often above 40°C), quiet weekdays, lower prices, Phool Bangla" },
    { key: "monsoon", name: "Monsoon", months: "July to September", note: "Green, humid, Jhulan Yatra, Janmashtami, Radhashtami" },
  ] as { key: SeasonKey; name: string; tag?: string; months: string; note: string }[],
  peaksTitle: "Festive peaks to plan around:",
  peaks: [
    { name: "Janmashtami", when: "August or September", text: "Krishna's birthday and the biggest night of the year. Banke Bihari performs its special mangala aarti, and crowds are immense.", href: "/festivals/janmashtami" },
    { name: "Radhashtami", when: "September", text: "Radha Rani's birthday, celebrated most intensely in nearby Barsana and Raval.", href: "/festivals/radhashtami" },
    { name: "Holi", when: "February or March", text: "The famous festival of colours. Unforgettable, and very crowded.", href: "/festivals/lathmar-holi" },
  ],
  close:
    "If you want devotion at its loudest, come for a festival. If you want quiet, unhurried darshan, choose the winter months outside festival weeks, and go on a weekday. Our dedicated guide to the [best time to visit Mathura Vrindavan](/travel-guide/best-time-to-visit-vrindavan-mathura) has a full month-by-month breakdown.",
};

export const reach = {
  id: "how-to-reach",
  title: "How to Reach Vrindavan",
  lede: "Vrindavan is easy to reach from Delhi, Agra and most of north India.",
  /** Bars share one scale, in km from Vrindavan. */
  distances: [
    { from: "Mathura Junction", km: 14, label: "About 14 km" },
    { from: "Agra (Kheria) Airport", km: 70, label: "Around 70 km" },
    { from: "Delhi IGI Airport", km: 150, label: "About 150 km" },
  ],
  modes: [
    {
      key: "air",
      title: "By Air",
      points: [
        "**Delhi's Indira Gandhi International Airport (IGI)** is the main gateway, about **150 km** away. A cab transfer takes roughly **3 to 3.5 hours**, depending on traffic.",
        "**Agra (Kheria) Airport** is closer, around **70 km**, but flights are limited.",
        "A newer airport serving the Delhi-NCR region near Jewar may offer another route via the Yamuna Expressway, so please check current flights.",
      ],
      note: "**Private cab:** We arrange airport pick-ups from Delhi and Agra, so you step out and into a clean AC vehicle with a driver who knows the road.",
    },
    {
      key: "train",
      title: "By Train",
      points: [
        "The nearest major railhead is **Mathura Junction**, about **14 km** from Vrindavan, on the Delhi-Mumbai and Delhi-Chennai corridors, with excellent connections from Delhi, Agra, Jaipur, Gwalior, Bhopal and Mumbai.",
        "From the station, take a **cab or auto-rickshaw** to Vrindavan, a ride of about 30 to 45 minutes depending on traffic. Agree the fare before you set off, or let us arrange a pick-up.",
        "Vrindavan has its own small station too, though fewer trains stop there.",
      ],
    },
    {
      key: "road",
      title: "By Road",
      points: [
        "**From Delhi and NCR:** The **Yamuna Expressway** and **NH-19** give you a smooth drive of about **3 to 3.5 hours**. Avoid dense winter fog in December and January if you can.",
        "**From Agra:** About 1.5 to 2 hours.",
        "**By bus: UPSRTC** and private buses run regularly from Delhi, Agra and other cities to Mathura and Vrindavan. They are cheap but can be crowded and slow. For families and elders, a private car is far more comfortable.",
      ],
    },
  ],
  aroundTitle: "Getting around Vrindavan",
  around: [
    { name: "E-rickshaws", text: "The everyday answer in the old town. Agree the fare before you sit, and keep valuables in front of you." },
    { name: "Private car", text: "Best for longer hops, such as Prem Mandir, ISKCON and travel to Mathura." },
    { name: "Walking", text: "Many core temples are in lanes closed to vehicles, so comfortable shoes matter." },
  ],
};

export const nearby = {
  id: "near-vrindavan",
  title: "Places to Visit Near Vrindavan",
  lede: "Many guests extend their trip to the wider Braj region. These are the best **places to visit near Vrindavan**:",
  places: [
    { name: "Mathura", distance: "about 11 to 15 km", text: "Krishna Janmasthan, Dwarkadhish and the Vishram Ghat aarti.", href: "/mathura", picture: pic("vishram-ghat") },
    { name: "Gokul and Raman Reti", distance: "about 20 km", text: "Krishna's infancy and the soft sacred sands.", href: "/gokul", picture: pic("gokul") },
    { name: "Govardhan", distance: "about 25 to 30 km", text: "The sacred hill, Daan Ghati and Radha Kund.", href: "/govardhan", picture: pic("daan-ghati") },
    { name: "Barsana and Nandgaon", distance: "about 50 to 60 km", text: "Radha's village and Krishna's boyhood home.", href: "/barsana", picture: pic("radha-rani-barsana") },
    { name: "Baldeo (Dauji)", text: "The temple of Krishna's elder brother Balarama.", href: "/temples/dauji-baldeo", picture: pic("dauji") },
    { name: "Agra", distance: "about 70 km", text: "The Taj Mahal and Agra Fort, for those who want to combine pilgrimage with history.", href: "/tour-packages/agra-mathura-vrindavan-3-days", picture: pic("taj-mahal") },
  ],
};

export const twoDays = {
  title: "Two Days in Vrindavan",
  lede: "Two days cover the main temples comfortably. One day is possible but rushed.",
  days: [
    { label: "Day one", stops: ["ISKCON", "Prem Mandir"], href: "#iskcon" },
    { label: "Day two", stops: ["Nidhivan", "Banke Bihari", "Radha Raman", "Other old temples"], href: "#nidhivan" },
    { label: "Add a day or two", stops: ["Mathura", "Govardhan", "Barsana"], href: "/braj-yatra" },
  ],
  packagesTitle: "Trips that include Vrindavan",
  packageSlugs: ["vrindavan-one-day-darshan", "mathura-vrindavan-2-days", "agra-mathura-vrindavan-3-days"],
};

const premiumStaysClause = HOTEL_PARTNERS_CONFIRMED ? ", such as **Nidhivan Sarovar Portico**, subject to availability," : ", subject to availability,";

export const stay = {
  id: "where-to-stay",
  title: "Where to Stay in Vrindavan",
  paragraphs: [
    "A day of walking, darshan and crowds is tiring, and the right room makes your next morning possible. Vrindavan offers everything from simple ashram guesthouses and dharamshalas to comfortable hotels.",
    `We also arrange **curated premium bookings at top 4 and 5-star hotels**${premiumStaysClause} so you can return each evening to a quiet, clean, air-conditioned retreat. This matters most in a crowded city during Holi, Janmashtami, Diwali and the winter weekends, when good rooms disappear early.`,
    "Tell me your budget and needs, and I will suggest the right fit, even if that means a simple stay.",
  ],
  tiers: ["Simple ashram guesthouses", "Dharamshalas", "Comfortable hotels", "Top 4 and 5-star hotels"],
  guide: { label: "Should you stay in Mathura or Vrindavan?", href: "/travel-guide/stay-in-mathura-or-vrindavan" },
};

/* ------------------------------------------------------------------ */
/* FAQ and booking                                                     */
/* ------------------------------------------------------------------ */

export const faqTitle = "Frequently Asked Questions About Vrindavan";

export const vrindavanFaqs: Faq[] = [
  { q: "Are 2 days enough for Vrindavan?", a: "Yes, two days cover the main temples comfortably: ISKCON and Prem Mandir on the first day, and Nidhivan, Banke Bihari, Radha Raman and other old temples on the second. One day is possible but rushed. Add a day or two if you want Mathura, Govardhan and Barsana." },
  { q: "Which is better to stay in, Mathura or Vrindavan?", a: "Vrindavan if your priority is the temples and early-morning darshan, since you are minutes from Banke Bihari, Nidhivan and Radha Raman. Mathura if you want easier railway access, or more time at Janmasthan and the ghats. The distance is only 11 to 15 km, so either works." },
  { q: "How do I protect my belongings from monkeys in Vrindavan?", a: "Keep glasses, phones, snacks and water bottles inside a zipped cross-body bag. Do not wear glasses on your head, do not carry prasad openly, and do not stare at, wave at or feed monkeys. If one takes something, do not chase it. A shopkeeper can often help trade for a juice packet." },
  { q: "What is the best way to travel locally within Vrindavan?", a: "E-rickshaws are the best for short hops in the old town. A private car is best for longer distances and for families and seniors. Many lanes are walking-only, so wear comfortable footwear. We pre-arrange drop-off points for our guests." },
  { q: "What are the Banke Bihari Temple timings?", a: "In summer, about 7:45 a.m. to noon and 5:30 to 9:30 p.m. In winter, about 8:45 a.m. to 1 p.m. and 4:30 to 8:30 p.m. Timings can change, so always reconfirm." },
  { q: "Are phones allowed inside Banke Bihari Temple?", a: "Phones, cameras and bags are generally not allowed in the sanctum area. Lockers are available nearby, or leave valuables in your vehicle or hotel. Check rules on the day." },
  { q: "When is the best time to see the Prem Mandir light show?", a: "In the evening, just after sunset. Arrive in the late afternoon, tour the carvings in daylight and find your spot before the lights come on. Confirm the show schedule on the day." },
  { q: "Why is Nidhivan closed at night?", a: "Tradition holds that Radha, Krishna and the gopis perform the Raas Leela in the grove every night, and no one is allowed to stay. The grove closes at dusk and reopens in the morning." },
  { q: "How long is the Vrindavan Parikrama?", a: "Roughly 10 to 13 km, depending on the route. Many devotees walk barefoot before sunrise. We can arrange a partial or vehicle-assisted version." },
  { q: "What is the best time to visit Vrindavan?", a: "September to March, especially October to March, for pleasant weather. Festivals like Holi and Janmashtami are spiritually rich but very crowded." },
  { q: "Is Vrindavan safe for women and solo travellers?", a: "Main temple areas are generally safe in the daytime. As in any crowded pilgrimage town, avoid isolated lanes at night, keep valuables hidden and use a trusted driver. Many women travel with us each year, and we take extra care." },
  { q: "Is Vrindavan suitable for senior citizens?", a: "Yes, with planning. We choose gentler routes, plan rest stops, arrange e-rickshaw or wheelchair help and time temples to avoid the worst crowds." },
  { q: "What is the dress code for Vrindavan temples?", a: "Modest clothing covering shoulders and knees. Slip-on footwear is practical, since you will remove it often." },
  { q: "How far is Vrindavan from Mathura and Delhi?", a: "About 11 to 15 km from Mathura (30 to 45 minutes) and about 135 to 150 km from Delhi (roughly 3 to 3.5 hours by road)." },
  { q: "How much does a Vrindavan tour package cost?", a: `Our customised packages start from ${PRICE}. The final price depends on group size, vehicle, number of days and whether you add a hotel stay. I always send a clear written quote with no hidden charges.` },
];

const premiumOffer = HOTEL_PARTNERS_CONFIRMED
  ? "We also offer **curated premium bookings at top 4 and 5-star hotels**, including options such as **Nidhivan Sarovar Portico** (subject to availability), for a comfortable, stress-free stay in a crowded city."
  : "We also offer **curated premium bookings at top 4 and 5-star hotels** (subject to availability), for a comfortable, stress-free stay in a crowded city.";

export const book = {
  id: "book",
  title: "Book Your Vrindavan Package with Local Experts",
  paragraphs: [
    "Vrindavan is not a place you finish. It is a place you begin, and then return to. I would be honoured to be your guide for that first visit.",
    `Since **${FOUNDED}**, **${BRAND_NAME}** has guided **over ${PILGRIM_COUNT} pilgrims**, earning a **${RATING}-star rating**, and we plan each journey the way a Brijwasi would plan it for his own family: the right lane, the right hour and a comfortable place to rest.`,
    `Our **customised Vrindavan packages start from just ${PRICE}**, with clear quotes and no hidden charges. ${premiumOffer}`,
    "Tell me your dates, how many people are travelling and whether you have elders or children. I will reply personally with a plan that suits you.",
  ],
  callLabel: `Call or WhatsApp ${FOUNDER.name}`,
  emailLabel: "Email",
  websiteLabel: "Website",
  website: { label: "Mathura Vrindavan Tour Packages", href: "/tour-packages" },
  trust: [`Serving pilgrims since ${FOUNDED}`, `${RATING}-star rated`, `${PILGRIMS} pilgrims guided`, `Packages from ${PRICE}`],
  closing: "Vrindavan does not ask you to be perfect. It only asks you to come.",
  blessing: "Radhe Radhe.",
  signature: `${FOUNDER.name}, Founder, ${BRAND_NAME}`,
};

/** Internal links to the rest of the Braj section. */
export const continuePlanning = [
  { label: "Mathura", text: "Krishna's birthplace and the Vishram Ghat aarti", href: "/mathura" },
  { label: "Govardhan", text: "Giriraj, the 21 km Parikrama and Radha Kund", href: "/govardhan" },
  { label: "Barsana & Nandgaon", text: "Radha Rani's hilltop home and Krishna's village", href: "/barsana" },
  { label: "Full Braj Yatra", text: "Gokul, Baldeo and the wider 84 Kos", href: "/braj-yatra" },
  { label: "Temples of Braj", text: "History, dress code and tips for each temple", href: "/temples" },
  { label: "Festivals of Braj", text: "Janmashtami, Holi, Radhashtami and more", href: "/festivals" },
  { label: "Getting around Vrindavan", text: "E-rickshaws, cars and walking the lanes", href: "/travel-guide/getting-around-vrindavan" },
  { label: "First-visit tips", text: "Small things that help", href: "/travel-guide/first-visit-tips-vrindavan" },
  { label: "Seniors in Braj", text: "Planning for elders, pace and comfort", href: "/travel-guide/senior-citizen-travel-guide-braj" },
];

export const sectionNav = [
  { id: "best-places", label: "Temples" },
  { id: "things-to-do", label: "Things to do" },
  { id: "local-food", label: "Food" },
  { id: "narrow-alleys", label: "Lanes" },
  { id: "best-time", label: "Best time" },
  { id: "how-to-reach", label: "How to reach" },
  { id: "near-vrindavan", label: "Nearby" },
  { id: "where-to-stay", label: "Stay" },
  { id: "faq", label: "FAQs" },
  { id: "book", label: "Book" },
];
