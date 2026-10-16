import Image from "next/image";
import { PageHero } from "@/components/layout/PageHero";
import { JsonLd } from "@/components/seo/JsonLd";
import { photos } from "@/content/images";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbSchema, webPageSchema } from "@/lib/schema";

const title = "Image Credits";
const description = "Credits and licences for the photographs used on this website, sourced from Wikimedia Commons.";
const crumbs = [
  { name: "Home", href: "/" },
  { name: "Image Credits", href: "/image-credits" },
];

export const metadata = buildMetadata({ title, description, path: "/image-credits" });

export default function CreditsPage() {
  const entries = Object.entries(photos);
  return (
    <>
      <PageHero
        eyebrow="Credits"
        title="Image credits"
        lede="The photographs on this site come from Wikimedia Commons and are used under their Creative Commons, public domain or open government licences. Images have been resized and cropped for the web. Our thanks to every photographer."
        crumbs={crumbs}
      />
      <div className="container-x pb-20 lg:pb-28">
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {entries.map(([key, p]) => (
            <li key={key} className="surface flex gap-4 p-4">
              <div className="relative size-20 shrink-0 overflow-hidden rounded-2xl bg-sand">
                <Image src={p.src} alt="" fill sizes="80px" className="object-cover" />
              </div>
              <div className="min-w-0 text-sm">
                <p className="font-semibold text-ink [overflow-wrap:anywhere]">{p.credit.title}</p>
                <p className="mt-1 text-stone">By {p.credit.author}</p>
                <p className="mt-1 text-stone">
                  {p.credit.licenseUrl ? (
                    <a href={p.credit.licenseUrl} target="_blank" rel="noopener noreferrer license" className="font-medium text-ember-deep underline underline-offset-2">
                      {p.credit.license}
                    </a>
                  ) : (
                    p.credit.license
                  )}
                  {" · "}
                  <a href={p.credit.sourceUrl} target="_blank" rel="noopener noreferrer" className="font-medium text-ember-deep underline underline-offset-2">
                    Source
                  </a>
                </p>
              </div>
            </li>
          ))}
        </ul>
        <p className="mt-10 max-w-3xl text-sm leading-relaxed text-stone">
          If you are a photographer and would like a credit corrected or an image removed, please contact us and we will act promptly.
        </p>
      </div>
      <JsonLd data={[webPageSchema({ path: "/image-credits", name: title, description }), breadcrumbSchema(crumbs)]} />
    </>
  );
}
