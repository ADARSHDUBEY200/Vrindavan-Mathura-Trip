import { Cormorant_Garamond } from "next/font/google";

/** Display serif for the Mathura guide (`font-editorial` / `.mt-*` in mathura.css). Loaded on that page only. */
export const editorial = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["500", "600"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-cormorant",
});
