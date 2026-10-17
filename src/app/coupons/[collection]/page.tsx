import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { EmptyState, OfferGrid, PageIntro } from '@/components/ui'
import { getCollection, type OfferCollection } from '@/lib/queries'
import { collectionMeta } from '../collections'

export const revalidate = 3600
export const dynamicParams = false

const isCollection = (s: string): s is OfferCollection => s in collectionMeta

export function generateStaticParams() {
  return Object.keys(collectionMeta).map((collection) => ({ collection }))
}

export async function generateMetadata(props: PageProps<'/coupons/[collection]'>): Promise<Metadata> {
  const { collection } = await props.params
  if (!isCollection(collection)) return {}
  const m = collectionMeta[collection]
  return { title: m.title, description: m.description, alternates: { canonical: `/coupons/${collection}` } }
}

export default async function CollectionPage(props: PageProps<'/coupons/[collection]'>) {
  const { collection } = await props.params
  if (!isCollection(collection)) notFound()
  const m = collectionMeta[collection]
  const offers = getCollection(collection)

  return (
    <div className="container-page pt-6 sm:pt-8">
      <Breadcrumbs
        items={[
          { name: 'Coupons', href: '/coupons' },
          { name: m.h1, href: `/coupons/${collection}` },
        ]}
      />
      <PageIntro title={m.h1}>{m.intro}</PageIntro>
      <nav aria-label="Coupon collections" className="mt-6 flex flex-wrap gap-2">
        {Object.entries(collectionMeta).map(([slug, c]) => (
          <Link
            key={slug}
            href={`/coupons/${slug}`}
            aria-current={slug === collection ? 'page' : undefined}
            className={`rounded-full border px-3.5 py-1.5 text-sm font-semibold ${
              slug === collection
                ? 'border-ink bg-ink text-white'
                : 'border-line text-ink hover:border-brand hover:text-brand-700'
            }`}
          >
            {c.nav}
          </Link>
        ))}
      </nav>
      <div className="mt-8">
        {offers.length ? (
          <OfferGrid offers={offers} showArt={false} />
        ) : (
          <EmptyState title="Nothing here right now">
            There are no offers in this list at the moment. Browse{' '}
            <Link href="/coupons" className="link">
              all coupons
            </Link>{' '}
            instead.
          </EmptyState>
        )}
      </div>
    </div>
  )
}
