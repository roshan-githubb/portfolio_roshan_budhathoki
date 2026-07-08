'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Code2, Rocket, Users, Award, Bot } from 'lucide-react'

const About = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const highlights = [
    {
      icon: <Bot size={32} />,
      title: 'Agentic AI Engineering',
      description: 'Building with Claude Code and AI-driven workflows to ship products dramatically faster',
    },
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
                I ship <span className="text-blue-400 font-semibold">products</span>, not just code. <span className="text-green-400 font-semibold">4+ years</span> as a Full Stack Product Engineer. Since going all-in on <span className="text-purple-400 font-semibold">Agentic AI</span>, I build in days what used to take weeks. Same quality bar, <span className="text-pink-400 font-semibold">a fraction of the time</span>.
              </p>
              <p className="text-lg md:text-xl text-gray-300 leading-relaxed mb-6">
                Healthcare platforms, e-commerce marketplaces, video social apps, all delivered <span className="text-blue-400 font-semibold">end to end</span>, from UI to database to AWS deployment. And with agentic development, <span className="text-purple-400 font-semibold">your stack is my stack</span>: any language, any framework, production-ready from day one.
              </p>
              <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
                If you need an engineer who <span className="text-blue-400 font-semibold">takes ownership</span>, <span className="text-purple-400 font-semibold">moves fast</span>, and <span className="text-pink-400 font-semibold">raises the bar</span>, let&apos;s talk.
              </p>
            </div>
          </div>
            
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
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
