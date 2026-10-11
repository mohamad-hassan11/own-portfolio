'use client'

import { useEffect, useRef, useSyncExternalStore } from 'react'
import { useTheme } from 'next-themes'
import { getCursorColorStyle } from '@/lib/cursor-color'
import { useStyleSettings } from './use-style-settings'
import { getUniverse, subscribeUniverse } from '@/lib/universe'

export function CustomCursor() {
  const { cursor: style, cursorColor } = useStyleSettings()
  const { resolvedTheme } = useTheme()
  const universe = useSyncExternalStore(
    subscribeUniverse,
    getUniverse,
    () => 'neo' as const,
  )
  const cursorRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const cursor = cursorRef.current
    if (!cursor) return

    const enabled = window.matchMedia(
      '(min-width: 768px) and (pointer: fine) and (prefers-reduced-motion: no-preference)',
    )

    const active = () => enabled.matches && style !== 'native'

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
    // A manual popover places the cursor above modal dialogs without moving
    // their content or adding another animation loop.
    const raiseCursor = () => {
      if (!active()) return
      cursor.hidePopover()
      cursor.showPopover()
    }
    const onDialogToggle = (event: Event) => {
      if (event.target instanceof HTMLDialogElement) raiseCursor()
    }

    const sync = () => {
      document.documentElement.classList.toggle('cursor-ready', active())
      hide()
      window.removeEventListener('pointermove', move)
      window.removeEventListener('pointerover', hover)
      if (active()) {
        raiseCursor()
        window.addEventListener('pointermove', move, { passive: true })
        window.addEventListener('pointerover', hover, { passive: true })
      } else {
        cursor.hidePopover()
      }
    }

    sync()
    document.addEventListener('toggle', onDialogToggle, true)
    enabled.addEventListener('change', sync)
    window.addEventListener('blur', hide)
    document.documentElement.addEventListener('mouseleave', hide)

    return () => {
      document.documentElement.classList.remove('cursor-ready')
      cursor.hidePopover()
      document.removeEventListener('toggle', onDialogToggle, true)
      enabled.removeEventListener('change', sync)
      window.removeEventListener('pointermove', move)
      window.removeEventListener('pointerover', hover)
      window.removeEventListener('blur', hide)
      document.documentElement.removeEventListener('mouseleave', hide)
    }
  }, [style])

  return (
    <div
      ref={cursorRef}
      aria-hidden
      popover="manual"
      data-style={style === 'theme' ? universe : style}
      style={getCursorColorStyle(cursorColor, resolvedTheme)}
      data-mode="default"
      data-visible="false"
      className="custom-cursor pointer-events-none fixed top-0 left-0 z-[100]"
    />
  )
}
