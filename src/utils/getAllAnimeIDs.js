const delay = ms => new Promise(res => setTimeout(res, ms));

const getAllAnimeIDs = async (graphql, maxAnimeCount, currentFilterValue) => {
  const bigPerPage = Math.min(Math.max(6, maxAnimeCount / 10), 50);
  const totalPagesToIterate = Math.ceil(maxAnimeCount / bigPerPage);
  const allAnime = [];

  for (let page = 1; page <= totalPagesToIterate; page++) {
    const result = await graphql(
      `
        query AnimePage($page: Int!, $perPage: Int!, $currentFilterValue: ANILIST_MediaSort) {
          anilist {
            Page(page: $page, perPage: $perPage) {
              media(sort: [$currentFilterValue]) {
                id
                title {
                  userPreferred
                }
              }
            }
          }
        }
      `,
      {
        page: page,
        perPage: bigPerPage,
        currentFilterValue: currentFilterValue,
      },
    );

    allAnime.push(...result.data.anilist.Page.media);

    if (page < totalPagesToIterate) {
      await delay(1300);
    }
  }

  return allAnime.slice(0, maxAnimeCount);
};

module.exports = { getAllAnimeIDs };
