import "@/components/temples/temples.css";
import { JsonLd } from "@/components/seo/JsonLd";
import { BookJourney, DarshanPlanner, Etiquette, MandirGlance, TempleChapters, TempleFinder, TemplesFaq, TemplesHero, WelcomeLetter } from "@/components/temples/ArchiveSections";
import { eczar } from "@/components/vrindavan/fonts";
import { SectionNav } from "@/components/vrindavan/SectionNav";
import { getTemplesPageContent } from "@/lib/cms/site-pages";
import { TEMPLES_PATH } from "@/lib/cms/temple-fields";
import { templeImageUrl } from "@/lib/cms/temple-image";
import { getPublishedTemples } from "@/lib/cms/temples";
import { plainText } from "@/lib/rich-text";
import { breadcrumbSchema, faqSchema, itemListSchema, webPageSchema } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";

const crumbs = [
  { name: "Home", href: "/" },
  { name: "Temples", href: TEMPLES_PATH },
];

export async function generateMetadata() {
  const c = await getTemplesPageContent();
  const image = c.hero.images[0];
  return {
    ...buildMetadata({ title: c.meta.title, description: c.meta.description, path: TEMPLES_PATH, image: image?.src ? { src: templeImageUrl(image.src) } : undefined, imageAlt: image?.alt, absoluteTitle: true, largeImagePreview: true }),
    keywords: c.meta.keywords,
  };
}

/** Temple archive: editable copy from the SitePage row (PDF defaults), temple cards from the Temple table. */
export default async function TemplesPage() {
  const [c, temples] = await Promise.all([getTemplesPageContent(), getPublishedTemples()]);
  const show = (section: string) => !c.hidden.includes(section);

  const sections: Record<string, React.ReactNode> = {
    letter: <WelcomeLetter key="letter" c={c} />,
    glance: <MandirGlance key="glance" c={c} />,
    explorer: <TempleFinder key="explorer" c={c} temples={temples} />,
    chapters: <TempleChapters key="chapters" c={c} />,
    planner: <DarshanPlanner key="planner" c={c} />,
    etiquette: <Etiquette key="etiquette" c={c} />,
    faqs: <TemplesFaq key="faqs" c={c} />,
    book: <BookJourney key="book" c={c} />,
  };

  const nav = c.order.filter(show).flatMap((key) => {
    if (key === "glance") return [{ id: "mandir-list", label: "Mandir list" }];
    if (key === "explorer") return [{ id: "temple-finder", label: "Find a temple" }];
    if (key === "chapters") return c.chapters.map((ch) => ({ id: ch.id, label: ch.nav }));
    if (key === "planner") return [{ id: "timings", label: "Timings" }];
    if (key === "etiquette") return [{ id: "etiquette", label: "Etiquette" }];
    if (key === "faqs") return [{ id: "faqs", label: "FAQs" }];
    return [];
  });

  return (
    <div className={`tmpl ${eczar.variable}`}>
      <TemplesHero c={c} crumbs={crumbs} />
      <SectionNav items={nav} prefix="tmpl" />
      {c.order.filter(show).map((key) => sections[key])}

      <JsonLd
        data={[
          webPageSchema({ path: TEMPLES_PATH, name: c.meta.title, description: c.meta.description }),
          breadcrumbSchema(crumbs),
          itemListSchema(c.explorer.title, temples.map((t) => ({ name: t.name, href: t.path }))),
          show("faqs") ? faqSchema(c.faqs.map((f) => ({ q: plainText(f.q), a: plainText(f.a) }))) : undefined,
        ]}
      />
    </div>
  );
}
