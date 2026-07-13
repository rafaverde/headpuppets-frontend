import { ShowRepository } from '../repositories/show.repository'
import type { Show } from '../types/show.types'

export const ShowService = {
  /**
   * Busca os shows e "limpa" o formato para o frontend consumir facilmente.
   */
  async getAgenda(): Promise<Show[]> {
    const response = await ShowRepository.getShows()
    const rawShows = response.data

    const today = new Date().toISOString().split('T')[0]

    const futureShows = rawShows.filter(show => {
      const [year, day, month] = show.date.split('-')
      const normalizedShowData = `${year}-${month}-${day}`

      return normalizedShowData >= today
    })

    const formattedShows = futureShows.map(show => {
      // biome-ignore lint/correctness/noUnusedVariables: <Non used>
      const [year, month, day] = show.date.split('-')
      const formattedDate = `${day}/${month}`

      const formattedHour = show.time.substring(0, 5).replace(':', 'h')

      return {
        ...show,
        date: formattedDate,
        time: formattedHour,
      }
    })

    return formattedShows
  },
}
