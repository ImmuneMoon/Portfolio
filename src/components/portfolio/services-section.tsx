'use client';

import { Check, Globe, ShoppingCart, Wrench } from "lucide-react";
import { TagBadge } from "@/components/portfolio/tag-badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ShowMoreButton } from "@/components/portfolio/show-more-button";
import { usePeekCollapse } from "@/components/portfolio/use-peek-collapse";

// PLACEHOLDER PRICES: set each `price` after checking local rates. Until then the
// cards show "Pricing on request" so the section can go live without a number.
const PRICE_PLACEHOLDER = 'Pricing on request';

/** How far below the package headings the collapsed view extends, in pixels. */
const PEEK_BELOW_HEADINGS = 56;

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

/** Collapsed view: the package cards down to their name, price and tagline, then a fade. */
function measureServices(content: HTMLElement) {
  const headings = Array.from(content.querySelectorAll<HTMLElement>('[data-peek-end]'));
  if (!headings.length) return { peek: null, data: null };
  // Layout offsets, not on-screen positions, so the cards' reveal slide can't skew this.
  const topWithin = (el: HTMLElement) => {
    let y = 0;
    for (let n: HTMLElement | null = el; n && n !== content; n = n.offsetParent as HTMLElement | null) y += n.offsetTop;
    return y;
  };
  const firstTop = topWithin(headings[0]);
  // Only the first row counts, so stacked cards on a phone show one card's heading.
  const firstRow = headings.filter((h) => Math.abs(topWithin(h) - firstTop) < 2);
  const bottom = Math.max(...firstRow.map((h) => topWithin(h) + h.offsetHeight));
  return { peek: Math.round(bottom + PEEK_BELOW_HEADINGS), data: null };
}

export function ServicesSection() {
  const { isOpen, toggle, clipRef, contentRef, triggerRef, hasMore } = usePeekCollapse(measureServices, null);
  // Everything below the visible headings stays out of the tab order until expanded.
  const hidden = !isOpen && hasMore;

  return (
    <section id="services" className="w-full py-12 md:py-24 lg:py-32">
      <div className="container mx-auto max-w-7xl px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div data-reveal="" className="space-y-2">
            <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-5xl">Services</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Websites, online stores, and custom tools for small businesses. Three packages with a fixed price and a
              clear process, built with the same stack that runs this site.
            </p>
          </div>
        </div>

        <div className="relative mx-auto mt-12" style={{ overflowAnchor: 'none' }}>
          <div
            ref={clipRef}
            id="services-details"
            className={
              // Until the first measurement, cap the height near the expected peek to avoid a jump.
              "relative overflow-clip transition-[height] duration-500 ease-in-out motion-reduce:transition-none" +
              (!hasMore && !isOpen ? " max-h-[22rem]" : "")
            }
          >
            <div ref={contentRef} className="relative">
              <div data-reveal-group="" className="grid gap-8 md:grid-cols-3">
                {packages.map((pkg) => {
                  const Icon = pkg.icon;
                  return (
                    <Card key={pkg.name} data-reveal="" className="spotlight flex h-full flex-col transition-shadow hover:shadow-xl">
                      <CardHeader data-peek-end="">
                        <div className="mb-2 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary ring-1 ring-primary/20">
                          <Icon className="h-6 w-6" />
                        </div>
                        <CardTitle className="font-headline text-2xl">{pkg.name}</CardTitle>
                        <p className="text-lg font-semibold text-primary">{pkg.price}</p>
                        <CardDescription>{pkg.tagline}</CardDescription>
                      </CardHeader>
                      <CardContent className="flex grow flex-col space-y-5" inert={hidden}>
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
                            <TagBadge key={tag} tag={tag} />
                          ))}
                        </div>
                      </CardContent>
                      <CardFooter inert={hidden}>
                        <Button asChild className="w-full">
                          <a href="#contact">Ask about this package</a>
                        </Button>
                      </CardFooter>
                    </Card>
                  );
                })}
              </div>

              <div inert={hidden}>
                <div className="mt-16">
                  <h3 className="font-headline text-2xl font-bold tracking-tighter text-center sm:text-3xl">How it works</h3>
                  <ol data-reveal-group="" className="mt-8 grid gap-6 md:grid-cols-4">
                    {steps.map((step, i) => (
                      <li key={step.title} data-reveal="" className="flex flex-col gap-2">
                        <span className="font-headline text-4xl font-bold text-primary/30">{String(i + 1).padStart(2, '0')}</span>
                        <h4 className="font-headline text-xl font-bold">{step.title}</h4>
                        <p className="text-sm text-muted-foreground">{step.text}</p>
                      </li>
                    ))}
                  </ol>
                </div>

                <div className="mx-auto mt-16 max-w-3xl space-y-8">
                  <div>
                    <h3 className="font-headline text-2xl font-bold tracking-tighter sm:text-3xl">Good to know</h3>
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
                    <h3 className="font-headline text-2xl font-bold">Have a project in mind?</h3>
                    <p className="max-w-xl text-muted-foreground">
                      Tell me what you are trying to do and I will come back with questions, a rough timeline, and a price.
                    </p>
                    <Button asChild size="lg">
                      <a href="#contact">Get in touch</a>
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {hasMore && (
              // Fades to the page background, which this section sits on directly.
              <div
                aria-hidden="true"
                className={
                  "pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-linear-to-t from-background to-transparent transition-opacity duration-500" +
                  (isOpen ? " opacity-0" : " opacity-100")
                }
              />
            )}
          </div>

          {hasMore && (
            <ShowMoreButton isOpen={isOpen} onToggle={toggle} controls="services-details" buttonRef={triggerRef} />
          )}
        </div>
      </div>
    </section>
  );
}
