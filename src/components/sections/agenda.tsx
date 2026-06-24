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
          <h2 className="flex items-center justify-between gap-2 font-heading text-4xl text-slate-400 uppercase">
            Agenda
          </h2>
        </div>

        <Carousel opts={{ align: 'start' }}>
          <CarouselContent className="-ml-8 max-w-[80%] md:max-w-full">
            {Array.from({ length: 6 }).map((_, index) => (
              <CarouselItem
                // biome-ignore lint/suspicious/noArrayIndexKey: <Temporary>
                key={index}
                className="basis pl-8 md:basis-1/3 lg:basis-1/4"
              >
                <AgendaCard />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="-left-2 md:-left-4 cursor-pointer bg-violet-300/40! md:inline-flex" />
          <CarouselNext className="-right-2 md:-right-4 cursor-pointer bg-violet-300/40! md:inline-flex" />
        </Carousel>
      </div>
    </section>
  )
}
