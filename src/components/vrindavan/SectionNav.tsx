"use client";

import { useEffect, useRef, useState } from "react";

type Item = { id: string; label: string };

/** Sticky jump links for a long page. Plain anchors work without JS; the observer only marks the current section. */
export function SectionNav({ items, prefix = "vrn" }: { items: Item[]; /** CSS class prefix of the page using it. */ prefix?: string }) {
  const [active, setActive] = useState<string | null>(null);
  const listRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const sections = items.map((i) => document.getElementById(i.id)).filter((el): el is HTMLElement => el !== null);
    const observer = new IntersectionObserver(
      (entries) => {
        const hit = entries.filter((e) => e.isIntersecting).sort((a, b) => b.boundingClientRect.top - a.boundingClientRect.top)[0];
        if (hit) setActive(hit.target.id);
      },
      { rootMargin: "-22% 0px -70% 0px" },
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [items]);

  // Keep the current link in view on phones, without moving the page itself.
  useEffect(() => {
    const list = listRef.current;
    const link = list?.querySelector<HTMLElement>('[aria-current="true"]');
    if (!list || !link) return;
    list.scrollTo({ left: link.offsetLeft - (list.clientWidth - link.offsetWidth) / 2, behavior: "smooth" });
  }, [active]);

  return (
    <nav aria-label="On this page" className={`${prefix}-subnav`}>
      <ul ref={listRef} className={`no-scrollbar ${prefix}-subnav-list`}>
        {items.map((i) => (
          <li key={i.id}>
            <a href={`#${i.id}`} aria-current={active === i.id ? "true" : undefined} className={`${prefix}-subnav-link`}>
              {i.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
