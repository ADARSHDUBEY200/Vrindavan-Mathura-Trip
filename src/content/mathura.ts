import { FOUNDED, FOUNDER, PILGRIMS, RATING, STARTING_PRICE, YEARS, formatInr } from "@/config/site";
import type { PhotoKey } from "./images";
import type { Faq } from "./types";

/*
 * /mathura copy — taken word for word from "Mathura Content.pdf". Do not paraphrase.
 * Only two things differ from the PDF: the founder's name, phone and price come from config/site.ts,
 * and the PDF's "Quick Notes for Your Web Team" are not published (they are handled in code and schema).
 * Inline markup understood by <Rich>: **bold**, *italic*, [text](href). The phone and email auto-link.
 */

/** Inline-markup string (see above). */
export type Rich = string;

export const MATHURA_PATH = "/mathura";
/** Date (ISO) this guide was last reviewed. Shown on the page and used as `dateModified` and in the sitemap. */
export const MATHURA_UPDATED = "2026-10-30";

const price = formatInr(STARTING_PRICE);
const pilgrims = PILGRIMS.replace("+", "");

export const mathuraMeta = {
  /** ≤ 60 chars. The PDF's suggestion (72 chars, kept as the H1) would be truncated in results. */
  title: "Mathura Travel Guide: Best Places, Things to Do & Tips",
  /** ≤ 160 chars. The PDF's suggestion runs to 215, so it is tightened here without changing its substance. */
  description: `Mathura travel guide by local expert ${FOUNDER.name}: best places, Krishna Janmasthan tips, Vishram Ghat aarti, peda and itineraries. Packages from ${price}.`,
  imageAlt: `Evening at Vishram Ghat in Mathura with boats and lit temples before the Yamuna aarti, Mathura travel guide by ${FOUNDER.name}`,
};

export const mathuraHero = {
  scriptWord: "मथुरा",
  word: "Mathura",
  rest: "Travel Guide: Best Places to Visit, Things to Do & Local Secrets",
  greeting: "Radhe Radhe, dear traveller.",
  lede: `Our **Mathura tour packages** start from just **${price}**, and our guests have given us a **${RATING}-star rating**.`,
  whatsappMessage: `Radhe Radhe ${FOUNDER.name} ji! I read your Mathura travel guide and would like to plan a trip. My dates and group details are:`,
};

/** Trust strip. Same facts as the closing line of the PDF. */
export const mathuraTrust = [
  { value: FOUNDED, label: "Serving pilgrims since" },
  { value: `${RATING}`, label: "Star rated" },
  { value: PILGRIMS, label: "Pilgrims guided" },
  { value: price, label: "Packages from" },
];

export const guideLinks = [
  { id: "glance", label: "At a Glance" },
  { id: "places", label: "Places to Visit" },
  { id: "things-to-do", label: "Things to Do" },
  { id: "best-time", label: "Best Time" },
  { id: "reach", label: "How to Reach" },
  { id: "itineraries", label: "Itineraries" },
  { id: "near", label: "Near Mathura" },
  { id: "stay", label: "Where to Stay" },
  { id: "faq", label: "FAQ" },
  { id: "book", label: "Book" },
];

export const mathuraIntro = {
  paragraphs: [
    `This **Mathura travel guide** comes from a man who learned to walk in its lanes. I am ${FOUNDER.name}, founder of **Mathura Vrindavan Trips**. I was born in Mathura, and since ${FOUNDED} I have guided **over ${pilgrims} pilgrims** through the city where Lord Krishna was born. Our **Mathura tour packages** start from just **${price}**, and our guests have given us a **${RATING}-star rating**.`,
    `Mathura is not a city you simply "see." It is a place you feel. You will walk beside the Yamuna where, by Braj tradition, Krishna rested after Kamsa's fall. You will stand at the birthplace itself. You will smell ghee and cardamom drifting from sweet shops that have been frying and stirring for generations. Over **${YEARS} years of guiding**, I have learned which hour to visit each place, which lane to take and which shopkeeper to trust. I have put all of it here.`,
  ],
  packagesLink: { label: "Mathura Vrindavan Tour Packages", href: "/tour-packages" },
  note: {
    label: "A note on timings and fees:",
    text: "Temple timings, museum hours and entry rules change with the season, festivals and management decisions. Everything below is the usual pattern I have observed. We reconfirm with every guest the day before.",
  },
};

