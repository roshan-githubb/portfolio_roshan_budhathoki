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
      description: 'I take features from idea to production and stand behind what I ship.',
    },
    {
      icon: Lightbulb,
      title: 'Creative Problem Solving',
      description: 'I look past the obvious fix to find solutions that scale.',
    },
    {
      icon: Zap,
      title: 'Efficient Execution',
      description: 'High-quality code, delivered on time, without cutting corners.',
    },
    {
      icon: Users,
      title: 'User-Centric',
      description: 'I build intuitive interfaces people genuinely enjoy using.',
    },
    {
      icon: Rocket,
      title: 'Always Learning',
      description: 'New frameworks and tools are an opportunity, not a hurdle.',
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
