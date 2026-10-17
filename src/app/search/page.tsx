import type { Metadata } from 'next'
import Link from 'next/link'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { BlogCard, EmptyState, OfferGrid, PageIntro, SectionHeader, StoreGrid, StorePills } from '@/components/ui'
import { plural } from '@/lib/format'
import { getPopularStores, search, type SearchType } from '@/lib/queries'

export const metadata: Metadata = {
  title: 'Search',
  robots: { index: false, follow: true },
}

const TYPES: SearchType[] = ['all', 'stores', 'coupons', 'blog']

export default async function SearchPage(props: PageProps<'/search'>) {
  const sp = await props.searchParams
  const q = (typeof sp.q === 'string' ? sp.q : '').trim().slice(0, 80)
  const type = TYPES.includes(sp.type as SearchType) ? (sp.type as SearchType) : 'all'
  const r = search(q, type)
  const total = r.stores.length + r.offers.length + r.posts.length

  return (
    <div className="container-page pt-6 sm:pt-8">
      <Breadcrumbs items={[{ name: 'Search', href: '/search' }]} />
      <PageIntro title={q ? `Results for “${q}”` : 'Search CouponCrafty'}>
        {q ? `${plural(total, 'result')}${type !== 'all' ? ` in ${type}` : ''}.` : 'Search for a store, product type or offer.'}
      </PageIntro>

      {q && (
        <nav aria-label="Filter results" className="mt-6 flex flex-wrap gap-2">
          {TYPES.map((t) => (
            <Link
              key={t}
              href={`/search?q=${encodeURIComponent(q)}&type=${t}`}
              aria-current={t === type ? 'page' : undefined}
              className={`rounded-full border px-3.5 py-1.5 text-sm font-semibold capitalize ${
                t === type ? 'border-ink bg-ink text-white' : 'border-line text-ink hover:border-brand hover:text-brand-700'
              }`}
            >
              {t}
            </Link>
          ))}
        </nav>
      )}

      <div className="mt-10 space-y-14">
        {q && total === 0 && (
          <EmptyState title={`No results for “${q}”`}>
            Check the spelling or try a shorter search, such as a store name. You can also browse{' '}
            <Link href="/stores" className="link">
              all stores
            </Link>{' '}
            or{' '}
            <Link href="/categories" className="link">
              categories
            </Link>
            .
          </EmptyState>
        )}
        {r.stores.length > 0 && (
          <section aria-labelledby="r-stores">
            <SectionHeader id="r-stores" title="Stores" />
            <StoreGrid stores={r.stores} />
          </section>
        )}
        {r.offers.length > 0 && (
          <section aria-labelledby="r-offers">
            <SectionHeader id="r-offers" title="Coupons & deals" />
            <OfferGrid offers={r.offers} showArt={false} />
          </section>
        )}
        {r.posts.length > 0 && (
          <section aria-labelledby="r-posts">
            <SectionHeader id="r-posts" title="Articles" />
            <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {r.posts.map((p) => (
                <li key={p.slug}>
                  <BlogCard post={p} />
                </li>
              ))}
            </ul>
          </section>
        )}
        {(!q || total === 0) && (
          <section aria-labelledby="popular">
            <SectionHeader id="popular" title="Popular stores" />
            <StorePills stores={getPopularStores()} />
          </section>
        )}
      </div>
    </div>
  )
}
