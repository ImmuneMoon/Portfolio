import { EFFECTS } from "@/lib/effects";

/**
 * A small geometric divider between sections, drawn CSSBattle-style from one element
 * and its pseudo-elements: a fading line, a spinning diamond and two dots.
 */
export function SectionDivider() {
  if (!EFFECTS.sectionDividers) return null;
  return <div aria-hidden="true" className="fx-divider" />;
}
