/**
 * Copy for /mathura-vrindavan-taxi-service, taken from the owner's "Mathura Vrindavan Taxi Service Content" brief.
 * Rates, distances and claims are the owner's figures: change them here only after the owner confirms.
 */
import { EMAIL, PHONE_DISPLAY, SITE_URL } from "@/config/site";
import type { PhotoKey } from "@/content/images";
import type { Faq } from "@/content/types";

export const TAXI_PATH = "/mathura-vrindavan-taxi-service";
/** Date (ISO) the taxi page copy was last reviewed. Shown on the page and used as `dateModified`. */
export const TAXI_UPDATED = "2026-11-05";

export const taxiMeta = {
  title: "Mathura Vrindavan Taxi Services | Cabs from ₹11/km, 24/7, Local Drivers",
  description:
    `Book Mathura Vrindavan taxi services with Harsh Sharma. Sedan from ₹11/km, Ertiga, Innova and Tempo Traveller. Delhi airport drops from ₹1,999, 24/7 support, Brijwasi drivers. Call ${PHONE_DISPLAY}.`,
  imageAlt: "A pearl-white Toyota Innova Crysta, one of the AC cabs for Mathura Vrindavan taxi services",
};

/* ------------------------------------------------------------------ */
/* Fleet                                                               */
/* ------------------------------------------------------------------ */

export type VehicleId = "sedan" | "muv" | "luxury" | "tempo";

export type Vehicle = {
  id: VehicleId;
  category: string;
  models: string;
  /** Lowest and highest ₹/km. Equal when the rate is a single figure. */
  rate: { min: number; max: number };
  seats: string;
  idealFor: string;
  image: PhotoKey;
};

export const fleet: Vehicle[] = [
  { id: "sedan", category: "Sedan", models: "Swift Dzire / Etios", rate: { min: 11, max: 11 }, seats: "4 seats", idealFor: "Couples, small families", image: "taxi-sedan" },
  { id: "muv", category: "MUV / SUV", models: "Ertiga / Kia Carens", rate: { min: 13, max: 13 }, seats: "Up to 6", idealFor: "Families with luggage", image: "taxi-ertiga" },
  { id: "luxury", category: "Luxury SUV", models: "Innova / Innova Crysta", rate: { min: 14, max: 18 }, seats: "Up to 6 to 7", idealFor: "Premium comfort, elders, long drives", image: "taxi-innova" },
  { id: "tempo", category: "Tempo Traveller", models: "12 to 17 seater", rate: { min: 22, max: 26 }, seats: "12 to 17", idealFor: "Large families, bhajan mandalis, groups", image: "taxi-tempo-traveller" },
];

export const rateLabel = (v: Vehicle) => (v.rate.min === v.rate.max ? `₹${v.rate.min}/km` : `₹${v.rate.min} to ₹${v.rate.max}/km`);
/** Label used in the booking form and WhatsApp messages. */
export const vehicleLabel = (v: Vehicle) => `${v.category} (${v.models})`;

export const RATE_NOTE =
  "Final rate within each range depends on the exact vehicle, season and trip type. Rates are “from” figures, and I confirm your exact quote in writing before you pay.";

/** Lines on every written quote. */
export const quoteLines = [
  "The per-km or package rate for your vehicle",
  "Toll and parking charges, shown separately",
  "Any driver allowance or night-halt charge that applies to your trip",
  "Waiting time terms",
];

/* ------------------------------------------------------------------ */
/* Trips (booking form) and packages                                   */
/* ------------------------------------------------------------------ */

export const tripTypes = [
  "Local sightseeing (same day)",
  "Delhi airport to Mathura/Vrindavan",
  "Railway station pickup",
  "Mathura to Agra / Taj Mahal",
  "Jaipur and Fatehpur Sikri",
  "84 Kos Braj Yatra",
  "Other route",
] as const;
export type TripType = (typeof tripTypes)[number];

export const localTour = {
  price: 2000,
  stops: [
    { place: "Vishram Ghat and Dwarkadhish Temple", when: "in the early morning" },
    { place: "Shri Krishna Janmabhoomi", when: "while queues are short" },
    { place: "Banke Bihari Temple", when: "in Vrindavan, timed to avoid the peak rush" },
    { place: "Nidhivan, Radha Raman and ISKCON", when: "" },
    { place: "Prem Mandir", when: "for the evening lights" },
  ],
  includes:
    "an AC car, a local driver who knows drop-off points and walking routes, flexible waiting time at each temple and my advice on timings. Temples close in the afternoon, so I plan a rest break into the day.",
};

