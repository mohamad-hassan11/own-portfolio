'use client'

import { Check, Dice5, Layers3, Orbit, RotateCcw, X } from 'lucide-react'
import { useTheme } from 'next-themes'
import { useEffect, useRef, useState, useSyncExternalStore } from 'react'
import { createPortal } from 'react-dom'
import { StyleLabControls } from './style-lab-controls'
import { useStyleSettings } from './use-style-settings'
import {
  applyStyleSettings,
  surpriseCursor,
  surpriseBackground,
} from '@/lib/style-lab'
import {
  styleLabFooter,
  cursorStyles,
  cursorColors,
  backgroundStyles,
  defaultStyleSettings,
  universeBackgroundDefaults,
} from '@/content/style-lab'
import {
  universeCategories,
  universes,
  type UniverseId,
} from '@/content/universes'
import {
  applyUniverse,
  getUniverse,
  subscribeUniverse,
  surpriseCombination,
} from '@/lib/universe'

const serverUniverse = () => 'neo' as const
const labPanels = ['universes', 'background', 'cursor'] as const
type LabPanel = (typeof labPanels)[number]
const mousePointerQuery = '(hover: hover) and (pointer: fine)'

function subscribeMousePointer(callback: () => void) {
  const query = window.matchMedia(mousePointerQuery)
  query.addEventListener('change', callback)
  return () => query.removeEventListener('change', callback)
}

function getMousePointer() {
  return window.matchMedia(mousePointerQuery).matches
}

const getServerMousePointer = () => false

