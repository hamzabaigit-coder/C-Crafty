import type { OfferCollection } from '@/lib/queries'

export const collectionMeta: Record<
  OfferCollection,
  { nav: string; title: string; h1: string; description: string; intro: string }
> = {
  trending: {
    nav: 'Trending',
    title: 'Trending Deals & Coupons Today',
    h1: 'Trending Deals',
    description: 'Editor-picked deals and the newest promo codes from popular US stores.',
    intro:
      'Our editors’ current picks, followed by the newest coupon codes. This list is curated by hand — it isn’t ranked by clicks or sales.',
  },
  'best-discounts': {
    nav: 'Best discounts',
    title: 'Today’s Best Discounts: Biggest Percent-Off Deals',
    h1: 'Today’s Best Discounts',
    description: 'Active offers sorted by the largest percentage discount advertised.',
    intro:
      'Active percent-off offers sorted from the largest advertised discount. “Up to” offers apply the top discount only to some items, so check the terms.',
  },
  new: {
    nav: 'Recently added',
    title: 'Recently Added Coupons & Deals',
    h1: 'Recently Added Coupons',
    description: 'The newest promo codes and deals added to CouponCrafty.',
    intro: 'The newest offers we’ve added, most recent first.',
  },
  'ending-soon': {
    nav: 'Ending soon',
    title: 'Coupons & Deals Ending Soon',
    h1: 'Ending Soon',
    description: 'Promo codes and deals that end within the next 14 days.',
    intro: 'Offers with a published end date in the next 14 days, soonest first.',
  },
  codes: {
    nav: 'Coupon codes',
    title: 'Promo Codes & Coupon Codes',
    h1: 'Coupon Codes',
    description: 'Active promo codes to enter at checkout, from popular US retailers.',
    intro: 'Offers that need a code at checkout. Click “Get Code” to copy it and open the store.',
  },
  deals: {
    nav: 'Online deals',
    title: 'Online Deals — No Code Needed',
    h1: 'Online Deals',
    description: 'Sales, bundles and free trials that apply automatically, with no code needed.',
    intro: 'Discounts that apply through the link — sale prices, bundles and trials. No code needed.',
  },
}
