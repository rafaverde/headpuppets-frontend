import { StagePlayer } from '@/components/stage/stage-player'
import { songs } from '@/content/lyrics'
import { show2208 } from '@/content/setlists/show-22-08'

export default function StagePage() {
  return <StagePlayer songs={songs} showSongIds={show2208.songIds} />
}
