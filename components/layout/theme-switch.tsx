'use client'

import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import { useSyncExternalStore } from 'react'

const subscribe = () => () => {}

export function ThemeSwitch() {
  const { resolvedTheme, setTheme } = useTheme()
  const mounted = useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  )
  const dark = mounted && resolvedTheme === 'dark'

  return (
    <button
      type="button"
      aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
      title={dark ? 'Switch to light mode' : 'Switch to dark mode'}
      disabled={!mounted}
      onClick={() => setTheme(dark ? 'light' : 'dark')}
      className="brutal-sm bg-surface text-foreground hover:bg-surface-hover inline-flex size-10 items-center justify-center"
    >
      {dark ? (
        <Sun aria-hidden className="size-5" />
      ) : (
        <Moon aria-hidden className="size-5" />
      )}
    </button>
  )
}
