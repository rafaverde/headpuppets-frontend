import { VideoRepository } from '../repositories/video.repository'
import type { Video } from '../types/video.types'

export const VideoService = {
  /**
   * Busca os shows e "limpa" o formato para o frontend consumir facilmente.
   */
  async getAllVideos(): Promise<Video[]> {
    const response = await VideoRepository.getVideos()

    const videos = response.data

    return videos
  },
}
