'use client'

import React, { useEffect, useRef, useState } from 'react'

// Mouse spotlight: a soft blue glow follows the pointer across the page, and the
// glass cards near it light up along their edges (plus a faint light inside),
// the effect Vercel and Linear use. The normal cursor stays as it is.
//
// The card glow is drawn by .glass-effect::before/::after in app/globals.css;
// this component only tells each nearby card where the pointer is, through the
// --spot-x / --spot-y / --spot-o CSS variables. Desktop (real mouse) only.

const CARDS = '.glass-effect'
const RANGE = 320 // px: cards whose edge is within this distance of the pointer get updated
const RESCAN_MS = 1000 // how often to look for cards that appeared (e.g. after a section loads)

export default function Spotlight() {
  const glowRef = useRef<HTMLDivElement>(null)
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)')
    const update = () => setEnabled(finePointer.matches)
    update()
    finePointer.addEventListener('change', update)
    return () => finePointer.removeEventListener('change', update)
  }, [])

  useEffect(() => {
    if (!enabled) return
    const glow = glowRef.current
    if (!glow) return

    let mx = 0
    let my = 0
    let inside = false // pointer is over the page
    let cards: HTMLElement[] = []
    let scannedAt = -Infinity
    let lit = new Set<HTMLElement>()
    let raf = 0

    // The fixed nav bar and the chat window share the glass style but stay plain
    const scan = (now: number) => {
      if (now - scannedAt < RESCAN_MS) return
      scannedAt = now
      cards = Array.from(document.querySelectorAll<HTMLElement>(CARDS)).filter(
        (el) => !el.closest('nav') && getComputedStyle(el).position !== 'fixed'
      )
    }

    const update = () => {
      raf = 0
      scan(performance.now())

      glow.style.opacity = inside ? '1' : '0'
      glow.style.setProperty('--spot-x', `${mx}px`)
      glow.style.setProperty('--spot-y', `${my}px`)

      // Read every card's position first, then write, so the browser lays out once
      const hits: Array<[HTMLElement, number, number]> = []
      if (inside) {
        for (const el of cards) {
          const r = el.getBoundingClientRect()
          if (r.width === 0 || r.height === 0) continue
          const dx = Math.max(r.left - mx, 0, mx - r.right)
          const dy = Math.max(r.top - my, 0, my - r.bottom)
          if (dx * dx + dy * dy < RANGE * RANGE) hits.push([el, mx - r.left, my - r.top])
        }
      }
      const next = new Set<HTMLElement>()
      for (const [el, x, y] of hits) {
        el.style.setProperty('--spot-x', `${x}px`)
        el.style.setProperty('--spot-y', `${y}px`)
        el.style.setProperty('--spot-o', '1')
        next.add(el)
      }
      lit.forEach((el) => {
        if (!next.has(el)) el.style.setProperty('--spot-o', '0')
      })
      lit = next
    }
    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(update)
    }

    const onMove = (e: PointerEvent) => {
      if (e.pointerType === 'touch') return
      mx = e.clientX
      my = e.clientY
      inside = true
      schedule()
    }
    const onOut = (e: MouseEvent) => {
      if (e.relatedTarget) return
      inside = false // left the window
      schedule()
    }
    const onBlur = () => {
      inside = false
      schedule()
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    window.addEventListener('scroll', schedule, { passive: true }) // cards move under a still mouse
    document.addEventListener('mouseout', onOut)
    window.addEventListener('blur', onBlur)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('scroll', schedule)
      document.removeEventListener('mouseout', onOut)
      window.removeEventListener('blur', onBlur)
      lit.forEach((el) => el.style.setProperty('--spot-o', '0'))
    }
  }, [enabled])

  if (!enabled) return null
  return <div ref={glowRef} aria-hidden="true" className="spotlight-glow" />
}
