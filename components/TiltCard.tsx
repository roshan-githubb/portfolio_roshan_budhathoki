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

type TiltCardProps = Omit<HTMLMotionProps<'div'>, 'children'> & {
  children?: React.ReactNode
  /** Maximum tilt in degrees at the card's edges */
  maxTilt?: number
  /** Drift gently in 3D (.card-float). Off by default for long text cards (maxTilt <= 5). */
  float?: boolean
}

// Drop-in replacement for a motion.div card: tilts in 3D toward the cursor with a
// soft glare. Framer composes the tilt with any entrance animation (y, x, scale)
// passed in. Disabled on touch devices and for prefers-reduced-motion.
export default function TiltCard({
  children,
  className = '',
  style,
  maxTilt = 8,
  float = maxTilt > 5,
  onPointerMove,
  onPointerLeave,
  ...rest
}: TiltCardProps) {
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
  // -1..1 tilt exposed as CSS variables so .icon-3d children float with it
  const tiltX = useTransform(sx, [0, 1], [-1, 1])
  const tiltY = useTransform(sy, [0, 1], [-1, 1])

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
      className={`group/tilt ${float ? 'card-float' : ''} relative transition-shadow duration-300 hover:shadow-2xl hover:shadow-purple-500/20 ${className}`}
      style={{
        ...style,
        ...(enabled ? { rotateX, rotateY, transformPerspective: 1000, '--tilt-x': tiltX, '--tilt-y': tiltY } : {}),
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
