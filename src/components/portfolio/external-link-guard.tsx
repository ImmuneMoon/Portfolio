'use client';

import { useEffect } from "react";

/**
 * Makes every link that leaves the site open in a new tab, so visitors keep the
 * portfolio open. Links already marked target="_blank" are left alone; in-page links
 * and mailto: links are never touched. Also covers links that appear later, such as
 * cards revealed by Show More.
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
    return () => observer.disconnect();
  }, []);

  return null;
}
