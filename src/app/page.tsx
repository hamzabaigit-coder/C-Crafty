import { BadgeCheck, CalendarClock, ClipboardCheck, HandCoins, Search, Tag } from 'lucide-react'
import Link from 'next/link'
import { Hero } from '@/components/home/Hero'
import { CompactOffer } from '@/components/offer/CompactOffer'
import { BlogCard, FaqList, OfferGrid, SectionHeader, StoreGrid, StorePills } from '@/components/ui'
import { plural } from '@/lib/format'
import {
  createOfferPicker,
  getCategories,
  getCollection,
  getExclusiveOffers,
  getOffersBySeason,
  getPopularStores,
  getPosts,
  getSeasons,
  getStores,
} from '@/lib/queries'
import { site } from '@/lib/site'
import type { Faq } from '@/lib/types'

export const revalidate = 3600

const homeFaqs: Faq[] = [
  {
    question: 'Is CouponCrafty free to use?',
    answer:
      'Yes. Browsing offers, revealing codes and reading our guides is free and doesn’t require an account.',
  },
  {
    question: 'What is the difference between a coupon code and a deal?',
    answer:
      'A coupon code is a word or string of characters you enter at checkout to get a discount. A deal is a discount that applies automatically — such as a sale price or free trial — when you follow the link, with no code needed.',
  },
  {
    question: 'Why didn’t my promo code work?',
    answer:
      'The most common reasons are an expired code, a cart below the minimum spend, excluded items, a new-customer-only restriction, or another promotion already applied. Check the offer terms under “Details” and try another current offer from the same store.',
  },
  {
    question: 'How does CouponCrafty make money?',
    answer:
      'Some links on CouponCrafty are affiliate links. If you make a purchase after clicking one, the retailer may pay us a commission. This doesn’t change the price you pay.',
  },
  {
    question: 'What does “verified” mean on CouponCrafty?',
    answer:
      'An offer is marked verified only after our team has tested it on the retailer’s website, and the badge shows the date of that test. Offers without the badge have not been tested by us yet.',
  },
]

