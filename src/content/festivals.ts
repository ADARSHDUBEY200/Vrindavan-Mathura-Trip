import type { PhotoKey } from "./images";
import type { Faq, Section } from "./types";

export type Festival = {
  slug: string;
  name: string;
  /** Approximate time of year — exact dates follow the Hindu lunar calendar. */
  months: string;
  places: string[];
  image: PhotoKey;
  summary: string;
  sections: Section[];
  tips: string[];
  faqs: Faq[];
  packageSlug?: string;
};

export const DATE_ADVICE =
  "Festival dates follow the Hindu lunar calendar and shift every year. Please confirm the exact date for your year before booking — we are happy to check for you.";

export const festivals: Festival[] = [
  {
    slug: "janmashtami",
    name: "Krishna Janmashtami",
    months: "August – September (Bhadrapada Krishna Ashtami)",
    places: ["Mathura", "Vrindavan", "Gokul", "Nandgaon"],
    image: "janmabhoomi",
    summary: "Krishna’s birthday in the town of his birth — midnight celebrations, decorated temples and the joyful Nand Utsav the next day.",
    packageSlug: "janmashtami-special",
    sections: [
      {
        heading: "What happens",
        body: [
          "Janmashtami marks the birth of Shri Krishna at midnight on the eighth day of the dark fortnight of Bhadrapada. In Braj it is not a single evening but several days of devotion: temples are dressed in flowers and lights, jhankis (tableaux) of Krishna’s life appear across Mathura, and bhajans run late into the night.",
          "At midnight the deity is bathed in the panchamrit abhishek and the birth is announced with conches and bells. At Banke Bihari in Vrindavan, the once-a-year mangala aarti takes place in the early hours.",
        ],
      },
      {
        heading: "Where to be",
        body: [
          { list: [
            "Krishna Janmabhoomi, Mathura — the focal point, with the largest crowds and tight security.",
            "Banke Bihari and ISKCON, Vrindavan — deeply devotional, extremely busy.",
            "Gokul and Nandgaon — the next day’s Nand Utsav, celebrating the news of Krishna’s birth reaching Nanda’s household.",
          ] },
        ],
      },
    ],
    tips: [
      "Book rooms months ahead; prices rise sharply.",
      "Expect road closures and long walks near major temples on the night.",
      "Carry minimal belongings — Janmabhoomi does not allow phones or bags.",
      "Plan for elders to watch from a calmer temple rather than the main crowds.",
    ],
    faqs: [
      { q: "Is Janmashtami suitable for senior citizens?", a: "It can be, with careful planning. We usually suggest a quieter temple for the midnight celebration and darshan at the main temples a day before or after." },
      { q: "Can we enter Krishna Janmabhoomi at midnight?", a: "Entry depends on that year’s crowd and security arrangements, which are announced close to the date. Queues can run for many hours." },
    ],
  },
  {
    slug: "lathmar-holi",
    name: "Lathmar Holi in Barsana & Nandgaon",
    months: "February – March (about a week before Holi)",
    places: ["Barsana", "Nandgaon"],
    image: "lathmar-holi",
    summary: "The famous ‘Holi of sticks’, where the women of Barsana playfully drive away the men of Nandgaon — and return the visit the next day.",
    sections: [
      {
        heading: "The story and the celebration",
        body: [
          "Tradition says Krishna and his friends from Nandgaon came to Barsana to tease Radha and the gopis, who chased them away with sticks. Each spring the scene is re-enacted: men from Nandgaon arrive in Barsana with shields, and the women of Barsana meet them with long bamboo lathis amid clouds of colour and folk songs.",
          "The following day the roles move to Nandgaon, where the men of Barsana visit. A day before Lathmar Holi, Barsana also celebrates Laddu Holi, when sweets are thrown in the Radha Rani temple.",
        ],
      },
      {
        heading: "What to expect",
        body: [
          { list: [
            "Huge crowds in narrow lanes and on temple steps.",
            "Colour everywhere — on you, your phone and your camera.",
            "Very limited parking; vehicles stop well outside town.",
          ] },
        ],
      },
    ],
    tips: [
      "Wear old clothes and cover your hair; oil your skin beforehand.",
      "Keep phones in zip pouches and carry little cash.",
      "Women travellers are safest in a group or with our local contact.",
      "Children and elders may prefer to watch from a rooftop we arrange in advance.",
    ],
    faqs: [
      { q: "Is Lathmar Holi safe for tourists?", a: "It is a joyful festival, but the crowds are dense and boisterous. Staying with a local contact, avoiding the thickest crush and watching from a rooftop make a big difference." },
    ],
  },
  {
    slug: "phoolon-wali-holi",
    name: "Phoolon wali Holi in Vrindavan",
    months: "February – March (Rangbhari Ekadashi, a few days before Holi)",
    places: ["Vrindavan"],
    image: "flower-holi",
    summary: "Holi with flower petals at Banke Bihari temple — gentle, fragrant and one of Vrindavan’s most beautiful days.",
    sections: [
      {
        heading: "A Holi of petals",
        body: [
          "On Rangbhari Ekadashi, the priests at Banke Bihari temple shower devotees with baskets of rose and marigold petals instead of coloured powder. The doors open for a short window, so the courtyard fills quickly with singing, dancing devotees.",
          "Through the following days, Vrindavan’s temples play Holi with gulal and tesu flower colour, culminating in Holi itself and the Huranga at Baldeo the next day.",
        ],
      },
    ],
    tips: [
      "Arrive very early — the flower Holi window is short and crowded.",
      "Petals are gentle, but expect colour play in the lanes outside.",
      "Hold children close in the temple courtyard.",
    ],
    faqs: [
      { q: "Is there colour at the flower Holi?", a: "Inside the temple the focus is petals, but in the lanes around Banke Bihari colour play is common in Holi week." },
    ],
  },
  {
    slug: "radhashtami",
    name: "Radhashtami in Barsana",
    months: "August – September (about 15 days after Janmashtami)",
    places: ["Barsana", "Vrindavan"],
    image: "radha-rani-barsana",
    summary: "The appearance day of Shri Radha, celebrated with special abhishek at her hilltop temple in Barsana.",
    sections: [
      {
        heading: "Celebrating Shri Radha",
        body: [
          "Radhashtami falls on the eighth day of the bright fortnight of Bhadrapada. In Barsana, the Radha Rani temple holds an early-morning abhishek, and the whole town fills with kirtan and processions. Vrindavan’s temples — especially Radha Vallabh and ISKCON — celebrate too.",
        ],
      },
    ],
    tips: ["Barsana gets extremely crowded; stay in Vrindavan and leave very early.", "The temple steps are packed — not ideal for those who cannot climb."],
    faqs: [
      { q: "Is Radhashtami as crowded as Janmashtami?", a: "In Barsana itself, yes — the town is small and the temple sits on a hill, so crowds concentrate on the steps." },
    ],
  },
  {
    slug: "kartik-month",
    name: "Kartik Month (Damodar Maas)",
    months: "October – November",
    places: ["Vrindavan", "Govardhan", "Radha Kund", "Mathura"],
    image: "kartik-lamps",
    summary: "The holiest month in Braj — evening lamp offerings, parikramas and a gentle, glowing devotional mood.",
    sections: [
      {
        heading: "The month of lamps",
        body: [
          "Kartik is dedicated to Krishna as Damodar. Pilgrims offer ghee lamps every evening while singing the Damodarashtakam, walk parikramas of Vrindavan and Govardhan, and bathe in sacred kunds. Radha Kund draws thousands on Bahulashtami night.",
          "The weather turns pleasant, Diwali and Govardhan Puja fall within the month, and Vrindavan’s ghats glow with floating diyas.",
        ],
      },
    ],
    tips: ["Book stays early — Kartik is peak season for pilgrims.", "Evenings get cool by November; carry a light shawl."],
    faqs: [
      { q: "Is Kartik a good time for a first visit?", a: "Yes. The weather is comfortable and the mood is wonderfully devotional — just book ahead, as it is a busy season." },
    ],
  },
  {
    slug: "govardhan-puja",
    name: "Govardhan Puja & Annakut",
    months: "October – November (the day after Diwali)",
    places: ["Govardhan", "Vrindavan", "Mathura"],
    image: "govardhan-puja",
    summary: "Mountains of food offered to Giriraj ji, remembering how Krishna lifted Govardhan hill to shelter the people of Braj.",
    sections: [
      {
        heading: "Annakut — a mountain of food",
        body: [
          "On the day after Diwali, temples across Braj prepare Annakut: dozens of dishes arranged as a hill before the deity, recalling how the people of Braj offered their feast to Govardhan instead of Indra. In Govardhan town, the parikrama path is busy with devotees from early morning.",
        ],
      },
    ],
    tips: ["Visit the Annakut darshan at any major temple — timings are usually announced a day ahead.", "The Govardhan parikrama route is very busy on this day."],
    faqs: [
      { q: "Can we receive Annakut prasad?", a: "Many temples distribute prasad after the darshan, though arrangements vary." },
    ],
  },
];

export function getFestival(slug: string): Festival | undefined {
  return festivals.find((f) => f.slug === slug);
}
