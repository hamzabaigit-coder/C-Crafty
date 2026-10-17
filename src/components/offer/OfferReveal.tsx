'use client'

import { Check, Copy, ExternalLink, TriangleAlert, X } from 'lucide-react'
import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from 'react'

export interface RevealPayload {
  id: string
  code: string
  storeName: string
  headline: string
  terms?: string
  expired: boolean
  demo: boolean
}

const RevealContext = createContext<((p: RevealPayload) => void) | null>(null)

export function useOfferReveal() {
  const ctx = useContext(RevealContext)
  if (!ctx) throw new Error('useOfferReveal must be used inside <OfferRevealProvider>')
  return ctx
}

async function copyText(text: string) {
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch {
    return false
  }
}

/**
 * One shared <dialog> for revealing coupon codes. Native dialog gives us focus
 * trapping, Escape-to-close and an inert background for free.
 */
export function OfferRevealProvider({ children }: { children: ReactNode }) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const codeRef = useRef<HTMLInputElement>(null)
  const [offer, setOffer] = useState<RevealPayload | null>(null)
  const [copied, setCopied] = useState<boolean | null>(null)

  const reveal = useCallback((p: RevealPayload) => {
    setOffer(p)
    setCopied(null)
    copyText(p.code).then(setCopied)
    if (!p.expired) {
      // Opened in the click handler's call stack so popup blockers allow it.
      window.open(`/go/${encodeURIComponent(p.id)}`, '_blank', 'noopener')
    }
  }, [])

  useEffect(() => {
    if (offer && dialogRef.current && !dialogRef.current.open) dialogRef.current.showModal()
  }, [offer])

  const copyAgain = async () => {
    if (!offer) return
    const ok = await copyText(offer.code)
    setCopied(ok)
    if (!ok) codeRef.current?.select()
  }

  return (
    <RevealContext.Provider value={reveal}>
      {children}
      <dialog
        ref={dialogRef}
        aria-labelledby="reveal-title"
        className="m-auto w-[min(92vw,30rem)] rounded-2xl bg-white p-0 text-ink shadow-lift"
        onClose={() => setOffer(null)}
        onClick={(e) => {
          if (e.target === dialogRef.current) dialogRef.current?.close()
        }}
      >
        {offer && (
          <div className="p-6 sm:p-7">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-semibold text-muted">{offer.storeName}</p>
                <h2 id="reveal-title" className="mt-1 text-xl font-extrabold leading-snug">
                  {offer.headline}
                </h2>
              </div>
              <button
                type="button"
                onClick={() => dialogRef.current?.close()}
                className="-mr-2 -mt-1 rounded-full p-2 text-muted hover:bg-surface hover:text-ink"
                aria-label="Close"
              >
                <X className="size-5" />
              </button>
            </div>

            {offer.expired && (
              <p className="mt-4 flex gap-2 rounded-lg bg-warn-50 p-3 text-sm font-medium text-warn">
                <TriangleAlert className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
                This offer has passed its end date and will probably not work.
              </p>
            )}
            {offer.demo && (
              <p className="mt-4 rounded-lg bg-amber-50 p-3 text-sm text-amber-900">
                <strong>Demo offer:</strong> this is sample content for testing the site. The code is a
                placeholder and won’t work at the retailer.
              </p>
            )}

            <label htmlFor="reveal-code" className="mt-5 block text-sm font-semibold text-ink-soft">
              Your code
            </label>
            <div className="mt-2 flex items-stretch overflow-hidden rounded-xl border-2 border-dashed border-brand bg-brand-50">
              <input
                id="reveal-code"
                ref={codeRef}
                readOnly
                value={offer.code}
                onFocus={(e) => e.currentTarget.select()}
                className="min-w-0 flex-1 bg-transparent px-4 py-3 font-mono text-xl font-bold tracking-wider text-ink outline-none"
              />
              <button type="button" onClick={copyAgain} className="btn-primary m-1.5 shrink-0 rounded-lg px-4">
                {copied ? <Check className="size-4" aria-hidden="true" /> : <Copy className="size-4" aria-hidden="true" />}
                {copied ? 'Copied' : 'Copy'}
              </button>
            </div>
            <p className="mt-2 min-h-5 text-sm text-muted" role="status">
              {copied === true && 'Code copied to your clipboard. Paste it at checkout.'}
              {copied === false && 'Select the code above and copy it manually.'}
            </p>

            {offer.terms && (
              <div className="mt-4 rounded-lg bg-surface p-3 text-sm text-ink-soft">
                <p className="font-semibold text-ink">Terms</p>
                <p className="mt-1">{offer.terms}</p>
              </div>
            )}

            <a
              href={`/go/${encodeURIComponent(offer.id)}`}
              target="_blank"
              rel="sponsored nofollow noopener"
              className="btn-primary mt-5 w-full py-3"
            >
              Go to {offer.storeName}
              <ExternalLink className="size-4" aria-hidden="true" />
            </a>
            <p className="mt-3 text-center text-xs text-muted">
              Opens in a new tab. We may earn a commission when you shop through our links.
            </p>
          </div>
        )}
      </dialog>
    </RevealContext.Provider>
  )
}
