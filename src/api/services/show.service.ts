import { ShowRepository } from '../repositories/show.repository'

export const ShowService = {
  /**
   * Busca os shows e "limpa" o formato para o frontend consumir facilmente.
   */
  async getAgenda(): Promise<Show[]> {
    const response = await ShowRepository.getShows()

    // O Strapi devolve { data: [...], meta: {...} }
    // O Service extrai e devolve apenas o array de shows para o componente React
    const shows = response.data

    return shows
  },
}
