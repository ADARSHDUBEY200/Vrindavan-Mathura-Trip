import type { PhotoKey } from "./images";
import type { Faq, Section } from "./types";

export type Guide = {
  slug: string;
  title: string;
  description: string;
  excerpt: string;
  category: "Planning" | "Getting there" | "Darshan" | "On the ground";
  image: PhotoKey;
  readMinutes: number;
  /** ISO date the article was last reviewed. */
  updated: string;
  sections: Section[];
  faqs?: Faq[];
  relatedPackages?: string[];
};

const UPDATED = "2026-10-15";

export const guides: Guide[] = [
  {
    slug: "best-time-to-visit-vrindavan-mathura",
    title: "Best Time to Visit Vrindavan & Mathura",
    description: "Month-by-month guide to weather, festivals and crowds in Vrindavan and Mathura, so you can pick the right season for your Braj trip.",
    excerpt: "Winter comfort, Holi colour, monsoon festivals or summer flower palaces — how to choose your season in Braj.",
    category: "Planning",
    image: "holi-vrindavan",
    readMinutes: 6,
    updated: UPDATED,
    sections: [
      {
        heading: "The short answer",
        body: [
          "For comfortable weather, plan between **October and March**. Days are pleasant, evenings are cool, and the calendar is full of festivals — Kartik and Diwali in autumn, Holi in early spring. December and January bring foggy mornings that can slow road travel, so keep a little buffer in your schedule.",
        ],
      },
      {
        heading: "Season by season",
        body: [
          { h3: "October – November: Kartik" },
          "The holiest month in Braj. Evening lamp offerings, parikramas, Diwali and Govardhan Puja. Weather is ideal; rooms book up early.",
          { h3: "December – February: Winter" },
          "Cool and crisp, with occasional dense fog in the early morning. Temple timings shift to the winter schedule. A wonderful time for relaxed darshan.",
          { h3: "February – March: Holi" },
          "Vrindavan, Barsana and Nandgaon celebrate Holi for more than a week. Unforgettable — and extremely crowded. Book transport and stays well ahead.",
          { h3: "April – June: Summer" },
          "Afternoons often exceed 40°C. Plan darshan early morning and evening, rest at midday. Banke Bihari’s Phool Bangla flower decorations are a summer highlight, and crowds are lighter on weekdays.",
          { h3: "July – September: Monsoon" },
          "Humid with passing showers. Jhulan Yatra (swing festival), Janmashtami and Radhashtami fall here. Braj turns green and festive.",
        ],
      },
      {
        heading: "Avoiding the biggest crowds",
        body: [
          { list: [
            "Weekends and public holidays are much busier than weekdays, especially at Banke Bihari.",
            "Ekadashi, Purnima and festival days draw very large crowds.",
            "Early mornings are almost always calmer than evenings.",
          ] },
          { tip: "If you are travelling with elders, a weekday in November, February or early March is hard to beat." },
        ],
      },
    ],
    faqs: [
      { q: "Is it worth visiting Vrindavan in summer?", a: "Yes, if you plan around the heat — darshan early and late, rest in the afternoon. You may also see the beautiful Phool Bangla decorations." },
      { q: "When is Holi in Vrindavan?", a: "Celebrations run for about a week before Holi (February–March). Dates follow the lunar calendar, so confirm for your year." },
    ],
    relatedPackages: ["vrindavan-one-day-darshan", "mathura-vrindavan-2-days"],
  },
  {
    slug: "how-many-days-for-vrindavan-mathura",
    title: "How Many Days Do You Need for Vrindavan & Mathura?",
    description: "Sample one, two, three and five-day plans for Vrindavan, Mathura, Govardhan and Barsana — and how to choose the right length for your group.",
    excerpt: "From a single long day to a full Braj yatra — sample plans for every length of stay.",
    category: "Planning",
    image: "vrindavan-street",
    readMinutes: 5,
    updated: UPDATED,
    sections: [
      {
        heading: "One day",
        body: [
          "One full day lets you see Vrindavan’s highlights: Banke Bihari in the morning, the old town temples, and ISKCON and Prem Mandir in the evening. Add Mathura only if you start very early — temples close in the afternoon, which limits how much fits in.",
        ],
      },
      {
        heading: "Two days (our recommendation for a first visit)",
        body: [
          "Day one in Mathura — Janmabhoomi, Dwarkadhish and the Yamuna aarti. Day two in Vrindavan at an easy pace. You’ll have time to sit in temples rather than rushing between them.",
        ],
      },
      {
        heading: "Three days",
        body: [
          "Add a day for Govardhan, Radha Kund, Barsana and Nandgaon. This is the sweet spot for most devotees who want to feel the wider Braj.",
        ],
      },
      {
        heading: "Five days or more",
        body: [
          "Include Gokul, Baldeo and the forests of the 84 Kos — or combine Braj with Agra, Ayodhya and Varanasi, or Haridwar and Rishikesh.",
          { tip: "Travelling with seniors? Add a day to whatever you planned. Slower days are happier days." },
        ],
      },
    ],
    relatedPackages: ["mathura-vrindavan-2-days", "govardhan-barsana-same-day", "braj-84-kos-yatra"],
  },
  {
    slug: "how-to-reach-vrindavan-mathura",
    title: "How to Reach Vrindavan & Mathura from Delhi and Agra",
    description: "Road, rail and air options to reach Vrindavan and Mathura from Delhi, Agra and beyond — including the Yamuna Expressway, trains to Mathura Junction and nearby airports.",
    excerpt: "Yamuna Expressway, trains to Mathura Junction and the nearest airports — your options explained.",
    category: "Getting there",
    image: "yamuna-vrindavan",
    readMinutes: 6,
    updated: UPDATED,
    sections: [
      {
        heading: "From Delhi by road",
        body: [
          "The quickest route is the **Yamuna Expressway** from Greater Noida. Vrindavan and Mathura have their own exits, and the drive typically takes 3–3.5 hours from central Delhi in normal traffic. The older NH-19 (Delhi–Agra highway) via Faridabad and Palwal is an alternative, but usually slower.",
          { list: [
            "Distance: roughly 160–180 km depending on your starting point.",
            "Leave early (by 5:30–6 am) to reach in time for morning darshan.",
            "Expressway tolls are payable via FASTag.",
          ] },
        ],
      },
      {
        heading: "From Delhi by train",
        body: [
          "**Mathura Junction (MTJ)** is a major station on the Delhi–Agra line, with frequent express trains from New Delhi and Hazrat Nizamuddin. Journey times are usually 2–3 hours. From the station, Vrindavan is a 25–30 minute drive — we can meet you on the platform.",
        ],
      },
      {
        heading: "From Agra",
        body: [
          "Agra to Mathura is about 55–60 km — around 1 to 1.5 hours by road along NH-19 or the Expressway. Trains between Agra Cantt and Mathura are also frequent and quick.",
        ],
      },
      {
        heading: "By air",
        body: [
          "Most visitors fly into **Delhi IGI**, around 4 hours from Vrindavan by road. Agra has a small airport with limited domestic flights. **Noida International Airport** at Jewar lies just off the Yamuna Expressway and is considerably closer to Braj — check whether your airline operates there.",
        ],
      },
      {
        heading: "Getting around once you arrive",
        body: [
          "A private car is the most comfortable way to move between Mathura, Vrindavan, Govardhan and Barsana. Inside Vrindavan’s old town, cars cannot enter the narrow lanes, so you’ll walk or take an e-rickshaw for the last stretch to Banke Bihari.",
        ],
      },
    ],
    faqs: [
      { q: "How far is Vrindavan from Delhi?", a: "Around 160–180 km, which is roughly 3–3.5 hours on the Yamuna Expressway in normal traffic." },
      { q: "Which railway station is nearest to Vrindavan?", a: "Mathura Junction is the main railhead with the best connections. Vrindavan is about 12–15 km away." },
    ],
    relatedPackages: ["vrindavan-one-day-darshan", "agra-mathura-vrindavan-3-days"],
  },
  {
    slug: "temple-timings-and-darshan",
    title: "Temple Timings & the Rhythm of Darshan in Braj",
    description: "Why Braj temples open and close through the day, how summer and winter schedules differ, and how to plan darshan at Banke Bihari, Dwarkadhish and more.",
    excerpt: "Why temples close at midday, how seasons change the schedule, and how to plan your darshan.",
    category: "Darshan",
    image: "phool-bangla",
    readMinutes: 5,
    updated: UPDATED,
    sections: [
      {
        heading: "Thakur ji keeps a daily routine",
        body: [
          "In Braj, the deity is served as a living, beloved presence. He is woken gently, dressed, fed, rests in the afternoon and is put to sleep at night. Temple doors open and close around this routine, which is why almost every temple closes for a few hours in the afternoon.",
          "Some temples — like Dwarkadhish in Mathura, which follows the Pushti Marg tradition — open only for short darshan windows called jhankis through the day.",
        ],
      },
      {
        heading: "Summer and winter schedules",
        body: [
          "Most temples run a summer schedule (roughly from Holi to Diwali) and a winter schedule. In summer, morning darshan begins earlier and evening darshan runs later; in winter, both shift to suit the shorter days.",
          { tip: "All timings on this site are approximate. They change with seasons and festivals, and temples sometimes adjust them at short notice — we always check on the day." },
        ],
      },
      {
        heading: "A sample day",
        body: [
          { list: [
            "Early morning: mangala aarti at ISKCON (around 4:30 am) for early risers.",
            "Morning: Banke Bihari and the old-town temples as they open.",
            "Midday: lunch and rest — most temples are closed.",
            "Late afternoon: Mathura temples or a boat ride.",
            "Evening: Yamuna aarti, Prem Mandir lights or Banke Bihari evening darshan.",
          ] },
        ],
      },
    ],
    relatedPackages: ["vrindavan-one-day-darshan", "mathura-vrindavan-2-days"],
  },
  {
    slug: "getting-around-vrindavan",
    title: "Getting Around Vrindavan: E-Rickshaws, Walking & Parking",
    description: "A practical guide to moving around Vrindavan — where cars can go, how e-rickshaws work, parking near Banke Bihari and tips for the narrow lanes.",
    excerpt: "Where cars can’t go, how e-rickshaws work, and how to handle the narrow lanes.",
    category: "On the ground",
    image: "vrindavan-street",
    readMinutes: 4,
    updated: UPDATED,
    sections: [
      {
        heading: "Two Vrindavans",
        body: [
          "Vrindavan has a modern side — wide roads around ISKCON, Prem Mandir and the Chhatikara road — and an old town of lanes around Banke Bihari, Nidhivan and Radha Vallabh. Cars move easily in the first; in the second you walk or take an e-rickshaw.",
        ],
      },
      {
        heading: "E-rickshaws",
        body: [
          "Battery e-rickshaws are everywhere and are the easiest way through the old town. Fares are low but not always fixed, so agree on the fare before setting off. For a group, hiring one for an hour or two with waiting time works well.",
        ],
      },
      {
        heading: "Walking tips",
        body: [
          { list: [
            "Wear easy slip-on footwear — you’ll remove it often.",
            "Keep spectacles, phones and food out of sight of monkeys.",
            "Parikrama marg (the path around the town) is about 10 km and a lovely early-morning walk.",
          ] },
        ],
      },
    ],
  },
  {
    slug: "stay-in-mathura-or-vrindavan",
    title: "Where to Stay: Mathura or Vrindavan?",
    description: "Should you stay in Mathura or Vrindavan? Compare atmosphere, access, hotels and ashrams to choose the right base for your Braj trip.",
    excerpt: "Atmosphere, access, hotels and ashrams — choosing the right base for your trip.",
    category: "Planning",
    image: "keshi-ghat",
    readMinutes: 4,
    updated: UPDATED,
    sections: [
      {
        heading: "Stay in Vrindavan if…",
        body: [
          { list: [
            "You want to be close to Banke Bihari, ISKCON and Prem Mandir for early and late darshan.",
            "You enjoy a devotional atmosphere — kirtan, bells and ‘Radhe Radhe’ everywhere.",
            "You’d like the option of an ashram or temple guesthouse.",
          ] },
        ],
      },
      {
        heading: "Stay in Mathura if…",
        body: [
          { list: [
            "You have an early train from Mathura Junction.",
            "You plan to visit Gokul and Baldeo across the river.",
            "You want a wider choice of conventional city hotels.",
          ] },
        ],
      },
      {
        heading: "Our usual advice",
        body: [
          "For most pilgrims we suggest Vrindavan, close to the ISKCON–Prem Mandir side, where roads are wider and access is easier for cars. The two towns are only 12–15 km apart, so either base works for a short trip.",
        ],
      },
    ],
  },
  {
    slug: "govardhan-parikrama-guide",
    title: "Govardhan Parikrama: A Complete Guide",
    description: "Everything you need for the 21 km Govardhan Parikrama — route, key stops, timing, walking vs. e-rickshaw, and tips for barefoot pilgrims.",
    excerpt: "The 21 km circuit around Giriraj ji — route, stops, timing and tips.",
    category: "Darshan",
    image: "govardhan-dham",
    readMinutes: 7,
    updated: UPDATED,
    sections: [
      {
        heading: "What is the Govardhan Parikrama?",
        body: [
          "Govardhan hill is worshipped as Krishna himself. Walking around it — the parikrama — is one of the most meritorious acts of devotion in Braj. The path is about **21 km (7 kos)** and passes temples, kunds and villages tied to Krishna’s pastimes.",
        ],
      },
      {
        heading: "Route and key stops",
        body: [
          "Most pilgrims start at Daan Ghati in Govardhan town and walk clockwise, keeping the hill on their right.",
          { list: [
            "Daan Ghati — darshan and milk offering to Giriraj ji.",
            "Mansi Ganga — the sacred lake at the centre of town.",
            "Kusum Sarovar — the elegant sandstone chhatris.",
            "Radha Kund and Shyam Kund — the holiest kunds in Braj.",
            "Jatipura — the Mukharvind, the lotus face of Giriraj ji.",
            "Poonchari — the ‘tail’ of the hill, in the south.",
          ] },
        ],
      },
      {
        heading: "Walking, e-rickshaw or car?",
        body: [
          "Walking takes most people 5–7 hours. Many walk barefoot as an offering — the path is paved for most of its length. If walking isn’t possible, e-rickshaws do the circuit in 2–3 hours with stops, and a car can cover most of it too.",
          { tip: "Start before dawn in summer, carry water, and plan rest stops. Purnima nights are very crowded but beautiful." },
        ],
      },
    ],
    faqs: [
      { q: "Can senior citizens do the Govardhan Parikrama?", a: "Many do it by e-rickshaw or car, stopping for darshan along the way. That is a perfectly accepted way to offer the parikrama." },
    ],
    relatedPackages: ["govardhan-barsana-same-day", "braj-84-kos-yatra"],
  },
  {
    slug: "first-visit-tips-vrindavan",
    title: "First Visit to Vrindavan: 15 Tips That Help",
    description: "Practical first-visit tips for Vrindavan and Mathura — what to wear, monkeys, footwear, temple etiquette, crowds, food and staying comfortable.",
    excerpt: "What to wear, how to handle monkeys and crowds, and small courtesies that matter.",
    category: "On the ground",
    image: "banke-bihari",
    readMinutes: 6,
    updated: UPDATED,
    sections: [
      {
        heading: "Before you go",
        body: [
          { list: [
            "Check festival dates — they can transform crowds and road access.",
            "Pack modest, comfortable clothes that cover shoulders and knees.",
            "Bring slip-on footwear and a small bag for shoes.",
            "Carry some small change for e-rickshaws, prasad and shoe stands.",
          ] },
        ],
      },
      {
        heading: "In the temples",
        body: [
          { list: [
            "Remove shoes where asked; use the paid or free stands.",
            "Photography is often not allowed inside sanctums — look for signs.",
            "Greet people with ‘Radhe Radhe’ — it is the local hello.",
            "You do not need to pay anyone to have darshan. Donations are a personal choice.",
          ] },
        ],
      },
      {
        heading: "Monkeys, crowds and comfort",
        body: [
          { list: [
            "Vrindavan’s monkeys are known to snatch spectacles, phones and food. Keep them out of sight.",
            "Hold children’s hands in the lanes and temple courtyards.",
            "Plan an afternoon rest — temples close anyway.",
            "Stay hydrated, especially from April to June.",
          ] },
        ],
      },
      {
        heading: "Food",
        body: [
          "Braj food is vegetarian and, in many places, prepared without onion or garlic. Try the peda of Mathura, kachori-sabzi for breakfast, lassi, and prasad from temple kitchens.",
        ],
      },
    ],
  },
  {
    slug: "senior-citizen-travel-guide-braj",
    title: "Vrindavan & Mathura for Senior Citizens",
    description: "How to plan a comfortable Vrindavan and Mathura pilgrimage for elderly parents — pacing, crowds, steps, wheelchairs, timings and transport.",
    excerpt: "Pacing, crowds, steps and comfort — planning a gentle pilgrimage for elders.",
    category: "Planning",
    image: "iskcon",
    readMinutes: 6,
    updated: UPDATED,
    sections: [
      {
        heading: "Plan a slower yatra",
        body: [
          "The single most useful thing is time. Two or three temples in a morning, a proper rest in the afternoon, and one or two in the evening is plenty. Add a day to whatever itinerary you had in mind.",
        ],
      },
      {
        heading: "Choosing temples and timings",
        body: [
          { list: [
            "ISKCON and Prem Mandir are spacious and easy to move around.",
            "Visit Banke Bihari on a weekday morning; avoid weekends and festivals.",
            "Barsana and Madan Mohan involve steps — check the Barsana ropeway or skip the climb.",
            "Krishna Janmabhoomi requires walking through security; carry nothing extra.",
          ] },
        ],
      },
      {
        heading: "Transport and comfort",
        body: [
          "A private car with a patient driver makes the biggest difference — we drop as close to each temple as is permitted and wait while you take your time. E-rickshaws cover the last stretch in old Vrindavan.",
          { tip: "Tell us about mobility needs, medicines and dietary preferences when you enquire. We plan the pace, the rest stops and the hotel floor accordingly." },
        ],
      },
    ],
    relatedPackages: ["mathura-vrindavan-2-days", "vrindavan-one-day-darshan"],
  },
];

export function getGuide(slug: string): Guide | undefined {
  return guides.find((g) => g.slug === slug);
}
