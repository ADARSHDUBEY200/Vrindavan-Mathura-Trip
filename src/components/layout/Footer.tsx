import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { Logo } from "@/components/layout/Logo";
import { TempleSkyline } from "@/components/svg/Ornaments";
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
      <h2 id={id} className="text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-ember-deep">
        {title}
      </h2>
      <ul className="mt-4 grid gap-2 text-sm">
        {links.map((l) => (
          <li key={l.href}>
            <Link href={l.href} className="text-ink-soft transition-colors hover:text-ember-deep">
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
    <footer className="relative mt-auto overflow-hidden border-t border-line bg-cream">
      <TempleSkyline className="pointer-events-none absolute inset-x-0 bottom-0 h-24 w-full text-orange-100/70" />
      <div className="container-x relative pb-8 pt-12 sm:pt-14">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_2fr] lg:gap-14">
          <div>
            <Logo />
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-stone">{site.description}</p>

            {hasContact && (
              <ul className="mt-6 grid gap-2.5 text-sm">
                {wa && (
                  <li>
                    <a href={wa} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2.5 font-medium text-ink-soft hover:text-ink">
                      <WhatsappIcon size={17} className="text-whatsapp-deep" /> Chat on WhatsApp
                    </a>
                  </li>
                )}
                {tel && (
                  <li>
                    <a href={tel} className="inline-flex items-center gap-2.5 font-medium text-ink-soft hover:text-ink">
                      <Phone size={16} aria-hidden="true" className="text-orange-500" /> {site.contact.phone}
                    </a>
                  </li>
                )}
                {site.contact.email && (
                  <li>
                    <a href={`mailto:${site.contact.email}`} className="inline-flex items-center gap-2.5 font-medium text-ink-soft hover:text-ink">
                      <Mail size={16} aria-hidden="true" className="text-orange-500" /> {site.contact.email}
                    </a>
                  </li>
                )}
                {address && (
                  <li className="flex items-start gap-2.5 text-ink-soft">
                    <MapPin size={16} aria-hidden="true" className="mt-0.5 shrink-0 text-orange-500" />
                    <address className="not-italic">{address}</address>
                  </li>
                )}
              </ul>
            )}

            {socials.length > 0 && (
              <ul className="mt-6 flex gap-2.5" aria-label="Social media">
                {socials.map(({ href, label, Icon }) => (
                  <li key={label}>
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      className="grid size-10 place-items-center rounded-full border border-line bg-white text-ink-soft transition-all hover:-translate-y-0.5 hover:border-orange-300 hover:text-ember-deep"
                    >
                      <Icon size={18} />
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            <FooterColumn title="Explore" links={quickLinks} />
            <FooterColumn title="Packages" links={packages.slice(0, 6).map((p) => ({ label: p.title, href: `/tour-packages/${p.slug}` }))} />
            <FooterColumn title="Guides" links={guides.slice(0, 6).map((g) => ({ label: g.title.replace(/:.*$/, ""), href: `/travel-guide/${g.slug}` }))} />
            <FooterColumn title="Policies" links={policyLinks} />
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-line pt-6 text-xs text-stone sm:flex-row sm:items-center sm:justify-between">
          <p>© {site.name}. Temple timings and festival dates are indicative — please confirm before travel.</p>
          <p className="font-medium text-ink-soft">Radhe Radhe 🙏</p>
        </div>
      </div>
    </footer>
  );
}
