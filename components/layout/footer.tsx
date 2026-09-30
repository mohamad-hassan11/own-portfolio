import type { SiteConfig } from '@/content/types'

export function Footer({ config }: { config: SiteConfig }) {
  const text =
    config.footerText ?? `© ${new Date().getFullYear()} ${config.name}`

  const links = [
    config.github && { label: 'GitHub', href: config.github },
    config.linkedin && { label: 'LinkedIn', href: config.linkedin },
    config.email && { label: 'Email', href: `mailto:${config.email}` },
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
