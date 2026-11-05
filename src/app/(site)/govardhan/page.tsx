import { GuidePage } from "@/components/destination/guide/GuidePage";
import { GovardhanParikrama } from "@/components/destination/guide/GovardhanParikrama";
import { govardhan } from "@/content/braj/govardhan";
import { photos } from "@/content/images";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: govardhan.meta.title,
  description: govardhan.meta.description,
  path: govardhan.path,
  image: photos[govardhan.hero.image].src,
  imageAlt: govardhan.meta.imageAlt,
  absoluteTitle: true,
  largeImagePreview: true,
});

export default function Page() {
  return <GuidePage g={govardhan} afterStory={<GovardhanParikrama />} />;
}
