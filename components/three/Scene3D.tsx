'use client'

import React, { useEffect, useRef } from 'react'
import * as THREE from 'three'

const CAMERA_Z = 10
const FOV = 50
// World units the camera travels forward per pixel scrolled
const FORWARD = 0.012
// Distance between shapes along the flight path
const SHAPE_SPACING = 7
const BG = '#0b0c12'
// Shapes fade in between these distances ahead of the camera, so they appear
// once they're near enough to sit toward the sides rather than at the centre
const FADE_START = 28
const FADE_FULL = 16

type ShapeKind = 'ico' | 'octa' | 'dodeca' | 'torus' | 'knot'

type ShapeSpec = {
  kind: ShapeKind
  x: number
  y: number
  z: number
  scale: number
  color: string
  wire: boolean
}

const KINDS: ShapeKind[] = ['ico', 'knot', 'octa', 'torus', 'dodeca']
const COLORS = ['#8b5cf6', '#3b82f6', '#ec4899', '#06b6d4', '#6366f1', '#a855f7']

// Shapes placed along the path ahead of the camera, alternating sides so they
// fly past the content column rather than through it
function makeShapeSpecs(travel: number, isMobile: boolean): ShapeSpec[] {
  const count = Math.ceil((travel + 30) / SHAPE_SPACING)
  return Array.from({ length: count }, (_, i) => {
    const side = i % 2 === 0 ? 1 : -1
    const kind = KINDS[i % KINDS.length]
    return {
      kind,
      x: side * (isMobile ? 2.4 : 5.5 + (i % 3) * 1.3),
      y: (((i * 37) % 7) - 3) * 0.8,
      z: -4 - i * SHAPE_SPACING,
      scale: isMobile ? 0.5 : 0.75 + (i % 4) * 0.1,
      color: COLORS[i % COLORS.length],
      // Wireframes only on the faceted shapes; on curved ones they look noisy
      wire: i % 3 === 2 && kind !== 'knot' && kind !== 'torus',
    }
  })
}

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

// Stars fill the whole flight path. Size is capped so stars passing close to
// the camera stay small points instead of ballooning into blobs.
function makeStarfield(count: number, depth: number, texture: THREE.Texture, pixelRatio: number) {
  const positions = new Float32Array(count * 3)
  const colors = new Float32Array(count * 3)
  const palette = ['#93c5fd', '#c4b5fd', '#f9a8d4', '#ffffff', '#67e8f9'].map((c) => new THREE.Color(c))
  for (let i = 0; i < count; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 80
    positions[i * 3 + 1] = (Math.random() - 0.5) * 50
    positions[i * 3 + 2] = CAMERA_Z + 2 - Math.random() * depth
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
  const maxSize = (6 * pixelRatio).toFixed(1)
  material.onBeforeCompile = (shader) => {
    shader.vertexShader = shader.vertexShader.replace(
      '#include <fog_vertex>',
      `#include <fog_vertex>\n  gl_PointSize = min(gl_PointSize, ${maxSize});`
    )
  }
  return new THREE.Points(geometry, material)
}

function makeShape(spec: ShapeSpec, isMobile: boolean) {
  const opacity = spec.wire ? 0.3 : isMobile ? 0.55 : 0.75
  const material = spec.wire
    ? new THREE.MeshBasicMaterial({ color: spec.color, wireframe: true, transparent: true, opacity, fog: false })
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
        opacity,
        // Faded by distance below instead; fog would turn far shapes into dark blots
        fog: false,
      })
  const mesh = new THREE.Mesh(makeGeometry(spec.kind), material)
  mesh.position.set(spec.x, spec.y, spec.z)
  mesh.scale.setScalar(spec.scale)
  mesh.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, 0)
  mesh.userData.baseOpacity = opacity
  return mesh
}

// Fixed full-screen WebGL layer behind the page. Scrolling flies the camera
// forward through a starfield, with shapes passing by on either side; far
// objects fade into the background colour.
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
    const pixelRatio = Math.min(window.devicePixelRatio, isMobile ? 1.5 : 1.75)
    renderer.setPixelRatio(pixelRatio)
    renderer.setSize(mount.clientWidth, mount.clientHeight)
    mount.appendChild(renderer.domElement)

    const scene = new THREE.Scene()
    scene.fog = new THREE.Fog(BG, 14, 60)
    const camera = new THREE.PerspectiveCamera(FOV, mount.clientWidth / mount.clientHeight, 0.1, 100)
    camera.position.z = CAMERA_Z
    scene.add(camera)

    scene.add(new THREE.AmbientLight(0xffffff, 0.45))
    const sun = new THREE.DirectionalLight(0xffffff, 1.3)
    sun.position.set(5, 6, 5)
    scene.add(sun)
    // Coloured lights ride along with the camera so shapes ahead stay lit
    const blue = new THREE.PointLight('#3b82f6', 2.2, 0, 0)
    blue.position.set(-8, 3, -6)
    const pink = new THREE.PointLight('#ec4899', 2.2, 0, 0)
    pink.position.set(8, -3, -6)
    camera.add(blue, pink)

    // How far the camera can travel over the whole page
    const maxScroll = Math.max(document.documentElement.scrollHeight - window.innerHeight, 6000)
    const travel = reducedMotion ? 0 : maxScroll * FORWARD

    const starTexture = makeStarTexture()
    const stars = makeStarfield(isMobile ? 1200 : 3000, travel + 70, starTexture, pixelRatio)
    scene.add(stars)

    const specs = makeShapeSpecs(travel, isMobile)
    const shapes = specs.map((spec) => makeShape(spec, isMobile))
    scene.add(...shapes)

    const onResize = () => {
      const w = mount.clientWidth
      const h = mount.clientHeight
      renderer.setSize(w, h)
      camera.aspect = w / h
      camera.updateProjectionMatrix()
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

      // Fly forward with the scroll (damped so wheel steps glide), drift with the mouse
      const targetZ = CAMERA_Z - (reducedMotion ? 0 : window.scrollY * FORWARD)
      camera.position.z = first ? targetZ : THREE.MathUtils.damp(camera.position.z, targetZ, 8, delta)
      const tx = reducedMotion ? 0 : pointer.x * 0.8
      const ty = reducedMotion ? 0 : pointer.y * 0.5
      camera.position.x = THREE.MathUtils.damp(camera.position.x, tx, 3, delta)
      camera.position.y = THREE.MathUtils.damp(camera.position.y, ty, 3, delta)
      camera.lookAt(camera.position.x * 0.3, camera.position.y * 0.3, camera.position.z - 30)

      shapes.forEach((mesh, i) => {
        // Fade in from the distance, and out just before passing the camera
        const ahead = camera.position.z - mesh.position.z
        const fadeIn = THREE.MathUtils.clamp((FADE_START - ahead) / (FADE_START - FADE_FULL), 0, 1)
        const fadeOut = THREE.MathUtils.clamp((ahead - 1) / 4, 0, 1)
        const material = mesh.material as THREE.MeshBasicMaterial | THREE.MeshPhysicalMaterial
        material.opacity = mesh.userData.baseOpacity * fadeIn * fadeOut
        mesh.visible = material.opacity > 0.01
        if (!reducedMotion) {
          const spin = i % 2 === 0 ? 1 : -1
          mesh.rotation.x += delta * 0.18 * spin
          mesh.rotation.y += delta * 0.24
          mesh.position.y = specs[i].y + Math.sin(t * 0.6 + i * 1.7) * 0.25
        }
      })

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
