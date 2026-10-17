import Link from 'next/link'
import { StorePills } from '@/components/ui'
import { getPopularStores } from '@/lib/queries'

export default function NotFound() {
  return (
    <div className="container-page py-16 text-center">
      <p className="text-sm font-bold uppercase tracking-wider text-brand-600">404</p>
      <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">Page not found</h1>
      <p className="mx-auto mt-3 max-w-md text-ink-soft">
        The page may have moved, or the offer may no longer be available. Try one of these popular stores instead.
      </p>
      <div className="mx-auto mt-8 flex max-w-2xl justify-center">
        <StorePills stores={getPopularStores()} />
      </div>
      <div className="mt-8 flex justify-center gap-3">
        <Link href="/" className="btn-primary">
          Go to homepage
        </Link>
        <Link href="/stores" className="btn-outline">
          Browse stores
        </Link>
      </div>
    </div>
  )
}
