export interface Video {
  id: number
  documentId: string
  title: string
  youtubeUrl: string
  order: number
  createdAt: string
  updatedAt: string
  publishedAt: string
}

export interface VideoResponse {
  data: Video[]
  meta: {
    pagination: {
      page: number
      pageSize: number
      pageCount: number
      total: number
    }
  }
}
