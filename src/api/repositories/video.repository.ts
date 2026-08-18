import { fetchGraphQL } from '../http-client'
import { GET_VIDEOS_QUERY } from '../queries/video.query'
import type { VideoResponse } from '../types/video.types'

export const VideoRepository = {
  async getVideos(): Promise<VideoResponse> {
    return fetchGraphQL<VideoResponse>(GET_VIDEOS_QUERY)
  },
}
