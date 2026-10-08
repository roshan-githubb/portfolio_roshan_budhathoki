'use client'

import React, { useEffect, useRef } from 'react'
import * as THREE from 'three'

const CAMERA_Z = 10
const FOV = 50

type ShapeKind = 'ico' | 'octa' | 'dodeca' | 'torus' | 'knot'

type ShapeSpec = {
  kind: ShapeKind
  side: 1 | -1
  y: number
  z: number
  scale: number
  color: string
  wire: boolean
}

// Spread down the page, alternating sides so they frame the content column
const SHAPES: ShapeSpec[] = [
  { kind: 'ico', side: 1, y: 3.2, z: -7, scale: 0.8, color: '#8b5cf6', wire: true },
  { kind: 'knot', side: -1, y: -10.5, z: -6, scale: 0.65, color: '#3b82f6', wire: false },
  { kind: 'octa', side: 1, y: -7.5, z: -4, scale: 0.85, color: '#ec4899', wire: false },
  { kind: 'torus', side: -1, y: -12, z: -5, scale: 0.85, color: '#06b6d4', wire: false },
  { kind: 'dodeca', side: 1, y: -16, z: -6, scale: 1, color: '#6366f1', wire: true },
  { kind: 'ico', side: -1, y: -20, z: -4, scale: 0.75, color: '#a855f7', wire: false },
  { kind: 'knot', side: 1, y: -24.5, z: -5, scale: 0.6, color: '#ec4899', wire: false },
  { kind: 'octa', side: -1, y: -29, z: -5, scale: 0.9, color: '#3b82f6', wire: true },
  { kind: 'ico', side: 1, y: -33, z: -4, scale: 0.8, color: '#06b6d4', wire: false },
  { kind: 'torus', side: -1, y: -37, z: -6, scale: 0.8, color: '#8b5cf6', wire: true },
]

function makeGeometry(kind: ShapeKind) {
  switch (kind) {
    case 'ico':
      return new THREE.IcosahedronGeometry(1, 0)
    case 'octa':
      return new THREE.OctahedronGeometry(1, 0)
    case 'dodeca':
      return new THREE.DodecahedronGeometry(1, 0)
    case 'torus':
      return new THREE.TorusGeometry(0.8, 0.28, 16, 48)
    case 'knot':
      return new THREE.TorusKnotGeometry(0.7, 0.22, 128, 16)
  }
}

// Soft round sprite so stars render as glowing dots instead of squares
function makeStarTexture() {
  const size = 64
  const canvas = document.createElement('canvas')
  canvas.width = canvas.height = size
  const ctx = canvas.getContext('2d')!
  const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2)
  g.addColorStop(0, 'rgba(255,255,255,1)')
  g.addColorStop(0.25, 'rgba(255,255,255,0.8)')
  g.addColorStop(1, 'rgba(255,255,255,0)')
  ctx.fillStyle = g
  ctx.fillRect(0, 0, size, size)
  return new THREE.CanvasTexture(canvas)
}

function makeStarfield(count: number, texture: THREE.Texture) {
  const positions = new Float32Array(count * 3)
  const colors = new Float32Array(count * 3)
  const palette = ['#93c5fd', '#c4b5fd', '#f9a8d4', '#ffffff', '#67e8f9'].map((c) => new THREE.Color(c))
  for (let i = 0; i < count; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 80
    positions[i * 3 + 1] = 22 - Math.random() * 64
    positions[i * 3 + 2] = -4 - Math.random() * 28
    const c = palette[Math.floor(Math.random() * palette.length)]
    colors[i * 3] = c.r
    colors[i * 3 + 1] = c.g
    colors[i * 3 + 2] = c.b
  }
  const geometry = new THREE.BufferGeometry()
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
  geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))
  const material = new THREE.PointsMaterial({
    map: texture,
    size: 0.22,
    sizeAttenuation: true,
    vertexColors: true,
    transparent: true,
    opacity: 0.9,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  })
  return new THREE.Points(geometry, material)
}

function makeShape(spec: ShapeSpec, isMobile: boolean) {
  const material = spec.wire
    ? new THREE.MeshBasicMaterial({ color: spec.color, wireframe: true, transparent: true, opacity: 0.28 })
    : new THREE.MeshPhysicalMaterial({
        color: spec.color,
        emissive: spec.color,
        emissiveIntensity: 0.15,
        roughness: 0.22,
        metalness: 0.35,
        clearcoat: 1,
        clearcoatRoughness: 0.15,
        flatShading: true,
        transparent: true,
        opacity: isMobile ? 0.55 : 0.75,
      })
  const mesh = new THREE.Mesh(makeGeometry(spec.kind), material)
  mesh.position.set(0, spec.y, spec.z)
  mesh.scale.setScalar(spec.scale * (isMobile ? 0.6 : 1))
  mesh.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, 0)
  return mesh
}

