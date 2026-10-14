'use client'

import { useState } from 'react'
import Image from 'next/image'
import { ImageZoom } from '@/components/mdx/image-zoom'

/* ------------------------------------------------------------------ */
/*  01. Festivals Quick-Jump Navigation Bar                           */
/* ------------------------------------------------------------------ */

interface JumpTarget {
  id: string
  label: string
  station: string
}

const jumpTargets: JumpTarget[] = [
  { id: 'overview', label: 'Overview & Context', station: '01' },
  { id: 'challenges', label: 'Technical Constraints', station: '02' },
  { id: 'architecture', label: 'Architecture Blueprint', station: '03' },
  { id: 'studio', label: 'Domain Studio', station: '04' },
  { id: 'verification', label: 'QA & Diagnostics', station: '05' },
  { id: 'takeaways', label: 'Post-Mortem Takeaways', station: '06' },
]

export function FestivalsQuickJump() {
  return (
    <nav
      aria-label="Festivals Case Study Quick Navigation"
      className="brutal bg-surface my-8 p-3.5 sm:p-4"
    >
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-metadata text-muted mr-1 font-mono text-xs font-bold tracking-wider uppercase">
          CASE STUDY SECTIONS:
        </span>
        {jumpTargets.map((target) => (
          <a
            key={target.id}
            href={`#${target.id}`}
            className="border-border bg-surface-hover/60 hover:border-ink hover:text-foreground inline-flex items-center gap-1.5 border px-2.5 py-1 font-mono text-xs text-neutral-300 transition-colors"
          >
            <span className="font-bold text-neutral-500">{target.station}</span>
            <span>{target.label}</span>
          </a>
        ))}
      </div>
    </nav>
  )
}

/* ------------------------------------------------------------------ */
/*  02. Technical Constraints & Challenges Matrix                     */
/* ------------------------------------------------------------------ */

interface ConstraintItem {
  number: string
  title: string
  tone: string
  challengeText: string
  solutionText: string
  codeSnippet: string
}

const constraints: ConstraintItem[] = [
  {
    number: '01',
    title: 'Single-Activity Declarative UI',
    tone: 'var(--tone-green)',
    challengeText:
      'Legacy Android XML layouts and fragmented Fragment lifecycles create state synchronization bugs, view-binding boilerplate, and high memory overhead.',
    solutionText:
      'Engineered a 100% Jetpack Compose single-activity architecture (MainActivity) strictly following Unidirectional Data Flow (UDF) with typed navigation arguments.',
    codeSnippet:
      'Screens sealed class · NavHostController · WindowCompat insets',
  },
  {
    number: '02',
    title: 'Relational Local-First Persistence',
    tone: 'var(--tone-blue)',
    challengeText:
      'Festivals and performing artists share complex many-to-many relationships that fragile mobile apps typically flatten into unnormalized JSON blobs.',
    solutionText:
      'Implemented Room 2.5 ORM with a dedicated FestivalArtistCrossRef junction entity, custom Type Converters, and @Relation composite model queries.',
    codeSnippet: 'FestivalArtistCrossRef · @Relation Junction queries · SQLite',
  },
  {
    number: '03',
    title: 'Defensive State Enforcement',
    tone: 'var(--tone-amber)',
    challengeText:
      'Prevent duplicate ticket purchases and inconsistent booking records across asynchronous mobile operations and screen rotations.',
    solutionText:
      'Validated booking rules against live database state before opening checkout routes, hoisting error states dynamically into Compose action buttons.',
    codeSnippet: 'Duplicate check guard · Error FAB state · Dispatchers.IO',
  },
  {
    number: '04',
    title: 'Hybrid Cloud & Local Boundary',
    tone: 'var(--tone-violet)',
    challengeText:
      'Outdoor festivals frequently suffer from weak cellular reception; waiting indefinitely for remote servers freezes mobile interfaces.',
    solutionText:
      'Bounded Firebase Firestore credential and RFID cashless wristband queries under 10-second coroutine timeouts, falling back smoothly to cached SQLite data.',
    codeSnippet: 'Firebase Firestore · RFID Wristband Balance · withTimeout',
  },
]

