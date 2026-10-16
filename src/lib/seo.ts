import type { Metadata } from "next";
import type { StaticImageData } from "next/image";
import { site } from "@/config/site";
import { photos } from "@/content/images";

type BuildMetadataInput = {
  title: string;
  description: string;
  /** Path beginning with `/`, used for the canonical URL. */
  path: string;
  image?: StaticImageData;
  imageAlt?: string;
  type?: "website" | "article";
  /** Use the title as-is, without the "| Brand" suffix. */
  absoluteTitle?: boolean;
  noIndex?: boolean;
};

export function absoluteUrl(path = "/"): string {
  return path === "/" ? site.url : `${site.url}${path}`;
}

/** Shared metadata builder: canonical URL, Open Graph and Twitter cards for every page. */
export function buildMetadata({
  title,
  description,
  path,
  image = photos["prem-mandir"].src,
  imageAlt,
  type = "website",
  absoluteTitle = false,
  noIndex = false,
}: BuildMetadataInput): Metadata {
  const ogTitle = absoluteTitle ? title : `${title} | ${site.name}`;
  const images = [{ url: image.src, width: image.width, height: image.height, alt: imageAlt ?? title }];
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type,
      title: ogTitle,
      description,
      url: path,
      siteName: site.name,
      locale: site.locale,
      images,
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description,
      images: images.map((i) => i.url),
    },
    robots: noIndex ? { index: false, follow: true } : undefined,
  };
}
