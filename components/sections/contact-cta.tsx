import { Download, Mail } from 'lucide-react'
import type { ReactNode } from 'react'
import { Reveal } from '@/components/ui/reveal'
import { Section } from '@/components/ui/section'
import type { SiteConfig } from '@/content/types'

interface ContactCtaProps {
  config: SiteConfig
  cvHref?: string
}

const display = (url: string) => url.replace(/^https?:\/\/(www\.)?/, '')

function ContactLink({
  label,
  value,
  href,
  icon,
  download,
}: {
  label: string
  value: string
  href: string
  icon?: ReactNode
  download?: boolean
}) {
  const external = href.startsWith('http')

  return (
    <a
      href={href}
      download={download ? true : undefined}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      className="brutal brutal-lift bg-surface block p-5"
    >
      <span className="text-metadata text-muted flex items-center gap-2">
        {icon}
        {label}
      </span>
      <span className="text-h3 mt-2 block text-2xl break-all normal-case">
        {value}
      </span>
    </a>
  )
}

export function ContactCta({ config, cvHref }: ContactCtaProps) {
  if (!config.email && !config.linkedin && !config.github && !cvHref) {
    return null
  }

  return (
    <Section
      id="contact"
      tag="06 / START A CONVERSATION"
      title={config.contactHeadline}
    >
      <Reveal>
        <p className="text-body text-muted max-w-xl">
          {config.contactDescription}
        </p>
        <ul className="mt-10 grid gap-6 sm:grid-cols-2">
          {config.email && (
            <li>
              <ContactLink
                label="Email"
                value={config.email}
                href={`mailto:${config.email}`}
                icon={<Mail aria-hidden className="size-4" />}
              />
            </li>
          )}
          {config.linkedin && (
            <li>
              <ContactLink
                label="LinkedIn"
                value={display(config.linkedin)}
                href={config.linkedin}
              />
            </li>
          )}
          {config.github && (
            <li>
              <ContactLink
                label="GitHub"
                value={display(config.github)}
                href={config.github}
              />
            </li>
          )}
          {cvHref && (
            <li>
              <ContactLink
                label="Resume"
                value="Download CV"
                href={cvHref}
                download
                icon={<Download aria-hidden className="size-4" />}
              />
            </li>
          )}
        </ul>
      </Reveal>
    </Section>
  )
}
