import { FOUNDED, FOUNDER, PHONE_DISPLAY, PILGRIMS, RATING, STARTING_PRICE, formatInr } from "@/config/site";

/*
 * /temples archive copy, from "Temple Content.pdf". These are the defaults: the published SitePage row
 * (slug "temples", edited at Admin → Temples Page) wins, see getTemplesPageContent in lib/cms/site-pages.ts.
 * Everything stays JSON so the CMS can save it. Text supports **bold**, *italic* and [label](/href).
 * Images are "photo:<key>" for site photos, or a URL for an upload (lib/cms/temple-image.ts).
 * Alt text describes the photo actually used: the PDF's suggestions were written for photos the site does not have.
 *
 * The PDF's "Notes for your web team" are not published. They are followed here:
 * every timing says it is approximate, no hotel is named, and the starting price explains itself only when
 * STARTING_PRICE_INCLUDES is set in config/site.ts.
 */

export type ContentImage = { src: string; alt: string };
export type LabelledText = { label: string; text: string };
export type NamedText = { name: string; text: string };

export type TempleEntry = {
  id: string;
  name: string;
  link: string;
  image: ContentImage;
  points: LabelledText[];
  timingTable: { title: string; rows: { season: string; morning: string; evening: string }[] };
  timings: string;
  tipLabel: string;
  tip: string;
  shrines: NamedText[];
};

export type TempleChapter = {
  id: string;
  nav: string;
  title: string;
  intro: string;
  entries: TempleEntry[];
  moreTitle: string;
  more: NamedText[];
};

export type TemplesPage = {
  /** Section keys switched off in the CMS. */
  hidden: string[];
  /** Section keys, in page order. */
  order: string[];
  meta: { title: string; description: string; keywords: string[] };
  hero: {
    eyebrow: string;
    title: string;
    titleRest: string;
    lede: string;
    primaryLabel: string;
    secondaryLabel: string;
    stats: { value: string; label: string }[];
    images: ContentImage[];
  };
  letter: {
    greeting: string;
    paragraphs: string[];
    contactLabel: string;
    packagesLabel: string;
    noteTitle: string;
    noteText: string;
  };
  glance: {
    eyebrow: string;
    title: string;
    intro: string;
    columns: { temple: string; knownFor: string };
    groups: { place: string; rows: { temple: string; knownFor: string; link: string }[] }[];
  };
  explorer: { eyebrow: string; title: string; text: string; searchLabel: string; allLabel: string; emptyText: string; timingsLabel: string };
  chapters: TempleChapter[];
  planner: {
    eyebrow: string;
    title: string;
    intro: string;
    columns: { temple: string; morning: string; evening: string; best: string };
    rows: { temple: string; morning: string; evening: string; best: string }[];
    planTitle: string;
    planText: string;
    fullTimetableLabel: string;
  };
  etiquette: {
    eyebrow: string;
    title: string;
    blocks: { title: string; text: string; list: LabelledText[]; closing: string }[];
  };
  faqSection: { eyebrow: string; title: string };
  faqs: { q: string; a: string }[];
  book: {
    eyebrow: string;
    title: string;
    paragraphs: string[];
    trust: string[];
    blessing: string;
    closing: string;
    signature: string;
  };
};

/** Section keys, in the PDF's order. */
export const TEMPLES_PAGE_SECTIONS: Record<string, string> = {
  letter: "Welcome letter",
  glance: "Mandir list at a glance",
  explorer: "Temple finder (temples from the Temple Editor)",
  chapters: "Temple chapters (Vrindavan, Mathura, nearby Braj)",
  planner: "Timings and darshan planning",
  etiquette: "Etiquette and logistics",
  faqs: "FAQs",
  book: "Book your journey",
};

const NO_TABLE: TempleEntry["timingTable"] = { title: "", rows: [{ season: "", morning: "", evening: "" }] };
const NO_SHRINES: NamedText[] = [{ name: "", text: "" }];

const entry = (e: Partial<TempleEntry> & Pick<TempleEntry, "id" | "name">): TempleEntry => ({
  link: "",
  image: { src: "", alt: "" },
  points: [],
  timingTable: NO_TABLE,
  timings: "",
  tipLabel: "Harsh's local tip",
  tip: "",
  shrines: NO_SHRINES,
  ...e,
});

