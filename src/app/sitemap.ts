import type { MetadataRoute } from 'next'
import { collectionMeta } from './coupons/collections'
import { getCategories, getPosts, getSeasons, getStores, getStoresByCategory, storeLastUpdated } from '@/lib/queries'
import { absoluteUrl } from '@/lib/site'

export const revalidate = 3600

export default function sitemap(): MetadataRoute.Sitemap {
  const page = (path: string, lastModified?: string): MetadataRoute.Sitemap[number] => ({
    url: absoluteUrl(path),
    ...(lastModified ? { lastModified } : {}),
  })
  return [
    page('/'),
    page('/stores'),
    page('/categories'),
    page('/coupons'),
    page('/seasonal'),
    page('/exclusive'),
    page('/blog'),
    ...['/about', '/contact', '/how-we-verify', '/affiliate-disclosure', '/privacy', '/terms'].map((p) => page(p)),
    ...getStores().map((s) => page(`/stores/${s.slug}`, storeLastUpdated(s))),
    ...getCategories()
      .filter((c) => getStoresByCategory(c.slug).length > 0)
      .map((c) => page(`/categories/${c.slug}`)),
    ...Object.keys(collectionMeta).map((c) => page(`/coupons/${c}`)),
    ...getSeasons().map((s) => page(`/seasonal/${s.slug}`)),
    ...getPosts().map((p) => page(`/blog/${p.slug}`, p.updatedAt)),
  ]
}
