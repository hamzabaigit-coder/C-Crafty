import Link from 'next/link'
import { getStore } from '@/lib/queries'
import type { Offer, Store } from '@/lib/types'
import { OfferArt } from '../OfferArt'
import { StoreLogo } from '../StoreLogo'
import { OfferBadges, TypeChip } from './OfferBadges'
import { OfferButton } from './OfferButton'
import { offerButtonProps } from './offerProps'

export const storeAccent = (store: Store) =>
  store.brandColor.toUpperCase() === '#FFFFFF' ? store.brandText : store.brandColor

/** Grid card used on the homepage and listing pages. */
export function OfferCard({
  offer,
  showArt = true,
  headingLevel = 'h3',
}: {
  offer: Offer
  showArt?: boolean
  headingLevel?: 'h2' | 'h3'
}) {
  const store = getStore(offer.storeSlug)
  if (!store) return null
  const Heading = headingLevel
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-white shadow-card transition-shadow hover:shadow-lift">
      {showArt && (
        <div className="relative">
          <OfferArt theme={store.categories[0]} accent={storeAccent(store)} className="aspect-[16/7]" />
          {offer.featured && (
            <span className="chip absolute left-0 top-3 rounded-l-none bg-brand text-white shadow-sm">Editor’s pick</span>
          )}
        </div>
      )}
      {showArt && <TicketDivider />}
      <div className="flex flex-1 flex-col gap-4 p-4 sm:p-5">
        <div className="flex gap-3.5">
          <Link
            href={`/stores/${store.slug}`}
            className="flex shrink-0 flex-col items-center gap-1.5"
            aria-label={`${store.name} coupons`}
          >
            <StoreLogo store={store} size="sm" />
            <TypeChip type={offer.type} />
          </Link>
          <div className="min-w-0 flex-1">
            <p className="text-[13px] font-semibold text-muted">
              <Link href={`/stores/${store.slug}`} className="hover:text-brand-700 hover:underline">
                {store.name}
              </Link>
            </p>
            <Heading className="mt-0.5 text-[17px] leading-snug text-ink">
              <strong className="font-extrabold">{offer.highlight}</strong> {offer.title}
            </Heading>
            <div className="mt-2">
              <OfferBadges offer={offer} />
            </div>
          </div>
        </div>
        <div className="mt-auto">
          <OfferButton {...offerButtonProps(offer)} />
        </div>
      </div>
    </article>
  )
}

/** Dashed tear line with side notches, so cards read as coupon tickets. */
export function TicketDivider({ vertical = false }: { vertical?: boolean }) {
  const notch = 'absolute size-5 rounded-full border border-line bg-white'
  return vertical ? (
    <div aria-hidden="true" className="relative w-0 border-l-2 border-dashed border-line">
      <span className={`${notch} -left-[11px] -top-2.5`} />
      <span className={`${notch} -bottom-2.5 -left-[11px]`} />
    </div>
  ) : (
    <div aria-hidden="true" className="relative h-0 border-t-2 border-dashed border-line">
      <span className={`${notch} -left-2.5 -top-[11px]`} />
      <span className={`${notch} -right-2.5 -top-[11px]`} />
    </div>
  )
}
