import { ArrowRight } from 'lucide-react'
import { CmsImageFill } from '@/components/ui/cms-image'
import { ButtonLink } from '@/components/ui/button'
import { SITE_FALLBACK } from '@/lib/site'
import { withDownload } from '@/lib/utils'
import type { SiteSettings } from '@/types/cms'

export function Hero({ settings }: { settings: SiteSettings }) {
  const name = settings.fullName ?? SITE_FALLBACK.name
  const title = settings.professionalTitle ?? SITE_FALLBACK.title

  return (
    <section
      aria-labelledby="hero-heading"
      className="container-page grid items-center gap-12 pt-16 pb-12 sm:pt-24 sm:pb-16 lg:grid-cols-[1fr_auto] lg:gap-16 lg:pt-32"
    >
      <div className="max-w-3xl">
        <p className="text-metadata text-accent-text mb-5">{title}</p>
        <h1 id="hero-heading" className="text-display">
          {name}
        </h1>
        {settings.heroHeadline && (
          <p className="text-h2 text-muted mt-5 font-normal">
            {settings.heroHeadline}
          </p>
        )}
        {settings.heroDescription && (
          <p className="text-body text-muted mt-6 max-w-2xl">
            {settings.heroDescription}
          </p>
        )}

        <div className="mt-9 flex flex-col gap-3 sm:flex-row">
          <ButtonLink href="/projects">
            View projects
            <ArrowRight aria-hidden className="size-4" />
          </ButtonLink>
          {settings.cvUrl && (
            <ButtonLink href={withDownload(settings.cvUrl)} variant="secondary">
              Download CV
            </ButtonLink>
          )}
        </div>

        {settings.heroTags && settings.heroTags.length > 0 && (
          <ul
            aria-label="Focus areas"
            className="text-metadata text-muted mt-10 flex flex-wrap gap-x-5 gap-y-2"
          >
            {settings.heroTags.map((tag) => (
              <li key={tag}>{tag}</li>
            ))}
          </ul>
        )}
      </div>

      {settings.profileImage && (
        <div className="border-border relative mx-auto aspect-square w-48 overflow-hidden rounded-2xl border sm:w-60 lg:w-72">
          <CmsImageFill
            image={settings.profileImage}
            fallbackAlt={`Portrait of ${name}`}
            sizes="(min-width: 1024px) 288px, 240px"
            priority
          />
        </div>
      )}
    </section>
  )
}
