'use client';

import { ProjectCard, type Project } from "@/components/portfolio/project-card";
import { ShowMoreButton } from "@/components/portfolio/show-more-button";
import { usePeekCollapse } from "@/components/portfolio/use-peek-collapse";
import { ScrambleText } from "@/components/portfolio/scramble-text";

/** How much of the second row shows while collapsed, as a fraction of a card's height. */
const PEEK_FRACTION = 0.4;
/** Upper limit on the peek in pixels, so tall single-column cards don't show too much. */
const PEEK_MAX = 280;

const guideGroups: { name: string; guides: Project[] }[] = [
  {
    name: 'Featured',
    guides: [
      {
        name: 'Building Firebase Apps in Google Antigravity IDE',
        description: 'Develop, test, and deploy Firebase apps locally with the Antigravity IDE, whether you are migrating a Firebase Studio project or starting from scratch. Covers Cloud Firestore, the Local Emulator Suite, security rules unit tests, and automated deployments.',
        image: '/images/firebase-guide.webp',
        tags: ['Firebase', 'Firestore', 'Antigravity IDE', 'Documentation'],
        codeUrl: 'https://github.com/ImmuneMoon/Building-Firebase-Apps-in-Google-Antigravity-IDE',
        codeButtonText: 'Read Guide',
        demoUrl: 'https://github.com/ImmuneMoon/Building-Firebase-Apps-in-Google-Antigravity-IDE/raw/main/Building-Firebase-Apps-in-Google-Antigravity-IDE.pdf',
        demoButtonText: 'Download PDF'
      },
      {
        name: 'Connecting a Custom Domain to Firebase App Hosting',
        description: 'Connect a custom domain and subdomains to Firebase App Hosting through Cloudflare DNS, starting from a domain registered at Squarespace. Covers DNSSEC, HTTPS certificates, redirects, and the snags that cost hours. This site is the worked example.',
        image: '/images/custom-domain-guide.webp',
        tags: ['Firebase App Hosting', 'Cloudflare', 'DNS', 'HTTPS', 'Documentation'],
        codeUrl: 'https://github.com/ImmuneMoon/Connecting-a-Custom-Domain-to-Firebase-App-Hosting',
        codeButtonText: 'Read Guide',
        demoUrl: 'https://github.com/ImmuneMoon/Connecting-a-Custom-Domain-to-Firebase-App-Hosting/raw/main/Connecting-a-Custom-Domain-to-Firebase-App-Hosting.pdf',
        demoButtonText: 'Download PDF'
      },
      {
        name: 'Windows Migration and System Hardening',
        description: 'Migrate Windows from an old hard drive to an NVMe SSD without reinstalling, then optimize, back up, and harden the fresh system. A worked example that adapts to any desktop, covering Secure Boot, TPM, BitLocker, and backups.',
        image: '/images/windows-migration-guide.webp',
        tags: ['Windows 11', 'SSD Migration', 'Security', 'Backup', 'Documentation'],
        codeUrl: 'https://github.com/ImmuneMoon/Comprehensive_Windows_Migration_and_System_Hardening_Guide',
        codeButtonText: 'Read Guide',
        demoUrl: 'https://github.com/ImmuneMoon/Comprehensive_Windows_Migration_and_System_Hardening_Guide/raw/main/Comprehensive_Windows_Migration_and_System_Hardening_Guide.pdf',
        demoButtonText: 'Download PDF'
      },
    ],
  },
  {
    name: 'Install and Set Up',
    guides: [
      {
        name: 'Windows Install Guide',
        description: 'Install Windows 10 or 11 from an ISO using a bootable USB drive made with Rufus, balenaEtcher, or the Media Creation Tool. Starts with checking which version your PC can run, then goes from download to first boot.',
        image: '/images/windows-install-guide.webp',
        tags: ['Windows 10', 'Windows 11', 'Bootable USB', 'Rufus', 'Documentation'],
        codeUrl: 'https://github.com/ImmuneMoon/Windows-Install-Guide',
        codeButtonText: 'Read Guide',
        demoUrl: 'https://github.com/ImmuneMoon/Windows-Install-Guide/raw/main/Windows-Install-Guide.pdf',
        demoButtonText: 'Download PDF'
      },
      {
        name: 'Windows 11 Local User Administration',
        description: 'Set up Windows 11 with a local account instead of a Microsoft account, using a command during setup with no network connection. Includes a warning for newer Windows 11 versions, where this workaround may no longer work, and what to try with an older ISO.',
        image: '/images/windows-account.webp',
        tags: ['Windows 11', 'OOBE', 'Administration', 'Documentation'],
        codeUrl: 'https://github.com/ImmuneMoon/Enable-a-local-user-in-Windows11-no-microsoft-account-',
        codeButtonText: 'Read Guide',
        demoUrl: 'https://github.com/ImmuneMoon/Enable-a-local-user-in-Windows11-no-microsoft-account-/raw/main/Enable-a-local-user-in-Windows11-no-microsoft-account.pdf',
        demoButtonText: 'Download PDF'
      },
      {
        name: 'Linux Install Guide',
        description: 'Move a PC to Linux Mint, Zorin OS, or Ubuntu, with step-by-step balenaEtcher and Rufus walkthroughs. Test everything from a USB drive before you change anything, then replace Windows or install alongside it. A good fit for PCs that cannot run Windows 11.',
        image: '/images/linux-install-guide.webp',
        tags: ['Linux', 'Linux Mint', 'Zorin OS', 'Ubuntu', 'Documentation'],
        codeUrl: 'https://github.com/ImmuneMoon/Linux-Install-Guide',
        codeButtonText: 'Read Guide',
        demoUrl: 'https://github.com/ImmuneMoon/Linux-Install-Guide/raw/main/Linux-Install-Guide.pdf',
        demoButtonText: 'Download PDF'
      },
      {
        name: 'Ubuntu on an Acer R11 Chromebook',
        description: 'Step-by-step guide to installing Ubuntu on an Acer R11 Chromebook, from removing the write-protect screw and enabling developer mode to flashing firmware and booting Linux.',
        image: '/images/ubuntu-chromebook-guide.webp',
        tags: ['Linux', 'Ubuntu', 'Chromebook', 'Firmware', 'Documentation'],
        codeUrl: 'https://github.com/ImmuneMoon/Ubuntu-on-acer-r11-Chromebook',
        codeButtonText: 'Read Guide',
        demoUrl: 'https://github.com/ImmuneMoon/Ubuntu-on-acer-r11-Chromebook/raw/main/Ubuntu-on-acer-r11-Chromebook.pdf',
        demoButtonText: 'Download PDF'
      },
    ],
  },
  {
    name: 'Move and Upgrade',
    guides: [
      {
        name: 'Remove an Old Windows Install',
        description: 'Remove an old Windows install from a secondary drive and keep your files, even when the new drive is too small to take them. Confirms the new drive boots on its own first, then uses commands that avoid hidden links into your new system.',
        image: '/images/remove-old-windows-guide.webp',
        tags: ['Windows 10', 'Windows 11', 'Disk Management', 'Data Recovery', 'Troubleshooting'],
        codeUrl: 'https://github.com/ImmuneMoon/Remove-Old-Windows-Install-Keep-Your-Files',
        codeButtonText: 'Read Guide',
        demoUrl: 'https://github.com/ImmuneMoon/Remove-Old-Windows-Install-Keep-Your-Files/raw/main/Remove-Old-Windows-Install-Keep-Your-Files.pdf',
        demoButtonText: 'Download PDF'
      },
      {
        name: 'Windows 10 Community Support Guide',
        description: 'Stay on Windows 10 with help from repair groups, forums, and volunteers. Covers checking whether your PC can run Windows 11, setting up Windows 10 safely with Extended Security Updates, and what lite builds like Windows X-Lite cost you.',
        image: '/images/windows-10-support-guide.webp',
        tags: ['Windows 10', 'Extended Security Updates', 'Security', 'Troubleshooting'],
        codeUrl: 'https://github.com/ImmuneMoon/Windows-10-Community-Support-Guide',
        codeButtonText: 'Read Guide',
        demoUrl: 'https://github.com/ImmuneMoon/Windows-10-Community-Support-Guide/raw/main/Windows-10-Community-Support-Guide.pdf',
        demoButtonText: 'Download PDF'
      },
    ],
  },
  {
    name: 'Repair and Troubleshoot',
    guides: [
      {
        name: 'Windows System Repair Guide',
        description: 'Step-by-step guide to repairing corrupted or missing Windows system files with DISM, SFC, and CHKDSK, run in the right order so each tool can do its job.',
        image: '/images/windows-repair.webp',
        tags: ['Windows', 'SysAdmin', 'Troubleshooting', 'Technical Writing'],
        codeUrl: 'https://github.com/ImmuneMoon/DISM-SFC-CHKDSK-Windows-Repair-Guide',
        codeButtonText: 'Read Guide',
        demoUrl: 'https://github.com/ImmuneMoon/DISM-SFC-CHKDSK-Windows-Repair-Guide/raw/main/DISM-SFC-CHKDSK-Windows-Repair-Guide.pdf',
        demoButtonText: 'Download PDF'
      },
      {
        name: 'Windows User Profile Recovery',
        description: 'Troubleshooting guide for corrupted Windows user profiles. Step-by-step fixes for failed sign-in errors and temporary profile loops caused by power loss, crashes, or interrupted writes, using the registry and system file checks.',
        image: '/images/windows-profile-recovery-guide.webp',
        tags: ['Windows', 'Registry', 'SFC', 'Troubleshooting', 'Technical Writing'],
        codeUrl: 'https://github.com/ImmuneMoon/Windows-user-profile-failed-sign-in-recovery-guide',
        codeButtonText: 'Read Guide',
        demoUrl: 'https://github.com/ImmuneMoon/Windows-user-profile-failed-sign-in-recovery-guide/raw/main/Windows-user-profile-failed-sign-in-recovery-guide.pdf',
        demoButtonText: 'Download PDF'
      },
      {
        name: 'Stuck Taskbar Notification Badge Fix',
        description: 'Troubleshooting guide for ghost unread badges on Windows 10 and 11 taskbar icons, with Discord-specific fixes for the most common cause.',
        image: '/images/taskbar-badge-fix-guide.webp',
        tags: ['Windows 10', 'Windows 11', 'Discord', 'Troubleshooting'],
        codeUrl: 'https://github.com/ImmuneMoon/Stuck-Taskbar-Notification-Badge-Fix',
        codeButtonText: 'Read Guide',
        demoUrl: 'https://github.com/ImmuneMoon/Stuck-Taskbar-Notification-Badge-Fix/raw/main/Stuck-Taskbar-Notification-Badge-Fix.pdf',
        demoButtonText: 'Download PDF'
      },
    ],
  },
];

