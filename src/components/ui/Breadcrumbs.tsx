import Link from "next/link";
import { ChevronRight } from "lucide-react";
import type { Crumb } from "@/lib/schema";

export function Breadcrumbs({ items, light = false }: { items: Crumb[]; light?: boolean }) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className={`flex flex-wrap items-center gap-1.5 text-sm ${light ? "text-white/80" : "text-stone"}`}>
        {items.map((c, i) => {
          const last = i === items.length - 1;
          return (
            <li key={c.href} className="flex items-center gap-1.5">
              {last ? (
                <span aria-current="page" className={`font-medium ${light ? "text-white" : "text-ink"}`}>
                  {c.name}
                </span>
              ) : (
                <>
                  <Link href={c.href} className="underline-offset-4 hover:underline">
                    {c.name}
                  </Link>
                  <ChevronRight size={14} aria-hidden="true" className="opacity-60" />
                </>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
