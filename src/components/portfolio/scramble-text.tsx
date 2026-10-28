'use client';

import { useEffect, useRef, useState } from "react";
import { EFFECTS, prefersReducedMotion } from "@/lib/effects";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789#%&*+<>/";
/** How long the shuffle takes to settle, in ms. */
const DURATION = 900;

/**
 * Heading text that shuffles through random characters and settles, left to right,
 * the first time it scrolls into view. Screen readers always get the real text, and
 * the box keeps its size during the shuffle so nothing around it moves.
 */
export function ScrambleText({ text }: { text: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(text);

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
      setDisplay(out);
      if (progress < 1) {
        frame = requestAnimationFrame(run);
      } else {
        setDisplay(text);
        el.style.width = "";
        el.style.height = "";
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((e) => e.isIntersecting)) return;
        observer.disconnect();
        const rect = el.getBoundingClientRect();
        el.style.width = `${rect.width}px`;
        el.style.height = `${rect.height}px`;
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
    <>
      <span className="sr-only">{text}</span>
      <span ref={ref} aria-hidden="true" className="scramble-text">
        {display}
      </span>
    </>
  );
}
