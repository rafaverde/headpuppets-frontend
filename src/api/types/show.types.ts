export interface Show {
  id: number
  documentId: string
  venue: string
  date: string
  time: string
  isOpenEvent: boolean
  locationUrl: string
}

export interface ShowResponse {
  shows: {
    nodes: Array<{
      id: string
      databaseId: number
      title: string
      showsFg: {
        date: string
        isopenevent: boolean
        locationurl: string
      }
    }>
  }
}
