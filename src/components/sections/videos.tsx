import { YouTubeEmbed } from '@next/third-parties/google'

import { VideoService } from '@/api/services/video.service'

function getYouTubeId(url: string) {
  const match = url.match(
    /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([^&?]+)/
  )
  return match ? match[1] : null
}

export default async function VideosSection() {
  const videos = await VideoService.getAllVideos()

  return (
    <section id="videos" className="scroll-m-14 bg-slate-950">
      <div className="container mx-auto flex flex-col gap-8 px-4 py-14 text-foreground">
        <div className="space-y-3">
          <h2 className="font-heading text-4xl text-slate-400 uppercase leading-relaxed">
            Vídeos
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {videos.map(video => {
            const videoId = getYouTubeId(video.youtubeUrl)

            if (!videoId) return null

            return (
              <div
                key={video.id}
                className="overflow-hidden rounded-xl border border-slate-900"
              >
                <YouTubeEmbed videoid={videoId} params="rel=0" />

                <div className="bg-card p-4">
                  <h3 className="font-bold text-card-foreground">
                    {video.title}
                  </h3>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
