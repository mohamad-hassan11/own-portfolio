import { ButtonLink } from '@/components/ui/button'

export default function NotFound() {
  return (
    <section className="py-16 sm:py-24">
      <p className="text-metadata text-accent-text mb-4">[ERROR / 404]</p>
      <h1 className="text-display">Page not found</h1>
      <span aria-hidden className="bg-accent mt-4 block h-1 w-16" />
      <p className="text-body text-muted mt-6 max-w-md">
        The page you are looking for does not exist or has moved.
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <ButtonLink href="/">Back to home</ButtonLink>
        <ButtonLink href="/projects" variant="secondary">
          Browse projects
        </ButtonLink>
      </div>
    </section>
  )
}
