import type { Metadata } from 'next';
import { Inter, Space_Grotesk } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from "@/components/portfolio/theme-provider";
import '@/lib/firebase';

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-inter',
  display: 'swap',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['500', '700'],
  variable: '--font-space-grotesk',
  display: 'swap',
});

const siteUrl = 'https://fulllioncreativeworks.com';
const siteTitle = 'Fulllion Creative Works Portfolio';
const siteDescription =
  'Portfolio of Fulllion, a creative developer and designer building desktop apps, web apps, browser extensions, and tabletop RPG tools with Next.js, React, Electron, Python, and Firebase.';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteTitle,
    template: '%s | Fulllion Creative Works',
  },
  description: siteDescription,
  keywords: ['Fulllion', 'portfolio', 'web developer', 'Next.js', 'React', 'Electron', 'Python', 'Firebase', 'tabletop RPG tools'],
  authors: [{ name: 'Fulllion', url: siteUrl }],
  creator: 'Fulllion',
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    url: siteUrl,
    siteName: siteTitle,
    title: siteTitle,
    description: siteDescription,
    images: [
      {
        url: '/images/hero.webp',
        width: 512,
        height: 512,
        alt: 'Fulllion Creative Works',
      },
    ],
  },
  twitter: {
    card: 'summary',
    title: siteTitle,
    description: siteDescription,
    images: ['/images/hero.webp'],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`!scroll-smooth ${inter.variable} ${spaceGrotesk.variable}`} suppressHydrationWarning>
      <body className="font-body antialiased">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
