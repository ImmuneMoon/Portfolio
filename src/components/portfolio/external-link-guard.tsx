'use client';

import { useEffect } from "react";

/**
 * Makes every link that leaves the site open in a new tab, so visitors keep the
 * portfolio open. Links already marked target="_blank" are left alone; in-page links
 * and mailto: links are never touched. Also covers links that appear later, such as
 * cards revealed by Show More, and releases focus after a link is clicked so it
 * doesn't stay highlighted when the visitor comes back.
 */
export function ExternalLinkGuard() {
  useEffect(() => {
    const fix = (root: ParentNode) => {
      root.querySelectorAll<HTMLAnchorElement>('a[href]').forEach((a) => {
        if (a.target || !/^https?:/i.test(a.href)) return;
        if (new URL(a.href).origin === window.location.origin) return;
        a.target = '_blank';
        a.rel = 'noopener noreferrer';
      });
    };
    fix(document);
    const observer = new MutationObserver((mutations) => {
      for (const m of mutations) {
        m.addedNodes.forEach((node) => {
          if (node instanceof Element) fix(node.parentNode ?? node);
        });
      }
    });
    observer.observe(document.body, { childList: true, subtree: true });

    // A link clicked with the mouse or a finger keeps focus while its new tab is open,
    // and gets it back when the visitor returns, so its glow would stay lit. Let go of
    // focus after a pointer click. Keyboard activation (detail 0) keeps focus, so
    // keyboard users don't lose their place.
    const onClick = (e: MouseEvent) => {
      if (e.detail === 0) return;
      const link = (e.target as Element | null)?.closest?.('a[target="_blank"]') as HTMLAnchorElement | null;
      if (link) requestAnimationFrame(() => link.blur());
    };
    document.addEventListener('click', onClick);

    return () => {
      observer.disconnect();
      document.removeEventListener('click', onClick);
    };
  }, []);

  return null;
}
