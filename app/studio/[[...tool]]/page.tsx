import { hasSanityConfig } from '@/sanity/env'
import { Studio } from './Studio'

export { metadata, viewport } from 'next-sanity/studio'

export const dynamic = 'force-static'

export function generateStaticParams() {
  return [{ tool: [] as string[] }]
}

export default function StudioPage() {
  if (!hasSanityConfig) {
    return (
      <main style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
        <h1>Sanity is not configured</h1>
        <p>
          Set <code>NEXT_PUBLIC_SANITY_PROJECT_ID</code> and{' '}
          <code>NEXT_PUBLIC_SANITY_DATASET</code> in <code>.env.local</code>,
          then restart the dev server.
        </p>
      </main>
    )
  }

  return <Studio />
}
