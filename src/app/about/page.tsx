import type { Metadata } from 'next'
import Link from 'next/link'
import { InfoPage } from '@/components/InfoPage'

export const metadata: Metadata = {
  title: 'About Us',
  description: 'What CouponCrafty is, how the site works and how it is funded.',
  alternates: { canonical: '/about' },
}

export default function AboutPage() {
  return (
    <InfoPage title="About CouponCrafty" path="/about" updated="2026-10-14">
      <p>
        CouponCrafty is a coupon and deals website for shoppers in the United States. We collect promo codes and
        online deals from retailers and present them with the details that matter: what the discount is, who can use
        it, when it ends and how to apply it.
      </p>
      <h2>What we aim to do</h2>
      <ul>
        <li>Show clear terms and end dates instead of vague “up to” promises.</li>
        <li>Label offers honestly — “verified” only after a real test, with the date.</li>
        <li>Move expired offers out of the way instead of leaving them mixed in with active ones.</li>
        <li>Publish practical, original guides that help you save even when there’s no code.</li>
      </ul>
      <h2>How we’re funded</h2>
      <p>
        Some links on CouponCrafty are affiliate links. When you buy something after clicking one, the retailer may pay
        us a commission. It doesn’t change your price. Read our full <Link href="/affiliate-disclosure">affiliate
        disclosure</Link> and <Link href="/how-we-verify">how we check offers</Link>.
      </p>
      <h2>Get in touch</h2>
      <p>
        Found a code that doesn’t work, or want to suggest a store? <Link href="/contact">Contact us</Link>.
      </p>
    </InfoPage>
  )
}
