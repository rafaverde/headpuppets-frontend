import { VideoRepository } from '../repositories/video.repository'
import type { Video } from '../types/video.types'

export const VideoService = {
  async getAllVideos(): Promise<Video[]> {
    const response = await VideoRepository.getVideos()

    const videos = response.videos.nodes.map(node => ({
      id: node.databaseId,
      documentId: node.id,
      title: node.title,
      youtubeUrl: node.videosFg.youtubeurl,
      order: node.videosFg.order,
    }))

    return videos
  },
}
