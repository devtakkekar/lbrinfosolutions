/**
 * Navigation Data
 * Defines all nav items, dropdowns, and footer columns
 */

import type { NavItem, FooterColumn } from '../types/navigation';

export const mainNavItems: NavItem[] = [
  {
    label: 'Home',
    href: '/lbrinfosolutions/',
  },
  {
    label: 'Products',
    dropdown: {
      label: 'Products',
      items: [
        {
          label: 'Postgres Pro',
          href: '/lbrinfosolutions/src/pages/postgres-pro/',
          logo: '/lbrinfosolutions/src/assets/logos/PostgresPro_logo.svg',
        },
        {
          label: 'RHEL',
          href: '/lbrinfosolutions/src/pages/rhel/',
          logo: '/lbrinfosolutions/src/assets/logos/redhat.svg',
        },
        {
          label: 'Infinidat',
          href: '/lbrinfosolutions/src/pages/infinidat/',
          logo: '/lbrinfosolutions/src/assets/logos/lenovo_infinidat.svg',
        },
        {
          label: 'HPE',
          href: '/lbrinfosolutions/src/pages/hpe/',
          logo: '/lbrinfosolutions/src/assets/logos/hpe.svg',
        },
        {
          label: 'Cloudian',
          href: '/lbrinfosolutions/src/pages/cloudian/',
          logo: '/lbrinfosolutions/src/assets/logos/cloudian.svg',
        },
        /* Only shows major products 
        {
          label: 'VAST Data',
          href: '/src/pages/vast-data/',
          description: '',
          badge: '',
        },
        {
          label: 'Hammerspace',
          href: '/src/pages/hammerspace/',
          description: '',
          badge: '',
        },
        {
          label: 'VisionLabs AI',
          href: '/src/pages/visionlabs-ai/',
          description: '',
          badge: '',
        },
        {
          label: 'Yubico',
          href: '/src/pages/yubico/',
          description: '',
          badge: '',
        },
        */
      ],
    },
  },
  {
    label: 'About',
    href: '/lbrinfosolutions/src/pages/about/',
  },
  {
    label: 'Blog',
    href: '/lbrinfosolutions/src/pages/blog/',
  },
  {
    label :'Career',
    href: '/lbrinfosolutions/src/pages/career/',
  },
  {
    label: 'Contact',
    href: '/lbrinfosolutions/src/pages/contact/',
  },
];

export const footerColumns: FooterColumn[] = [
  {
    title: 'Products',
    links: [
      { label: 'Postgres Pro', href: '/lbrinfosolutions/src/pages/postgres-pro/' },
      { label: 'RHEL', href: '/lbrinfosolutions/src/pages/rhel/' },
      { label: 'Infinidat', href: '/lbrinfosolutions/src/pages/infinidat/' },
      { label: 'HPE', href: '/lbrinfosolutions/src/pages/hpe/' },
      { label: 'Cloudian', href: '/lbrinfosolutions/src/pages/cloudian/' },
      /* 
      { label: 'VAST Data', href: '/src/pages/vast-data/' },
      { label: 'Hammerspace', href: '/src/pages/hammerspace/' },
      { label: 'VisionLabs AI', href: '/src/pages/visionlabs-ai/' },
      { label: 'Yubico', href: '/src/pages/yubico/' },
      */
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About Us', href: '/lbrinfosolutions/src/pages/about/' },
      { label: 'Blog', href: '/lbrinfosolutions/src/pages/blog/' },
      { label: 'Contact', href: '/lbrinfosolutions/src/pages/contact/' },
      { label: 'All Products', href: '/lbrinfosolutions/src/pages/products/' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Privacy Policy', href: '/lbrinfosolutions/src/pages/privacy/' },
      { label: 'Terms & Conditions', href: '/lbrinfosolutions/src/pages/terms/' },
      { label: 'Cookie Policy', href: '/lbrinfosolutions/src/pages/cookies/' },
    ],
  },
];
