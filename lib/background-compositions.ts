import type { StyleSettings } from '@/content/style-lab'
import { patternColor, patternPaint } from '@/lib/background-paint'

interface Composition {
  style: StyleSettings['background']
  width: number
  height: number
  phase: number
  density: number
  size: number
  vector: [number, number]
  pointer: { x: number; y: number; active: boolean }
  color: string
}

export const compositionStyles = new Set([
  'spotlight',
  'ribbons',
  'sculpture',
  'shards',
  'magnetic',
])

// Viewport-sized compositions, rather than repeating background tiles.
export function drawComposition(
  ctx: CanvasRenderingContext2D,
  options: Composition,
) {
  const {
    style,
    width: w,
    height: h,
    phase,
    density,
    size,
    vector,
    pointer,
    color,
  } = options
  const t = phase * 0.004
  const px = pointer.active ? pointer.x / w - 0.5 : 0
  const py = pointer.active ? pointer.y / h - 0.5 : 0
  const ink = (alpha: number) => patternPaint(ctx, color, w, h, alpha, 1.7)
  ctx.save()
  if (style === 'spotlight') {
    const x = pointer.active
      ? pointer.x
      : w * (0.5 + Math.sin(t * vector[0]) * 0.16)
    const y = pointer.active
      ? pointer.y
      : h * (0.45 + Math.sin(t * vector[1]) * 0.12)
    const r = Math.min(w, h) * (0.3 + size * 0.055)
    const light = ctx.createRadialGradient(x, y, 0, x, y, r)
    light.addColorStop(0, patternColor(color, 0.06 + density * 0.015, 0.5, 1.7))
    light.addColorStop(0.45, patternColor(color, 0.04, 0.5, 1.7))
    light.addColorStop(1, patternColor(color, 0, 0.5, 1.7))
    ctx.fillStyle = light
    ctx.fillRect(0, 0, w, h)
  } else if (style === 'ribbons') {
    for (let i = 0; i < 3 + density; i++) {
      const y = h * (0.18 + i * 0.095)
      ctx.beginPath()
      ctx.moveTo(-w * 0.1, y)
      ctx.bezierCurveTo(
        w * 0.28,
        y - h * (0.35 + Math.sin(t + i * 0.7) * 0.08) + py * 90,
        w * 0.65 + px * 100,
        y + h * 0.4,
        w * 1.1,
        y - h * 0.08,
      )
      ctx.strokeStyle = ink(0.07 + i * 0.012)
      ctx.lineWidth = 1 + size * 0.6 + i * 0.3
      ctx.stroke()
    }
  } else if (style === 'sculpture') {
    const r = Math.min(w, h) * (0.2 + size * 0.025)
    ctx.translate(w * 0.72, h * 0.48)
    ctx.rotate(t * vector[0] * 0.15 + px * 0.35)
    for (let i = 0; i < 5 + density * 2; i++) {
      const angle = (i * Math.PI) / (5 + density * 2) + t * vector[1] * 0.12
      ctx.beginPath()
      ctx.ellipse(
        0,
        0,
        r,
        r * (0.15 + Math.abs(Math.sin(angle + py * 0.5)) * 0.65),
        angle,
        0,
        Math.PI * 2,
      )
      ctx.strokeStyle = ink(0.13)
      ctx.lineWidth = 0.8
      ctx.stroke()
    }
  } else if (style === 'shards') {
    for (let i = 0; i < 4 + density; i++) {
      const seed = i * 2.39996
      const depth = 0.4 + (i % 3) * 0.3
      const x =
        w * (0.12 + ((i * 0.618) % 0.78)) +
        px * 65 * depth +
        Math.sin(t + seed) * 12 * vector[0]
      const y =
        h * (0.12 + ((i * 0.381) % 0.76)) +
        py * 65 * depth +
        Math.cos(t + seed) * 12 * vector[1]
      const r = (24 + size * 12) * depth
      ctx.save()
      ctx.translate(x, y)
      ctx.rotate(seed + t * 0.05)
      ctx.beginPath()
      ctx.moveTo(-r, -r * 0.35)
      ctx.lineTo(r * 0.7, -r)
      ctx.lineTo(r, r * 0.6)
      ctx.lineTo(-r * 0.4, r)
      ctx.closePath()
      ctx.fillStyle = ink(0.025)
      ctx.strokeStyle = ink(0.16)
      ctx.fill()
      ctx.stroke()
      ctx.restore()
    }
  } else if (style === 'magnetic') {
    const count = 45 + density * 25
    for (let i = 0; i < count; i++) {
      const x = ((i * 0.61803398875) % 1) * w
      const y = ((i * 0.41421356237 + 0.17) % 1) * h
      const distance = pointer.active
        ? Math.hypot(pointer.x - x, pointer.y - y)
        : Infinity
      const influence = Math.max(0, 1 - distance / (180 + size * 25))
      const angle =
        pointer.active && influence > 0
          ? Math.atan2(pointer.y - y, pointer.x - x)
          : Math.sin(i + t) * 0.7 + i
      const length = 3 + size * 1.5 + influence * 8
      ctx.beginPath()
      ctx.moveTo(x - Math.cos(angle) * length, y - Math.sin(angle) * length)
      ctx.lineTo(x + Math.cos(angle) * length, y + Math.sin(angle) * length)
      ctx.strokeStyle = ink(0.12 + influence * 0.3)
      ctx.stroke()
    }
  }
  ctx.restore()
}
