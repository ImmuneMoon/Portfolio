'use client';

import { useEffect } from "react";

/**
 * Marks the page with the input in use, as data-input="touch" on <html>, so hover styles
 * follow the input rather than the device: touchscreen laptops have both. A touch or pen
 * press switches to touch; moving a mouse switches back to normal hover.
 *
 * While a finger is on the screen, whatever is under it (and everything containing that)
 * gets data-touched, and the hover styles key off that. Touch-move events keep arriving
 * while the page scrolls, unlike a press, which the browser cancels as soon as the finger
 * starts moving, so the highlight follows the finger as it slides and clears when it lifts.
 */
export function InputMode() {
  useEffect(() => {
    const root = document.documentElement;
    // Start in touch mode on devices with no mouse or trackpad at all.
    if (window.matchMedia('(any-hover: none)').matches) root.dataset.input = 'touch';

    let touched: Element[] = [];
    let frame = 0;
    let point: { x: number; y: number } | null = null;

    const mark = () => {
      frame = 0;
      const under = point ? document.elementFromPoint(point.x, point.y) : null;
      const chain: Element[] = [];
      for (let el = under; el && el !== root; el = el.parentElement) chain.push(el);
      for (const el of touched) if (!chain.includes(el)) el.removeAttribute('data-touched');
      for (const el of chain) el.setAttribute('data-touched', '');
      touched = chain;
    };
    const onTouch = (e: TouchEvent) => {
      const t = e.touches[0];
      if (!t) return;
      root.dataset.input = 'touch';
      point = { x: t.clientX, y: t.clientY };
      if (!frame) frame = requestAnimationFrame(mark);
    };
    const onTouchEnd = (e: TouchEvent) => {
      if (e.touches.length) return;
      point = null;
      if (!frame) frame = requestAnimationFrame(mark);
    };

    const onDown = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') root.dataset.input = 'touch';
    };
    const onMove = (e: PointerEvent) => {
      if (e.pointerType === 'mouse' && root.dataset.input) delete root.dataset.input;
    };

    window.addEventListener('pointerdown', onDown, { capture: true, passive: true });
    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('touchstart', onTouch, { passive: true });
    window.addEventListener('touchmove', onTouch, { passive: true });
    window.addEventListener('touchend', onTouchEnd);
    window.addEventListener('touchcancel', onTouchEnd);
    return () => {
      window.removeEventListener('pointerdown', onDown, { capture: true });
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('touchstart', onTouch);
      window.removeEventListener('touchmove', onTouch);
      window.removeEventListener('touchend', onTouchEnd);
      window.removeEventListener('touchcancel', onTouchEnd);
      if (frame) cancelAnimationFrame(frame);
      for (const el of touched) el.removeAttribute('data-touched');
    };
  }, []);

  return null;
}
