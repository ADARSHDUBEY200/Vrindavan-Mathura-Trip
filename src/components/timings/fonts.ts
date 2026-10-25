import { Tiro_Devanagari_Hindi } from "next/font/google";

/** Devanagari face for the Hindi temple names on the timings page (`.hi` in globals.css). */
export const devanagari = Tiro_Devanagari_Hindi({
  subsets: ["devanagari"],
  weight: "400",
  display: "swap",
  variable: "--font-devanagari",
});
