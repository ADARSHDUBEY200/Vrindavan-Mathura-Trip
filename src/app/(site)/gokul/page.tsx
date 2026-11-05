import { GuidePage } from "@/components/destination/guide/GuidePage";
import { gokul } from "@/content/braj/gokul";
import { photos } from "@/content/images";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: gokul.meta.title,
  description: gokul.meta.description,
  path: gokul.path,
  image: photos[gokul.hero.image].src,
  imageAlt: gokul.meta.imageAlt,
  absoluteTitle: true,
  largeImagePreview: true,
});

export default function Page() {
  return <GuidePage g={gokul} />;
}
