'use client';

import { useRef, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { TagBadge } from "@/components/portfolio/tag-badge";
import { ScrambleText } from "@/components/portfolio/scramble-text";
import { EFFECTS } from "@/lib/effects";
import { Award, Calendar, ExternalLink, RotateCcw, RotateCw } from "lucide-react";

type Certification = {
  title: string;
  issuer: string;
  date: string;
  url: string;
  skills: string[];
};

const certifications: Certification[] = [
  {
    title: "Google IT Support Professional Certification",
    issuer: "Google/ Coursera",
    date: "Nov 2025",
    url: "https://www.coursera.org/professional-certificates/google-it-support",
    skills: ["Network Administration", "Network Security", "Windows", "Mobile Devices", "Mobile Applications", "System Administration", "IT Infrastructure Management", "Linux"]
  },
  {
    title: "JavaScript Algorithms and Data Structures",
    issuer: "freeCodeCamp",
    date: "Apr 2023",
    url: "https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/",
    skills: ["Data Structures", "Algorithms", "JavaScript", "Front-End Development"]
  },
  {
    title: "CS50x: Introduction to Computer Science",
    issuer: "HarvardX",
    date: "Sep 2022",
    url: "https://cs50.harvard.edu/x/",
    skills: ["Data Structures", "Algorithms", "C", "CSS", "Git", "HTML/CSS", "JavaScript", "Python", "Web Design", "Web Development", "Responsive Web Design", "Mobile Web Design", "Flask", "Bootstrap", "SQLite"]
  },
  {
    title: "Responsive Web Design",
    issuer: "freeCodeCamp",
    date: "Aug 2021",
    url: "https://www.freecodecamp.org/learn/responsive-web-design/",
    skills: ["Web Design", "Front-End Development", "CSS", "HTML"]
  }
];

const CARD_CLASSES = "cert-card spotlight flex flex-col border-none shadow-xs hover:shadow-md transition-shadow bg-card/50";

/** Icon, title and issuer. The title link's ::after covers the whole card, so clicking
    anywhere on it opens the course; badges and buttons sit above it. */
function CertHeader({ cert }: { cert: Certification }) {
  return (
    <CardHeader className="flex flex-row items-start gap-4 space-y-0">
      <div className="rounded-xl bg-primary/10 p-3 text-primary ring-1 ring-primary/20">
        <Award className="h-6 w-6" />
      </div>
      <div className="flex-1">
        <CardTitle className="font-headline text-xl leading-tight">
          <a
            href={cert.url}
            target="_blank"
            rel="noopener noreferrer"
            className="cert-link after:absolute after:inset-0 after:content-['']"
          >
            {cert.title}
            <ExternalLink className="cert-link-icon ml-1.5 inline h-4 w-4 align-[-2px]" aria-hidden="true" />
            <span className="sr-only"> course page (opens in a new tab)</span>
          </a>
        </CardTitle>
        <CardDescription className="flex flex-wrap items-center gap-x-2 gap-y-1 mt-2 text-sm">
          <span className="font-semibold text-primary">{cert.issuer}</span>
          <span className="hidden sm:inline text-muted-foreground">•</span>
          <span className="flex items-center gap-1.5 text-muted-foreground bg-muted/50 px-2 py-0.5 rounded-full text-xs">
            <Calendar className="h-3 w-3" />
            {cert.date}
          </span>
        </CardDescription>
      </div>
    </CardHeader>
  );
}

function SkillBadges({ skills }: { skills: string[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {skills.map((skill) => (
        <TagBadge key={skill} tag={skill} />
      ))}
    </div>
  );
}

const FLIP_BUTTON =
  "flip-toggle inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-sm font-medium text-primary transition-colors hover:bg-primary/20 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring";

/** A certification card that flips over to show the skills it covered. The hidden face
    is inert, so keyboard and screen reader users only ever meet the side that shows. */
function FlipCertCard({ cert }: { cert: Certification }) {
  const [flipped, setFlipped] = useState(false);
  const frontButton = useRef<HTMLButtonElement>(null);
  const backButton = useRef<HTMLButtonElement>(null);

  const flip = (next: boolean) => {
    setFlipped(next);
    // Keep focus on the matching button once the other face stops being inert.
    requestAnimationFrame(() => (next ? backButton : frontButton).current?.focus());
  };

  return (
    <div data-reveal="" className="flip-card h-full" data-flipped={flipped ? "" : undefined}>
      <div className="flip-inner">
        <Card className={`flip-face ${CARD_CLASSES}`} inert={flipped}>
          <CertHeader cert={cert} />
          <CardFooter className="mt-auto">
            <button ref={frontButton} type="button" className={FLIP_BUTTON} onClick={() => flip(true)}>
              <RotateCw className="h-3.5 w-3.5" aria-hidden="true" />
              {cert.skills.length} skills covered
            </button>
          </CardFooter>
        </Card>
        <Card className={`flip-face flip-back ${CARD_CLASSES}`} inert={!flipped}>
          <CardHeader className="pb-3">
            <CardTitle className="font-headline text-base leading-tight">
              <a
                href={cert.url}
                target="_blank"
                rel="noopener noreferrer"
                className="cert-link after:absolute after:inset-0 after:content-['']"
              >
                {cert.title}
                <ExternalLink className="cert-link-icon ml-1.5 inline h-3.5 w-3.5 align-[-2px]" aria-hidden="true" />
                <span className="sr-only"> course page (opens in a new tab)</span>
              </a>
            </CardTitle>
          </CardHeader>
          <CardContent className="grow pt-0">
            <SkillBadges skills={cert.skills} />
          </CardContent>
          <CardFooter>
            <button ref={backButton} type="button" className={FLIP_BUTTON} onClick={() => flip(false)}>
              <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
              Back
            </button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}

/** The plain card, used when the flip effect is switched off. */
function CertCard({ cert }: { cert: Certification }) {
  return (
    <Card data-reveal="" className={`h-full ${CARD_CLASSES}`}>
      <CertHeader cert={cert} />
      <CardContent className="grow pt-2">
        <SkillBadges skills={cert.skills} />
      </CardContent>
    </Card>
  );
}

export function CertificationsSection() {
  return (
    <section id="certifications" className="w-full py-12 md:py-24 lg:py-32 bg-secondary/30 relative overflow-hidden">
      {/* Optional subtle gradient to match the skills section feel */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-linear-to-b from-background to-transparent pointer-events-none" />

      <div className="container relative mx-auto max-w-7xl px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div data-reveal="" className="space-y-2">
            <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-5xl text-primary"><ScrambleText text="My Certifications" /></h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              A collection of professional certifications I've worked to achieve.
            </p>
          </div>
        </div>

        <div data-reveal-group="" className="grid gap-8 mt-12 sm:grid-cols-1 md:grid-cols-2">
          {certifications.map((cert) =>
            EFFECTS.certFlip ? <FlipCertCard key={cert.title} cert={cert} /> : <CertCard key={cert.title} cert={cert} />
          )}
        </div>
      </div>
    </section>
  );
}
