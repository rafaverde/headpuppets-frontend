import { fetchAPI } from '../http-client'
import type { ShowResponse } from '../types/show.types'

export const ShowRepository = {
  /**
   * Busca a lista de shows no Strapi.
   * Usamos o parâmetro ?sort=date:asc para que o banco já devolva
   * a agenda ordenada do show mais próximo para o mais distante.
   */
  async getShows(): Promise<ShowResponse> {
    return fetchAPI<ShowResponse>('/shows?sort=date:asc', {
      next: {
        revalidate: 3600,
      },
    })
  },
}
