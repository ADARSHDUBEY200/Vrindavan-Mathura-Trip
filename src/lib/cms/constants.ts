import type { EditorType } from "./config";

export const BLOG_CATEGORIES = [
  "Krishna Leela & Spirituality",
  "Temple Guides",
  "Sacred Places & Nature",
  "Travel Guides",
  "Festivals & Events",
  "Pilgrimage & Yatra",
  "Food & Culture",
  "Tour Packages & Services",
  "Stories & Experiences",
] as const;

export const PACKAGE_CATEGORIES = Array.from({ length: 10 }, (_, i) => `${i + 1} Day Tour Package`);

export const TEMPLE_LOCATIONS = ["Vrindavan", "Mathura", "Barsana", "Gokul", "Govardhan", "Nandgaon", "Baldeo", "Rawal"] as const;

export const SOURCE_CITIES = [
  "Delhi",
  "Agra",
  "Mathura",
  "Vrindavan",
  "Jaipur",
  "Lucknow",
  "Noida",
  "Gurugram",
  "Ghaziabad",
  "Faridabad",
  "Chandigarh",
  "Mumbai",
  "Kolkata",
  "Bengaluru",
] as const;

export const CATEGORY_OPTIONS: Record<EditorType, readonly string[]> = {
  Blog: BLOG_CATEGORIES,
  Package: PACKAGE_CATEGORIES,
  Temple: TEMPLE_LOCATIONS,
};

export const CATEGORY_LABEL: Record<EditorType, string> = {
  Blog: "Category",
  Package: "Category",
  Temple: "Location",
};

export const MAX_IMAGE_BYTES = 2 * 1024 * 1024;
