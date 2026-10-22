import { BRAND_NAME, FOUNDED, FOUNDER, PILGRIMS, RATING, STARTING_PRICE, YEARS, formatInr, phoneHref } from "@/config/site";
import { getTemple } from "./temples";

/*
 * About page copy — taken word for word from AboutUsContent.pdf (Harsh Sharma's letter).
 * Do not paraphrase. Inline markup understood by <RichText line>:
 *   ***bold italic***   **bold**   *italic*   [link text](href)
 * The PDF's "Quick Notes for Your Web Team" are not published; they are handled in config and schema.
 */

/** Inline-markup string (see above). */
export type Rich = string;

export type AboutImage = { src: string; width: number; height: number; alt: string };

const price = formatInr(STARTING_PRICE);
const tel = phoneHref() ?? "/contact";

/** Links a temple name to its page only when that page exists. */
function temple(name: string, slug: string): Rich {
  return getTemple(slug) ? `[${name}](/temples/${slug})` : name;
}

export const ABOUT_PATH = "/about";
export const PACKAGES_PATH = "/tour-packages";

export const aboutMeta = {
  /** ≤ 60 chars. The PDF's suggestion ("…Your Local Braj Guide Since 2015", ~79 chars) would be truncated in results. */
  title: `About ${BRAND_NAME} | ${FOUNDER.name}, Since ${FOUNDED}`,
  /** ≤ 160 chars. */
  description: `Meet ${FOUNDER.name}, a Mathura-born guide with ${YEARS} years' experience. Braj tour packages from ${price}, ${RATING}★ rating, ${PILGRIMS} pilgrims. Call +91 99975 28849.`,
};

/* ------------------------------------------------------------------ */
/* Images — placeholders in /public/images/about/, alt text from the PDF */
/* ------------------------------------------------------------------ */

export const aboutImages = {
  founder: {
    src: "/images/about/harsh-sharma-mathura-lane.webp",
    width: 960,
    height: 1200,
    alt: "Harsh Sharma, founder of Mathura Vrindavan Trips, standing in a Mathura lane near a temple",
  },
  /** Open Graph / social card (1200 × 630). JPEG, because several social networks still ignore WebP. */
  founderOg: {
    src: "/images/about/harsh-sharma-og.jpg",
    width: 1200,
    height: 630,
    alt: "Harsh Sharma, founder of Mathura Vrindavan Trips, standing in a Mathura lane near a temple",
  },
  lane: {
    src: "/images/about/mathura-old-city-lane-vishram-ghat.webp",
    width: 1600,
    height: 900,
    alt: "Narrow old-city lane in Mathura near Vishram Ghat at sunrise",
  },
  elders: {
    src: "/images/about/elderly-pilgrims-darshan-vrindavan.webp",
    width: 1200,
    height: 900,
    alt: "Elderly pilgrim couple receiving darshan guidance in Vrindavan from a local Mathura guide",
  },
  milestone: {
    src: "/images/about/pilgrim-family-prem-mandir.webp",
    width: 1600,
    height: 900,
    alt: "Happy pilgrim family outside Prem Mandir Vrindavan after a Mathura Vrindavan Trips tour",
  },
  team: {
    src: "/images/about/team-local-brijwasis.webp",
    width: 1600,
    height: 900,
    alt: "Mathura Vrindavan Trips team of local drivers and guides with pilgrims in Braj",
  },
  contact: {
    src: "/images/about/contact-braj-tour-packages.webp",
    width: 1200,
    height: 900,
    alt: `Contact Mathura Vrindavan Trips for authentic Braj tour packages from ${price}`,
  },
} satisfies Record<string, AboutImage>;

/* ------------------------------------------------------------------ */
/* Copy                                                                */
/* ------------------------------------------------------------------ */

