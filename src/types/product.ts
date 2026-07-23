/**
 * Product Type Definitions
 * Shared interfaces for all product data throughout the site
 */

export interface ProductFeature {
  title: string;
  description: string;
  icon?: string;
}

export interface ProductBenefit {
  title: string;
  description: string;
}

export interface ProductUseCase {
  title: string;
  description: string;
  industries?: string[];
}

export interface ProductFAQ {
  question: string;
  answer: string;
}

export interface ProductEdition {
  name: string;
  description: string;
}

export interface Product {
  /** Unique identifier / URL slug */
  id: string;
  /** Display name */
  name: string;
  /** Short tagline for cards and hero */
  tagline: string;
  /** Brief description (1–2 sentences) for product cards */
  shortDescription: string;
  /** Extended overview (2–3 paragraphs) for product detail page */
  overview: string;
  /** Product category badge */
  category: ProductCategory;
  /** Path to product logo (relative to /src/assets/logos/) */
  logo?: string;
  /** Key features list */
  features: ProductFeature[];
  /** Business benefits */
  benefits: ProductBenefit[];
  /** Use cases with associated industries */
  useCases: ProductUseCase[];
  /** Target industries */
  industries: string[];
  /** Product editions or models (if applicable) */
  editions?: ProductEdition[];
  /** FAQ items */
  faq: ProductFAQ[];
  /** Official product website URL */
  officialUrl: string;
  /** Internal page path */
  pagePath: string;
  /** Whether this product is featured on homepage */
  featured: boolean;
  /** Display order */
  order: number;
}

export type ProductCategory =
  | 'Database'
  | 'Storage'
  | 'Data Orchestration'
  | 'Monitoring'
  | 'AI & Vision'
  | 'Security';

/** Minimal product data for cards and carousel */
export type ProductCard = Pick<
  Product,
  'id' | 'name' | 'tagline' | 'shortDescription' | 'category' | 'logo' | 'pagePath'
>;
