'use client'

import {
  ChevronLeft,
  ChevronRight,
  ListMusic,
  Maximize2,
  Minus,
  Music2,
  Pause,
  Play,
  Plus,
  Search,
  X,
} from 'lucide-react'
import Link from 'next/link'
import {
  type PointerEvent as ReactPointerEvent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'

import type { Singer, Song } from '@/content/lyrics/types'

type LibraryFilter = 'show' | 'all' | Singer

interface StagePlayerProps {
  songs: Song[]
  showSongIds: readonly string[]
  initialSongId?: string
  initialPlaylistIds?: readonly string[]
  showMode?: boolean
}

interface WakeLockSentinelLike {
  release: () => Promise<void>
}

const singerName: Record<Singer, string> = {
  A: 'Anna',
  E: 'Enrique',
  R: 'Rafael',
}

const singerClass: Record<Singer, string> = {
  A: 'stage-singer-anna',
  E: 'stage-singer-enrique',
  R: 'stage-singer-rafael',
}

const normalize = (value: string) =>
  value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()

export function StagePlayer({
  songs,
  showSongIds,
  initialSongId,
  initialPlaylistIds,
  showMode = false,
}: StagePlayerProps) {
  const songsById = useMemo(
    () => Object.fromEntries(songs.map(song => [song.id, song])),
    [songs]
  )
  const [currentSongId, setCurrentSongId] = useState(initialSongId)
  const [playlistIds, setPlaylistIds] = useState<string[]>(
    initialPlaylistIds ? [...initialPlaylistIds] : songs.map(song => song.id)
  )
  const [filter, setFilter] = useState<LibraryFilter>(showMode ? 'show' : 'all')
  const [query, setQuery] = useState('')
  const [isRunning, setIsRunning] = useState(false)
  const [speed, setSpeed] = useState(35)
  const [fontSize, setFontSize] = useState(29)
  const [isSetlistOpen, setIsSetlistOpen] = useState(false)
  const lyricsRef = useRef<HTMLDivElement>(null)
  const dragStartRef = useRef<number | null>(null)
  const draggedRef = useRef(false)
  const wakeLockRef = useRef<WakeLockSentinelLike | null>(null)

  const currentSong = currentSongId ? songsById[currentSongId] : undefined
  const currentIndex = currentSongId ? playlistIds.indexOf(currentSongId) : -1
  const nextSong =
    currentIndex >= 0 ? songsById[playlistIds[currentIndex + 1]] : undefined

  const filteredSongs = useMemo(() => {
    const showIds = new Set(showSongIds)
    const normalizedQuery = normalize(query.trim())

    return songs
      .filter(song => {
        if (filter === 'show' && !showIds.has(song.id)) return false
        if (
          filter !== 'show' &&
          filter !== 'all' &&
          !song.singers.includes(filter)
        ) {
          return false
        }

        if (!normalizedQuery) return true
        return normalize(
          `${song.title} ${song.artist} ${song.key ?? ''}`
        ).includes(normalizedQuery)
      })
      .sort((a, b) => {
        if (filter === 'show') {
          return showSongIds.indexOf(a.id) - showSongIds.indexOf(b.id)
        }
        return a.title.localeCompare(b.title)
      })
  }, [filter, query, showSongIds, songs])

  const filteredSongIds = useMemo(
    () => filteredSongs.map(song => song.id),
    [filteredSongs]
  )

  const requestWakeLock = useCallback(async () => {
    try {
      const wakeLockNavigator = navigator as Navigator & {
        wakeLock?: {
          request: (type: 'screen') => Promise<WakeLockSentinelLike>
        }
      }

      if (wakeLockNavigator.wakeLock) {
        wakeLockRef.current = await wakeLockNavigator.wakeLock.request('screen')
      }
    } catch {
      wakeLockRef.current = null
    }
  }, [])

  const releaseWakeLock = useCallback(async () => {
    try {
      await wakeLockRef.current?.release()
    } finally {
      wakeLockRef.current = null
    }
  }, [])

  const openSong = useCallback((songId: string, songPlaylist?: string[]) => {
    if (songPlaylist) setPlaylistIds(songPlaylist)
    setCurrentSongId(songId)
    setIsRunning(false)
    setIsSetlistOpen(false)
  }, [])

  const goToPrevious = useCallback(() => {
    if (currentIndex <= 0) return
    openSong(playlistIds[currentIndex - 1])
  }, [currentIndex, openSong, playlistIds])

  const goToNext = useCallback(() => {
    if (currentIndex < 0 || currentIndex >= playlistIds.length - 1) return
    openSong(playlistIds[currentIndex + 1])
  }, [currentIndex, openSong, playlistIds])

  const changeFontSize = useCallback((delta: number) => {
    setFontSize(size => {
      const nextSize = Math.max(18, Math.min(52, size + delta))
      localStorage.setItem('hp-stage-font-size', String(nextSize))
      return nextSize
    })
  }, [])

  useEffect(() => {
    const savedFontSize = Number(localStorage.getItem('hp-stage-font-size'))
    if (savedFontSize >= 18 && savedFontSize <= 52) setFontSize(savedFontSize)
  }, [])

  useEffect(() => {
    if (!currentSongId) return
    const savedSpeed = Number(
      localStorage.getItem(`hp-stage-speed:${currentSongId}`)
    )
    setSpeed(savedSpeed >= 8 && savedSpeed <= 120 ? savedSpeed : 35)
    setIsRunning(false)
    if (lyricsRef.current) lyricsRef.current.scrollTop = 0
    void requestWakeLock()

    return () => {
      void releaseWakeLock()
    }
  }, [currentSongId, releaseWakeLock, requestWakeLock])

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible' && currentSongId) {
        void requestWakeLock()
      }
    }
    document.addEventListener('visibilitychange', handleVisibilityChange)
    return () =>
      document.removeEventListener('visibilitychange', handleVisibilityChange)
  }, [currentSongId, requestWakeLock])

  useEffect(() => {
    if (!isRunning) return
    let frameId = 0
    let previousTime = performance.now()

    const scroll = (time: number) => {
      const lyrics = lyricsRef.current
      if (!lyrics) return

      const elapsed = Math.min(time - previousTime, 100)
      previousTime = time
      lyrics.scrollTop += (speed * elapsed) / 1000

      if (lyrics.scrollTop + lyrics.clientHeight >= lyrics.scrollHeight - 2) {
        setIsRunning(false)
        return
      }

      frameId = requestAnimationFrame(scroll)
    }

    frameId = requestAnimationFrame(scroll)
    return () => cancelAnimationFrame(frameId)
  }, [isRunning, speed])

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!currentSong) return
      if (event.target instanceof HTMLInputElement) return

      if (event.code === 'Space') {
        event.preventDefault()
        setIsRunning(running => !running)
      } else if (event.key === 'ArrowLeft') {
        goToPrevious()
      } else if (event.key === 'ArrowRight') {
        goToNext()
      } else if (event.key === '+' || event.key === '=') {
        changeFontSize(2)
      } else if (event.key === '-') {
        changeFontSize(-2)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [changeFontSize, currentSong, goToNext, goToPrevious])

  const handleSpeedChange = (value: number) => {
    setSpeed(value)
    if (currentSongId) {
      localStorage.setItem(`hp-stage-speed:${currentSongId}`, String(value))
    }
  }

  const handleLyricsPointerDown = (
    event: ReactPointerEvent<HTMLDivElement>
  ) => {
    dragStartRef.current = event.clientY
    draggedRef.current = false
  }

  const handleLyricsPointerMove = (
    event: ReactPointerEvent<HTMLDivElement>
  ) => {
    if (
      dragStartRef.current !== null &&
      Math.abs(event.clientY - dragStartRef.current) > 12
    ) {
      draggedRef.current = true
      setIsRunning(false)
    }
  }

  const handleLyricsPointerUp = () => {
    if (!draggedRef.current && currentSong?.lines.length) {
      setIsRunning(running => !running)
    }
    dragStartRef.current = null
  }

  const enterFullscreen = async () => {
    try {
      if (!document.fullscreenElement)
        await document.documentElement.requestFullscreen()
      else await document.exitFullscreen()
    } catch {
      // Fullscreen is optional and unavailable on some iPad browser versions.
    }
  }

  if (!currentSong) {
    const filterOptions: Array<{ value: LibraryFilter; label: string }> = [
      { value: 'show', label: `Show 22/08 · ${showSongIds.length}` },
      { value: 'all', label: `Todas · ${songs.length}` },
      { value: 'A', label: 'Anna' },
      { value: 'E', label: 'Enrique' },
      { value: 'R', label: 'Rafael' },
    ]

    return (
      <div className="stage-shell">
        <header className="stage-header">
          <div className="stage-brand">
            Head Puppets <span>Stage</span>
          </div>
          <Link className="stage-show-link" href="/stage/show-22-08">
            <Play aria-hidden size={17} fill="currentColor" /> Iniciar show
          </Link>
        </header>

        <main className="stage-library">
          <div className="stage-library-intro">
            <p className="stage-eyebrow">Repertório de palco</p>
            <h1>Qual é a próxima?</h1>
            <p>Escolha uma música ou abra a sequência pronta do show.</p>
          </div>

          <label className="stage-search">
            <Search aria-hidden size={21} />
            <span className="sr-only">Buscar música</span>
            <input
              type="search"
              placeholder="Buscar música, artista ou tom"
              value={query}
              onChange={event => setQuery(event.target.value)}
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery('')}
                aria-label="Limpar busca"
              >
                <X aria-hidden size={20} />
              </button>
            )}
          </label>

          <fieldset className="stage-filters" aria-label="Filtrar repertório">
            {filterOptions.map(option => (
              <button
                type="button"
                key={option.value}
                className={filter === option.value ? 'is-active' : undefined}
                onClick={() => setFilter(option.value)}
              >
                {option.label}
              </button>
            ))}
          </fieldset>

          <div className="stage-result-count">
            {filteredSongs.length} música{filteredSongs.length === 1 ? '' : 's'}
          </div>

          <div className="stage-song-list">
            {filteredSongs.map((song, index) => (
              <button
                type="button"
                className="stage-song-row"
                key={song.id}
                onClick={() => openSong(song.id, filteredSongIds)}
              >
                <span className="stage-song-number">
                  {filter === 'show' ? String(index + 1).padStart(2, '0') : '—'}
                </span>
                <span className="stage-song-info">
                  <strong>{song.title}</strong>
                  <span>
                    {song.artist || 'Artista não informado'}
                    {!song.lines.length && <em> · SEM LETRA</em>}
                  </span>
                </span>
                <span className="stage-singers" role="img" aria-label="Vocais">
                  {song.singers.map(singer => (
                    <i
                      key={singer}
                      className={singerClass[singer]}
                      title={singerName[singer]}
                    />
                  ))}
                </span>
                <span className="stage-key">{song.key ?? '—'}</span>
                <ChevronRight
                  aria-hidden
                  className="stage-row-arrow"
                  size={22}
                />
              </button>
            ))}
          </div>
        </main>
      </div>
    )
  }

  const verseColorClass =
    currentSong.singers.length === 1
      ? singerClass[currentSong.singers[0]]
      : 'stage-singer-multiple'

  return (
    <div className="stage-shell stage-player">
      <header className="stage-player-header">
        <button
          type="button"
          className="stage-icon-button"
          onClick={() => {
            setIsRunning(false)
            setCurrentSongId(undefined)
          }}
          aria-label="Voltar ao repertório"
        >
          <ChevronLeft aria-hidden size={30} />
        </button>

        <div className="stage-now-playing">
          <span>
            {currentIndex >= 0
              ? `${String(currentIndex + 1).padStart(2, '0')} / ${playlistIds.length}`
              : 'Música'}
          </span>
          <strong>{currentSong.title}</strong>
          <small>
            {currentSong.artist} ·{' '}
            {currentSong.singers.map(s => singerName[s]).join(' + ')}
          </small>
        </div>

        <span className="stage-key stage-current-key">
          {currentSong.key ?? '—'}
        </span>
        <button
          type="button"
          className="stage-icon-button"
          onClick={() => void enterFullscreen()}
          aria-label="Alternar tela cheia"
        >
          <Maximize2 aria-hidden size={22} />
        </button>
        <button
          type="button"
          className="stage-icon-button"
          onClick={() => setIsSetlistOpen(true)}
          aria-label="Abrir sequência de músicas"
        >
          <ListMusic aria-hidden size={24} />
        </button>
      </header>

      <div
        ref={lyricsRef}
        className="stage-lyrics"
        onPointerDown={handleLyricsPointerDown}
        onPointerMove={handleLyricsPointerMove}
        onPointerUp={handleLyricsPointerUp}
        onPointerCancel={() => {
          dragStartRef.current = null
        }}
      >
        <div className="stage-lyrics-inner" style={{ fontSize }}>
          <div className="stage-legend">
            <span className={verseColorClass}>
              <i /> {currentSong.singers.map(s => singerName[s]).join(' + ')}
            </span>
            <span className="stage-chorus">
              <i /> coro / juntos
            </span>
            <span className="stage-cue">
              <i /> deixa / arranjo
            </span>
          </div>

          {currentSong.lines.length ? (
            currentSong.lines.map((line, index) => {
              if (line.t === 'gap') {
                return (
                  <div className="stage-lyric-gap" key={`${line.t}-${index}`} />
                )
              }

              return (
                <p
                  className={`stage-lyric-line stage-${line.t} ${
                    line.t === 'verse' ? verseColorClass : ''
                  }`}
                  key={`${line.t}-${index}`}
                >
                  {line.x}
                </p>
              )
            })
          ) : (
            <div className="stage-no-lyrics">
              <Music2 aria-hidden size={34} />A letra desta música ainda não foi
              adicionada.
            </div>
          )}
        </div>
      </div>

      <footer className={`stage-controls ${isRunning ? 'is-running' : ''}`}>
        <button
          type="button"
          className="stage-control-button stage-prev-next"
          onClick={goToPrevious}
          disabled={currentIndex <= 0}
          aria-label="Música anterior"
        >
          <ChevronLeft aria-hidden size={30} />
        </button>

        <button
          type="button"
          className="stage-play-button"
          onClick={() =>
            currentSong.lines.length && setIsRunning(running => !running)
          }
          disabled={!currentSong.lines.length}
        >
          {isRunning ? (
            <Pause aria-hidden size={24} fill="currentColor" />
          ) : (
            <Play aria-hidden size={24} fill="currentColor" />
          )}
          {isRunning ? 'Pausar' : 'Iniciar'}
        </button>

        <label className="stage-speed-control">
          <span>
            Velocidade <b>{speed}</b>
          </span>
          <input
            type="range"
            min="8"
            max="120"
            step="1"
            value={speed}
            onChange={event => handleSpeedChange(Number(event.target.value))}
          />
        </label>

        <fieldset className="stage-font-controls" aria-label="Tamanho da letra">
          <button
            type="button"
            onClick={() => changeFontSize(-2)}
            aria-label="Diminuir letra"
          >
            <Minus aria-hidden size={22} />
          </button>
          <span>Aa</span>
          <button
            type="button"
            onClick={() => changeFontSize(2)}
            aria-label="Aumentar letra"
          >
            <Plus aria-hidden size={22} />
          </button>
        </fieldset>

        <button
          type="button"
          className="stage-control-button stage-prev-next"
          onClick={goToNext}
          disabled={currentIndex < 0 || currentIndex >= playlistIds.length - 1}
          aria-label="Próxima música"
        >
          <ChevronRight aria-hidden size={30} />
        </button>

        <div className="stage-next-song">
          <span>Próxima</span>
          <strong>{nextSong?.title ?? 'Fim da sequência'}</strong>
        </div>
      </footer>

      {isSetlistOpen && (
        <div className="stage-drawer-backdrop">
          <button
            type="button"
            className="stage-drawer-dismiss"
            onClick={() => setIsSetlistOpen(false)}
            aria-label="Fechar sequência de músicas"
          />
          <aside className="stage-drawer" aria-label="Sequência de músicas">
            <div className="stage-drawer-header">
              <div>
                <span>Sequência atual</span>
                <strong>{playlistIds.length} músicas</strong>
              </div>
              <button
                type="button"
                onClick={() => setIsSetlistOpen(false)}
                aria-label="Fechar"
              >
                <X aria-hidden size={25} />
              </button>
            </div>
            <div className="stage-drawer-list">
              {playlistIds.map((id, index) => {
                const song = songsById[id]
                if (!song) return null

                return (
                  <button
                    type="button"
                    key={id}
                    className={id === currentSongId ? 'is-current' : undefined}
                    onClick={() => openSong(id)}
                  >
                    <span>{String(index + 1).padStart(2, '0')}</span>
                    <strong>{song.title}</strong>
                    <small>{song.key ?? '—'}</small>
                  </button>
                )
              })}
            </div>
          </aside>
        </div>
      )}
    </div>
  )
}
