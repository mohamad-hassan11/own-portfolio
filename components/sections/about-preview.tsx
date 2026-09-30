import { ArrowRight } from 'lucide-react'
import { ButtonLink } from '@/components/ui/button'
import { Reveal } from '@/components/ui/reveal'
import { Section } from '@/components/ui/section'

export function AboutPreview({ summary }: { summary: string }) {
  return (
    <Section id="about-preview" eyebrow="About" title="About me">
      <Reveal className="max-w-3xl">
        <p className="text-body text-muted whitespace-pre-line">{summary}</p>
        <ButtonLink
          href="/about"
          variant="secondary"
          size="sm"
          className="mt-6"
        >
          More about me
          <ArrowRight aria-hidden className="size-4" />
        </ButtonLink>
      </Reveal>
    </Section>
  )
}