export const mathuraGlance = {
  title: "Mathura at a Glance",
  facts: [
    { label: "Known for", value: "Birthplace of Lord Krishna, Vishram Ghat, Mathura peda" },
    { label: "Best time", value: "October to March" },
    { label: "Ideal stay", value: "1 to 2 days (3 with Vrindavan, Govardhan, Barsana)" },
    { label: "Nearest big cities", value: "Agra (about 55 to 60 km), Delhi (about 145 to 150 km)" },
    { label: "Distance to Vrindavan", value: "About 11 to 15 km" },
    { label: "Must-try food", value: "Mathura peda, kulhad lassi, kachori-sabzi, jalebi-rabri" },
  ],
};

/* ------------------------------------------------------------------ */
/* Best places to visit                                                */
/* ------------------------------------------------------------------ */

export type Place = {
  id: string;
  name: string;
  /** Its own page on this site, when one exists. */
  href?: string;
  image: PhotoKey;
  history: readonly Rich[];
  timingsLabel: string;
  timings: Rich;
  expect?: Rich;
  /** A single-paragraph tip, or the bullet list of tips for Janmasthan. */
  tip?: Rich;
  tips?: readonly Rich[];
};

export const tipLabel = `${FOUNDER.name}'s local tip:`;

export const placesIntro = {
  title: "Best Places to Visit in Mathura",
  lede: "This is my list of the **best places to visit in Mathura**, in the order I would walk you through them. Together they make up a complete **Mathura sightseeing** plan.",
};

