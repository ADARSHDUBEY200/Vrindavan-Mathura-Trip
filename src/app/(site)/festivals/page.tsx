import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CalendarDays, MapPin } from "lucide-react";
import { FinalCta } from "@/components/home/Sections";
import { PageHero } from "@/components/layout/PageHero";
import { JsonLd } from "@/components/seo/JsonLd";
import { DATE_ADVICE, festivals } from "@/content/festivals";
import { photos } from "@/content/images";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbSchema, itemListSchema, webPageSchema } from "@/lib/schema";

const title = "Festivals of Vrindavan, Mathura & Braj";
const description =
  "Plan a festival yatra to Braj: Janmashtami in Mathura, Lathmar Holi in Barsana and Nandgaon, Phoolon wali Holi, Radhashtami, Kartik month and Govardhan Puja — with approximate months and tips.";
const crumbs = [
  { name: "Home", href: "/" },
  { name: "Festivals", href: "/festivals" },
];

export const metadata = buildMetadata({ title, description, path: "/festivals", image: photos["holi-vrindavan"].src });

export default function FestivalsPage() {
  return (
    <>
      <PageHero
        eyebrow="Festival yatras"
        title="Festivals of Braj"
        lede="Braj celebrates Krishna all year round. These are the festivals pilgrims travel for most — with approximate months, what to expect and how to plan."
        crumbs={crumbs}
        image={photos["lathmar-holi"]}
      />

      <section aria-labelledby="list-title" className="pb-20 pt-6 lg:pb-28">
        <div className="container-x">
          <h2 id="list-title" className="sr-only">
            All festivals
          </h2>
          <p className="mb-10 max-w-3xl rounded-2xl border border-saffron-soft bg-saffron-wash px-5 py-4 text-sm leading-relaxed text-ink-soft">
            <strong className="text-ink">Dates change every year.</strong> {DATE_ADVICE}
          </p>
          <ul className="grid gap-8">
            {festivals.map((f, i) => {
              const img = photos[f.image];
              return (
                <li key={f.slug} className="reveal">
                  <article className="group surface card-hover relative grid overflow-hidden md:grid-cols-[0.9fr_1.1fr]">
                    <div className={`zoom-media relative aspect-[16/10] bg-sand md:aspect-auto md:min-h-72 ${i % 2 ? "md:order-2" : ""}`}>
                      <Image src={img.src} alt={img.alt} fill sizes="(min-width: 768px) 45vw, 100vw" className="object-cover" placeholder="blur" />
                    </div>
                    <div className="flex flex-col p-6 sm:p-9">
                      <p className="flex flex-wrap gap-x-5 gap-y-1 text-sm text-stone">
                        <span className="inline-flex items-center gap-1.5">
                          <CalendarDays size={16} aria-hidden="true" className="text-ember-deep" /> {f.months}
                        </span>
                        <span className="inline-flex items-center gap-1.5">
                          <MapPin size={16} aria-hidden="true" className="text-ember-deep" /> {f.places.join(", ")}
                        </span>
                      </p>
                      <h3 className="display-3 mt-3">
                        <Link href={`/festivals/${f.slug}`} className="after:absolute after:inset-0 after:content-['']">
                          {f.name}
                        </Link>
                      </h3>
                      <p className="mt-3 leading-relaxed text-stone">{f.summary}</p>
                      <span className="link-arrow mt-auto pt-6" aria-hidden="true">
                        Festival guide <ArrowRight size={16} className="btn-arrow" />
                      </span>
                    </div>
                  </article>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <FinalCta title="Plan a festival yatra early" text="Festival weeks fill up fast. Tell us which celebration you’d love to attend and we’ll plan stays, transport and realistic crowd timings." />

      <JsonLd
        data={[
          webPageSchema({ path: "/festivals", name: title, description }),
          breadcrumbSchema(crumbs),
          itemListSchema(title, festivals.map((f) => ({ name: f.name, href: `/festivals/${f.slug}` }))),
        ]}
      />
    </>
  );
}
