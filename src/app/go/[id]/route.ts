import { NextResponse } from 'next/server'
import { getOffer, getStore } from '@/lib/queries'

/**
 * Outbound redirect for offer clicks: /go/<offerId>.
 *
 * Destination priority: offer affiliate link → store affiliate link → offer
 * landing page → store homepage. Keeping outbound links behind one route lets
 * you add click logging or swap affiliate networks without touching the UI.
 */
export async function GET(_req: Request, ctx: RouteContext<'/go/[id]'>) {
  const { id } = await ctx.params
  const offer = getOffer(id)
  const store = offer && getStore(offer.storeSlug)

  if (!offer || !store) {
    return new NextResponse('Offer not found', {
      status: 404,
      headers: { 'X-Robots-Tag': 'noindex, nofollow', 'Content-Type': 'text/plain; charset=utf-8' },
    })
  }

  const destination = offer.affiliateUrl ?? store.affiliateUrl ?? offer.url ?? store.url

  return NextResponse.redirect(destination, {
    status: 302,
    headers: {
      'X-Robots-Tag': 'noindex, nofollow',
      'Cache-Control': 'no-store',
      'Referrer-Policy': 'no-referrer-when-downgrade',
    },
  })
}
