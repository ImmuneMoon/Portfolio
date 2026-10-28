'use client';

import type { RefObject } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";

/** The Show More / Show Less button used under collapsed sections. */
export function ShowMoreButton({
  isOpen,
  onToggle,
  controls,
  buttonRef,
}: {
  isOpen: boolean;
  onToggle: () => void;
  /** Id of the element this button expands, for screen readers. */
  controls: string;
  buttonRef: RefObject<HTMLButtonElement | null>;
}) {
  return (
    <div className="flex justify-center mt-12 relative z-20">
      <Button
        ref={buttonRef}
        onMouseDown={(e) => e.preventDefault()}
        onClick={(e) => {
          e.currentTarget.blur();
          onToggle();
        }}
        aria-expanded={isOpen}
        aria-controls={controls}
        variant="default"
        size="lg"
        className="bg-primary hover:bg-secondary text-primary-foreground hover:text-secondary-foreground font-medium transition-all shadow-md"
      >
        {isOpen ? (
          <>
            <ChevronUp className="mr-2 h-4 w-4" />
            Show Less
          </>
        ) : (
          <>
            <ChevronDown className="mr-2 h-4 w-4" />
            Show More
          </>
        )}
      </Button>
    </div>
  );
}
