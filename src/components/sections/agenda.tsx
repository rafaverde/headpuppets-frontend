import { RiEmotionSadLine } from '@remixicon/react'

import type { Show } from '@/api/types/show.types'
import AgendaCard from '../agenda-card'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '../ui/carousel'

interface AgendaSectionProps {
  agenda: Show[]
}

export default function AgendaSection({ agenda }: AgendaSectionProps) {
  return (
    <section id="agenda" className="scroll-m-14 bg-[url('/grunge-bg.webp')]">
      <div className="container mx-auto flex flex-col gap-8 px-4 py-14">
        <div className="space-y-3">
          <h2 className="flex items-center justify-between gap-2 font-heading text-4xl text-slate-400 uppercase">
            Agenda
          </h2>
        </div>

        {agenda.length > 0 ? (
          <Carousel opts={{ align: 'start' }}>
            <CarouselContent className="-ml-8 max-w-[80%] md:max-w-full">
              {agenda.map(show => (
                <CarouselItem
                  key={show.id}
                  className="basis pl-8 md:basis-1/3 lg:basis-1/4"
                >
                  <AgendaCard show={show} />
                </CarouselItem>
              ))}
              ;
            </CarouselContent>
            <CarouselPrevious className="-left-2 md:-left-4 cursor-pointer bg-violet-300/40! md:inline-flex" />
            <CarouselNext className="-right-2 md:-right-4 cursor-pointer bg-violet-300/40! md:inline-flex" />
          </Carousel>
        ) : (
          <div className="mx-auto flex w-full max-w-2xl flex-col items-center justify-center text-center text-slate-500">
            <RiEmotionSadLine className="size-11" />
            <span>Nenhum show agendado ainda. Que Ozzy nos ajude...</span>
          </div>
        )}
      </div>
    </section>
  )
}
