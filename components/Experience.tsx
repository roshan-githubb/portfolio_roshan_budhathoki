'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Briefcase, Calendar } from 'lucide-react'

const Experience = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const experiences = [
    {
      title: 'Full Stack Engineer (Frontend Focused)',
      company: 'Saransa Media Lab',
      location: 'Remote',
      period: 'Sep 2025 - Present',
      description: 'Building modern, scalable web products end-to-end.',
      achievements: [
        'Built SajiloPlay, a multi-game web platform bundling a collection of casual games with a unified UI and instant, no-install play',
        'Shipped a TikTok-style short-video app (infinite-scroll feed, playback, likes & comments) with Next.js 15 and React 18',
        'Built a multivendor e-commerce platform on Medusa.js with a Next.js storefront',
        'Cut load times with code-splitting, lazy loading and bundle optimization',
      ],
      technologies: ['Next.js', 'React', 'TypeScript', 'Medusa.js', 'GraphQL', 'Tailwind CSS', 'Video.js'],
    },
    {
      title: 'Frontend Developer — React / Next.js',
      company: 'Freelance',
      location: 'Remote',
      period: 'Jun 2024 - Mar 2025',
      description: 'Delivered responsive admin panels and dashboards for clients.',
      achievements: [
        'Built data-rich admin dashboards with interactive charts in Next.js and React',
        'Improved UI reliability through cleaner state management and better testing',
        'Integrated REST APIs for real-time data and ensured full mobile responsiveness',
      ],
      technologies: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'REST APIs', 'Agile'],
    },
    {
      title: 'Full Stack Engineer',
      company: 'Cedar Gate Technologies',
      location: 'Lalitpur, Nepal',
      period: 'Oct 2023 - May 2024',
      description: 'Maintained and deployed HIPAA-compliant healthcare data systems.',
      achievements: [
        'Maintained production healthcare systems with React, TypeScript and Java',
        'Deployed to AWS with minimal downtime and managed MySQL data integrity',
        'Automated ETL and database workflows with Python, reducing manual effort',
      ],
      technologies: ['React.js', 'TypeScript', 'Java', 'Python', 'SQL', 'AWS', 'ETL'],
    },
    {
      title: 'Associate Software Engineer',
      company: 'Agile Solutions (merojob.com)',
      location: 'Kathmandu, Nepal',
      period: 'Aug 2022 - Jul 2023',
      description: 'Implemented Microsoft Dynamics 365 Business Central ERP for clients.',
      achievements: [
        'Built ERP modules and React-based interfaces using C#, .NET and AL',
        'Designed client reporting with SQL Server Reporting Services (SSRS)',
        'Migrated and validated customer data into MS SQL Server',
      ],
      technologies: ['C#', '.NET', 'AL', 'SQL Server', 'SSRS', 'React'],
    },
    {
      title: 'Quality Analyst Intern',
      company: 'Inficare',
      location: 'Kathmandu, Nepal',
      period: 'Jan 2022 - Jul 2022',
      description: 'Ensured software quality through testing and defect management.',
      achievements: [
        'Executed manual test cases and tracked defects to resolution with developers',
        'Ran post-release testing to verify production stability',
      ],
      technologies: ['Manual Testing', 'Test Design', 'Bug Tracking', 'QA'],
    },
  ]

  return (
    <section id="experience" className="py-20 relative">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title gradient-text">Work Experience</h2>

          <div className="max-w-5xl mx-auto">
            <div className="relative">
              {/* Timeline line */}
              <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-blue-500 to-purple-600"></div>

              {experiences.map((exp, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className={`relative mb-12 ${
                    index % 2 === 0 ? 'md:pr-1/2' : 'md:pl-1/2 md:ml-auto'
                  }`}
                >
                  {/* Timeline dot */}
                  <div className="hidden md:block absolute top-8 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full border-4 border-slate-900"></div>

                  <div className="glass-effect p-6 md:p-8 rounded-2xl card-hover">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg">
                        <Briefcase size={24} />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl md:text-2xl font-bold text-white mb-1">
                          {exp.title}
                        </h3>
                        <p className="text-blue-400 font-semibold mb-1">{exp.company}</p>
                        <div className="flex items-center gap-2 text-gray-400 text-sm">
                          <Calendar size={16} />
                          <span>{exp.period}</span>
                          <span>•</span>
                          <span>{exp.location}</span>
                        </div>
                      </div>
                    </div>

                    <p className="text-gray-300 mb-4">{exp.description}</p>

                    <ul className="space-y-2 mb-4">
                      {exp.achievements.map((achievement, i) => (
                        <li key={i} className="text-gray-400 text-sm flex items-start">
                          <span className="text-purple-400 mr-2">▹</span>
                          <span>{achievement}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="flex flex-wrap gap-2">
                      {exp.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 bg-blue-500/10 border border-blue-500/30 rounded-full text-xs text-blue-300"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Experience
