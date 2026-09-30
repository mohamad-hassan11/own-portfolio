// Ambient declaration: imports are written inside the block so this stays a global script.
declare module '*.mdx' {
  import type { ProjectMetadata } from '@/content/types'

  export const metadata: ProjectMetadata
}