export const templesPage: TemplesPage = {
  hidden: [],
  order: Object.keys(TEMPLES_PAGE_SECTIONS),

  meta: {
    /** ≤ 60 chars and ≤ 160 chars. The PDF's suggestions run longer and would be cut off in results. */
    title: "Mathura Vrindavan Temples: Timings, Tips & Mandir List",
    description: `Your complete guide to Mathura Vrindavan temples: Banke Bihari, Prem Mandir, Krishna Janmabhoomi, Nidhivan, Barsana and more, with timings from ${FOUNDER.name}.`,
    keywords: ["mathura vrindavan temples", "famous temples in mathura vrindavan", "mathura vrindavan mandir list", "vrindavan temple guide", "temples to visit in mathura", "mathura temple timings"],
  },

  hero: {
    eyebrow: `Local guide · ${FOUNDER.name}`,
    title: "Mathura Vrindavan Temples",
    titleRest: "The Ultimate Guide by a Local Expert",
    lede: "The most temple-dense corner of India, organised town by town, with darshan timings, history and the local tips I give my own guests.",
    primaryLabel: "Find a temple",
    secondaryLabel: "Plan my darshan",
    stats: [
      { value: "5,000+", label: "temples, shrines, kunds and groves" },
      { value: PILGRIMS, label: "pilgrims guided" },
      { value: `${RATING}★`, label: "guest rating" },
      { value: FOUNDED, label: "guiding since" },
    ],
    images: [
      { src: "photo:banke-bihari-lane", alt: "A narrow old lane in the Banke Bihari Temple area of Vrindavan, lit by a single lamp" },
      { src: "photo:prem-mandir-night", alt: "Prem Mandir in Vrindavan illuminated in blue and white lights at night" },
      { src: "photo:radha-rani-barsana", alt: "Devotees in the courtyard of Shri Radha Rani Temple, Barsana" },
    ],
  },

  letter: {
    greeting: "Radhe Radhe, dear devotee.",
    paragraphs: [
      `If you are planning your **Mathura Vrindavan temples** yatra, you are about to enter the most temple-dense corner of India. I am ${FOUNDER.name}, founder of **Mathura Vrindavan Trips**. I was born in Mathura, and since ${FOUNDED} I have guided **over 75,000 pilgrims** through these lanes, with a **${RATING}-star rating** to show for it.`,
      "Braj holds more than 5,000 temples, shrines, kunds and sacred groves, and nobody can see them all in one trip. This guide covers the **famous temples in Mathura Vrindavan** that matter most to first-time and returning pilgrims, organised town by town, with darshan timings, history and the local tips I give my own guests.",
    ],
    contactLabel: "Talk to me directly",
    packagesLabel: "Mathura Vrindavan Tour Packages",
    noteTitle: "A note on timings",
    noteText: "Temple timings in Braj change with the season, festivals and management decisions. Everything below is the usual pattern I have seen over the years. Please treat it as a planning guide and reconfirm before you travel. We check the day before for every guest.",
  },

  glance: {
    eyebrow: "Before the deep dives",
    title: "Mathura Vrindavan Mandir List at a Glance",
    intro: "Here is a quick **Mathura Vrindavan mandir list** to orient you before the deep dives.",
    columns: { temple: "Temple / Site", knownFor: "Known for" },
    groups: [
      {
        place: "Vrindavan",
        rows: [
          { temple: "Banke Bihari Temple", knownFor: "Curtain (jhanki) darshan, the heart of Vrindavan", link: "/temples/banke-bihari" },
          { temple: "Prem Mandir", knownFor: "White marble carvings and evening lights", link: "/temples/prem-mandir" },
          { temple: "ISKCON Krishna Balaram Mandir", knownFor: "Kirtan and a global devotee community", link: "/temples/iskcon-krishna-balaram" },
          { temple: "Nidhivan and Seva Kunj", knownFor: "Sacred groves of the Raas Leela legend", link: "/temples/nidhivan" },
          { temple: "Radha Raman, Radha Vallabh, Govind Dev, Madan Mohan", knownFor: "Ancient Goswami-era shrines", link: "/temples/radha-raman" },
          { temple: "Shri Rangji Mandir", knownFor: "South Indian Dravidian architecture", link: "/temples/rangji" },
        ],
      },
      {
        place: "Mathura",
        rows: [
          { temple: "Shri Krishna Janmabhoomi", knownFor: "Birthplace of Krishna", link: "/temples/krishna-janmabhoomi" },
          { temple: "Dwarkadhish Temple", knownFor: "Rajasthani-style haveli temple near the Yamuna", link: "/temples/dwarkadhish" },
          { temple: "Gita Mandir (Birla Mandir)", knownFor: "Bhagavad Gita inscribed on pillars", link: "/temples/gita-mandir" },
          { temple: "Bhuteshwar Mahadev", knownFor: "Shiva as Mathura's guardian", link: "/temples/bhuteshwar-mahadev" },
          { temple: "Vishram Ghat", knownFor: "Yamuna aarti and boat rides", link: "/temples/vishram-ghat" },
        ],
      },
      {
        place: "Nearby Braj",
        rows: [
          { temple: "Radha Rani Temple, Barsana", knownFor: "Hilltop Ladli Ji and Lathmar Holi", link: "/temples/radha-rani-temple-barsana" },
          { temple: "Govardhan, Daan Ghati, Radha Kund", knownFor: "21 km Parikrama", link: "/temples/daan-ghati-govardhan" },
          { temple: "Raman Reti and Chaurasi Khamba, Gokul", knownFor: "Krishna's infancy", link: "/temples/gokul" },
          { temple: "Nand Bhavan, Nandgaon", knownFor: "Krishna's boyhood home", link: "/temples/nand-bhawan-nandgaon" },
        ],
      },
    ],
  },

  explorer: {
    eyebrow: "Temple finder",
    title: "Find your temple",
    text: "Search by name, or narrow the list by town and type. Every temple opens its own guide with darshan and aarti timings, how to reach and what to know.",
    searchLabel: "Search temples",
    allLabel: "All towns",
    emptyText: "No temple matches that search. Try another name or town.",
    timingsLabel: "See all darshan and aarti timings",
  },

  chapters: [
    {
      id: "vrindavan",
      nav: "Vrindavan",
      title: "Top Famous Temples in Vrindavan",
      intro: "Vrindavan is where Krishna's love-play with Radha and the gopis blossomed, and its temples feel different from anywhere else in India. Worship here is intimate, even playful. This **Vrindavan temple guide** begins with the temples nearly every pilgrim asks me about first.",
      entries: [
        entry({
          id: "banke-bihari",
          name: "Shri Banke Bihari Temple Vrindavan",
          link: "/temples/banke-bihari",
          image: { src: "photo:banke-bihari-gate", alt: "Devotees at the carved main gate of Banke Bihari Temple, Vrindavan" },
          points: [
            { label: "What it is known for", text: "**Banke Bihari Temple Vrindavan** is the beating heart of the town. The deity is a dark, enchanting form of Krishna standing in the *tribhanga* pose (bent in three places), which is where the name *banke* comes from. Tradition says he was revealed to the saint-musician **Swami Haridas** at Nidhivan through the force of his singing, and that Radha and Krishna merged into this single form." },
            { label: "The curtain (jhanki) darshan", text: "This is the custom that surprises every first-timer. A curtain in front of the deity is drawn and opened again and again, so you receive darshan in glimpses. Brijwasis say that if you gaze at Bihari ji's eyes without a break, he will captivate you and refuse to let you go. So the pujaris draw the curtain to protect devotees from overwhelming love. Once you know the story, the interruption becomes part of the blessing." },
            { label: "Another unusual custom", text: "There is no regular mangala aarti here, because Bihari ji is worshipped as a playful child who has spent the night in Raas and is allowed to sleep late. The special mangala aarti is held only on **Janmashtami**." },
          ],
          timingTable: {
            title: "Typical darshan timings (approximate)",
            rows: [
              { season: "Summer (about April to September)", morning: "7:45 a.m. to 12:00 noon", evening: "5:30 p.m. to 9:30 p.m." },
              { season: "Winter (about October to March)", morning: "8:45 a.m. to 1:00 p.m.", evening: "4:30 p.m. to 8:30 p.m." },
            ],
          },
          tip: "Go on a weekday, in the first hour after opening. By mid-morning, especially on weekends, Ekadashi and Purnima, the approach lane is shoulder to shoulder. Leave phones, bags and cameras in your vehicle or hotel, because pickpocketing is real in crowds and phones are generally not permitted near the sanctum. Inside the hall, patience pays: moving gently towards the side often gives a longer, clearer look than the central crush. Ignore anyone who offers \"VIP darshan\" for cash in the lane. Elderly pilgrims should come with a family member or our team, as the lanes are narrow and we know the gentlest approach.",
        }),
        entry({
          id: "prem-mandir",
          name: "Prem Mandir",
          link: "/temples/prem-mandir",
          image: { src: "photo:prem-mandir-night", alt: "Prem Mandir in Vrindavan illuminated in blue and white lights at night" },
          points: [
            { label: "What it is known for", text: "Founded by **Jagadguru Kripalu Maharaj** and opened to the public in **2012**, Prem Mandir is a modern marvel of white marble. Its walls are carved with scenes from Krishna's life, from his birth in prison to the lifting of Govardhan and the Raas. Inside you will find Radha-Krishna and Sita-Ram. The sculpted gardens and tableaux outside make it a favourite with families." },
            { label: "The evening lights", text: "After sunset the whole structure glows in shifting colours, and the marble seems lit from within. A musical fountain and illumination show draws large crowds in the evening hours when it is running. I have seen this sight countless times and it still quietens me." },
          ],
          timings: "Typical Prem Mandir timings (approximate): Roughly **5:30 a.m. to 12:00 noon** and **4:30 p.m. to 8:30 p.m.** The light show falls in the evening window. Schedules vary by season, so please confirm the show time on the day.",
          tip: "Visit **twice in one day** if you can. Come in the afternoon light to study the carvings, then stay for the show. Arrive well before sunset, because the best moment is just after the sun goes down, when the sky still holds a little blue and the marble starts to glow. Weekends and festival evenings are packed, so allow extra time for entry and parking. Mobile phones are normally restricted inside the main sanctum, so use the lockers.",
        }),
        entry({
          id: "iskcon",
          name: "ISKCON Temple (Krishna Balaram Mandir)",
          link: "/temples/iskcon-krishna-balaram",
          image: { src: "photo:iskcon", alt: "Decorated altar of Radha Krishna deities at ISKCON Vrindavan" },
          points: [
            { label: "What it is known for", text: "Consecrated in **1975** and founded by **A.C. Bhaktivedanta Swami Prabhupada**, this white marble temple houses the deities of Krishna-Balaram, Radha-Shyamasundar and Gaura-Nitai. Srila Prabhupada's samadhi sits in the courtyard, a quiet corner for reflection." },
            { label: "The kirtan vibes", text: "What I love most is the congregational singing. Devotees from many countries sing and dance in the courtyard, and even sceptical visitors often find themselves clapping along. The temple is clean, orderly and welcoming, which makes it a gentle first stop for families and foreign guests." },
          ],
          timings: "Typical timings: Mangala aarti from around **4:30 a.m.**, a midday closing around 1 p.m., and an afternoon-to-evening session from about **4 p.m. to 8:30 p.m.** Confirm before you go.",
          tip: "Come for the **evening aarti and kirtan**, which have a different mood from the old Goswami temples. If you have time, take the temple prasadam, which is simple, hygienic and satvik. Dress modestly, and walk through the bookshop and museum if you are curious about Vaishnava philosophy.",
        }),
        entry({
          id: "nidhivan",
          name: "Nidhivan",
          link: "/temples/nidhivan",
          image: { src: "photo:nidhivan", alt: "Twisted tulsi trees in Nidhivan Vrindavan sacred grove" },
          points: [
            { label: "What it is known for", text: "Nidhivan is the place I take guests when they ask me, \"Where is the real Vrindavan?\" It is a small, enclosed grove of low, twisted trees, locally believed to be wild tulsi, growing in pairs. It does not look grand. But step in quietly and you feel a stillness unlike anywhere else in town." },
            { label: "The sacred grove and the Raas Leela legend", text: "Braj tradition holds that every night Radha, Krishna and the gopis return to Nidhivan to dance the divine **Raas**, and that the trees become gopis at night and turn back into trees by morning. For this reason the grove is closed after dusk, and local belief says nothing living stays within overnight. Inside stands the **Rang Mahal**. Each evening the priests lay out items for Radha's adornment, along with paan, sweets and water, and lock the doors. Devotees say the offerings are found disturbed in the morning." },
            { label: "", text: "Brijwasis also tell stories of those who tried to watch the grove at night and met misfortune, and they tell them with complete seriousness. I do not argue anyone into belief or out of it. I tell you what Braj has believed for centuries, and I invite you to stand quietly, close your eyes and let your own heart decide." },
            { label: "Nearby", text: "**[Seva Kunj](/temples/seva-kunj)**, believed to be where Radha-Krishna rested after the Raas, and the samadhi of Swami Haridas. I always take guests to all three together." },
          ],
          timings: "Timings: Generally from early morning until dusk, which is roughly 7 to 8 p.m. depending on the season. Confirm before visiting.",
          tip: "Go early in the morning when the grove is silent and the light is soft. Do not leave it for the end of the day, because it closes at dusk and there is no \"night entry,\" whatever anyone tells you. Keep your voice low and follow the photography signs. Hold your glasses and snacks carefully, as the monkeys here are experts.",
        }),
        entry({
          id: "goswami",
          name: "The Historic Seven Goswami Temples of Vrindavan",
          image: { src: "photo:govind-dev", alt: "Red sandstone facade of the 16th-century Govind Dev Ji Temple in Vrindavan" },
          points: [
            { label: "", text: "The **Seven Goswami temples of Vrindavan** (often called the *Sapt Devalaya*) are the spiritual backbone of old Vrindavan. They were established in the sixteenth century by the followers of **Chaitanya Mahaprabhu**, the great saints known as the Goswamis, who rediscovered Braj's lost sacred sites. The commonly listed seven are **Govind Dev, Gopinath, Madan Mohan, Radha Raman, Radha Damodar, Radha Shyamsundar and Radha Gokulananda**." },
            { label: "", text: "A small clarification, since pilgrims ask me this often: some lists of Vrindavan's \"seven\" famous shrines swap in Banke Bihari and Radha Vallabh, so you may see slightly different sets depending on the source. Both are important, but they belong to different devotional traditions from the Goswami set." },
            { label: "", text: "Here is how I introduce the most visited ones." },
          ],
          shrines: [
            { name: "Radha Raman Temple", text: "Perhaps the most beloved of the old shrines. Tradition says the deity self-manifested from a shaligram stone in the sixteenth century for **Gopal Bhatta Goswami**. He is small, around a foot tall, yet extraordinarily beautiful. There is no separate idol of Radha; her presence is honoured by a decorated crown beside the Lord. The temple kitchen is said to have kept a sacred flame burning for centuries. **Harsh's local tip:** The temple is tucked into the old lanes, and vehicles cannot approach the last stretch. We drop you at the nearest convenient point, you take a short walk through the market lanes, and you arrive with energy left to sit in the courtyard. Mornings and early evenings are the most peaceful." },
            { name: "Radha Vallabh Temple", text: "Known for a unique tradition where Radha is the supreme focus and Krishna is represented by a crown beside her, with beautiful devotional singing (*samaj gayan*). It belongs to a separate Radha Vallabh tradition rather than the Goswami set, but it nearly always sits on the same route, so I include it." },
            { name: "Madan Mohan Temple", text: "One of the oldest temples in Vrindavan, on a high bank near the Yamuna. The deity here is associated with **Sanatana Goswami**, and the temple's history includes the deity being moved for safety in turbulent times." },
            { name: "Govind Dev Ji Temple", text: "Once a towering sixteenth-century structure of red sandstone. Even in its partial state it shows the scale of Vrindavan's early temple building." },
            { name: "Gopinath, Radha Damodar, Radha Shyamsundar and Radha Gokulananda", text: "Quieter shrines, each carrying a saint's story. Radha Damodar is linked with **Rupa Goswami**, and Radha Gokulananda stands near Keshi Ghat." },
          ],
          tipLabel: "Harsh's overall tip for these temples",
          tip: "They suit a slow morning on foot. Start at Radha Raman, then walk to Radha Vallabh and Madan Mohan, and keep Banke Bihari for its own time slot.",
        }),
        entry({
          id: "rangji",
          name: "Shri Rangji Temple",
          link: "/temples/rangji",
          image: { src: "photo:rangji", alt: "Tall white gopuram gateway of Shri Rangji Temple in Vrindavan" },
          points: [{ label: "What it is known for", text: "Rangji Mandir looks different from every other temple in town. Built in the mid-nineteenth century in the **South Indian Dravidian style**, it has a tall gopuram, a vast courtyard and a metal-plated flagstaff. It is dedicated to **Lord Ranganatha**, Vishnu reclining on the serpent Shesha, in the Sri Vaishnava tradition." }],
          timings: "Timings (approximate): Morning and evening sessions with a midday closure, roughly 6 a.m. to noon and 4 p.m. to 8 p.m. Entry rules for certain areas can differ, so please check on the day.",
          tip: "I bring guests here because it shows how wide Vrindavan's devotion is. In a few kilometres you move from the playful child Krishna to the majestic Vishnu of the South. The annual **Brahmotsav** in spring brings grand processions.",
        }),
      ],
      moreTitle: "More Vrindavan Temples Worth Your Time",
      more: [
        { name: "Jaipur Mandir", text: "A pink sandstone temple built by the Jaipur royal family." },
        { name: "Pagal Baba Temple", text: "A multi-storey white marble temple with views over the town." },
        { name: "Gopeshwar Mahadev", text: "A rare Shiva temple where Shiva is believed to have come in the form of a gopi to join the Raas." },
        { name: "Shahji Temple", text: "Known for its spiral marble columns." },
        { name: "Keshi Ghat", text: "On the Yamuna, a lovely place for a quiet evening and a small aarti." },
      ],
    },
    {
      id: "mathura",
      nav: "Mathura",
      title: "Top Famous Temples in Mathura",
      intro: "Mathura is where it all began: Krishna's birth, Kamsa's fall and the rise of Braj's holy geography. These are the **temples to visit in Mathura** that I recommend to every guest.",
      entries: [
        entry({
          id: "janmabhoomi",
          name: "Shri Krishna Janmabhoomi Mathura",
          link: "/temples/krishna-janmabhoomi",
          image: { src: "photo:janmabhoomi", alt: "Pink sandstone temple at the Shri Krishna Janmabhoomi complex in Mathura" },
          points: [
            { label: "History", text: "**Shri Krishna Janmabhoomi Mathura** marks the place where Krishna is believed to have been born to Devaki and Vasudeva in Kamsa's prison. The site is also known as Katra Keshav Dev, and over the centuries successive temples stood on or near this ground. Today the complex includes the **Garbha Griha** (the prison-cell shrine), the **Keshav Dev Temple** and the Bhagavat Bhavan, with gardens and smaller shrines." },
            { label: "Security rules and lockers", text: "The complex has strict security checks. Mobile phones, cameras, bags, electronics and often even small items are not allowed inside. There are cloakroom and locker facilities outside the entrance. Carry only what you truly need." },
          ],
          timings: "Timings (approximate): Roughly **5 a.m. to 12 noon** and **3 p.m. to 8 p.m.**, with seasonal variations.",
          tip: "The entry gate and queue arrangement are decided by the authorities and can change, so I always check on the day which entrance is in use, and I walk my guests to the correct one, away from touts. Please do not hand your phone to strangers in the lane who offer to \"keep it safe.\" Use the official counter. Come early for shorter security queues. And once you reach the Garbha Griha, do not rush. Stand still for a few moments and let the weight of the place settle. For many of my guests this is the most emotional minute of the whole trip. During **Janmashtami**, queues can run for hours, so book well ahead.",
        }),
        entry({
          id: "dwarkadhish",
          name: "Dwarkadhish Temple",
          link: "/temples/dwarkadhish",
          image: { src: "photo:dwarkadhish", alt: "Painted courtyard and carved balconies of Dwarkadhish Temple, Mathura" },
          points: [{ label: "History", text: "Built in the early nineteenth century (1814), the Dwarkadhish Temple is a beautiful haveli-style temple with carved pillars, painted ceilings and **Rajasthani architecture**. It follows the Pushtimarg tradition, in which the deity is cared for like a beloved child with seasonal dress and carefully planned offerings. It is especially colourful during **Holi, Jhulan Yatra and Hindola**." }],
          timings: "Timings (approximate): Open from early morning until late morning, then reopens in the afternoon until early evening. Darshan in this tradition is divided into short windows (*jhankis*), so the schedule is not continuous.",
          tip: "The temple is close to the **Yamuna ghats**, so I combine it with **Vishram Ghat**. Start at the ghat at sunrise, walk the short distance to Dwarkadhish and finish before the main rush. The temple's sweets and prasad are excellent, but buy from the official counters.",
        }),
        entry({
          id: "gita-mandir",
          name: "Gita Mandir (Birla Mandir)",
          link: "/temples/gita-mandir",
          points: [{ label: "History", text: "Built by the Birla family and completed in the mid-twentieth century (1946), this red sandstone temple is also known as the **Gita Mandir** because the **Bhagavad Gita is inscribed on its pillars**, making the temple a place to read as well as pray. A tall *Gita Stambh* adds to the effect." }],
          timings: "Timings (approximate): Open morning to midday and again from afternoon to evening.",
          tip: "It is a calm, spacious, uncrowded place, perfect for seniors and for a mid-afternoon rest on the road between Mathura and Vrindavan. Spend ten minutes reading the verses on the pillars. Many of my guests say this was their quietest stop.",
        }),
        entry({
          id: "bhuteshwar",
          name: "Bhuteshwar Mahadev",
          link: "/temples/bhuteshwar-mahadev",
          points: [{ label: "History", text: "Bhuteshwar Mahadev is one of Mathura's most ancient Shiva shrines. In Braj tradition, **Shiva is the guardian of Mathura**, the Kshetrapal who protects Krishna's land, and a pilgrimage to Mathura is traditionally incomplete without his darshan. The temple is also counted as a Shakti Peeth." }],
          timings: "Timings (approximate): Early morning until night, generally.",
          tip: "Visit in the morning or on a Monday if you want a devotional atmosphere. Offer simple bel leaves and water, and skip anyone offering \"special pujas\" from the roadside.",
        }),
      ],
      moreTitle: "More Mathura Temples and Sites to Consider",
      more: [
        { name: "Vishram Ghat", text: "The most important ghat in Mathura, where Krishna is said to have rested after slaying Kamsa. The evening **Yamuna aarti** is intimate and local, a pleasing contrast to the grand riverside aartis of other cities." },
        { name: "Jugal Kishore Temple", text: "Among the oldest temples of the region, near the Yamuna." },
        { name: "Krishna Kubja Temple and Adi Varaha Temple", text: "Smaller shrines for those who want to go deeper into Mathura's old stories." },
        { name: "Kans Qila", text: "The ruins associated with Kamsa's fort." },
      ],
    },
    {
      id: "braj",
      nav: "Nearby Braj",
      title: "Must-Visit Temples in Nearby Braj Towns",
      intro: "A true Braj darshan reaches beyond Mathura and Vrindavan. These sites are why I recommend a three-day itinerary to anyone who can manage it.",
      entries: [
        entry({
          id: "barsana",
          name: "Barsana: Shri Radha Rani Temple (Ladli Ji)",
          link: "/temples/radha-rani-temple-barsana",
          image: { src: "photo:radha-rani-barsana", alt: "Devotees in the courtyard of Shri Radha Rani Temple, Barsana" },
          points: [
            { label: "", text: "Barsana is Radha's village, and the **Radha Rani Temple (Ladli Ji)** sits on the hilltop of Bhanugarh. You climb a long flight of steps, a couple of hundred, to reach it. The climb is part of the experience, with devotees singing, children racing ahead and old women resting at the landings." },
            { label: "", text: "Barsana is also the home of **Lathmar Holi**, when women playfully strike visiting men with sticks in a celebration that is more joyful than rough. Other sites here include **Maan Mandir** and **Kirti Mandir**, a rare temple dedicated to Radha's mother." },
          ],
          tip: "Reach early and climb before the sun and the crowd build up. Seniors can ask about the options for reaching the top with help. During Holi and Radhashtami, stay overnight nearby and visit at opening time.",
        }),
        entry({
          id: "govardhan",
          name: "Govardhan: Daan Ghati and the Parikrama",
          link: "/temples/daan-ghati-govardhan",
          image: { src: "photo:daan-ghati", alt: "Temple pavilion with a sculpted Govardhan hill at Daan Ghati, Govardhan" },
          points: [
            { label: "", text: "Govardhan is the sacred hill Krishna lifted on his little finger to shelter the villagers from Indra's rain. The **Govardhan Parikrama** is a walk of about **21 km** around the hill, and devotees consider it among the most rewarding acts in Braj." },
            { label: "", text: "Key stops include **Daan Ghati**, the Giriraj temple where tradition says Krishna collected a playful toll from the gopis, as well as **Mansi Ganga**, **Haridev Temple**, **Kusum Sarovar** and **Radha Kund and Shyam Kund**, two of the holiest water bodies in Braj." },
          ],
          tip: "Walk in winter at dawn, when the air is cool. In summer, start before sunrise or do it with vehicle support. We arrange stage-by-stage help for those who cannot walk the full distance. Carry water and keep your footwear handy for road stretches.",
        }),
        entry({
          id: "gokul",
          name: "Gokul: Raman Reti and Chaurasi Khamba",
          link: "/temples/gokul",
          image: { src: "photo:gokul", alt: "A small temple gateway in the village of Gokul near Mathura" },
          points: [
            { label: "", text: "Gokul is where Krishna spent his infancy. **Raman Reti** is a stretch of soft, fine sand where the baby Krishna is said to have crawled and played. Pilgrims often roll or sit on it, touching the sand to their foreheads. **Chaurasi Khamba** (the 84-pillar hall), linked with Nanda Bhavan in Mahavan, is a quiet, atmospheric stop." },
            { label: "", text: "Gokul also has the **Gokulnath Temple** (an important Pushtimarg seat) and **Brahmand Ghat**, where Krishna is said to have shown Yashoda the universe inside his mouth." },
          ],
          tip: "Wear clothes you do not mind getting sandy at Raman Reti, and visit in the morning or late afternoon.",
        }),
        entry({
          id: "nandgaon",
          name: "Nandgaon: Nand Bhavan",
          link: "/temples/nand-bhawan-nandgaon",
          image: { src: "photo:nandgaon-holi", alt: "Crowds celebrating Holi with bright colours in Nandgaon" },
          points: [{ label: "", text: "Nandgaon is where Krishna was raised by Nanda Baba and Yashoda. The **Nand Bhavan** (Nand Mahal) temple sits on a hillock and is reached by steps, with views over the village. During Holi, Nandgaon celebrates the day after Barsana, when the men of Nandgaon visit Barsana and the playful tradition continues." }],
          tip: "Combine Nandgaon with Barsana on the same day, since they are close, and keep your phone safe during festival days.",
        }),
      ],
      moreTitle: "",
      more: [{ name: "", text: "" }],
    },
  ],

  planner: {
    eyebrow: "Planning",
    title: "Mathura Temple Timings and Darshan Planning",
    intro: "Here is a quick planning table of **Mathura temple timings** and Vrindavan timings. These are approximate patterns, not official schedules.",
    columns: { temple: "Temple", morning: "Typical morning", evening: "Typical evening", best: "Best window" },
    rows: [
      { temple: "Banke Bihari", morning: "Summer 7:45 to 12:00 · Winter 8:45 to 1:00", evening: "Summer 5:30 to 9:30 · Winter 4:30 to 8:30", best: "Weekday, first hour" },
      { temple: "Prem Mandir", morning: "About 5:30 to 12:00", evening: "About 4:30 to 8:30", best: "Late afternoon into evening show" },
      { temple: "ISKCON", morning: "From about 4:30", evening: "About 4:00 to 8:30", best: "Evening aarti" },
      { temple: "Nidhivan", morning: "Early morning", evening: "Closes at dusk", best: "Early morning" },
      { temple: "Krishna Janmabhoomi", morning: "About 5:00 to 12:00", evening: "About 3:00 to 8:00", best: "Opening hour" },
      { temple: "Dwarkadhish", morning: "Early morning to late morning", evening: "Afternoon to early evening", best: "Morning" },
      { temple: "Gita Mandir", morning: "Morning to midday", evening: "Afternoon to evening", best: "Mid-afternoon" },
      { temple: "Radha Raman", morning: "Morning session", evening: "Evening session", best: "Morning" },
    ],
    planTitle: "How I plan a darshan day",
    planText: "Because many temples close in the afternoon, I build the day in two halves. The first half is early darshan, ending around late morning. Then comes lunch and a real rest. The second half is evening darshan, aarti and, if we are in Vrindavan, the Prem Mandir lights. This rhythm of **Mathura Vrindavan darshan** protects your energy and gets you the most peaceful moments.",
    fullTimetableLabel: "Open the full temple timetable",
  },

  etiquette: {
    eyebrow: "On the ground",
    title: "Temple Etiquette and Logistics for Pilgrims",
    blocks: [
      {
        title: "Dress code for Braj temples",
        text: "There is no strict uniform, but **modest, traditional clothing** is expected. Cover shoulders and knees. Cotton kurtas, salwar suits, saris, or simple shirts and trousers are all fine. Avoid very short or sleeveless outfits. In winter, carry a shawl and socks, because marble floors are cold. Footwear is removed outside, so wear **slip-ons**, and carry a small bag or ask us to look after your shoes.",
        list: [{ label: "", text: "" }],
        closing: "",
      },
      {
        title: "How to handle monkeys",
        text: "This is the insider tip I give everyone, and the one people ignore until it is too late: **Vrindavan's monkeys are clever and fearless.** They steal spectacles, phones, water bottles, snacks and prasad bags from hands.",
        list: [
          { label: "Do not wear glasses on your head or hang them from your collar.", text: "If you can, wear them only when needed, or use a strap." },
          { label: "Keep phones, snacks and loose items inside a zipped cross-body bag.", text: "" },
          { label: "Do not make eye contact, wave your hands or show your teeth.", text: "Walk calmly." },
          { label: "Never feed them or try to snatch things back.", text: "A shopkeeper will usually help you trade for a packet of juice or a banana." },
          { label: "Do not carry prasad openly.", text: "Keep it inside a bag until you are out of the lane." },
        ],
        closing: "",
      },
      {
        title: "Using e-rickshaws between temples",
        text: "Many of Vrindavan's core temples are in tight lanes where cars cannot enter. **E-rickshaws** are the local answer.",
        list: [
          { label: "Agree the fare before you sit,", text: "and confirm whether it is per person or for the whole vehicle." },
          { label: "Use them for short hops", text: "within the old town and between drop-off points and temple lanes." },
          { label: "Keep your valuables in front of you.", text: "Lanes get crowded and seats are shared." },
          { label: "Our guests have an advantage.", text: "We pre-arrange drop-off points and walking routes, so you are never guessing where to get off." },
        ],
        closing: "For the longer journey between Mathura and Vrindavan, roughly 11 to 15 km and 30 to 45 minutes depending on traffic, a private car is the most comfortable choice, especially for seniors and families.",
      },
      {
        title: "Photography, offerings and general courtesy",
        text: "",
        list: [
          { label: "", text: "Photography is generally **restricted inside sanctums** at major temples. Follow signs and staff instructions." },
          { label: "", text: "Offer **simple things**: flowers, tulsi leaves, pedas or a small donation. You are never required to give large amounts." },
          { label: "", text: "Politely decline anyone who insists on a ritual or demands money in the lane." },
          { label: "", text: "Say **\"Radhe Radhe\"** to people you meet. It opens doors in Braj." },
        ],
        closing: "",
      },
      {
        title: "Where to stay",
        text: "After a long day of walking and darshan, a comfortable room matters more than pilgrims expect. We arrange simple ashram or dharamshala stays for those who prefer them, and we also curate **premium bookings at top 4-star and 5-star hotels** near the major temples for a calm, hassle-free yatra, particularly useful in festival months when good rooms disappear early.",
        list: [{ label: "", text: "" }],
        closing: "",
      },
    ],
  },

  faqSection: { eyebrow: "Questions", title: "Frequently Asked Questions About Mathura Vrindavan Temples" },
  faqs: [
    { q: "How many temples are there in Mathura and Vrindavan?", a: "Vrindavan alone is commonly estimated to have more than 5,000 temples, and Mathura and the wider Braj region add many more, most of them dedicated to Radha and Krishna. For a first visit, the meaningful number is smaller: about ten to fifteen famous temples across both towns." },
    { q: "Which temple should I visit first in Vrindavan?", a: "For most pilgrims I recommend **Banke Bihari** first, on a weekday soon after opening, before the lanes fill up. Then visit the quieter Goswami temples, and keep **Prem Mandir** for the evening lights." },
    { q: "Which temple should I visit first in Mathura?", a: "Begin at **Vishram Ghat** at sunrise, as pilgrims have traditionally done, and then go to **Shri Krishna Janmabhoomi** when it opens, when the security queue is shortest." },
    { q: "Are phones allowed inside Mathura Vrindavan temples?", a: "In many major temples, including Krishna Janmabhoomi and often Banke Bihari and Prem Mandir's inner sanctum, mobile phones, cameras and bags are restricted. Lockers or cloakrooms are usually available nearby. Rules can change, so check on the day, or leave valuables in your vehicle or hotel." },
    { q: "What is the best time for temple darshan?", a: "**Early morning on a weekday** and **evening aarti** are the calmest and most beautiful windows. Mid-morning on weekends is the busiest time of all. In terms of season, October to March is the most comfortable." },
    { q: "What are the Prem Mandir timings?", a: "Roughly 5:30 a.m. to 12 noon and 4:30 to 8:30 p.m., with the evening light show after sunset. Schedules vary by season, so confirm before you go." },
    { q: "What are the Banke Bihari Temple timings?", a: "In summer, about 7:45 a.m. to noon and 5:30 to 9:30 p.m. In winter, about 8:45 a.m. to 1 p.m. and 4:30 to 8:30 p.m. Timings and crowd rules can be revised, so always reconfirm." },
    { q: "What are the seven Goswami temples of Vrindavan?", a: "Govind Dev, Gopinath, Madan Mohan, Radha Raman, Radha Damodar, Radha Shyamsundar and Radha Gokulananda, established by the followers of Chaitanya Mahaprabhu. Some lists include Banke Bihari and Radha Vallabh as separately important temples." },
    { q: "Is there an entry fee for temples in Mathura and Vrindavan?", a: "Nearly all are free to enter, with donations optional. A few places may charge a small fee for specific sections, special darshan or museums." },
    { q: "How many days do I need to see the main temples?", a: "Two days for the major temples of Mathura and Vrindavan. Three days if you want to add Govardhan, Barsana, Gokul and Nandgaon. Four or five days make a relaxed, deeper yatra." },
    { q: "Why is Nidhivan closed at night?", a: "Tradition holds that Radha, Krishna and the gopis perform the Raas Leela in the grove every night, and nobody is allowed to stay. The grove closes at dusk and reopens in the morning." },
    { q: "Is the Govardhan Parikrama difficult?", a: "It is about 21 km. Many devotees walk barefoot, but you can walk part of it or use vehicle support between key stops. Winter dawn is the most comfortable time." },
    { q: "Is it safe for senior citizens and women travelling alone?", a: "Main temple areas are generally safe in daylight. Avoid isolated lanes at night, keep valuables out of sight and travel with a trusted driver. We plan gentler routes, rest breaks and e-rickshaw or wheelchair help for seniors." },
    { q: "What is the dress code for Braj temples?", a: "Modest clothing that covers shoulders and knees. Slip-on footwear is practical because you will remove it often." },
    { q: "How far is Vrindavan from Mathura?", a: "Roughly 11 to 15 km, usually 30 to 45 minutes by road, longer on festival days." },
  ],

  book: {
    eyebrow: "Book your spiritual journey",
    title: "Mathura Vrindavan Darshan with Local Brijwasis",
    paragraphs: [
      `You can read about a temple a hundred times, but standing before the deity is different, and walking the right lane at the right hour changes everything. That is what I and my team of local Brijwasis do for pilgrims. Since **${FOUNDED}**, **Mathura Vrindavan Trips** has guided **over 75,000 pilgrims**, and our guests have given us a **${RATING}-star rating**.`,
      `Our **customised packages start from just ${formatInr(STARTING_PRICE)}**, with clear written quotes and no hidden charges. We plan your darshan around temple timings and crowd patterns, and we can book comfortable stays at **top 4-star and 5-star hotels near the major temples**, so your yatra is stress-free from the first temple bell to the last aarti.`,
      "Tell me your dates, how many people are travelling and what matters most to you, such as elderly parents, young children or a special festival. I will reply personally with a plan that suits you.",
    ],
    trust: [`Serving pilgrims since ${FOUNDED}`, `${RATING}-star rated`, `${PILGRIMS} pilgrims guided`, `Packages from ${formatInr(STARTING_PRICE)}`],
    blessing: "Braj does not ask you to be perfect. It only asks you to come.",
    closing: "Radhe Radhe.",
    signature: `${FOUNDER.name}, Founder, Mathura Vrindavan Trips. Call or WhatsApp ${PHONE_DISPLAY}.`,
  },
};
