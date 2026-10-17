import { CalendarDays, ExternalLink, Info } from 'lucide-react'
import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { StoreLogo } from '@/components/StoreLogo'
import { OfferRow } from '@/components/offer/OfferRow'
import { OfferTabs } from '@/components/store/OfferTabs'
import { BlogCard, EmptyState, FaqList, StorePills } from '@/components/ui'
import { formatLongDate, formatMonthYear, plural } from '@/lib/format'
import {
  getCategory,
  getPostsForStore,
  getRelatedStores,
  getStore,
  getStoreOffers,
  getStores,
  storeLastUpdated,
} from '@/lib/queries'

export const revalidate = 3600
export const dynamicParams = false

export function generateStaticParams() {
  return getStores().map((s) => ({ slug: s.slug }))
}

export async function generateMetadata(props: PageProps<'/stores/[slug]'>): Promise<Metadata> {
  const { slug } = await props.params
  const store = getStore(slug)
  if (!store) return {}
  const { active } = getStoreOffers(slug)
  const codes = active.filter((o) => o.type === 'code').length
  const title = `${store.name} Promo Codes & Coupons — ${formatMonthYear(storeLastUpdated(store))}`
  const description = `${plural(active.length, 'current offer')} for ${store.name}${
    codes ? `, including ${plural(codes, 'promo code')}` : ''
  }. ${store.summary}`
  return {
    title,
    description,
    alternates: { canonical: `/stores/${slug}` },
    openGraph: { title, description, url: `/stores/${slug}`, type: 'website' },
  }
}

