'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Code2, Rocket, Users, Award } from 'lucide-react'

const About = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const highlights = [
    {
      icon: <Code2 size={32} />,
      title: 'Full Stack Development',
      description: 'Expert in React, Next.js, TypeScript, Java, and modern web technologies',
    },
    {
      icon: <Rocket size={32} />,
      title: 'Fast Learner & Adaptable',
      description: 'Quick to master new technologies and adapt to changing project requirements',
    },
    {
      icon: <Users size={32} />,
      title: 'Team Collaboration',
      description: 'Experienced in Agile methodologies and cross-functional teamwork',
    },
    {
      icon: <Award size={32} />,
      title: 'Quality Focused',
      description: 'Committed to clean code, best practices, and performance optimization',
    },
  ]

  return (
    <section id="about" className="py-20 relative">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title gradient-text">About Me</h2>

          <div className="max-w-4xl mx-auto mb-16">
            <div className="glass-effect p-8 md:p-12 rounded-2xl">
              <p className="text-lg md:text-xl text-gray-300 leading-relaxed mb-6">
                I&apos;m a passionate <span className="text-blue-400 font-semibold">Full Stack Engineer</span> with 
                extensive experience in building modern, scalable web applications. As a <span className="text-purple-400 font-semibold">fast learner and adaptable developer</span>, I quickly master new technologies and frameworks, delivering end-to-end solutions with expertise in <span className="text-blue-400 font-semibold">React, Next.js, TypeScript, Java, and SQL</span>.
              </p>
              <p className="text-lg md:text-xl text-gray-300 leading-relaxed mb-6">
                My journey spans diverse technologies from <span className="text-blue-400 font-semibold">JavaScript ecosystems</span> to 
                enterprise systems using <span className="text-purple-400 font-semibold">Java, Spring Boot, and .NET</span>. I&apos;ve successfully adapted to various tech stacks including Medusa.js, Business Central, and cloud platforms, consistently delivering high-quality, performant solutions.
              </p>
              <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
                Driven by continuous learning and innovation, I thrive on solving complex problems and quickly adapting to new challenges. 
                I&apos;m seeking opportunities to contribute my full-stack expertise and adaptability to dynamic teams and impactful projects.
              </p>
            </div>
          </div>
            
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {highlights.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="glass-effect p-6 rounded-xl card-hover text-center"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 mb-4">
                  {item.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-400 text-sm">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default About
