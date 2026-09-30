import type { Metadata } from 'next'
import { AboutPreview } from '@/components/sections/about-preview'
import { ContactCta } from '@/components/sections/contact-cta'
import { ExperienceTimeline } from '@/components/sections/experience-timeline'
import { FeaturedProjects } from '@/components/sections/featured-projects'
import { Hero } from '@/components/sections/hero'
import { Skills } from '@/components/sections/skills'
import {
  getExperience,
  getFeaturedProjects,
  getSiteSettings,
  getSkillCategories,
} from '@/lib/data'
import { buildMetadata } from '@/lib/seo'

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings()
  return buildMetadata({ settings, path: '/' })
}

export default async function HomePage() {
  const [settings, projects, experience, skills] = await Promise.all([
    getSiteSettings(),
    getFeaturedProjects(),
    getExperience(),
    getSkillCategories(),
  ])

  return (
    <>
      <Hero settings={settings} />
      <FeaturedProjects projects={projects} />
      <AboutPreview settings={settings} />
      <ExperienceTimeline items={experience} />
      <Skills categories={skills} />
      <ContactCta settings={settings} />
    </>
  )
}
