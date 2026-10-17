import type { Metadata } from 'next'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { StoreDirectory } from '@/components/store/StoreDirectory'
import { PageIntro, SectionHeader, StoreGrid } from '@/components/ui'
import { getPopularStores, getStores, storeOfferCounts } from '@/lib/queries'

export const revalidate = 3600

export const metadata: Metadata = {
  title: 'All Stores A–Z: Coupons & Promo Codes by Retailer',
  description:
    'Browse every store on CouponCrafty from A to Z. Find promo codes and deals from popular US retailers, with offer counts for each store.',
  alternates: { canonical: '/stores' },
}

export default function StoresPage() {
  const stores = getStores().map((s) => ({
    slug: s.slug,
    name: s.name,
    domain: s.domain,
    brandColor: s.brandColor,
    brandText: s.brandText,
    logoText: s.logoText,
    count: storeOfferCounts(s.slug).total,
  }))
  return (
    <div className="container-page space-y-12 pt-6 sm:pt-8">
      <div>
        <Breadcrumbs items={[{ name: 'Stores', href: '/stores' }]} />
        <PageIntro title="All Stores A–Z">
          Find coupons and deals by retailer. Every store page lists current promo codes and deals, how to use them,
          and answers to common questions.
        </PageIntro>
      </div>
      <section aria-labelledby="popular">
        <SectionHeader id="popular" title="Popular Stores" />
        <StoreGrid stores={getPopularStores()} />
      </section>
      <section aria-labelledby="directory">
        <SectionHeader id="directory" title="Store Directory" />
        <StoreDirectory stores={stores} />
      </section>
    </div>
  )
}
