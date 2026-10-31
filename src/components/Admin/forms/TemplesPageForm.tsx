"use client";

import { SitePageEditor, type PageGroup } from "@/components/Admin/CMS/SitePageEditor";
import { TEMPLES_PAGE_SECTIONS, templesPage, type TemplesPage } from "@/content/temples-page";
import { TEMPLES_PAGE_SLUG } from "@/lib/cms/config";

type Key = keyof TemplesPage;

/** Editor layout, in page order. */
const GROUPS: PageGroup<Key>[] = [
  { title: "SEO", helper: "Title, description and keywords for /temples.", keys: ["meta"] },
  { title: "Hero", helper: "Headline, stats and the three arched photos (.webp, 2 MB max).", keys: ["hero"] },
  { title: "Welcome letter", helper: "Harsh's greeting and the note on timings.", keys: ["letter"] },
  { title: "Mandir list at a glance", helper: "One list per place. Each row can link to a temple page.", keys: ["glance"] },
  { title: "Temple finder", helper: "Headings only. The temples themselves come from the Temple Editor.", keys: ["explorer"] },
  { title: "Temple chapters", helper: "Vrindavan, Mathura and nearby Braj: add, edit, remove or reorder chapters and the temples inside them.", keys: ["chapters"] },
  { title: "Timings and darshan planning", helper: "The planning table and the darshan-day note.", keys: ["planner"] },
  { title: "Etiquette and logistics", helper: "Dress code, monkeys, e-rickshaws, photography and stays.", keys: ["etiquette"] },
  { title: "FAQs", helper: "Questions and answers. Also published as FAQ structured data.", keys: ["faqSection", "faqs"] },
  { title: "Book your journey", helper: "Closing panel.", keys: ["book"] },
];

const LABELS: Partial<Record<Key, string>> = { chapters: "Chapters", faqs: "Questions" };

export default function TemplesPageForm() {
  return (
    <SitePageEditor
      slug={TEMPLES_PAGE_SLUG}
      rowTitle="Temples Page"
      heading="Temples Page"
      description="Everything on /temples except the temple cards, which come from the Temple Editor. Text supports **bold**, *italic* and [label](/link)."
      defaults={templesPage}
      groups={GROUPS}
      labels={LABELS}
      sections={TEMPLES_PAGE_SECTIONS}
      bucket="Temple"
    />
  );
}
