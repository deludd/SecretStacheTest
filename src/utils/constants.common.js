module.exports = {
  ANIME_PER_PAGE: 6,
  MAX_ANIME_COUNT: 12,
};

module.exports.filters = [
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

module.exports.API_URL = 'https://graphql.anilist.co';