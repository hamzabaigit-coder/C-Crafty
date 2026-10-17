import type { Metadata } from 'next'
import Link from 'next/link'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { OfferArt } from '@/components/OfferArt'
import { BlogCard, EmptyState, PageIntro } from '@/components/ui'
import { formatDate } from '@/lib/format'
import { getPosts } from '@/lib/queries'

export const metadata: Metadata = {
  title: 'Shopping Tips & Savings Guides',
  description:
    'Practical guides to using coupon codes, shopping seasonal sales and saving on delivery, travel and everyday purchases in the US.',
  alternates: { canonical: '/blog' },
}

export default function BlogPage() {
  const [featured, ...rest] = getPosts()
  return (
    <div className="container-page pt-6 sm:pt-8">
      <Breadcrumbs items={[{ name: 'Blog', href: '/blog' }]} />
      <PageIntro title="Shopping Tips & Savings Guides">
        Straightforward advice on finding coupon codes, shopping sales and comparing stores — written by the
        CouponCrafty editorial team.
      </PageIntro>

      {!featured ? (
        <div className="mt-8">
          <EmptyState title="No articles yet" />
        </div>
      ) : (
        <>
          <article className="group relative mt-8 grid overflow-hidden rounded-3xl border border-line bg-white shadow-card md:grid-cols-2">
            <OfferArt theme={featured.theme} accent="#008A2E" className="aspect-[16/9] md:aspect-auto md:min-h-80" />
            <div className="flex flex-col justify-center p-6 sm:p-10">
              <p className="text-sm font-bold uppercase tracking-wider text-brand-600">Latest guide</p>
              <h2 className="mt-2 text-2xl font-extrabold leading-tight text-ink group-hover:text-brand-700 sm:text-3xl">
                <Link href={`/blog/${featured.slug}`} className="after:absolute after:inset-0 after:content-['']">
                  {featured.title}
                </Link>
              </h2>
              <p className="mt-3 text-[15px] leading-7 text-ink-soft">{featured.excerpt}</p>
              <p className="mt-5 text-sm text-muted">
                By {featured.author} · <time dateTime={featured.publishedAt}>{formatDate(featured.publishedAt)}</time>{' '}
                · {featured.readingMinutes} min read
              </p>
            </div>
          </article>
          <ul className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {rest.map((p) => (
              <li key={p.slug}>
                <BlogCard post={p} headingLevel="h2" />
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  )
}
