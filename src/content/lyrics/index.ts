import song46 from './2-minutes-to-midnight.json'
import song43 from './back-in-black.json'
import song15 from './barracuda.json'
import song45 from './best-of-you.json'
import song42 from './blitzkrieg-bop.json'
import song13 from './born-to-be-wild.json'
import song17 from './cocaine.json'
import song39 from './doctor-doctor.json'
import song32 from './enter-sandman.json'
import song20 from './even-flow.json'
import song38 from './fortunate-son.json'
import song3 from './gimme-all-your-loving.json'
import song18 from './have-you-ever-seen-the-rain.json'
import song27 from './hells-bells.json'
import song36 from './help.json'
import song28 from './highway-to-hell.json'
import song7 from './highway-tune.json'
import song4 from './hold-the-line.json'
import song40 from './i-live-my-life-for-you.json'
import song2 from './immigrant-song.json'
import song41 from './iron-man.json'
import song6 from './it-s-a-long-way-to-the-top.json'
import song1 from './johnny-b-goode.json'
import song12 from './keep-the-faith.json'
import song25 from './knockin-on-heaven-s-door.json'
import song11 from './livin-on-a-prayer.json'
import song31 from './love-gun.json'
import song9 from './money-for-nothing.json'
import song23 from './paranoid.json'
import song37 from './proud-mary.json'
import song0 from './rock-and-roll.json'
import song34 from './rock-you-like-a-hurricane.json'
import song8 from './safari-song.json'
import song30 from './separate-ways.json'
import song16 from './seven-nation-army.json'
import song10 from './smoke-on-the-water.json'
import song29 from './still-loving-you.json'
import song44 from './sultans-of-swing.json'
import song22 from './sweet-child-o-mine.json'
import song14 from './sweet-home-alabama.json'
import song33 from './the-trooper.json'
import song35 from './ticket-to-ride.json'
import type { Song } from './types'
import song24 from './war-pigs.json'
import song21 from './welcome-to-the-jungle.json'
import song19 from './wicked-game.json'
import song26 from './with-or-without-you.json'
import song5 from './you-give-love-a-bad-name.json'

export const songs: Song[] = [
  song0 as Song,
  song1 as Song,
  song2 as Song,
  song3 as Song,
  song4 as Song,
  song5 as Song,
  song6 as Song,
  song7 as Song,
  song8 as Song,
  song9 as Song,
  song10 as Song,
  song11 as Song,
  song12 as Song,
  song13 as Song,
  song14 as Song,
  song15 as Song,
  song16 as Song,
  song17 as Song,
  song18 as Song,
  song19 as Song,
  song20 as Song,
  song21 as Song,
  song22 as Song,
  song23 as Song,
  song24 as Song,
  song25 as Song,
  song26 as Song,
  song27 as Song,
  song28 as Song,
  song29 as Song,
  song30 as Song,
  song31 as Song,
  song32 as Song,
  song33 as Song,
  song34 as Song,
  song35 as Song,
  song36 as Song,
  song37 as Song,
  song38 as Song,
  song39 as Song,
  song40 as Song,
  song41 as Song,
  song42 as Song,
  song43 as Song,
  song44 as Song,
  song45 as Song,
  song46 as Song,
]

export const songsById = Object.fromEntries(
  songs.map(song => [song.id, song])
) as Record<string, Song>
