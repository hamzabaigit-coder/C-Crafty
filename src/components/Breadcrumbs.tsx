import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import { absoluteUrl } from '@/lib/site'
import { JsonLd } from './JsonLd'

export interface Crumb {
  name: string
  href: string
}

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  const all = [{ name: 'Home', href: '/' }, ...items]
  return (
    <>
      <nav aria-label="Breadcrumb" className="text-[13px] text-muted">
        <ol className="flex flex-wrap items-center gap-1">
          {all.map((c, i) => {
            const last = i === all.length - 1
            return (
              <li key={c.href} className="flex items-center gap-1">
                {last ? (
                  <span aria-current="page" className="font-medium text-ink-soft">
                    {c.name}
                  </span>
                ) : (
                  <>
                    <Link href={c.href} className="hover:text-brand-700 hover:underline">
                      {c.name}
                    </Link>
                    <ChevronRight className="size-3.5" aria-hidden="true" />
                  </>
                )}
              </li>
            )
          })}
        </ol>
      </nav>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: all.map((c, i) => ({
            '@type': 'ListItem',
            position: i + 1,
            name: c.name,
            item: absoluteUrl(c.href),
          })),
        }}
      />
    </>
  )
}
