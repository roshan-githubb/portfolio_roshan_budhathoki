'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { ExternalLink, Github } from 'lucide-react'

const Projects = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const projects = [
    {
      title: 'Healthcare Management System',
      description: 'Enterprise-grade HIPAA-compliant platform for patient management, appointments, and medical records with role-based access control and real-time data synchronization.',
      technologies: ['React', 'TypeScript', 'Java', 'Spring Boot', 'MySQL', 'AWS'],
      featured: true,
    },
    {
      title: 'E-Commerce Platform',
      description: 'Full-stack e-commerce solution with advanced product catalog, secure payment integration, inventory management, and comprehensive admin dashboard.',
      technologies: ['Next.js', 'React', 'TypeScript', 'Node.js', 'MongoDB', 'Stripe'],
      featured: true,
    },
    {
      title: 'Real-Time Collaboration Tool',
      description: 'Modern team collaboration platform with real-time messaging, file sharing, video calls, and project management features.',
      technologies: ['Next.js', 'Socket.io', 'Node.js', 'PostgreSQL', 'Redis', 'WebRTC'],
      featured: true,
    },
    {
      title: 'Form Builder Application',
      description: 'Drag-and-drop form builder with custom field types, conditional logic, validation rules, and response analytics dashboard.',
      technologies: ['React', 'TypeScript', 'Node.js', 'MongoDB', 'Tailwind CSS'],
      featured: false,
    },
    {
      title: 'Task Management Dashboard',
      description: 'Agile project management tool with kanban boards, sprint planning, task assignments, time tracking, and analytics.',
      technologies: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Tailwind CSS'],
      featured: false,
    },
    {
      title: 'Analytics Dashboard',
      description: 'Data visualization platform with real-time analytics, custom reports, and interactive charts for business intelligence.',
      technologies: ['React', 'TypeScript', 'D3.js', 'Node.js', 'MongoDB'],
      featured: false,
    },
  ]

  return (
    <section id="projects" className="py-20 relative">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title gradient-text">Featured Projects</h2>
          <p className="text-center text-gray-400 mb-12 max-w-2xl mx-auto">
            Showcasing impactful solutions built with modern technologies and best practices
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {projects.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="glass-effect rounded-2xl overflow-hidden card-hover group"
              >
                {/* Project Image */}
                <div className="relative h-48 bg-gradient-to-br from-blue-500/20 to-purple-600/20 overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-6xl opacity-20">💻</div>
                  </div>
                  {project.featured && (
                    <div className="absolute top-4 right-4 px-3 py-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full text-xs font-semibold">
                      Featured
                    </div>
                  )}
                </div>

                {/* Project Content */}
                <div className="p-6">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors">
                      {project.title}
                    </h3>
                  </div>
                  <p className="text-gray-400 text-sm mb-4 line-clamp-3">
                    {project.description}
                  </p>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-1 bg-blue-500/10 border border-blue-500/30 rounded text-xs text-blue-300"
                      >
                        {tech}
                      </span>
                    ))}
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

export default Projects
