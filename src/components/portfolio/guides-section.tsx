'use client';

import { ProjectCard, type Project } from "@/components/portfolio/project-card";
import { ShowMoreButton } from "@/components/portfolio/show-more-button";
import { usePeekCollapse } from "@/components/portfolio/use-peek-collapse";

/** How much of the second row shows while collapsed, as a fraction of a card's height. */
const PEEK_FRACTION = 0.4;
/** Upper limit on the peek in pixels, so tall single-column cards don't show too much. */
const PEEK_MAX = 280;

const initialGuides: Project[] = [
  {
    name: 'Building Firebase Apps in Google Antigravity IDE',
    description: 'A comprehensive guide on leveraging the Antigravity IDE and its Firebase MCP server to rapidly build, deploy, and manage Firebase applications. Covers authentication, Firestore rules, and backend functions.',
    image: '/images/firebase-guide.webp',
    tags: ['Firebase', 'Google Cloud', 'Antigravity IDE', 'Documentation'],
    codeUrl: 'https://github.com/ImmuneMoon/Building-Firebase-Apps-in-Google-Antigravity-IDE',
    codeButtonText: 'Read Guide'
  },
  {
    name: 'Windows System Repair Guide',
    description: 'An advanced, step-by-step technical guide on diagnosing and repairing Windows system corruption using DISM, SFC, and CHKDSK. Designed to help IT professionals and power users restore system stability.',
    image: '/images/windows-repair.webp',
    tags: ['Windows', 'SysAdmin', 'Troubleshooting', 'Technical Writing'],
    codeUrl: 'https://github.com/ImmuneMoon/DISM-SFC-CHKDSK-Windows-Repair-Guide',
    codeButtonText: 'Read Guide'
  },
  {
    name: 'Windows 11 Local User Administration',
    description: 'Detailed instructions on bypassing Microsoft Account requirements during Windows 11 setup and enabling local user accounts. Includes insights into Windows deployment and local group policy.',
    image: '/images/windows-account.webp',
    tags: ['Windows 11', 'OOBE', 'Administration', 'Documentation'],
    codeUrl: 'https://github.com/ImmuneMoon/Enable-a-local-user-in-Windows11-no-microsoft-account-',
    codeButtonText: 'Read Guide'
  },
  {
    name: 'Connecting a Custom Domain to Firebase App Hosting',
    description: 'Connect a custom domain and subdomains to Firebase App Hosting through Cloudflare DNS, starting from a domain registered at Squarespace. Covers DNSSEC, HTTPS certificates, redirects, and the snags that cost hours. This site is the worked example.',
    image: '/images/custom-domain-guide.webp',
    tags: ['Firebase App Hosting', 'Cloudflare', 'DNS', 'HTTPS', 'Documentation'],
    codeUrl: 'https://github.com/ImmuneMoon/Connecting-a-Custom-Domain-to-Firebase-App-Hosting',
    codeButtonText: 'Read Guide'
  },
  {
    name: 'Windows Migration and System Hardening',
    description: 'Migrate Windows from an old hard drive to an NVMe SSD without reinstalling, then optimize, back up, and harden the fresh system. A worked example that adapts to any desktop, covering Secure Boot, TPM, BitLocker, and backups.',
    image: '/images/windows-migration-guide.webp',
    tags: ['Windows 11', 'SSD Migration', 'Security', 'Backup', 'Documentation'],
    codeUrl: 'https://github.com/ImmuneMoon/Comprehensive_Windows_Migration_and_System_Hardening_Guide',
    codeButtonText: 'Read Guide'
  },
  {
    name: 'Windows User Profile Recovery',
    description: 'Troubleshooting guide for corrupted Windows user profiles. Step-by-step fixes for failed sign-in errors and temporary profile loops caused by power loss, crashes, or interrupted writes, using the registry and system file checks.',
    image: '/images/windows-profile-recovery-guide.webp',
    tags: ['Windows', 'Registry', 'SFC', 'Troubleshooting', 'Technical Writing'],
    codeUrl: 'https://github.com/ImmuneMoon/Windows-user-profile-failed-sign-in-recovery-guide',
    codeButtonText: 'Read Guide'
  },
  {
    name: 'Stuck Taskbar Notification Badge Fix',
    description: 'Troubleshooting guide for ghost unread badges on Windows 10 and 11 taskbar icons, with Discord-specific fixes for the most common cause.',
    image: '/images/taskbar-badge-fix-guide.webp',
    tags: ['Windows 10', 'Windows 11', 'Discord', 'Troubleshooting'],
    codeUrl: 'https://github.com/ImmuneMoon/Stuck-Taskbar-Notification-Badge-Fix',
    codeButtonText: 'Read Guide'
  },
  {
    name: 'Windows Install Guide',
    description: 'Installing Windows from an ISO using a bootable USB drive made with Rufus, balenaEtcher, or the Media Creation Tool, from download to first boot.',
    image: '/images/windows-install-guide.webp',
    tags: ['Windows', 'Bootable USB', 'Rufus', 'Documentation'],
    codeUrl: 'https://github.com/ImmuneMoon/Windows-Install-Guide',
    codeButtonText: 'Read Guide'
  },
  {
    name: 'Ubuntu on an Acer R11 Chromebook',
    description: 'Step-by-step guide to installing Ubuntu on an Acer R11 Chromebook, from removing the write-protect screw and enabling developer mode to flashing firmware and booting Linux.',
    image: '/images/ubuntu-chromebook-guide.webp',
    tags: ['Linux', 'Ubuntu', 'Chromebook', 'Firmware', 'Documentation'],
    codeUrl: 'https://github.com/ImmuneMoon/Ubuntu-on-acer-r11-Chromebook',
    codeButtonText: 'Read Guide'
  },
];

