exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;
  const ANIME_PER_PAGE = 6;
  const filters = ['all', 'popularity', 'favourites', 'episodes'];
  const MAX_RETRIES = 5;
  const DELAY_INCREMENT = 10000;
  const MAX_ANIME_COUNT = 12;

  const fetchWithRetry = async (query, variables = {}, retryCount = 0) => {
    try {
      const result = await graphql(query, variables);
      if (result.errors) {
        console.error('Error in fetchWithRetry:', result.errors);
        throw new Error('GraphQL query failed');
      }
      return result;
    } catch (error) {
      if (error.message.includes('429') && retryCount < MAX_RETRIES) {
        const delay = (retryCount + 1) * DELAY_INCREMENT;
        console.warn(`Rate limit hit. Retrying after ${delay}ms...`);
        await new Promise((resolve) => setTimeout(resolve, delay));
        return fetchWithRetry(query, variables, retryCount + 1);
      } else {
        console.error('Error in fetchWithRetry after retries:', error);
        throw error;
      }
    }
  };

  const getAllAnimeIDs = async () => {
    const bigPerPage = Math.min(Math.max(6, MAX_ANIME_COUNT / 10), 50);
    const requests = [];
    const totalPagesToIterate = Math.ceil(MAX_ANIME_COUNT / bigPerPage);
    for (let page = 1; page <= totalPagesToIterate; page++) {
      requests.push(
        fetchWithRetry(`
          query AnimePage {
            anilist {
              Page(page: ${page}, perPage: ${bigPerPage}) {
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
        `)
      );
    }
    const results = await Promise.all(requests);
    return results.flatMap(result => result.data.anilist.Page.media);
  };

  const animeData = await getAllAnimeIDs();

  const animeIDs =  animeData.map(anime => anime.id);

  const totalPagesToCreate = Math.ceil(animeIDs.length / ANIME_PER_PAGE);
  const animePageTemplate = require.resolve('./src/templates/anime.js');
  const singleAnimeTemplate = require.resolve('./src/templates/singleAnime.js');

  filters.forEach(filter => {
    Array.from({ length: totalPagesToCreate }).forEach((_, index) => {
        const currentPage = index + 1;
        const start = (currentPage - 1) * ANIME_PER_PAGE;
        const end = start + ANIME_PER_PAGE;
        let slicedData = [...animeData];

        if(filter !== 'all') {
            slicedData.sort((a, b) => b[filter] - a[filter]);
        }
        slicedData = slicedData.slice(start, end);

        createPage({
            path: `/anime/${filter}/page=${currentPage}`,
            component: animePageTemplate,
            context: {
                page: currentPage,
                perPage: ANIME_PER_PAGE,
                currentPage,
                totalPages: totalPagesToCreate,
                currentFilter: filter,
                idIn: slicedData,
                animeTitles: slicedData,
            },
        });
    });
});



  animeIDs.forEach(id => {
    createPage({
      path: `/anime/id=${id}`,
      component: singleAnimeTemplate,
      context: { id },
    });
  });
};
