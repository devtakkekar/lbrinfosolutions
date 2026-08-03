/**
 * Blog post data shape.
 *
 * `id` is a URL-friendly slug. It isn't linked to a route yet (the blog
 * list intentionally doesn't navigate anywhere on click today), but it's
 * kept ready so an individual post page can be added later at
 * `/src/pages/blog/${id}/` without having to touch this data model.
 */
export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  /** Display date, e.g. "Jul 15, 2026". Free-form on purpose — no date parsing/sorting is assumed. */
  date: string;
  /**
   * One or more images. A single image renders as a static photo. Two or
   * more automatically enables the auto-rotating gallery (see
   * blog-gallery.ts) with hover-to-zoom and a manual-navigation lightbox.
   */
  images: string[];
}
