import Link from 'next/link'

export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <Link
      href="/"
      className="group inline-flex shrink-0 items-center rounded-lg"
      aria-label="CouponCrafty home"
    >
      <span className="leading-none">
        <span className={`block font-extrabold tracking-tight ${compact ? 'text-lg' : 'text-xl sm:text-[22px]'}`}>
          <span className="text-ink">Coupon</span>
          <span className="text-brand">Crafty</span>
        </span>
        {!compact && (
          <span className="mt-0.5 hidden text-[11px] font-semibold tracking-wide text-muted sm:block">
            Coupons &amp; Deals
          </span>
        )}
      </span>
    </Link>
  )
}
