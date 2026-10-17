import { CalendarClock } from 'lucide-react'
import type { Metadata } from 'next'
import Link from 'next/link'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { PageIntro } from '@/components/ui'
import { plural } from '@/lib/format'
import { getOffersBySeason, getSeasons } from '@/lib/queries'

export const revalidate = 3600

export const metadata: Metadata = {
  title: 'Seasonal Deals: Halloween, Black Friday, Cyber Monday & Holiday',
  description: 'Coupons and deals for upcoming US shopping events, with dates and practical tips for each one.',
  alternates: { canonical: '/seasonal' },
}

export default function SeasonalPage() {
  return (
    <div className="container-page pt-6 sm:pt-8">
      <Breadcrumbs items={[{ name: 'Seasonal Deals', href: '/seasonal' }]} />
      <PageIntro title="Seasonal Deals">
        Upcoming US shopping events, their dates, and the offers we’ve collected for each.
      </PageIntro>
      <ul className="mt-8 grid gap-5 sm:grid-cols-2">
        {getSeasons().map((s) => (
          <li key={s.slug}>
            <Link
              href={`/seasonal/${s.slug}`}
              className="group flex h-full flex-col rounded-2xl border border-line bg-gradient-to-br from-brand-50 to-white p-6 shadow-card hover:shadow-lift"
            >
              <span className="flex items-center gap-2 text-sm font-semibold text-muted">
                <CalendarClock className="size-4 text-brand" aria-hidden="true" />
                {s.when}
              </span>
              <h2 className="mt-2 text-2xl font-extrabold text-ink group-hover:text-brand-700">{s.name} Deals</h2>
              <p className="mt-2 line-clamp-3 text-[15px] leading-6 text-ink-soft">{s.intro}</p>
              <span className="mt-4 text-sm font-bold text-brand-600">
                {plural(getOffersBySeason(s.slug).length, 'offer')} →
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
