'use client'

import Link from 'next/link'

export default function Error({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <div className="container-page py-16 text-center">
      <h1 className="text-3xl font-extrabold tracking-tight text-ink">Something went wrong</h1>
      <p className="mx-auto mt-3 max-w-md text-ink-soft">
        We couldn&apos;t load this page. Please try again in a moment.
      </p>
      <div className="mt-8 flex justify-center gap-3">
        <button type="button" onClick={reset} className="btn-primary">
          Try again
        </button>
        <Link href="/" className="btn-outline">
          Go to homepage
        </Link>
      </div>
    </div>
  )
}
