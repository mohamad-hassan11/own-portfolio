'use client'

import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme()

  return (
    <button
      type="button"
      onClick={() => {
    if (resolvedTheme === 'light') setTheme('dark');
    else if (resolvedTheme === 'dark') setTheme('heroSite');
    else setTheme('light');
  }}
      aria-label="Toggle colour theme"
      className="brutal-sm brutal-lift bg-surface inline-flex size-10 items-center justify-center"
    >
      <Sun aria-hidden className="hidden size-[18px] dark:block" />
      <Moon aria-hidden className="size-[18px] dark:hidden" />
    </button>
  )
}
