export const site = {
  name: 'CouponCrafty',
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://couponcrafty.com').replace(/\/$/, ''),
  tagline: 'Promo codes, coupons and deals for US shoppers',
  description:
    'CouponCrafty collects promo codes, coupons and online deals from popular US retailers, with clear terms, expiry dates and step-by-step instructions for using each offer.',
  /** TODO: replace with a mailbox that actually exists before launch. */
  contactEmail: 'hello@couponcrafty.com',
  /**
   * True while the store catalog contains sample offers. Shows a site-wide
   * notice so demo codes are never mistaken for real, working offers.
   */
  demoMode: true,
  /** Legal pages are starting templates until reviewed by counsel. */
  legalDraft: true,
} as const

export function absoluteUrl(path = '/') {
  return `${site.url}${path.startsWith('/') ? path : `/${path}`}`
}
