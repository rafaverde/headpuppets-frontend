'use client'

import { RiCloseLine, RiMenu4Line, RiWhatsappLine } from '@remixicon/react'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'

import { cn } from '@/lib/utils'
import { SmoothScrollLink } from './smooth-scroll-link'
import { Button } from './ui/button'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from './ui/sheet'

interface HeaderProps {
  whatsapp: string
}

export default function Header({ whatsapp }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <header className="fixed z-90 w-full px-4 py-5">
      <div className="container mx-auto flex items-center justify-between rounded-full bg-slate-900/85 px-4 py-3 shadow-md backdrop-blur-[3px]">
        <nav className="hidden items-center gap-6 pl-4 text-foreground lg:flex">
          <SmoothScrollLink href="#the-band">A Banda</SmoothScrollLink>
          <SmoothScrollLink href="#setlist">Repertório</SmoothScrollLink>
          <SmoothScrollLink href="#agenda">Agenda</SmoothScrollLink>
        </nav>

        <SmoothScrollLink
          href="#top"
          className="flex items-center justify-center"
        >
          <Image
            src="/head-puppets-logo-icon.svg"
            width={30}
            height={48}
            alt="Logotipo Banda Head Puppets"
            className={cn(
              'w-auto pl-6 transition-all duration-500 lg:pl-0',
              isScrolled ? 'h-12' : 'h-0'
            )}
          />

          <Image
            src="/head-puppets-logo-simples.svg"
            width={136}
            height={48}
            alt="Logotipo Banda Head Puppets"
            className={cn(
              'w-auto pl-6 transition-all duration-500 lg:pl-0',
              !isScrolled ? 'h-12' : 'h-0'
            )}
          />
        </SmoothScrollLink>

        <nav className="hidden items-center gap-6 text-foreground lg:flex">
          <SmoothScrollLink href="#videos">Vídeos</SmoothScrollLink>
          <Link href={`https://wa.me/+55${whatsapp}`} target="_blank">
            <Button size={'xl'} className="rounded-full">
              <RiWhatsappLine size={24} /> Eu quero é rock
            </Button>
          </Link>
        </nav>

        {/* Mobile Menu */}
        <div className="flex items-center lg:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button size="icon-lg" className="size-10 rounded-full">
                <RiMenu4Line />
              </Button>
            </SheetTrigger>

            <SheetContent
              side="top"
              className="min-h-dvh w-full gap-0 bg-slate-900/85"
              showCloseButton={false}
            >
              <SheetHeader className="items-end pb-0">
                <SheetClose asChild>
                  <Button size="icon-lg" className="rounded-full">
                    <RiCloseLine />
                  </Button>
                </SheetClose>
              </SheetHeader>
              <nav className="flex h-dvh flex-col items-center justify-center gap-8 text-2xl text-foreground">
                <SheetClose asChild>
                  <Link href="#the-band">A Banda</Link>
                </SheetClose>
                <SheetClose asChild>
                  <Link href="#setlist">Repertório</Link>
                </SheetClose>
                <SheetClose asChild>
                  <Link href="#agenda">Agenda</Link>
                </SheetClose>
                <SheetClose asChild>
                  <Link href="#videos">Vídeos</Link>
                </SheetClose>
                <SheetClose asChild>
                  <Link href={`https://wa.me/+55${whatsapp}`} target="_blank">
                    <Button size="xl" className="rounded-full text-xl">
                      <RiWhatsappLine size={24} /> Eu quero é rock
                    </Button>
                  </Link>
                </SheetClose>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