const placeList = [
  {
    id: "janmasthan",
    name: "Shri Krishna Janmasthan Temple Complex",
    href: "/temples/krishna-janmabhoomi",
    image: "mathura-janmasthan-street",
    history: [
      "**Shri Krishna Janmasthan Mathura** is where tradition places Krishna's birth in the prison of King Kamsa, to Devaki and Vasudeva, at midnight on Bhadrapada Ashtami. The site is also known as **Katra Keshav Dev**. Over the centuries, successive temples were built, damaged and rebuilt on or near this ground, and the area was once the centre of a major temple complex. Today it includes the **Garbha Griha** (the prison-cell shrine), the **Keshav Dev Temple** and the **Bhagavat Bhavan**, set among quiet gardens. The Shahi Idgah stands beside the complex, and the whole area is heavily secured.",
    ],
    timingsLabel: "Timings and entry (approximate):",
    timings: "Roughly **5 a.m. to 12 noon** and **3 p.m. to 8 p.m.**, with winter and summer variations. Entry is generally free.",
    expect: "A security check at the entrance, similar to an airport. **Mobile phones, cameras, bags and electronics are generally not allowed inside.** There are cloakrooms and lockers outside.",
    tips: [
      "**The best time to visit Janmasthan to avoid the rush** is a **weekday, right at the morning opening**. By late morning, buses of day-trippers arrive. Sundays, public holidays and festival days are the worst.",
      "**Carry only what you need.** The fewer pockets and bags you have, the faster the security line moves.",
      '**Entry gates and queue arrangements are decided by the authorities and can change.** I always check on the day, and I walk my guests to the correct entrance, away from touts offering "phone-keeping" or "special darshan."',
      "**At the Garbha Griha, do not rush.** Most visitors are pushed along by the queue. If the crowd is thin, take a moment, stand still and let the place settle. For many of my guests, this is the most emotional minute of the trip.",
      "**Around Janmashtami,** queues can run for hours. Book early and read our [Braj festivals guidance](/festivals).",
    ],
  },
  {
    id: "dwarkadhish",
    name: "Dwarkadhish Temple",
    href: "/temples/dwarkadhish",
    image: "dwarkadhish",
    history: [
      "Built in the early nineteenth century (around **1814**), the **Dwarkadhish Temple** is one of Mathura's most loved temples. It follows the **Pushtimarg** tradition, in which the deity is served like a cherished child, with seasonal clothing, carefully planned offerings and darshan divided into short windows (*jhankis*). The architecture is a pleasure: carved pillars, painted ceilings, balconies and a **Rajasthani haveli** feel. The temple is a short walk from the Yamuna ghats.",
    ],
    timingsLabel: "Timings and entry (approximate):",
    timings: "Open from early morning until late morning, then again from the afternoon until early evening. Entry is generally free.",
    tip: "Because it sits close to **Vishram Ghat**, I always pair the two. Bathe your eyes in the sunrise at the ghat, then walk to Dwarkadhish before the crowd arrives. The temple is especially colourful during **Holi, Hindola (Jhulan) and Janmashtami**, and absolutely packed on those days. Buy prasad only from the official counters inside.",
  },
  {
    id: "kansa-qila",
    name: "Kansa Qila (Old Fort)",
    image: "mathura-kans-qila",
    history: [
      "Local tradition calls this the fort of **King Kansa**, Krishna's tyrant uncle, on the bank of the Yamuna. That is the story every Mathura child grows up with, and it is the reason the place carries such power.",
      "Now for the part guidebooks skip. The structure you see today is largely from **much later periods**. Historians credit **Raja Man Singh of Amber** (Jaipur) with building the fort in the sixteenth century, and **Maharaja Sawai Jai Singh II** is associated with the site in the eighteenth century, when he is said to have built an observatory here, one of several he made across India. So the stones are medieval, even if the mound beneath them is far older and the legend far older still. I enjoy telling guests both versions: the story that lives in people's hearts and the history that lives in the bricks. Both belong to Mathura.",
    ],
    timingsLabel: "Timings and entry:",
    timings: "Generally open in daylight hours. The fort is a protected-style site rather than an active temple, and access conditions can change, so I recommend confirming before you go.",
    tip: "Come in the **late afternoon** for the light on the river and the quiet. Carry water, wear comfortable shoes and keep your expectations realistic: this is a place for atmosphere and storytelling, not for grand interiors. It is best with a guide who can bring the history and legend to life.",
  },
  {
    id: "potara-kund",
    name: "Potara Kund",
    image: "mathura-potara-kund",
    history: [
      "**Potara Kund** is an ancient stepped pond near the Janmasthan complex. Tradition says that after Krishna's birth, the baby's clothes (*potra*) and the cloths of the birth room were washed here, and that Yashoda also bathed at this kund. Its name comes from that story. The stepped sides and small shrines make it a pleasant, atmospheric stop.",
    ],
    timingsLabel: "Timings and entry:",
    timings: "Generally open through the day, and free.",
    tip: "Combine Potara Kund with your Janmasthan visit, since the two are close. Go after darshan, when you are in a quiet frame of mind. Keep an eye on your footing on the old steps, and do not enter the water. Water levels and cleanliness vary through the year, so I treat it as a place for a calm look and a prayer, not a dip.",
  },
  {
    id: "museum",
    name: "Mathura Museum (Government Museum)",
    image: "mathura-museum",
    history: [
      "The **Government Museum, Mathura** houses one of India's great collections of ancient sculpture. Mathura was the home of the celebrated **Mathura school of art**, which flourished under the Kushan and Gupta periods and produced some of the earliest known images of the Buddha, along with Jain and Hindu figures. The collection spans many centuries, with famous pieces from around the early centuries of the Common Era. The museum was started in the nineteenth century by the British administrator **F. S. Growse**, and it sits in a leafy park.",
    ],
    timingsLabel: "Timings and entry (approximate):",
    timings: "Usually open from the late morning to late afternoon (about **10:30 a.m. to 4:30 p.m.**), **closed on Mondays and some public holidays**. There is a small ticket fee, with higher rates for foreign visitors. Confirm current fees and hours.",
    tip: "If you love history, set aside **an hour or more**. Look for the red sandstone figures and the standing Buddha. Most devotee groups skip this museum, and I gently suggest you do not. It shows you that Mathura was a thriving centre of art and trade long before it became a pilgrimage circuit. It is also a calm, cool break from the bustle, which is a gift in summer.",
  },
  {
    id: "jama-masjid",
    name: "Jama Masjid",
    image: "mathura-jama-masjid-daniell",
    history: [
      "Mathura's **Jama Masjid** was built in **1661 A.D.** by **Abd-un-Nabi Khan**, the Mughal governor of Mathura. It stands out for its four tall minarets, once decorated with coloured tiles, and for its large courtyard near the old city's central market. It is a quiet reminder that Mathura's story is layered, with Mughal-era architecture standing alongside its ancient temples.",
    ],
    timingsLabel: "Timings and entry:",
    timings: "Open during the day, generally free. As with any mosque, visits should be at suitable times, outside prayer hours, with modest dress and respect, and with attention to any restrictions.",
    tip: "Many travellers never notice it, but it is one of the finest examples of the old city's architecture. I like to visit early or late in the day for the light. Dress modestly, cover your head if asked, speak softly and ask before photographing people.",
  },
  {
    id: "vishram-ghat",
    name: "Vishram Ghat",
    href: "/temples/vishram-ghat",
    image: "mathura-vishram-ghat-day",
    history: [
      '**Vishram Ghat** is the soul of Mathura. After slaying Kamsa, Krishna is said to have rested here on the Yamuna\'s bank, and *vishram* means "rest." It is the most important ghat in the city, and traditionally the starting point of the **Mathura Parikrama**. The ghat is lined with small shrines, carved arches and old temple façades, and the steps are always alive with pilgrims, priests, flower sellers and children.',
    ],
    timingsLabel: "Timings and entry:",
    timings: "The ghat is open at all hours and free to visit. The **evening aarti** takes place around sunset.",
    tip: "Come at **sunrise** for the quiet and the golden light, and again at **sunset** for the aarti. Pilgrims often follow a gentle tradition of sprinkling Yamuna water on their heads. If you prefer not to bathe, that is perfectly fine. Agree the price before you board a boat, and politely decline anyone who insists on a ritual or demands money. We can introduce trustworthy pandits if you wish.",
  },
] as const satisfies readonly Place[];