const guideCount = guideGroups.reduce((total, group) => total + group.guides.length, 0);

/** Collapsed view: the whole first row of cards, plus the top of the next row. */
function measureGuides(content: HTMLElement) {
  const cards = Array.from(content.querySelectorAll<HTMLElement>('[data-guide]'));
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
    { rowOneCount: guideCount }
  );
  const { rowOneCount } = data;
  let cardIndex = 0;

  return (
    <section id="guides" className="w-full py-12 md:py-24 lg:py-32 bg-muted/50">
      <div className="container mx-auto max-w-7xl px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div data-reveal="" className="space-y-2">
            <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-5xl"><ScrambleText text="Technical Writing & Guides" /></h2>
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
            <div ref={contentRef} className="relative space-y-12">
              {guideGroups.map((group) => (
                <div key={group.name} className="space-y-6">
                  <div className="flex w-full items-center gap-4">
                    <h3 className="font-headline text-xl font-bold whitespace-nowrap text-primary/80">{group.name}</h3>
                    <div className="h-px w-full bg-primary/10" />
                  </div>
                  <div data-reveal-group="" className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                    {group.guides.map((guide) => {
                      const index = cardIndex++;
                      return (
                        // Cards past the first row are clipped while collapsed, so keep them out of
                        // the tab order and away from screen readers until the list is expanded.
                        <div key={guide.name} data-guide="" className="h-full" inert={!isOpen && hasMore && index >= rowOneCount}>
                          <ProjectCard project={guide} />
                        </div>
                      );
                    })}
                  </div>
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
