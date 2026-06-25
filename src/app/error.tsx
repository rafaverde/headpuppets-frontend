'use client'

import { RiArrowLeftLine } from '@remixicon/react'
import Image from 'next/image'
import Link from 'next/link'

import { Button } from '@/components/ui/button'

export default function ErrorPage() {
  return (
    <section>
      <Image
        src="/global-error.svg"
        width={300}
        height={300}
        alt="Head Puppets Logo com um letreiro de erro."
      />

      <h2 className="mt-8 font-bold text-3xl text-violet-500 uppercase">
        Opa! Faltou energia no palco.
      </h2>
      <p className="mt-4 max-w-md text-slate-300">
        Tivemos um problema de conexão nos bastidores e não conseguimos carregar
        a página. Tente recarregar ou volte noavmente mais tarde.
      </p>

      <Link href="/">
        <Button size="xl" className="rounded-full">
          <RiArrowLeftLine />
          Voltar ao início
        </Button>
      </Link>
    </section>
  )
}
