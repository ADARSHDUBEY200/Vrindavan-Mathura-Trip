"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import type { TemplePicture } from "@/lib/cms/temples";

type Item = { id: string; caption: string; picture: TemplePicture };

/** Photo grid with a lightbox on the native <dialog>, so focus, Esc and the page behind are handled for free. */
export function TempleGallery({ items }: { items: Item[] }) {
  const [active, setActive] = useState<number | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const el = dialog.current;
    if (!el) return;
    if (active !== null && !el.open) el.showModal();
    if (active === null && el.open) el.close();
  }, [active]);

  const step = (dir: 1 | -1) => setActive((i) => (i === null ? i : (i + dir + items.length) % items.length));
  const current = active === null ? null : items[active];

  return (
    <>
      <ul className="tdp-gallery">
        {items.map((item, i) => (
          <li key={item.id}>
            <button type="button" className="tdp-gallery-item" onClick={() => setActive(i)} aria-label={`Open photo: ${item.picture.alt}`}>
              <Image src={item.picture.src} alt={item.picture.alt} fill sizes="(min-width: 640px) 18rem, 46vw" className="object-cover" />
            </button>
            {item.caption && <p className="mt-1.5 text-xs leading-snug text-stone">{item.caption}</p>}
          </li>
        ))}
      </ul>

      <dialog
        ref={dialog}
        className="tdp-lightbox"
        aria-label="Photo viewer"
        onClose={() => setActive(null)}
        onClick={(e) => e.target === e.currentTarget && setActive(null)}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") step(1);
          if (e.key === "ArrowLeft") step(-1);
        }}
      >
        {current && (
          <>
            <div className="tdp-lightbox-frame">
              <Image src={current.picture.src} alt={current.picture.alt} fill sizes="92vw" className="object-contain" />
            </div>
            <div className="flex items-center gap-3 p-3">
              <p className="min-w-0 flex-1 text-sm leading-snug">{current.caption || current.picture.alt}</p>
              {items.length > 1 && (
                <>
                  <button type="button" className="tdp-lightbox-btn" onClick={() => step(-1)} aria-label="Previous photo">
                    <ChevronLeft size={20} aria-hidden="true" />
                  </button>
                  <button type="button" className="tdp-lightbox-btn" onClick={() => step(1)} aria-label="Next photo">
                    <ChevronRight size={20} aria-hidden="true" />
                  </button>
                </>
              )}
              <button type="button" className="tdp-lightbox-btn" onClick={() => setActive(null)} aria-label="Close photo viewer">
                <X size={20} aria-hidden="true" />
              </button>
            </div>
          </>
        )}
      </dialog>
    </>
  );
}
