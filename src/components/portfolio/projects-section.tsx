'use client';

import { useState, useRef } from "react";
import { ProjectCard, type Project, type ProjectLink } from "@/components/portfolio/project-card";
import { Chrome, ChevronDown, ChevronUp, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";

const FirefoxIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    className={cn("h-4 w-4", className)}
  >
    <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
      <path d="M4.028 7.82a9 9 0 1 0 12.823-3.4C15.215 3.4 13.787 3.4 12 3.4h-1.647" />
      <path d="M4.914 9.485c-1.756-1.569-.805-5.38.109-6.17c.086.896.585 1.208 1.111 1.685c.88-.275 1.313-.282 1.867 0c.82-.91 1.694-2.354 2.628-2.093C9.547 4.648 10.559 6.64 12 7.08c-.17.975-1.484 1.913-2.76 2.686c-1.296.938-.722 1.85 0 2.234c.949.506 3.611-1 4.545.354c-1.698.102-1.536 3.107-3.983 2.727c2.523.957 4.345.462 5.458-.34c1.965-1.52 2.879-3.542 2.879-5.557c-.014-1.398.194-2.695-1.26-4.75" />
    </g>
  </svg>
);

const EyeIcon = ({ className }: { className?: string }) => (
  <Eye className={cn("h-4 w-4", className)} />
);

