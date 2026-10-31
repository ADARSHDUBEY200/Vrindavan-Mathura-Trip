"use client";

import { SitePageEditor, type PageGroup } from "@/components/Admin/CMS/SitePageEditor";
import { tourPackagesPage, type TourPackagesPage } from "@/content/tour-packages";
import { TOUR_PACKAGES_PAGE_SLUG } from "@/lib/cms/config";

type Key = keyof TourPackagesPage;

/** Editor layout, in page order. `toggle` is the key the public page checks before showing a section. */
const GROUPS: PageGroup<Key>[] = [
  { title: "SEO", helper: "Title, description and keywords for /tour-packages.", keys: ["meta"] },
  { title: "Hero", helper: "Top of the page.", keys: ["hero"] },
  { title: "Page images", helper: "Hero, Parikrama, stays and booking photos (.webp, 2 MB max).", keys: ["images"] },
  { title: "Quick facts", helper: "The facts panel under the hero.", keys: ["quickFacts"], toggle: "quickFacts" },
  { title: "My connection", helper: "The founder's story.", keys: ["connection"], toggle: "connection" },
  { title: "Package listing & summaries", helper: "Headings for the package grid, plus the text around the summary cards.", keys: ["packagesSection"], toggle: "listing" },
  { title: "Package summary cards", helper: "1-day, 2-day, weekend and add-ons cards.", keys: ["packages"], toggle: "byDuration" },
  { title: "Darshan guide", helper: "Intro, temple entries and other temples.", keys: ["darshanGuide", "templeEntries", "otherTemples"], toggle: "darshanGuide" },
  { title: "Parikrama", helper: "The sacred circle section.", keys: ["parikrama"], toggle: "parikrama" },
  { title: "Luxury stays", helper: "Hotels and budget stays.", keys: ["stays"], toggle: "stays" },
  { title: "Food & street secrets", helper: "Local food and tips.", keys: ["food"], toggle: "food" },
  { title: "Travel & best time", helper: "Reaching Vrindavan, traffic, seasons and packing.", keys: ["travel"], toggle: "travel" },
  { title: "FAQs", helper: "Questions and answers. Also published as FAQ structured data.", keys: ["faqSection", "faqs"], toggle: "faqs" },
  { title: "Related links", helper: "Links shown above the booking panel.", keys: ["relatedLinks"], toggle: "relatedLinks" },
  { title: "Book your trip", helper: "Closing panel.", keys: ["book"] },
  { title: "Shared package-page blocks", helper: "Text used on every individual package page.", keys: ["packageDefaults"] },
];

const LABELS: Partial<Record<Key, string>> = { packages: "Summary cards", templeEntries: "Temple entries", otherTemples: "Other temples", faqs: "Questions", relatedLinks: "Links" };

export default function TourPackagesPageForm() {
  return (
    <SitePageEditor
      slug={TOUR_PACKAGES_PAGE_SLUG}
      rowTitle="Tour Packages Page"
      heading="Tour Packages Page"
      description="Everything on /tour-packages except the packages themselves, which come from the Product Editor. Text supports **bold** and *italic*."
      defaults={tourPackagesPage}
      groups={GROUPS}
      labels={LABELS}
    />
  );
}
