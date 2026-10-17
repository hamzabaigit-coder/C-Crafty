import { CalendarClock, Lightbulb } from 'lucide-react'
import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { EmptyState, OfferGrid, PageIntro, SectionHeader } from '@/components/ui'
import { getOffersBySeason, getSeason, getSeasons } from '@/lib/queries'

export const revalidate = 3600
export const dynamicParams = false

export function generateStaticParams() {
  return getSeasons().map((s) => ({ slug: s.slug }))
}

export async function generateMetadata(props: PageProps<'/seasonal/[slug]'>): Promise<Metadata> {
  const { slug } = await props.params
  const s = getSeason(slug)
  if (!s) return {}
  return {
    title: `${s.name} Deals & Coupons 2026`,
    description: `${s.name} 2026 (${s.when}): current coupons and deals from US retailers, plus tips for shopping the sales.`,
    alternates: { canonical: `/seasonal/${slug}` },
  }
}

export default async function SeasonPage(props: PageProps<'/seasonal/[slug]'>) {
  const { slug } = await props.params
  const season = getSeason(slug)
  if (!season) notFound()
  const offers = getOffersBySeason(season.slug)

  return (
    <div className="container-page space-y-12 pt-6 sm:pt-8">
      <div>
        <Breadcrumbs
          items={[
            { name: 'Seasonal Deals', href: '/seasonal' },
            { name: season.name, href: `/seasonal/${season.slug}` },
          ]}
        />
        <PageIntro
          title={`${season.name} Deals & Coupons 2026`}
          eyebrow={
            <p className="mt-3 inline-flex items-center gap-2 rounded-full bg-brand-50 px-3 py-1 text-sm font-semibold text-brand-700">
              <CalendarClock className="size-4" aria-hidden="true" />
              {season.when}
            </p>
          }
        >
          {season.intro}
        </PageIntro>
      </div>
      <section aria-labelledby="offers">
        <SectionHeader id="offers" title={`${season.name} offers`} />
        {offers.length ? (
          <OfferGrid offers={offers} />
        ) : (
          <EmptyState title={`No ${season.name} offers yet`}>
            Retailers usually announce their offers closer to the event. Meanwhile, see{' '}
            <Link href="/coupons/trending" className="link">
              trending deals
            </Link>
            .
          </EmptyState>
        )}
      </section>
      <section aria-labelledby="tips" className="rounded-3xl bg-surface p-6 sm:p-8">
        <h2 id="tips" className="section-title flex items-center gap-2">
          <Lightbulb className="size-6 text-brand" aria-hidden="true" />
          {season.name} shopping tips
        </h2>
        <ul className="mt-4 space-y-3">
          {season.tips.map((t) => (
            <li key={t} className="rounded-xl bg-white p-4 text-[15px] leading-6 text-ink-soft shadow-card">
              {t}
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}
