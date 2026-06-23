import { RiCalendar2Line } from '@remixicon/react'

import { Card, CardContent, CardHeader } from './ui/card'

export default function AgendaCard() {
  return (
    <Card className="border border-violet-950 p-5 ring-0">
      <CardHeader className="flex items-center gap-3 p-0">
        <RiCalendar2Line className="size-9 text-violet-400" />
        <h3 className="font-heading text-2xl text-accent uppercase">11/07</h3>
      </CardHeader>
      <CardContent className="flex flex-col gap-2 p-0">
        <span>
          Local:{' '}
          <a href="/" className="underline">
            Bar 54
          </a>
        </span>
        <span>Horário: 19h30</span>
        <span className="font-semibold text-slate-500 text-xs">
          Evento Aberto
        </span>
      </CardContent>
    </Card>
  )
}