export const airport = {
  price: 1999,
  features: [
    { title: "One-way and round-trip transfers", text: "available, starting at ₹1,999" },
    { title: "Meet-and-greet at arrivals,", text: "with your name on a board" },
    { title: "Flight tracking,", text: "so a delayed flight does not strand you" },
    { title: "24/7 pickups,", text: "including late-night and early-morning arrivals" },
    { title: "Direct drop", text: "to your hotel in Vrindavan or Mathura" },
  ],
};

export const outstation = [
  {
    title: "Taj Mahal day trip from Mathura:",
    text: "Leave early, see the Taj Mahal and Agra Fort, and return by evening for aarti. I advise going on a day other than Friday, when the Taj is closed to regular visitors.",
  },
  { title: "Agra to Mathura Vrindavan drop,", text: "for travellers continuing a Taj trip with a Braj yatra." },
  { title: "Jaipur and Fatehpur Sikri:", text: "One-way or round-trip, with comfortable stops." },
  { title: "Other cities:", text: "Tell me where you want to go, and I will quote." },
];

export const kosStops: { area: string; places: string; href?: string }[] = [
  { area: "Mathura and Vrindavan,", places: "the starting heart of Braj", href: "/vrindavan" },
  { area: "Gokul and Mahavan:", places: "Raman Reti, Brahmand Ghat and Nand Bhawan", href: "/gokul" },
  { area: "Govardhan:", places: "Daan Ghati, Mansi Ganga, Radha Kund and Kusum Sarovar", href: "/govardhan" },
  { area: "Barsana:", places: "Ladli Ji and Kirti Mandir", href: "/barsana" },
  { area: "Nandgaon:", places: "Nand Bhavan and Pavan Sarovar", href: "/nandgaon" },
];

export type Route = { from: string; to: string; distance: string; time: string; href?: string };

export const routes: Route[] = [
  { from: "Mathura Junction", to: "Vrindavan", distance: "11 to 15 km", time: "30 to 45 min", href: "/vrindavan" },
  { from: "Mathura", to: "Gokul", distance: "10 to 15 km", time: "30 min", href: "/gokul" },
  { from: "Mathura", to: "Govardhan", distance: "21 to 26 km", time: "40 to 60 min", href: "/govardhan" },
  { from: "Mathura", to: "Barsana", distance: "45 to 55 km", time: "1 to 1.5 hrs", href: "/barsana" },
  { from: "Barsana", to: "Nandgaon", distance: "8 to 10 km", time: "20 to 30 min", href: "/nandgaon" },
  { from: "Mathura", to: "Agra", distance: "55 to 60 km", time: "1 to 1.5 hrs" },
  { from: "Delhi IGI", to: "Mathura/Vrindavan", distance: "150 to 160 km", time: "3 to 3.5 hrs" },
  { from: "Mathura", to: "Jaipur", distance: "About 230 to 250 km", time: "4.5 to 5.5 hrs" },
];

/* ------------------------------------------------------------------ */
/* Why choose us, inclusions, FAQs                                     */
/* ------------------------------------------------------------------ */

export const safetyPoints = [
  { title: "GPS-enabled, well-serviced AC cars", text: "with regular maintenance checks" },
  { title: "Courteous, well-behaved chauffeurs", text: "who understand that your passengers are on a pilgrimage" },
  { title: "Great for female travellers and senior citizens:", text: "drivers are briefed to help elders at steps, wait patiently and drive gently" },
  { title: "Clear communication:", text: "you get your driver's name and number before pickup" },
  { title: "24/7 support:", text: "a real person answers if something goes wrong at midnight" },
];

export const inclusions: { item: string; text: string }[] = [
  { item: "Vehicle", text: "AC car, cleaned before every trip" },
  { item: "Driver", text: "Local, experienced and polite, who also guides" },
  { item: "Fuel", text: "Included in the per-km or package rate" },
  { item: "Tolls and parking", text: "Shown as separate line items on your written quote" },
  { item: "Waiting time", text: "Terms stated on your quote, with reasonable temple waiting built into packages" },
  { item: "Night pickups", text: "Available 24/7, with any night charges stated in advance" },
  { item: "Payment", text: "Confirmed at booking, and no surprise additions later" },
];

