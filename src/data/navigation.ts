/**
 * Navigation Data
 * Defines all nav items, dropdowns, and footer columns
 */

import type { NavItem, FooterColumn } from '../types/navigation';

export const mainNavItems: NavItem[] = [
  {
    label: 'Home',
    href: '/',
  },
  {
    label: 'Products',
    dropdown: {
      label: 'Products',
      items: [
        {
          label: 'Postgres Pro',
          href: '/src/pages/postgres-pro/',
          description: 'Enterprise PostgreSQL Database',
          badge: 'Database',
        },
        {
          label: 'Infinidat',
          href: '/src/pages/infinidat/',
          description: 'Enterprise Data Storage & Protection',
          badge: 'Storage',
        },
        {
          label: 'VAST Data',
          href: '/src/pages/vast-data/',
          description: 'AI-Powered Data Platform',
          badge: 'Storage',
        },
        {
          label: 'Hammerspace',
          href: '/src/pages/hammerspace/',
          description: 'Global Data Orchestration',
          badge: 'Data Orchestration',
        },
        {
          label: 'Alinom',
          href: '/src/pages/alinom/',
          description: 'IT Infrastructure Monitoring',
          badge: 'Monitoring',
        },
        {
          label: 'VisionLabs AI',
          href: '/src/pages/visionlabs-ai/',
          description: 'Computer Vision & Biometrics',
          badge: 'AI & Vision',
        },
      ],
    },
  },
  {
    label: 'About',
    href: '/src/pages/about/',
  },
  {
    label: 'Contact',
    href: '/src/pages/contact/',
  },
];

export const footerColumns: FooterColumn[] = [
  {
    title: 'Products',
    links: [
      { label: 'Postgres Pro', href: '/src/pages/postgres-pro/' },
      { label: 'Infinidat', href: '/src/pages/infinidat/' },
      { label: 'VAST Data', href: '/src/pages/vast-data/' },
      { label: 'Hammerspace', href: '/src/pages/hammerspace/' },
      { label: 'Alinom', href: '/src/pages/alinom/' },
      { label: 'VisionLabs AI', href: '/src/pages/visionlabs-ai/' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About Us', href: '/src/pages/about/' },
      { label: 'Contact', href: '/src/pages/contact/' },
      { label: 'All Products', href: '/src/pages/products/' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Privacy Policy', href: '/src/pages/privacy/' },
      { label: 'Terms & Conditions', href: '/src/pages/terms/' },
      { label: 'Cookie Policy', href: '/src/pages/cookies/' },
    ],
  },
];