// Fixed full-screen WebGL layer behind the page: starfield (far), floating
// shapes (mid, parallax on scroll).
// Written in plain three.js so it doesn't depend on React's renderer version.
export default function Scene3D({ onReady }: { onReady?: () => void }) {
  const mountRef = useRef<HTMLDivElement>(null)
  const onReadyRef = useRef(onReady)
  onReadyRef.current = onReady

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const isMobile = window.innerWidth < 768

    let renderer: THREE.WebGLRenderer
    try {
      renderer = new THREE.WebGLRenderer({ antialias: !isMobile, alpha: true, powerPreference: 'high-performance' })
    } catch {
      return
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1.5 : 1.75))
    renderer.setSize(mount.clientWidth, mount.clientHeight)
    mount.appendChild(renderer.domElement)

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(FOV, mount.clientWidth / mount.clientHeight, 0.1, 100)
    camera.position.z = CAMERA_Z

    scene.add(new THREE.AmbientLight(0xffffff, 0.45))
    const sun = new THREE.DirectionalLight(0xffffff, 1.3)
    sun.position.set(5, 6, 5)
    scene.add(sun)
    const blue = new THREE.PointLight('#3b82f6', 2.2, 0, 0)
    blue.position.set(-8, 3, 4)
    const pink = new THREE.PointLight('#ec4899', 2.2, 0, 0)
    pink.position.set(8, -3, 4)
    scene.add(blue, pink)

    const starTexture = makeStarTexture()
    const stars = makeStarfield(isMobile ? 600 : 1500, starTexture)
    scene.add(stars)

    const shapeLayer = new THREE.Group()
    const specs = isMobile ? SHAPES.filter((_, i) => i % 2 === 0) : SHAPES
    const shapes = specs.map((spec) => makeShape(spec, isMobile))
    shapeLayer.add(...shapes)
    scene.add(shapeLayer)

    // Keep shapes near the screen edges at their depth, whatever the aspect ratio
    const placeShapes = () => {
      const tanHalf = Math.tan(THREE.MathUtils.degToRad(FOV / 2))
      shapes.forEach((mesh, i) => {
        const halfWidth = tanHalf * (CAMERA_Z - specs[i].z) * camera.aspect
        mesh.position.x = specs[i].side * halfWidth * (isMobile ? 0.78 : 0.88)
      })
    }
    placeShapes()

    const onResize = () => {
      const w = mount.clientWidth
      const h = mount.clientHeight
      renderer.setSize(w, h)
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      placeShapes()
    }
    window.addEventListener('resize', onResize)

    // Pointer position in -1..1 (the canvas itself ignores pointer events)
    const pointer = { x: 0, y: 0 }
    const onMove = (e: PointerEvent) => {
      pointer.x = (e.clientX / window.innerWidth) * 2 - 1
      pointer.y = -((e.clientY / window.innerHeight) * 2 - 1)
    }
    window.addEventListener('pointermove', onMove, { passive: true })

    const clock = new THREE.Clock()
    let frame = 0
    let first = true

    const tick = () => {
      frame = requestAnimationFrame(tick)
      const delta = Math.min(clock.getDelta(), 0.1)
      const t = clock.elapsedTime
      const scrollY = window.scrollY

      // Gentle mouse parallax
      const tx = reducedMotion ? 0 : pointer.x * 0.8
      const ty = reducedMotion ? 0 : pointer.y * 0.5
      camera.position.x = THREE.MathUtils.damp(camera.position.x, tx, 3, delta)
      camera.position.y = THREE.MathUtils.damp(camera.position.y, ty, 3, delta)
      camera.lookAt(0, 0, 0)

      // Layers scroll at different speeds for depth
      stars.position.y = scrollY * 0.0012
      shapeLayer.position.y = scrollY * 0.004

      if (!reducedMotion) {
        stars.rotation.y = Math.sin(t * 0.05) * 0.05
        shapes.forEach((mesh, i) => {
          const spin = i % 2 === 0 ? 1 : -1
          mesh.rotation.x += delta * 0.18 * spin
          mesh.rotation.y += delta * 0.24
          mesh.position.y = specs[i].y + Math.sin(t * 0.6 + i * 1.7) * 0.25
        })
      }

      renderer.render(scene, camera)

      if (first) {
        first = false
        onReadyRef.current?.()
      }
    }
    tick()

    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('resize', onResize)
      window.removeEventListener('pointermove', onMove)
      scene.traverse((obj) => {
        if (obj instanceof THREE.Mesh || obj instanceof THREE.Points) {
          obj.geometry.dispose()
          ;(Array.isArray(obj.material) ? obj.material : [obj.material]).forEach((m) => m.dispose())
        }
      })
      starTexture.dispose()
      renderer.dispose()
      renderer.domElement.remove()
    }
  }, [])

  return <div ref={mountRef} className="absolute inset-0" />
}
