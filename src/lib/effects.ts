/**
 * On/off switches for the decorative effects. Set any of these to false to remove
 * that effect everywhere; nothing else needs to change. Every effect is also skipped
 * automatically for visitors whose system asks for reduced motion.
 */
export const EFFECTS = {
  /** Light/dark switch spreads out as a circle from the theme button. */
  themeWipe: true,
  /** A beam of light travels around the Services package cards on hover. */
  borderBeam: true,
  /** Section headings shuffle through random characters before settling. */
  headingScramble: true,
  /** A thin glowing line under the header fills as you scroll the page. */
  scrollProgress: true,
  /** The hero buttons lean toward the cursor as it approaches. */
  magneticButtons: true,
  /** Slow-drifting colour glows behind the hero. */
  aurora: true,
  /** The hero title cycles through a few roles. */
  rotatingTitles: true,
  /** Certification cards flip to show their skills. */
  certFlip: true,
  /** Skill icons draw their outlines before filling in. */
  iconDraw: true,
  /** Small geometric dividers between sections. */
  sectionDividers: true,
  /** The portrait's wordmark glitches briefly every few seconds. */
  wordmarkGlitch: true,
} as const;

/** True when the visitor's system asks for less motion. Safe to call during render on the server. */
export const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
