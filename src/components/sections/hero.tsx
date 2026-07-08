export default function Hero() {
  return (
    <section
      id="top"
      className="justify-end-safe relative flex min-h-dvh flex-col items-center overflow-hidden px-4 pb-20"
    >
      <div className="absolute inset-0 z-0 bg-[url('/bg-banda-grunge-halloween.webp')] bg-center bg-cover bg-fixed bg-no-repeat">
        <div className="absolute inset-0 bg-linear-to-b from-slate-950/20 to-slate-950/0"></div>
      </div>

      <div className="relative flex flex-col items-center text-center text-foreground">
        <h2 className="max-w-2xl font-heading text-2xl uppercase leading-relaxed lg:text-3xl">
          Classic Rock e Heavy Metal em alto volume no RN.
        </h2>
        <p className="text-lg">
          Dos anos 60 até a atualidade. Aumente o som do seu evento com os
          clássicos do rock mundial.
        </p>
      </div>
    </section>
  )
}
