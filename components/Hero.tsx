'use client'

import React from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ArrowDown, Download, Mail, Linkedin, Github } from 'lucide-react'

const Hero = () => {
  const techStack = [
    'React', 'Next.js', 'TypeScript', 'JavaScript', 'Java', 'SQL', 'MongoDB', 'Node.js'
  ]

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-16">
          {/* Profile Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96">
              {/* Gradient border effect */}
              
              <Image
                src="/profile.jpg"
                alt="Roshan Budhathoki"
                width={384}
                height={384}
                className="absolute inset-2 rounded-full object-cover"
                priority
              />
            </div>
          </motion.div>

          {/* Text Content */}
          <div className="text-center lg:text-left max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4">
                Hi, I'm <span className="gradient-text">Roshan Budhathoki</span>
              </h1>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <h2 className="text-xl md:text-3xl lg:text-4xl font-semibold mb-6 text-gray-300">
                Frontend-Focused Full Stack Engineer
              </h2>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="text-base md:text-lg text-gray-400 mb-8"
            >
              Building scalable, responsive web applications with modern technologies.
              Specializing in React, Next.js, and TypeScript with full-stack capabilities.
            </motion.p>

            {/* Tech Stack Badges */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="flex flex-wrap justify-center lg:justify-start gap-3 mb-8"
            >
              {techStack.map((tech, index) => (
                <span
                  key={tech}
                  className="px-4 py-2 glass-effect rounded-full text-sm font-medium hover:bg-white/10 transition-all duration-300"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {tech}
                </span>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8"
            >
              <a href="#contact" className="btn-primary inline-flex items-center justify-center gap-2">
                <Mail size={20} />
                Get In Touch
              </a>
              <a href="/resume.pdf" download className="btn-secondary inline-flex items-center justify-center gap-2">
                <Download size={20} />
                Download Resume
              </a>
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 1.2 }}
              className="flex justify-center lg:justify-start gap-6"
            >
              <a
                href="https://www.linkedin.com/in/roshan-budhathoki-5a803b159/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 glass-effect rounded-full hover:bg-blue-500/20 transition-all duration-300 hover:scale-110"
              >
                <Linkedin size={24} />
              </a>
              <a
                href="https://github.com/roshanbudhathoki"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 glass-effect rounded-full hover:bg-purple-500/20 transition-all duration-300 hover:scale-110"
              >
                <Github size={24} />
              </a>
              <a
                href="mailto:roshanbc9860@gmail.com"
                className="p-3 glass-effect rounded-full hover:bg-pink-500/20 transition-all duration-300 hover:scale-110"
              >
                <Mail size={24} />
              </a>
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1.4 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce"
        >
          <a href="#about" className="inline-block">
            <ArrowDown size={32} className="text-gray-400" />
          </a>
        </motion.div>
      </div>
    </section>
  )
}

export default Hero
