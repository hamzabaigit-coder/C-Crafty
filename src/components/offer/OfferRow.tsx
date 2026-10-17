import { ChevronDown } from 'lucide-react'
import { formatDate } from '@/lib/format'
import { isExpired } from '@/lib/queries'
import type { Offer, Store } from '@/lib/types'
import { StoreLogo } from '../StoreLogo'
import { OfferBadges, TypeChip } from './OfferBadges'
import { OfferButton } from './OfferButton'
import { offerButtonProps } from './offerProps'

/** Horizontal offer card used on store pages. */
export function OfferRow({ offer, store }: { offer: Offer; store: Store }) {
  const expired = isExpired(offer)
  return (
    <article
      id={offer.id}
      className={`scroll-mt-36 rounded-2xl border border-line bg-white shadow-card ${expired ? 'opacity-80' : ''}`}
    >
      <div className="flex flex-col gap-4 p-4 sm:flex-row sm:items-start sm:p-5">
        <div className="flex flex-1 gap-4">
          <div className="flex shrink-0 flex-col items-center gap-1.5">
            <StoreLogo store={store} size="md" />
            <TypeChip type={offer.type} />
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="text-lg leading-snug text-ink sm:text-xl">
              <strong className="font-extrabold">{offer.highlight}</strong> {offer.title}
            </h3>
            <p className="mt-1.5 text-sm leading-6 text-ink-soft">{offer.description}</p>
            <div className="mt-2.5">
              <OfferBadges offer={offer} />
            </div>
          </div>
        </div>
        <div className="w-full shrink-0 sm:w-56">
          <OfferButton {...offerButtonProps(offer)} />
        </div>
      </div>
      <details className="group border-t border-line px-4 py-2.5 text-sm sm:px-5">
        <summary className="flex cursor-pointer list-none items-center justify-end gap-1 font-semibold text-ink-soft hover:text-ink [&::-webkit-details-marker]:hidden">
          Details
          <ChevronDown className="size-4 transition-transform group-open:rotate-180" aria-hidden="true" />
        </summary>
        <dl className="mt-2 grid gap-x-6 gap-y-2 pb-2 text-ink-soft sm:grid-cols-[max-content_1fr]">
          {offer.terms && (
            <>
              <dt className="font-semibold text-ink">Terms</dt>
              <dd>{offer.terms}</dd>
            </>
          )}
          <dt className="font-semibold text-ink">Ends</dt>
          <dd>{offer.expiresAt ? formatDate(offer.expiresAt) : 'No end date published'}</dd>
          <dt className="font-semibold text-ink">Added</dt>
          <dd>{formatDate(offer.addedAt)}</dd>
          <dt className="font-semibold text-ink">Status</dt>
          <dd>
            {offer.verifiedAt
              ? `Tested and working on ${formatDate(offer.verifiedAt)}`
              : offer.demo
                ? 'Demo content — placeholder for development, not a live offer'
                : 'Not yet tested by our team'}
          </dd>
        </dl>
      </details>
    </article>
  )
}
