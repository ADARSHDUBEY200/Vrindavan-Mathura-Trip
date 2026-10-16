import { PageHero } from "@/components/layout/PageHero";
import { JsonLd } from "@/components/seo/JsonLd";
import { RichText } from "@/components/ui/RichText";
import type { Section } from "@/content/types";
import { breadcrumbSchema, webPageSchema } from "@/lib/schema";

type Props = { title: string; path: string; intro: string; description: string; updated: string; sections: Section[] };

export function LegalPage({ title, path, intro, description, updated, sections }: Props) {
  const crumbs = [
    { name: "Home", href: "/" },
    { name: title, href: path },
  ];
  return (
    <>
      <PageHero eyebrow="Policies" title={title} lede={intro} crumbs={crumbs} meta={<p className="text-sm text-stone">Last updated: {updated}</p>} />
      <div className="container-x pb-20 lg:pb-28">
        <div className="surface max-w-3xl p-6 sm:p-10">
          <RichText sections={sections} className="[&>section:first-child>h2]:mt-0" />
        </div>
      </div>
      <JsonLd data={[webPageSchema({ path, name: title, description }), breadcrumbSchema(crumbs)]} />
    </>
  );
}
