exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;

  const animePerPage = 6;
  const filters = ['all', 'chapters', 'popularity', 'views'];

  const totalCountQuery = await graphql(`
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
  `);

  if (totalCountQuery.errors) {
    console.error("Error fetching total count:", totalCountQuery.errors);
    return;
  }

  const totalCount = totalCountQuery.data.anilist.SiteStatistics.anime.pageInfo.total;
  const totalPages = Math.ceil(totalCount / animePerPage);
  const animePageTemplate = require.resolve('./src/templates/anime.js');
  const singleAnimeTemplate = require.resolve('./src/templates/singleAnime.js');

  const getSortArrayFromFilter = (filter) => {
    const sortMapping = {
      all: null,
      chapters: 'CHAPTERS_DESC',
      popularity: 'POPULARITY_DESC',
      views: 'SCORE_DESC'
    };
    return sortMapping[filter] ? [sortMapping[filter]] : null;
  };

  for (const filter of filters) {
    for (let i = 0; i < totalPages; i++) {
      createPage({
        path: `/anime/${filter}/page=${i + 1}`,
        component: animePageTemplate,
        context: {
          skip: i * animePerPage,
          limit: animePerPage,
          currentPage: i + 1,
          totalPages,
          sort: getSortArrayFromFilter(filter),
          currentFilter: filter,
        },
      });
    }
  }

  const animeIDs = [];

  for (let i = 0; i < totalPages; i++) {
    const animeDataQuery = await graphql(`
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

    if (animeDataQuery.errors) {
      console.error("Error fetching anime data:", animeDataQuery.errors);
      continue;
    }

    const media = animeDataQuery.data.anilist.Page.media;
    if (media) {
      animeIDs.push(...media.map((anime) => anime.id));
    } else {
      console.error('The media property is null or undefined');
    }
  }

  for (const id of animeIDs) {
    createPage({
      path: `/anime/id=${id}`,
      component: singleAnimeTemplate,
      context: {
        id,
      },
    });
  }
};
