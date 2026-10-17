import type { Metadata } from 'next'
import Link from 'next/link'
import { InfoPage } from '@/components/InfoPage'

export const metadata: Metadata = {
  title: 'How We Check Offers (Editorial Policy)',
  description:
    'How CouponCrafty sources coupons, what “verified” means, how expiry dates are handled and how affiliate relationships affect what we publish.',
  alternates: { canonical: '/how-we-verify' },
}

export default function HowWeVerifyPage() {
  return (
    <InfoPage title="How We Check Offers" path="/how-we-verify" updated="2026-10-14">
      <p>
        This page explains where our offers come from and what each label on CouponCrafty means, so you can judge how
        much to rely on an offer before you use it.
      </p>
      <h2>Where offers come from</h2>
      <ul>
        <li>Promotions published by retailers on their own websites, emails and apps.</li>
        <li>Offers supplied by affiliate networks on behalf of retailers.</li>
        <li>Offers sent to us directly by retailers.</li>
        <li>Reports from shoppers, which we check before publishing.</li>
      </ul>
      <h2>What the labels mean</h2>
      <ul>
        <li>
          <strong>Verified (with a date):</strong> a member of our team applied the code or opened the deal on the
          retailer’s site on that date and saw the discount. Offers can stop working after a test, so the date matters.
        </li>
        <li>
          <strong>No verified badge:</strong> the offer comes from a source listed above but we haven’t tested it
          ourselves yet.
        </li>
        <li>
          <strong>Ends / days left:</strong> the end date published by the retailer. If no end date is shown, the
          retailer didn’t publish one.
        </li>
        <li>
          <strong>Exclusive:</strong> arranged directly with the retailer for CouponCrafty readers.
        </li>
        <li>
          <strong>Editor’s pick:</strong> chosen by our editors as broadly useful. It is not based on payments from
          retailers.
        </li>
        <li>
          <strong>Demo offer:</strong> sample content used while the site is being built. It is not a real promotion.
        </li>
      </ul>
      <h2>Expired offers</h2>
      <p>
        Offers past their end date are automatically removed from listings and the homepage. On store pages they are
        moved to a separate “recently expired” section and clearly labeled, so you can still see past offer history.
      </p>
      <h2>Affiliate relationships</h2>
      <p>
        We may earn a commission from some retailers. Commission rates don’t decide whether an offer is published or
        labeled verified. See our <Link href="/affiliate-disclosure">affiliate disclosure</Link>.
      </p>
      <h2>Corrections</h2>
      <p>
        If an offer is wrong or no longer works, please <Link href="/contact">let us know</Link> and we’ll review it.
      </p>
    </InfoPage>
  )
}
