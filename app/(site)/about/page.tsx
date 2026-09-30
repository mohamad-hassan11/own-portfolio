import type { Metadata } from 'next'
import AboutContent from '@/content/about.mdx'
import { ContactCta } from '@/components/sections/contact-cta'
import { Section } from '@/components/ui/section'
import { Timeline, TimelineItem } from '@/components/ui/timeline'
import { siteConfig } from '@/content/site'
import { getEducation } from '@/lib/content'
import { buildMetadata } from '@/lib/seo'
import { getCvHref } from '@/lib/site'
import { formatDateRange } from '@/lib/utils'

export const metadata: Metadata = buildMetadata({
  path: '/about',
  title: 'About',
  description: siteConfig.aboutSummary,
})

export default function AboutPage() {
  const education = getEducation()

  return (
    <>
      <Section
        headingLevel={1}
        tag="PROFILE"
        title="About me"
        className="pt-10 sm:pt-16"
      >
        <div className="max-w-3xl">
          <AboutContent />
        </div>
      </Section>

      {education.length > 0 && (
        <Section id="education" tag="LEARNING TRACE" title="Education">
          <Timeline>
            {education.map((item, index) => (
              <TimelineItem
                key={`${item.institution}-${item.title}`}
                index={index}
                period={formatDateRange(item.startDate, item.endDate)}
                title={item.title}
                subtitle={[item.institution, item.specialization]
                  .filter(Boolean)
                  .join(' · ')}
              >
                {item.description && (
                  <p className="text-body text-muted">{item.description}</p>
                )}
              </TimelineItem>
            ))}
          </Timeline>
        </Section>
      )}

      <ContactCta config={siteConfig} cvHref={getCvHref()} />
    </>
  )
}
 