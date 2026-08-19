import { fetchGraphQL } from '../http-client'
import { GET_GLOBAL_SETTINGS_QUERY } from '../queries/global-settings.query'
import type { GlobalSettingsResponse } from '../types/global-settings.types'

export const GlobalSettingsRepository = {
  async getGlobalSettings(): Promise<GlobalSettingsResponse> {
    return fetchGraphQL<GlobalSettingsResponse>(GET_GLOBAL_SETTINGS_QUERY)
  },
}
