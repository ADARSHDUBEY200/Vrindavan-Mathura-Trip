import { LegalPage } from "@/components/pages/LegalPage";
import { site } from "@/config/site";
import { buildMetadata } from "@/lib/seo";

const title = "Cancellation Policy";
const description = `How cancellations, changes and refunds work for trips booked with ${site.name}.`;

export const metadata = buildMetadata({ title, description, path: "/cancellation-policy" });

export default function Page() {
  return (
    <LegalPage
      title={title}
      path="/cancellation-policy"
      description={description}
      intro="We know plans change. This page explains how cancellations and refunds generally work; the exact terms for your trip are stated in your written quote."
      updated="15 October 2026"
      sections={[
        {
          heading: "How to cancel or change a trip",
          body: ["Message or email us with your booking name and dates. A cancellation takes effect when we acknowledge it in writing."],
        },
        {
          heading: "Refunds",
          body: [
            "Refunds depend on how close to the travel date you cancel and on costs we have already paid on your behalf (for example non-refundable hotel nights, train tickets or festival-period bookings).",
            { list: [
              "The specific refund schedule for your trip is included in your quote before you pay.",
              "Third-party charges are refunded according to the hotel’s, railway’s or supplier’s own rules.",
              "Approved refunds are made to the original payment method.",
            ] },
            { tip: "Festival dates (Holi, Janmashtami, Radhashtami, Kartik) often involve non-refundable hotel rates. We will always flag this clearly before you confirm." },
          ],
        },
        {
          heading: "Changes by us",
          body: [
            "If we have to cancel a confirmed trip for reasons within our control, we will offer an alternative or a full refund of amounts paid to us.",
            "If travel becomes unsafe or impossible because of events outside anyone’s control — such as severe weather, official restrictions or road closures — we will work with you on a fair new date or refund, less any non-recoverable costs already paid to suppliers.",
          ],
        },
        {
          heading: "Questions",
          body: ["If anything is unclear, ask us before you book — via our [contact page](/contact)."],
        },
      ]}
    />
  );
}
