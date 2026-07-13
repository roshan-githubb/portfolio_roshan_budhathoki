'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ArrowDown, Download, Mail, Linkedin, Github, Zap, Bot, Layers, Briefcase } from 'lucide-react'
import { trackResumeDownload, trackSocialClick } from '@/lib/analytics'

const roles = [
  'Full Stack Product Engineer',
  'Agentic AI Developer',
  'Shipping in Days, Not Weeks',
  'AI-Powered Product Builder',
]

const Hero = () => {
  const techStack = [
    'Agentic AI', 'Claude Code', 'Cursor', 'React', 'Next.js', 'TypeScript', 'Java', 'Node.js', 'SQL', 'MongoDB',
    'AWS (EC2, S3, Aurora, RDS)', 'CI/CD', 'PM2', 'Any Stack ∞'
  ]

  // Typewriter effect for rotating roles
  const [roleIndex, setRoleIndex] = useState(0)
  const [displayText, setDisplayText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const currentRole = roles[roleIndex]
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (displayText.length < currentRole.length) {
          setDisplayText(currentRole.slice(0, displayText.length + 1))
        } else {
          setTimeout(() => setIsDeleting(true), 2000)
        }
      } else {
        if (displayText.length > 0) {
          setDisplayText(currentRole.slice(0, displayText.length - 1))
        } else {
          setIsDeleting(false)
          setRoleIndex((prev) => (prev + 1) % roles.length)
        }
      }
    }, isDeleting ? 40 : 80)
    return () => clearTimeout(timeout)
  }, [displayText, isDeleting, roleIndex])

  const highlights = [
    { icon: <Briefcase size={16} className="text-green-400" />, label: '4+ Years of Experience' },
    { icon: <Zap size={16} className="text-yellow-400" />, label: 'Ships in Days, Not Weeks' },
    { icon: <Bot size={16} className="text-blue-400" />, label: 'Agentic AI Workflows' },
    { icon: <Layers size={16} className="text-purple-400" />, label: 'Any Stack. Any Framework.' },
  ]

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[30rem] h-[30rem] bg-fuchsia-500/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '4s' }}></div>
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
              {/* Rotating gradient ring */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 animate-spin-slow opacity-70 blur-sm"></div>
              <div className="absolute inset-1 rounded-full bg-slate-950"></div>
              <div className="absolute inset-2 rounded-full overflow-hidden">
                <Image
                  src="/profile.jpg"
                  alt="Roshan Budhathoki"
                  fill
                  sizes="(max-width: 768px) 256px, 384px"
                  className="object-cover scale-110 origin-[50%_30%]"
                  priority
                />
              </div>
            </div>
          </motion.div>

          {/* Text Content */}
          <div className="text-center lg:text-left max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 glass-effect rounded-full text-sm text-gray-300"
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75 animate-ping"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
              </span>
              Available for new opportunities
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4">
                Hi, I&apos;m <span className="gradient-text">Roshan Budhathoki</span>
              </h1>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <h2 className="text-xl md:text-3xl lg:text-4xl font-semibold mb-6 text-gray-300 min-h-[2.5rem] md:min-h-[3rem]">
                {displayText}
                <span className="text-blue-400 animate-pulse">|</span>
              </h2>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="text-base md:text-lg text-gray-400 mb-6"
            >
              Full Stack Product Engineer with <span className="text-green-400 font-semibold">4+ years of experience</span> who
              transitioned from manual development to <span className="text-purple-400 font-semibold">Agentic AI development</span>. I drive Claude Code
              across the entire product lifecycle to ship high-quality products <span className="text-pink-400 font-semibold">in days, not weeks</span>,
              in any tool, language, or framework.
            </motion.p>

            {/* Highlight chips */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="flex flex-wrap justify-center lg:justify-start gap-3 mb-6"
            >
              {highlights.map((item) => (
                <span
                  key={item.label}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/30 animate-glow"
                >
                  {item.icon}
                  {item.label}
                </span>
              ))}
            </motion.div>

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
                  className="px-4 py-2 glass-effect rounded-full text-sm font-medium hover:bg-white/10 hover:scale-110 transition-all duration-300"
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
              <a href="https://drive.google.com/file/d/1Hwg_Er_rSrWN4laCTglmRx_cT2Pa0x3B/view?usp=sharing" target="_blank" rel="noopener noreferrer" onClick={trackResumeDownload} className="btn-secondary inline-flex items-center justify-center gap-2">
                <Download size={20} />
                View and Download Resume
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
                onClick={() => trackSocialClick('linkedin')}
                className="p-3 glass-effect rounded-full hover:bg-blue-500/20 transition-all duration-300 hover:scale-110"
              >
                <Linkedin size={24} />
              </a>
              <a
                href="https://github.com/roshan-githubb"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackSocialClick('github')}
                className="p-3 glass-effect rounded-full hover:bg-purple-500/20 transition-all duration-300 hover:scale-110"
              >
                <Github size={24} />
              </a>
              <a
                href="mailto:roshanbc9860@gmail.com"
                onClick={() => trackSocialClick('email')}
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
