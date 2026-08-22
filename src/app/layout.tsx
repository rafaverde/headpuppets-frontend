import type { Metadata } from 'next'
import { Boldonse, Google_Sans_Flex } from 'next/font/google'
import './globals.css'

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
  keywords:
    'banda natal, banda natal rn, banda para eventos, eventos em natal rn, banda rock rn, banda eventos rn, banda eventos moto, motoclube, banda rock para bar em natal, banda, rock, cover, natal, rn',
  openGraph: {
    title: 'Banda Headpuppets',
    description:
      'Banda de rock clássico e heavy metal em Natal, Rio Grande do Norte',
    url: process.env.NEXT_PUBLIC_BASE_URL || 'https://www.headpuppets.com.br',
    siteName: 'Banda Headpuppets',
    images: [
      {
        url: '/bg-banda-grunge-halloween.webp',
        width: 1920,
        height: 1080,
      },
    ],
    locale: 'pt_BR',
    type: 'website',
  },
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
      <body className="flex min-h-full flex-col bg-slate-950">{children}</body>
    </html>
  )
}
