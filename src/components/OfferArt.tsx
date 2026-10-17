import {
  BookOpen,
  Clapperboard,
  Dumbbell,
  GraduationCap,
  Headphones,
  Laptop,
  Lamp,
  Lock,
  type LucideIcon,
  Mountain,
  Palette,
  Plane,
  Popcorn,
  ShieldCheck,
  Shirt,
  ShoppingBag,
  Sofa,
  Sparkles,
  Sprout,
  Ticket,
  Footprints,
  Luggage,
  Palmtree,
  Pizza,
  Smartphone,
  Soup,
  Bike,
  Gem,
  Droplet,
} from 'lucide-react'
import type { CategorySlug } from '@/lib/types'

interface Theme {
  bg: [string, string]
  blob: string
  icons: [LucideIcon, LucideIcon, LucideIcon]
}

const themes: Record<CategorySlug, Theme> = {
  electronics: { bg: ['#E6F0FF', '#C9DBFF'], blob: '#9DBBFF', icons: [Laptop, Headphones, Smartphone] },
  fashion: { bg: ['#FFEFF3', '#FFD3DF'], blob: '#FFB0C6', icons: [Shirt, ShoppingBag, Gem] },
  'home-garden': { bg: ['#FFF4E3', '#FFE0B5'], blob: '#FFC97A', icons: [Sofa, Lamp, Sprout] },
  travel: { bg: ['#E3F7FB', '#BDEAF4'], blob: '#86D6E8', icons: [Plane, Luggage, Palmtree] },
  'food-delivery': { bg: ['#FFF0E8', '#FFD6C2'], blob: '#FFB08A', icons: [Pizza, Soup, Bike] },
  beauty: { bg: ['#F7EEFF', '#E8D5FF'], blob: '#D2B0FF', icons: [Sparkles, Droplet, Palette] },
  'software-vpn': { bg: ['#E9F7EE', '#C7EBD3'], blob: '#93D7AA', icons: [ShieldCheck, Lock, Laptop] },
  'sports-outdoors': { bg: ['#EAF6E6', '#CDEBC2'], blob: '#A3D98F', icons: [Footprints, Dumbbell, Mountain] },
  entertainment: { bg: ['#FFF7DD', '#FFEAA6'], blob: '#FFD860', icons: [Ticket, Popcorn, Clapperboard] },
  education: { bg: ['#EAF0FF', '#D3DDFF'], blob: '#A9BBFF', icons: [GraduationCap, BookOpen, Laptop] },
}

/**
 * Original illustrated artwork used in place of stock photography. Each
 * category gets its own palette and icon set; `accent` tints the main icon.
 */
export function OfferArt({
  theme,
  accent = '#172033',
  className = '',
  variant = 'card',
}: {
  theme: CategorySlug
  accent?: string
  className?: string
  variant?: 'card' | 'hero'
}) {
  const t = themes[theme]
  const [Main, Second, Third] = t.icons
  const hero = variant === 'hero'
  return (
    <div
      className={`relative isolate overflow-hidden ${className}`}
      style={{ background: `linear-gradient(135deg, ${t.bg[0]}, ${t.bg[1]})` }}
      aria-hidden="true"
    >
      <span
        className="absolute -right-[12%] -top-[30%] aspect-square w-[60%] rounded-full opacity-60"
        style={{ background: t.blob }}
      />
      <span
        className="absolute -bottom-[35%] left-[8%] aspect-square w-[42%] rounded-full opacity-40"
        style={{ background: t.blob }}
      />
      <span className="absolute left-[14%] top-[18%] size-3 rounded-full bg-white/80" />
      <span className="absolute bottom-[20%] right-[30%] size-2 rounded-full bg-white/80" />
      <div className="absolute inset-0 flex items-center justify-center gap-[6%]">
        <span className="grid aspect-square w-[20%] -rotate-6 place-items-center rounded-[22%] bg-white/70 shadow-sm backdrop-blur-sm">
          <Second className="h-1/2 w-1/2" strokeWidth={1.75} color="#3D4658" />
        </span>
        <span className={`grid aspect-square place-items-center rounded-[26%] bg-white shadow-lg ${hero ? 'w-[34%]' : 'w-[30%]'}`}>
          <Main className="h-1/2 w-1/2" strokeWidth={1.6} color={accent} />
        </span>
        <span className="grid aspect-square w-[20%] rotate-6 place-items-center rounded-[22%] bg-white/70 shadow-sm backdrop-blur-sm">
          <Third className="h-1/2 w-1/2" strokeWidth={1.75} color="#3D4658" />
        </span>
      </div>
    </div>
  )
}