export default function HomePage() {
  const pick = createOfferPicker()
  const popular = pick(getCollection('trending').filter((o) => o.featured), 6)
  const trendingCodes = pick(getCollection('codes'), 6)
  const bestDiscounts = pick(getCollection('best-discounts'), 3)
  const endingSoon = pick(getCollection('ending-soon'), 3)
  const recent = pick(getCollection('new'), 6)
  const exclusive = pick(getExclusiveOffers(), 3, 3)
  const popularStores = getPopularStores()
  const seasons = getSeasons()
    .map((s) => ({ ...s, count: getOffersBySeason(s.slug).length }))
    .filter((s) => s.count > 0)
  const posts = getPosts().slice(0, 3)

  return (
    <>
      <div className="container-page pt-6 sm:pt-8">
        <h1 className="text-2xl font-extrabold tracking-tight text-ink sm:text-[1.75rem]">
          Promo Codes, Coupons &amp; Deals from Top US Stores
        </h1>
        <p className="mt-1 text-sm text-muted sm:text-[15px]">
          {plural(getStores().length, 'store')} · clear terms and end dates on every offer
        </p>
      </div>

      <Hero />

      <div className="container-page space-y-14 pt-10 sm:space-y-16">
        {popular.length > 0 && (
          <section aria-labelledby="popular-deals">
            <SectionHeader id="popular-deals" title="Today’s Popular Deals" href="/coupons/trending">
              Editor picks from stores US shoppers search for most
            </SectionHeader>
            <OfferGrid offers={popular} />
          </section>
        )}

        {trendingCodes.length > 1 && (
          <section aria-labelledby="trending-coupons">
            <SectionHeader id="trending-coupons" title="Trending Coupons" href="/coupons/codes" />
            <OfferGrid offers={trendingCodes} showArt={false} />
          </section>
        )}

        <div className="grid gap-14 lg:grid-cols-2 lg:gap-8">
          {bestDiscounts.length > 1 && (
            <section aria-labelledby="best-discounts">
              <SectionHeader id="best-discounts" title="Today’s Best Discounts" href="/coupons/best-discounts" />
              <ul className="grid gap-4">
                {bestDiscounts.map((o) => (
                  <li key={o.id}>
                    <CompactOffer offer={o} />
                  </li>
                ))}
              </ul>
            </section>
          )}
          {endingSoon.length > 1 && (
            <section aria-labelledby="ending-soon">
              <SectionHeader id="ending-soon" title="Ending Soon" href="/coupons/ending-soon" />
              <ul className="grid gap-4">
                {endingSoon.map((o) => (
                  <li key={o.id}>
                    <CompactOffer offer={o} />
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>

        {popularStores.length > 0 && (
          <section aria-labelledby="popular-stores">
            <SectionHeader id="popular-stores" title="Popular Stores" href="/stores" linkLabel="All stores" />
            <StoreGrid stores={popularStores.slice(0, 8)} />
          </section>
        )}

        {recent.length > 1 && (
          <section aria-labelledby="recently-added">
            <SectionHeader id="recently-added" title="Recently Added Coupons" href="/coupons/new" />
            <OfferGrid offers={recent} showArt={false} />
          </section>
        )}

        {exclusive.length > 0 && (
          <section aria-labelledby="exclusive">
            <SectionHeader id="exclusive" title="Exclusive Offers" href="/exclusive" />
            <OfferGrid offers={exclusive} />
          </section>
        )}

        {seasons.length > 0 && (
          <section aria-labelledby="seasonal">
            <SectionHeader id="seasonal" title="Seasonal Deals" href="/seasonal" />
            <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {seasons.map((s) => (
                <li key={s.slug}>
                  <Link
                    href={`/seasonal/${s.slug}`}
                    className="group flex h-full flex-col rounded-2xl border border-line bg-gradient-to-br from-brand-50 to-white p-5 shadow-card transition hover:border-brand-200 hover:shadow-lift"
                  >
                    <CalendarClock className="size-6 text-brand" aria-hidden="true" />
                    <span className="mt-3 text-lg font-extrabold text-ink group-hover:text-brand-700">{s.name}</span>
                    <span className="mt-0.5 text-sm text-muted">{s.when}</span>
                    <span className="mt-4 text-sm font-bold text-brand-600">{plural(s.count, 'offer')} →</span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}

        {posts.length > 0 && (
          <section aria-labelledby="blog">
            <SectionHeader id="blog" title="Shopping Tips & Savings Guides" href="/blog" />
            <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((p) => (
                <li key={p.slug}>
                  <BlogCard post={p} />
                </li>
              ))}
            </ul>
          </section>
        )}

        <section aria-labelledby="how-it-works" className="rounded-3xl bg-surface p-6 sm:p-10">
          <h2 id="how-it-works" className="section-title">
            How CouponCrafty Coupons Work
          </h2>
          <p className="mt-2 max-w-3xl text-[15px] leading-7 text-ink-soft">
            {site.name} collects promo codes and deals from US retailers and shows the terms, end date and redemption
            steps for each one, so you can decide quickly whether an offer fits your order.
          </p>
          <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <HowStep icon={Search} title="1. Find an offer">
              Search for a store or browse by category. Each store page lists its current codes and deals, with
              counts for each.
            </HowStep>
            <HowStep icon={Tag} title="2. Reveal and copy the code">
              Click “Get Code”. The code is copied for you and the store opens in a new tab. For deals, click “Get
              Deal” — the discount applies through the link, no code needed.
            </HowStep>
            <HowStep icon={ClipboardCheck} title="3. Apply it at checkout">
              Paste the code into the store’s promo or coupon field and confirm that the discount appears in the
              order summary before you pay.
            </HowStep>
            <HowStep icon={BadgeCheck} title="How offers are checked">
              We record when each offer was added and when it ends. A “Verified” badge appears only after an offer
              has been tested, with the test date. <Link href="/how-we-verify" className="link">Our process</Link>
            </HowStep>
            <HowStep icon={CalendarClock} title="Why offers have limits">
              Retailers set the rules: end dates, minimum spend, excluded brands and new-customer-only offers are
              common. Expired offers are labeled and moved below active ones.
            </HowStep>
            <HowStep icon={HandCoins} title="How we’re funded">
              Some links are affiliate links, so a retailer may pay us a commission if you buy. It never changes
              your price. <Link href="/affiliate-disclosure" className="link">Affiliate disclosure</Link>
            </HowStep>
          </div>
        </section>

        <section aria-labelledby="faq" className="grid gap-8 lg:grid-cols-[1fr_2fr]">
          <div>
            <h2 id="faq" className="section-title">
              Frequently Asked Questions
            </h2>
            <p className="mt-2 text-[15px] leading-7 text-ink-soft">
              Quick answers about using coupons on {site.name}. Still stuck?{' '}
              <Link href="/contact" className="link">
                Contact us
              </Link>
              .
            </p>
          </div>
          <FaqList faqs={homeFaqs} />
        </section>

        <section aria-labelledby="all-popular-stores">
          <SectionHeader id="all-popular-stores" title="Popular Stores at CouponCrafty" href="/stores" linkLabel="Stores A–Z" />
          <StorePills stores={getStores()} />
        </section>

        <section aria-labelledby="categories">
          <SectionHeader id="categories" title="Shop by Category" href="/categories" />
          <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
            {getCategories().map((c) => (
              <li key={c.slug}>
                <Link
                  href={`/categories/${c.slug}`}
                  className="block h-full rounded-xl border border-line bg-white p-4 hover:border-brand hover:shadow-card"
                >
                  <span className="block font-bold text-ink">{c.name}</span>
                  <span className="mt-1 block text-xs leading-5 text-muted">{c.tagline}</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </>
  )
}

function HowStep({
  icon: Icon,
  title,
  children,
}: {
  icon: React.ComponentType<{ className?: string; 'aria-hidden'?: boolean }>
  title: string
  children: React.ReactNode
}) {
  return (
    <div className="flex gap-4">
      <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-white text-brand shadow-card">
        <Icon className="size-5" aria-hidden />
      </span>
      <div>
        <h3 className="font-bold text-ink">{title}</h3>
        <p className="mt-1 text-sm leading-6 text-ink-soft">{children}</p>
      </div>
    </div>
  )
}
