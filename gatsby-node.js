const { ANIME_PER_PAGE, MAX_ANIME_COUNT } = require('./src/utils/constants.common');
const { getAllAnimeIDs } = require('./src/utils/getAllAnimeIDs');

// TODO: DRY
const filters = [
  {
    label: 'All',
    slug: 'all',
    value: 'ID',
  },
  {
    label: 'Popularity',
    slug: 'popularity',
    value: 'POPULARITY_DESC',
  },
  {
    label: 'Favorites',
    slug: 'favorites',
    value: 'FAVOURITES_DESC',
  },
  {
    label: 'Trending',
    slug: 'trending',
    value: 'TRENDING_DESC',
  },
];

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

    const animeIDs = animeData.map((anime) => anime.id);
    const totalPagesToCreate = Math.ceil(animeIDs.length / ANIME_PER_PAGE);
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

    animeIDs.forEach((id) => {
      createPage({
        path: `/anime/id=${id}`,
        component: singleAnimeTemplate,
        context: {
          id,
        },
      });
    });
  }
};
