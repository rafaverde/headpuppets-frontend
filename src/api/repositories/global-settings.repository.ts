import { fetchAPI } from '../http-client'
import type { GlobalSettingsResponse } from '../types/global-settings.types'

export const GlobalSettingsRepository = {
  async getGlobalSettings(): Promise<GlobalSettingsResponse> {
    return fetchAPI<GlobalSettingsResponse>('/global-setting', {
      next: {
        revalidate: 3600,
      },
    })
  },
}
