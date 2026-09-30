import { NextResponse, type NextRequest } from 'next/server'
import { revalidateTag } from 'next/cache'
import { parseBody } from 'next-sanity/webhook'
import type { CmsTag } from '@/lib/cms'

const TAGS: readonly CmsTag[] = [
  'siteSettings',
  'project',
  'experience',
  'education',
  'skillCategory',
]

export async function POST(req: NextRequest) {
  const secret = process.env.SANITY_REVALIDATE_SECRET
  if (!secret) {
    return NextResponse.json({ message: 'Not configured' }, { status: 500 })
  }

  const { isValidSignature, body } = await parseBody<{ _type?: string }>(
    req,
    secret,
  )
  if (!isValidSignature) {
    return NextResponse.json({ message: 'Invalid signature' }, { status: 401 })
  }

  const type = body?._type
  const tag = TAGS.find((t) => t === type)
  if (!tag) {
    return NextResponse.json({ message: 'Ignored', type }, { status: 200 })
  }

  revalidateTag(tag, { expire: 0 })
  return NextResponse.json({ revalidated: tag })
}
