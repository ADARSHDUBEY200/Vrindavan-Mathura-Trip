import { FOUNDER, site } from "@/config/site";
import { attractionNode } from "./home";
import { photos } from "@/content/images";
import type { AttractionId } from "@/content/home";
import { keshiGhat, vaishnoDevi, VRINDAVAN_PATH, VRINDAVAN_UPDATED, vrindavanCrumbs, vrindavanFaqs, vrindavanMeta } from "@/content/vrindavan";
import { plainText } from "@/lib/rich-text";
import { absoluteUrl } from "@/lib/seo";
import { NODE_IDS, compact, ref, sharedNodes, startingOfferNode, type Json } from "./nodes";

const PAGE_URL = absoluteUrl(VRINDAVAN_PATH);

export const VRINDAVAN_IDS = {
  webpage: `${PAGE_URL}#webpage`,
  breadcrumb: `${PAGE_URL}#breadcrumb`,
  destination: `${PAGE_URL}#destination`,
  image: `${PAGE_URL}#hero-image`,
  faq: `${PAGE_URL}#faq`,
  startingOffer: `${PAGE_URL}#starting-offer`,
  vaishnoDevi: `${PAGE_URL}#vaishno-devi`,
  keshiGhat: `${PAGE_URL}#keshi-ghat`,
} as const;

/** Attractions the homepage already publishes: same @id, same facts. Only the two new places are defined here. */
const SHARED_ATTRACTIONS: AttractionId[] = ["temple-banke-bihari", "temple-prem-mandir", "nidhivan", "temple-iskcon", "temple-radha-raman", "seva-kunj", "temple-radha-vallabh", "temple-madan-mohan", "temple-rangji"];

const LOCAL_PLACE = { address: { "@type": "PostalAddress", addressLocality: "Vrindavan", addressRegion: "Uttar Pradesh", addressCountry: "IN" }, containedInPlace: ref(VRINDAVAN_IDS.destination) };

function heroImageNode(): Json {
  const hero = photos["prem-mandir"];
  return {
    "@type": "ImageObject",
    "@id": VRINDAVAN_IDS.image,
    url: absoluteUrl(hero.src.src),
    contentUrl: absoluteUrl(hero.src.src),
    width: hero.src.width,
    height: hero.src.height,
    caption: hero.alt,
    creditText: hero.credit.author,
    creator: { "@type": "Person", name: hero.credit.author },
    license: hero.credit.licenseUrl,
    acquireLicensePage: hero.credit.sourceUrl,
  };
}

/**
 * /vrindavan JSON-LD: one connected @graph (shared TravelAgency entities, the page, Vrindavan as a Place,
 * its attractions, the starting-price Offer) and a separate FAQPage. Every fact here is visible on the page.
 */
export function buildVrindavanSchema(): { graph: Json; faq: Json } {
  const attractions = [...SHARED_ATTRACTIONS.map((k) => ref(`${site.url}/#${k}`)), ref(VRINDAVAN_IDS.vaishnoDevi), ref(VRINDAVAN_IDS.keshiGhat)];

  const graph: Json[] = [
    compact({
      "@type": "WebPage",
      "@id": VRINDAVAN_IDS.webpage,
      url: PAGE_URL,
      name: vrindavanMeta.title,
      description: vrindavanMeta.description,
      inLanguage: "en-IN",
      isPartOf: ref(NODE_IDS.website),
      about: ref(VRINDAVAN_IDS.destination),
      primaryImageOfPage: ref(VRINDAVAN_IDS.image),
      breadcrumb: ref(VRINDAVAN_IDS.breadcrumb),
      author: ref(NODE_IDS.founder),
      publisher: ref(NODE_IDS.business),
      dateModified: VRINDAVAN_UPDATED,
      mentions: ref(VRINDAVAN_IDS.startingOffer),
    }),
    {
      "@type": "BreadcrumbList",
      "@id": VRINDAVAN_IDS.breadcrumb,
      itemListElement: vrindavanCrumbs.map((c, i) => ({ "@type": "ListItem", position: i + 1, name: c.name, item: absoluteUrl(c.href) })),
    },
    heroImageNode(),
    {
      "@type": ["TouristDestination", "Place"],
      "@id": VRINDAVAN_IDS.destination,
      name: "Vrindavan",
      description: `${FOUNDER.name}'s guide to Vrindavan: temples, Parikrama, food, lanes, seasons and how to reach.`,
      url: PAGE_URL,
      image: ref(VRINDAVAN_IDS.image),
      address: LOCAL_PLACE.address,
      containedInPlace: { "@type": "State", name: "Uttar Pradesh", containedInPlace: { "@type": "Country", name: "India" } },
      touristType: ["Pilgrims", "Families", "Senior citizens"],
      includesAttraction: attractions,
    },
    ...SHARED_ATTRACTIONS.map(attractionNode),
    {
      "@type": ["TouristAttraction", "Place"],
      "@id": VRINDAVAN_IDS.vaishnoDevi,
      name: vaishnoDevi.name,
      description: plainText(vaishnoDevi.significance).replace(/^Spiritual significance: /, ""),
      image: absoluteUrl(photos["vaishno-devi-dham"].src.src),
      ...LOCAL_PLACE,
    },
    {
      "@type": ["TouristAttraction", "Place"],
      "@id": VRINDAVAN_IDS.keshiGhat,
      name: keshiGhat.name,
      description: plainText(keshiGhat.significance).replace(/^Spiritual significance: /, ""),
      image: absoluteUrl(photos["keshi-ghat"].src.src),
      ...LOCAL_PLACE,
    },
    startingOfferNode(VRINDAVAN_IDS.startingOffer, PAGE_URL),
    ...sharedNodes(),
  ];

  const faq: Json = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": VRINDAVAN_IDS.faq,
    mainEntityOfPage: ref(VRINDAVAN_IDS.webpage),
    inLanguage: "en-IN",
    mainEntity: vrindavanFaqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };

  return { graph: { "@context": "https://schema.org", "@graph": graph }, faq };
}
