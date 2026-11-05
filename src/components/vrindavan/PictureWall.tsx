"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Expand, X } from "lucide-react";
export type Frame = { src: string; alt: string; caption: string; span: "wide" | "tall" | "square" };

const SPAN = { wide: "col-span-2", tall: "row-span-2", square: "" };

/** Photo mosaic with a keyboard-friendly viewer built on the native <dialog>. */
export function PictureWall({ frames }: { frames: Frame[] }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const openerRef = useRef<HTMLButtonElement | null>(null);
  const [index, setIndex] = useState(0);
  const [open, setOpen] = useState(false);
  const current = frames[index];
  const step = useCallback((by: number) => setIndex((i) => (i + by + frames.length) % frames.length), [frames.length]);

  useEffect(() => {
    const d = dialogRef.current;
    if (!d) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    d.addEventListener("keydown", onKey);
    return () => d.removeEventListener("keydown", onKey);
  }, [step]);

  return (
    <>
      <ul className="dg-wall reveal-stagger">
        {frames.map((f, i) => (
          <li key={f.caption} className={SPAN[f.span]}>
            <button
              type="button"
              onClick={(e) => {
                openerRef.current = e.currentTarget;
                setIndex(i);
                setOpen(true);
                dialogRef.current?.showModal();
              }}
              aria-label={`View larger: ${f.caption}`}
              className="group relative block size-full overflow-hidden rounded-2xl bg-[var(--dg-sand)]"
            >
              <Image src={f.src} alt={f.alt} fill sizes="(min-width: 768px) 25vw, 50vw" className="object-cover transition-transform duration-1200 ease-braj group-hover:scale-105" />
              <span className="dg-wall-caption">
                {f.caption}
                <Expand size={14} aria-hidden="true" className="shrink-0" />
              </span>
            </button>
          </li>
        ))}
      </ul>

      <dialog
        ref={dialogRef}
        aria-label="Photo viewer"
        className="dg-viewer"
        onClick={(e) => {
          if (e.target === e.currentTarget) e.currentTarget.close();
        }}
        onClose={() => {
          setOpen(false);
          openerRef.current?.focus();
        }}
      >
        <figure className="relative flex h-full flex-col">
          <div className="relative min-h-0 flex-1">
            {/* Mounted on open: a closed <dialog> is display:none, so an image inside it could not load or measure. */}
            {open && <Image key={current.caption} src={current.src} alt={current.alt} fill sizes="100vw" loading="eager" className="object-contain" />}
          </div>
          <figcaption aria-live="polite" className="flex items-center justify-center gap-3 px-16 py-4 text-center text-sm text-white/85">
            {current.caption}
            <span className="tabular-nums text-white/50">
              {index + 1} / {frames.length}
            </span>
          </figcaption>
        </figure>
        <button type="button" onClick={() => dialogRef.current?.close()} aria-label="Close photo viewer" className="dg-viewer-btn right-3 top-3">
          <X size={20} aria-hidden="true" />
        </button>
        <button type="button" onClick={() => step(-1)} aria-label="Previous photo" className="dg-viewer-btn bottom-2.5 left-3">
          <ChevronLeft size={20} aria-hidden="true" />
        </button>
        <button type="button" onClick={() => step(1)} aria-label="Next photo" className="dg-viewer-btn bottom-2.5 right-3">
          <ChevronRight size={20} aria-hidden="true" />
        </button>
      </dialog>
    </>
  );
}
