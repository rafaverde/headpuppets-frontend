import type { Metadata, Viewport } from 'next'

import './stage.css'

export const metadata: Metadata = {
  title: 'Head Puppets Stage',
  description: 'Teleprompter e repertório de palco da Head Puppets.',
  robots: { index: false, follow: false },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  themeColor: '#08080c',
}

export default function StageLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
