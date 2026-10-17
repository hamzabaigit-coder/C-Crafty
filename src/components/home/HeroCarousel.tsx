'use client'

import { ArrowLeft, ArrowRight, Pause, Play } from 'lucide-react'
import { Children, useCallback, useEffect, useRef, useState, type ReactNode } from 'react'

const INTERVAL = 4000

export function HeroCarousel({ labels, children }: { labels: string[]; children: ReactNode }) {
  const slides = Children.toArray(children)
  const count = slides.length
  const [index, setIndex] = useState(0)
  const [stopped, setStopped] = useState(false) // user pressed the pause button
  const [hovering, setHovering] = useState(false)
  const [focused, setFocused] = useState(false)
  const drag = useRef<{ x: number; y: number } | null>(null)

  // Reduced motion keeps autoplay (with the pause button) but drops the slide animation.
  const playing = !stopped && count > 1
  const paused = hovering || focused

  const go = useCallback((i: number) => setIndex(((i % count) + count) % count), [count])
  // Manual navigation restarts the timer (index changes) instead of stopping autoplay.
  const manual = go

  useEffect(() => {
    if (!playing || paused) return
    const t = setTimeout(() => go(index + 1), INTERVAL)
    return () => clearTimeout(t)
  }, [playing, paused, index, go])

  if (!count) return null

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Featured offers"
      className="overflow-hidden pt-6 pb-2 sm:pt-8"
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      // Pause only for keyboard focus; a mouse click on an arrow shouldn't freeze the slider.
      onFocus={(e) => setFocused((e.target as HTMLElement).matches(':focus-visible'))}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) setFocused(false)
      }}
      onKeyDown={(e) => {
        if ((e.target as HTMLElement).closest('input,select,textarea')) return
        if (e.key === 'ArrowRight') manual(index + 1)
        if (e.key === 'ArrowLeft') manual(index - 1)
      }}
    >
      <div className="container-page">
        <div className="overflow-hidden rounded-3xl">
        <div
          className="flex touch-pan-y gap-4 transition-transform duration-500 ease-out motion-reduce:transition-none [--w:100%]"
          style={{ transform: `translateX(calc((100% - var(--w)) / 2 - ${index} * (var(--w) + 1rem)))` }}
          onPointerDown={(e) => {
            drag.current = { x: e.clientX, y: e.clientY }
          }}
          onPointerUp={(e) => {
            const start = drag.current
            drag.current = null
            if (!start) return
            const dx = e.clientX - start.x
            if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(e.clientY - start.y)) manual(index + (dx < 0 ? 1 : -1))
          }}
          onPointerCancel={() => (drag.current = null)}
        >
          {slides.map((slide, i) => {
            const active = i === index
            return (
              <div
                key={i}
                role="group"
                aria-roledescription="slide"
                aria-label={`${i + 1} of ${count}: ${labels[i] ?? ''}`}
                aria-hidden={!active}
                inert={!active}
                className={`w-[var(--w)] shrink-0 transition-[opacity,scale] duration-500 ${active ? 'opacity-100' : 'scale-[0.97] opacity-45'}`}
              >
                {slide}
              </div>
            )
          })}
        </div>
        </div>

        {count > 1 && (
          <div className="mt-5 flex items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => manual(index - 1)}
              className="grid size-10 place-items-center rounded-full border border-line bg-white text-ink shadow-sm hover:border-brand hover:text-brand-700"
              aria-label="Previous slide"
            >
              <ArrowLeft className="size-4" aria-hidden="true" />
            </button>
            <div className="flex items-center gap-1 rounded-full bg-surface px-2.5 py-2">
              {slides.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => manual(i)}
                  aria-label={`Go to slide ${i + 1}: ${labels[i] ?? ''}`}
                  aria-current={i === index ? 'true' : undefined}
                  className="grid size-5 place-items-center"
                >
                  <span
                    className={`block h-2 rounded-full transition-all ${i === index ? 'w-5 bg-brand' : 'w-2 bg-ink/25 hover:bg-ink/45'}`}
                  />
                </button>
              ))}
            </div>
            <button
              type="button"
              onClick={() => manual(index + 1)}
              className="grid size-10 place-items-center rounded-full border border-line bg-white text-ink shadow-sm hover:border-brand hover:text-brand-700"
              aria-label="Next slide"
            >
              <ArrowRight className="size-4" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => setStopped((s) => !s)}
              className="grid size-10 place-items-center rounded-full text-muted hover:bg-surface hover:text-ink"
              aria-label={stopped ? 'Start automatic slide show' : 'Stop automatic slide show'}
            >
              {stopped ? <Play className="size-4" aria-hidden="true" /> : <Pause className="size-4" aria-hidden="true" />}
            </button>
          </div>
        )}
        <p className="sr-only" aria-live={playing && !paused ? 'off' : 'polite'}>
          Slide {index + 1} of {count}: {labels[index]}
        </p>
      </div>
    </section>
  )
}
