import type React from 'react'
import './globals.css'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import { Header } from '@/components/header'
import { Toaster } from '@/components/ui/sonner'

export const metadata = {
  title: 'Aurea - AI-Powered Cultural Intelligence',
  description:
    'Discover your ideal audience using taste data and cultural intelligence. A creative assistant for indie creators and niche brands.',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html suppressHydrationWarning lang='en'>
      <body
        className={`min-h-svh bg-gradient-to-br from-stone-50 via-amber-50/30 to-rose-50/20 text-stone-900 dark:from-stone-950 dark:via-stone-900 dark:to-stone-800 dark:text-stone-100 ${GeistSans.className} ${GeistMono.variable} font-sans antialiased`}
        suppressHydrationWarning
      >
        <Header />
        <main className='min-h-[calc(100svh-var(--header-height))]'>
          {children}
          <Toaster duration={3000} richColors closeButton />
        </main>
      </body>
    </html>
  )
}
