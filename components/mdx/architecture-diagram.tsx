import { ProjectImage } from '@/components/mdx/project-image'

type ArchitectureDiagramProps = Parameters<typeof ProjectImage>[0]

// Diagrams sit on a surface so transparent PNG/SVG exports stay readable in both themes.
export function ArchitectureDiagram(props: ArchitectureDiagramProps) {
  return <ProjectImage {...props} className="bg-surface p-3" />
}
