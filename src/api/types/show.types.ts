export interface Show {
  id: number
  documentId: string
  date: string
  venue: string
  time: string
  isOpenEvent: boolean
  locationUrl: string
  createdAt: string
  updatedAt: string
  publishedAt: string
}

export interface ShowResponse {
  shows: {
    nodes: Array<{
      id: string
      databaseId: number
      showsFg: {
        date: string
        isopenevent: boolean
        locationurl: string
      }
    }>
  }
}
