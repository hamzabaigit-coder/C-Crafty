import { Lightbulb } from 'lucide-react'
import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { EmptyState, OfferGrid, PageIntro, SectionHeader, StoreGrid } from '@/components/ui'
import { getCategories, getCategory, getOffersByCategory, getStoresByCategory } from '@/lib/queries'

export const revalidate = 3600
export const dynamicParams = false

export function generateStaticParams() {
  // Only categories with at least one store get a landing page (no thin pages).
  return getCategories()
    .filter((c) => getStoresByCategory(c.slug).length > 0)
    .map((c) => ({ slug: c.slug }))
}

export async function generateMetadata(props: PageProps<'/categories/[slug]'>): Promise<Metadata> {
  const { slug } = await props.params
  const c = getCategory(slug)
  if (!c) return {}
  const examples = getStoresByCategory(c.slug)
    .slice(0, 3)
    .map((s) => s.name)
    .join(', ')
  return {
    title: `${c.name} Coupons, Promo Codes & Deals`,
    description: `${c.name} coupons and deals from stores like ${examples}. ${c.tagline}.`,
    alternates: { canonical: `/categories/${slug}` },
  }
}

export default async function CategoryPage(props: PageProps<'/categories/[slug]'>) {
  const { slug } = await props.params
  const category = getCategory(slug)
  if (!category) notFound()
  const stores = getStoresByCategory(category.slug)
  const offers = getOffersByCategory(category.slug)
  const others = getCategories().filter((c) => c.slug !== category.slug)

  return (
    <div className="container-page space-y-12 pt-6 sm:pt-8">
      <div>
        <Breadcrumbs
          items={[
            { name: 'Categories', href: '/categories' },
            { name: category.name, href: `/categories/${category.slug}` },
          ]}
        />
        <PageIntro title={`${category.name} Coupons & Deals`}>{category.intro}</PageIntro>
      </div>

      <section aria-labelledby="stores">
        <SectionHeader id="stores" title={`${category.name} stores`} />
        <StoreGrid stores={stores} />
      </section>

      <section aria-labelledby="offers">
        <SectionHeader id="offers" title={`Current ${category.name.toLowerCase()} offers`} />
        {offers.length ? (
          <OfferGrid offers={offers} showArt={false} />
        ) : (
          <EmptyState title="No active offers in this category right now">
            Check the store pages above — new offers are added regularly.
          </EmptyState>
        )}
      </section>

      <section aria-labelledby="tips" className="rounded-3xl bg-surface p-6 sm:p-8">
        <h2 id="tips" className="section-title flex items-center gap-2">
          <Lightbulb className="size-6 text-brand" aria-hidden="true" />
          Ways to save on {category.name.toLowerCase()}
        </h2>
        <ul className="mt-4 grid gap-3 md:grid-cols-2">
          {category.tips.map((t) => (
            <li key={t} className="rounded-xl bg-white p-4 text-[15px] leading-6 text-ink-soft shadow-card">
              {t}
            </li>
          ))}
        </ul>
      </section>

      <nav aria-labelledby="more-cats">
        <h2 id="more-cats" className="section-title mb-4">
          More categories
        </h2>
        <ul className="flex flex-wrap gap-2">
          {others.map((c) => (
            <li key={c.slug}>
              <Link
                href={`/categories/${c.slug}`}
                className="inline-block rounded-full bg-brand-50 px-3.5 py-2 text-sm font-semibold text-brand-700 hover:bg-brand-100"
              >
                {c.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  )
}
