'use client';

import { useEffect, useRef } from "react";
import { PORTRAIT_BACKGROUND, PortraitSvg } from "@/components/portfolio/portrait-svg";
import { EFFECTS } from "@/lib/effects";

/** Largest tilt, in degrees, when the pointer is at the edge of the hero. */
const MAX_TILT = 12;
/** Furthest the pupils move toward the pointer, in SVG units (the portrait is 1024 wide). */
const MAX_LOOK = 6;

/**
 * The hero portrait: orbit rings (pure CSS, see globals.css), an idle float, a 3D tilt
 * toward the mouse while it is over the hero section, and pupils that follow it.
 */
export function HeroPortrait() {
  const tiltRef = useRef<HTMLDivElement>(null);

  // Pause the hero's looping animations (orbits, hair, glitch, aurora) while it's
  // scrolled out of view, so they cost nothing while reading the rest of the page.
  useEffect(() => {
    const hero = tiltRef.current?.closest('section');
    if (!hero) return;
    const observer = new IntersectionObserver(([entry]) => {
      hero.toggleAttribute('data-offscreen', !entry.isIntersecting);
    });
    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const tilt = tiltRef.current;
    const hero = tilt?.closest('section');
    if (!tilt || !hero) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let frame = 0;
    let last: PointerEvent | null = null;

    const apply = () => {
      frame = 0;
      if (!last) return;
      const rect = tilt.getBoundingClientRect();
      const heroRect = hero.getBoundingClientRect();
      // -1..1 across the hero, measured from the portrait's centre.
      const clamp = (v: number) => Math.max(-1, Math.min(1, v));
      const dx = clamp((last.clientX - (rect.left + rect.width / 2)) / (heroRect.width / 2));
      const dy = clamp((last.clientY - (rect.top + rect.height / 2)) / (heroRect.height / 2));
      tilt.style.setProperty('--tilt-y', `${(dx * MAX_TILT).toFixed(2)}deg`);
      tilt.style.setProperty('--tilt-x', `${(-dy * MAX_TILT).toFixed(2)}deg`);
      tilt.style.setProperty('--look-x', `${(dx * MAX_LOOK).toFixed(2)}px`);
      tilt.style.setProperty('--look-y', `${(dy * MAX_LOOK).toFixed(2)}px`);
    };

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return;
      last = e;
      if (!frame) frame = requestAnimationFrame(apply);
    };
    const reset = () => {
      last = null;
      for (const name of ['--tilt-x', '--tilt-y', '--look-x', '--look-y']) tilt.style.removeProperty(name);
    };

    hero.addEventListener('pointermove', onMove, { passive: true });
    hero.addEventListener('pointerleave', reset);
    return () => {
      hero.removeEventListener('pointermove', onMove);
      hero.removeEventListener('pointerleave', reset);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div className="hero-float relative grid size-80 place-items-center sm:size-96">
      <div aria-hidden="true" className="orbit orbit-track" />
      <div aria-hidden="true" className="orbit orbit-comet" />
      <div aria-hidden="true" className="orbit orbit-moons inset-8" />
      <div ref={tiltRef} className="hero-tilt">
        {/* The ring is a filled circle behind the portrait, not a CSS border: browsers build a
            round border from pieces that meet at the centre, and that join can flash as a
            thin line while the portrait tilts in 3D. */}
        <div className="h-64 w-64 rounded-full bg-primary p-1 shadow-[0_0_40px_hsl(var(--primary)/0.35)]">
          <div className="h-full w-full overflow-hidden rounded-full" style={{ backgroundColor: PORTRAIT_BACKGROUND }}>
            <PortraitSvg className={EFFECTS.wordmarkGlitch ? "portrait glitch h-full w-full" : "portrait h-full w-full"} />
          </div>
        </div>
      </div>
    </div>
  );
}
