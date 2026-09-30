import { Reveal } from '@/components/ui/reveal'
import { Section } from '@/components/ui/section'
import { TagList } from '@/components/ui/tag-list'
import { Timeline, TimelineItem } from '@/components/ui/timeline'
import type { Experience } from '@/content/types'
import { formatDateRange } from '@/lib/utils'

export function ExperienceTimeline({ items }: { items: Experience[] }) {
  if (!items.length) return null

  return (
    <Section id="experience" tag="04 / CAREER TRACE" title="My journey">
      <Reveal>
        <Timeline>
          {items.map((item, index) => {
            const subtitle = [
              item.organisation,
              item.employmentType,
              item.location,
            ]
              .filter(Boolean)
              .join(' · ')

            return (
              <TimelineItem
                key={`${item.organisation}-${item.role}-${item.startDate}`}
                index={index}
                period={formatDateRange(
                  item.startDate,
                  item.endDate,
                  item.current,
                )}
                title={item.role}
                subtitle={subtitle}
              >
                <p className="text-body text-muted">{item.summary}</p>
                {item.responsibilities && item.responsibilities.length > 0 && (
                  <ul className="text-body text-muted list-disc space-y-1.5 pl-5">
                    {item.responsibilities.map((line) => (
                      <li key={line}>{line}</li>
                    ))}
                  </ul>
                )}
                <TagList
                  items={item.technologies}
                  label={`${item.role} technologies`}
                />
              </TimelineItem>
            )
          })}
        </Timeline>
      </Reveal>
    </Section>
  )
}
