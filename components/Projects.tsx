'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { HeartPulse, Building2, ShoppingCart, FileText, LayoutDashboard, Video, Gamepad2 } from 'lucide-react'

const Projects = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const projects = [
    {
      title: 'SajiloPlay — Multi-Game Platform',
      description: 'A single web app bundling a collection of casual games — instant, no-install play with a unified UI, score tracking and smooth, responsive gameplay.',
      technologies: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS'],
      icon: Gamepad2,
      gradient: 'from-violet-500/20 to-indigo-600/20',
      featured: true,
    },
    {
      title: 'Healthcare Management System',
      description: 'HIPAA-compliant platform for patient records, appointments and medical data — with role-based access and real-time sync.',
      technologies: ['React', 'TypeScript', 'Java', 'Spring Boot', 'MySQL', 'AWS'],
      icon: HeartPulse,
      gradient: 'from-rose-500/20 to-red-600/20',
      featured: true,
    },
    {
      title: 'Short-Form Video Social App',
      description: 'TikTok-inspired platform with video uploads, infinite-scroll feed, likes, comments and profiles — built for smooth playback.',
      technologies: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Video.js'],
      icon: Video,
      gradient: 'from-fuchsia-500/20 to-purple-600/20',
      featured: true,
    },
    {
      title: 'Multivendor E-Commerce Platform',
      description: 'Scalable marketplace on Medusa.js with a Next.js storefront — vendor management, catalogs, orders and payments.',
      technologies: ['Next.js', 'Medusa.js', 'Mercurius', 'React', 'PostgreSQL'],
      icon: ShoppingCart,
      gradient: 'from-emerald-500/20 to-teal-600/20',
      featured: true,
    },
    {
      title: 'Business Admin Dashboard',
      description: 'Sales analytics, inventory and order management with Khalti payments — real-time insights that drove business growth.',
      technologies: ['React', 'TypeScript', 'Node.js', 'MongoDB', 'Chart.js'],
      icon: LayoutDashboard,
      gradient: 'from-blue-500/20 to-indigo-600/20',
      featured: false,
    },
    {
      title: 'Drag-and-Drop Form Builder',
      description: 'Google Forms–style builder with conditional logic, validation, real-time collaboration and an analytics dashboard.',
      technologies: ['React', 'TypeScript', 'Node.js', 'MongoDB', 'Tailwind CSS'],
      icon: FileText,
      gradient: 'from-amber-500/20 to-orange-600/20',
      featured: false,
    },
    {
      title: 'Dynamics 365 Business Central ERP',
      description: 'Customized ERP for multiple clients — bespoke modules, reports and integrations using C#, AL and SSRS.',
      technologies: ['C#', 'AL Language', '.NET', 'SQL Server', 'SSRS'],
      icon: Building2,
      gradient: 'from-sky-500/20 to-cyan-600/20',
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
                <div className={`relative h-40 bg-gradient-to-br ${project.gradient} overflow-hidden`}>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <project.icon className="w-16 h-16 text-white/40 group-hover:text-white/70 group-hover:scale-110 transition-all duration-300" strokeWidth={1.5} />
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
                  <p className="text-gray-400 text-sm mb-4">
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
