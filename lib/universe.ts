import { isUniverse, universes, type UniverseId } from '@/content/universes'

export const UNIVERSE_STORAGE_KEY = 'site-skin'
const CHANGE_EVENT = 'universe-change'

export function getUniverse(): UniverseId {
  const value = document.documentElement.getAttribute('data-skin')
  return isUniverse(value) ? value : 'neo'
}

export function applyUniverse(id: UniverseId) {
  document.documentElement.setAttribute('data-skin', id)
  try {
    localStorage.setItem(UNIVERSE_STORAGE_KEY, id)
  } catch {
    /* Session-only when storage is unavailable. */
  }
  window.dispatchEvent(new Event(CHANGE_EVENT))
}

export function subscribeUniverse(callback: () => void) {
  const onStorage = (event: StorageEvent) => {
    if (event.key !== UNIVERSE_STORAGE_KEY && event.key !== null) return
    const id = isUniverse(event.newValue) ? event.newValue : 'neo'
    document.documentElement.setAttribute('data-skin', id)
    callback()
  }
  window.addEventListener(CHANGE_EVENT, callback)
  window.addEventListener('storage', onStorage)
  return () => {
    window.removeEventListener(CHANGE_EVENT, callback)
    window.removeEventListener('storage', onStorage)
  }
}

export function surpriseCombination(
  current: UniverseId,
  mode: string,
  random = Math.random,
) {
  const options = universes
    .flatMap(({ id }) =>
      (['light', 'dark'] as const).map((mode) => ({ id, mode })),
    )
    .filter((option) => option.id !== current || option.mode !== mode)
  return options[Math.floor(random() * options.length)]!
}
