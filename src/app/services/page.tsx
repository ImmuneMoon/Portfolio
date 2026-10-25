import type { Metadata } from 'next';
import Link from 'next/link';
import { Header } from "@/components/portfolio/header";
import { Footer } from "@/components/portfolio/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, Globe, ShoppingCart, Wrench } from "lucide-react";

export const metadata: Metadata = {
  title: 'Services',
  description:
    'Websites, online stores, and custom tools for small businesses, built by Fulllion Creative Works. Three fixed-price packages with a clear process from first call to launch.',
  alternates: { canonical: '/services' },
};

// PLACEHOLDER PRICES: set each `price` after checking local rates. Until then the
// cards show "Pricing on request" so the page can go live without a number.
const PRICE_PLACEHOLDER = 'Pricing on request';

const packages = [
  {
    name: 'Small Business Site',
    price: PRICE_PLACEHOLDER,
    tagline: 'A fast, mobile-friendly website that tells people who you are and how to reach you.',
    icon: Globe,
    bestFor: 'Local businesses, trades, studios, and anyone who needs a professional web presence without the overhead.',
    includes: [
      'Up to five pages, designed around your content',
      'Mobile-friendly layout that loads fast',
      'Contact details, map, and hours where they belong',
      'Search engine basics: titles, descriptions, and social previews',
      'Domain connection, HTTPS, and hosting setup',
      'A short walkthrough so you can update text yourself',
    ],
    stack: ['Next.js', 'Tailwind CSS', 'Firebase App Hosting', 'Cloudflare'],
  },
  {
    name: 'Online Store Setup',
    price: PRICE_PLACEHOLDER,
    tagline: 'A storefront that is ready to take orders, with products, payments, and shipping configured.',
    icon: ShoppingCart,
    bestFor: 'Shops moving online for the first time, or replacing a store that has become hard to manage.',
    includes: [
      'Store platform setup on BigCommerce, Shopify, or a custom build',
      'Product catalog, categories, and variants entered and organized',
      'Payments, taxes, and shipping rules configured',
      'Theme styled to match your branding',
      'Domain, HTTPS, and email notifications connected',
      'Launch checklist and a hand-off session',
    ],
    stack: ['BigCommerce', 'Shopify', 'Next.js', 'Firebase'],
  },
  {
    name: 'Custom Web App or Tool',
    price: PRICE_PLACEHOLDER,
    tagline: 'Software built for the job you actually have, when an off-the-shelf product does not fit.',
    icon: Wrench,
    bestFor: 'Internal tools, booking and intake systems, desktop utilities, browser extensions, and automation.',
    includes: [
      'Scoping session to pin down the problem and the must-haves',
      'Web app, desktop app, or browser extension, whichever fits the job',
      'User accounts and data storage where needed',
      'Installer or deployment, plus documentation',
      'Source code delivered to you',
      'A support window after launch for fixes',
    ],
    stack: ['Next.js', 'Firebase', 'Electron', 'Python', 'Browser Extensions'],
  },
];

const steps = [
  {
    title: 'Discovery call',
    text: 'A short conversation about what you need, what you already have, and when you need it. No charge.',
  },
  {
    title: 'Proposal',
    text: 'A written scope with a fixed price and timeline, so there are no surprises later.',
  },
  {
    title: 'Build',
    text: 'Regular check-ins with working previews you can click through, not just mockups.',
  },
  {
    title: 'Launch and hand-off',
    text: 'Everything goes live on your domain and accounts, with a walkthrough and documentation.',
  },
];

export default function ServicesPage() {
  return (
    <div className="flex flex-col min-h-dvh bg-background">
      <Header />
      <main className="flex-1">
        <section className="w-full py-12 md:py-20 lg:py-24">
          <div className="container mx-auto max-w-7xl px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <h1 className="font-headline text-3xl font-bold tracking-tighter sm:text-5xl">Services</h1>
              <p className="max-w-[800px] text-muted-foreground md:text-xl/relaxed">
                Websites, online stores, and custom tools for small businesses. Three packages with a fixed price and a
                clear process, built with the same stack that runs this site.
              </p>
            </div>

            <div className="mt-12 grid gap-8 md:grid-cols-3">
              {packages.map((pkg) => {
                const Icon = pkg.icon;
                return (
                  <Card key={pkg.name} className="flex h-full flex-col transition-shadow hover:shadow-xl">
                    <CardHeader>
                      <div className="mb-2 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary ring-1 ring-primary/20">
                        <Icon className="h-6 w-6" />
                      </div>
                      <CardTitle className="font-headline text-2xl">{pkg.name}</CardTitle>
                      <p className="text-lg font-semibold text-primary">{pkg.price}</p>
                      <CardDescription>{pkg.tagline}</CardDescription>
                    </CardHeader>
                    <CardContent className="flex grow flex-col space-y-5">
                      <div>
                        <p className="text-sm font-semibold">Best for</p>
                        <p className="text-sm text-muted-foreground">{pkg.bestFor}</p>
                      </div>
                      <div>
                        <p className="text-sm font-semibold">What is included</p>
                        <ul className="mt-2 space-y-2">
                          {pkg.includes.map((item) => (
                            <li key={item} className="flex gap-2 text-sm text-muted-foreground">
                              <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="mt-auto flex flex-wrap gap-2 pt-2">
                        {pkg.stack.map((tag) => (
                          <Badge key={tag} variant="secondary">{tag}</Badge>
                        ))}
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button asChild className="w-full">
                        <Link href="/#contact">Ask about this package</Link>
                      </Button>
                    </CardFooter>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        <section className="w-full bg-muted/50 py-12 md:py-20">
          <div className="container mx-auto max-w-7xl px-4 md:px-6">
            <h2 className="font-headline text-3xl font-bold tracking-tighter text-center sm:text-4xl">How it works</h2>
            <ol className="mt-10 grid gap-6 md:grid-cols-4">
              {steps.map((step, i) => (
                <li key={step.title} className="flex flex-col gap-2">
                  <span className="font-headline text-4xl font-bold text-primary/30">{String(i + 1).padStart(2, '0')}</span>
                  <h3 className="font-headline text-xl font-bold">{step.title}</h3>
                  <p className="text-sm text-muted-foreground">{step.text}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="w-full py-12 md:py-20">
          <div className="container mx-auto max-w-3xl px-4 md:px-6 space-y-8">
            <div>
              <h2 className="font-headline text-2xl font-bold tracking-tighter sm:text-3xl">Good to know</h2>
              <ul className="mt-4 space-y-3 text-muted-foreground">
                <li>
                  <span className="font-semibold text-foreground">You own everything.</span> Domains, hosting, and store
                  accounts are set up in your name, and source code is handed over at launch.
                </li>
                <li>
                  <span className="font-semibold text-foreground">Fixed prices.</span> Each package has a set scope. Work
                  outside it is quoted separately before it starts, never added to the bill after.
                </li>
                <li>
                  <span className="font-semibold text-foreground">Rights cleared.</span> Projects use content you own
                  or are licensed to use, so what you launch is yours to sell and promote.
                </li>
              </ul>
            </div>
            <div className="flex flex-col items-center gap-4 rounded-xl border bg-card p-8 text-center shadow-xs">
              <h2 className="font-headline text-2xl font-bold">Have a project in mind?</h2>
              <p className="max-w-xl text-muted-foreground">
                Tell me what you are trying to do and I will come back with questions, a rough timeline, and a price.
              </p>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Button asChild size="lg">
                  <Link href="/#contact">Get in touch</Link>
                </Button>
                <Button asChild variant="secondary" size="lg">
                  <Link href="/#projects">See recent work</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
