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
  data: Show[]
  meta: {
    pagination: {
      page: number
      pageSize: number
      pageCount: number
      total: number
    }
  }
}
