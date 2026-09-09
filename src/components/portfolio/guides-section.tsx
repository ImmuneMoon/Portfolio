'use client';

import { ProjectCard } from "@/components/portfolio/project-card";

const initialGuides = [
  {
    name: 'Building Firebase Apps in Google Antigravity IDE',
    description: 'A comprehensive guide on leveraging the Antigravity IDE and its Firebase MCP server to rapidly build, deploy, and manage Firebase applications. Covers authentication, Firestore rules, and backend functions.',
    image: '/images/firebase-guide.png',
    tags: ['Firebase', 'Google Cloud', 'Antigravity IDE', 'Documentation'],
    codeUrl: 'https://github.com/ImmuneMoon/Building-Firebase-Apps-in-Google-Antigravity-IDE',
    codeButtonText: 'Read Guide'
  },
  {
    name: 'Windows System Repair Guide',
    description: 'An advanced, step-by-step technical guide on diagnosing and repairing Windows system corruption using DISM, SFC, and CHKDSK. Designed to help IT professionals and power users restore system stability.',
    image: '/images/windows-repair.png',
    tags: ['Windows', 'SysAdmin', 'Troubleshooting', 'Technical Writing'],
    codeUrl: 'https://github.com/ImmuneMoon/DISM-SFC-CHKDSK-Windows-Repair-Guide',
    codeButtonText: 'Read Guide'
  },
  {
    name: 'Windows 11 Local User Administration',
    description: 'Detailed instructions on bypassing Microsoft Account requirements during Windows 11 setup and enabling local user accounts. Includes insights into Windows deployment and local group policy.',
    image: '/images/windows-account.png',
    tags: ['Windows 11', 'OOBE', 'Administration', 'Documentation'],
    codeUrl: 'https://github.com/ImmuneMoon/Enable-a-local-user-in-Windows11-no-microsoft-account-',
    codeButtonText: 'Read Guide'
  }
];

export function GuidesSection() {
  return (
    <section id="guides" className="w-full py-12 md:py-24 lg:py-32 bg-muted/50">
      <div className="container mx-auto max-w-7xl px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-5xl">Technical Writing & Guides</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              In addition to writing code, I enjoy documenting my processes and sharing knowledge. Here are a few technical guides and articles I've written.
            </p>
          </div>
        </div>

        <div className="relative mx-auto mt-12">
          <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {initialGuides.map((guide) => (
              <ProjectCard
                key={guide.name}
                project={guide as any}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
