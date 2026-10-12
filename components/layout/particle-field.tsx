'use client'

import { useEffect, useRef } from 'react'
import { backgroundColors, type StyleSettings } from '@/content/style-lab'
import {
  compositionStyles,
  drawComposition,
} from '@/lib/background-compositions'
import {
  isPatternGradient,
  patternColor,
  patternPaint,
} from '@/lib/background-paint'
import { useStyleSettings } from './use-style-settings'

type Background = StyleSettings['background']
interface Particle {
  x: number
  y: number
  size: number
  phase: number
  heading: number
  targetHeading: number
  turnIn: number
  speed: number
}
interface Ripple {
  x: number
  y: number
  start: number
}
const TWO_PI = Math.PI * 2
const RIPPLE_DURATION = 900
const particleStyles: Background[] = [
  'theme',
  'constellation',
  'stars',
  'fireflies',
  'rain',
  'sprinkles',
]
// Independent, gently changing headings prevent the field from scrolling as a unit.
const movementVelocity = 0.5

function readColor(color: StyleSettings['backgroundColor']) {
  if (isPatternGradient(color)) return color
  const option = backgroundColors.find(({ id }) => id === color)
  const probe = document.createElement('span')
  probe.style.color =
    option && option.id !== 'theme'
      ? document.documentElement.classList.contains('light')
        ? option.light
        : option.dark
      : color.startsWith('#')
        ? color
        : 'var(--cursor-accent)'
  document.body.appendChild(probe)
  const computed = getComputedStyle(probe).color
  probe.remove()
  const parts = computed.match(/\d+/g)
  return parts ? `${parts[0]}, ${parts[1]}, ${parts[2]}` : '138, 168, 255'
}

function trace(ctx: CanvasRenderingContext2D, points: [number, number][]) {
  ctx.beginPath()
  points.forEach(([x, y], index) =>
    index ? ctx.lineTo(x, y) : ctx.moveTo(x, y),
  )
  ctx.stroke()
}

function drawPattern(
  ctx: CanvasRenderingContext2D,
  style: Background,
  width: number,
  height: number,
  spacing: number,
  phase: number,
  direction: [number, number],
) {
  const offsetX = (((phase * direction[0]) % spacing) + spacing) % spacing
  const offsetY = (((phase * direction[1]) % spacing) + spacing) % spacing
  const cols = Math.ceil(width / spacing) + 2
  const rows = Math.ceil(height / spacing) + 2
  const tile = (
    draw: (x: number, y: number, col: number, row: number) => void,
  ) => {
    for (let row = -1; row < rows; row++)
      for (let col = -1; col < cols; col++)
        draw(col * spacing + offsetX, row * spacing + offsetY, col, row)
  }
  switch (style) {
    case 'grid':
      for (let x = offsetX; x < width + spacing; x += spacing)
        trace(ctx, [
          [x, 0],
          [x, height],
        ])
      for (let y = offsetY; y < height + spacing; y += spacing)
        trace(ctx, [
          [0, y],
          [width, y],
        ])
      break
    case 'dots':
      tile((x, y) => {
        ctx.beginPath()
        ctx.arc(x, y, 1.5, 0, TWO_PI)
        ctx.fill()
      })
      break
    case 'diagonals': {
      // The span covers a full tile; repeated lines flow smoothly in either direction.
      const shift =
        (((phase * (direction[0] - direction[1])) % spacing) + spacing) %
        spacing
      for (let x = -height - spacing; x < width + spacing; x += spacing)
        trace(ctx, [
          [x + shift, 0],
          [x + height + shift, height],
        ])
      break
    }
    case 'crosses':
      tile((x, y) => {
        const arm = spacing * 0.12
        trace(ctx, [
          [x - arm, y],
          [x + arm, y],
        ])
        trace(ctx, [
          [x, y - arm],
          [x, y + arm],
        ])
      })
      break
    case 'diamonds':
      tile((x, y) => {
        trace(ctx, [
          [x, y - spacing / 2],
          [x + spacing / 2, y],
          [x, y + spacing / 2],
          [x - spacing / 2, y],
          [x, y - spacing / 2],
        ])
      })
      break
    case 'triangles':
    case 'isometric':
      tile((x, y, col, row) => {
        const shift = row % 2 ? spacing / 2 : 0
        trace(ctx, [
          [x + shift, y],
          [x + shift + spacing / 2, y + spacing],
          [x + shift - spacing / 2, y + spacing],
          [x + shift, y],
        ])
        if (style === 'isometric')
          trace(ctx, [
            [x + shift, y],
            [x + shift, y + spacing],
          ])
      })
      break
    case 'hexagons':
      tile((x, y, col, row) => {
        const cx = x + (row % 2 ? spacing / 2 : 0)
        const r = spacing * 0.48
        const points = Array.from({ length: 7 }, (_, i): [number, number] => [
          cx + Math.cos((i * TWO_PI) / 6) * r,
          y + Math.sin((i * TWO_PI) / 6) * r,
        ])
        trace(ctx, points)
      })
      break
    case 'rings':
      tile((x, y, col, row) => {
        ctx.beginPath()
        ctx.arc(x + (row % 2 ? spacing / 2 : 0), y, spacing * 0.44, 0, TWO_PI)
        ctx.stroke()
      })
      break
    case 'arcs':
      tile((x, y, col, row) => {
        ctx.beginPath()
        const even = (col + row) % 2 === 0
        ctx.arc(
          even ? x : x + spacing,
          y,
          spacing * 0.82,
          even ? 0 : Math.PI / 2,
          even ? Math.PI / 2 : Math.PI,
        )
        ctx.stroke()
      })
      break
    case 'circuit':
      tile((x, y, col, row) => {
        const turn = (col + row) % 3
        trace(ctx, [
          [x, y - spacing / 2],
          [x, y + spacing * 0.12],
          [x + spacing * (turn ? 0.42 : -0.42), y + spacing * 0.12],
        ])
        ctx.beginPath()
        ctx.arc(x, y + spacing * 0.12, 2, 0, TWO_PI)
        ctx.fill()
      })
      break
    case 'waves':
    case 'contours': {
      const step = Math.max(7, spacing / 6)
      for (let y = -spacing; y < height + spacing; y += spacing) {
        ctx.beginPath()
        for (let x = -step; x < width + step; x += step) {
          const bend =
            style === 'waves'
              ? Math.sin(
                  (x + phase * direction[0]) / (spacing * 1.8) + y / spacing,
                ) *
                spacing *
                0.18
              : (Math.sin(x / (spacing * 1.3) + y * 0.013) +
                  Math.sin(x / (spacing * 0.65) - y * 0.009)) *
                spacing *
                0.12
          const py = y + offsetY + bend
          if (x === -step) ctx.moveTo(x, py)
          else ctx.lineTo(x, py)
        }
        ctx.stroke()
      }
      break
    }
  }
}

