'use client';

import { useEffect, useState, type HTMLAttributes } from "react";
import { EFFECTS, prefersReducedMotion } from "@/lib/effects";

/** The roles the hero title cycles through. The first is what search engines and screen readers get. */
export const ROLES = [
  "Creative Developer & Designer",
  "Web & App Developer",
  "Game Dev Enthusiast",
  "IT & Systems Tinkerer",
];
/** Time each role stays up, in ms. */
const INTERVAL = 3200;

/**
 * The hero heading: it flips through ROLES, while its accessible text stays the first
 * role. Every role sits in the same grid cell (the inactive ones invisible), so the
 * heading is always as tall as the longest role and the page never shifts.
 */
export function RotatingTitle(props: HTMLAttributes<HTMLHeadingElement>) {
  const [step, setStep] = useState(0);
  const index = step % ROLES.length;

  useEffect(() => {
    if (!EFFECTS.rotatingTitles || prefersReducedMotion()) return;
    const id = window.setInterval(() => setStep((n) => n + 1), INTERVAL);
    return () => window.clearInterval(id);
  }, []);

  return (
    <h1 {...props}>
      <span className="sr-only">{ROLES[0]}</span>
      <span aria-hidden="true" className="rotating-title">
        {ROLES.map((role, i) =>
          i === index ? (
            // The first role arrives with the hero entrance, so only later roles flip in.
            <span key={`active-${step}`} data-active="" className={step > 0 ? "rotating-title-word" : undefined}>
              {role}
            </span>
          ) : (
            <span key={role}>{role}</span>
          )
        )}
      </span>
    </h1>
  );
}
