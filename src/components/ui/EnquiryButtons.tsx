import Link from "next/link";
import { ArrowRight, Phone } from "lucide-react";
import { WhatsappIcon } from "@/components/svg/TravelIcons";
import { phoneHref, site } from "@/config/site";
import { DEFAULT_WHATSAPP_MESSAGE, whatsappLink } from "@/lib/whatsapp";

type Props = {
  message?: string;
  /** Show the phone button too (when a number is configured). */
  showPhone?: boolean;
  /** Fallback link used when neither WhatsApp nor phone is configured. */
  fallbackHref?: string;
  light?: boolean;
  /** Buttons sit on the orange → amber gradient panel. */
  onGradient?: boolean;
  className?: string;
  size?: "md" | "sm";
};

/** WhatsApp + call buttons. Each one renders only if its contact detail is configured. */
export function EnquiryButtons({ message = DEFAULT_WHATSAPP_MESSAGE, showPhone = true, fallbackHref = "/contact", light = false, onGradient = false, className = "", size = "md" }: Props) {
  const wa = whatsappLink(message);
  const tel = showPhone ? phoneHref() : undefined;
  const sm = size === "sm" ? "btn-sm" : "";

  return (
    <div className={`flex flex-wrap gap-3 ${className}`}>
      {wa && (
        <a href={wa} target="_blank" rel="noopener noreferrer" className={`btn btn-whatsapp ${sm}`}>
          <WhatsappIcon size={20} />
          Enquire on WhatsApp
          <span className="sr-only"> (opens WhatsApp)</span>
        </a>
      )}
      {tel && (
        <a href={tel} className={`btn ${light ? "btn-outline-light" : "btn-outline"} ${sm}`}>
          <Phone size={18} aria-hidden="true" />
          Call {site.contact.phone}
        </a>
      )}
      {!wa && !tel && (
        <Link href={fallbackHref} className={`btn ${onGradient ? "btn-dark" : "btn-primary"} ${sm}`}>
          Send an enquiry
          <ArrowRight size={18} aria-hidden="true" className="btn-arrow" />
        </Link>
      )}
    </div>
  );
}
