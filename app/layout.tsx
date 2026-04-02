import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });

export const metadata: Metadata = {
  title: 'FSA Elite Performance | Fontenot\'s Sales Association LLC',
  description: 'The ultimate sales training Bible for elite performers. Master automotive and all-industry sales with proven strategies, VinSolutions & eLeads CRM integration, performance tracking, and exclusive merch.',
  keywords: ['sales training', 'elite performance', 'automotive sales', 'VinSolutions', 'eLeads', 'CRM', 'sales coaching', 'Fontenot', 'dealership', 'FSA'],
  metadataBase: new URL('https://fsaeliteperformance.com'),
  openGraph: {
    title: 'FSA Elite Performance',
    description: 'The Sales Bible - Your path to elite performance',
    url: 'https://fsaeliteperformance.com',
    siteName: 'FSA Elite Performance',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FSA Elite Performance',
    description: 'The Sales Bible - Your path to elite performance',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} ${playfair.variable} font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
