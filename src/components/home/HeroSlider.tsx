"use client";

import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState, useSyncExternalStore, type PointerEvent as ReactPointerEvent, type TransitionEvent } from "react";
import { ArrowRight, ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";

export type HeroSlideData = {
  image: StaticImageData;
  alt: string;
  eyebrow: string;
  title: string;
  text: string;
  cta: { label: string; href: string };
};

const INTERVAL = 5000;
const SWIPE = 50;

function subscribeReducedMotion(cb: () => void) {
  const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
}
const getReducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/**
 * Card carousel: each slide is its own card, and the whole card slides out as the next card
 * (with its own photo) slides in. Loops seamlessly via a cloned first card; supports swipe,
 * arrows, dots and a pause control, and pauses on hover/focus.
 */
export function HeroSlider({ slides }: { slides: HeroSlideData[] }) {
  const n = slides.length;
  const [index, setIndex] = useState(0); // 0 … n (n is the clone of card 0)
  const [animate, setAnimate] = useState(true);
  const [drag, setDrag] = useState(0);
  const [userPaused, setUserPaused] = useState(false);
  const [hovered, setHovered] = useState(false);
  const reduced = useSyncExternalStore(subscribeReducedMotion, getReducedMotion, () => false);
  const pointer = useRef<{ x: number; y: number; moved: boolean; horizontal: boolean | null } | null>(null);
  const suppressClick = useRef(false);

  const active = index % n;
  const playing = !userPaused && !hovered && !reduced && drag === 0 && n > 1;

  const next = () => {
    setAnimate(true);
    // Without transitions (reduced motion) there is no transitionend to snap back from the clone.
    setIndex((i) => (reduced ? (i + 1) % n : i >= n ? 1 : i + 1));
  };
  const prev = () => {
    if (reduced) {
      setIndex((i) => (i - 1 + n) % n);
      return;
    }
    if (index === 0) {
      // Jump to the clone without animating, then slide back one card.
      setAnimate(false);
      setIndex(n);
      requestAnimationFrame(() =>
        requestAnimationFrame(() => {
          setAnimate(true);
          setIndex(n - 1);
        }),
      );
      return;
    }
    setAnimate(true);
    setIndex((i) => i - 1);
  };
  const goTo = (i: number) => {
    setAnimate(true);
    setIndex(i);
  };

  useEffect(() => {
    if (!playing) return;
    const t = setTimeout(next, INTERVAL);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playing, index]);

  // After sliding onto the clone, snap back to the real first card.
  const onTransitionEnd = (e: TransitionEvent<HTMLDivElement>) => {
    if (e.target !== e.currentTarget) return;
    if (index === n) {
      setAnimate(false);
      setIndex(0);
    }
  };

  const onPointerDown = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (e.pointerType === "mouse" && e.button !== 0) return;
    pointer.current = { x: e.clientX, y: e.clientY, moved: false, horizontal: null };
  };
  const onPointerMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    const p = pointer.current;
    if (!p) return;
    const dx = e.clientX - p.x;
    const dy = e.clientY - p.y;
    if (p.horizontal === null && Math.abs(dx) + Math.abs(dy) > 8) {
      p.horizontal = Math.abs(dx) > Math.abs(dy);
      if (p.horizontal) e.currentTarget.setPointerCapture(e.pointerId);
    }
    if (p.horizontal) {
      p.moved = true;
      setAnimate(false);
      setDrag(dx);
    }
  };
  const endDrag = () => {
    const p = pointer.current;
    pointer.current = null;
    if (!p?.moved) return;
    suppressClick.current = true;
    const dx = drag;
    setDrag(0);
    if (dx < -SWIPE) next();
    else if (dx > SWIPE) prev();
    else setAnimate(true);
  };

  const cards = [...slides, slides[0]];
  const motion = animate && !reduced ? "duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]" : "duration-0";

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Highlights of Braj"
      data-index={index}
      className="relative [--gap:16px] [--slide:100%]"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setHovered(false);
      }}
    >
      {/* Viewport: clips the track; padding leaves room for card shadows */}
      <div className="-mx-2 overflow-hidden px-2 pb-6 pt-2">
        <div
          className={`flex touch-pan-y select-none gap-[var(--gap)] transition-transform ${motion}`}
          style={{ transform: `translate3d(calc(${-index} * (var(--slide) + var(--gap)) + ${drag}px), 0, 0)` }}
          onTransitionEnd={onTransitionEnd}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
          onClickCapture={(e) => {
            if (suppressClick.current) {
              e.preventDefault();
              e.stopPropagation();
              suppressClick.current = false;
            }
          }}
        >
          {cards.map((s, i) => {
            const isClone = i === n;
            return (
              <article
                key={i}
                role={isClone ? undefined : "group"}
                aria-roledescription={isClone ? undefined : "slide"}
                aria-label={isClone ? undefined : `${i + 1} of ${n}: ${s.title}`}
                aria-hidden={isClone || i !== index}
                inert={isClone || i !== index}
                className="relative h-[24rem] w-[var(--slide)] shrink-0 overflow-hidden rounded-[1.5rem] bg-[#7a2e00] shadow-[0_24px_48px_-24px_rgb(124_45_18/0.65)] sm:h-[27rem] lg:h-[30rem]"
              >
                <Image
                  src={s.image}
                  alt={isClone ? "" : s.alt}
                  fill
                  preload={i === 0}
                  fetchPriority={i === 0 ? "high" : "low"}
                  loading={i <= 1 ? "eager" : "lazy"}
                  sizes="(min-width: 1280px) 26rem, (min-width: 1024px) 40vw, 88vw"
                  placeholder="blur"
                  draggable={false}
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/85 via-black/35 to-black/5" aria-hidden="true" />

                <div className="relative flex h-full flex-col justify-end p-6 sm:p-7">
                  <p className="text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-orange-200 sm:text-xs">{s.eyebrow}</p>
                  <p className="mt-2.5 text-[1.55rem] font-extrabold uppercase leading-[1.05] tracking-tight text-white sm:text-[1.9rem]">{s.title}</p>
                  <p className="mt-2.5 text-sm leading-relaxed text-white/85">{s.text}</p>
                  <div className="mt-5">
                    <Link
                      href={s.cta.href}
                      draggable={false}
                      className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-2.5 text-xs font-bold uppercase tracking-[0.12em] text-orange-700 shadow-lift transition-all duration-300 hover:-translate-y-0.5 hover:bg-orange-50"
                    >
                      {s.cta.label}
                      <ArrowRight size={15} aria-hidden="true" className="btn-arrow" />
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      {/* Controls sit below the cards so they don't move with them */}
      {n > 1 && (
        <div className="-mt-2 flex items-center justify-between gap-3 px-1">
          <div className="flex items-center gap-1.5" role="group" aria-label="Choose slide">
            {slides.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => goTo(i)}
                aria-label={`Show slide ${i + 1}`}
                aria-current={i === active ? "true" : undefined}
                className={`h-2 rounded-full transition-all duration-500 ${i === active ? "w-7 bg-linear-to-r from-orange-500 to-orange-600" : "w-2 bg-orange-200 hover:bg-orange-300"}`}
              />
            ))}
            <button
              type="button"
              onClick={() => setUserPaused((p) => !p)}
              className="ml-2 grid size-7 place-items-center rounded-full border border-orange-200 bg-white text-orange-700 transition-colors hover:bg-orange-50"
              aria-label={userPaused ? "Play slideshow" : "Pause slideshow"}
            >
              {userPaused ? <Play size={12} aria-hidden="true" /> : <Pause size={12} aria-hidden="true" />}
            </button>
          </div>
          <div className="flex items-center gap-2">
            <button type="button" onClick={prev} className="grid size-10 place-items-center rounded-full border border-orange-200 bg-white text-ink shadow-soft transition-all hover:-translate-x-0.5 hover:border-orange-400 hover:text-orange-700" aria-label="Previous slide">
              <ChevronLeft size={19} aria-hidden="true" />
            </button>
            <button type="button" onClick={next} className="grid size-10 place-items-center rounded-full bg-linear-to-r from-orange-500 to-orange-600 text-white shadow-glow transition-transform hover:translate-x-0.5" aria-label="Next slide">
              <ChevronRight size={19} aria-hidden="true" />
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
