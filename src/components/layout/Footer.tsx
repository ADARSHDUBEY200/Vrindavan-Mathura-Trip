import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { Logo } from "@/components/layout/Logo";
import { Mandala, TempleSkyline } from "@/components/svg/Ornaments";
import { FacebookIcon, InstagramIcon, WhatsappIcon, YoutubeIcon } from "@/components/svg/TravelIcons";
import { formatAddress, phoneHref, policyLinks, site } from "@/config/site";
import { guides } from "@/content/guides";
import { packages } from "@/content/packages";
import { whatsappLink } from "@/lib/whatsapp";

const quickLinks = [
  { label: "Vrindavan", href: "/vrindavan" },
  { label: "Mathura", href: "/mathura" },
  { label: "Govardhan & Barsana", href: "/govardhan-barsana" },
  { label: "Full Braj Yatra", href: "/braj-yatra" },
  { label: "Temples", href: "/temples" },
  { label: "Festivals", href: "/festivals" },
  { label: "About Us", href: "/about" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
];

function FooterColumn({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  const id = `footer-${title.toLowerCase().replace(/\W+/g, "-")}`;
  return (
    <nav aria-labelledby={id}>
      <h2 id={id} className="text-sm font-semibold uppercase tracking-[0.16em] text-saffron-soft">
        {title}
      </h2>
      <ul className="mt-4 grid gap-2.5 text-[0.95rem]">
        {links.map((l) => (
          <li key={l.href}>
            <Link href={l.href} className="text-white/75 transition-colors hover:text-white hover:underline hover:underline-offset-4">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export function Footer() {
  const wa = whatsappLink();
  const tel = phoneHref();
  const address = formatAddress();
  const socials = [
    { href: site.social.instagram, label: "Instagram", Icon: InstagramIcon },
    { href: site.social.facebook, label: "Facebook", Icon: FacebookIcon },
    { href: site.social.youtube, label: "YouTube", Icon: YoutubeIcon },
  ].filter((s): s is { href: string; label: string; Icon: typeof InstagramIcon } => Boolean(s.href));
  const hasContact = Boolean(wa || tel || site.contact.email || address);

  return (
    <footer className="mt-auto">
      <TempleSkyline className="-mb-px block h-14 w-full text-[#121417] sm:h-20" />
      <div className="relative overflow-hidden bg-[#121417] text-white">
      <Mandala className="spin-slow pointer-events-none absolute -right-40 -top-24 size-[34rem] text-saffron/10" />

      <div className="container-x relative pb-10 pt-12">
        <div className="grid gap-12 lg:grid-cols-[1.3fr_2fr]">
          <div>
            <Logo light />
            <p className="mt-5 max-w-sm leading-relaxed text-white/70">{site.description}</p>

            {hasContact && (
              <ul className="mt-7 grid gap-3 text-[0.95rem]">
                {wa && (
                  <li>
                    <a href={wa} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 text-white/85 hover:text-white">
                      <WhatsappIcon size={18} className="text-whatsapp" /> Chat on WhatsApp
                    </a>
                  </li>
                )}
                {tel && (
                  <li>
                    <a href={tel} className="inline-flex items-center gap-3 text-white/85 hover:text-white">
                      <Phone size={18} aria-hidden="true" className="text-saffron" /> {site.contact.phone}
                    </a>
                  </li>
                )}
                {site.contact.email && (
                  <li>
                    <a href={`mailto:${site.contact.email}`} className="inline-flex items-center gap-3 text-white/85 hover:text-white">
                      <Mail size={18} aria-hidden="true" className="text-saffron" /> {site.contact.email}
                    </a>
                  </li>
                )}
                {address && (
                  <li className="flex items-start gap-3 text-white/85">
                    <MapPin size={18} aria-hidden="true" className="mt-0.5 shrink-0 text-saffron" />
                    <address className="not-italic">{address}</address>
                  </li>
                )}
              </ul>
            )}

            {socials.length > 0 && (
              <ul className="mt-7 flex gap-3" aria-label="Social media">
                {socials.map(({ href, label, Icon }) => (
                  <li key={label}>
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      className="grid size-11 place-items-center rounded-full border border-white/15 text-white/80 transition-colors hover:border-saffron hover:text-white"
                    >
                      <Icon size={20} />
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="grid grid-cols-2 gap-10 sm:grid-cols-4">
            <FooterColumn title="Explore" links={quickLinks} />
            <FooterColumn title="Packages" links={packages.slice(0, 6).map((p) => ({ label: p.title, href: `/tour-packages/${p.slug}` }))} />
            <FooterColumn title="Guides" links={guides.slice(0, 6).map((g) => ({ label: g.title.replace(/:.*$/, ""), href: `/travel-guide/${g.slug}` }))} />
            <FooterColumn title="Policies" links={policyLinks} />
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-white/10 pt-6 text-sm text-white/60 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {site.name}. Temple timings and festival dates are indicative — please confirm before travel.
          </p>
          <p>Radhe Radhe 🙏</p>
        </div>
      </div>
      </div>
    </footer>
  );
}
