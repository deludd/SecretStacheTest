exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;

  const animePerPage = 6;
  const filters = ['all', 'popularity', 'favourites', 'episodes'];
  const MAX_RETRIES = 5;
  const DELAY_INCREMENT = 5000; 
  const MAX_ANIME_COUNT = 500;

  const fetchWithRetry = async (query, variables, retryCount = 0) => {
    try {
      const result = await graphql(query, variables);
      if (result.errors) {
        console.error("Error in fetchWithRetry:", result.errors);
        throw new Error("GraphQL query failed");
      }
      return result;
    } catch (error) {
      if (error.message.includes('429') && retryCount < MAX_RETRIES) {
        const delay = (retryCount + 1) * DELAY_INCREMENT;
        console.warn(`Rate limit hit. Retrying after ${delay}ms...`);
        await new Promise(resolve => setTimeout(resolve, delay));
        return fetchWithRetry(query, variables, retryCount + 1);
      } else {
        console.error("Error in fetchWithRetry after retries:", error);
        throw error;
      }
    }
  };

  const totalCountQuery = await fetchWithRetry(`
    query AnimePageCount {
      anilist {
        SiteStatistics {
          anime {
            pageInfo {
              total
            }
          }
        }
      }
    }
  `, {});

  const totalCount = totalCountQuery.data.anilist.SiteStatistics.anime.pageInfo.total;
  const totalPages = Math.ceil(totalCount / animePerPage);
  const animePageTemplate = require.resolve('./src/templates/anime.js');
  const singleAnimeTemplate = require.resolve('./src/templates/singleAnime.js');

  const getSortArrayFromFilter = (filter) => {
    const sortMapping = {
      all: null,
      popularity: 'popularity',
      favourites: 'favourites',
      views: 'episodes'
    };
    return sortMapping[filter] ? [sortMapping[filter]] : null;
  };

  const generateAnimePages = () => {
    for (const filter of filters) {
      for (let currentPage = 1; currentPage <= totalPages; currentPage++) {
        const isLastPage = currentPage === totalPages;
        const remainingAnime = totalCount % animePerPage; 
        createPage({
          path: `/anime/${filter}/page=${currentPage}`,
          component: animePageTemplate,
          context: {
            page: currentPage,
            perPage: isLastPage ? remainingAnime : animePerPage,
            currentPage,
            totalPages,
            sort: getSortArrayFromFilter(filter),
            currentFilter: filter,
          },
        });
      }
    }
  };

  const getAllAnimeIDs = async () => {
    const bigPerPage = 50;
    const requests = [];
    const totalPages = Math.ceil(MAX_ANIME_COUNT / bigPerPage);
    for (let page = 1; page <= totalPages; page++) {
      requests.push(
        fetchWithRetry(`
          query AnimePage {
            anilist {
              Page(page: ${page}, perPage: ${bigPerPage}) {
                media(type: ANIME) {
                  id
                }
              }
            }
          }
        `)
      );
    }
    const results = await Promise.all(requests);
    const animeIDs = results.flatMap(result =>
      result.data.anilist.Page.media.map(anime => anime.id)
    );
    console.log("Total animeIDs fetched:", animeIDs.length);
    return animeIDs;
  };
  

  generateAnimePages();

  try {
    const animeIDs = await getAllAnimeIDs();
    for (const id of animeIDs) {
      createPage({
        path: `/anime/id=${id}`,
        component: singleAnimeTemplate,
        context: {
          id,
        },
      });
    }
  } catch (error) {
    console.error("Error creating single anime pages:", error);
  }
};

