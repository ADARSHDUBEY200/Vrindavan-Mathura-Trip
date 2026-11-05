import { FOUNDED, FOUNDER, PILGRIMS, RATING, STARTING_PRICE, YEARS, formatInr } from "@/config/site";
import type { Season } from "./types";

/* Facts every guide in the series repeats. They come from config/site.ts so they change in one place. */

export const price = formatInr(STARTING_PRICE);
export const pilgrims = PILGRIMS.replace("+", "");
export const TIP = `${FOUNDER.name}'s local tip`;
export const founderLine = (places: string) =>
  `I am ${FOUNDER.name}, founder of **Mathura Vrindavan Trips**. I was born in Braj Bhoomi, and since ${FOUNDED} I have guided **over ${pilgrims} pilgrims** through ${places}. Our guests have given us a **${RATING}-star rating**, and our customised packages start from just **${price}**.`;
export const heroLede = `Our customised packages start from just **${price}**, and our guests have given us a **${RATING}-star rating**.`;
export const trackRecord = `Since **${FOUNDED}**, **Mathura Vrindavan Trips** has guided **over ${pilgrims} pilgrims**, earning a **${RATING}-star rating**`;
export const years = YEARS;
export const tellMe = "Tell me your dates, how many people are travelling and whether you have elders or children. I will reply personally with a plan that suits you.";
export const packagePrice = `Our customised packages start from ${price}. The final price depends on group size, vehicle, number of days and whether you add a hotel. I always send a clear written quote with no hidden charges.`;
export const whatsappFor = (place: string) => `Radhe Radhe ${FOUNDER.name} ji! I read your ${place} travel guide and would like to plan a trip. My dates and group details are:`;

/** The three seasons as each guide's table sets them out; only the notes differ. */
export const seasons = (winter: string, summer: string, monsoon: string): Season[] => [
  { key: "winter", name: "Winter", tag: "best", months: "October to March", note: winter },
  { key: "summer", name: "Summer", months: "April to June", note: summer },
  { key: "monsoon", name: "Monsoon", months: "July to September", note: monsoon },
];

export const BEST_TIME_GUIDE = "/travel-guide/best-time-to-visit-vrindavan-mathura";
