import { NextResponse, type NextRequest } from 'next/server'
import { getStore, search, storeOfferCounts, type SearchType } from '@/lib/queries'
import { plural } from '@/lib/format'

const TYPES: SearchType[] = ['all', 'stores', 'coupons', 'blog']

/** Lightweight suggestions for the header search box. */
export function GET(req: NextRequest) {
  const q = (req.nextUrl.searchParams.get('q') ?? '').slice(0, 80)
  const t = req.nextUrl.searchParams.get('type') as SearchType
  const type = TYPES.includes(t) ? t : 'all'
  const r = search(q, type)

  const suggestions = [
    ...r.stores.slice(0, 5).map((s) => ({
      kind: 'store' as const,
      label: `${s.name} coupons`,
      meta: plural(storeOfferCounts(s.slug).total, 'offer'),
      href: `/stores/${s.slug}`,
    })),
    ...r.offers.slice(0, 5).map((o) => ({
      kind: 'offer' as const,
      label: `${o.highlight} ${o.title}`,
      meta: getStore(o.storeSlug)?.name,
      href: `/stores/${o.storeSlug}#${o.id}`,
    })),
    ...r.posts.slice(0, 3).map((p) => ({
      kind: 'post' as const,
      label: p.title,
      meta: 'Blog',
      href: `/blog/${p.slug}`,
    })),
  ]

  return NextResponse.json(
    { suggestions },
    { headers: { 'Cache-Control': 'public, max-age=60', 'X-Robots-Tag': 'noindex' } },
  )
}
