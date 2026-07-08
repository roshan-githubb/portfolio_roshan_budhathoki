'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Target, Lightbulb, Zap, Users, Rocket, Bot } from 'lucide-react'

const PersonalTraits = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const traits = [
    {
      icon: Bot,
      title: 'AI-First Velocity',
      description: 'I embraced Agentic AI early and rebuilt my entire workflow around it. By driving Claude Code through planning, coding, and review, and verifying every change myself, I deliver in days what once took weeks, while raising the quality bar, not lowering it.',
    },
    {
      icon: Target,
      title: 'Ownership & Accountability',
      description: 'I take complete ownership of features and projects from start to finish, ensuring every deliverable meets the highest quality standards. I believe in being accountable for both successes and challenges, driving projects forward with dedication and responsibility.',
    },
    {
      icon: Lightbulb,
      title: 'Creative Problem Solving',
      description: 'I bring innovative thinking to every challenge, contributing creative solutions that go beyond basic requirements. By combining technical expertise with imagination, I help build products that are both functional and delightful to use.',
    },
    {
      icon: Zap,
      title: 'Efficient Execution',
      description: 'I excel at transforming ideas into reality with speed and precision. My focus on efficient execution means delivering high-quality code on time, maintaining clean architecture, and consistently meeting project milestones without compromising standards.',
    },
    {
      icon: Users,
      title: 'User-Centric Mindset',
      description: 'Every line of code I write considers the end user. I build software that prioritizes user experience, accessibility, and real-world problem-solving. By empathizing with users, I create intuitive interfaces that people genuinely enjoy using.',
    },
    {
      icon: Rocket,
      title: 'Continuous Learning',
      description: 'I embrace new technologies and methodologies with enthusiasm, constantly expanding my skill set. Whether it\'s mastering a new framework or adopting industry best practices, I view every challenge as an opportunity to grow and deliver even better solutions.',
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