export function FestivalsChallengesGrid() {
  return (
    <section aria-label="Technical Constraints Matrix" className="my-10">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {constraints.map((c) => (
          <div
            key={c.number}
            className="brutal bg-surface flex flex-col justify-between p-5"
            style={{ borderTop: `4px solid ${c.tone}` }}
          >
            <div>
              <div className="flex items-center justify-between">
                <span
                  style={{ color: c.tone }}
                  className="font-mono text-xs font-bold tracking-wider uppercase"
                >
                  CONSTRAINT {c.number}
                </span>
                <span className="border-border text-muted border px-1.5 py-0.5 font-mono text-[10px]">
                  ARCHITECTURAL GOAL
                </span>
              </div>
              <h3 className="text-foreground mt-2 text-base font-bold">
                {c.title}
              </h3>
              <p className="text-muted mt-2 text-xs leading-relaxed">
                <strong className="text-neutral-300">Friction:</strong>{' '}
                {c.challengeText}
              </p>
              <p className="text-muted mt-2 text-xs leading-relaxed">
                <strong className="text-neutral-300">Resolution:</strong>{' '}
                {c.solutionText}
              </p>
            </div>
            <div className="mt-4 border-t border-neutral-800 pt-3">
              <code className="text-muted font-mono text-[11px]">
                {c.codeSnippet}
              </code>
            </div>
          </div>
        ))}
      </div>

      {/* Solo Role Contribution Matrix */}
      <div className="brutal bg-surface mt-6 p-5">
        <div className="border-border mb-3 border-b pb-3">
          <span className="text-metadata text-muted font-mono text-xs font-bold">
            SOLO ENGINEERING SCOPE & OWNERSHIP
          </span>
          <h4 className="text-foreground mt-1 text-sm font-bold">
            End-to-End Specialisation Deliverables
          </h4>
        </div>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <div className="border-border/70 bg-surface-hover/50 border p-3">
            <span className="font-mono text-xs font-bold text-(color:--tone-green)">
              01 · ARCHITECTURE
            </span>
            <p className="text-muted mt-1 text-xs">
              MVVM ViewModels, Kotlin Coroutines, and LiveData state streams.
            </p>
          </div>
          <div className="border-border/70 bg-surface-hover/50 border p-3">
            <span className="font-mono text-xs font-bold text-(color:--tone-blue)">
              02 · PRESENTATION
            </span>
            <p className="text-muted mt-1 text-xs">
              Jetpack Compose UI, Material 3 theming, carousels, and insets.
            </p>
          </div>
          <div className="border-border/70 bg-surface-hover/50 border p-3">
            <span className="font-mono text-xs font-bold text-(color:--tone-amber)">
              03 · PERSISTENCE
            </span>
            <p className="text-muted mt-1 text-xs">
              Room 2.5 ORM schema, M:N junction tables, DAOs, and Converters.
            </p>
          </div>
          <div className="border-border/70 bg-surface-hover/50 border p-3">
            <span className="font-mono text-xs font-bold text-(color:--tone-violet)">
              04 · CLOUD & TOOLS
            </span>
            <p className="text-muted mt-1 text-xs">
              Firestore user documents, cashless balance sync, and DB seeding.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/*  03. Interactive Architecture Blueprint Hub                        */
/* ------------------------------------------------------------------ */

export function FestivalsArchitectureHub() {
  const [activeTab, setActiveTab] = useState<'topology' | 'schema'>('topology')

  return (
    <section
      aria-label="Application Architecture Blueprint"
      className="my-10 w-full"
    >
      <div className="brutal bg-surface p-5 sm:p-6">
        {/* Hub Header */}
        <div className="border-border mb-5 flex flex-col justify-between gap-3 border-b pb-4 sm:flex-row sm:items-center">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-metadata font-mono font-bold text-(color:--tone-green)">
                ARCHITECTURE BLUEPRINT
              </span>
              <span className="text-metadata text-muted font-mono text-xs">
                · SYSTEM SPECIFICATION
              </span>
            </div>
            <h3 className="text-h3 mt-1 text-xl font-bold tracking-tight sm:text-2xl">
              MVVM Pattern & Room Relational Topology
            </h3>
          </div>
          <span className="pattern-dots border-ink/40 text-metadata text-muted border px-2.5 py-1 font-mono text-xs">
            SOURCE CODE RECONSTRUCTION
          </span>
        </div>

        {/* Diagram Switcher Tabs */}
        <div className="border-border flex gap-2 border-b">
          <button
            type="button"
            onClick={() => setActiveTab('topology')}
            className={`border-b-2 px-4 py-2 font-mono text-xs font-bold transition-all ${
              activeTab === 'topology'
                ? 'border-accent-text text-foreground bg-surface-hover/40 -mb-[2px]'
                : 'text-muted hover:text-foreground border-transparent'
            }`}
          >
            FIG 01 · MVVM SYSTEM ARCHITECTURE
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('schema')}
            className={`border-b-2 px-4 py-2 font-mono text-xs font-bold transition-all ${
              activeTab === 'schema'
                ? 'border-accent-text text-foreground bg-surface-hover/40 -mb-[2px]'
                : 'text-muted hover:text-foreground border-transparent'
            }`}
          >
            FIG 02 · ROOM SQLite RELATIONAL SCHEMA (M:N)
          </button>
        </div>

        {/* Diagram Viewport & Lightbox Action */}
        <div className="border-border relative my-5 overflow-hidden border bg-neutral-950 p-4 sm:p-6">
          <div className="mb-2 flex justify-end">
            <ImageZoom
              src={
                activeTab === 'topology'
                  ? '/projects/festivals/architecture.svg'
                  : '/projects/festivals/database-schema.svg'
              }
              alt={
                activeTab === 'topology'
                  ? 'Native Android Architecture Diagram'
                  : 'Room SQLite Relational Schema Diagram'
              }
              width={1600}
              height={900}
              unoptimized
            />
          </div>

          <div className="relative aspect-[16/9] w-full overflow-hidden">
            <Image
              src={
                activeTab === 'topology'
                  ? '/projects/festivals/architecture.svg'
                  : '/projects/festivals/database-schema.svg'
              }
              alt={
                activeTab === 'topology'
                  ? 'Native Android Architecture Diagram'
                  : 'Room SQLite Relational Schema Diagram'
              }
              fill
              unoptimized
              className="object-contain"
            />
          </div>

          <p className="text-metadata text-muted mt-4 text-center font-mono text-xs">
            {activeTab === 'topology'
              ? 'Composable screens observe ViewModel LiveData streams via observeAsState(), delegating database operations through Coroutines to Room DAOs and remote requests to Firebase Firestore.'
              : 'Relational schema and cloud data model. Multi-table relations in Room use junction entities (FestivalArtistCrossRef) for many-to-many artist lineups and composite keys for favorites and user reservations.'}
          </p>
        </div>

        {/* 3 Architectural Layers Deep-Dive */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="border-border/80 bg-surface-hover/40 border p-4">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-bold text-(color:--tone-green)">
                LAYER 01
              </span>
              <span className="text-muted font-mono text-[10px]">
                PRESENTATION
              </span>
            </div>
            <h4 className="text-foreground mt-1.5 text-sm font-bold">
              Compose & Navigation
            </h4>
            <p className="text-muted mt-2 text-xs leading-relaxed">
              Single-Activity (`MainActivity`) mounting declarative composables.
              NavHostController passes typed route parameters
              (`discover/[id]/[count]`). Dynamic status bar tinting
              synchronously inverts contrast for dark/light themes.
            </p>
          </div>

          <div className="border-border/80 bg-surface-hover/40 border p-4">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-bold text-(color:--tone-blue)">
                LAYER 02
              </span>
              <span className="text-muted font-mono text-[10px]">
                CONCURRENCY
              </span>
            </div>
            <h4 className="text-foreground mt-1.5 text-sm font-bold">
              ViewModels & Coroutines
            </h4>
            <p className="text-muted mt-2 text-xs leading-relaxed">
              Dedicated AndroidViewModels encapsulate business rules. Disk I/O
              executes off the UI thread via `Dispatchers.IO`, while remote
              Firestore requests are wrapped in structured timeouts
              (`withTimeout(10_000L)`).
            </p>
          </div>

          <div className="border-border/80 bg-surface-hover/40 border p-4">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-bold text-(color:--tone-violet)">
                LAYER 03
              </span>
              <span className="text-muted font-mono text-[10px]">
                PERSISTENCE
              </span>
            </div>
            <h4 className="text-foreground mt-1.5 text-sm font-bold">
              Room 2.5 ORM & Junctions
            </h4>
            <p className="text-muted mt-2 text-xs leading-relaxed">
              Relational SQLite schema with `FestivalArtistCrossRef` junction
              entity with composite keys `(festivalId, artistId)` and
              `@Relation` queries. Converters serialize Date timestamps and
              BigDecimal prices cleanly.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/*  04. Quality Assurance & Diagnostics Grid                          */
/* ------------------------------------------------------------------ */

export function FestivalsVerificationGrid() {
  return (
    <section aria-label="Testing & Verification Grid" className="my-10">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="brutal bg-surface p-5">
          <span className="text-metadata font-mono font-bold text-(color:--tone-green)">
            PILLAR 01 · UNIT TESTING
          </span>
          <h4 className="text-foreground mt-1 text-sm font-bold">
            JUnit 4 Test Suite
          </h4>
          <p className="text-muted mt-2 text-xs leading-relaxed">
            Local unit tests verifying ViewModel transformation logic, Room Type
            Converters serialization (Date to Long timestamp, BigDecimal to
            String), and domain validations.
          </p>
          <div className="mt-4 border-t border-neutral-800 pt-2 font-mono text-[10px] text-neutral-400">
            junit:4.13.2 · Mockito
          </div>
        </div>

        <div className="brutal bg-surface p-5">
          <span className="text-metadata font-mono font-bold text-(color:--tone-blue)">
            PILLAR 02 · UI & INSTRUMENTATION
          </span>
          <h4 className="text-foreground mt-1 text-sm font-bold">
            Compose UI & Espresso
          </h4>
          <p className="text-muted mt-2 text-xs leading-relaxed">
            AndroidX Test JUnit and Compose UI testing (`ui-test-junit4`)
            validating Composable node semantics, quantity selector modals, and
            deletion dialog transitions.
          </p>
          <div className="mt-4 border-t border-neutral-800 pt-2 font-mono text-[10px] text-neutral-400">
            espresso-core:3.5.1 · compose.ui.test
          </div>
        </div>

        <div className="brutal bg-surface p-5">
          <span className="text-metadata font-mono font-bold text-(color:--tone-amber)">
            PILLAR 03 · RUNTIME VERIFICATION
          </span>
          <h4 className="text-foreground mt-1 text-sm font-bold">
            Active AVD via ADB
          </h4>
          <p className="text-muted mt-2 text-xs leading-relaxed">
            Compiled and verified on an active Android Virtual Device
            (`Medium_Phone_API_37.0`) via ADB. All 14 authentic UI captures
            across light/dark modes, checkout, and balances were verified
            directly from runtime.
          </p>
          <div className="mt-4 border-t border-neutral-800 pt-2 font-mono text-[10px] text-neutral-400">
            API 37 (Android 14) · 1080×2400
          </div>
        </div>
      </div>

      {/* Diagnostics & Mock Seeding Callout */}
      <div className="brutal bg-surface mt-6 border-l-4 border-l-(color:--tone-green) p-5">
        <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
          <div>
            <span className="text-metadata font-mono text-xs font-bold text-(color:--tone-green)">
              DIAGNOSTIC CONTROLS IN SETTINGS
            </span>
            <h4 className="text-foreground mt-1 text-sm font-bold">
              One-Tap Relational SQLite Mock Seeding
            </h4>
            <p className="text-muted mt-1.5 max-w-2xl text-xs leading-relaxed">
              To facilitate runtime demonstrations and examiner evaluations, the
              settings module incorporates debug controls that execute atomic
              Room transactions inserting curated mock artists, festivals,
              cross-references, and reservation histories directly into SQLite.
            </p>
          </div>
          <div className="pattern-dots border-ink/40 text-metadata text-muted self-start border px-3 py-1.5 font-mono text-xs">
            SettingsViewModel.kt
          </div>
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/*  05. Architectural Post-Mortem & Takeaways                         */
/* ------------------------------------------------------------------ */

interface TakeawayItem {
  number: string
  title: string
  tone: string
  lesson: string
}

const takeaways: TakeawayItem[] = [
  {
    number: '01',
    title: 'Unidirectional Data Flow in Compose',
    tone: 'var(--tone-green)',
    lesson:
      'Ensuring that state flows strictly down and events flow up prevents desynchronization between Room SQLite writes, ViewModel streams, and Composable re-renders.',
  },
  {
    number: '02',
    title: 'Room Relational Junction Complexity',
    tone: 'var(--tone-blue)',
    lesson:
      'Implementing many-to-many relationships with @Relation and @Junction requires careful query boundaries, proving significantly cleaner than manual SQLite joins or fragmented foreign key lookups.',
  },
  {
    number: '03',
    title: 'Resilient Coroutine Network Timeouts',
    tone: 'var(--tone-amber)',
    lesson:
      'Utilizing withTimeout(10_000L) and structured coroutine exception handling when querying remote cloud services like Firestore protects the user experience against hung network sockets in festival grounds.',
  },
  {
    number: '04',
    title: 'Local-First Mobile Architecture',
    tone: 'var(--tone-violet)',
    lesson:
      'Caching festival lineups and itineraries locally while synchronizing user credentials and reservations provides instant app launch times and 100% offline flight mode usability.',
  },
]

export function FestivalsTakeaways() {
  return (
    <section
      aria-label="Architectural Post-Mortem & Lessons Learned"
      className="my-10"
    >
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {takeaways.map((t) => (
          <div
            key={t.number}
            className="brutal bg-surface flex flex-col justify-between p-5"
            style={{ borderLeft: `4px solid ${t.tone}` }}
          >
            <div>
              <div className="flex items-center justify-between">
                <span
                  style={{ color: t.tone }}
                  className="font-mono text-xs font-bold tracking-wider uppercase"
                >
                  LESSON {t.number}
                </span>
                <span className="text-muted font-mono text-[10px]">
                  CORE TAKEAWAY
                </span>
              </div>
              <h3 className="text-foreground mt-2 text-sm font-bold">
                {t.title}
              </h3>
              <p className="text-muted mt-2 text-xs leading-relaxed">
                {t.lesson}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
