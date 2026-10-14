'use client'

import { useState, type CSSProperties } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { CheckCircle2 } from 'lucide-react'
import { AndroidDeviceFrame } from '@/components/projects/android-device-frame'
import {
  androidMadLevels,
  type CollectionLevel,
  type CollectionApp,
} from '@/content/collections/android-mad'

const tones = [
  'var(--tone-blue)',
  'var(--tone-green)',
  'var(--tone-amber)',
  'var(--tone-red)',
  'var(--tone-violet)',
  'var(--tone-blue)',
] as const

/* ------------------------------------------------------------------ */
/*  Architecture Pipeline Stepper (Station Hub)                       */
/* ------------------------------------------------------------------ */

function ArchitectureStepper({
  levels,
  activeLevelNum,
  onSelectLevel,
}: {
  levels: CollectionLevel[]
  activeLevelNum: number
  onSelectLevel: (levelNum: number) => void
}) {
  return (
    <section
      aria-label="Architecture Pipeline"
      className="brutal bg-surface p-5 sm:p-6"
    >
      <div className="border-border mb-4 flex flex-col justify-between gap-2 border-b pb-3 sm:flex-row sm:items-center">
        <div>
          <p className="text-metadata text-muted">LEARNING JOURNEY PIPELINE</p>
          <h2 className="text-h3 text-xl font-bold">
            Six Architectural Milestones
          </h2>
        </div>
        <p className="text-metadata text-muted font-mono text-xs">
          18 INDEPENDENT GRADLE APPS
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        {levels.map((level, i) => {
          const tone = tones[i]
          const isActive = level.number === activeLevelNum

          return (
            <button
              key={level.number}
              type="button"
              onClick={() => onSelectLevel(level.number)}
              style={
                isActive
                  ? ({
                      borderColor: tone,
                      boxShadow: `3px 3px 0 0 ${tone}`,
                      backgroundColor: `color-mix(in srgb, ${tone} 10%, var(--surface))`,
                    } as CSSProperties)
                  : undefined
              }
              className={`group focus-visible:outline-ring flex min-h-[105px] flex-col justify-between border-2 p-3 text-left transition-all duration-150 ${
                isActive
                  ? 'border-2'
                  : 'border-border bg-surface hover:border-ink hover:-translate-y-0.5'
              }`}
            >
              <div>
                <div className="flex items-center justify-between">
                  <span
                    style={{ color: tone } as CSSProperties}
                    className="text-metadata text-xs font-bold"
                  >
                    LEVEL {level.number.toString().padStart(2, '0')}
                  </span>
                  <span
                    style={
                      {
                        borderColor: tone,
                        backgroundColor: isActive ? tone : 'transparent',
                        color: isActive ? '#ffffff' : tone,
                      } as CSSProperties
                    }
                    className="border px-1 py-0.5 font-mono text-[9px] font-bold"
                  >
                    3 APPS
                  </span>
                </div>

                <h3 className="text-foreground mt-2 text-xs leading-tight font-bold group-hover:underline">
                  {level.title}
                </h3>
              </div>

              <p className="text-muted mt-2 truncate font-mono text-[10px]">
                {level.layer}
              </p>
            </button>
          )
        })}
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/*  App Detail Panel (Studio View)                                     */
/* ------------------------------------------------------------------ */

function StudioAppPanel({
  app,
  levelNum,
  tone,
}: {
  app: CollectionApp
  levelNum: number
  tone: string
}) {
  return (
    <motion.div
      key={app.id}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1.3fr)_320px] lg:items-start"
    >
      {/* Left: Engineering Case Study */}
      <article className="brutal bg-surface p-6 sm:p-8">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span
              aria-hidden
              style={{ backgroundColor: tone } as CSSProperties}
              className="h-3.5 w-1"
            />
            <p className="text-metadata text-muted font-bold">
              LEVEL {levelNum.toString().padStart(2, '0')} ·{' '}
              {app.role.toUpperCase()}
            </p>
          </div>

          <span className="text-metadata inline-flex items-center gap-1.5 border border-emerald-500/40 bg-emerald-500/10 px-2.5 py-1 font-bold text-emerald-400">
            <CheckCircle2 className="size-3 text-emerald-400" />
            ADB EMULATOR VERIFIED
          </span>
        </div>

        <h3 className="text-h3 mt-3 text-2xl font-bold sm:text-3xl">
          {app.title}
        </h3>

        {/* MDX Content rendered with standard case-study typography */}
        <div className="text-foreground/90 [&>details]:border-border [&>details>summary]:text-foreground mt-5 space-y-4 leading-relaxed [&>details]:mt-6 [&>details]:border-t [&>details]:pt-4 [&>details>summary]:cursor-pointer [&>details>summary]:font-semibold [&>p]:leading-relaxed">
          <app.Content />
        </div>

        {/* Kotlin Implementation Evidence Files */}
        {app.evidenceFiles && app.evidenceFiles.length > 0 && (
          <div className="border-border mt-8 border-t pt-5">
            <p className="text-metadata text-muted mb-2 font-mono text-[11px]">
              KOTLIN IMPLEMENTATION EVIDENCE
            </p>
            <div className="flex flex-wrap gap-2">
              {app.evidenceFiles.map((file) => (
                <span
                  key={file}
                  className="border-border bg-surface-hover text-foreground flex items-center gap-1.5 border px-2.5 py-1 font-mono text-xs font-semibold"
                >
                  <span
                    aria-hidden
                    style={{ backgroundColor: tone } as CSSProperties}
                    className="size-1.5 shrink-0"
                  />
                  {file}
                </span>
              ))}
            </div>
          </div>
        )}
      </article>

      {/* Right: Realistic Device Frame */}
      <aside className="sticky top-24 flex flex-col items-center">
        <AndroidDeviceFrame
          appName={app.title}
          media={app.media}
          scenarioCaptures={app.scenarioCaptures}
          tone={tone}
        />
      </aside>
    </motion.div>
  )
}