export const aboutHero = {
  title: "About Mathura Vrindavan Trips: Your Local Companions in Braj Bhoomi",
  greeting: "**Radhe Radhe, and welcome home.**",
  paragraphs: [
    "I am Harsh Sharma, and I am glad you found this page. Before you book anything or compare any prices, I want you to know who is on the other side of the phone. **About Mathura Vrindavan Trips** is really a story about one family of Brijwasis who love this land, and who believe that bringing a pilgrim to Braj is not a job. It is Seva.",
    "I was born in Mathura. I have spent more than eleven years guiding pilgrims through its lanes, ghats and temples, and since 2015 I have run Mathura Vrindavan Trips as a **local travel agency** with one purpose: that every devotee who comes to Braj goes home with a full heart, a light mind and no regrets.",
  ] as Rich[],
  leadOut: "Think of this page as a letter from me to you. Please read it slowly.",
  trust: [`Born in ${FOUNDER.bornIn}`, `Since ${FOUNDED}`, `${YEARS} Years Guiding`, `${RATING}★ Rating`, `${PILGRIMS} Pilgrims`],
};

export const aboutStory = {
  id: "my-story",
  eyebrow: "My story",
  title: "My Story: The Boy from Mathura",
  paragraphs: [
    "I grew up in the old part of Mathura, in lanes so narrow that two cycles could barely pass each other. My mornings did not begin with an alarm clock. They began with temple bells, the call of the milkman, and the smell of kachoris frying in iron kadhais. My grandmother would wake us before sunrise, and we would walk to the Yamuna. In Braj we never say \"the river.\" We say **Yamuna Maiya**, Mother Yamuna, and every child here learns that before learning the alphabet.",
    "As a boy I thought everyone's life sounded like this. Evening aarti drifting across rooftops, strangers greeting each other with \"Radhe Radhe\", old women singing bhajans while sorting flowers on their doorsteps. It was only later that I understood how rare it is to be born inside a living pilgrimage.",
  ] as Rich[],
  /** Rendered as a pull quote: the opening sentence large, the rest of the paragraph beneath it. */
  pullQuote: {
    lead: "I learned this land the way you learn a mother tongue.",
    rest: `Nobody sat me down and taught me. I picked up which lane leads to which temple, which pujari is honest, which sweet shop makes its peda fresh that morning, and which hour of the day the crowds thin out at ${temple("Banke Bihari", "banke-bihari")}. **Over 11 years of guiding** have only sharpened what childhood gave me.`,
  },
  connection: {
    title: "My connection to Radha and Krishna",
    paragraphs: [
      `In Braj, we do not say "Krishna" alone. We say **Radhe Radhe**, because this is Radha Rani's kingdom, and Krishna is the Lord who waits at her door. I have stood at ${temple("Nidhivan", "nidhivan")} at dusk and at Radha Kund before dawn so many times that I have lost count, and each time I feel the same quiet wonder. Faith here is not something I had to find. It was in the air I breathed as a child.`,
      `That is also why people who search for [**Harsh Sharma Mathura guide**](${tel}) usually find me answering my own phone. I would not want it any other way.`,
    ] as Rich[],
  },
};

export const aboutWhy = {
  id: "why-we-started",
  eyebrow: "Since 2015",
  title: "Why We Started in 2015",
  story: [
    "The idea for Mathura Vrindavan Trips came from a painful sight, and I still remember it clearly.",
    "One winter, I met a family from Pune at Mathura Junction. The grandfather had saved for years to see Banke Bihari ji. Within an hour of arriving, he had been overcharged by one tout, rushed by another, and promised a \"special VIP darshan\" by a third. He looked exhausted and a little heartbroken. He had come for peace and was being treated like a purse.",
    `I took the family under my wing that day. I walked them to ${temple("Vishram Ghat", "vishram-ghat")}, then ${temple("Krishna Janmabhoomi", "krishna-janmabhoomi")}, and next morning to Vrindavan, timing it so they would reach Banke Bihari before the heaviest crowd. When the old man finally stood before the deity, he held my hand and wept without a word. I understood then what my life's work was.`,
  ] as Rich[],
  /** "rush, tick, move on." is given extra emphasis by the renderer. */
  conveyor: {
    before: "Too many tours in Braj were built like conveyor belts: ",
    emphasis: "rush, tick, move on.",
    after: " Pilgrims were hurried through temples they had waited a lifetime to see. Some were pushed towards expensive rituals they never asked for. The sacred was being treated as a commodity, and it broke my heart.",
  },
  promisesIntro: "So in **2015**, I started Mathura Vrindavan Trips with a very small team and four promises:",
  promises: [
    { icon: "shield", text: "No tricks." },
    { icon: "clock", text: "No rushing." },
    { icon: "eye-off", text: "No fake darshan." },
    { icon: "receipt", text: "No hidden charges." },
  ] as const,
  closing: "More than a decade later, I still run the company on those four promises. They are not marketing lines. They are the reason I can look pilgrims in the eye.",
};

