/**
 * On-hover navigation prefetching.
 *
 * This is a multi-page site — every internal link is a real navigation,
 * not a client-side route change. Left alone, the browser only starts
 * fetching the destination page's HTML (and its JS/CSS) the instant the
 * click happens. This module starts that work as soon as hover-intent is
 * detected instead, so by the time the click lands, the destination
 * document is often already sitting in cache and the navigation feels
 * instant rather than triggering a fresh network round trip.
 *
 * Two tiers, both strictly same-origin (no CSP `connect-src` change
 * needed; the inline speculation-rules script does need
 * 'inline-speculation-rules' in `script-src` — see vite-plugin-partials.ts):
 *
 * 1. Speculation Rules API — native browser feature (Chrome/Edge, ~79%
 *    of global traffic as of 2026; Firefox/Safari don't support it yet
 *    and silently ignore the tag). The browser owns hover timing,
 *    concurrency limits, and bails out itself on Save-Data / low
 *    battery / the user's "Preload pages" setting. We only declare
 *    which links qualify. `eagerness: "moderate"` fires on ~200ms
 *    hover, or immediately on pointerdown/touch — whichever is first.
 *
 * 2. Manual fallback (Firefox, Safari, anything without native support)
 *    — a small hover-intent timer that injects `<link rel="prefetch">`
 *    (or a low-priority `fetch()` where that's unsupported) once a link
 *    has been hovered for ~100ms. This tier only prefetches the
 *    destination *document*, not its JS/CSS subresources: the shared
 *    main bundle is already cached from the current page, and each
 *    page's own small entry chunk loads fast on click anyway — so
 *    there's no hand-maintained chunk manifest to keep in sync here.
 */

const HOVER_INTENT_MS = 100;
const prefetchedHrefs = new Set<string>();

interface NetworkInformationLike {
  saveData?: boolean;
  effectiveType?: string;
}

function isSlowOrDataSaving(): boolean {
  const nav = navigator as Navigator & { connection?: NetworkInformationLike };
  const connection = nav.connection;
  if (!connection) return false;
  return Boolean(connection.saveData) || (connection.effectiveType ?? '').includes('2g');
}

function isEligibleLink(link: HTMLAnchorElement): boolean {
  if (link.origin !== location.origin) return false;
  if (link.pathname === location.pathname) return false;
  if (link.target === '_blank') return false;
  if (link.hasAttribute('download')) return false;
  if (link.protocol !== 'http:' && link.protocol !== 'https:') return false;
  return true;
}

function closestLink(target: EventTarget | null): HTMLAnchorElement | null {
  if (!(target instanceof Element)) return null;
  return target.closest('a[href]');
}

function supportsPrefetchLinkRel(): boolean {
  const probe = document.createElement('link');
  return Boolean(probe.relList && probe.relList.supports && probe.relList.supports('prefetch'));
}

function prefetchDocument(href: string, useLinkRel: boolean): void {
  if (prefetchedHrefs.has(href)) return;
  prefetchedHrefs.add(href);

  if (useLinkRel) {
    const link = document.createElement('link');
    link.rel = 'prefetch';
    link.href = href;
    link.setAttribute('as', 'document');
    document.head.appendChild(link);
    return;
  }

  // Safari has historically had unreliable <link rel="prefetch"> support,
  // so fall back to a low-priority fetch purely to warm the HTTP cache.
  const fetchOptions: RequestInit & { priority?: 'low' | 'high' | 'auto' } = {
    credentials: 'same-origin',
    priority: 'low',
  };
  fetch(href, fetchOptions).catch(() => {
    // Best-effort only — a failed prefetch just means the click falls
    // back to a normal, unprefetched navigation.
  });
}

/** Chrome/Edge: let the browser handle hover timing, limits, and bail-outs. */
function initSpeculationRules(): void {
  const base = import.meta.env.BASE_URL;
  const rules = {
    prefetch: [
      {
        source: 'document',
        where: {
          and: [{ href_matches: `${base}*` }, { not: { href_matches: `${base}*.pdf` } }],
        },
        eagerness: 'moderate',
      },
    ],
  };

  const script = document.createElement('script');
  script.type = 'speculationrules';
  script.textContent = JSON.stringify(rules);
  document.body.appendChild(script);
}

/** Firefox/Safari/anything else: a small manual hover-intent + prefetch loop. */
function initHoverFallback(): void {
  const useLinkRel = supportsPrefetchLinkRel();
  let hoverTimer: number | undefined;

  document.addEventListener(
    'pointerover',
    (event) => {
      const link = closestLink(event.target);
      if (!link || !isEligibleLink(link) || prefetchedHrefs.has(link.href)) return;

      window.clearTimeout(hoverTimer);
      hoverTimer = window.setTimeout(() => {
        prefetchDocument(link.href, useLinkRel);
      }, HOVER_INTENT_MS);
    },
    { passive: true },
  );

  document.addEventListener(
    'pointerout',
    (event) => {
      if (closestLink(event.target)) window.clearTimeout(hoverTimer);
    },
    { passive: true },
  );

  // Touch devices have no hover — prefetch on the earliest reliable touch
  // signal instead, so tapping still gets some benefit.
  document.addEventListener(
    'touchstart',
    (event) => {
      const link = closestLink(event.target);
      if (!link || !isEligibleLink(link)) return;
      prefetchDocument(link.href, useLinkRel);
    },
    { passive: true },
  );
}

export function initHoverPrefetch(): void {
  if (isSlowOrDataSaving()) return;

  const speculationRulesSupported =
    'HTMLScriptElement' in window &&
    typeof (HTMLScriptElement as unknown as { supports?: (type: string) => boolean }).supports ===
      'function' &&
    (HTMLScriptElement as unknown as { supports: (type: string) => boolean }).supports(
      'speculationrules',
    );

  const setup = speculationRulesSupported ? initSpeculationRules : initHoverFallback;

  // Defer until idle — this is a "make future navigation faster"
  // optimization, not something the current page's first render should
  // wait on or compete with.
  const win = window as Window & { requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number };
  if (typeof win.requestIdleCallback === 'function') {
    win.requestIdleCallback(setup, { timeout: 2000 });
  } else {
    window.setTimeout(setup, 200);
  }
}
