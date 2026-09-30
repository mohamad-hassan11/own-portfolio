'use client'

import {
  Blend,
  Blocks,
  Droplets,
  Gamepad2,
  Sparkles,
  type LucideIcon,
} from 'lucide-react'
import { useSyncExternalStore } from 'react'
import { cn } from '@/lib/utils'

type Skin = 'neo' | 'glass' | 'vaporwave' | 'pixel' | 'fusion'

const STORAGE_KEY = 'site-skin'

const skins: { id: Skin; label: string; icon: LucideIcon }[] = [
  { id: 'neo', label: 'Neo-brutalist style', icon: Blocks },
  { id: 'glass', label: 'Glassmorphism style', icon: Droplets },
  { id: 'vaporwave', label: 'Vaporwave style', icon: Sparkles },
  { id: 'pixel', label: 'Pixel art style', icon: Gamepad2 },
  { id: 'fusion', label: 'Fusion style', icon: Blend },
]

function isSkin(value: string | null): value is Skin {
  return skins.some((option) => option.id === value)
}

// `storage` only fires in other tabs by spec; applySkin dispatches it manually
// so this same tab's instances re-read the value too.
function subscribe(callback: () => void) {
  window.addEventListener('storage', callback)
  return () => window.removeEventListener('storage', callback)
}

function getSnapshot(): Skin {
  const stored = localStorage.getItem(STORAGE_KEY)
  return isSkin(stored) ? stored : 'neo'
}

function getServerSnapshot(): Skin {
  return 'neo'
}

function applySkin(next: Skin) {
  localStorage.setItem(STORAGE_KEY, next)
  document.documentElement.setAttribute('data-skin', next)
  window.dispatchEvent(new Event('storage'))
}

// Experimental: swaps the whole visual language via a `data-skin` attribute on <html>.
// See the "Style skins" section in app/globals.css for what each one changes.
export function SkinSwitcher({ className }: { className?: string }) {
  const skin = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)

  return (
    <div
      role="group"
      aria-label="Site style"
      className={cn('flex items-center gap-1', className)}
    >
      {skins.map(({ id, label, icon: Icon }) => (
        <button
          key={id}
          type="button"
          onClick={() => applySkin(id)}
          aria-pressed={skin === id}
          aria-label={label}
          className={cn(
            'brutal-sm inline-flex size-10 items-center justify-center transition-colors duration-200',
            skin === id
              ? 'bg-accent text-accent-foreground'
              : 'bg-surface text-muted hover:text-foreground',
          )}
        >
          <Icon aria-hidden className="size-[18px]" />
        </button>
      ))}
    </div>
  )
}
