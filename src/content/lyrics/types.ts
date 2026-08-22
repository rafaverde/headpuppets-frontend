export type Singer = 'A' | 'E' | 'R'

export type LyricLineType = 'verse' | 'chorus' | 'cue' | 'gap'

export interface LyricLine {
  t: LyricLineType
  x: string
}

export interface Song {
  id: string
  title: string
  artist: string
  key: string | null
  singers: Singer[]
  setOrder: number | null
  lines: LyricLine[]
}
