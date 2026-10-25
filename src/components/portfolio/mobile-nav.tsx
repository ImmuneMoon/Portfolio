'use client';

import type { ReactNode } from "react";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { NAV_ITEMS, useActiveHref } from "@/components/portfolio/scroll-spy";

export function MobileNav({ logo }: { logo: ReactNode }) {
  const activeHref = useActiveHref();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="lg:hidden">
          <Menu className="h-6 w-6" />
          <span className="sr-only">Toggle navigation menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right">
        <SheetTitle className="sr-only">Navigation menu</SheetTitle>
        <SheetDescription className="sr-only">Links to each section of the site.</SheetDescription>
        <div className="grid gap-2 p-4">
          <SheetClose asChild>
            <a href="/" className="mb-2 flex items-center gap-2">
              {logo}
              <span className="font-headline text-lg font-bold">Fulllion Creative Works</span>
            </a>
          </SheetClose>
          <nav className="flex flex-col items-start gap-1" aria-label="Main">
            {NAV_ITEMS.map((item) => {
              const active = item.href === activeHref;
              return (
                <SheetClose asChild key={item.href}>
                  <a
                    href={item.href}
                    aria-current={active ? (item.section ? 'location' : 'page') : undefined}
                    className={cn(
                      "relative -mx-3 rounded-full px-3 py-2 text-sm font-medium transition-colors duration-300 hover:text-primary",
                      active && "nav-glow bg-primary/15 text-primary ring-1 ring-primary/50"
                    )}
                  >
                    {item.label}
                  </a>
                </SheetClose>
              );
            })}
          </nav>
        </div>
      </SheetContent>
    </Sheet>
  );
}
