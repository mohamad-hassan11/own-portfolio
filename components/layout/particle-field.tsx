'use client'

import { useEffect, useRef } from 'react'

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  r: number
}

interface Ripple {
  x: number
  y: number
  start: number
}

const LINK_DISTANCE = 130
const CURSOR_LINK_DISTANCE = 170
const PARTICLE_DENSITY = 1 / 16000 // particles per square pixel
const RIPPLE_DURATION = 900

// Reads the resolved accent colour so particles follow the active theme.
function readAccentRgb() {
  const value = getComputedStyle(document.documentElement)
    .getPropertyValue('--cursor-accent')
    .trim()
  const probe = document.createElement('div')
  probe.style.color = value || '#3d6bff'
  document.body.appendChild(probe)
  const rgb = getComputedStyle(probe).color
  document.body.removeChild(probe)
  const match = rgb.match(/\d+/g)
  return match ? `${match[0]}, ${match[1]}, ${match[2]}` : '61, 107, 255'
}

export function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const reduceMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches
    const fine = window.matchMedia('(pointer: fine)').matches

    let particles: Particle[] = []
    let ripples: Ripple[] = []
    let accent = readAccentRgb()
    let width = 0
    let height = 0
    let dpr = 1
    const pointer = { x: -9999, y: -9999, active: false }

    const seedParticles = () => {
      const count = Math.min(140, Math.round(width * height * PARTICLE_DENSITY))
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.18,
        vy: (Math.random() - 0.5) * 0.18,
        r: Math.random() * 1.4 + 0.6,
      }))
    }

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      width = window.innerWidth
      height = window.innerHeight
      canvas.width = width * dpr
      canvas.height = height * dpr
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      seedParticles()
    }

    const onPointerMove = (event: PointerEvent) => {
      pointer.x = event.clientX
      pointer.y = event.clientY
      pointer.active = true
    }

    const onPointerLeave = () => {
      pointer.active = false
    }

    const onPointerDown = (event: PointerEvent) => {
      ripples.push({
        x: event.clientX,
        y: event.clientY,
        start: performance.now(),
      })
      if (ripples.length > 6) ripples.shift()
    }

    const onThemeChange = () => {
      accent = readAccentRgb()
    }

    let frame = 0
    const step = () => {
      ctx.clearRect(0, 0, width, height)

      for (const particle of particles) {
        particle.x += particle.vx
        particle.y += particle.vy

        if (particle.x < 0 || particle.x > width) particle.vx *= -1
        if (particle.y < 0 || particle.y > height) particle.vy *= -1

        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${accent}, 0.55)`
        ctx.fill()
      }

      for (let i = 0; i < particles.length; i++) {
        const a = particles[i]

        for (let j = i + 1; j < particles.length; j++) {
          const b = particles[j]
          const dx = a.x - b.x
          const dy = a.y - b.y
          const dist = Math.hypot(dx, dy)
          if (dist < LINK_DISTANCE) {
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.strokeStyle = `rgba(${accent}, ${0.16 * (1 - dist / LINK_DISTANCE)})`
            ctx.lineWidth = 1
            ctx.stroke()
          }
        }

        if (pointer.active) {
          const dx = a.x - pointer.x
          const dy = a.y - pointer.y
          const dist = Math.hypot(dx, dy)
          if (dist < CURSOR_LINK_DISTANCE) {
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(pointer.x, pointer.y)
            ctx.strokeStyle = `rgba(${accent}, ${0.32 * (1 - dist / CURSOR_LINK_DISTANCE)})`
            ctx.lineWidth = 1
            ctx.stroke()
          }
        }
      }

      const now = performance.now()
      ripples = ripples.filter((ripple) => now - ripple.start < RIPPLE_DURATION)
      for (const ripple of ripples) {
        const t = (now - ripple.start) / RIPPLE_DURATION
        ctx.beginPath()
        ctx.arc(ripple.x, ripple.y, t * 90, 0, Math.PI * 2)
        ctx.strokeStyle = `rgba(${accent}, ${0.4 * (1 - t)})`
        ctx.lineWidth = 1.5
        ctx.stroke()
      }

      frame = requestAnimationFrame(step)
    }

    resize()
    window.addEventListener('resize', resize)
    const media = window.matchMedia('(prefers-color-scheme: dark)')

    if (fine) {
      window.addEventListener('pointermove', onPointerMove, { passive: true })
      window.addEventListener('pointerleave', onPointerLeave)
    }
    window.addEventListener('pointerdown', onPointerDown)
    media.addEventListener('change', onThemeChange)

    const observer = new MutationObserver(onThemeChange)
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    })

    if (!reduceMotion) {
      frame = requestAnimationFrame(step)
    } else {
      step()
    }

    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('resize', resize)
      window.removeEventListener('pointermove', onPointerMove)
      window.removeEventListener('pointerleave', onPointerLeave)
      window.removeEventListener('pointerdown', onPointerDown)
      media.removeEventListener('change', onThemeChange)
      observer.disconnect()
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-20"
    />
  )
}