export const bookingNeeds = [
  { title: "Your pickup point", text: "and time (airport, station or hotel)" },
  { title: "Number of travellers,", text: "including any elders or small children" },
  { title: "Places you want to visit", text: "" },
  { title: "Dates", text: "of travel" },
];

export const taxiFaqs: Faq[] = [
  {
    q: "How much does a taxi cost for one day in Mathura Vrindavan?",
    a: "Our same-day local sightseeing packages start at ₹2,000, depending on vehicle and route. A sedan is the most economical, while Ertiga, Innova and Tempo Traveller cost more. I send an exact quote after you tell me your group size and itinerary.",
  },
  {
    q: "What is the per-km rate for a taxi in Mathura?",
    a: "Sedan ₹11/km, Ertiga/Kia Carens ₹13/km, Innova/Innova Crysta ₹14 to ₹18/km and Tempo Traveller ₹22 to ₹26/km. Your final quote is confirmed in writing.",
  },
  {
    q: "Are your cabs available at Mathura Junction Railway Station?",
    a: "Yes. We pick up from Mathura Junction, Mathura Cantt, Vrindavan station and Agra stations. Share your train number, and the driver tracks arrival time.",
  },
  {
    q: "Do you provide Delhi IGI Airport pickup at night?",
    a: "Yes. We are 24/7, and night and early-morning pickups are common. Please book in advance so I can assign a rested driver, and I will confirm any night charges in your quote.",
  },
  {
    q: "How much is the Delhi airport to Vrindavan taxi fare?",
    a: "Airport transfers start at ₹1,999 for one-way service, depending on vehicle and timing. Round trips and larger vehicles are quoted separately.",
  },
  {
    q: "Is parking and toll tax included in the fare?",
    a: "Tolls and parking are shown as separate, clearly listed items on your written quote. You will know the amounts before you travel, and nothing is added at the end.",
  },
  {
    q: "Can I book a cab for a Mathura to Agra Taxi round trip?",
    a: "Yes. Agra is 55 to 60 km away, about 1 to 1.5 hours each way. Our drivers wait while you visit the Taj Mahal and Agra Fort. The Taj is closed on Fridays for regular visitors, so plan accordingly.",
  },
  {
    q: "Do you provide a taxi for the 84 Kos Yatra?",
    a: "Yes. We offer an 84 Kos Yatra taxi with experienced drivers who know the route, the stops and the timings, as a multi-day package or in segments.",
  },
  {
    q: "Is a Tempo Traveller on rent in Mathura available for large groups?",
    a: "Yes, in 12 to 17 seater options with AC. Rates run ₹22 to ₹26/km. It is ideal for family groups, temple groups and bhajan mandalis.",
  },
  {
    q: "Are your drivers good for elderly passengers and women travelling alone?",
    a: "Yes. Our drivers are briefed to be patient, courteous and helpful with elders. Many women travel with us each year. I share the driver's name and number before pickup, and our 24/7 line is always open.",
  },
  {
    q: "Do drivers wait at temples?",
    a: "Yes. Waiting time at temples is built into our planning, and your driver will not rush you. Because temples close in the afternoon, I plan breaks around those windows.",
  },
  {
    q: "Can I customise the route?",
    a: "Absolutely. Most guests do. Add Govardhan, drop Prem Mandir, extend to Agra or Jaipur. Tell me, and I will adjust the plan and the quote.",
  },
  {
    q: "How early should I book during Holi or Janmashtami?",
    a: "As early as you can, at least four to six weeks ahead for festivals like Holi, Janmashtami and Radhashtami. Vehicles, drivers and hotels sell out fast, and roads are restricted near temples.",
  },
  {
    q: "Can you also arrange hotels?",
    a: "Yes. We can arrange stays from simple ashram guesthouses to top 4 and 5-star hotels in Mathura and Vrindavan. Ask for a combined cab-and-stay quote.",
  },
  {
    q: "How do I book?",
    a: `Call or WhatsApp ${PHONE_DISPLAY}, email ${EMAIL} or visit ${SITE_URL}/. Share your dates, pickup point, group size and destinations, and I will reply with a written quote.`,
  },
];