export type PlaceId = (typeof placeList)[number]["id"];

export const places: Record<PlaceId, Place> = Object.fromEntries(placeList.map((p) => [p.id, p as Place])) as Record<PlaceId, Place>;
export const placeOrder: Place[] = [...placeList];

export const vrindavanAddOns = {
  title: "Essential Add-Ons from Vrindavan",
  lede: "Vrindavan is only about 11 to 15 km away, so a good **Mathura tour** nearly always includes it. These are the spots I recommend adding:",
  items: [
    { name: "Banke Bihari Temple", text: "The beloved deity of Vrindavan, famous for its curtain darshan.", image: "banke-bihari", href: "/temples/banke-bihari" },
    { name: "Prem Mandir", text: "A white marble temple glowing with lights in the evening.", image: "prem-mandir-night", href: "/temples/prem-mandir" },
    { name: "Radha Vallabh Temple", text: "A unique temple where Radha is worshipped at the centre, with rich devotional music.", image: "radha-vallabh", href: "/temples/radha-vallabh" },
  ] as { name: string; text: string; image: PhotoKey; href: string }[],
  footer: "We cover all three, with timings and tips, in our [Vrindavan guides](/vrindavan).",
};

export const morePlaces = {
  title: "More Places Worth Your Time in Mathura",
  items: [
    { name: "Gita Mandir (Birla Mandir)", text: "The Bhagavad Gita inscribed on its pillars, calm and uncrowded." },
    { name: "Bhuteshwar Mahadev", text: "An ancient Shiva temple where Shiva is honoured as Mathura's guardian." },
    { name: "Jugal Kishore Temple", text: "One of the older temples near the Yamuna." },
    { name: "Adi Varaha Temple", text: "A rare shrine of Vishnu's boar avatar near Dwarkadhish." },
  ],
};

/* ------------------------------------------------------------------ */
/* Things to do                                                        */
/* ------------------------------------------------------------------ */

export const thingsIntro = {
  title: "Top Things to Do in Mathura",
  lede: "Sightseeing is one thing. Experiencing Mathura is another. Here are the **things to do in Mathura** that people remember for years.",
};

export const aarti = {
  title: "Attend the Evening Aarti at Vishram Ghat",
  scene:
    "Imagine this. The sun is sinking into the haze over the Yamuna and the sky turns the colour of ripe mangoes. The temple bells begin, one by one, then all together. Priests lift brass lamps and wave them in slow circles, and the conch sounds across the water. Women set tiny leaf boats with **floating diyas** onto the river, and the flames drift away like a scattering of small stars. The scent of incense and marigold hangs in the air.",
  close:
    "It is not a vast, choreographed spectacle. It is local, quiet and intimate, which is exactly why I love it. **Arrive 30 to 45 minutes before sunset** to find a spot on the steps, and bring a few flowers and a leaf lamp.",
};

export const boatRide = {
  title: "Take a Boat Ride on the Yamuna",
  image: "mathura-yamuna-boats" as PhotoKey,
  text: "The best hour is **sunrise or sunset**, when the water turns copper and the ghats glow. From the boat you see the temple façades, steps and domes from the river, as pilgrims have seen them for centuries. The ride is short, usually 20 to 40 minutes.",
  tips: [
    "**Agree on the price and duration before boarding,** and confirm whether it is per person or for the whole boat.",
    "**Keep your valuables secure** and sit steadily, especially in the early morning.",
    "**Be mindful of the river.** Water quality varies, so enjoy it from the boat and avoid touching it if you are not sure.",
  ],
};

