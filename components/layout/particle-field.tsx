'use client'

import { useEffect, useRef } from 'react'
import { useStyleSettings } from './use-style-settings'

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
const RIPPLE_DURATION = 900

function readAccentRgb() {
  const probe = document.createElement('span')
  probe.style.color = 'var(--cursor-accent)'
  document.body.appendChild(probe)
  const rgb = getComputedStyle(probe).color
  probe.remove()
  const match = rgb.match(/\d+/g)
  return match ? `${match[0]}, ${match[1]}, ${match[2]}` : '61, 107, 255'
}

export function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { background, density, motion, interaction } = useStyleSettings()
  const visible =
    background === 'theme' ||
    background === 'constellation' ||
    background === 'stars'

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || !visible) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)')
    const fine = window.matchMedia('(pointer: fine)')
    let particles: Particle[] = []
    let ripples: Ripple[] = []
    let accent = readAccentRgb()
    let width = 0
    let height = 0
    let frame = 0
    let lastTime = 0
    const pointer = { x: 0, y: 0, active: false }
    const linked = background !== 'stars'
    const canAnimate = () =>
      motion === 'animated' &&
      !reduced.matches &&
      !document.hidden &&
      !document.querySelector('dialog[open]')

    const draw = (time = performance.now()) => {
      frame = 0
      const animate = canAnimate()
      // Frame-rate independent movement; cap jumps when returning to a tab.
      const elapsed =
        animate && lastTime ? Math.min(time - lastTime, 32) / 16.67 : 0
      lastTime = time
      ctx.clearRect(0, 0, width, height)
      for (const particle of particles) {
        particle.x += particle.vx * elapsed
        particle.y += particle.vy * elapsed
        if (particle.x < 0 || particle.x > width) particle.vx *= -1
        if (particle.y < 0 || particle.y > height) particle.vy *= -1
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${accent}, 0.4)`
        ctx.fill()
      }
      if (linked)
        for (let i = 0; i < particles.length; i++) {
          const a = particles[i]
          for (let j = i + 1; j < particles.length; j++) {
            const b = particles[j]
            const squared = (a.x - b.x) ** 2 + (a.y - b.y) ** 2
            if (squared >= LINK_DISTANCE ** 2) continue
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.strokeStyle = `rgba(${accent}, ${0.14 * (1 - Math.sqrt(squared) / LINK_DISTANCE)})`
            ctx.lineWidth = 1
            ctx.stroke()
          }
          if (pointer.active && animate && interaction) {
            const distance = Math.hypot(a.x - pointer.x, a.y - pointer.y)
            if (distance < CURSOR_LINK_DISTANCE) {
              ctx.beginPath()
              ctx.moveTo(a.x, a.y)
              ctx.lineTo(pointer.x, pointer.y)
              ctx.strokeStyle = `rgba(${accent}, ${0.24 * (1 - distance / CURSOR_LINK_DISTANCE)})`
              ctx.stroke()
            }
          }
        }
      ripples = animate
        ? ripples.filter(({ start }) => time - start < RIPPLE_DURATION)
        : []
      for (const ripple of ripples) {
        const progress = (time - ripple.start) / RIPPLE_DURATION
        ctx.beginPath()
        ctx.arc(ripple.x, ripple.y, progress * 70, 0, Math.PI * 2)
        ctx.strokeStyle = `rgba(${accent}, ${0.3 * (1 - progress)})`
        ctx.stroke()
      }
      if (animate) frame = requestAnimationFrame(draw)
    }
    const refresh = () => {
      cancelAnimationFrame(frame)
      lastTime = 0
      draw()
    }
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      width = window.innerWidth
      height = window.innerHeight
      canvas.width = width * dpr
      canvas.height = height * dpr
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      const factor = density === 'subtle' ? 0.5 : density === 'lively' ? 1.5 : 1
      const cap = fine.matches ? 100 : 40
      const count = Math.min(
        cap,
        Math.round(((width * height) / 16000) * factor),
      )
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.18,
        vy: (Math.random() - 0.5) * 0.18,
        r: Math.random() * 1.2 + 0.6,
      }))
      refresh()
    }
    const move = (event: PointerEvent) => {
      if (!fine.matches) return
      pointer.x = event.clientX
      pointer.y = event.clientY
      pointer.active = true
    }
    const leave = () => {
      pointer.active = false
    }
    const click = (event: PointerEvent) => {
      if (!canAnimate()) return
      ripples.push({
        x: event.clientX,
        y: event.clientY,
        start: performance.now(),
      })
      if (ripples.length > 4) ripples.shift()
    }
    const dialogToggle = (event: Event) => {
      if (event.target instanceof HTMLDialogElement) refresh()
    }
    const themeChange = () => {
      accent = readAccentRgb()
      refresh()
    }
    const observer = new MutationObserver(themeChange)
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class', 'data-skin'],
    })
    resize()
    window.addEventListener('resize', resize)
    document.addEventListener('visibilitychange', refresh)
    document.addEventListener('toggle', dialogToggle, true)
    reduced.addEventListener('change', refresh)
    fine.addEventListener('change', resize)
    if (interaction && motion === 'animated') {
      window.addEventListener('pointermove', move, { passive: true })
      document.documentElement.addEventListener('mouseleave', leave)
      window.addEventListener('pointerdown', click, { passive: true })
    }
    return () => {
      cancelAnimationFrame(frame)
      observer.disconnect()
      window.removeEventListener('resize', resize)
      document.removeEventListener('visibilitychange', refresh)
      document.removeEventListener('toggle', dialogToggle, true)
      reduced.removeEventListener('change', refresh)
      fine.removeEventListener('change', resize)
      window.removeEventListener('pointermove', move)
      document.documentElement.removeEventListener('mouseleave', leave)
      window.removeEventListener('pointerdown', click)
      ctx.clearRect(0, 0, width, height)
    }
  }, [visible, background, density, motion, interaction])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      hidden={!visible}
      className="particle-field pointer-events-none fixed inset-0 -z-20"
    />
  )
}
