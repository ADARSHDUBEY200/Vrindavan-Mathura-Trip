"use client";

import Image, { type StaticImageData } from "next/image";
import { useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Expand, X } from "lucide-react";

export type GalleryImage = { src: StaticImageData; alt: string; caption: string; credit: string };

/** Masonry gallery with an accessible native <dialog> lightbox. */
export function Gallery({ images }: { images: GalleryImage[] }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const openerRef = useRef<HTMLButtonElement | null>(null);
  const [index, setIndex] = useState(0);
  const current = images[index];

  function open(i: number, opener: HTMLButtonElement) {
    openerRef.current = opener;
    setIndex(i);
    dialogRef.current?.showModal();
  }
  function close() {
    dialogRef.current?.close();
  }
  function step(delta: number) {
    setIndex((i) => (i + delta + images.length) % images.length);
  }

  return (
    <>
      <ul className="columns-2 gap-3 sm:gap-4 lg:columns-3 [&>li]:mb-3 sm:[&>li]:mb-4">
        {images.map((img, i) => (
          <li key={img.caption} className="reveal break-inside-avoid">
            <button
              type="button"
              onClick={(e) => open(i, e.currentTarget)}
              className="group relative block w-full overflow-hidden rounded-media bg-sand"
              aria-label={`Open photo: ${img.caption}`}
            >
              <Image
                src={img.src}
                alt={img.alt}
                sizes="(min-width: 1024px) 30vw, 48vw"
                placeholder="blur"
                className="h-auto w-full transition-transform duration-[1200ms] ease-braj group-hover:scale-105"
              />
              <span className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-2 bg-linear-to-t from-black/70 to-transparent p-3 text-left text-sm font-medium text-white opacity-100 transition-opacity sm:p-4 lg:opacity-0 lg:group-hover:opacity-100 lg:group-focus-visible:opacity-100">
                {img.caption}
                <Expand size={16} aria-hidden="true" className="shrink-0" />
              </span>
            </button>
          </li>
        ))}
      </ul>

      <dialog
        ref={dialogRef}
        aria-label="Photo viewer"
        onClose={() => openerRef.current?.focus()}
        onClick={(e) => {
          if (e.target === e.currentTarget) close();
        }}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") step(1);
          if (e.key === "ArrowLeft") step(-1);
        }}
        className="m-auto max-h-[92vh] w-[min(64rem,94vw)] overflow-visible bg-transparent p-0 text-white backdrop:bg-black/80"
      >
        {current && (
          <figure className="relative">
            <div className="relative overflow-hidden rounded-media bg-black">
              <Image
                key={current.caption}
                src={current.src}
                alt={current.alt}
                sizes="94vw"
                className="mx-auto max-h-[78vh] w-auto object-contain"
              />
            </div>
            <figcaption className="mt-3 flex flex-wrap items-baseline justify-between gap-2 px-1 text-sm">
              <span className="font-semibold">{current.caption}</span>
              <span className="text-white/70">
                {current.credit} · {index + 1} / {images.length}
              </span>
            </figcaption>
            <div className="absolute -top-14 right-0 flex gap-2 sm:-right-2">
              <button type="button" onClick={() => step(-1)} className="grid size-11 place-items-center rounded-full bg-white/15 backdrop-blur hover:bg-white/25" aria-label="Previous photo">
                <ChevronLeft size={22} aria-hidden="true" />
              </button>
              <button type="button" onClick={() => step(1)} className="grid size-11 place-items-center rounded-full bg-white/15 backdrop-blur hover:bg-white/25" aria-label="Next photo">
                <ChevronRight size={22} aria-hidden="true" />
              </button>
              <button type="button" onClick={close} autoFocus className="grid size-11 place-items-center rounded-full bg-white text-ink" aria-label="Close photo viewer">
                <X size={22} aria-hidden="true" />
              </button>
            </div>
          </figure>
        )}
      </dialog>
    </>
  );
}
