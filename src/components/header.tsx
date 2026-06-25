import { RiCloseLine, RiMenu4Line, RiWhatsappLine } from '@remixicon/react'
import Image from 'next/image'
import Link from 'next/link'

import { GlobalSettingsService } from '@/api/services/global-settings.service'
import { Button } from './ui/button'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from './ui/sheet'

export default async function Header() {
  const { whatsapp } = await GlobalSettingsService.getGlobalSettings()

  return (
    <header className="fixed z-10 w-full px-4 py-5">
      <div className="container mx-auto flex items-center justify-between rounded-full bg-slate-900/85 px-4 py-3 shadow-md backdrop-blur-[3px]">
        <nav className="hidden items-center gap-6 pl-4 text-foreground lg:flex">
          <Link href="#the-band">A Banda</Link>
          <Link href="#setlist">Repertório</Link>
          <Link href="#agenda">Agenda</Link>
        </nav>

        <Link href="#top">
          <Image
            src="/head-puppets-logo-simples.svg"
            width={136}
            height={48}
            alt="Logotipo Banda Head Puppets"
            className="pl-6 lg:pl-0"
          />
        </Link>

        <nav className="hidden items-center gap-6 text-foreground lg:flex">
          <Link href="#videos">Vídeos</Link>
          <Link href={`https://wa.me/${whatsapp}`} target="_blank">
            <Button size="xl" className="rounded-full">
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
                  <Link href={`https://wa.me/${whatsapp}`} target="_blank">
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
