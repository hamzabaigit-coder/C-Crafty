import { categories } from './data/categories'
import { offers } from './data/offers'
import { posts } from './data/blog'
import { seasons } from './data/seasons'
import { stores } from './data/stores'
import type { CategorySlug, Offer, SeasonSlug, Store } from './types'

/**
 * Data access layer. Pages and components only use these functions, so the
 * in-repo data files can later be replaced by a database, CMS or affiliate
 * feed by changing this module alone.
 */

const DAY = 24 * 60 * 60 * 1000

/** End of the offer's last valid day, in US Eastern time-agnostic UTC terms. */
function endOfDay(iso: string) {
  return new Date(`${iso}T23:59:59Z`).getTime()
}

export function isExpired(offer: Offer, now = Date.now()) {
  return offer.expiresAt ? endOfDay(offer.expiresAt) < now : false
}

/** Whole days remaining including today, or null when there's no end date. */
export function daysLeft(offer: Offer, now = Date.now()) {
  if (!offer.expiresAt) return null
  return Math.max(0, Math.ceil((endOfDay(offer.expiresAt) - now) / DAY))
}

const byAddedDesc = (a: Offer, b: Offer) => b.addedAt.localeCompare(a.addedAt)

// Stores -------------------------------------------------------------------

export const getStores = () => [...stores].sort((a, b) => a.name.localeCompare(b.name))
export const getStore = (slug: string) => stores.find((s) => s.slug === slug)
export const getPopularStores = () => stores.filter((s) => s.popular)
export const getStoresByCategory = (slug: CategorySlug) =>
  getStores().filter((s) => s.categories.includes(slug))

export function getRelatedStores(store: Store, limit = 6) {
  return stores
    .filter((s) => s.slug !== store.slug)
    .map((s) => ({ s, score: s.categories.filter((c) => store.categories.includes(c)).length }))
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score || Number(b.s.popular) - Number(a.s.popular))
    .slice(0, limit)
    .map(({ s }) => s)
}

export function storeOfferCounts(slug: string) {
  const active = getActiveOffers().filter((o) => o.storeSlug === slug)
  return {
    total: active.length,
    codes: active.filter((o) => o.type === 'code').length,
    deals: active.filter((o) => o.type === 'deal').length,
  }
}

/** Most recent content change for a store: page review or newest offer. */
export function storeLastUpdated(store: Store) {
  return offers
    .filter((o) => o.storeSlug === store.slug)
    .map((o) => o.addedAt)
    .reduce((latest, d) => (d > latest ? d : latest), store.updatedAt)
}

// Offers -------------------------------------------------------------------

export const getOffer = (id: string) => offers.find((o) => o.id === id)
export const getActiveOffers = () => offers.filter((o) => !isExpired(o))

export function getStoreOffers(slug: string) {
  const all = offers.filter((o) => o.storeSlug === slug)
  const sort = (a: Offer, b: Offer) =>
    Number(!!b.featured) - Number(!!a.featured) || byAddedDesc(a, b)
  return {
    active: all.filter((o) => !isExpired(o)).sort(sort),
    expired: all.filter((o) => isExpired(o)).sort(byAddedDesc),
  }
}

export const getOffersByCategory = (slug: CategorySlug) => {
  const storeSlugs = new Set(getStoresByCategory(slug).map((s) => s.slug))
  return getActiveOffers().filter((o) => storeSlugs.has(o.storeSlug)).sort(byAddedDesc)
}

export const getOffersBySeason = (slug: SeasonSlug) =>
  getActiveOffers().filter((o) => o.seasons?.includes(slug)).sort(byAddedDesc)

export const getExclusiveOffers = () => getActiveOffers().filter((o) => o.exclusive)

export type OfferCollection = 'trending' | 'best-discounts' | 'new' | 'ending-soon' | 'codes' | 'deals'

