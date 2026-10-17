import type { Metadata } from 'next'
import Link from 'next/link'
import { InfoPage } from '@/components/InfoPage'

export const metadata: Metadata = {
  title: 'Affiliate Disclosure',
  description: 'How CouponCrafty earns money through affiliate links and what that means for you.',
  alternates: { canonical: '/affiliate-disclosure' },
}

export default function AffiliateDisclosurePage() {
  return (
    <InfoPage title="Affiliate Disclosure" path="/affiliate-disclosure" updated="2026-10-14" legal>
      <p>
        CouponCrafty is supported by affiliate commissions. When you click a link to a retailer on our site and make a
        purchase, we may receive a commission from that retailer or from an affiliate network acting on its behalf.
      </p>
      <h2>What this means for you</h2>
      <ul>
        <li>You don’t pay more. Commissions are paid by the retailer, not added to your price.</li>
        <li>Not every link earns a commission, and we list offers from stores that don’t pay us.</li>
        <li>Commissions don’t determine whether an offer is labeled verified or exclusive.</li>
      </ul>
      <h2>No endorsement</h2>
      <p>
        Store names and trademarks are used to identify retailers. Unless a page says otherwise, CouponCrafty is not
        affiliated with, sponsored by or endorsed by the retailers we list.
      </p>
      <p>
        This disclosure is provided in line with the US Federal Trade Commission’s guidance on endorsements. Questions?{' '}
        <Link href="/contact">Contact us</Link>.
      </p>
    </InfoPage>
  )
}
