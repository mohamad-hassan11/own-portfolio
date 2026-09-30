import type { Metadata } from 'next'
import { ContactCta } from '@/components/sections/contact-cta'
import { RichText } from '@/components/projects/rich-text'
import { CmsImageFill } from '@/components/ui/cms-image'
import { Section } from '@/components/ui/section'
import { Timeline, TimelineItem } from '@/components/ui/timeline'
import { getEducation, getSiteSettings } from '@/lib/data'
import { buildMetadata } from '@/lib/seo'
import { SITE_FALLBACK } from '@/lib/site'
import { formatDateRange } from '@/lib/utils'

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings()
  return buildMetadata({
    settings,
    path: '/about',
    title: 'About',
    description: settings.aboutSummary,
  })
}

export default async function AboutPage() {
  const [settings, education] = await Promise.all([
    getSiteSettings(),
    getEducation(),
  ])
  const name = settings.fullName ?? SITE_FALLBACK.name
  const hasBody = Boolean(settings.aboutText?.length)

  return (
    <>
      <Section
        eyebrow="About"
        title={settings.aboutHeadline ?? `About ${name}`}
        className="pt-12 sm:pt-20"
      >
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_16rem] lg:gap-16">
          <div>
            {hasBody ? (
              <RichText value={settings.aboutText} />
            ) : (
              settings.aboutSummary && (
                <p className="text-body text-muted max-w-[68ch] whitespace-pre-line">
                  {settings.aboutSummary}
                </p>
              )
            )}
          </div>
          {settings.profileImage && (
            <div className="border-border relative aspect-square w-48 overflow-hidden rounded-2xl border lg:w-full">
              <CmsImageFill
                image={settings.profileImage}
                fallbackAlt={`Portrait of ${name}`}
                sizes="(min-width: 1024px) 256px, 192px"
              />
            </div>
          )}
        </div>
      </Section>

      {education.length > 0 && (
        <Section
          id="education"
          eyebrow="Education"
          title="Education"
          className="pt-0"
        >
          <div className="max-w-3xl">
            <Timeline>
              {education.map((item) => (
                <TimelineItem
                  key={item._id}
                  period={formatDateRange(item.startDate, item.endDate)}
                  title={item.degree}
                  subtitle={[item.institution, item.specialization]
                    .filter(Boolean)
                    .join(' · ')}
                >
                  {item.description && (
                    <p className="text-small text-muted">{item.description}</p>
                  )}
                </TimelineItem>
              ))}
            </Timeline>
          </div>
        </Section>
      )}

      <ContactCta settings={settings} />
    </>
  )
}
