import { StagePlayer } from '@/components/stage/stage-player'
import { songs } from '@/content/lyrics'
import { show2208 } from '@/content/setlists/show-22-08'

export default function Show2208Page() {
  return (
    <StagePlayer
      songs={songs}
      showSongIds={show2208.songIds}
      initialSongId={show2208.songIds[0]}
      initialPlaylistIds={show2208.songIds}
      showMode
    />
  )
}
