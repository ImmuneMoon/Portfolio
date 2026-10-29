'use client';

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { NAV_ITEMS, SECTION_ITEMS, activeHrefFor, readSectionProgress, smoothstep } from "@/components/portfolio/scroll-spy";

/** Smoothing time constant in ms; higher trails the scroll more softly. */
const SMOOTHING_MS = 90;
/** Keep animating this long after the last scroll event, so momentum scrolling is tracked. */
const IDLE_MS = 200;
/** Resting height of the glow in px. */
const PILL_HEIGHT = 32;
/** How much thinner the neck between the two bulbs gets at full stretch (0 to 1). */
const THINNING = 0.72;
/** How much the bulbs swell at full stretch (0 to 1). */
const SWELL = 0.12;
/** Radius of the curves joining the bulbs to the neck, in px, at full stretch. */
const FILLET = 14;
/** Points along each edge of the outline. */
const SAMPLES = 96;

/**
 * The glow's shape: two pill-shaped bulbs (left one from `x`, right one ending at
 * `x + w`) joined by a neck. At rest both bulbs cover the same link and the neck is
 * as thick as the bulbs, so it's a plain pill.
 */
type Shape = { x: number; w: number; lw: number; rw: number; neck: number; swell: number; o: number };
const KEYS = ['x', 'w', 'lw', 'rw', 'neck', 'swell', 'o'] as const;

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

/** Signed distance from (px, py) to a horizontal capsule from x1 to x2 (centre line y = 0). */
function capsule(px: number, py: number, x1: number, x2: number, r: number) {
  const cx = Math.min(Math.max(px, x1), x2);
  return Math.hypot(px - cx, py) - r;
}

/** Smooth minimum: unions two shapes with a rounded join of size k. */
function smin(a: number, b: number, k: number) {
  if (k <= 0) return Math.min(a, b);
  const h = Math.max(k - Math.abs(a - b), 0) / k;
  return Math.min(a, b) - h * h * k * 0.25;
}

/** Traces the outline of a Shape as an SVG path, centred vertically on `cy`. */
function outline(s: Shape, cy: number) {
  const left = s.x;
  const right = s.x + s.w;
  const r = (PILL_HEIGHT / 2) * (1 + SWELL * s.swell);
  const lw = Math.max(s.lw, 2 * r);
  const rw = Math.max(s.rw, 2 * r);
  // Bulb centre lines, kept inside the shape.
  const l1 = left + r, l2 = Math.max(l1, Math.min(right - r, left + lw - r));
  const r2 = right - r, r1 = Math.min(r2, Math.max(left + r, right - rw + r));
  const neckR = (PILL_HEIGHT / 2) * s.neck;
  const k = FILLET * (1 - s.neck);
  const sdf = (px: number, py: number) =>
    smin(Math.min(capsule(px, py, l1, l2, r), capsule(px, py, r1, r2, r)), capsule(px, py, l1, r2, neckR), k);

  // For each column, find the half-height of the shape by bisection. Columns are spaced
  // on a cosine curve so the rounded ends get more points.
  const top: string[] = [];
  const bottom: string[] = [];
  for (let i = 0; i <= SAMPLES; i++) {
    const px = left + (right - left) * (1 - Math.cos((Math.PI * i) / SAMPLES)) / 2;
    let half = 0;
    if (sdf(px, 0) < 0) {
      let lo = 0;
      let hi = r + 2;
      for (let j = 0; j < 14; j++) {
        const mid = (lo + hi) / 2;
        if (sdf(px, mid) < 0) lo = mid;
        else hi = mid;
      }
      half = lo;
    }
    top.push(`${px.toFixed(2)},${(cy - half).toFixed(2)}`);
    bottom.push(`${px.toFixed(2)},${(cy + half).toFixed(2)}`);
  }
  return `M${top.join('L')}L${bottom.reverse().join('L')}Z`;
}