/* ------------------------------------------------------------------ */
/*  Main Component Export                                              */
/* ------------------------------------------------------------------ */

export function AndroidMadCollection() {
  const [activeLevelNum, setActiveLevelNum] = useState<number>(1)
  const [activeAppId, setActiveAppId] = useState<string>('level-1-example')
  const [roleFilter, setRoleFilter] = useState<
    'all' | 'Example' | 'Task 1' | 'Task 2'
  >('all')

  const activeLevel =
    androidMadLevels.find((lvl) => lvl.number === activeLevelNum) ||
    androidMadLevels[0]

  const activeLevelTone = tones[activeLevel.number - 1]

  // Filter apps in current level
  const levelApps =
    roleFilter === 'all'
      ? activeLevel.apps
      : activeLevel.apps.filter((a) => a.role === roleFilter)

  // Current active app in studio
  const currentApp =
    activeLevel.apps.find((a) => a.id === activeAppId) ||
    levelApps[0] ||
    activeLevel.apps[0]

  function handleSelectLevel(num: number) {
    setActiveLevelNum(num)
    const nextLevel = androidMadLevels.find((lvl) => lvl.number === num)
    if (nextLevel && nextLevel.apps.length > 0) {
      const match =
        roleFilter === 'all'
          ? nextLevel.apps[0]
          : nextLevel.apps.find((a) => a.role === roleFilter) ||
            nextLevel.apps[0]
      setActiveAppId(match.id)
    }
  }

  return (
    <div className="mt-12 space-y-10">
      {/* 1. Architecture Pipeline Stepper */}
      <ArchitectureStepper
        levels={androidMadLevels}
        activeLevelNum={activeLevelNum}
        onSelectLevel={handleSelectLevel}
      />

      {/* 2. Interactive Studio Section */}
      <section
        id={`level-${activeLevel.number}`}
        aria-labelledby={`level-${activeLevel.number}-title`}
        className="space-y-6"
      >
        {/* Level Header Banner with Role Filter */}
        <div
          style={
            {
              borderColor: 'var(--ink)',
              borderLeftColor: activeLevelTone,
              borderLeftWidth: '6px',
            } as CSSProperties
          }
          className="brutal bg-surface p-6 sm:p-8"
        >
          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-start">
            <div>
              <p
                style={{ color: activeLevelTone } as CSSProperties}
                className="text-metadata font-bold"
              >
                LEVEL {activeLevel.number.toString().padStart(2, '0')} ·{' '}
                {activeLevel.layer.toUpperCase()}
              </p>
              <h2
                id={`level-${activeLevel.number}-title`}
                className="text-h2 mt-2"
              >
                {activeLevel.title}
              </h2>
              <p className="text-body text-muted mt-2 max-w-2xl">
                {activeLevel.concept}
              </p>
            </div>

            {/* Technologies Tag Row */}
            <div className="flex max-w-sm flex-wrap gap-1.5">
              {activeLevel.keyTech.map((tech) => (
                <span
                  key={tech}
                  className="border-border bg-surface-hover text-muted px-2 py-1 font-mono text-xs font-semibold"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Role Filter Pills */}
          <div className="border-border mt-6 flex flex-wrap items-center gap-2 border-t pt-4">
            <span className="text-metadata text-muted mr-1 font-mono text-xs">
              FILTER ROLE:
            </span>
            {(['all', 'Example', 'Task 1', 'Task 2'] as const).map((role) => (
              <button
                key={role}
                type="button"
                onClick={() => {
                  setRoleFilter(role)
                  if (role !== 'all') {
                    const matchingApp = activeLevel.apps.find(
                      (a) => a.role === role,
                    )
                    if (matchingApp) setActiveAppId(matchingApp.id)
                  }
                }}
                className={`text-metadata border px-2.5 py-1 text-xs font-semibold transition-all ${
                  roleFilter === role
                    ? 'border-ink bg-foreground text-background font-bold'
                    : 'border-border bg-surface-hover text-muted hover:border-ink hover:text-foreground'
                }`}
              >
                {role === 'all' ? 'All Roles' : role}
              </button>
            ))}
          </div>
        </div>

        {/* App Switcher Tabs within Active Level */}
        <nav
          aria-label={`Apps in level ${activeLevel.number}`}
          className="flex gap-2 overflow-x-auto pb-2"
        >
          {activeLevel.apps.map((app) => {
            const isSelected = app.id === currentApp.id
            const isDimmed = roleFilter !== 'all' && app.role !== roleFilter

            return (
              <button
                key={app.id}
                type="button"
                onClick={() => setActiveAppId(app.id)}
                style={
                  isSelected
                    ? ({
                        backgroundColor: activeLevelTone,
                        borderColor: 'var(--ink)',
                        boxShadow: '3px 3px 0 0 var(--shadow)',
                        color: '#ffffff',
                      } as CSSProperties)
                    : undefined
                }
                className={`text-metadata focus-visible:outline-ring flex shrink-0 items-center gap-2 border-2 px-4 py-2.5 font-bold transition-all ${
                  isSelected
                    ? 'font-bold'
                    : isDimmed
                      ? 'border-border/60 bg-surface/50 text-muted/60 hover:border-ink hover:text-foreground'
                      : 'border-border bg-surface text-muted hover:border-ink hover:text-foreground'
                }`}
              >
                <span className="opacity-80">{app.role.toUpperCase()}</span>
                <span className="opacity-50">·</span>
                <span>{app.title}</span>
              </button>
            )
          })}
        </nav>

        {/* Active App Showcase Display */}
        <AnimatePresence mode="wait">
          <StudioAppPanel
            key={currentApp.id}
            app={currentApp}
            levelNum={activeLevel.number}
            tone={activeLevelTone}
          />
        </AnimatePresence>
      </section>
    </div>
  )
}
