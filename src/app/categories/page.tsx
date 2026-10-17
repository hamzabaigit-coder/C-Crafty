import type { Metadata } from 'next'
import Link from 'next/link'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { OfferArt } from '@/components/OfferArt'
import { PageIntro } from '@/components/ui'
import { plural } from '@/lib/format'
import { getCategories, getOffersByCategory, getStoresByCategory } from '@/lib/queries'

export const revalidate = 3600

export const metadata: Metadata = {
  title: 'Shopping Categories: Coupons & Deals by Category',
  description:
    'Browse coupons and deals by category — electronics, fashion, home, travel, food delivery, beauty, software and more.',
  alternates: { canonical: '/categories' },
}

export default function CategoriesPage() {
  return (
    <div className="container-page pt-6 sm:pt-8">
      <Breadcrumbs items={[{ name: 'Categories', href: '/categories' }]} />
      <PageIntro title="Shop by Category">
        Each category brings together the stores we cover, their current offers and practical tips for saving in
        that part of your budget.
      </PageIntro>
      <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {getCategories().map((c) => {
          const stores = getStoresByCategory(c.slug)
          const offers = getOffersByCategory(c.slug)
          return (
            <li key={c.slug}>
              <Link
                href={`/categories/${c.slug}`}
                className="group block h-full overflow-hidden rounded-2xl border border-line bg-white shadow-card transition hover:shadow-lift"
              >
                <OfferArt theme={c.slug} accent="#008A2E" className="aspect-[16/6]" />
                <div className="p-5">
                  <h2 className="text-lg font-extrabold text-ink group-hover:text-brand-700">{c.name}</h2>
                  <p className="mt-1 text-sm text-ink-soft">{c.tagline}</p>
                  <p className="mt-3 text-xs font-semibold text-muted">
                    {plural(stores.length, 'store')} · {plural(offers.length, 'active offer')}
                  </p>
                </div>
              </Link>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
