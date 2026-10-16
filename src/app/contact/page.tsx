import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { EnquiryForm } from "@/components/forms/EnquiryForm";
import { PageHero } from "@/components/layout/PageHero";
import { JsonLd } from "@/components/seo/JsonLd";
import { WhatsappIcon } from "@/components/svg/TravelIcons";
import { FaqList } from "@/components/ui/FaqList";
import { formatAddress, phoneHref, site } from "@/config/site";
import { faqGroups } from "@/content/faqs";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbSchema, webPageSchema } from "@/lib/schema";
import { whatsappLink } from "@/lib/whatsapp";

const title = "Contact Us — Plan Your Trip";
const description = `Send an enquiry to plan your private Vrindavan, Mathura and Braj pilgrimage with ${site.name} — by WhatsApp, phone, email or our enquiry form.`;
const crumbs = [
  { name: "Home", href: "/" },
  { name: "Contact", href: "/contact" },
];

export const metadata = buildMetadata({ title, description, path: "/contact" });

export default function ContactPage() {
  const wa = whatsappLink();
  const tel = phoneHref();
  const address = formatAddress();
  const channels = [
    wa && { icon: <WhatsappIcon size={22} />, label: "WhatsApp", value: "Chat with us", href: wa, external: true },
    tel && { icon: <Phone size={22} aria-hidden="true" />, label: "Phone", value: site.contact.phone!, href: tel, external: false },
    site.contact.email && { icon: <Mail size={22} aria-hidden="true" />, label: "Email", value: site.contact.email, href: `mailto:${site.contact.email}`, external: false },
  ].filter(Boolean) as { icon: React.ReactNode; label: string; value: string; href: string; external: boolean }[];

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Let’s plan your yatra"
        lede="Share your dates, group and the temples you’d love to visit. We reply personally with a suggested plan and an itemised quote — no obligation."
        crumbs={crumbs}
      />

      <div className="container-x grid gap-10 pb-20 lg:grid-cols-[0.8fr_1.2fr] lg:pb-28">
        <aside aria-label="Contact details" className="grid content-start gap-5">
          {channels.length > 0 ? (
            <ul className="grid gap-4">
              {channels.map((c) => (
                <li key={c.label}>
                  <a
                    href={c.href}
                    {...(c.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className="surface card-hover flex items-center gap-4 p-5"
                  >
                    <span className={`grid size-12 shrink-0 place-items-center rounded-2xl ${c.label === "WhatsApp" ? "bg-whatsapp text-[#062b14]" : "bg-saffron-wash text-ember-deep"}`}>{c.icon}</span>
                    <span>
                      <span className="block text-sm text-stone">{c.label}</span>
                      <span className="block font-semibold text-ink">{c.value}</span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          ) : (
            <p className="surface p-6 text-stone">Please use the enquiry form — we’ll get back to you using the details you share.</p>
          )}
          {address && (
            <div className="surface flex gap-4 p-5">
              <MapPin size={22} aria-hidden="true" className="mt-0.5 shrink-0 text-ember-deep" />
              <address className="not-italic text-ink-soft">{address}</address>
            </div>
          )}
          <div className="rounded-card border border-saffron-soft bg-saffron-wash p-6">
            <p className="flex items-center gap-2 font-semibold">
              <Clock size={18} aria-hidden="true" className="text-ember-deep" /> What happens next
            </p>
            <ol className="mt-3 grid list-decimal gap-2 pl-5 text-[0.95rem] leading-relaxed text-ink-soft">
              <li>We read your enquiry and may ask a quick question or two.</li>
              <li>We send a suggested itinerary with an itemised quote.</li>
              <li>You confirm when you’re happy — nothing is booked before that.</li>
            </ol>
          </div>
          <div>
            <h2 className="mb-4 font-semibold">Before you ask</h2>
            <FaqList items={faqGroups[1].items} />
          </div>
        </aside>

        <section aria-label="Enquiry form">
          <EnquiryForm title="Send an enquiry" />
        </section>
      </div>

      <JsonLd data={[{ ...webPageSchema({ path: "/contact", name: title, description }), "@type": "ContactPage" }, breadcrumbSchema(crumbs)]} />
    </>
  );
}