export function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const {
    background,
    density,
    size,
    opacity,
    backgroundColor,
    motion,
    interaction,
  } = useStyleSettings()
  const visible = background !== 'none'

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || !visible) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)')
    const fine = window.matchMedia('(pointer: fine)')
    const isParticle = particleStyles.includes(background)
    const linked = background === 'theme' || background === 'constellation'
    let particles: Particle[] = []
    let ripples: Ripple[] = []
    let color = readColor(backgroundColor)
    let width = 0
    let height = 0
    let frame = 0
    let lastTime = 0
    let phase = 0
    const pointer = { x: 0, y: 0, active: false }
    const rgba = (alpha: number) =>
      patternPaint(ctx, color, width, height, alpha)
    const canAnimate = () =>
      motion === 'animated' && !reduced.matches && !document.hidden

    const draw = (time = performance.now()) => {
      frame = 0
      const animate = canAnimate()
      const elapsed =
        animate && lastTime ? Math.min(time - lastTime, 32) / 16.67 : 0
      lastTime = time
      phase += elapsed * movementVelocity
      ctx.clearRect(0, 0, width, height)
      ctx.globalAlpha = opacity / 100
      const spacing = Math.max(
        30,
        48 * (0.65 + size * 0.17) * (1.35 - density * 0.11),
      )
      ctx.lineWidth = 1
      ctx.strokeStyle = rgba(0.42)
      ctx.fillStyle = rgba(0.62)
      if (compositionStyles.has(background)) {
        drawComposition(ctx, {
          style: background,
          width,
          height,
          phase,
          density,
          size,
          color,
          pointer: {
            ...pointer,
            active: pointer.active && animate && interaction,
          },
        })
      } else if (!isParticle) {
        ctx.globalAlpha *= 0.94 + Math.cos(phase * 0.006) * 0.06
        drawPattern(ctx, background, width, height, spacing, 0, [0, 0])
        ctx.globalAlpha = opacity / 100
      } else {
        for (const particle of particles) {
          particle.turnIn -= elapsed
          if (particle.turnIn <= 0) {
            particle.targetHeading = Math.random() * TWO_PI
            particle.turnIn = 180 + Math.random() * 420
          }
          const turn = Math.atan2(
            Math.sin(particle.targetHeading - particle.heading),
            Math.cos(particle.targetHeading - particle.heading),
          )
          particle.heading += turn * (1 - Math.exp(-elapsed * 0.008))
          const dx = Math.cos(particle.heading)
          const dy = Math.sin(particle.heading)
          const drift = movementVelocity * particle.speed
          particle.x = (particle.x + dx * drift * elapsed + width) % width
          particle.y = (particle.y + dy * drift * elapsed + height) % height
          if (background === 'rain') {
            trace(ctx, [
              [particle.x, particle.y],
              [
                particle.x - dx * particle.size * 5,
                particle.y - dy * particle.size * 5,
              ],
            ])
          } else if (background === 'sprinkles') {
            ctx.save()
            ctx.translate(particle.x, particle.y)
            ctx.rotate(particle.phase)
            trace(ctx, [
              [-particle.size * 2, 0],
              [particle.size * 2, 0],
            ])
            ctx.restore()
          } else {
            if (background === 'fireflies') {
              const glow = ctx.createRadialGradient(
                particle.x,
                particle.y,
                0,
                particle.x,
                particle.y,
                particle.size * 7,
              )
              glow.addColorStop(0, patternColor(color, 0.4, particle.x / width))
              glow.addColorStop(1, patternColor(color, 0, particle.x / width))
              ctx.fillStyle = glow
              ctx.beginPath()
              ctx.arc(particle.x, particle.y, particle.size * 7, 0, TWO_PI)
              ctx.fill()
            }
            ctx.fillStyle = rgba(background === 'fireflies' ? 0.62 : 0.42)
            ctx.beginPath()
            ctx.arc(particle.x, particle.y, particle.size, 0, TWO_PI)
            ctx.fill()
          }
        }
        if (linked) {
          const linkDistance = 110 + size * 10
          for (let i = 0; i < particles.length; i++) {
            const a = particles[i]
            for (let j = i + 1; j < particles.length; j++) {
              const b = particles[j]
              const distance = Math.hypot(a.x - b.x, a.y - b.y)
              if (distance < linkDistance) {
                ctx.strokeStyle = rgba(0.14 * (1 - distance / linkDistance))
                trace(ctx, [
                  [a.x, a.y],
                  [b.x, b.y],
                ])
              }
            }
            if (pointer.active && animate && interaction) {
              const distance = Math.hypot(a.x - pointer.x, a.y - pointer.y)
              if (distance < 170) {
                ctx.strokeStyle = rgba(0.24 * (1 - distance / 170))
                trace(ctx, [
                  [a.x, a.y],
                  [pointer.x, pointer.y],
                ])
              }
            }
          }
        }
      }
      ripples = animate
        ? ripples.filter(({ start }) => time - start < RIPPLE_DURATION)
        : []
      for (const ripple of ripples) {
        // A frame timestamp can precede a pointer event received in that frame.
        const progress = Math.max(0, (time - ripple.start) / RIPPLE_DURATION)
        ctx.beginPath()
        ctx.arc(ripple.x, ripple.y, progress * 70, 0, TWO_PI)
        ctx.strokeStyle = rgba(0.3 * (1 - progress))
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
      const cap = fine.matches ? 320 : 180
      const count = Math.min(
        cap,
        Math.round(((width * height) / 18000) * (0.4 + density * 0.5)),
      )
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        size: (0.5 + Math.random() * 0.8) * (0.45 + size * 0.22),
        phase: Math.random() * TWO_PI,
        heading: Math.random() * TWO_PI,
        targetHeading: Math.random() * TWO_PI,
        turnIn: 180 + Math.random() * 420,
        speed: 0.4 + Math.random() * 0.8,
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
      if (!canAnimate() || !interaction) return
      ripples.push({
        x: event.clientX,
        y: event.clientY,
        start: performance.now(),
      })
      if (ripples.length > 4) ripples.shift()
    }
    const themeChange = () => {
      color = readColor(backgroundColor)
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
      reduced.removeEventListener('change', refresh)
      fine.removeEventListener('change', resize)
      window.removeEventListener('pointermove', move)
      document.documentElement.removeEventListener('mouseleave', leave)
      window.removeEventListener('pointerdown', click)
      ctx.clearRect(0, 0, width, height)
    }
  }, [
    visible,
    background,
    density,
    size,
    opacity,
    backgroundColor,
    motion,
    interaction,
  ])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      hidden={!visible}
      className="particle-field pointer-events-none fixed inset-0 -z-20"
    />
  )
}
