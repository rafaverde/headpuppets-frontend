export const GET_VIDEOS_QUERY = `
  query getVideos {
    video(first: 100) {
      nodes {
        id
        databaseId
        title
        videosFg {
          youtubeurl
          order
        }
      }
    }
  }
`
