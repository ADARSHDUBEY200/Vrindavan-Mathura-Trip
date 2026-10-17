"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

/**
 * Horizontally scrolling card row (swipe on touch, arrow buttons on desktop).
 * Children should be <li> elements; give them a width (e.g. `w-[80%] sm:w-[46%] lg:w-[calc((100%-2.5rem)/3)]`).
 */
export function CardRail({ label, children, className = "" }: { label: string; children: ReactNode; className?: string }) {
  const ref = useRef<HTMLUListElement>(null);
  const [edges, setEdges] = useState({ start: true, end: false });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const update = () => {
      const max = el.scrollWidth - el.clientWidth - 2;
      setEdges({ start: el.scrollLeft <= 2, end: el.scrollLeft >= max });
    };
    // Filter chips elsewhere on the page can hide cards; reset and re-measure when they change.
    const onFilter = (e: Event) => {
      if ((e.target as Element).closest?.(".filter-root")?.contains(el)) {
        el.scrollTo({ left: 0 });
        requestAnimationFrame(update);
      }
    };
    const ro = new ResizeObserver(update);
    ro.observe(el);
    el.addEventListener("scroll", update, { passive: true });
    document.addEventListener("change", onFilter);
    return () => {
      ro.disconnect();
      el.removeEventListener("scroll", update);
      document.removeEventListener("change", onFilter);
    };
  }, []);

  const scroll = (dir: 1 | -1) => {
    const el = ref.current;
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth * 0.9, behavior: "smooth" });
  };

  const btn =
    "absolute top-[38%] z-10 hidden size-11 -translate-y-1/2 place-items-center rounded-full border border-line bg-white text-ink shadow-lift transition-all duration-300 hover:border-orange-300 hover:text-ember-deep disabled:pointer-events-none disabled:opacity-0 lg:grid";

  return (
    <div className={`relative ${className}`}>
      <ul ref={ref} aria-label={label} className="rail">
        {children}
      </ul>
      <button type="button" onClick={() => scroll(-1)} disabled={edges.start} className={`${btn} -left-5`} aria-label={`Scroll ${label} left`}>
        <ChevronLeft size={20} aria-hidden="true" />
      </button>
      <button type="button" onClick={() => scroll(1)} disabled={edges.end} className={`${btn} -right-5`} aria-label={`Scroll ${label} right`}>
        <ChevronRight size={20} aria-hidden="true" />
      </button>
    </div>
  );
}
