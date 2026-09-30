import type { Metadata } from 'next'
import { AboutPreview } from '@/components/sections/about-preview'
import { ContactCta } from '@/components/sections/contact-cta'
import { ExperienceTimeline } from '@/components/sections/experience-timeline'
import { FeaturedProjects } from '@/components/sections/featured-projects'
import { Hero } from '@/components/sections/hero'
import { Skills } from '@/components/sections/skills'
import { getFeaturedProjects } from '@/content/projects'
import { siteConfig } from '@/content/site'
import { getExperience, getSkills, getStats } from '@/lib/content'
import { buildMetadata } from '@/lib/seo'
import { getCvHref } from '@/lib/site'

export const metadata: Metadata = buildMetadata({ path: '/' })

export default function HomePage() {
  const cvHref = getCvHref()

  return (
    <>
      <Hero config={siteConfig} stats={getStats()} cvHref={cvHref} />
      <FeaturedProjects
        projects={getFeaturedProjects().map((project) => project.metadata)}
      />
      <Skills categories={getSkills()} />
      <ExperienceTimeline items={getExperience()} />
      <AboutPreview summary={siteConfig.aboutSummary} />
      <ContactCta config={siteConfig} cvHref={cvHref} />
    </>
  )
}
