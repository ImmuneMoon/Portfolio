'use client';

import { useEffect, useRef, type ReactNode } from "react";
import { EFFECTS, prefersReducedMotion } from "@/lib/effects";

/** How far around the element the pull starts, in px. */
const REACH = 70;
/** Furthest the element moves toward the cursor, in px. */
const MAX_PULL = 12;

/** Wraps a button so it leans toward the pointer as it approaches: a mouse as it moves,
    a finger while it's pressed nearby. It settles back when the finger lifts. */
export function Magnetic({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !EFFECTS.magneticButtons || prefersReducedMotion()) return;

    let frame = 0;
    let last: PointerEvent | null = null;
    const apply = () => {
      frame = 0;
      if (!last) return;
      const r = el.getBoundingClientRect();
      const dx = last.clientX - (r.left + r.width / 2);
      const dy = last.clientY - (r.top + r.height / 2);
      const reach = Math.max(r.width, r.height) / 2 + REACH;
      const distance = Math.hypot(dx, dy);
      if (distance > reach) {
        el.style.transform = "";
        return;
      }
      const pull = 1 - distance / reach;
      const clamp = (v: number) => Math.max(-MAX_PULL, Math.min(MAX_PULL, v));
      el.style.transform = `translate(${clamp(dx * 0.35 * pull)}px, ${clamp(dy * 0.35 * pull)}px)`;
    };
    const onMove = (e: PointerEvent) => {
      last = e;
      if (!frame) frame = requestAnimationFrame(apply);
    };
    const onRelease = (e: PointerEvent) => {
      if (e.pointerType === "mouse") return;
      last = null;
      el.style.transform = "";
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onMove, { passive: true });
    window.addEventListener("pointerup", onRelease);
    window.addEventListener("pointercancel", onRelease);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onMove);
      window.removeEventListener("pointerup", onRelease);
      window.removeEventListener("pointercancel", onRelease);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <span ref={ref} className="magnetic">
      {children}
    </span>
  );
}