export const peda = {
  title: "Taste the Authentic Mathura Ke Pede",
  images: ["mathura-peda", "kulhad-lassi"] as PhotoKey[],
  text: "**Mathura peda** is more than a sweet. It is a family tradition. It is made from slow-cooked **khoa** (reduced milk solids) and sugar, stirred patiently until it turns a deep brown with a grainy, caramelised texture and a toasty, milky smell. It is quite different from the soft white pedas found in many other cities.",
  listTitle: "How to find the genuine article:",
  list: [
    "**Look for shops that make fresh batches daily** and whose pedas smell milky and slightly roasted, not overly sweet.",
    "**Ask for a taste** before buying a big box. A good shopkeeper will happily oblige.",
    "**Choose the old-city shops** around **Holi Gate, Dwarkadhish Bazaar and the lanes near the ghats,** where families have been making pedas for generations. Established names such as **Brijwasi Sweets** are well-loved by locals, and I also have a few smaller favourites that I share with my guests.",
    "**Check freshness and storage.** A good peda keeps for several days in a cool place, but it is best within a week.",
  ],
  close: "Pair your peda with a **kulhad lassi**, thick and cool and topped with malai, and your afternoon is complete.",
};

export const lanes = {
  title: "Walk the Heritage Lanes (Galis)",
  image: "braj-haveli" as PhotoKey,
  text: "Put away the map and walk the **old city galis**. Look up and you will see carved wooden balconies, faded frescoes and *jharokhas* (overhanging windows) on old havelis. Look around and you will see flower sellers stringing garlands, sweet shops piled with pedas, tailors stitching tiny deity clothes and children playing cricket in lanes the width of a cycle.",
  eatTitle: "Where to eat as you walk:",
  eat: [
    { name: "Kachori with spicy aloo sabzi,", text: "hot from the kadhai, is the classic Braj breakfast.", image: "kachori-sabzi" as PhotoKey },
    { name: "Bedmi puri", text: "is a lentil-spiced fried bread served with tangy chutney." },
    { name: "Fresh jalebi with rabri", text: "is best eaten in the morning.", image: "jalebi-rabri" as PhotoKey },
    { name: "Chaat and dahi bhalla", text: "in the market areas." },
  ],
  rulesTitle: "My local rules for the galis:",
  rules:
    "Walk in the morning or late afternoon, hold your bag in front of you, ask before you photograph people and carry small notes for offerings and snacks. Choose busy stalls (high turnover means fresh food) and bottled or filtered water if your stomach is sensitive.",
};

export const otherThings = {
  title: "Other Things to Do",
  items: [
    "**Visit the Mathura Museum** for a cool, quiet hour with ancient art.",
    "**Shop for local specialities** (see my [FAQ on what Mathura is famous for buying](#faq)).",
    "**Begin a Mathura Parikrama** at Vishram Ghat if you have energy and time.",
  ],
};

/* ------------------------------------------------------------------ */
/* Plan: best time, how to reach, itineraries, near, stay              */
/* ------------------------------------------------------------------ */

export const bestTime = {
  title: "Best Time to Visit Mathura",
  image: "mathura-yamuna-ghat" as PhotoKey,
  text: "The **best time to visit Mathura** is **October to March**. The air is cool, humidity is low and walking the ghats and lanes is a pleasure. Winter mornings can be foggy, with mist hanging over the Yamuna, and evenings can be cold in December and January, so pack warm layers. It is also the richest time for festivals.",
  seasons: [
    { key: "winter", name: "Winter (best)", months: "October to March", note: "Pleasant days, cold mornings, Kartik, Diwali and Govardhan Puja, Holi at the end" },
    { key: "summer", name: "Summer", months: "April to June", note: "Very hot (often above 40°C), quiet weekdays, lower prices" },
    { key: "monsoon", name: "Monsoon", months: "July to September", note: "Green, humid, Jhulan Yatra, Janmashtami, Radhashtami" },
  ],
  /** January → December, for the year ribbon. */
  months: [
    ["J", "winter"], ["F", "winter"], ["M", "winter"], ["A", "summer"], ["M", "summer"], ["J", "summer"],
    ["J", "monsoon"], ["A", "monsoon"], ["S", "monsoon"], ["O", "winter"], ["N", "winter"], ["D", "winter"],
  ] as const,
  festivalsTitle: "Festivals versus quiet:",
  festivals: [
    "**Holi (February or March)** turns the whole of Braj into colour, music and crowds. It is unforgettable, but book your stay at least six to eight weeks ahead.",
    "**Janmashtami (August or September)** is the biggest celebration in Mathura, with midnight festivities at Janmasthan. Queues are very long, and a day or two before or after the main day is calmer.",
    "**The winter months outside festivals** are my favourite for a peaceful visit, with space for quiet darshan, long walks and unhurried aarti.",
    "**Summer** suits budget travellers and quiet seekers who can handle the heat. Start before sunrise, rest in the afternoon and resume in the evening.",
  ],
  footer: "For a deeper season-by-season guide, see our dedicated page on the [best time to visit Mathura Vrindavan](/travel-guide/best-time-to-visit-vrindavan-mathura).",
};

