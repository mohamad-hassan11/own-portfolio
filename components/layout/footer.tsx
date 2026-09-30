import Link from 'next/link'
import type { SiteConfig } from '@/content/types'

export function Footer({ config }: { config: SiteConfig }) {
  const social = [
    config.github && { label: 'GitHub', href: config.github },
    config.linkedin && { label: 'LinkedIn', href: config.linkedin },
    config.email && { label: 'Email', href: `mailto:${config.email}` },
  ].filter((link): link is { label: string; href: string } => Boolean(link))

  const linkClass =
    'text-metadata text-muted hover:text-foreground transition-colors duration-200'

  return (
    <footer className="border-border mt-10 border-t-2">
      <div className="container-page flex flex-col gap-8 py-10 md:flex-row md:items-start md:justify-between">
        <div>
          <p className="text-h3">{config.name}</p>
          <p className="text-metadata text-muted mt-1">{config.title}</p>
        </div>

        <nav aria-label="Footer">
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {config.navigation.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className={linkClass}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {social.length > 0 && (
          <ul aria-label="Social" className="flex flex-wrap gap-x-6 gap-y-2">
            {social.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  {...(link.href.startsWith('http')
                    ? { target: '_blank', rel: 'noopener noreferrer' }
                    : {})}
                  className={linkClass}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="border-border border-t">
        <p className="text-metadata text-muted container-page py-5">
          {config.footerText ??
            `© ${new Date().getFullYear()} ${config.name}. All rights reserved.`}
        </p>
      </div>
    </footer>
  )
}
