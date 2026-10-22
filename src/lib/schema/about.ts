import { LAST_UPDATED, site } from "@/config/site";
import { ABOUT_PATH, PACKAGES_PATH, aboutImages, aboutMeta } from "@/content/about";
import { absoluteUrl } from "@/lib/seo";
import { NODE_IDS, imageObjectNode, ref, sharedNodes, startingOfferNode, type Json } from "./nodes";

const ABOUT_URL = absoluteUrl(ABOUT_PATH);

export const ABOUT_IDS = {
  webpage: NODE_IDS.aboutPage,
  breadcrumb: `${ABOUT_URL}#breadcrumb`,
  teamImage: `${ABOUT_URL}#team-image`,
  milestoneImage: `${ABOUT_URL}#milestone-image`,
  startingOffer: `${ABOUT_URL}#starting-offer`,
} as const;

/** Visible breadcrumb on the About page (kept in sync with the BreadcrumbList below). */
export const aboutCrumbs = [
  { name: "Home", href: "/" },
  { name: "About Us", href: ABOUT_PATH },
];

/** One connected @graph for /about: page, breadcrumb, shared entities and images. */
export function buildAboutSchema(): Json {
  const aboutPage = {
    "@type": "AboutPage",
    "@id": ABOUT_IDS.webpage,
    url: ABOUT_URL,
    name: aboutMeta.title,
    description: aboutMeta.description,
    inLanguage: "en-IN",
    isPartOf: ref(NODE_IDS.website),
    about: ref(NODE_IDS.organization),
    mainEntity: ref(NODE_IDS.founder),
    primaryImageOfPage: ref(NODE_IDS.founderImage),
    image: [ref(NODE_IDS.founderImage), ref(ABOUT_IDS.teamImage), ref(ABOUT_IDS.milestoneImage)],
    breadcrumb: ref(ABOUT_IDS.breadcrumb),
    author: ref(NODE_IDS.founder),
    datePublished: LAST_UPDATED,
    dateModified: LAST_UPDATED,
    significantLink: [absoluteUrl(PACKAGES_PATH), site.url],
    mentions: ref(ABOUT_IDS.startingOffer),
  };

  const breadcrumb = {
    "@type": "BreadcrumbList",
    "@id": ABOUT_IDS.breadcrumb,
    itemListElement: aboutCrumbs.map((c, i) => ({ "@type": "ListItem", position: i + 1, name: c.name, item: absoluteUrl(c.href) })),
  };

  return {
    "@context": "https://schema.org",
    "@graph": [
      aboutPage,
      breadcrumb,
      ...sharedNodes(),
      imageObjectNode(ABOUT_IDS.teamImage, aboutImages.team),
      imageObjectNode(ABOUT_IDS.milestoneImage, aboutImages.milestone),
      startingOfferNode(ABOUT_IDS.startingOffer, absoluteUrl(PACKAGES_PATH)),
    ],
  };
}
