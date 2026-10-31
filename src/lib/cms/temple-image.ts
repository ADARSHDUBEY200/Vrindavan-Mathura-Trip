import type { StaticImageData } from "next/image";
import { photos, type Photo, type PhotoKey } from "@/content/images";

/** Temple images are either uploaded (a URL) or one of the site's own photos, stored as "photo:<key>". */
const PHOTO_PREFIX = "photo:";

function sitePhoto(value: string): Photo | undefined {
  if (!value.startsWith(PHOTO_PREFIX)) return undefined;
  const key = value.slice(PHOTO_PREFIX.length);
  return key in photos ? photos[key as PhotoKey] : undefined;
}

/** For `next/image`: the imported photo, which carries its size and blur, or the upload's URL. */
export const templeImageSrc = (value: string): string | StaticImageData => sitePhoto(value)?.src ?? value;

/** Plain URL for an `<img>`, Open Graph or schema. */
export const templeImageUrl = (value: string): string => sitePhoto(value)?.src.src ?? value;

/** Empty for a stored "photo:" key that no longer exists, so a broken image is never rendered. */
export const hasTempleImage = (value: string): boolean => Boolean(value) && (!value.startsWith(PHOTO_PREFIX) || Boolean(sitePhoto(value)));