export function Multiverse({ onOpen }: { onOpen: () => void }) {
  const universe = useSyncExternalStore(
    subscribeUniverse,
    getUniverse,
    serverUniverse,
  )
  const { resolvedTheme, setTheme } = useTheme()
  const dialogRef = useRef<HTMLDialogElement>(null)
  const resetDialogRef = useRef<HTMLDialogElement>(null)
  const resetButtonRef = useRef<HTMLButtonElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const [open, setOpen] = useState(false)
  const [notice, setNotice] = useState('')
  const [panel, setPanel] = useState<LabPanel>('universes')
  const settings = useStyleSettings()
  const hasMousePointer = useSyncExternalStore(
    subscribeMousePointer,
    getMousePointer,
    getServerMousePointer,
  )
  const mode = resolvedTheme === 'light' ? 'light' : 'dark'

  const activePanel =
    !hasMousePointer && panel === 'cursor' ? 'background' : panel

  function choosePanel(next: LabPanel) {
    if (next === 'cursor' && !hasMousePointer) return
    setPanel(next)
    setNotice('')
    const catalog = dialogRef.current?.querySelector('.multiverse-catalog')
    if (catalog) catalog.scrollTop = 0
  }

  function close() {
    dialogRef.current?.close()
  }

  function toggle() {
    if (dialogRef.current?.open) close()
    else {
      onOpen()
      dialogRef.current?.showModal()
      dialogRef.current
        ?.querySelector('[data-active="true"].universe-card')
        ?.scrollIntoView({ block: 'nearest', behavior: 'instant' })
      setOpen(true)
    }
  }

  function select(id: UniverseId, nextMode = mode) {
    if (id === universe && nextMode === mode) return
    applyUniverse(id)
    applyStyleSettings({ ...settings, ...universeBackgroundDefaults[id] })
    setTheme(nextMode)
    const selected = universes.find((item) => item.id === id)!
    setNotice(
      `Universe discovered: ${selected.name}. ${selected.description} ${nextMode === 'dark' ? 'Dark' : 'Light'} mode.`,
    )
  }

  function resetCurrentPanel() {
    resetDialogRef.current?.close()
    if (activePanel === 'universes') {
      applyUniverse('neo')
      applyStyleSettings({ ...settings, ...universeBackgroundDefaults.neo })
      setNotice('Theme reset to the default: Neo.')
    } else if (activePanel === 'cursor') {
      applyStyleSettings({
        ...settings,
        cursor: defaultStyleSettings.cursor,
        cursorColor: defaultStyleSettings.cursorColor,
      })
      setNotice('Cursor style and color reset to universe defaults.')
    } else {
      applyStyleSettings({
        ...settings,
        ...universeBackgroundDefaults[universe],
        motion: defaultStyleSettings.motion,
        interaction: defaultStyleSettings.interaction,
      })
      setNotice('Background settings reset to universe defaults.')
    }
  }

  function resetEverything() {
    resetDialogRef.current?.close()
    applyUniverse('neo')
    applyStyleSettings(defaultStyleSettings)
    setNotice('Theme, cursor, and background reset to their defaults.')
  }

  const resetSectionDescription =
    activePanel === 'universes'
      ? 'Return the theme to Neo'
      : activePanel === 'cursor'
        ? 'Restore cursor style and color'
        : 'Restore background and motion settings'

  useEffect(() => {
    if (!notice) return
    const timer = window.setTimeout(() => setNotice(''), 5500)
    return () => window.clearTimeout(timer)
  }, [notice])

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (
        event.defaultPrevented ||
        event.repeat ||
        event.ctrlKey ||
        event.metaKey ||
        event.altKey ||
        event.shiftKey ||
        event.isComposing
      )
        return
      const target = event.target
      if (
        target instanceof HTMLElement &&
        target.closest(
          'input, textarea, select, [contenteditable]:not([contenteditable="false"]), [role="textbox"]',
        )
      )
        return
      // Leave shortcuts to any other active dialog or interactive overlay.
      const activeDialog = document.querySelector('dialog[open]')
      if (activeDialog && activeDialog !== dialogRef.current) return
      const key = event.key.toLowerCase()
      if (key === 't') {
        event.preventDefault()
        toggle()
      } else if (key === 'd') {
        event.preventDefault()
        setTheme(mode === 'dark' ? 'light' : 'dark')
      } else if (dialogRef.current?.open && /^[1-9]$/.test(key)) {
        event.preventDefault()
        const selected = universes[Number(key) - 1]
        if (selected) {
          setPanel('universes')
          select(selected.id)
        }
      }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  })

  // A portal escapes the fixed navbar's backdrop-filter containing block.
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  )

  return (
    <>
      <button
        ref={triggerRef}
        disabled={!mounted}
        type="button"
        onClick={toggle}
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls="multiverse-selector"
        aria-keyshortcuts="t"
        className="brutal-sm bg-surface inline-flex h-10 items-center gap-2 px-3 text-sm font-semibold"
      >
        <Orbit aria-hidden className="size-[18px]" />
        <span>Style Lab</span>
      </button>
      {mounted &&
        createPortal(
          <>
            <dialog
              ref={dialogRef}
              id="multiverse-selector"
              aria-labelledby="multiverse-title"
              aria-describedby="multiverse-description"
              className="multiverse-dialog"
              data-panel={activePanel}
              onClose={() => {
                setOpen(false)
                triggerRef.current?.focus()
              }}
              onClick={(event) => {
                if (event.target === event.currentTarget) {
                  const rect = event.currentTarget.getBoundingClientRect()
                  if (
                    event.clientX < rect.left ||
                    event.clientX > rect.right ||
                    event.clientY < rect.top ||
                    event.clientY > rect.bottom
                  )
                    close()
                }
              }}
            >
              <div className="multiverse-heading flex items-start justify-between gap-4">
                <div>
                  <p className="text-muted font-mono text-xs tracking-widest uppercase">
                    Style Lab
                  </p>
                  <h2
                    id="multiverse-title"
                    className="mt-2 text-2xl font-semibold"
                  >
                    Make this space yours.
                  </h2>
                  <p
                    id="multiverse-description"
                    className="text-muted mt-2 text-sm"
                  >
                    Choose a universe. Mix your cursor. Set the atmosphere.
                  </p>
                </div>
                <div className="flex shrink-0 items-center gap-2">
                  <button
                    ref={resetButtonRef}
                    type="button"
                    onClick={() => resetDialogRef.current?.showModal()}
                    aria-label="Reset options"
                    data-tooltip="Reset options"
                    className="multiverse-control lab-reset app-tooltip grid size-10 place-items-center p-0"
                  >
                    <RotateCcw aria-hidden className="size-4" />
                  </button>
                  <button
                    type="button"
                    onClick={close}
                    aria-label="Close Style Lab"
                    className="multiverse-control grid size-10 place-items-center p-0"
                  >
                    <X aria-hidden className="size-5" />
                  </button>
                </div>
              </div>
              <dialog
                ref={resetDialogRef}
                className="lab-reset-dialog"
                aria-labelledby="lab-reset-title"
                onClose={() => resetButtonRef.current?.focus()}
                onClick={(event) => {
                  if (event.target === event.currentTarget)
                    resetDialogRef.current?.close()
                }}
              >
                <div className="lab-reset-dialog-heading">
                  <div>
                    <h2 id="lab-reset-title">Choose what to reset</h2>
                    <p className="lab-reset-intro">
                      Pick a quick reset. You can customize everything again
                      anytime.
                    </p>
                  </div>
                  <button
                    type="button"
                    aria-label="Close reset options"
                    onClick={() => resetDialogRef.current?.close()}
                  >
                    <X aria-hidden className="size-4" />
                  </button>
                </div>
                <div className="lab-reset-options">
                  <button type="button" onClick={resetCurrentPanel}>
                    <span className="lab-reset-option-icon">
                      <RotateCcw aria-hidden className="size-4" />
                    </span>
                    <span className="lab-reset-option-copy">
                      <span>Reset this section</span>
                      <span>{resetSectionDescription}</span>
                    </span>
                  </button>
                  <button
                    type="button"
                    data-emphasis="true"
                    onClick={resetEverything}
                  >
                    <span className="lab-reset-option-icon">
                      <Layers3 aria-hidden className="size-4" />
                    </span>
                    <span className="lab-reset-option-copy">
                      <span>Reset the whole Style Lab</span>
                      <span>Restore the theme, cursor, and background</span>
                    </span>
                  </button>
                </div>
              </dialog>
              <div
                role="tablist"
                aria-label="Style Lab controls"
                className="lab-tabs"
                onKeyDown={(event) => {
                  const availablePanels: LabPanel[] = hasMousePointer
                    ? [...labPanels]
                    : labPanels.filter((item) => item !== 'cursor')
                  const index = availablePanels.indexOf(activePanel)
                  let next: number
                  if (event.key === 'ArrowRight')
                    next = (index + 1) % availablePanels.length
                  else if (event.key === 'ArrowLeft')
                    next =
                      (index + availablePanels.length - 1) %
                      availablePanels.length
                  else if (event.key === 'Home') next = 0
                  else if (event.key === 'End')
                    next = availablePanels.length - 1
                  else return
                  event.preventDefault()
                  choosePanel(availablePanels[next])
                  dialogRef.current
                    ?.querySelector<HTMLButtonElement>(
                      `#lab-tab-${availablePanels[next]}`,
                    )
                    ?.focus()
                }}
              >
                {labPanels.map((item) => (
                  <button
                    key={item}
                    type="button"
                    role="tab"
                    id={`lab-tab-${item}`}
                    aria-selected={activePanel === item}
                    aria-controls={`lab-panel-${item}`}
                    tabIndex={activePanel === item ? 0 : -1}
                    className="multiverse-control"
                    data-active={activePanel === item}
                    disabled={item === 'cursor' && !hasMousePointer}
                    aria-disabled={item === 'cursor' && !hasMousePointer}
                    hidden={item === 'cursor' && !hasMousePointer}
                    onClick={() => choosePanel(item)}
                  >
                    {item === 'universes'
                      ? 'Universes'
                      : item === 'cursor'
                        ? 'Cursor'
                        : 'Background'}
                  </button>
                ))}
              </div>
              <div className="multiverse-catalog mt-5" data-panel={activePanel}>
                <div
                  role="tabpanel"
                  id="lab-panel-universes"
                  aria-labelledby="lab-tab-universes"
                  hidden={activePanel !== 'universes'}
                  className="universe-overview"
                  tabIndex={0}
                >
                  {universeCategories.map((category) => (
                    <section
                      key={category.id}
                      aria-labelledby={`universe-category-${category.id}`}
                    >
                      <div className="universe-category-heading flex items-center justify-between gap-2">
                        <h3
                          id={`universe-category-${category.id}`}
                          className="text-sm font-semibold"
                        >
                          {category.name}
                        </h3>
                      </div>
                      <div
                        className="universe-options"
                        data-category={category.id}
                      >
                        {universes
                          .filter((item) => item.category === category.id)
                          .map((item) => (
                            <button
                              key={item.id}
                              type="button"
                              aria-pressed={universe === item.id}
                              onClick={() => select(item.id)}
                              aria-label={item.name}
                              data-tooltip={item.description}
                              className="universe-card app-tooltip"
                              data-active={universe === item.id}
                            >
                              <span
                                aria-hidden
                                className={`universe-preview ${mode}`}
                                data-skin={item.id}
                              >
                                <span className="preview-nav">
                                  <i />
                                  <i />
                                  <i />
                                </span>
                                <span className="preview-title">
                                  BUILD
                                  <br />
                                  WITH INTENT.
                                </span>
                                <span className="preview-line" />
                                <span className="preview-panels">
                                  <i />
                                  <i />
                                  <i />
                                </span>
                              </span>
                              <span className="universe-tile-label">
                                <span
                                  className="universe-tile-number"
                                  aria-hidden
                                >
                                  {universes.findIndex(
                                    ({ id }) => id === item.id,
                                  ) + 1}
                                </span>
                                <span>{item.name}</span>
                                {universe === item.id && (
                                  <Check
                                    aria-hidden
                                    className="size-3 shrink-0"
                                  />
                                )}
                              </span>
                            </button>
                          ))}
                      </div>
                    </section>
                  ))}
                </div>
                {(['cursor', 'background'] as const)
                  .filter((item) => item !== 'cursor' || hasMousePointer)
                  .map((item) => (
                    <div
                      key={item}
                      role="tabpanel"
                      id={`lab-panel-${item}`}
                      aria-labelledby={`lab-tab-${item}`}
                      hidden={activePanel !== item}
                      tabIndex={0}
                    >
                      <StyleLabControls panel={item} onChange={setNotice} />
                    </div>
                  ))}
              </div>
              <div className="multiverse-footer">
                <div className="lab-footer-actions">
                  <button
                    type="button"
                    className="lab-surprise"
                    aria-label="Surprise me: shuffle theme, cursor, and background"
                    onClick={() => {
                      const nextUniverse = surpriseCombination(universe, mode)
                      const nextCursor = surpriseCursor(
                        settings,
                        nextUniverse.id,
                      )
                      const nextBackground = surpriseBackground(nextCursor)
                      const universeName = universes.find(
                        ({ id }) => id === nextUniverse.id,
                      )!.name
                      const cursorName = cursorStyles.find(
                        ({ id }) => id === nextCursor.cursor,
                      )!.name
                      const colorName = cursorColors.find(
                        ({ id }) => id === nextCursor.cursorColor,
                      )!.name
                      const backgroundName = backgroundStyles.find(
                        ({ id }) => id === nextBackground.background,
                      )!.name

                      applyUniverse(nextUniverse.id)
                      setTheme(nextUniverse.mode)
                      applyStyleSettings({
                        ...settings,
                        cursor: nextCursor.cursor,
                        cursorColor: nextCursor.cursorColor,
                        background: nextBackground.background,
                        density: nextBackground.density,
                      })
                      setNotice(
                        `Surprise mix: ${universeName}, ${nextUniverse.mode} mode, ${cursorName} cursor in ${colorName}, ${backgroundName} background.`,
                      )
                    }}
                  >
                    <span className="lab-surprise-die">
                      <Dice5 aria-hidden className="size-5" />
                    </span>
                    <span>{styleLabFooter.button}</span>
                    <span aria-hidden className="lab-surprise-spark">
                      ✦
                    </span>
                  </button>
                  <p className="lab-surprise-scope">
                    {styleLabFooter.description}
                  </p>
                </div>
                <div
                  className="lab-shortcuts"
                  role="group"
                  aria-label={styleLabFooter.shortcutsLabel}
                >
                  <span className="lab-shortcuts-heading">
                    {styleLabFooter.shortcutsLabel}
                  </span>
                  <ul>
                    {styleLabFooter.shortcuts.map(({ key, label }) => (
                      <li key={key}>
                        <kbd>
                          {key === 'numbers' ? `1–${universes.length}` : key}
                        </kbd>
                        <span>{label}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <p
                  role="status"
                  aria-live="polite"
                  aria-atomic="true"
                  className="sr-only"
                >
                  {open ? notice : ''}
                </p>
              </div>
            </dialog>
            <div
              role="status"
              aria-live="polite"
              aria-atomic="true"
              className="sr-only"
            >
              {!open ? notice : ''}
            </div>
          </>,
          document.body,
        )}
    </>
  )
}
