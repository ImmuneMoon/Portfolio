'use client';

import { useEffect } from "react";

/**
 * Marks the page with the input in use, as data-input="touch" on <html>, so hover styles
 * follow the input rather than the device: touchscreen laptops have both. A touch or pen
 * press switches to touch, where hover styles show only while pressing; moving a mouse
 * switches back to normal hover.
 */
export function InputMode() {
  useEffect(() => {
    const root = document.documentElement;
    // Start in touch mode on devices with no mouse or trackpad at all.
    if (window.matchMedia('(any-hover: none)').matches) root.dataset.input = 'touch';

    const onDown = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') root.dataset.input = 'touch';
    };
    const onMove = (e: PointerEvent) => {
      if (e.pointerType === 'mouse' && root.dataset.input) delete root.dataset.input;
    };
    // Safari only applies :active on touch when the page listens for touches.
    const noop = () => {};

    window.addEventListener('pointerdown', onDown, { capture: true, passive: true });
    window.addEventListener('pointermove', onMove, { passive: true });
    document.addEventListener('touchstart', noop, { passive: true });
    return () => {
      window.removeEventListener('pointerdown', onDown, { capture: true });
      window.removeEventListener('pointermove', onMove);
      document.removeEventListener('touchstart', noop);
    };
  }, []);

  return null;
}
