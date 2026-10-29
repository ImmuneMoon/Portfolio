'use client';

import { useEffect, useRef, useState } from "react";
import { EFFECTS, prefersReducedMotion } from "@/lib/effects";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789#%&*+<>/";
/** How long the shuffle takes to settle, in ms. */
const DURATION = 900;

/**
 * Heading text that shuffles through random characters and settles, left to right,
 * the first time it scrolls into view. The real text always holds its place in the
 * layout (it's only hidden while shuffling), and the shuffle is drawn on a clipped
 * layer on top, so nothing around the heading ever moves.
 */
export function ScrambleText({ text }: { text: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState<string | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !EFFECTS.headingScramble || prefersReducedMotion()) return;

    let frame = 0;
    let start = 0;
    const run = (now: number) => {
      if (!start) start = now;
      const progress = Math.min(1, (now - start) / DURATION);
      const settled = Math.floor(progress * text.length);
      let out = "";
      for (let i = 0; i < text.length; i++) {
        const ch = text[i];
        out += i < settled || /[\s&]/.test(ch) ? ch : CHARS[Math.floor(Math.random() * CHARS.length)];
      }
      if (progress < 1) {
        setDisplay(out);
        frame = requestAnimationFrame(run);
      } else {
        setDisplay(null);
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((e) => e.isIntersecting)) return;
        observer.disconnect();
        frame = requestAnimationFrame(run);
      },
      { threshold: 0.6 }
    );
    observer.observe(el);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [text]);

  return (
    <span ref={ref} className="scramble-text" data-scrambling={display !== null ? "" : undefined}>
      <span className="scramble-text-real">{text}</span>
      {display !== null && (
        <span aria-hidden="true" className="scramble-text-layer">
          {display}
        </span>
      )}
    </span>
  );
}
