import AgendaCard from '../agenda-card'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '../ui/carousel'

export default function AgendaSection() {
  return (
    <section id="agenda" className="scroll-m-14 bg-[url('/grunge-bg.webp')]">
      <div className="container mx-auto flex flex-col gap-8 px-4 py-14">
        <div className="space-y-3">
          <h2 className="font-heading text-4xl text-slate-400 uppercase">
            Agenda
          </h2>
        </div>

        <Carousel opts={{ align: 'start' }}>
          <CarouselContent className="-ml-8">
            {Array.from({ length: 6 }).map((_, index) => (
              <CarouselItem
                // biome-ignore lint/suspicious/noArrayIndexKey: <Temporary>
                key={index}
                className="basis-1/2 pl-8 md:basis-1/3 lg:basis-1/4"
              >
                <AgendaCard />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="-left-4 hidden cursor-pointer bg-violet-300/40! md:inline-flex" />
          <CarouselNext className="-right-4 hidden cursor-pointer bg-violet-300/40! md:inline-flex" />
        </Carousel>
      </div>
    </section>
  )
}
