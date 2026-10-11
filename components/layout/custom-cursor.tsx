'use client'

import { useEffect, useRef } from 'react'

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const cursor = cursorRef.current
    if (!cursor) return

    const enabled = window.matchMedia(
      '(min-width: 768px) and (pointer: fine) and (prefers-reduced-motion: no-preference)',
    )

    const move = (event: PointerEvent) => {
      cursor.style.transform = `translate(${event.clientX}px, ${event.clientY}px) translate(-50%, -50%)`
      if (cursor.dataset.visible !== 'true') cursor.dataset.visible = 'true'
    }

    // Only inspect targets when entering an element, not on every movement.
    const hover = (event: PointerEvent) => {
      const target = event.target
      const interactive =
        target instanceof Element &&
        target.closest(
          'a[href], button:not(:disabled), summary, input, textarea, select, [role="button"]',
        )
      const mode = interactive ? 'interactive' : 'default'
      if (cursor.dataset.mode !== mode) cursor.dataset.mode = mode
    }

    const hide = () => {
      cursor.dataset.visible = 'false'
    }
    const sync = () => {
      document.documentElement.classList.toggle('cursor-ready', enabled.matches)
      hide()
      window.removeEventListener('pointermove', move)
      window.removeEventListener('pointerover', hover)
      if (enabled.matches) {
        window.addEventListener('pointermove', move, { passive: true })
        window.addEventListener('pointerover', hover, { passive: true })
      }
    }

    sync()
    enabled.addEventListener('change', sync)
    window.addEventListener('blur', hide)
    document.documentElement.addEventListener('mouseleave', hide)

    return () => {
      document.documentElement.classList.remove('cursor-ready')
      enabled.removeEventListener('change', sync)
      window.removeEventListener('pointermove', move)
      window.removeEventListener('pointerover', hover)
      window.removeEventListener('blur', hide)
      document.documentElement.removeEventListener('mouseleave', hide)
    }
  }, [])

  return (
    <div
      ref={cursorRef}
      aria-hidden
      data-mode="default"
      data-visible="false"
      className="custom-cursor pointer-events-none fixed top-0 left-0 z-[100]"
    />
  )
}
