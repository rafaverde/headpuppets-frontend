'use client'

import Link from 'next/link'
import type { ComponentProps } from 'react'

import { scrollToSection } from '@/lib/utils'

type SmoothScrollLinkProps = ComponentProps<typeof Link>

export function SmoothScrollLink({
  href,
  onClick,
  ...props
}: SmoothScrollLinkProps) {
  return (
    <Link
      href={href}
      onClick={event => {
        onClick?.(event)

        if (event.defaultPrevented || typeof href !== 'string') {
          return
        }

        event.preventDefault()
        scrollToSection(href)
      }}
      {...props}
    />
  )
}
