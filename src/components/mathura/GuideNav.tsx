"use client";

import { useEffect, useRef, useState } from "react";

type GuideLink = { id: string; label: string };

/**
 * Sticky "In this guide" bar. Plain anchors, so it works without JavaScript; the effects only
 * highlight the section being read and keep its link in view on narrow screens.
 */
export function GuideNav({ links }: { links: GuideLink[] }) {
  const [active, setActive] = useState<string | null>(null);
  const listRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const sections = links.flatMap((l) => document.getElementById(l.id) ?? []);
    // The active section is whichever crosses a thin band just above the middle of the screen.
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) if (entry.isIntersecting) setActive(entry.target.id);
      },
      { rootMargin: "-35% 0px -60% 0px" },
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [links]);

  useEffect(() => {
    const list = listRef.current;
    const item = list?.querySelector<HTMLElement>('[aria-current="true"]');
    if (!list || !item) return;
    // Scrolls the bar only (scrollIntoView could also move the page).
    list.scrollTo({ left: item.offsetLeft - (list.clientWidth - item.offsetWidth) / 2 });
  }, [active]);

  return (
    <nav aria-label="In this guide" className="mt-guide-nav">
      <ul ref={listRef} className="mt-guide-list no-scrollbar">
        {links.map((l) => (
          <li key={l.id}>
            <a href={`#${l.id}`} aria-current={active === l.id ? "true" : undefined} className="mt-guide-link">
              {l.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
