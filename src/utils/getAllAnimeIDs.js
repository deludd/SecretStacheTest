const getAllAnimeIDs = async (graphql, maxAnimeCount) => {
  const bigPerPage = Math.min(Math.max(6, maxAnimeCount / 10), 50);
  const requests = [];
  const totalPagesToIterate = Math.ceil(maxAnimeCount / bigPerPage);
  for (let page = 1; page <= totalPagesToIterate; page++) {
    requests.push(
      graphql(`
        query AnimePage($page: Int!, $perPage: Int!) {
          anilist {
            Page(page: $page, perPage: $perPage) {
              media(type: ANIME) {
                id
                title {
                  romaji
                }
                coverImage {
                  large
                  largeSharp {
                    childImageSharp {
                      gatsbyImageData(formats: [AUTO, WEBP, AVIF], placeholder: BLURRED, layout: FIXED)
                    }
                  }
                }
                popularity
                episodes
                favourites
              }
            }
          }
        }
      `, {
          page: page,
          perPage: bigPerPage,
        }),
    );
  }
  const results = await Promise.all(requests);
  return results.flatMap((result) => result.data.anilist.Page.media);
};

module.exports = { getAllAnimeIDs };
