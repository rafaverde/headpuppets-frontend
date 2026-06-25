'use client'

import { RiArrowLeftLine } from '@remixicon/react'
import Image from 'next/image'
import Link from 'next/link'

import { Button } from '@/components/ui/button'

export default function NotFoundPage() {
  return (
    <section>
      <Image
        src="/404-error.svg"
        width={300}
        height={300}
        alt="Head Puppets Logo com um letreiro de erro."
      />

      <h2 className="mt-8 font-heading text-3xl text-violet-500 uppercase">
        Opa! Não tocamos essa música.
      </h2>
      <p className="mt-4 max-w-md text-slate-300">
        Parece que você pediu uma música que não está no nosso setlist. Essa
        página não existe.
      </p>

      <Link href="/">
        <Button size="xl" className="rounded-full">
          <RiArrowLeftLine />
          Voltar ao Palco Principal
        </Button>
      </Link>
    </section>
  )
}
