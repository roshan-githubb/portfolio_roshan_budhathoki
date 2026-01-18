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
      title: 'E-Commerce Platform',
      description: 'Full-featured e-commerce application with product catalog, shopping cart, payment integration, and admin dashboard.',
      technologies: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'MongoDB', 'Stripe'],
      image: '/images/projects/ecommerce.jpg',
      liveUrl: '#',
      githubUrl: '#',
      featured: true,
    },
    {
      title: 'Healthcare Management System',
      description: 'HIPAA-compliant healthcare platform for patient management, appointments, and medical records with role-based access.',
      technologies: ['React', 'TypeScript', 'Java', 'Spring Boot', 'MySQL', 'AWS'],
      image: '/images/projects/healthcare.jpg',
      liveUrl: '#',
      githubUrl: '#',
      featured: true,
    },
    {
      title: 'Real-Time Chat Application',
      description: 'Modern chat app with real-time messaging, file sharing, group chats, and user presence indicators.',
      technologies: ['Next.js', 'Socket.io', 'Node.js', 'MongoDB', 'Redis'],
      image: '/images/projects/chat.jpg',
      liveUrl: '#',
      githubUrl: '#',
      featured: false,
    },
    {
      title: 'Task Management Dashboard',
      description: 'Collaborative project management tool with kanban boards, task assignments, and progress tracking.',
      technologies: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Tailwind CSS'],
      image: '/images/projects/taskmanager.jpg',
      liveUrl: '#',
      githubUrl: '#',
      featured: false,
    },
    {
      title: 'Portfolio Website Builder',
      description: 'SaaS platform for creating professional portfolio websites with drag-and-drop interface and customizable templates.',
      technologies: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Prisma'],
      image: '/images/projects/portfolio.jpg',
      liveUrl: '#',
      githubUrl: '#',
      featured: false,
    },
    {
      title: 'Weather Forecast App',
      description: 'Beautiful weather application with real-time data, 7-day forecasts, and location-based weather alerts.',
      technologies: ['React', 'JavaScript', 'OpenWeather API', 'CSS3'],
      image: '/images/projects/weather.jpg',
      liveUrl: '#',
      githubUrl: '#',
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
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-gray-400 text-sm mb-4 line-clamp-3">
                    {project.description}
                  </p>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-1 bg-blue-500/10 border border-blue-500/30 rounded text-xs text-blue-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Links */}
                  <div className="flex gap-4">
                    <a
                      href={project.liveUrl}
                      className="flex items-center gap-2 text-sm text-gray-300 hover:text-blue-400 transition-colors"
                    >
                      <ExternalLink size={16} />
                      Live Demo
                    </a>
                    <a
                      href={project.githubUrl}
                      className="flex items-center gap-2 text-sm text-gray-300 hover:text-purple-400 transition-colors"
                    >
                      <Github size={16} />
                      Code
                    </a>
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
