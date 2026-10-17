import type { Metadata, Viewport } from 'next'
import { Plus_Jakarta_Sans } from 'next/font/google'
import Script from 'next/script'
import { Footer } from '@/components/Footer'
import { Header } from '@/components/header/Header'
import { JsonLd } from '@/components/JsonLd'
import { OfferRevealProvider } from '@/components/offer/OfferReveal'
import { absoluteUrl, site } from '@/lib/site'
import './globals.css'

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-jakarta',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — Promo Codes, Coupons & Online Deals`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  openGraph: {
    type: 'website',
    siteName: site.name,
    locale: 'en_US',
    url: site.url,
  },
  twitter: { card: 'summary_large_image' },
  formatDetection: { telephone: false },
}

export const viewport: Viewport = {
  themeColor: '#008A2E',
  width: 'device-width',
  initialScale: 1,
}

// Google Tag Manager for PPC/analytics conversions. Only loads when an ID is configured.
const gtmId = /^GTM-[A-Z0-9]+$/.test(process.env.NEXT_PUBLIC_GTM_ID ?? '') ? process.env.NEXT_PUBLIC_GTM_ID : undefined

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="en-US" className={jakarta.variable}>
      <body>
        <OfferRevealProvider>
          <Header />
          <main id="main">{children}</main>
          <Footer />
        </OfferRevealProvider>
        <JsonLd
          data={[
            {
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: site.name,
              url: site.url,
              logo: absoluteUrl('/icon.svg'),
            },
            {
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              name: site.name,
              url: site.url,
            },
          ]}
        />
        {gtmId && (
          <Script id="gtm" strategy="afterInteractive">
            {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${gtmId}');`}
          </Script>
        )}
      </body>
    </html>
  )
}
