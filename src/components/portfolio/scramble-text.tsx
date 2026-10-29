'use client';

import { useEffect, useRef, useState } from "react";
import { EFFECTS, prefersReducedMotion } from "@/lib/effects";

const UPPER = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const LOWER = "abcdefghijklmnopqrstuvwxyz";
/** How long the decode takes to settle, in ms. */
const DURATION = 1400;
/** How often the unsettled letters change, in ms. */
const TICK = 70;

/** A random letter in the same case as `ch`, so the shuffle stays close to the real width. */
function randomLike(ch: string) {
  const pool = ch === ch.toUpperCase() ? UPPER : LOWER;
  return pool[Math.floor(Math.random() * pool.length)];
}

/**
 * Heading text that decodes, left to right, the first time it scrolls into view: the
 * letters still to settle cycle slowly and show dimmed. The real text always holds its
 * place in the layout (it's only hidden while decoding), and the decode is drawn on a
 * clipped layer on top, so nothing around the heading ever moves.
 */
export function ScrambleText({ text }: { text: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [state, setState] = useState<{ settled: string; pending: string } | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !EFFECTS.headingScramble || prefersReducedMotion()) return;

    let frame = 0;
    let start = 0;
    let lastTick = 0;
    let pending = text.split("");
    const run = (now: number) => {
      if (!start) start = now;
      const progress = Math.min(1, (now - start) / DURATION);
      if (progress >= 1) {
        setState(null);
        return;
      }
      const settled = Math.floor(progress * text.length);
      if (now - lastTick >= TICK) {
        lastTick = now;
        // Change only some letters each tick, so the shuffle shimmers rather than flickers.
        pending = text.split("").map((ch, i) =>
          /[\s&]/.test(ch) ? ch : Math.random() < 0.5 ? randomLike(ch) : pending[i]
        );
        setState({ settled: text.slice(0, settled), pending: pending.slice(settled).join("") });
      }
      frame = requestAnimationFrame(run);
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
    <span ref={ref} className="scramble-text" data-scrambling={state ? "" : undefined}>
      <span className="scramble-text-real">{text}</span>
      {state && (
        <span aria-hidden="true" className="scramble-text-layer">
          {state.settled}
          <span className="scramble-text-pending">{state.pending}</span>
        </span>
      )}
    </span>
  );
}
