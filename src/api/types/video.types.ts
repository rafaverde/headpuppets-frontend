export interface Video {
  id: number
  documentId: string
  title: string
  youtubeUrl: string
  order: number
}

export interface VideoResponse {
  videos: {
    nodes: Array<{
      id: string
      databaseId: number
      title: string
      videosFg: {
        youtubeurl: string
        order: string
      }
    }>
  }
}
