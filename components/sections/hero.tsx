import { ArrowRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { ButtonLink } from '@/components/ui/button'
import type { SiteConfig } from '@/content/types'
import type { Stat } from '@/lib/content'

interface HeroProps {
  config: SiteConfig
  stats: Stat[]
  cvHref?: string
}

export function Hero({ config, stats, cvHref }: HeroProps) {
  return (
    <section
      aria-labelledby="hero-heading"
      className="grid gap-12 py-12 sm:py-20 lg:grid-cols-[minmax(0,1fr)_21rem] lg:items-center lg:gap-16"
    >
      <div>
        <p className="text-metadata text-accent-text mb-5 tracking-[0.3em]">
          {'// SYSTEM.INIT'}
        </p>
        <h1 id="hero-heading" className="text-display">
          {config.name}
        </h1>
        <p className="text-h1 text-accent-text mt-3">{config.title}</p>

        <div className="border-accent mt-8 max-w-xl border-l-4 pl-5 font-mono text-[0.9rem] leading-7">
          <p className="text-muted">{config.heroDescription}</p>
          <p className="mt-4 font-medium">{`/* ${config.heroHeadline} */`}</p>
        </div>

        {config.status && (
          <p className="brutal-sm bg-surface text-metadata mt-8 inline-flex items-center gap-2.5 px-4 py-2 font-bold">
            <span
              aria-hidden
              className="animate-blink size-2 rounded-full bg-[var(--tone-green)]"
            />
            STATUS: {config.status}
          </p>
        )}

        <div className="mt-8 flex flex-wrap gap-3">
          <ButtonLink href="/projects">
            Explore projects
            <ArrowRight aria-hidden className="size-4" />
          </ButtonLink>
          {cvHref && (
            <ButtonLink href={cvHref} download variant="secondary">
              View resume
            </ButtonLink>
          )}
          {config.github && (
            <ButtonLink href={config.github} variant="secondary">
              GitHub
            </ButtonLink>
          )}
          {config.linkedin && (
            <ButtonLink href={config.linkedin} variant="secondary">
              LinkedIn
            </ButtonLink>
          )}
        </div>
      </div>

      <aside
        aria-label="At a glance"
        className="brutal bg-surface overflow-hidden"
      >
        <div className="border-ink flex items-center gap-2 border-b-2 px-4 py-2.5">
          <span aria-hidden className="flex gap-1.5">
            <span className="size-2.5 bg-[var(--tone-red)]" />
            <span className="size-2.5 bg-[var(--tone-amber)]" />
            <span className="size-2.5 bg-[var(--tone-green)]" />
          </span>
          <p className="text-metadata text-muted ml-2">portfolio.sh</p>
        </div>

        {config.profileImage && (
          <div className="border-ink relative aspect-[4/3] border-b-2">
            <Image
              src={config.profileImage}
              alt={config.profileImageAlt ?? `Portrait of ${config.name}`}
              fill
              priority
              sizes="336px"
              className="object-cover"
            />
          </div>
        )}

        <dl className="space-y-3 p-5 font-mono text-sm">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="border-border flex items-baseline justify-between gap-4 border-b border-dashed pb-3"
            >
              <dt className="text-muted uppercase">{stat.label}</dt>
              <dd className="font-display text-3xl font-extrabold">
                {String(stat.value).padStart(2, '0')}
              </dd>
            </div>
          ))}
        </dl>

        {config.highlights.length > 0 && (
          <ul className="space-y-2 px-5 pb-5 font-mono text-sm">
            {config.highlights.map((highlight) => (
              <li key={highlight.label}>
                <Link
                  href={highlight.href}
                  className="text-accent-text hover:text-foreground transition-colors duration-200"
                >
                  &gt; {highlight.label}
                </Link>
              </li>
            ))}
          </ul>
        )}

        {config.location && (
          <p className="text-metadata text-muted border-border border-t px-5 py-3">
            SYS.LOC: {config.location}
          </p>
        )}
      </aside>
    </section>
  )
}
