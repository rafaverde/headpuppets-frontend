import Image from 'next/image'

import MemberCard from '../member-card'

export default function TheBandSection() {
  return (
    <section id="the-band" className="scroll-m-14 bg-slate-950">
      <div className="container mx-auto grid grid-cols-1 gap-14 px-4 py-14 text-foreground md:grid-cols-2">
        <div className="space-y-3">
          <h2 className="font-heading text-4xl text-slate-400 uppercase">
            A Banda
          </h2>
          <h3 className="font-semibold text-lg">
            A Head Puppets nasceu para manter o rock and roll rolando.
          </h3>
          <p>
            <strong>
              Somos uma banda de Natal/RN que leva o peso do Heavy Metal
              Clássico para o palco.
            </strong>{' '}
            Músicos que se entregam de corpo e alma para entregar shows cheios
            de atitude e qualidade.
          </p>
          <p>
            Não tocamos apenas covers, resgatamos a energia verdadeira das
            bandas que marcaram época para fazer o público cantar junto.
          </p>
        </div>

        <div className="flex w-full justify-center">
          <Image
            src="/head-puppets-logo-completo.svg"
            width={204}
            height={224}
            alt="Logo Banda Head Puppets Completo"
          />
        </div>

        <div className="col-span-2 grid grid-cols-1 items-center justify-between gap-8 md:grid-cols-3 lg:grid-cols-6">
          {Array.from({ length: 6 }).map((_, index) => (
            // biome-ignore lint/suspicious/noArrayIndexKey: <Temporary>
            <MemberCard key={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
