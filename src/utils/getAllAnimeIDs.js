const getAllAnimeIDs = async (graphql, maxAnimeCount, currentFilterValue) => {
  const bigPerPage = Math.min(Math.max(6, maxAnimeCount / 10), 50);
  const requests = [];
  const totalPagesToIterate = Math.ceil(maxAnimeCount / bigPerPage);
  for (let page = 1; page <= totalPagesToIterate; page++) {
    requests.push(
      graphql(
        `
          query AnimePage($page: Int!, $perPage: Int!, $currentFilterValue: ANILIST_MediaSort) {
            anilist {
              Page(page: $page, perPage: $perPage) {
                media(sort: [$currentFilterValue]) {
                  id
                  title {
                    userPreferred
                  }
                  bannerImage
                  coverImage {
                    large
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
      ),
    );
  }
  const results = await Promise.all(requests);
  const allAnime = results.flatMap((result) => result.data.anilist.Page.media);

  return allAnime.slice(0, maxAnimeCount);
};

module.exports = { getAllAnimeIDs };
