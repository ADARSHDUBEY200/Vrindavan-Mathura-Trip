import type { MetadataRoute } from "next";
import { destinations } from "@/content/destinations";
import { festivals } from "@/content/festivals";
import { guides } from "@/content/guides";
import { packages } from "@/content/packages";
import { temples } from "@/content/temples";
import { LAST_UPDATED } from "@/config/site";
import { absoluteUrl } from "@/lib/seo";

/** Bump when content changes meaningfully. A fixed date keeps the sitemap fully static. */
const CONTENT_UPDATED = "2026-10-15";

export default function sitemap(): MetadataRoute.Sitemap {
  const entry = (path: string, priority: number, changeFrequency: "weekly" | "monthly" | "yearly" = "monthly", lastModified = CONTENT_UPDATED) => ({
    url: absoluteUrl(path),
    lastModified,
    changeFrequency,
    priority,
  });

  return [
    entry("/", 1, "weekly"),
    ...destinations.map((d) => entry(`/${d.slug}`, 0.9)),
    entry("/tour-packages", 0.9, "weekly"),
    ...packages.map((p) => entry(`/tour-packages/${p.slug}`, 0.8)),
    entry("/temples", 0.8),
    ...temples.map((t) => entry(`/temples/${t.slug}`, 0.7)),
    entry("/festivals", 0.7),
    ...festivals.map((f) => entry(`/festivals/${f.slug}`, 0.6)),
    entry("/travel-guide", 0.7, "weekly"),
    ...guides.map((g) => entry(`/travel-guide/${g.slug}`, 0.6, "monthly", g.updated)),
    entry("/about", 0.5, "monthly", LAST_UPDATED),
    entry("/contact", 0.6),
    entry("/faq", 0.5),
    entry("/privacy-policy", 0.2, "yearly"),
    entry("/terms-and-conditions", 0.2, "yearly"),
    entry("/cancellation-policy", 0.2, "yearly"),
    entry("/image-credits", 0.1, "yearly"),
  ];
}
