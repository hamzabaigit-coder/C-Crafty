'use client'

import { ExternalLink } from 'lucide-react'
import { trackOfferClick } from '@/lib/track'
import { useOfferReveal, type RevealPayload } from './OfferReveal'

interface Props {
  id: string
  type: 'code' | 'deal'
  code?: string
  storeName: string
  headline: string
  terms?: string
  expired: boolean
  demo: boolean
  className?: string
}

export function OfferButton({ id, type, code, storeName, headline, terms, expired, demo, className = '' }: Props) {
  const showCode = useOfferReveal()
  const track = () => trackOfferClick({ id, storeName, type, expired })
  const reveal = (p: RevealPayload) => {
    track()
    showCode(p)
  }

  if (type === 'deal') {
    return (
      <a
        href={`/go/${encodeURIComponent(id)}`}
        target="_blank"
        rel="sponsored nofollow noopener"
        onClick={track}
        className={`${expired ? 'btn-outline' : 'btn-primary'} h-11 w-full ${className}`}
        aria-label={`Get Deal: ${headline} at ${storeName} (opens in a new tab)`}
      >
        {expired ? 'View Expired Deal' : 'Get Deal'}
        <ExternalLink className="size-4 opacity-80" aria-hidden="true" />
      </a>
    )
  }

  if (!code) {
    return (
      <a
        href={`/go/${encodeURIComponent(id)}`}
        target="_blank"
        rel="sponsored nofollow noopener"
        onClick={track}
        className={`btn-outline h-11 w-full ${className}`}
      >
        Code unavailable — visit store
      </a>
    )
  }

  const payload: RevealPayload = { id, code, storeName, headline, terms, expired, demo }

  if (expired) {
    return (
      <button type="button" onClick={() => reveal(payload)} className={`btn-outline h-11 w-full ${className}`}>
        Show Expired Code
      </button>
    )
  }

  return (
    <button
      type="button"
      onClick={() => reveal(payload)}
      className={`group relative block h-11 w-full overflow-hidden rounded-full ${className}`}
      aria-label={`Get Code: ${headline} at ${storeName}`}
    >
      <span className="absolute inset-0 flex items-center justify-end rounded-full border-2 border-dashed border-brand-200 bg-brand-50 pr-4 font-mono text-sm font-bold tracking-wider text-ink">
        {code.slice(-3)}
      </span>
      <span className="absolute inset-y-0 left-0 right-12 flex items-center justify-center rounded-l-full bg-brand text-[15px] font-bold text-white transition-[right,background-color] duration-200 [clip-path:polygon(0_0,100%_0,calc(100%-14px)_100%,0_100%)] group-hover:right-14 group-hover:bg-brand-700">
        Get Code
      </span>
    </button>
  )
}
