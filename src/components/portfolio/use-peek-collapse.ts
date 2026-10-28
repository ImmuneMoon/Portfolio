'use client';

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";

/** Must match the height transition duration on the clipping wrapper (duration-500). */
export const PEEK_TRANSITION_MS = 500;

// Runs before paint in the browser, so the collapsed height is set without a visible jump.
const useIsomorphicLayoutEffect = typeof window === 'undefined' ? useEffect : useLayoutEffect;

export type PeekMeasure<T> = {
  /** Collapsed height in pixels, or null when everything fits and nothing needs hiding. */
  peek: number | null;
  /** Anything else the section works out while measuring (for example, how many cards are fully shown). */
  data: T;
};

/**
 * A "show the first part, fade, Show More" collapse. The section supplies a `measure`
 * function that reads its own layout and returns the collapsed height; the hook keeps
 * that height current as the layout changes and animates between collapsed and open.
 *
 * Attach `clipRef` to the wrapper that clips (it needs `overflow-clip` and a height
 * transition), `contentRef` to the element inside it that holds the content, and
 * `triggerRef` to the Show More button.
 */
export function usePeekCollapse<T>(measure: (content: HTMLElement) => PeekMeasure<T>, initialData: T) {
  const [isOpen, setIsOpen] = useState(false);
  const [measured, setMeasured] = useState<PeekMeasure<T>>({ peek: null, data: initialData });
  const clipRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const isOpenRef = useRef(isOpen);
  isOpenRef.current = isOpen;
  const measureRef = useRef(measure);
  measureRef.current = measure;

  const remeasure = useCallback(() => {
    const content = contentRef.current;
    if (!content) return;
    const next = measureRef.current(content);
    setMeasured((prev) =>
      prev.peek === next.peek && JSON.stringify(prev.data) === JSON.stringify(next.data) ? prev : next
    );
  }, []);

  useIsomorphicLayoutEffect(() => {
    remeasure();
    const content = contentRef.current;
    if (!content) return;
    const observer = new ResizeObserver(remeasure);
    observer.observe(content);
    return () => observer.disconnect();
  }, [remeasure]);

  // Keep the collapsed height in step with layout changes (resizes, late-loading images).
  const peek = measured.peek;
  useIsomorphicLayoutEffect(() => {
    const clip = clipRef.current;
    if (clip && !isOpenRef.current && peek !== null) clip.style.height = `${peek}px`;
  }, [peek]);

  const toggle = useCallback(() => {
    const clip = clipRef.current;
    const opening = !isOpenRef.current;
    setIsOpen(opening);
    if (!clip || peek === null) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (opening) {
      // Animate from the peek to the full height, then hand back to auto so later
      // layout changes are not clipped.
      clip.style.height = `${clip.scrollHeight}px`;
      window.setTimeout(() => {
        if (isOpenRef.current) clip.style.height = 'auto';
      }, reduceMotion ? 0 : PEEK_TRANSITION_MS);
    } else {
      // Pin the current height first so the transition has a starting value.
      clip.style.height = `${clip.scrollHeight}px`;
      void clip.offsetHeight;
      clip.style.height = `${peek}px`;
      window.setTimeout(() => {
        triggerRef.current?.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'center' });
      }, reduceMotion ? 0 : PEEK_TRANSITION_MS / 2);
    }
  }, [peek]);

  return {
    isOpen,
    toggle,
    clipRef,
    contentRef,
    triggerRef,
    peek,
    data: measured.data,
    /** True once there is something hidden behind Show More. */
    hasMore: peek !== null,
  };
}
