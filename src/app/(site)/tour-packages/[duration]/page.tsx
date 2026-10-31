import { notFound, permanentRedirect } from "next/navigation";
import { JsonLd } from "@/components/seo/JsonLd";
import { LegacyPackagePage } from "@/components/tour-packages/LegacyPackagePage";
import { TourCard } from "@/components/tour-packages/TourCard";
import { Heading } from "@/components/tour-packages/ui";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { photos } from "@/content/images";
import { getPackage, packages } from "@/content/packages";
import { PACKAGES_PATH, isDurationSegment } from "@/lib/cms/package-fields";
import { getPublishedPackages, toCatalog } from "@/lib/cms/packages";
import { getTourPackagesContent } from "@/lib/cms/site-pages";
import { breadcrumbSchema, itemListSchema, webPageSchema } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";

/*
 * One URL level under /tour-packages serves two things:
 * - a length, e.g. /tour-packages/five-days: every published package of that length;
 * - a hardcoded package from content/packages.ts, e.g. /tour-packages/vrindavan-one-day-darshan.
 * A bare CMS slug redirects to its /tour-packages/{duration}/{slug} page.
 */

/** New lengths and moved slugs have no prerendered page: render on request so 404s and redirects keep their status. */
export const instant = false;

export async function generateStaticParams() {
  const cms = await getPublishedPackages();
  return [...new Set([...packages.map((p) => p.slug), ...cms.map((p) => p.segment)])].map((duration) => ({ duration }));
}

const lengthName = (days: number | null | undefined) => (days ? `${days} Day${days === 1 ? "" : "s"}` : "Custom");

export async function generateMetadata({ params }: PageProps<"/tour-packages/[duration]">) {
  const { duration } = await params;
  const legacy = getPackage(duration);
  if (legacy) {
    return buildMetadata({
      title: `${legacy.title} — Itinerary`,
      description: `${legacy.duration} private trip: ${legacy.summary}`.slice(0, 300),
      path: `${PACKAGES_PATH}/${legacy.slug}`,
      image: photos[legacy.image].src,
    });
  }
  const list = (await getPublishedPackages()).filter((p) => p.segment === duration);
  if (!isDurationSegment(duration) || !list.length) return { title: "Tour packages", robots: { index: false } };
  const title = `${lengthName(list[0].days)} Vrindavan Mathura Tour Packages`;
  return buildMetadata({ title, description: `${list.length} private ${lengthName(list[0].days).toLowerCase()} tour packages covering Vrindavan, Mathura and Braj, each with an AC car, local guidance and a written quote.`, path: `${PACKAGES_PATH}/${duration}` });
}

export default async function DurationPage({ params }: PageProps<"/tour-packages/[duration]">) {
  const { duration } = await params;
  const legacy = getPackage(duration);
  if (legacy) return <LegacyPackagePage p={legacy} />;

  const [cms, content] = await Promise.all([getPublishedPackages(), getTourPackagesContent()]);
  const moved = cms.find((p) => p.slug === duration);
  if (moved) permanentRedirect(moved.path);

  const slugs = new Set(cms.filter((p) => p.segment === duration).map((p) => p.slug));
  const list = toCatalog(cms).filter((p) => slugs.has(p.slug));
  if (!list.length) notFound();

  const { perks, idealFor } = content.packagesSection;
  const path = `${PACKAGES_PATH}/${duration}`;
  const title = `${lengthName(list[0].days)} Tour Packages`;
  const crumbs = [
    { name: "Home", href: "/" },
    { name: "Tour Packages", href: PACKAGES_PATH },
    { name: lengthName(list[0].days), href: path },
  ];

  return (
    <div className="about-palette">
      <section aria-labelledby="page-title" className="bg-linear-to-br from-[#9a3412] via-[#c2410c] to-[#f97316] pb-12 pt-28 text-white sm:pt-32">
        <div className="container-x">
          <Breadcrumbs items={crumbs} light />
          <h1 id="page-title" className="mt-4 text-[clamp(1.75rem,1.3rem+2vw,2.75rem)] font-extrabold leading-tight tracking-[-0.02em] text-white">
            {title}
          </h1>
          <p className="mt-3 max-w-2xl text-[0.95rem] leading-relaxed text-white/95">{content.packagesSection.catalogIntro}</p>
        </div>
      </section>

      <section aria-labelledby="list-title" className="bg-white py-12 sm:py-14">
        <div className="container-x">
          <Heading id="list-title">
            {list.length} {list.length === 1 ? "package" : "packages"}
          </Heading>
          <ul className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {list.map((p) => (
              <li key={p.slug}>
                <TourCard pkg={p} perks={perks} idealFor={idealFor} />
              </li>
            ))}
          </ul>
        </div>
      </section>

      <JsonLd
        data={[
          webPageSchema({ path, name: title, description: content.packagesSection.catalogIntro }),
          breadcrumbSchema(crumbs),
          itemListSchema(title, list.flatMap((p) => (p.path ? [{ name: p.title, href: p.path }] : []))),
        ]}
      />
    </div>
  );
}
