/**
 * Site-wide configuration
 * Central source of truth for metadata, URLs, and global settings
 */

export const siteConfig = {
  name: 'LBR InfoSolutions',
  tagline: 'Enterprise Technology Solutions',
  description: 'LBR InfoSolutions delivers disruptive enterprise technology solutions in database infrastructure, storage, AI, and data orchestration for modern workloads.',
  url: 'https://www.lbrinfosolutions.com',
  locale: 'en_US',

  contact: {
    address: 'C 704, Country Park, Dattapada Road, Borivali (E), Mumbai, India',
    email: 'info@lbrinfosolutions.com',
    phone: '+91-22-XXXX-XXXX',
  },

  social: {
    linkedin: 'https://www.linkedin.com/company/lbrinfosolutions',
    twitter: 'https://twitter.com/lbrinfosolutions',
  },

  meta: {
    ogImage: '/assets/images/og-default.jpg',
    twitterHandle: '@lbrinfosolutions',
  },

  footer: {
    copyright: `© ${new Date().getFullYear()} LBR InfoSolutions. All rights reserved.`,
  },
} as const;

export type SiteConfig = typeof siteConfig;
