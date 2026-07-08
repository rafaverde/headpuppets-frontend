'use client'

import Image from 'next/image'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <html lang="pt-BR">
      <body className="bg-slate-950 text-slate-50">
        <section className="flex min-h-screen flex-col items-center justify-center p-6 text-center">
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
            Tivemos um problema de conexão nos bastidores e não conseguimos
            carregar a página. Tente recarregar ou volte noavmente mais tarde.
          </p>

          <div className="mt-6 bg-slate-800 px-4 py-3">
            <code>{`Erro: ${error.message}`}</code>
          </div>

          <button
            type="button"
            onClick={() => reset()}
            className="mt-8 cursor-pointer rounded-full bg-violet-600 px-6 py-3 font-bold text-white transition-colors hover:bg-violet-500"
          >
            Tentar Ligar os Cabos Novamente
          </button>
        </section>
      </body>
    </html>
  )
}
