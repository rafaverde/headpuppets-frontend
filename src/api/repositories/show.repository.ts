import { fetchGraphQL } from '../http-client'
import { GET_SHOWS_QUERY } from '../queries/show.query'
import type { ShowResponse } from '../types/show.types'

export const ShowRepository = {
  async getShows(): Promise<ShowResponse> {
    return fetchGraphQL<ShowResponse>(GET_SHOWS_QUERY)
  },
}
