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
      skills: [
        { name: 'React.js', level: 95 },
        { name: 'Next.js', level: 92 },
        { name: 'TypeScript', level: 90 },
        { name: 'JavaScript (ES6+)', level: 95 },
        { name: 'HTML5 & CSS3', level: 95 },
        { name: 'Tailwind CSS', level: 90 },
      ],
    },
    {
      category: 'Backend',
      skills: [
        { name: 'Node.js', level: 80 },
        { name: 'Java', level: 85 },
        { name: 'Spring Boot', level: 75 },
        { name: '.NET / C#', level: 70 },
      ],
    },
    {
      category: 'Database',
      skills: [
        { name: 'SQL / MySQL', level: 85 },
        { name: 'MongoDB', level: 80 },
        { name: 'SQL Server', level: 75 },
      ],
    },
    {
      category: 'Tools & Others',
      skills: [
        { name: 'Git & GitHub', level: 90 },
        { name: 'AWS', level: 70 },
        { name: 'Linux', level: 75 },
        { name: 'Postman / API Testing', level: 85 },
      ],
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {skillCategories.map((category, categoryIndex) => (
              <motion.div
                key={category.category}
                initial={{ opacity: 0, x: categoryIndex % 2 === 0 ? -50 : 50 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
                className="glass-effect p-8 rounded-2xl"
              >
                <h3 className="text-2xl font-bold mb-6 text-blue-400">
                  {category.category}
                </h3>
                <div className="space-y-6">
                  {category.skills.map((skill, skillIndex) => (
                    <div key={skill.name}>
                      <div className="flex justify-between mb-2">
                        <span className="text-gray-300 font-medium">{skill.name}</span>
                        <span className="text-purple-400 font-semibold">{skill.level}%</span>
                      </div>
                      <div className="h-3 bg-gray-800 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={inView ? { width: `${skill.level}%` } : {}}
                          transition={{ duration: 1, delay: categoryIndex * 0.1 + skillIndex * 0.1 }}
                          className="h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"
                        />
                      </div>
                    </div>
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