const initialProjects: Project[] = [
  {
    name: 'CLI Cheat Sheet',
    description: 'A cross-platform command reference showing Windows CMD, PowerShell, and Bash (Linux and macOS) side by side, plus Git workflows and developer setup guides. Every row shows the same task in all three shells with flags explained and gotchas called out. Published as a searchable single-file HTML page with dark mode and click-to-copy commands, and auto-built into Markdown, PDF, and Word via GitHub Actions.',
    image: '/images/cli-cheat-sheet.png',
    tags: ['CLI', 'PowerShell', 'Bash', 'CMD', 'Git', 'Node.js', 'GitHub Actions', 'Documentation'],
    codeUrl: 'https://github.com/ImmuneMoon/CLI-Cheat-Sheet',
    demoUrl: 'https://immunemoon.github.io/CLI-Cheat-Sheet/',
    demoButtonText: 'Live Site'
  },
  {
    name: 'Waypoint',
    description: 'A portable desktop companion for tabletop RPG campaigns. Features linked data maps, hex-grid play maps with tokens and scene art, planners, and peer-to-peer multiplayer so a GM can host and players join with a room code. Integrates with ShadowBase character sheets. Built on Electron.',
    image: '/images/waypoint.png',
    tags: ['Electron', 'JavaScript', 'WebRTC', 'P2P', 'Desktop App', 'Inno'],
    codeUrl: 'https://github.com/ImmuneMoon/Waypoint',
    demoUrl: 'https://github.com/ImmuneMoon/Waypoint/releases',
    demoButtonText: 'Download'
  },
  {
    name: 'Super Power Options',
    description: "A user-friendly Windows application for scheduling power actions like timed shutdowns or sleep mode. It provides a convenient GUI, eliminating the need for command-line scripts.",
    image: '/images/super-power-options.png',
    tags: ['Python', 'Custom-Tkinter', 'GUI', 'Windows Scripting', 'CLI'],
    codeUrl: 'https://github.com/ImmuneMoon/Super-Power-Options/releases',
    codeButtonText: 'Github Release',
  },
  {
    name: 'ShadowBase Campaign Manager',
    description: 'A comprehensive online campaign management tool for a "Star Wars" GURPS campaign. It provides tools for character creation that works in conjunction with the FoundryVTT system, resource management, campaign documentation, and is installable as a PWA. Built with Next.js, Firebase, and Genkit.',
    image: '/images/shadowbase.png',
    tags: ['Next.js', 'React', 'Firebase', 'Genkit', 'Tailwind CSS', 'PWA', 'AdSense', 'FoundryVTT'],
    demoUrl: 'https://shadow-base.com/',
    demoButtonText: 'Live Site'
  },
  {
    name: 'Pocket Tabs',
    description: 'A web application designed to help you effortlessly save, organize, and manage your browser tabs. Built with a modern tech stack including Next.js, React, and Firebase, it offers a seamless experience for saving links from your browser or sharing them directly from other apps on your mobile device. Key features include AI-powered tag suggestions, PWA support, and mobile "Share Target" functionality.',
    image: '/images/PocketTabs.png',
    tags: ['Next.js', 'React', 'Firebase', 'TypeScript', 'PWA'],
    links: [
      {
        url: 'https://pocket-tabs.com/',
        label: 'Live Site',
        icon: <EyeIcon className="mr-2" />,
        variant: 'secondary'
      },
      {
        url: 'https://chromewebstore.google.com/detail/pocket-tabs/kkjcdigdligbafneihdpciefhnoflnbc',
        label: 'Chrome Web Store',
        icon: <Chrome className="mr-2 h-4 w-4" />,
        variant: 'default'
      },
      {
        url: 'https://addons.mozilla.org/en-US/firefox/addon/pocket-tabs-browser-extension/',
        label: 'Firefox Add-ons',
        icon: <FirefoxIcon className="mr-2 h-4 w-4" />,
        variant: 'accent'
      }
    ] satisfies ProjectLink[]
  },
  {
    name: 'Windows Context Menu Restore',
    description: 'Bypass the clunky Windows 11 "Show more options" menu! This utility instantly restores the classic, full-featured Windows 10-style right-click context menu across your entire system.',
    image: '/images/MenuIcon.png',
    tags: ['Windows', 'Utility', 'Fix', 'Executable', 'Inno'],
    codeUrl: 'https://github.com/ImmuneMoon/Restore-Legacy-Context-Menu/releases/tag/v1.0.0',
    codeButtonText: 'Github Release'
  },
  {
    name: 'G-Suite Dark Mode Extension',
    description: 'A universal dark theme for Google Drive, Docs, Sheets, and more.',
    image: '/images/Gsuite Dark Mode wide.png',
    tags: ['Browser Extension', 'Chrome', 'Firefox', 'Chrome Web Store', 'Firefox Addons'],
    links: [
      {
        url: 'https://chromewebstore.google.com/detail/g-suite-dark-mode/jkagjbekbcbclacgfpjhdbmkdlgdgiop',
        label: 'Chrome Web Store',
        icon: <Chrome className="mr-2 h-4 w-4" />,
        variant: 'default'
      },
      {
        url: 'https://addons.mozilla.org/en-US/firefox/addon/g-suite-dark-mode/',
        label: 'Firefox Add-ons',
        icon: <FirefoxIcon className="mr-2 h-4 w-4" />,
        variant: 'accent'
      }
    ] satisfies ProjectLink[]
  },
  {
    name: 'Sheet Forge',
    description: 'A Next.js application for crafting and managing tabletop RPG character sheets. It features an interactive sheet display, text input fields, and PDF generation for easy printing and sharing.',
    image: '/images/SheetForge.webp',
    tags: ['Next.js', 'React', 'TypeScript', 'Firebase', 'jspdf'],
    demoUrl: 'https://sheetforge.net/',
    demoButtonText: 'Live Site'
  },
  {
    name: 'Commerce',
    description: 'An eBay-like e-commerce auction site built as a full-stack web application. It features user authentication, listing creation, bidding, watchlists, and categories, powered by Django and Python.',
    image: '/images/commerce.png',
    tags: ['Python', 'Django', 'SQLite', 'Full-Stack', 'CS50'],
    codeUrl: 'https://github.com/ImmuneMoon/commerce'
  },
  {
    name: 'Build Deploy Run',
    description: "A work in progress tool that simplifies building and deploying Python applications as both executables and Docker images. It features a GUI installer for environment setup and a powerful CLI.",
    image: '/images/builddeployrun.png',
    tags: ['Python', 'Docker', 'CLI', 'Bash', 'DevOps', 'PowerShell'],
    codeUrl: 'https://github.com/ImmuneMoon/Build-Deploy-Run'
  },
  {
    name: 'Proj ADV',
    description: "A work in progress 2D monster-battling RPG built in GameMaker. As the lead programmer, I contributed to game design, mechanics, and art, collaborating with a small team to bring the retro-style world to life.",
    image: '/images/ProjADV.png',
    tags: ['GameMaker', 'GML', 'Game Design', 'JSON', '2D Animation'],
    codeUrl: 'https://github.com/ImmuneMoon/Proj-ADV'
  },
  {
    name: 'Space Tourism Website',
    description: 'A multi-page informational website for a conceptual space tourism company. This project, a challenge from Frontendmentor, is built with React to create a dynamic and responsive user experience with multiple views and data-driven content.',
    image: '/images/Space-tourism-screenshot.webp',
    tags: ['React', 'Frontend', 'CSS', 'HTML'],
    codeUrl: 'https://github.com/ImmuneMoon/space-tourism-website',
    demoUrl: 'https://immunemoon.github.io/space-tourism-website/',
    demoButtonText: 'Static Site'
  },
  {
    name: 'URL Web Scraper',
    description: 'A practical command-line tool built with Node.js that scrapes all URLs from a specified webpage. It uses Axios for making HTTP requests and Cheerio.js for parsing the server-side DOM, then outputs the results as a list and a JSON object.',
    image: '/images/URL Scraper.png',
    tags: ['Node.js', 'Cheerio.js', 'Axios', 'Web Scraping'],
    codeUrl: 'https://github.com/ImmuneMoon/URL-web-scraper',
    demoUrl: 'https://youtu.be/q44qvjjfCgM',
    demoButtonText: 'Video Demo'
  },
  {
    name: 'Intro Section w/ Dropdown Nav',
    description: 'A responsive landing page component featuring a complex, dynamic dropdown navigation menu. This Frontendmentor challenge was built using Tailwind CSS for a modern, utility-first approach to styling, with jQuery handling the interactive menu logic.',
    image: '/images/intro-section-with-dropdown-nav-screenshot.webp',
    tags: ['HTML', 'Tailwind CSS', 'jQuery', 'Frontend'],
    codeUrl: 'https://github.com/ImmuneMoon/Intro-section-with-dropdown',
    demoUrl: 'https://immunemoon.github.io/Intro-section-with-dropdown/',
    demoButtonText: 'Static Site'
  },
  {
    name: '10,000 Hour Calculator',
    description: 'A web-based calculator that helps users determine how long it will take to achieve 10,000 hours of practice in a skill. The user interface is built with the Bootstrap framework, and the calculation logic is powered by jQuery.',
    image: '/images/10k-calc-screenshot.png',
    tags: ['HTML', 'Bootstrap', 'jQuery', 'JavaScript'],
    codeUrl: 'https://github.com/ImmuneMoon/10-000-Hour-Calculator',
    demoUrl: 'https://immunemoon.github.io/10-000-Hour-Calculator/',
    demoButtonText: 'Static Site'
  }
];

