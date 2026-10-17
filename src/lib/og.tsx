import { ImageResponse } from 'next/og'

export const ogSize = { width: 1200, height: 630 }

/** Shared Open Graph card layout: brand mark, eyebrow, big title. */
export function ogCard({ eyebrow, title }: { eyebrow: string; title: string }) {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: 72,
          background: 'linear-gradient(135deg, #FFFFFF 0%, #EBF7EF 100%)',
          color: '#172033',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          <div
            style={{
              width: 72,
              height: 72,
              borderRadius: 20,
              background: '#008A2E',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: 44,
              fontWeight: 800,
            }}
          >
            C
          </div>
          <div style={{ display: 'flex', fontSize: 40, fontWeight: 800 }}>
            <span>Coupon</span>
            <span style={{ color: '#008A2E' }}>Crafty</span>
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          <div style={{ fontSize: 28, fontWeight: 700, color: '#007A29', textTransform: 'uppercase', letterSpacing: 2 }}>
            {eyebrow}
          </div>
          <div style={{ fontSize: title.length > 60 ? 58 : 68, fontWeight: 800, lineHeight: 1.1 }}>{title}</div>
        </div>
        <div style={{ display: 'flex', height: 12, width: 240, borderRadius: 6, background: '#008A2E' }} />
      </div>
    ),
    ogSize,
  )
}