export const aboutPhilosophy = {
  id: "our-philosophy",
  eyebrow: "Our philosophy",
  title: "Our Philosophy: Seva Over Business",
  /** One PDF paragraph, split around the sentence shown in the crimson quote panel. */
  intro: "We have a saying in India that I grew up on: ***Atithi Devo Bhava***, the guest is God. In Braj, I would put it more simply.",
  quote: "Every pilgrim who arrives is a guest of Radharani.",
  introAfter: "She has called you here, and it is our privilege to look after you while you are in her home.",
  beliefsIntro: "That belief shapes everything we do:",
  beliefs: [
    { icon: "hourglass", lead: "We slow down.", text: "If you want to sit quietly at a temple for an extra half hour, we wait. Nobody is looking at a watch." },
    { icon: "shield", lead: "We protect you.", text: "From touts, from overcharging, from overcrowded timings. We choose darshan hours carefully so you are not pushed around." },
    { icon: "footprints", lead: "We respect your pace.", text: "Elderly parents, small children and first-time visitors all get a different plan. Nobody is handed a template." },
    { icon: "receipt", lead: "We keep it honest.", text: "You will know what is included and what is not, in writing, before you pay anything." },
  ] as const,
  luxury: {
    title: "Pilgrimage should not be a luxury",
    paragraphs: [
      `I believe a trip to Braj belongs to everyone, not only to those who can afford expensive packages. That is why our [**authentic Braj tour packages start from just ${price}**](${PACKAGES_PATH}). The price is not low because we cut corners on care. It is low because I refuse to make a pilgrim's yatra a thing only for the wealthy.`,
      "We also offer customised options for families who want more comfort, and I will always tell you plainly what each choice costs and what it gives you. If a simpler option will serve you well, I will say so, even if it means we earn less.",
    ] as Rich[],
  },
};

export const aboutMilestone = {
  id: "milestone",
  eyebrow: "The milestone",
  title: "The Milestone: 75,000+ Pilgrims and a 4.9-Star Rating",
  intro: "When people ask me what I am proudest of, I do not talk about growth or business. I talk about two numbers that mean everything to me.",
  pilgrims: {
    /** Count-up target; must match PILGRIMS ("75,000+"). */
    value: 75000,
    display: PILGRIMS,
    title: "75,000+ pilgrims guided",
    paragraphs: [
      "Since 2015 we have had the honour of guiding **over 75,000 pilgrims** through Mathura, Vrindavan, Govardhan, Barsana, Gokul and the wider Braj region. Each of them arrived with a different reason. Some came to fulfil a vow. Some came to scatter a loved one's ashes. Some came for a newborn's first darshan, and some came simply because a quiet voice inside would not let them rest.",
      "I do not see 75,000 customers. I see a grandmother touching the sand of Raman Reti to her forehead, a young couple seeking blessings before their wedding, and a Bengali gentleman who sat with me in silence at Nidhivan and whispered, \"Now I can go in peace.\" Behind every number is someone who trusted us with something sacred.",
    ] as Rich[],
    /** Visual echo of the paragraph above (the paragraph itself is always shown in full). */
    remembered: [
      { who: "A grandmother", moment: "touching the sand of Raman Reti to her forehead" },
      { who: "A young couple", moment: "seeking blessings before their wedding" },
      { who: "A Bengali gentleman", moment: "who sat with me in silence at Nidhivan and whispered, \"Now I can go in peace.\"" },
    ],
  },
  rating: {
    value: RATING,
    title: "A 4.9-star rating",
    paragraphs: [
      "Our **4.9-star rating** was never chased. We have not bought reviews or begged for them. It grew because guests went home and told their families, their neighbours and their temple groups. Many of the messages I receive still make me emotional. Some of them I have kept for years.",
      "A rating like this is not something to relax on. It is a promise I have to keep for every new pilgrim, every single time. That is why, if you are looking for the **best tour operator in Mathura Vrindavan**, I do not ask you to take my word for it. I ask you to read what our guests say, and then call me and ask me anything you like.",
    ] as Rich[],
  },
};

