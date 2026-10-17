'use client'

import { useState, type ReactNode } from 'react'

interface Meta {
  type: 'code' | 'deal'
  categories: string[]
}

/**
 * Filters a server-rendered list of offers (<li data-type data-cats>) by type
 * and category. All offers stay in the HTML; filtering only toggles visibility.
 */
export function OfferFilter({
  meta,
  categories,
  children,
}: {
  meta: Meta[]
  categories: { slug: string; name: string }[]
  children: ReactNode
}) {
  const [type, setType] = useState<'all' | 'code' | 'deal'>('all')
  const [cat, setCat] = useState('all')

  const visible = meta.filter(
    (m) => (type === 'all' || m.type === type) && (cat === 'all' || m.categories.includes(cat)),
  ).length

  const css = [
    type !== 'all' && `#offer-grid > li:not([data-type="${type}"]){display:none}`,
    cat !== 'all' && `#offer-grid > li:not([data-cats~="${cat}"]){display:none}`,
  ]
    .filter(Boolean)
    .join('')

  const typeBtn = (value: typeof type, label: string) => (
    <button
      type="button"
      aria-pressed={type === value}
      onClick={() => setType(value)}
      className={`rounded-full px-4 py-2 text-sm font-bold transition-colors ${
        type === value ? 'bg-ink text-white' : 'bg-surface text-ink hover:bg-line'
      }`}
    >
      {label}
    </button>
  )

  return (
    <div>
      {css && <style>{css}</style>}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-2" role="group" aria-label="Offer type">
          {typeBtn('all', 'All')}
          {typeBtn('code', 'Codes')}
          {typeBtn('deal', 'Deals')}
        </div>
        <div className="flex items-center gap-3">
          <label htmlFor="cat-filter" className="text-sm font-semibold text-ink-soft">
            Category
          </label>
          <select
            id="cat-filter"
            value={cat}
            onChange={(e) => setCat(e.target.value)}
            className="h-10 rounded-full border border-line bg-white px-4 text-sm font-semibold text-ink outline-none focus:border-brand"
          >
            <option value="all">All categories</option>
            {categories.map((c) => (
              <option key={c.slug} value={c.slug}>
                {c.name}
              </option>
            ))}
          </select>
        </div>
      </div>
      <p className="mt-4 text-sm text-muted" role="status">
        Showing {visible} {visible === 1 ? 'offer' : 'offers'}
      </p>
      <ul id="offer-grid" className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
        {children}
      </ul>
      {visible === 0 && (
        <p className="rounded-2xl border border-dashed border-line bg-surface p-10 text-center text-sm text-muted">
          No offers match these filters. Try another category or offer type.
        </p>
      )}
    </div>
  )
}
