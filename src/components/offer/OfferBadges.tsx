import { BadgeCheck, Clock, FlaskConical, Star } from 'lucide-react'
import { daysLeft, isExpired } from '@/lib/queries'
import { formatDate } from '@/lib/format'
import type { Offer } from '@/lib/types'

export function TypeChip({ type }: { type: Offer['type'] }) {
  return (
    <span
      className={`chip justify-center ${type === 'code' ? 'bg-brand-50 text-brand-700' : 'bg-info-50 text-info'}`}
    >
      {type === 'code' ? 'Code' : 'Deal'}
    </span>
  )
}

export function DemoChip() {
  return (
    <span className="chip bg-amber-50 text-amber-800" title="Sample content for development — not a real offer">
      <FlaskConical className="size-3.5" aria-hidden="true" />
      Demo offer
    </span>
  )
}

export function OfferBadges({ offer }: { offer: Offer }) {
  const expired = isExpired(offer)
  const left = daysLeft(offer)
  return (
    <div className="flex flex-wrap items-center gap-1.5">
      {offer.verifiedAt && (
        <span className="chip bg-brand-50 text-brand-700">
          <BadgeCheck className="size-3.5" aria-hidden="true" />
          Verified {formatDate(offer.verifiedAt)}
        </span>
      )}
      {offer.exclusive && (
        <span className="chip bg-ink text-white">
          <Star className="size-3.5" aria-hidden="true" />
          Exclusive
        </span>
      )}
      {expired ? (
        <span className="chip bg-surface text-muted">Expired {formatDate(offer.expiresAt!)}</span>
      ) : left !== null && left <= 7 ? (
        <span className="chip bg-warn-50 text-warn">
          <Clock className="size-3.5" aria-hidden="true" />
          {left <= 1 ? 'Ends today' : `Only ${left} days left`}
        </span>
      ) : left !== null && left <= 14 ? (
        <span className="chip bg-info-50 text-info">
          <Clock className="size-3.5" aria-hidden="true" />
          Ends {formatDate(offer.expiresAt!)}
        </span>
      ) : null}
      {offer.demo && <DemoChip />}
    </div>
  )
}
