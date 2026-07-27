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
          description: '',
          badge: '',
        },
        {
          label: 'RHEL',
          href: '/src/pages/rhel/',
          description: '',
          badge: '',
        },
        {
          label: 'Infinidat',
          href: '/src/pages/infinidat/',
          description: '',
          badge: '',
        },
        {
          label: 'HPE',
          href: '/src/pages/hpe/',
          description: '',
          badge: '',
        },
        {
          label: 'Cloudian',
          href: '/src/pages/cloudian/',
          description: '',
          badge: '',
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
    href: '/src/pages/about/',
  },
  {
    label :'Career',
    href: '',
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
      { label: 'RHEL', href: '/src/pages/rhel/' },
      { label: 'Infinidat', href: '/src/pages/infinidat/' },
      { label: 'HPE', href: '/src/pages/hpe/' },
      { label: 'Cloudian', href: '/src/pages/cloudian/' },
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
