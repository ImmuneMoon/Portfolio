'use client';

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export type NavItem = {
  label: string;
  href: string;
  /** Id of the home-page section this link scrolls to. Items without one are separate pages. */
  section?: string;
};

export const NAV_ITEMS: NavItem[] = [
  { label: 'About', href: '/#about', section: 'about' },
  { label: 'Skills', href: '/#skills', section: 'skills' },
  { label: 'Projects', href: '/#projects', section: 'projects' },
  { label: 'Guides', href: '/#guides', section: 'guides' },
  { label: 'Certifications', href: '/#certifications', section: 'certifications' },
  { label: 'Services', href: '/#services', section: 'services' },
  { label: 'Contact', href: '/#contact', section: 'contact' },
];

/** Section links in nav order, with their index in NAV_ITEMS. */
export const SECTION_ITEMS = NAV_ITEMS.map((item, index) => ({ item, index })).filter((s) => s.item.section);

/** Extra pixels below the sticky header where the "you are here" line sits. */
const LINE_OFFSET = 8;
/** How far through a section the highlight starts heading for the next link (0 = immediately). */
export const GLIDE_START = 0.35;

export const smoothstep = (edge0: number, edge1: number, x: number) => {
  const t = Math.min(1, Math.max(0, (x - edge0) / (edge1 - edge0)));
  return t * t * (3 - 2 * t);
};

export type SectionProgress = {
  /** Position in SECTION_ITEMS of the section the reading line is in. */
  current: number;
  /** Position in SECTION_ITEMS of the section after it (same as current for the last one). */
  next: number;
  /** 0 while settled on `current`, rising smoothly to 1 on arrival at `next`. */
  glide: number;
};

/**
 * Where the reader is on the home page. The reading line sits just below the sticky header,
 * where a clicked section lands. In the last half-screen of scrolling it is pushed toward the
 * bottom edge, so short final sections still become current.
 */
export function readSectionProgress(): SectionProgress {
  const tops = SECTION_ITEMS.map((s) => {
    const el = document.getElementById(s.item.section!);
    return el ? el.getBoundingClientRect().top + window.scrollY : Number.NaN;
  });

  const header = document.querySelector('header');
  const lineTop = (header ? header.getBoundingClientRect().bottom : 0) + LINE_OFFSET;
  const maxScroll = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
  const tail = window.innerHeight * 0.5;
  const intoTail = Math.min(tail, Math.max(0, window.scrollY - (maxScroll - tail)));
  const readingLine = window.scrollY + lineTop + (intoTail / tail) * (window.innerHeight - lineTop);

  let current = 0;
  tops.forEach((top, j) => {
    if (!Number.isNaN(top) && readingLine >= top - 1) current = j;
  });
  const next = Math.min(current + 1, tops.length - 1);
  let glide = 0;
  if (next !== current && !Number.isNaN(tops[next])) {
    const span = tops[next] - tops[current];
    glide = span > 0 ? smoothstep(GLIDE_START, 1, (readingLine - tops[current]) / span) : 0;
  }
  return { current, next, glide };
}

/** The href of the nav item for where the reader is: a section on the home page, or the page itself. */
export function activeHrefFor(pathname: string, progress?: SectionProgress): string | null {
  if (pathname !== '/') {
    const page = NAV_ITEMS.find((it) => !it.section && pathname.startsWith(it.href));
    return page ? page.href : null;
  }
  if (!progress) return null;
  return SECTION_ITEMS[progress.glide > 0.5 ? progress.next : progress.current].item.href;
}

/** Tracks the active nav href as the reader scrolls. Used where no continuous motion is needed. */
export function useActiveHref(): string | null {
  const pathname = usePathname();
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      setActive(activeHrefFor(pathname, pathname === '/' ? readSectionProgress() : undefined));
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    const resizeObserver = new ResizeObserver(schedule);
    resizeObserver.observe(document.body);
    return () => {
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      resizeObserver.disconnect();
      if (frame) cancelAnimationFrame(frame);
    };
  }, [pathname]);

  return active;
}
