import { LegalPage } from "@/components/pages/LegalPage";
import { site } from "@/config/site";
import { buildMetadata } from "@/lib/seo";

const title = "Terms & Conditions";
const description = `The terms that apply when you plan or book a trip with ${site.name}.`;

export const metadata = buildMetadata({ title, description, path: "/terms-and-conditions" });

export default function Page() {
  return (
    <LegalPage
      title={title}
      path="/terms-and-conditions"
      description={description}
      intro="Plain-language terms for planning and booking a private pilgrimage trip with us. Your written quote and confirmation always take precedence for your specific booking."
      updated="15 October 2026"
      sections={[
        {
          heading: "Quotes and bookings",
          body: [
            "Every trip is quoted individually. A booking is confirmed only when we have confirmed it to you in writing (WhatsApp or email) and any agreed advance payment has been received.",
            "Your quote lists what is included and excluded. Anything not listed as included is not part of the booking.",
          ],
        },
        {
          heading: "Temple timings, festivals and access",
          body: [
            "Temple timings, darshan arrangements, festival dates, road access and security rules are decided by temple managements and local authorities. They can change without notice. We plan around the best available information but cannot guarantee darshan at a particular time or the availability of any temple, ropeway, boat or attraction.",
          ],
        },
        {
          heading: "Your responsibilities",
          body: [
            { list: [
              "Share accurate details about your group, including any mobility or health needs.",
              "Carry valid photo ID for every traveller (hotels and some temples may ask for it).",
              "Follow temple rules, local laws and the reasonable instructions of your driver or guide for your safety.",
              "Look after your own belongings, especially in crowded areas.",
            ] },
          ],
        },
        {
          heading: "Changes and delays",
          body: [
            "Traffic, weather, fog, festival crowds, road closures or vehicle issues can cause delays. We will always try to adjust the plan so you lose as little as possible, but we are not liable for events outside our reasonable control.",
            "If you wish to change your itinerary during the trip, extra distance, time or services may be charged at the rates in your quote.",
          ],
        },
        {
          heading: "Payments and cancellations",
          body: ["Payment terms are given in your quote. Cancellations and refunds follow our [Cancellation Policy](/cancellation-policy) unless your written confirmation states otherwise."],
        },
        {
          heading: "Contact",
          body: ["Questions about these terms? Please get in touch via our [contact page](/contact)."],
        },
      ]}
    />
  );
}
