import type { Metadata } from 'next'
import { Boldonse, Google_Sans_Flex } from 'next/font/google'
import './globals.css'

import Header from '@/components/header'

const googlSansFlex = Google_Sans_Flex({
  variable: '--font-sans',
  subsets: ['latin'],
})

const boldonse = Boldonse({
  variable: '--font-display',
  weight: ['400'],
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Banda Headpuppets',
  description:
    'Banda de rock clássico e heavy metal em Natal, Rio Grande do Norte',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${googlSansFlex.variable} ${boldonse.variable} scheme-dark h-full antialiased`}
    >
      <body className="flex min-h-full flex-col px-1">
        <main>
          <Header />
          {children}
        </main>
      </body>
    </html>
  )
}
