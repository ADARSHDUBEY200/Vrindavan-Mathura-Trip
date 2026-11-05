import { GuidePage } from "@/components/destination/guide/GuidePage";
import { barsana } from "@/content/braj/barsana";
import { photos } from "@/content/images";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: barsana.meta.title,
  description: barsana.meta.description,
  path: barsana.path,
  image: photos[barsana.hero.image].src,
  imageAlt: barsana.meta.imageAlt,
  absoluteTitle: true,
  largeImagePreview: true,
});

export default function Page() {
  return <GuidePage g={barsana} />;
}
