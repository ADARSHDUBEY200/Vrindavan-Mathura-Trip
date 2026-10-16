import { Plus } from "lucide-react";
import type { Faq } from "@/content/types";

/** Native <details> accordion — works without JavaScript and is keyboard accessible. */
export function FaqList({ items, className = "" }: { items: Faq[]; className?: string }) {
  return (
    <div className={`divide-y divide-line overflow-hidden rounded-card border border-line bg-white shadow-soft ${className}`}>
      {items.map((f) => (
        <details key={f.q} className="faq-item group">
          <summary className="flex items-start justify-between gap-4 px-4 py-4 text-left text-[0.95rem] font-semibold text-ink transition-colors hover:bg-orange-50/60 sm:px-6">
            <span>{f.q}</span>
            <span className="faq-icon icon-badge mt-0.5 size-6 rounded-full">
              <Plus size={14} aria-hidden="true" />
            </span>
          </summary>
          <div className="px-4 pb-5 text-sm leading-relaxed text-stone sm:px-6 sm:text-[0.95rem]">
            <p>{f.a}</p>
          </div>
        </details>
      ))}
    </div>
  );
}
