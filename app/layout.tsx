import React from 'react'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Roshan Budhathoki - Frontend-Focused Full Stack Engineer',
  description: 'Experienced Full Stack Engineer specializing in React, Next.js, TypeScript, and modern web technologies. Building scalable, responsive applications with expertise in frontend development.',
  keywords: 'Frontend Developer, Full Stack Engineer, React, Next.js, TypeScript, JavaScript, Java, SQL, MongoDB, Web Developer, Kathmandu',
  authors: [{ name: 'Roshan Budhathoki' }],
  openGraph: {
    title: 'Roshan Budhathoki - Frontend-Focused Full Stack Engineer',
    description: 'Experienced Full Stack Engineer specializing in React, Next.js, TypeScript, and modern web technologies.',
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
      <body className={inter.className}>{children}</body>
    </html>
  )
}
