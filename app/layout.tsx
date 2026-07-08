import React from 'react'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Script from 'next/script'
import './globals.css'
import FirebaseAnalytics from '@/components/FirebaseAnalytics'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Roshan Budhathoki - Full Stack Product Engineer | Agentic AI Developer',
  description: 'Full Stack Product Engineer and Agentic AI Developer with 4+ years of experience, shipping products in days instead of weeks with AI-driven workflows (Claude Code, Cursor). Expert in React, Next.js, TypeScript, Java, SQL, and MongoDB, ready to ship in any tool, language, or framework.',
  keywords: 'Full Stack Product Engineer, Agentic AI Developer, AI-Powered Development, Claude Code, Cursor, Full Stack Engineer, React, Next.js, TypeScript, JavaScript, Java, Spring Boot, SQL, MongoDB, Node.js, Web Developer, Software Engineer, Kathmandu, Nepal',
  authors: [{ name: 'Roshan Budhathoki' }],
  openGraph: {
    title: 'Roshan Budhathoki - Full Stack Product Engineer | Agentic AI Developer',
    description: 'Shipping products in days instead of weeks with Agentic AI development. Full Stack Product Engineer working across any tool, language, or framework, with quality-first output.',
    type: 'website',
    locale: 'en_US',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={inter.className}>
        {process.env.NODE_ENV === 'development' && (
          <Script id="firebase-debug" strategy="beforeInteractive">
            {`window['GA_DEBUG'] = true;`}
          </Script>
        )}
        <FirebaseAnalytics />
        {children}
      </body>
    </html>
  )
}
