import { Flame, Store } from 'lucide-react'
import Link from 'next/link'
import { Logo } from '../Logo'
import { HeaderSearch } from './HeaderSearch'
import { MainNav } from './MainNav'
import { MobileMenu } from './MobileMenu'
import { buildNav } from './navData'

export function Header() {
  const menus = buildNav()
  return (
    <header className="relative z-30 border-b border-line bg-white">
      <a
        href="#main"
        className="sr-only z-50 rounded-full bg-ink px-4 py-2 text-white focus:not-sr-only focus:absolute focus:left-4 focus:top-3"
      >
        Skip to content
      </a>
      <div className="container-page flex items-center gap-4 py-3 lg:gap-8 lg:py-4">
        <Logo />
        <div className="hidden flex-1 md:block md:max-w-xl lg:max-w-2xl">
          <HeaderSearch id="search-desktop" />
        </div>
        <div className="ml-auto flex items-center gap-1 md:ml-0 lg:ml-auto">
          <Link
            href="/coupons/trending"
            className="hidden items-center gap-1.5 rounded-full px-3 py-2 text-sm font-semibold text-ink hover:bg-surface hover:text-brand-700 xl:inline-flex"
          >
            <Flame className="size-4 text-brand" aria-hidden="true" />
            Today’s Deals
          </Link>
          <Link
            href="/stores"
            className="hidden items-center gap-1.5 rounded-full px-3 py-2 text-sm font-semibold text-ink hover:bg-surface hover:text-brand-700 sm:inline-flex"
          >
            <Store className="size-4 text-brand" aria-hidden="true" />
            Stores A–Z
          </Link>
          <MobileMenu menus={menus} />
        </div>
      </div>
      <div className="container-page pb-3 md:hidden">
        <HeaderSearch id="search-mobile" />
      </div>
      <MainNav menus={menus} />
    </header>
  )
}
