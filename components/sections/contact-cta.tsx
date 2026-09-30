import { Mail } from 'lucide-react'
import { ButtonLink } from '@/components/ui/button'
import { Reveal } from '@/components/ui/reveal'
import { Section } from '@/components/ui/section'
import type { SiteConfig } from '@/content/types'

interface ContactCtaProps {
  config: SiteConfig
  cvHref?: string
}

export function ContactCta({ config, cvHref }: ContactCtaProps) {
  if (!config.email && !config.linkedin && !config.github && !cvHref) {
    return null
  }

  return (
    <Section id="contact">
      <Reveal className="border-border bg-surface rounded-2xl border p-8 sm:p-12">
        <h2 className="text-h1 max-w-2xl">{config.contactHeadline}</h2>
        <p className="text-body text-muted mt-4 max-w-2xl">
          {config.contactDescription}
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          {config.email && (
            <ButtonLink href={`mailto:${config.email}`}>
              <Mail aria-hidden className="size-4" />
              {config.email}
            </ButtonLink>
          )}
          {config.linkedin && (
            <ButtonLink href={config.linkedin} variant="secondary">
              LinkedIn
            </ButtonLink>
          )}
          {config.github && (
            <ButtonLink href={config.github} variant="secondary">
              GitHub
            </ButtonLink>
          )}
          {cvHref && (
            <ButtonLink href={cvHref} download variant="ghost">
              Download CV
            </ButtonLink>
          )}
        </div>
      </Reveal>
    </Section>
  )
}
