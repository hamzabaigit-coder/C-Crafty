import type { Metadata } from 'next'
import { InfoPage } from '@/components/InfoPage'
import { site } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'How CouponCrafty collects, uses and protects information about visitors.',
  alternates: { canonical: '/privacy' },
}

export default function PrivacyPage() {
  return (
    <InfoPage title="Privacy Policy" path="/privacy" updated="2026-10-14" legal>
      <p>
        This policy describes the information {site.name} collects when you use couponcrafty.com and how it is used.
      </p>
      <h2>Information we collect</h2>
      <ul>
        <li>
          <strong>Information you send us</strong>, such as the content of emails you send to our contact address.
        </li>
        <li>
          <strong>Technical information</strong> that web servers receive automatically, such as IP address, browser
          type and pages requested, which may be kept in server logs.
        </li>
        <li>
          <strong>Affiliate tracking.</strong> When you click a retailer link, the retailer or affiliate network may set
          cookies to attribute a purchase to our site. Their use of that data is governed by their own privacy
          policies.
        </li>
      </ul>
      <p>
        {site.name} does not currently offer user accounts, newsletters or analytics. If any of these are added, this
        policy will be updated before they go live.
      </p>
      <h2>How we use information</h2>
      <ul>
        <li>To operate, secure and improve the website.</li>
        <li>To respond to messages you send us.</li>
        <li>To receive commissions from affiliate partners.</li>
      </ul>
      <h2>Your choices</h2>
      <p>
        You can block or delete cookies in your browser settings. Depending on your state of residence, you may have
        additional rights to access or delete personal information; contact us at{' '}
        <a href={`mailto:${site.contactEmail}`}>{site.contactEmail}</a> to make a request.
      </p>
      <h2>Children</h2>
      <p>This website is not directed to children under 13, and we do not knowingly collect their information.</p>
    </InfoPage>
  )
}
