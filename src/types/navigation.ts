/**
 * Navigation Type Definitions
 * Structures for navbar, footer, and link hierarchy
 */

export interface NavLink {
  /** Display label */
  label: string;
  /** URL path */
  href: string;
  /** Whether this link opens in a new tab */
  external?: boolean;
  /** Optional ARIA label for accessibility */
  ariaLabel?: string;
}

export interface NavDropdownItem {
  /** Display label */
  label: string;
  /** URL path */
  href: string;
  /** Short description shown in mega-menu */
  description?: string;
  /** Category badge text */
  badge?: string;
}

export interface NavDropdown {
  /** Trigger label */
  label: string;
  /** Dropdown items */
  items: NavDropdownItem[];
}

export interface NavItem {
  /** Display label */
  label: string;
  /** URL path (if direct link) */
  href?: string;
  /** Dropdown content (if dropdown trigger) */
  dropdown?: NavDropdown;
  /** Whether this item is currently active */
  active?: boolean;
}

export interface FooterColumn {
  /** Column heading */
  title: string;
  /** Links in this column */
  links: NavLink[];
}

export interface BreadcrumbItem {
  label: string;
  href?: string;
  current?: boolean;
}
