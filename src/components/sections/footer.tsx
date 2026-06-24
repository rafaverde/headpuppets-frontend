import {
  RiCopyrightLine,
  RiInstagramLine,
  RiWhatsappLine,
  RiYoutubeLine,
} from '@remixicon/react'
import Image from 'next/image'
import Link from 'next/link'

export default function Footer() {
  return (
    <footer id="footer" className="bg-slate-950 brightness-75">
      <div className="container mx-auto flex flex-col gap-8 px-4 py-14 md:flex-row">
        <h2 className="font-heading text-4xl text-slate-400 uppercase">
          @banda_headpuppets
        </h2>

        <div className="flex gap-8">
          <Link
            href="https://www.instagram.com/banda_headpuppets"
            target="_blank"
          >
            <RiInstagramLine className="size-11 cursor-pointer text-accent hover:text-primary" />
          </Link>
          <Link
            href="https://www.youtube.com/@BandaHeadPuppets"
            target="_blank"
          >
            <RiYoutubeLine className="size-11 cursor-pointer text-accent hover:text-primary" />
          </Link>
          <Link href="https://wa.me/" target="_blank">
            <RiWhatsappLine className="size-11 cursor-pointer text-accent hover:text-primary" />
          </Link>
        </div>
      </div>

      <div
        id="agenda"
        className="flex flex-col items-center gap-2 bg-[url('/grunge-bg.webp')] px-4 py-14"
      >
        <Image
          src="/head-puppets-logo-puppet.svg"
          width={150}
          height={144}
          alt="Banda Head Puppets logo"
        />
        <div className="flex items-center gap-1 text-foreground text-sm">
          {new Date().getFullYear()} <RiCopyrightLine className="size-4" />{' '}
          Todos os direitos reservados
        </div>
      </div>
    </footer>
  )
}
