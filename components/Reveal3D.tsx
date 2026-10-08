'use client'

import React, { useRef } from 'react'
import { motion, useInView, useReducedMotion, type HTMLMotionProps, type Variants } from 'framer-motion'

export type RevealFrom = 'below' | 'left' | 'right'

const variants: Variants = {
  below: { opacity: 0, y: 90, z: -280, rotateX: 38 },
  left: { opacity: 0, x: -120, z: -220, rotateY: 28 },
  right: { opacity: 0, x: 120, z: -220, rotateY: -28 },
  shown: { opacity: 1, x: 0, y: 0, z: 0, rotateX: 0, rotateY: 0 },
  // prefers-reduced-motion
  fadeHidden: { opacity: 0 },
  fadeShown: { opacity: 1 },
}

type Reveal3DProps = Omit<HTMLMotionProps<'div'>, 'children'> & {
  children?: React.ReactNode
  from?: RevealFrom
  delay?: number
}

// Flies its content in from depth, rotating upright, the first time it scrolls
// into view. Each element triggers on its own, so long sections reveal as you
// read down rather than all at once. Falls back to a plain fade for
// prefers-reduced-motion.
export default function Reveal3D({ children, from = 'below', delay = 0, className = '', style, ...rest }: Reveal3DProps) {
  // Visibility is measured on an untransformed wrapper: while hidden, the
  // animated element is pushed back and down, which would make it look
  // mostly off-screen and delay the trigger.
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.2 })
  const reducedMotion = useReducedMotion()
  const hidden = reducedMotion ? 'fadeHidden' : from
  const shown = reducedMotion ? 'fadeShown' : 'shown'

  return (
    <div ref={ref}>
      <motion.div
        variants={variants}
        initial={hidden}
        animate={inView ? shown : hidden}
        transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
        className={`h-full ${className}`}
        style={{ transformPerspective: 1200, ...style }}
        {...rest}
      >
        {children}
      </motion.div>
    </div>
  )
}