export function DesktopNav() {
  const pathname = usePathname();
  const navRef = useRef<HTMLElement>(null);
  const glowRef = useRef<HTMLSpanElement>(null);
  const linkRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const [activeHref, setActiveHref] = useState<string | null>(null);

  useEffect(() => {
    const nav = navRef.current;
    const glow = glowRef.current;
    if (!nav || !glow) return;
    const paths = glow.querySelectorAll('path');
    let lastPath = '';
    let lastOpacity = '';

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const onHome = pathname === '/';

    const current: Shape = { x: 0, w: 0, lw: 0, rw: 0, neck: 1, swell: 0, o: 0 };
    let target: Shape = { ...current };
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

    const restingOn = (box: { x: number; w: number }): Shape => ({
      x: box.x, w: box.w, lw: box.w, rw: box.w, neck: 1, swell: 0, o: 1,
    });

    /** Works out where the glow should be. Returns false while the desktop nav is hidden. */
    const computeTarget = () => {
      if (nav.offsetParent === null) return false;

      if (!onHome) {
        const href = activeHrefFor(pathname);
        const index = NAV_ITEMS.findIndex((it) => it.href === href);
        const box = index >= 0 ? linkBox(index) : null;
        target = box ? restingOn(box) : { ...target, o: 0 };
        setActive(href);
        return true;
      }

      const progress = readSectionProgress();
      const from = linkBox(SECTION_ITEMS[progress.current].index);
      const to = linkBox(SECTION_ITEMS[progress.next].index);
      if (!from || !to) return false;
      setActive(activeHrefFor(pathname, progress));

      const g = progress.glide;
      if (reduceMotion.matches) {
        target = restingOn({ x: lerp(from.x, to.x, g), w: lerp(from.w, to.w, g) });
        return true;
      }

      // Glide like a dividing cell: the leading edge sets off first and the trailing
      // edge catches up last. Meanwhile the glow splits into a bulb on each link joined
      // by a neck that thins as it stretches, then pulls back into one pill.
      const lead = smoothstep(0, 0.65, g);
      const trail = smoothstep(0.35, 1, g);
      const forward = to.x >= from.x;
      const left = lerp(from.x, to.x, forward ? trail : lead);
      const right = lerp(from.x + from.w, to.x + to.w, forward ? lead : trail);
      const restingWidth = lerp(from.w, to.w, g);
      const gap = Math.abs(to.x + to.w / 2 - (from.x + from.w / 2));
      const stretch = gap > 0 ? Math.min(1, Math.max(0, (right - left - restingWidth) / gap)) : 0;
      // The bulb being left shrinks as the leading edge reaches out; the arriving bulb
      // grows to the target link's width as the trailing edge catches up.
      const leaving = lerp(from.w, PILL_HEIGHT, smoothstep(0, 0.4, g));
      const arriving = lerp(PILL_HEIGHT, to.w, smoothstep(0.6, 1, g));
      target = {
        x: left,
        w: right - left,
        lw: forward ? leaving : arriving,
        rw: forward ? arriving : leaving,
        neck: 1 - THINNING * stretch,
        swell: stretch,
        o: 1,
      };
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
      KEYS.forEach((key) => {
        current[key] += (target[key] - current[key]) * alpha;
      });

      const settled = KEYS.every((key) => Math.abs(target[key] - current[key]) < (key === 'neck' || key === 'swell' || key === 'o' ? 0.005 : 0.2));
      if (settled) Object.assign(current, target);

      // Only touch the DOM when something changed, so a resting glow costs no repaints.
      const d = outline(current, nav.clientHeight / 2);
      if (d !== lastPath) {
        lastPath = d;
        paths.forEach((p) => p.setAttribute('d', d));
      }
      const opacity = current.o.toFixed(3);
      if (opacity !== lastOpacity) {
        lastOpacity = opacity;
        glow.style.opacity = opacity;
      }
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
      {/* The halo is its own element so its pulse runs on the GPU without repainting. */}
      <span ref={glowRef} aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-0">
        <svg className="nav-cell nav-cell-halo absolute inset-0 h-full w-full">
          <path />
        </svg>
        <svg className="nav-cell absolute inset-0 h-full w-full">
          <path className="nav-cell-body" />
        </svg>
      </span>
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