export default async function StorePage(props: PageProps<'/stores/[slug]'>) {
  const { slug } = await props.params
  const store = getStore(slug)
  if (!store) notFound()

  const { active, expired } = getStoreOffers(slug)
  const counts = {
    all: active.length,
    code: active.filter((o) => o.type === 'code').length,
    deal: active.filter((o) => o.type === 'deal').length,
  }
  const updated = storeLastUpdated(store)
  const primaryCategory = getCategory(store.categories[0])
  const related = getRelatedStores(store, 8)
  const posts = getPostsForStore(slug).slice(0, 3)

  return (
    <div className="container-page pt-6 sm:pt-8">
      <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_300px] lg:gap-12">
        <div className="min-w-0">
          <div className="flex items-start gap-4 sm:gap-6">
            <div className="rounded-2xl border border-line bg-white p-2 shadow-card">
              <StoreLogo store={store} size="lg" />
            </div>
            <div className="min-w-0 pt-1">
              <Breadcrumbs
                items={[
                  { name: 'Stores', href: '/stores' },
                  ...(primaryCategory ? [{ name: primaryCategory.name, href: `/categories/${primaryCategory.slug}` }] : []),
                  { name: store.name, href: `/stores/${store.slug}` },
                ]}
              />
              <h1 className="mt-2 text-2xl font-extrabold leading-tight tracking-tight text-ink sm:text-[2.1rem]">
                {store.name} Promo Codes &amp; Coupons
              </h1>
              <p className="mt-2 text-sm text-muted">
                {[
                  plural(counts.all, 'active offer'),
                  counts.code > 0 && plural(counts.code, 'code'),
                  counts.deal > 0 && plural(counts.deal, 'deal'),
                ]
                  .filter(Boolean)
                  .join(' · ')}
                {' · '}Updated <time dateTime={updated}>{formatLongDate(updated)}</time>
              </p>
              {/* Kept next to the offers (not only in the sidebar) so the disclosure is seen before any click, incl. on mobile. */}
              <p className="mt-1.5 text-xs leading-5 text-muted">
                We may earn a commission from links on this page. Not affiliated with {store.name}.{' '}
                <Link href="/affiliate-disclosure" className="underline hover:text-ink">
                  Disclosure
                </Link>
              </p>
            </div>
          </div>

          <div className="mt-8">
            {active.length > 0 ? (
              <OfferTabs counts={counts}>
                {active.map((o) => (
                  <li key={o.id} data-type={o.type}>
                    <OfferRow offer={o} store={store} />
                  </li>
                ))}
              </OfferTabs>
            ) : (
              <EmptyState title={`No active ${store.name} offers right now`}>
                We add new offers as soon as we find them. In the meantime, browse{' '}
                <Link href="/stores" className="link">
                  other stores
                </Link>
                .
              </EmptyState>
            )}
          </div>

          <section aria-labelledby="how-to" className="mt-12">
            <h2 id="how-to" className="section-title">
              How to use {/^[aeiou]/i.test(store.name) ? 'an' : 'a'} {store.name} promo code
            </h2>
            <ol className="mt-4 space-y-3">
              {store.howToRedeem.map((step, i) => (
                <li key={i} className="flex gap-3 text-[15px] leading-7 text-ink-soft">
                  <span className="grid size-7 shrink-0 place-items-center rounded-full bg-brand text-sm font-bold text-white">
                    {i + 1}
                  </span>
                  <span className="pt-0.5">{step}</span>
                </li>
              ))}
            </ol>
          </section>

          <section aria-labelledby="faq" className="mt-12">
            <h2 id="faq" className="section-title mb-4">
              {store.name} coupon FAQs
            </h2>
            <FaqList faqs={store.faqs} />
          </section>

          {expired.length > 0 && (
            <section aria-labelledby="expired" className="mt-12">
              <h2 id="expired" className="section-title">
                Recently expired {store.name} offers
              </h2>
              <p className="mt-1 text-sm text-muted">
                These offers have passed their end date and probably won’t work. They’re kept here for reference.
              </p>
              <ul className="mt-4 grid gap-4">
                {expired.map((o) => (
                  <li key={o.id}>
                    <OfferRow offer={o} store={store} />
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>

        <aside className="space-y-8 lg:pt-2" aria-label={`About ${store.name}`}>
          <section>
            <h2 className="text-lg font-extrabold text-ink">About {store.name}</h2>
            {store.about.map((p, i) => (
              <p key={i} className="mt-3 text-[15px] leading-7 text-ink-soft">
                {p}
              </p>
            ))}
            <ul className="mt-5 space-y-3 text-sm">
              <li>
                <a
                  href={store.url}
                  target="_blank"
                  rel="noopener nofollow"
                  className="inline-flex items-center gap-2 font-semibold text-ink hover:text-brand-700 hover:underline"
                >
                  <ExternalLink className="size-4 text-muted" aria-hidden="true" />
                  {store.domain}
                </a>
              </li>
              <li className="flex items-center gap-2 text-ink-soft">
                <CalendarDays className="size-4 text-muted" aria-hidden="true" />
                Last updated <time dateTime={updated}>{formatLongDate(updated)}</time>
              </li>
            </ul>
            <p className="mt-5 flex gap-2 rounded-xl bg-surface p-3 text-xs leading-5 text-muted">
              <Info className="mt-0.5 size-3.5 shrink-0" aria-hidden="true" />
              <span>
                CouponCrafty may earn a commission when you shop through links on this page. We are not affiliated
                with or endorsed by {store.name}.{' '}
                <Link href="/affiliate-disclosure" className="underline hover:text-ink">
                  Learn more
                </Link>
              </span>
            </p>
          </section>

          <section>
            <h2 className="text-base font-extrabold text-ink">Shop by category</h2>
            <ul className="mt-3 flex flex-wrap gap-2">
              {store.categories.map((c) => {
                const cat = getCategory(c)
                return cat ? (
                  <li key={c}>
                    <Link
                      href={`/categories/${c}`}
                      className="inline-block rounded-full bg-brand-50 px-3 py-1.5 text-sm font-semibold text-brand-700 hover:bg-brand-100"
                    >
                      {cat.name}
                    </Link>
                  </li>
                ) : null
              })}
            </ul>
          </section>

          {related.length > 0 && (
            <section>
              <h2 className="text-base font-extrabold text-ink">Related stores</h2>
              <div className="mt-3">
                <StorePills stores={related} />
              </div>
            </section>
          )}
        </aside>
      </div>

      {posts.length > 0 && (
        <section aria-labelledby="guides" className="mt-16">
          <h2 id="guides" className="section-title mb-5">
            Savings guides for {store.name} shoppers
          </h2>
          <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((p) => (
              <li key={p.slug}>
                <BlogCard post={p} />
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  )
}
