import type { Metadata } from 'next'
import Link from 'next/link'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { EmptyState, OfferGrid, PageIntro } from '@/components/ui'
import { getExclusiveOffers } from '@/lib/queries'

export const revalidate = 3600

export const metadata: Metadata = {
  title: 'Exclusive Coupon Codes & Offers',
  description: 'Offers arranged directly between CouponCrafty and retailers, with clear terms and end dates.',
  alternates: { canonical: '/exclusive' },
}

export default function ExclusivePage() {
  const offers = getExclusiveOffers()
  return (
    <div className="container-page pt-6 sm:pt-8">
      <Breadcrumbs items={[{ name: 'Exclusive Offers', href: '/exclusive' }]} />
      <PageIntro title="Exclusive Offers">
        An offer is labeled exclusive only when it has been arranged directly with the retailer for CouponCrafty
        readers. You won’t see the label on offers that are publicly available elsewhere.
      </PageIntro>
      <div className="mt-8">
        {offers.length ? (
          <OfferGrid offers={offers} />
        ) : (
          <EmptyState title="No exclusive offers right now">
            We’ll list exclusive offers here when we have them. Meanwhile, browse{' '}
            <Link href="/coupons/trending" className="link">
              trending deals
            </Link>
            .
          </EmptyState>
        )}
      </div>
    </div>
  )
}
