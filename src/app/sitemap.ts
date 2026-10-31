import type { MetadataRoute } from "next";
import { destinations } from "@/content/destinations";
import { festivals } from "@/content/festivals";
import { guides } from "@/content/guides";
import { MATHURA_UPDATED } from "@/content/mathura";
import { packages } from "@/content/packages";
import { VRINDAVAN_UPDATED } from "@/content/vrindavan";
import { LAST_UPDATED } from "@/config/site";
import { BLOGS_PATH, blogPath, getPublishedBlogs } from "@/lib/cms/blogs";
import { getPublishedPackages } from "@/lib/cms/packages";
import { getPublishedTemples } from "@/lib/cms/temples";
import { absoluteUrl } from "@/lib/seo";

/** Bump when content changes meaningfully. A fixed date keeps the sitemap fully static. */
const CONTENT_UPDATED = "2026-10-15";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [blogs, cmsPackages, temples] = await Promise.all([getPublishedBlogs(), getPublishedPackages(), getPublishedTemples()]);
  const entry = (path: string, priority: number, changeFrequency: "weekly" | "monthly" | "yearly" = "monthly", lastModified = CONTENT_UPDATED) => ({
    url: absoluteUrl(path),
    lastModified,
    changeFrequency,
    priority,
  });

  return [
    entry("/", 1, "weekly"),
    ...destinations.map((d) => entry(`/${d.slug}`, 0.9, "monthly", d.slug === "mathura" ? MATHURA_UPDATED : d.slug === "vrindavan" ? VRINDAVAN_UPDATED : CONTENT_UPDATED)),
    entry("/tour-packages", 0.9, "weekly"),
    ...[...new Set(cmsPackages.map((p) => p.segment))].map((segment) => entry(`/tour-packages/${segment}`, 0.8, "weekly")),
    ...cmsPackages.map((p) => entry(p.path, 0.8, "weekly")),
    ...packages.map((p) => entry(`/tour-packages/${p.slug}`, 0.8)),
    entry("/temples", 0.8),
    entry("/mathura-vrindavan-temple-timings", 0.8),
    ...temples.map((t) => entry(t.path, 0.7)),
    entry("/festivals", 0.7),
    ...festivals.map((f) => entry(`/festivals/${f.slug}`, 0.6)),
    entry("/travel-guide", 0.7, "weekly"),
    ...guides.map((g) => entry(`/travel-guide/${g.slug}`, 0.6, "monthly", g.updated)),
    entry(BLOGS_PATH, 0.7, "weekly", blogs[0]?.updatedOn ?? CONTENT_UPDATED),
    ...blogs.map((b) => entry(blogPath(b.slug), 0.6, "monthly", b.updatedOn)),
    entry("/about", 0.5, "monthly", LAST_UPDATED),
    entry("/contact", 0.6),
    entry("/faq", 0.5),
    entry("/privacy-policy", 0.2, "yearly"),
    entry("/terms-and-conditions", 0.2, "yearly"),
    entry("/cancellation-policy", 0.2, "yearly"),
    entry("/image-credits", 0.1, "yearly"),
  ];
}
