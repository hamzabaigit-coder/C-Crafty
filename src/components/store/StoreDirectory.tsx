'use client'

import { Search, X } from 'lucide-react'
import Link from 'next/link'
import { useMemo, useState } from 'react'
import { StoreLogo } from '../StoreLogo'
import type { Store } from '@/lib/types'

export type DirectoryStore = Pick<Store, 'slug' | 'name' | 'domain' | 'brandColor' | 'brandText' | 'logoText'> & {
  count: number
}

const LETTERS = ['#', ...'ABCDEFGHIJKLMNOPQRSTUVWXYZ']
const letterOf = (name: string) => {
  const c = name[0].toUpperCase()
  return /[A-Z]/.test(c) ? c : '#'
}

export function StoreDirectory({ stores }: { stores: DirectoryStore[] }) {
  const [q, setQ] = useState('')
  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase()
    return term
      ? stores.filter((s) => s.name.toLowerCase().includes(term) || s.domain.includes(term))
      : stores
  }, [q, stores])

  const groups = useMemo(() => {
    const map = new Map<string, DirectoryStore[]>()
    for (const s of filtered) {
      const l = letterOf(s.name)
      map.set(l, [...(map.get(l) ?? []), s])
    }
    return LETTERS.filter((l) => map.has(l)).map((l) => ({ letter: l, stores: map.get(l)! }))
  }, [filtered])

  const available = new Set(groups.map((g) => g.letter))

  return (
    <div>
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="relative w-full md:max-w-sm">
          <Search className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted" aria-hidden="true" />
          <label htmlFor="store-filter" className="sr-only">
            Filter stores by name
          </label>
          <input
            id="store-filter"
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Filter stores by name"
            className="h-11 w-full rounded-full border border-line bg-white pl-10 pr-10 text-[15px] outline-none focus:border-brand focus:ring-4 focus:ring-brand/10 [&::-webkit-search-cancel-button]:hidden"
          />
          {q && (
            <button
              type="button"
              onClick={() => setQ('')}
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full p-1.5 text-muted hover:bg-surface hover:text-ink"
              aria-label="Clear filter"
            >
              <X className="size-4" aria-hidden="true" />
            </button>
          )}
        </div>
        <p className="text-sm text-muted" role="status">
          {filtered.length === stores.length ? `${stores.length} stores` : `${filtered.length} of ${stores.length} stores`}
        </p>
      </div>

      <nav aria-label="Jump to letter" className="scrollbar-none -mx-4 mt-5 overflow-x-auto px-4">
        <ul className="flex min-w-max gap-1">
          {LETTERS.map((l) => (
            <li key={l}>
              {available.has(l) ? (
                <a
                  href={`#letter-${l === '#' ? 'num' : l}`}
                  className="grid size-9 place-items-center rounded-lg border border-line bg-white text-sm font-bold text-ink hover:border-brand hover:bg-brand-50 hover:text-brand-700"
                >
                  {l}
                </a>
              ) : (
                <span className="grid size-9 place-items-center rounded-lg text-sm font-semibold text-ink/25" aria-hidden="true">
                  {l}
                </span>
              )}
            </li>
          ))}
        </ul>
      </nav>

      {groups.length === 0 ? (
        <p className="mt-8 rounded-2xl border border-dashed border-line bg-surface p-10 text-center text-muted">
          No stores match “{q}”. Try a shorter name, or{' '}
          <Link href={`/search?q=${encodeURIComponent(q)}`} className="link">
            search all offers
          </Link>
          .
        </p>
      ) : (
        <div className="mt-8 space-y-10">
          {groups.map((g) => (
            <section key={g.letter} id={`letter-${g.letter === '#' ? 'num' : g.letter}`} aria-labelledby={`h-${g.letter}`}>
              <h3 id={`h-${g.letter}`} className="border-b border-line pb-2 text-xl font-extrabold text-ink">
                {g.letter}
              </h3>
              <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {g.stores.map((s) => (
                  <li key={s.slug}>
                    <Link
                      href={`/stores/${s.slug}`}
                      className="flex items-center gap-3 rounded-xl border border-line bg-white p-3 hover:border-brand hover:shadow-card"
                    >
                      <StoreLogo store={s} size="sm" />
                      <span className="min-w-0">
                        <span className="block truncate font-bold text-ink">{s.name}</span>
                        <span className="block text-xs text-muted">
                          {s.count ? `${s.count} ${s.count === 1 ? 'offer' : 'offers'}` : 'No active offers'}
                        </span>
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      )}
    </div>
  )
}
