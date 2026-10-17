'use client'

import { useRef, useState, type ReactNode } from 'react'

type Filter = 'all' | 'code' | 'deal'

/**
 * Tabs that filter server-rendered offer rows. Rows are <li data-type="code|deal">
 * children; filtering is pure CSS on a data attribute, so offers stay in the
 * HTML for crawlers and no-JS visitors.
 */
export function OfferTabs({ counts, children }: { counts: Record<Filter, number>; children: ReactNode }) {
  const [filter, setFilter] = useState<Filter>('all')
  const tabs = (
    [
      { id: 'all', label: 'All Offers' },
      { id: 'code', label: 'Codes' },
      { id: 'deal', label: 'Deals' },
    ] as const
  ).filter((t) => t.id === 'all' || counts[t.id] > 0)
  // With only one offer type there's nothing to filter, so skip the tabs and show the offers sooner.
  const showTabs = tabs.length > 2
  const refs = useRef<(HTMLButtonElement | null)[]>([])

  return (
    <div>
      {showTabs && (
      <div role="tablist" aria-label="Filter offers" className="flex gap-1 border-b border-line">
        {tabs.map((t, i) => {
          const selected = filter === t.id
          return (
            <button
              key={t.id}
              ref={(el) => {
                refs.current[i] = el
              }}
              type="button"
              role="tab"
              id={`tab-${t.id}`}
              aria-selected={selected}
              aria-controls="offer-list"
              tabIndex={selected ? 0 : -1}
              onClick={() => setFilter(t.id)}
              onKeyDown={(e) => {
                const dir = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0
                if (!dir) return
                const next = (i + dir + tabs.length) % tabs.length
                setFilter(tabs[next].id)
                refs.current[next]?.focus()
              }}
              className={`relative flex items-center gap-2 px-3 pb-3 pt-2 text-[15px] font-bold transition-colors sm:px-4 ${
                selected ? 'text-ink' : 'text-muted hover:text-ink'
              }`}
            >
              {t.label}
              <span className={`rounded-md px-1.5 py-0.5 text-xs ${selected ? 'bg-brand-50 text-brand-700' : 'bg-surface'}`}>
                {counts[t.id]}
              </span>
              {selected && <span className="absolute inset-x-0 -bottom-px h-[3px] rounded-t bg-ink" />}
            </button>
          )
        })}
      </div>
      )}
      <ul
        id="offer-list"
        role={showTabs ? 'tabpanel' : undefined}
        aria-labelledby={showTabs ? `tab-${filter}` : undefined}
        aria-label={showTabs ? undefined : 'Offers'}
        data-show={filter}
        className="mt-5 grid gap-4 first:mt-0 [&[data-show=code]>li[data-type=deal]]:hidden [&[data-show=deal]>li[data-type=code]]:hidden"
      >
        {children}
      </ul>
      {filter !== 'all' && counts[filter] === 0 && (
        <p className="mt-2 rounded-2xl border border-dashed border-line bg-surface p-8 text-center text-sm text-muted">
          No active {filter === 'code' ? 'coupon codes' : 'deals'} right now. Check the other tab or come back soon.
        </p>
      )}
    </div>
  )
}
