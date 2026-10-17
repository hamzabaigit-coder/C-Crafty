'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import type { NavMenu } from './navData'

export function MainNav({ menus }: { menus: NavMenu[] }) {
  const pathname = usePathname()

  // "Coupons" shouldn't light up on /coupons/trending, which has its own item.
  const isActive = (m: NavMenu) =>
    pathname === m.href ||
    (pathname.startsWith(`${m.href}/`) && !menus.some((o) => o.href.length > m.href.length && pathname.startsWith(o.href)))

  return (
    <nav aria-label="Main" className="hidden bg-brand-700 lg:block">
      <ul className="container-page flex items-center justify-between py-1.5">
        {menus.map((m) => {
          const active = isActive(m)
          return (
            <li key={m.href}>
              <Link
                href={m.href}
                aria-current={active ? 'page' : undefined}
                className={`block rounded-full px-3.5 py-2 text-[15px] font-semibold transition-colors ${
                  active ? 'bg-white text-brand-700' : 'text-white hover:bg-white/15'
                }`}
              >
                {m.label}
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
