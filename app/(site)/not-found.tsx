import Link from 'next/link'
import { ButtonLink } from '@/components/ui/button'

export default function NotFound() {
  return (
    <section className="container-page py-24 sm:py-32">
      <p className="text-metadata text-accent-text mb-4">404</p>
      <h1 className="text-h1">Page not found</h1>
      <p className="text-body text-muted mt-4 max-w-md">
        The page you are looking for does not exist or has moved.
      </p>
      <div className="mt-8 flex gap-3">
        <ButtonLink href="/">Back to home</ButtonLink>
        <Link
          href="/projects"
          className="text-muted hover:text-foreground inline-flex h-11 items-center px-3 text-sm font-medium"
        >
          Browse projects
        </Link>
      </div>
    </section>
  )
}
