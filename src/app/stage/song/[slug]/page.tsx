import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { StagePlayer } from '@/components/stage/stage-player'
import { songs, songsById } from '@/content/lyrics'
import { show2208 } from '@/content/setlists/show-22-08'

type SongPageProps = {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return songs.map(song => ({ slug: song.id }))
}

export async function generateMetadata({
  params,
}: SongPageProps): Promise<Metadata> {
  const { slug } = await params
  const song = songsById[slug]

  return {
    title: song
      ? `${song.title} · Head Puppets Stage`
      : 'Música não encontrada',
    robots: { index: false, follow: false },
  }
}

export default async function SongPage({ params }: SongPageProps) {
  const { slug } = await params

  if (!songsById[slug]) notFound()

  return (
    <StagePlayer
      songs={songs}
      showSongIds={show2208.songIds}
      initialSongId={slug}
    />
  )
}
