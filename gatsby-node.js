const { ANIME_PER_PAGE, MAX_RETRIES, MAX_ANIME_COUNT, DELAY_INCREMENT } = require('./src/utils/constants');
const { getAllAnimeIDs } = require('./src/utils/fetchFunctions');

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;

  const filters = ['all', 'popularity', 'favourites', 'episodes'];

  let animeData;
  try {
    animeData = await getAllAnimeIDs(graphql, MAX_ANIME_COUNT, MAX_RETRIES, DELAY_INCREMENT);
  } catch (error) {
    console.error('Error fetching anime data:', error);
    return;
  }

  const animeIDs = animeData.map((anime) => anime.id);
  const totalPagesToCreate = Math.ceil(animeIDs.length / ANIME_PER_PAGE);
  const animePageTemplate = require.resolve('./src/templates/anime.js');
  const singleAnimeTemplate = require.resolve('./src/templates/singleAnime.js');

  filters.forEach((filter) => {
    Array.from({ length: totalPagesToCreate }).forEach((_, index) => {
      const currentPage = index + 1;
      createPage({
        path: `/anime/${filter}/page=${currentPage}`,
        component: animePageTemplate,
        context: {
          page: currentPage,
          perPage: ANIME_PER_PAGE,
          currentPage,
          totalPages: totalPagesToCreate,
          currentFilter: filter,
          animeTitles: animeData,
        },
      });
    });
  });

  animeIDs.forEach((id) => {
    const anime = animeData.find((anime) => anime.id === id);
    createPage({
      path: `/anime/id=${id}`,
      component: singleAnimeTemplate,
      context: {
        id,
        coverImage: anime.coverImage,
      },
    });
  });
};