export function ProjectsSection() {
  const [isOpen, setIsOpen] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (!open && triggerRef.current) {
      setTimeout(() => {
        triggerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 250);
    }
  };

  const teaserCount = 4;
  const teaserProjects = initialProjects.slice(0, teaserCount);
  const moreProjects = initialProjects.slice(teaserCount);

  return (
    <section ref={sectionRef} id="projects" className="w-full py-12 md:py-24 lg:py-32">
      <div className="container mx-auto max-w-7xl px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-5xl">My Projects</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Here are some of the projects I'm proud of. Each one represents a unique challenge and a learning opportunity.
            </p>
          </div>
        </div>

        <div className="relative mx-auto mt-12" style={{ overflowAnchor: 'none' }}>
          <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
            {teaserProjects.map((project) => (
              <ProjectCard
                key={project.name}
                project={project}
              />
            ))}
          </div>

          <Collapsible open={isOpen} onOpenChange={handleOpenChange} className="w-full">
            <CollapsibleContent className="space-y-8 overflow-hidden data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down">
              <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 mt-8">
                {moreProjects.map((project) => (
                  <ProjectCard
                    key={project.name}
                    project={project}
                  />
                ))}
              </div>
            </CollapsibleContent>

            {!isOpen && moreProjects.length > 0 && (
              <div className="absolute bottom-16 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-10 pointer-events-none" />
            )}

            <div className="flex justify-center mt-12 relative z-20">
              <CollapsibleTrigger asChild>
                <Button
                  ref={triggerRef}
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={(e) => e.currentTarget.blur()}
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
              </CollapsibleTrigger>
            </div>
          </Collapsible>
        </div>
      </div>
    </section>
  );
}
