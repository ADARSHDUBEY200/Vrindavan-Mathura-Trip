import type { Faq } from "@/content/types";
import type { PhotoKey } from "@/content/images";

/*
 * One shape for the Braj destination guides (/gokul, /govardhan, /barsana, /nandgaon).
 * Copy keeps the PDFs' inline markup: `**bold**`, `*italic*` and `[label](/href)` links.
 */

export type Rich = string;

export type GuideTip = { label: string; text?: Rich; points?: readonly Rich[] };

export type PlaceIcon = "water" | "footprints" | "leaf" | "temple" | "mountain" | "flower" | "sun";

export type GuidePlace = {
  id: string;
  name: string;
  /** Its own page on this site, when one exists. */
  href?: string;
  image?: PhotoKey;
  /** A second, smaller photograph laid over the corner of the first. */
  inset?: PhotoKey;
  caption?: string;
  imagePosition?: string;
  /** Stands in for a photograph on text-only cards. */
  icon?: PlaceIcon;
  paragraphs: readonly Rich[];
  /** A short aside, such as a clarification between two similar sites. */
  note?: Rich;
  timings?: { label: string; text: Rich };
  tip?: GuideTip;
  /** feature: pinned photo beside a long entry · split: photo to one side · dark: the walk's one dark card · card: grouped into a row. */
  layout: "feature" | "split" | "dark" | "card";
};

export type GuideExperience = {
  id?: string;
  title: string;
  eyebrow?: string;
  image?: PhotoKey;
  inset?: PhotoKey;
  imagePosition?: string;
  paragraphs: readonly Rich[];
  list?: { title?: string; items: readonly Rich[] };
  tip?: GuideTip;
  close?: Rich;
  /** feature: a full dark set piece · split: photo beside text · card: grouped into a row. */
  layout: "feature" | "split" | "card";
};

export type Season = { key: "winter" | "summer" | "monsoon"; name: string; tag?: string; months: string; note: string };

export type GuidePeak = { title: string; image?: PhotoKey; paragraphs?: readonly Rich[]; points?: readonly Rich[]; tipLabel?: string; close?: Rich };

export type BrajGuide = {
  slug: "gokul" | "govardhan" | "barsana" | "nandgaon";
  name: string;
  path: string;
  updated: string;
  meta: { title: string; description: string; imageAlt: string };
  /** Approximate centre of the town, for Place schema. */
  geo: { latitude: number; longitude: number };
  hero: { image: PhotoKey; imagePosition?: string; scriptWord: string; sub: string; lede: Rich; whatsappMessage: string };
  nav: readonly { id: string; label: string }[];
  intro: { greeting: string; paragraphs: readonly Rich[]; note: Rich };
  glance: { title: string; rows: readonly { label: string; value: string }[] };
  story: { title: string; eyebrow: string; image: PhotoKey; imagePosition?: string; caption?: string; paragraphs: readonly Rich[]; highlight?: Rich };
  callout?: { title: string; text: Rich };
  places: { title: string; lede: Rich; items: readonly GuidePlace[]; more?: { title: string; items: readonly { name: string; text: Rich }[] } };
  things: { title: string; lede: Rich; items: readonly GuideExperience[] };
  bestTime: { title: string; image?: PhotoKey; text: Rich; seasons: readonly Season[]; festivals: Partial<Record<number, string>>; peaks: readonly GuidePeak[]; close?: Rich };
  reach: {
    title: string;
    lede: Rich;
    image?: PhotoKey;
    modes: readonly { key: "air" | "train" | "road"; title: string; points?: readonly Rich[]; text?: Rich; note?: Rich }[];
    note?: { label: string; text: Rich };
  };
  day?: { title: string; lede?: string; stops: readonly { time: string; text: Rich }[]; close?: Rich };
  carry: { title: string; items: readonly Rich[]; close?: Rich };
  stay: { title: string; paragraphs: readonly Rich[] };
  faqTitle: string;
  faqs: Faq[];
  book: { title: string; paragraphs: readonly Rich[]; closing: string; formTitle: string };
  continuePlanning: readonly { label: string; text: string; href: string }[];
};

/** January → December. Every guide in this series uses the same three seasons. */
export const BRAJ_MONTHS = ["winter", "winter", "winter", "summer", "summer", "summer", "monsoon", "monsoon", "monsoon", "winter", "winter", "winter"] as const;