export const aboutTeam = {
  id: "our-team",
  eyebrow: "Our team",
  title: "Our Team of Local Brijwasis",
  intro: "I am not alone in this work. Everyone on our team is a **local Brijwasi**, born here or raised here, and most of us grew up hearing the same bells and the same bhajans. We are drivers, coordinators and guides who know Braj the way you know your own street.",
  knowledgeIntro: "That local knowledge matters in ways a brochure never can:",
  knowledge: [
    { icon: "map", lead: "Hidden alleys and shortcuts", text: "that save you time and walking." },
    { icon: "clock", lead: "The best darshan timings", text: ", season by season, so you avoid the worst crowds." },
    { icon: "user-check", lead: "Honest pandits and shopkeepers", text: ", and the ones to politely steer clear of." },
    { icon: "utensils", lead: "Where to eat well", text: ", from fresh Mathura peda to kulhad lassi and hot kachori-sabzi." },
    // TODO(owner): the PDF's web-team notes ask you to verify the "4 and 5-star hotel partners" claim before publishing.
    { icon: "hotel", lead: "Comfortable, trusted 4 and 5-star hotel partners", text: ", along with simpler stays, so your rest after a long day of temple walking is peaceful and hassle-free." },
  ] as const,
  drivers: "Our drivers are not just people behind a steering wheel. They are gentle with elders, patient with children, and they wait without complaint while you take your time in prayer.",
  /** Shown in the cream callout. */
  local: "As a **Mathura local travel agency**, our greatest strength is simple: **we live here.** If something goes wrong on your trip, you will not be calling a faraway call centre. You will be talking to someone who can reach you within minutes.",
};

export const aboutContact = {
  id: "contact-harsh",
  eyebrow: "Plan your yatra",
  title: "Come to Braj. Let Us Take Care of the Rest.",
  paragraphs: [
    "If you have read this far, thank you. It tells me you care about doing this yatra properly, and so do I.",
    "Whether you are planning a quick one-day visit, a two-day Radha Krishna yatra, or a deeper journey through Govardhan, Barsana and Gokul, I would be honoured to help. Tell me your dates, how many people are travelling, and anything that matters to you, such as elderly parents, young children or a special festival. I will reply personally with a clear plan and a transparent quote.",
  ] as Rich[],
  lines: {
    phone: { emoji: "📞", label: "Call or WhatsApp Harsh Sharma:" },
    email: { emoji: "✉️", label: "Email:" },
    website: { emoji: "🌐", label: "Website:", value: "https://vrindavanmathuratrip.com/" },
  },
  whatsappMessage: "Radhe Radhe Harsh ji! I read your letter on the About page and would like to plan a Braj yatra. Our dates: … Number of travellers: …",
  statsLabel: "Mathura Vrindavan Trips",
  stats: [`serving pilgrims since ${FOUNDED}`, `⭐ ${RATING}-star rated`, `🙏 ${PILGRIMS} pilgrims guided`, `Packages from ${price}`],
  closing: "Braj does not ask you to be perfect. It only asks you to come. The rest is between you and Thakur ji.",
  farewell: "**Radhe Radhe.** 🙏",
  signature: "— Harsh Sharma, Founder, Mathura Vrindavan Trips",
};
