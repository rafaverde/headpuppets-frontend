import { RiCalendar2Line, RiMapPin2Line, RiTimeLine } from '@remixicon/react'

import type { Show } from '@/api/types/show.types'
import { Card, CardContent, CardHeader } from './ui/card'

interface AgendaCardProps {
  show: Show
}

export default function AgendaCard({ show }: AgendaCardProps) {
  return (
    <Card className="border border-violet-950 p-8 ring-0 md:p-5">
      <CardHeader className="flex items-center gap-3 p-0">
        <RiCalendar2Line className="size-9 text-violet-400" />
        <h3 className="font-heading text-2xl text-accent uppercase">
          {show.date}
        </h3>
      </CardHeader>
      <CardContent className="flex flex-col gap-2 p-0">
        <span className="flex items-center gap-1 text-xl">
          <RiMapPin2Line className="text-violet-500" /> Local:{' '}
          <a href={show.locationUrl} className="underline" target="_blank">
            {show.venue}
          </a>
        </span>
        <span className="flex items-center gap-1 text-xl">
          <RiTimeLine className="text-violet-500" /> Horário: {show.time}
        </span>
        <span className="font-semibold text-slate-500 text-xs">
          {show.isOpenEvent ? 'Evento Aberto' : 'Evento Particular'}
        </span>
      </CardContent>
    </Card>
  )
}
