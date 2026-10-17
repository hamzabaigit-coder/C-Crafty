export interface NavMenu {
  label: string
  href: string
}

export function buildNav(): NavMenu[] {
  return [
    { label: 'Coupons', href: '/coupons' },
    { label: 'Stores', href: '/stores' },
    { label: 'Categories', href: '/categories' },
    { label: 'Trending Deals', href: '/coupons/trending' },
    { label: 'Seasonal Deals', href: '/seasonal' },
    { label: 'Exclusive Offers', href: '/exclusive' },
    { label: 'Blog', href: '/blog' },
  ]
}
