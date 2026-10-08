import React from 'react'
import Navigation from '@/components/Navigation'
import Hero from '@/components/Hero'
import About from '@/components/About'
import AgenticAI from '@/components/AgenticAI'
import Skills from '@/components/Skills'
import Experience from '@/components/Experience'
import Education from '@/components/Education'
import Projects from '@/components/Projects'
import PersonalTraits from '@/components/PersonalTraits'
import Contact from '@/components/Contact'
import Chatbot from '@/components/Chatbot'
import Background3D from '@/components/Background3D'

export default function Home() {
  return (
    <main className="min-h-screen">
      <Background3D />
      <Navigation />
      <Hero />
      <About />
      <AgenticAI />
      <Skills />
      <Experience />
      <Projects />
      <PersonalTraits />
      <Education />
      <Contact />
      <Chatbot />
    </main>
  )
}
