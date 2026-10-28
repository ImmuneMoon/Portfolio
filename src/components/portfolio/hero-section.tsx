import { Button } from "@/components/ui/button";
import type { CSSProperties } from "react";
import { HeroPortrait } from "@/components/portfolio/hero-portrait";
import { Magnetic } from "@/components/portfolio/magnetic";
import { RotatingTitle } from "@/components/portfolio/rotating-title";
import { EFFECTS } from "@/lib/effects";

const step = (n: number) => ({ "--intro-step": n }) as CSSProperties;

export function HeroSection() {
  return (
    <section id="about" className="relative isolate w-full overflow-x-clip py-12 md:py-24 lg:py-32">
      {EFFECTS.aurora && (
        <div aria-hidden="true" className="hero-aurora">
          <span />
          <span />
          <span />
        </div>
      )}
      <div className="container mx-auto max-w-7xl px-4 md:px-6">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="flex flex-col items-start justify-center space-y-4">
            <div className="space-y-2">
              <RotatingTitle data-intro="" style={step(0)} className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none" />
              <p data-intro="" style={step(1)} className="max-w-[600px] text-muted-foreground md:text-xl">
                I'm Fulllion, a web tinkerer, software fiddler, and game dev enthusiast. I thrive at the intersection of design and technology, transforming complex problems into elegant solutions with a systems-curious mindset.
              </p>
            </div>
            <div data-intro="" style={step(2)} className="flex flex-col gap-2 min-[400px]:flex-row">
              <Magnetic>
                <Button asChild size="lg">
                  <a href="#projects">View My Work</a>
                </Button>
              </Magnetic>
              <Magnetic>
                <Button asChild variant="secondary" size="lg">
                  <a href="#contact">Contact Me</a>
                </Button>
              </Magnetic>
            </div>
          </div>
          <div data-intro="" style={step(3)} className="flex items-center justify-center">
            <HeroPortrait />
          </div>
        </div>
      </div>
    </section>
  );
}
