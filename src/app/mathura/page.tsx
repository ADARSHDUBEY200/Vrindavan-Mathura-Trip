import { DestinationTemplate } from "@/components/pages/DestinationTemplate";
import { getDestination } from "@/content/destinations";
import { photos } from "@/content/images";
import { buildMetadata } from "@/lib/seo";

const d = getDestination("mathura");

export const metadata = buildMetadata({ title: d.metaTitle, description: d.metaDescription, path: "/mathura", image: photos[d.image].src });

export default function Page() {
  return <DestinationTemplate d={d} />;
}
