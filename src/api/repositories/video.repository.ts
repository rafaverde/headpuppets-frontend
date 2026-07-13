import { fetchAPI } from '../http-client'
import type { VideoResponse } from '../types/video.types'

export const VideoRepository = {
  /**
   * Busca a lista de shows no Strapi.
   * Usamos o parâmetro ?sort=date:asc para que o banco já devolva
   * a agenda ordenada do show mais próximo para o mais distante.
   */
  async getVideos(): Promise<VideoResponse> {
    return fetchAPI<VideoResponse>('/videos?sort=order:asc', {
      next: {
        revalidate: 3600,
      },
    })
  },
}
