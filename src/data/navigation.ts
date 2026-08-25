/**
 * Navigation Data
 * Defines all nav items, dropdowns, and footer columns
 */

import type { NavItem, FooterColumn } from '../types/navigation';
import { BASE_PATH } from '../config/base-path';

export const mainNavItems: NavItem[] = [
  {
    label: 'Home',
    href: BASE_PATH,
  },
  {
    label: 'Products',
    dropdown: {
      label: 'Products',
      items: [
        {
          label: 'Postgres Pro',
          href: `${BASE_PATH}src/pages/postgres-pro/`,
          logo: `${BASE_PATH}src/assets/logos/PostgresPro_logo.svg`,
        },
        {
          label: 'RHEL',
          href: `${BASE_PATH}src/pages/rhel/`,
          logo: `${BASE_PATH}src/assets/logos/redhat.svg`,
        },
        {
          label: 'Infinidat',
          href: `${BASE_PATH}src/pages/infinidat/`,
          logo: `${BASE_PATH}src/assets/logos/lenovo_infinidat.svg`,
        },
        {
          label: 'HPE',
          href: `${BASE_PATH}src/pages/hpe/`,
          logo: `${BASE_PATH}src/assets/logos/hpe.svg`,
        },
        {
          label: 'Cloudian',
          href: `${BASE_PATH}src/pages/cloudian/`,
          logo: `${BASE_PATH}src/assets/logos/cloudian.svg`,
        },
        /* Only shows major products 
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
    href: `${BASE_PATH}src/pages/about/`,
  },
  {
    label: 'Blog',
    href: `${BASE_PATH}src/pages/blog/`,
  },
  {
    label :'Career',
    href: `${BASE_PATH}src/pages/career/`,
  },
  {
    label: 'Contact',
    href: `${BASE_PATH}src/pages/contact/`,
  },
];

export const footerColumns: FooterColumn[] = [
  {
    title: 'Products',
    links: [
      { label: 'Postgres Pro', href: `${BASE_PATH}src/pages/postgres-pro/` },
      { label: 'RHEL', href: `${BASE_PATH}src/pages/rhel/` },
      { label: 'Infinidat', href: `${BASE_PATH}src/pages/infinidat/` },
      { label: 'HPE', href: `${BASE_PATH}src/pages/hpe/` },
      { label: 'Cloudian', href: `${BASE_PATH}src/pages/cloudian/` },
      /* 
      { label: 'VisionLabs AI', href: '/src/pages/visionlabs-ai/' },
      { label: 'Yubico', href: '/src/pages/yubico/' },
      */
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About Us', href: `${BASE_PATH}src/pages/about/` },
      { label: 'Blog', href: `${BASE_PATH}src/pages/blog/` },
      { label: 'Contact', href: `${BASE_PATH}src/pages/contact/` },
      { label: 'All Products', href: `${BASE_PATH}src/pages/products/` },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Privacy Policy', href: `${BASE_PATH}src/pages/privacy/` },
      { label: 'Terms & Conditions', href: `${BASE_PATH}src/pages/terms/` },
      { label: 'Cookie Policy', href: `${BASE_PATH}src/pages/cookies/` },
    ],
  },
];