export function getCollection(kind: OfferCollection): Offer[] {
  const active = getActiveOffers()
  switch (kind) {
    case 'trending':
      // No click-tracking data yet: "trending" is the editorial featured set
      // followed by the newest codes. Swap for real popularity data when available.
      return [
        ...active.filter((o) => o.featured).sort(byAddedDesc),
        ...active.filter((o) => !o.featured && o.type === 'code').sort(byAddedDesc),
      ]
    case 'best-discounts':
      return active
        .filter((o) => o.discountUnit === 'percent' && o.discountValue)
        .sort((a, b) => (b.discountValue ?? 0) - (a.discountValue ?? 0))
    case 'new':
      return [...active].sort(byAddedDesc)
    case 'ending-soon':
      return active
        .filter((o) => {
          const d = daysLeft(o)
          return d !== null && d <= 14
        })
        .sort((a, b) => a.expiresAt!.localeCompare(b.expiresAt!))
    case 'codes':
      return active.filter((o) => o.type === 'code').sort(byAddedDesc)
    case 'deals':
      return active.filter((o) => o.type === 'deal').sort(byAddedDesc)
  }
}

/**
 * Picks offers for homepage sections without repeating the same offer across
 * sections, and with at most `perStore` offers from any single store.
 */
export function createOfferPicker() {
  const used = new Set<string>()
  return (list: Offer[], limit: number, perStore = 1) => {
    const picked: Offer[] = []
    const storeCount = new Map<string, number>()
    for (const o of list) {
      if (picked.length >= limit) break
      if (used.has(o.id)) continue
      const n = storeCount.get(o.storeSlug) ?? 0
      if (n >= perStore) continue
      storeCount.set(o.storeSlug, n + 1)
      used.add(o.id)
      picked.push(o)
    }
    return picked
  }
}

// Categories, seasons, blog -------------------------------------------------

export const getCategories = () => categories
export const getCategory = (slug: string) => categories.find((c) => c.slug === slug)
export const getSeasons = () => seasons
export const getSeason = (slug: string) => seasons.find((s) => s.slug === slug)

export const getPosts = () => [...posts].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt))
export const getPost = (slug: string) => posts.find((p) => p.slug === slug)
export function getRelatedPosts(slug: string, limit = 3) {
  const post = getPost(slug)
  if (!post) return []
  return getPosts()
    .filter((p) => p.slug !== slug)
    .map((p) => ({ p, score: p.tags.filter((t) => post.tags.includes(t)).length }))
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(({ p }) => p)
}
export const getPostsForStore = (slug: string) => getPosts().filter((p) => p.relatedStores.includes(slug))

// Search -------------------------------------------------------------------

function norm(s: string) {
  return s
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[’'.]/g, '')
    .replace(/[^a-z0-9]+/g, ' ')
    .trim()
}

export type SearchType = 'all' | 'stores' | 'coupons' | 'blog'

export function search(query: string, type: SearchType = 'all') {
  const q = norm(query)
  if (!q) return { stores: [], offers: [], posts: [] }
  const terms = q.split(' ')
  const matches = (text: string) => {
    const t = norm(text)
    return terms.every((term) => t.includes(term))
  }

  // Rank stores: name prefix > name contains > domain/category match.
  const storeScore = (s: Store) => {
    const name = norm(s.name)
    if (name.startsWith(q)) return 3
    if (matches(s.name)) return 2
    return matches([s.domain, ...s.categories.map((c) => getCategory(c)?.name ?? '')].join(' ')) ? 1 : 0
  }
  const storeHits =
    type === 'all' || type === 'stores'
      ? getStores()
          .map((s) => ({ s, score: storeScore(s) }))
          .filter(({ score }) => score > 0)
          .sort((a, b) => b.score - a.score)
          .map(({ s }) => s)
      : []

  const offerHits =
    type === 'all' || type === 'coupons'
      ? getActiveOffers()
          .filter((o) => {
            const store = getStore(o.storeSlug)
            return matches([store?.name, o.highlight, o.title, o.description].join(' '))
          })
          .sort(
            (a, b) =>
              Number(matches(getStore(b.storeSlug)?.name ?? '')) - Number(matches(getStore(a.storeSlug)?.name ?? '')),
          )
      : []

  const postHits =
    type === 'all' || type === 'blog'
      ? getPosts().filter((p) => matches([p.title, p.excerpt, ...p.tags].join(' ')))
      : []

  return { stores: storeHits, offers: offerHits, posts: postHits }
}
