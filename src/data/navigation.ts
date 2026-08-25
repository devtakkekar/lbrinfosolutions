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
          href: `${BASE_PATH}src/pages/postgres-pro/index.html`,
          logo: `${BASE_PATH}logos/PostgresPro_logo.svg`,
        },
        {
          label: 'RHEL',
          href: `${BASE_PATH}src/pages/rhel/index.html`,
          logo: `${BASE_PATH}logos/redhat.svg`,
        },
        {
          label: 'Infinidat',
          href: `${BASE_PATH}src/pages/infinidat/index.html`,
          logo: `${BASE_PATH}logos/lenovo_infinidat.svg`,
        },
        {
          label: 'HPE',
          href: `${BASE_PATH}src/pages/hpe/index.html`,
          logo: `${BASE_PATH}logos/hpe.svg`,
        },
        {
          label: 'Cloudian',
          href: `${BASE_PATH}src/pages/cloudian/index.html`,
          logo: `${BASE_PATH}logos/cloudian.svg`,
        },
        /* Only shows major products 
        {
          label: 'VisionLabs AI',
          href: '/src/pages/visionlabs-ai/index.html',
          description: '',
          badge: '',
        },
        {
          label: 'Yubico',
          href: '/src/pages/yubico/index.html',
          description: '',
          badge: '',
        },
        */
      ],
    },
  },
  {
    label: 'About',
    href: `${BASE_PATH}src/pages/about/index.html`,
  },
  {
    label: 'Blog',
    href: `${BASE_PATH}src/pages/blog/index.html`,
  },
  {
    label :'Career',
    href: `${BASE_PATH}src/pages/career/index.html`,
  },
  {
    label: 'Contact',
    href: `${BASE_PATH}src/pages/contact/index.html`,
  },
];

export const footerColumns: FooterColumn[] = [
  {
    title: 'Products',
    links: [
      { label: 'Postgres Pro', href: `${BASE_PATH}src/pages/postgres-pro/index.html` },
      { label: 'RHEL', href: `${BASE_PATH}src/pages/rhel/index.html` },
      { label: 'Infinidat', href: `${BASE_PATH}src/pages/infinidat/index.html` },
      { label: 'HPE', href: `${BASE_PATH}src/pages/hpe/index.html` },
      { label: 'Cloudian', href: `${BASE_PATH}src/pages/cloudian/index.html` },
      /* 
      { label: 'VisionLabs AI', href: '/src/pages/visionlabs-ai/index.html' },
      { label: 'Yubico', href: '/src/pages/yubico/index.html' },
      */
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About Us', href: `${BASE_PATH}src/pages/about/index.html` },
      { label: 'Blog', href: `${BASE_PATH}src/pages/blog/index.html` },
      { label: 'Contact', href: `${BASE_PATH}src/pages/contact/index.html` },
      { label: 'All Products', href: `${BASE_PATH}src/pages/products/index.html` },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Privacy Policy', href: `${BASE_PATH}src/pages/privacy/index.html` },
      { label: 'Terms & Conditions', href: `${BASE_PATH}src/pages/terms/index.html` },
      { label: 'Cookie Policy', href: `${BASE_PATH}src/pages/cookies/index.html` },
    ],
  },
];
