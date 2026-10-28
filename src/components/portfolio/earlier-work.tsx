import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
import { GithubIcon } from "@/components/portfolio/brand-icons";

type EarlierProject = {
  name: string;
  description: string;
  tags: string[];
  codeUrl: string;
  pagesUrl?: string;
};

const earlierProjects: EarlierProject[] = [
  {
    name: 'Space Tourism Website',
    description: 'Multi-page React site for a conceptual space tourism company. A Frontend Mentor challenge.',
    tags: ['React', 'CSS'],
    codeUrl: 'https://github.com/ImmuneMoon/space-tourism-website',
    pagesUrl: 'https://immunemoon.github.io/space-tourism-website/',
  },
  {
    name: 'Intro Section with Dropdown Nav',
    description: 'Responsive landing page with a dynamic dropdown menu. A Frontend Mentor challenge.',
    tags: ['Tailwind CSS', 'jQuery'],
    codeUrl: 'https://github.com/ImmuneMoon/Intro-section-with-dropdown',
    pagesUrl: 'https://immunemoon.github.io/Intro-section-with-dropdown/',
  },
  {
    name: '10,000 Hour Calculator',
    description: 'Works out how long it takes to reach 10,000 hours of practice at your current pace.',
    tags: ['Bootstrap', 'jQuery'],
    codeUrl: 'https://github.com/ImmuneMoon/10-000-Hour-Calculator',
    pagesUrl: 'https://immunemoon.github.io/10-000-Hour-Calculator/',
  },
  {
    name: 'Order Summary Card',
    description: 'A card component with hover states, built mobile-first with Flexbox. A Frontend Mentor challenge.',
    tags: ['HTML', 'CSS'],
    codeUrl: 'https://github.com/ImmuneMoon/Order-summary-card',
    pagesUrl: 'https://immunemoon.github.io/Order-summary-card/',
  },
  {
    name: 'Huddle Landing Page',
    description: 'A single-page marketing layout in plain HTML and CSS. A Frontend Mentor challenge.',
    tags: ['HTML', 'CSS'],
    codeUrl: 'https://github.com/ImmuneMoon/Huddle-landing-page',
    pagesUrl: 'https://immunemoon.github.io/Huddle-landing-page/huddle-index.html',
  },
  {
    name: 'Legacy Portfolio',
    description: 'My first portfolio site, since replaced by this one.',
    tags: ['Tailwind CSS', 'SCSS', 'jQuery'],
    codeUrl: 'https://github.com/ImmuneMoon/Legacy-Portfolio',
  },
];

export function EarlierWork() {
  return (
    <div className="pt-8">
      <div className="flex items-center gap-4 w-full">
        <h3 className="font-headline text-xl font-bold text-primary/80 whitespace-nowrap">Earlier work</h3>
        <div className="h-px w-full bg-primary/10" />
      </div>
      <p className="mt-2 text-sm text-muted-foreground">
        Front-end exercises from 2021 to 2022, mostly Frontend Mentor challenges, a record of where things started.
      </p>
      <ul data-reveal-group="" className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {earlierProjects.map((project) => (
          <li
            key={project.name}
            data-reveal=""
            className="spotlight flex h-full flex-col rounded-lg border bg-card/50 p-4 shadow-xs backdrop-blur-xs transition-shadow hover:shadow-md"
          >
            <p className="font-headline text-base font-bold">{project.name}</p>
            <p className="mt-1 grow text-sm text-muted-foreground">{project.description}</p>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {project.tags.map((tag) => (
                <Badge key={tag} variant="outline" className="text-[10px] py-0 px-2">{tag}</Badge>
              ))}
            </div>
            <div className="mt-4 flex gap-2">
              <Button asChild variant="ghost" size="sm" className="h-8 px-2">
                <a href={project.codeUrl} target="_blank" rel="noopener noreferrer">
                  <GithubIcon className="mr-1.5 h-3.5 w-3.5" />
                  Code
                </a>
              </Button>
              {project.pagesUrl && (
                <Button asChild variant="ghost" size="sm" className="h-8 px-2">
                  <a href={project.pagesUrl} target="_blank" rel="noopener noreferrer">
                    <Eye className="mr-1.5 h-3.5 w-3.5" />
                    GitHub Pages
                  </a>
                </Button>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
