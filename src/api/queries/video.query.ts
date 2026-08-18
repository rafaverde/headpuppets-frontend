export const GET_VIDEOS_QUERY = `
  query getVideos {
    videos: video(first: 100) {
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
