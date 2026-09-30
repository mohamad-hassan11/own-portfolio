import type { MDXComponents } from 'mdx/types'
import Image from 'next/image'
import Link from 'next/link'
import type { ComponentPropsWithoutRef } from 'react'
import { ArchitectureDiagram } from '@/components/mdx/architecture-diagram'
import { Callout } from '@/components/mdx/callout'
import { ProjectImage } from '@/components/mdx/project-image'
import { cn } from '@/lib/utils'

function MdxLink({
  href = '',
  children,
  ...rest
}: ComponentPropsWithoutRef<'a'>) {
  const className =
    'text-accent-text underline underline-offset-4 hover:no-underline'

  if (/^https?:\/\//.test(href)) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
        {...rest}
      >
        {children}
      </a>
    )
  }
  if (href.startsWith('mailto:') || href.startsWith('#')) {
    return (
      <a href={href} className={className} {...rest}>
        {children}
      </a>
    )
  }
  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  )
}

function MdxImg({ src, alt = '' }: ComponentPropsWithoutRef<'img'>) {
  if (typeof src !== 'string') return null
  return (
    <Image
      src={src}
      alt={alt}
      width={1600}
      height={900}
      sizes="(min-width: 1024px) 768px, 100vw"
      className="border-border my-8 h-auto w-full rounded-xl border"
    />
  )
}

const components: MDXComponents = {
  h1: ({ className, ...props }) => (
    <h1 className={cn('text-h1 mt-10 mb-4', className)} {...props} />
  ),
  h2: ({ className, ...props }) => (
    <h2
      className={cn(
        'text-h2 border-border mt-14 border-t pt-8 first:mt-0 first:border-t-0 first:pt-0',
        className,
      )}
      {...props}
    />
  ),
  h3: ({ className, ...props }) => (
    <h3 className={cn('text-h3 mt-8', className)} {...props} />
  ),
  p: ({ className, ...props }) => (
    <p className={cn('text-body mt-4', className)} {...props} />
  ),
  ul: ({ className, ...props }) => (
    <ul
      className={cn(
        'text-body marker:text-muted mt-4 list-disc space-y-2 pl-6',
        className,
      )}
      {...props}
    />
  ),
  ol: ({ className, ...props }) => (
    <ol
      className={cn(
        'text-body marker:text-muted mt-4 list-decimal space-y-2 pl-6',
        className,
      )}
      {...props}
    />
  ),
  blockquote: ({ className, ...props }) => (
    <blockquote
      className={cn(
        'border-accent text-muted mt-6 border-l-2 pl-5 italic [&>p]:mt-0',
        className,
      )}
      {...props}
    />
  ),
  code: ({ className, ...props }) => (
    <code
      className={cn(
        'bg-surface-hover rounded px-1.5 py-0.5 font-mono text-[0.9em]',
        className,
      )}
      {...props}
    />
  ),
  pre: ({ className, ...props }) => (
    <pre
      className={cn(
        'border-border bg-surface mt-6 overflow-x-auto rounded-xl border p-4 font-mono text-sm leading-relaxed [&_code]:bg-transparent [&_code]:p-0',
        className,
      )}
      {...props}
    />
  ),
  hr: () => <hr className="border-border my-10" />,
  a: MdxLink,
  img: MdxImg,
  ProjectImage,
  ArchitectureDiagram,
  Callout,
}

export function useMDXComponents(): MDXComponents {
  return components
}
