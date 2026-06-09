'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const Skills = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const skillCategories = [
    {
      category: 'Frontend',
      skills: ['React.js', 'Next.js', 'TypeScript', 'JavaScript (ES6+)', 'HTML5 & CSS3', 'Tailwind CSS'],
    },
    {
      category: 'Backend',
      skills: ['Node.js', 'Java', 'Spring Boot', 'Python', '.NET / C#', 'REST APIs', 'GraphQL'],
    },
    {
      category: 'Database',
      skills: ['SQL / MySQL', 'PostgreSQL', 'MongoDB', 'SQL Server'],
    },
    {
      category: 'Tools & Cloud',
      skills: ['Git & GitHub', 'AWS', 'Agile / Scrum', 'System Design', 'ETL'],
    },
  ]

  return (
    <section id="skills" className="py-20 relative">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title gradient-text">Skills & Expertise</h2>
          <p className="text-center text-gray-400 mb-12 max-w-2xl mx-auto">
            The tools and technologies I use to ship production-ready software
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
            {skillCategories.map((category, categoryIndex) => (
              <motion.div
                key={category.category}
                initial={{ opacity: 0, x: categoryIndex % 2 === 0 ? -50 : 50 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
                className="glass-effect p-8 rounded-2xl card-hover"
              >
                <h3 className="text-xl font-bold mb-5 text-blue-400">
                  {category.category}
                </h3>
                <div className="flex flex-wrap gap-2.5">
                  {category.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm font-medium text-gray-200 hover:border-blue-500/50 hover:bg-blue-500/10 hover:text-white transition-all duration-200"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Skills
