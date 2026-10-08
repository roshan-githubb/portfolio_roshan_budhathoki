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
import DepthSection from '@/components/DepthSection'

export default function Home() {
  return (
    <main className="min-h-screen">
      <Background3D />
      <Navigation />
      {/* The hero is already in front of you on load, so it only moves away */}
      <DepthSection approach={false}>
        <Hero />
      </DepthSection>
      <DepthSection>
        <About />
      </DepthSection>
      <DepthSection>
        <AgenticAI />
      </DepthSection>
      <DepthSection>
        <Skills />
      </DepthSection>
      <DepthSection>
        <Experience />
      </DepthSection>
      <DepthSection>
        <Projects />
      </DepthSection>
      <DepthSection>
        <PersonalTraits />
      </DepthSection>
      <DepthSection>
        <Education />
      </DepthSection>
      <DepthSection>
        <Contact />
      </DepthSection>
      <Chatbot />
    </main>
  )
}
