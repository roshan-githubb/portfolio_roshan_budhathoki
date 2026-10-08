'use client'

import React, { useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'

// translateZ distances (px) and tilt (deg). Phones get a lighter version.
const DESKTOP = { far: -600, past: 400, tilt: 8 }
const MOBILE = { far: -280, past: 180, tilt: 4 }

// Puts a page section in 3D space, travelling with the background camera.
// As it rises into view it comes from far away, leaning back; it stands upright
// at full size where you read it; then it flies up past the camera and fades.
// Approaching pivots on the section's top edge and leaving on its bottom edge,
// so neighbouring sections never slide over each other. Tied to the scroll
// position, so it reverses on scroll up. Static for prefers-reduced-motion.
export default function DepthSection({ children, approach = true }: { children: React.ReactNode; approach?: boolean }) {
  const ref = useRef<HTMLDivElement>(null)
  const reducedMotion = useReducedMotion()
  const [depth, setDepth] = useState(DESKTOP)

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)')
    const update = () => setDepth(mq.matches ? DESKTOP : MOBILE)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])

  // 0 when the section's top enters at the bottom of the screen, 1 once it's 40% up (readable early)
  const { scrollYProgress: arriving } = useScroll({ target: ref, offset: ['start end', 'start 0.6'] })
  // 0 when the section's bottom is 40% from the top, 1 once it has left the top
  const { scrollYProgress: leaving } = useScroll({ target: ref, offset: ['end 0.4', 'end start'] })

  const arriveZ = useTransform(arriving, [0, 1], [approach ? depth.far : 0, 0])
  const arriveTilt = useTransform(arriving, [0, 1], [approach ? -depth.tilt : 0, 0])
  const arriveOpacity = useTransform(arriving, [0, 0.6], [approach ? 0.25 : 1, 1])
  const leaveZ = useTransform(leaving, [0, 1], [0, depth.past])
  const leaveTilt = useTransform(leaving, [0, 1], [0, -depth.tilt * 0.8])
  const leaveOpacity = useTransform(leaving, [0, 1], [1, 0])
  // Once a section is mostly past, let clicks through to the one arriving behind it
  const pointerEvents = useTransform(leaving, (l) => (l > 0.4 ? 'none' : 'auto'))

  if (reducedMotion) return <>{children}</>

  // Scroll offsets (and anchor targets, see DepthAnchorScroll) use the untransformed outer div
  return (
    <div ref={ref} data-depth-section="">
      <motion.div
        style={{ z: arriveZ, rotateX: arriveTilt, opacity: arriveOpacity, originX: 0.5, originY: 0, transformPerspective: 1200 }}
      >
        <motion.div
          style={{
            z: leaveZ,
            rotateX: leaveTilt,
            opacity: leaveOpacity,
            pointerEvents,
            originX: 0.5,
            originY: 1,
            transformPerspective: 1200,
          }}
        >
          {children}
        </motion.div>
      </motion.div>
    </div>
  )
}

// In-page links (#about, #projects...) would otherwise scroll to wherever the
// browser currently draws the transformed section, which shifts as it moves in
// depth. This scrolls to the section's real layout position instead.
export function DepthAnchorScroll() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
      const link = (e.target as Element | null)?.closest?.('a[href^="#"]')
      const id = link?.getAttribute('href')?.slice(1)
      const target = id ? document.getElementById(id) : null
      const wrapper = target?.closest('[data-depth-section]')
      if (!target || !wrapper) return
      e.preventDefault()
      const top = wrapper.getBoundingClientRect().top + window.scrollY
      const smooth = !window.matchMedia('(prefers-reduced-motion: reduce)').matches
      window.scrollTo({ top, behavior: smooth ? 'smooth' : 'auto' })
      history.replaceState(null, '', `#${id}`)
    }
    document.addEventListener('click', onClick)
    return () => document.removeEventListener('click', onClick)
  }, [])
  return null
}
