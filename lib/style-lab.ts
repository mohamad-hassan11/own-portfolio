import {
  defaultStyleSettings,
  cursorStyles,
  cursorColors,
  backgroundStyles,
  densityRange,
  sizeRange,
  opacityRange,
  validateStyleSettings,
  type StyleSettings,
} from '@/content/style-lab'

export const STYLE_STORAGE_KEY = 'site-style-lab'
const CHANGE_EVENT = 'style-lab-change'
export const defaultStyleSnapshot = JSON.stringify(defaultStyleSettings)

export function getStyleSnapshot() {
  return (
    document.documentElement.getAttribute('data-style-settings') ??
    defaultStyleSnapshot
  )
}
export function getServerStyleSnapshot() {
  return defaultStyleSnapshot
}

function reflect(settings: StyleSettings) {
  const root = document.documentElement
  root.setAttribute('data-style-settings', JSON.stringify(settings))
  root.setAttribute('data-background', settings.background)
}

export function applyStyleSettings(settings: StyleSettings) {
  reflect(settings)
  try {
    localStorage.setItem(STYLE_STORAGE_KEY, JSON.stringify(settings))
  } catch {
    /* Continue for this visit. */
  }
  window.dispatchEvent(new Event(CHANGE_EVENT))
}

export function subscribeStyleSettings(callback: () => void) {
  const storage = (event: StorageEvent) => {
    if (event.key !== STYLE_STORAGE_KEY && event.key !== null) return
    try {
      reflect(validateStyleSettings(JSON.parse(event.newValue ?? 'null')))
    } catch {
      reflect(defaultStyleSettings)
    }
    callback()
  }
  window.addEventListener(CHANGE_EVENT, callback)
  window.addEventListener('storage', storage)
  return () => {
    window.removeEventListener(CHANGE_EVENT, callback)
    window.removeEventListener('storage', storage)
  }
}

export function surpriseCursor(
  settings: StyleSettings,
  universe: string,
  random = Math.random,
): StyleSettings {
  const current = settings.cursor === 'theme' ? universe : settings.cursor
  const shapes = cursorStyles.filter(
    ({ id }) => id !== 'theme' && id !== 'native' && id !== current,
  )
  const colors = cursorColors.filter(
    ({ id }) => id !== 'theme' && id !== settings.cursorColor,
  )
  return {
    ...settings,
    cursor: shapes[Math.floor(random() * shapes.length)]!.id,
    cursorColor: colors[Math.floor(random() * colors.length)]!.id,
  }
}

export function surpriseBackground(
  settings: StyleSettings,
  random = Math.random,
): StyleSettings {
  const choices = backgroundStyles.filter(
    ({ id }) => id !== 'theme' && id !== settings.background,
  )
  return {
    ...settings,
    background: choices[Math.floor(random() * choices.length)]!.id,
    density:
      densityRange.min +
      Math.floor(random() * (densityRange.max - densityRange.min + 1)),
    size:
      sizeRange.min +
      Math.floor(random() * (sizeRange.max - sizeRange.min + 1)),
    opacity:
      opacityRange.min +
      Math.floor(random() * (opacityRange.max - opacityRange.min + 1)),
  }
}
