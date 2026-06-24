import AgendaSection from '@/components/sections/agenda'
import Hero from '@/components/sections/hero'
import TheBandSection from '@/components/sections/the-band'
import VideosSection from '@/components/sections/videos'
import WePlaySection from '@/components/sections/we-play'

export default function Home() {
  return (
    <>
      <Hero />
      <TheBandSection />
      <WePlaySection />
      <AgendaSection />
      <VideosSection />
    </>
  )
}
