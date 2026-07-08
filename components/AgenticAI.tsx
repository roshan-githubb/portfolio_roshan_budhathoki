'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Bot, Rocket, Infinity as InfinityIcon, ShieldCheck, Workflow, Sparkles } from 'lucide-react'

const AgenticAI = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const stats = [
    { value: '4+', label: 'Years of Experience' },
    { value: 'Days', label: 'To Ship, Not Weeks' },
    { value: '∞', label: 'Tools, Languages & Frameworks' },
    { value: '100%', label: 'Quality-First Output' },
  ]

  const pillars = [
    {
      icon: <Bot size={28} />,
      title: 'Agentic AI Development',
      description:
        'I build with Claude Code, an AI agent that plans, writes, and refactors entire features, while I direct the architecture, review every change, and own the product vision.',
    },
    {
      icon: <Rocket size={28} />,
      title: 'Ship in Days, Not Weeks',
      description:
        'What used to take weeks now ships in days: MVPs, full products, and complex integrations delivered at a pace traditional development can\'t match.',
    },
    {
      icon: <InfinityIcon size={28} />,
      title: 'Any Tool. Any Language. Any Framework.',
      description:
        'Agentic development removes technology barriers. Whether it\'s a new language, an unfamiliar framework, or a legacy codebase, I ramp up instantly and ship production-grade solutions from day one.',
    },
    {
      icon: <ShieldCheck size={28} />,
      title: 'Speed Without Sacrificing Quality',
      description:
        'AI velocity paired with engineering discipline: code review, automated testing, clean architecture, and best practices baked into every agentic workflow. Fast never means fragile.',
    },
    {
      icon: <Workflow size={28} />,
      title: 'End-to-End Product Engineering',
      description:
        'From idea to deployed product: requirements, UI/UX, backend, database, CI/CD, and monitoring. As a Full Stack Product Engineer, I own the entire lifecycle and deliver outcomes, not just code.',
    },
    {
      icon: <Sparkles size={28} />,
      title: 'AI-First Problem Solving',
      description:
        'Prompt engineering, context engineering, and disciplined verification of every AI-generated change. I get the most out of the modern AI toolchain without ever shipping code I haven\'t reviewed.',
    },
  ]

  const marqueeItems = [
    'React', 'Next.js', 'TypeScript', 'Java', 'Spring Boot', 'Python', '.NET', 'Node.js',
    'PostgreSQL', 'MongoDB', 'AWS', 'Claude Code', 'Cursor', 'LLM APIs', 'CI/CD',
    'Tailwind', 'GraphQL', 'Docker', 'Firebase',
  ]

  return (
    <section id="agentic" className="py-20 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center mb-4">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-purple-500/30 text-purple-300">
              <Sparkles size={16} />
              The AI-First Transformation
            </span>
          </div>
          <h2 className="section-title gradient-text">Agentic Development & Engineering</h2>
          <p className="text-center text-lg md:text-xl text-gray-300 max-w-3xl mx-auto mb-12">
            I transitioned from a <span className="text-gray-400 line-through">manual developer</span> to an{' '}
            <span className="text-blue-400 font-bold">AI-first developer</span> by embracing Agentic AI,
            shipping products <span className="text-purple-400 font-bold">in days instead of weeks</span> with the same
            obsession for quality, in <span className="text-pink-400 font-bold">any tool, language, or framework</span>.
          </p>

          {/* Stats row */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto mb-16">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="glass-effect p-6 rounded-2xl text-center card-hover"
              >
                <div className="text-3xl md:text-4xl font-bold gradient-text mb-2">{stat.value}</div>
                <div className="text-gray-400 text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </div>

          {/* Pillars */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto mb-16">
            {pillars.map((pillar, index) => (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                className="glass-effect p-6 rounded-2xl card-hover group"
              >
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 mb-4 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300">
                  {pillar.icon}
                </div>
                <h3 className="text-xl font-bold mb-3 group-hover:text-blue-400 transition-colors">
                  {pillar.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">{pillar.description}</p>
              </motion.div>
            ))}
          </div>

          {/* Infinite marquee of technologies */}
          <div className="relative max-w-5xl mx-auto overflow-hidden py-4 marquee-mask">
            <div className="flex w-max animate-marquee gap-4">
              {[...marqueeItems, ...marqueeItems].map((item, index) => (
                <span
                  key={`${item}-${index}`}
                  className="px-5 py-2 glass-effect rounded-full text-sm font-medium text-gray-300 whitespace-nowrap"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
          <p className="text-center text-gray-500 text-sm mt-4">
            ...and whatever your stack needs next. With agentic development, no technology is off-limits.
          </p>
        </motion.div>
      </div>
    </section>
  )
}

export default AgenticAI
