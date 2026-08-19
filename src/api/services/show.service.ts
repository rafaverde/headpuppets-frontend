import { parseWordPressDateTime } from '@/lib/utils'
import { ShowRepository } from '../repositories/show.repository'
import type { Show } from '../types/show.types'

export const ShowService = {
  async getAgenda(): Promise<Show[]> {
    const response = await ShowRepository.getShows()

    const now = new Date()

    return response.shows.nodes
      .map(node => {
        const showDate = parseWordPressDateTime(node.showsFg.date)

        return {
          node,
          showDate,
        }
      })
      .filter(({ showDate }) => showDate >= now)
      .sort((a, b) => a.showDate.getTime() - b.showDate.getTime())
      .map(({ node, showDate }) => ({
        id: node.databaseId,
        documentId: node.id,
        venue: node.title,
        isOpenEvent: node.showsFg.isopenevent,
        locationUrl: node.showsFg.locationurl,

        date: new Intl.DateTimeFormat('pt-BR', {
          day: '2-digit',
          month: '2-digit',
        }).format(showDate),

        time: new Intl.DateTimeFormat('pt-BR', {
          hour: '2-digit',
          minute: '2-digit',
          hour12: false,
        })
          .format(showDate)
          .replace(':', 'h'),
      }))
  },
}
