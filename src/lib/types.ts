export type CategorySlug =
  | 'electronics'
  | 'fashion'
  | 'home-garden'
  | 'travel'
  | 'food-delivery'
  | 'beauty'
  | 'software-vpn'
  | 'sports-outdoors'
  | 'entertainment'
  | 'education'

export interface Category {
  slug: CategorySlug
  name: string
  /** Short line used on cards and in menus. */
  tagline: string
  /** Original intro copy for the category landing page. */
  intro: string
  /** Practical, category-specific saving tips. */
  tips: string[]
}

export interface Faq {
  question: string
  answer: string
}

export interface Store {
  slug: string
  name: string
  /** Display domain, e.g. "amazon.com". */
  domain: string
  /** Retailer homepage. Used as the outbound fallback when no tracked link exists. */
  url: string
  /**
   * Tracked affiliate link for the store, once an affiliate program is approved.
   * Leave undefined until a real link exists — never put placeholder IDs here.
   */
  affiliateUrl?: string
  /** Brand color for the monogram logo tile. */
  brandColor: string
  /** Text color used on top of brandColor. */
  brandText: string
  /**
   * Short wordmark rendered in the logo tile (text, not the retailer's
   * trademarked logo artwork). Swap for licensed logo files if you obtain them.
   */
  logoText: string
  categories: CategorySlug[]
  popular: boolean
  /** One-sentence summary used in meta descriptions and cards. */
  summary: string
  /** Longer original description shown on the store page. */
  about: string[]
  /** Store-specific redemption steps. */
  howToRedeem: string[]
  faqs: Faq[]
  /** ISO date the store page content was last reviewed. */
  updatedAt: string
}

export type OfferType = 'code' | 'deal'

export interface Offer {
  id: string
  storeSlug: string
  type: OfferType
  /** Emphasized part of the headline, e.g. "20% Off". */
  highlight: string
  /** Rest of the headline, e.g. "sitewide orders over $50". */
  title: string
  description: string
  /** Restrictions and fine print. */
  terms?: string
  /** Coupon code. Required for type "code"; a code offer without one is shown as unavailable. */
  code?: string
  /** Landing page for this offer on the retailer site (falls back to the store URL). */
  url?: string
  /** Tracked affiliate link for this specific offer, once one exists. */
  affiliateUrl?: string
  /** Numeric value used for "best discounts" sorting (percent or dollars). */
  discountValue?: number
  discountUnit?: 'percent' | 'dollars'
  /** ISO date. Undefined means no published end date. */
  expiresAt?: string
  /** ISO date the code was last confirmed working. Only set after a real test. */
  verifiedAt?: string
  addedAt: string
  /** Editorial pick for "Today's Popular Deals" and the hero. */
  featured?: boolean
  /** Only true when an exclusive arrangement with the retailer actually exists. */
  exclusive?: boolean
  seasons?: SeasonSlug[]
  /** Sample content for development — rendered with a visible "Demo" label. */
  demo: boolean
}

export type SeasonSlug = 'halloween' | 'black-friday' | 'cyber-monday' | 'holiday-gifts'

export interface Season {
  slug: SeasonSlug
  name: string
  /** Human readable timing, e.g. "Friday, November 27, 2026". */
  when: string
  intro: string
  tips: string[]
}

export type BlogBlock =
  | { type: 'p'; text: string }
  | { type: 'h2'; text: string; id?: string }
  | { type: 'h3'; text: string }
  | { type: 'ul'; items: string[] }
  | { type: 'ol'; items: string[] }
  | { type: 'tip'; text: string }

export interface BlogPost {
  slug: string
  title: string
  description: string
  excerpt: string
  /** Art theme for the generated featured image. */
  theme: CategorySlug
  imageAlt: string
  author: string
  publishedAt: string
  updatedAt: string
  readingMinutes: number
  tags: string[]
  relatedStores: string[]
  body: BlogBlock[]
}
