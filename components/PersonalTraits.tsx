'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Target, Lightbulb, Zap, Users, Rocket } from 'lucide-react'

const PersonalTraits = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const traits = [
    {
      icon: Target,
      title: 'Ownership',
      description: 'I take full ownership of features, tasks, and software projects from conception to deployment. I believe in being accountable for the quality and success of every deliverable, ensuring that each component meets the highest standards and aligns with project goals.',
    },
    {
      icon: Lightbulb,
      title: 'Creative Input',
      description: 'I actively contribute creative ideas and innovative solutions to enhance software features. By thinking beyond requirements, I help shape products that are not only functional but also intuitive and engaging for end users.',
    },
    {
      icon: Zap,
      title: 'Execution',
      description: 'I thrive on executing and completing tasks efficiently. My focus is on delivering results with precision and speed, transforming ideas into working solutions while maintaining code quality and meeting deadlines consistently.',
    },
    {
      icon: Users,
      title: 'User-Focused Product',
      description: 'I build software with a user-first mindset, always considering how features impact the end-user experience. By empathizing with user needs and behaviors, I create solutions that are accessible, intuitive, and genuinely solve real-world problems.',
    },
    {
      icon: Rocket,
      title: 'Adaptive to New Technologies',
      description: 'I quickly adapt to new tools, frameworks, and technologies in projects to maximize efficiency and impact. Whether it\'s learning a new library or adopting emerging best practices, I embrace change as an opportunity to grow and deliver better solutions.',
    },
  ]

  return (
    <section id="traits" className="py-20 relative">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title gradient-text">What Drives Me</h2>
          <p className="text-center text-gray-400 mb-12 max-w-2xl mx-auto">
            Core values and traits that define my approach to software development
          </p>

          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {traits.map((trait, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="glass-effect p-6 rounded-2xl card-hover group"
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg group-hover:scale-110 transition-transform">
                    <trait.icon size={24} className="text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors">
                      {trait.title}
                    </h3>
                    <p className="text-gray-400 text-sm leading-relaxed">
                      {trait.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default PersonalTraits
