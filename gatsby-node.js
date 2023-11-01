const { ANIME_PER_PAGE, MAX_ANIME_COUNT } = require('./src/utils/constants.common');
const { getAllAnimeIDs } = require('./src/utils/getAllAnimeIDs');
const { filters } = require('./src/utils/constants.common');

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;

  for (const filter of filters) {
    let animeData;
    try {
      animeData = await getAllAnimeIDs(graphql, MAX_ANIME_COUNT, filter.value);
    } catch (error) {
      console.error('Error fetching anime data:', error);
      return;
    }

    const animeDetails = animeData.map((anime) => ({
      id: anime.id,
      title: anime.title,
    }));
    const totalPagesToCreate = Math.ceil(animeDetails.length / ANIME_PER_PAGE);
    const animePageTemplate = require.resolve('./src/templates/anime.js');
    const singleAnimeTemplate = require.resolve('./src/templates/singleAnime.js');

    Array.from({ length: totalPagesToCreate }).forEach((_, index) => {
      const currentPage = index + 1;
      createPage({
        path: `/anime/${filter.slug}/page=${currentPage}`,
        component: animePageTemplate,
        context: {
          page: currentPage,
          perPage: ANIME_PER_PAGE,
          currentPage,
          totalPages: totalPagesToCreate,
          currentFilterValue: filter.value,
          currentFilter: filter,
        },
      });
    });

    animeDetails.forEach((anime) => {
      createPage({
        path: `/anime/id=${anime.id}`,
        component: singleAnimeTemplate,
        context: {
          id: anime.id,
          userPreferred: anime.title.userPreferred,
        },
      });
    });
  }
};
