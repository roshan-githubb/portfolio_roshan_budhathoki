'use client'

import React, { useEffect, useState } from 'react'
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
  useTransform,
  type HTMLMotionProps,
} from 'framer-motion'
import Reveal3D, { type RevealFrom } from './Reveal3D'

type TiltCardProps = Omit<HTMLMotionProps<'div'>, 'children'> & {
  children?: React.ReactNode
  /** Maximum tilt in degrees at the card's edges */
  maxTilt?: number
  /** Fly the card in from depth when it scrolls into view */
  reveal?: { from?: RevealFrom; delay?: number }
}

// Drop-in replacement for a motion.div card: tilts in 3D toward the cursor with a
// soft glare. Framer composes the tilt with any entrance animation (y, x, scale)
// passed in. Disabled on touch devices and for prefers-reduced-motion.
export default function TiltCard({ reveal, ...props }: TiltCardProps) {
  if (!reveal) return <TiltSurface {...props} />
  // The reveal runs on a wrapper so its rotation doesn't fight the tilt's.
  // h-full keeps cards equal height when the wrapper is the grid item.
  return (
    <Reveal3D from={reveal.from} delay={reveal.delay}>
      <TiltSurface {...props} className={`h-full ${props.className ?? ''}`} />
    </Reveal3D>
  )
}

function TiltSurface({
  children,
  className = '',
  style,
  maxTilt = 8,
  onPointerMove,
  onPointerLeave,
  ...rest
}: Omit<TiltCardProps, 'reveal'>) {
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)')
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setEnabled(fine.matches && !reduced.matches)
    update()
    fine.addEventListener('change', update)
    reduced.addEventListener('change', update)
    return () => {
      fine.removeEventListener('change', update)
      reduced.removeEventListener('change', update)
    }
  }, [])

  // Pointer position within the card, 0..1 on each axis (0.5 = centre)
  const px = useMotionValue(0.5)
  const py = useMotionValue(0.5)
  const spring = { stiffness: 220, damping: 22, mass: 0.6 }
  const sx = useSpring(px, spring)
  const sy = useSpring(py, spring)

  const rotateY = useTransform(sx, [0, 1], [-maxTilt, maxTilt])
  const rotateX = useTransform(sy, [0, 1], [maxTilt, -maxTilt])
  const glareX = useTransform(sx, (v) => `${v * 100}%`)
  const glareY = useTransform(sy, (v) => `${v * 100}%`)
  const glare = useMotionTemplate`radial-gradient(circle at ${glareX} ${glareY}, rgba(255,255,255,0.14), transparent 55%)`

  const handleMove = (e: React.PointerEvent<HTMLDivElement>) => {
    onPointerMove?.(e)
    if (!enabled || e.pointerType !== 'mouse') return
    const rect = e.currentTarget.getBoundingClientRect()
    px.set((e.clientX - rect.left) / rect.width)
    py.set((e.clientY - rect.top) / rect.height)
  }

  const handleLeave = (e: React.PointerEvent<HTMLDivElement>) => {
    onPointerLeave?.(e)
    px.set(0.5)
    py.set(0.5)
  }

  return (
    <motion.div
      {...rest}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
      whileHover={enabled ? { scale: 1.02 } : undefined}
      className={`group/tilt relative transition-shadow duration-300 hover:shadow-2xl hover:shadow-purple-500/20 ${className}`}
      style={{
        ...style,
        ...(enabled ? { rotateX, rotateY, transformPerspective: 1000 } : {}),
      }}
    >
      {children}
      {enabled && (
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover/tilt:opacity-100"
          style={{ background: glare }}
        />
      )}
    </motion.div>
  )
}
