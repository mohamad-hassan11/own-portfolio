import type { UniverseId } from './universes'

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

export const backgroundCategories = [
  { id: 'base', name: 'Essentials' },
  { id: 'patterns', name: 'Patterns' },
  { id: 'particles', name: 'Particles' },
  { id: 'light', name: 'Light' },
  { id: 'flow', name: 'Flow' },
  { id: 'spatial', name: 'Spatial' },
  { id: 'reactive', name: 'Reactive' },
] as const

export const backgroundLabCopy = {
  introduction:
    'Explore patterns, light, flowing forms, and spatial compositions. Move your pointer to explore reactive effects.',
  interaction: 'React to pointer movement and clicks',
  accessibility:
    'Motion and pointer effects pause when reduced motion is enabled. Touch devices use the ambient composition.',
}

export const backgroundStyles = [
  {
    id: 'theme',
    category: 'base',
    name: 'Match universe',
    description: 'The original atmosphere of your selected universe.',
  },
  {
    id: 'none',
    category: 'base',
    name: 'Clean canvas',
    description: 'No patterns or particles. Just the work.',
  },
  {
    id: 'grid',
    category: 'patterns',
    name: 'Drafting grid',
    description: 'A quiet, static grid for a technical perspective.',
  },
  {
    id: 'dots',
    category: 'patterns',
    name: 'Dot paper',
    description: 'A minimal, static dot pattern.',
  },
  {
    id: 'constellation',
    category: 'particles',
    name: 'Constellation',
    description: 'Floating points connected by delicate lines.',
  },
  {
    id: 'stars',
    category: 'particles',
    name: 'Starfield',
    description: 'Lightweight drifting stars, without connecting lines.',
  },
  {
    id: 'hexagons',
    category: 'patterns',
    name: 'Hexagonal mesh',
    description: 'A honeycomb of fine architectural lines.',
  },
  {
    id: 'isometric',
    category: 'patterns',
    name: 'Isometric planes',
    description: 'Three angled grids forming a dimensional lattice.',
  },
  {
    id: 'diagonals',
    category: 'patterns',
    name: 'Diagonal flow',
    description: 'Parallel lines moving across the canvas.',
  },
  {
    id: 'crosses',
    category: 'patterns',
    name: 'Registration marks',
    description: 'Small crosses with a precise printmaking feel.',
  },
  {
    id: 'diamonds',
    category: 'patterns',
    name: 'Diamond lattice',
    description: 'A geometric net of angled lines.',
  },
  {
    id: 'waves',
    category: 'patterns',
    name: 'Wave lines',
    description: 'Layered flowing curves with a gentle pulse.',
  },
  {
    id: 'contours',
    category: 'patterns',
    name: 'Contour map',
    description: 'Organic elevation lines across the page.',
  },
  {
    id: 'rings',
    category: 'patterns',
    name: 'Orbit rings',
    description: 'Overlapping circles with a celestial rhythm.',
  },
  {
    id: 'arcs',
    category: 'patterns',
    name: 'Arc study',
    description: 'Quarter-circle tiles that form shifting paths.',
  },
  {
    id: 'circuit',
    category: 'patterns',
    name: 'Circuit traces',
    description: 'Right-angled paths and tiny junctions.',
  },
  {
    id: 'sprinkles',
    category: 'particles',
    name: 'Sprinkles',
    description: 'Scattered dashes with playful, restrained energy.',
  },
  {
    id: 'rain',
    category: 'particles',
    name: 'Signal rain',
    description: 'Vertical streaks sweeping through the background.',
  },
  {
    id: 'fireflies',
    category: 'particles',
    name: 'Fireflies',
    description: 'Soft, glowing points suspended in space.',
  },
  {
    id: 'triangles',
    category: 'patterns',
    name: 'Triangle field',
    description: 'An airy tessellation of triangular outlines.',
  },
  {
    id: 'spotlight',
    category: 'light',
    name: 'Quiet spotlight',
    description:
      'A soft pool of light follows your pointer across an open canvas.',
  },
  {
    id: 'ribbons',
    category: 'flow',
    name: 'Silk currents',
    description: 'Long asymmetric ribbons bend gently toward your pointer.',
  },
  {
    id: 'sculpture',
    category: 'spatial',
    name: 'Orbital sculpture',
    description: 'A single dimensional wire sculpture tilts as you move.',
  },
  {
    id: 'shards',
    category: 'spatial',
    name: 'Floating facets',
    description:
      'Sparse translucent geometric planes shift with pointer parallax.',
  },
  {
    id: 'magnetic',
    category: 'reactive',
    name: 'Magnetic field',
    description:
      'Scattered fine marks turn toward your pointer; clicks send a pulse.',
  },
] as const

