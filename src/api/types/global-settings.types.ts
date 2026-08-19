export interface GlobalSettings {
  whatsapp: string
  instagramUrl: string
  youtubeUrl: string
}

export interface GlobalSettingsResponse {
  globalSettings: {
    globalSettingsFields: {
      instagramurl: string
      whatsapp: string
      youtubeurl: string
    }
  }
}
