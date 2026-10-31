import { Eczar } from "next/font/google";

/** Display face for /vrindavan: one Indian-drawn design across Latin and Devanagari (`.vrn` in vrindavan.css). */
export const eczar = Eczar({
  // Only Latin is preloaded. The Devanagari face still loads on demand through its unicode-range.
  subsets: ["latin"],
  display: "swap",
  variable: "--font-eczar",
});
