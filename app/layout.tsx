import type { Metadata, Viewport } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: '#3a7d34',
}

export const metadata: Metadata = {
  title: 'FSA Elite Performance | Sales Training for All Industries - $12.99 Lifetime Access',
  description: 'Master sales with FSA Elite Performance. Instant access to 18+ training modules, AI coaching, CRM tools. One-time $12.99 payment. Used by 10,000+ salespeople in automotive, insurance, real estate, and more.',
  keywords: ['sales training', 'elite performance', 'automotive sales', 'VinSolutions', 'eLeads', 'CRM', 'sales coaching', 'Fontenot', 'dealership', 'FSA', 'sales bible', 'car sales training', 'insurance sales', 'real estate sales', 'B2B sales', 'closing techniques', 'objection handling', 'sales course', 'online sales training'],
  metadataBase: new URL('https://fsaeliteperformance.com'),
  alternates: {
    canonical: 'https://fsaeliteperformance.com',
  },
  openGraph: {
    title: 'FSA Elite Performance - Become the Top 1% of Salespeople',
    description: 'Instant full access for just $12.99. 18+ training modules, AI coaching, CRM tools. No subscriptions.',
    url: 'https://fsaeliteperformance.com',
    siteName: 'FSA Elite Performance',
    locale: 'en_US',
    type: 'website',
    images: [{ url: '/images/social-banner.jpg', width: 1200, height: 630, alt: 'FSA Elite Performance Sales Training' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FSA Elite Performance - $12.99 Lifetime Access',
    description: 'Master sales with 18+ training modules, AI coaching, CRM tools. One payment. Forever.',
    images: ['/images/social-banner.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'pending',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${playfair.variable} font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
