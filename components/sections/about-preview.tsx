import { ArrowRight } from 'lucide-react'
import { ButtonLink } from '@/components/ui/button'
import { Reveal } from '@/components/ui/reveal'
import { Section } from '@/components/ui/section'

export function AboutPreview({ summary }: { summary: string }) {
  return (
    <Section id="about-preview" tag="ABOUT" title="About me">
      <Reveal className="max-w-2xl">
        <p className="text-body border-accent border-l-4 pl-5 whitespace-pre-line">
          {summary}
        </p>
        <ButtonLink
          href="/about"
          variant="secondary"
          size="sm"
          className="mt-8"
        >
          More about me
          <ArrowRight aria-hidden className="size-4" />
        </ButtonLink>
      </Reveal>
    </Section>
  )
}
