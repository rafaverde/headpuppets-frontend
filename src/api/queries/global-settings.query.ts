export const GET_GLOBAL_SETTINGS_QUERY = `
  query getGlobalSettings {
    globalSettings {
      globalSettingsFields {
        instagramurl
        whatsapp
        youtubeurl
      }
    }
  }
`
