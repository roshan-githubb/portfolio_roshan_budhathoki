'use client'

import React, { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'

// Scroll-linked depth for a page section, matching the background camera
// flying forward: the section approaches from the distance as it rises into
// view, sits at full size while you read it, then grows and fades as it
// passes the camera. Tied directly to the scroll position, so it reverses
// when scrolling back up. Static for prefers-reduced-motion.
export default function DepthSection({ children, approach = true }: { children: React.ReactNode; approach?: boolean }) {
  const ref = useRef<HTMLDivElement>(null)
  const reducedMotion = useReducedMotion()

  // 0 when the section's top enters at the bottom of the screen, 1 once it reaches 40% from the top
  const { scrollYProgress: arriving } = useScroll({ target: ref, offset: ['start end', 'start 0.4'] })
  // 0 when the section's bottom is halfway up the screen, 1 once it has left the top
  const { scrollYProgress: leaving } = useScroll({ target: ref, offset: ['end 0.5', 'end start'] })

  const arriveScale = useTransform(arriving, [0, 1], [0.86, 1])
  const arriveOpacity = useTransform(arriving, [0, 1], [0.2, 1])
  const leaveScale = useTransform(leaving, [0, 1], [1, 1.1])
  const leaveOpacity = useTransform(leaving, [0, 1], [1, 0])

  if (reducedMotion) return <>{children}</>

  // Scroll offsets are measured on the untransformed outer div; the arriving
  // scale pivots on the section's top and the leaving one on its bottom.
  return (
    <div ref={ref}>
      <motion.div
        style={approach ? { scale: arriveScale, opacity: arriveOpacity, transformOrigin: '50% 0%' } : undefined}
      >
        <motion.div style={{ scale: leaveScale, opacity: leaveOpacity, transformOrigin: '50% 100%' }}>
          {children}
        </motion.div>
      </motion.div>
    </div>
  )
}