export const backgroundColors = [
  {
    id: 'theme',
    category: 'theme',
    name: 'Match universe',
    light: '',
    dark: '',
  },
  {
    id: 'blue',
    category: 'cool',
    name: 'Electric blue',
    light: '#2350f0',
    dark: '#8aa8ff',
  },
  {
    id: 'mint',
    category: 'cool',
    name: 'Mint',
    light: '#047857',
    dark: '#6ee7b7',
  },
  {
    id: 'cyan',
    category: 'cool',
    name: 'Cyan',
    light: '#0e7490',
    dark: '#67e8f9',
  },
  {
    id: 'violet',
    category: 'cool',
    name: 'Violet',
    light: '#6d28d9',
    dark: '#c4b5fd',
  },
  {
    id: 'rose',
    category: 'warm',
    name: 'Rose',
    light: '#be185d',
    dark: '#f9a8d4',
  },
  {
    id: 'amber',
    category: 'warm',
    name: 'Amber',
    light: '#92400e',
    dark: '#fcd34d',
  },
  {
    id: 'rainbow',
    category: 'gradient',
    name: 'Rainbow',
    light: '',
    dark: '',
  },
  {
    id: 'aurora',
    category: 'gradient',
    name: 'Aurora',
    light: '',
    dark: '',
  },
  {
    id: 'sunset',
    category: 'gradient',
    name: 'Sunset',
    light: '',
    dark: '',
  },
] as const

export const backgroundColorCategories = [
  { id: 'theme', name: 'Theme' },
  { id: 'cool', name: 'Cool' },
  { id: 'warm', name: 'Warm' },
  { id: 'gradient', name: 'Gradients' },
] as const

export type BackgroundColor =
  (typeof backgroundColors)[number]['id'] | `#${string}`
export function isBackgroundColor(value: unknown): value is BackgroundColor {
  return (
    typeof value === 'string' &&
    (backgroundColors.some(({ id }) => id === value) ||
      /^#[0-9a-f]{6}$/i.test(value))
  )
}

export interface StyleSettings {
  cursor: (typeof cursorStyles)[number]['id']
  cursorColor: CursorColor
  background: (typeof backgroundStyles)[number]['id']
  density: number
  size: number
  opacity: number
  backgroundColor: BackgroundColor
  motion: 'animated' | 'still'
  interaction: boolean
}

export const densityRange = { min: 0, max: 10 } as const
export const sizeRange = { min: 1, max: 10 } as const
export const opacityRange = { min: 10, max: 100 } as const

export const universeBackgroundDefaults: Record<
  UniverseId,
  Pick<
    StyleSettings,
    'background' | 'density' | 'size' | 'opacity' | 'backgroundColor'
  >
> = {
  neo: {
    background: 'constellation',
    backgroundColor: 'blue',
    density: 10,
    size: 10,
    opacity: 75,
  },
  glass: {
    background: 'constellation',
    backgroundColor: 'violet',
    density: 6,
    size: 6,
    opacity: 50,
  },
  fusion: {
    background: 'shards',
    backgroundColor: 'cyan',
    density: 5,
    size: 6,
    opacity: 50,
  },
  pixel: {
    background: 'dots',
    backgroundColor: 'mint',
    density: 6,
    size: 6,
    opacity: 50,
  },
  vaporwave: {
    background: 'diagonals',
    backgroundColor: 'rose',
    density: 6,
    size: 6,
    opacity: 50,
  },
  blueprint: {
    background: 'hexagons',
    backgroundColor: 'cyan',
    density: 6,
    size: 6,
    opacity: 50,
  },
  botanical: {
    background: 'fireflies',
    backgroundColor: 'mint',
    density: 6,
    size: 6,
    opacity: 50,
  },
  editorial: {
    background: 'rings',
    backgroundColor: 'amber',
    density: 6,
    size: 6,
    opacity: 50,
  },
  orbit: {
    background: 'stars',
    backgroundColor: 'violet',
    density: 6,
    size: 6,
    opacity: 50,
  },
}

export const defaultStyleSettings: StyleSettings = {
  cursor: 'theme',
  cursorColor: 'theme',
  ...universeBackgroundDefaults.neo,
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
      typeof settings.density === 'number' &&
      Number.isInteger(settings.density) &&
      settings.density >= densityRange.min &&
      settings.density <= densityRange.max
        ? settings.density
        : settings.density === 'subtle'
          ? 1
          : settings.density === 'lively'
            ? densityRange.max
            : 3,
    size:
      typeof settings.size === 'number' &&
      Number.isInteger(settings.size) &&
      settings.size >= sizeRange.min &&
      settings.size <= sizeRange.max
        ? settings.size
        : 3,
    opacity:
      typeof settings.opacity === 'number' &&
      Number.isInteger(settings.opacity) &&
      settings.opacity >= opacityRange.min &&
      settings.opacity <= opacityRange.max
        ? settings.opacity
        : opacityRange.max,
    backgroundColor: isBackgroundColor(settings.backgroundColor)
      ? settings.backgroundColor
      : 'theme',
    motion: settings.motion === 'still' ? 'still' : 'animated',
    interaction:
      typeof settings.interaction === 'boolean' ? settings.interaction : true,
  }
}
