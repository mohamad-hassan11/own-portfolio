import { SITE_FALLBACK } from '@/lib/site'
import type { SiteSettings } from '@/types/cms'

export function Footer({ settings }: { settings: SiteSettings }) {
  const name = settings.fullName ?? SITE_FALLBACK.name
  const text = settings.footerText ?? `© ${new Date().getFullYear()} ${name}`

  const links = [
    settings.githubUrl && { label: 'GitHub', href: settings.githubUrl },
    settings.linkedinUrl && { label: 'LinkedIn', href: settings.linkedinUrl },
    settings.email && { label: 'Email', href: `mailto:${settings.email}` },
  ].filter((link): link is { label: string; href: string } => Boolean(link))

  return (
    <footer className="border-border border-t">
      <div className="container-page flex flex-col gap-4 py-8 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-small text-muted">{text}</p>
        {links.length > 0 && (
          <nav aria-label="Social">
            <ul className="flex gap-5">
              {links.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    {...(link.href.startsWith('http')
                      ? { target: '_blank', rel: 'noopener noreferrer' }
                      : {})}
                    className="text-small text-muted hover:text-foreground transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </div>
    </footer>
  )
}
