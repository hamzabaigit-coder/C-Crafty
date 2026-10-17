import { FileWarning } from 'lucide-react'
import type { ReactNode } from 'react'
import { formatLongDate } from '@/lib/format'
import { site } from '@/lib/site'
import { Breadcrumbs } from './Breadcrumbs'

export function InfoPage({
  title,
  path,
  updated,
  legal = false,
  children,
}: {
  title: string
  path: string
  updated?: string
  legal?: boolean
  children: ReactNode
}) {
  return (
    <div className="container-page pt-6 sm:pt-8">
      <div className="mx-auto max-w-3xl">
        <Breadcrumbs items={[{ name: title, href: path }]} />
        <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">{title}</h1>
        {updated && (
          <p className="mt-2 text-sm text-muted">
            Last updated <time dateTime={updated}>{formatLongDate(updated)}</time>
          </p>
        )}
        {legal && site.legalDraft && (
          <p className="mt-6 flex gap-3 rounded-2xl bg-amber-50 p-4 text-sm leading-6 text-amber-900">
            <FileWarning className="mt-0.5 size-5 shrink-0" aria-hidden="true" />
            Draft template: this page is a starting point and must be reviewed by a qualified attorney and adapted to
            {` ${site.name}`}’s actual practices before launch.
          </p>
        )}
        <div className="prose-cc mt-6">{children}</div>
      </div>
    </div>
  )
}
