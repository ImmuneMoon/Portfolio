'use client';

import { useEffect, useRef, useState } from "react";
import { EFFECTS, prefersReducedMotion } from "@/lib/effects";

const UPPER = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const LOWER = "abcdefghijklmnopqrstuvwxyz";
/** How long the decode takes to settle, in ms. */
const DURATION = 1400;
/** How often the unsettled letters change, in ms. */
const TICK = 70;

/** Where one real letter sits, relative to the heading text's box. */
type Slot = { ch: string; x: number; y: number; w: number; h: number };
/** What's on show: how many letters have settled, and the letter in each position. */
type Decode = { settled: number; letters: string[] };

/** A random letter in the same case as `ch`, so the shuffle stays close to the real shape. */
function randomLike(ch: string) {
  const pool = ch === ch.toUpperCase() ? UPPER : LOWER;
  return pool[Math.floor(Math.random() * pool.length)];
}

const isFixed = (ch: string) => /[\s&]/.test(ch);

/**
 * Heading text that decodes, left to right, as it scrolls into view: the letters still
 * to settle cycle slowly and show dimmed. It starts out scrambled while off screen, so
 * the real word never shows first and then breaks up.
 *
 * The real text always holds its place in the layout (it's only hidden while decoding).
 * Each decoding letter is pinned to where its real letter sits, so a wider random letter
 * can't push its neighbours around or wrap a word onto another line, and the settled
 * letters line up exactly with the real text when the decode ends.
 */
export function ScrambleText({ text }: { text: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const realRef = useRef<HTMLSpanElement>(null);
  const [slots, setSlots] = useState<Slot[] | null>(null);
  const [decode, setDecode] = useState<Decode | null>(null);

  useEffect(() => {
    const el = ref.current;
    const real = realRef.current?.firstChild;
    if (!el || !(real instanceof Text) || !EFFECTS.headingScramble || prefersReducedMotion()) return;

    const measure = () => {
      const box = el.getBoundingClientRect();
      const range = document.createRange();
      setSlots(
        text.split("").map((ch, i) => {
          range.setStart(real, i);
          range.setEnd(real, i + 1);
          const r = range.getBoundingClientRect();
          return { ch, x: r.left - box.left, y: r.top - box.top, w: r.width, h: r.height };
        })
      );
    };

    let frame = 0;
    let start = 0;
    let lastTick = 0;
    let letters = text.split("").map((ch) => (isFixed(ch) ? ch : randomLike(ch)));

    // The heading can reflow while it waits off screen, so keep the slots current.
    const resize = new ResizeObserver(measure);
    resize.observe(el);
    document.fonts?.ready.then(measure);
    measure();
    setDecode({ settled: 0, letters });

    const run = (now: number) => {
      if (!start) start = now;
      const progress = Math.min(1, (now - start) / DURATION);
      if (progress >= 1) {
        resize.disconnect();
        setDecode(null);
        return;
      }
      if (now - lastTick >= TICK) {
        lastTick = now;
        // Change only some letters each tick, so the shuffle shimmers rather than flickers.
        letters = text.split("").map((ch, i) =>
          isFixed(ch) ? ch : Math.random() < 0.5 ? randomLike(ch) : letters[i]
        );
        setDecode({ settled: Math.floor(progress * text.length), letters });
      }
      frame = requestAnimationFrame(run);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((e) => e.isIntersecting)) return;
        observer.disconnect();
        frame = requestAnimationFrame(run);
      },
      // Start once the heading is a little way up from the bottom of the screen.
      { rootMargin: "0px 0px -15% 0px" }
    );
    observer.observe(el);
    return () => {
      observer.disconnect();
      resize.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [text]);

  const showLayer = decode !== null && slots !== null;

  return (
    <span ref={ref} className="scramble-text" data-scrambling={showLayer ? "" : undefined}>
      <span ref={realRef} className="scramble-text-real">{text}</span>
      {showLayer && (
        <span aria-hidden="true" className="scramble-text-layer">
          {slots.map((slot, i) =>
            slot.ch.trim() === "" ? null : (
              <span
                key={i}
                className="scramble-letter"
                data-pending={i >= decode.settled && !isFixed(slot.ch) ? "" : undefined}
                style={{ left: slot.x, top: slot.y, width: slot.w, height: slot.h, lineHeight: `${slot.h}px` }}
              >
                {i < decode.settled ? slot.ch : decode.letters[i]}
              </span>
            )
          )}
        </span>
      )}
    </span>
  );
}
