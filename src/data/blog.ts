/**
 * Blog Posts Data
 *
 * This is the single place to add, edit, or remove blog posts — the blog
 * page (src/pages/blog/) renders entirely from this array via
 * src/components/blog-list.ts. No other file needs to change.
 *
 * To add a post: append an object to `blogPosts` below. `images` accepts
 * one path (a static photo) or several (renders as an auto-rotating
 * gallery with a zoom-to-lightbox interaction — see blog-gallery.ts).
 *
 * NOTE ON PLACEHOLDER IMAGES: the images below are simple generated
 * on-brand SVG graphics (src/assets/blog/), not licensed photography —
 * swap them for real images before this goes live. Any local image path
 * works; imports keep them fingerprinted/optimized by Vite the same way
 * the product logos are handled elsewhere in this codebase.
 */

import type { BlogPost } from '../types/blog';
import security1 from '../assets/blog/security-1.svg';
import storage1 from '../assets/blog/storage-1.svg';
import storage2 from '../assets/blog/storage-2.svg';
import storage3 from '../assets/blog/storage-3.svg';
import database1 from '../assets/blog/database-1.svg';

export const blogPosts: BlogPost[] = [
  {
    id: 'storage-infrastructure-modernization-signs',
    title: '5 Signs Your Storage Infrastructure Needs Modernizing',
    excerpt:
      'Aging storage rarely fails all at once — it shows up first as slow backups, capacity firefighting, and support contracts that keep getting more expensive. Here\'s what to look for before it becomes an outage.',
    date: 'Jul 15, 2026',
    images: [storage1, storage2, storage3],
  },
  {
    id: 'phishing-resistant-mfa-why-it-matters',
    title: 'Why Phishing-Resistant MFA Is No Longer Optional',
    excerpt:
      'SMS codes and push notifications stop casual attackers, not determined ones. A look at why hardware-backed, phishing-resistant authentication is quickly becoming the enterprise baseline rather than the exception.',
    date: 'Jun 28, 2026',
    images: [security1],
  },
  {
    id: 'postgresql-enterprise-scale-best-practices',
    title: 'Getting the Most Out of PostgreSQL at Enterprise Scale',
    excerpt:
      'PostgreSQL scales further than most teams assume, but only with the right operational discipline. Practical guidance on indexing, connection pooling, and high-availability patterns that hold up in production.',
    date: 'Jun 10, 2026',
    images: [database1],
  },
];
