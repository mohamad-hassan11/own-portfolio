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

    const move = (event: PointerEvent) => {
      // Track the pointer directly instead of easing behind it on every frame.
      cursor.style.transform = `translate3d(${event.clientX}px, ${event.clientY}px, 0) translate(-50%, -50%)`
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

    window.addEventListener('pointermove', move, { passive: true })
    document.documentElement.addEventListener('mouseleave', hide)

    return () => {
      document.documentElement.classList.remove('cursor-ready')
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
