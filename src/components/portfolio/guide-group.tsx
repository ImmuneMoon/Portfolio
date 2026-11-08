'use client';

import { useId, useRef, useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GuideRow } from "@/components/portfolio/guide-row";
import type { Project } from "@/components/portfolio/project-card";

/** How many guides a group shows before its own Show more button. */
const VISIBLE = 3;
/** Matches the open and close transition below, in ms. */
const TRANSITION_MS = 500;

/**
 * One group of guides as a detailed list. The first few always show; the rest slide open
 * under the group's own toggle and stay out of the tab order while closed.
 *
 * `rowInert` lets the section's own Show More keep guides it has clipped out of reach too.
 */
export function GuideGroup({ guides, rowInert }: { guides: Project[]; rowInert: (index: number) => boolean }) {
  const [open, setOpen] = useState(false);
  // Clip only while closed or animating, so open rows keep their hover shadows.
  const [settledOpen, setSettledOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const id = useId();
  const shown = guides.slice(0, VISIBLE);
  const rest = guides.slice(VISIBLE);

  const toggle = () => {
    const opening = !open;
    setOpen(opening);
    setSettledOpen(false);
    if (!opening) {
      // After closing, bring the toggle back into view if the list scrolled past it.
      const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      window.setTimeout(() => {
        const button = buttonRef.current;
        if (button && button.getBoundingClientRect().top < 0) {
          button.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'center' });
        }
      }, reduceMotion ? 0 : TRANSITION_MS);
    }
  };

  return (
    <div>
      <div data-reveal-group="" className="space-y-4">
        {shown.map((guide, i) => (
          <div key={guide.name} data-guide="" inert={rowInert(i)}>
            <GuideRow guide={guide} />
          </div>
        ))}
      </div>

      {rest.length > 0 && (
        <>
          <div
            id={id}
            inert={!open}
            className="grid transition-[grid-template-rows] duration-500 ease-in-out motion-reduce:transition-none"
            style={{ gridTemplateRows: open ? '1fr' : '0fr' }}
            onTransitionEnd={(e) => {
              if (e.target === e.currentTarget) setSettledOpen(open);
            }}
          >
            <div className={open && settledOpen ? "min-h-0" : "min-h-0 overflow-hidden"}>
              <div className="space-y-4 pt-4">
                {rest.map((guide, i) => (
                  <div key={guide.name} data-guide="" inert={rowInert(VISIBLE + i)}>
                    <GuideRow guide={guide} />
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-4 flex justify-center">
            <Button
              ref={buttonRef}
              variant="secondary"
              size="sm"
              aria-expanded={open}
              aria-controls={id}
              onMouseDown={(e) => e.preventDefault()}
              onClick={toggle}
            >
              {open ? <ChevronUp className="mr-2 h-4 w-4" /> : <ChevronDown className="mr-2 h-4 w-4" />}
              {open ? "Show less" : `Show ${rest.length} more`}
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
