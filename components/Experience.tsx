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
      title: 'Full Stack Software Engineer(Frontend Focused)',
      company: 'Saransa Media Lab',
      location: 'Remote',
      period: 'September 2025 - Present',
      description: 'Building modern web applications with focus on scalable architecture and user experience.',
      achievements: [
        'Built TikTok-inspired short-form video social media app with Next.js and React featuring infinite scroll, video playback, likes, comments, and user profiles',
        'Developed multivendor e-commerce platform using Medusa.js and Mercurius backend with Next.js frontend',
        'Created responsive and scalable UIs using Next.js 15+, React 18+, and TypeScript',
        'Built reusable component libraries with React Hooks and Context API',
        'Integrated RESTful APIs for dynamic data handling and real-time updates',
        'Optimized performance through code-splitting, lazy loading, and bundle optimization',
        'Quickly adapted to new technologies including Medusa.js ecosystem and video streaming solutions',
        'Collaborated with designers and backend teams using Agile methodologies',
      ],
      technologies: ['Next.js', 'React', 'TypeScript', 'Medusa.js', 'Mercurius', 'JavaScript', 'Tailwind CSS', 'Video.js', 'HTML', 'CSS', 'REST APIs', 'GraphQL', 'Git'],
    },
    {
      title: 'Frontend Developer - React/Next.js',
      company: 'Freelance',
      location: 'Remote',
      period: 'June 2024 - March 2025',
      description: 'Specialized in developing responsive and scalable user interfaces with modern frontend technologies.',
      achievements: [
        'Developed responsive and scalable user interfaces of Admin Panel and dashboards with charts using Next.js 15+, React 18+, JavaScript (ES6+), HTML, and CSS',
        'Collaborated closely with designers and backend teams to deliver seamless user experiences',
        'Built reusable components and implemented efficient state management with React Hooks and Context API',
        'Integrated RESTful APIs for dynamic data handling',
        'Optimized performance through code-splitting and lazy loading',
        'Ensured cross-browser and mobile responsiveness',
        'Followed Git-based version control and Agile development practices',
        'Contributed to improved UI quality by reducing UI issues through better testing and clean code standards',
      ],
      technologies: ['Next.js', 'React', 'TypeScript', 'JavaScript', 'HTML', 'CSS', 'Tailwind CSS', 'REST APIs', 'Git', 'Agile'],
    },
    {
      title: 'Full Stack Software Engineer',
      company: 'Cedar Gate Technologies',
      location: 'Sanepa, Laitpur',
      period: 'October 2023 - May 2024',
      description: 'Worked on healthcare data systems with focus on bug fixes, feature development, and cloud deployments.',
      achievements: [
        'Resolved client tickets including bug fixes and feature requests',
        'Maintained production systems using JavaScript, TypeScript, Java, and React.js',
        'Deployed updates to AWS cloud environments with minimal downtime',
        'Managed MySQL databases, performed backups, and ensured data integrity',
        'Developed Python automation scripts to streamline data processing and ETL workflows for healthcare databases',
        'Automated repetitive SQL database operations including data validation, transformation, and migration tasks',
        'Created Python scripts for batch data imports, exports, and scheduled database maintenance tasks',
        'Gained practical understanding of HIPAA compliance for U.S. healthcare systems',
        'Created knowledge base articles to improve team efficiency',
      ],
      technologies: ['React.js', 'TypeScript', 'JavaScript', 'Java', 'Python', 'SQL', 'AWS', 'MySQL', 'Unix/Linux', 'ETL'],
    },
    {
      title: 'Associate Software Engineer',
      company: 'Agile Solutions Private Limited (merojob.com)',
      location: 'Gairidhara, Kathmandu',
      period: 'August 2022 - July 2023',
      description: 'Implemented Microsoft Dynamics 365 Business Central ERP systems for diverse clients.',
      achievements: [
        'Contributed to React-based frontend components and cloud-integrated interfaces while working on enterprise ERP solutions, ensuring responsive and scalable UI development',
        'Implemented MS Dynamics 365 Business Central using C#, .NET, JavaScript, and AL',
        'Designed and developed client reports using SQL Server Reporting Services (SSRS)',
        'Managed user accounts, permissions, and Active Directory configurations',
        'Migrated customer data into MS SQL Server with validation and error resolution',
        'Provided end-user support and training for ERP system adoption',
        'Prepared technical documentation and configuration manuals',
      ],
      technologies: ['C#', '.NET', 'JavaScript', 'AL', 'SQL Server', 'SSRS', 'Active Directory'],
    },
    {
      title: 'Quality Analyst Intern',
      company: 'Inficare Private Limited',
      location: 'Gairidhara, Kathmandu',
      period: 'January 2022 - July 2022',
      description: 'Focused on software quality assurance through manual testing and defect management.',
      achievements: [
        'Executed manual test cases to ensure software functionality and quality',
        'Logged and tracked defects, collaborating with developers for resolution',
        'Conducted post-release testing to verify production stability',
        'Created detailed test reports for cross-functional teams',
      ],
      technologies: ['Manual Testing', 'Test Case Design', 'Bug Tracking', 'QA Processes'],
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
