'use client';

import { useEffect } from "react";

/**
 * Feeds the pointer position to whichever .spotlight card the pointer is over, as the
 * --spot-x / --spot-y / --spot-on custom properties the CSS glow reads. One listener
 * serves every card on the page, including cards revealed later by Show More.
 * A mouse is followed as it moves; a finger or pen is followed while it's pressed, and
 * the glow fades when it lifts.
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
      // A touch keeps reporting the element it started on, so look up what's under it now.
      const under = e.pointerType === 'mouse' ? e.target : document.elementFromPoint(e.clientX, e.clientY);
      const card = (under instanceof Element ? under.closest('.spotlight') : null) as HTMLElement | null;
      if (card !== active) clear();
      if (!card) return;
      const rect = card.getBoundingClientRect();
      card.style.setProperty('--spot-x', `${e.clientX - rect.left}px`);
      card.style.setProperty('--spot-y', `${e.clientY - rect.top}px`);
      card.style.setProperty('--spot-on', '1');
      active = card;
    };

    const onMove = (e: PointerEvent) => {
      last = e;
      if (!frame) frame = requestAnimationFrame(apply);
    };
    const onRelease = (e: PointerEvent) => {
      if (e.pointerType === 'mouse') return;
      last = null;
      clear();
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('pointerdown', onMove, { passive: true });
    window.addEventListener('pointerup', onRelease);
    window.addEventListener('pointercancel', onRelease);
    document.addEventListener('pointerleave', clear);
    window.addEventListener('blur', clear);
    return () => {
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerdown', onMove);
      window.removeEventListener('pointerup', onRelease);
      window.removeEventListener('pointercancel', onRelease);
      document.removeEventListener('pointerleave', clear);
      window.removeEventListener('blur', clear);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return null;
}
