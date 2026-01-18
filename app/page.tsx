import React from 'react'
import Navigation from '@/components/Navigation'
import Hero from '@/components/Hero'
import About from '@/components/About'
import Skills from '@/components/Skills'
import Experience from '@/components/Experience'
import Education from '@/components/Education'
import Projects from '@/components/Projects'
import Contact from '@/components/Contact'

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <Hero />
      <About />
      <Skills />
      <Experience />
      <Education />
      <Projects />
      <Contact />
    </main>
  )
}
