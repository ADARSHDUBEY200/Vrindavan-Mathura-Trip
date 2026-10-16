import { site } from "@/config/site";

export const DEFAULT_WHATSAPP_MESSAGE = "Radhe Radhe! I'd like to plan a trip to Vrindavan and Mathura.";

/**
 * Builds a `wa.me` link with a pre-filled message.
 * Returns `undefined` when no WhatsApp number is configured, so callers can hide the button.
 */
export function whatsappLink(message: string = DEFAULT_WHATSAPP_MESSAGE): string | undefined {
  const number = site.contact.whatsapp;
  if (!number) return undefined;
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

export function packageWhatsappMessage(packageTitle: string): string {
  return `Radhe Radhe! I'm interested in the "${packageTitle}" trip. Could you share details and availability?`;
}
