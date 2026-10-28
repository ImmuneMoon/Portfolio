'use client';

import { useEffect } from "react";

/**
 * Feeds the pointer position to whichever .spotlight card the mouse is over, as the
 * --spot-x / --spot-y / --spot-on custom properties the CSS glow reads. One listener
 * serves every card on the page, including cards revealed later by Show More.
 * Touch and pen input are ignored, since there is no hover to follow.
 */
export function SpotlightTracker() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let active: HTMLElement | null = null;
    let frame = 0;
    let last: PointerEvent | null = null;

    const clear = () => {
      if (active) active.style.setProperty('--spot-on', '0');
      active = null;
    };

    const apply = () => {
      frame = 0;
      const e = last;
      if (!e) return;
      const card = (e.target instanceof Element ? e.target.closest('.spotlight') : null) as HTMLElement | null;
      if (card !== active) clear();
      if (!card) return;
      const rect = card.getBoundingClientRect();
      card.style.setProperty('--spot-x', `${e.clientX - rect.left}px`);
      card.style.setProperty('--spot-y', `${e.clientY - rect.top}px`);
      card.style.setProperty('--spot-on', '1');
      active = card;
    };

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return;
      last = e;
      if (!frame) frame = requestAnimationFrame(apply);
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    document.addEventListener('pointerleave', clear);
    window.addEventListener('blur', clear);
    return () => {
      window.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerleave', clear);
      window.removeEventListener('blur', clear);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return null;
}
