import axios from "axios"

const base = axios.create({
  baseURL: "https://graphql.anilist.co",
})

export const fetchAnime = page => {
  const query = `
    query {
      anilist {
        Page(page: ${page}, perPage: 6) {
          media(type: ANIME) {
            id
            title {
              romaji
            }
            coverImage {
              large
            }
          }
        }
      }
    }
  `

  return base.post("", { query })
}