export const reach = {
  title: "How to Reach Mathura",
  lede: "Mathura is one of the easiest holy cities to reach in north India. Here is how to plan.",
  air: {
    title: "By Air",
    points: [
      "**Agra (Kheria) Airport** is the closest, about **55 to 60 km** away, though flights are limited.",
      "**Delhi's Indira Gandhi International Airport** is the main gateway, about **150 to 160 km** away. A taxi transfer to Mathura takes roughly **3 to 3.5 hours**, depending on traffic and route.",
      "A newer international airport serving the Delhi-NCR region at Jewar may offer a convenient alternative via the Yamuna Expressway. Please check current flight availability.",
    ],
    noteLabel: "Our service:",
    note: "We arrange airport pick-ups from Delhi and Agra, so you step out of arrivals and into a comfortable AC vehicle with a driver who knows the road.",
  },
  train: {
    title: "By Train",
    text: "**Mathura Junction** is a major railway hub on the busy Delhi-Mumbai and Delhi-Chennai corridors, and many express and superfast trains stop here. It connects easily with **Delhi, Agra, Jaipur, Gwalior, Bhopal, Mumbai and beyond.** From Delhi, the journey is roughly **1.5 to 3 hours** depending on the train. Mathura also has other stations such as Mathura Cantt, and Vrindavan has its own station with fewer trains.",
    noteLabel: `${FOUNDER.name}'s tip:`,
    note: "From Mathura Junction, avoid unlicensed touts and agree on fares upfront, or let us arrange a pick-up.",
  },
  road: {
    title: "By Road and Bus",
    points: [
      "**From Delhi and Noida:** The **Yamuna Expressway** and **NH-19** connect you in about **2.5 to 3.5 hours**, depending on traffic. It is a comfortable drive.",
      "**From Agra:** About **1 to 1.5 hours**.",
      "**By bus:** Regular buses run from Delhi, Agra, Jaipur and other cities to Mathura's main bus stands, including the **New Bus Stand**. Buses are cheap, but they can be crowded and slow. For families and elders, a private car is far more comfortable.",
    ],
  },
  around: {
    title: "Getting around Mathura",
    points: [
      "**Private car or taxi:** Best for comfort and for combining Mathura, Vrindavan and nearby places.",
      "**E-rickshaws and autos:** Handy in the old city. Agree the fare first.",
      "**Walking:** The best way to see the ghats and old lanes. Wear comfortable, slip-on footwear.",
    ],
  },
};

