import { PackageCard } from "@/components/cards/PackageCard";
import { FinalCta, WhyUs } from "@/components/home/Sections";
import { PageHero } from "@/components/layout/PageHero";
import { JsonLd } from "@/components/seo/JsonLd";
import { EnquiryButtons } from "@/components/ui/EnquiryButtons";
import { FilterChips, FilterRoot } from "@/components/ui/FilterChips";
import { photos } from "@/content/images";
import { durationFilters, packages } from "@/content/packages";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbSchema, itemListSchema, webPageSchema } from "@/lib/schema";

const title = "Vrindavan & Mathura Tour Packages";
const description =
  "Private Vrindavan, Mathura and Braj tour packages — same-day darshan, 2-day trips, Govardhan–Barsana, 84 Kos yatra and combo circuits with Agra, Ayodhya, Varanasi, Haridwar and Rishikesh.";
const crumbs = [
  { name: "Home", href: "/" },
  { name: "Tour Packages", href: "/tour-packages" },
];

export const metadata = buildMetadata({ title, description, path: "/tour-packages", image: photos["dwarkadhish"].src });

export default function PackagesPage() {
  return (
    <>
      <PageHero
        eyebrow="Tour packages"
        title="Private tour packages for Vrindavan, Mathura & Braj"
        lede="Choose a starting point and we’ll shape it around your dates, group and pace. Every trip is private, with your own car and driver."
        crumbs={crumbs}
        image={photos["prem-mandir"]}
      >
        <EnquiryButtons message="Radhe Radhe! Please help me choose a Vrindavan–Mathura tour package." />
      </PageHero>

      <section aria-labelledby="list-title" className="pb-20 pt-6 lg:pb-28">
        <div className="container-x">
          <h2 id="list-title" className="sr-only">
            All tour packages
          </h2>
          <FilterRoot>
            <FilterChips name="duration" legend="Filter packages by duration" options={durationFilters.map((f) => ({ value: f.id, label: f.label }))} allLabel="All trips" />
            <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {packages.map((p) => (
                <li key={p.slug} data-filters={p.filters.join(" ")}>
                  <PackageCard pkg={p} />
                </li>
              ))}
            </ul>
          </FilterRoot>
          <p className="mt-10 max-w-3xl text-sm leading-relaxed text-stone">
            Prices depend on your starting city, dates, vehicle and hotels, so we share an itemised quote for each trip rather than a one-size-fits-all price.
          </p>
        </div>
      </section>

      <WhyUs />
      <FinalCta title="Not sure which trip suits you?" text="Tell us how many days you have and who’s travelling — we’ll suggest the right plan." />

      <JsonLd
        data={[
          webPageSchema({ path: "/tour-packages", name: title, description }),
          breadcrumbSchema(crumbs),
          itemListSchema(title, packages.map((p) => ({ name: p.title, href: `/tour-packages/${p.slug}` }))),
        ]}
      />
    </>
  );
}
