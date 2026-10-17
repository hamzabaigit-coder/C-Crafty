import { ChevronDown, ChevronRight } from 'lucide-react'
import Link from 'next/link'
import type { ReactNode } from 'react'
import { formatDate, plural } from '@/lib/format'
import { storeOfferCounts } from '@/lib/queries'
import type { BlogPost, Faq, Offer, Store } from '@/lib/types'
import { OfferArt } from './OfferArt'
import { StoreLogo } from './StoreLogo'
import { OfferCard } from './offer/OfferCard'

export function SectionHeader({
  title,
  href,
  linkLabel = 'See all',
  id,
  children,
}: {
  title: string
  href?: string
  linkLabel?: string
  id?: string
  children?: ReactNode
}) {
  return (
    <div className="mb-5 flex items-end justify-between gap-4">
      <div>
        <h2 id={id} className="section-title flex items-center gap-2.5">
          <span className="h-6 w-1.5 shrink-0 rounded-full bg-brand" aria-hidden="true" />
          {title}
        </h2>
        {children && <p className="mt-1 pl-4 text-sm text-muted">{children}</p>}
      </div>
      {href && (
        <Link
          href={href}
          className="inline-flex shrink-0 items-center gap-0.5 rounded-full bg-brand-50 px-3.5 py-1.5 text-sm font-bold text-brand-700 hover:bg-brand-100"
        >
          {linkLabel}
          <ChevronRight className="size-4" aria-hidden="true" />
        </Link>
      )}
    </div>
  )
}

export function OfferGrid({ offers, showArt = true }: { offers: Offer[]; showArt?: boolean }) {
  return (
    <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
      {offers.map((o) => (
        <li key={o.id}>
          <OfferCard offer={o} showArt={showArt} />
        </li>
      ))}
    </ul>
  )
}

export function StoreTile({ store }: { store: Store }) {
  const n = storeOfferCounts(store.slug).total
  return (
    <Link
      href={`/stores/${store.slug}`}
      className="group flex flex-col items-center gap-2.5 rounded-2xl border border-line bg-white p-4 text-center shadow-card transition hover:-translate-y-0.5 hover:border-brand-200 hover:shadow-lift"
    >
      <StoreLogo store={store} size="md" />
      <span className="text-sm font-bold text-ink group-hover:text-brand-700">{store.name}</span>
      <span className="-mt-1.5 text-xs text-muted">{n ? plural(n, 'offer') : 'No active offers'}</span>
    </Link>
  )
}

export function StoreGrid({ stores }: { stores: Store[] }) {
  return (
    <ul className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8">
      {stores.map((s) => (
        <li key={s.slug}>
          <StoreTile store={s} />
        </li>
      ))}
    </ul>
  )
}

export function StorePills({ stores }: { stores: Store[] }) {
  return (
    <ul className="flex flex-wrap gap-2">
      {stores.map((s) => (
        <li key={s.slug}>
          <Link
            href={`/stores/${s.slug}`}
            className="inline-block rounded-lg border border-line bg-white px-3.5 py-2 text-sm font-semibold text-ink hover:border-brand hover:text-brand-700"
          >
            {s.name}
          </Link>
        </li>
      ))}
    </ul>
  )
}

export function BlogCard({ post, headingLevel = 'h3' }: { post: BlogPost; headingLevel?: 'h2' | 'h3' }) {
  const Heading = headingLevel
  return (
    <article className="group relative flex h-full flex-col">
      <OfferArt theme={post.theme} accent="#008A2E" className="aspect-[16/9] rounded-2xl border border-line" />
      <Heading className="mt-4 text-lg font-extrabold leading-snug text-ink group-hover:text-brand-700">
        <Link href={`/blog/${post.slug}`} className="after:absolute after:inset-0 after:content-['']">
          {post.title}
        </Link>
      </Heading>
      <p className="mt-2 line-clamp-3 text-[15px] leading-6 text-ink-soft">{post.excerpt}</p>
      <div className="mt-auto flex items-center justify-between pt-4 text-[13px] text-muted">
        <span>By {post.author}</span>
        <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
      </div>
      <span className="mt-2 text-sm font-bold text-brand-600 group-hover:underline" aria-hidden="true">
        Read more →
      </span>
    </article>
  )
}

export function FaqList({ faqs }: { faqs: Faq[] }) {
  return (
    <div className="divide-y divide-line rounded-2xl border border-line bg-white">
      {faqs.map((f) => (
        <details key={f.question} className="group px-5 py-1">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-4 text-base font-bold text-ink [&::-webkit-details-marker]:hidden">
            <h3>{f.question}</h3>
            <ChevronDown className="size-5 shrink-0 text-muted transition-transform group-open:rotate-180" aria-hidden="true" />
          </summary>
          <p className="pb-5 text-[15px] leading-7 text-ink-soft">{f.answer}</p>
        </details>
      ))}
    </div>
  )
}

export function PageIntro({ title, children, eyebrow }: { title: string; children?: ReactNode; eyebrow?: ReactNode }) {
  return (
    <div className="max-w-3xl">
      {eyebrow}
      <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">{title}</h1>
      {children && <div className="mt-3 text-base leading-7 text-ink-soft sm:text-lg">{children}</div>}
    </div>
  )
}

export function EmptyState({ title, children }: { title: string; children?: ReactNode }) {
  return (
    <div className="rounded-2xl border border-dashed border-line bg-surface px-6 py-12 text-center">
      <p className="text-lg font-bold text-ink">{title}</p>
      {children && <div className="mx-auto mt-2 max-w-md text-sm leading-6 text-muted">{children}</div>}
    </div>
  )
}
