import { Mail } from 'lucide-react'
import { ButtonLink } from '@/components/ui/button'
import { Reveal } from '@/components/ui/reveal'
import { Section } from '@/components/ui/section'
import { withDownload } from '@/lib/utils'
import type { SiteSettings } from '@/types/cms'

export function ContactCta({ settings }: { settings: SiteSettings }) {
  const hasContact =
    settings.email ||
    settings.linkedinUrl ||
    settings.githubUrl ||
    settings.cvUrl
  if (!hasContact && !settings.contactHeadline) return null

  return (
    <Section id="contact">
      <Reveal className="border-border bg-surface rounded-2xl border p-8 sm:p-12">
        <h2 className="text-h1 max-w-2xl">
          {settings.contactHeadline ?? 'Get in touch'}
        </h2>
        {settings.contactDescription && (
          <p className="text-body text-muted mt-4 max-w-2xl">
            {settings.contactDescription}
          </p>
        )}
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          {settings.email && (
            <ButtonLink href={`mailto:${settings.email}`}>
              <Mail aria-hidden className="size-4" />
              {settings.email}
            </ButtonLink>
          )}
          {settings.linkedinUrl && (
            <ButtonLink href={settings.linkedinUrl} variant="secondary">
              LinkedIn
            </ButtonLink>
          )}
          {settings.githubUrl && (
            <ButtonLink href={settings.githubUrl} variant="secondary">
              GitHub
            </ButtonLink>
          )}
          {settings.cvUrl && (
            <ButtonLink href={withDownload(settings.cvUrl)} variant="ghost">
              Download CV
            </ButtonLink>
          )}
        </div>
      </Reveal>
    </Section>
  )
}
