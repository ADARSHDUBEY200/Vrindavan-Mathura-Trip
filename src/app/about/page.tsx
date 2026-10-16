import Image from "next/image";
import { Check } from "lucide-react";
import { FinalCta, WhyUs } from "@/components/home/Sections";
import { PageHero } from "@/components/layout/PageHero";
import { JsonLd } from "@/components/seo/JsonLd";
import { Mandala } from "@/components/svg/Ornaments";
import { EnquiryButtons } from "@/components/ui/EnquiryButtons";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { site } from "@/config/site";
import { about } from "@/content/home";
import { photos } from "@/content/images";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbSchema, webPageSchema } from "@/lib/schema";

const title = "About Us";
const description = `${site.name} plans private, darshan-first pilgrimage trips to Vrindavan, Mathura and the wider Braj region — with honest quotes and senior-friendly pacing.`;
const crumbs = [
  { name: "Home", href: "/" },
  { name: "About Us", href: "/about" },
];

const principles = [
  { title: "Darshan first", text: "We begin every plan with temple timings and work outwards — so your time goes to darshan, not to closed doors and waiting." },
  { title: "Your pace, your group", text: "Every trip is private. We plan around the slowest walker, the earliest riser and anyone who needs an afternoon rest." },
  { title: "Honest information", text: "Timings and festival dates are always shown as approximate, quotes are itemised, and we never invent reviews or offer ‘VIP darshan’ shortcuts." },
  { title: "Respect for Braj", text: "We encourage modest dress, respectful photography and fair dealings with the local drivers, guides and shopkeepers who make Braj what it is." },
];

export const metadata = buildMetadata({ title, description, path: "/about", image: photos["radha-raman"].src });

export default function AboutPage() {
  return (
    <>
      <PageHero eyebrow="About us" title="Pilgrimage planning with a Braj heart" lede={about.paragraphs[0]} crumbs={crumbs} image={photos["keshi-ghat"]}>
        <EnquiryButtons />
      </PageHero>

      <section aria-labelledby="approach-title" className="relative overflow-hidden py-16 lg:py-24">
        <Mandala className="spin-slow pointer-events-none absolute -left-60 top-0 size-[36rem] text-saffron/10" />
        <div className="container-x relative grid items-center gap-12 lg:grid-cols-2">
          <div>
            <Eyebrow>Our approach</Eyebrow>
            <h2 id="approach-title" className="display-2 mt-3">
              A calmer way to experience Vrindavan and Mathura
            </h2>
            {about.paragraphs.slice(1).map((p) => (
              <p key={p} className="lede mt-5">
                {p}
              </p>
            ))}
            <ul className="mt-7 grid gap-3">
              {about.points.map((p) => (
                <li key={p} className="flex items-center gap-3 font-medium text-ink">
                  <span className="grid size-7 place-items-center rounded-full bg-peacock-teal/10 text-peacock-teal">
                    <Check size={16} aria-hidden="true" />
                  </span>
                  {p}
                </li>
              ))}
            </ul>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {(["phool-bangla", "radha-raman"] as const).map((k, i) => {
              const p = photos[k];
              return (
                <div key={k} className={`zoom-media relative aspect-[3/4] bg-sand shadow-soft ${i === 0 ? "arch" : "mt-12 rounded-card"}`}>
                  <Image src={p.src} alt={p.alt} fill sizes="(min-width: 1024px) 24vw, 45vw" className="object-cover" placeholder="blur" />
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section aria-labelledby="principles-title" className="bg-white py-16 lg:py-24">
        <div className="container-x">
          <Eyebrow>What we stand for</Eyebrow>
          <h2 id="principles-title" className="display-2 mt-3 max-w-2xl">
            Four promises we keep on every yatra
          </h2>
          <ol className="mt-12 grid gap-6 md:grid-cols-2">
            {principles.map((p, i) => (
              <li key={p.title} className="surface flex gap-5 p-7">
                <span className="text-4xl font-bold text-saffron-soft" aria-hidden="true">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="text-lg font-semibold">{p.title}</h3>
                  <p className="mt-2 leading-relaxed text-stone">{p.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <WhyUs />
      <FinalCta />
      <JsonLd data={[webPageSchema({ path: "/about", name: title, description }), breadcrumbSchema(crumbs)]} />
    </>
  );
}