export const itineraries = {
  title: "Suggested Itineraries for Mathura Sightseeing",
  oneDay: {
    title: "1-Day Mathura Snapshot",
    lede: "A relaxed one-day plan for travellers on a tight schedule, such as a Mathura weekend getaway from Delhi or Agra.",
    stops: [
      { time: "6:30 a.m.", title: "Vishram Ghat:", text: "Quiet sunrise, a short boat ride and a prayer." },
      { time: "8:00 a.m.", title: "Dwarkadhish Temple:", text: "Morning darshan before the crowd." },
      { time: "9:30 a.m.", title: "Shri Krishna Janmasthan and Potara Kund:", text: "Arrive early for a shorter security queue and a calm Garbha Griha." },
      { time: "11:30 a.m.", title: "Heritage lanes and kachori breakfast or early lunch:", text: "Walk the galis and taste Mathura peda." },
      { time: "1:00 p.m.", title: "Rest:", text: "Lunch and a break in an AC room or a cool restaurant." },
      { time: "3:00 p.m.", title: "Mathura Museum or Kansa Qila and Jama Masjid:", text: "A cultural afternoon, depending on your interests." },
      { time: "5:30 p.m.", title: "Return to Vishram Ghat:", text: "Evening aarti and floating diyas." },
      { time: "7:30 p.m.", title: "Dinner and departure.", text: "" },
    ],
  },
  twoDay: {
    title: "2-Day Mathura-Vrindavan Immersion",
    lede: "My most recommended plan, which gives you room to breathe.",
    days: [
      {
        title: "Day 1: Mathura",
        slots: [
          { when: "Morning:", text: "Vishram Ghat, Dwarkadhish, Janmasthan complex and Potara Kund." },
          { when: "Afternoon:", text: "Lunch, rest, then Mathura Museum or Gita Mandir." },
          { when: "Evening:", text: "Aarti at Vishram Ghat, peda shopping and a lane walk. Overnight in Mathura or drive to Vrindavan." },
        ],
      },
      {
        title: "Day 2: Vrindavan",
        slots: [
          { when: "Early morning:", text: "Nidhivan and Seva Kunj while the groves are quiet." },
          { when: "Mid-morning:", text: "Banke Bihari Temple, timed to avoid the peak crowd." },
          { when: "Afternoon:", text: "Radha Vallabh, Radha Raman, Madan Mohan and ISKCON." },
          { when: "Evening:", text: "Prem Mandir lights, then drop-off." },
        ],
      },
    ],
    packageHref: "/tour-packages/mathura-vrindavan-2-days",
  },
};

export const nearMathura = {
  title: "Add a Third Day: Places to Visit Near Mathura",
  lede: "Many guests extend their **Mathura sightseeing** to the wider Braj region. These are the best **places to visit near Mathura**:",
  items: [
    { name: "Gokul and Raman Reti", distance: "about 12 to 15 km", text: "Krishna's infancy and the soft sacred sands.", image: "gokul", href: "/temples/gokul" },
    { name: "Govardhan", distance: "about 22 to 25 km", text: "The sacred hill, Daan Ghati and Radha Kund.", image: "govardhan-dham", href: "/govardhan-barsana" },
    { name: "Barsana and Nandgaon", distance: "about 50 to 60 km", text: "Radha's village and Krishna's boyhood home.", image: "radha-rani-barsana", href: "/temples/radha-rani-temple-barsana" },
    { name: "Baldeo (Dauji)", text: "The temple of Krishna's elder brother Balarama.", image: "dauji", href: "/temples/dauji-baldeo" },
    { name: "Agra", distance: "about 55 to 60 km", text: "The Taj Mahal and Agra Fort, for those who want to combine pilgrimage with history.", image: "taj-mahal", href: "/tour-packages/agra-mathura-vrindavan-3-days" },
  ] as { name: string; distance?: string; text: string; image: PhotoKey; href: string }[],
};

export const stay = {
  title: "Where to Stay in Mathura",
  lead: "Good rest matters more than people expect, especially for seniors and families.",
  text: "Mathura offers everything from simple dharamshalas and ashram guesthouses to comfortable mid-range hotels. We also arrange **premium bookings at top 4 and 5-star hotels** in Mathura and Vrindavan for a calm, hassle-free stay, which is especially valuable during Holi, Janmashtami and the winter peak, when good rooms vanish early. Tell me your budget and needs, and I will suggest the right choice, even if that means a simple one.",
};

/* ------------------------------------------------------------------ */
/* FAQ and booking                                                     */
/* ------------------------------------------------------------------ */

export const faqTitle = "Frequently Asked Questions About Mathura";

