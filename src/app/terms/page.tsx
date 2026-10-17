import type { Metadata } from 'next'
import Link from 'next/link'
import { InfoPage } from '@/components/InfoPage'
import { site } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Terms of Use',
  description: 'The terms that apply when you use the CouponCrafty website.',
  alternates: { canonical: '/terms' },
}

export default function TermsPage() {
  return (
    <InfoPage title="Terms of Use" path="/terms" updated="2026-10-14" legal>
      <p>By using {site.name}, you agree to these terms. If you don’t agree, please don’t use the site.</p>
      <h2>Offers are provided by retailers</h2>
      <p>
        Coupons and deals are created and controlled by retailers, who may change or end them at any time. We try to
        keep information accurate but can’t guarantee that an offer will work, be available or apply to your order.
        Always confirm the price and terms on the retailer’s site before buying.
      </p>
      <h2>Purchases</h2>
      <p>
        {site.name} doesn’t sell products. Purchases, payments, shipping, returns and customer service are handled by
        the retailer under its own terms.
      </p>
      <h2>Acceptable use</h2>
      <ul>
        <li>Don’t use automated tools to copy large parts of the site.</li>
        <li>Don’t attempt to interfere with the site’s security or operation.</li>
        <li>Don’t submit false or misleading information about offers.</li>
      </ul>
      <h2>Intellectual property</h2>
      <p>
        Site content and design belong to {site.name}. Retailer names and trademarks belong to their owners and are used
        only to identify them.
      </p>
      <h2>Disclaimer</h2>
      <p>
        The site is provided “as is”, without warranties of any kind, to the fullest extent permitted by law. See also our{' '}
        <Link href="/affiliate-disclosure">affiliate disclosure</Link> and <Link href="/privacy">privacy policy</Link>.
      </p>
    </InfoPage>
  )
}