/** Collapsed view: the whole first row of cards, plus the top of the second row. */
function measureGuides(grid: HTMLElement) {
  const cards = Array.from(grid.children) as HTMLElement[];
  if (!cards.length) return { peek: null, data: { rowOneCount: 0 } };
  const firstTop = cards[0].offsetTop;
  const rowTwoIndex = cards.findIndex((card) => card.offsetTop > firstTop + 1);
  if (rowTwoIndex < 0) return { peek: null, data: { rowOneCount: cards.length } };
  const rowTwo = cards[rowTwoIndex];
  return {
    peek: Math.round(rowTwo.offsetTop + Math.min(rowTwo.offsetHeight * PEEK_FRACTION, PEEK_MAX)),
    data: { rowOneCount: rowTwoIndex },
  };
}

export function GuidesSection() {
  const { isOpen, toggle, clipRef, contentRef, triggerRef, peek, data, hasMore } = usePeekCollapse(
    measureGuides,
    { rowOneCount: initialGuides.length }
  );
  const { rowOneCount } = data;

  return (
    <section id="guides" className="w-full py-12 md:py-24 lg:py-32 bg-muted/50">
      <div className="container mx-auto max-w-7xl px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div data-reveal="" className="space-y-2">
            <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-5xl">Technical Writing & Guides</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              In addition to writing code, I enjoy documenting my processes and sharing knowledge. Here are a few technical guides and articles I've written.
            </p>
          </div>
        </div>

        <div className="relative mx-auto mt-12" style={{ overflowAnchor: 'none' }}>
          <div
            ref={clipRef}
            id="guides-list"
            className={
              // Until the first measurement, cap the height near the expected peek to avoid a jump.
              "relative overflow-clip transition-[height] duration-500 ease-in-out motion-reduce:transition-none" +
              (peek === null && !isOpen ? " max-h-[58rem]" : "")
            }
          >
            <div ref={contentRef} data-reveal-group="" className="relative grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {initialGuides.map((guide, index) => (
                // Cards past the first row are clipped while collapsed, so keep them out of
                // the tab order and away from screen readers until the list is expanded.
                <div key={guide.name} className="h-full" inert={!isOpen && hasMore && index >= rowOneCount}>
                  <ProjectCard project={guide} />
                </div>
              ))}
            </div>

            {hasMore && (
              // Fades to the section's own tint: muted at 50% over the page background.
              <div
                aria-hidden="true"
                className={
                  "pointer-events-none absolute inset-x-0 bottom-0 h-48 bg-linear-to-t from-[color-mix(in_srgb,var(--color-muted)_50%,var(--color-background))] to-transparent transition-opacity duration-500" +
                  (isOpen ? " opacity-0" : " opacity-100")
                }
              />
            )}
          </div>

          {hasMore && (
            <ShowMoreButton isOpen={isOpen} onToggle={toggle} controls="guides-list" buttonRef={triggerRef} />
          )}
        </div>
      </div>
    </section>
  );
}
