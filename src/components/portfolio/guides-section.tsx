'use client';

import { ProjectCard, type Project } from "@/components/portfolio/project-card";
import { GuideGroup } from "@/components/portfolio/guide-group";
import { ShowMoreButton } from "@/components/portfolio/show-more-button";
import { usePeekCollapse } from "@/components/portfolio/use-peek-collapse";
import { ScrambleText } from "@/components/portfolio/scramble-text";

/** How much of the second row shows while collapsed, as a fraction of a card's height. */
const PEEK_FRACTION = 0.4;
/** Upper limit on the peek in pixels, so tall single-column cards don't show too much. */
const PEEK_MAX = 280;

/** Groups of guides. The featured group shows as large cards; the rest show as a
    detailed list, one guide per row. */
const guideGroups: { name: string; featured?: boolean; guides: Project[] }[] = [
  {
    name: 'Featured',
    featured: true,
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
        name: 'Private Cloud Storage for Firebase App Hosting',
        description: 'Give a Next.js site on Firebase App Hosting its own private Cloud Storage bucket, with short-lived signed links for uploads and downloads and no key file. Covers every bucket setting, least-privilege permissions, the server and client code, the limits that quietly break large uploads, and what it costs.',
        image: '/images/private-cloud-storage-cover.webp',
        tags: ['Cloud Storage', 'Firebase App Hosting', 'Next.js', 'Signed URLs', 'Documentation'],
        codeUrl: 'https://github.com/ImmuneMoon/Private-Cloud-Storage-for-Firebase-App-Hosting',
        codeButtonText: 'Read Guide',
        demoUrl: 'https://github.com/ImmuneMoon/Private-Cloud-Storage-for-Firebase-App-Hosting/raw/main/Private-Cloud-Storage-for-Firebase-App-Hosting.pdf',
        demoButtonText: 'Download PDF'
      },
    ],
  },
  {
    name: 'Learn to Code',
    guides: [
      {
        name: 'Learn Web Development: Start Here',
        description: 'The first stop in a set of free web development guides. Explains how a web app works in plain terms, the front-end, back-end and full-stack paths and how to pick one, five steps from your first line of code to your first job, free curricula compared, and a beginner\'s toolkit.',
        image: '/images/learn-web-dev-cover.webp',
        tags: ['Web Development', 'HTML', 'CSS', 'JavaScript'],
        codeUrl: 'https://github.com/ImmuneMoon/Learn-Web-Development-Start-Here',
        codeButtonText: 'Read Guide',
        demoUrl: 'https://github.com/ImmuneMoon/Learn-Web-Development-Start-Here/raw/main/Learn-Web-Development-Start-Here.pdf',
        demoButtonText: 'Download PDF'
      },
      {
        name: 'Learn Front-End Web Development',
        description: 'A learning path for the part of the web that runs in the browser, in order: HTML, CSS, a CSS framework, JavaScript, then Node.js, Vite, TypeScript, React, Next.js, Vue and Angular. Also covers what beginners often skip: accessibility, responsive design, developer tools and web performance, with free resources and project ideas.',
        image: '/images/front-end-cover.webp',
        tags: ['HTML', 'CSS', 'JavaScript', 'React', 'Accessibility'],
        codeUrl: 'https://github.com/ImmuneMoon/Learn-Front-End-Web-Development',
        codeButtonText: 'Read Guide',
        demoUrl: 'https://github.com/ImmuneMoon/Learn-Front-End-Web-Development/raw/main/Learn-Front-End-Web-Development.pdf',
        demoButtonText: 'Download PDF'
      },
      {
        name: 'Learn Back-End Web Development',
        description: 'A plain-language route into the server side of the web: Python, Java, SQL, Flask or Django, and Git, with Node.js and Express as an alternative. Covers HTTP, REST APIs and JSON, databases, sign-in, web security, secrets, testing and deployment.',
        image: '/images/back-end-cover.webp',
        tags: ['Python', 'SQL', 'Node.js', 'REST APIs', 'Web Security'],
        codeUrl: 'https://github.com/ImmuneMoon/Learn-Back-End-Web-Development',
        codeButtonText: 'Read Guide',
        demoUrl: 'https://github.com/ImmuneMoon/Learn-Back-End-Web-Development/raw/main/Learn-Back-End-Web-Development.pdf',
        demoButtonText: 'Download PDF'
      },
      {
        name: 'Full-Stack Web Development and Stacks',
        description: 'What building both ends of a web app involves, and how to choose a stack. Compares MEAN and MERN, the T3 stack, Next.js on its own, and Firebase and Supabase as of 2026, then covers Core Web Vitals, caching and capstone project ideas.',
        image: '/images/full-stack-cover.webp',
        tags: ['Full Stack', 'Next.js', 'Firebase', 'Supabase'],
        codeUrl: 'https://github.com/ImmuneMoon/Full-Stack-Web-Development-and-Stacks',
        codeButtonText: 'Read Guide',
        demoUrl: 'https://github.com/ImmuneMoon/Full-Stack-Web-Development-and-Stacks/raw/main/Full-Stack-Web-Development-and-Stacks.pdf',
        demoButtonText: 'Download PDF'
      },
      {
        name: 'Computer Science Fundamentals',
        description: 'The computer science working developers actually use, with lectures and videos for each topic: data structures and algorithms with JavaScript and Python equivalents, Big O, recursion, the math that matters, design patterns and where to go next. Led by Harvard\'s CS50 and NeetCode\'s roadmap.',
        image: '/images/cs-fundamentals-cover.webp',
        tags: ['Data Structures', 'Algorithms', 'Big O', 'CS50'],
        codeUrl: 'https://github.com/ImmuneMoon/Computer-Science-Fundamentals',
        codeButtonText: 'Read Guide',
        demoUrl: 'https://github.com/ImmuneMoon/Computer-Science-Fundamentals/raw/main/Computer-Science-Fundamentals.pdf',
        demoButtonText: 'Download PDF'
      },
      {
        name: 'Learning How to Learn Programming',
        description: 'One practical method for studying code: plan, learn, build, review. Covers research-backed techniques like active recall, spacing and interleaving, the Feynman technique, getting out of tutorial hell by building things, notes, motivation, wellbeing and books.',
        image: '/images/learning-to-learn-cover.webp',
        tags: ['Study Skills', 'Active Recall', 'Spaced Repetition', 'Documentation'],
        codeUrl: 'https://github.com/ImmuneMoon/Learning-How-to-Learn-Programming',
        codeButtonText: 'Read Guide',
        demoUrl: 'https://github.com/ImmuneMoon/Learning-How-to-Learn-Programming/raw/main/Learning-How-to-Learn-Programming.pdf',
        demoButtonText: 'Download PDF'
      },
      {
        name: 'Learn Game Development',
        description: 'A starting point for making your first games: Harvard\'s CS50 game course and freeCodeCamp tutorials, an engine comparison of Godot, GameMaker, Unity, Unreal, Pygame and building from scratch with licensing and pricing, then art and free assets, performance, game jams and publishing.',
        image: '/images/game-dev-cover.webp',
        tags: ['Godot', 'GameMaker', 'Unity', 'Unreal Engine', 'Pygame'],
        codeUrl: 'https://github.com/ImmuneMoon/Learn-Game-Development',
        codeButtonText: 'Read Guide',
        demoUrl: 'https://github.com/ImmuneMoon/Learn-Game-Development/raw/main/Learn-Game-Development.pdf',
        demoButtonText: 'Download PDF'
      },
    ],
  },
  {
    name: 'Careers & Community',
    guides: [
      {
        name: 'Coding Practice and Interview Prep',
        description: 'Sharpen your coding skills and get ready for developer interviews: practice sites compared, with what\'s free in 2026, LeetCode, NeetCode and Cracking the Coding Interview, a study plan, solving problems out loud, and technical and behavioral interview prep.',
        image: '/images/interview-prep-cover.webp',
        tags: ['LeetCode', 'NeetCode', 'Algorithms', 'Interview Prep'],
        codeUrl: 'https://github.com/ImmuneMoon/Coding-Practice-and-Interview-Prep',
        codeButtonText: 'Read Guide',
        demoUrl: 'https://github.com/ImmuneMoon/Coding-Practice-and-Interview-Prep/raw/main/Coding-Practice-and-Interview-Prep.pdf',
        demoButtonText: 'Download PDF'
      },
      {
        name: 'Web Developer Careers and Freelancing',
        description: 'Turning the basics into paid work: what employers expect from a junior web developer now, projects that show real skill, building a portfolio site and GitHub profile, resumes, job searching, interviews, raises and freelancing basics.',
        image: '/images/web-careers-cover.webp',
        tags: ['Portfolio', 'Resume', 'Interview Prep', 'Freelancing'],
        codeUrl: 'https://github.com/ImmuneMoon/Web-Developer-Careers-Portfolio-and-Freelancing',
        codeButtonText: 'Read Guide',
        demoUrl: 'https://github.com/ImmuneMoon/Web-Developer-Careers-Portfolio-and-Freelancing/raw/main/Web-Developer-Careers-Portfolio-and-Freelancing.pdf',
        demoButtonText: 'Download PDF'
      },
      {
        name: 'Open Source and Developer Communities',
        description: 'Learning to code alongside other people: finding a beginner-friendly project and issue, your first contribution step by step from fork to pull request with Git and the GitHub CLI, developer communities, asking good questions, and using AI coding tools responsibly.',
        image: '/images/open-source-cover.webp',
        tags: ['Open Source', 'Git', 'GitHub', 'Pull Requests'],
        codeUrl: 'https://github.com/ImmuneMoon/Open-Source-and-Developer-Communities',
        codeButtonText: 'Read Guide',
        demoUrl: 'https://github.com/ImmuneMoon/Open-Source-and-Developer-Communities/raw/main/Open-Source-and-Developer-Communities.pdf',
        demoButtonText: 'Download PDF'
      },
    ],
  },
  {
    name: 'Security & Privacy',
    guides: [
      {
        name: 'DNS Rebinding and the NVIDIA App MCP Server',
        description: 'A security write-up on how DNS rebinding threatens local MCP servers like the one in the NVIDIA App, why CORS does not stop it, and how Host and Origin header checks do. Separates what is confirmed from what is only reported, and shows how to check your own PC. No testing was done against the app.',
        image: '/images/dns-rebinding-mcp-cover.webp',
        tags: ['Web Security', 'DNS Rebinding', 'MCP', 'CORS', 'Technical Writing'],
        codeUrl: 'https://github.com/ImmuneMoon/NVIDIA-App-MCP-DNS-Rebinding-Writeup',
        codeButtonText: 'Read Write-up',
        demoUrl: 'https://github.com/ImmuneMoon/NVIDIA-App-MCP-DNS-Rebinding-Writeup/raw/main/NVIDIA-App-MCP-DNS-Rebinding-Writeup.pdf',
        demoButtonText: 'Download PDF'
      },
      {
        name: 'PC Network Activity and RAT Check',
        description: 'See what your Windows PC looks up and connects to, with tools already in Windows plus Microsoft\'s free TCPView. Explains how remote access trojans hide behind normal Windows programs, how to look up an address you don\'t recognize, and how to make script attacks harder.',
        image: '/images/network-rat-check-cover.webp',
        tags: ['Windows', 'Network Forensics', 'TCPView', 'PowerShell', 'Security'],
        codeUrl: 'https://github.com/ImmuneMoon/PC-Network-Activity-and-RAT-Check',
        codeButtonText: 'Read Guide',
        demoUrl: 'https://github.com/ImmuneMoon/PC-Network-Activity-and-RAT-Check/raw/main/PC-Network-Activity-and-RAT-Check.pdf',
        demoButtonText: 'Download PDF'
      },
      {
        name: 'Windows Malware Removal',
        description: 'Clean malware off a Windows PC: what to do first, Microsoft\'s free scanners and the Tron script in the right order, when it\'s better to reinstall, and securing your accounts afterward. Adds the steps a popular video leaves out, like backing up first and what Tron changes on your PC.',
        image: '/images/malware-removal-cover.webp',
        tags: ['Windows', 'Malware', 'Microsoft Defender', 'Tron', 'Security'],
        codeUrl: 'https://github.com/ImmuneMoon/Windows-Malware-Removal-Guide',
        codeButtonText: 'Read Guide',
        demoUrl: 'https://github.com/ImmuneMoon/Windows-Malware-Removal-Guide/raw/main/Windows-Malware-Removal-Guide.pdf',
        demoButtonText: 'Download PDF'
      },
      {
        name: 'iPhone Messages and AI Privacy',
        description: 'What Siri, Apple Intelligence and the ChatGPT extension can see of your messages, and the iCloud backup setting that matters most. Covers Advanced Data Protection and how iPhone and Android messages compare, all from Apple\'s own documentation.',
        image: '/images/iphone-privacy-cover.webp',
        tags: ['iPhone', 'Apple Intelligence', 'iCloud', 'Advanced Data Protection', 'Privacy'],
        codeUrl: 'https://github.com/ImmuneMoon/iPhone-Messages-AI-Privacy',
        codeButtonText: 'Read Guide',
        demoUrl: 'https://github.com/ImmuneMoon/iPhone-Messages-AI-Privacy/raw/main/iPhone-Messages-AI-Privacy.pdf',
        demoButtonText: 'Download PDF'
      },
      {
        name: 'Gemini and Your Android Messages',
        description: 'What Google\'s Gemini can and can\'t do with your Phone, Messages and WhatsApp, why turning off Gemini Apps Activity doesn\'t stop it, the settings that actually control it, and which of your conversations are end-to-end encrypted.',
        image: '/images/android-privacy-cover.webp',
        tags: ['Android', 'Gemini', 'Google Messages', 'Privacy'],
        codeUrl: 'https://github.com/ImmuneMoon/Android-Gemini-Messages-Privacy',
        codeButtonText: 'Read Guide',
        demoUrl: 'https://github.com/ImmuneMoon/Android-Gemini-Messages-Privacy/raw/main/Android-Gemini-Messages-Privacy.pdf',
        demoButtonText: 'Download PDF'
      },
    ],
  },
  {
    name: 'Install & Set Up',
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
    name: 'Move & Upgrade',
    guides: [
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
    name: 'Troubleshooting & Repair',
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
                  {(() => {
                    // Guides past the first row are clipped while the section is collapsed, so
                    // keep them out of the tab order and away from screen readers until it opens.
                    const start = cardIndex;
                    cardIndex += group.guides.length;
                    const rowInert = (i: number) => !isOpen && hasMore && start + i >= rowOneCount;
                    return group.featured ? (
                      <div data-reveal-group="" className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                        {group.guides.map((guide, i) => (
                          <div key={guide.name} data-guide="" className="h-full" inert={rowInert(i)}>
                            <ProjectCard project={guide} />
                          </div>
                        ))}
                      </div>
                    ) : (
                      <GuideGroup guides={group.guides} rowInert={rowInert} />
                    );
                  })()}
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
