import type { Metadata } from 'next'
import { InfoPage } from '@/components/InfoPage'
import { site } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'How to contact CouponCrafty about an offer, a store or a partnership.',
  alternates: { canonical: '/contact' },
}

export default function ContactPage() {
  return (
    <InfoPage title="Contact Us" path="/contact">
      <p>
        We read every message. Email us at <a href={`mailto:${site.contactEmail}`}>{site.contactEmail}</a> and include
        as much detail as you can.
      </p>
      <h2>Reporting a coupon that doesn’t work</h2>
      <p>Please include:</p>
      <ul>
        <li>The store name and the offer headline or code.</li>
        <li>The error message you saw at checkout, if any.</li>
        <li>The date you tried it and roughly what was in your cart.</li>
      </ul>
      <h2>Retailers and affiliate partners</h2>
      <p>
        If you represent a retailer and want to correct store information or share an offer, email us from your
        company address with the details and terms of the promotion.
      </p>
    </InfoPage>
  )
}
