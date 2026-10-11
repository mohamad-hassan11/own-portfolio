'use client'

import { Check, Dice5, Layers3, Moon, Orbit, RotateCcw, Sun, X } from 'lucide-react'
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
  cursorStyles,
  cursorColors,
  backgroundStyles,
  defaultStyleSettings,
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
const labPanels = ['universes', 'cursor', 'background'] as const
type LabPanel = (typeof labPanels)[number]

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
  const mode = resolvedTheme === 'light' ? 'light' : 'dark'

  function choosePanel(next: LabPanel) {
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
    setTheme(nextMode)
    const selected = universes.find((item) => item.id === id)!
    setNotice(
      `Universe discovered: ${selected.name}. ${selected.description} ${nextMode === 'dark' ? 'Dark' : 'Light'} mode.`,
    )
  }

  function resetCurrentPanel() {
    resetDialogRef.current?.close()
    if (panel === 'universes') {
      applyUniverse('neo')
      setNotice('Theme reset to the default: Neo.')
    } else if (panel === 'cursor') {
      applyStyleSettings({
        ...settings,
        cursor: defaultStyleSettings.cursor,
        cursorColor: defaultStyleSettings.cursorColor,
      })
      setNotice('Cursor style and color reset to universe defaults.')
    } else {
      applyStyleSettings({
        ...settings,
        background: defaultStyleSettings.background,
        density: defaultStyleSettings.density,
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
    panel === 'universes'
      ? 'Return the theme to Neo'
      : panel === 'cursor'
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
              data-panel={panel}
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
                      Pick a quick reset. You can customize everything again anytime.
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
                  const index = labPanels.indexOf(panel)
                  let next: number
                  if (event.key === 'ArrowRight')
                    next = (index + 1) % labPanels.length
                  else if (event.key === 'ArrowLeft')
                    next = (index + labPanels.length - 1) % labPanels.length
                  else if (event.key === 'Home') next = 0
                  else if (event.key === 'End') next = labPanels.length - 1
                  else return
                  event.preventDefault()
                  choosePanel(labPanels[next])
                  dialogRef.current
                    ?.querySelector<HTMLButtonElement>(
                      `#lab-tab-${labPanels[next]}`,
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
                    aria-selected={panel === item}
                    aria-controls={`lab-panel-${item}`}
                    tabIndex={panel === item ? 0 : -1}
                    className="multiverse-control"
                    data-active={panel === item}
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
              <div className="multiverse-catalog mt-5" data-panel={panel}>
                <div
                  role="tabpanel"
                  id="lab-panel-universes"
                  aria-labelledby="lab-tab-universes"
                  hidden={panel !== 'universes'}
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
                {(['cursor', 'background'] as const).map((item) => (
                  <div
                    key={item}
                    role="tabpanel"
                    id={`lab-panel-${item}`}
                    aria-labelledby={`lab-tab-${item}`}
                    hidden={panel !== item}
                    tabIndex={0}
                  >
                    <StyleLabControls panel={item} onChange={setNotice} />
                  </div>
                ))}
              </div>
              <div className="multiverse-footer">
                <div className="border-border mt-5 flex flex-wrap items-center justify-between gap-3 border-t pt-4">
                  <div
                    role="group"
                    aria-label="Color mode"
                    className="flex gap-1"
                  >
                    {(['light', 'dark'] as const).map((value) => {
                      const Icon = value === 'light' ? Sun : Moon
                      return (
                        <button
                          key={value}
                          type="button"
                          aria-pressed={mode === value}
                          onClick={() => setTheme(value)}
                          className="multiverse-control"
                          data-active={mode === value}
                        >
                          <Icon aria-hidden className="size-4" />
                          {value === 'light' ? 'Light' : 'Dark'}
                        </button>
                      )
                    })}
                  </div>
                  <button
                    type="button"
                    className="multiverse-control lab-surprise app-tooltip"
                    aria-label="Surprise me: shuffle theme, cursor, and background"
                    data-tooltip="Shuffle the theme, cursor, and background."
                    data-tooltip-position="top"
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
                        `Surprise mix: ${universeName}, ${nextUniverse.mode} mode, ${cursorName} cursor in ${colorName}, ${backgroundName} background${nextBackground.background === 'stars' || nextBackground.background === 'constellation' ? ` at ${nextBackground.density} density` : ''}.`,
                      )
                    }}
                  >
                    <Dice5 aria-hidden className="size-5" />
                    <span>Surprise Me</span>
                  </button>
                </div>
                <p className="text-muted mt-4 text-xs leading-relaxed">
                  <kbd>T</kbd> open / close · <kbd>D</kbd> light / dark ·{' '}
                  <kbd>1–{universes.length}</kbd> universe · <kbd>Esc</kbd>{' '}
                  close
                </p>
                <p
                  role="status"
                  aria-live="polite"
                  aria-atomic="true"
                  className="text-muted mt-3 text-xs leading-relaxed"
                >
                  {open ? notice : ''}
                </p>
              </div>
            </dialog>
            <div
              role="status"
              aria-live="polite"
              aria-atomic="true"
              className="multiverse-notice"
              data-visible={Boolean(notice) && !open}
            >
              {!open ? notice : ''}
            </div>
          </>,
          document.body,
        )}
    </>
  )
}
