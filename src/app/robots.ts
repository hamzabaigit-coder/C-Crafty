import type { MetadataRoute } from 'next'
import { absoluteUrl } from '@/lib/site'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: '*', allow: '/', disallow: ['/go/', '/api/', '/search'] }],
    sitemap: absoluteUrl('/sitemap.xml'),
  }
}
