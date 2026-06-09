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
      title: 'End-to-End Delivery',
      description: 'React & Next.js front to Java, Node and SQL back',
    },
    {
      icon: <Rocket size={32} />,
      title: 'Ships Fast',
      description: 'Turns ideas into production features quickly',
    },
    {
      icon: <Users size={32} />,
      title: 'Team Player',
      description: 'Agile workflows and cross-functional collaboration',
    },
    {
      icon: <Award size={32} />,
      title: 'Quality First',
      description: 'Clean code, performance and best practices',
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
                I&apos;m a <span className="text-blue-400 font-semibold">Full Stack Engineer</span> who builds
                modern, scalable web apps end-to-end — strongest in <span className="text-blue-400 font-semibold">React,
                Next.js and TypeScript</span> on the front, with <span className="text-purple-400 font-semibold">Java,
                Node and SQL</span> on the back.
              </p>
              <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
                Over the last few years I&apos;ve shipped social platforms, e-commerce systems, healthcare tooling
                and enterprise ERP — across startups and U.S. clients. I care about clean code, fast load times
                and interfaces people actually enjoy using. <span className="text-purple-400 font-semibold">Currently open to new opportunities.</span>
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
