exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;
  const animePerPage = 6;
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
    const result = await fetchWithRetry(`
      query AllAnimeIDs {
        anilist {
          Page(page: 1, perPage: ${MAX_ANIME_COUNT}) {
            media(type: ANIME) {
              id
            }
          }
        }
      }
    `);
    return result.data.anilist.Page.media.map((anime) => anime.id);
  };

  const totalPages = Math.ceil(MAX_ANIME_COUNT / animePerPage);
  const animePageTemplate = require.resolve('./src/templates/anime.js');
  const singleAnimeTemplate = require.resolve('./src/templates/singleAnime.js');

  const animeIDs = await getAllAnimeIDs();

  filters.forEach(filter => {
    Array.from({ length: totalPages }).forEach((_, index) => {
      const currentPage = index + 1;
      createPage({
        path: `/anime/${filter}/page=${currentPage}`,
        component: animePageTemplate,
        context: {
          page: currentPage,
          perPage: animePerPage,
          currentPage,
          totalPages,
          currentFilter: filter,
          idIn: animeIDs,
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
