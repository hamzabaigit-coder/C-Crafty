/**
 * Analytics events for outbound offer clicks. Pushes to `window.dataLayer`, so
 * Google Tag Manager (loaded when NEXT_PUBLIC_GTM_ID is set) can turn
 * `offer_click` into a Google Ads / GA4 conversion. A no-op without GTM.
 */
type DataLayerWindow = Window & { dataLayer?: Record<string, unknown>[] }

export function trackOfferClick(offer: { id: string; storeName: string; type: 'code' | 'deal'; expired: boolean }) {
  if (typeof window === 'undefined' || offer.expired) return
  const w = window as DataLayerWindow
  w.dataLayer = w.dataLayer ?? []
  w.dataLayer.push({
    event: 'offer_click',
    offer_id: offer.id,
    offer_type: offer.type,
    store_name: offer.storeName,
  })
}
