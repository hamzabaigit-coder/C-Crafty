import { ogCard, ogSize } from '@/lib/og'
import { getPost, getPosts } from '@/lib/queries'

export const alt = 'CouponCrafty savings guide'
export const size = ogSize
export const contentType = 'image/png'

export function generateStaticParams() {
  return getPosts().map((p) => ({ slug: p.slug }))
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  return ogCard({ eyebrow: 'Savings Guide', title: getPost(slug)?.title ?? 'Shopping tips' })
}
