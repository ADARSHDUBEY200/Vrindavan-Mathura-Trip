import type { PhotoKey } from "./images";

export type DurationFilter = "same-day" | "1-day" | "2-days" | "3-plus" | "combo";

export const durationFilters: { id: DurationFilter; label: string }[] = [
  { id: "same-day", label: "Same day" },
  { id: "1-day", label: "1 day" },
  { id: "2-days", label: "2 days" },
  { id: "3-plus", label: "3+ days" },
  { id: "combo", label: "Combo circuits" },
];

export type ItineraryDay = { day: string; title: string; text: string; stops?: string[] };

export type TourPackage = {
  slug: string;
  title: string;
  /** Short label, e.g. "2 days · 1 night". */
  duration: string;
  /** Number of travel days, used for schema and sorting. */
  days: number;
  filters: DurationFilter[];
  startsFrom: string;
  route: string[];
  summary: string;
  image: PhotoKey;
  highlights: string[];
  itinerary: ItineraryDay[];
  inclusions: string[];
  exclusions: string[];
  notes: string[];
  idealFor: string[];
  /** Leave undefined to show "Price on request". Never publish a price you don't honour. */
  price?: { amount: number; currency: "INR"; basis: string };
  featured?: boolean;
  related: string[];
};

const commonInclusions = [
  "Private air-conditioned car with an experienced local driver",
  "Pickup and drop from your hotel, home, railway station or airport in the starting city",
  "Itinerary planned around current darshan timings",
  "Toll, parking, fuel and driver allowance",
  "WhatsApp support from our team throughout the trip",
];

const commonExclusions = [
  "Temple donations, prasad and special puja costs",
  "Meals, unless mentioned",
  "Entry or ropeway tickets, boat rides and camera fees",
  "Personal expenses and tips",
];