/** Plain text on purpose: the same strings feed FAQPage schema, which must match what is visible. */
export const mathuraFaqs: Faq[] = [
  { q: "How many days are sufficient for Mathura?", a: "One full day covers the main sights of Mathura itself. Two days let you add Vrindavan comfortably. Three days allow Gokul, Govardhan, Barsana and Nandgaon." },
  { q: "What is the best time to visit Mathura?", a: "October to March has the most pleasant weather. Holi and Janmashtami are spiritually vibrant but crowded." },
  { q: "Which is the main railway station in Mathura?", a: "Mathura Junction is the main station, well connected to Delhi, Agra, Jaipur, Mumbai and many other cities." },
  { q: "How far is Mathura from Delhi?", a: "About 145 to 150 km, roughly 2.5 to 3.5 hours by road via the Yamuna Expressway or NH-19, or about 1.5 to 3 hours by train." },
  { q: "How far is Mathura from Agra?", a: "About 55 to 60 km, roughly 1 to 1.5 hours by road." },
  { q: "How far is Vrindavan from Mathura?", a: "About 11 to 15 km, usually 30 to 45 minutes depending on traffic." },
  { q: "Is Mathura safe for solo female travellers?", a: "Main temple and ghat areas are generally fine in the daytime. As in any busy pilgrimage city, I advise avoiding isolated lanes after dark, keeping valuables out of sight, using a trusted driver and booking a well-located hotel. Many women travel with us each year and we take extra care." },
  { q: "What is Mathura famous for buying?", a: "Mathura peda is number one. Other favourites are tulsi and rudraksha malas, Krishna deity clothing (poshak) and Laddu Gopal accessories, brass and copper items, handcrafted garlands and block-printed textiles. Buy from established shops near the temples and ask for a fair price." },
  { q: "What should I wear in Mathura?", a: "Modest, comfortable clothing covering shoulders and knees, and slip-on footwear, since you will remove it often." },
  { q: "Are mobile phones allowed at Krishna Janmasthan?", a: "Generally no. Phones, cameras and bags are usually not allowed inside, and lockers or cloakrooms are available outside. Check on the day, as rules can change." },
  { q: "Is there an entry fee for temples in Mathura?", a: "Most are free. The Government Museum charges a small ticket, and some special services or sections may have charges." },
  { q: "Is Mathura a good weekend getaway from Delhi?", a: "Yes. It is a popular Mathura weekend getaway. Weekends are busier, so I suggest leaving early on Saturday and visiting quieter sites first, or taking a weekday if you can." },
  { q: "Is Mathura vegetarian?", a: "The holy areas of Mathura and Vrindavan are largely vegetarian, and many places avoid onion and garlic too. We follow this tradition on all tours." },
  { q: "How much does a Mathura tour package cost?", a: `Our customised packages start from ${price}. The final price depends on group size, vehicle, number of days and whether you add a hotel. I always send a clear written quote with no hidden charges.` },
];

export const book = {
  title: "Book Your Mathura Package with Local Experts",
  paragraphs: [
    `Mathura rewards the traveller who slows down: a sunrise on the ghats, a quiet minute at the birthplace, a warm peda eaten on a doorstep. I would be honoured to be your guide for it. Since **${FOUNDED}**, **Mathura Vrindavan Trips** has guided **over ${pilgrims} pilgrims**, earning a **${RATING}-star rating**, and we plan every journey the way a Brijwasi would plan it for his own family.`,
    `Our **customised Mathura tour packages start from just ${price}**, with clear quotes and no hidden charges. We also offer **curated premium stays at top 4 and 5-star hotels** for a comfortable, stress-free trip, along with simpler stays for those who prefer them.`,
    "Tell me your dates, how many people are travelling and whether you have elders or children. I will reply personally with a plan that suits you.",
  ],
  callLabel: `Call or WhatsApp ${FOUNDER.name}:`,
  closing: "Mathura does not ask you to be perfect. It only asks you to come.",
  signoff: "Radhe Radhe. 🙏",
  signature: `- ${FOUNDER.name}, Founder, Mathura Vrindavan Trips`,
  /** Bold brand name, then the facts, as on the last line of the PDF. */
  strip: ["Mathura Vrindavan Trips: serving pilgrims since " + FOUNDED, `⭐ ${RATING}-star rated`, `🙏 ${PILGRIMS} pilgrims guided`, `Packages from ${price}`],
  formTitle: `Tell ${FOUNDER.name} about your Mathura trip`,
};

/** Internal links that continue the plan once the guide is read. */
export const continuePlanning = [
  { label: "Mathura Vrindavan 2 Days", text: "The classic first visit, as a private package", href: "/tour-packages/mathura-vrindavan-2-days" },
  { label: "Vrindavan travel guide", text: "Banke Bihari, Prem Mandir and the ghats", href: "/vrindavan" },
  { label: "Temple timings", text: "Darshan and aarti timings across Braj", href: "/mathura-vrindavan-temple-timings" },
  { label: "How to reach Braj", text: "From Delhi, Agra and beyond", href: "/travel-guide/how-to-reach-vrindavan-mathura" },
  { label: "Stay in Mathura or Vrindavan?", text: "Choosing the right base for your trip", href: "/travel-guide/stay-in-mathura-or-vrindavan" },
  { label: "Festivals of Braj", text: "Janmashtami, Holi, Radhashtami and more", href: "/festivals" },
];
