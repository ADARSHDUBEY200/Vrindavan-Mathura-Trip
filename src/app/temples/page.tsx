import { TempleCard } from "@/components/cards/TempleCard";
import { FinalCta } from "@/components/home/Sections";
import { PageHero } from "@/components/layout/PageHero";
import { JsonLd } from "@/components/seo/JsonLd";
import { FilterChips, FilterRoot } from "@/components/ui/FilterChips";
import { photos } from "@/content/images";
import { TIMING_DISCLAIMER, temples, towns } from "@/content/temples";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbSchema, itemListSchema, webPageSchema } from "@/lib/schema";

const title = "Temples of Vrindavan, Mathura & Braj";
const description =
  "Guide to the temples of Braj — Banke Bihari, Prem Mandir, ISKCON, Radha Raman, Krishna Janmabhoomi, Dwarkadhish, Barsana, Govardhan and more, with approximate darshan timings and tips.";
const crumbs = [
  { name: "Home", href: "/" },
  { name: "Temples", href: "/temples" },
];

export const metadata = buildMetadata({ title, description, path: "/temples", image: photos["banke-bihari"].src });

export default function TemplesPage() {
  const usedTowns = towns.filter((t) => temples.some((x) => x.town === t));
  return (
    <>
      <PageHero
        eyebrow="Temples of Braj"
        title="Temples of Vrindavan, Mathura & Braj"
        lede="History, approximate darshan timings, dress code and practical tips for the temples we visit most often. Filter by town to plan your day."
        crumbs={crumbs}
        image={photos["govind-dev"]}
      />

      <section aria-labelledby="list-title" className="pb-20 pt-6 lg:pb-28">
        <div className="container-x">
          <h2 id="list-title" className="sr-only">
            All temples
          </h2>
          <p className="mb-8 max-w-3xl rounded-2xl border border-saffron-soft bg-saffron-wash px-5 py-4 text-sm leading-relaxed text-ink-soft">
            <strong className="text-ink">Please note:</strong> {TIMING_DISCLAIMER}
          </p>
          <FilterRoot>
            <FilterChips name="town" legend="Filter temples by town" options={usedTowns.map((t) => ({ value: t, label: t }))} allLabel="All towns" />
            <ul className="mt-10 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
              {temples.map((t) => (
                <li key={t.slug} data-filters={t.town}>
                  <TempleCard temple={t} />
                </li>
              ))}
            </ul>
          </FilterRoot>
        </div>
      </section>

      <FinalCta title="Want us to time your darshan?" text="We plan each day around current temple timings, so you spend your time in darshan — not in queues or in front of closed doors." />

      <JsonLd
        data={[
          webPageSchema({ path: "/temples", name: title, description }),
          breadcrumbSchema(crumbs),
          itemListSchema(title, temples.map((t) => ({ name: t.name, href: `/temples/${t.slug}` }))),
        ]}
      />
    </>
  );
}
