'use client'

import { useState, type CSSProperties } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'motion/react'
import { ImageZoom } from '@/components/mdx/image-zoom'

interface StudioScreen {
  src: string
  label: string
  caption: string
  alt: string
}

interface StudioStation {
  id: string
  number: string
  title: string
  shortTitle: string
  badge: string
  subBadge: string
  tone: string
  dossierSummary: string
  keyPoints: Array<{ label: string; text: string }>
  codeSnippet: string
  codeCaption: string
  screens: StudioScreen[]
}

const stations: StudioStation[] = [
  {
    id: 'discovery',
    number: '01',
    title: 'Event Discovery & Dual-Theme Jetpack Compose Engine',
    shortTitle: 'Discovery & Theming',
    badge: 'PRESENTATION & COMPOSE',
    subBadge: 'Material 3 · Insets · Coil',
    tone: 'var(--tone-green)',
    dossierSummary:
      'The primary discovery interface partitions the event catalog into categorized collections. The presentation layer eliminates legacy XML layouts and fragments in favor of a single ComponentActivity mounting declarative Jetpack Compose composables with dynamic system bar adaptation.',
    keyPoints: [
      {
        label: 'Dynamic Category Chunking',
        text: 'FestivalViewModel streams LiveData<List<FestivalWithArtists>> to Compose, grouping entries into topical horizontal carousels with smooth snapping and memory-efficient LazyRow recycling.',
      },
      {
        label: 'Material 3 Dynamic Theming',
        text: 'A stateful theme toggle shifts the UI between an emerald green primary palette (#006d40) and low-light dark surfaces. WindowCompat and SideEffect synchronously tint the Android status bar and invert icon contrast.',
      },
      {
        label: 'Session Isolation',
        text: 'BottomNavigationBar conditionally unmounts on the authentication screen, guaranteeing that unauthenticated attendees cannot traverse inner application routes.',
      },
    ],
    codeSnippet: `// Dynamic system status bar tinting in FestivalsTheme.kt
val view = LocalView.current
if (!view.isInEditMode) {
    SideEffect {
        val window = (view.context as Activity).window
        window.statusBarColor = colorScheme.primary.toArgb()
        WindowCompat.getInsetsController(window, view)
            .isAppearanceLightStatusBars = !darkTheme
    }
}`,
    codeCaption:
      'FestivalsTheme.kt · Synchronous Android status bar tinting via WindowCompat',
    screens: [
      {
        src: '/projects/festivals/screen_discover_light.webp',
        label: 'Discover (Light)',
        caption:
          'Event discover feed in Light mode with emerald green primary header (#006d40) and Coil image carousels.',
        alt: 'Discover feed in Light mode',
      },
      {
        src: '/projects/festivals/screen_discover_dark.webp',
        label: 'Discover (Dark)',
        caption:
          'Discover feed in Dark mode with subdued dark surfaces preserving poster artwork contrast.',
        alt: 'Discover feed in Dark mode',
      },
      {
        src: '/projects/festivals/screen_auth_login.webp',
        label: 'Cloud Login',
        caption:
          'Authentication screen with email/password input, masked transformation, and Firebase Firestore verification.',
        alt: 'Festivals authentication screen',
      },
    ],
  },
  {
    id: 'lineups',
    number: '02',
    title: 'Artist Lineups & Many-to-Many Relational Persistence',
    shortTitle: 'Lineups & Room M:N',
    badge: 'ROOM ORM · SQLITE PERSISTENCE',
    subBadge: 'M:N Junction · Type Converters',
    tone: 'var(--tone-blue)',
    dossierSummary:
      'Selecting any festival navigates to the detail view via typed route arguments. Rather than denormalizing lineup data into flat JSON blobs, Room 2.5 models many-to-many associations through junction entities and custom type converters.',
    keyPoints: [
      {
        label: 'Many-to-Many Lineup Join',
        text: 'Festivals and performing artists share an M:N relationship encapsulated by FestivalArtistCrossRef with composite primary key (festivalId, artistId). Room produces FestivalWithArtists models with zero manual SQL join boilerplate.',
      },
      {
        label: 'Type Converters Architecture',
        text: 'A custom Converters class serializes epoch timestamps to Java Date instances, BigDecimal ticket prices to persistent strings, and maps status enums for SQLite compatibility.',
      },
      {
        label: 'Coil Asynchronous Image Caching',
        text: 'Artist avatars and stage artwork are fetched with rememberAsyncImagePainter, utilizing dual memory and disk caching layers for instant offline redisplay.',
      },
    ],
    codeSnippet: `@Entity(
    tableName = "festival_artist_cross_ref",
    primaryKeys = ["festivalId", "artistId"]
)
data class FestivalArtistCrossRef(
    val festivalId: Long,
    val artistId: Long
)

data class FestivalWithArtists(
    @Embedded val festival: Festival,
    @Relation(
        parentColumn = "id",
        entityColumn = "id",
        associateBy = Junction(FestivalArtistCrossRef::class)
    )
    val artists: List<Artist>
)`,
    codeCaption:
      'Room 2.5 Junction schema · Automatic composite queries via @Relation and @Junction',
    screens: [
      {
        src: '/projects/festivals/screen_detail_light.webp',
        label: 'Lineup (Light)',
        caption:
          'Festival detail screen displaying location, date, price, and artist lineup avatars queried via Room M:N cross-reference.',
        alt: 'Festival detail screen in Light mode',
      },
      {
        src: '/projects/festivals/screen_detail_dark.webp',
        label: 'Lineup (Dark)',
        caption:
          'Detail view in Dark mode showing booking action button and stage information.',
        alt: 'Festival detail screen in Dark mode',
      },
    ],
  },
  {
    id: 'booking',
    number: '03',
    title: 'Defensive Ticket Booking & Asynchronous Checkout Flow',
    shortTitle: 'Defensive Checkout',
    badge: 'DEFENSIVE STATE ENFORCEMENT',
    subBadge: 'UDF · Coroutines IO · iDEAL',
    tone: 'var(--tone-amber)',
    dossierSummary:
      'The booking engine enforces strict business validation before ticket creation. It coordinates ViewModel domain state with Room transactions executing off the Android UI thread via Kotlin Coroutines.',
    keyPoints: [
      {
        label: 'Duplicate Pass Prevention',
        text: 'Before opening checkout, the Floating Action Button verifies reservationsList to check if the attendee already holds a non-historical pass for this event. If so, it dynamically renders an error container with an alert icon and warning Toast.',
      },
      {
        label: 'Dynamic Order Totals & Modals',
        text: 'A ticket quantity selector calculates dynamic price summaries before navigating to checkout with typed route arguments (discover/{id}/{count}).',
      },
      {
        label: 'Dutch Bank Selection (iDEAL)',
        text: 'The checkout form captures attendee contact information and bank selection (ABN AMRO, ING, Rabobank) before dispatching asynchronous database insertions via Dispatchers.IO.',
      },
    ],
    codeSnippet: `// Floating Action Button duplicate check in FestivalDetailScreen
val hasActivePass = reservations.any { 
    it.userId == currentUser.id && 
    it.festivalId == festival.id && 
    it.category != ReservationCategory.HISTORY 
}

FloatingActionButton(
    containerColor = if (hasActivePass) 
        MaterialTheme.colorScheme.errorContainer 
    else 
        MaterialTheme.colorScheme.primary,
    onClick = {
        if (hasActivePass) {
            showToast("You already hold an active pass for this festival!")
        } else {
            showQuantityDialog = true
        }
    }
)`,
    codeCaption:
      'FestivalDetailScreen.kt · Defensive state check preventing duplicate ticket issuance',
    screens: [
      {
        src: '/projects/festivals/screen_reservation_form.webp',
        label: 'Checkout Form',
        caption:
          'Reservation checkout form capturing attendee credentials, phone number, and Dutch bank dropdown.',
        alt: 'Reservation checkout form',
      },
      {
        src: '/projects/festivals/screen_reservations_history.webp',
        label: 'History Filter',
        caption:
          'Reservations history screen filtering between current bookings and past festival passes.',
        alt: 'Reservation history screen',
      },
      {
        src: '/projects/festivals/screen_reservations.webp',
        label: 'Reservations Feed',
        caption:
          'Active reservations list streaming live updates from Room SQLite.',
        alt: 'Active reservations list screen',
      },
    ],
  },
  {
    id: 'cashless',
    number: '04',
    title: 'Active Pass Hub & Cloud Cashless RFID Synchronization',
    shortTitle: 'Pass Hub & Cashless',
    badge: 'HYBRID LOCAL / CLOUD BOUNDARY',
    subBadge: 'Firestore · RFID Balance · Passes',
    tone: 'var(--tone-violet)',
    dossierSummary:
      'The confirmed reservation screen serves as the attendee mobile hub during the festival, merging local SQLite relational records with live remote Firestore data.',
    keyPoints: [
      {
        label: 'Composite Reservation Model',
        text: 'ReservationAndFestival composite entities bind local booking metadata directly with festival title, banner, and scheduling data.',
      },
      {
        label: 'Cloud RFID Wristband Credit',
        text: 'Attendees inspect their cashless wristband balance ($200.25 live) queried from Firestore under a 10-second coroutine timeout.',
      },
      {
        label: 'Gate Barcode & Digital Pass',
        text: 'Quick-action buttons transition to the digital ticket barcode screen (res/{id}/ticket) for optical scanning at event security checkpoints.',
      },
    ],
    codeSnippet: `// Live cashless balance retrieval with structured coroutine timeout
fun fetchCashlessBalance(userId: String) {
    viewModelScope.launch {
        try {
            withTimeout(10_000L) {
                val doc = firestore.collection("users").document(userId).get().await()
                val balance = doc.getDouble("cashlessBalance") ?: 0.0
                _cashlessState.value = CashlessState.Success(balance)
            }
        } catch (e: TimeoutCancellationException) {
            _cashlessState.value = CashlessState.Error("Network timed out")
        }
    }
}`,
    codeCaption:
      'AuthViewModel.kt · Structured Coroutine fetching cloud wristband balance with timeout guard',
    screens: [
      {
        src: '/projects/festivals/screen_reservation_card.webp',
        label: 'Active Pass Hub',
        caption:
          'Confirmed reservation pass hub with status indicator, ticket barcode link, and cashless credit triggers.',
        alt: 'Active festival pass hub screen',
      },
      {
        src: '/projects/festivals/screen_reservation_ticket.webp',
        label: 'Digital Barcode',
        caption:
          'Full-screen digital ticket pass with high-contrast barcode for gate turnstile scanning.',
        alt: 'Digital ticket barcode screen',
      },
      {
        src: '/projects/festivals/screen_reservation_balance.webp',
        label: 'Cashless Credit',
        caption:
          'Cashless wristband balance overview querying live Firestore user documents ($200.25).',
        alt: 'Cashless wristband balance screen',
      },
    ],
  },
  {
    id: 'offline',
    number: '05',
    title: 'Local-First Checklists & Engineering Diagnostics',
    shortTitle: 'Checklists & Seeding',
    badge: 'LOCAL-FIRST & DIAGNOSTICS',
    subBadge: 'Composite Keys · LiveData · Seeding',
    tone: 'var(--tone-red)',
    dossierSummary:
      'Engineered for festival fields with zero mobile connectivity. All personal packing notes and bookmarked favorites remain locally queryable, supported by diagnostic database seeding tools.',
    keyPoints: [
      {
        label: 'Reactive Packing Checklists',
        text: 'NoteViewModel streams LiveData<List<NoteAndFestival>> observed via observeAsState(). Database mutations trigger automatic recompositions with confirmation dialogs on deletion.',
      },
      {
        label: 'Composite Key Bookmarking',
        text: 'The Favorite_per_user entity uses composite primary key (userId, festivalId), ensuring zero duplicate bookmarks at the schema level without index collisions.',
      },
      {
        label: 'Diagnostic Database Seeding',
        text: 'The settings screen provides one-tap SQLite mock seeding to populate sample festivals, artists, and bookings, facilitating rapid runtime demonstration.',
      },
    ],
    codeSnippet: `// Diagnostic SQLite mock database seeding
fun seedDemoDatabase() {
    viewModelScope.launch(Dispatchers.IO) {
        database.runInTransaction {
            festivalDao.insertAll(mockFestivals)
            artistDao.insertAll(mockArtists)
            crossRefDao.insertAll(mockLineupCrossRefs)
        }
        _seedStatus.postValue(SeedResult.SUCCESS)
    }
}`,
    codeCaption:
      'SettingsViewModel.kt · Atomic Room transaction seeding relational demo data',
    screens: [
      {
        src: '/projects/festivals/screen_favorites.webp',
        label: 'Favorites Grid',
        caption:
          'Bookmarked festival favorites screen with offline cached lineup summaries and dates.',
        alt: 'Bookmarked favorites screen',
      },
      {
        src: '/projects/festivals/screen_notes.webp',
        label: 'Packing Notes',
        caption:
          'Personal packing checklist organized in a responsive two-column card grid with confirmation dialogs.',
        alt: 'Packing notes checklist screen',
      },
      {
        src: '/projects/festivals/screen_settings_dark.webp',
        label: 'Diagnostic Seeding',
        caption:
          'Settings diagnostics panel with runtime theme toggle and one-tap Room SQLite mock seeding.',
        alt: 'Settings and database diagnostics screen',
      },
    ],
  },
]

