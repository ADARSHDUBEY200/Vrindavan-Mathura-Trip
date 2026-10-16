import { LegalPage } from "@/components/pages/LegalPage";
import { site } from "@/config/site";
import { buildMetadata } from "@/lib/seo";

const title = "Privacy Policy";
const description = `How ${site.name} collects, uses and protects the personal details you share when you enquire about a trip.`;

export const metadata = buildMetadata({ title, description, path: "/privacy-policy" });

export default function Page() {
  return (
    <LegalPage
      title={title}
      path="/privacy-policy"
      description={description}
      intro="We collect only what we need to plan your trip, and we never sell your details."
      updated="15 October 2026"
      sections={[
        {
          heading: "What we collect",
          body: [
            "When you send an enquiry through our form, WhatsApp, phone or email, we receive the details you choose to share — typically your name, phone number, travel dates, number of travellers, starting city and any message.",
            "Our website does not use advertising or tracking cookies. Our hosting provider may keep standard technical logs (such as IP address and browser type) for security and reliability.",
          ],
        },
        {
          heading: "How we use it",
          body: [
            { list: [
              "To reply to your enquiry and prepare an itinerary and quote.",
              "To make bookings you ask us to make — for example with drivers, hotels or guides — sharing only what each needs.",
              "To contact you about your trip before, during and after travel.",
            ] },
            "We do not sell, rent or trade your personal information, and we do not send marketing messages unless you ask us to.",
          ],
        },
        {
          heading: "Third-party services",
          body: [
            "If you contact us on WhatsApp, your messages are also subject to WhatsApp’s own privacy policy. Enquiry form submissions may be passed to a form-processing or email service so that they reach us.",
          ],
        },
        {
          heading: "How long we keep it",
          body: ["We keep enquiry and booking details only as long as needed to serve you and to meet legal or accounting requirements, and then delete them."],
        },
        {
          heading: "Your choices",
          body: [
            "You can ask us at any time to see, correct or delete the personal details we hold about you. Contact us using the details on our [contact page](/contact).",
          ],
        },
      ]}
    />
  );
}
