'use client'

import { useEffect, useRef } from 'react'

export function BackgroundMotion() {
  const glowRef = useRef<HTMLDivElement>(null)
  const revealRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (
      !window.matchMedia('(pointer: fine)').matches ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    )
      return

    const glow = glowRef.current
    const reveal = revealRef.current
    if (!glow || !reveal) return

    const move = (event: PointerEvent) => {
      const x = `${event.clientX}px`
      const y = `${event.clientY}px`
      glow.style.setProperty('--pointer-x', x)
      glow.style.setProperty('--pointer-y', y)
      reveal.style.setProperty('--pointer-x', x)
      reveal.style.setProperty('--pointer-y', y)
    }

    window.addEventListener('pointermove', move, { passive: true })
    return () => window.removeEventListener('pointermove', move)
  }, [])

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-20 overflow-hidden"
    >
      <div className="background-scan absolute inset-0" />
      <div className="background-mesh absolute inset-0" />
      <div ref={glowRef} className="pointer-glow absolute inset-0" />
      <div ref={revealRef} className="pointer-field absolute inset-0" />
    </div>
  )
}
