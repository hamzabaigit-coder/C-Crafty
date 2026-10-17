import type { Metadata } from 'next'
import Link from 'next/link'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { OfferCard } from '@/components/offer/OfferCard'
import { OfferFilter } from '@/components/offer/OfferFilter'
import { PageIntro } from '@/components/ui'
import { getActiveOffers, getCategories, getStore } from '@/lib/queries'
import { collectionMeta } from './collections'

export const revalidate = 3600

export const metadata: Metadata = {
  title: 'All Coupons, Promo Codes & Online Deals',
  description:
    'Every active promo code and online deal on CouponCrafty, with filters for codes, deals and shopping category.',
  alternates: { canonical: '/coupons' },
}

export default function CouponsPage() {
  const offers = getActiveOffers().sort((a, b) => b.addedAt.localeCompare(a.addedAt))
  const meta = offers.map((o) => ({ type: o.type, categories: getStore(o.storeSlug)?.categories ?? [] }))
  return (
    <div className="container-page pt-6 sm:pt-8">
      <Breadcrumbs items={[{ name: 'Coupons', href: '/coupons' }]} />
      <PageIntro title="All Coupons & Deals">
        Every active offer on CouponCrafty, newest first. Filter by codes or deals and by category.
      </PageIntro>
      <nav aria-label="Coupon collections" className="mt-6 flex flex-wrap gap-2">
        {Object.entries(collectionMeta).map(([slug, c]) => (
          <Link
            key={slug}
            href={`/coupons/${slug}`}
            className="rounded-full border border-line px-3.5 py-1.5 text-sm font-semibold text-ink hover:border-brand hover:text-brand-700"
          >
            {c.nav}
          </Link>
        ))}
      </nav>
      <div className="mt-8">
        <OfferFilter meta={meta} categories={getCategories().map((c) => ({ slug: c.slug, name: c.name }))}>
          {offers.map((o, i) => (
            <li key={o.id} data-type={o.type} data-cats={meta[i].categories.join(' ')}>
              <OfferCard offer={o} showArt={false} />
            </li>
          ))}
        </OfferFilter>
      </div>
    </div>
  )
}
