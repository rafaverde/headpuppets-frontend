export interface GlobalSettings {
  id: number
  documentId: string
  whatsapp: string
  createdAt: string
  updatedAt: string
  publishedAt: string
  instagramUrl: string
  youtubeUrl: string
}

export interface GlobalSettingsResponse {
  data: GlobalSettings
  meta: undefined
}
