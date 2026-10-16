"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useEffectEvent, useId, useRef, useState, type KeyboardEvent as ReactKeyboardEvent } from "react";
import { ArrowRight, ChevronDown, Menu, Phone, X } from "lucide-react";
import { Logo } from "@/components/layout/Logo";
import { WhatsappIcon } from "@/components/svg/TravelIcons";
import { mainNav, phoneHref, type NavItem } from "@/config/site";
import { photos, type PhotoKey } from "@/content/images";
import { whatsappLink } from "@/lib/whatsapp";

function isActive(pathname: string, item: NavItem): boolean {
  if (item.href === "/") return pathname === "/";
  if (item.href && pathname.startsWith(item.href)) return true;
  return Boolean(item.menu?.links.some((l) => pathname === l.href || pathname.startsWith(`${l.href}/`)));
}

export function Header() {
  const pathname = usePathname();
  const [openMenu, setOpenMenu] = useState<number | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const triggerRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const mobileToggleRef = useRef<HTMLButtonElement>(null);
  const baseId = useId();
  const wa = whatsappLink();
  const tel = phoneHref();

  function openNow(i: number) {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpenMenu(i);
  }
  function closeSoon() {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpenMenu(null), 140);
  }

  // Close desktop menus on Escape or a click outside.
  useEffect(() => {
    if (openMenu === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        triggerRefs.current[openMenu]?.focus();
        setOpenMenu(null);
      }
    };
    const onClick = (e: MouseEvent) => {
      if (!(e.target as Element).closest("[data-mega-root]")) setOpenMenu(null);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("click", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("click", onClick);
    };
  }, [openMenu]);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-4">
        <div className="header-pill relative mx-auto flex h-14 max-w-7xl items-center justify-between gap-4 rounded-full border border-line/80 bg-white/95 pl-3 pr-1.5 backdrop-blur-md sm:h-16 sm:pl-5 sm:pr-2">
          <Logo />

          <nav aria-label="Main" className="hidden xl:block" data-mega-root>
            <ul className="flex items-center gap-0.5">
              {mainNav.map((item, i) => {
                const active = isActive(pathname, item);
                const linkCls = `relative rounded-full px-2.5 py-2 text-[0.9rem] font-medium transition-colors hover:bg-saffron-wash hover:text-ink ${
                  active ? "text-ink after:absolute after:inset-x-3 after:-bottom-0.5 after:h-0.5 after:rounded-full after:bg-linear-to-r after:from-orange-500 after:to-amber-500" : "text-ink-soft"
                }`;
                if (!item.menu) {
                  return (
                    <li key={item.label}>
                      <Link href={item.href} className={linkCls} aria-current={pathname === item.href ? "page" : undefined}>
                        {item.label}
                      </Link>
                    </li>
                  );
                }
                const panelId = `${baseId}-menu-${i}`;
                const open = openMenu === i;
                return (
                  <li
                    key={item.label}
                    className="relative"
                    onMouseEnter={() => openNow(i)}
                    onMouseLeave={closeSoon}
                    onBlur={(e) => {
                      if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setOpenMenu(null);
                    }}
                  >
                    <button
                      ref={(el) => {
                        triggerRefs.current[i] = el;
                      }}
                      type="button"
                      className={`${linkCls} inline-flex items-center gap-1`}
                      aria-expanded={open}
                      aria-controls={panelId}
                      onClick={() => setOpenMenu(open ? null : i)}
                    >
                      {item.label}
                      <ChevronDown size={15} aria-hidden="true" className={`transition-transform duration-300 ${open ? "rotate-180" : ""}`} />
                    </button>
                    <div
                      id={panelId}
                      hidden={!open}
                      className="absolute left-1/2 top-full z-10 w-[34rem] -translate-x-1/2 pt-4"
                    >
                      <div className="animate-fade-in rounded-[1.6rem] border border-line bg-white p-3 shadow-lift">
                        <ul className="grid grid-cols-2 gap-1.5">
                          {item.menu.links.map((l) => (
                            <li key={l.href}>
                              <Link
                                href={l.href}
                                onClick={() => setOpenMenu(null)}
                                aria-current={pathname === l.href ? "page" : undefined}
                                className="group flex items-center gap-3 rounded-2xl p-2.5 transition-colors hover:bg-cream"
                              >
                                {l.image && open && (
                                  <span className="relative size-14 shrink-0 overflow-hidden rounded-xl bg-sand">
                                    <Image src={photos[l.image as PhotoKey].src} alt="" fill sizes="56px" className="object-cover" />
                                  </span>
                                )}
                                <span className="min-w-0">
                                  <span className="block text-sm font-semibold text-ink">{l.label}</span>
                                  {l.note && <span className="mt-0.5 block text-xs leading-snug text-stone">{l.note}</span>}
                                </span>
                              </Link>
                            </li>
                          ))}
                        </ul>
                        {(item.menu.footer || item.href) && (
                          <Link
                            href={item.menu.footer?.href ?? item.href!}
                            onClick={() => setOpenMenu(null)}
                            className="link-arrow mt-2 flex items-center justify-between rounded-2xl bg-saffron-wash px-4 py-3 text-sm"
                          >
                            {item.menu.footer?.label ?? `All ${item.label.toLowerCase()}`}
                            <ArrowRight size={16} aria-hidden="true" className="btn-arrow" />
                          </Link>
                        )}
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            {wa ? (
              <a href={wa} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp btn-sm hidden sm:inline-flex">
                <WhatsappIcon size={18} />
                <span>WhatsApp</span>
                <span className="sr-only"> (opens WhatsApp)</span>
              </a>
            ) : (
              <Link href="/contact" className="btn btn-primary btn-sm hidden sm:inline-flex">
                Plan my trip
              </Link>
            )}
            <button
              ref={mobileToggleRef}
              type="button"
              className="grid size-11 place-items-center rounded-full bg-ink text-white xl:hidden"
              aria-expanded={mobileOpen}
              aria-controls={`${baseId}-mobile`}
              aria-label="Open menu"
              onClick={() => setMobileOpen(true)}
            >
              <Menu size={20} aria-hidden="true" />
            </button>
          </div>
        </div>
      </header>

      {mobileOpen && (
        <MobileMenu
          id={`${baseId}-mobile`}
          pathname={pathname}
          wa={wa}
          tel={tel}
          onClose={() => {
            setMobileOpen(false);
            mobileToggleRef.current?.focus();
          }}
        />
      )}
    </>
  );
}

function MobileMenu({ id, pathname, wa, tel, onClose }: { id: string; pathname: string; wa?: string; tel?: string; onClose: () => void }) {
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const [expanded, setExpanded] = useState<string | null>(null);

  const onEscape = useEffectEvent(() => onClose());

  // Lock page scroll, move focus into the panel and close on Escape.
  useEffect(() => {
    const root = document.documentElement;
    const prev = root.style.overflow;
    root.style.overflow = "hidden";
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onEscape();
    };
    document.addEventListener("keydown", onKey);
    return () => {
      root.style.overflow = prev;
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  // Keep Tab focus inside the open panel.
  function trapFocus(e: ReactKeyboardEvent<HTMLDivElement>) {
    if (e.key !== "Tab" || !panelRef.current) return;
    const focusables = panelRef.current.querySelectorAll<HTMLElement>("a[href], button:not([disabled])");
    const first = focusables[0];
    const last = focusables[focusables.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  }

  return (
    <div
      id={id}
      ref={panelRef}
      role="dialog"
      aria-modal="true"
      aria-label="Site menu"
      onKeyDown={trapFocus}
      className="animate-slide-in fixed inset-0 z-[60] flex flex-col overflow-y-auto bg-ivory xl:hidden"
    >
      <div className="flex items-center justify-between px-5 pt-5">
        <Logo />
        <button ref={closeRef} type="button" onClick={onClose} className="grid size-11 place-items-center rounded-full bg-ink text-white" aria-label="Close menu">
          <X size={20} aria-hidden="true" />
        </button>
      </div>

      <nav aria-label="Mobile" className="mt-6 flex-1 px-5">
        <ul className="divide-y divide-line border-y border-line">
          {mainNav.map((item) => {
            if (!item.menu) {
              return (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    onClick={onClose}
                    aria-current={pathname === item.href ? "page" : undefined}
                    className="flex items-center justify-between py-4 text-lg font-semibold text-ink aria-[current=page]:text-ember-deep"
                  >
                    {item.label}
                    <ArrowRight size={18} aria-hidden="true" className="text-stone" />
                  </Link>
                </li>
              );
            }
            const isOpen = expanded === item.label;
            const groupId = `${id}-${item.label.replace(/\W+/g, "-").toLowerCase()}`;
            return (
              <li key={item.label}>
                <button
                  type="button"
                  className="flex w-full items-center justify-between py-4 text-left text-lg font-semibold text-ink"
                  aria-expanded={isOpen}
                  aria-controls={groupId}
                  onClick={() => setExpanded(isOpen ? null : item.label)}
                >
                  {item.label}
                  <ChevronDown size={20} aria-hidden="true" className={`text-stone transition-transform ${isOpen ? "rotate-180" : ""}`} />
                </button>
                <ul id={groupId} hidden={!isOpen} className="grid gap-1 pb-4">
                  {item.menu.links.map((l) => (
                    <li key={l.href}>
                      <Link href={l.href} onClick={onClose} className="block rounded-xl px-3 py-2.5 hover:bg-cream">
                        <span className="block font-medium text-ink">{l.label}</span>
                        {l.note && <span className="block text-sm text-stone">{l.note}</span>}
                      </Link>
                    </li>
                  ))}
                  {(item.menu.footer || item.href) && (
                    <li>
                      <Link href={item.menu.footer?.href ?? item.href!} onClick={onClose} className="link-arrow px-3 py-2.5">
                        {item.menu.footer?.label ?? `All ${item.label.toLowerCase()}`}
                        <ArrowRight size={16} aria-hidden="true" />
                      </Link>
                    </li>
                  )}
                </ul>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="grid gap-3 px-5 pb-8 pt-6">
        {wa && (
          <a href={wa} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp w-full">
            <WhatsappIcon size={20} /> Enquire on WhatsApp
          </a>
        )}
        {tel && (
          <a href={tel} className="btn btn-outline w-full">
            <Phone size={18} aria-hidden="true" /> Call us
          </a>
        )}
        {!wa && !tel && (
          <Link href="/contact" onClick={onClose} className="btn btn-primary w-full">
            Plan my trip
          </Link>
        )}
      </div>
    </div>
  );
}
