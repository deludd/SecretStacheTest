const { ANIME_PER_PAGE, MAX_ANIME_COUNT, filters } = require('./src/utils/constants.common');
const { getAllAnimeIDs } = require('./src/utils/getAllAnimeIDs');
const lunr = require('lunr');
const fs = require('fs');

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;
  const animePageTemplate = require.resolve('./src/templates/anime.js');
  const singleAnimeTemplate = require.resolve('./src/templates/singleAnime.js');

  let allAnime = [];

  for (const filter of filters) {
    try {
      const animeData = await getAllAnimeIDs(graphql, MAX_ANIME_COUNT, filter.value);
      allAnime = allAnime.concat(
        animeData.map((anime) => ({
          id: anime.id,
          title: anime.title,
          bannerImage: anime.bannerImage,
          coverImage: anime.coverImage,
        })),
      );

      animeData.forEach((anime) => {
        createPage({
          path: `/anime/id=${anime.id}`,
          component: singleAnimeTemplate,
          context: { id: anime.id, userPreferred: anime.title.userPreferred },
        });
      });

      const totalPages = Math.ceil(animeData.length / ANIME_PER_PAGE);
      Array.from({ length: totalPages }).forEach((_, index) => {
        createPage({
          path: `/anime/${filter.slug}/page=${index + 1}`,
          component: animePageTemplate,
          context: {
            page: index + 1,
            perPage: ANIME_PER_PAGE,
            currentPage: index + 1,
            totalPages,
            currentFilterValue: filter.value,
            currentFilter: filter,
          },
        });
      });
    } catch (error) {
      console.error('Error fetching anime data:', error);
      return;
    }
  }

  const idx = lunr(function () {
    this.pipeline.remove(lunr.stemmer);
    this.searchPipeline.remove(lunr.stemmer);
    this.ref('id');
    this.field('userPreferred');
    allAnime.forEach((anime) =>
      this.add({
        id: String(anime.id),
        userPreferred: anime.title.userPreferred,
      }),
    );
  });

  fs.writeFileSync('public/searchIndex.json', JSON.stringify({ index: idx, allAnime }));
  const animeDataForFile = allAnime.map(({ id, title, bannerImage, coverImage }) => ({
    id: id,
    title: title.userPreferred,
    bannerImage: bannerImage,
    coverImage: coverImage.large,
  }));

  fs.writeFileSync('public/animeData.json', JSON.stringify(animeDataForFile));
};
