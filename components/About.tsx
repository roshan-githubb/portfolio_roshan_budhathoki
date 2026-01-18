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
      title: 'Frontend Expert',
      description: 'Specialized in React, Next.js 15+, TypeScript, and modern UI frameworks',
    },
    {
      icon: <Rocket size={32} />,
      title: 'Full Stack Capable',
      description: 'Proficient in Java, Node.js, SQL, MongoDB, and cloud technologies',
    },
    {
      icon: <Users size={32} />,
      title: 'Team Collaboration',
      description: 'Experienced in Agile methodologies and cross-functional teamwork',
    },
    {
      icon: <Award size={32} />,
      title: 'Quality Focused',
      description: 'Committed to clean code, testing, and performance optimization',
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
                I'm a passionate <span className="text-blue-400 font-semibold">Frontend-Focused Full Stack Engineer</span> with 
                a strong foundation in building modern, scalable web applications. With expertise in <span className="text-purple-400 font-semibold">React, 
                Next.js, and TypeScript</span>, I create responsive and intuitive user interfaces that deliver exceptional user experiences.
              </p>
              <p className="text-lg md:text-xl text-gray-300 leading-relaxed mb-6">
                My journey includes working with diverse technologies from <span className="text-blue-400 font-semibold">JavaScript ecosystems</span> to 
                backend systems using <span className="text-purple-400 font-semibold">Java, Spring Boot, and .NET</span>. I've contributed to healthcare 
                systems, ERP implementations, and freelance projects, always focusing on code quality and performance.
              </p>
              <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
                I'm driven by continuous learning and innovation, seeking opportunities to leverage my technical skills in 
                emerging technologies while collaborating with dynamic teams to build impactful solutions.
              </p>
            </div>
          </div>

          {/* Highlights Grid */}
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
