export const GET_SHOWS_QUERY = `
  query getShows {
    shows(first: 100) {
      nodes {
        id
        databaseId
        title
        showsFg {
          date
          isopenevent
          locationurl
        }
      }
    }
  }
`