export const packages: TourPackage[] = [
  {
    slug: "vrindavan-one-day-darshan",
    title: "Vrindavan One-Day Darshan",
    duration: "1 day",
    days: 1,
    filters: ["same-day", "1-day"],
    startsFrom: "Delhi NCR, Agra or Mathura",
    route: ["Vrindavan"],
    summary:
      "A calm, well-timed day in Vrindavan: Banke Bihari darshan, the old temple lanes, ISKCON kirtan and Prem Mandir lit up at dusk — without rushing from queue to queue.",
    image: "banke-bihari-gate",
    featured: true,
    highlights: [
      "Morning darshan at Shri Banke Bihari ji",
      "Nidhivan, Radha Vallabh and Radha Raman in the old town",
      "ISKCON Krishna-Balaram Mandir",
      "Prem Mandir illumination after sunset",
      "Optional Yamuna boat ride at Keshi Ghat",
    ],
    itinerary: [
      {
        day: "Morning",
        title: "Banke Bihari & the old temple lanes",
        text: "Early departure so you reach Vrindavan as Banke Bihari opens. After darshan, walk to Nidhivan and the nearby Goswami temples with time to sit and absorb the atmosphere.",
        stops: ["Banke Bihari", "Nidhivan", "Radha Vallabh", "Radha Raman"],
      },
      {
        day: "Afternoon",
        title: "Rest, lunch & the riverfront",
        text: "Temples close in the afternoon, so we plan a relaxed lunch and an optional boat ride or stroll along Keshi Ghat.",
        stops: ["Keshi Ghat"],
      },
      {
        day: "Evening",
        title: "ISKCON & Prem Mandir lights",
        text: "Evening aarti and kirtan at ISKCON, then Prem Mandir as the lights come on. Drive back after the show.",
        stops: ["ISKCON", "Prem Mandir"],
      },
    ],
    inclusions: commonInclusions,
    exclusions: [...commonExclusions, "Hotel stay (not required for a day trip)"],
    notes: [
      "From Delhi the drive is roughly 3–4 hours each way via the Yamuna Expressway, so this is a long day.",
      "Weekends and festival days can mean long queues at Banke Bihari; we will advise the best day.",
    ],
    idealFor: ["First-time visitors short on time", "Day trips from Delhi or Agra", "Families with older children"],
    related: ["mathura-vrindavan-2-days", "govardhan-barsana-same-day", "agra-mathura-vrindavan-3-days"],
  },
  {
    slug: "govardhan-barsana-same-day",
    title: "Govardhan, Barsana & Nandgaon Same-Day Yatra",
    duration: "1 day",
    days: 1,
    filters: ["same-day", "1-day"],
    startsFrom: "Mathura or Vrindavan",
    route: ["Govardhan", "Radha Kund", "Barsana", "Nandgaon"],
    summary:
      "The heartland of Radha Krishna’s pastimes in one day: Giriraj ji at Govardhan, Radha Kund, the hilltop Radha Rani temple in Barsana and Nand Bhawan in Nandgaon.",
    image: "radha-rani-barsana",
    highlights: [
      "Giriraj ji darshan at Daan Ghati and Mukharvind",
      "Govardhan parikrama by car or e-rickshaw (or on foot, if you wish)",
      "Radha Kund & Shyam Kund",
      "Shri Radha Rani Temple, Barsana",
      "Nand Bhawan, Nandgaon",
    ],
    itinerary: [
      {
        day: "Morning",
        title: "Govardhan & parikrama",
        text: "Start at Daan Ghati with darshan of Giriraj ji, then go around the hill by car or e-rickshaw, stopping at Mansi Ganga, Kusum Sarovar and Radha Kund.",
        stops: ["Daan Ghati", "Mansi Ganga", "Kusum Sarovar", "Radha Kund"],
      },
      {
        day: "Midday",
        title: "Barsana — home of Shri Radha",
        text: "Climb (or take the ropeway, when it is operating) to the Radha Rani temple on Bhanugarh hill. Lunch break in Barsana.",
        stops: ["Radha Rani Temple"],
      },
      {
        day: "Evening",
        title: "Nandgaon & return",
        text: "Evening darshan at Nand Bhawan before driving back to Mathura or Vrindavan.",
        stops: ["Nand Bhawan"],
      },
    ],
    inclusions: commonInclusions,
    exclusions: [...commonExclusions, "E-rickshaw parikrama fare, if chosen"],
    notes: [
      "The full walking parikrama is about 21 km; if you wish to walk, we suggest a separate early-morning start.",
      "Barsana involves a fair climb of steps; tell us about mobility needs and we will plan accordingly.",
    ],
    idealFor: ["Pilgrims already staying in Mathura or Vrindavan", "Devotees of Shri Radha", "Second-day add-on"],
    related: ["mathura-vrindavan-2-days", "braj-84-kos-yatra", "vrindavan-one-day-darshan"],
  },
  {
    slug: "mathura-vrindavan-2-days",
    title: "Mathura Vrindavan 2 Days",
    duration: "2 days · 1 night",
    days: 2,
    filters: ["2-days"],
    startsFrom: "Delhi NCR, Agra or Mathura",
    route: ["Mathura", "Vrindavan"],
    summary:
      "The classic first visit to Braj. Day one in Mathura for Krishna Janmabhoomi, Dwarkadhish and the Yamuna aarti; day two across Vrindavan’s great temples, at a pace that leaves room for devotion.",
    image: "dwarkadhish",
    featured: true,
    highlights: [
      "Shri Krishna Janmabhoomi and Dwarkadhish temple",
      "Evening Yamuna aarti at Vishram Ghat",
      "Banke Bihari, Radha Raman and Nidhivan",
      "ISKCON and Prem Mandir in the evening",
      "Hotel stay in Vrindavan or Mathura (on request)",
    ],
    itinerary: [
      {
        day: "Day 1",
        title: "Arrive in Mathura",
        text: "Pickup and drive to Mathura. Visit Krishna Janmabhoomi and Dwarkadhish (timed to its short darshan slots), then rest before the evening aarti at Vishram Ghat. Overnight in Vrindavan or Mathura.",
        stops: ["Krishna Janmabhoomi", "Dwarkadhish", "Vishram Ghat"],
      },
      {
        day: "Day 2",
        title: "A full day in Vrindavan",
        text: "Morning darshan at Banke Bihari and the old town temples. Afternoon rest or a boat ride at Keshi Ghat, then ISKCON and Prem Mandir in the evening before the drive home.",
        stops: ["Banke Bihari", "Nidhivan", "Radha Raman", "ISKCON", "Prem Mandir"],
      },
    ],
    inclusions: [...commonInclusions, "Hotel booking assistance in your budget"],
    exclusions: [...commonExclusions, "Hotel charges (quoted separately to suit your budget)"],
    notes: ["Can be extended with a Govardhan–Barsana day.", "Janmabhoomi does not allow phones or bags; you can leave them in the car."],
    idealFor: ["First-time pilgrims", "Families and seniors", "Weekend trips from Delhi"],
    related: ["govardhan-barsana-same-day", "agra-mathura-vrindavan-3-days", "vrindavan-one-day-darshan"],
  },
  {
    slug: "agra-mathura-vrindavan-3-days",
    title: "Agra Mathura Vrindavan 3 Days",
    duration: "3 days · 2 nights",
    days: 3,
    filters: ["3-plus", "combo"],
    startsFrom: "Delhi NCR",
    route: ["Agra", "Mathura", "Vrindavan"],
    summary:
      "See the Taj Mahal and spend two unhurried days in Braj. A popular circuit for families and overseas guests combining Mughal Agra with the land of Krishna.",
    image: "taj-mahal",
    featured: true,
    highlights: [
      "Taj Mahal and Agra Fort",
      "Krishna Janmabhoomi and Vishram Ghat aarti",
      "A full day in Vrindavan’s temples",
      "Optional Govardhan visit",
    ],
    itinerary: [
      {
        day: "Day 1",
        title: "Delhi to Agra",
        text: "Morning drive on the Yamuna Expressway. Visit the Taj Mahal and Agra Fort, with time for lunch and the markets. Overnight in Agra. (The Taj Mahal is closed on Fridays.)",
        stops: ["Taj Mahal", "Agra Fort"],
      },
      {
        day: "Day 2",
        title: "Agra to Mathura",
        text: "Drive to Mathura (around 1–1.5 hours). Krishna Janmabhoomi and Dwarkadhish, then the evening Yamuna aarti at Vishram Ghat. Overnight in Vrindavan.",
        stops: ["Krishna Janmabhoomi", "Dwarkadhish", "Vishram Ghat"],
      },
      {
        day: "Day 3",
        title: "Vrindavan & return",
        text: "Banke Bihari, Nidhivan, ISKCON and Prem Mandir, timed around darshan. Drive back to Delhi in the evening.",
        stops: ["Banke Bihari", "Nidhivan", "ISKCON", "Prem Mandir"],
      },
    ],
    inclusions: [...commonInclusions, "Hotel booking assistance in Agra and Vrindavan"],
    exclusions: [...commonExclusions, "Hotel charges", "Monument entry tickets and guide fees in Agra"],
    notes: ["The Taj Mahal is closed every Friday — we plan the order around this.", "Can start from Agra instead of Delhi."],
    idealFor: ["Families", "Overseas and NRI visitors", "Travellers combining heritage with pilgrimage"],
    related: ["mathura-vrindavan-2-days", "braj-ayodhya-varanasi-6-days", "vrindavan-one-day-darshan"],
  },
  {
    slug: "braj-84-kos-yatra",
    title: "Braj 84 Kos Yatra by Road",
    duration: "5 days · 4 nights",
    days: 5,
    filters: ["3-plus"],
    startsFrom: "Mathura or Delhi NCR",
    route: ["Mathura", "Gokul", "Baldeo", "Vrindavan", "Govardhan", "Barsana", "Nandgaon", "Kamyavan"],
    summary:
      "A road-based darshan of the principal sites of the Braj 84 Kos parikrama — the sacred forests, kunds and villages of Krishna’s childhood — at a devotional, unhurried pace.",
    image: "govardhan-dham",
    highlights: [
      "Gokul, Raman Reti and Dauji temple at Baldeo",
      "Vrindavan’s seven Goswami temples",
      "Govardhan, Radha Kund and Kusum Sarovar",
      "Barsana, Nandgaon and the forests of Kamyavan",
      "Evening aartis on the Yamuna",
    ],
    itinerary: [
      {
        day: "Day 1",
        title: "Mathura",
        text: "Krishna Janmabhoomi, Dwarkadhish and the ghats, ending with the Vishram Ghat aarti — the traditional start of the Braj parikrama.",
        stops: ["Krishna Janmabhoomi", "Dwarkadhish", "Vishram Ghat"],
      },
      {
        day: "Day 2",
        title: "Gokul, Mahavan & Baldeo",
        text: "Cross the Yamuna to Gokul, Raman Reti and Brahmand Ghat, then the Dauji temple at Baldeo.",
        stops: ["Gokul", "Raman Reti", "Brahmand Ghat", "Dauji"],
      },
      {
        day: "Day 3",
        title: "Vrindavan",
        text: "A full day for the temples of Vrindavan — Banke Bihari, Radha Raman, Govind Dev, Madan Mohan — with Keshi Ghat at dusk.",
        stops: ["Banke Bihari", "Radha Raman", "Govind Dev Ji", "Madan Mohan", "Keshi Ghat"],
      },
      {
        day: "Day 4",
        title: "Govardhan & Radha Kund",
        text: "Giriraj ji darshan and parikrama, with Radha Kund, Shyam Kund, Kusum Sarovar and Mansi Ganga.",
        stops: ["Daan Ghati", "Radha Kund", "Kusum Sarovar", "Mansi Ganga"],
      },
      {
        day: "Day 5",
        title: "Barsana, Nandgaon & Kamyavan",
        text: "The hilltop temples of Barsana and Nandgaon, and the kunds and shrines of Kamyavan, before returning to Mathura.",
        stops: ["Radha Rani Temple", "Nand Bhawan", "Kamyavan"],
      },
    ],
    inclusions: [...commonInclusions, "Hotel booking assistance", "Local guide on request"],
    exclusions: [...commonExclusions, "Hotel charges", "Guide fees, if requested"],
    notes: [
      "The traditional 84 Kos parikrama is a walking pilgrimage of several weeks. This is a road-based darshan of its key sites, not a replacement for the walking yatra.",
      "We can lengthen the trip to include more vans and kunds at a slower pace.",
    ],
    idealFor: ["Devotees who want to see all of Braj", "Groups and extended families", "Repeat visitors"],
    related: ["govardhan-barsana-same-day", "mathura-vrindavan-2-days", "janmashtami-special"],
  },
  {
    slug: "braj-ayodhya-varanasi-6-days",
    title: "Mathura Vrindavan Ayodhya Varanasi 6 Days",
    duration: "6 days · 5 nights",
    days: 6,
    filters: ["3-plus", "combo"],
    startsFrom: "Delhi NCR",
    route: ["Mathura", "Vrindavan", "Ayodhya", "Varanasi"],
    summary:
      "Three great tirthas in one journey: the land of Krishna, Shri Ram’s Ayodhya and the ghats of Kashi. Road, rail or flight connections planned to suit your group.",
    image: "ayodhya",
    highlights: [
      "Two days across Mathura and Vrindavan",
      "Shri Ram Janmabhoomi Mandir and Hanuman Garhi, Ayodhya",
      "Kashi Vishwanath and Ganga aarti at Dashashwamedh Ghat",
      "Sunrise boat ride on the Ganga",
    ],
    itinerary: [
      { day: "Day 1", title: "Delhi to Mathura", text: "Drive to Mathura; Janmabhoomi, Dwarkadhish and Vishram Ghat aarti.", stops: ["Krishna Janmabhoomi", "Vishram Ghat"] },
      { day: "Day 2", title: "Vrindavan", text: "Banke Bihari, the old town temples, ISKCON and Prem Mandir.", stops: ["Banke Bihari", "ISKCON", "Prem Mandir"] },
      { day: "Day 3", title: "Onward to Ayodhya", text: "Travel to Ayodhya by train, flight or road (we will advise the best option for your dates). Evening at the Saryu ghats.", stops: ["Saryu Ghat"] },
      { day: "Day 4", title: "Ayodhya", text: "Shri Ram Janmabhoomi Mandir, Hanuman Garhi and Kanak Bhawan, then drive to Varanasi.", stops: ["Ram Mandir", "Hanuman Garhi", "Kanak Bhawan"] },
      { day: "Day 5", title: "Varanasi", text: "Kashi Vishwanath darshan and the evening Ganga aarti at Dashashwamedh Ghat.", stops: ["Kashi Vishwanath", "Dashashwamedh Ghat"] },
      { day: "Day 6", title: "Sunrise on the Ganga & departure", text: "Early boat ride along the ghats, then transfer to the airport or station.", stops: ["Assi Ghat"] },
    ],
    inclusions: [...commonInclusions, "Hotel booking assistance in each city", "Help with train or flight bookings"],
    exclusions: [...commonExclusions, "Hotel charges", "Train or flight fares"],
    notes: ["Order can be reversed if you are starting from Varanasi.", "Kashi Vishwanath has its own security rules for phones and bags."],
    idealFor: ["Families on a once-in-a-lifetime tirtha yatra", "Senior pilgrims (with a slower pace)", "NRI visitors"],
    related: ["agra-mathura-vrindavan-3-days", "haridwar-rishikesh-braj-5-days", "mathura-vrindavan-2-days"],
  },
  {
    slug: "haridwar-rishikesh-braj-5-days",
    title: "Haridwar Rishikesh & Braj 5 Days",
    duration: "5 days · 4 nights",
    days: 5,
    filters: ["3-plus", "combo"],
    startsFrom: "Delhi NCR",
    route: ["Haridwar", "Rishikesh", "Mathura", "Vrindavan"],
    summary:
      "From the Ganga in the Himalayan foothills to the Yamuna of Braj: Har Ki Pauri aarti, the ashrams of Rishikesh, and two days of darshan in Mathura and Vrindavan.",
    image: "rishikesh",
    highlights: [
      "Ganga aarti at Har Ki Pauri, Haridwar",
      "Triveni Ghat and the ashrams of Rishikesh",
      "Mathura’s Janmabhoomi and Vishram Ghat",
      "Banke Bihari and Prem Mandir in Vrindavan",
    ],
    itinerary: [
      { day: "Day 1", title: "Delhi to Haridwar", text: "Drive to Haridwar and attend the evening Ganga aarti at Har Ki Pauri.", stops: ["Har Ki Pauri"] },
      { day: "Day 2", title: "Rishikesh", text: "Ram Jhula, Lakshman Jhula area and the evening aarti at Triveni Ghat or Parmarth Niketan.", stops: ["Triveni Ghat", "Parmarth Niketan"] },
      { day: "Day 3", title: "Rishikesh to Braj", text: "A long drive to Vrindavan (about 7–8 hours), with rest stops. Evening at leisure.", stops: [] },
      { day: "Day 4", title: "Vrindavan", text: "Banke Bihari, Radha Raman, ISKCON and Prem Mandir.", stops: ["Banke Bihari", "ISKCON", "Prem Mandir"] },
      { day: "Day 5", title: "Mathura & return", text: "Krishna Janmabhoomi and Dwarkadhish, then drive back to Delhi.", stops: ["Krishna Janmabhoomi", "Dwarkadhish"] },
    ],
    inclusions: [...commonInclusions, "Hotel booking assistance in each town"],
    exclusions: [...commonExclusions, "Hotel charges", "Rafting or other activities"],
    notes: ["Day 3 is a long road day; we can add an overnight break if needed."],
    idealFor: ["Pilgrims combining Ganga and Yamuna tirthas", "Families with a week to spare"],
    related: ["braj-ayodhya-varanasi-6-days", "mathura-vrindavan-2-days", "agra-mathura-vrindavan-3-days"],
  },
  {
    slug: "janmashtami-special",
    title: "Janmashtami Special in Mathura & Vrindavan",
    duration: "2–3 days",
    days: 3,
    filters: ["2-days", "3-plus"],
    startsFrom: "Delhi NCR, Agra or Mathura",
    route: ["Mathura", "Vrindavan", "Gokul"],
    summary:
      "Celebrate Krishna’s birthday where it all began. We plan around the festival crowds — where to be for the midnight celebrations, where to stay, and how to keep elders comfortable.",
    image: "janmabhoomi",
    highlights: [
      "Janmashtami celebrations in Mathura and Vrindavan",
      "Festival decorations at the great temples",
      "Nand Utsav celebrations the following day",
      "Practical crowd planning and car positioning",
    ],
    itinerary: [
      { day: "Day 1", title: "Arrive before the rush", text: "Reach Braj a day early, settle in and visit temples before festival crowds peak.", stops: ["Vrindavan temples"] },
      { day: "Day 2", title: "Janmashtami", text: "Darshan of festival decorations through the day. In the evening we plan a realistic place to be for the midnight birth celebrations, based on current crowd and police arrangements.", stops: ["Krishna Janmabhoomi", "Banke Bihari"] },
      { day: "Day 3", title: "Nand Utsav", text: "Celebrations continue the next day, especially in Gokul and Nandgaon. Return in the afternoon or extend.", stops: ["Gokul"] },
    ],
    inclusions: [...commonInclusions, "Hotel booking assistance (book early — rooms sell out)"],
    exclusions: [...commonExclusions, "Hotel charges (festival rates apply)"],
    notes: [
      "Janmashtami falls in August or September; confirm the date for your year.",
      "Roads close and vehicles are restricted near major temples on festival night, so some walking is unavoidable.",
      "Very large crowds — not ideal for infants or those with limited mobility.",
    ],
    idealFor: ["Devotees who want to be in Braj for the festival", "Groups who book early"],
    related: ["mathura-vrindavan-2-days", "braj-84-kos-yatra", "govardhan-barsana-same-day"],
  },
];

export function getPackage(slug: string): TourPackage | undefined {
  return packages.find((p) => p.slug === slug);
}

export function getPackages(slugs: string[]): TourPackage[] {
  return slugs.map(getPackage).filter((p): p is TourPackage => Boolean(p));
}

export function formatPrice(p: TourPackage): string {
  if (!p.price) return "Price on request";
  return `₹${p.price.amount.toLocaleString("en-IN")} ${p.price.basis}`;
}
