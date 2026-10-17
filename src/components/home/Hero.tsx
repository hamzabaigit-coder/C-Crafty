import Link from 'next/link'
import { heroSlides } from '@/lib/data/slides'
import { getOffer, getStore, isExpired } from '@/lib/queries'
import { OfferArt } from '../OfferArt'
import { StoreLogo } from '../StoreLogo'
import { OfferBadges } from '../offer/OfferBadges'
import { OfferButton } from '../offer/OfferButton'
import { storeAccent, TicketDivider } from '../offer/OfferCard'
import { offerButtonProps } from '../offer/offerProps'
import { HeroCarousel } from './HeroCarousel'

export function Hero() {
  const slides = heroSlides.flatMap((s) => {
    const offer = getOffer(s.offerId)
    const store = offer && getStore(offer.storeSlug)
    return offer && store && !isExpired(offer) ? [{ ...s, offer, store }] : []
  })
  if (!slides.length) return null

  return (
    <HeroCarousel labels={slides.map((s) => s.title)}>
      {slides.map(({ offer, store, eyebrow, title, subtitle }) => (
        <article
          key={offer.id}
          className="grid overflow-hidden rounded-3xl border border-line bg-white shadow-card md:min-h-[340px] md:grid-cols-[1fr_auto_1.1fr]"
        >
          <div className="order-3 flex flex-col justify-center gap-4 p-6 sm:p-8 lg:p-12">
            <p className="text-sm font-bold uppercase tracking-wider text-brand-600">{eyebrow}</p>
            <p className="text-2xl font-extrabold leading-tight tracking-tight text-ink sm:text-3xl lg:text-[2.35rem]">
                {title}
              </p>
            <p className="max-w-md text-[15px] leading-6 text-ink-soft">{subtitle}</p>
            <OfferBadges offer={offer} />
            <div className="flex flex-wrap items-center gap-4">
              <div className="w-full max-w-64">
                <OfferButton {...offerButtonProps(offer)} />
              </div>
              <Link href={`/stores/${store.slug}`} className="link text-sm">
                All {store.name} offers
              </Link>
            </div>
          </div>
          <div className="relative order-1">
            <OfferArt theme={store.categories[0]} accent={storeAccent(store)} variant="hero" className="aspect-[16/8] h-full w-full md:aspect-auto" />
            <div className="absolute left-4 top-4 rounded-2xl bg-white p-1.5 shadow-lift">
              <StoreLogo store={store} size="md" />
            </div>
          </div>
          <div className="order-2 hidden md:flex">
            <TicketDivider vertical />
          </div>
          <div className="order-2 md:hidden">
            <TicketDivider />
          </div>
        </article>
      ))}
    </HeroCarousel>
  )
}
