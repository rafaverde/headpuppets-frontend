import { RiCalendar2Line, RiWhatsappLine } from '@remixicon/react'
import Image from 'next/image'
import Link from 'next/link'

import { Button } from '../ui/button'

export default function WePlaySection() {
  return (
    <section id="the-band" className="scroll-m-14 bg-violet-950">
      <div className="container mx-auto grid grid-cols-1 items-center gap-14 px-4 py-14 md:grid-cols-2">
        <div className="space-y-3">
          <h2 className="font-heading text-4xl text-slate-400 uppercase">
            O Que A Gente Toca
          </h2>
          <h3 className="font-semibold text-lg">
            Nosso setlist vai direto ao ponto: os maiores riffs e clássicos que
            todo fã de rock respeita.
          </h3>
          <p>
            De Led Zeppelin, Creedence e Beatles, até o peso de Black Sabbath,
            Iron Maiden e Metallica, passando por Scorpions, AC/DC, Journey, Bon
            Jovi, Guns'n Roses, Heart, Greta Van Fleet e Pearl Jam, e muito mais
            rock'n roll.
          </p>

          <div className="mt-6 flex items-center gap-6">
            <Button size="xl" className="rounded-full">
              <RiWhatsappLine className="size-6" />
              Quero contratar
            </Button>

            <Link href="#agenda">
              <Button size="xl" className="rounded-full">
                <RiCalendar2Line className="size-6" />
                Agenda
              </Button>
            </Link>
          </div>
        </div>

        <div className="flex w-full justify-center">
          <Image
            src="/bands-we-play-logos.png"
            width={400}
            height={400}
            alt="Logos de bandas que tocamos"
          />
        </div>
      </div>
    </section>
  )
}
