import { getStore, isExpired } from '@/lib/queries'
import type { Offer } from '@/lib/types'

export const headline = (o: Offer) => `${o.highlight} ${o.title}`

/** Serializable props for the client-side <OfferButton>. */
export function offerButtonProps(o: Offer) {
  return {
    id: o.id,
    type: o.type,
    code: o.code,
    storeName: getStore(o.storeSlug)?.name ?? 'the store',
    headline: headline(o),
    terms: o.terms,
    expired: isExpired(o),
    demo: o.demo,
  }
}
