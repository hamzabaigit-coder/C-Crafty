import Link from 'next/link'
import { getCategories, getPopularStores, getPosts } from '@/lib/queries'
import { site } from '@/lib/site'
import { Logo } from './Logo'

function Col({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  return (
    <div>
      <h2 className="text-sm font-extrabold uppercase tracking-wider text-ink">{title}</h2>
      <ul className="mt-4 space-y-2.5">
        {links.map((l) => (
          <li key={l.href}>
            <Link href={l.href} className="text-sm text-ink-soft hover:text-brand-700 hover:underline">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="mt-20 border-t border-line bg-surface">
      <div className="container-page grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr_1fr]">
        <div className="sm:col-span-2 lg:col-span-1">
          <Logo />
          <p className="mt-4 max-w-xs text-sm leading-6 text-ink-soft">
            CouponCrafty helps US shoppers find promo codes and deals from popular retailers, with clear terms and
            end dates on every offer.
          </p>
          <p className="mt-4 max-w-xs text-xs leading-5 text-muted">
            We may earn a commission when you buy through links on our site, at no extra cost to you.{' '}
            <Link href="/affiliate-disclosure" className="underline hover:text-ink">
              Learn more
            </Link>
            .
          </p>
        </div>
        <Col
          title="Popular Stores"
          links={[
            ...getPopularStores()
              .slice(0, 6)
              .map((s) => ({ label: `${s.name} coupons`, href: `/stores/${s.slug}` })),
            { label: 'All stores A–Z', href: '/stores' },
          ]}
        />
        <Col
          title="Categories"
          links={[
            ...getCategories()
              .slice(0, 6)
              .map((c) => ({ label: c.name, href: `/categories/${c.slug}` })),
            { label: 'All categories', href: '/categories' },
          ]}
        />
        <Col
          title="Savings Guides"
          links={[
            ...getPosts()
              .slice(0, 4)
              .map((p) => ({ label: p.title.split(':')[0].replace(/\s*\(.*\)$/, ''), href: `/blog/${p.slug}` })),
            { label: 'All articles', href: '/blog' },
            { label: 'Seasonal deals', href: '/seasonal' },
          ]}
        />
        <Col
          title="CouponCrafty"
          links={[
            { label: 'About us', href: '/about' },
            { label: 'Contact us', href: '/contact' },
            { label: 'How we check offers', href: '/how-we-verify' },
            { label: 'Affiliate disclosure', href: '/affiliate-disclosure' },
            { label: 'Privacy policy', href: '/privacy' },
            { label: 'Terms of use', href: '/terms' },
          ]}
        />
      </div>
      <div className="border-t border-line">
        <div className="container-page flex flex-col gap-2 py-5 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {site.name}. All rights reserved.
          </p>
          <p>Store names and trademarks belong to their respective owners and are used for identification only.</p>
        </div>
      </div>
    </footer>
  )
}
