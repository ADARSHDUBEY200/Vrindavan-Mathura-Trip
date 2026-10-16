import { WhatsappIcon } from "@/components/svg/TravelIcons";
import { whatsappLink } from "@/lib/whatsapp";

/** Floating WhatsApp button for small screens. Hidden when no number is configured. */
export function FloatingWhatsApp() {
  const href = whatsappLink();
  if (!href) return null;
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Enquire on WhatsApp (opens WhatsApp)"
      className="fixed bottom-5 right-4 z-40 grid size-14 place-items-center rounded-full bg-whatsapp text-[#062b14] shadow-lift ring-4 ring-white/70 transition-transform duration-300 hover:-translate-y-0.5 md:hidden"
    >
      <WhatsappIcon size={28} />
    </a>
  );
}
