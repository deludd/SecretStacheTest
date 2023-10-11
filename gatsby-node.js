exports.createPages = async ({ actions }) => {
  const { createPage } = actions;
  const animePerPage = 6;
  const filters = ['all', 'chapters', 'popularity', 'views'];
  const maxPages = 50;
  const animePageTemplate = require.resolve('./src/templates/anime.js');
  const singleAnimeTemplate = require.resolve('./src/templates/singleAnime.js');
  const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  const getSortArrayFromFilter = (filter) => {
    const sortMapping = {
      all: null,
      chapters: 'CHAPTERS_DESC',
      popularity: 'POPULARITY_DESC',
      views: 'SCORE_DESC',
    };
    return sortMapping[filter] ? [sortMapping[filter]] : null;
  };

const generateAnimePages = async () => {
  const idArray = Array.from({ length: 500 }, (_, index) => index + 1);
  for (const filter of filters) {
    for (let i = 0; i < maxPages; i++) {
      await delay(100);
      createPage({
          path: `/anime/${filter}/page=${i + 1}`,
          component: animePageTemplate,
          context: {
            skip: i * animePerPage,
            limit: animePerPage,
            currentPage: i + 1,
            totalPages: maxPages,
            sort: getSortArrayFromFilter(filter),
            currentFilter: filter,
            id_in: idArray,
          },
        });
      }
    }
  };

  generateAnimePages();

  const idArray = Array.from({ length: 500 }, (_, index) => index + 1);
  for (const id of idArray) {
    await delay(100);
    createPage({
      path: `/anime/id=${id}`,
      component: singleAnimeTemplate,
      context: {
        id,
      },
    });
  }
};
