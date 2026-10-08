'use client'

import React, { Component, useEffect, useState } from 'react'
import dynamic from 'next/dynamic'

// three.js is only downloaded in the browser, after the page is interactive,
// so the 3D layer never delays the first paint of the actual content.
const Scene3D = dynamic(() => import('./three/Scene3D'), { ssr: false })

// If WebGL fails mid-session, drop the 3D layer instead of breaking the page
class SceneErrorBoundary extends Component<{ children: React.ReactNode }, { failed: boolean }> {
  state = { failed: false }
  static getDerivedStateFromError() {
    return { failed: true }
  }
  render() {
    return this.state.failed ? null : this.props.children
  }
}

function supportsWebGL() {
  try {
    const canvas = document.createElement('canvas')
    const gl = canvas.getContext('webgl2') || canvas.getContext('webgl')
    gl?.getExtension('WEBGL_lose_context')?.loseContext()
    return !!gl
  } catch {
    return false
  }
}

export default function Background3D() {
  const [mounted, setMounted] = useState(false)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (!supportsWebGL()) return
    const start = () => setMounted(true)
    if ('requestIdleCallback' in window) {
      const id = window.requestIdleCallback(start, { timeout: 1500 })
      return () => window.cancelIdleCallback(id)
    }
    const id = setTimeout(start, 800)
    return () => clearTimeout(id)
  }, [])

  if (!mounted) return null

  return (
    <div
      aria-hidden
      className={`fixed inset-0 -z-10 pointer-events-none transition-opacity duration-1000 ${
        visible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <SceneErrorBoundary>
        <Scene3D onReady={() => setVisible(true)} />
      </SceneErrorBoundary>
    </div>
  )
}
