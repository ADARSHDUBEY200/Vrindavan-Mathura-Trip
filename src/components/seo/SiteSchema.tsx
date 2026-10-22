"use client";

import { usePathname } from "next/navigation";
import { JsonLd } from "@/components/seo/JsonLd";

/** Pages that render their own complete @graph (which already includes the shared nodes). */
export const OWN_GRAPH_PATHS = ["/", "/about"];

/**
 * Site-wide JSON-LD (shared entities). The data is built on the server and passed in;
 * this wrapper only skips it on pages that emit their own graph, so no entity is defined twice.
 */
export function SiteSchema({ graph }: { graph: Record<string, unknown> }) {
  const pathname = usePathname();
  if (OWN_GRAPH_PATHS.includes(pathname)) return null;
  return <JsonLd data={graph} />;
}
