import {
  ProjectImage,
  type ProjectImageProps,
} from '@/components/mdx/project-image'

// Diagrams are mounted on a white sheet and can be expanded to full size.
export function ArchitectureDiagram(props: ProjectImageProps) {
  return <ProjectImage zoom mat {...props} />
}
