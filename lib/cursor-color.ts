import type { CSSProperties } from 'react'
import { cursorColors, type CursorColor } from '@/content/style-lab'

export function getCursorColor(color: CursorColor, mode: string | undefined) {
  if (color === 'theme') return undefined
  if (color.startsWith('#')) return color
  const option = cursorColors.find(({ id }) => id === color)
  return option?.[mode === 'light' ? 'light' : 'dark']
}

export function getCursorColorStyle(
  color: CursorColor,
  mode: string | undefined,
): CSSProperties | undefined {
  const value = getCursorColor(color, mode)
  return value
    ? ({
        '--cursor-accent': value,
        '--accent': value,
        '--accent-text': value,
      } as CSSProperties)
    : undefined
}
