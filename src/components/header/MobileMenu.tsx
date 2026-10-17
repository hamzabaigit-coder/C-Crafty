'use client'

import { Menu, X } from 'lucide-react'
import Link from 'next/link'
import { useRef } from 'react'
import type { NavMenu } from './navData'

export function MobileMenu({ menus }: { menus: NavMenu[] }) {
  const ref = useRef<HTMLDialogElement>(null)
  const close = () => ref.current?.close()

  return (
    <>
      <button
        type="button"
        onClick={() => ref.current?.showModal()}
        className="-mr-2 rounded-full p-2.5 text-ink hover:bg-surface lg:hidden"
        aria-label="Open menu"
        aria-haspopup="dialog"
      >
        <Menu className="size-6" aria-hidden="true" />
      </button>
      <dialog
        ref={ref}
        aria-label="Site menu"
        className="m-0 ml-auto h-dvh max-h-dvh w-[min(88vw,24rem)] max-w-none bg-white p-0 text-ink shadow-lift"
        onClick={(e) => {
          if (e.target === ref.current || (e.target as HTMLElement).closest('a')) close()
        }}
      >
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between border-b border-line px-4 py-3">
            <span className="text-lg font-extrabold">Menu</span>
            <button
              type="button"
              onClick={close}
              className="rounded-full p-2 text-muted hover:bg-surface hover:text-ink"
              aria-label="Close menu"
            >
              <X className="size-6" aria-hidden="true" />
            </button>
          </div>
          <nav aria-label="Mobile" className="flex-1 overflow-y-auto px-2 py-2">
            <ul>
              {menus.map((m) => (
                <li key={m.label} className="border-b border-line last:border-0">
                  <Link href={m.href} className="block rounded-lg px-3 py-3.5 text-base font-semibold hover:bg-surface">
                    {m.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="border-t border-line p-4 text-sm text-muted">
            <Link href="/about" className="hover:text-ink">About</Link>
            <span aria-hidden="true"> · </span>
            <Link href="/contact" className="hover:text-ink">Contact</Link>
            <span aria-hidden="true"> · </span>
            <Link href="/affiliate-disclosure" className="hover:text-ink">Affiliate disclosure</Link>
          </div>
        </div>
      </dialog>
    </>
  )
}
