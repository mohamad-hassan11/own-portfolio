'use client'

import { useEffect, useRef } from 'react'

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const labelRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    if (
      !window.matchMedia('(pointer: fine)').matches ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    )
      return

    const cursor = cursorRef.current
    const label = labelRef.current
    if (!cursor || !label) return

    document.documentElement.classList.add('cursor-ready')

    let targetX = window.innerWidth / 2
    let targetY = window.innerHeight / 2
    let currentX = targetX
    let currentY = targetY
    let frame = 0

    const animate = () => {
      currentX += (targetX - currentX) * 0.22
      currentY += (targetY - currentY) * 0.22
      cursor.style.transform = `translate3d(${currentX}px, ${currentY}px, 0) translate(-50%, -50%)`
      frame = requestAnimationFrame(animate)
    }

    const move = (event: PointerEvent) => {
      targetX = event.clientX
      targetY = event.clientY
      cursor.dataset.visible = 'true'

      const target = event.target as Element | null
      const labeled = target?.closest<HTMLElement>('[data-cursor-label]')
      const interactive = target?.closest('a, button, summary, input, textarea')

      if (labeled) {
        cursor.dataset.mode = 'label'
        label.textContent = labeled.dataset.cursorLabel ?? 'VIEW'
      } else if (interactive) {
        cursor.dataset.mode = 'interactive'
        label.textContent = ''
      } else {
        cursor.dataset.mode = 'default'
        label.textContent = ''
      }
    }

    const hide = () => {
      cursor.dataset.visible = 'false'
    }

    frame = requestAnimationFrame(animate)
    window.addEventListener('pointermove', move, { passive: true })
    document.documentElement.addEventListener('mouseleave', hide)

    return () => {
      document.documentElement.classList.remove('cursor-ready')
      cancelAnimationFrame(frame)
      window.removeEventListener('pointermove', move)
      document.documentElement.removeEventListener('mouseleave', hide)
    }
  }, [])

  return (
    <div
      ref={cursorRef}
      aria-hidden
      data-mode="default"
      data-visible="false"
      className="custom-cursor pointer-events-none fixed top-0 left-0 z-[100] hidden items-center justify-center overflow-hidden md:flex"
    >
      <span
        ref={labelRef}
        className="font-mono text-[10px] font-bold tracking-wider"
      />
    </div>
  )
}
