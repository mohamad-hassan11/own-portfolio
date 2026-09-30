import { ArrowRight } from 'lucide-react'
import Image from 'next/image'
import { ButtonLink } from '@/components/ui/button'
import type { SiteConfig } from '@/content/types'

interface HeroProps {
  config: SiteConfig
  cvHref?: string
}

export function Hero({ config, cvHref }: HeroProps) {
  return (
    <section
      aria-labelledby="hero-heading"
      className="container-page grid items-center gap-12 pt-16 pb-12 sm:pt-24 sm:pb-16 lg:grid-cols-[1fr_auto] lg:gap-16 lg:pt-32"
    >
      <div className="max-w-3xl">
        <p className="text-metadata text-accent-text mb-5">{config.title}</p>
        <h1 id="hero-heading" className="text-display">
          {config.name}
        </h1>
        <p className="text-h2 text-muted mt-5 font-normal">
          {config.heroHeadline}
        </p>
        <p className="text-body text-muted mt-6 max-w-2xl">
          {config.heroDescription}
        </p>

        <div className="mt-9 flex flex-col gap-3 sm:flex-row">
          <ButtonLink href="/projects">
            View projects
            <ArrowRight aria-hidden className="size-4" />
          </ButtonLink>
          {cvHref && (
            <ButtonLink href={cvHref} download variant="secondary">
              Download CV
            </ButtonLink>
          )}
        </div>

        {config.heroTags.length > 0 && (
          <ul
            aria-label="Focus areas"
            className="text-metadata text-muted mt-10 flex flex-wrap gap-x-5 gap-y-2"
          >
            {config.heroTags.map((tag) => (
              <li key={tag}>{tag}</li>
            ))}
          </ul>
        )}
      </div>

      {config.profileImage && (
        <div className="border-border relative mx-auto aspect-square w-48 overflow-hidden rounded-2xl border sm:w-60 lg:w-72">
          <Image
            src={config.profileImage}
            alt={config.profileImageAlt ?? `Portrait of ${config.name}`}
            fill
            priority
            sizes="(min-width: 1024px) 288px, 240px"
            className="object-cover"
          />
        </div>
      )}
    </section>
  )
}
