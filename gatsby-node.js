exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;

  const animePerPage = 6;

  const { data } = await graphql(`
    query TotalPages {
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
  
  for (let page = 1; page <= totalPages; page++) {
    const animeData = await graphql(`
      query AnimePage($skip: Int!, $limit: Int!) {
        anilist {
          Page(page: $skip, perPage: $limit) {
            media(type: ANIME) {
              id
            }
          }
        }
      }
    `, {
      variables: {
        skip: page * animePerPage,
        limit: animePerPage,
      },
    });

    const animeList = animeData.data.anilist.Page.media;

    console.log(animeList)

    animeList.forEach((anime) => {
      createPage({
        path: `/anime/page=${page}/anime_id=${anime.id}`,
        component: resolve(`src/templates/singleAnime.js`),
        context: {
          id: anime.id,
        },
      });
    });

    createPage({
      path: `/anime/page=${page}`,
      component: resolve(`src/templates/anime.js`),
      context: {
        currentPage: i,
        totalPages,
      },
    });
  }
};
