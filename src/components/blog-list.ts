/**
 * Blog List Component
 * Renders blog post cards from src/data/blog.ts into a container element.
 * Runs in the browser (unlike navbar.ts/footer.ts, which build partial
 * HTML in a Node build-time context) — see src/pages/blog/index.html for
 * how it's invoked.
 *
 * Each card's image area is wired up separately by
 * src/components/blog-gallery.ts once this function has finished
 * inserting the markup into the DOM.
 */

import type { BlogPost } from '../types/blog';

/** Minimal HTML-escaping for text interpolated into template strings. */
function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function buildImageFrame(post: BlogPost): string {
  const slides = post.images
    .map(
      (src, index) => `
        <img
          src="${escapeHtml(src)}"
          alt="${escapeHtml(post.title)}"
          class="blog-image-slide absolute inset-0 w-full h-full object-cover${index === 0 ? ' is-active' : ''}"
          data-blog-slide
          loading="lazy"
          decoding="async"
        />`
    )
    .join('');

  const zoomButton = `
        <button
          type="button"
          class="absolute inset-0 flex items-center justify-center bg-navy/0 group-hover:bg-navy/30 opacity-0 group-hover:opacity-100 transition-all duration-200"
          data-blog-zoom-trigger
          aria-label="View larger images for ${escapeHtml(post.title)}"
        >
          <span class="w-10 h-10 rounded-full bg-white/90 flex items-center justify-center text-navy shadow-lg">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M4 8V5a1 1 0 011-1h3M20 8V5a1 1 0 00-1-1h-3M4 16v3a1 1 0 001 1h3M20 16v3a1 1 0 01-1 1h-3"/>
            </svg>
          </span>
        </button>`;

  return `
      <div
        class="blog-image-frame group relative w-full sm:w-[220px] md:w-[240px] aspect-[4/3] sm:aspect-square flex-shrink-0 rounded-xl overflow-hidden bg-navy/40"
        data-blog-frame
        data-blog-title="${escapeHtml(post.title)}"
      >${slides}${zoomButton}
      </div>`;
}

function buildCard(post: BlogPost): string {
  // NOTE: intentionally not wrapped in an <a> — clicking a post doesn't
  // navigate anywhere yet. `post.id` is a slug reserved for a future
  // `/src/pages/blog/${post.id}/` page; once that exists, wrap this
  // <article> (or just the title) in an <a href="..."> and nothing else
  // here needs to change.
  return `
    <article class="blog-post animate-on-scroll flex flex-col sm:flex-row gap-6 sm:gap-8 py-10 border-b border-white/10 last:border-0" data-blog-post>${buildImageFrame(post)}
      <div class="blog-post-content flex-1 min-w-0 sm:pt-1">
        <p class="text-blue-accent text-xs font-medium mb-2">${escapeHtml(post.date)}</p>
        <h3 class="text-lg md:text-xl font-semibold text-white mb-3 leading-snug">${escapeHtml(post.title)}</h3>
        <p class="text-sm text-gray-400 leading-relaxed">${escapeHtml(post.excerpt)}</p>
      </div>
    </article>`;
}

export function renderBlogList(containerId: string, posts: BlogPost[]): void {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = posts.map(buildCard).join('');
}
