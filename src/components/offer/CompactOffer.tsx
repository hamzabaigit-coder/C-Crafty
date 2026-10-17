import Link from 'next/link'
import { getStore } from '@/lib/queries'
import type { Offer } from '@/lib/types'
import { StoreLogo } from '../StoreLogo'
import { OfferBadges } from './OfferBadges'
import { OfferButton } from './OfferButton'
import { offerButtonProps } from './offerProps'

/** Dense horizontal card for short lists (best discounts, ending soon). */
export function CompactOffer({ offer }: { offer: Offer }) {
  const store = getStore(offer.storeSlug)
  if (!store) return null
  return (
    <article className="flex flex-col gap-4 rounded-2xl border border-line bg-white p-4 shadow-card sm:flex-row sm:items-center">
      <div className="flex min-w-0 flex-1 gap-3.5">
        <Link href={`/stores/${store.slug}`} aria-label={`${store.name} coupons`} className="shrink-0">
          <StoreLogo store={store} size="sm" />
        </Link>
        <div className="min-w-0">
          <p className="text-[13px] font-semibold text-muted">
            {store.name} · {offer.type === 'code' ? 'Code' : 'Deal'}
          </p>
          <h3 className="text-base leading-snug text-ink">
            <strong className="font-extrabold">{offer.highlight}</strong> {offer.title}
          </h3>
          <div className="mt-1.5">
            <OfferBadges offer={offer} />
          </div>
        </div>
      </div>
      <div className="w-full shrink-0 sm:w-40">
        <OfferButton {...offerButtonProps(offer)} />
      </div>
    </article>
  )
}
