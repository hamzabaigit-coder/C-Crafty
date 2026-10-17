import type { Store } from '@/lib/types'

const sizes = {
  sm: 'size-12 rounded-lg',
  md: 'size-16 rounded-xl',
  lg: 'size-24 rounded-2xl sm:size-28',
}

/**
 * Text wordmark tile in the retailer's brand color. Intentionally not the
 * retailer's logo artwork — replace with licensed logo files if available.
 */
export function StoreLogo({
  store,
  size = 'md',
}: {
  store: Pick<Store, 'brandColor' | 'brandText' | 'logoText'>
  size?: keyof typeof sizes
}) {
  // Fit the longest word inside the tile; multi-word names wrap onto two lines.
  const text = store.logoText
  const longest = Math.max(...text.split(' ').map((w) => w.length))
  const upper = text.replace(/[^A-Z]/g, '').length / text.length > 0.5
  const [inner, maxPx] = size === 'lg' ? [96, 26] : size === 'md' ? [54, 16] : [40, 13]
  const fontSize = `${Math.min(maxPx, inner / (longest * (upper ? 0.72 : 0.6))).toFixed(1)}px`
  const light = store.brandColor.toUpperCase() === '#FFFFFF'
  return (
    <span
      className={`${sizes[size]} grid shrink-0 place-items-center overflow-hidden border px-1 text-center font-extrabold leading-[1.05] tracking-tight ${light ? 'border-line' : 'border-transparent'}`}
      style={{ backgroundColor: store.brandColor, color: store.brandText, fontSize }}
      aria-hidden="true"
    >
      {store.logoText}
    </span>
  )
}
