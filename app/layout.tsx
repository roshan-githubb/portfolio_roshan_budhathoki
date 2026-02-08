import React from 'react'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Roshan Budhathoki - Full Stack Engineer',
  description: 'Experienced Full Stack Engineer specializing in React, Next.js, TypeScript, JavaScript, Java, SQL, and MongoDB. Building scalable, high-performance web applications with modern technologies.',
  keywords: 'Full Stack Engineer, Full Stack Developer, React, Next.js, TypeScript, JavaScript, Java, Spring Boot, SQL, MongoDB, Node.js, Web Developer, Software Engineer, Kathmandu, Nepal',
  authors: [{ name: 'Roshan Budhathoki' }],
  openGraph: {
    title: 'Roshan Budhathoki - Full Stack Engineer',
    description: 'Experienced Full Stack Engineer specializing in React, Next.js, TypeScript, and modern web technologies. Building scalable, high-performance applications.',
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
