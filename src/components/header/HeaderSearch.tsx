'use client'

import { ChevronDown, Loader2, Search, Store as StoreIcon, Tag, FileText } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect, useId, useRef, useState } from 'react'

interface Suggestion {
  kind: 'store' | 'offer' | 'post'
  label: string
  meta?: string
  href: string
}

const typeOptions = [
  { value: 'all', label: 'All' },
  { value: 'stores', label: 'Stores' },
  { value: 'coupons', label: 'Coupons' },
  { value: 'blog', label: 'Blog' },
]

const icons = { store: StoreIcon, offer: Tag, post: FileText }

export function HeaderSearch({ id = 'site-search', autoFocus = false }: { id?: string; autoFocus?: boolean }) {
  const router = useRouter()
  const listId = useId()
  const [q, setQ] = useState('')
  const [type, setType] = useState('all')
  const [items, setItems] = useState<Suggestion[]>([])
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState(-1)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const boxRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const term = q.trim()
    // Short queries hide the list (see showList), so there's nothing to fetch.
    if (term.length < 2) return
    const ctrl = new AbortController()
    const t = setTimeout(async () => {
      setLoading(true)
      setError(false)
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(term)}&type=${type}`, { signal: ctrl.signal })
        if (!res.ok) throw new Error(String(res.status))
        const data: { suggestions: Suggestion[] } = await res.json()
        setItems(data.suggestions)
        setActive(-1)
      } catch (e) {
        if ((e as Error).name !== 'AbortError') {
          setItems([])
          setError(true)
        }
      } finally {
        if (!ctrl.signal.aborted) setLoading(false)
      }
    }, 150)
    return () => {
      clearTimeout(t)
      ctrl.abort()
    }
  }, [q, type])

  useEffect(() => {
    const onDown = (e: PointerEvent) => {
      if (!boxRef.current?.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('pointerdown', onDown)
    return () => document.removeEventListener('pointerdown', onDown)
  }, [])

  const showList = open && q.trim().length >= 2

  const go = (href: string) => {
    setOpen(false)
    router.push(href)
  }

  return (
    <div ref={boxRef} className="relative w-full">
      <form
        action="/search"
        method="get"
        role="search"
        onSubmit={(e) => {
          if (!q.trim()) {
            e.preventDefault()
            return
          }
          if (active >= 0 && items[active]) {
            e.preventDefault()
            go(items[active].href)
          } else setOpen(false)
        }}
        className="flex h-12 items-center rounded-full border-2 border-brand/70 bg-white pl-4 pr-1.5 shadow-[0_0_0_4px_rgb(0_138_46/0.08)] transition focus-within:border-brand focus-within:shadow-[0_0_0_4px_rgb(0_138_46/0.16)]"
      >
        <Search className="size-5 shrink-0 text-muted" aria-hidden="true" />
        <label htmlFor={id} className="sr-only">
          Search stores, coupons and deals
        </label>
        <input
          id={id}
          name="q"
          type="search"
          value={q}
          autoFocus={autoFocus}
          autoComplete="off"
          placeholder="Search stores, coupons and deals"
          role="combobox"
          aria-expanded={showList}
          aria-controls={listId}
          aria-autocomplete="list"
          aria-activedescendant={active >= 0 ? `${listId}-${active}` : undefined}
          onChange={(e) => {
            setQ(e.target.value)
            setOpen(true)
          }}
          onFocus={() => setOpen(true)}
          onKeyDown={(e) => {
            if (!showList || !items.length) return
            if (e.key === 'ArrowDown') {
              e.preventDefault()
              setActive((a) => (a + 1) % items.length)
            } else if (e.key === 'ArrowUp') {
              e.preventDefault()
              setActive((a) => (a <= 0 ? items.length - 1 : a - 1))
            } else if (e.key === 'Escape') {
              setOpen(false)
            }
          }}
          className="h-full min-w-0 flex-1 bg-transparent px-3 text-[15px] text-ink outline-none placeholder:text-muted [&::-webkit-search-cancel-button]:hidden"
        />
        <div className="relative hidden shrink-0 sm:block">
          <label htmlFor={`${id}-type`} className="sr-only">
            Search in
          </label>
          <select
            id={`${id}-type`}
            name="type"
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="h-9 appearance-none rounded-full bg-surface py-0 pl-4 pr-9 text-sm font-semibold text-ink outline-none hover:bg-line/70 focus-visible:outline-2 focus-visible:outline-brand"
          >
            {typeOptions.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
          <ChevronDown className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-muted" aria-hidden="true" />
        </div>
        <button type="submit" className="btn-primary ml-1.5 h-9 shrink-0 px-4 text-sm" aria-label="Search">
          <Search className="size-4 sm:hidden" aria-hidden="true" />
          <span className="hidden sm:inline">Search</span>
        </button>
      </form>

      {showList && (
        <div className="absolute inset-x-0 top-[calc(100%+8px)] z-50 overflow-hidden rounded-2xl border border-line bg-white shadow-lift">
          {loading && !items.length ? (
            <p className="flex items-center gap-2 px-4 py-3 text-sm text-muted">
              <Loader2 className="size-4 animate-spin" aria-hidden="true" /> Searching…
            </p>
          ) : error ? (
            <p className="px-4 py-3 text-sm text-warn">Search is unavailable right now. Press Enter to try the full search page.</p>
          ) : !items.length ? (
            <p className="px-4 py-3 text-sm text-muted">No matches for “{q.trim()}”. Try a store name like “Nike”.</p>
          ) : null}
          <ul id={listId} role="listbox" aria-label="Search suggestions" className="max-h-96 overflow-y-auto py-1.5">
            {items.map((s, i) => {
              const Icon = icons[s.kind]
              return (
                <li
                  key={s.href}
                  id={`${listId}-${i}`}
                  role="option"
                  aria-selected={i === active}
                  onPointerDown={(e) => e.preventDefault()}
                  onClick={() => go(s.href)}
                  onMouseEnter={() => setActive(i)}
                  className={`flex cursor-pointer items-center gap-3 px-4 py-2.5 text-sm ${i === active ? 'bg-brand-50' : ''}`}
                >
                  <Icon className="size-4 shrink-0 text-brand-600" aria-hidden="true" />
                  <span className="min-w-0 flex-1 truncate font-medium text-ink">{s.label}</span>
                  {s.meta && <span className="shrink-0 text-xs text-muted">{s.meta}</span>}
                </li>
              )
            })}
          </ul>
          {items.length > 0 && (
            <button
              type="button"
              onClick={() => go(`/search?q=${encodeURIComponent(q.trim())}&type=${type}`)}
              className="block w-full border-t border-line px-4 py-2.5 text-left text-sm font-semibold text-brand-600 hover:bg-surface"
            >
              See all results for “{q.trim()}”
            </button>
          )}
        </div>
      )}
    </div>
  )
}
