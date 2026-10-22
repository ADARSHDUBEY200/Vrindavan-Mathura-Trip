"use client";

import { useEffect, useRef } from "react";

type Props = { value: number; suffix?: string; className?: string };

const format = (n: number, suffix: string) => `${n.toLocaleString("en-IN")}${suffix}`;

/**
 * Counts up to `value` once it scrolls into view. The final number is server-rendered, so crawlers,
 * no-JS visitors and screen readers always get it; the animation is skipped under reduced motion
 * or when the number is already on screen at load.
 */
export function CountUp({ value, suffix = "", className = "" }: Props) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (el.getBoundingClientRect().top < window.innerHeight) return;

    let frame = 0;
    el.textContent = format(0, suffix);
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        observer.disconnect();
        const start = performance.now();
        const duration = 1600;
        const tick = (now: number) => {
          const p = Math.min(1, (now - start) / duration);
          el.textContent = format(Math.round(value * (1 - Math.pow(1 - p, 3))), suffix);
          if (p < 1) frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
      },
      { threshold: 0.6 },
    );
    observer.observe(el);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
      el.textContent = format(value, suffix);
    };
  }, [value, suffix]);

  return (
    <>
      <span ref={ref} aria-hidden="true" className={`inline-block min-w-[6.5ch] tabular-nums ${className}`}>
        {format(value, suffix)}
      </span>
      <span className="sr-only">{format(value, suffix)}</span>
    </>
  );
}
