'use client'

import { RiArrowLeftLine } from '@remixicon/react'
import Image from 'next/image'
import Link from 'next/link'

import { Button } from '@/components/ui/button'

export default function NotFoundPage() {
  return (
    <section className="h-dvh bg-slate-950">
      <div className="container mx-auto grid h-full grid-cols-1 items-center gap-8 px-4 py-14 text-foreground md:grid-cols-2">
        <div className="flex w-full justify-end">
          <Image
            src="/404-error.svg"
            width={300}
            height={300}
            alt="Head Puppets Logo com um letreiro de erro."
          />
        </div>

        <div className="flex flex-col gap-4">
          <h2 className="font-heading text-3xl text-violet-500 uppercase leading-relaxed">
            Opa! Não tocamos essa música.
          </h2>
          <p className="max-w-md text-slate-300">
            Parece que você pediu uma música que não está no nosso setlist. Essa
            página não existe.
          </p>
          <Link href="/">
            <Button size="xl" className="mt-4 rounded-full">
              <RiArrowLeftLine />
              Voltar ao Palco Principal
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
