export const cursorStyles = [
  { id: 'theme', name: 'Match universe' },
  { id: 'native', name: 'System pointer' },
  { id: 'neo', name: 'Outline' },
  { id: 'glass', name: 'Circle' },
  { id: 'fusion', name: 'Diamond' },
  { id: 'pixel', name: 'Pixel cross' },
  { id: 'vaporwave', name: 'Neon star' },
  { id: 'blueprint', name: 'Crosshair' },
  { id: 'botanical', name: 'Leaf' },
  { id: 'editorial', name: 'Pen nib' },
  { id: 'orbit', name: 'Planet ring' },
] as const

export const cursorColors = [
  { id: 'theme', name: 'Match universe', light: '', dark: '' },
  { id: 'ink', name: 'Ink', light: '#17202a', dark: '#f4f4f5' },
  { id: 'blue', name: 'Blue', light: '#1d4ed8', dark: '#93c5fd' },
  { id: 'mint', name: 'Mint', light: '#047857', dark: '#6ee7b7' },
  { id: 'rose', name: 'Rose', light: '#be185d', dark: '#f9a8d4' },
  { id: 'amber', name: 'Amber', light: '#92400e', dark: '#fcd34d' },
  { id: 'violet', name: 'Violet', light: '#6d28d9', dark: '#c4b5fd' },
] as const

export type CursorColor = (typeof cursorColors)[number]['id'] | `#${string}`
export function isCursorColor(value: unknown): value is CursorColor {
  return (
    typeof value === 'string' &&
    (cursorColors.some(({ id }) => id === value) ||
      /^#[0-9a-f]{6}$/i.test(value))
  )
}

export const backgroundStyles = [
  {
    id: 'theme',
    name: 'Match universe',
    description: 'The original atmosphere of your selected universe.',
  },
  {
    id: 'none',
    name: 'Clean canvas',
    description: 'No patterns or particles. Just the work.',
  },
  {
    id: 'grid',
    name: 'Drafting grid',
    description: 'A quiet, static grid for a technical perspective.',
  },
  {
    id: 'dots',
    name: 'Dot paper',
    description: 'A minimal, static dot pattern.',
  },
  {
    id: 'constellation',
    name: 'Constellation',
    description: 'Floating points connected by delicate lines.',
  },
  {
    id: 'stars',
    name: 'Starfield',
    description: 'Lightweight drifting stars, without connecting lines.',
  },
] as const

export interface StyleSettings {
  cursor: (typeof cursorStyles)[number]['id']
  cursorColor: CursorColor
  background: (typeof backgroundStyles)[number]['id']
  density: 'subtle' | 'balanced' | 'lively'
  motion: 'animated' | 'still'
  interaction: boolean
}

export const defaultStyleSettings: StyleSettings = {
  cursor: 'theme',
  cursorColor: 'theme',
  background: 'theme',
  density: 'balanced',
  motion: 'animated',
  interaction: true,
}

export function validateStyleSettings(value: unknown): StyleSettings {
  if (!value || typeof value !== 'object') return defaultStyleSettings
  const settings = value as Record<string, unknown>
  return {
    cursor:
      cursorStyles.find(({ id }) => id === settings.cursor)?.id ?? 'theme',
    cursorColor: isCursorColor(settings.cursorColor)
      ? settings.cursorColor
      : 'theme',
    background:
      backgroundStyles.find(({ id }) => id === settings.background)?.id ??
      'theme',
    density:
      settings.density === 'subtle' || settings.density === 'lively'
        ? settings.density
        : 'balanced',
    motion: settings.motion === 'still' ? 'still' : 'animated',
    interaction:
      typeof settings.interaction === 'boolean' ? settings.interaction : true,
  }
}
