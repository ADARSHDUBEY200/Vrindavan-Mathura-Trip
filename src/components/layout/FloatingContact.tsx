import { Phone } from "lucide-react";
import { WhatsappIcon } from "@/components/svg/TravelIcons";
import { phoneHref, site } from "@/config/site";
import { whatsappLink } from "@/lib/whatsapp";

const bottom = "bottom-[max(1.25rem,env(safe-area-inset-bottom))]";

/**
 * Floating quick-contact buttons on every public page: call (bottom-left, orange with a pulsing halo)
 * and WhatsApp (bottom-right, green with a soft glow). Each renders only if its contact detail is set.
 */
export function FloatingContact() {
  const tel = phoneHref();
  const wa = whatsappLink();
  return (
    <>
      {tel && (
        <a
          href={tel}
          aria-label={`Call ${site.contact.phone}`}
          className={`group fixed left-4 z-40 grid size-14 place-items-center rounded-full bg-linear-to-br from-orange-500 to-orange-600 text-white shadow-[0_0_0_8px_rgb(249_115_22/0.22),0_10px_24px_-8px_rgb(234_88_12/0.7)] transition-transform duration-300 hover:-translate-y-0.5 sm:left-5 ${bottom}`}
        >
          <span className="absolute inset-0 rounded-full bg-orange-500/40 motion-safe:animate-ping" aria-hidden="true" />
          <Phone size={24} aria-hidden="true" className="relative" />
        </a>
      )}
      {wa && (
        <a
          href={wa}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat on WhatsApp (opens WhatsApp)"
          className={`fixed right-4 z-40 grid size-14 place-items-center rounded-full bg-whatsapp text-white shadow-[0_0_0_8px_rgb(37_211_102/0.18),0_10px_24px_-8px_rgb(30_190_90/0.75)] transition-transform duration-300 hover:-translate-y-0.5 sm:right-5 ${bottom}`}
        >
          <WhatsappIcon size={28} />
        </a>
      )}
    </>
  );
}
