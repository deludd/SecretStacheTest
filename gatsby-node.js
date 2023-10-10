exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;

  const animePerPage = 6;

  const { data } = await graphql(`
    query AnimePage {
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
  `);

  const totalCount = data.anilist.SiteStatistics.anime.pageInfo.total;
  const totalPages = Math.ceil(totalCount / animePerPage);

  const animePageTemplate = require.resolve('./src/templates/anime.js');
  const singleAnimeTemplate = require.resolve('./src/templates/singleAnime.js');

  Array.from({ length: totalPages }).forEach((_, i) => {
    createPage({
      path: `/anime/page=${i + 1}`,
      component: animePageTemplate,
      context: {
        skip: i * animePerPage,
        limit: animePerPage,
        currentPage: i + 1,
        totalPages,
      },
    });
  });


  const animeIDs = await Promise.all(
    Array.from({ length: totalPages }).map(async (_, i) => {
      const animeData = await graphql(`
        query AnimePage($page: Int!) {
          anilist {
            Page(page: $page, perPage: 6) {
              media(type: ANIME) {
                id
              }
            }
          }
        }
      `, {
        page: i + 1,
      });

      const media = animeData.data?.anilist?.Page?.media;

      if (media) {
        return media.map((anime) => anime.id);
      } else {
        console.error('The media property is null or undefined');
        return [];
      }
    })
  );

  animeIDs.forEach((ids) => {
    ids.forEach((id) => {
      createPage({
        path: `/anime/id=${id}`,
        component: singleAnimeTemplate,
        context: {
          id,
        },
      });
    });
  });
};
