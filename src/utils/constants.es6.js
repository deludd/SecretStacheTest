//api url
export const API_URL = 'https://graphql.anilist.co';

//base path
export const BASE_PATH = '/anime';

//pagination
export const PAGES_TO_SHOW = 4;

//loaclStorage
export const LOCAL_STORAGE_KEY = 'animeTitles';
export const LOCAL_STORAGE_VERSION_KEY = 'animeTitlesVersion';
export const CURRENT_VERSION = 1;

//filters
export const filters = [
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
