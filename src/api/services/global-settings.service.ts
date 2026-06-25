import { GlobalSettingsRepository } from '../repositories/global-settings.repository'
import type { GlobalSettings } from '../types/global-settings.types'

export const GlobalSettingsService = {
  async getGlobalSettings(): Promise<GlobalSettings> {
    const response = await GlobalSettingsRepository.getGlobalSettings()

    const globalSettings = response.data

    return globalSettings
  },
}
