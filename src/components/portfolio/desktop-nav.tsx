'use client';

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { NAV_ITEMS, SECTION_ITEMS, activeHrefFor, readSectionProgress, smoothstep } from "@/components/portfolio/scroll-spy";

/** Smoothing time constant in ms; higher trails the scroll more softly. */
const SMOOTHING_MS = 90;
/** Keep animating this long after the last scroll event, so momentum scrolling is tracked. */
const IDLE_MS = 200;
/** Resting height of the glow in px (matches h-8). */
const PILL_HEIGHT = 32;
/** How much thinner the glow gets when fully stretched between two links (0 to 1). */
const THINNING = 0.5;

type Box = { x: number; w: number; o: number; h: number };

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

export function DesktopNav() {
  const pathname = usePathname();
  const navRef = useRef<HTMLElement>(null);
  const pillRef = useRef<HTMLSpanElement>(null);
  const linkRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const [activeHref, setActiveHref] = useState<string | null>(null);

  useEffect(() => {
    const nav = navRef.current;
    const pill = pillRef.current;
    if (!nav || !pill) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const onHome = pathname === '/';

    const current: Box = { x: 0, w: 0, o: 0, h: 1 };
    let target: Box = { x: 0, w: 0, o: 0, h: 1 };
    let frame = 0;
    let lastTime = 0;
    let lastWake = 0;
    let hasRendered = false;
    let lastActive: string | null = null;

    const setActive = (href: string | null) => {
      if (href !== lastActive) {
        lastActive = href;
        setActiveHref(href);
      }
    };

    const linkBox = (index: number) => {
      const el = linkRefs.current[index];
      return el ? { x: el.offsetLeft, w: el.offsetWidth } : null;
    };

    /** Works out where the glow should be. Returns false while the desktop nav is hidden. */
    const computeTarget = () => {
      if (nav.offsetParent === null) return false;

      if (!onHome) {
        const href = activeHrefFor(pathname);
        const index = NAV_ITEMS.findIndex((it) => it.href === href);
        const box = index >= 0 ? linkBox(index) : null;
        target = box ? { ...box, o: 1, h: 1 } : { ...target, o: 0 };
        setActive(href);
        return true;
      }

      const progress = readSectionProgress();
      const from = linkBox(SECTION_ITEMS[progress.current].index);
      const to = linkBox(SECTION_ITEMS[progress.next].index);
      if (!from || !to) return false;

      // Glide like a cell: the leading edge sets off first and the trailing edge catches
      // up last, so the glow stretches across the gap, thinning as it stretches, then
      // pulls together on the next link.
      const g = progress.glide;
      const lead = reduceMotion.matches ? g : smoothstep(0, 0.65, g);
      const trail = reduceMotion.matches ? g : smoothstep(0.35, 1, g);
      const forward = to.x >= from.x;
      const left = lerp(from.x, to.x, forward ? trail : lead);
      const right = lerp(from.x + from.w, to.x + to.w, forward ? lead : trail);
      const restingWidth = lerp(from.w, to.w, g);
      const gap = Math.abs(to.x + to.w / 2 - (from.x + from.w / 2));
      const stretch = gap > 0 ? Math.min(1, Math.max(0, (right - left - restingWidth) / gap)) : 0;
      target = { x: left, w: right - left, o: 1, h: 1 - THINNING * stretch };
      setActive(activeHrefFor(pathname, progress));
      return true;
    };

    // One loop drives everything: each frame it re-reads the scroll position, so the glow
    // follows smooth and momentum scrolling exactly, then eases toward that target.
    const tick = (now: number) => {
      const dt = lastTime ? Math.min(64, now - lastTime) : 16;
      lastTime = now;

      if (!computeTarget()) {
        frame = 0;
        lastTime = 0;
        return;
      }

      const snap = reduceMotion.matches || !hasRendered;
      const alpha = snap ? 1 : 1 - Math.exp(-dt / SMOOTHING_MS);
      (['x', 'w', 'o', 'h'] as const).forEach((key) => {
        current[key] += (target[key] - current[key]) * alpha;
      });

      const settled =
        Math.abs(target.x - current.x) < 0.2 &&
        Math.abs(target.w - current.w) < 0.2 &&
        Math.abs(target.o - current.o) < 0.01 &&
        Math.abs(target.h - current.h) < 0.005;
      if (settled) Object.assign(current, target);

      pill.style.transform = `translate3d(${current.x}px, 0, 0)`;
      pill.style.width = `${current.w}px`;
      pill.style.height = `${PILL_HEIGHT * current.h}px`;
      pill.style.opacity = String(current.o);
      hasRendered = true;

      if (settled && now - lastWake > IDLE_MS) {
        frame = 0;
        lastTime = 0;
      } else {
        frame = requestAnimationFrame(tick);
      }
    };

    const wake = () => {
      lastWake = performance.now();
      if (!frame) frame = requestAnimationFrame(tick);
    };

    wake();
    window.addEventListener('scroll', wake, { passive: true });
    window.addEventListener('resize', wake);
    // Collapsible sections and late-loading fonts and images change section positions.
    const resizeObserver = new ResizeObserver(wake);
    resizeObserver.observe(document.body);
    resizeObserver.observe(nav);
    document.fonts?.ready.then(wake);

    return () => {
      window.removeEventListener('scroll', wake);
      window.removeEventListener('resize', wake);
      resizeObserver.disconnect();
      if (frame) cancelAnimationFrame(frame);
    };
  }, [pathname]);

  return (
    <nav ref={navRef} className="relative hidden items-center gap-0.5 lg:flex xl:gap-1.5" aria-label="Main">
      <span
        ref={pillRef}
        aria-hidden="true"
        className="nav-glow pointer-events-none absolute inset-y-0 left-0 my-auto h-8 rounded-full bg-primary/15 ring-1 ring-primary/50 opacity-0"
      />
      {NAV_ITEMS.map((item, index) => {
        const active = item.href === activeHref;
        return (
          <a
            key={item.href}
            ref={(el) => {
              linkRefs.current[index] = el;
            }}
            href={item.href}
            aria-current={active ? (item.section ? 'location' : 'page') : undefined}
            className={cn(
              "relative z-10 rounded-full px-3 py-1.5 text-sm font-medium transition-colors duration-300 hover:text-primary",
              active && "text-primary"
            )}
          >
            {item.label}
          </a>
        );
      })}
    </nav>
  );
}
