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
    address: 'LBR InfoSolutions-102, Floor-1, Gumpha Darshan A&B, Chinchpada Road, Borivali (E), Mumbai, India - 400067',
    email: 'info@lbrinfosolutions.com',
    phone: '+91-9920892704',
  },

  social: {
    linkedin: 'https://www.linkedin.com/company/lbrinfosolutions',
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
