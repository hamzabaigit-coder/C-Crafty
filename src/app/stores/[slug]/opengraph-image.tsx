import { ogCard, ogSize } from '@/lib/og'
import { getStore, getStores } from '@/lib/queries'

export const alt = 'Store promo codes and coupons on CouponCrafty'
export const size = ogSize
export const contentType = 'image/png'

export function generateStaticParams() {
  return getStores().map((s) => ({ slug: s.slug }))
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  return ogCard({ eyebrow: 'Promo Codes & Coupons', title: `${getStore(slug)?.name ?? 'Store'} coupons and deals` })
}
