'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Bot, Monitor, Server, Database, Cloud } from 'lucide-react'

const Skills = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const agenticSkills = [
    'Claude Code',
    'Cursor',
    'Prompt & Context Engineering',
    'AI-Assisted Code Review & Verification',
    'LLM API Integration',
  ]

  const skillCategories = [
    {
      category: 'Frontend',
      icon: <Monitor size={22} />,
      skills: ['React.js', 'Next.js', 'TypeScript', 'JavaScript (ES6+)', 'HTML5 & CSS3', 'Tailwind CSS'],
    },
    {
      category: 'Backend',
      icon: <Server size={22} />,
      skills: ['Node.js', 'Java', 'Spring Boot', 'Python', '.NET / C#', 'REST APIs', 'GraphQL'],
    },
    {
      category: 'Database',
      icon: <Database size={22} />,
      skills: ['SQL / MySQL', 'PostgreSQL', 'MongoDB', 'SQL Server', 'Aurora / RDS'],
    },
    {
      category: 'Cloud, DevOps & Tools',
      icon: <Cloud size={22} />,
      skills: ['AWS (EC2, S3, Aurora, RDS)', 'CI/CD Pipelines', 'PM2', 'Git & GitHub', 'System Design', 'Firebase'],
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

          {/* Featured: Agentic AI & Development */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="max-w-6xl mx-auto mb-8 p-[2px] rounded-2xl bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 animate-glow"
          >
            <div className="bg-slate-950/90 backdrop-blur-lg p-8 rounded-2xl">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600">
                  <Bot size={22} />
                </div>
                <h3 className="text-2xl font-bold gradient-text">Agentic AI & Development ⚡</h3>
              </div>
              <p className="text-gray-400 text-sm mb-6">
                My superpower: the workflows behind how fast I build and ship
              </p>
              <div className="flex flex-wrap gap-3">
                {agenticSkills.map((skill, index) => (
                  <motion.span
                    key={skill}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={inView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="px-4 py-2 rounded-full text-sm font-medium bg-gradient-to-r from-blue-500/15 to-purple-500/15 border border-purple-500/40 text-gray-200 hover:scale-110 hover:border-purple-400 transition-all duration-300 cursor-default"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {skillCategories.map((category, categoryIndex) => (
              <motion.div
                key={category.category}
                initial={{ opacity: 0, x: categoryIndex % 2 === 0 ? -50 : 50 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
                className="glass-effect p-8 rounded-2xl card-hover"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600">
                    {category.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-blue-400">{category.category}</h3>
                </div>
                <div className="flex flex-wrap gap-3">
                  {category.skills.map((skill, skillIndex) => (
                    <motion.span
                      key={skill}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={inView ? { opacity: 1, scale: 1 } : {}}
                      transition={{ duration: 0.3, delay: categoryIndex * 0.1 + skillIndex * 0.05 }}
                      className="px-4 py-2 glass-effect rounded-full text-sm font-medium text-gray-300 hover:scale-110 hover:bg-white/10 hover:text-white transition-all duration-300 cursor-default"
                    >
                      {skill}
                    </motion.span>
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