export function FestivalsStudio() {
  const [activeStationIndex, setActiveStationIndex] = useState(0)
  const [activeScreenIndex, setActiveScreenIndex] = useState(0)

  const activeStation = stations[activeStationIndex]
  const activeScreen =
    activeStation.screens[activeScreenIndex] ?? activeStation.screens[0]

  const handleStationChange = (index: number) => {
    setActiveStationIndex(index)
    setActiveScreenIndex(0)
  }

  return (
    <section
      aria-label="Festivals Interactive Architecture Studio"
      className="my-12 w-full"
    >
      {/* Studio Header Bar */}
      <div className="brutal bg-surface mb-6 p-5 sm:p-6">
        <div className="border-border mb-4 flex flex-col justify-between gap-3 border-b pb-4 sm:flex-row sm:items-center">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-metadata font-mono font-bold text-(color:--tone-green)">
                INTERACTIVE STUDIO
              </span>
              <span className="text-metadata text-muted font-mono text-xs">
                · NATIVE ANDROID RUNTIME
              </span>
            </div>
            <h2 className="text-h3 mt-1 text-2xl font-bold tracking-tight">
              Five Architectural Domain Stations
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <span className="pattern-dots border-ink/40 text-metadata text-muted border px-2.5 py-1 font-mono text-xs">
              MEDIUM_PHONE_API_37.0 CAPTURES
            </span>
          </div>
        </div>

        {/* Station Navigation Rail */}
        <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 lg:grid-cols-5">
          {stations.map((station, idx) => {
            const isActive = idx === activeStationIndex
            return (
              <button
                key={station.id}
                type="button"
                onClick={() => handleStationChange(idx)}
                style={
                  isActive
                    ? ({
                        borderColor: station.tone,
                        boxShadow: `3px 3px 0 0 ${station.tone}`,
                        backgroundColor: `color-mix(in srgb, ${station.tone} 10%, var(--surface))`,
                      } as CSSProperties)
                    : undefined
                }
                className={`focus-visible:outline-ring flex min-h-[92px] flex-col justify-between border-2 p-3 text-left transition-all duration-150 ${
                  isActive
                    ? 'border-2'
                    : 'border-border bg-surface hover:border-ink hover:-translate-y-0.5'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span
                    style={{ color: station.tone }}
                    className="font-mono text-xs font-bold"
                  >
                    STATION {station.number}
                  </span>
                  <span
                    style={{
                      borderColor: station.tone,
                      backgroundColor: isActive ? station.tone : 'transparent',
                      color: isActive ? '#ffffff' : station.tone,
                    }}
                    className="py-0.2 border px-1 font-mono text-[9px] font-bold"
                  >
                    {station.screens.length} VIEWS
                  </span>
                </div>
                <div>
                  <h3 className="text-foreground mt-2 text-xs leading-tight font-bold">
                    {station.shortTitle}
                  </h3>
                  <p className="text-muted mt-1 truncate font-mono text-[10px]">
                    {station.subBadge}
                  </p>
                </div>
              </button>
            )
          })}
        </div>
      </div>

      {/* Main Studio Two-Column Grid */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_340px] xl:grid-cols-[1fr_360px]">
        {/* Left Column: Deep Engineering Dossier */}
        <div className="brutal bg-surface flex flex-col justify-between p-6 sm:p-7">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStation.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.18 }}
            >
              {/* Dossier Header */}
              <div className="border-border mb-5 border-b pb-4">
                <div className="flex items-center gap-2">
                  <span
                    style={{ color: activeStation.tone }}
                    className="font-mono text-xs font-bold tracking-wider uppercase"
                  >
                    {activeStation.badge}
                  </span>
                  <span className="text-muted text-xs">·</span>
                  <span className="text-muted font-mono text-xs">
                    STATION {activeStation.number}
                  </span>
                </div>
                <h3 className="text-foreground mt-1 text-xl font-bold tracking-tight sm:text-2xl">
                  {activeStation.title}
                </h3>
              </div>

              {/* Summary */}
              <p className="text-body text-muted leading-relaxed">
                {activeStation.dossierSummary}
              </p>

              {/* Key Technical Mechanics */}
              <div className="my-6 space-y-3.5">
                {activeStation.keyPoints.map((point) => (
                  <div
                    key={point.label}
                    className="border-border/60 bg-surface-hover/40 border-l-2 p-3 pl-3.5"
                    style={{ borderLeftColor: activeStation.tone }}
                  >
                    <h4 className="text-foreground font-mono text-xs font-bold">
                      {point.label}
                    </h4>
                    <p className="text-muted mt-1 text-xs leading-relaxed">
                      {point.text}
                    </p>
                  </div>
                ))}
              </div>

              {/* Code Snippet Box */}
              <div className="mt-6">
                <div className="border-border flex items-center justify-between border-t border-r border-l bg-neutral-950 px-3.5 py-2">
                  <span className="text-muted font-mono text-[11px]">
                    {activeStation.codeCaption}
                  </span>
                  <span className="font-mono text-[10px] text-neutral-400">
                    Kotlin / Compose
                  </span>
                </div>
                <pre className="border-border overflow-x-auto border bg-neutral-950 p-4 font-mono text-xs text-neutral-200">
                  <code>{activeStation.codeSnippet}</code>
                </pre>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Right Column: Android Emulator Frame & Screen Switcher */}
        <div className="brutal bg-surface flex flex-col items-center justify-between p-6">
          <div className="w-full">
            <div className="border-border mb-4 flex items-center justify-between border-b pb-2">
              <span className="text-metadata text-muted font-mono text-xs font-bold">
                EMULATOR VIEWPORT
              </span>
              <span className="text-metadata text-muted font-mono text-[11px]">
                API 37 · 1080×2400
              </span>
            </div>

            {/* Android Device Mockup Shell */}
            <div className="relative mx-auto flex w-full max-w-[275px] flex-col overflow-hidden rounded-[38px] border-[5px] border-[#202028] bg-black shadow-[0_0_0_2px_var(--border),6px_6px_0_0_rgba(0,0,0,0.5),0_20px_35px_rgba(0,0,0,0.5)]">
              {/* Device Status Bar */}
              <div className="z-20 flex h-7 w-full items-center justify-between bg-black px-4 text-white">
                <span className="font-sans text-[11px] font-semibold tracking-tight text-white/90">
                  9:41
                </span>
                <div className="h-2.5 w-2.5 rounded-full border border-neutral-700 bg-neutral-900" />
                <div className="flex items-center gap-1 font-mono text-[9px] text-white/80">
                  <span>5G</span>
                  <span>100%</span>
                </div>
              </div>

              {/* Screen Area */}
              <div className="relative aspect-[9/19.5] w-full overflow-hidden bg-neutral-950">
                <Image
                  src={activeScreen.src}
                  alt={activeScreen.alt}
                  width={720}
                  height={1600}
                  unoptimized
                  className="h-full w-full object-contain transition-opacity duration-200"
                />

                {/* Floating Image Zoom Action */}
                <div className="absolute right-2 bottom-2 z-30 rounded bg-black/80 px-2 py-1 backdrop-blur-md">
                  <ImageZoom
                    src={activeScreen.src}
                    alt={activeScreen.alt}
                    width={720}
                    height={1600}
                    unoptimized
                  />
                </div>
              </div>

              {/* Gesture Navigation Pill */}
              <div className="z-20 flex h-5 w-full items-center justify-center bg-black">
                <div className="h-1 w-20 rounded-full bg-white/40" />
              </div>
            </div>

            {/* Multi-Screen Switcher Pills */}
            <div className="mt-4 flex flex-wrap justify-center gap-1.5">
              {activeStation.screens.map((screen, idx) => {
                const isSelected = idx === activeScreenIndex
                return (
                  <button
                    key={screen.src}
                    type="button"
                    onClick={() => setActiveScreenIndex(idx)}
                    style={
                      isSelected
                        ? {
                            backgroundColor: activeStation.tone,
                            borderColor: 'var(--ink)',
                          }
                        : undefined
                    }
                    className={`border px-2.5 py-1 font-mono text-xs font-semibold transition-all duration-150 ${
                      isSelected
                        ? 'border-ink text-white shadow-sm'
                        : 'border-border bg-surface text-muted hover:border-ink hover:text-foreground'
                    }`}
                  >
                    {screen.label}
                  </button>
                )
              })}
            </div>
          </div>

          {/* Screen Caption */}
          <p className="text-metadata text-muted mt-4 max-w-[280px] text-center font-mono text-xs">
            {activeScreen.caption}
          </p>
        </div>
      </div>
    </section>
  )
}
