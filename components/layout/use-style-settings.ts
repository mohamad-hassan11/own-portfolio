'use client'

import { useSyncExternalStore } from 'react'
import { validateStyleSettings } from '@/content/style-lab'
import {
  getServerStyleSnapshot,
  getStyleSnapshot,
  subscribeStyleSettings,
} from '@/lib/style-lab'

export function useStyleSettings() {
  const snapshot = useSyncExternalStore(
    subscribeStyleSettings,
    getStyleSnapshot,
    getServerStyleSnapshot,
  )
  return validateStyleSettings(JSON.parse(snapshot))
}
