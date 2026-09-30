import { Reveal } from '@/components/ui/reveal'
import { Section } from '@/components/ui/section'
import { TagList } from '@/components/ui/tag-list'
import { Timeline, TimelineItem } from '@/components/ui/timeline'
import { formatDateRange } from '@/lib/utils'
import type { Experience } from '@/types/cms'

export function ExperienceTimeline({ items }: { items: Experience[] }) {
  if (!items.length) return null

  return (
    <Section id="experience" eyebrow="Experience" title="Where I have worked">
      <Reveal className="max-w-3xl">
        <Timeline>
          {items.map((item) => {
            const subtitle = [
              item.organisation,
              item.employmentType,
              item.location,
            ]
              .filter(Boolean)
              .join(' · ')

            return (
              <TimelineItem
                key={item._id}
                period={formatDateRange(
                  item.startDate,
                  item.endDate,
                  item.currentRole,
                )}
                title={item.jobTitle}
                subtitle={subtitle}
              >
                {item.summary && (
                  <p className="text-body text-muted">{item.summary}</p>
                )}
                {item.responsibilities && item.responsibilities.length > 0 && (
                  <ul className="text-small text-muted list-disc space-y-1 pl-5">
                    {item.responsibilities.map((line) => (
                      <li key={line}>{line}</li>
                    ))}
                  </ul>
                )}
                <TagList
                  items={item.technologies}
                  label={`${item.jobTitle} technologies`}
                />
              </TimelineItem>
            )
          })}
        </Timeline>
      </Reveal>
    </Section>
  )
}
