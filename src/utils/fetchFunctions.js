const fetchWithRetry = async (graphql, maxRetries, delayIncrement, retryCount = 0, query, variables = {}) => {
  try {
    const result = await graphql(query, variables);
    if (result.errors) {
      console.error('Error in fetchWithRetry:', result.errors);
      throw new Error('GraphQL query failed');
    }
    if (!result || !result.data) {
      console.error('Unexpected result structure:', result);
      throw new Error('GraphQL response structure is not as expected');
    }
    return result;
  } catch (error) {
    if (error.message.includes('429') && retryCount < maxRetries) {
      const delay = (retryCount + 1) * delayIncrement;
      console.warn(`Rate limit hit. Retrying after ${delay}ms...`);
      await new Promise((resolve) => setTimeout(resolve, delay));
      return fetchWithRetry(graphql, maxRetries, delayIncrement, retryCount + 1, query, variables);
    } else {
      console.error('Error in fetchWithRetry after retries:', error);
      throw error;
    }
  }
};

const getAllAnimeIDs = async (graphql, maxAnimeCount, maxRetries, delayIncrement) => {
  const bigPerPage = Math.min(Math.max(6, maxAnimeCount / 10), 50);
  const requests = [];
  const totalPagesToIterate = Math.ceil(maxAnimeCount / bigPerPage);
  for (let page = 1; page <= totalPagesToIterate; page++) {
    requests.push(
      fetchWithRetry(
        graphql,
        maxRetries,
        delayIncrement,
        0,
        `
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
      `,
        {
          page: page,
          perPage: bigPerPage,
        },
      ),
    );
  }
  const results = await Promise.all(requests);
  return results.flatMap((result) => result.data.anilist.Page.media);
};

module.exports = { fetchWithRetry, getAllAnimeIDs };
