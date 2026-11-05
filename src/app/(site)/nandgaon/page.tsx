import { GuidePage } from "@/components/destination/guide/GuidePage";
import { nandgaon } from "@/content/braj/nandgaon";
import { photos } from "@/content/images";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: nandgaon.meta.title,
  description: nandgaon.meta.description,
  path: nandgaon.path,
  image: photos[nandgaon.hero.image].src,
  imageAlt: nandgaon.meta.imageAlt,
  absoluteTitle: true,
  largeImagePreview: true,
});

export default function Page() {
  return <GuidePage g={nandgaon} />;
}
