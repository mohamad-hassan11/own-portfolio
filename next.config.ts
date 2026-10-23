import createMDX from '@next/mdx'
import type { NextConfig } from 'next'

const securityHeaders = [
  { key: 'Cross-Origin-Opener-Policy', value: 'same-origin' },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), geolocation=(), microphone=()',
  },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000',
  },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'X-Frame-Options', value: 'DENY' },
]

const nextConfig: NextConfig = {
  poweredByHeader: false,
  async redirects() {
    return [
      {
        source: '/projects/keylingo',
        destination: '/projects/ai-coding-experiments',
        permanent: true,
      },
      {
        source: '/projects/lexitype',
        destination: '/projects/ai-coding-experiments',
        permanent: true,
      },
      {
        source: '/projects/amsterdam-events',
        destination: '/projects/ewa',
        permanent: true,
      },
    ]
  },
  async headers() {
    return [{ source: '/(.*)', headers: securityHeaders }]
  },
}

const withMDX = createMDX({})

export default withMDX(nextConfig)
