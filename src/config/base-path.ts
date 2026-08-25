/**
 * Single source of truth for the site's deployment base path.
 *
 * Every internal link, logo path, and asset reference in the codebase
 * should import BASE_PATH from here rather than hardcoding a path
 * prefix — that way switching hosts is a one-line change instead of a
 * repo-wide find-and-replace someone has to remember to do correctly
 * (and can easily miss a spot on).
 *
 * - GitHub Pages preview (current): '/lbrinfosolutions/'
 *   (the site is served at https://<user>.github.io/lbrinfosolutions/)
 * - GoDaddy / production (final): '/'
 *   (the site is served at the domain root, e.g. https://www.lbrinfosolutions.com/)
 *
 * When moving from the GH Pages preview to production, change the value
 * below to '/' and rebuild (`npm run build`) — nothing else needs to
 * change.
 */
export const BASE_PATH = '/';
