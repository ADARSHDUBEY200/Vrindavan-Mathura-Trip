import { FinalCta } from "@/components/home/Sections";
import { PageHero } from "@/components/layout/PageHero";
import { JsonLd } from "@/components/seo/JsonLd";
import { FaqList } from "@/components/ui/FaqList";
import { faqGroups } from "@/content/faqs";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbSchema, faqSchema, webPageSchema } from "@/lib/schema";

const title = "Vrindavan & Mathura Trip FAQs";
const description = "Answers to common questions about planning a Vrindavan and Mathura pilgrimage — days needed, best time, prices, temple timings, dress code, seniors, cars and more.";
const crumbs = [
  { name: "Home", href: "/" },
  { name: "FAQ", href: "/faq" },
];

export const metadata = buildMetadata({ title, description, path: "/faq" });

export default function FaqPage() {
  const all = faqGroups.flatMap((g) => g.items);
  return (
    <>
      <PageHero eyebrow="FAQ" title="Frequently asked questions" lede="Practical answers for planning your Braj pilgrimage. If your question isn’t here, just ask us." crumbs={crumbs} />
      <div className="container-x grid gap-10 pb-20 lg:grid-cols-[0.3fr_1fr] lg:pb-28">
        <nav aria-label="FAQ topics" className="hidden lg:sticky lg:top-28 lg:block lg:self-start">
          <ul className="grid gap-1 text-sm">
            {faqGroups.map((g) => (
              <li key={g.id}>
                <a href={`#${g.id}`} className="block rounded-xl px-3 py-2 text-stone hover:bg-cream hover:text-ink">
                  {g.title}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="grid gap-12">
          {faqGroups.map((g) => (
            <section key={g.id} aria-labelledby={g.id}>
              <h2 id={g.id} className="display-3 mb-5">
                {g.title}
              </h2>
              <FaqList items={g.items} />
            </section>
          ))}
        </div>
      </div>
      <FinalCta />
      <JsonLd data={[webPageSchema({ path: "/faq", name: title, description }), breadcrumbSchema(crumbs), faqSchema(all)]} />
    </>
  );
}
