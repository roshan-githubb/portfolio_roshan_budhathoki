'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { GraduationCap, Award } from 'lucide-react'

const Education = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const education = [
    {
      degree: 'Bachelor (Hons) Computing',
      institution: 'Softwarica College of IT and E-Commerce',
      university: 'Coventry University, United Kingdom',
      period: 'September 2021',
      grade: '70% (First Class)',
      description: 'Comprehensive computing program covering software development, web technologies, databases, and system design.',
    },
    {
      degree: 'Higher Secondary (+2 Science)',
      institution: 'National Integrated College (NIC)',
      university: 'National Examinations Board (NEB), Nepal',
      period: 'July 2018',
      grade: '70%',
      description: 'Science stream with focus on Mathematics, Physics, and Computer Science.',
    },
    {
      degree: 'School Leaving Certificate (SLC)',
      institution: 'Motherland Academy',
      university: 'National Examinations Board (NEB), Nepal',
      period: 'July 2015',
      grade: '67%',
      description: 'Secondary education with strong foundation in core subjects.',
    },
  ]

  return (
    <section id="education" className="py-20 relative">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title gradient-text">Education</h2>

          <div className="max-w-4xl mx-auto space-y-8">
            {education.map((edu, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="glass-effect p-6 md:p-8 rounded-2xl card-hover"
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex-shrink-0">
                    <GraduationCap size={28} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl md:text-2xl font-bold text-white mb-2">
                      {edu.degree}
                    </h3>
                    <p className="text-blue-400 font-semibold mb-1">{edu.institution}</p>
                    <p className="text-gray-400 text-sm mb-2">{edu.university}</p>
                    <div className="flex flex-wrap items-center gap-3 mb-3">
                      <span className="text-gray-400 text-sm">{edu.period}</span>
                      <span className="px-3 py-1 bg-green-500/10 border border-green-500/30 rounded-full text-sm text-green-300 flex items-center gap-1">
                        <Award size={14} />
                        {edu.grade}
                      </span>
                    </div>
                    <p className="text-gray-300 text-sm">{edu.description}</p>
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

export default Education
