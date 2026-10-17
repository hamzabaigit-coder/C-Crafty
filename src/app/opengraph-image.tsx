import { ogCard, ogSize } from '@/lib/og'

export const alt = 'CouponCrafty - promo codes, coupons and deals for US shoppers'
export const size = ogSize
export const contentType = 'image/png'

export default function Image() {
  return ogCard({ eyebrow: 'Coupons & Deals', title: 'Promo codes and deals from top US stores' })
}
