import type { Metadata } from 'next'
import { Boldonse, Google_Sans_Flex } from 'next/font/google'
import './globals.css'

import Header from '@/components/header'
import Footer from '@/components/sections/footer'

const googlSansFlex = Google_Sans_Flex({
  variable: '--font-sans',
  subsets: ['latin'],
  fallback: ['Helvetica, sans'],
})

const boldonse = Boldonse({
  variable: '--font-display',
  weight: ['400'],
  subsets: ['latin'],
  fallback: ['Helvetica, sans'],
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
      className={`${googlSansFlex.variable} ${boldonse.variable} dark h-full scroll-smooth antialiased`}
    >
      <body className="flex min-h-full flex-col bg-slate-950">
        <main>
          <Header />
          {children}
          <Footer />
        </main>
      </body>
    </html>
  )
}
